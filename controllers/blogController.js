const blogService = require('../services/blogService');

// Render add blog page
exports.renderAddBlog = (req, res) => {
  return res.render('addBlog', { user: req.user });
};

// Render blog detail page with blog + comments
exports.getBlogById = async (req, res) => {
  try {
    const { blog, comments } = await blogService.getBlogWithComments(req.params.id);
    return res.render('blog', { user: req.user, blog, comments });
  } catch (err) {
    console.error(err);
    res.status(500).send('Error loading blog');
  }
};

// Handle blog creation with validation
exports.createBlog = async (req, res) => {
  const { title, body } = req.body;
  try {
    const blog = await blogService.createNewBlog(req.user, title, body, req.file);
    return res.redirect(`/blog/${blog._id}`);
  } catch (err) {
    return res.status(400).render('addBlog', {
      user: req.user,
      error: err.message || 'Could not create blog',
    });
  }
};

// Handle comment creation
exports.addComment = async (req, res) => {
  try {
    await blogService.addCommentToBlog(req.user, req.params.blogId, req.body.content);
    return res.redirect(`/blog/${req.params.blogId}`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Failed to add comment');
  }
};
