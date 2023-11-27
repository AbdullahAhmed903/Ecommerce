import { roles } from "../../middleware/Authorization.middle.js";

const reviewEndPoint = {
  add: [roles.user, roles.admin],
  remove:[roles.user,roles.admin]
};

export default reviewEndPoint;
