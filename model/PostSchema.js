const mongoose=require('mongoose');


const PostSchema=new mongoose.Schema({
    content:{
        type:'String',
        required:true,
        unique:true
    },

    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },

    comment:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comment',
        required:true,
    }],

},{
    timestamps:true,
});



module.exports=mongoose.model('Posts',PostSchema);