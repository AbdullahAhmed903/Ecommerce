import { Router } from "express";

import * as product from "./controller/product.js";
import { auth } from "../../middleware/Authorization.middle.js";
import productendpoint from "./peoduct.endpoint.js";
import { Mymulter, fileValidation } from "../../service/multer.js";
import wishListRouter from "../wishlist/wishlistRouter.js";
import reviewRouter from "../review/reviewRouter.js";
import * as validators from "./productValidation.js";
import { validation } from "../../middleware/validation.middle.js";
const productrouter = Router();
productrouter.use("/:productId/wishlist", wishListRouter);
productrouter.use("/:productId/review", reviewRouter);
productrouter.post(
  "/createProduct",
  auth(productendpoint.add),
  Mymulter(fileValidation.image).array("images", 15),
  validation(validators.createProduct),
  product.addprodcut
);
productrouter.get("/getSpecificProduct", product.getproductByname);
productrouter.get("/product/:id", product.getproductById);
productrouter.put(
  "/updateproduct/:id",
  auth(productendpoint.update),
  Mymulter(fileValidation.image).array("images", 20),
  product.updateproduct
);
productrouter.delete(
  "/deleteProduct/:id",
  auth(productendpoint.delete),
  product.deleteProduct
);
productrouter.get("/productList", product.productList);
productrouter.get("/sellingProduct", product.getBestSellingProducts);
productrouter.get("/arrivalProducts", product.getArrivalProducts);



export default productrouter;
