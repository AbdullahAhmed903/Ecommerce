import { asyncHandler } from "../../../service/asyncHandler.js";
import cuponModel from "../../../../DB/model/Coupon.model.js";

export const createCoupon = asyncHandler(async (req, res, next) => {
  req.body.createdBy = req.user._id;
  //   const { date } = req.body;
  req.body.expireDate = new Date(req.body.expireDate);
  const testCoupon = await cuponModel.findOne({ name: req.body.name });
  if (testCoupon) {
    return next(new Error("Coupon name is already exist", { cause: 409 }));
  }
  const coupon = await cuponModel.create(req.body);
  return res.status(200).json({ message: "done" });
});

export const updatedCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  req.body.updatedBy = req.user._id;
  if (req.body.expireDate) {
    req.body.expireDate = new Date(req.body.expireDate);
  }
  const findCoupon = await cuponModel.findByIdAndUpdate({ _id: id }, req.body, {
    new: true,
  });
  return findCoupon
    ? res.status(200).json({ message: "done" })
    : next(new Error("in-Valid couponId", { cause: 404 }));
});

export const deleteCoupon = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const coupon = await cuponModel.findByIdAndDelete({ _id: id });
  return coupon
    ? res.status(201).json({ message: "done" })
    : next(new Error("in-valid couponId", { cause: 404 }));
});
