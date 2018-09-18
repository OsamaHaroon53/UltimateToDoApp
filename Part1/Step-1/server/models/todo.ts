import * as mongoose from "mongoose";
import { ObjectId, ObjectID } from "bson";
mongoose.set('useFindAndModify', false);

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
    },
    _id:{
        type:Object,
        required:true
    }

})



const Todo =  mongoose.model("Todo",TodoSchema)
export default Todo;