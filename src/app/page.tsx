"use client";

import { EmptyMessage } from "@/components/empty-message";
import { MessageList } from "@/components/message-list";
import { Nav } from "@/components/nav";
import { TokenDialog } from "@/components/token-dialog";
import { useLocalStorage } from "@/hooks/use-local-storage";
import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import PaperPlaneRight from "@phosphor-icons/react/dist/icons/PaperPlaneRight";
import { useChat } from "ai/react";
import { useState } from "react";

export default function Chat() {
  const [tokenOpen, setTokenOpen] = useState(false);
  const [token, setToken] = useLocalStorage<string | null>("ai-token", null);
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    body: { token },
  });

  return (
    <>
      <div className="flex flex-col-reverse h-screen overflow-y-scroll">
        <div className="mx-auto w-full px-2 lg:px-8 pb-8 flex flex-col stretch gap-8 flex-1">
          <Nav />
          {messages.length ? (
            <MessageList messages={messages} />
          ) : (
            <EmptyMessage />
          )}

          <form onSubmit={handleSubmit} className="max-w-2xl w-full mx-auto">
            <div className="relative">
              <input
                className="w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color] pr-10 disabled:opacity-60 disabled:cursor-not-allowed"
                value={input}
                onChange={handleInputChange}
                aria-label="ask a question"
                placeholder="Ask a question..."
                disabled={!token}
              />
              <button
                type="submit"
                aria-label="send"
                className="absolute top-0 right-0 bottom-0 text-emerald-600 outline-none p-3 disabled:text-slate-600 disabled:opacity-60 disabled:cursor-not-allowed hover:text-emerald-800 focus:text-emerald-800 transition-colors"
                disabled={!input}
              >
                <PaperPlaneRight size="1em" />
              </button>
            </div>
            <div className="mt-2 text-right">
              <button
                type="button"
                className={ANCHOR_CLASS_NAME}
                onClick={() => setTokenOpen(true)}
              >
                <div className="font-sans text-xs  font-medium">
                  {token ? "Change OpenAI API Key" : "Set OpenAI API Key"}
                </div>
              </button>
            </div>
          </form>
        </div>
      </div>
      <TokenDialog
        // Clear input between opening/closing.
        key={tokenOpen.toString()}
        open={tokenOpen}
        setOpen={setTokenOpen}
        setToken={setToken}
      />
    </>
  );
}
