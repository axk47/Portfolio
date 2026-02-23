import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Code2, Database, Network, Shield, ChevronLeft, ChevronRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string; // path in public/
  icon: React.ElementType;
  highlights?: string[];
  github?: string;
  demo?: string;
  color: string; // hsl string used for accents
}

// NOTE: use import.meta.env.BASE_URL so images work on GitHub Pages subpath
// Vite guarantees BASE_URL ends with "/", so we just strip any leading slash from the path
const withBase = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const PROJECTS: Project[] = [
  {
    title: "Bean & Brew",
    subtitle: "Web Development Project",
    description:
      "Dynamic coffee shop site with secure auth plus cart and wishlist.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    image: withBase("project-beanbrew.jpg"),
    icon: Code2,
    highlights: [
      "Login/registration with validation",
      "Search + tag filters",
    ],
    demo: "https://www.cosc.brocku.ca/~ak21hh/A4/index.php",
    color: "hsl(25 85% 55%)",
  },
  {
    title: "ScholarScout",
    subtitle: "PC Finder",
    description:
      "Full‑stack tool to rank Program Committee candidates using multi‑factor scoring.",
    tech: ["Python", "FastAPI", "Next.js", "React", "NetworkX"],
    image: withBase("project-scholarscout.jpg"),
    icon: Database,
    github: "#",
    demo: "#",
    color: "hsl(199 89% 48%)",
  },
  {
    title: "Code Plagiarism Detection",
    subtitle: "Academic Integrity Tool",
    description:
      "Detection engine analyzing structural code similarities (AST‑based).",
    tech: ["Python", "Git", "AST", "Algorithms"],
    image: withBase("project-plagiarism.jpg"),
    icon: Shield,
    github: "#",
    color: "hsl(0 84% 60%)",
  },
  {
    title: "Distributed File Transfer",
    subtitle: "System with Tracing",
    description:
      "Client/server file transfer with distributed tracing via OpenTelemetry.",
    tech: ["Java", "OpenTelemetry", "Testing"],
    image: withBase("project-filetransfer.jpg"),
    icon: Network,
    github: "https://github.com/axk47/Distributed-File-Transfer.git",
    color: "hsl(160 84% 39%)",
  },
  {
    title: "Hockey League Database",
    subtitle: "Sports Management System",
    description:
      "Relational database with complex relationships and queries.",
    tech: ["SQL", "PostgreSQL", "Database Design"],
    image: withBase("project-hockey.jpg"),
    icon: Code2,
    color: "hsl(267 84% 70%)",
  },
];

const PAGE_SIZE = 4; // show 4 cards at a time

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const [page, setPage] = useState<number>(1);

  // simple scroll‑in animation
  useEffect(() => {
    if (!sectionRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(headingRef.current, {
        y: 20,
        opacity: 0,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
        },
      });
      gsap.from(cardsRef.current?.children ?? [], {
        y: 24,
        opacity: 0,
        duration: 0.4,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
        },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const totalPages = Math.max(1, Math.ceil(PROJECTS.length / PAGE_SIZE));
  const start = (page - 1) * PAGE_SIZE;
  const visible = PROJECTS.slice(start, start + PAGE_SIZE);
  const placeholders = Array.from({ length: Math.max(0, PAGE_SIZE - visible.length) });

  const prevPage = () => setPage((p: number) => Math.max(1, p - 1));
  const nextPage = () => setPage((p: number) => Math.min(totalPages, p + 1));

  return (
    <section id="projects" ref={sectionRef} className="section">
      <div className="container">
        <h2 ref={headingRef} className="section-title">Projects</h2>

        {/* Grid: fixed 4‑slot layout */}
        <div ref={cardsRef} className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
          {visible.map((project) => (
            <ProjectCard key={project.title} project={project} />
          ))}
          {placeholders.map((_, i) => (
            <div key={`ph-${i}`} className="hidden xl:block" />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <Button variant="outline" size="icon" onClick={prevPage} disabled={page === 1}>
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`w-8 h-8 rounded-full text-sm font-medium transition-colors ${
                  page === i + 1
                    ? "bg-primary text-primary-foreground"
                    : "glass text-muted-foreground hover:text-foreground"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
          <Button variant="outline" size="icon" onClick={nextPage} disabled={page === totalPages}>
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  const Icon = project.icon;
  return (
    <div className="project-card-wrapper">
      <Card className="glass rounded-3xl h-full ring-1 ring-white/5 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 overflow-hidden">
          <img src={project.image} alt="" className="absolute inset-0 h-full w-full object-cover opacity-90" />
          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        </div>

        <CardContent className="p-6 flex flex-col gap-3">
          {/* Title */}
          <div className="flex items-center gap-2">
            <span className="h-8 w-8 rounded-md flex items-center justify-center" style={{ backgroundColor: project.color }}>
              <Icon className="h-4 w-4 text-background" />
            </span>
            <div>
              <h3 className="text-lg font-semibold leading-tight">{project.title}</h3>
              <p className="text-sm text-muted-foreground">{project.subtitle}</p>
            </div>
          </div>

          <p className="text-sm text-muted-foreground line-clamp-2">{project.description}</p>

          {/* Tech */}
          <div className="flex flex-wrap gap-2 pt-1">
            {project.tech.map((t) => (
              <Badge key={t} variant="outline" className="text-xs border-opacity-40" style={{ borderColor: project.color, color: project.color }}>
                {t}
              </Badge>
            ))}
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-1">
            {project.github && (
              <Button asChild variant="outline" size="sm" className="flex-1">
                <a href={project.github} target="_blank" rel="noopener noreferrer">
                  <Github className="h-4 w-4 mr-2" /> Code
                </a>
              </Button>
            )}
            {project.demo && (
              <Button asChild size="sm" className="flex-1 bg-primary">
                <a href={project.demo} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="h-4 w-4 mr-2" /> Demo
                </a>
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Projects;
