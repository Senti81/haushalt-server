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