import React from "react";
import type { Components } from "react-markdown";

function isExternal(href?: string | null): boolean {
  if (!href) return false;
  return (
    href.startsWith("http://") ||
    href.startsWith("https://") ||
    href.startsWith("//")
  );
}

export const markdownComponents: Components = {
  a: ({ href, children, ...props }) => (
    <a
      href={href}
      {...(isExternal(href) ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      {...props}
    >
      {children}
    </a>
  )
};
