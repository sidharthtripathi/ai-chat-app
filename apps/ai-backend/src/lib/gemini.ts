const key = process.env.GOOGLE_KEY
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(key);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

export async function getAnswer(prompt : string) {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    return text
  }

