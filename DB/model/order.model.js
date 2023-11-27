import { Types, model, Schema } from "mongoose";

const ORDERSCHEMA = new Schema({
  userId: {
    type: Types.ObjectId,
    ref: "User",
  },
  products: [
    {
      productId: {
        type: Types.ObjectId,
        ref: "Product",
      },
      amount: {
        type: Number,
        default: 1,
      },
      unitPrice: {
        type: Number,
      },
      totalPrice: {
        type: Number,
        default: 1,
      },
    },
  ],
  address: {
    type: String,
    required: [true, "address is required"],
  },
  phone: {
    type: String,
    required: [true, "phone is required"],
  },
  paymentMethod: {
    type: String,
    default: "Cash",
    enum: ["Cash", "Visa"],
  },
  couponId: {
    type: Types.ObjectId,
    ref: "Coupon",
  },
  status: {
    type: String,
    default: "placed",
    enum: ["placed", "received", "rejected", "onWay"],
  },
  priceBeforeCoupon: {
    type: Number,
    default: 1,
  },
  totalPrice: {
    type: Number,
    default: 1,
  },
});

const orederModel = model("Order", ORDERSCHEMA);
export default orederModel;
