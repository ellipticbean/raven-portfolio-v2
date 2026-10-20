"use client";

import Image from "next/image";
import Link from "next/link";
import type { Project, ProjectCategory } from "@/data/projects";

type Folder = { name: ProjectCategory; marker: string; description: string };

const folders: Folder[] = [
  { name: "Bots", marker: "01", description: "Bots, automation, and community tools." },
  { name: "Websites", marker: "02", description: "Interactive websites and browser-based experiments." },
  { name: "Other Projects", marker: "03", description: "A home for experiments that don’t fit the folders above." },
];

function category(project: Project): ProjectCategory {
  return project.category ?? "Other Projects";
}

export default function ProjectFolders({ projects }: { projects: Project[] }) {
  const populated = folders.map((folder) => ({
    ...folder,
    items: projects.filter((project) => category(project) === folder.name),
  })).filter((folder) => folder.items.length > 0);

  return (
    <div className="space-y-4">
      {populated.map((folder, folderIndex) => (
        <details key={folder.name} className="retro-project-folder" open={folderIndex === 0}>
          <summary className="retro-folder-summary">
            <span className="retro-folder-icon" aria-hidden="true">▰</span>
            <span className="retro-folder-copy">
              <span className="retro-folder-title mono">{folder.name}</span>
              <span className="retro-folder-description">{folder.description}</span>
            </span>
            <span className="retro-folder-count mono">{String(folder.items.length).padStart(2, "0")} ITEMS</span>
            <span className="retro-folder-chevron" aria-hidden="true">＋</span>
          </summary>
          <div className="retro-folder-items">
            {folder.items.map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`} className={`retro-folder-card group ${project.slug === "scrobble-city" ? "retro-folder-featured" : ""}`}>
                <div className="retro-folder-card-top mono"><span>{folder.marker}-{String(index + 1).padStart(2, "0")}</span><span>{category(project)}</span></div>
                {project.media?.[0] && (
                  <div className="retro-folder-image">
                    <Image src={project.slug === "game-night-roulette" ? "/projects/game-night-roulette/result.png" : project.media[0].src} alt={project.media[0].alt} width={1200} height={675} unoptimized />
                  </div>
                )}
                <p className="mono retro-folder-type">{project.type}</p>
                <h3 className="retro-folder-project-title">{project.name}</h3>
                <p className="retro-folder-project-description">{project.description}</p>
                <div className="retro-folder-tags">{project.tech.slice(0, 5).map((tech) => <span key={tech}>{tech}</span>)}</div>
                <span className="retro-folder-link mono">OPEN PROJECT ↗</span>
              </Link>
            ))}
          </div>
        </details>
      ))}
    </div>
  );
}
