import { Types, Schema, model } from "mongoose";

const REVIEWSCHEMA = new Schema(
  {
    comment: {
      type: String,
      required: [true, "comment is required"],
    },
    rating: {
      type: Number,
      default: 1,
      min: [1, "1 is minimum"],
      max: [5, "5 is maximum"],
    },
    userId: {
      type: Types.ObjectId,
      ref: "User",
      required: [true, "userId is required"],
    },
    productId: {
      type: Types.ObjectId,
      ref: "Product",
      required: [true, "productId is required"],
    },
  },
  { timestamps: true }
);

const reviewModel = model("Review", REVIEWSCHEMA);
export default reviewModel;
