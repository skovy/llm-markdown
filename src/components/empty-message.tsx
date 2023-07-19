import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import Link from "next/link";

export const EmptyMessage = () => {
  return (
    <div className="max-w-2xl my-auto mx-auto w-full bg-emerald-50 border-2 border-emerald-100 p-4 lg:p-8 rounded-lg text-emerald-950">
      <p className="font-sans text-base font-semibold mb-6">
        Welcome to LLM Markdown!
      </p>
      <p className="font-sans text-base mb-6">
        This app is a demo for supporting rich-text responses from a{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Large_language_model"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          Large Language Model
        </Link>{" "}
        (LLM). Once you provide your OpenAI API Key, you can start prompting and
        receiving rich-text responses.
      </p>
      <p className="font-sans text-base mb-6">
        Try something like:{" "}
        <em className="italic font-semibold">
          &quot;Top 10 grossing movies of all time as a pie chart&quot;
        </em>
      </p>

      <p className="font-sans text-base font-semibold mt-10 mb-6">
        How it works
      </p>

      <p className="font-sans text-base mb-6">
        A system prompt is used to encourage the LLM to generate a response with
        Markdown and Mermaid formatting.
      </p>
      <p className="font-sans text-base mb-6">
        The response is rendered using{" "}
        <Link
          href="https://unifiedjs.com"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          unified
        </Link>
        ,{" "}
        <Link
          href="https://mermaid.js.org"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          Mermaid
        </Link>
        , and{" "}
        <Link
          href="https://latex.js.org"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          LaTeX.js
        </Link>{" "}
        with{" "}
        <Link
          href="https://nextjs.org"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          Nextjs
        </Link>
        .
      </p>
      <p className="font-sans text-base mb-6">
        For an example of the supported formatting, see{" "}
        <Link href="/markdown" className={ANCHOR_CLASS_NAME}>
          supported markdown
        </Link>
        .
      </p>
      <p className="font-sans text-base mb-6">
        All the source code is available on{" "}
        <Link
          href="https://github.com/skovy/llm-markdown"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          GitHub
        </Link>
        .
      </p>
    </div>
  );
};
