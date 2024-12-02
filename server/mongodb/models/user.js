import mongoose from "mongoose";

const userSchema= new mongoose.Schema({
    name :{ type:String , required:true },
    role:{type:String , required: true},
    email:{type:String },
    avatar:{type:String },

})

const userModel= mongoose.model('User', userSchema);

export default userModel;