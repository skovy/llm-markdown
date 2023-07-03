interface Props {
  children: string;
}

export const UserMessage = ({ children }: Props) => {
  return (
    <li className="flex flex-col flex-1 min-w-0 gap-1 mr-6 selection:bg-indigo-300 selection:text-indigo-900">
      <p className="font-sans text-xs font-medium text-indigo-700">You:</p>
      <p className="p-2 lg:p-6 border-2 border-indigo-200 rounded-lg bg-indigo-50 font-sans text-sm text-indigo-900 min-w-0">
        {children}
      </p>
    </li>
  );
};
