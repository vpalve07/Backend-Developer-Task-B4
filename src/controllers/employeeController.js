const courseModel = require('../models/courseModel')


const employeeCourse = async function (req, res) {
    try {
        let findCourse = await courseModel.find({ isDeleted: false, approved: 'yes' }).sort({ category: 1 }).select({ createdAt: 0, updatedAt: 0, __v: 0 })
        if (findCourse.length == 0) return res.status(400).send({ status: false, message: "Courses not found" })
        return res.status(200).send({ status: true, data: findCourse })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}


module.exports = { employeeCourse }