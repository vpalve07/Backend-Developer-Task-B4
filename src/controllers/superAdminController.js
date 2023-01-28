const courseModel = require('../models/courseModel')

const approve = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length == 0) return res.status(400).send({ status: false, Msg: "Request Body can't be empty" })
        let courseId = req.params.courseId
        let approveEnum = courseModel.schema.obj.approved.enum
        if (!approveEnum.includes(data.approved)) {
            return res.status(400).send({ status: false, msg: "title should be 'yes','no' " })
        }
        let approveCourse = await courseModel.findOneAndUpdate({ _id: courseId, isDeleted: false }, data, { new: true })
        if (!approveCourse) return res.status(400).send({ status: false, message: "course not found for updation task" })
        return res.status(200).send({ status: true, data: approveCourse })
    } catch (error) {
        return res.status(500).send({ errorMsg: error.message })
    }
}

module.exports = { approve }