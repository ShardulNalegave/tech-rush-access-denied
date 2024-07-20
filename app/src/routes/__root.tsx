import React from 'react';
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { queryClient, getLoggedInUser } from "../utils/query";
import Navbar from "../components/Navbar";

export const Route = createRootRoute({
  component: RootLayout,
  loader: () => queryClient.ensureQueryData(getLoggedInUser),
});

function RootLayout() {
  

  return (
    <>
      <Navbar />
      <Outlet />
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
