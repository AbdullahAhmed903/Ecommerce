import orederModel from "../../../../DB/model/order.model.js";
import reviewModel from "../../../../DB/model/review.model.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const addreview = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { comment, rating } = req.body;
  const { _id } = req.user;

  const check = await reviewModel.findOne({
    userId: _id,
    productId,
  });

  if (check) {
    return next(new Error("Already reviewed by you", { cause: 409 }));
  }
  const checkorder = await orederModel.findOne({
    userId: _id,
    "products.productId": productId,
    status: "received",
  });
  if (!checkorder) {
    return next(
      new Error("Sorry only sold products  can be reviewed", { casue: 400 })
    );
  }
  const review = await reviewModel.create({
    comment,
    rating,
    productId,
    userId: _id,
  });
  return res.status(201).json({ message: "done", review });
});

export const removeReview = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { _id } = req.user;
  const checked = await reviewModel.findOneAndDelete({
    userId: _id,
    productId,
  });
  return checked
    ? res.status(201).json({ message: "done" })
    : next(new Error("in-valid to delete review"));
});
