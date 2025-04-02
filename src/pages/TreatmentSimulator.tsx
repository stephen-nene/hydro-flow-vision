
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";

const TreatmentSimulator = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'emergency-mode' : ''}`}>
      <Navbar isEmergencyMode={isEmergencyMode} setIsEmergencyMode={setIsEmergencyMode} />
      <div className="flex">
        <Sidebar isEmergencyMode={isEmergencyMode} />
        <main className="flex-1 p-6">
          <Breadcrumb className="mb-6">
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
          
          <header>
            <h1 className={`text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Treatment Simulator
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Simulate different water treatment methods and analyze effectiveness
            </p>
          </header>

          <div className="mt-8 glass-card p-6 rounded-xl">
            <div className="text-center py-12">
              <h2 className="text-xl font-medium mb-2">Simulation Environment</h2>
              <p className="text-gray-500">
                Connect to the ML processing pipeline to enable treatment simulations
              </p>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TreatmentSimulator;
