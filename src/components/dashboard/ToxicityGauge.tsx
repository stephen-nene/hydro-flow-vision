
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Info, CheckCircle, ArrowRight, Droplet } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface ToxicityGaugeProps {
  value: number;
  isEmergencyMode: boolean;
}

interface ToxicityIndicator {
  name: string;
  value: number;
  limit: number;
  unit: string;
  description: string;
}

export function ToxicityGauge({ value, isEmergencyMode }: ToxicityGaugeProps) {
  const [progress, setProgress] = useState(0);
  const [showDetails, setShowDetails] = useState(false);
  
  const toxicityIndicators: ToxicityIndicator[] = [
    {
      name: "Lead",
      value: value > 70 ? 18 : 8,
      limit: 15,
      unit: "ppb",
      description: "Lead can enter drinking water when plumbing materials that contain lead corrode."
    },
    {
      name: "Chlorine",
      value: value > 70 ? 5.2 : 2.1,
      limit: 4.0,
      unit: "mg/L",
      description: "Chlorine is commonly added to disinfect drinking water. High levels can cause taste and odor problems."
    },
    {
      name: "Nitrates",
      value: value > 70 ? 12 : 5,
      limit: 10,
      unit: "mg/L",
      description: "Nitrates can enter water through fertilizer runoff, sewage, and erosion of natural deposits."
    },
    {
      name: "pH Level",
      value: value > 70 ? 9.2 : 7.4,
      limit: 8.5,
      unit: "pH",
      description: "pH is a measure of how acidic/basic water is. The range is 0-14, with 7 being neutral."
    },
    {
      name: "Turbidity",
      value: value > 70 ? 1.8 : 0.4,
      limit: 1.0,
      unit: "NTU",
      description: "Turbidity is a measure of water clarity. High turbidity can indicate the presence of disease-causing organisms."
    },
    {
      name: "E. coli",
      value: value > 70 ? 1 : 0,
      limit: 0,
      unit: "CFU",
      description: "E. coli bacteria indicate possible contamination with human or animal wastes."
    }
  ];
  
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

  const getSeverityDescription = () => {
    if (value > 70) {
      return "Multiple water quality parameters exceed safe limits. Immediate corrective action is required to address contamination.";
    } else if (value > 40) {
      return "Several water quality parameters are approaching unsafe levels. Consider implementing preventive treatment measures.";
    } else {
      return "All water quality parameters are within acceptable ranges. Continue routine monitoring to maintain quality.";
    }
  };

  const getRecommendedActions = () => {
    if (value > 70) {
      return [
        "Isolate affected water sources immediately",
        "Implement emergency water treatment protocols",
        "Issue public health advisory if public supply affected",
        "Conduct comprehensive testing to identify contaminants",
        "Activate containment and remediation procedures"
      ];
    } else if (value > 40) {
      return [
        "Increase monitoring frequency for affected parameters",
        "Review and adjust treatment processes",
        "Investigate potential contamination sources",
        "Prepare contingency plans if conditions worsen",
        "Conduct additional testing for secondary contaminants"
      ];
    } else {
      return [
        "Maintain regular monitoring schedule",
        "Continue standard water treatment protocols",
        "Document current effective treatment methods",
        "Review emergency response procedures periodically",
        "Consider seasonal adjustments to treatment process"
      ];
    }
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
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Droplet className="h-3 w-3 text-green-500 mr-1" />
                  <span>0-40% Safe</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px]">Water quality is within all regulatory limits and safe for all uses.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Droplet className="h-3 w-3 text-yellow-500 mr-1" />
                  <span>41-70% Warning</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px]">Some contaminants are approaching regulatory limits. Increased monitoring recommended.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center cursor-help">
                  <Droplet className="h-3 w-3 text-water-danger mr-1" />
                  <span>71-100% Danger</span>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p className="w-[200px]">Multiple contaminants exceed regulatory limits. Immediate action required.</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogTrigger asChild>
          <div className={cn(
            "p-4 rounded-lg border cursor-pointer hover:bg-opacity-80 transition-all",
            value > 70 
              ? "border-water-danger/30 bg-water-danger/10 text-water-danger" 
              : isEmergencyMode 
                ? "border-gray-700 bg-gray-800/50 text-gray-300" 
                : "border-gray-200 bg-gray-50 text-gray-700"
          )}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-medium mb-1 flex items-center">
                  {value > 70 ? (
                    <AlertTriangle className="h-4 w-4 mr-1" />
                  ) : value > 40 ? (
                    <Info className="h-4 w-4 mr-1" />
                  ) : (
                    <CheckCircle className="h-4 w-4 mr-1" />
                  )}
                  {getSeverityText()} - Water Quality Assessment
                </h3>
                <p className="text-sm">
                  {getSeverityDescription()}
                </p>
              </div>
              <Button variant="ghost" size="sm" className="ml-2 flex-shrink-0">
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle className={cn(
              "flex items-center",
              value > 70 ? "text-water-danger" : 
              value > 40 ? "text-yellow-600" : 
              "text-green-600"
            )}>
              {value > 70 ? (
                <AlertTriangle className="h-5 w-5 mr-2" />
              ) : value > 40 ? (
                <Info className="h-5 w-5 mr-2" />
              ) : (
                <CheckCircle className="h-5 w-5 mr-2" />
              )}
              Water Quality Assessment: {getSeverityText()}
            </DialogTitle>
            <DialogDescription>
              Comprehensive analysis of water quality indicators and recommended actions
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
            <div>
              <h3 className="text-lg font-semibold mb-3">Key Indicators</h3>
              <div className="space-y-3">
                {toxicityIndicators.map((indicator) => {
                  const isExceeded = indicator.value > indicator.limit;
                  const isNearLimit = indicator.value > indicator.limit * 0.8 && indicator.value <= indicator.limit;
                  
                  return (
                    <Card key={indicator.name} className={cn(
                      "border",
                      isExceeded ? "border-water-danger/30" : 
                      isNearLimit ? "border-yellow-500/30" : 
                      "border-gray-200"
                    )}>
                      <CardHeader className="py-3">
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-base">{indicator.name}</CardTitle>
                          <Badge variant={isExceeded ? "destructive" : isNearLimit ? "outline" : "secondary"}>
                            {indicator.value} {indicator.unit}
                          </Badge>
                        </div>
                        <CardDescription className="text-xs">
                          Regulatory limit: {indicator.limit} {indicator.unit}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="py-0">
                        <Progress 
                          value={(indicator.value / indicator.limit) * 100} 
                          className="h-2 mb-2"
                          indicatorClassName={
                            isExceeded ? "bg-water-danger" : 
                            isNearLimit ? "bg-yellow-500" : 
                            "bg-green-500"
                          }
                        />
                        <p className="text-xs text-gray-500">{indicator.description}</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-3">Assessment Summary</h3>
              <Card className="mb-4">
                <CardHeader>
                  <CardTitle className="text-base">Overall Status</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "p-3 rounded-md mb-3",
                    value > 70 ? "bg-water-danger/10 text-water-danger" : 
                    value > 40 ? "bg-yellow-500/10 text-yellow-600" : 
                    "bg-green-500/10 text-green-600"
                  )}>
                    <p className="text-sm font-medium">{getSeverityDescription()}</p>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-sm">
                      <span className="font-medium">Sample Date:</span>
                      <p className="text-gray-500">{new Date().toLocaleDateString()}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Report Generated:</span>
                      <p className="text-gray-500">{new Date().toLocaleTimeString()}</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Water Source:</span>
                      <p className="text-gray-500">Municipal Supply</p>
                    </div>
                    <div className="text-sm">
                      <span className="font-medium">Collection Point:</span>
                      <p className="text-gray-500">Treatment Facility Intake</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Action Plan</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {getRecommendedActions().map((action, index) => (
                      <li key={index} className="flex items-start">
                        <span className={cn(
                          "flex-shrink-0 h-5 w-5 rounded-full flex items-center justify-center mr-2 mt-0.5 text-xs",
                          value > 70 ? "bg-water-danger text-white" : 
                          value > 40 ? "bg-yellow-500 text-white" : 
                          "bg-green-500 text-white"
                        )}>
                          {index + 1}
                        </span>
                        <span className="text-sm">{action}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <div className="w-full flex justify-between">
                    <Button variant="outline" size="sm">Generate PDF Report</Button>
                    <Button size="sm">Implement Plan</Button>
                  </div>
                </CardFooter>
              </Card>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
