const express=require('express')

const router=express.Router();

const isAuth=require('../middleware/isAuth');
const authController=require('../controllers/auth');

router.get('/',authController.getLogin);


router.get('/profile',isAuth,authController.getProfile);

router.post('/profile',authController.postLogin);

router.post('/logout',authController.postLogOut);

module.exports=router;