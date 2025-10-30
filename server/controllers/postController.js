// postController.js - Controller for post-related operations

const Post = require("../models/Post");
const { validationResult } = require("express-validator");

// @desc    Get all posts
// @route   GET /api/posts
// @access  Public
const getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const category = req.query.category;
    const search = req.query.search;

    let query = { isPublished: true };

    // Filter by category if provided
    if (category) {
      query.category = category;
    }

    // Search functionality
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
        { excerpt: { $regex: search, $options: "i" } },
      ];
    }

    const posts = await Post.find(query)
      .populate("author", "username avatar")
      .populate("category", "name slug color")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();

    const count = await Post.countDocuments(query);

    res.status(200).json({
      success: true,
      data: posts,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(count / limit),
        totalPosts: count,
        hasNext: page * limit < count,
        hasPrev: page > 1,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Get single post
// @route   GET /api/posts/:id
// @access  Public
const getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      $or: [{ _id: req.params.id }, { slug: req.params.id }],
      isPublished: true,
    })
      .populate("author", "username avatar")
      .populate("category", "name slug color")
      .populate("comments.user", "username avatar");

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Increment view count
    await post.incrementViewCount();

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Create new post
// @route   POST /api/posts
// @access  Private (Admin only)
const createPost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const { title, content, excerpt, category, tags, isPublished } = req.body;

    const post = await Post.create({
      title,
      content,
      excerpt,
      category,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      author: req.user.id,
      isPublished: isPublished || false,
      featuredImage: req.file ? req.file.filename : undefined,
    });

    const populatedPost = await Post.findById(post._id)
      .populate("author", "username avatar")
      .populate("category", "name slug color");

    res.status(201).json({
      success: true,
      data: populatedPost,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Post with this title already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Update post
// @route   PUT /api/posts/:id
// @access  Private (Admin only)
const updatePost = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Not authorized to update this post",
      });
    }

    const { title, content, excerpt, category, tags, isPublished } = req.body;

    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      {
        title,
        content,
        excerpt,
        category,
        tags: tags ? tags.split(",").map((tag) => tag.trim()) : post.tags,
        isPublished: isPublished !== undefined ? isPublished : post.isPublished,
        featuredImage: req.file ? req.file.filename : post.featuredImage,
      },
      { new: true, runValidators: true }
    )
      .populate("author", "username avatar")
      .populate("category", "name slug color");

    res.status(200).json({
      success: true,
      data: updatedPost,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        error: "Post with this title already exists",
      });
    }
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Delete post
// @route   DELETE /api/posts/:id
// @access  Private (Admin only)
const deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    // Check if user is the author or admin
    if (post.author.toString() !== req.user.id && req.user.role !== "admin") {
      return res.status(401).json({
        success: false,
        error: "Not authorized to delete this post",
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

// @desc    Add comment to post
// @route   POST /api/posts/:id/comments
// @access  Private
const addComment = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: "Post not found",
      });
    }

    const { content } = req.body;

    await post.addComment(req.user.id, content);

    const updatedPost = await Post.findById(req.params.id)
      .populate("author", "username avatar")
      .populate("category", "name slug color")
      .populate("comments.user", "username avatar");

    res.status(201).json({
      success: true,
      data: updatedPost.comments[updatedPost.comments.length - 1],
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  addComment,
};
