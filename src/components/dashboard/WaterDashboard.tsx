
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
import { Gauge, ArrowDownUp, Bell, Lightbulb, PieChart, BarChart3 } from "lucide-react";

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
          <TabsTrigger value="overview" className="flex items-center gap-1">
            <Gauge className="h-4 w-4" />
            <span>Overview</span>
          </TabsTrigger>
          <TabsTrigger value="metrics" className="flex items-center gap-1">
            <BarChart3 className="h-4 w-4" />
            <span>Analytics</span>
          </TabsTrigger>
          <TabsTrigger value="cases" className="flex items-center gap-1">
            <ArrowDownUp className="h-4 w-4" />
            <span>Priority Cases</span>
          </TabsTrigger>
        </TabsList>
        
        {/* Overview Tab - Key info at a glance */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Main Toxicity Gauge */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Gauge className={`h-5 w-5 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`} />
                <h3 className="font-semibold">Overall Water Quality</h3>
              </div>
              <ToxicityGauge value={overallToxicity} isEmergencyMode={isEmergencyMode} />
            </Card>

            {/* Live Alerts */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Bell className={`h-5 w-5 ${isEmergencyMode ? 'text-amber-500' : 'text-amber-600'}`} />
                <h3 className="font-semibold">Live Alerts</h3>
              </div>
              <LiveAlerts isEmergencyMode={isEmergencyMode} alerts={criticalCases} />
            </Card>

            {/* Quick Action Buttons */}
            <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className={`h-5 w-5 ${isEmergencyMode ? 'text-green-400' : 'text-green-600'}`} />
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <QuickActions isEmergencyMode={isEmergencyMode} />
            </Card>
          </div>
          
          {/* Priority Cases Preview */}
          <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownUp className={`h-5 w-5 ${isEmergencyMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className="font-semibold">Priority Cases</h3>
            </div>
            <PriorityCasesCarousel cases={criticalCases.slice(0, 3)} isEmergencyMode={isEmergencyMode} />
          </Card>
        </TabsContent>
        
        {/* Metrics Tab - Detailed analytics */}
        <TabsContent value="metrics" className="space-y-4">
          <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
            <div className="flex items-center gap-2 mb-3">
              <PieChart className={`h-5 w-5 ${isEmergencyMode ? 'text-purple-400' : 'text-purple-600'}`} />
              <h3 className="font-semibold">Water Quality Metrics</h3>
            </div>
            <WaterQualityMetrics isEmergencyMode={isEmergencyMode} waterSamples={waterSamples} />
          </Card>
        </TabsContent>
        
        {/* Priority Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card className={`p-4 ${isEmergencyMode ? 'bg-gray-900 border-gray-800' : 'glass-card'}`}>
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownUp className={`h-5 w-5 ${isEmergencyMode ? 'text-blue-400' : 'text-blue-600'}`} />
              <h3 className="font-semibold">Priority Cases</h3>
            </div>
            <PriorityCasesCarousel cases={criticalCases} isEmergencyMode={isEmergencyMode} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
