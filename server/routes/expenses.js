const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares");
const wrapAsync = require("../utils/wrapAsync");
const {validateExpense} = require("../middlewares")
const { allExpenses, createExpense,updateExpense,deleteExpense } = require("../controllers/expenses");

//All expenses
router.get("/", isLoggedIn, wrapAsync(allExpenses));

//Create expense
router.post("/",isLoggedIn,validateExpense,wrapAsync(createExpense))

//Delete expense
router.delete("/:id",isLoggedIn,wrapAsync(deleteExpense))

module.exports = router;