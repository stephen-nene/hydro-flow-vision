
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Mic, MicOff } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface VoiceCommandButtonProps {
  isEmergencyMode: boolean;
}

export function VoiceCommandButton({ isEmergencyMode }: VoiceCommandButtonProps) {
  const [isListening, setIsListening] = useState(false);
  const [ripples, setRipples] = useState<Array<{ id: number; opacity: number }>>([]);
  const { toast } = useToast();
  
  useEffect(() => {
    let interval: number;
    
    if (isListening) {
      let rippleCount = 0;
      interval = window.setInterval(() => {
        rippleCount++;
        setRipples(prev => [
          ...prev, 
          { id: rippleCount, opacity: 1 }
        ]);
        
        // Clean up old ripples
        if (rippleCount % 3 === 0) {
          setRipples(prev => prev.slice(-3));
        }
      }, 1000);
      
      // Simulate end of voice command after 3 seconds
      setTimeout(() => {
        if (isListening) {
          setIsListening(false);
          toast({
            title: "Voice command recognized",
            description: "Analyzing water sample #1082 now",
            variant: isEmergencyMode ? "destructive" : "default"
          });
        }
      }, 3000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isListening, toast, isEmergencyMode]);
  
  const toggleListening = () => {
    setIsListening(!isListening);
    if (!isListening) {
      toast({
        title: "Listening for commands",
        description: "Try saying 'Hey Hydro, analyze this' or 'Check water sample'",
      });
    } else {
      toast({
        title: "Voice command cancelled",
      });
    }
  };
  
  return (
    <div className="relative">
      {ripples.map(ripple => (
        <div
          key={ripple.id}
          className={cn(
            "absolute inset-0 rounded-full animate-ripple",
            isEmergencyMode ? "bg-water-danger/30" : "bg-water-dark/20"
          )}
        />
      ))}
      
      <Button
        onClick={toggleListening}
        className={cn(
          "relative w-full py-6",
          isListening
            ? isEmergencyMode 
              ? "bg-water-danger hover:bg-water-danger/90" 
              : "bg-water-dark hover:bg-water-dark/90"
            : isEmergencyMode
              ? "bg-gray-800 hover:bg-gray-700"
              : "bg-water-light hover:bg-water-light/90 text-water-dark"
        )}
      >
        <div className="flex items-center gap-2">
          {isListening 
            ? <MicOff className="h-5 w-5" /> 
            : <Mic className="h-5 w-5" />
          }
          <span>{isListening ? "Stop Listening" : "Hey Hydro"}</span>
        </div>
      </Button>
    </div>
  );
}
