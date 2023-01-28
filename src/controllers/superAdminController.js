const userModel = require('../models/userModel')
const courseModel = require('../models/courseModel')

const approve = async function(req,res){
try {
	    let data = req.body
	    let courseId = req.params.courseId
	    let approveCourse = await courseModel.findOneAndUpdate({_id:courseId,isDeleted:false},data,{new:true})
	    if (!approveCourse) return res.status(400).send({ status: false, message: "course not found for updation task" })
	    return res.status(200).send({ status: true, data: approveCourse })
} catch (error) {
	return res.status(500).send({ errorMsg: error.message })
}
}

module.exports = {approve}