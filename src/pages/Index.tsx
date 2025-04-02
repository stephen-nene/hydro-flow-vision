
import { useState } from "react";
import { WaterDashboard } from "@/components/dashboard/WaterDashboard";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";

const Index = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);

  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'emergency-mode' : ''}`}>
      <Navbar isEmergencyMode={isEmergencyMode} setIsEmergencyMode={setIsEmergencyMode} />
      <div className="flex">
        <Sidebar isEmergencyMode={isEmergencyMode} />
        <main className="flex-1 p-6">
          <WaterDashboard isEmergencyMode={isEmergencyMode} />
        </main>
      </div>
    </div>
  );
};

export default Index;
