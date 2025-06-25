const { NlpManager } = require('node-nlp'); // loads the NLP engine from the library. NlpManager
const readline = require('readline'); // for reading user input from the command line
const fs = require('fs'); // for file system operations

// Load questions
const qaPairs = JSON.parse(fs.readFileSync('qa.json', 'utf-8')); // Load the question-answer pairs to javascript object

// Create NLP manager
const manager = new NlpManager({ languages: ['en'], forceNER: true }); // Initialize the NLP manager with English as the language and enable Named Entity Recognition (NER) its default 

// Train the model
async function trainNLP() {
  qaPairs.forEach((pair, index) => { // For each question-answer pair
    manager.addDocument('en', pair.question, `intent.${index}`); // Add the question to the NLP manager with a unique intent identifiier and used Intent Classification
    manager.addAnswer('en', `intent.${index}`, pair.answer); // Add the corresponding answer to the NLP manager
  });

  await manager.train(); // Train the NLP model with the added documents and answers
  manager.save(); // Save the trained model to a file
  console.log('NLP model trained and saved.');
}

// Ask user question via CLI
async function askQuestion() { 
  const rl = readline.createInterface({ // Create a readline interface for user input
    prompt: 'Ask your question: ',
    input: process.stdin, // Standard input stream
    output: process.stdout // Standard output stream
  });

  rl.question('Ask your question: ', async (input) => { // Prompt the user for a question
    const response = await manager.process('en', input); // Process the user's input using the NLP manager

    if (response.intent && response.score >= 0.7) { // Check if the intent is recognized with a confidence score of at least 0.7
      console.log(`Answer: ${response.answer} (Confidence: ${response.score.toFixed(2)})`); // Output the answer and confidence score
    } else {
      console.log("Sorry, I didn’t understand your question."); // If the intent is not recognized, output a default message
    }

    rl.close(); // Close the readline interface
  });
}

// Run
(async () => { // Immediately invoked async function to handle asynchronous operations
  const modelExists = fs.existsSync('./model.nlp'); // Check if the model file exists

  if (!modelExists) { // If the model does not exist, train a new model
    console.log('Training model...'); // Log that the model is being trained
    await trainNLP(); //
    console.log('Model trained.');
  } else {
    await manager.load();
  }

  askQuestion(); // Call the function to ask a question
})();
