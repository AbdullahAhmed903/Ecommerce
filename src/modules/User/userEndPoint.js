import { roles } from "../../middleware/Authorization.middle.js";
const userEndPoint = {
  logout: [roles.user, roles.admin],
  blocked:[roles.admin],
  delete:[roles.admin],
  get:[roles.admin]

};


export default userEndPoint