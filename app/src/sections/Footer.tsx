import { Heart, Code, ChevronUp } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative py-12 border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo/Name */}
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-foreground">
              Abdullah<span className="text-primary">.</span>
            </h3>
            <p className="text-sm text-muted-foreground mt-1">
              Software Engineer & Full-Stack Developer
            </p>
          </div>

          {/* Quick links */}
          <nav className="flex flex-wrap justify-center gap-6">
            <a
              href="#about"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              About
            </a>
            <a
              href="#skills"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Skills
            </a>
            <a
              href="#experience"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Contact
            </a>
          </nav>

          {/* Back to top */}
          <button
            onClick={scrollToTop}
            className="p-3 rounded-full glass hover:bg-primary/20 transition-colors group"
            aria-label="Back to top"
          >
            <ChevronUp className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </button>
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <span>Made with</span>
            <Heart className="h-4 w-4 text-red-500 fill-red-500" />
            <span>and</span>
            <Code className="h-4 w-4 text-primary" />
          </div>
          <p>
            &copy; {currentYear} Abdullah Abdul Khader. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
