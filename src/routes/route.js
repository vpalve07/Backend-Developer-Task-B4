const express = require('express')
const { course, updateCourse, deleteCourse } = require('../controllers/adminController')
const { employeeCourse } = require('../controllers/employeeController')
const { approve } = require('../controllers/superAdminController')
const { user, login } = require('../controllers/userController')
const { Authentication, admin, superAdmin, employee } = require('../middlewares/middleware')
const router = express.Router()

router.get('/test-me', function (req, res) {
    res.send({ test: "Test-API" })
})

router.post('/user', user)
router.post('/login', login)


router.post('/course', Authentication, admin, course)
router.put('/course/:courseId', Authentication, admin, updateCourse)
router.delete('/course/:courseId', Authentication, admin, deleteCourse)


router.put('/course/:courseId/approve', Authentication, superAdmin, approve)


router.get('/course', Authentication, employee, employeeCourse)



router.all("/*", function (req, res) { res.status(404).send({ status: false, msg: "Invalid HTTP request" }) })

module.exports = router