const blogModel = require('../models/blogModel')
const commentModel = require('../models/commentModel')
const userModel = require("../models/userModel")
const mongoose = require("mongoose")


/**
 * Controller to add new blog
 */

exports.addNewBlog = async(req,res)=>{
  const {title,description,category,author} = req?.body;

  try {
        // Create a new instance of the Blog model with the request body data
        const newBlog = new blogModel({
          title,
          description,
          category,
          author
        });
        // Save the new blog to the database
        const blogId = await newBlog.save();
        const user = await userModel.findOneAndUpdate(
          { _id: author },
          { $push: { posts: blogId._id } },
          { new: true }
      );
        console.log("blogid: "+blogId._id);
        console.log("user: "+user);

        
        // Send a success response
        res.status(201).json({ message: 'Blog added successfully!', blog: newBlog });
    
  } catch (error) {
    console.error('Error Adding blog:', error);
    res.status(500).send('Internal Server Error');
  }

}


/**
 * Controller to fetch all the blogs 
 */

exports.showAllBlogs = async(req,res)=>{
  try {

    const allBlogs = await blogModel.find({});
    res.status(200).send(allBlogs)
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Controller to fetch all the blogs by users 
 */

exports.showAllBlogsByUser = async(req,res)=>{
  try {

    const {userId} = req?.body;
  
    const allBlogs = await blogModel.find({ author: new mongoose.Types.ObjectId(userId) });
    res.status(200).send(allBlogs);
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Controller to fetch all the blogs by users 
 */

exports.showAllBlogsByCategory = async(req,res)=>{
  try {

    const {category} = req?.body;
  
    const allBlogs = await blogModel.find({ category:category });
    
    res.status(200).send(allBlogs);
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Controller to fetch all the blogs by users 
 */

exports.showAllBlogsByPopularity = async(req,res)=>{
  try {

    const allBlogs = await blogModel.find({});
    allBlogs.sort((a, b) => b.likedBy.length - a.likedBy.length);
    res.status(200).json(allBlogs);
    
  } catch (error) {
    console.error('Error fetching blogs:', error);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Controller to Update the blog 
 */

exports.updateBlog = async(req,res)=>{
  try {

  const {blogId,title,description,category} = req?.body;
  await blogModel.findOneAndUpdate(
    { _id: blogId },
    {   title:title,
        description:description,
        category:category  },
    { new: true }
  );

  res.status(200)
    
  } catch (error) {
    console.error('Error Updating blog:', error);
    res.status(500).send('Internal Server Error');
  }
}


/**
 * Controller to add comment to the blog 
 */

exports.deleteBlog = async(req,res)=>{
  try {
/**
 *  delete all the comments associated with it 
 *  update the associated user by removing the blog id from the posts array in the user
*/    
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Internal Server Error');
  }
}




/**
 * Controller to like unlike blog 
 */

exports.likeUnlikeBlog = async (req, res) => {
  try {
    const { blogId, userId } = req.body;

    // Find the blog by its ID
    const blog = await blogModel.findById(blogId);

    if (!blog) {
      return res.status(404).send('Blog not found');
    }

    // Check if the user has already liked the blog
    const userIndex = blog.likedBy.indexOf(userId);

    if (userIndex === -1) {
      // User has not liked the blog, so add the userId to the likedBy array
      blog.likedBy.push(userId);
    } else {
      // User has already liked the blog, so remove the userId from the likedBy array
      blog.likedBy.splice(userIndex, 1);
    }

    // Save the updated blog
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    console.error('Error liking/unliking blog:', error);
    res.status(500).send('Internal Server Error');
  }
};

/**
 * Controller to add comment to the blog 
 */

exports.addCommentToBlog = async(req,res)=>{
  try {
    const {blogId,userId,content} = req?.body;

      const newComment = new commentModel({
        post:blogId,
        user:userId,
        content:content,
      });
      await newComment.save();

  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).send('Internal Server Error');
  }
}


/**
 * Controller to update the blog to the comment 
 */

exports.updateBlogComment = async(req,res)=>{
  try {
    const {commentId,content} = req?.body;
    await commentModel.findOneAndUpdate(
      { _id: commentId },
      {  
        content:content
        },
      { new: true }
    );
  
    
  } catch (error) {
    console.error('Error updating comments:', error);
    res.status(500).send('Internal Server Error');
  }
}

/**
 * Controller to show the blog's all comment 
 */

exports.showBlogComments = async(req,res)=>{
  try {

    const {blogId} = req?.body;
    const allComments = await commentModel.find({ post: new mongoose.Types.ObjectId(blogId) });
    res.status(200).send(allComments);
    
  } catch (error) {
    console.error('Error fetching comments:', error);
    res.status(500).send('Internal Server Error');
  }
}


/**
 *  Controller to delete comment 
 * */

exports.deleteBlogComment = async(req,res)=>{
  try {

    const {commentId} = req?.body;
    await commentModel.findByIdAndDelete(commentId);
    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error deleting comments:', error);
    res.status(500).send('Internal Server Error');
  }
}


/**
 * Controller to like unlike comment 
 */


exports.likeUnlikeComment = async (req, res) => {
  try {
    const { commentId, userId } = req.body;

    const comment = await commentModel.findById(commentId);

    const userIndex = comment.likedBy.indexOf(userId);

    if (userIndex === -1) {
      blog.likedBy.push(userId);
    } else {
      blog.likedBy.splice(userIndex, 1);
    }
    await blog.save();
    res.status(200).json(blog);
  } catch (error) {
    console.error('Error liking/unliking blog:', error);
    res.status(500).send('Internal Server Error');
  }
};


/**
 * Controller to add reply to the blog comment 
 */

exports.addReplyToTheComments = async(req,res)=>{
  try {
    const {commentId,userId,content} = req?.body;

    await commentModel.findOneAndUpdate(
      { _id: commentId },
      { $push: { replies:{
        user:userId,
        content:content
      } } },
      { new: true }
    );
    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error adding reply to comment:', error);
    res.status(500).send('Internal Server Error');
  } 
}


/**
 * Controller to update reply of the blog comment 
 */

exports.updateReplyToTheComments = async(req,res)=>{
  try {
    const { commentId, replyId, content } = req.body;

    await commentModel.findOneAndUpdate(
      { _id: commentId, 'replies._id': replyId },
      { $set: { 'replies.$.content': content, 'replies.$.updatedAt': new Date() } },
      { new: true }
    );
    res.sendStatus(200);
  } catch (error) {
    console.error('Error updating comment reply:', error);
    res.status(500).send('Internal Server Error');
  } 
}




/**
 * Controller to delete reply of the blog comment 
 */

exports.deleteReplyToTheComments = async(req,res)=>{
  try {
    const {commentId,replyId} = req?.body;
    await commentModel.findOneAndUpdate(
      { _id: commentId },
      { $pull: { replies: { _id: replyId } } },
      { new: true }
    );

    res.sendStatus(200);
    
  } catch (error) {
    console.error('Error deleting comment reply:', error);
    res.status(500).send('Internal Server Error');
  } 
}



/**
 * Controller to like unlike comment reply 
 */

exports.likeUnlikeCommentReply = async (req, res) => {
  try {
    const { commentId, replyId, userId } = req.body;

    // Find the comment by its ID
    const comment = await commentModel.findById(commentId);

    if (!comment) {
      return res.status(404).send('Comment not found');
    }

    const reply = comment.replies.id(replyId);

    if (!reply) {
      return res.status(404).send('Reply not found');
    }

    const userIndex = reply.likedBy.indexOf(userId);

    if (userIndex === -1) {
      reply.likedBy.push(userId);
    } else {
      reply.likedBy.splice(userIndex, 1);
    }
    await comment.save();

    res.status(200).json(comment);
  } catch (error) {
    console.error('Error liking/unliking reply:', error);
    res.status(500).send('Internal Server Error');
  }
};


/**
 * Show all writers
 */
exports.showAllWritters = async(req,res)=>{
  try {
  
    const allWritters = await userModel.find({ role:"Writer" });
    res.status(200).send(allWritters);
    
  } catch (error) {
    console.error('Error fetching writters:', error);
    res.status(500).send('Internal Server Error');
  }
}

