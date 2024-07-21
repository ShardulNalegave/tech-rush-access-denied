import { useRef, useState } from 'react';
import { createFileRoute, getRouteApi, useRouter } from '@tanstack/react-router';
import { AuthRequired } from '../components/auth';
import { queryClient } from '../query/query';
import { getLoggedInUser, updateUserProfile, updateUserProfilePic } from '../query/users';

const routeAPI = getRouteApi('/profile/edit');
export const Route = createFileRoute('/profile/edit')({
  component: () => <AuthRequired><EditProfilePage /></AuthRequired>,
  loader: () => queryClient.fetchQuery(getLoggedInUser()),
})

function EditProfilePage() {
  const router = useRouter();
  const user = routeAPI.useLoaderData();

  const [name, setName] = useState(user?.name || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [about, setAbout] = useState(user?.about || '');
  const profilePicRef = useRef<HTMLInputElement>(null);

  const updateProfile = async () => {
    const payload = { name, bio, about };
    const res = await queryClient.fetchQuery(updateUserProfile(payload));
    if (res) alert('Updated!');
    else alert('Couldn\'t update');
    router.invalidate();
  };

  const updateProfilePic = () => {
    const files = profilePicRef.current?.files;
    if (files === null || files === undefined) {
      alert('Please select a file first');
      return;
    }

    if (files.length < 1) {
      alert('Please select a file first');
      return;
    }

    const reader = new FileReader();
    reader.onload = async () => {
      const data = reader.result?.toString().replace("data:", "").replace(/^.+,/, "");
      if (!data) return;
      const res = await queryClient.fetchQuery(updateUserProfilePic({ data }));
      if (res) alert('Updated!');
      else alert("Couldn't update");
      router.invalidate();
    };
    reader.readAsDataURL(files[0]);
  };

  if (!user) return <></>;
  return (
    <div className="container mx-auto my-10 p-[20px] md:p-[0px]">
			<div className="flex justify-center">
				<div className="w-full max-w-2xl">
					<h1 className="text-3xl space-y-6 font-semibold mb-6">Edit Your Profile</h1>
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700">
              Name:
            </label>
            <input
              type="text"
              name="name"
              placeholder="Enter name"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
              value={name}
              onChange={e => {
                e.preventDefault();
                setName(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">
              Email:
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter email"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
              value={user.email}
              disabled
            />
          </div>
          <div className="mb-4">
            <label htmlFor="bio" className="block text-gray-700">
              Bio:
            </label>
            <input
              type="text"
              name="bio"
              placeholder="Enter bio"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
              value={bio}
              onChange={e => {
                e.preventDefault();
                setBio(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="about" className="block text-gray-700">
              About:
            </label>
            <textarea
              name="about"
              placeholder="About you..."
              cols={30}
              className="w-full mt-2 p-2 border border-gray-300 rounded-md  hover:border-yellow-500 transition duration-300"
              value={about}
              onChange={e => {
                e.preventDefault();
                setAbout(e.target.value);
              }}
            ></textarea>
          </div>
          <button
            onClick={updateProfile}
            className="w-1/3 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
          >
            Edit
          </button>

          <div className='h-[60px]'></div>

          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Profile Photo:
            </label>
            <input
              type="file"
              name="image"
              placeholder="Enter image URL"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md  hover:border-yellow-500 transition duration-300"
              ref={profilePicRef}
            />
          </div>
          <button
            onClick={updateProfilePic}
            className="w-1/3 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
          >
            Update
          </button>
				</div>
      </div>
		</div>
  );
}