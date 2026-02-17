import { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
}

const ParticleField = () => {
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

    // Create 3D particles
    const particles: Particle[] = [];
    const particleCount = 100;
    const focalLength = 300;

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: (Math.random() - 0.5) * canvas.width * 2,
        y: (Math.random() - 0.5) * canvas.height * 2,
        z: Math.random() * 1000,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        vz: -Math.random() * 2 - 0.5,
        size: Math.random() * 2 + 1,
      });
    }

    let animationId: number;
    let mouseX = 0;
    let mouseY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = (e.clientX - canvas.width / 2) * 0.001;
      mouseY = (e.clientY - canvas.height / 2) * 0.001;
    };

    window.addEventListener('mousemove', handleMouseMove);

    const draw = () => {
      ctx.fillStyle = 'rgba(15, 23, 42, 0.2)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      particles.forEach((particle) => {
        // Update position
        particle.x += particle.vx + mouseX * particle.z * 0.01;
        particle.y += particle.vy + mouseY * particle.z * 0.01;
        particle.z += particle.vz;

        // Reset particle if it goes behind camera
        if (particle.z < -focalLength) {
          particle.z = 1000;
          particle.x = (Math.random() - 0.5) * canvas.width * 2;
          particle.y = (Math.random() - 0.5) * canvas.height * 2;
        }

        // Reset particle if it goes too far
        if (particle.z > 1000) {
          particle.z = -focalLength;
        }

        // 3D projection
        const scale = focalLength / (focalLength + particle.z);
        const x2d = particle.x * scale + centerX;
        const y2d = particle.y * scale + centerY;
        const size2d = particle.size * scale;

        // Draw particle
        const opacity = Math.max(0, Math.min(1, (1000 - particle.z) / 1000));
        ctx.beginPath();
        ctx.arc(x2d, y2d, size2d, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(199, 89%, 48%, ${opacity * 0.8})`;
        ctx.fill();

        // Draw glow for close particles
        if (particle.z < 500) {
          const gradient = ctx.createRadialGradient(x2d, y2d, 0, x2d, y2d, size2d * 4);
          gradient.addColorStop(0, `hsla(199, 89%, 48%, ${opacity * 0.3})`);
          gradient.addColorStop(1, 'transparent');
          ctx.beginPath();
          ctx.arc(x2d, y2d, size2d * 4, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();
        }
      });

      // Draw connections between close particles
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach((p2) => {
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const dz = p1.z - p2.z;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);

          if (distance < 200 && p1.z < 500 && p2.z < 500) {
            const scale1 = focalLength / (focalLength + p1.z);
            const scale2 = focalLength / (focalLength + p2.z);
            const x1 = p1.x * scale1 + centerX;
            const y1 = p1.y * scale1 + centerY;
            const x2 = p2.x * scale2 + centerX;
            const y2 = p2.y * scale2 + centerY;

            const avgZ = (p1.z + p2.z) / 2;
            const opacity = Math.max(0, (500 - avgZ) / 500) * 0.3;

            ctx.beginPath();
            ctx.moveTo(x1, y1);
            ctx.lineTo(x2, y2);
            ctx.strokeStyle = `hsla(199, 89%, 48%, ${opacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        });
      });

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
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

export default ParticleField;
