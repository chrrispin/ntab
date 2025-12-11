import React from "react";
import Trends from "../components/Trends";
import MainArticles from "../components/MainArticles";

const Africa: React.FC = () => {
  return (
    <div>
      <Trends />
      <MainArticles />
      {/* You can customize content specific to Africa here */}
    </div>
  );
};

export default Africa;
