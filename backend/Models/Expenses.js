import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema({
    title: {type: String, require: true},
    amount: {type: Number, require: true},
    type: {
            type: String, 
            enum: ['expense', 'income']
        },
    category: {
        type: String,        
    },
    date: {
        type: String
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',        
    }
}, {timestamps: true})


export default mongoose.model('Expenses', expenseSchema)