import { useState, useEffect } from 'react';

interface GlitchTextProps {
  text: string;
  className?: string;
  glitchIntensity?: 'low' | 'medium' | 'high';
}

const GlitchText = ({ 
  text, 
  className = '',
  glitchIntensity = 'medium'
}: GlitchTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const [isGlitching, setIsGlitching] = useState(false);

  const glitchChars = '!@#$%^&*()_+-=[]{}|;:,.<>?/~`';
  const intensityMap = {
    low: { chars: 2, duration: 50 },
    medium: { chars: 4, duration: 30 },
    high: { chars: 8, duration: 20 },
  };

  const triggerGlitch = () => {
    if (isGlitching) return;
    setIsGlitching(true);

    const { duration } = intensityMap[glitchIntensity];
    let iterations = 0;
    const maxIterations = text.length * 2;

    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (index < iterations / 2) return text[index];
            return glitchChars[Math.floor(Math.random() * glitchChars.length)];
          })
          .join('')
      );

      iterations++;

      if (iterations > maxIterations) {
        clearInterval(interval);
        setDisplayText(text);
        setIsGlitching(false);
      }
    }, duration);
  };

  useEffect(() => {
    // Random glitch every 5-10 seconds
    const randomGlitch = () => {
      const delay = Math.random() * 5000 + 5000;
      setTimeout(() => {
        triggerGlitch();
        randomGlitch();
      }, delay);
    };

    randomGlitch();
  }, []);

  return (
    <span
      className={`relative inline-block ${className}`}
      onMouseEnter={triggerGlitch}
    >
      {/* Main text */}
      <span className="relative z-10">{displayText}</span>
      
      {/* Glitch layers */}
      <span 
        className="absolute top-0 left-0 opacity-0 text-red-500"
        style={{
          opacity: isGlitching ? 0.8 : 0,
          transform: isGlitching ? 'translate(-2px, -2px)' : 'none',
          clipPath: isGlitching ? 'inset(10% 0 60% 0)' : 'none',
          transition: 'opacity 0.05s',
        }}
        aria-hidden="true"
      >
        {displayText}
      </span>
      
      <span 
        className="absolute top-0 left-0 opacity-0 text-cyan-500"
        style={{
          opacity: isGlitching ? 0.8 : 0,
          transform: isGlitching ? 'translate(2px, 2px)' : 'none',
          clipPath: isGlitching ? 'inset(60% 0 10% 0)' : 'none',
          transition: 'opacity 0.05s',
        }}
        aria-hidden="true"
      >
        {displayText}
      </span>
    </span>
  );
};

export default GlitchText;
