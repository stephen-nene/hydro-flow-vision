
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Camera, Sparkles, Smartphone, PenTool, Map, Layers } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

const WaterSamples = () => {
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
                <BreadcrumbLink href="/water-samples">AR Field Assistant</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className={`text-2xl md:text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              AR Field Assistant
            </h1>
            <p className={`text-base md:text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Augmented reality tools for on-site water assessment
            </p>
          </header>

          <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'} mb-6`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Camera className="h-5 w-5 text-emerald-500" />
                HYDRA Lens Mobile Mode
              </CardTitle>
              <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                Point your device at water sources to analyze and assess in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center mb-6">
                <div className="text-center">
                  <Camera className="h-12 w-12 mx-auto mb-2 text-emerald-500" />
                  <p className="text-white">Camera AR View</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-1">
                      <Sparkles className="h-4 w-4 text-blue-500" />
                      Contaminant Prediction
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      AI identifies potential contaminants before lab tests
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-1">
                      <PenTool className="h-4 w-4 text-green-500" />
                      Installation Guides
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      3D arrows guide filter and pipe installation
                    </p>
                  </CardContent>
                </Card>
                
                <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-1">
                      <Layers className="h-4 w-4 text-purple-500" />
                      X-Ray Underground View
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      See underground pipes with GIS integration
                    </p>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <p className={`text-sm italic ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                "Cut site visits by 70%—diagnose water through a phone camera"
              </p>
              
              <Button className="gap-2">
                <Smartphone className="h-4 w-4" />
                Launch AR Mode
              </Button>
            </CardFooter>
          </Card>
          
          <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
            <CardHeader>
              <CardTitle>Water Sample Database</CardTitle>
              <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                View and analyze collected water samples across all monitoring stations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium flex items-center gap-1">
                      <Map className="h-4 w-4 text-blue-500" />
                      Sample Locations
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-40 bg-gray-800 rounded-md flex items-center justify-center">
                      <p className={`text-xs text-white`}>Interactive Map View</p>
                    </div>
                  </CardContent>
                </Card>
                
                <Card className={`${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">Recent Samples</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div key={i} className={`p-2 rounded ${isEmergencyMode ? 'bg-black' : 'bg-white'} border ${isEmergencyMode ? 'border-gray-800' : 'border-gray-200'}`}>
                          <div className="flex justify-between items-center">
                            <span className={`text-xs font-medium ${isEmergencyMode ? 'text-white' : 'text-gray-900'}`}>Sample #{i}0{Math.floor(Math.random() * 9) + 1}</span>
                            <span className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>{new Date().toLocaleDateString()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default WaterSamples;
