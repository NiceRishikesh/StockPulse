const express = require('express')
const router = express.Router()
const blogController = require("../controller/blogController");


// CREATE | UPDATE | DELETE BLOGS
router.post("/add-new-blog",blogController.addNewBlog);
router.post("/update-blog",blogController.updateBlog);
router.post("/delete-blog",blogController.deleteBlog);

// READ BLOGS
router.get("/show-all-blogs",blogController.showAllBlogs);
router.post("/get-user-blogs",blogController.showAllBlogsByUser);
router.post("/show-blogs-by-category"),blogController.showAllBlogsByCategory;
router.get("/get-blogs-by-popularity",blogController.showAllBlogsByPopularity);

// CREATE | READ | UPDATE | DELETE BLOGS
router.post("/add-comment",blogController.addCommentToBlog);
router.post("/update-comment",blogController.updateBlogComment);
router.post("/show-blog-comments",blogController.showBlogComments)
router.post("/delete-comment",blogController.deleteBlogComment);

// CREATE | READ | UPDATE | DELETE COMMENT REPLIES
router.post("/add-reply-to-comment",blogController.addReplyToTheComments);
router.post("/update-comment-reply",blogController.updateReplyToTheComments);
router.post("/delete-comment-reply",blogController.deleteReplyToTheComments);


//LIKE || UNLIKE BLOG || COMMENT || COMMENT REPLY
router.post("/like-unlike-blog",blogController.likeUnlikeBlog);
router.post("/like-unlike-comment",blogController.likeUnlikeComment);
router.post("/like-unlike-comment-reply",blogController.likeUnlikeCommentReply);

// Writer Activities
router.get("/show-all-writters",blogController.showAllWritters);




module.exports = router
