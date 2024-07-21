import { createFileRoute, getRouteApi, useNavigate } from '@tanstack/react-router';
import { TypeAnimation } from 'react-type-animation';
import { backendURL, queryClient } from '../query/query';
import { getUser, getUserPosts } from '../query/users';
import NotFound from '../components/notFound';
import { useEffect, useRef, useState } from 'react';
import PortScroll from '../components/portScroll';
import { useQuery } from '@tanstack/react-query';

const routeAPI = getRouteApi('/portfolio/$userID');
export const Route = createFileRoute('/portfolio/$userID')({
  component: UserPortfolioPage,
  loader: async ({ params }) => queryClient.fetchQuery(getUser(params.userID)),
});

function UserPortfolioPage() {
  const navigate = useNavigate();
  const user = routeAPI.useLoaderData();
  const params = routeAPI.useParams();

  const { isPending, data: posts } = useQuery(getUserPosts(params.userID));

  const [horizontalScrollCompleted, setHorizontalScrollCompleted] = useState(false);
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onScroll = () => {
      const scrollContainer = scrollContainerRef.current;
      if (!scrollContainerRef || !scrollContainer) return;

      const { scrollLeft, scrollWidth, clientWidth } =
        scrollContainer;
      if (scrollLeft + clientWidth >= scrollWidth - 1) {
        setHorizontalScrollCompleted(true);
      } else {
        setHorizontalScrollCompleted(false);
      }
    };

    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainerRef || !scrollContainer) return;
    scrollContainer.addEventListener("scroll", onScroll);
    return () => scrollContainer.removeEventListener("scroll", onScroll);
  }, []);

  if (isPending) <></>;
  if (!user) return <NotFound />;
  return (
    <div className={`w-[100vw] h-full overflow-x-hidden overflow-y-scroll snap-y snap-mandatory ${
      horizontalScrollCompleted ? "h-[200vh]" : "h-[100vh]"
    }`}>

      <div className="bg-black w-full h-full snap-start grid grid-cols-1 lg:grid-cols-2 overflow-y-hidden">
        <div className="my-5 px-5 lg:px-16 lg:py-20 flex flex-col justify-start md:justify-center lg:justify-start">
          <div className="grow"></div>
          <h1 className="font-semibold text-white text-3xl lg:text-5xl text-left">
            Hey there,
          </h1>

          <div className="mt-2 font-bold text-yellow-500 text-4xl lg:text-5xl text-left">
            <TypeAnimation
              wrapper="h1"
              speed={5}
              repeat={Infinity}
              sequence={[
                `I'm ${user.name}`,
                1500,
                "I'm",
                1500,
              ]}
            />
          </div>
          <h1 className='mt-8 text-gray-400 font-mono'>{ user.bio }</h1>
          <h1 className="mt-4 font-secondary font-normal text-gray-400 text-xl text-left">
            { user.about }
          </h1>

          <div className='h-[25px]'></div>

          <div className="flex">
            <button className="inline-block lg:w-auto mt-4 lg:mt-0 bg-transparent transition duration-500 ease-in-out hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-black py-4 px-6 border border-yellow-500 hover:border-transparent rounded" onClick={() => navigate({ to: `/profile/${user.id}` })}>
              View Profile
            </button>
            <div className='w-[10px]'></div>
            <button className="inline-block lg:w-auto mt-4 lg:mt-0 bg-transparent transition duration-500 ease-in-out hover:bg-yellow-500 text-yellow-500 font-semibold hover:text-black py-4 px-6 border border-yellow-500 hover:border-transparent rounded">
              <a href={`mailto:${user.email}`}>Mail me!</a>
            </button>
          </div>
          <div className="grow"></div>
        </div>

        <div className="px-5 flex-col items-center mt-10 lg:mt-0 hidden lg:flex">
          <div className="grow"></div>
          <div className="relative w-48 h-48 lg:w-80 lg:h-80 flex justify-center items-center">
            <div className="absolute inset-0 rounded-full border-2 border-yellow-500 animate-glow hidden lg:flex"></div>
            <img
              src={`${backendURL}/storage/profile_pics/${user.id}`}
              className="w-full h-full rounded-full object-cover shadow-md hidden lg:flex"
              alt="John Smith"
            />
          </div>
          <div className="grow"></div>
        </div>
      </div>

      <hr className="bg-yellow-500 h-2" />
      <div
        id="Scroll"
        className="w-[100vw] h-full overflow-x-auto overflow-y-hidden snap-start bg-zinc-950"
        ref={scrollContainerRef}
        style={{ whiteSpace: "nowrap" }}
      >
        {posts ? <PortScroll postIDs={posts.map(post => post.id)} /> : <></>}
      </div>

    </div>
  );
}