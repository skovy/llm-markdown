interface Props {
  children: string;
}

export const AssistantMessage = ({ children }: Props) => {
  return (
    <li className="flex flex-col gap-1 ml-4">
      <p className="font-sans text-xs font-medium text-emerald-700">AI:</p>
      <p className="p-3 border-2 border-emerald-200 rounded-lg bg-emerald-50 font-sans text-base text-emerald-900">
        {children}
      </p>
    </li>
  );
};
