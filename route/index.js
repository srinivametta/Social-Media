const express=require('express');
const route=express.Router();
const homeControl=require('../controller/home_controller');
const passport=require('passport');

route.get('/',passport.revokeAccessIfAuthenticated,homeControl.home);
route.post('/add-user',homeControl.add_user);
route.post('/verify-user',passport.AuthenticateUser,homeControl.verify_user);

// everyting profile
route.use('/profile',require('./profile_route'));

// everything post
route.use('/posts',require('./posts_route'));


module.exports=route;