"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export default function GithubHeatmap() {
  return (
    <div className="flex justify-center">
      <GitHubCalendar username="prashxant" />
    </div>
  );
}
