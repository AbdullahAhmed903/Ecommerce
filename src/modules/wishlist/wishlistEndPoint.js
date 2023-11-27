import { roles } from "../../middleware/Authorization.middle.js";

const wishEndPoint = {
  add: [roles.user],
  remove:[roles.user]
};
export default wishEndPoint;
