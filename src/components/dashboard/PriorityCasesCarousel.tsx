import { useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, AlertTriangle, DropletIcon, Clock, MapPin, TestTube, FileText, Ban, Activity } from "lucide-react";
import { WaterSample } from "@/types/water";
import { WaterSampleVisual } from "@/components/dashboard/WaterSampleVisual";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";

interface PriorityCasesCarouselProps {
  cases: WaterSample[];
  isEmergencyMode: boolean;
}

export function PriorityCasesCarousel({ cases, isEmergencyMode }: PriorityCasesCarouselProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedCase, setSelectedCase] = useState<WaterSample | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

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
  
  const handleViewDetails = (waterCase: WaterSample) => {
    setSelectedCase(waterCase);
    setDetailsOpen(true);
  };
  
  const handleApplyTreatment = () => {
    if (!selectedCase) return;
    
    setDetailsOpen(false);
    
    toast({
      title: "Treatment Applied",
      description: `Treatment plan has been applied to ${selectedCase.location} water sample.`,
    });
  };
  
  const handleIsolateSource = () => {
    if (!selectedCase) return;
    
    setDetailsOpen(false);
    
    toast({
      title: "Source Isolated",
      description: `Water source at ${selectedCase.location} has been isolated for treatment.`,
      variant: "destructive"
    });
  };
  
  const handleSendToLab = () => {
    if (!selectedCase) return;
    
    toast({
      description: `Additional testing requested for ${selectedCase.location} sample.`,
    });
  };
  
  const handleScheduleFollowUp = () => {
    if (!selectedCase) return;
    
    toast({
      description: `Follow-up inspection scheduled for ${selectedCase.location}.`,
    });
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

  const expandedCases = [...cases];
  if (expandedCases.length < 5) {
    const additionalCases = cases.map(c => ({
      ...c,
      id: Number(`${c.id}-1`),
      location: `${c.location} East`,
      toxicityLevel: Math.max(30, c.toxicityLevel - 20),
      collectionDate: new Date().toLocaleDateString()
    }));
    expandedCases.push(...additionalCases);
  }

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex overflow-x-auto space-x-4 pb-4 scrollbar-none snap-x snap-mandatory"
        style={{ scrollBehavior: 'smooth' }}
      >
        {expandedCases.map((waterCase) => (
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
                    {waterCase.contaminants.slice(0, 3).map((contaminant, index) => (
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
                    {waterCase.contaminants.length > 3 && (
                      <span 
                        className={cn(
                          "text-xs px-2 py-1 rounded-full",
                          isEmergencyMode 
                            ? "bg-gray-700 text-gray-300" 
                            : "bg-gray-100 text-gray-700"
                        )}
                      >
                        +{waterCase.contaminants.length - 3} more
                      </span>
                    )}
                  </div>
                  <Button 
                    className={cn(
                      "w-full",
                      waterCase.toxicityLevel > 85 
                        ? "bg-water-danger hover:bg-water-danger/90" 
                        : isEmergencyMode 
                          ? "bg-gray-700 hover:bg-gray-600" 
                          : ""
                    )}
                    onClick={() => handleViewDetails(waterCase)}
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
      
      {selectedCase && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <div className="flex items-center gap-2">
                <Badge 
                  variant={selectedCase.toxicityLevel > 85 ? "destructive" : selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}
                  className={selectedCase.toxicityLevel > 85 ? "animate-pulse" : ""}
                >
                  {selectedCase.toxicityLevel}% Toxicity
                </Badge>
                <DialogTitle>Water Sample #{selectedCase.id}</DialogTitle>
              </div>
              <DialogDescription>
                Detailed analysis and treatment options for {selectedCase.location}
              </DialogDescription>
            </DialogHeader>
            
            <Tabs defaultValue="overview" className="mt-4">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="analysis">Analysis</TabsTrigger>
                <TabsTrigger value="contaminants">Contaminants</TabsTrigger>
                <TabsTrigger value="treatment">Treatment</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="h-[250px] rounded-lg overflow-hidden mb-4">
                      <WaterSampleVisual sample={selectedCase} />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-500" />
                        <div>
                          <h4 className="text-sm font-medium">Location</h4>
                          <p className="text-sm text-gray-500">{selectedCase.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-500" />
                        <div>
                          <h4 className="text-sm font-medium">Collection Date</h4>
                          <p className="text-sm text-gray-500">{selectedCase.collectionDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <TestTube className="h-4 w-4 text-gray-500" />
                        <div>
                          <h4 className="text-sm font-medium">Sample Type</h4>
                          <p className="text-sm text-gray-500">Municipal Water</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <FileText className="h-4 w-4 text-gray-500" />
                        <div>
                          <h4 className="text-sm font-medium">Report Status</h4>
                          <p className="text-sm text-gray-500">Analysis Complete</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold">Sample Summary</h3>
                    
                    <div className={cn(
                      "p-4 rounded-lg border",
                      selectedCase.toxicityLevel > 85 
                        ? "border-water-danger/30 bg-water-danger/10 text-water-danger" 
                        : selectedCase.toxicityLevel > 70
                          ? "border-yellow-500/30 bg-yellow-500/10 text-yellow-700"
                          : "border-green-500/30 bg-green-500/10 text-green-700"
                    )}>
                      <p className="text-sm">
                        {selectedCase.toxicityLevel > 85 
                          ? "CRITICAL: Immediate action required. Multiple contaminants exceed safe levels." 
                          : selectedCase.toxicityLevel > 70
                            ? "WARNING: High toxicity detected. Corrective action recommended."
                            : "ELEVATED: Toxicity levels higher than baseline but within acceptable parameters."}
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Toxicity Level</span>
                          <span className={
                            selectedCase.toxicityLevel > 85 
                              ? "text-water-danger" 
                              : selectedCase.toxicityLevel > 70
                                ? "text-yellow-600"
                                : "text-green-600"
                          }>
                            {selectedCase.toxicityLevel}%
                          </span>
                        </div>
                        <Progress 
                          value={selectedCase.toxicityLevel} 
                          className="h-2"
                          indicatorClassName={
                            selectedCase.toxicityLevel > 85 
                              ? "bg-water-danger" 
                              : selectedCase.toxicityLevel > 70
                                ? "bg-yellow-500"
                                : "bg-green-500"
                          }
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>pH Level</span>
                          <span>{selectedCase.toxicityLevel > 70 ? '9.2' : '7.4'}</span>
                        </div>
                        <Progress 
                          value={selectedCase.toxicityLevel > 70 ? 92 : 74} 
                          className="h-2"
                          indicatorClassName={
                            selectedCase.toxicityLevel > 70 
                              ? "bg-yellow-500" 
                              : "bg-green-500"
                          }
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Turbidity</span>
                          <span>{selectedCase.toxicityLevel > 70 ? '5.8 NTU' : '1.2 NTU'}</span>
                        </div>
                        <Progress 
                          value={selectedCase.toxicityLevel > 70 ? 85 : 35} 
                          className="h-2"
                          indicatorClassName={
                            selectedCase.toxicityLevel > 70 
                              ? "bg-water-danger" 
                              : "bg-green-500"
                          }
                        />
                      </div>
                      
                      <div>
                        <div className="flex justify-between items-center text-sm mb-1">
                          <span>Total Dissolved Solids</span>
                          <span>{selectedCase.toxicityLevel > 70 ? '780 mg/L' : '320 mg/L'}</span>
                        </div>
                        <Progress 
                          value={selectedCase.toxicityLevel > 70 ? 78 : 32} 
                          className="h-2"
                          indicatorClassName={
                            selectedCase.toxicityLevel > 70 
                              ? "bg-yellow-500" 
                              : "bg-green-500"
                          }
                        />
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium mb-2">Primary Contaminants</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedCase.contaminants.map((contaminant, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className={
                              selectedCase.toxicityLevel > 85 && index < 2
                                ? "border-water-danger/30 bg-water-danger/10 text-water-danger"
                                : ""
                            }
                          >
                            {contaminant}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="analysis" className="mt-4">
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Chemical Properties</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center">
                            <span className="text-sm">pH Level</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '9.2' : '7.4'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Chlorine</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "destructive" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '4.8 mg/L' : '1.2 mg/L'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Hardness</span>
                            <Badge variant="secondary">
                              {selectedCase.toxicityLevel > 70 ? '180 mg/L' : '120 mg/L'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Nitrates</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "destructive" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '12 mg/L' : '4 mg/L'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Phosphates</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '1.8 mg/L' : '0.4 mg/L'}
                            </Badge>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Physical Properties</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <ul className="space-y-3">
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Turbidity</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "destructive" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '5.8 NTU' : '1.2 NTU'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Temperature</span>
                            <Badge variant="secondary">
                              {selectedCase.toxicityLevel > 70 ? '24.5°C' : '18.2°C'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Color</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '35 PCU' : '5 PCU'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Odor</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? 'Detectable' : 'None'}
                            </Badge>
                          </li>
                          <li className="flex justify-between items-center">
                            <span className="text-sm">Total Dissolved Solids</span>
                            <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                              {selectedCase.toxicityLevel > 70 ? '780 mg/L' : '320 mg/L'}
                            </Badge>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Biological Analysis</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Microbiological Parameters</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-sm">Total Coliforms</span>
                              <Badge variant={selectedCase.toxicityLevel > 70 ? "destructive" : "secondary"}>
                                {selectedCase.toxicityLevel > 70 ? 'Present' : 'Absent'}
                              </Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm">E. coli</span>
                              <Badge variant={selectedCase.toxicityLevel > 70 ? "destructive" : "secondary"}>
                                {selectedCase.toxicityLevel > 70 ? 'Present' : 'Absent'}
                              </Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm">Heterotrophic Plate Count</span>
                              <Badge variant={selectedCase.toxicityLevel > 70 ? "outline" : "secondary"}>
                                {selectedCase.toxicityLevel > 70 ? '580 CFU/mL' : '35 CFU/mL'}
                              </Badge>
                            </li>
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Pathogen Screening</h4>
                          <ul className="space-y-2">
                            <li className="flex justify-between items-center">
                              <span className="text-sm">Cryptosporidium</span>
                              <Badge variant="secondary">
                                Not Detected
                              </Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm">Giardia</span>
                              <Badge variant="secondary">
                                Not Detected
                              </Badge>
                            </li>
                            <li className="flex justify-between items-center">
                              <span className="text-sm">Legionella</span>
                              <Badge variant={selectedCase.toxicityLevel > 85 ? "destructive" : "secondary"}>
                                {selectedCase.toxicityLevel > 85 ? 'Detected' : 'Not Detected'}
                              </Badge>
                            </li>
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <div className={cn(
                    "p-4 rounded-lg border",
                    selectedCase.toxicityLevel > 85 
                      ? "border-water-danger/30 bg-water-danger/10" 
                      : selectedCase.toxicityLevel > 70
                        ? "border-yellow-500/30 bg-yellow-500/10"
                        : "border-green-500/30 bg-green-500/10"
                  )}>
                    <h4 className="font-medium mb-2">Analysis Summary</h4>
                    <p className="text-sm">
                      {selectedCase.toxicityLevel > 85 
                        ? "This water sample shows critical contamination levels with multiple parameters exceeding safety thresholds. Presence of E. coli indicates potential fecal contamination. High turbidity, nitrate, and chlorine levels suggest both agricultural runoff and treatment process issues. Immediate corrective action is required." 
                        : selectedCase.toxicityLevel > 70
                          ? "This water sample has elevated contamination levels with several parameters approaching or slightly exceeding safety thresholds. The high pH and turbidity levels indicate potential treatment process issues. Corrective measures are recommended to address these concerns."
                          : "This water sample shows slightly elevated contamination indicators but remains within acceptable parameters for all tested components. Routine monitoring should continue, with attention to minor variations in turbidity and dissolved solids."}
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="contaminants" className="mt-4">
                <div className="space-y-4">
                  {selectedCase.contaminants.map((contaminant, index) => {
                    const isHighRisk = selectedCase.toxicityLevel > 70 && index < 2;
                    const isMediumRisk = selectedCase.toxicityLevel > 40 && index >= 2 && index < 4;
                    
                    return (
                      <Card key={index} className={cn(
                        isHighRisk ? "border-water-danger/30" : 
                        isMediumRisk ? "border-yellow-500/30" : 
                        "border-gray-200"
                      )}>
                        <CardHeader className={cn(
                          "py-3",
                          isHighRisk ? "bg-water-danger/10" : 
                          isMediumRisk ? "bg-yellow-500/10" : 
                          ""
                        )}>
                          <div className="flex justify-between items-center">
                            <CardTitle className="text-base">{contaminant}</CardTitle>
                            <Badge variant={
                              isHighRisk ? "destructive" : 
                              isMediumRisk ? "outline" : 
                              "secondary"
                            }>
                              {isHighRisk ? 'High Risk' : isMediumRisk ? 'Medium Risk' : 'Low Risk'}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex justify-between items-center text-sm">
                              <span>Detected Level</span>
                              <div className="flex items-center gap-2">
                                <span className={isHighRisk ? "text-water-danger font-medium" : ""}>
                                  {isHighRisk 
                                    ? (index === 0 ? '0.018 mg/L' : '12 mg/L') 
                                    : isMediumRisk
                                      ? (index === 2 ? '2.4 mg/L' : '0.024 mg/L')
                                      : (index === 4 ? '0.003 mg/L' : '1.2 mg/L')}
                                </span>
                                <Badge variant="outline" className="h-5">
                                  {isHighRisk ? (index === 0 ? '120%' : '150%') : isMediumRisk ? '80%' : '30%'} of limit
                                </Badge>
                              </div>
                            </div>
                            
                            <Progress 
                              value={isHighRisk ? (index === 0 ? 120 : 150) : isMediumRisk ? 80 : 30} 
                              max={100}
                              className="h-2"
                              indicatorClassName={
                                isHighRisk ? "bg-water-danger" : 
                                isMediumRisk ? "bg-yellow-500" : 
                                "bg-green-500"
                              }
                            />
                            
                            <div className="grid grid-cols-2 gap-4 mt-3">
                              <div>
                                <h4 className="text-sm font-medium mb-1">Description</h4>
                                <p className="text-xs text-gray-500">
                                  {index === 0 
                                    ? "A heavy metal that can enter water through corrosion of plumbing materials." 
                                    : index === 1
                                      ? "Can enter water through agricultural runoff and sewage discharge."
                                      : index === 2
                                        ? "Used in water treatment for disinfection purposes."
                                        : index === 3
                                          ? "Industrial byproduct that can contaminate water sources."
                                          : "Naturally occurring mineral that affects water hardness."}
                                </p>
                              </div>
                              <div>
                                <h4 className="text-sm font-medium mb-1">Potential Health Effects</h4>
                                <p className="text-xs text-gray-500">
                                  {isHighRisk 
                                    ? (index === 0 
                                        ? "Can cause neurological damage, developmental issues in children, and kidney problems." 
                                        : "Can cause blue baby syndrome, oxygen deprivation, and respiratory issues.")
                                    : isMediumRisk
                                      ? (index === 2
                                          ? "High levels can irritate eyes, nose, and cause respiratory issues."
                                          : "Long-term exposure linked to liver damage and increased cancer risk.")
                                      : "Generally low health risk at current detected levels."}
                                </p>
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="text-sm font-medium mb-1">Treatment Recommendations</h4>
                              <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1">
                                {isHighRisk ? (
                                  <>
                                    <li>Immediate source isolation and alternative water supply</li>
                                    <li>Advanced filtration with specific ion exchange resins</li>
                                    <li>Reverse osmosis treatment to remove contaminants</li>
                                    <li>Post-treatment testing to verify contaminant removal</li>
                                  </>
                                ) : isMediumRisk ? (
                                  <>
                                    <li>Adjust treatment process parameters</li>
                                    <li>Implement enhanced filtration</li>
                                    <li>Increase monitoring frequency</li>
                                  </>
                                ) : (
                                  <>
                                    <li>Standard treatment protocols are sufficient</li>
                                    <li>Regular monitoring to ensure levels remain stable</li>
                                  </>
                                )}
                              </ul>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                  
                  <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                    <div className="flex items-start space-x-3">
                      <Activity className="h-5 w-5 text-water-dark mt-0.5" />
                      <div>
                        <h4 className="font-medium mb-1">Contamination Trend Analysis</h4>
                        <p className="text-sm text-gray-600 mb-2">
                          Based on historical data from this location, contamination levels have 
                          {selectedCase.toxicityLevel > 70 ? ' significantly increased over the past 30 days' : ' remained relatively stable with minor fluctuations'}.
                        </p>
                        <Button variant="outline" size="sm">
                          View Historical Trends
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="treatment" className="mt-4">
                <div className="space-y-6">
                  {selectedCase.toxicityLevel > 70 ? (
                    <div className="p-4 rounded-lg bg-water-danger/10 border border-water-danger/30">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-water-danger mt-0.5" />
                        <div>
                          <h4 className="font-medium text-water-danger mb-1">Critical Contamination Alert</h4>
                          <p className="text-sm mb-2">
                            This water source requires immediate isolation and comprehensive treatment due to high levels of contaminants that exceed safety thresholds.
                          </p>
                          <Button 
                            variant="destructive" 
                            size="sm" 
                            className="bg-water-danger"
                            onClick={handleIsolateSource}
                          >
                            <Ban className="h-4 w-4 mr-2" />
                            Isolate Water Source
                          </Button>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200">
                      <div className="flex items-start space-x-3">
                        <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                        <div>
                          <h4 className="font-medium text-yellow-700 mb-1">Treatment Recommendation</h4>
                          <p className="text-sm mb-2">
                            This water source shows elevated contaminant levels that should be addressed with appropriate treatment methods.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Filtration Methods</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 70 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">1</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Activated Carbon Filtration</h5>
                              <p className="text-xs text-gray-500">Removes organic compounds, chlorine, and improves taste and odor.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 70 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 70 ? 'Recommended' : 'Optional'}
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 70 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">2</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Reverse Osmosis</h5>
                              <p className="text-xs text-gray-500">Removes dissolved inorganic solids by forcing water through a semipermeable membrane.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 70 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 70 ? 'Highly Recommended' : 'Optional'}
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">3</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Sediment Filtration</h5>
                              <p className="text-xs text-gray-500">Removes suspended particles and improves water clarity.</p>
                              <Badge className="mt-1" variant="outline">
                                Standard
                              </Badge>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Chemical Treatment</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 85 ? "bg-gray-200 text-gray-700" : "bg-water-dark text-white"
                            )}>
                              <span className="text-xs">1</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Chlorination</h5>
                              <p className="text-xs text-gray-500">Disinfects water by killing bacteria and other microorganisms.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 85 ? "outline" : "default"}>
                                {selectedCase.toxicityLevel > 85 ? 'Not Recommended' : 'Recommended'}
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 70 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">2</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Ozonation</h5>
                              <p className="text-xs text-gray-500">Uses ozone to disinfect water and break down organic contaminants.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 70 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 70 ? 'Highly Recommended' : 'Optional'}
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 70 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">3</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Coagulation/Flocculation</h5>
                              <p className="text-xs text-gray-500">Uses chemicals to remove suspended particles by causing them to clump together.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 70 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 70 ? 'Recommended' : 'Optional'}
                              </Badge>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Biological Treatment</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <ul className="space-y-3">
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">1</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Slow Sand Filtration</h5>
                              <p className="text-xs text-gray-500">Uses biological processes to remove pathogens and organic material.</p>
                              <Badge className="mt-1" variant="outline">
                                Not Applicable
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 85 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">2</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Bioremediation</h5>
                              <p className="text-xs text-gray-500">Uses microorganisms to degrade contaminants in water.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 85 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 85 ? 'Secondary Treatment' : 'Not Applicable'}
                              </Badge>
                            </div>
                          </li>
                          <li className="flex items-start space-x-2">
                            <div className={cn(
                              "h-5 w-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                              selectedCase.toxicityLevel > 70 ? "bg-water-danger text-white" : "bg-gray-200 text-gray-700"
                            )}>
                              <span className="text-xs">3</span>
                            </div>
                            <div>
                              <h5 className="text-sm font-medium">Constructed Wetlands</h5>
                              <p className="text-xs text-gray-500">Natural filtration through plant roots and soil to remove contaminants.</p>
                              <Badge className="mt-1" variant={selectedCase.toxicityLevel > 70 ? "default" : "outline"}>
                                {selectedCase.toxicityLevel > 70 ? 'Long-term Solution' : 'Not Applicable'}
                              </Badge>
                            </div>
                          </li>
                        </ul>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Recommended Treatment Plan</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <p className="text-sm">
                          {selectedCase.toxicityLevel > 70 
                            ? "Based on the contaminant profile and concentration levels, the following multi-stage treatment approach is recommended:"
                            : "Based on the analysis results, the following standard treatment approach is recommended:"}
                        </p>
                        
                        <ol className="space-y-3 pl-5 list-decimal">
                          {selectedCase.toxicityLevel > 70 ? (
                            <>
                              <li className="text-sm">
                                <span className="font-medium">Primary Treatment:</span> Sediment filtration followed by activated carbon filtration to remove suspended particles and organic compounds.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Secondary Treatment:</span> Reverse osmosis or nanofiltration to remove dissolved contaminants including heavy metals and nitrates.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Disinfection:</span> UV radiation or ozonation to eliminate biological contaminants without adding more chemicals.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">pH Adjustment:</span> Addition of appropriate chemicals to normalize pH levels to 7.0-7.5 range.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Post-Treatment Testing:</span> Comprehensive testing to verify contaminant removal and water safety.
                              </li>
                            </>
                          ) : (
                            <>
                              <li className="text-sm">
                                <span className="font-medium">Filtration:</span> Standard sediment filtration to maintain water clarity.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Disinfection:</span> Controlled chlorination to maintain microbial safety.
                              </li>
                              <li className="text-sm">
                                <span className="font-medium">Regular Monitoring:</span> Continue scheduled testing to ensure water quality remains within acceptable parameters.
                              </li>
                            </>
                          )}
                        </ol>
                        
                        <div className="pt-2">
                          <h4 className="text-sm font-medium mb-2">Expected Outcomes</h4>
                          <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                            {selectedCase.toxicityLevel > 70 ? (
                              <>
                                <li>Reduction of contaminant levels below regulatory thresholds</li>
                                <li>Elimination of biological hazards</li>
                                <li>Restoration of water clarity and acceptable taste/odor</li>
                                <li>Safe for consumption following treatment verification</li>
                              </>
                            ) : (
                              <>
                                <li>Maintenance of current acceptable water quality</li>
                                <li>Prevention of potential contamination issues</li>
                                <li>Continued compliance with regulatory standards</li>
                              </>
                            )}
                          </ul>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
            
            <DialogFooter className="flex justify-between mt-4 space-x-2">
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" onClick={handleSendToLab}>
                  <TestTube className="h-4 w-4 mr-2" />
                  Request Additional Testing
                </Button>
                <Button variant="outline" size="sm" onClick={handleScheduleFollowUp}>
                  <Clock className="h-4 w-4 mr-2" />
                  Schedule Follow-up
                </Button>
              </div>
              
              <div className="flex space-x-2">
                {selectedCase.toxicityLevel > 70 && (
                  <Button variant="destructive" onClick={handleIsolateSource}>
                    <Ban className="h-4 w-4 mr-2" />
                    Isolate Source
                  </Button>
                )}
                <Button onClick={handleApplyTreatment}>
                  Apply Treatment Plan
                </Button>
              </div>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
