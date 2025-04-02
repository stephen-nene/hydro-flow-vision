
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";

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
          
          <header>
            <h1 className={`text-2xl md:text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Reports
            </h1>
            <p className={`text-base md:text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Generate and access water quality analysis reports
            </p>
          </header>

          <div className="mt-6 md:mt-8 glass-card p-4 md:p-6 rounded-xl">
            <div className="text-center py-8 md:py-12">
              <h2 className="text-xl font-medium mb-2">Report Generation</h2>
              <p className="text-gray-500">
                Connect to the backend API to generate and display water quality reports
              </p>
            </div>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default Reports;
