import mongoose, { Document, Schema } from "mongoose";

export interface IUser extends Document {
  clerkId: string;
  name: string;
  email: string;
  profileImageUrl: string | null;
}

const userSchema = new Schema<IUser>(
  {
    clerkId: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    profileImageUrl: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);
