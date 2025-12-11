import React from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Trends from "./components/Trends";
import MainArticles from "./components/MainArticles";
import Header from "./components/Header";

export default function App(): React.ReactNode {
  
  return (
    <div className="min-h-screen bg-white text-slate-900">
      <Header />
      <Navbar />
      <Trends />
      <MainArticles />
      <Footer />
    </div>
  );
}
