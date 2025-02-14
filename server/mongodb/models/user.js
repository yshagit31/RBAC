import mongoose from "mongoose";
import roles from './constants.js'
const userSchema= new mongoose.Schema({
    name :{ type:String , required:false },
    // role:{type:String , required: true},
    email:{type:String, unique: true, required: true},
    password:{type:String, required:false },
    role :{type:String, enum:[roles.admin, roles.moderator,roles.client],default:roles.client },
    avatar:{type:String },
    lastLogin:{type:Date, default:null},
    // authMethod:{
    //     type: String,
    //     enum:["google","local"],
    //     required:true
    // },
    createdAt:{type:Date ,default:Date.now},
});

const userModel= mongoose.model('User', userSchema);

export default userModel;