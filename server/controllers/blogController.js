const BlogPost = require('../models/BlogPost');

const getBlogPosts = async (req, res) => {
  const posts = await BlogPost.find().sort({ date: -1, order: 1 });
  res.json(posts);
};

const getBlogPostById = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (post) {
    res.json(post);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const createBlogPost = async (req, res) => {
  const { title, excerpt, content, image, date, order } = req.body;
  const post = new BlogPost({ title, excerpt, content, image, date, order });
  const created = await post.save();
  res.status(201).json(created);
};

const updateBlogPost = async (req, res) => {
  const { title, excerpt, content, image, date, order } = req.body;
  const post = await BlogPost.findById(req.params.id);
  if (post) {
    post.title = title || post.title;
    post.excerpt = excerpt || post.excerpt;
    post.content = content || post.content;
    post.image = image || post.image;
    post.date = date || post.date;
    post.order = order !== undefined ? order : post.order;
    const updated = await post.save();
    res.json(updated);
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

const deleteBlogPost = async (req, res) => {
  const post = await BlogPost.findById(req.params.id);
  if (post) {
    await post.deleteOne();
    res.json({ message: 'Post removed' });
  } else {
    res.status(404).json({ message: 'Post not found' });
  }
};

module.exports = { getBlogPosts, getBlogPostById, createBlogPost, updateBlogPost, deleteBlogPost };
