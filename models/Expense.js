const mongoose = require('mongoose')

const expenseSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
    trim: true
  },
  name: {
    type: String,
    required: true,
    trim: true
  }
}, {
  timestamps: true
})

const Expense = mongoose.model('Expense', expenseSchema)

module.exports = Expense