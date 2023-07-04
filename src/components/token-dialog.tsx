import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import { useState } from "react";
import { Dialog } from "./dialog";

interface Props {
  open: boolean;
  setOpen(open: boolean): void;
  setToken(key: string): void;
}

export const TokenDialog = ({ open, setOpen, setToken }: Props) => {
  const [tokenInput, setTokenInput] = useState("");

  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="Set OpenAI API Key"
      description={
        <>
          Since this is a demo app, you will need to provide your own OpenAI API
          Key. This will be saved in your browser&apos;s local storage under the
          name{" "}
          <code className="font-mono text-emerald-900 font-semibold">
            ai-token
          </code>
          . This will only be sent when you ask a question, and never persisted
          outside of your browser. If you have not obtained your OpenAI API key,
          you can do so by{" "}
          <a
            href="https://platform.openai.com/signup/"
            className={ANCHOR_CLASS_NAME}
          >
            signing up
          </a>{" "}
          on the OpenAI website.
        </>
      }
    >
      <fieldset>
        <label
          className="font-sans text-sm text-emerald-950 font-semibold mb-2 block"
          htmlFor="token"
        >
          OpenAI API Key
        </label>
        <input
          id="token"
          name="token"
          type="password"
          value={tokenInput}
          onChange={(e) => setTokenInput(e.target.value)}
          className="w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color] pr-10"
        />
      </fieldset>
      <div className="flex justify-end mt-8 gap-2">
        <button
          type="button"
          onClick={() => setOpen(false)}
          className="p-3 text-emerald-900 border-2 border-emerald-900 rounded-lg hover:bg-emerald-50 transition-colors"
        >
          <div className="font-sans text-base font-medium">Cancel</div>
        </button>
        <button
          type="button"
          onClick={() => {
            setToken(tokenInput);
            setOpen(false);
          }}
          disabled={!tokenInput}
          className="p-3 text-emerald-50 border-2 border-emerald-900 bg-emerald-900 rounded-lg disabled:opacity-60 disabled:cursor-not-allowed hover:bg-emerald-800 transition-colors"
        >
          <div className="font-sans text-base font-medium">Save</div>
        </button>
      </div>
    </Dialog>
  );
};
