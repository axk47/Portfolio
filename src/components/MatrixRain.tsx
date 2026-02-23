import { useEffect, useRef } from 'react';

const MatrixRain = () => {
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

    // Matrix characters - mix of katakana, numbers, and letters
    const chars = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charArray = chars.split('');

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = Array(columns).fill(1);
    
    // Speed variation for each column
    const speeds: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);
    
    // Brightness variation
    const brightness: number[] = Array(columns).fill(0).map(() => Math.random() * 0.5 + 0.5);

    let animationId: number;
    let frameCount = 0;

    const draw = () => {
      frameCount++;
      
      // Only draw every 2nd frame for performance
      if (frameCount % 2 === 0) {
        // Semi-transparent black to create trail effect
        ctx.fillStyle = 'rgba(15, 23, 42, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${fontSize}px monospace`;

        for (let i = 0; i < drops.length; i++) {
          // Random character
          const char = charArray[Math.floor(Math.random() * charArray.length)];
          
          // Calculate position
          const x = i * fontSize;
          const y = drops[i] * fontSize;

          // Leading character is brighter (white/cyan)
          const leadBrightness = brightness[i];
          ctx.fillStyle = `rgba(56, 189, 248, ${leadBrightness})`;
          ctx.fillText(char, x, y);

          // Randomly reset drop to top
          if (y > canvas.height && Math.random() > 0.975) {
            drops[i] = 0;
            brightness[i] = Math.random() * 0.5 + 0.5;
          }

          // Move drop down
          drops[i] += speeds[i];
        }
      }

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
      style={{ opacity: 0.15 }}
    />
  );
};

export default MatrixRain;
