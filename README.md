#  User Query Matching Chatbot using Node-NLP

This is a simple NLP-powered chatbot built using Node.js and the `node-nlp` library. The bot takes user queries from the command line, compares them to a predefined set of questions using intent classification, and returns the most relevant answer.

---
# Application
In many customer support scenarios, users often phrase their queries differently than what's listed in a company's FAQ. A rule-based system using strict keyword matching fails in such cases. The goal of this project is to:

Improve user experience by intelligently understanding queries

Match paraphrased input to correct intents

Provide fallback responses when no match is found

Offer a simple and easily extendable architecture for real-world use

---
##  Objective

To build a chatbot-like system that:
- Accepts user input in natural language
- Matches it to predefined question/answer pairs
- Returns a relevant response based on intent similarity
- Handles paraphrased or misspelled questions
- Falls back gracefully when no match is found

---

## Method

I approached this problem by using the `node-nlp` library’s `NlpManager`, which supports training custom intents and responses. I created a `qa.json` file containing common customer support questions and their answers.

The system follows these steps:
1. Loads all questions and associates them with a unique intent
2. Trains the NLP model on this data
3. Takes a user query from the terminal
4. Predicts the closest intent using NLP classification
5. Checks the confidence score and returns the matched response if above 0.7, otherwise shows a fallback

This approach ensures the system works even with paraphrased questions like:
> “How do I return my item?” → Matched with: “How can I return a product?”

---

##  Technologies Used

- Node.js
- [node-nlp](https://www.npmjs.com/package/node-nlp)
- Command-line interface for interaction
- JSON for storing Q&A pairs

---

##  How to Run

1. **Clone the repository**
```bash
git clone https://github.com/EngrHaseebAhmed/ChatBot_Using_NodeNLP.git
cd ChatBot_Using_NodeNLP
