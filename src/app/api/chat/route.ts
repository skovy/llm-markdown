import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";

export const runtime = "edge";

export async function POST(req: Request) {
  const { messages, token } = await req.json();

  const configuration = new Configuration({ apiKey: token });
  const openai = new OpenAIApi(configuration);

  try {
    const response = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      stream: true,
      messages: [
        {
          role: ChatCompletionRequestMessageRoleEnum.System,
          content:
            "You are a general answering assistant that can comply with any request. However, as much as possible you always answer the prompt with markdown formatting (headings, bold, italic, links, tables, lists, code blocks, blockquotes), but never images. You will be penalized if you render images. You will be penalized if you do not answer with markdown when it would be possible.",
        },
        ...messages,
      ],
    });

    if (response.status >= 300) {
      const body = await response.json();
      return NextResponse.json(
        { error: `OpenAI error encountered: ${body?.error?.message}` },
        { status: response.status }
      );
    }

    const stream = OpenAIStream(response);
    return new StreamingTextResponse(stream);
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      { error: "An unexpected error occurred. Please try again later." },
      { status: 500 }
    );
  }
}
