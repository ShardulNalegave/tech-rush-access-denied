import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { getLoggedInUser } from "../query/users";

export default function ExploreSidebar() {
  const { isPending, data } = useQuery(getLoggedInUser());

  if (isPending) return <></>;
  if (!data) return <></>;

  return (
    <div className="h-full w-[250px] border-solid border-r-[2px] border-zinc-950 border-opacity-50 p-[10px] hidden md:block">
      <Link to="/feed">
        <button className="button w-full">
          <span className="button_lg">
            <span className="button_sl"></span>
            <span className="button_text">Feed</span>
          </span>
        </button>
      </Link>
      <Link to="/posts">
        <button className="button w-full">
          <span className="button_lg">
            <span className="button_sl"></span>
            <span className="button_text">All posts</span>
          </span>
        </button>
      </Link>
      <Link to={`/profile`}>
        <button className="button w-full">
          <span className="button_lg">
            <span className="button_sl"></span>
            <span className="button_text">Users</span>
          </span>
        </button>
      </Link>
      <div className="h-[0px]"></div>
      <hr />
      <div className="h-[20px]"></div>
      <Link to={`/profile/${data.id}`}>
        <button className="button w-full">
          <span className="button_lg">
            <span className="button_sl"></span>
            <span className="button_text">My Profile</span>
          </span>
        </button>
      </Link>
    </div>
  );
}