import Message from "./message";
import { Message as MessageType } from "ai/react";

interface Props {
  messages: MessageType[];
}

export const MessageList = ({ messages }: Props) => {
  return (
    <ul className="grid gap-4 max-w-2xl flex-1 mx-auto">
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </ul>
  );
};
