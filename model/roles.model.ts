import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
    {
        title: String,
        description: String,
        permissions:{
            type:Array,
            default:[]
        },
        deleted :{
            type:Boolean,
            default: false
        },
        deleteAt: Date
    },{
        timestamps: true
    }
);
const role = mongoose.model("role", roleSchema, "roles");
export default role