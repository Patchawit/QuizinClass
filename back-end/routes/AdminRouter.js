const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController')
router.get('/Category', adminController.getCategory)
router.post('/Category', adminController.postCategory)
router.delete('/Category', adminController.deleteCategory)
router.get('/SetOfQuestion', adminController.getSetOfQuestion)
router.post('/SetOfQuestion', adminController.postSetOfQuestion)
router.patch('/SetOfQuestion', adminController.patchSetOfQuestion)

router.post('/Question', adminController.postQuestion)
exports.router = router

