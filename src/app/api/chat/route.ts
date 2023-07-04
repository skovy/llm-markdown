import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextResponse } from "next/server";
import {
  ChatCompletionRequestMessageRoleEnum,
  Configuration,
  OpenAIApi,
} from "openai-edge";

export const runtime = "edge";

const SYSTEM_PROMPT = `You are a general answering assistant that can comply with any request. 

You always answer the with markdown formatting. You will be penalized if you do not answer with markdown when it would be possible.
The markdown formatting you support: headings, bold, italic, links, tables, lists, code blocks, and blockquotes.
You do not support images and never include images. You will be penalized if you render images.

You also support Mermaid formatting. You will be penalized if you do not render Mermaid diagrams when it would be possible.
The Mermaid diagrams you support: sequenceDiagram, flowChart, classDiagram, stateDiagram, erDiagram, gantt, journey, gitGraph, pie.`

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
          content: SYSTEM_PROMPT,
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
