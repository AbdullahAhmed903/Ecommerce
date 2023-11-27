import { Router } from "express";

import * as brand from "./controller/brand.js";
import { auth } from "../../middleware/Authorization.middle.js";
import brandEndPoint from "./brandEndPoint.js";
import { Mymulter, fileValidation } from "../../service/multer.js";
import { validation } from "../../middleware/validation.middle.js";
import * as validators from "./brandValidation.js";
const brandrouter = Router();

brandrouter.post(
  "/addbrand",
  auth(brandEndPoint.add),
  Mymulter(fileValidation.image).single("image"),
  validation(validators.addBrand),
  brand.addBrand
);
brandrouter.patch(
  "/updateBrand/:id",
  auth(brandEndPoint.update),
  Mymulter(fileValidation.image).single("image"),
  brand.updateBrand
);
brandrouter.delete(
  "/deleteBrand/:id",
  auth(brandEndPoint.delete),
  brand.deleteBrand
);
brandrouter.get("/brandProduct", brand.brandProduct);
brandrouter.get("/specificProduct/:id", brand.brandProductById);

export default brandrouter;
