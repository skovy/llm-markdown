import X from "@phosphor-icons/react/dist/icons/X";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { ReactNode } from "react";

interface Props {
  open: boolean;
  setOpen(open: boolean): void;
  title: string;
  description?: ReactNode;
  children: ReactNode;
  size?: "xl" | "3xl";
}

export const Dialog = ({
  open,
  setOpen,
  title,
  description,
  children,
  size = "xl",
}: Props) => {
  return (
    <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 py-8 bg-slate-900/90 grid place-items-center overflow-y-auto z-50">
          <DialogPrimitive.Content
            className={`bg-white rounded-lg shadow-2xl p-8 w-[90vw] relative ${
              size === "3xl" ? "max-w-3xl" : "max-w-xl"
            }`}
          >
            <DialogPrimitive.Title className="font-sans text-lg font-semibold mb-4">
              {title}
            </DialogPrimitive.Title>
            {description ? (
              <DialogPrimitive.Description className="font-sans text-sm mb-8">
                {description}
              </DialogPrimitive.Description>
            ) : null}
            {children}
            <DialogPrimitive.Close asChild>
              <button
                className="absolute top-6 right-6 p-2 rounded-full hover:bg-emerald-50 transition-colors"
                aria-label="Close"
              >
                <X className="w-4 h-4 text-slate-700" />
              </button>
            </DialogPrimitive.Close>
          </DialogPrimitive.Content>
        </DialogPrimitive.Overlay>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};
