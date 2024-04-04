exports.get404=(req,res,next)=>{
    res.render('404notfound',{
        path:'/404'
    });
}