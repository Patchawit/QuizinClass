const express = require('express')
const isTeacher = require('../middleware/is-teacher')
const router = express.Router()
const adminController = require('../controllers/AdminController')
router.get('/Category/:Email',isTeacher, adminController.getCategory)
router.post('/Category', isTeacher, adminController.postCategory)
router.delete('/Category', adminController.deleteCategory)
router.get('/SetOfQuestion', adminController.getSetOfQuestions)
router.get('/SetOfQuestion/:Email/:catagory', adminController.getSetOfQuestionbyUser)
router.get('/Editque/:SetOfQuestionId', adminController.getSetOfQuestionbyId)
router.post('/SetOfQuestion', adminController.postSetOfQuestion)
router.patch('/SetOfQuestion', adminController.patchSetOfQuestion)
router.delete('/SetOfQuestion/:SetOfQuestionId', adminController.deleteSetOfQuestion)

router.post('/Question', adminController.postQuestion)
router.patch('/Question', adminController.patchQuestion)
router.delete('/Question', adminController.deleteQuestion)

router.post('/PatchScore', adminController.patchScore)
router.get('/Score/:SetOfQuestionId', adminController.getScore)

router.post('/CreateLobby/:SetOfQuestionId', adminController.CreateLobby)

exports.router = router

