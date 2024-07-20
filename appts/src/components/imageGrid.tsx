import { IPost } from "../query/models";
import { backendURL } from "../query/query";

export default function ImageGrid({ posts } : { posts: IPost[] }) {
  return (
    <div className="mt-5 mx-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {posts.map(post => (
          <div
            key={post.id}
            className="relative overflow-hidden rounded-lg shadow-md hover:scale-105 hover:shadow-xl transition duration-100"
          >
            <img
              loading="lazy"
              src={`${backendURL}/storage/posts/${post.id}`}
              alt={post.caption}
              className="w-full h-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}