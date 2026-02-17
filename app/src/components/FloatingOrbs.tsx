import { useEffect, useRef } from 'react';

interface Orb {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
  color: string;
  glow: number;
}

const FloatingOrbs = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

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

    // Create orbs
    const orbs: Orb[] = [];
    const orbCount = 8;
    const colors = [
      'hsla(199, 89%, 48%, ',
      'hsla(190, 90%, 60%, ',
      'hsla(210, 100%, 60%, ',
      'hsla(180, 80%, 50%, ',
    ];

    for (let i = 0; i < orbCount; i++) {
      orbs.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 100 + 50,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
        glow: Math.random() * 0.3 + 0.1,
      });
    }

    let animationId: number;
    let time = 0;

    const draw = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      orbs.forEach((orb) => {
        // Update position
        orb.x += orb.vx;
        orb.y += orb.vy;

        // Bounce off edges
        if (orb.x < -orb.radius) orb.x = canvas.width + orb.radius;
        if (orb.x > canvas.width + orb.radius) orb.x = -orb.radius;
        if (orb.y < -orb.radius) orb.y = canvas.height + orb.radius;
        if (orb.y > canvas.height + orb.radius) orb.y = -orb.radius;

        // Pulsing radius
        const pulseRadius = orb.radius + Math.sin(time + orb.x * 0.01) * 20;

        // Create gradient
        const gradient = ctx.createRadialGradient(
          orb.x,
          orb.y,
          0,
          orb.x,
          orb.y,
          pulseRadius
        );
        gradient.addColorStop(0, orb.color + '0.4)');
        gradient.addColorStop(0.5, orb.color + '0.2)');
        gradient.addColorStop(1, orb.color + '0)');

        // Draw orb
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, pulseRadius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Draw glow center
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, pulseRadius * 0.3, 0, Math.PI * 2);
        ctx.fillStyle = orb.color + '0.6)';
        ctx.fill();
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
    />
  );
};

export default FloatingOrbs;
