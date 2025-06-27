const Blog = require('../models/blog');

exports.findByIdWithUser = (blogId) => {
  return Blog.findById(blogId ).populate('createdBy');
};

exports.create = (data) => {
  return Blog.create(data);
};

exports.getAll = () => {
  return Blog.find({});
}; 

