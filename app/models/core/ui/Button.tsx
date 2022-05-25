type Props = React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ ...rest }: Props) => {
  return (
    <button
      className="p-2 w-2/6 rounded-3xl bg-red-400 text-white border border-red-400 hover:shadow-lg"
      {...rest}
    />
  );
};
