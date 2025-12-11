import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Style: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Style;
