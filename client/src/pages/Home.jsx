// Home.jsx - Home page component

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/app";
import useApi from "../hooks/useApi";
import { postService, categoryService } from "../services/api";
import "./Home.css";

const Home = () => {
  const { posts, categories, fetchPosts, fetchCategories } = useApp();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Fetch categories on mount
  useEffect(() => {
    if (categories.length === 0) {
      fetchCategories();
    }
  }, [categories.length, fetchCategories]);

  // Fetch posts when filters change
  useEffect(() => {
    fetchPosts({
      page: currentPage,
      limit: 10,
      category: selectedCategory,
      search: searchTerm,
    });
  }, [currentPage, selectedCategory, searchTerm, fetchPosts]);

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setCurrentPage(1);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div className="home">
      <div className="home-header">
        <h1>Welcome to MERN Blog</h1>
        <p>Discover amazing stories and insights</p>
      </div>

      <div className="filters">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search posts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => handleCategoryChange(e.target.value)}
            className="category-select"
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="posts-grid">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts found.</p>
          </div>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post-card">
              {post.featuredImage && (
                <img
                  src={`http://localhost:5000/${post.featuredImage}`}
                  alt={post.title}
                  className="post-image"
                />
              )}
              <div className="post-content">
                <h2 className="post-title">
                  <Link to={`/posts/${post._id}`}>{post.title}</Link>
                </h2>
                <p className="post-excerpt">{post.excerpt}</p>
                <div className="post-meta">
                  <span className="post-author">By {post.author.username}</span>
                  <span className="post-date">
                    {formatDate(post.createdAt)}
                  </span>
                  <span
                    className="post-category"
                    style={{ backgroundColor: post.category.color }}
                  >
                    {post.category.name}
                  </span>
                </div>
                <div className="post-stats">
                  <span>{post.viewCount} views</span>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {posts.length > 0 && (
        <div className="pagination">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="pagination-button"
          >
            Previous
          </button>
          <span className="pagination-info">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={posts.length < 10}
            className="pagination-button"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
