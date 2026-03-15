"use client";

import { InfiniteSlider } from "@/components/motion-primitives/infinite-slider";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

type ThemeMode = "light" | "dark";

type ThemeTokens = {
  background: string;
  foreground: string;
  card: string;
  cardForeground: string;
  muted: string;
  mutedForeground: string;
  primary: string;
  primaryForeground: string;
  accent: string;
  accentForeground: string;
  border: string;
  ring: string;
};

type ThemePalette = {
  id: string;
  label: string;
  tokens: Record<ThemeMode, ThemeTokens>;
};

const THEME_PALETTE_STORAGE_KEY = "portfolio:theme-palette";

const TOKEN_TO_CSS_VARIABLE: Record<keyof ThemeTokens, `--${string}`> = {
  background: "--background",
  foreground: "--foreground",
  card: "--card",
  cardForeground: "--card-foreground",
  muted: "--muted",
  mutedForeground: "--muted-foreground",
  primary: "--primary",
  primaryForeground: "--primary-foreground",
  accent: "--accent",
  accentForeground: "--accent-foreground",
  border: "--border",
  ring: "--ring",
};

const TWEAKCN_PALETTES: ThemePalette[] = [
  {
    id: "twitter",
    label: "Twitter",
    tokens: {
      light: {
        background: "#ffffff",
        foreground: "#0f1419",
        card: "#f7f8f8",
        cardForeground: "#0f1419",
        muted: "#E5E5E6",
        mutedForeground: "#0f1419",
        primary: "#1e9df1",
        primaryForeground: "#ffffff",
        accent: "#E3ECF6",
        accentForeground: "#1e9df1",
        border: "#e1eaef",
        ring: "#1da1f2",
      },
      dark: {
        background: "#000000",
        foreground: "#e7e9ea",
        card: "#17181c",
        cardForeground: "#d9d9d9",
        muted: "#181818",
        mutedForeground: "#72767a",
        primary: "#1c9cf0",
        primaryForeground: "#ffffff",
        accent: "#061622",
        accentForeground: "#1c9cf0",
        border: "#242628",
        ring: "#1da1f2",
      },
    },
  },
  {
    id: "amethyst-haze",
    label: "Amethyst Haze",
    tokens: {
      light: {
        background: "#f8f7fa",
        foreground: "#3d3c4f",
        card: "#ffffff",
        cardForeground: "#3d3c4f",
        muted: "#dcd9e3",
        mutedForeground: "#6b6880",
        primary: "#8a79ab",
        primaryForeground: "#f8f7fa",
        accent: "#e6a5b8",
        accentForeground: "#4b2e36",
        border: "#cec9d9",
        ring: "#8a79ab",
      },
      dark: {
        background: "#1a1823",
        foreground: "#e0ddef",
        card: "#232030",
        cardForeground: "#e0ddef",
        muted: "#242031",
        mutedForeground: "#a09aad",
        primary: "#a995c9",
        primaryForeground: "#1a1823",
        accent: "#372e3f",
        accentForeground: "#f2b8c6",
        border: "#302c40",
        ring: "#a995c9",
      },
    },
  },
  {
    id: "catppuccin",
    label: "Catppuccin",
    tokens: {
      light: {
        background: "#eff1f5",
        foreground: "#4c4f69",
        card: "#ffffff",
        cardForeground: "#4c4f69",
        muted: "#dce0e8",
        mutedForeground: "#6c6f85",
        primary: "#8839ef",
        primaryForeground: "#ffffff",
        accent: "#04a5e5",
        accentForeground: "#ffffff",
        border: "#bcc0cc",
        ring: "#8839ef",
      },
      dark: {
        background: "#181825",
        foreground: "#cdd6f4",
        card: "#1e1e2e",
        cardForeground: "#cdd6f4",
        muted: "#292c3c",
        mutedForeground: "#a6adc8",
        primary: "#cba6f7",
        primaryForeground: "#1e1e2e",
        accent: "#89dceb",
        accentForeground: "#1e1e2e",
        border: "#313244",
        ring: "#cba6f7",
      },
    },
  },
  {
    id: "kodama-grove",
    label: "Kodama Grove",
    tokens: {
      light: {
        background: "#e4d7b0",
        foreground: "#5c4b3e",
        card: "#e7dbbf",
        cardForeground: "#5c4b3e",
        muted: "#decea0",
        mutedForeground: "#85766a",
        primary: "#8d9d4f",
        primaryForeground: "#fdfbf6",
        accent: "#dbc894",
        accentForeground: "#5c4b3e",
        border: "#b19681",
        ring: "#9db18c",
      },
      dark: {
        background: "#3a3529",
        foreground: "#ede4d4",
        card: "#413c33",
        cardForeground: "#ede4d4",
        muted: "#4a4439",
        mutedForeground: "#a8a096",
        primary: "#8a9f7b",
        primaryForeground: "#2a2521",
        accent: "#a18f5c",
        accentForeground: "#2a2521",
        border: "#5a5345",
        ring: "#8a9f7b",
      },
    },
  },
  {
    id: "quantum-rose",
    label: "Quantum Rose",
    tokens: {
      light: {
        background: "#fff0f8",
        foreground: "#91185c",
        card: "#fff7fc",
        cardForeground: "#91185c",
        muted: "#ffe3f2",
        mutedForeground: "#c04283",
        primary: "#e6067a",
        primaryForeground: "#ffffff",
        accent: "#ffc1e3",
        accentForeground: "#91185c",
        border: "#ffc7e6",
        ring: "#e6067a",
      },
      dark: {
        background: "#1a0922",
        foreground: "#ffb3ff",
        card: "#2a1435",
        cardForeground: "#ffb3ff",
        muted: "#331941",
        mutedForeground: "#d67ad6",
        primary: "#ff6bef",
        primaryForeground: "#180518",
        accent: "#5a1f5d",
        accentForeground: "#ffb3ff",
        border: "#4a1b5f",
        ring: "#ff6bef",
      },
    },
  },
  {
    id: "notebook",
    label: "Notebook",
    tokens: {
      light: {
        background: "#f9f9f9",
        foreground: "#3a3a3a",
        card: "#ffffff",
        cardForeground: "#3a3a3a",
        muted: "#e3e3e3",
        mutedForeground: "#505050",
        primary: "#606060",
        primaryForeground: "#f0f0f0",
        accent: "#f3eac8",
        accentForeground: "#5d4037",
        border: "#747272",
        ring: "#a0a0a0",
      },
      dark: {
        background: "#2b2b2b",
        foreground: "#dcdcdc",
        card: "#333333",
        cardForeground: "#dcdcdc",
        muted: "#454545",
        mutedForeground: "#a0a0a0",
        primary: "#b0b0b0",
        primaryForeground: "#2b2b2b",
        accent: "#e0e0e0",
        accentForeground: "#333333",
        border: "#4f4f4f",
        ring: "#c0c0c0",
      },
    },
  },
  {
    id: "graphite",
    label: "Graphite",
    tokens: {
      light: {
        background: "#f0f0f0",
        foreground: "#333333",
        card: "#f5f5f5",
        cardForeground: "#333333",
        muted: "#d9d9d9",
        mutedForeground: "#666666",
        primary: "#606060",
        primaryForeground: "#ffffff",
        accent: "#c0c0c0",
        accentForeground: "#333333",
        border: "#d0d0d0",
        ring: "#606060",
      },
      dark: {
        background: "#1a1a1a",
        foreground: "#d9d9d9",
        card: "#202020",
        cardForeground: "#d9d9d9",
        muted: "#2a2a2a",
        mutedForeground: "#808080",
        primary: "#a0a0a0",
        primaryForeground: "#1a1a1a",
        accent: "#404040",
        accentForeground: "#d9d9d9",
        border: "#353535",
        ring: "#a0a0a0",
      },
    },
  },
  {
    id: "cosmic-night",
    label: "Cosmic Night",
    tokens: {
      light: {
        background: "#f5f5ff",
        foreground: "#2a2a4a",
        card: "#ffffff",
        cardForeground: "#2a2a4a",
        muted: "#f0f0fa",
        mutedForeground: "#6c6c8a",
        primary: "#6e56cf",
        primaryForeground: "#ffffff",
        accent: "#d8e6ff",
        accentForeground: "#2a2a4a",
        border: "#e0e0f0",
        ring: "#6e56cf",
      },
      dark: {
        background: "#0f0f1a",
        foreground: "#e2e2f5",
        card: "#1a1a2e",
        cardForeground: "#e2e2f5",
        muted: "#222244",
        mutedForeground: "#a0a0c0",
        primary: "#a48fff",
        primaryForeground: "#0f0f1a",
        accent: "#303060",
        accentForeground: "#e2e2f5",
        border: "#303052",
        ring: "#a48fff",
      },
    },
  },
  {
    id: "nature",
    label: "Nature",
    tokens: {
      light: {
        background: "#f8f5f0",
        foreground: "#3e2723",
        card: "#f8f5f0",
        cardForeground: "#3e2723",
        muted: "#f0e9e0",
        mutedForeground: "#6d4c41",
        primary: "#2e7d32",
        primaryForeground: "#ffffff",
        accent: "#c8e6c9",
        accentForeground: "#1b5e20",
        border: "#e0d6c9",
        ring: "#2e7d32",
      },
      dark: {
        background: "#1c2a1f",
        foreground: "#f0ebe5",
        card: "#2d3a2e",
        cardForeground: "#f0ebe5",
        muted: "#252f26",
        mutedForeground: "#d7cfc4",
        primary: "#4caf50",
        primaryForeground: "#0a1f0c",
        accent: "#388e3c",
        accentForeground: "#f0ebe5",
        border: "#3e4a3d",
        ring: "#4caf50",
      },
    },
  },
  {
    id: "amber-minimal",
    label: "Amber Minimal",
    tokens: {
      light: {
        background: "#ffffff",
        foreground: "#262626",
        card: "#ffffff",
        cardForeground: "#262626",
        muted: "#f9fafb",
        mutedForeground: "#6b7280",
        primary: "#f59e0b",
        primaryForeground: "#000000",
        accent: "#fffbeb",
        accentForeground: "#92400e",
        border: "#e5e7eb",
        ring: "#f59e0b",
      },
      dark: {
        background: "#171717",
        foreground: "#e5e5e5",
        card: "#262626",
        cardForeground: "#e5e5e5",
        muted: "#1f1f1f",
        mutedForeground: "#a3a3a3",
        primary: "#f59e0b",
        primaryForeground: "#000000",
        accent: "#92400e",
        accentForeground: "#fde68a",
        border: "#404040",
        ring: "#f59e0b",
      },
    },
  },
  {
    id: "tangerine",
    label: "Tangerine",
    tokens: {
      light: {
        background: "#e8ebed",
        foreground: "#333333",
        card: "#ffffff",
        cardForeground: "#333333",
        muted: "#f9fafb",
        mutedForeground: "#6b7280",
        primary: "#e05d38",
        primaryForeground: "#ffffff",
        accent: "#d6e4f0",
        accentForeground: "#1e3a8a",
        border: "#dcdfe2",
        ring: "#e05d38",
      },
      dark: {
        background: "#1c2433",
        foreground: "#e5e5e5",
        card: "#2a3040",
        cardForeground: "#e5e5e5",
        muted: "#2a303e",
        mutedForeground: "#a3a3a3",
        primary: "#e05d38",
        primaryForeground: "#ffffff",
        accent: "#2a3656",
        accentForeground: "#bfdbfe",
        border: "#3d4354",
        ring: "#e05d38",
      },
    },
  },
  {
    id: "bold-tech",
    label: "Bold Tech",
    tokens: {
      light: {
        background: "#ffffff",
        foreground: "#312e81",
        card: "#ffffff",
        cardForeground: "#312e81",
        muted: "#f5f3ff",
        mutedForeground: "#7c3aed",
        primary: "#8b5cf6",
        primaryForeground: "#ffffff",
        accent: "#dbeafe",
        accentForeground: "#1e40af",
        border: "#e0e7ff",
        ring: "#8b5cf6",
      },
      dark: {
        background: "#0f172a",
        foreground: "#e0e7ff",
        card: "#1e1b4b",
        cardForeground: "#e0e7ff",
        muted: "#171447",
        mutedForeground: "#c4b5fd",
        primary: "#8b5cf6",
        primaryForeground: "#ffffff",
        accent: "#4338ca",
        accentForeground: "#e0e7ff",
        border: "#2e1065",
        ring: "#8b5cf6",
      },
    },
  },
  {
    id: "doom-64",
    label: "Doom 64",
    tokens: {
      light: {
        background: "#cccccc",
        foreground: "#1f1f1f",
        card: "#b0b0b0",
        cardForeground: "#1f1f1f",
        muted: "#b8b8b8",
        mutedForeground: "#4a4a4a",
        primary: "#b71c1c",
        primaryForeground: "#ffffff",
        accent: "#4682b4",
        accentForeground: "#ffffff",
        border: "#505050",
        ring: "#b71c1c",
      },
      dark: {
        background: "#1a1a1a",
        foreground: "#e0e0e0",
        card: "#2a2a2a",
        cardForeground: "#e0e0e0",
        muted: "#252525",
        mutedForeground: "#a0a0a0",
        primary: "#e53935",
        primaryForeground: "#ffffff",
        accent: "#64b5f6",
        accentForeground: "#000000",
        border: "#4a4a4a",
        ring: "#e53935",
      },
    },
  },
];

