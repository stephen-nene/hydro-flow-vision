
import { useState, useEffect } from "react";
import { X, Camera, Maximize2, Minimize2, PlusCircle, MinusCircle, Layers, Droplet, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

interface CameraViewProps {
  onClose: () => void;
}

export const CameraView = ({ onClose }: CameraViewProps) => {
  const [fullscreen, setFullscreen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [showOverlay, setShowOverlay] = useState(true);
  const [activeContaminant, setActiveContaminant] = useState<string | null>(null);
  const { toast } = useToast();
  
  const toggleFullscreen = () => {
    setFullscreen(!fullscreen);
  };
  
  const increaseZoom = () => {
    if (zoom < 3) setZoom(zoom + 0.25);
  };
  
  const decreaseZoom = () => {
    if (zoom > 0.5) setZoom(zoom - 0.25);
  };
  
  const simulateDetection = () => {
    toast({
      title: "Contaminant Detected",
      description: "Lead particles identified in water sample.",
    });
    setActiveContaminant("lead");
  };
  
  useEffect(() => {
    // Simulate detection after 3 seconds
    const timer = setTimeout(() => {
      simulateDetection();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  return (
    <div className={`fixed inset-0 bg-black z-50 flex flex-col ${fullscreen ? '' : 'md:p-8'}`}>
      {/* Camera Feed */}
      <div className="relative flex-1 bg-gray-900 overflow-hidden">
        {/* Simulated camera feed */}
        <div className="absolute inset-0 bg-gray-800" style={{ transform: `scale(${zoom})` }}>
          {/* Sample water visualization */}
          <div className="absolute inset-0 opacity-40 bg-blue-900"></div>
          
          {/* Motion of water */}
          <div className="absolute inset-0 flex items-center justify-center">
            {[...Array(20)].map((_, i) => (
              <div 
                key={i}
                className="absolute w-16 h-16 rounded-full bg-blue-600/20 animate-pulse"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 2}s`,
                  animationDuration: `${2 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
          
          {/* Contaminant visualization */}
          {activeContaminant === "lead" && showOverlay && (
            <div className="absolute inset-0">
              {[...Array(10)].map((_, i) => (
                <div 
                  key={i}
                  className="absolute w-2 h-2 rounded-full bg-red-500 animate-ping"
                  style={{
                    left: `${20 + Math.random() * 60}%`,
                    top: `${20 + Math.random() * 60}%`,
                    animationDelay: `${Math.random() * 1}s`,
                    animationDuration: `${1 + Math.random() * 1}s`
                  }}
                ></div>
              ))}
            </div>
          )}
        </div>
        
        {/* AR Overlays */}
        {showOverlay && (
          <div className="absolute inset-0 pointer-events-none">
            {/* Grid pattern */}
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4">
              {[...Array(16)].map((_, i) => (
                <div key={i} className="border border-white/10"></div>
              ))}
            </div>
            
            {/* Targeting reticle */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="w-32 h-32 rounded-full border-2 border-cyan-400/50 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border border-cyan-400/70 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full border border-cyan-400/90 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-cyan-400"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Info readouts */}
            {activeContaminant && (
              <div className="absolute top-8 right-8 p-3 bg-black/70 border border-red-500/50 rounded max-w-xs">
                <h3 className="text-red-500 text-sm font-semibold flex items-center">
                  <Droplet className="h-4 w-4 mr-1" />
                  Lead Contamination Detected
                </h3>
                <p className="text-white/90 text-xs mt-1">
                  Preliminary estimate: 0.24 mg/L (4.8x above limit)
                </p>
                <p className="text-white/70 text-xs mt-2">
                  Collecting sample data...
                </p>
                <div className="mt-2 bg-gray-800 h-1 rounded-full overflow-hidden">
                  <div className="bg-red-600 h-full w-2/3 animate-pulse"></div>
                </div>
              </div>
            )}
            
            {/* Data points */}
            <div className="absolute bottom-12 left-8 text-xs text-white/80 space-y-1">
              <div>pH: 6.8</div>
              <div>Temperature: 22°C</div>
              <div>Turbidity: 5.4 NTU</div>
            </div>
          </div>
        )}
      </div>
      
      {/* Controls */}
      <div className="bg-black p-4 flex justify-between items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-white hover:bg-gray-800 rounded-full" 
          onClick={onClose}
        >
          <X className="h-6 w-6" />
        </Button>
        
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800 rounded-full"
            onClick={() => setShowOverlay(!showOverlay)}
          >
            <Layers className="h-6 w-6" />
          </Button>
          
          <div className="flex items-center">
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={decreaseZoom}
              disabled={zoom <= 0.5}
            >
              <MinusCircle className="h-6 w-6" />
            </Button>
            
            <span className="mx-2 text-white text-sm">{zoom.toFixed(1)}x</span>
            
            <Button
              variant="ghost"
              size="icon"
              className="text-white hover:bg-gray-800 rounded-full"
              onClick={increaseZoom}
              disabled={zoom >= 3}
            >
              <PlusCircle className="h-6 w-6" />
            </Button>
          </div>
          
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-gray-800 rounded-full"
            onClick={toggleFullscreen}
          >
            {fullscreen ? <Minimize2 className="h-6 w-6" /> : <Maximize2 className="h-6 w-6" />}
          </Button>
        </div>
        
        <Button 
          className="rounded-full px-4 bg-blue-600 hover:bg-blue-700"
        >
          <Camera className="h-5 w-5 mr-2" />
          Capture
        </Button>
      </div>
    </div>
  );
};
