import { Dialog } from "@/components/dialog";
import { CircleNotch } from "@phosphor-icons/react";
import CheckFat from "@phosphor-icons/react/dist/icons/CheckFat";
import Copy from "@phosphor-icons/react/dist/icons/Copy";
import FlowArrow from "@phosphor-icons/react/dist/icons/FlowArrow";
import "highlight.js/styles/base16/green-screen.css";
// @ts-expect-error
import flattenListItemParagraphs from "mdast-flatten-listitem-paragraphs";
import mermaid from "mermaid";
import Link from "next/link";
import {
  Children,
  createElement,
  Fragment,
  isValidElement,
  useEffect,
  useMemo,
  useState,
} from "react";
import flattenChildren from "react-keyed-flatten-children";
import rehypeHighlight from "rehype-highlight";
import rehypeReact from "rehype-react";
import remarkGfm from "remark-gfm";
import remarkParse from "remark-parse";
import remarkRehype from "remark-rehype";
import { unified } from "unified";

export const ANCHOR_CLASS_NAME =
  "font-semibold underline text-emerald-700 underline-offset-[2px] decoration-1 hover:text-emerald-800 transition-colors";

export const useMarkdownProcessor = (content: string) => {
  useEffect(() => {
    mermaid.initialize({ startOnLoad: false, theme: "forest" });
  }, []);

  return useMemo(() => {
    return unified()
      .use(remarkParse)
      .use(flattenListItemParagraphs)
      .use(remarkGfm)
      .use(remarkRehype)
      .use(rehypeHighlight, { ignoreMissing: true })
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
          code: CodeBlock,
          pre: ({ children }: JSX.IntrinsicElements["pre"]) => {
            return (
              <div className="relative">
                <pre className="p-4 pr-10 rounded-lg border-2 border-emerald-200 bg-emerald-100 mb-6 [&>code.hljs]:p-0 [&>code.hljs]:bg-transparent font-code text-sm">
                  {children}
                </pre>
              </div>
            );
          },
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

const CodeBlock = ({ children, className }: JSX.IntrinsicElements["code"]) => {
  const [copied, setCopied] = useState(false);
  const [showMermaidPreview, setShowMermaidPreview] = useState(false);

  useEffect(() => {
    if (copied) {
      const interval = setTimeout(() => setCopied(false), 1000);
      return () => clearTimeout(interval);
    }
  }, [copied]);

  // Highlight.js adds a `className` so this is a hack to detect if the code block
  // is a language block wrapped in a `pre` tag.
  if (className) {
    const isMermaid = className.includes("language-mermaid");

    return (
      <>
        <code className={className}>{children}</code>
        <div className="absolute top-1 right-1 flex flex-col gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-200 border-2 border-emerald-200 transition-colors"
            aria-label="copy code to clipboard"
            title="Copy code to clipboard"
            onClick={() => {
              navigator.clipboard.writeText(children?.toString() ?? "");
              setCopied(true);
            }}
          >
            {copied ? (
              <CheckFat className="w-4 h-4" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </button>
          {isMermaid ? (
            <>
              <button
                type="button"
                className="rounded-lg p-2 text-emerald-900 hover:bg-emerald-200 border-2 border-emerald-200 transition-colors"
                aria-label="Open Mermaid preview"
                title="Open Mermaid preview"
                onClick={() => {
                  setShowMermaidPreview(true);
                }}
              >
                <FlowArrow className="w-4 h-4" />
              </button>
              <Dialog
                open={showMermaidPreview}
                setOpen={setShowMermaidPreview}
                title="Mermaid diagram preview"
              >
                <Mermaid content={children?.toString() ?? ""} />
              </Dialog>
            </>
          ) : null}
        </div>
      </>
    );
  }

  return (
    <code className="inline-block font-code bg-emerald-100 text-emerald-950 p-0.5 -my-0.5 rounded">
      {children}
    </code>
  );
};

const Mermaid = ({ content }: { content: string }) => {
  const [diagram, setDiagram] = useState<string | boolean>(true);

  useEffect(() => {
    const render = async () => {
      // Generate a random ID for mermaid to use.
      const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;

      // Confirm the diagram is valid before rendering.
      if (await mermaid.parse(content, { suppressErrors: true })) {
        const { svg } = await mermaid.render(id, content);
        setDiagram(svg);
      } else {
        setDiagram(false);
      }
    };
    render();
  }, [content]);

  if (diagram === true) {
    return (
      <div className="flex gap-2 items-center">
        <CircleNotch className="animate-spin w-4 h-4 text-emerald-900" />
        <p className="font-sans text-sm text-slate-700">Rendering diagram...</p>
      </div>
    );
  } else if (diagram === false) {
    return (
      <p className="font-sans text-sm text-slate-700">
        Unable to render this diagram. Try copying it into the{" "}
        <Link
          href="https://mermaid.live/edit"
          className={ANCHOR_CLASS_NAME}
          target="_blank"
        >
          Mermaid Live Editor
        </Link>
        .
      </p>
    );
  } else {
    return <div dangerouslySetInnerHTML={{ __html: diagram ?? "" }} />;
  }
};

export const MARKDOWN_TEST_MESSAGE = `
# Heading level 1

This is the first paragraph.

This is the second paragraph.

This is the third paragraph.

## Heading level 2

This is an [anchor](https://github.com).

### Heading level 3

This is **bold** and _italics_.

#### Heading level 4

This is \`inline\` code.

This is a code block:

\`\`\`tsx
const Message = () => {
  return <div>hi</div>;
};
\`\`\`

##### Heading level 5

This is an unordered list:

- one
- two
- three, and **formatting**

This is an ordered list:

1. some
1. more
1. stuff

###### Heading level 6

> This is a blockquote.

This is a table:

| Vegetable | Description |
|-----------|-------------|
| Carrot    | A crunchy, orange root vegetable that is rich in vitamins and minerals. It is commonly used in soups, salads, and as a snack. |
| Broccoli  | A green vegetable with tightly packed florets that is high in fiber, vitamins, and antioxidants. It can be steamed, boiled, stir-fried, or roasted. |
| Spinach   | A leafy green vegetable that is dense in nutrients like iron, calcium, and vitamins. It can be eaten raw in salads or cooked in various dishes. |
| Bell Pepper | A colorful, sweet vegetable available in different colors such as red, yellow, and green. It is often used in stir-fries, salads, or stuffed recipes. |
| Tomato    | A juicy fruit often used as a vegetable in culinary preparations. It comes in various shapes, sizes, and colors and is used in salads, sauces, and sandwiches. |
| Cucumber   | A cool and refreshing vegetable with a high water content. It is commonly used in salads, sandwiches, or as a crunchy snack. |
| Zucchini | A summer squash with a mild flavor and tender texture. It can be sautéed, grilled, roasted, or used in baking recipes. |
| Cauliflower | A versatile vegetable that can be roasted, steamed, mashed, or used to make gluten-free alternatives like cauliflower rice or pizza crust. |
| Green Beans | Long, slender pods that are low in calories and rich in vitamins. They can be steamed, stir-fried, or used in casseroles and salads. |
| Potato | A starchy vegetable available in various varieties. It can be boiled, baked, mashed, or used in soups, fries, and many other dishes. |

This is a mermaid diagram:

\`\`\`mermaid
quadrantChart
    title Reach and engagement of campaigns
    x-axis Low Reach --> High Reach
    y-axis Low Engagement --> High Engagement
    quadrant-1 We should expand
    quadrant-2 Need to promote
    quadrant-3 Re-evaluate
    quadrant-4 May be improved
    Campaign A: [0.3, 0.6]
    Campaign B: [0.45, 0.23]
    Campaign C: [0.57, 0.69]
    Campaign D: [0.78, 0.34]
    Campaign E: [0.40, 0.34]
    Campaign F: [0.35, 0.78]
\`\`\`
`;
