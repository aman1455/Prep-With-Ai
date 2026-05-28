import mongoose, { Document, Schema, Types } from "mongoose";

export interface IQuestion extends Document {
  session: Types.ObjectId;
  question?: string;
  answer?: string;
  note?: string;
  isPinned: boolean;
}

const questionSchema = new Schema<IQuestion>(
  {
    session: { type: Schema.Types.ObjectId, ref: "Session" },
    question: String,
    answer: String,
    note: String,
    isPinned: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model<IQuestion>("Question", questionSchema);
