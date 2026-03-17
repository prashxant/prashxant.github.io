"use client";
import { AnimatedBackground } from "@/components/ui/animated-background";
import { TextLoop } from "@/components/ui/text-loop";
import { MonitorIcon, MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";
import {
  startTransition,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const THEMES_OPTIONS = [
  {
    label: "Light",
    id: "light",
    icon: <SunIcon className="h-4 w-4" />,
  },
  {
    label: "Dark",
    id: "dark",
    icon: <MoonIcon className="h-4 w-4" />,
  },
  {
    label: "System",
    id: "system",
    icon: <MonitorIcon className="h-4 w-4" />,
  },
];

const THEME_IDS = new Set(THEMES_OPTIONS.map((option) => option.id));

function ThemeSwitch() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const { theme, resolvedTheme, setTheme } = useTheme();

  const toggleTheme = useCallback(() => {
    const nextTheme = resolvedTheme === "dark" ? "light" : "dark";
    startTransition(() => {
      setTheme(nextTheme);
    });
  }, [resolvedTheme, setTheme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted || !rootRef.current) {
      return;
    }

    const win = rootRef.current.ownerDocument?.defaultView ?? window;

    const handleKeyDown = (event: KeyboardEvent) => {
      const pressedShortcut =
        (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "d";
      if (!pressedShortcut) {
        return;
      }

      const target = event.target as HTMLElement | null;
      const isTypingTarget =
        target?.tagName === "INPUT" ||
        target?.tagName === "TEXTAREA" ||
        target?.tagName === "SELECT" ||
        target?.isContentEditable;

      if (isTypingTarget) {
        return;
      }

      event.preventDefault();
      toggleTheme();
    };

    win.addEventListener("keydown", handleKeyDown);

    return () => {
      win.removeEventListener("keydown", handleKeyDown);
    };
  }, [mounted, toggleTheme]);

  if (!mounted) {
    return null;
  }

  return (
    <div ref={rootRef}>
      <AnimatedBackground
        className="rounded-lg border border-(--border) bg-(--muted)"
        defaultValue={theme}
        transition={{
          type: "spring",
          bounce: 0,
          duration: 0.2,
        }}
        enableHover={false}
        onValueChange={(id) => {
          if (!id || !THEME_IDS.has(id)) {
            return;
          }
          startTransition(() => {
            setTheme(id);
          });
        }}
      >
        {THEMES_OPTIONS.map((theme) => {
          return (
            <button
              key={theme.id}
              className="inline-flex h-7 w-7 items-center justify-center text-(--muted-foreground) transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-(--foreground)"
              type="button"
              aria-label={`Switch to ${theme.label} theme`}
              data-id={theme.id}
            >
              {theme.icon}
            </button>
          );
        })}
      </AnimatedBackground>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="my-8 border-t  border-(--border) px-0 py-4">
      <div className="flex items-end justify-between">
        <a
          href="https://github.com/prashxant/prashxant.github.io"
          target="_blank"
          rel="noreferrer"
          className="flex gap-2"
        >
          <span className=" text-xs  text-(--muted-foreground)">
            Butilt with
          </span>
          <TextLoop className="text-xs text-(--foreground)">
            <span>Next.js.</span>
            <span>Motion-Primitives.</span>
            <span>Tailwind.</span>
            <span>❤️ also.. </span>
          </TextLoop>
        </a>

        <div className="text-xs text-(--foreground)">
          <ThemeSwitch />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
