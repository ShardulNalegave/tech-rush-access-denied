import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { useLocation } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createRootRoute({
  component: RootLayout,
});

const SearchBar = () => {
  return (
    <div className="h-5/6   rounded-2xl border-2 flex shadow-lg    items-center w-1/3 lg:w-1/2 p-1 lg:p-0  ">
      <img className="h-2/3  w-1/6 " src="src/assets/icons/search.svg" />
      <input
        placeholder="Search Here!"
        type="text"
        className="  lg:text-xl   text-md outline-none h-5/6 rounded-2xl p-4  w-5/6 "
      />
    </div>
  );
};

function RootLayout() {
  const location = useLocation();

  return (
    <>
      {/* fixed  */}
      <div className=" w-[100vw]  bg-white border-gray-600 shadow-2xl  Title h-[7vh] backdrop-blur-2xl border-b  overflow-hidden font  flex justify-center items-center transition-all  ">
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
              {/* <li>
                <Link
                  to="/"
                  className=" [&.active]:border-b-2 border-yellow-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/portofolio"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Portfolio
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Profile
                </Link>
              </li> */}
              <li>
                <Link
                  to="/login"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/signup"
                  className="[&.active]:border-b-2 border-yellow-500"
                >
                  Signup
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
