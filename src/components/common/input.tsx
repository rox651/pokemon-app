import * as React from "react";

import { cn } from "../../helpers/common/cn";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "border-gray-300 border-b-2 flex h-10 w-full py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export interface InputErrorProps {
  message?: string;
  className?: string;
}

const InputError: React.FC<InputErrorProps> = ({ message, className }) => {
  if (!message) return null;

  return (
    <p className={cn("text-sm text-red-600 mt-1", className)}>{message}</p>
  );
};

export { Input, InputError };
