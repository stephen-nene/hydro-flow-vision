
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileCheck, AlertTriangle, Scale, Plus, Clock, CheckSquare, FileText, CalendarClock, FilterX, BookOpen } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ComplianceToolsProps {
  isEmergencyMode: boolean;
}

export function ComplianceTools({ isEmergencyMode }: ComplianceToolsProps) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<'reports' | 'assessments' | 'cross-checks'>('reports');
  const [generatingReport, setGeneratingReport] = useState(false);
  const [reportProgress, setReportProgress] = useState(0);
  
  // Mock report data
  const reports = [
    { 
      id: "r1", 
      title: "Monthly EPA Compliance Report", 
      date: "2025-03-01", 
      status: "completed", 
      parameters: 32,
      compliantParameters: 32,
      regulations: ["EPA Safe Drinking Water Act", "Clean Water Act"]
    },
    { 
      id: "r2", 
      title: "Quarterly State DEP Report", 
      date: "2025-01-15", 
      status: "completed", 
      parameters: 46,
      compliantParameters: 44,
      regulations: ["State DEP Water Quality Standards", "Local Water District Regulations"]
    },
    { 
      id: "r3", 
      title: "Annual Compliance Summary", 
      date: "2024-12-31", 
      status: "completed", 
      parameters: 124,
      compliantParameters: 120,
      regulations: ["EPA Safe Drinking Water Act", "Clean Water Act", "State DEP Water Quality Standards"]
    }
  ];
  
  // Mock risk assessment data
  const riskAssessments = [
    {
      id: "ra1",
      title: "Lead Contamination Risk",
      level: "high",
      date: "2025-03-28",
      description: "High risk due to aging infrastructure in downtown area",
      impactAreas: ["Public Health", "Regulatory Compliance", "Public Relations"],
      recommendations: [
        "Implement ion exchange filtration at treatment plants",
        "Increase sampling frequency in high-risk areas",
        "Develop public communication strategy"
      ]
    },
    {
      id: "ra2",
      title: "Microbiological Contamination",
      level: "medium",
      date: "2025-03-15",
      description: "Medium risk due to recent heavy rainfall events",
      impactAreas: ["Public Health", "Operational Efficiency"],
      recommendations: [
        "Increase chlorination levels during high-flow events",
        "Monitor turbidity continuously at intake points",
        "Review and update disinfection protocols"
      ]
    },
    {
      id: "ra3",
      title: "PFAS Compounds",
      level: "low",
      date: "2025-02-28",
      description: "Low current risk but increasing regulatory scrutiny",
      impactAreas: ["Regulatory Compliance", "Long-term Planning"],
      recommendations: [
        "Implement quarterly PFAS monitoring program",
        "Evaluate advanced treatment options for future implementation",
        "Monitor regulatory developments closely"
      ]
    }
  ];
  
  // Mock regulatory cross-check data
  const regulatoryCrossChecks = [
    {
      id: "cc1",
      title: "Multi-Jurisdiction Analysis",
      date: "2025-03-30",
      frameworks: 27,
      compliantFrameworks: 23,
      nonCompliantFrameworks: [
        { name: "EU Drinking Water Directive", parameters: ["Lead (0.015 mg/L vs 0.01 mg/L)", "Chromium (0.1 mg/L vs 0.05 mg/L)"] },
        { name: "Australia ADWG", parameters: ["Total Dissolved Solids (625 mg/L vs 600 mg/L)"] },
        { name: "Japan Water Quality Standards", parameters: ["Nitrate (11.2 mg/L vs 10 mg/L)"] },
        { name: "California Proposition 65", parameters: ["PFOA/PFOS (14 ppt vs 10 ppt)"] }
      ]
    }
  ];
  
  const handleGenerateReport = () => {
    setGeneratingReport(true);
    setReportProgress(0);
    
    toast({
      title: "Generating compliance report",
      description: "Analyzing water quality data against regulatory standards"
    });
    
    // Simulate progress
    const interval = setInterval(() => {
      setReportProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setGeneratingReport(false);
          
          toast({
            title: "Report generated",
            description: "Your compliance report is ready to view"
          });
          
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };
  
  const handleRiskAssessment = () => {
    toast({
      title: "Running risk assessment",
      description: "Analyzing water quality patterns and potential threats"
    });
    
    setTimeout(() => {
      toast({
        title: "Risk assessment complete",
        description: "Three risk factors identified for review",
        variant: "default"
      });
    }, 2500);
  };
  
  const handleRegulatoryCheck = () => {
    toast({
      title: "Running regulatory cross-check",
      description: "Comparing samples against global regulatory frameworks"
    });
    
    setTimeout(() => {
      toast({
        title: "Cross-check complete",
        description: "Sample complies with 23/27 regulatory frameworks"
      });
    }, 2000);
  };
  
  const getRiskBadge = (level: string) => {
    switch (level) {
      case 'high':
        return <Badge variant="destructive">High Risk</Badge>;
      case 'medium':
        return <Badge variant="default" className="bg-amber-500">Medium Risk</Badge>;
      case 'low':
        return <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">Low Risk</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  return (
    <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'} h-full`}>
      <CardHeader className="pb-2">
        <CardTitle className="text-xl flex items-center gap-2">
          <Scale className="h-5 w-5 text-blue-500" />
          Compliance Tools
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2 pb-0">
        <div className="flex mb-4 border-b">
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'reports' 
                ? `border-b-2 ${isEmergencyMode ? 'text-water-danger border-water-danger' : 'text-blue-600 border-blue-600'}` 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('reports')}
          >
            <FileCheck className="h-4 w-4 mx-auto mb-1" />
            Compliance Reports
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'assessments' 
                ? `border-b-2 ${isEmergencyMode ? 'text-water-danger border-water-danger' : 'text-blue-600 border-blue-600'}`
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('assessments')}
          >
            <AlertTriangle className="h-4 w-4 mx-auto mb-1" />
            Risk Assessment
          </button>
          <button
            className={`flex-1 px-4 py-2 text-sm font-medium text-center focus:outline-none ${
              activeTab === 'cross-checks' 
                ? `border-b-2 ${isEmergencyMode ? 'text-water-danger border-water-danger' : 'text-blue-600 border-blue-600'}`
                : 'text-gray-500 dark:text-gray-400'
            }`}
            onClick={() => setActiveTab('cross-checks')}
          >
            <Scale className="h-4 w-4 mx-auto mb-1" />
            Regulatory Cross-Check
          </button>
        </div>
        
        <ScrollArea className="pr-4 h-[420px]">
          {activeTab === 'reports' && (
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center justify-start gap-2"
                onClick={handleGenerateReport}
                disabled={generatingReport}
              >
                <Plus className="h-4 w-4" />
                Generate New Compliance Report
              </Button>
              
              {generatingReport && (
                <div className="space-y-2 p-4 border rounded-md">
                  <div className="flex justify-between mb-1">
                    <span className="text-sm">Generating report...</span>
                    <span className="text-sm">{reportProgress}%</span>
                  </div>
                  <Progress value={reportProgress} />
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    Analyzing water quality against EPA Safe Drinking Water Act standards
                  </div>
                </div>
              )}
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-gray-500" />
                  Recent Reports
                </h3>
                
                {reports.map(report => (
                  <div 
                    key={report.id}
                    className="border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Opening Report",
                        description: `Viewing ${report.title}`
                      });
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-medium">{report.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Generated: {report.date}</p>
                      </div>
                      <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                        {report.status}
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-xs">Parameters:</div>
                      <Badge variant={report.compliantParameters === report.parameters ? 'outline' : 'secondary'} className={report.compliantParameters === report.parameters ? "bg-green-100 text-green-800 border-green-300" : ""}>
                        {report.compliantParameters}/{report.parameters} compliant
                      </Badge>
                    </div>
                    
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      Frameworks: {report.regulations.join(", ")}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => {
                  toast({
                    title: "Report Archive",
                    description: "Opening full report archive..."
                  });
                }}
              >
                <FileText className="h-4 w-4" />
                View All Reports
              </Button>
            </div>
          )}
          
          {activeTab === 'assessments' && (
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center justify-start gap-2"
                onClick={handleRiskAssessment}
              >
                <AlertTriangle className="h-4 w-4" />
                Run New Risk Assessment
              </Button>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <CheckSquare className="h-4 w-4 text-gray-500" />
                  Current Risk Assessment
                </h3>
                
                {riskAssessments.map(assessment => (
                  <div 
                    key={assessment.id}
                    className="border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Risk Details",
                        description: `Viewing ${assessment.title} risk assessment`
                      });
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="text-sm font-medium">{assessment.title}</h4>
                      {getRiskBadge(assessment.level)}
                    </div>
                    
                    <p className="text-xs mb-2">{assessment.description}</p>
                    
                    <div className="space-y-1 mb-2">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Impact Areas:</div>
                      <div className="flex flex-wrap gap-1">
                        {assessment.impactAreas.map((area, index) => (
                          <Badge key={index} variant="outline" className="text-xs">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <div className="text-xs text-gray-500 dark:text-gray-400">Top Recommendation:</div>
                      <div className="text-xs">{assessment.recommendations[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => {
                  toast({
                    title: "Risk Management",
                    description: "Opening risk management dashboard..."
                  });
                }}
              >
                <CalendarClock className="h-4 w-4" />
                View Historical Risk Data
              </Button>
            </div>
          )}
          
          {activeTab === 'cross-checks' && (
            <div className="space-y-4">
              <Button 
                className="w-full flex items-center justify-start gap-2"
                onClick={handleRegulatoryCheck}
              >
                <Scale className="h-4 w-4" />
                Run Regulatory Cross-Check
              </Button>
              
              <div className="space-y-3">
                <h3 className="text-sm font-medium flex items-center gap-2">
                  <FilterX className="h-4 w-4 text-gray-500" />
                  Non-Compliant Frameworks
                </h3>
                
                {regulatoryCrossChecks.map(check => (
                  <div 
                    key={check.id}
                    className="border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => {
                      toast({
                        title: "Cross-Check Details",
                        description: `Viewing ${check.title} details`
                      });
                    }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="text-sm font-medium">{check.title}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">Analysis Date: {check.date}</p>
                      </div>
                      <Badge variant="outline" className={check.compliantFrameworks === check.frameworks ? "bg-green-100 text-green-800 border-green-300" : "bg-amber-100 text-amber-800 border-amber-300"}>
                        {check.compliantFrameworks}/{check.frameworks} compliant
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <p className="text-xs font-medium">Non-compliant frameworks:</p>
                      {check.nonCompliantFrameworks.map((framework, index) => (
                        <div key={index} className="border-l-2 border-amber-500 pl-2 py-1">
                          <p className="text-xs font-medium">{framework.name}</p>
                          <ul className="text-xs list-disc list-inside">
                            {framework.parameters.map((param, i) => (
                              <li key={i} className="text-xs text-gray-500 dark:text-gray-400">{param}</li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-start gap-2"
                onClick={() => {
                  toast({
                    title: "Regulatory Database",
                    description: "Opening regulatory database browser..."
                  });
                }}
              >
                <BookOpen className="h-4 w-4" />
                Browse Regulatory Framework Database
              </Button>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
