import Message from "./message";
import { Message as MessageType } from "ai/react";

interface Props {
  messages: MessageType[];
}

export const MessageList = ({ messages }: Props) => {
  return (
    <ul className="grid auto-rows-min	gap-4 max-w-2xl flex-1 mx-auto w-full">
      {messages.map((m) => (
        <Message key={m.id} message={m} />
      ))}
    </ul>
  );
};
