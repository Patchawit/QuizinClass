const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController')
router.get('/Category', adminController.getCategory)
router.post('/Category', adminController.postCategory)
router.delete('/Category', adminController.deleteCategory)
exports.router = router

