import { Router } from "express";

import * as wishList from "./controller/wishlist.js";
import { auth } from "../../middleware/Authorization.middle.js";
import wishEndPoint from "./wishlistEndPoint.js";

const wishListRouter = Router({ mergeParams: true });

wishListRouter.patch("/add", auth(wishEndPoint.add), wishList.addWishList);
wishListRouter.patch("/remove", auth(wishEndPoint.remove), wishList.removeWishList);


export default wishListRouter;