const SECOND_ROW_PALETTES = [
  ...TWEAKCN_PALETTES.slice(Math.floor(TWEAKCN_PALETTES.length / 2)),
  ...TWEAKCN_PALETTES.slice(0, Math.floor(TWEAKCN_PALETTES.length / 2)),
];

function resolveStoredPaletteId() {
  if (typeof window === "undefined") {
    return null;
  }

  const storedPaletteId = window.localStorage.getItem(
    THEME_PALETTE_STORAGE_KEY,
  );

  if (
    storedPaletteId &&
    TWEAKCN_PALETTES.some((palette) => palette.id === storedPaletteId)
  ) {
    return storedPaletteId;
  }

  return null;
}

function applyPaletteTokens(tokens: ThemeTokens) {
  const root = document.documentElement;

  (
    Object.entries(TOKEN_TO_CSS_VARIABLE) as Array<[keyof ThemeTokens, string]>
  ).forEach(([token, cssVariable]) => {
    root.style.setProperty(cssVariable, tokens[token]);
  });

  root.style.setProperty("--selection-bg", tokens.primary);
  root.style.setProperty("--selection-fg", tokens.primaryForeground);
}

function PalettePill({
  palette,
  mode,
  isActive,
  onClick,
}: {
  palette: ThemePalette;
  mode: ThemeMode;
  isActive: boolean;
  onClick: () => void;
}) {
  const tokens = palette.tokens[mode];
  const swatches = [tokens.primary, tokens.accent, tokens.muted];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isActive}
      aria-label={`Apply ${palette.label} theme`}
      className={cn(
        "group flex items-center gap-4 rounded-2xl border px-4 py-3 text-left transition-[transform,opacity] duration-300 will-change-transform",
        isActive
          ? "scale-[1.02]"
          : "opacity-90 hover:scale-[1.01] hover:opacity-100",
      )}
      style={{
        backgroundColor: tokens.card,
        color: tokens.foreground,
        borderColor: isActive ? tokens.primary : tokens.border,
        boxShadow: isActive ? `0 0 0 2px ${tokens.ring}33` : "none",
      }}
    >
      <span className="flex items-center gap-1.5">
        {swatches.map((color) => (
          <span
            key={`${palette.id}-${color}`}
            className="size-4 rounded-[0.35rem] border dark:border-white/40 border-black/30"
            style={{ backgroundColor: color }}
          />
        ))}
      </span>
    </button>
  );
}

