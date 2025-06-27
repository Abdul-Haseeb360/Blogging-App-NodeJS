const blogRepository = require("../repositories/blogRepository");
const commentRepository = require("../repositories/commentRepository");

exports.getAllBlogs = async () => {
  return blogRepository.getAll();
};

exports.getBlogWithComments = async (blogId) => {
  const blog = await blogRepository.findByIdWithUser(blogId);
  const comments = await commentRepository.findByBlogIdWithUser(blogId);
  return { blog, comments };
};

exports.createNewBlog = async (user, title, body, file) => {
  if (!title || !body || !title.trim() || !body.trim()) {
    throw new Error("Title and body are required.");
  }

  const coverImageURL = file ? file.path : "";

  return await blogRepository.create({
    body,
    title,
    createdBy: user._id,
    coverImageURL,
  });
};

exports.addCommentToBlog = async (user, blogId, content) => {
  return await commentRepository.create({
    content,
    blogId,
    createdBy: user._id,
  });
};
