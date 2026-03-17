"use client";

import dynamic from "next/dynamic";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const GitHubCalendar = dynamic(
  () => import("react-github-calendar").then((mod) => mod.GitHubCalendar),
  { ssr: false },
);

type ContributionDay = {
  date: string;
};

const MONTHS_TO_SHOW = 8;

const HEATMAP_THEME = {
  light: ["#f8fafc", "#cfe9d6", "#95d5a6", "#58b272", "#2f7d46"],
  dark: ["#161b22", "#0e4429", "#006d32", "#26a641", "#39d353"],
};

function filterRecentContributions<T extends ContributionDay>(data: T[]) {
  const thresholdDate = new Date();
  thresholdDate.setMonth(thresholdDate.getMonth() - MONTHS_TO_SHOW);

  return data.filter((day) => new Date(day.date) >= thresholdDate);
}

export default function GithubHeatmap() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const colorScheme = mounted && resolvedTheme === "dark" ? "dark" : "light";

  return (
    <div className="flex justify-center">
      <GitHubCalendar
        username="prashxant"
        transformData={filterRecentContributions}
        theme={HEATMAP_THEME}
        colorScheme={colorScheme}
      />
    </div>
  );
}
