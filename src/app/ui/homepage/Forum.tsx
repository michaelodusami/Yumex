import {Post, User} from "../../lib/model"
import { getUserName } from "@/app/lib/utils";
import Image from "next/image";

interface ForumProps {
    posts: Post[];
    users: User[];
}

const Forum: React.FC<ForumProps> = ({posts, users}) => {
return (
    <div className="container mx-auto px-4 py-8">
    <div className="mb-8">
        <div className="h-8 w-full rounded bg-gray-200 dark:bg-white animate-pulse"></div>
    </div>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
    {posts.map((post) => (
          <div key={post.id} className="rounded-lg dark:shadow-neutral-800 p-4 shadow relative">
            {/* food image */}
            <Image src={post.image} width={1296} height={728}  alt={post.title} className="mb-4 h-48 w-full rounded object-cover md:h-[20rem] lg:h-[30rem]"/>
            {/* title */}
            <h2 className="mb-2 text-xl font-bold">{post.title}</h2>
            {/* content (description) */}
            <p className="mb-4">{post.content}</p>
            {/* user information */}
            <div className="flex items-center space-x-2">
              {/* user profile pic */}
              <Image
                src={"/userlogo.png"}
                alt={getUserName(post.user_id)}
                width={30}
                height={30}
                className="h-8 w-8 rounded-full"
              />
              {/* user who created it */}
              <span className="">{getUserName(post.user_id)}</span>
              {/* category tag of what type of food it is */}
            </div>
          </div>
        ))}
    </div>
    </div>
);
};

export default Forum;