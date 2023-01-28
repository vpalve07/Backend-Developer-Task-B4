const userModel = require('../models/userModel')
const courseModel = require('../models/courseModel')

const course = async function (req, res) {
    try {
        let data = req.body
        data.category = data.category.toLowerCase()
        if (data.approved) return res.status(400).send({ status: false, message: "Admin can not Approve the course" })
        let createCourse = await courseModel.create(data)
        return res.status(201).send({ status: true, data: createCourse })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}


const updateCourse = async function (req, res) {
    try {
        let data = req.body
        if (data.approved) return res.status(400).send({ status: false, message: "Admin can not Approve the course" })
        let courseId = req.params.courseId
        
        let courseUpdate
        if(!data.pdf||!data['video Url']||!data.quiz) courseUpdate = await courseModel.findOneAndUpdate({ _id: courseId, isDeleted: false },{ $unset: data }, { new: true })
        
        courseUpdate = await courseModel.findOneAndUpdate({ _id: courseId, isDeleted: false }, data, { new: true })
        if (!courseUpdate) return res.status(400).send({ status: false, message: "course not found for updation task" })
        
        return res.status(200).send({ status: true, data: courseUpdate })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}


const deleteCourse = async function (req, res) {
    try {
        let courseId = req.params.courseId
        let courseDelete = await courseModel.findOneAndUpdate({ _id: courseId, isDeleted: false }, { isDeleted: true }, { new: true })
        if (!courseDelete) return res.status(400).send({ status: false, message: "course not found for deletion task" })
        return res.status(200).send({ status: true, message: "Course deleted successfully" })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

module.exports = { course, updateCourse, deleteCourse }