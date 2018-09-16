import * as mongoose from "mongoose";

const TodoSchema : mongoose.Schema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:2,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        minlength:5,
        trim:true,
    },
    done:{
        type:Boolean,
        default:false
    }
})



const Todo =  mongoose.model("Todo",TodoSchema)
export default Todo;