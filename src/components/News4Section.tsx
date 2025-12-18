import React from "react";
import { type Article, PLACEHOLDER } from "../data/defaultArticles";
import BadgeLive from "./BadgeLive";

interface News4SectionProps {
  articles: Article[];
}

const News4Section: React.FC<News4SectionProps> = ({ articles }) => {
  const news4 = articles.filter((a) => a.section === "news4");
  return (
    <section id="news4" className="lg:col-span-3 mt-6 space-y-6">
      <h2 className="text-xl font-bold">Featured Sections</h2>

      <article className="grid md:grid-cols-5 gap-6">
        {news4.map((a) => (
          <div key={a.id} className="relative">
            <img src={a.image_url ?? PLACEHOLDER} alt={a.title} className="rounded object-cover w-full" />
            {a.is_live && <BadgeLive />}
            <a href="#" className="font-bold block hover:underline mt-2">
              {a.title}
            </a>
            {a.subLinks && (
              <ul className="list-disc pl-5 text-sm mt-2">
                {a.subLinks.map((s) => (
                  <li key={s.id}>
                    <a href={s.url ?? "#"} className="hover:underline">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </article>
    </section>
  );
};

export default News4Section;
