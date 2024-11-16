import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "Username is Required"],
    },
    email: {
      type: String,
      required: [true, "Email is Required"],
    },
    password: {
      type: String,
      required: [true, "Password is Required"],
    },
    blogs: [
      {
        type: mongoose.Types.ObjectId,
        ref: "Product",
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

export default User;