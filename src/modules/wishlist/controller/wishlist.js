import userModel from "../../../../DB/model/User.model.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const addWishList = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const wishlist = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $addToSet: { wishlist: productId } }
  );
  return wishlist
    ? res.status(201).json({ message: "done" })
    : next(new Error("some thing wrong", { casue: 400 }));
});

export const removeWishList = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const wishlist = await userModel.findOneAndUpdate(
    { _id: req.user._id },
    { $pull: { wishlist: productId } }
  );
  return wishlist
    ? res.status(201).json({ message: "done" })
    : next(new Error("some thing wrong", { casue: 400 }));
});
