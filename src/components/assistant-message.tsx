interface Props {
  children: string;
}

export const AssistantMessage = ({ children }: Props) => {
  return (
    <li className="flex flex-col gap-1 ml-4">
      <p className="font-sans text-xs font-medium text-emerald-700">AI:</p>
      <p className="p-2 border-2 border-emerald-200 rounded-lg bg-emerald-100">
        {children}
      </p>
    </li>
  );
};
