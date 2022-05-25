import { ExclamationCircleIcon } from "@heroicons/react/outline";
import { useField } from "remix-validated-form";

type Props = {
  className?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const TextField = ({ name, className = "", ...rest }: Props) => {
  const { error, getInputProps } = useField(name!);

  return (
    <>
      <div className="relative">
        <input
          className={`mt-1 block w-full py-2 px-4 rounded-2xl border  ${
            error ? "border-red-300 pr-10" : "border-stone-500"
          } shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm`}
          {...getInputProps({ id: name })}
          {...rest}
        />
        {error && (
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
            <ExclamationCircleIcon
              className="h-5 w-5 text-red-500"
              aria-hidden="true"
            />
          </div>
        )}
      </div>

      {error && (
        <p className="mt-2 text-sm text-red-600" id={`${name}-error`}>
          {error}
        </p>
      )}
    </>
  );
};
