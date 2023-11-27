import cuponModel from "../../../../DB/model/Coupon.model.js";
import productModel from "../../../../DB/model/Product.model.js";
import orederModel from "../../../../DB/model/order.model.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const createOreder = asyncHandler(async (req, res, next) => {
  const { products } = req.body;
  const { couponname } = req.query;
  const { _id } = req.user;
  let sumTotal = 0;
  const finalList = [];
  for (const product of products) {
    const check = await productModel.findOne({
      _id: product.productId,
      stock: { $gte: product.amount },
    });
    if (!check) {
      return next(new Error("in-Valid to place this order", { cause: 409 }));
    }
    product.totalPrice = check.finalPrice * product.amount;
    sumTotal += product.totalPrice;
    product.unitPrice = check.finalPrice;
    finalList.push(product);
  }
  req.body.totalPrice = sumTotal;
  req.body.priceBeforeCoupon = sumTotal;
  if (couponname) {
    const checkedCoupon = await cuponModel.findOne({
      name: couponname,
      usedBy: { $nin: _id },
    });
    req.body.couponId = checkedCoupon._id;
    if (!checkedCoupon) {
      return next(new Error("in-Valid coupon", { casue: 409 }));
    } else {
      req.body.totalPrice = sumTotal - sumTotal * (checkedCoupon.amount / 100);
    }
  }
  req.body.userId = _id;
  req.body.products = finalList;
  const order = await orederModel.create(req.body);
  if (order) {
    if (couponname) {
      await cuponModel.findOneAndUpdate(
        { name: couponname },
        { $addToSet: { usedBy: _id } }
      );
    }
    return res.status(201).json({ message: "done", order });
  } else {
    return next(new Error("fail to place your order", { casue: 400 }));
  }
});
