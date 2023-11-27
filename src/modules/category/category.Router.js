import { Router } from "express";

import * as category from "./controller/category.js";

import { auth } from "../../middleware/Authorization.middle.js";
import categoryendpoint from "./category.endpoint.js";
import { Mymulter, fileValidation } from "../../service/multer.js";
const categoryrouter = Router();

categoryrouter.post(
  "/createCategory",
  auth(categoryendpoint.create),
  Mymulter(fileValidation.image).single("image"),
  category.createCategory
);
categoryrouter.get("/categoryProduct", category.categoryProduct);
categoryrouter.get("/categoryProductById/:id", category.categoryProductbyid);

export default categoryrouter;
