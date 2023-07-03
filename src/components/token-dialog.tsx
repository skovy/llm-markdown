import { ANCHOR_CLASS_NAME } from "@/hooks/use-markdown-processor";
import X from "@phosphor-icons/react/dist/icons/X";
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";

interface Props {
  open: boolean;
  setOpen(open: boolean): void;
  setToken(key: string): void;
}

export const TokenDialog = ({ open, setOpen, setToken }: Props) => {
  const [tokenInput, setTokenInput] = useState("");

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-slate-900/90" />
        <Dialog.Content className="bg-white rounded-lg shadow-2xl fixed p-8 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-xl">
          <Dialog.Title className="font-sans text-lg font-semibold mb-4">
            Set OpenAI API Key
          </Dialog.Title>
          <Dialog.Description className="font-sans text-sm mb-8">
            Since this is a demo app, you will need to provide your own OpenAI
            API Key. This will be saved in your browser&apos;s local storage
            under the name{" "}
            <code className="font-mono text-emerald-900 font-semibold">
              ai-token
            </code>
            . This will only be sent when you ask a question, and never
            persisted outside of your browser. If you have not obtained your
            OpenAI API key, you can do so by{" "}
            <a
              href="https://platform.openai.com/signup/"
              className={ANCHOR_CLASS_NAME}
            >
              signing up
            </a>{" "}
            on the OpenAI website.
          </Dialog.Description>
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
          <Dialog.Close asChild>
            <button
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-emerald-50 transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-slate-700" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
