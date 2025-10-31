import React from "react";
import Navbar from "../Components/Navbar";
import useProfile from "../hooks/useProfile";
import useWikipediaArticles from "../hooks/useWikipediaArticles";
import WikiArticle from "../Components/WikiArticle";

const Explore = () => {
  const { isLogin } = useProfile();
  const {
    articles,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refreshArticles,
  } = useWikipediaArticles();

  return (
    <>
      <Navbar isLogin={isLogin} />
      <hr />
      <div className="container tw-py-8">
        <div className="tw-flex tw-justify-between tw-items-center tw-mb-8">
          <h1 className="tw-text-3xl tw-font-bold">Explore Tech Articles</h1>
          <button
            onClick={refreshArticles}
            className="tw-bg-blue-500 hover:tw-bg-blue-600 tw-text-white tw-px-4 tw-py-2 tw-rounded-lg tw-transition-colors"
            disabled={loading}
          >
            {loading ? "Refreshing..." : "Refresh Articles"}
          </button>
        </div>

        <div className="tw-mb-6">
          <input
            type="text"
            placeholder="Search articles..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="tw-w-full tw-px-4 tw-py-2 tw-border tw-border-gray-300 tw-rounded-lg focus:tw-outline-none focus:tw-ring-2 focus:tw-ring-blue-500"
          />
        </div>

        {loading && (
          <div className="tw-flex tw-justify-center tw-items-center tw-min-h-[200px]">
            <div className="tw-animate-spin tw-rounded-full tw-h-12 tw-w-12 tw-border-t-2 tw-border-b-2 tw-border-blue-500"></div>
          </div>
        )}

        {error && (
          <div className="tw-bg-red-100 tw-border tw-border-red-400 tw-text-red-700 tw-px-4 tw-py-3 tw-rounded tw-mb-4">
            <p>Error loading articles: {error}</p>
          </div>
        )}

        {articles.length === 0 && !loading && !error && (
          <div className="tw-text-center tw-py-8 tw-text-gray-600">
            No articles found matching your search.
          </div>
        )}

        <div className="tw-grid tw-gap-6 md:tw-grid-cols-2">
          {articles.map((article, index) => (
            <WikiArticle key={index} article={article} />
          ))}
        </div>
      </div>
    </>
  );
};

export default Explore;
