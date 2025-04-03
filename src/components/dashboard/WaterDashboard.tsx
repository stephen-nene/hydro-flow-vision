
import { useState, useEffect } from "react";
import { ToxicityGauge } from "@/components/dashboard/ToxicityGauge";
import { PriorityCasesCarousel } from "@/components/dashboard/PriorityCasesCarousel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { WaterQualityMetrics } from "@/components/dashboard/WaterQualityMetrics";
import { LiveAlerts } from "@/components/dashboard/LiveAlerts";
import { mockWaterData } from "@/data/mockData";
import { WaterSample } from "@/types/water";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface WaterDashboardProps {
  isEmergencyMode: boolean;
}

export function WaterDashboard({ isEmergencyMode }: WaterDashboardProps) {
  const [waterSamples, setWaterSamples] = useState<WaterSample[]>([]);
  const [criticalCases, setCriticalCases] = useState<WaterSample[]>([]);
  const [overallToxicity, setOverallToxicity] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");

  useEffect(() => {
    // Simulate fetching data
    setWaterSamples(mockWaterData);
    
    // Filter critical cases (toxicity > 70)
    const critical = mockWaterData.filter(sample => sample.toxicityLevel > 70);
    setCriticalCases(critical);
    
    // Calculate overall toxicity as average of all samples
    const avgToxicity = Math.round(
      mockWaterData.reduce((sum, sample) => sum + sample.toxicityLevel, 0) / mockWaterData.length
    );
    setOverallToxicity(avgToxicity);
  }, []);

  return (
    <div className="space-y-6">
      <header>
        <h1 className={`text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
          {isEmergencyMode ? 'Emergency Water Dashboard' : 'Water Quality Dashboard'}
        </h1>
        <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
          {isEmergencyMode 
            ? 'Critical water quality alerts require immediate attention' 
            : 'Monitor and analyze water quality across all systems'}
        </p>
      </header>

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 lg:max-w-md">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="metrics">Analytics</TabsTrigger>
          <TabsTrigger value="cases">Priority Cases</TabsTrigger>
        </TabsList>
        
        {/* Overview Tab - Key info at a glance */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Main Toxicity Gauge */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <ToxicityGauge value={overallToxicity} isEmergencyMode={isEmergencyMode} />
            </Card>

            {/* Live Alerts */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <LiveAlerts isEmergencyMode={isEmergencyMode} alerts={criticalCases} />
            </Card>

            {/* Quick Action Buttons */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <QuickActions isEmergencyMode={isEmergencyMode} />
            </Card>
          </div>
        </TabsContent>
        
        {/* Metrics Tab - Detailed analytics */}
        <TabsContent value="metrics" className="space-y-4">
          <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
            <WaterQualityMetrics isEmergencyMode={isEmergencyMode} waterSamples={waterSamples} />
          </Card>
        </TabsContent>
        
        {/* Priority Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Priority Cases
            </h2>
            <PriorityCasesCarousel cases={criticalCases} isEmergencyMode={isEmergencyMode} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
