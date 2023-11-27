import { Router } from "express";

import * as coupon from "./controller/coupon.js";
import { auth } from "../../middleware/Authorization.middle.js";
import couponendpoint from "./couponEndPoint.js";
const couponRouter = Router();

couponRouter.post("/addcoupon", auth(couponendpoint.add), coupon.createCoupon);
couponRouter.put(
  "/updatecoupon/:id",
  auth(couponendpoint.update),
  coupon.updatedCoupon
);
couponRouter.delete(
  "/deletecoupon/:id",
  auth(couponendpoint.delete),
  coupon.deleteCoupon
);

export default couponRouter;
