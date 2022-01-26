const express = require('express')
const router = express.Router()
const adminController = require('../controllers/AdminController')
router.get('/Category', adminController.getCategory)
router.post('/Category', adminController.postCategory)
exports.router = router

