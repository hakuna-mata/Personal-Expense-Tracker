const mongoose = require("mongoose")
const User = require("./user.js")

const expenseSchema = new mongoose.Schema({
    date:{
        type:Date,
        default:Date.now()
    },
    amount:{
        type:Number,
        required:true,
        min:10
    },
    category:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    }
})

const Expense = mongoose.model("Expense",expenseSchema)

module.exports = Expense;