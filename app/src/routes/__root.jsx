import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <div className="w-[96vw] SFB h-[7vh] overflow-hidden font  flex justify-center items-center transition-all ">
        <nav className="w-11/12 h-full flex justify-between items-center">
          <div className="h-full">
            <Link to="/" className="">
              <img
                className="h-full scale-125"
                src="/src/assets/logos/png/logo-black.png"
              />
            </Link>
          </div>
          <div>
            <ul className="flex gap-3">
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
                  to="/about"
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
              </li>
            </ul>
          </div>
        </nav>
      </div>
      <video
        autoPlay
        muted
        loop
        className="w-full -z-10 fixed h-[93vh] object-cover"
      >
        <source src="/bg.mp4" type="video/mp4" />
      </video>
      <Outlet />
      <TanStackRouterDevtools />
    </>
  );
}
