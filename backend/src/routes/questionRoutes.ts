import { Router } from "express";
import { protect } from "../middlewares/authMiddleware";
import { addQuestionsToSession, toggleQuestionPin, updateQuestionNote } from "../controllers/questionController";

const router = Router();

router.post("/add", protect, addQuestionsToSession);
router.post("/:id/pin", protect, toggleQuestionPin);
router.post("/:id/note", protect, updateQuestionNote);

export default router;
