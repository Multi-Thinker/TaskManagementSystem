const Container = (
  props: React.DOMAttributes<any> & { additionalClass?: string }
) => {
  return (
    <div
      className={`pt-[84px] max-w-screen-lg px-6 mx-auto block ${props.additionalClass}`}
      {...props}
    >
      {props.children}
    </div>
  );
};

export default Container;
