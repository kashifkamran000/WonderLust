const User = require('../models/user');

module.exports.signUpPage = (req, res)=>{
    res.render('users/signup.ejs')
};

module.exports.registerUser = async(req, res)=>{
    try{
        let {email, username, password} = req.body;
        const newUser = new User({email, username});
        const registeredUser = await User.register(newUser, password);
        req.login(registeredUser, (err)=>{
            if(err){
                return next(err);
            }
            res.redirect('/listings');
        })
    }catch(e){
        res.redirect('/signup');
        console.log(e);
    }
};

module.exports.login = (req, res)=>{
    res.render('users/login.ejs');
};

module.exports.loginUser = async(req, res)=>{
    let redirectUrl = res.locals.redirectUrl || '/listings';
    res.redirect(redirectUrl);
};

module.exports.logOutUser = (req,res)=>{
    req.logOut((err)=>{
        res.redirect('/listings');
    })
};