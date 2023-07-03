"use client";

import { Nav } from "@/components/nav";
import { useMarkdownProcessor } from "@/hooks/use-markdown-processor";

export const MESSAGE = `
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
| Potato | A starchy vegetable available in various varieties. It can be boiled, baked, mashed, or used in soups, fries, and many other dishes. |`;

export default function Chat() {
  const content = useMarkdownProcessor(MESSAGE);

  return (
    <>
      <div className="max-w-2xl w-full mx-auto px-2 lg:px-8 pb-8">
        <Nav />
        <h1 className="font-sans text-2xl font-semibold text-emerald-950 mb-4 mt-8">
          Supported Markdown
        </h1>
        <p className="font-sans text-base text-emerald-950">
          Below is the markdown that is supported in the LLM responses.
        </p>
        <hr className="border-t-2 border-emerald-100 my-8" />
        <div className="[&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
          {content}
        </div>
      </div>
    </>
  );
}