export function ThemePaletteSlider() {
  const [isMounted, setIsMounted] = useState(false);
  const [activePaletteId, setActivePaletteId] = useState(() => {
    return resolveStoredPaletteId() ?? TWEAKCN_PALETTES[0].id;
  });
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const activePalette = useMemo(
    () =>
      TWEAKCN_PALETTES.find((palette) => palette.id === activePaletteId) ??
      TWEAKCN_PALETTES[0],
    [activePaletteId],
  );

  const mode: ThemeMode =
    isMounted && resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    window.localStorage.setItem(THEME_PALETTE_STORAGE_KEY, activePalette.id);
    applyPaletteTokens(activePalette.tokens[mode]);
  }, [activePalette, isMounted, mode]);

  return (
    <section
      className="relative overflow-hidden mask-x-from-80% mask-x-to-97% p-3"
      aria-label="Theme palette slider"
    >
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-linear-to-r from-(--background) to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-linear-to-l from-(--background) to-transparent" />
      <div className="space-y-3">
        <InfiniteSlider
          direction="horizontal"
          reverse
          gap={18}
          speed={44}
          speedOnHover={18}
        >
          <div className="flex items-center gap-3 py-1">
            {TWEAKCN_PALETTES.map((palette) => (
              <PalettePill
                key={palette.id}
                palette={palette}
                mode={mode}
                isActive={palette.id === activePalette.id}
                onClick={() => setActivePaletteId(palette.id)}
              />
            ))}
          </div>
        </InfiniteSlider>

        <InfiniteSlider
          direction="horizontal"
          gap={18}
          speed={44}
          speedOnHover={18}
        >
          <div className="flex items-center gap-3 py-1">
            {SECOND_ROW_PALETTES.map((palette) => (
              <PalettePill
                key={`second-${palette.id}`}
                palette={palette}
                mode={mode}
                isActive={palette.id === activePalette.id}
                onClick={() => setActivePaletteId(palette.id)}
              />
            ))}
          </div>
        </InfiniteSlider>
      </div>
    </section>
  );
}

export function ThemePaletteHydrator() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const mode: ThemeMode =
    isMounted && resolvedTheme === "dark" ? "dark" : "light";

  useEffect(() => {
    if (!isMounted) {
      return;
    }

    const storedPaletteId = resolveStoredPaletteId();

    if (!storedPaletteId) {
      return;
    }

    const storedPalette = TWEAKCN_PALETTES.find(
      (palette) => palette.id === storedPaletteId,
    );

    if (!storedPalette) {
      return;
    }

    applyPaletteTokens(storedPalette.tokens[mode]);
  }, [isMounted, mode]);

  return null;
}
