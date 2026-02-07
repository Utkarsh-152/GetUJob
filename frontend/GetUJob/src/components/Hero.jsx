import React from 'react';
import { cn } from "@/lib/utils";
import { Spotlight } from "../components/ui/spotlight";
import { ArrowDownFromLine } from 'lucide-react';


const Hero = () => {
  return (
    <div className="relative flex h-[45rem] w-full overflow-hidden rounded-md bg-black/[0.96] antialiased md:items-center md:justify-center">
      <div
        className={cn(
          "pointer-events-none absolute inset-0 [background-size:40px_40px] select-none",
          "[background-image:linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]",
        )}
      />
 
      <Spotlight
        className="-top-40 left-0 md:-top-20 md:left-60"
        fill="white"
      />
      <div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
        <h1 className="bg-opacity-50 bg-gradient-to-b from-neutral-50 to-neutral-400 bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
          <span className="block text-5xl md:text-8xl">
            GetUJob
          </span>
          <span className="block text-2xl md:text-4xl mt-2">
            A place to ask. A place to refer.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-neutral-300">
          Get referrals when you need them. Give referrals when you can.
        </p>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <ArrowDownFromLine className="w-8 h-8 text-white" />
      </div>  
    </div>
  )
}

export default Hero