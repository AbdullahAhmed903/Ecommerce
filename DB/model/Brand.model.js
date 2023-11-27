import { Schema, model, Types } from "mongoose";

const brandschema = new Schema(
  {
    name: {
      type: String,
      required: [true, "brandName is required"],
      unique: true,
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
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
    image: String,
    imagePublicId: String,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  }
);
brandschema.virtual("Brandproduct", {
  ref: "Product",
  localField: "_id",
  foreignField: "brandId",
});

const brandModel = model("Brand", brandschema);

export default brandModel;
