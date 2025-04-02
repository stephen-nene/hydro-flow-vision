
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Upload, Clock, FileBarChart, Brain, BarChart3, AlertTriangle } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Reports = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();

  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'emergency-mode' : ''}`}>
      <Navbar isEmergencyMode={isEmergencyMode} setIsEmergencyMode={setIsEmergencyMode} />
      <div className="flex">
        {!isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
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
            <h1 className={`text-2xl md:text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              AI-Powered Reports
            </h1>
            <p className={`text-base md:text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Generate advanced water quality analysis and predictive reports
            </p>
          </header>

          <Tabs defaultValue="autopsy" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="autopsy">Water Autopsy</TabsTrigger>
              <TabsTrigger value="prediction">Crisis Prediction</TabsTrigger>
              <TabsTrigger value="compliance">Compliance</TabsTrigger>
            </TabsList>
            
            <TabsContent value="autopsy">
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Brain className="h-5 w-5 text-blue-500" />
                    Interactive 3D Water "Autopsy"
                  </CardTitle>
                  <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                    Upload lab results to generate a zoomable 3D water sample visualization
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className={`border-2 border-dashed rounded-lg p-8 text-center ${isEmergencyMode ? 'border-gray-700 bg-black/30' : 'border-gray-200 bg-gray-50'}`}>
                      <Upload className="h-10 w-10 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">Upload Lab Results</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        Drag and drop your water test results or click to browse
                      </p>
                      <Button className="mt-4">Select Files</Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-red-500"></div>
                            Contaminant Hotspots
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Visualize contaminants with color-coded particles
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-green-500"></div>
                            Treatment Simulation
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            Slide to see filters clean the water sample
                          </p>
                        </CardContent>
                      </Card>
                      
                      <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-sm font-medium flex items-center gap-1">
                            <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                            Time-Lapse Healing
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                            See water quality improvement over 1/5/10 years
                          </p>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className={`text-sm italic ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    "Show clients the poison in their water—and exactly how we'll fix it"
                  </p>
                  <Button disabled>Generate Report</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="prediction">
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-amber-500" />
                    AI Forecasting Dashboard
                  </CardTitle>
                  <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                    Predict water quality issues before they happen
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="aspect-video rounded-md bg-gray-900 flex items-center justify-center mb-4">
                    <p className="text-white text-center">AI Forecasting Dashboard Map</p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Historical Data Analysis</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          Combines lab data, weather patterns, and infrastructure maps
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Alerting System</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                          SMS/Email alerts to sales teams for proactive outreach
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                </CardContent>
                <CardFooter className="justify-between">
                  <p className={`text-sm italic ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    "Turn your team from water fixers to fortune tellers"
                  </p>
                  <Button>View Predictions</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="compliance">
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-purple-500" />
                    HydroLex AI Legal Assistant
                  </CardTitle>
                  <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                    AI-powered water regulations compliance assistant
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={`p-4 rounded-md mb-4 ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
                    <h3 className="text-lg font-medium mb-2">Ask in plain English:</h3>
                    <div className={`p-3 rounded-md mb-3 ${isEmergencyMode ? 'bg-black/60 border border-gray-800' : 'bg-white border border-gray-200'}`}>
                      "Is this lead level illegal in Kenya?"
                    </div>
                    <h3 className="text-lg font-medium mb-2">AI Responds:</h3>
                    <div className={`p-3 rounded-md ${isEmergencyMode ? 'bg-black/60 border border-gray-800' : 'bg-white border border-gray-200'}`}>
                      "0.3ppm exceeds EPA limits. Recommend: Ion Exchange Filter (D&S SKU #FX-203)."
                    </div>
                  </div>
                  <Button className="w-full">Generate Compliance Report</Button>
                </CardContent>
                <CardFooter>
                  <p className={`text-sm italic ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    "Avoid million-dollar fines—let AI be your water lawyer"
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default Reports;
