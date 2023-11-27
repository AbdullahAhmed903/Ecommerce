import { Router } from "express";
import { auth } from "../../middleware/Authorization.middle.js";
import userEndPoint from "./userEndPoint.js";

import * as user from "./controller/user.js";

const userrouter = Router();

userrouter.put("/signOut", auth(userEndPoint.logout), user.signOut);
userrouter.put(
  "/blockedAccount/:id",
  auth(userEndPoint.blocked),
  user.blockAccount
);
userrouter.put(
  "/deleteAccount/:id",
  auth(userEndPoint.delete),
  user.deleteAccount
);
userrouter.get("/users", auth(userEndPoint.get), user.getUsers);

export default userrouter;
