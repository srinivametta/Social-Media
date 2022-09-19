const User=require('../model/UserSchema');



module.exports={

    home:function (req,res) {
        res.render('./home');
    },

    add_user:function (req,res) {
        if (req.body.password!=req.body.confirm_password) {
            return res.redirect('back');
        }

        User.findOne({email:req.body.email},function (err,user_find_info) {
            
            if (!user_find_info) {
                
                User.create(req.body,function (err,userInfo) {
                    if (err) {
                        console.log(`error in adding user ${err}`);
                    }
                
                    else{
                        console.log("successfully added new user");
                        return res.redirect('back');
                    }
                });
            }

            else{
                return res.redirect('back');
            }

            
        });

    },

    verify_user:function (req,res) {
        res.redirect(`/profile/${req.user.id}`);
    }

};