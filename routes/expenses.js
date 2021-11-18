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
    // const expenseById = await getById(req.params.id).first();
    // expenseById ? res.json(expenseById) : next();
});

// router.get('/users/:id', verify, async (req, res, next) => {
//     const expensesByUser = await knex('expenses').where('user_id', req.params.id);
//     expensesByUser.length > 0 ? res.json(expensesByUser) : next();
// });

router.post('/expenses', async (req, res) => {
    const expense = new Expense(req.body)
    try {
        await expense.save()
        res.status(201).send(expense)
    } catch (error) {
        res.status(400).send(error)
    }
    // const newId = await knex('expenses').insert({
    //     amount: req.body.amount,
    //     user_id: req.user.id
    // });
    // res.json(await getById(newId).first());
});

router.put('/expenses/:id', async (req, res, next) => {
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
    // const updatedExpense = await getById(req.params.id).update(req.body);
    // updatedExpense === 1 ? res.json(await getById(req.params.id).first()) : next();
});

router.delete('/expenses/:id', async (req, res, next) => {
    try {
        const result = await Expense.findByIdAndDelete(req.params.id)
        if(!result)
          return res.status(404).send()
        res.send(result)
    } catch (error) {
        res.status(400).send(error)
    }
    // const deletedExpense = await getById(req.params.id).del();
    // deletedExpense === 1 ? res.json(deletedExpense) : next();
});

// function getById(id) {
//     return knex('expenses').where('id', id);
// }

module.exports = router;