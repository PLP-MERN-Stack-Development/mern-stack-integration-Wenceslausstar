import { useState, useEffect } from "react";

const useWikipediaArticles = () => {
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const techTopics = [
    "Artificial_intelligence",
    "Machine_learning",
    "Quantum_computing",
    "Blockchain",
    "Internet_of_things",
    "Cloud_computing",
    "Cybersecurity",
    "Virtual_reality",
    "Web3",
    "DevOps",
    "Edge_computing",
    "Computer_vision",
    "Natural_language_processing",
    "Augmented_reality",
    "Robotics",
    "5G",
    "Big_data",
    "Data_science",
    "Digital_transformation",
    "Neural_network",
  ];

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        setLoading(true);
        const promises = techTopics.map(async (topic) => {
          const response = await fetch(
            `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
          );
          if (!response.ok) throw new Error("Failed to fetch article");
          return response.json();
        });

        const results = await Promise.all(promises);
        setArticles(results);
        setFilteredArticles(results);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredArticles(articles);
      return;
    }

    const filtered = articles.filter((article) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        article.title.toLowerCase().includes(searchLower) ||
        article.extract.toLowerCase().includes(searchLower)
      );
    });
    setFilteredArticles(filtered);
  }, [searchTerm, articles]);

  const refreshArticles = async () => {
    setLoading(true);
    setError(null);
    try {
      const promises = techTopics.map(async (topic) => {
        const response = await fetch(
          `https://en.wikipedia.org/api/rest_v1/page/summary/${topic}`
        );
        if (!response.ok) throw new Error("Failed to fetch article");
        return response.json();
      });

      const results = await Promise.all(promises);
      setArticles(results);
      setFilteredArticles(results);
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return {
    articles: filteredArticles,
    loading,
    error,
    searchTerm,
    setSearchTerm,
    refreshArticles,
  };
};

export default useWikipediaArticles;
