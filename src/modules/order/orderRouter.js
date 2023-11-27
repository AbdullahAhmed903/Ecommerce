import { Router } from "express";

import * as order from "./controller/order.js";
import { auth } from "../../middleware/Authorization.middle.js";
import orderEndPoint from "./orderEndPoint.js";
const orederRouter = Router();

export default orederRouter;



orederRouter.post("/createOrder",auth(orderEndPoint.makeOrder),order.createOreder)