"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

export default function GithubHeatmap() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const last6Months = (data: any) => {
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 8);

    return data.filter((day: any) => new Date(day.date) >= sixMonthsAgo);
  };

  const colorScheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  const heatmapTheme = {
    light: ["#f8fafc", "#cfe9d6", "#95d5a6", "#58b272", "#2f7d46"],
    dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
  };

  return (
    <div className="flex justify-center">
      <GitHubCalendar
        username="prashxant"
        transformData={last6Months}
        theme={heatmapTheme}
        colorScheme={colorScheme}
      />
    </div>
  );
}
