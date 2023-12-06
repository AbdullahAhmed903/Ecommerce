import { roles } from "../../middleware/Authorization.middle.js";

const categoryendpoint = {
  create: [roles.admin],
  update:[roles.admin],
  getAll:[roles.admin,roles.user]
};

export default categoryendpoint;
