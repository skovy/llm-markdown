interface Props {
  children: string;
}

export const UserMessage = ({ children }: Props) => {
  return (
    <li className="flex flex-col gap-1 mr-4">
      <p className="font-sans text-xs font-medium text-indigo-700">You:</p>
      <p className="p-2 border-2 border-indigo-200 rounded-lg bg-indigo-100">{children}</p>
    </li>
  );
};
