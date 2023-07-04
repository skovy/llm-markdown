import "highlight.js/styles/base16/green-screen.css";
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
// @ts-expect-error - missing types, removes extraneous paragraph tags from <li> elements
import flattenListItemParagraphs from "mdast-flatten-listitem-paragraphs";
import mermaid from "mermaid";
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
          pre: ({ children }: JSX.IntrinsicElements["pre"]) => {
            const codeClassName = children[0].props.className;
            const isMermaid = codeClassName?.includes("language-mermaid");

            if (isMermaid) {
              return <Mermaid>{children[0].props.children[0]}</Mermaid>;
            }

            return (
              <pre className="p-4 rounded-lg border-2 border-emerald-200 bg-emerald-100 mb-6 [&>code.hljs]:p-0 [&>code.hljs]:bg-transparent font-code text-sm">
                {children}
              </pre>
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

const Mermaid = ({ children }: { children: string }) => {
  const [diagram, setDiagram] = useState<string | null>(null);
  console.log(diagram)
  useEffect(() => {
    const render = async () => {
      const id = `mermaid-svg-${Math.round(Math.random() * 10000000)}`;
      if (await mermaid.parse(children, { suppressErrors: true })) {
        const { svg } = await mermaid.render(id, children);
        setDiagram(svg);
      } else {
        setDiagram("Unable to render mermaid SVG.");
      }
    };
    render();
  }, [children]);

  return <div dangerouslySetInnerHTML={{ __html: diagram ?? "" }} />;
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
sequenceDiagram
    participant Client
    participant Server

    Client->>Server: GET /webpage
    Server-->>Client: Respond with HTML
    Client->>Server: GET /styles.css
    Server-->>Client: Respond with CSS
    Client->>Server: GET /script.js
    Server-->>Client: Respond with JavaScript
    Client->>Server: GET /image.png
    Server-->>Client: Respond with image

    Note over Client: Render HTML
    Client->>Client: Retrieve CSS
    Note over Client: Apply styles
    Client->>Client: Retrieve JavaScript
    Note over Client: Execute scripts
    Client-
\`\`\`
`;
