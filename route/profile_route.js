const express=require('express');
const route=express.Router();
const profileContol=require('../controller/profile_controller');
const passport=require('passport');

route.get('/:id',profileContol.profile);
route.get('/',function (req,res) {
    if (req.user) {
        return res.redirect(`/profile/${req.user.id}`);
    }
    res.redirect('/');
});
route.post('/sign-out',passport.giveAccessIfAuthenticated,profileContol.sign_out);
route.post('/friend_request/:friend_id',passport.giveAccessIfAuthenticated,profileContol.friend_request);

module.exports=route;