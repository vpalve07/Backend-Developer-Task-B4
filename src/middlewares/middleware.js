const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')


const Authentication = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: "token is required" })
        jwt.verify(token, "bonus3", function (err, decode) {
            if (err) { return res.status(401).send({ status: false, data: "Authentication Failed" }) };
            req.decode = decode;
            next()
        })
    }
    catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const admin = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: "token is required" })
        if (req.decode.role !== 'Admin') return res.status(401).send({ status: false, data: "Authorization Failed" })
        next()
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const superAdmin = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: "token is required" })
        if (req.decode.role !== 'Super Admin') return res.status(401).send({ status: false, data: "Authorization Failed" })
        next()
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

const employee = function (req, res, next) {
    try {
        let token = req.headers['x-api-key']
        if (!token) return res.status(400).send({ status: false, msg: "token is required" })
        if (req.decode.role !== 'Employee') return res.status(401).send({ status: false, data: "Authorization Failed" })
        next()
    } catch (error) {
        res.status(500).send({ status: false, errorType: error.name, errorMsg: error.message })
    }
}

module.exports = { Authentication, admin, superAdmin, employee }