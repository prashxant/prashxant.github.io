"use client";

import { motion } from "motion/react";
import type { ReactNode } from "react";

type RevealSectionProps = {
  children: ReactNode;
};

const VARIANTS_CONTAINER = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
    },
  },
};

export function RevealSection({ children }: RevealSectionProps) {
  return (
    <motion.section
      initial="hidden"
      animate="visible"
      variants={VARIANTS_CONTAINER}
    >
      {children}
    </motion.section>
  );
}
