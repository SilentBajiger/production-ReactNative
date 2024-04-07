const Post = require("../models/postModel");


const createPostController = async(req,res) =>{
    try {
        const {title,description} = req.body;
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:'Please Provide All Fields',
            })
        }
        const post = await Post({title,description,postedBy:req.auth._id});
        // console.log(req);
        post.save();

        return res.status(201).send({
            success:true,
            message:"Post Created Successfully",
            post
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:true,
            message:"Error in Create Post Api",
            error
        })
    }
}

const getAllPostsController = async(req,res)=>{
    try {
        const posts = await Post.find().populate('postedBy','_id name').sort({createdAt:-1});
        return res.status(200).send({success:true,message:'All Posts Data',posts});
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in getting All Posts",
            error
        });
    }
}

// Get User Posts
const getUserPostController = async(req,res)=>{
    try {

        const userPosts = await Post.find({postedBy:req.auth._id});
        return res.status(200).send({
            success:true,
            message:"User Posts",
            userPosts,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in Getting User Post API",
            error
        });
    }
}

const deletePostController = async(req,res)=>{
    try {
        const {id} = req.params;
        await Post.findByIdAndDelete({_id:id});
        return res.status(200).send({
            success:true,
            message:"Post Deleted Successfully",
        });
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:'Error in Delete Post Api',
            error,
        });
    }
}

const updatePostController = async(req,res)=>{
    try {
        const {title,description} = req.body;
        const post = await Post.findById({_id:req.params.id});
        if(!title || !description){
            return res.status(500).send({
                success:false,
                message:"Please Provide Post title And Descrption",
            })

        } 
        const updatedPost = await Post.findByIdAndUpdate({_id:req.params.id},{
            title:title || post?.title,
            description:description || post?.description,
        },{new:true});
        return res.status(200).send({
            success:true,
            message:"Post Updated Successfully",
            updatedPost,
        })

    } catch (error) {
        console.log(error);
        return res.status(500).send({
            success:false,
            message:"Error in update Post APi",
            error,
        })
    }
}

module.exports = {updatePostController,deletePostController,createPostController,getAllPostsController,getUserPostController};