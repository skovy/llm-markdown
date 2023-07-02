"use client";

import Message from "@/components/message";
import { useChat } from "ai/react";

export default function Chat() {
  const { messages, input, handleInputChange, handleSubmit } = useChat({
    initialMessages: [
      {
        content: "y u no work",
        role: "user",
        createdAt: "2023-07-02T20:04:52.938Z",
        id: "25QBc31",
      },
      {
        id: "u1Voyc7",
        createdAt: "2023-07-02T20:04:54.274Z",
        content:
          "I apologize if there seems to be an issue with my functionality. Could you please provide more details about the problem you are experiencing?",
        role: "assistant",
      },
    ],
  });

  console.log(messages);
  return (
    <div className="mx-auto w-full max-w-lg py-24 flex flex-col stretch">
      <ul className="flex flex-col gap-4">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </ul>

      <form onSubmit={handleSubmit} className="max-w-lg w-full fixed bottom-0">
        <label>
          Say something...
          <input
            className="w-full border border-gray-300 rounded mb-8 shadow-xl p-2"
            value={input}
            onChange={handleInputChange}
          />
        </label>
        <button type="submit">Send</button>
      </form>
    </div>
  );
}
