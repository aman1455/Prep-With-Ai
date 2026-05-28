import { Document, Types } from "mongoose";

declare module "express-serve-static-core" {
  interface Request {
    auth?: { userId?: string };
    user?: Document<unknown, {}, any> & { _id: Types.ObjectId; clerkId: string; name: string; email: string; profileImageUrl: string | null };
  }
}
