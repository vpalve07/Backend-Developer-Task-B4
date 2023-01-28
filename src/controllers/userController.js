const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const user = async function (req, res) {
    try {
        let data = req.body
        const saltRounds = data.password.length
        bcrypt.hash(data.password, saltRounds, (err, hash) => {
            if (err) {
              throw err;
            }
            data.password = hash
          });
        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, data: createUser })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

const login = async function (req, res) {
    try {
        let data = req.body
        let checkUser = await userModel.findOne({ email: data.email, password: data.password })
        if (!checkUser) return res.status(400).send({ status: false, message: "Wrong login Credentials" })
        let payload = { userId: checkUser._id.toString(), email: checkUser.email, role: checkUser.role }
        let token = jwt.sign(payload, 'bonus3')
        res.setHeader('x-api-key', token)
        return res.status(200).send({ status: true, message: `${checkUser.role} is logged in successfully`, token: token })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

module.exports = { user, login }