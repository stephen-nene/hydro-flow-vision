
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Database, BarChart, TrendingUp, Users, School, Building, AreaChart } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";
import { TreatmentSimulator as TreatmentSimulatorComponent } from "@/components/simulator/TreatmentSimulator";

const TreatmentSimulator = () => {
  const isMobile = useIsMobile();
  const [activeTab, setActiveTab] = useState<"filtration" | "chemical" | "biological">("filtration");

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
                <BreadcrumbLink href="/treatment-simulator">Treatment Simulator</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-water-dark">
              Treatment Simulator
            </h1>
            <p className="text-base md:text-lg text-gray-600">
              AI-driven simulation and HydraScore analytics for treatment effectiveness
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Database className="h-5 w-5 text-indigo-500" />
                  HydraScore Analytics
                </CardTitle>
                <CardDescription className="text-gray-600">
                  AI-generated water quality scores to prioritize clients
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <School className="h-4 w-4 text-amber-500" />
                        <span className="font-medium">Central Public School</span>
                      </div>
                      <div className="text-xl font-bold text-red-500">30</div>
                    </div>
                    <Progress value={30} className="h-2 bg-gray-200" />
                    <div className="mt-2 text-xs text-right text-red-500">Critical: Lead levels exceed safety standards</div>
                  </div>
                  
                  <div className="p-3 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-blue-500" />
                        <span className="font-medium">Westside Hospital</span>
                      </div>
                      <div className="text-xl font-bold text-emerald-500">68</div>
                    </div>
                    <Progress value={68} className="h-2 bg-gray-200" />
                    <div className="mt-2 text-xs text-right text-amber-500">Moderate: Consider filtration upgrade</div>
                  </div>
                  
                  <div className="p-3 rounded bg-gray-50">
                    <div className="flex justify-between items-center mb-2">
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-purple-500" />
                        <span className="font-medium">Riverfront Community</span>
                      </div>
                      <div className="text-xl font-bold text-emerald-500">85</div>
                    </div>
                    <Progress value={85} className="h-2 bg-gray-200" />
                    <div className="mt-2 text-xs text-right text-emerald-500">Good: Regular maintenance required</div>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <p className="text-sm italic text-gray-500">
                  "Your sales team will chase the right clients like bloodhounds"
                </p>
                
                <Button>View All Clients</Button>
              </CardFooter>
            </Card>
            
            <Card className="bg-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AreaChart className="h-5 w-5 text-emerald-500" />
                  Treatment Effectiveness
                </CardTitle>
                <CardDescription className="text-gray-600">
                  Simulate different water treatment methods and analyze results
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="filtration" value={activeTab} onValueChange={(value) => setActiveTab(value as "filtration" | "chemical" | "biological")}>
                  <TabsList className="w-full grid grid-cols-3">
                    <TabsTrigger value="filtration">Filtration</TabsTrigger>
                    <TabsTrigger value="chemical">Chemical</TabsTrigger>
                    <TabsTrigger value="biological">Biological</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="filtration" className="mt-4">
                    <TreatmentSimulatorComponent treatmentType="filtration" />
                  </TabsContent>
                  
                  <TabsContent value="chemical" className="mt-4">
                    <TreatmentSimulatorComponent treatmentType="chemical" />
                  </TabsContent>
                  
                  <TabsContent value="biological" className="mt-4">
                    <TreatmentSimulatorComponent treatmentType="biological" />
                  </TabsContent>
                </Tabs>
              </CardContent>
              <CardFooter>
                <Button className="w-full" onClick={() => setActiveTab(activeTab)}>
                  Run New Simulation
                </Button>
              </CardFooter>
            </Card>
          </div>
          
          <Card className="bg-white">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                Long-Term Impact Analysis
              </CardTitle>
              <CardDescription className="text-gray-600">
                See water quality improvement over 1, 5, and 10 years
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="aspect-video bg-gray-900 rounded-md flex items-center justify-center">
                <p className="text-white">Time-Lapse Healing Visualization</p>
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default TreatmentSimulator;
