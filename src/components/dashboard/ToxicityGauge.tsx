
import { useEffect, useRef, useState } from "react";

interface ToxicityGaugeProps {
  value: number;
}

export function ToxicityGauge({ value }: ToxicityGaugeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currentValue, setCurrentValue] = useState(0);
  
  // Animate the gauge when the value changes
  useEffect(() => {
    let animationFrame: number;
    let start: number | null = null;
    const duration = 1000; // ms
    const startValue = currentValue;
    
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const nextValue = startValue + (value - startValue) * progress;
      
      setCurrentValue(nextValue);
      
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    
    animationFrame = requestAnimationFrame(animate);
    
    return () => {
      cancelAnimationFrame(animationFrame);
    };
  }, [value, currentValue]);

  // Draw the gauge
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const width = canvas.width;
    const height = canvas.height;
    
    // Clear the canvas
    ctx.clearRect(0, 0, width, height);
    
    // Properties
    const centerX = width / 2;
    const centerY = height * 0.8;
    const radius = Math.min(width, height) * 0.8 / 2;
    
    // Draw background arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, Math.PI, 0, false);
    ctx.lineWidth = 20;
    ctx.strokeStyle = '#e5e7eb';
    ctx.stroke();
    
    // Calculate start and end angles for the value arc
    const startAngle = Math.PI;
    const endAngle = startAngle - (startAngle * (currentValue / 100));
    
    // Determine color based on value
    let color: string;
    if (currentValue <= 40) {
      color = '#10b981'; // Green for good
    } else if (currentValue <= 70) {
      color = '#f59e0b'; // Amber for warning
    } else {
      color = '#ef4444'; // Red for danger
    }
    
    // Draw the value arc
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, startAngle, endAngle, true);
    ctx.lineWidth = 20;
    ctx.strokeStyle = color;
    ctx.stroke();
    
    // Draw the center circle
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius * 0.1, 0, Math.PI * 2, false);
    ctx.fillStyle = '#64748b';
    ctx.fill();
    
    // Draw the needle
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(startAngle - (startAngle * (currentValue / 100)));
    
    ctx.beginPath();
    ctx.moveTo(0, -5);
    ctx.lineTo(radius * 0.9, 0);
    ctx.lineTo(0, 5);
    ctx.fillStyle = '#64748b';
    ctx.fill();
    
    ctx.restore();
    
    // Draw the value text
    ctx.font = 'bold 24px sans-serif';
    ctx.fillStyle = color;
    ctx.textAlign = 'center';
    ctx.fillText(`${Math.round(currentValue)}%`, centerX, centerY - radius / 2);
    
    // Draw the label
    ctx.font = '14px sans-serif';
    ctx.fillStyle = '#64748b';
    ctx.fillText('Toxicity Level', centerX, centerY - radius / 4);
    
    // Draw the min and max labels
    ctx.font = '12px sans-serif';
    ctx.fillStyle = '#6b7280';
    ctx.textAlign = 'left';
    ctx.fillText('0%', centerX - radius * 0.95, centerY + 20);
    ctx.textAlign = 'right';
    ctx.fillText('100%', centerX + radius * 0.95, centerY + 20);
    
  }, [currentValue]);

  return (
    <div className="w-full flex items-center justify-center">
      <canvas
        ref={canvasRef}
        width={300}
        height={200}
        className="max-w-full"
      ></canvas>
    </div>
  );
}
