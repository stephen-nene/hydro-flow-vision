
import { useState } from "react";
import { WaterDashboard } from "@/components/dashboard/WaterDashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";

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
        </main>
      </div>
    </div>
  );
};

export default Index;
