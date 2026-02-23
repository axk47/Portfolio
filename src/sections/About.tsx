import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { GraduationCap, Award, BookOpen, Calendar, MapPin, Star, Cpu, Code, Terminal } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import TiltCard from '@/components/TiltCard';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const honorsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headingRef.current,
        { x: -50, rotate: -5, opacity: 0 },
        {
          x: 0,
          rotate: 0,
          opacity: 1,
          duration: 0.8,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      const cards = cardsRef.current?.querySelectorAll('.about-card-wrapper');
      cards?.forEach((card, index) => {
        gsap.fromTo(
          card,
          { rotateX: 45, opacity: 0, y: 50, z: -100 },
          {
            rotateX: 0,
            opacity: 1,
            y: 0,
            z: 0,
            duration: 0.8,
            delay: index * 0.2,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 70%',
            },
          }
        );
      });

      const honors = honorsRef.current?.querySelectorAll('.honor-item');
      honors?.forEach((honor, index) => {
        gsap.fromTo(
          honor,
          { y: 50, opacity: 0, x: 30 },
          {
            y: 0,
            opacity: 1,
            x: 0,
            duration: 0.6,
            delay: 0.4 + index * 0.15,
            ease: 'power2.out',
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

  const coursework = [
    'Software Analysis & Testing',
    'Mobile Computing',
    'Cybersecurity',
    'Data Structures & Algorithms',
    'Database Systems',
    'HCI',
    'Computer Architecture',
  ];

  const honors = [
    {
      title: "Dean's Honour List",
      subtitle: 'Faculty of Mathematics and Science',
      year: '2023, 2024',
      icon: Star,
      color: 'hsl(45, 93%, 47%)',
    },
    {
      title: 'Google IT Support Certificate',
      subtitle: 'System Administration and Infrastructure',
      year: 'Mar 2023',
      icon: Award,
      color: 'hsl(199, 89%, 48%)',
    },
  ];

  const stats = [
    { label: 'GPA', value: '3.9/4.0', icon: Cpu },
    { label: 'Years', value: '4th Year', icon: Code },
    { label: 'Projects', value: '8+', icon: Terminal },
  ];

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 ref={headingRef} className="text-4xl lg:text-5xl font-bold text-foreground mb-6">
            About<span className="text-primary">.</span>
          </h2>        <div className="grid lg:grid-cols-12 gap-12">
          {/* Left column - Heading */}
          <div className="lg:col-span-3">
            {/* Quick stats */}
            <div className="mt-4 space-y-4">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="glass rounded-xl p-4 flex items-center gap-3 hover:bg-primary/5 transition-colors"
                >
                  <div className="p-2 rounded-lg bg-primary/10">
                    <stat.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Middle column - Cards */}
          <div ref={cardsRef} className="lg:col-span-6 space-y-6" style={{ perspective: '1000px' }}>
            {/* Education Card */}
            <div className="about-card-wrapper">
              <TiltCard tiltAmount={8} glowColor="hsl(199, 89%, 48%)">
                <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 border-0">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="p-3 rounded-xl bg-primary/10">
                        <GraduationCap className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-semibold text-foreground mb-1">
                          Bachelor of Science (Honours), Computer Science
                        </h3>
                        <p className="text-primary font-medium mb-2">Brock University</p>
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
                          <span className="flex items-center gap-1">
                            <MapPin className="h-4 w-4" />
                            St. Catharines, ON
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            Sep 2022 – Jun 2026
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-2 mb-4">
                          <Badge variant="secondary" className="bg-primary/10 text-primary">
                            GPA: 3.9/4.0 (90%)
                          </Badge>
                        
                        </div>
                        <p className="text-muted-foreground text-sm">
                          <span className="font-medium text-foreground">Concentration:</span> Software Engineering
                          <span className="mx-2">|</span>
                          <span className="font-medium text-foreground">Minor:</span> Business and Management
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>

            {/* Coursework Card */}
            <div className="about-card-wrapper">
              <TiltCard tiltAmount={8} glowColor="hsl(160, 84%, 39%)">
                <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 border-0 max-w-4xl">
                  <CardContent className="px-4 py-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2.5 rounded-xl bg-emerald-500/10">
                        <BookOpen className="h-5 w-5 text-emerald-500" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-foreground mb-2">
                          Relevant Coursework
                        </h3>
                        <div className="flex flex-wrap gap-2">
                          {coursework.map((course, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="hover:bg-emerald-500/10 hover:border-emerald-500/50 transition-colors cursor-default"
                            >
                              {course}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>

            {/* Summary Card */}
            <div className="about-card-wrapper">
              <TiltCard tiltAmount={8} glowColor="hsl(270, 91%, 65%)">
                <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 border-0">
                  <CardContent className="p-6">
                    <p className="text-muted-foreground leading-relaxed">
                      Fourth-year Computer Science student specializing in Software Engineering with expertise in 
                      software testing, full-stack development, and AI training. Dean's Honour List recipient 
                      (2023, 2024) with proven ability to build scalable web applications, implement distributed 
                      systems, and develop mobile apps. Strong foundation in cybersecurity, quality assurance, 
                      and collaborative software engineering.
                    </p>
                  </CardContent>
                </Card>
              </TiltCard>
            </div>
          </div>

          {/* Right column - Honors */}
          <div ref={honorsRef} className="lg:col-span-3">
            <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Award className="h-5 w-5 text-primary" />
              Honors & Certifications
            </h3>
            <div className="space-y-4">
              {honors.map((honor, index) => (
                <div
                  key={index}
                  className="honor-item glass rounded-xl p-4 hover:bg-primary/5 transition-all duration-300 cursor-default group border-l-4"
                  style={{ borderLeftColor: honor.color }}
                >
                  <div className="flex items-start gap-3">
                    <div 
                      className="p-2 rounded-lg transition-colors"
                      style={{ backgroundColor: `${honor.color}20` }}
                    >
                      <honor.icon className="h-5 w-5" style={{ color: honor.color }} />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-foreground text-sm">{honor.title}</h4>
                      <p className="text-xs text-muted-foreground">{honor.subtitle}</p>
                      <p className="text-xs mt-1 font-mono" style={{ color: honor.color }}>{honor.year}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;




