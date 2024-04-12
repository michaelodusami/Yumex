import Image from "next/image";
import { ForumSkeleton } from "./ui/skeletons";
import {posts, users} from "@/app/lib/placeholder_data";
import Forum from "./ui/homepage/Forum";

export default function Home() {
  return (
    <main className="min-h-screen">
        <div className="w-full lg:w-[100%] min-h-screen mx-auto flex-col flex">
            {/* <ForumSkeleton/> */}
            <Forum users={users} posts={posts}/>
        </div>
    </main>
  );
}
