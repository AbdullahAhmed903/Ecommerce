import { Router } from "express";

import * as cart from "./controller/cart.js";
import { auth } from "../../middleware/Authorization.middle.js";
import cartendpoint from "./cartEndPoint.js";
import * as validators from "./cartValidation.js";
import { validation } from "../../middleware/validation.middle.js";
const cartRouter = Router();

cartRouter.post(
  "/addcart",
  auth(cartendpoint.add),
  validation(validators.addCart),
  cart.addCart
);
cartRouter.delete(
  "/remove/:productId",
  auth(cartendpoint.remove),
  cart.deleteFromCart
);

export default cartRouter;
