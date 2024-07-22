const Expense = require("../models/expense.js");

module.exports.allExpenses = async(req,res,next)=>{
    const expenses = await Expense.find({user:req.user._id}).populate("user");
    res.json(expenses)
}

module.exports.createExpense = async(req,res)=>{
    const{date,amount,category,description}=req.body;
    const expense = new Expense({
        amount,
        category,
        description,
        user:req.user._id
    })
    await expense.save()
    res.status(201).json(expense)
}

module.exports.updateExpense = async(req,res)=>{
    const{id}=req.params;
    let expense = await Expense.findById(id)
    let date = expense.date;
    if(req.user._id.toString()===expense.user.toString()){
    const{amount,category,description}=req.body;
    const updatedExpense = await Expense.findByIdAndUpdate(id,{_id: id, user: req.user._id ,date:date,amount,category,description},{new:true,runValidators:true})
    console.log(updatedExpense);
    res.json({message:"Updated"})
    }else{
        res.json({message:"You are not the owner of this expense"})
    }
}

module.exports.deleteExpense = async(req,res)=>{
    const{id}=req.params;
    let expense = await Expense.findById(id)
    if(req.user._id.toString()===expense.user.toString()){
        let deletedExpense = await Expense.findByIdAndDelete(id);
        console.log(deletedExpense);
        res.json({message:"Deleted"})
    }else{
        res.json({message:"You are not the right person"})
    }
}