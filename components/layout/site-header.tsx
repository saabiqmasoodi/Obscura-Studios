"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

import { LogoLockup } from "@/components/brand/logo-lockup";
import { YouTubeIcon } from "@/components/brand/youtube-icon";
import { ActionLink } from "@/components/ui/action-link";
import { navigation, secondaryChannel, site } from "@/content/site";
import { cn } from "@/lib/format";

function isActive(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}

const menuVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const isHome = pathname === "/";
  const solid = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);

      if (event.key === "Tab" && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener("keydown", onKeyDown);
    const focusTimer = window.setTimeout(() => closeButtonRef.current?.focus(), 60);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKeyDown);
      window.clearTimeout(focusTimer);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color,backdrop-filter] duration-500",
          solid
            ? "border-line bg-ink/85 backdrop-blur-md"
            : "border-transparent bg-transparent",
        )}
      >
        <div className="container-editorial flex h-[72px] items-center justify-between">
          <LogoLockup />

          <nav
            aria-label="Primary"
            className="hidden items-center gap-8 md:flex"
          >
            {navigation.map((item) => {
              const active = isActive(pathname, item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "group relative py-2 font-display text-[10px] font-medium uppercase tracking-[0.2em] transition-colors duration-300",
                    active ? "text-paper" : "text-muted hover:text-paper",
                  )}
                >
                  {item.label}
                  <span
                    className={cn(
                      "absolute -bottom-0.5 left-0 h-px bg-crimson-soft transition-all duration-300 ease-cinema",
                      active ? "w-full" : "w-0 group-hover:w-full",
                    )}
                    aria-hidden="true"
                  />
                </Link>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <ActionLink
              href={site.youtube.main.url}
              variant="secondary"
              external
              icon={<YouTubeIcon className="h-3.5 w-3.5" />}
              className="px-4 py-2.5"
            >
              YouTube
            </ActionLink>
          </div>

          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
            className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04] md:hidden"
          >
            <Menu className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {open ? (
          <motion.div
            ref={menuRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="fixed inset-0 z-[70] flex flex-col bg-ink md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22 }}
          >
            <div className="container-editorial flex h-[72px] shrink-0 items-center justify-between border-b border-line">
              <LogoLockup onClick={() => setOpen(false)} />
              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close menu"
                className="inline-flex h-11 w-11 items-center justify-center border border-line-strong text-paper transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <motion.nav
              aria-label="Mobile"
              className="container-editorial flex flex-1 flex-col justify-center py-8"
              variants={menuVariants}
              initial="hidden"
              animate="visible"
            >
              {navigation.map((item, index) => (
                <motion.div key={item.href} variants={itemVariants}>
                  <Link
                    href={item.href}
                    onClick={() => setOpen(false)}
                    aria-current={
                      isActive(pathname, item.href) ? "page" : undefined
                    }
                    className="group flex items-center justify-between border-b border-line py-5"
                  >
                    <span
                      className={cn(
                        "font-display text-[2.4rem] font-medium leading-none tracking-[-0.04em] transition-colors",
                        isActive(pathname, item.href)
                          ? "text-paper"
                          : "text-paper/70 group-hover:text-paper",
                      )}
                    >
                      {item.label}
                    </span>
                    <span className="font-display text-[10px] tracking-[0.2em] text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </motion.nav>

            <motion.div
              className="container-editorial shrink-0 border-t border-line py-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.28, duration: 0.4 }}
            >
              <a
                href={site.youtube.main.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between py-2 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
              >
                <span className="inline-flex items-center gap-2.5">
                  <YouTubeIcon className="h-4 w-4" />
                  {site.youtube.main.label}
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  aria-hidden="true"
                />
              </a>

              {secondaryChannel ? (
                <a
                  href={secondaryChannel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between py-2 font-display text-[10px] uppercase tracking-[0.2em] text-muted transition-colors hover:text-paper"
                >
                  <span className="inline-flex items-center gap-2.5">
                    <YouTubeIcon className="h-4 w-4" />
                    {secondaryChannel.label || "Second channel"}
                  </span>
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-hidden="true"
                  />
                </a>
              ) : null}

              <p className="mt-5 font-display text-[9px] uppercase tracking-[0.24em] text-muted/70">
                Independent game studio
              </p>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
