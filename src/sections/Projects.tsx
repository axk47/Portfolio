import React, { useEffect, useRef, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  ExternalLink,
  Github,
  Code2,
  Database,
  Network,
  Shield,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import TiltCard from "@/components/TiltCard";

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string; // GitHub pages safe resolved path to public/
  icon: React.ElementType;
  highlights: string[];
  github?: string;
  demo?: string;
  color: string; // any valid css color
}

// GitHub Pages-safe base URL helper (because site is served under /Portfolio/)
const withBase = (path: string) =>
  `${import.meta.env.BASE_URL}${path.replace(/^\//, "")}`;

const PROJECTS: Project[] = [
  {
    title: "Bean & Brew",
    subtitle: "Web Development Project",
    description: "Dynamic coffee shop site with secure auth plus cart and wishlist.",
    tech: ["HTML", "CSS", "JavaScript", "PHP"],
    image: withBase("project-beanbrew.jpg"),
    icon: Code2,
    highlights: ["Login/registration with validation", "Search + tag filters"],
    demo: "https://www.cosc.brocku.ca/~ak21hh/A4/index.php",
    color: "hsl(25 85% 55%)",
  },
  {
    title: "ScholarScout",
    subtitle: "PC Finder",
    description:
      "Full-stack tool to rank and recommend Program Committee candidates using multi-factor scoring.",
    tech: ["Python", "FastAPI", "Next.js", "React", "NetworkX"],
    image: withBase("project-scholarscout.jpg"),
    icon: Database,
    highlights: [
      "Built FastAPI backend with REST endpoints for researcher discovery",
      "Implemented semantic similarity matching and explainable ranking",
      "Designed dynamic UI for query submission",
      "Used graph-based scoring to identify influential researchers",
    ],
    github: "https://github.com/axk47/ScholarScout.git",
    color: "hsl(199 89% 48%)",
  },
  {
    title: "Code Plagiarism Detection",
    subtitle: "Academic Integrity Tool",
    description:
      "Detection engine analyzing structural code similarities beyond surface-level changes (AST-based).",
    tech: ["Python", "Git", "AST Parsing", "Algorithms"],
    image: withBase("project-plagiarism.jpg"),
    icon: Shield,
    highlights: [
      "Engineered backend detection engine for structural code analysis",
      "Developed parsing algorithms to detect code patterns",
      "Compared abstract syntax trees across student submissions",
      "Designed for academic integrity workflows",
    ],
    github: "#",
    color: "hsl(0 84% 60%)",
  },
  {
    title: "Distributed File Transfer",
    subtitle: "System with Tracing",
    description:
      "Client/server file transfer application with integrated distributed tracing via OpenTelemetry.",
    tech: ["Java", "OpenTelemetry", "Distributed Systems", "Testing"],
    image: withBase("project-filetransfer.jpg"),
    icon: Network,
    highlights: [
      "Built client-server file transfer with distributed tracing",
      "Instrumented spans/metrics for end-to-end observability",
      "Implemented comprehensive regression/integration testing",
      "Focused on reliability and performance debugging",
    ],
    github: "https://github.com/axk47/Distributed-File-Transfer.git",
    color: "hsl(160 84% 39%)",
  },
  {
    title: "Hockey League Database",
    subtitle: "Sports Management System",
    description:
      "Relational database system for managing hockey league data with complex relationships and queries.",
    tech: ["SQL", "PostgreSQL", "Database Design"],
    image: withBase("project-hockey.jpg"),
    icon: Code2,
    highlights: [
      "Designed normalized ER model with constraints and triggers",
      "Implemented relational schema with views for complex sports data",
      "Built queries for teams, players, agents, and events",
      "Optimized reporting-oriented queries",
    ],
    color: "hsl(250 84% 60%)",
  },
];

const Projects: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Keeping this only for the mobile dots/buttons UI (visual)
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "expo.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll(".project-card-wrapper");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { rotationY: -30, rotationX: 10, z: -100, opacity: 0 },
          {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            duration: 1,
            delay: i * 0.15,
            ease: "expo.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 70%",
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => setActiveIndex((prev) => (prev + 1) % PROJECTS.length);
  const prevProject = () =>
    setActiveIndex((prev) => (prev - 1 + PROJECTS.length) % PROJECTS.length);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,hsl(var(--primary)/0.08),transparent_60%)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Featured <span className="text-gradient">Projects</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A showcase of my technical expertise and problem-solving abilities
          </p>
        </div>

        {/* Projects grid with 3D tilt
            Reduced size ~20% by:
            - smaller card max width on large screens
            - slightly smaller image height
            - slightly smaller padding/text
        */}
        <div
          ref={cardsRef}
          className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto"
          style={{ perspective: "1000px" }}
        >
          {PROJECTS.map((project) => (
            <div key={project.title} className="project-card-wrapper">
              <TiltCard className="h-full" tiltAmount={10} glowColor={project.color}>
                <Card className="glass overflow-hidden group card-shine hover:shadow-xl transition-all duration-500 h-full border-0">
                  {/* Image */}
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />

                    {/* Icon overlay */}
                    <div
                      className="absolute bottom-3 left-3 p-2.5 rounded-xl backdrop-blur-sm"
                      style={{ backgroundColor: `${project.color}30` }}
                    >
                      <project.icon className="h-5 w-5" style={{ color: project.color }} />
                    </div>

                    {/* Corner accents */}
                    <div
                      className="absolute top-2 left-2 w-5 h-5 border-l-2 border-t-2 opacity-50"
                      style={{ borderColor: project.color }}
                    />
                    <div
                      className="absolute top-2 right-2 w-5 h-5 border-r-2 border-t-2 opacity-50"
                      style={{ borderColor: project.color }}
                    />
                    <div
                      className="absolute bottom-2 left-2 w-5 h-5 border-l-2 border-b-2 opacity-50"
                      style={{ borderColor: project.color }}
                    />
                    <div
                      className="absolute bottom-2 right-2 w-5 h-5 border-r-2 border-b-2 opacity-50"
                      style={{ borderColor: project.color }}
                    />
                  </div>

                  <CardContent className="p-5">
                    {/* Title */}
                    <div className="mb-2.5">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-xs text-muted-foreground">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-3.5 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-3.5">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-[11px] text-muted-foreground">
                          <div
                            className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0"
                            style={{ backgroundColor: project.color }}
                          />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-3.5">
                      {project.tech.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-[11px] border-opacity-30 px-2 py-0.5"
                          style={{ borderColor: project.color, color: project.color }}
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>

                    {/* Actions */}
                    <div className="flex gap-3">
                      {project.github && (
                        <Button
                          asChild
                          variant="outline"
                          size="sm"
                          className="flex-1 h-8 px-3 text-xs hover:bg-primary/10 hover:border-primary/50 transition-all"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button
                          asChild
                          size="sm"
                          className="flex-1 h-8 px-3 text-xs bg-primary hover:bg-primary/90 transition-all"
                        >
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          ))}
          </div>
        </div>
    </section>
  );
};

export default Projects;
