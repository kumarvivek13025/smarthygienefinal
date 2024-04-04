const express=require('express')
const path=require('path');
const app=express();
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const session=require('express-session');
const MongoDBStore=require('connect-mongodb-session')(session);

const MONGODB_URI='mongodb+srv://kumarvivek13025:Bina13025@cluster0.w2ddnqg.mongodb.net/smarthygine';
const User=require('./models/user');
const Admin=require('./models/admin');



Admin.findOne({email:"saloni@gmail.com"})
    .then(userDoc=>{
        if(userDoc){
            return res.redirect('/admin/profile');
        }
        const admin=new Admin({
            email:"saloni@gmail.com",
            password:"saloni"
        })

        admin.save()
    })
    .catch(err=>{
        console.log(err);
    })
app.set('view engine','ejs')
app.set('views','views')
const store=new MongoDBStore({
    uri:MONGODB_URI,
    collection:'sessions'
})

app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));
app.use(session({
    secret: 'my secret',
    resave: false,
    saveUninitialized: false,
    store: store
}))

app.use((req,res,next)=>{
    if(!req.session.user){
        return next();
    }
    User.findById(req.session.user._id)
    .then(user=>{
        req.user=user;
        next();
    })
    .catch(err=>{
        console.log(err);
    })
})

const authRoutes=require('./routes/auth');
const userRoutes=require('./routes/user');
const adminRoutes=require('./routes/admin');
const errorController=require('./controllers/error');
app.use(authRoutes);
app.use(userRoutes);

app.use(adminRoutes);
app.use(errorController.get404);

mongoose.connect(MONGODB_URI)
.then(result=>{
    app.listen(3000);
})
.catch(err=>{
    console.log(err);
})
