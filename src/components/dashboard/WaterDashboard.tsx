
import { useState, useEffect } from "react";
import { ToxicityGauge } from "@/components/dashboard/ToxicityGauge";
import { PriorityCasesCarousel } from "@/components/dashboard/PriorityCasesCarousel";
import { QuickActions } from "@/components/dashboard/QuickActions";
import { WaterQualityMetrics } from "@/components/dashboard/WaterQualityMetrics";
import { LiveAlerts } from "@/components/dashboard/LiveAlerts";
import { mockWaterData } from "@/data/mockData";
import { WaterSample } from "@/types/water";

interface WaterDashboardProps {
  isEmergencyMode: boolean;
}

export function WaterDashboard({ isEmergencyMode }: WaterDashboardProps) {
  const [waterSamples, setWaterSamples] = useState<WaterSample[]>([]);
  const [criticalCases, setCriticalCases] = useState<WaterSample[]>([]);
  const [overallToxicity, setOverallToxicity] = useState(0);

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

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Main Toxicity Gauge */}
        <div className="lg:col-span-4">
          <div className={`p-6 rounded-xl ${isEmergencyMode ? 'bg-gray-900' : 'glass-card'}`}>
            <ToxicityGauge value={overallToxicity} isEmergencyMode={isEmergencyMode} />
          </div>
        </div>

        {/* Quick Action Buttons */}
        <div className="lg:col-span-4">
          <div className={`p-6 rounded-xl ${isEmergencyMode ? 'bg-gray-900' : 'glass-card'}`}>
            <QuickActions isEmergencyMode={isEmergencyMode} />
          </div>
        </div>

        {/* Live Alerts */}
        <div className="lg:col-span-4">
          <div className={`p-6 rounded-xl ${isEmergencyMode ? 'bg-gray-900' : 'glass-card'}`}>
            <LiveAlerts isEmergencyMode={isEmergencyMode} alerts={criticalCases} />
          </div>
        </div>

        {/* Priority Cases Carousel - Spans full width */}
        <div className="lg:col-span-12">
          <div className={`p-6 rounded-xl ${isEmergencyMode ? 'bg-gray-900' : 'glass-card'}`}>
            <h2 className={`text-xl font-semibold mb-4 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Priority Cases
            </h2>
            <PriorityCasesCarousel cases={criticalCases} isEmergencyMode={isEmergencyMode} />
          </div>
        </div>

        {/* Water Quality Metrics - Spans full width */}
        <div className="lg:col-span-12">
          <div className={`p-6 rounded-xl ${isEmergencyMode ? 'bg-gray-900' : 'glass-card'}`}>
            <WaterQualityMetrics isEmergencyMode={isEmergencyMode} waterSamples={waterSamples} />
          </div>
        </div>
      </div>
    </div>
  );
}
