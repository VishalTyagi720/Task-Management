import mongoose from "mongoose";


const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    dueDate: {
        type: Date,
        required: true
    },
    userRef: {
        type: String,
        required: true
    }
}, {timestamps: true})


const Tasks = mongoose.model('Tasks', taskSchema);


export default Tasks;