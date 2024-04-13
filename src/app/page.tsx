import Image from "next/image";
import { ForumSkeleton } from "./ui/skeletons";
import Forum from "./ui/homepage/Forum";
import {posts} from "@/app/lib/placeholder_data";

export default function Home() {
  return (
    <main className="min-h-screen">
        <div className="w-full lg:w-[100%] min-h-screen mx-auto flex-col flex">
            {/* <ForumSkeleton/> */}
            <Forum posts={posts}/>
        </div>
    </main>
  );
}
