import { Router } from "express";
import * as review from "./controller/review.js"
import { auth } from "../../middleware/Authorization.middle.js";
import reviewEndPoint from "./reviewEndPoint.js";
const reviewRouter = Router({ mergeParams: true });





reviewRouter.post("/addcomment",auth(reviewEndPoint.add),review.addreview)
reviewRouter.delete("/removeReview",auth(reviewEndPoint.remove),review.removeReview)




export default reviewRouter;
