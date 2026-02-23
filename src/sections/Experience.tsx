import { useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar, MapPin, ChevronRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ExperienceItem {
  title: string;
  company: string;
  location: string;
  period: string;
  type: string;
  description: string[];
  skills: string[];
}

const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<SVGPathElement>(null);

  const experiences: ExperienceItem[] = [
    {
      title: 'AI Training Specialist',
      company: 'Aether Project – Outlier AI',
      location: 'Remote',
      period: 'Jan 2026 – Present',
      type: 'Contract',
      description: [
        'Train and evaluate large language models by generating high-quality code examples and providing detailed feedback on model-generated responses',
        'Perform data annotation and quality assurance tasks to improve AI model accuracy across multiple programming domains',
        'Assess code correctness, efficiency, and adherence to best practices for reinforcement learning pipelines',
      ],
      skills: ['LLM Training', 'Code Review', 'AI Evaluation', 'Python'],
    },
    {
      title: 'IT Go Live Support',
      company: 'Niagara Health',
      location: 'St. Catharines, ON',
      period: 'Sep 2024 – Dec 2024',
      type: 'Co-op',
      description: [
        'Analyzed complex software systems to identify bugs, troubleshoot issues, and implement fixes during critical deployment phases',
        'Provided technical support to healthcare professionals during night shifts, ensuring zero downtime for patient care systems',
        'Collaborated with IT team to enhance system performance and streamline workflows across departments',
      ],
      skills: ['System Analysis', 'Bug Fixing', 'Technical Support', 'Healthcare IT'],
    },
    {
      title: 'Scout Captain',
      company: 'Bharat Scout and Guides',
      location: 'Dammam, KSA',
      period: 'Apr 2022 – Aug 2022',
      type: 'Leadership',
      description: [
        'Led team of 30 members, increasing project completion efficiency by 20% through strategic task delegation',
        'Organized and coordinated community service projects and outdoor activities',
        'Mentored younger scouts in leadership skills and personal development',
      ],
      skills: ['Leadership', 'Team Management', 'Project Coordination', 'Mentoring'],
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
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

      // Timeline line draw animation
      if (lineRef.current) {
        const length = lineRef.current.getTotalLength();
        gsap.set(lineRef.current, {
          strokeDasharray: length,
          strokeDashoffset: length,
        });

        gsap.to(lineRef.current, {
          strokeDashoffset: 0,
          duration: 2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: timelineRef.current,
            start: 'top 70%',
            end: 'bottom 30%',
            scrub: 1,
          },
        });
      }

      // Experience cards animation
      const cards = timelineRef.current?.querySelectorAll('.experience-card');
      cards?.forEach((card, index) => {
        const isLeft = index % 2 === 0;
        gsap.fromTo(
          card,
          { x: isLeft ? -100 : 100, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%',
            },
          }
        );
      });

      // Timeline nodes animation
      const nodes = timelineRef.current?.querySelectorAll('.timeline-node');
      nodes?.forEach((node, index) => {
        gsap.fromTo(
          node,
          { scale: 0 },
          {
            scale: 1,
            duration: 0.4,
            delay: index * 0.3,
            ease: 'elastic.out(1, 0.5)',
            scrollTrigger: {
              trigger: timelineRef.current,
              start: 'top 70%',
            },
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="experience"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute left-0 top-0 w-1/4 h-full bg-gradient-to-r from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2
            ref={headingRef}
            className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
          >
            Professional <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building expertise through real-world experience and continuous learning
          </p>
        </div>

        {/* Timeline */}
        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Center line (desktop) */}
          <svg
            className="absolute left-1/2 top-0 h-full w-4 -translate-x-1/2 hidden lg:block"
            preserveAspectRatio="none"
          >
            <path
              ref={lineRef}
              d="M 8 0 L 8 100%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              fill="none"
              className="timeline-line"
              style={{ height: '100%' }}
            />
          </svg>

          {/* Mobile line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-primary/50 to-transparent lg:hidden" />

          {/* Experience items */}
          <div className="space-y-12 lg:space-y-0">
            {experiences.map((exp, index) => (
              <div
                key={index}
                className={`relative lg:grid lg:grid-cols-2 lg:gap-8 ${
                  index > 0 ? 'lg:mt-12' : ''
                }`}
              >
                {/* Timeline node */}
                <div
                  className={`timeline-node absolute left-4 lg:left-1/2 w-4 h-4 rounded-full bg-primary border-4 border-background shadow-lg shadow-primary/50 z-10 -translate-x-1/2 top-6`}
                />

                {/* Card */}
                <div
                  className={`experience-card ml-12 lg:ml-0 ${
                    index % 2 === 0 ? 'lg:pr-16' : 'lg:col-start-2 lg:pl-16'
                  }`}
                >
                  <Card className="glass hover:shadow-lg hover:shadow-primary/20 transition-all duration-500 group card-shine">
                    <CardContent className="p-6">
                      {/* Header */}
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                            {exp.title}
                          </h3>
                          <p className="text-primary font-medium">{exp.company}</p>
                        </div>
                        <div className="p-2 rounded-lg bg-primary/10">
                          <Briefcase className="h-5 w-5 text-primary" />
                        </div>
                      </div>

                      {/* Meta info */}
                      <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-4">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {exp.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {exp.period}
                        </span>
                        <Badge variant="outline" className="text-xs">
                          {exp.type}
                        </Badge>
                      </div>

                      {/* Description */}
                      <ul className="space-y-2 mb-4">
                        {exp.description.map((item, i) => (
                          <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                            <ChevronRight className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {exp.skills.map((skill, i) => (
                          <Badge
                            key={i}
                            variant="secondary"
                            className="bg-primary/10 text-primary text-xs"
                          >
                            {skill}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Empty space for alternating layout */}
                {index % 2 === 0 && <div className="hidden lg:block" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
