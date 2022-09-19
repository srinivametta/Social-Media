const passport=require('passport');
const LocalStrategy=require('passport-local').Strategy;
const User=require('../model/UserSchema');


passport.use(new LocalStrategy({usernameField:'email'},

function (my_email,my_password,done) {
    // find a user and establish his identity
    User.findOne({email:my_email},function (err,user_info) {
        if (err) {
            console.log(err);
            return done(err);
        }

        else if(!user_info||user_info.password!=my_password){
            return done(null,false);
        }

        return done(null,user_info);
    });

}));



passport.serializeUser(function (user,done) {
    done(null,user.id);
});


passport.deserializeUser(function (id,done) {
    User.findById(id,function (err,user) {
        if (err) {
            console.log("Error");
            return done(err);
        }

        else{
            return done(null,user);
        }
    });
});

passport.setAuthenticatedUser=function (req,res,next) {
    if (req.isAuthenticated()) {
        // req.user contains info of current user from session cookie and sending this to locals for the views
            //console.table(`This is a trial ${req.user}`); //the info is stored in user key, cannot be changed
            res.locals.user=req.user;
    }

    return next();
};

passport.giveAccessIfAuthenticated=function (req,res,next) {
    if (req.isAuthenticated()) {
        return next();
    }

    return res.redirect('/');
}

passport.revokeAccessIfAuthenticated=function (req,res,next) {
    if (req.isAuthenticated()) {
        return res.redirect(`/profile/${req.user.id}`);
    }

    return next();
}


// it is user for sign in
passport.AuthenticateUser=passport.authenticate(
    'local',
    {failureRedirect:'/'} //if the given credentials don't match with the stored ones.
);