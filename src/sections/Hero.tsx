import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { ArrowDown, Linkedin, Mail, Terminal, Github } from 'lucide-react';
import gsap from 'gsap';
// Typing effect for name is handled via CSS (.hero-type)

const Hero = () => {
  const heroRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scanlineOffset, setScanlineOffset] = useState(0);
  const [roleText, setRoleText] = useState('');

  // Scanline animation
  useEffect(() => {
    let animationId: number;
    const animate = () => {
      setScanlineOffset((prev) => (prev + 1) % 100);
      animationId = requestAnimationFrame(animate);
    };
    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, []);

  // Binary code rain effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const chars = '01';
    const charArray = chars.split('');
    const fontSize = 12;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);

    let animationId: number;
    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.03)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = charArray[Math.floor(Math.random() * charArray.length)];
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        // Gradient color from cyan to blue
        const gradient = ctx.createLinearGradient(x, y - fontSize, x, y);
        gradient.addColorStop(0, 'hsla(199, 89%, 48%, 0.1)');
        gradient.addColorStop(1, 'hsla(210, 100%, 60%, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillText(char, x, y);

        if (y > canvas.height && Math.random() > 0.98) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  // Entrance animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } });

      // Role text uses pure CSS typing; no GSAP on it so it starts immediately.

      tl.fromTo(
        descRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.2
      );

      tl.fromTo(
        ctaRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        1.4
      );

      // Image 3D flip with glow
      tl.fromTo(
        imageRef.current,
        { rotateY: 90, scale: 0.8, opacity: 0 },
        { rotateY: 0, scale: 1, opacity: 1, duration: 1.2 },
        0.5
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  // JS typing for the role line (state-driven)
  useEffect(() => {
    const full = 'Software Engineer & Full-Stack Developer';
    setRoleText('');
    let i = 0;
    const speed = 60; // ms per character
    const timer = setInterval(() => {
      i += 1;
      setRoleText(full.slice(0, i));
      if (i >= full.length) clearInterval(timer);
    }, speed);
    return () => clearInterval(timer);
  }, []);

  // Mouse parallax
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;
      setMousePos({
        x: (clientX / innerWidth - 0.5) * 2,
        y: (clientY / innerHeight - 0.5) * 2,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      gsap.to(textRef.current, {
        rotateY: mousePos.x * 8,
        rotateX: -mousePos.y * 8,
        duration: 0.5,
        ease: 'power2.out',
      });
    }
  }, [mousePos]);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{ perspective: '1500px' }}
    >
      {/* Binary rain canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none z-0" />

      {/* Scanline overlay */}
      <div
        className="absolute inset-0 pointer-events-none z-10 opacity-5"
        style={{
          background: `repeating-linear-gradient(
            0deg,
            transparent,
            transparent 2px,
            rgba(56, 189, 248, 0.1) 2px,
            rgba(56, 189, 248, 0.1) 4px
          )`,
          transform: `translateY(${scanlineOffset}px)`,
        }}
      />

      {/* Glow orbs behind content */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse" style={{ animationDelay: '1s' }} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text content */}
          <div
            ref={textRef}
            className="text-center lg:text-left"
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Terminal-style greeting */}
            <div className="flex items-center gap-2 mb-4 justify-center lg:justify-start">
              <Terminal className="h-5 w-5 text-primary" />
              <span className="text-primary text-sm font-mono">
                <span className="text-green-500">➜</span> <span className="text-cyan-400">~</span> ./introduce.sh
              </span>
            </div>

            <p className="text-muted-foreground text-lg mb-4 font-medium">Hello, I'm</p>
            
            <h1
              ref={nameRef}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground mb-4"
              style={{ transformStyle: 'preserve-3d' }}
            >
              Abdullah Abdul Khader
            </h1>

            {/* Role line with state-driven typing */}
            <p className="typing-js text-xl sm:text-2xl lg:text-3xl text-gradient font-semibold mb-6 font-mono">
              {roleText}
            </p>

            <p
              ref={descRef}
              className="text-muted-foreground text-lg max-w-xl mx-auto lg:mx-0 mb-8"
            >
              I craft scalable, high-performance digital experiences with modern technologies.
              Fourth-year Computer Science student with a passion for building innovative solutions.
            </p>

            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                size="lg"
                onClick={scrollToProjects}
                className="magnetic-btn bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full animate-pulse-glow relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center">
                  View My Work
                  <ArrowDown className="ml-2 h-5 w-5" />
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
              </Button>

              <div className="flex gap-3 justify-center">
                <a
                  href="https://linkedin.com/in/abdullah-ak-034b1125a"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
                >
                  <Linkedin className="h-6 w-6 text-foreground" />
                </a>
                <a
                  href="https://github.com/axk47"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
                  title="GitHub"
                >
                  <Github className="h-6 w-6 text-foreground" />
                </a>
                <a
                  href="mailto:axk407@gmail.com"
                  className="p-3 rounded-full glass hover:bg-primary/20 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-primary/30"
                >
                  <Mail className="h-6 w-6 text-foreground" />
                </a>
              </div>
            </div>

            {/* Status indicators */}
            <div className="flex items-center gap-4 mt-8 justify-center lg:justify-start">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-muted-foreground font-mono">Available for hire</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-primary animate-pulse" style={{ animationDelay: '0.5s' }} />
                <span className="text-xs text-muted-foreground font-mono">Open to opportunities</span>
              </div>
            </div>
          </div>

          {/* Profile image with 3D effects */}
          <div
            ref={imageRef}
            className="relative flex justify-center lg:justify-end"
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="relative group">
              {/* Outer glow rings */}
              <div className="absolute inset-0 rounded-full border-2 border-primary/30 animate-[spin_10s_linear_infinite]" 
                style={{ transform: 'scale(1.2)' }} />
              <div className="absolute inset-0 rounded-full border border-cyan-500/20 animate-[spin_15s_linear_infinite_reverse]" 
                style={{ transform: 'scale(1.3)' }} />
              
              {/* Glow effect */}
              <div className="absolute inset-0 bg-primary/30 rounded-full blur-3xl scale-110 animate-pulse group-hover:scale-125 transition-transform duration-500" />
              
              {/* Image container with 3D tilt */}
              <div 
                className="relative w-64 h-64 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 p-2 sm:p-3 lg:p-4 animate-float"
                style={{
                  boxShadow: '0 0 60px hsl(199, 89%, 48%, 0.3), inset 0 0 60px hsl(199, 89%, 48%, 0.1)',
                }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}ak-hero.png`}
                  alt="AK Monogram"
                  className="w-full h-full object-cover object-center scale-[2.0] translate-x-0, translate-y-[8%]"
                />
                
                {/* Holographic overlay */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500"
                  style={{
                    background: 'linear-gradient(135deg, transparent 40%, rgba(56, 189, 248, 0.4) 50%, transparent 60%)',
                    backgroundSize: '200% 200%',
                    animation: 'shimmer 2s infinite',
                  }}
                />

                {/* Corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8 border-l-2 border-t-2 border-primary/50" />
                <div className="absolute top-4 right-4 w-8 h-8 border-r-2 border-t-2 border-primary/50" />
                <div className="absolute bottom-4 left-4 w-8 h-8 border-l-2 border-b-2 border-primary/50" />
                <div className="absolute bottom-4 right-4 w-8 h-8 border-r-2 border-b-2 border-primary/50" />
              </div>

              {/* Floating badges */}
              <div 
                className="absolute -top-4 -right-4 glass rounded-full px-4 py-2 animate-float border border-primary/30"
                style={{ animationDelay: '1s' }}
              >
                <span className="text-sm font-bold text-primary font-mono">GPA: 3.9/4.0</span>
              </div>
              <div 
                className="absolute -bottom-4 -left-4 glass rounded-full px-4 py-2 animate-float border border-primary/30"
                style={{ animationDelay: '2s' }}
              >
                <span className="text-sm font-bold text-primary font-mono">Dean's Honour List</span>
              </div>

              {/* Tech stack floating around */}
              <div className="absolute top-1/2 -left-8 glass rounded-lg px-2 py-1 text-xs text-emerald-400 ring-1 ring-emerald-500/30 animate-float" style={{ animationDelay: '0.5s', boxShadow: '0 0 16px rgba(16,185,129,0.25)' }}>
                React
              </div>
              <div className="absolute top-1/3 -right-8 glass rounded-lg px-2 py-1 text-xs text-blue-400 ring-1 ring-blue-500/30 animate-float" style={{ animationDelay: '1.5s', boxShadow: '0 0 16px rgba(59,130,246,0.25)' }}>
                Python
              </div>
              <div className="absolute bottom-1/3 -left-12 glass rounded-lg px-2 py-1 text-xs text-emerald-400 ring-1 ring-emerald-500/30 animate-float" style={{ animationDelay: '2.5s', boxShadow: '0 0 16px rgba(16,185,129,0.25)' }}>
                Node.js
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent z-20" />
    </section>
  );
};

export default Hero;




