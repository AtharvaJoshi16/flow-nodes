import { FilePlus2 } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="m-5">
      <Link href="/canvas">
        <div className="cursor-pointer hover:bg-slate-200 w-[250px] h-[300px] bg-white border-2 rounded-md flex flex-col items-center">
          <div className="my-auto flex flex-col items-center gap-[20px]">
            <FilePlus2
              className="text-slate-500"
              width={30}
              height={30}
              strokeWidth={3}
            />
            <h2 className="font-bold text-2xl text-slate-700">BLANK CANVAS</h2>
          </div>
        </div>
      </Link>
    </div>
  );
}
