import Skeleton from "react-loading-skeleton";
import { Heading } from "./Typography";
import "react-loading-skeleton/dist/skeleton.css";

const DashboardCard = ({
  heading,
  loading,
  ...props
}: React.DOMAttributes<any> & { heading?: string; loading?: boolean }) => {
  return (
    <div
      className={`lg:w-[304px] min-w-[245px] overflow-hidden w-full my-2  block h-[158px] min-h-[158px] mx-auto  rounded-md shadow-md shadow-[#0000000A] bg-white ${
        loading ? "p-0 " : "p-[24px]"
      }`}
      {...props}
    >
      {heading && !loading && (
        <div className="block  h-2/6">
          <Heading additionalClass="mb-0">{heading}</Heading>
        </div>
      )}
      {loading ? (
        <Skeleton className="mx-auto w-full h-[160px] relative top-[-4px] p-0 m-0" />
      ) : (
        <div className="block">{props.children}</div>
      )}
    </div>
  );
};

export default DashboardCard;
