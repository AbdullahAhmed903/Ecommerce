import { Types, Schema, model } from "mongoose";

const CUPONSCHEMA = new Schema(
  {
    name: {
      type: String,
      required: true,
      min: [2, "minimum length is 2 char"],
      max: [2, "minimum length is 2 char"],
      trim: true,
    },
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    usedBy: [
      {
        type: Types.ObjectId,
        ref: "User",
      },
    ],
    amount: {
      type: Number,
      default: 1,
      min: [1, "minimum is 1%"],
      max: [100, "maximum is 100%"],
    },
    expireDate: Date,
  },
  {
    timestamps: true,
  }
);

const cuponModel = model("Cupon", CUPONSCHEMA);
export default cuponModel;
