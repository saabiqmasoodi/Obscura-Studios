import Image from "next/image";

import { EclipseMark } from "@/components/brand/eclipse-mark";
import { YouTubeIcon } from "@/components/brand/youtube-icon";
import { ActionLink } from "@/components/ui/action-link";
import { SectionHeading } from "@/components/ui/section-heading";
import { VideoFacade } from "@/components/youtube/video-facade";
import { VideoRow } from "@/components/youtube/video-row";
import { secondaryChannel } from "@/content/site";
import type { YouTubeData } from "@/types";

interface YouTubeSectionProps {
  data: YouTubeData;
}

export function YouTubeSection({ data }: YouTubeSectionProps) {
  const { channel, featured } = data;
  const recent = data.videos
    .filter((video) => video.id !== featured?.id)
    .slice(0, 2);

  return (
    <section className="py-20 md:py-28">
      <div className="container-editorial">
        <SectionHeading
          index="04"
          eyebrow="Watch"
          title="See the worlds move."
          description="Trailers, teasers and updates from the studio channel."
          action={
            <ActionLink
              href={channel.url}
              variant="ghost"
              external
              className="px-0 py-0"
            >
              YouTube channel
            </ActionLink>
          }
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-12 lg:gap-8">
          <div className="flex flex-col border border-line bg-surface/40 p-6 md:p-7 lg:col-span-4">
            <div className="flex items-center gap-4">
              <span className="relative h-14 w-14 shrink-0 overflow-hidden rounded-full border border-line-strong bg-elevated">
                {channel.avatar ? (
                  <Image
                    src={channel.avatar}
                    alt=""
                    fill
                    sizes="56px"
                    quality={75}
                    className="object-cover"
                  />
                ) : (
                  <EclipseMark className="absolute inset-0 m-auto h-7 w-7 text-paper/40" />
                )}
              </span>
              <div className="min-w-0">
                <h3 className="font-display text-lg font-medium text-paper">
                  {channel.label}
                </h3>
                <p className="mt-1 font-display text-[9px] uppercase tracking-[0.2em] text-muted">
                  {channel.handle}
                </p>
              </div>
            </div>

            <p className="mt-6 text-sm leading-relaxed text-muted">
              {channel.description}
            </p>

            <div className="mt-auto flex flex-col gap-3 pt-8">
              <ActionLink
                href={channel.subscribeUrl}
                external
                icon={<YouTubeIcon className="h-3.5 w-3.5" />}
                className="w-full"
              >
                Subscribe
              </ActionLink>
              {secondaryChannel ? (
                <ActionLink
                  href={secondaryChannel.url}
                  external
                  variant="secondary"
                  icon={<YouTubeIcon className="h-3.5 w-3.5" />}
                  className="w-full"
                >
                  {secondaryChannel.label || "Second channel"}
                </ActionLink>
              ) : null}
            </div>
          </div>

          <div className="lg:col-span-8">
            {featured ? (
              <VideoFacade video={featured} />
            ) : (
              <div className="flex aspect-video items-center justify-center border border-line bg-surface/40">
                <p className="text-sm text-muted">No videos published yet.</p>
              </div>
            )}

            {recent.length > 0 ? (
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                {recent.map((video) => (
                  <VideoRow key={video.id} video={video} />
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
