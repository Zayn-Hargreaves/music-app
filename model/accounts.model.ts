import mongoose from "mongoose";
const accountSchema = new mongoose.Schema(
    {
        fullName: String,
        email:String,
        password:String,
        token:String,
        phone:String,
        avatar:String,
        role_id:String,
        status:String,
        deleted :{
            type:Boolean,
            default: false
        },
        deleteAt: Date
    },{
        timestamps: true
    }
);
const account = mongoose.model("account", accountSchema, "accounts");
export default account;