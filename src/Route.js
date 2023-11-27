import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import morgan from "morgan";
import { globalerr } from "./service/asyncHandler.js";
import authrouter from "./modules/auth/auth.Router.js";
import userrouter from "./modules/User/user.Router.js";
import productrouter from "./modules/product/product.Router.js";
import brandrouter from "./modules/brand/brand.Router.js";
import categoryrouter from "./modules/category/category.Router.js";
import { addAdmin } from "./service/AddAdmin.js";
import couponRouter from "./modules/coupon/couponRouter.js";
import cartRouter from "./modules/cart/cart.Router.js";
import orederRouter from "./modules/order/orderRouter.js";
import wishListRouter from "./modules/wishlist/wishlistRouter.js";
import cors from "cors";
import bodyParser from "body-parser";
const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, "../config/.env") });

export const initlization = (app) => {
  const baseurl = process.env.BASEURL;
  app.use(bodyParser.json({ limit: "20kb" }));
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cors());
  if (process.env.Mood === "DEV") {
    app.use(morgan("dev"));
  } else {
    app.use(morgan("combined"));
  }
  app.use(`${baseurl}/auth`, authrouter);
  app.use(`${baseurl}/user`, userrouter);
  app.use(`${baseurl}/product`, productrouter);
  app.use(`${baseurl}/brand`, brandrouter);
  app.use(`${baseurl}/category`, categoryrouter);
  app.use(`${baseurl}/coupon`, couponRouter);
  app.use(`${baseurl}/cart`, cartRouter);
  app.use(`${baseurl}/order`, orederRouter);
  app.use(`${baseurl}/wishlist`, wishListRouter);

  app.use(globalerr);
  // addAdmin()
};
