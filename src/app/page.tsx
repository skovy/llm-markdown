"use client";

import PaperPlaneRight from "@phosphor-icons/react/dist/icons/PaperPlaneRight";
import { useChat } from "ai/react";
import { MessageList } from "@/components/message-list";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        content: "y u no work",
        role: "user",
        createdAt: new Date("2023-07-02T20:04:52.938Z"),
        id: "25QBc31",
      },
      {
        id: "u1Voyc7",
        createdAt: new Date("2023-07-02T20:04:54.274Z"),
        content:
          "I apologize if there seems to be an issue with my functionality. Could you please provide more details about the problem you are experiencing?",
        role: "assistant",
      },
      {
        content: "y u no work",
        role: "user",
        createdAt: new Date("2023-07-02T20:04:52.938Z"),
        id: "25QBc31",
      },
      {
        id: "u1Voyc7",
        createdAt: new Date("2023-07-02T20:04:54.274Z"),
        content:
          "I apologize if there seems to be an issue with my functionality. Could you please provide more details about the problem you are experiencing?",
        role: "assistant",
      },
      {
        content: "y u no work",
        role: "user",
        createdAt: new Date("2023-07-02T20:04:52.938Z"),
        id: "25QBc31",
      },
      {
        id: "u1Voyc7",
        createdAt: new Date("2023-07-02T20:04:54.274Z"),
        content:
          "I apologize if there seems to be an issue with my functionality. Could you please provide more details about the problem you are experiencing?",
        role: "assistant",
      },
      {
        content: "y u no work",
        role: "user",
        createdAt: new Date("2023-07-02T20:04:52.938Z"),
        id: "25QBc31",
      },
      {
        id: "u1Voyc7",
        createdAt: new Date("2023-07-02T20:04:54.274Z"),
        content:
          "I apologize if there seems to be an issue with my functionality. Could you please provide more details about the problem you are experiencing?",
        role: "assistant",
      },
    ],
  });

  return (
    <div className="mx-auto w-full max-w-lg max-h-screen py-8 flex flex-col stretch gap-8 ">
      <MessageList messages={messages} />

      <form onSubmit={handleSubmit} className="max-w-lg w-full">
        <div className="relative">
          <input
            className="w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color]"
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
  );
}
