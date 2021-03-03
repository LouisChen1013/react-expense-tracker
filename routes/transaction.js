const express = require("express");
const router = express.Router();
const {getTransactions, addTransaction, deleteTransaction} = require("../controllers/transactionController");

// app.get('/', (req,res) => res.send('hello'));
// router.get('/', (req,res) => res.send('hello'));

// chainable route handlers
// path /, method get/post/delete, function getTransaction
router
  .route("/")
  .get(getTransactions)
  .post(addTransaction); //we can use the same route since its sending to the same path

router
  .route("/:id")
  .delete(deleteTransaction);

module.exports = router;
