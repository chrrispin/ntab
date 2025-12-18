import React from "react";
import { Link } from "react-router-dom";
import { type Article, PLACEHOLDER, defaultArticles } from "../data/defaultArticles";
import BadgeLive from "./BadgeLive";

const truncate = (text: string | undefined | null, len = 120) => {
  if (!text) return "";
  return text.length > len ? text.slice(0, len).trim() + "…" : text;
};

interface FeaturedSectionsProps {
  articles: Article[];
}

const FeaturedSections: React.FC<FeaturedSectionsProps> = ({ articles }) => {
  const news1 = articles.filter((a) => a.section === "news1");
  const news2 = articles.filter((a) => a.section === "news2");
  const news3 = articles.filter((a) => a.section === "news3");
  const news4 = articles.filter((a) => a.section === "news4");
  
  const trendingFlagged = articles.filter((a) => a.isTrending);
  const trending = (trendingFlagged.length ? trendingFlagged : articles).slice(0, 6);

  const hotFlagged = articles.filter((a) => a.isHot);
  const hotNews = (hotFlagged.length ? hotFlagged : [...news2, ...news3]).slice(0, 5);

  const videoSpotlightFlagged = articles.filter((a) => a.isVideoSpotlight);
  const videoSpotlight = (videoSpotlightFlagged.length
    ? videoSpotlightFlagged
    : articles.filter((a) => a.subLinks?.some((s) => s.isVideo))
  ).slice(0, 3);

  const youtubeFlagged = articles.filter((a) => a.isYoutubePick);
  const youtubePicks = (youtubeFlagged.length ? youtubeFlagged : news4.length ? news4 : articles).slice(0, 3);
  const featureMosaic = news1.slice(0, 3);
  const roleItemsFlagged = articles.filter((a) => a.roleType);
  const roleItems = (roleItemsFlagged.length ? roleItemsFlagged : articles.length ? articles : defaultArticles).slice(0, 8);
  const roleTypes = ["heading", "generic", "images", "ads", "live", "focus", "paragraph", "link"];

  const audioFlagged = articles.filter((a) => a.isAudioPick);
  const audioPicks = (audioFlagged.length ? audioFlagged : articles.length ? articles : defaultArticles).slice(0, 8);
  const moreNews = (articles.length ? articles : defaultArticles).slice(8, 20);
  const renderRoleCard = (a: Article, role: string, idx: number) => {
    const sizeClass = idx % 4 === 0 ? "md:col-span-2" : "";
    switch (role) {
      case "heading":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="text-2xl font-bold leading-tight hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 150)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition mt-2">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "images":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <div className="relative">
              <Link to={`/article/${a.slug || a.id}`} className="block">
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-56 object-cover rounded hover:opacity-90 transition" />
              </Link>
              {a.is_live && <BadgeLive />}
            </div>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "ads":
        return (
          <article className={`bg-gray-100 border border-gray-200 rounded p-6 shadow-inner ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Sponsored</p>
            <h3 className="text-lg font-bold mb-1">Premium Placement</h3>
            <p className="text-sm text-gray-700">Advertise your brand here with a high-visibility mid-page slot.</p>
          </article>
        );
      case "live":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <div className="relative overflow-hidden rounded" style={{ paddingBottom: "56.25%" }}>
              <iframe
                title="Live stream"
                src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              Live Stream: {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "focus":
        return (
          <article className={`space-y-2 border-l-4 border-red-500 pl-3 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <p className="text-xs uppercase tracking-wide text-red-600">Focus</p>
            <Link to={`/article/${a.slug || a.id}`} className="font-bold text-lg hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 130)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "paragraph":
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <h4 className="font-semibold text-sm text-gray-500">Analysis</h4>
            <p className="text-sm text-gray-800 leading-relaxed">{truncate(a.summary, 220) || truncate(a.title, 220)}</p>
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
      case "link":
        return (
          <article className={`space-y-1 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="text-base font-semibold hover:text-blue-600 transition">
              {a.title}
            </Link>
            <Link to={`/article/${a.slug || a.id}`} className="text-sm text-blue-600 hover:text-blue-800 transition inline-flex items-center gap-1">
              Full story <i className="bi bi-arrow-up-right" />
            </Link>
          </article>
        );
      default:
        return (
          <article className={`space-y-2 ${sizeClass}`} key={`role-${role}-${a.id}`}>
            <Link to={`/article/${a.slug || a.id}`} className="font-semibold hover:text-blue-600 transition block">
              {a.title}
            </Link>
            {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 110)}</p>}
            <Link to={`/article/${a.slug || a.id}`} className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 font-semibold text-sm transition">
              Read More <i className="bi bi-arrow-right"></i>
            </Link>
          </article>
        );
    }
  };

  return (
    <>
      {/* Feature mosaic with mixed sizes */}
      {featureMosaic.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">Feature Highlights</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featureMosaic.map((a, idx) => (
              <div
                key={a.id}
                className={idx === 0 ? "md:col-span-2 space-y-3" : "space-y-2"}
              >
                <div className="relative">
                  <img
                    src={a.image_url ?? PLACEHOLDER}
                    alt={a.title}
                    className="w-full h-full max-h-72 object-cover rounded"
                  />
                  {/* {a.is_live && <BadgeLive />} */}
                </div>
                <a href="#" className="font-bold text-lg hover:underline block">
                  {a.title}
                </a>
                {a.summary && <p className="text-sm text-gray-700">{truncate(a.summary, 140)}</p>}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Trending hot news ticker */}
      {trending.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-2">
          <h2 className="text-xl font-bold">Trending Now</h2>
          <div className="flex flex-wrap gap-4 bg-gray-50 p-4 rounded">
            {trending.map((a) => (
              <a key={a.id} href="#" className="flex items-center gap-2 text-sm hover:underline">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                {truncate(a.title, 80)}
              </a>
            ))}
          </div>
        </section>
      )}

      {/* Video spotlight block */}
      {videoSpotlight.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">Video Spotlight</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {videoSpotlight.map((a) => (
              <div key={a.id} className="relative overflow-hidden rounded shadow-sm">
                <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                  <span className="bg-white/80 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">Play</span>
                </div>
                <div className="p-3 bg-white space-y-1">
                  <a href="#" className="font-semibold hover:underline block">
                    {a.title}
                  </a>
                  <p className="text-xs text-gray-600">{truncate(a.summary, 90)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Hot news vertical list */}
      {hotNews.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-3">
          <h2 className="text-xl font-bold">Hot News</h2>
          <ul className="space-y-2">
            {hotNews.map((a) => (
              <li key={a.id} className="flex items-start gap-2">
                <span className="mt-2 w-2 h-2 bg-blue-500 rounded-full" />
                <div>
                  <a href="#" className="hover:underline font-medium">
                    {a.title}
                  </a>
                  {a.summary && <p className="text-xs text-gray-600">{truncate(a.summary, 110)}</p>}
                </div>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* YouTube / external video picks */}
      {youtubePicks.length > 0 && (
        <section className="lg:col-span-3 mt-8 space-y-4">
          <h2 className="text-xl font-bold">YouTube Picks</h2>
          <div className="grid md:grid-cols-3 gap-4">
            {youtubePicks.map((a) => (
              <div key={a.id} className="flex gap-3 items-start bg-gray-50 p-3 rounded">
                <img
                  src={a.image_url ?? PLACEHOLDER}
                  alt={a.title}
                  className="w-24 h-16 object-cover rounded"
                />
                <div className="space-y-1">
                  <a href="#" className="hover:underline font-semibold text-sm">
                    {a.title}
                  </a>
                  <p className="text-xs text-gray-600">{truncate(a.summary, 80)}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Audio strip similar to BBC/CNN rows */}
      {audioPicks.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wide">Best Audio of the Week</h2>
            <div className="flex items-center gap-2 text-sm text-blue-600">
              <span className="bg-gray-100 px-2 py-1 rounded">See more</span>
            </div>
          </div>
          <div className="relative">
            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2">
              {audioPicks.map((a, idx) => (
                <article
                  key={`audio-${a.id}-${idx}`}
                  className="snap-start min-w-[240px] max-w-[260px] bg-white border border-gray-100 rounded shadow-sm overflow-hidden"
                >
                  <div className="relative">
                    <img
                      src={a.image_url ?? PLACEHOLDER}
                      alt={a.title}
                      className="w-full h-44 object-cover"
                    />
                    <span className="absolute bottom-2 right-2 bg-white/90 text-xs px-2 py-1 rounded shadow">Audio</span>
                  </div>
                  <div className="p-3 space-y-1">
                    <p className="text-xs uppercase tracking-wide text-gray-500">The Global Story</p>
                    <a href="#" className="font-semibold leading-snug hover:underline block">
                      {truncate(a.title, 80)}
                    </a>
                    <p className="text-xs text-gray-600">Save · {20 + idx} mins</p>
                  </div>
                </article>
              ))}

              {/* Ad slot inside the carousel */}
              <article className="snap-start min-w-[240px] max-w-[260px] bg-gray-50 border border-gray-200 rounded p-4 flex items-center justify-center text-sm font-semibold text-gray-700">
                Advertisement
              </article>
            </div>
          </div>
        </section>
      )}

      {/* Role-based showcase with varied sizes and placements */}
      {roleItems.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <h2 className="text-xl font-bold">Across the Network</h2>
          <p className="text-sm text-gray-600">A mix of headings, live, ads, focus, and rich media blocks.</p>
          <div className="grid md:grid-cols-3 gap-6">
            {roleItems.map((a, idx) => renderRoleCard(a, a.roleType ?? roleTypes[idx % roleTypes.length], idx))}
          </div>
        </section>
      )}

      {/* More news masonry/grid to cover gaps */}
      {moreNews.length > 0 && (
        <section className="lg:col-span-3 mt-10 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold uppercase tracking-wide">More News</h2>
            <span className="text-sm text-blue-600 hover:underline">See all</span>
          </div>
          <div className="grid md:grid-cols-6 gap-6">
            {moreNews.map((a, idx) => (
              <article
                key={`more-${a.id}-${idx}`}
                className={`space-y-2 ${idx % 5 === 0 ? "md:col-span-2" : ""}`}
              >
                <div className="relative">
                  <img
                    src={a.image_url ?? PLACEHOLDER}
                    alt={a.title}
                    className="w-full h-48 object-cover rounded"
                  />
                  {/* {a.is_live && <BadgeLive />} */}
                </div>
                <a href="#" className="font-bold text-lg hover:underline block leading-snug">
                  {truncate(a.title, 120)}
                </a>
                {a.summary && <p className="text-sm text-gray-700 leading-relaxed">{truncate(a.summary, 160)}</p>}
              </article>
            ))}
          </div>
        </section>
      )}
    </>
  );
};

export default FeaturedSections;
