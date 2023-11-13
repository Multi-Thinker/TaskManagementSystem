import { Button } from "./Inputs";
import Popup from "./Popup";
import { Heading } from "./Typography";

const DashboardWidhoutRecords = ({
  heading = "You have no task.",
  buttonText = "+ New Task",
  handleClick = () => {},
  isShown = true,
}: {
  heading?: string;
  buttonText?: string;
  handleClick: () => any;
  isShown: boolean;
}) => {
  if (!isShown) return;
  return (
    <Popup showBackdrop={false} autoCentered={true} height="158px">
      <>
        <div className="heading text-center">
          <Heading additionalClass="mb-[0px] pt-[5px]">{heading}</Heading>
          <div className="w-[145px] pt-[31px] mx-auto">
            <Button onClick={handleClick}>{buttonText}</Button>
          </div>
        </div>
      </>
    </Popup>
  );
};

export default DashboardWidhoutRecords;
