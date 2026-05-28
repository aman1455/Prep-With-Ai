import { Request, Response } from "express";
import User from "../models/User";

export const getUserProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) {
      res.status(404).json({ message: "User not found." });
      return;
    }
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: "Server Error. Try later.", error: error.message });
  }
};
