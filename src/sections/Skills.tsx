import { useEffect, useRef, useState } from 'react';
import { Badge } from '@/components/ui/badge';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

interface Skill {
  name: string;
  category: 'language' | 'framework' | 'concept';
  level: number;
}

const Skills = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cloudRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const skills: Skill[] = [
    // Languages
    { name: 'Java', category: 'language', level: 90 },
    { name: 'Python', category: 'language', level: 95 },
    { name: 'SQL', category: 'language', level: 88 },
    { name: 'JavaScript', category: 'language', level: 92 },
    { name: 'HTML/CSS', category: 'language', level: 90 },
    { name: 'Kotlin', category: 'language', level: 75 },
    // Frameworks & Tools
    { name: 'FastAPI', category: 'framework', level: 88 },
    { name: 'Next.js', category: 'framework', level: 90 },
    { name: 'React', category: 'framework', level: 92 },
    { name: 'Node.js', category: 'framework', level: 85 },
    { name: 'OpenTelemetry', category: 'framework', level: 80 },
    { name: 'Android SDK', category: 'framework', level: 75 },
    { name: 'Git', category: 'framework', level: 90 },
    { name: 'Linux', category: 'framework', level: 85 },
    { name: 'PostgreSQL', category: 'framework', level: 88 },
    { name: 'MySQL', category: 'framework', level: 85 },
    // Concepts
    { name: 'Software Testing', category: 'concept', level: 92 },
    { name: 'Dynamic Symbolic Execution', category: 'concept', level: 85 },
    { name: 'Distributed Tracing', category: 'concept', level: 82 },
    { name: 'REST APIs', category: 'concept', level: 95 },
    { name: 'Agile Development', category: 'concept', level: 88 },
    { name: 'Mobile App Development', category: 'concept', level: 80 },
    { name: 'Cybersecurity', category: 'concept', level: 78 },
    { name: 'OOP', category: 'concept', level: 92 },
    { name: 'Multithreading', category: 'concept', level: 85 },
  ];

  const getCategoryColor = (category: Skill['category']) => {
    switch (category) {
      case 'language':
        return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'framework':
        return 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30';
      case 'concept':
        return 'bg-purple-500/20 text-purple-400 border-purple-500/30';
      default:
        return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  // Keep your Portfolio “stepped-down” sizing
  const getCategorySize = (level: number) => {
    if (level >= 90) return 'text-base px-4 py-2';
    if (level >= 80) return 'text-sm px-3 py-1.5';
    return 'text-xs px-2.5 py-1';
  };

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

      const skillNodes = cloudRef.current?.querySelectorAll('.skill-node');
      skillNodes?.forEach((node, index) => {
        gsap.fromTo(
          node,
          { scale: 0, opacity: 0, rotationY: -90 },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 0.5,
            delay: Math.random() * 0.5,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );

        gsap.to(node, {
          y: Math.sin(index * 0.5) * 8,
          duration: 2 + Math.random() * 2,
          repeat: -1,
          yoyo: true,
          ease: 'sine.inOut',
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!cloudRef.current) return;
      const rect = cloudRef.current.getBoundingClientRect();
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      });
    };

    const cloud = cloudRef.current;
    cloud?.addEventListener('mousemove', handleMouseMove);
    return () => cloud?.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(var(--primary)/0.05),transparent_70%)] -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Technical <span className="text-gradient">Arsenal</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A comprehensive toolkit built through academic excellence and
            hands-on project experience
          </p>
        </div>

        {/* Category legend */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            <span className="text-sm text-muted-foreground">Languages</span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"
              style={{ animationDelay: '0.3s' }}
            />
            <span className="text-sm text-muted-foreground">
              Frameworks &amp; Tools
            </span>
          </div>
          <div className="flex items-center gap-2 glass px-4 py-2 rounded-full">
            <div
              className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"
              style={{ animationDelay: '0.6s' }}
            />
            <span className="text-sm text-muted-foreground">Concepts</span>
          </div>
        </div>

        {/* Skills cloud (test-like pill layout, no hover, no % ) */}
        <div
          ref={cloudRef}
          className="relative min-h-[400px] flex flex-wrap justify-center items-center gap-3 p-8 glass rounded-3xl"
        >
          {skills.map((skill, index) => {
            const nodeElement = cloudRef.current?.querySelectorAll(
              '.skill-node'
            )[index] as HTMLElement | undefined;

            let transform = '';
            if (nodeElement && mousePos.x && mousePos.y) {
              const rect = nodeElement.getBoundingClientRect();
              const cloudRect = cloudRef.current?.getBoundingClientRect();
              if (cloudRect) {
                const nodeX = rect.left - cloudRect.left + rect.width / 2;
                const nodeY = rect.top - cloudRect.top + rect.height / 2;
                const dx = nodeX - mousePos.x;
                const dy = nodeY - mousePos.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                if (distance < 80) {
                  const force = (80 - distance) / 80;
                  transform = `translate(${dx * force * 0.2}px, ${
                    dy * force * 0.2
                  }px)`;
                }
              }
            }

            return (
              <Badge
                key={skill.name}
                variant="outline"
                className={`skill-node cursor-default select-none transition-transform duration-300 ${getCategoryColor(
                  skill.category
                )} ${getCategorySize(skill.level)} border rounded-full`}
                style={{ transform }}
              >
                <span className="whitespace-nowrap">{skill.name}</span>
              </Badge>
            );
          })}
        </div>

        {/* Skills breakdown with 3D cards (unchanged) */}
        <div
          className="grid md:grid-cols-3 gap-8 mt-16"
          style={{ perspective: '1000px' }}
        >
          {/* Languages */}
          <TiltCard tiltAmount={8} glowColor="hsl(217, 91%, 60%)">
            <div className="glass rounded-2xl p-6 h-full border border-blue-500/20 ring-1 ring-blue-500/15 hover:ring-2 hover:ring-blue-400/45 hover:shadow-[0_0_40px_rgba(59,130,246,0.18)] transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
                Languages
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.category === 'language')
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-blue-500/30"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-blue-400 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </TiltCard>

          {/* Frameworks */}
          <TiltCard tiltAmount={8} glowColor="hsl(160, 84%, 39%)">
            <div className="glass rounded-2xl p-6 h-full border border-emerald-500/20 ring-1 ring-emerald-500/15 hover:ring-2 hover:ring-emerald-400/45 hover:shadow-[0_0_40px_rgba(16,185,129,0.18)] transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse"
                  style={{ animationDelay: '0.3s' }}
                />
                Frameworks &amp; Tools
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.category === 'framework')
                  .slice(0, 6)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-emerald-500/30"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-emerald-400 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </TiltCard>

          {/* Concepts */}
          <TiltCard tiltAmount={8} glowColor="hsl(270, 91%, 65%)">
            <div className="glass rounded-2xl p-6 h-full border border-purple-500/20 ring-1 ring-purple-500/15 hover:ring-2 hover:ring-purple-400/45 hover:shadow-[0_0_40px_rgba(168,85,247,0.18)] transition-shadow">
              <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
                <div
                  className="w-3 h-3 rounded-full bg-purple-500 animate-pulse"
                  style={{ animationDelay: '0.6s' }}
                />
                Core Concepts
              </h3>
              <div className="space-y-3">
                {skills
                  .filter((s) => s.category === 'concept')
                  .slice(0, 6)
                  .map((skill) => (
                    <div
                      key={skill.name}
                      className="flex items-center justify-between group"
                    >
                      <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                        {skill.name}
                      </span>
                      <div className="flex-1 mx-3 h-2 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-400 rounded-full transition-all duration-500 group-hover:shadow-lg group-hover:shadow-purple-500/30"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                      <span className="text-xs text-purple-400 font-mono">
                        {skill.level}%
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          </TiltCard>
        </div>
      </div>
    </section>
  );
};

export default Skills;
