"use client";

import { motion } from "motion/react";
import { MagneticSocialLink } from "./MagneticSocial";
import { EMAIL, SOCIAL_LINKS } from "@/app/data";

const VARIANTS_SECTION = {
  hidden: { opacity: 0, y: 20, filter: "blur(8px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)" },
};
const TRANSITION_SECTION = {
  duration: 0.3,
};

export const Connect = () => {
  return (
    <motion.section variants={VARIANTS_SECTION} transition={TRANSITION_SECTION}>
      <h3 className="mb-5 text-2xl border-b border-(--border)  font-medium">
        Connect
      </h3>
      <p className="mb-5 text-(--muted-foreground)">
        Feel free to contact me at{" "}
        <a className="underline text-(--primary)" href={`mailto:${EMAIL}`}>
          {EMAIL}
        </a>
      </p>
      <div className="flex  flex-col space-y-3 md:flex-row md:space-x-2  ">
        {SOCIAL_LINKS.map((link) => (
          <MagneticSocialLink key={link.label} link={link.link}>
            {link.label}
          </MagneticSocialLink>
        ))}
      </div>
    </motion.section>
  );
};
