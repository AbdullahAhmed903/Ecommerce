import { roles } from "../../middleware/Authorization.middle.js";

const couponendpoint = {
  add: [roles.admin],
  update:[roles.admin],
  delete:[roles.admin]

};


export default couponendpoint;