import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
        minlength: 1,
        trim:true
    },
    _userId : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    _listId : {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    completed : {
        type:Boolean,
        default: false
    }
});

export const Task = mongoose.model('Task', TaskSchema);