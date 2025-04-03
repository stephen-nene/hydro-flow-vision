
import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, Info, CheckCircle, ArrowRight, Droplet, FileText, Download, Share2, BarChart } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
  const [selectedTab, setSelectedTab] = useState("overview");
  const [reportGenerated, setReportGenerated] = useState(false);
  const [showHistoricalData, setShowHistoricalData] = useState(false);
  const { toast } = useToast();
  const detailsRef = useRef<HTMLDivElement>(null);
  
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
  
  const historicalReadings = [
    { date: "2023-06-01", value: 35 },
    { date: "2023-06-15", value: 38 },
    { date: "2023-07-01", value: 42 },
    { date: "2023-07-15", value: 45 },
    { date: "2023-08-01", value: 50 },
    { date: "2023-08-15", value: 55 },
    { date: "2023-09-01", value: 60 },
    { date: "2023-09-15", value: 65 },
    { date: "2023-10-01", value: value > 70 ? 75 : 55 },
    { date: "2023-10-15", value: value }
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
  
  const handleGenerateReport = () => {
    toast({
      title: "Generating Report",
      description: "Preparing comprehensive water quality assessment report...",
    });
    
    setTimeout(() => {
      setReportGenerated(true);
      toast({
        title: "Report Generated",
        description: "Water quality assessment report is ready for download.",
      });
    }, 1500);
  };
  
  const handleDownloadReport = () => {
    toast({
      title: "Report Downloaded",
      description: "Water quality assessment report has been downloaded.",
    });
  };
  
  const handleShareReport = () => {
    toast({
      title: "Report Shared",
      description: "Water quality assessment report has been shared with your team.",
    });
  };
  
  const handleImplementPlan = () => {
    toast({
      title: "Plan Implemented",
      description: `${getSeverityText()} response protocol has been activated.`,
    });
    setShowDetails(false);
  };
  
  const handleViewHistoricalData = () => {
    setShowHistoricalData(true);
    
    if (detailsRef.current) {
      detailsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2">
        <h2 className={cn(
          "text-xl font-semibold",
          isEmergencyMode ? "text-water-danger" : "text-water-dark"
        )}>
          Overall Toxicity Level
        </h2>
        <div className="flex gap-2 items-center">
          <div className={cn(
            "px-3 py-1 rounded-full text-sm font-medium flex items-center",
            value > 70 ? "bg-water-danger/20 text-water-danger" : 
            value > 40 ? "bg-yellow-500/20 text-yellow-600" : 
            "bg-green-500/20 text-green-600"
          )}>
            {value > 70 && <AlertTriangle className="w-4 h-4 mr-1" />}
            {getSeverityText()}
          </div>
          
          <Select defaultValue="latest" onValueChange={(value) => {
            toast({
              title: "Time Period Updated",
              description: `Showing data for ${value === "latest" ? "latest reading" : value === "day" ? "last 24 hours" : value === "week" ? "last week" : "last month"}`,
            });
          }}>
            <SelectTrigger className="h-8 w-[130px]">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="latest">Latest Reading</SelectItem>
              <SelectItem value="day">Last 24 Hours</SelectItem>
              <SelectItem value="week">Last Week</SelectItem>
              <SelectItem value="month">Last Month</SelectItem>
            </SelectContent>
          </Select>
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
      
      <div className="flex flex-wrap gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleViewHistoricalData}
          className={cn(
            "flex items-center gap-1 text-xs",
            isEmergencyMode ? "border-gray-700 text-gray-300" : ""
          )}
        >
          <BarChart className="h-3.5 w-3.5" />
          View Trends
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          onClick={handleGenerateReport}
          className={cn(
            "flex items-center gap-1 text-xs",
            isEmergencyMode ? "border-gray-700 text-gray-300" : ""
          )}
        >
          <FileText className="h-3.5 w-3.5" />
          Generate Report
        </Button>
        
        {reportGenerated && (
          <>
            <Button
              variant="outline"
              size="sm"
              onClick={handleDownloadReport}
              className={cn(
                "flex items-center gap-1 text-xs",
                isEmergencyMode ? "border-gray-700 text-gray-300" : ""
              )}
            >
              <Download className="h-3.5 w-3.5" />
              Download
            </Button>
            
            <Button
              variant="outline"
              size="sm"
              onClick={handleShareReport}
              className={cn(
                "flex items-center gap-1 text-xs",
                isEmergencyMode ? "border-gray-700 text-gray-300" : ""
              )}
            >
              <Share2 className="h-3.5 w-3.5" />
              Share
            </Button>
          </>
        )}
      </div>

      {showHistoricalData && (
        <div ref={detailsRef} className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
          <h3 className="text-sm font-medium mb-2">Historical Trend (Last 6 Months)</h3>
          <div className="h-40 w-full relative">
            <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200 dark:bg-gray-700" />
            <div className="absolute inset-y-0 left-0 w-px bg-gray-200 dark:bg-gray-700" />
            
            <div className="absolute top-0 left-0 text-xs text-gray-500">100%</div>
            <div className="absolute top-1/4 left-0 text-xs text-gray-500">75%</div>
            <div className="absolute top-1/2 left-0 text-xs text-gray-500">50%</div>
            <div className="absolute top-3/4 left-0 text-xs text-gray-500">25%</div>
            <div className="absolute bottom-0 left-0 text-xs text-gray-500">0%</div>
            
            <div className="flex items-end justify-between h-full px-5">
              {historicalReadings.map((reading, index) => (
                <div key={index} className="flex flex-col items-center">
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div 
                          className={cn(
                            "w-2 rounded-t transition-all",
                            reading.value > 70 ? "bg-water-danger" : 
                            reading.value > 40 ? "bg-yellow-500" : 
                            "bg-green-500"
                          )}
                          style={{ height: `${reading.value}%` }}
                        />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{new Date(reading.date).toLocaleDateString()}: {reading.value}%</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  {index % 3 === 0 && (
                    <span className="text-[8px] text-gray-500 mt-1 rotate-45 origin-top-left">
                      {new Date(reading.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                    </span>
                  )}
                </div>
              ))}
            </div>
            
            {/* Threshold lines */}
            <div className="absolute top-[30%] inset-x-0 h-px border-t border-dashed border-green-500" />
            <div className="absolute top-[60%] inset-x-0 h-px border-t border-dashed border-yellow-500" />
            <div className="absolute right-0 top-[29%] bg-green-100 text-green-800 text-[8px] px-1 rounded">
              Safe
            </div>
            <div className="absolute right-0 top-[59%] bg-yellow-100 text-yellow-800 text-[8px] px-1 rounded">
              Warning
            </div>
          </div>
        </div>
      )}

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
          
          <Tabs defaultValue="overview" value={selectedTab} onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="details">Detailed Analysis</TabsTrigger>
              <TabsTrigger value="actions">Recommended Actions</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-3">Overall Status</h3>
                  <Card>
                    <CardContent className="pt-6">
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
                  
                  <h3 className="text-lg font-semibold my-3">Key Metrics</h3>
                  <div className="grid grid-cols-2 gap-3">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Overall Toxicity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <span className={cn(
                            "text-5xl font-bold",
                            value > 70 ? "text-water-danger" : 
                            value > 40 ? "text-yellow-500" : 
                            "text-green-500"
                          )}>{value}%</span>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Parameters Exceeded</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-center">
                          <span className="text-5xl font-bold">
                            {toxicityIndicators.filter(i => i.value > i.limit).length}
                          </span>
                          <span className="text-gray-500 text-sm">/{toxicityIndicators.length}</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Summary of Findings</h3>
                  
                  {value > 70 ? (
                    <div className="space-y-3">
                      <p className="text-sm">
                        <span className="font-semibold">Critical water quality issues detected.</span> Multiple parameters exceed safety thresholds, indicating serious contamination that requires immediate intervention.
                      </p>
                      <div className="bg-water-danger/10 border border-water-danger/30 rounded-md p-3">
                        <h4 className="text-water-danger font-medium mb-1">Public Health Concern</h4>
                        <p className="text-sm">
                          The current water quality may pose risks to public health. Immediate remediation actions should be implemented, and affected users should be notified.
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-1">Potential Contamination Sources</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Industrial discharge upstream</li>
                          <li>Agricultural runoff from recent rainfall</li>
                          <li>Treatment system malfunction</li>
                          <li>Pipe infrastructure deterioration</li>
                        </ul>
                      </div>
                    </div>
                  ) : value > 40 ? (
                    <div className="space-y-3">
                      <p className="text-sm">
                        <span className="font-semibold">Water quality shows concerning trends.</span> Several parameters are approaching maximum limits, indicating potential developing issues that require attention.
                      </p>
                      <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-md p-3">
                        <h4 className="text-yellow-600 font-medium mb-1">Preventive Action Needed</h4>
                        <p className="text-sm">
                          While the water remains generally safe, preventive measures should be implemented to address developing issues before they become critical.
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-1">Areas of Concern</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Rising nitrate levels from recent agricultural activity</li>
                          <li>Increasing turbidity in source water</li>
                          <li>Seasonal variation affecting treatment efficiency</li>
                          <li>Higher demand straining filtration systems</li>
                        </ul>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-sm">
                        <span className="font-semibold">Water quality is excellent.</span> All parameters are within safe limits, indicating effective treatment and monitoring systems.
                      </p>
                      <div className="bg-green-500/10 border border-green-500/30 rounded-md p-3">
                        <h4 className="text-green-600 font-medium mb-1">Optimal Conditions</h4>
                        <p className="text-sm">
                          Current water quality meets or exceeds all regulatory standards. Continue regular monitoring to maintain these excellent conditions.
                        </p>
                      </div>
                      <div className="p-3 border rounded-md">
                        <h4 className="font-medium mb-1">Effective Practices</h4>
                        <ul className="text-sm list-disc pl-5 space-y-1">
                          <li>Regular maintenance of filtration systems</li>
                          <li>Optimized chemical treatment dosing</li>
                          <li>Proactive source water protection measures</li>
                          <li>Comprehensive monitoring program</li>
                        </ul>
                      </div>
                    </div>
                  )}
                  
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Treatment Effectiveness</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Filtration System</span>
                          <span className="text-sm font-medium">
                            {value > 70 ? "85% (Impaired)" : value > 40 ? "92% (Normal)" : "98% (Optimal)"}
                          </span>
                        </div>
                        <Progress value={value > 70 ? 85 : value > 40 ? 92 : 98} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Chemical Treatment</span>
                          <span className="text-sm font-medium">
                            {value > 70 ? "80% (Impaired)" : value > 40 ? "90% (Normal)" : "95% (Optimal)"}
                          </span>
                        </div>
                        <Progress value={value > 70 ? 80 : value > 40 ? 90 : 95} className="h-2" />
                        
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Biological Systems</span>
                          <span className="text-sm font-medium">
                            {value > 70 ? "75% (Impaired)" : value > 40 ? "88% (Normal)" : "96% (Optimal)"}
                          </span>
                        </div>
                        <Progress value={value > 70 ? 75 : value > 40 ? 88 : 96} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="details">
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-3">Water Quality Indicators</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                        
                        <CardFooter className="pt-3 pb-3">
                          <div className="w-full text-xs">
                            <div className="flex justify-between">
                              <span>Last reading: {new Date().toLocaleDateString()}</span>
                              <Badge variant="outline" className="text-[10px]">
                                {isExceeded ? "Action Required" : isNearLimit ? "Monitor Closely" : "Normal"}
                              </Badge>
                            </div>
                          </div>
                        </CardFooter>
                      </Card>
                    );
                  })}
                </div>
                
                <h3 className="text-lg font-semibold mb-3">Historical Trends</h3>
                <Card>
                  <CardContent className="pt-6">
                    <div className="h-60 w-full relative">
                      <div className="absolute inset-x-0 bottom-0 h-px bg-gray-200" />
                      <div className="absolute inset-y-0 left-0 w-px bg-gray-200" />
                      
                      <div className="absolute top-0 left-0 text-xs text-gray-500">100%</div>
                      <div className="absolute top-1/4 left-0 text-xs text-gray-500">75%</div>
                      <div className="absolute top-1/2 left-0 text-xs text-gray-500">50%</div>
                      <div className="absolute top-3/4 left-0 text-xs text-gray-500">25%</div>
                      <div className="absolute bottom-0 left-0 text-xs text-gray-500">0%</div>
                      
                      <div className="flex items-end justify-between h-full px-5">
                        {historicalReadings.map((reading, index) => (
                          <div key={index} className="flex flex-col items-center">
                            <TooltipProvider>
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <div 
                                    className={cn(
                                      "w-4 rounded-t transition-all",
                                      reading.value > 70 ? "bg-water-danger" : 
                                      reading.value > 40 ? "bg-yellow-500" : 
                                      "bg-green-500"
                                    )}
                                    style={{ height: `${reading.value}%` }}
                                  />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{new Date(reading.date).toLocaleDateString()}: {reading.value}%</p>
                                </TooltipContent>
                              </Tooltip>
                            </TooltipProvider>
                            <span className="text-[9px] text-gray-500 mt-1 rotate-45 origin-top-left">
                              {new Date(reading.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                            </span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Threshold lines */}
                      <div className="absolute top-[30%] inset-x-0 h-px border-t border-dashed border-green-500" />
                      <div className="absolute top-[60%] inset-x-0 h-px border-t border-dashed border-yellow-500" />
                      <div className="absolute right-0 top-[29%] bg-green-100 text-green-800 text-[9px] px-1 rounded">
                        Safe Threshold
                      </div>
                      <div className="absolute right-0 top-[59%] bg-yellow-100 text-yellow-800 text-[9px] px-1 rounded">
                        Warning Threshold
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Sample Analysis Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="grid grid-cols-2 gap-2">
                          <div>
                            <p className="font-medium">Sample ID:</p>
                            <p className="text-gray-500">WS-{Math.floor(Math.random() * 10000)}</p>
                          </div>
                          <div>
                            <p className="font-medium">Analysis Method:</p>
                            <p className="text-gray-500">EPA Standard Protocol</p>
                          </div>
                          <div>
                            <p className="font-medium">Laboratory:</p>
                            <p className="text-gray-500">Hydra Central Lab</p>
                          </div>
                          <div>
                            <p className="font-medium">Analyst:</p>
                            <p className="text-gray-500">John Doe</p>
                          </div>
                          <div>
                            <p className="font-medium">Sampling Point:</p>
                            <p className="text-gray-500">Treatment Facility Intake</p>
                          </div>
                          <div>
                            <p className="font-medium">Water Temperature:</p>
                            <p className="text-gray-500">18.5°C</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Environmental Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div>
                          <p className="font-medium">Recent Weather:</p>
                          <p className="text-gray-500">Heavy rainfall (2.3" in last 48 hours)</p>
                        </div>
                        <div>
                          <p className="font-medium">Seasonal Factors:</p>
                          <p className="text-gray-500">Fall agricultural activities, leaf decomposition</p>
                        </div>
                        <div>
                          <p className="font-medium">Upstream Activities:</p>
                          <p className="text-gray-500">{value > 40 ? "Construction site runoff, industrial discharge" : "No significant unusual activities"}</p>
                        </div>
                        <div>
                          <p className="font-medium">Known Issues:</p>
                          <p className="text-gray-500">{value > 70 ? "Aging infrastructure in North District" : "None reported"}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="actions">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Recommended Actions</h3>
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Action Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
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
                            <div>
                              <span className="text-sm font-medium">{action}</span>
                              <p className="text-xs text-gray-500 mt-0.5">
                                {value > 70 
                                  ? "Priority: High - Immediate action required" 
                                  : value > 40 
                                    ? "Priority: Medium - Action required within 24 hours" 
                                    : "Priority: Low - Action during regular operations"}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <div className="w-full flex justify-between">
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleGenerateReport} 
                          className="flex items-center gap-1"
                        >
                          <FileText className="h-4 w-4" />
                          Generate Report
                        </Button>
                        <Button 
                          size="sm" 
                          onClick={handleImplementPlan}
                          variant={value > 70 ? "destructive" : "default"}
                          className="flex items-center gap-1"
                        >
                          {value > 70 ? "Implement Emergency Plan" : "Implement Plan"}
                        </Button>
                      </div>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold mb-3">Response Protocol</h3>
                  <div className={cn(
                    "p-4 rounded-lg border",
                    value > 70 
                      ? "border-water-danger/30 bg-water-danger/5" 
                      : value > 40 
                        ? "border-yellow-500/30 bg-yellow-500/5" 
                        : "border-green-500/30 bg-green-500/5"
                  )}>
                    <h4 className={cn(
                      "text-base font-medium mb-2",
                      value > 70 
                        ? "text-water-danger" 
                        : value > 40 
                          ? "text-yellow-600" 
                          : "text-green-600"
                    )}>
                      {value > 70 
                        ? "Level 3: Emergency Response Protocol" 
                        : value > 40 
                          ? "Level 2: Elevated Response Protocol" 
                          : "Level 1: Standard Monitoring Protocol"}
                    </h4>
                    
                    <ul className="space-y-2">
                      {value > 70 ? (
                        <>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">1.</span>
                            <span>Activate Emergency Response Team immediately (24/7 availability)</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">2.</span>
                            <span>Implement isolation procedures for affected water sources</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">3.</span>
                            <span>Notify regulatory authorities within 2 hours</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">4.</span>
                            <span>Prepare public health advisory if contamination affects public supply</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">5.</span>
                            <span>Deploy emergency water treatment measures</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">6.</span>
                            <span>Conduct comprehensive sampling at 15-minute intervals</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">7.</span>
                            <span>Prepare alternate water supply contingencies</span>
                          </li>
                        </>
                      ) : value > 40 ? (
                        <>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">1.</span>
                            <span>Increase sampling frequency to hourly intervals</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">2.</span>
                            <span>Notify Water Quality Response Team within 4 hours</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">3.</span>
                            <span>Review and optimize treatment processes</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">4.</span>
                            <span>Implement enhanced monitoring of specific contaminants</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">5.</span>
                            <span>Prepare response plan if conditions deteriorate</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">6.</span>
                            <span>Document all observations and actions</span>
                          </li>
                        </>
                      ) : (
                        <>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">1.</span>
                            <span>Maintain regular sampling schedule (every 8 hours)</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">2.</span>
                            <span>Continue standard water treatment protocols</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">3.</span>
                            <span>Perform routine equipment maintenance as scheduled</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">4.</span>
                            <span>Document water quality parameters in daily logs</span>
                          </li>
                          <li className="text-sm flex items-start">
                            <span className="font-bold mr-2">5.</span>
                            <span>Review emergency response procedures quarterly</span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3">Responsible Parties</h3>
                  <Card>
                    <CardContent className="pt-6">
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white mr-3",
                            value > 70 ? "bg-water-danger" : value > 40 ? "bg-yellow-500" : "bg-blue-500"
                          )}>
                            1
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Primary Contact</h4>
                            <p className="text-sm text-gray-500">John Doe, Water Quality Manager</p>
                            <p className="text-xs text-gray-500">Available 24/7: (555) 123-4567</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-white mr-3",
                            value > 70 ? "bg-water-danger" : value > 40 ? "bg-yellow-500" : "bg-blue-500"
                          )}>
                            2
                          </div>
                          <div>
                            <h4 className="text-sm font-medium">Secondary Contact</h4>
                            <p className="text-sm text-gray-500">Jane Smith, Treatment Operations</p>
                            <p className="text-xs text-gray-500">Available 7AM-7PM: (555) 987-6543</p>
                          </div>
                        </div>
                        
                        {value > 40 && (
                          <div className="flex items-start">
                            <div className={cn(
                              "w-8 h-8 rounded-full flex items-center justify-center text-white mr-3",
                              value > 70 ? "bg-water-danger" : "bg-yellow-500"
                            )}>
                              3
                            </div>
                            <div>
                              <h4 className="text-sm font-medium">Emergency Coordinator</h4>
                              <p className="text-sm text-gray-500">Robert Johnson, Emergency Response</p>
                              <p className="text-xs text-gray-500">Available 24/7: (555) 456-7890</p>
                            </div>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setShowDetails(false)}>
              Close
            </Button>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleGenerateReport}>
                <FileText className="h-4 w-4 mr-2" />
                Generate Report
              </Button>
              <Button 
                onClick={handleImplementPlan}
                variant={value > 70 ? "destructive" : "default"}
              >
                Implement Plan
              </Button>
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
