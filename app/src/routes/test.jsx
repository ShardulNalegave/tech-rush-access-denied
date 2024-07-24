import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
export const Route = createFileRoute("/test")({
  component: Test,
});
import React from "react";

function Test() {
  return (
    <div className="h-full w-[250px] border-solid border-r-[2px] border-zinc-950 border-opacity-50 p-[10px] hidden md:block">
      <Link to="/feed">
        <button class="button w-full">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">Feed</span>
          </span>
        </button>
      </Link>
      <Link to="/posts">
        <button class="button w-full">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">All posts</span>
          </span>
        </button>
      </Link>
      <Link to="/profile">
        <button class="button w-full">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">My Profile</span>
          </span>
        </button>
      </Link>
      <div className="h-[15px]"></div>
      <hr />
      <div className="h-[15px]"></div>
      <Link to={`/}`}>
        <button class="button w-full">
          <span class="button_lg">
            <span class="button_sl"></span>
            <span class="button_text">User</span>
          </span>
        </button>
      </Link>
    </div>
  );
}

function Page() {
  return (
    <div className="flex h-full w-full">
      <div className="flex-none h-full">
        <Test />
      </div>
      <div className="grow h-full"></div>
    </div>
  );
}

export default Page;
