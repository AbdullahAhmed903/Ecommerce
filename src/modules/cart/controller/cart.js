import cartModel from "../../../../DB/model/Cart.model.js";
import { asyncHandler } from "../../../service/asyncHandler.js";

export const addCart = asyncHandler(async (req, res, next) => {
  const { _id } = req.user;
  const { products } = req.body;
  const findcart = await cartModel.findOne({ userId: _id });
  if (!findcart) {
    const cart = await cartModel.create({
      userId: _id,
      products,
    });
    return res.status(201).json({ message: "done", cart });
  } else {
    for (const product of products) {
      let match = false;
      for (let i = 0; i < findcart.products.length; i++) {
        if (product.productId == findcart.products[i].productId.toString()) {
          findcart.products[i] = product;
          match = true;
          break;
        }
      }
      if (!match) {
        findcart.products.push(product);
      }
    }
    await cartModel.findOneAndUpdate(
      { userId: _id },
      {
        products: findcart.products,
      },
      { new: true }
    );
    return res.status(200).json({ message: "done", findcart });
  }
});

export const deleteFromCart = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const remove = await cartModel.updateOne(
    {
      "products.productId": productId,
    },
    { $pull: { products: { productId: productId } } }
  );
  res.status(200).json({ message: "done", remove });
});
