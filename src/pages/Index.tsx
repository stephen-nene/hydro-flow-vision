
import { useState, useEffect } from "react";
import { WaterDashboard } from "@/components/dashboard/WaterDashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Brain, BarChart, Camera, Database, Book, AlertTriangle, Home, Loader2 } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const featuresList = [
  {
    title: "AI Water Autopsy",
    description: "Interactive 3D visualization of water sample analysis",
    icon: Brain,
    color: "bg-blue-600",
    link: "/reports"
  },
  {
    title: "Crisis Prediction",
    description: "AI-powered forecasting of potential water quality issues",
    icon: BarChart,
    color: "bg-amber-600",
    link: "/reports"
  },
  {
    title: "AR Field Assistant",
    description: "Augmented reality tool for on-site water assessment",
    icon: Camera,
    color: "bg-emerald-600",
    link: "/water-samples"
  },
  {
    title: "HydraScore Analytics",
    description: "Prioritize clients with AI-generated water quality scores",
    icon: Database,
    color: "bg-indigo-600",
    link: "/treatment-simulator"
  },
  {
    title: "Regulatory Assistant",
    description: "AI legal assistant for water compliance regulations",
    icon: Book,
    color: "bg-purple-600",
    link: "/ai-chatbot"
  },
  {
    title: "Emergency Response",
    description: "Rapid reaction system for critical water contamination",
    icon: AlertTriangle,
    color: "bg-red-600",
    link: "/reports"
  }
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const isMobile = useIsMobile();
  const { toast } = useToast();

  useEffect(() => {
    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Welcome to Hydra",
        description: "Water quality management platform loaded successfully."
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [toast]);

  const handleFeatureClick = (title: string) => {
    toast({
      title: `Exploring ${title}`,
      description: `Navigating to ${title} feature...`
    });
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
            </BreadcrumbList>
          </Breadcrumb>
          
          {isLoading ? (
            <div className="h-96 flex flex-col items-center justify-center">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600 mb-4" />
              <p className="text-lg text-gray-600">Loading Hydra Dashboard...</p>
            </div>
          ) : (
            <>
              <WaterDashboard />
              
              <section className="mt-8">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-2xl font-bold text-water-dark">
                    AI-Powered Solutions
                  </h2>
                  <Button variant="outline" size="sm" asChild>
                    <Link to="/ai-chatbot">
                      Explore All Solutions
                    </Link>
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {featuresList.map((feature, index) => (
                    <div
                      key={index}
                      className="animate-fade-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Card className="h-full overflow-hidden border transition-all duration-300 hover:shadow-md bg-white border-water-light/80">
                        <CardHeader className="flex flex-row items-center gap-3">
                          <div className={`${feature.color} text-white p-2 rounded-md`}>
                            <feature.icon className="h-5 w-5" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{feature.title}</CardTitle>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="text-gray-600">
                            {feature.description}
                          </CardDescription>
                        </CardContent>
                        <CardFooter>
                          <Button 
                            asChild 
                            variant="outline" 
                            onClick={() => handleFeatureClick(feature.title)}
                          >
                            <Link to={feature.link}>Explore</Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    </div>
                  ))}
                </div>
              </section>
            </>
          )}
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default Index;
