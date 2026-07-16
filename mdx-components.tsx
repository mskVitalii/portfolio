import type { MDXComponents } from "mdx/types";
import { ModeAware } from "@/components/tri-mode/ModeAware";
import { StarStory, StarSituation, StarTask, StarAction, StarResult } from "@/components/projects/StarStory";
import { ProjectFaq, ProjectFaqItem } from "@/components/projects/ProjectFaq";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ModeAware,
    StarStory,
    StarSituation,
    StarTask,
    StarAction,
    StarResult,
    ProjectFaq,
    ProjectFaqItem,
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold mt-6 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-5 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4 text-foreground">{children}</p>
    ),
    pre: ({ children }) => (
      <pre className="rounded-lg overflow-x-auto my-4 p-4 bg-muted text-sm text-foreground">
        {children}
      </pre>
    ),
    code: ({ children, ...props }) => {
      if (!props.className) {
        return (
          <code className="bg-muted rounded px-1.5 py-0.5 text-sm font-mono text-foreground">
            {children}
          </code>
        );
      }
      return <code {...props}>{children}</code>;
    },
    ...components,
  };
}
