import React from "react";
import { useParams, Navigate } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getLibraryArticle } from "../content/library";

export const LibraryArticlePage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getLibraryArticle(slug) : undefined;

  if (!article) {
    return <Navigate to="/library" replace />;
  }

  return (
    <article
      style={{
        maxWidth: "900px",
        margin: "0 auto",
        padding: "var(--gf-space-xl)",
        width: "100%"
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          fontWeight: 700,
          marginBottom: "var(--gf-space-md)",
          color: "var(--gf-color-accent)",
          lineHeight: 1.2
        }}
      >
        {article.title}
      </h1>
      {article.description && (
        <p
          style={{
            color: "var(--gf-color-text-subtle)",
            fontSize: "1.1rem",
            marginBottom: "var(--gf-space-lg)",
            lineHeight: 1.6
          }}
        >
          {article.description}
        </p>
      )}
      <div
        className="library-article-body"
        style={{
          color: "var(--gf-color-text)",
          lineHeight: 1.8,
          fontSize: "1.1rem"
        }}
      >
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{article.body}</ReactMarkdown>
      </div>
    </article>
  );
};
