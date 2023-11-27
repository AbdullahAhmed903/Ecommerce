import { roles } from "../../middleware/Authorization.middle.js";

const brandEndPoint = {
  add: [roles.admin],
  update: [roles.admin],
  delete: [roles.admin],
};

export default brandEndPoint;
