
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle } from "lucide-react";

interface ToxicityGaugeProps {
  value: number;
  isEmergencyMode: boolean;
}

export function ToxicityGauge({ value, isEmergencyMode }: ToxicityGaugeProps) {
  const [progress, setProgress] = useState(0);
  
  useEffect(() => {
    const timer = setTimeout(() => setProgress(value), 500);
    return () => clearTimeout(timer);
  }, [value]);

  const getColorClass = () => {
    if (value > 70) return "bg-water-danger";
    if (value > 40) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getSeverityText = () => {
    if (value > 70) return "Critical";
    if (value > 40) return "Warning";
    return "Normal";
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={cn(
          "text-xl font-semibold",
          isEmergencyMode ? "text-water-danger" : "text-water-dark"
        )}>
          Overall Toxicity Level
        </h2>
        <div className={cn(
          "px-3 py-1 rounded-full text-sm font-medium flex items-center",
          value > 70 ? "bg-water-danger/20 text-water-danger" : 
          value > 40 ? "bg-yellow-500/20 text-yellow-600" : 
          "bg-green-500/20 text-green-600"
        )}>
          {value > 70 && <AlertTriangle className="w-4 h-4 mr-1" />}
          {getSeverityText()}
        </div>
      </div>

      <div className="relative pt-12 pb-8">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className={cn(
            "text-6xl font-bold",
            value > 70 ? "text-water-danger" : 
            value > 40 ? "text-yellow-500" : 
            "text-green-500"
          )}>
            {progress}%
          </div>
        </div>
        
        <div className="h-6 w-full">
          <Progress 
            value={progress} 
            className={cn(
              "h-5 rounded-full transition-all", 
              isEmergencyMode ? "bg-gray-800" : "bg-gray-200"
            )}
            indicatorClassName={cn(
              getColorClass(), 
              value > 70 && "animate-pulse"
            )} 
          />
        </div>
        
        <div className="flex justify-between mt-2 text-sm text-gray-500">
          <span>0% Safe</span>
          <span>50% Warning</span>
          <span>100% Danger</span>
        </div>
      </div>

      <div className={cn(
        "p-3 rounded-lg border",
        value > 70 
          ? "border-water-danger/30 bg-water-danger/10 text-water-danger" 
          : isEmergencyMode 
            ? "border-gray-700 bg-gray-800/50 text-gray-300" 
            : "border-gray-200 bg-gray-50 text-gray-700"
      )}>
        <p className="text-sm">
          {value > 70 
            ? "CRITICAL: Immediate treatment required. High levels of contamination detected." 
            : value > 40 
              ? "WARNING: Elevated toxicity levels. Consider treatment options." 
              : "NORMAL: Water quality within acceptable parameters."}
        </p>
      </div>
    </div>
  );
}
