
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Upload, Brain, BarChart3, AlertTriangle, FileCheck } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { FileUploader } from "@/components/reports/FileUploader";
import { CrisisPrediction } from "@/components/reports/CrisisPrediction";
import { ComplianceReport } from "@/components/reports/ComplianceReport";

interface WaterAutopsyVisualizationProps {
  files: File[];
}

const WaterAutopsyVisualization = ({ files }: WaterAutopsyVisualizationProps) => {
  if (files.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          Upload water test results to generate 3D visualization
        </p>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      <div className="aspect-video rounded-md bg-gray-900 flex items-center justify-center relative overflow-hidden">
        {/* Simulated 3D Visualization */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-40 h-40 rounded-full bg-blue-500/20 animate-pulse flex items-center justify-center">
            <div className="w-32 h-32 rounded-full bg-blue-500/30 animate-pulse flex items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-blue-500/40 animate-pulse flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-blue-500/50 animate-pulse">
                  {/* Red particles */}
                  {Array.from({ length: 10 }).map((_, i) => (
                    <div 
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${Math.random() * 2}s`,
                        animationDuration: `${Math.random() * 3 + 2}s`
                      }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="relative z-10 text-white text-center">
          <h3 className="text-lg font-bold mb-1">3D Water Sample Visualization</h3>
          <p className="text-sm text-gray-300">
            Analyzing {files.length} file{files.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-red-500"></div>
              Contaminant Hotspots
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Lead particles detected at 0.24ppm concentration (4.8x legal limit)
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-green-500"></div>
              Treatment Simulation
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Ion Exchange Filter (HYD-F103) reduces lead to 0.01ppm
            </p>
          </CardContent>
        </Card>
        
        <Card className="bg-gray-50 border-gray-200">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-blue-500"></div>
              Time-Lapse Healing
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-gray-500">
              Water quality will improve 92% within 1 year with proper treatment
            </p>
          </CardContent>
        </Card>
      </div>
      
      <div className="flex justify-between">
        <Button variant="outline" onClick={() => window.location.reload()}>
          Reset Analysis
        </Button>
        
        <Button>
          Download Visualization
        </Button>
      </div>
    </div>
  );
};

const Reports = () => {
  const isMobile = useIsMobile();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFilesUploaded = (files: File[]) => {
    setUploadedFiles(files);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {!isMobile && <Sidebar />}
        <main className="flex-1 p-4 md:p-6">
          <Breadcrumb className="mb-4 md:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/reports">Reports</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              AI-Powered Reports
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              Generate advanced water quality analysis and predictive reports
            </p>
          </header>

          <Tabs defaultValue="autopsy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="autopsy" className="flex items-center gap-1">
                <Brain className="h-4 w-4" />
                <span>Water Autopsy</span>
              </TabsTrigger>
              <TabsTrigger value="prediction" className="flex items-center gap-1">
                <BarChart3 className="h-4 w-4" />
                <span>Crisis Prediction</span>
              </TabsTrigger>
              <TabsTrigger value="compliance" className="flex items-center gap-1">
                <FileCheck className="h-4 w-4" />
                <span>Compliance</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="autopsy">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    Interactive 3D Water "Autopsy"
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Upload lab results to generate a zoomable 3D water sample visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    {uploadedFiles.length === 0 ? (
                      <FileUploader onFilesUploaded={handleFilesUploaded} />
                    ) : (
                      <WaterAutopsyVisualization files={uploadedFiles} />
                    )}
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className="text-sm italic text-gray-500">
                    "Show clients the poison in their water—and exactly how we'll fix it"
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="prediction">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-amber-500" />
                    AI Forecasting Dashboard
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Predict water quality issues before they happen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <CrisisPrediction />
                </CardContent>
                <CardFooter className="justify-between">
                  <p className="text-sm italic text-gray-500">
                    "Turn your team from water fixers to fortune tellers"
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance">
              <Card className="bg-white">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-purple-500" />
                    HydroLex AI Legal Assistant
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    AI-powered water regulations compliance assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ComplianceReport />
                </CardContent>
                <CardFooter>
                  <p className="text-sm italic text-gray-500">
                    "Avoid million-dollar fines—let AI be your water lawyer"
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default Reports;
