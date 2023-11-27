import { roles } from "../../middleware/Authorization.middle.js";


 const productendpoint={
    add:[roles.admin],
    update:[roles.admin],
    delete:[roles.admin]
}

export default productendpoint