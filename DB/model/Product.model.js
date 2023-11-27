import { Schema, model, Types } from "mongoose";

const productschema = new Schema(
  {
    name: {
      type: String,
      required: [true, "productName is required"],
      unique: true,
      min: [2, "minimum length 2 char"],
      max: [20, "max length 20 char"],
      trim: true,
    },
    slug: String,
    description: String,
    images: [String],
    imagePublicIds: [String],
    newImages: [String],
    stock: {
      type: Number,
      default: 0,
    },
    soldItem: {
      type: Number,
      default: 0,
    },
    amount: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    finalPrice: {
      type: Number,
      default: 0,
    },
    colors: {
      type: [String],
    },
    size: {
      type: [String],
      enum: ["s", "m", "l", "xl", "xxl"],
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
    categoryId: {
      type: Types.ObjectId,
      ref: "Category",
    },
    brandId: {
      type: Types.ObjectId,
      ref: "Brand",
    },
    avgRate: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtual: true },
  }
);
productschema.virtual("review", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
});

const productModel = model("Product", productschema);
export default productModel;
