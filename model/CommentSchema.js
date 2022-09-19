const mongoose=require('mongoose');


const commentSchema=new mongoose.Schema({

    content:{
        type:String,
        required:true,
    },

    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Posts',
        required:true,
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true,
    }

});

module.exports=mongoose.model('Comment',commentSchema);