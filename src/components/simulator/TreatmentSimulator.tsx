
import { useState, useEffect } from "react";
import { Play, PauseCircle, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "@/components/ui/use-toast";

interface TreatmentSimulatorProps {
  treatmentType: "filtration" | "chemical" | "biological";
  isEmergencyMode: boolean;
}

export const TreatmentSimulator = ({ treatmentType, isEmergencyMode }: TreatmentSimulatorProps) => {
  const [isSimulating, setIsSimulating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [efficiency, setEfficiency] = useState(0);
  const [maintenance, setMaintenance] = useState(0);
  const [cost, setCost] = useState(0);
  const [stage, setStage] = useState(0);
  const [particles, setParticles] = useState<Array<{x: number, y: number, size: number, color: string}>>([]);
  
  // Generate random particles for visualization
  useEffect(() => {
    const newParticles = Array.from({ length: 50 }, () => ({
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 5 + 2,
      color: `rgba(${Math.random() * 255}, ${Math.random() * 100}, ${Math.random() * 100}, ${Math.random() * 0.8 + 0.2})`
    }));
    setParticles(newParticles);
  }, [treatmentType]);
  
  const runSimulation = () => {
    setIsSimulating(true);
    setProgress(0);
    setStage(0);
    
    toast({
      title: `Starting ${treatmentType} simulation`,
      description: "Please wait while we process the data",
    });
    
    // Simulated progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + 1;
        
        // Update stage based on progress
        if (newProgress === 33) {
          setStage(1);
          toast({
            description: "Stage 1 complete: Initial contaminant removal",
          });
        } else if (newProgress === 66) {
          setStage(2);
          toast({
            description: "Stage 2 complete: Secondary treatment active",
          });
        } else if (newProgress === 100) {
          setStage(3);
          clearInterval(interval);
          setIsSimulating(false);
          toast({
            title: "Simulation complete",
            description: `${treatmentType.charAt(0).toUpperCase() + treatmentType.slice(1)} treatment achieved ${efficiency}% efficiency`,
            variant: isEmergencyMode ? "destructive" : "default",
          });
        }
        
        // Update metrics based on progress
        if (newProgress % 10 === 0) {
          // Different metrics for different treatment types
          switch(treatmentType) {
            case "filtration":
              setEfficiency(Math.min(92, Math.floor(newProgress * 0.92)));
              setMaintenance(Math.min(100, Math.floor(newProgress * 0.5)));
              setCost(Math.min(100, Math.floor(newProgress * 0.6)));
              break;
            case "chemical":
              setEfficiency(Math.min(84, Math.floor(newProgress * 0.84)));
              setMaintenance(Math.min(100, Math.floor(newProgress * 0.7)));
              setCost(Math.min(100, Math.floor(newProgress * 0.8)));
              break;
            case "biological":
              setEfficiency(Math.min(88, Math.floor(newProgress * 0.88)));
              setMaintenance(Math.min(100, Math.floor(newProgress * 0.4)));
              setCost(Math.min(100, Math.floor(newProgress * 0.5)));
              break;
          }
        }
        
        return newProgress;
      });
    }, 100);
    
    return () => clearInterval(interval);
  };
  
  const resetSimulation = () => {
    setIsSimulating(false);
    setProgress(0);
    setEfficiency(0);
    setMaintenance(0);
    setCost(0);
    setStage(0);
  };
  
  // Calculate values for treatment types
  const getEfficiencyLabel = () => {
    switch(treatmentType) {
      case "filtration": return `${efficiency}% Removal`;
      case "chemical": return `${efficiency}% Neutralized`;
      case "biological": return `${efficiency}% Biodegraded`;
      default: return `${efficiency}%`;
    }
  };
  
  const getMaintenanceLabel = () => {
    const months = Math.max(1, Math.floor(maintenance / 16.67));
    return `${months} Month${months !== 1 ? 's' : ''}`;
  };
  
  const getCostLabel = () => {
    const costPerUnit = treatmentType === "filtration" ? 50 : 
                        treatmentType === "chemical" ? 75 : 30;
    return `$${Math.floor(cost * costPerUnit / 10)}/unit`;
  };
  
  return (
    <div className="space-y-4">
      <div className={`aspect-video bg-gray-900 rounded-md relative overflow-hidden ${isSimulating ? 'animate-pulse' : ''}`}>
        {/* Simulation visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          {progress === 0 ? (
            <p className="text-white z-10">{treatmentType.charAt(0).toUpperCase() + treatmentType.slice(1)} Simulation</p>
          ) : (
            <div className="text-center z-10">
              <p className="text-white font-semibold">Stage {stage + 1}/3</p>
              <p className="text-white text-sm">
                {stage === 0 ? "Initial Treatment" : 
                 stage === 1 ? "Secondary Processing" : 
                 stage === 2 ? "Final Polishing" : "Complete"}
              </p>
              <div className="mt-2 w-24 mx-auto">
                <Progress value={progress} className="h-1.5" />
              </div>
            </div>
          )}
        </div>
        
        {/* Animated particles */}
        <div className="absolute inset-0 overflow-hidden">
          {particles.map((particle, index) => (
            <div 
              key={index}
              className="absolute rounded-full transition-all duration-1000"
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                backgroundColor: progress > 0 ? 
                  `rgba(${Math.max(0, 255 - progress * 2.55)}, ${Math.min(255, 100 + progress * 1.55)}, ${Math.min(255, 100 + progress * 1.55)}, ${Math.max(0.1, 1 - progress/100)})` 
                  : particle.color,
                left: `${progress > 0 ? particle.x + (progress/5) * (Math.random() * 2 - 1) : particle.x}%`,
                top: `${progress > 0 ? 
                  // Particles move downward as treatment progresses
                  Math.min(100, particle.y + progress/3) 
                  : particle.y}%`,
                transform: `scale(${progress > 0 ? Math.max(0.1, 1 - progress/100) : 1})`,
                opacity: progress > 80 ? Math.max(0, 1 - (progress - 80)/20) : 1
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-2">
        <div className={`p-2 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-1">
            <span className="text-xs">Efficiency</span>
            <span className="text-xs font-medium">{getEfficiencyLabel()}</span>
          </div>
          <Progress value={efficiency} className={`h-1.5 ${isEmergencyMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </div>
        
        <div className={`p-2 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-1">
            <span className="text-xs">Maintenance</span>
            <span className="text-xs font-medium">{getMaintenanceLabel()}</span>
          </div>
          <Progress value={maintenance} className={`h-1.5 ${isEmergencyMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </div>
        
        <div className={`p-2 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
          <div className="flex justify-between mb-1">
            <span className="text-xs">Cost</span>
            <span className="text-xs font-medium">{getCostLabel()}</span>
          </div>
          <Progress value={cost} className={`h-1.5 ${isEmergencyMode ? 'bg-gray-800' : 'bg-gray-200'}`} />
        </div>
      </div>
      
      <div className="flex gap-2">
        {isSimulating ? (
          <Button variant="outline" className="w-full" onClick={() => setIsSimulating(false)}>
            <PauseCircle className="h-4 w-4 mr-2" />
            Pause
          </Button>
        ) : (
          <Button className="w-full" onClick={runSimulation} disabled={progress === 100}>
            <Play className="h-4 w-4 mr-2" />
            {progress === 0 ? "Run Simulation" : "Continue"}
          </Button>
        )}
        
        {progress > 0 && (
          <Button variant="outline" className="w-full" onClick={resetSimulation}>
            <RotateCcw className="h-4 w-4 mr-2" />
            Reset
          </Button>
        )}
      </div>
    </div>
  );
};
