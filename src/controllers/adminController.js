const courseModel = require('../models/courseModel')

const course = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Msg: "Request Body can't be empty" })

        if (!data.title) return res.status(400).send({ status: false, msg: "title is mandatory" })
        if (!data.description) return res.status(400).send({ status: false, msg: "description is mandatory" })
        if (!data['video Url']) return res.status(400).send({ status: false, msg: "video Url is mandatory" })
        if (!data.topics) return res.status(400).send({ status: false, msg: "topics is mandatory" })
        if (!data.duration) return res.status(400).send({ status: false, msg: "duration is mandatory" })
        if (!data.category) return res.status(400).send({ status: false, msg: "category is mandatory" })

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
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Msg: "Request Body can't be empty" })
        if (data.approved) return res.status(400).send({ status: false, message: "Admin can not Approve the course" })
        let courseId = req.params.courseId
        let courseUpdate = await courseModel.findOneAndUpdate({ _id: courseId, isDeleted: false }, data, { new: true })
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