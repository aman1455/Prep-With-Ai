import { Request, Response } from "express";
import Session from "../models/Session";
import Question from "../models/Question";
import logger from "../utils/logger";

export const createSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const { role, experience, topicsToFocus, description, questions } = req.body;

    if (!req.user || !req.user._id) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }

    if (!Array.isArray(questions) || questions.length === 0) {
      res.status(400).json({ success: false, message: "Questions must be a non-empty array" });
      return;
    }

    const session = await Session.create({
      user: req.user._id,
      role,
      experience,
      topicsToFocus,
      description,
      numberOfQuestions: 10,
    });

    const questionDocs = await Question.insertMany(
      questions.map((q: { question: string; answer: string }) => ({
        session: session._id,
        question: q.question,
        answer: q.answer,
      }))
    );

    session.questions = questionDocs.map((q) => q._id);
    await session.save();

    res.status(201).json({ success: true, session });
  } catch (error: any) {
    logger.error("CREATE SESSION ERROR:", error);
    res.status(500).json({ success: false, message: "Server Error", error: error.message });
  }
};

export const getMySessions = async (req: Request, res: Response): Promise<void> => {
  try {
    const sessions = await Session.find({ user: req.user!._id })
      .sort({ createdAt: -1 })
      .populate("questions");

    res.status(200).json({ success: true, sessions });
  } catch (error) {
    logger.error("Get sessions error:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export const getSessionById = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await Session.findById(req.params.id)
      .populate({
        path: "questions",
        options: { sort: { isPinned: -1, createdAt: 1 } },
      })
      .exec();

    if (!session) {
      res.status(404).json({ success: false, message: "Session not found." });
      return;
    }

    res.status(200).json({ success: true, session });
  } catch (error) {
    logger.error("Get session by ID error:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};

export const deleteSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const session = await Session.findById(req.params.id);

    if (!session) {
      res.status(404).json({ success: false, message: "Session not found." });
      return;
    }

    if (session.user.toString() !== req.user!._id.toString()) {
      res.status(401).json({ success: false, message: "You are not authorized to delete this session." });
      return;
    }

    await Question.deleteMany({ session: session._id });
    await session.deleteOne();

    res.status(201).json({ message: "Session deleted successfully" });
  } catch (error) {
    logger.error("Delete session error:", error);
    res.status(500).json({ message: "Server Error", success: false });
  }
};
