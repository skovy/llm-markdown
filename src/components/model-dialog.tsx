import { Dialog } from "./dialog";

export const SUPPORTED_MODELS = [
  "gpt-3.5-turbo",
  "gpt-3.5-turbo-16k",
  "gpt-4",
] as const;

export type SupportedModels = (typeof SUPPORTED_MODELS)[number];

interface Props {
  open: boolean;
  setOpen(open: boolean): void;
  model: SupportedModels;
  setModel(mode: SupportedModels): void;
}

export const ModelDialog = ({ open, setOpen, model, setModel }: Props) => {
  return (
    <Dialog
      open={open}
      setOpen={setOpen}
      title="OpenAI Model"
      description={
        <>
          Choose the OpenAI model to use. Note, you must have access to the
          model you select. If you are not sure, select{" "}
          <code className="font-mono text-emerald-950">gpt-3.5-turbo</code>.
        </>
      }
    >
      <fieldset className="flex-grow-0">
        <label
          className="font-sans text-sm text-emerald-950 font-semibold mb-2 block"
          htmlFor="model"
        >
          Model
        </label>
        <select
          id="model"
          name="model"
          value={model}
          onChange={(e) => setModel(e.currentTarget.value as SupportedModels)}
          className="w-full border-2 border-slate-200 rounded-lg p-2 font-sans text-base outline-none ring-offset-0 focus:border-slate-400 focus-visible:ring-2 focus-visible:ring-offset-2 ring-emerald-600 transition-[box-shadow,border-color]"
        >
          {SUPPORTED_MODELS.map((model) => (
            <option key={model} value={model}>
              {model}
            </option>
          ))}
        </select>
      </fieldset>
    </Dialog>
  );
};
