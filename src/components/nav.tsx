import { GithubLogo } from "@phosphor-icons/react";
import MarkerCircle from "@phosphor-icons/react/dist/icons/MarkerCircle";
import Link from "next/link";

export const Nav = () => {
  return (
    <nav className="max-w-2xl w-full mx-auto py-2 lg:py-4 flex gap-2 items-center justify-between sticky top-0 bg-white z-10">
      <a
        href="/"
        className="flex gap-2 items-center text-emerald-900 hover:text-emerald-950 group transition-colors"
      >
        <div className="p-2 rounded-full bg-emerald-50 group-hover:bg-emerald-100 transition-colors">
          <MarkerCircle className="w-6 h-6" />
        </div>
        <span className="font-mono font-semibold">LLM Markdown</span>
      </a>
      <Link
        href="https://github.com/skovy/llm-markdown"
        target="_blank"
        aria-label="Open GitHub repository"
        className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 transition-colors"
      >
        <GithubLogo className="w-6 h-6" />
      </Link>
    </nav>
  );
};
