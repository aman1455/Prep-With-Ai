import mongoose, { Document, Schema, Types } from "mongoose";

export interface ISession extends Document {
  user: Types.ObjectId;
  role: string;
  experience: string;
  topicsToFocus: string;
  description?: string;
  questions: Types.ObjectId[];
  numberOfQuestions: number;
}

const sessionSchema = new Schema<ISession>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    role: { type: String, required: true },
    experience: { type: String, required: true },
    topicsToFocus: { type: String, required: true },
    description: String,
    questions: [{ type: Schema.Types.ObjectId, ref: "Question" }],
    numberOfQuestions: { type: Number, required: true },
  },
  { timestamps: true }
);

export default mongoose.model<ISession>("Session", sessionSchema);
