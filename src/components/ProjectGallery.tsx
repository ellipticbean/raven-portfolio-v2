"use client";

import { useState } from "react";
import Image from "next/image";
import type { ProjectMedia } from "@/data/projects";

type ProjectGalleryProps = {
  items: ProjectMedia[];
};

export default function ProjectGallery({
  items,
}: ProjectGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  if (items.length === 0) {
    return null;
  }

  const activeItem = items[activeIndex];

  return (
    <section className="page-container border-t border-[var(--border)] py-24">
      <div className="mb-10">
        <p className="mono text-xs uppercase tracking-[0.2em] text-accent">
          Gallery
        </p>

        <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-white">
          Project in action.
        </h2>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_300px]">
        <div className="glass-panel overflow-hidden rounded-[var(--radius-lg)]">
          <div className="relative aspect-[16/9] bg-[var(--surface-1)]">
            <Image
              src={activeItem.src}
              alt={activeItem.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1024px) 100vw, 900px"
              priority
            />
          </div>

          {activeItem.caption && (
            <div className="border-t border-[var(--border)] px-5 py-4">
              <p className="text-sm leading-6 text-[var(--text-secondary)]">
                {activeItem.caption}
              </p>
            </div>
          )}
        </div>

        <div className="grid gap-3">
          {items.map((item, index) => {
            const active = index === activeIndex;

            return (
              <button
                key={`${item.src}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`group overflow-hidden rounded-[var(--radius-md)] border text-left transition ${
                  active
                    ? "border-accent"
                    : "border-[var(--border)] hover:border-[var(--border-strong)]"
                }`}
              >
                <div className="relative aspect-[16/9] bg-[var(--surface-1)]">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    className="object-cover"
                    sizes="300px"
                  />
                </div>

                <div className="bg-[var(--surface-1)] px-3 py-3">
                  <p
                    className={`text-xs ${
                      active
                        ? "text-white"
                        : "text-[var(--text-muted)] group-hover:text-[var(--text-secondary)]"
                    }`}
                  >
                    {item.caption ?? item.alt}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}