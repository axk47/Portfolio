import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, Code2, Database, Network, Shield, ChevronLeft, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
// Removed TiltCard for featured projects (no 3D tilt)

gsap.registerPlugin(ScrollTrigger);

interface Project {
  title: string;
  subtitle: string;
  description: string;
  tech: string[];
  image: string;
  icon: React.ElementType;
  highlights: string[];
  github?: string;
  demo?: string;
  color: string;
}

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  // Pagination for grid view
  const [page, setPage] = useState(1);
  const pageSize = 4; // number of projects per page

  const projects: Project[] = [
    {
      title: 'Bean & Brew',
      subtitle: 'Web Development Project',
      description:
        'Dynamic coffee shop website with a user-friendly UI, secure authentication, and interactive cart and wishlist features.',
      tech: ['HTML', 'CSS', 'JavaScript', 'PHP'],
      image: '/project-beanbrew.jpg',
      icon: Code2,
      highlights: [
        'Implemented login/registration with server-side validation',
        'Built product catalog with search and tag filters',
        'Added wishlist and cart interactions with persistent state',
      ],
      demo: 'https://www.cosc.brocku.ca/~ak21hh/A4/index.php',
      color: 'hsl(25, 85%, 55%)',
    },
    {
      title: 'ScholarScout',
      subtitle: 'PC Finder',
      description:
        'Full-stack web application to rank and recommend academic program committee candidates using multi-factor scoring algorithm.',
      tech: ['Python', 'FastAPI', 'Next.js', 'React', 'NetworkX'],
      image: '/project-scholarscout.jpg',
      icon: Database,
      highlights: [
        'Built FastAPI backend with REST endpoints for researcher discovery',
        'Implemented semantic similarity matching and explainable ranking',
        'Designed Next.js frontend with dynamic UI for query submission',
        'Used PageRank algorithm on co-service graph to identify influential researchers',
      ],
      github: '#',
      demo: '#',
      color: 'hsl(199, 89%, 48%)',
    },
    {
      title: 'Code Plagiarism Detection',
      subtitle: 'Academic Integrity Tool',
      description:
        'Backend plagiarism detection engine analyzing structural code similarities beyond surface-level changes.',
      tech: ['Python', 'Git', 'AST Parsing', 'Algorithm Design'],
      image: '/project-plagiarism.jpg',
      icon: Shield,
      highlights: [
        'Engineered backend detection engine for structural code analysis',
        'Developed parsing algorithms to detect code patterns',
        'Compared abstract syntax trees across student submissions',
        'Delivered under Agile methodology for educational institutions',
      ],
      github: '#',
      color: 'hsl(0, 84%, 60%)',
    },
    {
      title: 'Distributed File Transfer',
      subtitle: 'System with Tracing',
      description:
        'Client-server file transfer application with integrated distributed tracing using OpenTelemetry.',
      tech: ['Java', 'OpenTelemetry', 'Distributed Systems', 'Testing'],
      image: '/project-filetransfer.jpg',
      icon: Network,
      highlights: [
        'Built client-server file transfer with distributed tracing',
        'Applied dynamic symbolic execution for defect diagnosis',
        'Implemented comprehensive test suite with multiple methodologies',
        'Used structural, integration, and regression testing',
      ],
      github: 'https://github.com/axk47/Distributed-File-Transfer.git',
      color: 'hsl(160, 84%, 39%)',
    },
    {
      title: 'Hockey League Database',
      subtitle: 'Sports Management System',
      description:
        'Relational database system for managing hockey league data with complex relationships.',
      tech: ['SQL', 'PostgreSQL', 'MS Access', 'Database Design'],
      image: '/project-hockey.jpg',
      icon: Code2,
      highlights: [
        'Designed normalized ER model with constraints and triggers',
        'Implemented relational schema with views for complex sports data',
        'Built interactive database application with forms and queries',
        'Managed teams, players, agents, and events efficiently',
      ],
      github: '#',
      color: 'hsl(250, 84%, 60%)',
    },
  ];

  const totalPages = Math.max(1, Math.ceil(projects.length / pageSize));
  const prevPage = () => setPage((p) => Math.max(1, p - 1));
  const nextPage = () => setPage((p) => Math.min(totalPages, p + 1));
  const start = (page - 1) * pageSize;
  const visibleProjects = projects.slice(start, start + pageSize);
  const placeholders = Array.from({ length: Math.max(0, pageSize - visibleProjects.length) });

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.project-card-wrapper');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { 
            rotationY: -30,
            rotationX: 10,
            z: -100,
            opacity: 0 
          },
          {
            rotationY: 0,
            rotationX: 0,
            z: 0,
            opacity: 1,
            duration: 1,
            delay: index * 0.15,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const nextProject = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

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

        {/* Projects grid (fixed 2x2 layout on lg to keep height stable) */}
        <div 
          ref={cardsRef} 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 min-h-[38rem]"
        >
          {visibleProjects.map((project, index) => (
            <div key={index} className="project-card-wrapper">
              <div className="h-full">
                <Card className="glass overflow-hidden group card-shine hover:shadow-xl transition-all duration-500 h-full border-0">
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
                    
                    {/* Icon overlay */}
                    <div 
                      className="absolute bottom-4 left-4 p-3 rounded-xl backdrop-blur-sm"
                      style={{ backgroundColor: `${project.color}30` }}
                    >
                      <project.icon className="h-6 w-6" style={{ color: project.color }} />
                    </div>

                    {/* Holographic corner accents */}
                    <div className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 opacity-50" style={{ borderColor: project.color }} />
                    <div className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 opacity-50" style={{ borderColor: project.color }} />
                    <div className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 opacity-50" style={{ borderColor: project.color }} />
                    <div className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 opacity-50" style={{ borderColor: project.color }} />
                  </div>

                  <CardContent className="p-6">
                    {/* Title */}
                    <div className="mb-3">
                      <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">{project.subtitle}</p>
                    </div>

                    {/* Description */}
                    <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                      {project.description}
                    </p>

                    {/* Highlights */}
                    <ul className="space-y-1 mb-4">
                      {project.highlights.slice(0, 2).map((highlight, i) => (
                        <li key={i} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <div className="w-1 h-1 rounded-full mt-1.5 flex-shrink-0" style={{ backgroundColor: project.color }} />
                          <span className="line-clamp-1">{highlight}</span>
                        </li>
                      ))}
                    </ul>

                    {/* Tech stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="text-xs border-opacity-30"
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
                          className="flex-1 hover:bg-primary/10 hover:border-primary/50 transition-all"
                        >
                          <a href={project.github} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-2" />
                            Code
                          </a>
                        </Button>
                      )}
                      {project.demo && (
                        <Button asChild size="sm" className="flex-1 bg-primary hover:bg-primary/90 transition-all">
                          <a href={project.demo} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Demo
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
            </div>
          </div>
          ))}

          {/* Skeleton placeholders to keep a 2x2 grid even if last page has < 4 items */}
          {placeholders.map((_, i) => (
            <div key={`placeholder-${i}`} className="project-card-wrapper">
              <div className="h-full">
                <div className="glass rounded-3xl h-full ring-1 ring-white/5 overflow-hidden">
                  {/* Image skeleton */}
                  <div className="relative h-48 bg-primary/5 animate-pulse" />
                  {/* Body skeleton */}
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-primary/10 rounded w-2/3 animate-pulse" />
                    <div className="h-3 bg-primary/5 rounded w-1/2 animate-pulse" />
                    <div className="flex gap-2 pt-2">
                      <div className="h-6 w-16 rounded-full bg-primary/5 animate-pulse" />
                      <div className="h-6 w-20 rounded-full bg-primary/5 animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination controls */}
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
                  page === i + 1 ? 'bg-primary text-primary-foreground' : 'glass text-muted-foreground hover:text-foreground'
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

export default Projects;
