import dynamic from "next/dynamic";
import { BlogPosts } from "@/components/posts";
import { SpinningText } from "@/components/motion-primitives/spinning-text";
import Image from "next/image";
import { TextScramble } from "@/components/motion-primitives/text-scramble";

import { Connect } from "@/components/connect";
import { TimeBadge } from "@/components/TimeBadge";

const GithubHeatmap = dynamic(() => import("@/components/GItHubHeatmap"), {
  loading: () => (
    <div className="h-32 w-full animate-pulse rounded-lg bg-(--card)" />
  ),
});

const ThemePaletteSlider = dynamic(
  () =>
    import("@/components/ThemePaletteSlider").then(
      (mod) => mod.ThemePaletteSlider,
    ),
  {
    loading: () => (
      <div className="h-40 w-full animate-pulse rounded-lg bg-(--card)" />
    ),
  },
);

const HERO_RING_TEXT = "BUILD • SHIP • LEARN • REPEAT •";
const SHORT_BIO =
  "I build full-stack products with a focus on speed, clean architecture, and strong fundamentals. Working with Next.js, React, Postgres, Prisma, and modern UI systems. Currently exploring AI workflows and looking for opportunities to build meaningful products.";

export default function Page() {
  return (
    <section>
      <div className="relative flex h-50 w-50 items-center justify-center">
        <Image
          className="mr-16 aspect-square rounded-full border border-(--border) bg-(--card) object-cover"
          width={110}
          height={110}
          src="/pfpp.png"
          alt="Profile picture"
          priority
          sizes="110px"
        />

        <SpinningText radius={6.9} className="absolute mr-16">
          {HERO_RING_TEXT}
        </SpinningText>
      </div>

      <div className="mb-8 flex flex-wrap items-start gap-x-3 gap-y-2">
        <TextScramble
          as="h1"
          className="order-1 font-mono text-2xl font-semibold tracking-tighter"
        >
          Prashant Sharma
        </TextScramble>

        <TextScramble
          as="p"
          duration={1.5}
          characterSet=". "
          className="order-2 basis-full text-md font-extralight text-(--muted-foreground)"
        >
          Trying to understand tech
        </TextScramble>

        <div className="order-3 basis-full md:order-2 md:basis-auto">
          <TimeBadge />
        </div>
      </div>

      <p className="mb-4">{SHORT_BIO}</p>

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
