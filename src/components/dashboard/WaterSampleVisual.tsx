
import { useEffect, useRef } from "react";
import { WaterSample } from "@/types/water";

interface WaterSampleVisualProps {
  sample: WaterSample;
}

export function WaterSampleVisual({ sample }: WaterSampleVisualProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Calculate colors based on toxicity
    const getWaterColor = () => {
      if (sample.toxicityLevel > 85) return 'rgba(234, 56, 76, 0.7)'; // Very toxic - red
      if (sample.toxicityLevel > 70) return 'rgba(234, 56, 76, 0.4)'; // Toxic - lighter red
      if (sample.toxicityLevel > 40) return 'rgba(255, 170, 0, 0.5)'; // Warning - yellow/orange
      return 'rgba(51, 195, 240, 0.6)'; // Clean - blue
    };
    
    // Fill container with water
    const waterColor = getWaterColor();
    ctx.fillStyle = waterColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Add some particulates based on contaminant count
    const particleCount = sample.contaminants.length * 10;
    
    for (let i = 0; i < particleCount; i++) {
      const x = Math.random() * canvas.width;
      const y = Math.random() * canvas.height;
      const size = Math.random() * 3 + 1;
      
      ctx.beginPath();
      ctx.fillStyle = 'rgba(0, 0, 0, 0.3)';
      ctx.arc(x, y, size, 0, Math.PI * 2);
      ctx.fill();
    }
    
    // Add a light water surface reflection
    const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height * 0.3);
    gradient.addColorStop(0, 'rgba(255, 255, 255, 0.3)');
    gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height * 0.3);
    
    // Add ripples if highly toxic
    if (sample.toxicityLevel > 70) {
      for (let i = 0; i < 3; i++) {
        const x = canvas.width * (0.3 + (Math.random() * 0.4));
        const y = canvas.height * (0.3 + (Math.random() * 0.4));
        const radius = 5 + Math.random() * 15;
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        ctx.lineWidth = 2;
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.stroke();
        
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 1.5;
        ctx.arc(x, y, radius + 5, 0, Math.PI * 2);
        ctx.stroke();
      }
    }
    
  }, [sample]);
  
  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full"
      width={300}
      height={180}
    />
  );
}
