import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useLocation } from "@tanstack/react-router";
import { useState } from "react";
import gsap from "gsap";

export const Route = createRootRoute({
  component: RootLayout,
});

const SearchBar = () => {
  return (
    <div className="h-5/6 rounded-2xl border-2 flex shadow-lg items-center w-1/3 lg:w-1/2 p-1 lg:p-0  ">
      <img className="h-2/3 w-1/6" src="src/assets/icons/search.svg" />
      <input
        placeholder="Search Here!"
        type="text"
        className="lg:text-xl placeholder:text-gray-200 text-md outline-none h-5/6 rounded-2xl p-4  w-5/6 "
      />
    </div>
  );
};

function RootLayout() {
  const [menu, setmenu] = useState("src/assets/icons/menu.svg");
  const handleClick = () => {
    menu === "src/assets/icons/menu.svg"
      ? setmenu("src/assets/icons/close.svg")
      : setmenu("src/assets/icons/menu.svg");
    menu === "src/assets/icons/menu.svg"
      ? gsap.fromTo(
          "#ham",
          {
            opacity: 0,
          },
          {
            opacity: 1,
            duration: 0.5,
          }
        )
      : gsap.fromTo(
          "#ham",
          {
            opacity: 1,
          },
          {
            opacity: 0,
            duration: 0.5,
          }
        );
  };
  const location = useLocation();

  return (
    <>
      {/* fixed  */}
      <div className=" w-[100vw]  bg-white border-gray-600 shadow-2xl  Title h-[7vh] backdrop-blur-2xl border-b  overflow-hidden font  flex justify-center items-center transition-all flex-col  ">
        <nav className="w-11/12  h-full flex  justify-between items-center">
          <div className="h-full">
            <Link to="/" className="">
              <img
                className="h-full scale-125"
                src="/src/assets/logos/png/logo-black.png"
              />
            </Link>
          </div>

          {location.pathname !== "/" && <SearchBar />}

          <div>
            <ul className="flex gap-3 md:text-xl">
              <ul className={`gap-3 smd:text-xl  lg:flex hidden `}>
                <li>
                  <Link
                    to="/"
                    className=" [&.active]:border-b-2 border-yellow-500"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/portfolio"
                    className="[&.active]:border-b-2 border-yellow-500"
                  >
                    Portfolio
                  </Link>
                </li>
              </ul>
              <li>
                <Link
                  to="/profile"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/login"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/auth/signup"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Signup
                </Link>
              </li>
              <li>
                <img
                  className="lg:hidden cursor-pointer"
                  onClick={handleClick}
                  src={menu}
                />
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <ul
        id="ham"
        className={` right-0  text-xl flex 
        gap-4  backdrop-blur-3xl drop-shadow-2xl shadow-xl  border-gray-400 border-2 m-3  Title z-10  absolute justify-end items-end p-4  transition-all  opacity-0  rounded-3xl flex-col`}
      >
        <li>
          <Link
            to="/"
            className="    [&.active]:border-b-2 hover:border-b-2  border-yellow-500"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            to="/portfolio"
            className="hover:border-b-2   [&.active]:border-b-2 border-yellow-500"
          >
            Portfolio
          </Link>
        </li>
      </ul>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
