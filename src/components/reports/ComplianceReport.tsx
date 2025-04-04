
import { useState } from "react";
import { AlertTriangle, FileCheck, CheckSquare, XSquare, ArrowDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useToast } from "@/components/ui/use-toast";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

export const ComplianceReport = () => {
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
          <div className="p-4 rounded-md bg-gray-50 mb-6">
            <h3 className="text-lg font-medium mb-4 flex items-center">
              <AlertTriangle className="h-5 w-5 mr-2 text-purple-500" />
              <span>Compliance Check Parameters</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
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
                <label className="text-sm font-medium text-gray-700">
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
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
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
                    <SelectItem value="nitrates">Nitrates</SelectItem>
                    <SelectItem value="bacteria">E. coli Bacteria</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-700">
                  Sample Value (mg/L)
                </label>
                <Input 
                  type="number" 
                  value={sampleValue} 
                  onChange={(e) => setSampleValue(e.target.value)}
                  step="0.01"
                  min="0"
                  placeholder="Enter contaminant level"
                />
              </div>
            </div>
            
            <Button onClick={generateReport} disabled={isGenerating} className="w-full">
              {isGenerating ? (
                <>
                  <span>Analyzing Regulations...</span>
                  <span className="ml-2">{Math.min(100, Math.floor(progress))}%</span>
                </>
              ) : (
                "Generate Compliance Report"
              )}
            </Button>
            
            {isGenerating && (
              <Progress value={progress} className="mt-4 h-2" />
            )}
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold flex items-center">
              <FileCheck className="h-5 w-5 mr-2 text-purple-500" />
              Compliance Report
            </h3>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setReport(null)}
            >
              New Report
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gray-50">
              <h4 className="font-medium mb-3">Sample Information</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Country:</span>
                  <span className="font-medium">{report.country.charAt(0).toUpperCase() + report.country.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Water Source:</span>
                  <span className="font-medium">
                    {report.waterSource.charAt(0).toUpperCase() + report.waterSource.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Contaminant:</span>
                  <span className="font-medium">{report.contaminant.charAt(0).toUpperCase() + report.contaminant.slice(1)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Sample Value:</span>
                  <span className="font-medium">{report.sampleValue} mg/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Analysis Date:</span>
                  <span className="font-medium">{report.date}</span>
                </div>
              </div>
            </Card>
            
            <Card className={`p-4 ${report.isCompliant ? 'bg-green-50' : 'bg-red-50'}`}>
              <h4 className="font-medium mb-3">Compliance Status</h4>
              <div className="flex items-center mb-4">
                {report.isCompliant ? (
                  <CheckSquare className="h-12 w-12 text-green-500 mr-3" />
                ) : (
                  <XSquare className="h-12 w-12 text-red-500 mr-3" />
                )}
                <div>
                  <div className={`text-lg font-bold ${report.isCompliant ? 'text-green-700' : 'text-red-700'}`}>
                    {report.isCompliant ? 'COMPLIANT' : 'NON-COMPLIANT'}
                  </div>
                  <div className="text-sm">
                    {report.isCompliant 
                      ? 'This sample meets all regulatory requirements' 
                      : `Exceeds ${report.contaminant} limit by ${((report.sampleValue / report.regulationLimit) - 1).toFixed(1)}x`
                    }
                  </div>
                </div>
              </div>
              <div className="text-sm">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Legal Limit:</span>
                  <span className="font-medium">{report.regulationLimit} mg/L</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Regulatory Source:</span>
                  <span className="font-medium">{report.regulationSource}</span>
                </div>
              </div>
            </Card>
          </div>
          
          <Card className="p-4">
            <h4 className="font-medium mb-3">Recommendations</h4>
            <div className="space-y-2 mb-4">
              {report.recommendations.map((rec: string, index: number) => (
                <div key={index} className="flex items-start">
                  <div className="mt-0.5 mr-2 text-purple-500">
                    <ArrowDown className="h-4 w-4" />
                  </div>
                  <span>{rec}</span>
                </div>
              ))}
            </div>
            
            {!report.isCompliant && (
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between text-sm mb-1">
                  <span>Estimated Remediation Cost:</span>
                  <span className="font-bold">${report.estimatedCost.toLocaleString()}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Based on standard treatment costs for {report.waterSource} water sources 
                  with similar contamination levels in {report.country}.
                </p>
              </div>
            )}
          </Card>
          
          <div className="flex justify-between">
            <Button variant="outline">
              Download Report (PDF)
            </Button>
            <Button>
              Email Report
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
