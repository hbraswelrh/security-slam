import React from "react";
import { Link } from "react-router-dom";
import { SectionCard } from "../components/SectionCard";
import {
  libraryArticles,
  getAllTags
} from "../content/library";

export const LibraryPage: React.FC = () => {
  const tags = getAllTags();

  return (
    <div
      style={{
        maxWidth: "1200px",
        margin: "0 auto",
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
        Slam Library
      </h1>
      <p
        style={{
          color: "var(--gf-color-text-subtle)",
          fontSize: "1.25rem",
          marginBottom: "var(--gf-space-xl)",
          lineHeight: 1.6
        }}
      >
        A library of support resources to help projects execute on the more complex goals of the Security Slam. The Slam Library opens February 20, 2026.
      </p>

      {tags.length === 0 ? (
        <p style={{ color: "var(--gf-color-text-subtle)" }}>
          No library articles yet.
        </p>
      ) : (
        tags.map((tag) => (
          <section
            key={tag}
            style={{
              marginBottom: "var(--gf-space-xl)"
            }}
          >
            <h2
              style={{
                fontSize: "1.5rem",
                fontWeight: 600,
                marginBottom: "var(--gf-space-md)",
                color: "var(--gf-color-accent)"
              }}
            >
              {tag}
            </h2>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "var(--gf-space-lg)"
              }}
            >
              {libraryArticles
                .filter((a) => a.tags.includes(tag))
                .map((article) => (
                  <Link
                    key={article.slug}
                    to={`/library/${article.slug}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit"
                    }}
                  >
                    <SectionCard
                      title={article.title}
                      description={article.description ?? ""}
                    >
                      {article.tags.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "0.5rem",
                            marginTop: "var(--gf-space-md)"
                          }}
                        >
                          {article.tags.map((t) => (
                            <span
                              key={t}
                              style={{
                                fontSize: "0.8rem",
                                padding: "0.2rem 0.5rem",
                                borderRadius: "var(--gf-radius-lg)",
                                backgroundColor: "var(--gf-color-accent-soft)",
                                color: "var(--gf-color-accent)"
                              }}
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      )}
                    </SectionCard>
                  </Link>
                ))}
            </div>
          </section>
        ))
      )}
    </div>
  );
};
