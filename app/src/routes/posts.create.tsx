
import { useState, useRef } from 'react';
import { createFileRoute, useRouter } from '@tanstack/react-router';
import { AuthRequired } from '../components/auth';
import { queryClient } from '../query/query';
import { createPost } from '../query/posts';

export const Route = createFileRoute('/posts/create')({
  component: () => <AuthRequired><CreatePostPage /></AuthRequired>,
});

function CreatePostPage() {
  const router = useRouter();
  const [caption, setCaption] = useState('');
  const [keywords, setKeywords] = useState('');
  const postPicRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleCreatePost = () => {
    const kwds = keywords.split(',').map(s => s.trim());

    const files = postPicRef.current?.files;
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
      const res = await queryClient.fetchQuery(createPost({ data, caption, keywords: kwds }));
      router.invalidate();
      if (!res) alert("Couldn't post");
      else router.navigate({ to: `/posts/${res?.id}` });
    };
    reader.readAsDataURL(files[0]);
  }

  return (
    <div className="container mx-auto my-10 p-[20px] md:p-[0px]">
			<div className="flex justify-center">
				<div className="w-full max-w-2xl">
					<h1 className="text-3xl space-y-6 font-semibold mb-6">Create new Post</h1>
          <div className="mb-4">
            <label htmlFor="caption" className="block text-gray-700">
              Caption:
            </label>
            <input
              type="text"
              name="caption"
              placeholder="Enter Caption"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
              value={caption}
              onChange={e => {
                e.preventDefault();
                setCaption(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="caption" className="block text-gray-700">
              Keywords:
            </label>
            <input
              type="text"
              name="caption"
              placeholder="Enter keywords separated by commas"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md hover:border-yellow-500 transition duration-200 ease-in"
              value={keywords}
              onChange={e => {
                e.preventDefault();
                setKeywords(e.target.value);
              }}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-gray-700">
              Image:
            </label>
            <input
              type="file"
              accept="image/*"
              name="image"
              placeholder="Enter image URL"
              className="w-full mt-2 p-2 border border-gray-300 rounded-md  hover:border-yellow-500 transition duration-300"
              ref={postPicRef}
              onChange={() => {
                const files = postPicRef.current?.files;
                if (files === null || files === undefined) return;
                if (files.length < 1) return;
                setPreview(URL.createObjectURL(files[0]));
              }}
            />
          </div>
          <button
            onClick={handleCreatePost}
            className="w-1/3 py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-yellow-500 transition duration-300"
          >
            Upload
          </button>
          <div className='h-[50px]'></div>
          {
            preview != null ?
            <img src={preview} className='rounded-lg shadow-lg h-[250px]' />
            : <></>
          }
				</div>
      </div>
		</div>
  );
}