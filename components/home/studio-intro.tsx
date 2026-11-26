import { ActionLink } from "@/components/ui/action-link";
import { Reveal } from "@/components/ui/reveal";

export function StudioIntro() {
  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <div className="grid gap-10 border-t border-line pt-8 md:grid-cols-12">
          <div className="md:col-span-3">
            <div className="flex items-baseline gap-4">
              <span className="font-display text-[10px] font-medium tracking-[0.22em] text-crimson-soft">
                03
              </span>
              <span className="eyebrow">The studio</span>
            </div>
          </div>

          <Reveal className="md:col-span-8 md:col-start-5">
            <p className="text-balance font-display text-2xl font-medium leading-[1.16] tracking-[-0.03em] text-paper md:text-4xl">
              Obscura Studios is an independent game development studio focused
              on creating memorable interactive experiences.
            </p>
            <p className="mt-8 max-w-xl text-base leading-relaxed text-muted">
              From unsettling worlds to unexpected stories, every project
              begins with an idea worth exploring. We build small, atmospheric
              games about the things waiting in ordinary places.
            </p>
            <ActionLink
              href="/about"
              variant="ghost"
              className="mt-8 px-0 py-0"
            >
              About the studio
            </ActionLink>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
