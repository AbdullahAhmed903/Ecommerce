import { Schema, model, Types } from "mongoose";

const userschema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "userName is required"],
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email is required"],
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
    },
    age: Number,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    Role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
    },
    blocked: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    code: {
      type: String,
      default: null,
    },
    isOnline: {
      type: Boolean,
      default: false,
    },
    lastSeen: Date,
    image: String,
    wishlist: [
      {
        type: Types.ObjectId,
        ref: "product",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const userModel = model("User", userschema);

export default userModel;
