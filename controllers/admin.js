const Admin=require('../models/admin');
const devices=require('../models/devices');
const User=require('../models/user');
const bcrypt=require('bcrypt');
exports.getAdminProfile=(req,res,next)=>{
    User.find()
    .then(users=> {
        res.render('admin/profile',{
            path:'/admin/profile',
            users:users
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.postAdminProfile=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;

    Admin.findOne({email:email})
    .then(admin=>{
        if(!admin){
            res.redirect('/');
        }

        else{
            if(admin.password===password){
                res.redirect('/admin/profile');
            }
            else{
                res.redirect('/');
            }
        }
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getAllDevices=(req,res,next)=>{
    devices.find()
    .then(devices => {
        res.render('admin/devices',{
            path:'/admindevices',
            devices:devices,
        });
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getAddUsers=(req,res,next)=>{
    res.render('admin/addusers',{
        path:'/addusers'
    });
}

exports.postAddUsers=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    
    User.findOne({email:email})
    .then(userDoc=>{
        if(userDoc){
            return res.redirect('/addusers');
        }
        return bcrypt
        .hash(password,12)
        .then(encpassword=>{
            const user=new User({
                email:email,
                password:encpassword
            });

            return user.save();
        })
        .then(result=>{
            res.redirect('/adminusers');
        })
        .catch(err=>{
            console.log(err);
        })
    })
    .catch(err=>{
        console.log(err);
    })
}

exports.getAdminUsers=(req,res,next)=>{
    User.find()
    .then(users=> {
        res.render('admin/adminusers',{
            path:'/adminusers',
            users:users
        });
    })
    .catch(err=>{
        console.log(err);
    })
}