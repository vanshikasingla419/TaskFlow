const mongoose = require("mongoose");
const taskSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        trim:true,
        
    },
    completed:{
        type:Boolean,
        default:false,
    },
    dueDate:{
        type:Date,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},
    {
        timestamps:true,
    });
// const userSchema=new mongoose.Schema({
//     username:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true
//     },
//     email:{
//         type:String,
//         required:true,
//         unique:true,
//         trim:true,
//         lowercase:true,
//     },
//     password:{
//         type:String,
//         required:true,
//         minlength:8
//     }
// },
// {
//     timestamps:true
// });
const Task=mongoose.model("Task",taskSchema);
module.exports=Task;