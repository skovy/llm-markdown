import "highlight.js/styles/base16/green-screen.css";
import {
  Children,
  createElement,
  Fragment,
  isValidElement,
  useMemo,
} from "react";
import flattenChildren from "react-keyed-flatten-children";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
// @ts-expect-error - missing types, removes extraneous paragraph tags from <li> elements
import flattenListItemParagraphs from "mdast-flatten-listitem-paragraphs";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const ANCHOR_CLASS_NAME =
  "font-semibold underline text-emerald-700 underline-offset-[2px] decoration-1 hover:text-emerald-800 transition-colors";

export const useMarkdownProcessor = (content: string) => {
  return useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(flattenListItemParagraphs)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight)
      .use(rehypeReact, {
        createElement,
        Fragment,
        components: {
          a: ({ href, children }: JSX.IntrinsicElements["a"]) => (
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className={ANCHOR_CLASS_NAME}
            >
              {children}
            </a>
          ),
          h1: ({ children, id }: JSX.IntrinsicElements["h1"]) => (
            <h1
              className="font-sans font-semibold text-2xl text-emerald-950 mb-6 mt-6"
              id={id}
            >
              {children}
            </h1>
          ),
          h2: ({ children, id }: JSX.IntrinsicElements["h2"]) => (
            <h2
              className="font-sans font-medium text-2xl text-emerald-950 mb-6 mt-6"
              id={id}
            >
              {children}
            </h2>
          ),
          h3: ({ children, id }: JSX.IntrinsicElements["h3"]) => (
            <h3
              className="font-sans font-semibold text-xl text-emerald-950 mb-6 mt-2"
              id={id}
            >
              {children}
            </h3>
          ),
          h4: ({ children, id }: JSX.IntrinsicElements["h4"]) => (
            <h4
              className="font-sans font-medium text-xl text-emerald-950 my-6"
              id={id}
            >
              {children}
            </h4>
          ),
          h5: ({ children, id }: JSX.IntrinsicElements["h5"]) => (
            <h5
              className="font-sans font-semibold text-lg text-emerald-950 my-6"
              id={id}
            >
              {children}
            </h5>
          ),
          h6: ({ children, id }: JSX.IntrinsicElements["h6"]) => (
            <h6
              className="font-sans font-medium text-lg text-emerald-950 my-6"
              id={id}
            >
              {children}
            </h6>
          ),
          p: (props: JSX.IntrinsicElements["p"]) => {
            return (
              <p className="font-sans text-sm text-emerald-900 leading-relaxed mb-6">
                {props.children}
              </p>
            );
          },
          strong: ({ children }: JSX.IntrinsicElements["strong"]) => (
            <strong className="text-emerald-950 font-semibold">
              {children}
            </strong>
          ),
          em: ({ children }: JSX.IntrinsicElements["em"]) => (
            <em>{children}</em>
          ),
          code: ({ children, className }: JSX.IntrinsicElements["code"]) => {
            // Highlight.js adds a `className` so this is a hack to detect if the code block
            // is a language block wrapped in a `pre` tag.
            if (className) return <code className={className}>{children}</code>;

            return (
              <code className="inline-block font-code bg-emerald-100 text-emerald-950 p-0.5 -my-0.5 rounded">
                {children}
              </code>
            );
          },
          pre: ({ children }: JSX.IntrinsicElements["pre"]) => (
            <pre className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-100 mb-6 [&>code.hljs]:p-0 [&>code.hljs]:bg-transparent font-code text-sm">
              {children}
            </pre>
          ),
          ul: ({ children }: JSX.IntrinsicElements["ul"]) => (
            <ul className="flex flex-col gap-3 text-emerald-900 my-6">
              {Children.map(
                flattenChildren(children).filter(isValidElement),
                (child, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span className="w-1 h-1 rounded-full bg-current block shrink-0 mt-1" />
                    {child}
                  </li>
                )
              )}
            </ul>
          ),
          ol: ({ children }: JSX.IntrinsicElements["ol"]) => (
            <ol className="flex flex-col gap-3 text-emerald-900 my-6">
              {Children.map(
                flattenChildren(children).filter(isValidElement),
                (child, index) => (
                  <li key={index} className="flex gap-2 items-start">
                    <span
                      className="font-sans text-sm text-emerald-900 font-semibold shrink-0 min-w-[1.4ch]"
                      aria-hidden
                    >
                      {index + 1}.
                    </span>
                    {child}
                  </li>
                )
              )}
            </ol>
          ),
          li: ({ children }: JSX.IntrinsicElements["li"]) => (
            <span className="font-sans text-sm leading-relaxed">
              {children}
            </span>
          ),
          table: ({ children }: JSX.IntrinsicElements["table"]) => (
            <div className="overflow-x-auto mb-6">
              <table className="table-auto border-2 border-emerald-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }: JSX.IntrinsicElements["thead"]) => (
            <thead className="bg-emerald-100">{children}</thead>
          ),
          th: ({ children }: JSX.IntrinsicElements["th"]) => (
            <th className="border-2 border-emerald-200 p-2 font-sans text-sm font-semibold text-emerald-950">
              {children}
            </th>
          ),
          td: ({ children }: JSX.IntrinsicElements["td"]) => (
            <td className="border-2 border-emerald-200 p-2 font-sans text-sm text-emerald-900">
              {children}
            </td>
          ),
          blockquote: ({ children }: JSX.IntrinsicElements["blockquote"]) => (
            <blockquote className="border-l-4 border-emerald-200 pl-2 text-emerald-900 italic">
              {children}
            </blockquote>
          ),
        },
      })
      .processSync(content).result;
  }, [content]);
};
