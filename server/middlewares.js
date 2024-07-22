const {expenseSchema} = require("./expenseSchema.js")
const ExpressError = require("./utils/ExpressError.js")

module.exports.isLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
       return res.status(401).json({ error: 'You must be logged in' });
    }
    next();
  };

  module.exports.validateExpense = (req,res,next)=>{
   let result = expenseSchema.validate(req.body)
   if(result.error){
     res.send (new ExpressError(400,result.error.details));
   }else{
     next()
   }
 }