const User=require('../model/UserSchema');
const Posts=require('../model/PostSchema');
const Friend=require('../model/FriendSchema');

module.exports={

    profile:async function (req,res) {
        

        
            let post_info=await Posts.find({user:req.params.id}).populate('user')//.exec(function (err,post_info) {
                
            //     if (err) {
            //         console.log(`error in finding post with user user ${err}`);
            //     }
                
            //     return res.render('./profile',{posts:post_info});
                
            // });

            let user_info=await User.findById(req.params.id);

            let friend_accepted=await Friend.find({$or:[{friend_send:req.params.id},{friend_recieve:req.params.id}],accepted:true}).populate('friend_send').populate('friend_recieve');
            let friend_send=await Friend.find({friend_recieve:req.params.id,accepted:false}).populate('friend_send');
            let friend_recieved=await Friend.find({friend_send:req.params.id,accepted:false}).populate('friend_recieve');

            return res.render('./profile',{
                posts:post_info,
                users:user_info,
                friends:friend_accepted,
                friend_recieved:friend_recieved,
                friend_send:friend_send,
            });

        
    },

    sign_out:function (req,res) {
        // res.clearCookie('bhimSocial');
        let profile_id=req.user._id;
        req.logout(function (err) {
            if (err) {   
                console.log('error',err);
            }
        });
        return res.redirect(`back`);
    },

    friend_request:async function (req,res) {

        let friend_send_info=await Friend.find({friend_send:req.user._id,friend_recieve:req.params.friend_id});
        let friend_recieve_info=await Friend.find({friend_send:req.params.friend_id,friend_recieve:req.user._id});

        if (friend_send_info.length==0 && friend_recieve_info.length==0 && req.user.id!==req.params.friend_id) {
            req.body.friend_send=req.user._id;
            req.body.friend_recieve=req.params.friend_id;
            req.body.accepted=false;
            let friend_info=await Friend.create(req.body);
            console.log("friend request sent");
        }

        return res.redirect('back');
    }
    
}