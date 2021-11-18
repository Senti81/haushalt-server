require('dotenv').config()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    trim: true
  },
  token: {
    type: String
  }
})

userSchema.methods.generateAuthToken = async function () {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, process.env.JWT_SECRET)
  user.token = token
  await user.save()
  return token
}

const User = mongoose.model('User', userSchema)

module.exports = User