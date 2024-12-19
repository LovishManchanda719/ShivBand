import React, { useEffect, useState, useRef } from 'react';

interface Bubble {
  id: number;
  size: number;
  left: number; 
  top: number;  
  delay: number;
  duration: number;
  color: string;
}

const BubbleAnimation = () => {
    const [bubbles, setBubbles] = useState<Bubble[]>([]);
  
    useEffect(() => {
      // Generate bubbles with more sophisticated color and animation variations
      const generatedBubbles = Array.from({ length: 20 }, (_, index) => ({
        id: Math.random(),
        size: Math.random() * 60 + 20, // Size between 20px and 80px
        left: Math.random() * 100,    // Percentage for horizontal positioning
        top: Math.random() * 100,     // Percentage for vertical positioning
        delay: Math.random() * 5,     // Delay for staggered animations
        duration: Math.random() * 4 + 6, // Duration (6s to 10s)
        color: index % 2 === 0 
          ? 'rgba(13, 148, 136, 0.3)' // Teal with opacity for light mode
          : 'rgba(45, 212, 191, 0.5)'  // Lighter teal variant
      }));
      setBubbles(generatedBubbles);
    }, []);
  
    return (
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {bubbles.map((bubble) => (
          <div
            key={bubble.id}
            className="absolute rounded-full animate-float transform transition-all duration-500 ease-in-out"
            style={{
              width: `${bubble.size}px`,
              height: `${bubble.size}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              backgroundColor: bubble.color,
              animationDelay: `${bubble.delay}s`,
              animationDuration: `${bubble.duration}s`,
              boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
              filter: 'blur(2px)' // Add a slight blur for depth
            }}
          />
        ))}
      </div>
    );
  };
  
  export default BubbleAnimation;