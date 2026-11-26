import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import type { ReactNode } from "react";

import { YouTubeIcon } from "@/components/brand/youtube-icon";
import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";
import { site } from "@/content/site";
import { pageOpenGraph } from "@/lib/metadata";

export const metadata: Metadata = {
  title: "About",
  description:
    "Obscura Studios is an independent game development studio creating atmospheric, first-person experiences about the things waiting in ordinary places.",
  alternates: { canonical: "/about" },
  openGraph: pageOpenGraph({
    title: `About — ${site.name}`,
    description:
      "An independent game development studio creating atmospheric, first-person experiences about the things waiting in ordinary places.",
    url: "/about",
  }),
};

interface AboutRowProps {
  index: string;
  label: string;
  children: ReactNode;
}

function AboutRow({ index, label, children }: AboutRowProps) {
  return (
    <div className="border-t border-line py-10 md:py-14">
      <div className="grid gap-8 md:grid-cols-12">
        <div className="md:col-span-3">
          <div className="flex items-baseline gap-4">
            <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
              {index}
            </span>
            <span className="eyebrow">{label}</span>
          </div>
        </div>
        <Reveal className="md:col-span-8 md:col-start-5">{children}</Reveal>
      </div>
    </div>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="pb-14 pt-32 md:pb-20 md:pt-40">
        <div className="container-editorial">
          <div className="flex flex-wrap items-baseline justify-between gap-4 border-t border-line pt-5">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                About
              </span>
              <span className="eyebrow">Obscura Studios</span>
            </div>
            <span className="eyebrow">Independent game studio</span>
          </div>

          <h1 className="mt-8 max-w-5xl text-balance font-display text-[clamp(3rem,8vw,7rem)] font-medium leading-[0.88] tracking-[-0.055em] text-paper">
            A studio drawn to the dark.
          </h1>

          <p className="mt-8 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            Obscura Studios is an independent game development studio focused on
            creating memorable interactive experiences. From unsettling worlds
            to unexpected stories, every project begins with an idea worth
            exploring.
          </p>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="container-editorial">
          <AboutRow index="01" label="Identity">
            <p className="text-balance font-display text-2xl font-medium leading-[1.2] tracking-[-0.03em] text-paper md:text-3xl">
              We make small, atmospheric games about the things waiting in
              ordinary places.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Our work begins with a place, a sound, or a question that will not
              leave us alone. The result is a game that asks for your attention
              rather than your reflexes — and rewards it with a world that stays
              with you after the screen goes dark.
            </p>
          </AboutRow>

          <AboutRow index="02" label="Philosophy">
            <p className="text-base leading-relaxed text-muted">
              We are interested in the moment before something happens — the
              sound downstairs, the door that should be closed, the room you do
              not remember leaving. Atmosphere is not decoration to us. It is
              the story.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              We would rather build one room you remember than ten you walk
              through. Restraint, contrast, and a little silence do more than
              noise ever could.
            </p>
          </AboutRow>

          <AboutRow index="03" label="Approach">
            <p className="text-base leading-relaxed text-muted">
              Small scope. Focused development. Sound, light, and space doing as
              much work as spectacle. We prototype early, playtest often, and
              keep only what makes the world feel more real.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Every release is built to be finished, not padded. If a moment
              does not earn its place, it does not ship.
            </p>
          </AboutRow>

          <AboutRow index="04" label="What we make">
            <p className="text-base leading-relaxed text-muted">
              First-person horror and narrative experiences. Compact,
              atmospheric games built around curiosity, tension, and the feeling
              that the place you are standing in is not quite right.
            </p>
            <p className="mt-6 text-base leading-relaxed text-muted">
              Our debut release, <span className="text-paper">NOT TO LOVE</span>,
              is available on itch.io for Windows, macOS, and Linux.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <ActionLink href="/games/not-to-love" variant="secondary">
                View the game
              </ActionLink>
              <ActionLink href={site.itch.profileUrl} external variant="secondary">
                itch.io
              </ActionLink>
            </div>
          </AboutRow>

          <AboutRow index="05" label="Elsewhere">
            <p className="text-base leading-relaxed text-muted">
              Trailers, teasers, and development notes are published on the
              studio channel. Releases live on itch.io.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a
                href={site.youtube.main.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border border-line-strong px-5 py-4 transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <span className="inline-flex items-center gap-3">
                  <YouTubeIcon className="h-4 w-4 text-muted" />
                  <span className="font-display text-[10px] uppercase tracking-[0.2em] text-paper">
                    {site.youtube.main.label}
                  </span>
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
                  aria-hidden="true"
                />
              </a>

              <a
                href={site.itch.profileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center justify-between gap-4 border border-line-strong px-5 py-4 transition-colors hover:border-paper/40 hover:bg-paper/[0.04]"
              >
                <span className="font-display text-[10px] uppercase tracking-[0.2em] text-paper">
                  itch.io
                </span>
                <ArrowUpRight
                  className="h-3.5 w-3.5 text-muted transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-paper"
                  aria-hidden="true"
                />
              </a>
            </div>
          </AboutRow>
        </div>
      </section>
    </>
  );
}
