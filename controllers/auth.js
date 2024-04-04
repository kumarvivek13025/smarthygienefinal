const path=require('path');
const User=require('../models/user');
const bcrypt=require('bcrypt');
const devices=require('../models/devices');
exports.postLogin=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    User.findOne({email:email})
    .then(user=>{
        if(!user){
            return res.redirect('/');
        }

        bcrypt.compare(password,user.password)
        .then(doMatch=>{
            if(doMatch){
                req.session.isLoggedIn = true;
                req.session.user = user;
                return req.session.save(err => {
                    console.log(err);
                    res.redirect('/profile');
                })
            }
            res.redirect('/');
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}


exports.getProfile=(req,res,next)=>{
    const user=req.user.email;
    const id=req.user._id.toString();
    devices.find()
    .then(devices => {
        res.render('user/profile',{
            path:'/profile',
            devices:devices,
            user:user,
            id:id
        });
    })
    .catch(err => console.log(err));
}

exports.getLogin=(req,res,next)=>{
    res.render('auth/login',{
        path:'/login'
    });
}


exports.postLogOut=(req,res,next)=>{
    req.session.destroy(err=>{
        console.log(err);
        res.redirect('/');
    });
}