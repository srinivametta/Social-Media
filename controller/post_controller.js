const Posts=require('../model/PostSchema');
const Comment=require('../model/CommentSchema');
// const { populate } = require('../model/CommentSchema');

module.exports={
    
    home:async function (req,res) {

        let post_info= await Posts.find({}).populate('user');
        
                // console.log(posts_info);
        return res.render('./post',{
                posts:post_info,
        });
            
            
    },


    add_posts:function (req,res) {
        
        req.body.user=req.user._id;
        Posts.create(req.body,function (err,user_info) {
           if (err) {
            console.log(`There is an error in adding post error ->${err}`);
           }

           else{
            console.log("Successfully added new post");
           }

        });

        res.redirect('back');
    },

    delete_posts:function (req,res) {
        


        if (typeof req.body.post_id===typeof []) {
            
            
            for(let post_id of req.body.post_id){
                Posts.findById(post_id,function (err,select_post) {
                    if (err) {
                        console.log(`There is an error in finding post ${err}`);
                    }
                    
                    else if (req.user.id==select_post.user) {
                        for(let comment of select_post.comment){
                            Comment.findByIdAndDelete(comment,function (err,comment_info) {
                                if (err) {
                                    console.log(`There is an error in deleting comment ${err}`);
                                } 
                            });
                        }
                        
                        select_post.remove();
                    }
                });
                
            }
        }

        else if(req.body.post_id!=undefined){
            Posts.findById(req.body.post_id,function (err,select_post) {
                if (err) {
                    console.log(`There is an error in finding post ${err}`);
                }
                
                else if (req.user.id==select_post.user) {
                    for(let comment of select_post.comment){
                        Comment.findByIdAndDelete(comment,function (err,comment_info) {
                            if (err) {
                                console.log(`There is an error in deleting comment ${err}`);
                            } 
                        });
                    }
                    
                    select_post.remove();
                }
            });
            
        }
        
        return res.redirect(`/profile/${req.user.id}`);

    },

    comment:function (req,res) {
        
        // console.log("here is console -> ",req.params.post_id);  
        
            
        
        Posts.findOne({_id:req.params.post_id})
        .populate('user')
        .populate({
            path:'comment',
            populate:{
                path:'user',
            }
        })
        .exec(function (err,post_info) {

            if (err) {
                console.log(`Error in loading comments ->${err}`);
            }

            res.render('./comment',{
                post:post_info,
            });
        });
        
    
    },

    add_comment:function (req,res) {

        
        req.body.user=req.user._id;

        Comment.create(req.body,function (err,comment_info) {
            
            if(err){
                console.log(`error in adding comment into db -> ${err}`);
            }

            else{
                // console.log(comment_info);
                Posts.findOne({_id:req.body.post},function (err,post_info) {

                    if (err) {
                        console.log(`The error is in the ${err}`);
                    }
                    else{
                        post_info.comment.push(comment_info._id);
                        post_info.save();
                    }
                });
            }
            
        });

        res.redirect('/posts/comment/'+req.body.post);
    },

    delete_comment:async function (req,res) {

        try {
            let comment_info=await Comment.findByIdAndDelete(req.params.comment_id);
            let post_info=await Posts.findByIdAndUpdate(comment_info.post,{$pull:{comment:comment_info._id}});
            res.redirect('/posts/comment/'+post_info._id);
        }

        catch (err) {
            console.log(`Error here in deleting comment ->`+err);
        }

    }

    

}