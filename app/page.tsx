import { BlogPosts } from "@/components/posts";
import { SpinningText } from "@/components/motion-primitives/spinning-text";
import Image from "next/image";
import { TextScramble } from "@/components/motion-primitives/text-scramble";

import GithubHeatmap from "@/components/GItHubHeatmap";
import { ThemePaletteSlider } from "@/components/ThemePaletteSlider";
import { Connect } from "@/components/connect";
import { TimeBadge } from "@/components/TimeBadge";

export default function Page() {
  return (
    <section>
      <div className="relative flex items-center justify-center w-50 h-50">
        <Image
          className="aspect-square  border mr-16 rounded-full object-cover border-(--border) bg-(--card)"
          width={110}
          height={110}
          src="/pfpp.png"
          alt="Profile picture"
        />

        <SpinningText radius={6.9} className="mr-16  absolute">
          {`BUILD • SHIP • LEARN • REPEAT •`}
        </SpinningText>
      </div>
      <div className="flex items-end gap-3">
        <TextScramble className="font-mono text-2xl font-semibold tracking-tighter ">
          Prashant Sharma
        </TextScramble>
        <TimeBadge />
      </div>
      <TextScramble
        duration={1.5}
        characterSet=". "
        className="mb-8 text-md font-extralight text-(--muted-foreground)"
      >
        Trying to understand tech
      </TextScramble>

      <div className="mb-4">
        {`I build full-stack products with a focus on speed, clean architecture, and strong fundamentals.
        Working with Next.js, React, Postgres, Prisma, and modern UI systems.Currently exploring AI workflows and looking for opportunities to build meaningful products.`}
      </div>
      <div className="my-8">
        <ThemePaletteSlider />
      </div>
      <div className="my-8">
        <GithubHeatmap />
      </div>
      <div className="my-8">
        <h1 className="font-semibold border-b border-(--border) text-2xl mb-8 tracking-tighter">
          Writings
        </h1>
        <BlogPosts />
      </div>
      <div className="">
        <Connect />
      </div>
    </section>
  );
}
