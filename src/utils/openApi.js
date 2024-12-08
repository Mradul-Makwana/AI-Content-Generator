import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINIAI_KEY } from "./constant";

const genAI = new GoogleGenerativeAI(GEMINIAI_KEY);
const openai = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
export default openai;
