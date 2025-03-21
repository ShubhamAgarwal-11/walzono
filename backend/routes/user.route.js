const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');
const {upload} = require('../middlewares/multer.middleware');
const partnerController = require('../controllers/partner.controller');


// user routes

router.post('/user-register',userController.register);
router.post('/login',userController.login);
router.get('/logout',userController.logout);
router.post('/contact',userController.contactUs);
router.post('/notifyMe',userController.notifyMe)
module.exports = router;