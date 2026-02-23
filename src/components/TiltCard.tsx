import { useRef, useState } from 'react';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  tiltAmount?: number;
  glowColor?: string;
}

const TiltCard = ({ 
  children, 
  className = '', 
  tiltAmount = 15,
  glowColor = 'hsl(199, 89%, 48%)'
}: TiltCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState('');
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 50 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    const rotateX = (mouseY / (rect.height / 2)) * -tiltAmount;
    const rotateY = (mouseX / (rect.width / 2)) * tiltAmount;

    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`);
    
    // Update glow position
    const glowX = ((e.clientX - rect.left) / rect.width) * 100;
    const glowY = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPosition({ x: glowX, y: glowY });
  };

  const handleMouseLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)');
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <div
      ref={cardRef}
      className={`relative ${className}`}
      style={{
        transform,
        transformStyle: 'preserve-3d',
        transition: 'transform 0.15s ease-out',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {/* Glow effect */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 0.5 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}40, transparent 50%)`,
        }}
      />
      
      {/* Border glow */}
      <div
        className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300 pointer-events-none"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, ${glowColor}, transparent 40%)`,
          padding: '1px',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'xor',
          WebkitMaskComposite: 'xor',
        }}
      />

      {/* Content */}
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};

export default TiltCard;
