import { BlogPosts } from "components/posts";
import { SpinningText } from "components/motion-primitives/spinning-text";
import Image from "next/image";
import { TextScramble } from "components/motion-primitives/text-scramble";
import { EMAIL, SOCIAL_LINKS } from "./data";
import { Connect } from "@/components/connect";



export default function Page() {
  return (
    <section>
      <div className="relative flex items-center justify-center w-[200px] h-[200px]">
        <Image
          className="aspect-square border mr-16 border-amber-100 rounded-full bg-white object-cover"
          width={110}
          height={110}
          src="/pfpp.png"
          alt="Profile picture"
        />

        <SpinningText radius={6.8} className="mr-16 absolute">
          {`pre-order • pre-order • pre-order • `}
        </SpinningText>
      </div>

      <TextScramble className="font-mono text-2xl font-semibold tracking-tighter ">
        Prashant Sharma
      </TextScramble>

      <TextScramble
        duration={1.5}
        characterSet=". "
        className="mb-8 text-md text-white/50 font-extralight"
      >
        Trying to understand tech
      </TextScramble>

      <p className="mb-4">
        {`I'm a Vim enthusiast and tab advocate, finding unmatched efficiency in
        Vim's keystroke commands and tabs' flexibility for personal viewing
        preferences. This extends to my support for static typing, where its
        early error detection ensures cleaner code, and my preference for dark
        mode, which eases long coding sessions by reducing eye strain.`}
      </p>
      <div className="my-8">
        <BlogPosts />
      </div>
      <div className="pt-8">
        <Connect/>
      </div>
    </section>
  );
}
