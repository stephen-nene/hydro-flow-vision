
import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertTriangle, DropletIcon } from "lucide-react";
import { WaterSample } from "@/types/water";
import { WaterSampleVisual } from "@/components/dashboard/WaterSampleVisual";

interface PriorityCasesCarouselProps {
  cases: WaterSample[];
  isEmergencyMode: boolean;
}

export function PriorityCasesCarousel({ cases, isEmergencyMode }: PriorityCasesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollLeft -= scrollAmount;
      } else {
        current.scrollLeft += scrollAmount;
      }
    }
  };

  if (cases.length === 0) {
    return (
      <div className={cn(
        "text-center p-8 border rounded-lg",
        isEmergencyMode ? "border-gray-700 bg-gray-800/50 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-500"
      )}>
        <DropletIcon className="mx-auto h-10 w-10 mb-2 opacity-50" />
        <p>No priority cases to display</p>
      </div>
    );
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {cases.map((waterCase) => (
          <div key={waterCase.id} className="snap-start">
            <Card className={cn(
              "w-[300px] shrink-0 overflow-hidden",
              isEmergencyMode 
                ? "bg-gray-800 border-water-danger/40" 
                : "bg-white border-gray-200",
              waterCase.toxicityLevel > 85 && "border-water-danger"
            )}>
              <CardHeader className={cn(
                "p-4",
                waterCase.toxicityLevel > 85 && "bg-water-danger/10"
              )}>
                <div className="flex justify-between items-center">
                  <CardTitle className={cn(
                    "text-lg",
                    isEmergencyMode ? "text-white" : "text-gray-800"
                  )}>
                    Sample #{waterCase.id}
                  </CardTitle>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium flex items-center",
                    waterCase.toxicityLevel > 85 
                      ? "bg-water-danger text-white" 
                      : waterCase.toxicityLevel > 70 
                        ? "bg-water-danger/20 text-water-danger" 
                        : "bg-yellow-500/20 text-yellow-600"
                  )}>
                    {waterCase.toxicityLevel > 70 && <AlertTriangle className="w-3 h-3 mr-1" />}
                    {waterCase.toxicityLevel}% Toxicity
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[180px] relative">
                  <WaterSampleVisual sample={waterCase} />
                </div>
                <div className="p-4">
                  <h3 className={cn(
                    "font-medium mb-1",
                    isEmergencyMode ? "text-gray-200" : "text-gray-700"
                  )}>
                    {waterCase.location}
                  </h3>
                  <p className={cn(
                    "text-sm mb-3",
                    isEmergencyMode ? "text-gray-400" : "text-gray-500"
                  )}>
                    Collected: {waterCase.collectionDate}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {waterCase.contaminants.map((contaminant, index) => (
                      <span 
                        key={index}
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          isEmergencyMode 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        {contaminant}
                      </span>
                    ))}
                  </div>
                  <Button 
                    className={cn(
                      "w-full mt-2",
                      waterCase.toxicityLevel > 85 
                        ? "bg-water-danger hover:bg-water-danger/90" 
                        : isEmergencyMode 
                          ? "bg-gray-700 hover:bg-gray-600" 
                          : ""
                    )}
                  >
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute left-0 top-1/2 -translate-y-1/2 rounded-full",
          isEmergencyMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-700"
        )}
        onClick={() => scroll('left')}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="icon"
        className={cn(
          "absolute right-0 top-1/2 -translate-y-1/2 rounded-full",
          isEmergencyMode ? "bg-gray-800/90 text-white" : "bg-white/90 text-gray-700"
        )}
        onClick={() => scroll('right')}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>
    </div>
  );
}
