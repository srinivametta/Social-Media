const mongoose=require('mongoose');

const friend_Schema=mongoose.Schema({
    // who is sending
    friend_send:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },

    // who is recieving
    friend_recieve:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'User'
    },


    accepted:{
        type:Boolean,
        required:true
    }

},{
    timestamps:true,
});


module.exports=mongoose.model('Friend',friend_Schema);