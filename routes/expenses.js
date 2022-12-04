const express = require('express')
const Expense = require('../models/Expense')
const auth = require ('../middlewares/auth')
const router = express.Router()

router.get('/expenses', auth, async (req, res) => {
    try {
        const result = await Expense.find()
        res.send(result)    
      } catch (error) {
        res.status(400).send(error)
      }
});

router.get('/expenses/:id', auth, async (req, res, next) => {
    try {
        const result = await Expense.findById(req.params.id)
        if (!result)
          return res.status(404).send()
        res.send(result)    
      } catch (error) {
        res.status(400).send(error)
      }
});


router.post('/expenses', auth, async (req, res) => {
    const expense = new Expense(req.body)
    try {
        await expense.save()
        res.status(201).send(expense)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.put('/expenses/:id', auth, async (req, res, next) => {
    const updates = Object.keys(req.body)

    try {
        const expense = await Expense.findById(req.params.id)
        if (!expense)
            return res.status(404).send()

        updates.forEach(element => expense[element] = req.body[element])
        await expense.save()
        res.send(expense)
    } catch (error) {
        res.status(500).send(error)
    }
});

router.delete('/expenses/:id', auth, async (req, res, next) => {
    try {
        const result = await Expense.findByIdAndDelete(req.params.id)
        if(!result)
          return res.status(404).send()
        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router;