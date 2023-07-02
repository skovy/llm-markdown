import { Message } from "ai/react";
import { UserMessage } from "./user-message";
import { AssistantMessage } from "./assistant-message";

interface Props {
  message: Message;
}

export default function Message({ message }: Props) {
  switch (message.role) {
    case "user":
      return <UserMessage>{message.content}</UserMessage>;
    case "assistant":
      return <AssistantMessage>{message.content}</AssistantMessage>;
    default:
      throw new Error(`Unknown message role: ${message.role}`);
  }
}
