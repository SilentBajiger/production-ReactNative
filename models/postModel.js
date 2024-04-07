const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Please Add Post Title'],
    },
    description:{
        type:String,
        required:[true,'Please Add Post Descriptions'],
    },
    postedBy:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true,
    }
},{
    timestamps:true
})

module.exports = mongoose.model('Post',postSchema);