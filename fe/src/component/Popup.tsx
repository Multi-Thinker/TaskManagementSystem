const Popup = ({
  children,
  centered = true,
  autoCentered = true,
  height = "249px",
  handleBackdrop = () => {},
  showBackdrop = true,
  zIndex = 40,
}: {
  children?: React.JSX.Element;
  centered?: boolean;
  autoCentered?: boolean;
  height?: string;
  handleBackdrop?: () => void;
  showBackdrop?: boolean;
  zIndex?: number;
}) => {
  return (
    <>
      <div
        className={`absolute top-0 left-0 flex z-[${zIndex.toString()}] justify-center ${
          autoCentered
            ? "sm:items-center items-start sm:pt-0 pt-[84px]"
            : centered
            ? "items-center"
            : "pt-[84px]"
        }  self-center flex-row h-full w-full mx-auto visible p-4 overflow-x-hidden overflow-y-auto md:inset-0`}
      >
        {showBackdrop && (
          <div
            onClick={handleBackdrop}
            className="overlay absolute top-0 left-0 w-full h-full z-50 bg-[#00000033] opacity-100 cursor-pointer"
          />
        )}

        <div
          style={{ height }}
          className={`relative block w-[296px] h-[${height}] bg-white bg-shadow z-[100] shadow-[#00000029] shadow-md rounded-md p-[24px]`}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default Popup;
