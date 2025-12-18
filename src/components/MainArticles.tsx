import React, { useState, useEffect } from "react";
import FeaturedSections from "./FeaturedSections";
import RightSidebar from "./RightSidebar";
import LeftMainSection from "./LeftMainSection";
import News4Section from "./News4Section";
import News5Section from "./News5Section";
import News7Section from "./News7Section";
import SampleArticleCard from "./SampleArticleCard";
import Loading from "./Loading";
import { fetchArticles } from "../services/api";
import { defaultArticles, type Article } from "../data/defaultArticles";

const MainArticles: React.FC = () => {
  const [articles, setArticles] = useState<Article[]>(defaultArticles);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadArticles = async () => {
      try {
        setLoading(true);
        const data = await fetchArticles();
        // Use backend data if we have 5+ articles, otherwise use defaults
        if (data && data.length >= 5) {
          setArticles(data);
        } else {
          setArticles(defaultArticles);
        }
        setError(null);
      } catch (err) {
        console.error("Failed to load articles:", err);
        setArticles(defaultArticles);
      } finally {
        setLoading(false);
      }
    };

    loadArticles();
  }, []);

  if (loading) return <Loading />;

  return (
    <main className="px-4 py-6 max-w-7xl mx-auto grid gap-6 grid-cols-1 lg:grid-cols-3">
      {error && (
        <div className="lg:col-span-3 bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded">
          {error}
        </div>
      )}
      {/* Left - main articles wide */}
      <LeftMainSection articles={articles} />

      {/* Right - side columns */}
      <RightSidebar articles={articles} />

      {/* featured / lower sections spanning full width */}
      <News4Section articles={articles} />

      {/* news5, news6, news7 are similar - render simple grids or lists dynamically */}
      <News5Section articles={articles} />
      <SampleArticleCard />
      <News7Section articles={articles} />
      <FeaturedSections articles={articles} />

    </main>
  );
};

export default MainArticles;