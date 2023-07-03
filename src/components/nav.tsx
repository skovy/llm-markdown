import { GithubLogo } from "@phosphor-icons/react";
import MarkerCircle from "@phosphor-icons/react/dist/icons/MarkerCircle";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="max-w-2xl w-full mx-auto py-4 flex gap-2 items-center justify-between">
      <Link href="/" className="flex gap-2 items-center text-emerald-900">
        <div className="p-2 rounded-full bg-emerald-50">
          <MarkerCircle className="w-6 h-6" />
        </div>
        <span className="font-mono font-semibold">LLM Markdown</span>
      </Link>
      <Link
        href="https://github.com/skovy/nextjs-llm-markdown"
        aria-label="Open GitHub repository"
        className="p-2 rounded-full bg-slate-100 text-emerald-900"
      >
        <GithubLogo className="w-6 h-6" />
      </Link>
    </nav>
  );
};
