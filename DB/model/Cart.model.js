import { Types,model,Schema } from "mongoose";

const CARTSCHEMA=new Schema({
    userId:{
        type:Types.ObjectId,
        ref:"User",
        unique:true
    },
    products:[{
        productId:{
            type:Types.ObjectId,
            ref:"Product"
        },
        quantity:{
            type:Number,
            default:1
        }
    }]
},{
    timestamps:true
})

const cartModel=model("Cart",CARTSCHEMA);
export default cartModel;