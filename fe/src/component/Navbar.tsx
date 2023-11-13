/* eslint-disable @next/next/no-img-element */
"use client";

import { useSession } from "../hooks/use-session";

const NavbarContainer = () => {
  const { logout } = useSession();
  return (
    <>
      <nav className="bg-white fixed w-full  top-0 left-0 border-0 h-[72px] shadow-[#00000029] shadow-md z-[200]">
        <div className="max-w-screen-lg flex flex-wrap items-center justify-between mx-auto  p-4">
          <a href="#" className="flex items-center">
            <img
              srcSet="/av/av.png 1x, av/av@2x.png 2x"
              className="mr-3 w-[48px] h-[48px]"
              alt="Avatar"
            />
          </a>
          <div className="flex md:order-2">
            <button
              type="button"
              onClick={logout}
              className="text-accent cursor-pointer bg-white font-medium text-[19px] px-4 py-2 text-center mr-3 md:mr-0"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavbarContainer;
