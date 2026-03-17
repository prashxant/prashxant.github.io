"use client";

import { useEffect, useState } from "react";
import { SlidingNumber } from "./motion-primitives/sliding-number";
import { motion, AnimatePresence } from "framer-motion";

export const TimeBadge = () => {
  const [time, setTime] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
    period: "AM",
  });
  const [diff, setDiff] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const updateTime = () => {
      const now = new Date();

      const parts = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }).formatToParts(now);

      const getNumber = (type: string) =>
        Number(parts.find((p) => p.type === type)?.value);

      const getString = (type: string) =>
        parts.find((p) => p.type === type)?.value || "";

      const hours = getNumber("hour");
      const minutes = getNumber("minute");
      const seconds = getNumber("second");
      const period = getString("dayPeriod");

      const userOffset = now.getTimezoneOffset();
      const indiaOffset = -330;

      const diffMinutes = indiaOffset + userOffset;
      const diffHours = diffMinutes / 60;

      const rounded = Math.round(diffHours * 10) / 10;
      const sign = rounded > 0 ? "+" : "";

      setTime({ hours, minutes, seconds, period });
      setDiff(`${sign}${rounded} hr`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  return (
    <motion.div
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
      style={{
        backgroundColor:
          "color-mix(in oklab, var(--background) 50%, transparent)",
      }}
      className="
        inline-flex flex-row-reverse items-center gap-2 ml-2 mr-2 px-3 p-px
        rounded-md font-mono text-(--foreground)
        backdrop-blur-xl
        hover:border border-(--border)
        hover:shadow-[0_4px_20px_color-mix(in_oklab,var(--foreground)_18%,transparent)]
        hover:bg-(--card) transition-colors
      "
    >
      <span className="text-md text-center text-(--muted-foreground)">
        {diff}
      </span>

      {/* Divider */}
      <span className="text-(--muted-foreground)">|</span>

      {/* Clock */}
      <div className="flex items-center gap-0.5">
        <SlidingNumber value={time.hours} padStart />
        <motion.span
          aria-hidden="true"
          animate={{ opacity: time.seconds % 2 === 0 ? 1 : 0 }}
          transition={{ duration: 0.15, ease: "easeOut" }}
          className="text-(--muted-foreground) transition "
        >
          :
        </motion.span>
        <SlidingNumber value={time.minutes} padStart />

        {/* 🔥 Animated AM/PM */}
        <div className="relative mb-1 ml-1 h-3.5 overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={time.period}
              initial={{ y: 8, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              exit={{ y: -8, opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="block text-[14px]  uppercase tracking-widest text-(--muted-foreground)"
            >
              {time.period}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};
