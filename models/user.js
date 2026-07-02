const mongoose = require("mongoose");
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:[true,"username is required"],
        unique:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
    },
    password:{
        type:String,
        required:true,
        minlength:8,
        trim:true,
    },
},
{
    timestamps:true
});
const User=mongoose.model("User",userSchema);
module.exports=User;