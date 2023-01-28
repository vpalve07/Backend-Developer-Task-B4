const userModel = require('../models/userModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

const user = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Msg: "Request Body can't be empty" })

        if (!data.name) return res.status(400).send({ status: false, msg: "name is mandatory" })
        if (!data.email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if (!data.password) return res.status(400).send({ status: false, msg: "password is mandatory" })
        if (!data.role) return res.status(400).send({ status: false, msg: "role is mandatory" })

        const validName = /^[a-z A-Z_]{3,20}$/
        const emailRegex = /^[a-z]{1}[a-z0-9._]{1,100}[@]{1}[a-z]{2,15}[.]{1}[a-z]{2,10}$/
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

        if (!validName.test(data.name)) return res.status(400).send({ status: false, Msg: "User Name can not contain numerical values or special characters" })
        if (!emailRegex.test(data.email)) return res.status(400).send({ status: false, Msg: "email format is Invalid" })
        if (!passwordRegex.test(data.password)) return res.status(400).send({ status: false, Msg: "Password should contain at least 8 and max 15 characters with 1 upper, lower case and special char" })

        const saltRounds = data.password.length
        let emailCheck = await userModel.findOne({ email: data.email })
        if (emailCheck) return res.status(403).send({ status: false, msg: "Email Id is already exist" })

        let roleEnum = userModel.schema.obj.role.enum
        if (!roleEnum.includes(data.role)) {
            return res.status(400).send({ status: false, msg: "title should be 'Admin','Super Admin','Employee' " })
        }

        let hash = await bcrypt.hash(data.password, saltRounds)
        data.password = hash

        let createUser = await userModel.create(data)
        return res.status(201).send({ status: true, data: createUser })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

const login = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Msg: "Request Body can't be empty" })

        let { password, email } = data
        if (!password) return res.status(400).send({ status: false, msg: "password is mandatory" })
        if (!email) return res.status(400).send({ status: false, msg: "email is mandatory" })
        if (Object.keys(data).length > 2) return res.status(400).send({ status: false, msg: "request body can only contain email and password" })

        let checkUser = await userModel.findOne({ email: data.email })
        if(!checkUser) return res.status(400).send({ status: false, message: "Email ID is Wrong" })
        bcrypt.compare(data.password, checkUser.password, (err, pass) => {
            if (err) { throw err; }
            if (pass) {
                let payload = { userId: checkUser._id.toString(), email: checkUser.email, role: checkUser.role }
                let token = jwt.sign(payload, 'bonus3')
                res.setHeader('x-api-key', token)
                return res.status(200).send({ status: true, message: `${checkUser.role} is logged in successfully`, token: token })
            } else {
                return res.status(400).send({ status: false, message: "Password is wrong" })
            }
        });

    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

module.exports = { user, login }