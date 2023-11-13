export const Heading = ({
  additionalClass,
  ...props
}: React.InputHTMLAttributes<any> & { additionalClass?: string }) => {
  return (
    <h1
      className={`text-[20px] text-heading h-[24px] mb-[24px] ${additionalClass} whitespace-nowrap`}
      {...props}
    >
      {props?.children}
    </h1>
  );
};
