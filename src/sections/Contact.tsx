import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Linkedin, Mail, MapPin, Phone, Check, Loader2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading decode animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'expo.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );

      // Form inputs animation
      const inputs = formRef.current?.querySelectorAll('.form-group');
      inputs?.forEach((input, index) => {
        gsap.fromTo(
          input,
          { y: 20, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.5,
            delay: 0.2 + index * 0.1,
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSubmitted(true);

    // Reset after showing success
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({ name: '', email: '', message: '' });
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'axk407@gmail.com',
      href: 'mailto:axk407@gmail.com',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/abdullah-ak-034b1125a',
      href: 'https://linkedin.com/in/abdullah-ak-034b1125a',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '365-855-1811',
      href: 'tel:365-855-1811',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Toronto, ON, Canada',
      href: '#',
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent -z-10" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h2
              ref={headingRef}
              className="text-4xl lg:text-5xl font-bold text-foreground mb-4"
            >
              Let's Build <span className="text-gradient">Something</span>
            </h2>
            <p className="text-muted-foreground">
              Have a project in mind? Let's create something amazing together.
            </p>
          </div>

          {/* Contact grid */}
          <div className="contact-grid">
            {/* Contact form card */}
            <form ref={formRef} onSubmit={handleSubmit} className="contact-form">
              {/* Name */}
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Message */}
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Tell me about your project..."
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  required
                />
              </div>

              {/* Submit */}
              <Button
                type="submit"
                disabled={isSubmitting || isSubmitted}
                className={`w-full py-6 text-lg rounded-full transition-all duration-500 ${
                  isSubmitted ? 'bg-emerald-500 hover:bg-emerald-500' : 'bg-primary hover:bg-primary/90'
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending...
                  </>
                ) : isSubmitted ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Message Sent!
                  </>
                ) : (
                  <>
                    <Send className="mr-2 h-5 w-5" />
                    Send Message
                  </>
                )}
              </Button>
            </form>

            {/* Sidebar: Get in Touch + Availability */}
            <aside className="contact-sidebar">
              {/* Get in Touch */}
              <div className="info-card">
                <h3>Get in Touch</h3>
                <div className="contact-list">
                  {contactInfo.map((item, index) => (
                    <a
                      key={index}
                      href={item.href}
                      target={item.href.startsWith('http') ? '_blank' : undefined}
                      rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="contact-item"
                    >
                      <div className="contact-icon">
                        <item.icon />
                      </div>
                      <div className="contact-detail">
                        <div className="label">{item.label}</div>
                        <div className="value">{item.value}</div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability */}
              <div className="availability-card">
                <div className="avail-header">
                  <span className="pulse-dot" />
                  Available for Opportunities
                </div>
                <p>
                  Currently seeking New Grad and Full-Time Software Engineering opportunities starting Summer 2026.
                </p>
              </div>
            </aside>
          </div>

          {/* GitHub profile callout (CTA) removed by request */}

        </div>
      </div>
    </section>
  );
};

export default Contact;







