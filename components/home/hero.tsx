"use client";

import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Play } from "lucide-react";
import { useRef } from "react";

import { EclipseMark } from "@/components/brand/eclipse-mark";
import { ActionLink } from "@/components/ui/action-link";
import { site } from "@/content/site";

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.12 },
  },
};

const line = {
  hidden: { y: "115%" },
  visible: {
    y: 0,
    transition: { duration: 1.05, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const fade = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const markY = useTransform(scrollYProgress, [0, 1], [0, 130]);
  const markOpacity = useTransform(scrollYProgress, [0, 1], [1, 0.2]);

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col overflow-hidden pb-8 pt-28 md:pt-32"
    >
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="vignette pointer-events-none absolute inset-0" />

      <motion.div
        aria-hidden="true"
        style={reduceMotion ? undefined : { y: markY, opacity: markOpacity }}
        className="pointer-events-none absolute -right-[24vw] top-1/2 hidden -translate-y-1/2 md:block"
      >
        <EclipseMark className="h-[68vw] w-[68vw] max-h-[820px] max-w-[820px] text-paper/[0.035]" />
      </motion.div>

      <motion.div
        className="container-editorial relative z-10 flex flex-1 flex-col justify-center py-10"
        variants={container}
        initial={reduceMotion ? false : "hidden"}
        animate="visible"
      >
        <motion.p variants={fade} className="eyebrow">
          Independent game studio
        </motion.p>

        <h1 className="display-hero mt-8 text-paper">
          <span className="block overflow-hidden pb-1">
            <motion.span variants={line} className="block">
              OBSCURA
            </motion.span>
          </span>{" "}
          <span className="block overflow-hidden pb-2">
            <motion.span variants={line} className="block">
              STUDIOS
            </motion.span>
          </span>
        </h1>

        <div className="mt-10 grid gap-7 md:grid-cols-12 md:items-end md:gap-8">
          <motion.p
            variants={fade}
            className="max-w-md text-lg leading-relaxed text-paper/80 md:col-span-5 md:text-xl"
          >
            {site.tagline}
          </motion.p>
          <motion.p
            variants={fade}
            className="max-w-sm text-sm leading-relaxed text-muted md:col-span-4 md:col-start-9"
          >
            An independent studio building atmospheric, first-person games
            about the things waiting in ordinary places.
          </motion.p>
        </div>

        <motion.div
          variants={fade}
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          <ActionLink href="/games">Explore games</ActionLink>
          <ActionLink
            href="https://www.youtube.com/watch?v=gD9-l5ZBbe0"
            variant="secondary"
            external
            showArrow={false}
            icon={<Play className="h-3.5 w-3.5 fill-current" aria-hidden="true" />}
          >
            Watch the trailer
          </ActionLink>
        </motion.div>
      </motion.div>

      <motion.div
        className="container-editorial relative z-10 mt-12"
        initial={reduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.8 }}
      >
        <div className="flex flex-col gap-3 border-t border-line pt-5 font-display text-[9px] uppercase tracking-[0.2em] text-muted sm:flex-row sm:items-center sm:justify-between">
          <span>Independent game studio</span>
          <span className="hidden sm:inline">Debut release — NOT TO LOVE</span>
          <span>Windows · macOS · Linux</span>
        </div>
      </motion.div>
    </section>
  );
}
