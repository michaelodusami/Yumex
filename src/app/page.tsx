import Image from "next/image";
import { poppins } from "./ui/fonts";

export default function Home() {
  return (
    <main className="min-h-screen">
        <div className="w-full min-h-screen mx-auto shadow-lg flex-col flex">
            <div className="text-center w-full">
                <h1 className={poppins.className + " text-[120px]"}>Yumex.</h1>
            </div>
            <div className="w-full">
              
            </div>
        </div>
    </main>
  );
}
