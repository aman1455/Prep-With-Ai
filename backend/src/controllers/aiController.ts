import { Request, Response } from "express";
import OpenAI from "openai";
import { questionAnswerPrompt, conceptExplainPrompt } from "../utils/prompt";
import logger from "../utils/logger";

const client = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPENROUTER_API_KEY,
  defaultHeaders: {
    "HTTP-Referer": "http://localhost:5173",
    "X-Title": "AI Interview Prep",
  },
});

export const generateInterviewQuestions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, experience, topicsToFocus, numberOfQuestions } = req.body;

    if (!role || !experience || !topicsToFocus || !numberOfQuestions) {
      res.status(400).json({ message: "Missing required fields" });
      return;
    }

    const prompt = questionAnswerPrompt(role, experience, topicsToFocus, numberOfQuestions);

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        { role: "system", content: "You are an interview preparation AI. Return ONLY valid JSON." },
        { role: "user", content: prompt },
      ],
    });

    const rawText = completion?.choices?.[0]?.message?.content;

    if (!rawText) {
      res.status(500).json({ message: "No response from AI" });
      return;
    }

    const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    let data: unknown;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      logger.error("JSON PARSE ERROR:", parseError);
      logger.debug("RAW AI RESPONSE:", rawText);
      res.status(500).json({ message: "Invalid JSON response from AI", rawText });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    logger.error("AI ERROR:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate questions.", error: error.message });
  }
};

export const generateConceptExplanation = async (req: Request, res: Response): Promise<void> => {
  try {
    const { question } = req.body;

    if (!question) {
      res.status(400).json({ message: "Question is required" });
      return;
    }

    const prompt = conceptExplainPrompt(question);

    const completion = await client.chat.completions.create({
      model: "openrouter/free",
      messages: [
        { role: "system", content: "You are an expert programming teacher. Return ONLY valid JSON." },
        { role: "user", content: prompt },
      ],
    });

    const rawText = completion?.choices?.[0]?.message?.content;

    if (!rawText) {
      res.status(500).json({ message: "No response from AI" });
      return;
    }

    const cleanedText = rawText.replace(/^```json\s*/i, "").replace(/```$/i, "").trim();

    let data: unknown;
    try {
      data = JSON.parse(cleanedText);
    } catch (parseError) {
      logger.error("JSON PARSE ERROR:", parseError);
      logger.debug("RAW AI RESPONSE:", rawText);
      res.status(500).json({ message: "Invalid JSON response from AI", rawText });
      return;
    }

    res.status(200).json(data);
  } catch (error: any) {
    logger.error("AI ERROR:", error?.response?.data || error.message);
    res.status(500).json({ message: "Failed to generate explanation.", error: error.message });
  }
};
