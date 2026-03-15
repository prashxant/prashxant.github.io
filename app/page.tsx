import { BlogPosts } from "components/posts";
import { SpinningText } from "components/motion-primitives/spinning-text";
import Image from "next/image";
import { TextScramble } from "components/motion-primitives/text-scramble";

import GithubHeatmap from "@/components/GItHubHeatmap";
import { ThemePaletteSlider } from "@/components/ThemePaletteSlider";
import { Connect } from "@/components/connect";

export default function Page() {
  return (
    <section>
      <div className="relative flex items-center justify-center w-50 h-50">
        <Image
          className="aspect-square border mr-16 rounded-full object-cover border-(--border) bg-(--card)"
          width={110}
          height={110}
          src="/pfpp.png"
          alt="Profile picture"
        />

        <SpinningText radius={6.8} className="mr-16 absolute">
          {`BUILD • SHIP • LEARN • REPEAT •`}
        </SpinningText>
      </div>

      <TextScramble className="font-mono text-2xl font-semibold tracking-tighter ">
        Prashant Sharma
      </TextScramble>

      <TextScramble
        duration={1.5}
        characterSet=". "
        className="mb-8 text-md font-extralight text-(--muted-foreground)"
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
        <ThemePaletteSlider />
      </div>
      <div className="my-8">
        <GithubHeatmap />
      </div>
      <div className="my-8">
        <BlogPosts />
      </div>
      <div className="">
        <Connect />
      </div>
    </section>
  );
}
