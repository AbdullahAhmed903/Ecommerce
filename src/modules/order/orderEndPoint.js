import { roles } from "../../middleware/Authorization.middle.js";

const orderEndPoint = {
  makeOrder: [roles.user],
};


export default orderEndPoint
