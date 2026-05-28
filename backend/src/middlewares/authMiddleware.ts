import { Request, Response, NextFunction } from "express";
import { getAuth, clerkClient } from "@clerk/express";
import User from "../models/User";
import logger from "../utils/logger";

export const protect = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const auth = getAuth(req);
    logger.debug(`Auth object: ${JSON.stringify(auth)}`);
    logger.debug(`Authorization header: ${req.headers.authorization?.substring(0, 20)}...`);
    
    const userId = auth.userId;
    if (!userId) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    let user = await User.findOne({ clerkId: userId });
    if (!user) {
      const clerkUser = await clerkClient.users.getUser(userId);
      user = await User.create({
        clerkId: userId,
        name: clerkUser.fullName || "User",
        email: clerkUser.primaryEmailAddress?.emailAddress || "",
        profileImageUrl: clerkUser.imageUrl,
      });
    }

    req.user = user;
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Not authorized", error: error.message });
  }
};
