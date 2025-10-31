import React from "react";

const WikiArticle = ({ article }) => {
  return (
    <div className="tw-bg-white tw-rounded-lg tw-shadow-md tw-p-6 tw-mb-4">
      <div className="tw-flex tw-items-start tw-space-x-4">
        {article.thumbnail && (
          <img
            src={article.thumbnail.source}
            alt={article.title}
            className="tw-w-24 tw-h-24 tw-object-cover tw-rounded"
          />
        )}
        <div className="tw-flex-1">
          <h2 className="tw-text-xl tw-font-bold tw-mb-2">{article.title}</h2>
          <p className="tw-text-gray-600 tw-mb-4">{article.extract}</p>
          <a
            href={`https://en.wikipedia.org/wiki/${article.title.replace(
              / /g,
              "_"
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="tw-text-blue-600 hover:tw-text-blue-800 tw-transition-colors"
          >
            Read more on Wikipedia →
          </a>
        </div>
      </div>
    </div>
  );
};

export default WikiArticle;
