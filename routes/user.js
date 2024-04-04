const express=require('express');
const router=express.Router();

const userControllers=require('../controllers/user')
const isAuth=require('../middleware/isAuth');
router.get('/devices',isAuth,userControllers.getDevices);

router.get('/add-devices',isAuth,userControllers.getAddDevice);

router.get('/devices/:deviceId',isAuth,userControllers.getDashBoard);


router.get('/mailbox',isAuth,userControllers.getMailbox);

router.post('/add-devices',isAuth,userControllers.postAddDevice);

module.exports=router;