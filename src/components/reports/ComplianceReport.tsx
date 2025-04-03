
import { useState } from "react";
import { AlertTriangle, FileCheck, CheckSquare, XSquare, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

interface ComplianceReportProps {
  isEmergencyMode: boolean;
}

export const ComplianceReport = ({ isEmergencyMode }: ComplianceReportProps) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [report, setReport] = useState<any>(null);
  const [waterSource, setWaterSource] = useState("municipal");
  const [country, setCountry] = useState("kenya");
  const [sampleValue, setSampleValue] = useState("0.3");
  const [contaminant, setContaminant] = useState("lead");
  const { toast } = useToast();

  const generateReport = () => {
    setIsGenerating(true);
    setProgress(0);
    
    toast({
      title: "Generating compliance report",
      description: "Analyzing regulations for " + country.charAt(0).toUpperCase() + country.slice(1),
    });
    
    // Simulate progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.random() * 15;
        if (newProgress >= 100) {
          clearInterval(interval);
          setIsGenerating(false);
          
          // Create mock report based on inputs
          const mockReport = {
            country: country,
            waterSource: waterSource,
            contaminant: contaminant,
            sampleValue: parseFloat(sampleValue),
            date: new Date().toISOString().split('T')[0],
            isCompliant: parseFloat(sampleValue) <= 0.05,
            regulationLimit: 0.05,
            regulationSource: "WHO/EPA International Standards",
            recommendations: parseFloat(sampleValue) > 0.05 ? [
              "Install Ion Exchange Filter (HYD-F103)",
              "Conduct monthly testing for the next quarter",
              "Notify relevant authorities within 30 days"
            ] : [
              "Continue with quarterly monitoring",
              "Document results in compliance registry"
            ],
            estimatedCost: parseFloat(sampleValue) > 0.05 ? 
              Math.round((parseFloat(sampleValue) / 0.05) * 2500) : 0
          };
          
          setReport(mockReport);
          
          toast({
            title: mockReport.isCompliant ? "Compliance verified" : "Non-compliant result detected",
            description: mockReport.isCompliant ? 
              "Sample meets regulatory standards" : 
              `${contaminant} level exceeds legal limit by ${((parseFloat(sampleValue) / 0.05) - 1).toFixed(1)}x`,
            variant: mockReport.isCompliant ? "default" : "destructive",
          });
          
          return 100;
        }
        return newProgress;
      });
    }, 200);
  };
  
  return (
    <div className="space-y-4">
      {!report ? (
        <div>
          <div className={`p-4 rounded-md ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'} mb-6`}>
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-purple-500" />
              <span>Compliance Check Parameters</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Country
                </label>
                <Select value={country} onValueChange={setCountry}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kenya">Kenya</SelectItem>
                    <SelectItem value="uganda">Uganda</SelectItem>
                    <SelectItem value="tanzania">Tanzania</SelectItem>
                    <SelectItem value="ethiopia">Ethiopia</SelectItem>
                    <SelectItem value="ghana">Ghana</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Water Source
                </label>
                <Select value={waterSource} onValueChange={setWaterSource}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select water source" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="municipal">Municipal Supply</SelectItem>
                    <SelectItem value="groundwater">Groundwater/Well</SelectItem>
                    <SelectItem value="surface">Surface Water</SelectItem>
                    <SelectItem value="rainwater">Rainwater Collection</SelectItem>
                    <SelectItem value="bottled">Bottled/Packaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Contaminant
                </label>
                <Select value={contaminant} onValueChange={setContaminant}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select contaminant" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lead">Lead (Pb)</SelectItem>
                    <SelectItem value="arsenic">Arsenic (As)</SelectItem>
                    <SelectItem value="mercury">Mercury (Hg)</SelectItem>
                    <SelectItem value="cadmium">Cadmium (Cd)</SelectItem>
                    <SelectItem value="copper">Copper (Cu)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className={`text-sm font-medium ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Sample Value (ppm)
                </label>
                <Input 
                  type="number" 
                  step="0.01" 
                  value={sampleValue} 
                  onChange={(e) => setSampleValue(e.target.value)}
                  placeholder="Enter ppm value"
                  className={isEmergencyMode ? 'bg-gray-800 border-gray-700' : ''}
                />
              </div>
            </div>
            
            {isGenerating ? (
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Analyzing regulations...
                  </span>
                  <span className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    {Math.min(100, Math.floor(progress))}%
                  </span>
                </div>
                <Progress value={progress} className="h-2" />
              </div>
            ) : (
              <Button 
                className="w-full" 
                onClick={generateReport}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Generate Compliance Report
              </Button>
            )}
          </div>
          
          <div className={`p-4 rounded-md ${isEmergencyMode ? 'bg-gray-900/50' : 'bg-gray-50/50'} opacity-60`}>
            <div className="flex flex-col items-center justify-center py-6">
              <FileCheck className="h-12 w-12 mb-3 text-gray-400" />
              <p className={`text-center ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                Fill in the parameters above and generate a report to see results here
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <Card className={`border-2 ${report.isCompliant ? 
            'border-green-500' : 'border-red-500'} p-6`}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="text-xl font-bold mb-1">Water Compliance Report</h2>
                <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Generated on {report.date} • Reference #HC-{Math.floor(Math.random() * 10000)}
                </p>
              </div>
              
              <div className={`flex items-center px-3 py-1.5 rounded-full ${
                report.isCompliant ? 
                  'bg-green-100 text-green-800' : 
                  'bg-red-100 text-red-800'
              }`}>
                {report.isCompliant ? (
                  <>
                    <CheckSquare className="h-4 w-4 mr-1.5" />
                    <span className="font-medium">Compliant</span>
                  </>
                ) : (
                  <>
                    <XSquare className="h-4 w-4 mr-1.5" />
                    <span className="font-medium">Non-Compliant</span>
                  </>
                )}
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-500 uppercase">Sample Details</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Country:</span>
                    <span className="font-medium">{report.country.charAt(0).toUpperCase() + report.country.slice(1)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Water Source:</span>
                    <span className="font-medium">{
                      report.waterSource === "municipal" ? "Municipal Supply" :
                      report.waterSource === "groundwater" ? "Groundwater/Well" :
                      report.waterSource === "surface" ? "Surface Water" :
                      report.waterSource === "rainwater" ? "Rainwater Collection" :
                      "Bottled/Packaged"
                    }</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Contaminant:</span>
                    <span className="font-medium">{
                      report.contaminant === "lead" ? "Lead (Pb)" :
                      report.contaminant === "arsenic" ? "Arsenic (As)" :
                      report.contaminant === "mercury" ? "Mercury (Hg)" :
                      report.contaminant === "cadmium" ? "Cadmium (Cd)" :
                      "Copper (Cu)"
                    }</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2 text-gray-500 uppercase">Compliance Analysis</h3>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Sample Value:</span>
                    <span className={`font-medium ${!report.isCompliant ? 'text-red-500 font-bold' : ''}`}>
                      {report.sampleValue} ppm
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Legal Limit:</span>
                    <span className="font-medium">{report.regulationLimit} ppm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>Regulation Source:</span>
                    <span className="font-medium">{report.regulationSource}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-3 text-gray-500 uppercase">Recommended Actions</h3>
              <ul className="space-y-2">
                {report.recommendations.map((rec: string, i: number) => (
                  <li key={i} className="flex items-start">
                    <CheckSquare className={`h-4 w-4 mt-0.5 mr-2 ${
                      report.isCompliant ? 'text-green-500' : 'text-amber-500'
                    }`} />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {!report.isCompliant && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-md">
                <h3 className="text-sm font-medium mb-2 text-red-800">Non-Compliance Impact</h3>
                <p className="text-sm text-red-700 mb-2">
                  Current {report.contaminant} levels are {((report.sampleValue / report.regulationLimit) - 1).toFixed(1)}x higher than legal limits, 
                  which may pose serious health risks and legal liabilities.
                </p>
                <div className="flex justify-between text-sm text-red-700">
                  <span>Estimated remediation cost:</span>
                  <span className="font-bold">${report.estimatedCost.toLocaleString()}</span>
                </div>
              </div>
            )}
            
            <div className="flex justify-between">
              <Button 
                variant="outline" 
                onClick={() => setReport(null)}
              >
                Generate New Report
              </Button>
              
              <Button>
                <ArrowDown className="h-4 w-4 mr-2" />
                Download PDF
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
};
