
import { useState } from "react";
import { WaterDashboard } from "@/components/dashboard/WaterDashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Brain, BarChart, Camera, Database, Book, AlertTriangle, Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const featuresList = [
  {
    title: "AI Water Autopsy",
    description: "Interactive 3D visualization of water sample analysis",
    icon: Brain,
    color: "bg-blue-500",
    link: "/reports"
  },
  {
    title: "Crisis Prediction",
    description: "AI-powered forecasting of potential water quality issues",
    icon: BarChart,
    color: "bg-amber-500",
    link: "/reports"
  },
  {
    title: "AR Field Assistant",
    description: "Augmented reality tool for on-site water assessment",
    icon: Camera,
    color: "bg-emerald-500",
    link: "/water-samples"
  },
  {
    title: "HydraScore Analytics",
    description: "Prioritize clients with AI-generated water quality scores",
    icon: Database,
    color: "bg-indigo-500",
    link: "/treatment-simulator"
  },
  {
    title: "Regulatory Assistant",
    description: "AI legal assistant for water compliance regulations",
    icon: Book,
    color: "bg-purple-500",
    link: "/ai-chatbot"
  },
  {
    title: "Emergency Response",
    description: "Rapid reaction system for critical water contamination",
    icon: AlertTriangle,
    color: "bg-red-500",
    link: "/reports"
  }
];

const Index = () => {
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
            </BreadcrumbList>
          </Breadcrumb>
          
          <WaterDashboard isEmergencyMode={isEmergencyMode} />
          
          <section className="mt-8">
            <h2 className={`text-2xl font-bold mb-4 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              AI-Powered Solutions
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {featuresList.map((feature, index) => (
                <Card key={index} className={`overflow-hidden border ${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white border-water-light/80'}`}>
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className={`${feature.color} text-white p-2 rounded-md`}>
                      <feature.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <CardFooter>
                    <Button asChild variant="outline" className={isEmergencyMode ? 'border-water-danger/30 hover:bg-water-danger/10' : ''}>
                      <Link to={feature.link}>Explore</Link>
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default Index;
