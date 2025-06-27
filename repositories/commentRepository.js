const Comment = require('../models/comment');

exports.findByBlogIdWithUser = (blogId) => {
  return Comment.find({ blogId }).populate('createdBy');
};

// exports.create = (commentData) => {
//   return Comment.create(commentData);
// }; 

exports.create = async (commentData) => {
  const comment = new Comment(commentData);
  return await comment.save();
};