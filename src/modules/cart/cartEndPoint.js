import { roles } from "../../middleware/Authorization.middle.js";

const cartendpoint = {
  add: [roles.user, roles.admin],
  remove: [roles.user, roles.admin],

};

export default cartendpoint;
