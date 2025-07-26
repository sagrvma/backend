import mongoose, { Document, model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  createdAt: Date;
}

const userSchema = new Schema<IUser>({
  name: String,
  email: String,
  age: Number,
  createdAt: Date,
});

const User = model<IUser>("User", userSchema);

export { User, IUser };
