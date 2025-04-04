
import { useEffect, useState } from "react";
import { WaterSample } from "@/types/water";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Droplet, MapPin, CalendarClock } from "lucide-react";

interface PriorityCasesCarouselProps {
  cases: WaterSample[];
}

export function PriorityCasesCarousel({ cases }: PriorityCasesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  
  const goToNext = () => {
    if (cases.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % cases.length);
  };
  
  const goToPrev = () => {
    if (cases.length <= 1) return;
    
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + cases.length) % cases.length);
  };
  
  useEffect(() => {
    let timeout: NodeJS.Timeout;
    if (isTransitioning) {
      timeout = setTimeout(() => {
        setIsTransitioning(false);
      }, 500);
    }
    
    return () => {
      clearTimeout(timeout);
    };
  }, [isTransitioning]);
  
  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      if (cases.length > 1) {
        goToNext();
      }
    }, 8000);
    
    return () => clearInterval(interval);
  }, [cases.length]);
  
  if (cases.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No priority cases found
        </p>
      </div>
    );
  }
  
  const currentCase = cases[currentIndex];
  
  return (
    <div className="relative">
      {cases.length > 1 && (
        <>
          <Button
            variant="ghost"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10"
            onClick={goToPrev}
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10"
            onClick={goToNext}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>
        </>
      )}
      
      <div className="overflow-hidden">
        <div 
          className={cn(
            "transition-transform duration-500",
            isTransitioning ? "opacity-50" : "opacity-100"
          )}
        >
          <div className="flex items-center gap-4">
            {/* Toxicity gauge simplified */}
            <div className="h-24 w-24 relative flex-shrink-0">
              <div className="h-full w-full rounded-full border-8 border-gray-100 flex items-center justify-center">
                <div 
                  className={cn(
                    "h-4/5 w-4/5 rounded-full flex items-center justify-center text-white font-bold",
                    currentCase.toxicityLevel > 85 
                      ? "bg-red-500" 
                      : currentCase.toxicityLevel > 60 
                      ? "bg-amber-500" 
                      : "bg-green-500"
                  )}
                >
                  {currentCase.toxicityLevel}%
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-semibold text-lg">Sample #{currentCase.id}</h4>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full",
                  currentCase.toxicityLevel > 85 
                    ? "bg-red-100 text-red-700" 
                    : currentCase.toxicityLevel > 60
                    ? "bg-amber-100 text-amber-700"
                    : "bg-green-100 text-green-700"
                )}>
                  {currentCase.toxicityLevel > 85 
                    ? "Critical" 
                    : currentCase.toxicityLevel > 60 
                    ? "Warning" 
                    : "Normal"}
                </span>
              </div>
              
              <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-600">
                <div className="flex items-center gap-1">
                  <MapPin className="h-3.5 w-3.5" />
                  <span>{currentCase.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <CalendarClock className="h-3.5 w-3.5" />
                  <span>{currentCase.timestamp}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Droplet className="h-3.5 w-3.5" />
                  <span>{currentCase.waterType || "Drinking water"}</span>
                </div>
              </div>
              
              <Separator className="my-2" />
              
              <div className="flex flex-wrap gap-1">
                {currentCase.contaminants.map((contaminant, idx) => (
                  <span 
                    key={idx}
                    className={cn(
                      "text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-700",
                      idx === 0 && currentCase.toxicityLevel > 70 && "bg-red-100 text-red-700"
                    )}
                  >
                    {contaminant}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {cases.length > 1 && (
        <div className="flex justify-center mt-4 gap-1">
          {cases.map((_, idx) => (
            <div
              key={idx}
              className={cn(
                "h-1.5 rounded-full transition-all",
                idx === currentIndex ? "w-6 bg-blue-500" : "w-1.5 bg-gray-300"
              )}
              onClick={() => {
                setIsTransitioning(true);
                setCurrentIndex(idx);
              }}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
}
