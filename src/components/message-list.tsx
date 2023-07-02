import Message from "./message";
import { Message as MessageType } from "ai/react";

interface Props {
  messages: MessageType[];
}

export const MessageList = ({ messages }: Props) => {
  return (
    <div className="flex flex-col-reverse flex-1 min-h-0 overflow-y-scroll">
      <ul className="flex flex-col gap-4">
        {messages.map((m) => (
          <Message key={m.id} message={m} />
        ))}
      </ul>
    </div>
  );
};
