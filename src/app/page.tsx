"use client";

import { MessageList } from "@/components/message-list";
import { Nav } from "@/components/nav";
import PaperPlaneRight from "@phosphor-icons/react/dist/icons/PaperPlaneRight";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  return (
    <div className="flex flex-col-reverse h-screen overflow-y-scroll">
      <div className="mx-auto w-full px-2 lg:px-8 pb-8 flex flex-col stretch gap-8 flex-1">
        <Nav />
        <MessageList messages={messages} />
        <form onSubmit={handleSubmit} className="max-w-2xl w-full mx-auto">
          <div className="relative">
            <input
              className="w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color] pr-10"
              value={input}
              onChange={handleInputChange}
              aria-label="ask a question"
              placeholder="Ask a question..."
            />
            <button
              type="submit"
              aria-label="send"
              className="absolute top-0 right-0 bottom-0 text-emerald-600 outline-none p-3 disabled:text-slate-600 hover:text-emerald-800 focus:text-emerald-800 transition-colors"
              disabled={!input}
            >
              <PaperPlaneRight size="1em" />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
