const express = require('express')
const router = express.Router()
const User = require('../models/User')
const bcrypt = require('bcryptjs')

router.post('/users/me', async (req, res) => {
  const user = await User.findOne({ token: req.body.token })
  try {
    if (!user) throw new Error('User not found')    
    res.send(user)
  } catch (error) {
    res.status(404).send(error)
  }
})

router.post('/users', async (req, res) => {
  const user = new User(req.body)
  try {
    await user.save()
    res.status(201).send(user) 
  } catch (error) {
    res.status(400).send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({ name: req.body.name })
    const token = await user.generateAuthToken()
    if (!user) throw new Error('User not found')  

    const isMatch = await bcrypt.compare(req.body.password, user.password)
    if (!isMatch) throw new Error('PW wrong')

    res.send(user)
  } catch (error) {
    res.status(400).send(error)
  }
})

module.exports = router

// const router = require('express').Router();
// const knex = require('../db/connection');

// router.get('/', async (req, res) => {
//     const allRoles = await knex('users')
//         .join('roles', 'role_id', '=', 'roles.id')
//         .select('users.name as user', 'email', 'roles.name as role', 'created_at');
//     res.json(allRoles);
// });

// router.get('/:id', async (req, res, next) => {
//     const roleById = await getById(req.params.id).first();
//     roleById ? res.json(roleById) : next();
// });

// router.post('/', async (req, res) => {
//     const newId = await knex('users').insert(req.body);
//     res.json(await getById(newId).first());
// });

// router.put('/:id', async (req, res, next) => {
//     const updatedRole = await getById(req.params.id).update(req.body);
//     updatedRole === 1 ? res.json(await getById(req.params.id).first()) : next();
// });

// router.delete('/:id', async (req, res, next) => {
//     const deletedRole = await getById(req.params.id).del();
//     deletedRole === 1 ? res.json(deletedRole) : next();
// });

// function getById(id) {
//     return knex('users').where('id', id);
// }

// module.exports = router;