import Image from "next/image";
import { Heading } from "./Typography";
import { Button, Input } from "./Inputs";

const DashboardControls = ({
  loading,
  handleSearch,
  showAddPopup,
}: {
  loading: boolean;
  handleSearch: (props?: any) => any;
  showAddPopup: (props?: any) => any;
}) => {
  return (
    <>
      <div className="mt-[34px] w-full">
        <div className="lg:flex lg:flex-row block lg:justify-between lg:text-left text-center">
          <Heading>Tasks</Heading>
          <div className="lg:flex lg:flex-row block justify-end h-[40px] lg:min-w-[358px] lg:w-[358px] w-full relative">
            <div className="absolute top-0 left-0 h-[40px] w-[40px] flex justify-center content-center items-center">
              <Image
                src="/search-solid.svg"
                width={16}
                height={16}
                alt="magnify"
              />
            </div>
            <Input
              disabled={loading}
              onChange={handleSearch}
              placeholder="Search by task name"
              additionalClass="pl-[40px]"
            />
            <div className="lg:w-[134px] lg:min-w-[134px] w-full lg:pl-[34px]">
              <Button disabled={loading} onClick={() => showAddPopup()}>
                + New Task
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardControls;
