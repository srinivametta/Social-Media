const express=require('express');
const route=express.Router();
const postControl=require('../controller/post_controller');

const passport=require('passport');

route.get('/',postControl.home);


// its /posts
route.post('/add-post',passport.giveAccessIfAuthenticated,postControl.add_posts);
route.get('/comment/:post_id',postControl.comment);
route.post('/add-comment',passport.giveAccessIfAuthenticated,postControl.add_comment);
route.post('/delete-post',passport.giveAccessIfAuthenticated,postControl.delete_posts);
route.get('/delete-comment/:comment_id',postControl.delete_comment);
module.exports=route;