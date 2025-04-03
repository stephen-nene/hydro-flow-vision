
import { useState, useRef, useEffect } from "react";
import { Camera, X, AlertTriangle, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";

interface CameraViewProps {
  onClose: () => void;
  isEmergencyMode: boolean;
}

export const CameraView = ({ onClose, isEmergencyMode }: CameraViewProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isCameraAvailable, setIsCameraAvailable] = useState(true);
  const [detections, setDetections] = useState<{type: string, level: number, position: {x: number, y: number}}[]>([]);
  const [scanComplete, setScanComplete] = useState(false);

  useEffect(() => {
    const startCamera = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ 
          video: { facingMode: "environment" } 
        });
        
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
          setIsStreaming(true);
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setIsCameraAvailable(false);
        toast({
          title: "Camera access denied",
          description: "Please enable camera access to use AR features",
          variant: "destructive",
        });
      }
    };

    startCamera();

    return () => {
      if (videoRef.current && videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject as MediaStream;
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const simulateAIDetection = () => {
    // Simulate AI detection with a small delay to make it seem like processing
    toast({
      title: "Analyzing water sample...",
      description: "Using computer vision to detect contaminants",
    });
    
    setTimeout(() => {
      // Simulated data - in a real app, this would come from ML model
      const mockDetections = [
        { type: "Lead", level: 0.28, position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 } },
        { type: "Mercury", level: 0.05, position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 } },
        { type: "Bacteria", level: 2.3, position: { x: Math.random() * 80 + 10, y: Math.random() * 80 + 10 } },
      ];
      
      setDetections(mockDetections);
      setScanComplete(true);
      
      toast({
        title: "Scan complete",
        description: `Detected ${mockDetections.length} potential contaminants`,
        variant: isEmergencyMode ? "destructive" : "default",
      });
    }, 2000);
  };

  const handleCapture = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        simulateAIDetection();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black">
      <div className="relative h-full flex flex-col">
        {/* Camera View */}
        <div className="relative flex-1 overflow-hidden">
          <video 
            ref={videoRef} 
            autoPlay 
            playsInline 
            muted 
            className="absolute inset-0 h-full w-full object-cover"
          />
          
          <canvas 
            ref={canvasRef} 
            className="absolute inset-0 h-full w-full object-cover opacity-0" 
          />
          
          {/* Detection Markers */}
          {detections.map((detection, index) => (
            <div 
              key={index} 
              className="absolute animate-pulse" 
              style={{
                left: `${detection.position.x}%`, 
                top: `${detection.position.y}%`,
                transform: 'translate(-50%, -50%)'
              }}
            >
              <div className="bg-red-500 bg-opacity-30 rounded-full h-16 w-16 flex items-center justify-center">
                <div className="bg-red-500 bg-opacity-50 rounded-full h-10 w-10 flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-white" />
                </div>
              </div>
              <div className="absolute top-16 left-1/2 transform -translate-x-1/2 bg-black/80 px-2 py-1 rounded text-white text-xs whitespace-nowrap">
                {detection.type}: {detection.level} ppm
              </div>
            </div>
          ))}
          
          {/* Camera Not Available Message */}
          {!isCameraAvailable && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/80">
              <div className="text-center p-4 max-w-xs">
                <Camera className="h-12 w-12 mx-auto mb-2 text-red-500" />
                <h3 className="text-xl font-bold text-white mb-2">Camera Access Required</h3>
                <p className="text-gray-300 mb-4">Please allow camera access to use the AR Field Assistant feature.</p>
                <Button onClick={onClose}>Return to Dashboard</Button>
              </div>
            </div>
          )}
          
          {/* Scan complete overlay */}
          {scanComplete && (
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
              <h3 className="text-white font-bold text-lg mb-2">Analysis Complete</h3>
              <div className="space-y-2 mb-3">
                {detections.map((detection, index) => (
                  <div key={index} className="flex justify-between items-center bg-black/50 p-2 rounded">
                    <span className="text-white">{detection.type}</span>
                    <span className={`font-bold ${detection.level > 0.1 ? 'text-red-400' : 'text-green-400'}`}>
                      {detection.level} ppm
                    </span>
                  </div>
                ))}
              </div>
              <p className="text-amber-300 text-sm mb-3">
                Recommendation: Install Ion Exchange Filter (HYD-F103)
              </p>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="absolute bottom-0 left-0 right-0 p-6 flex justify-between items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-black/50 border-white/20 text-white h-12 w-12"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
          
          <Button 
            className="rounded-full h-16 w-16 bg-water-danger text-white"
            onClick={handleCapture}
            disabled={!isStreaming || scanComplete}
          >
            <Camera className="h-8 w-8" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full bg-black/50 border-white/20 text-white h-12 w-12"
            onClick={onClose}
          >
            <Check className="h-6 w-6" />
          </Button>
        </div>
      </div>
    </div>
  );
};
