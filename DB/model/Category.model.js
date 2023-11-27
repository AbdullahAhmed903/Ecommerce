import { Schema, model, Types } from "mongoose";

const categoryschema = new Schema(
  {
    name: {
      type: String,
      required: [true, "categoryName is required"],
      unique: true,
      min: [2, "minimum length 2 char"],
      max: [20, "max length 2 char"],
    },
    image: String,
    createdBy: {
      type: Types.ObjectId,
      ref: "User",
      required: true,
    },
    updatedBy: {
      type: Types.ObjectId,
      ref: "User",
    },
    imagePublicId: String,
    slug: String,
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true }
  }
);
categoryschema.virtual("product", {
  ref: "Product",
  localField: "_id",
  foreignField: "categoryId",
});

const categoryModel = model("Category", categoryschema);
export default categoryModel;
