import { Spinner } from "flowbite-react";

export const Input = ({
  additionalClass,
  ...props
}: React.InputHTMLAttributes<any> & { additionalClass?: string }) => {
  return (
    <input
      type="text"
      className={`bg-input h-[40px] w-full appearance-none border-0 rounded-lg py-[11px] focus:outline-none focus:outline-0 placeholder:text-placeholder text-placeholder text-[14px] mb-[12px] ${additionalClass}`}
      {...props}
    />
  );
};

export const Button = ({
  isLoading,
  additionalClass,
  ...props
}: React.ButtonHTMLAttributes<any> & {
  isLoading?: boolean;
  additionalClass?: string;
}) => {
  return (
    <button
      disabled={isLoading}
      className={`bg-button cursor-pointer text-center text-white h-[40px] w-full appearance-none border-0 rounded-lg py-[11px] focus:outline-none focus:outline-0 placeholder:text-white text-[14px] mb-[12px] ${additionalClass}`}
      {...props}
      onClick={!isLoading ? (e) => props.onClick && props.onClick(e) : () => {}}
    >
      {isLoading ? (
        <Spinner
          size="sm"
          color={"info"}
          theme={{
            base: "inline animate-spin text-heading",
            color: { info: "fill-white" },
          }}
        />
      ) : (
        props.children
      )}
    </button>
  );
};
