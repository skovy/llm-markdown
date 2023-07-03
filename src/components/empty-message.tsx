import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import Link from "next/link";

export const EmptyMessage = () => {
  return (
    <div className="max-w-2xl my-auto mx-auto w-full bg-emerald-50 border-2 border-emerald-100 p-4 lg:p-8 rounded-lg text-emerald-950">
      <p className="font-sans text-base font-semibold mb-6">
        Welcome to LLM Markdown!
      </p>
      <p className="font-sans text-base mb-6">
        This app is demonstrating rending rich-text responses from{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Large_language_model"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          Large Language Models
        </Link>{" "}
        (LLMs) using{" "}
        <Link
          href="https://en.wikipedia.org/wiki/Markdown"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          Markdown
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
          href="https://github.com/skovy/nextjs-llm-markdown"
          target="_blank"
          className={ANCHOR_CLASS_NAME}
        >
          GitHub
        </Link>
        .
      </p>
      <p className="font-sans text-base">
        Since this is a demo app, you will need to provide your own OpenAI API
        Key. This will be saved in your browser&apos;s local storage under the
        name{" "}
        <code className="font-mono text-emerald-900 font-semibold">
          ai-token
        </code>
        .
      </p>
    </div>
  );
};
