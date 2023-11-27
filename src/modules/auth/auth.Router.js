import { Router } from "express";

import * as auth from "./controller/auth.js";
import * as validators from "./auth.validation.js";
import { validation } from "../../middleware/validation.middle.js";

const authrouter = Router();

authrouter.post("/signup", validation(validators.signup), auth.signup);
authrouter.get(
  "/confirmEmail/:token",
  validation(validators.confirmemail),
  auth.confirmemail
);
authrouter.post("/login", validation(validators.login), auth.login);

export default authrouter;
