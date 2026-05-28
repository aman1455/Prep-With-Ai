import { Request, Response } from "express";
import Session from "../models/Session";
import Question from "../models/Question";

export const addQuestionsToSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { sessionId, questions } = req.body;

    if (!sessionId || !Array.isArray(questions)) {
      res.status(400).json({ success: false, message: "Invalid input data." });
      return;
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      res.status(404).json({ success: false, message: "Session not found." });
      return;
    }

    const createdQuestions = await Question.insertMany(
      questions.map((q: { question: string; answer: string }) => ({
        session: sessionId,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions.push(...createdQuestions.map((q) => q._id));
    await session.save();

    res.status(201).json({ success: true, questions: createdQuestions });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const toggleQuestionPin = async (req: Request, res: Response): Promise<void> => {
  try {
    const question = await Question.findById(req.params.id);

    if (!question) {
      res.status(404).json({ success: false, message: "Question not found" });
      return;
    }

    question.isPinned = !question.isPinned;
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const updateQuestionNote = async (req: Request, res: Response): Promise<void> => {
  try {
    const { note } = req.body;

    const question = await Question.findById(req.params.id);
    if (!question) {
      res.status(404).json({ success: false, message: "Question not found" });
      return;
    }

    question.note = note || "";
    await question.save();

    res.status(200).json({ success: true, question });
  } catch (error) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
};
