"use client";

import dynamic from "next/dynamic";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export default function GithubHeatmap() {
  const last6Months = (data: any) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 8);

    return data.filter((day: any) => new Date(day.date) >= sixMonthsAgo);
  };

  return (
    <div className="flex justify-center">
      <GitHubCalendar username="prashxant" transformData={last6Months} />
    </div>
  );
}
