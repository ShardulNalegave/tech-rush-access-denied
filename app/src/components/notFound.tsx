import { useRouter } from "@tanstack/react-router";

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="h-full w-full flex items-center">
      <div className="grow h-full"></div>
      <div className="flex-none p-[50px] pb-[100px] text-center">
        <div className="w-full flex justify-center">
          <img className="w-1/2" alt="error " src="/errorPage.svg" />
        </div>
        {/* <i className="fas fa-solid fa-ban text-8xl text-yellow-700" /> */}
        {/* <div className="h-[30px]"></div> */}
        <h1 className="text-4xl Title">Nothing here!</h1>
        <div className="h-[10px]"></div>
        <h1 className=" font-mono ">
          Nothing exists at this URL or it might've moved to a different one.
        </h1>
        <div className="h-[15px]"></div>
        <button
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-yellow-400 hover:text-black transition duration-200"
          onClick={() => router.history.back()}
        >
          Go Back
        </button>
      </div>
      <div className="grow h-full"></div>
    </div>
  );
}
