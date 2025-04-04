
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
import { Gauge, ArrowDownUp, Bell, Lightbulb, PieChart, BarChart3, Info, Map, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";

export function WaterDashboard() {
  const [waterSamples, setWaterSamples] = useState<WaterSample[]>([]);
  const [criticalCases, setCriticalCases] = useState<WaterSample[]>([]);
  const [overallToxicity, setOverallToxicity] = useState(0);
  const [activeTab, setActiveTab] = useState("overview");
  const [timeRange, setTimeRange] = useState("24h");
  const { toast } = useToast();

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
    
    // Set a welcome toast when dashboard loads
    const timer = setTimeout(() => {
      toast({
        title: "Welcome to Hydra Dashboard",
        description: "All systems operational. Monitoring 24 water sources in real-time.",
      });
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    
    if (value === "metrics") {
      toast({
        title: "Analytics View Loaded",
        description: "Showing detailed water quality metrics and trend analysis.",
      });
    } else if (value === "cases") {
      toast({
        title: "Priority Cases Loaded",
        description: `Currently monitoring ${criticalCases.length} critical water quality cases.`,
      });
    }
  };
  
  const handleTimeRangeChange = (range: string) => {
    setTimeRange(range);
    
    toast({
      title: "Time Range Updated",
      description: `Data now showing for the last ${range === "24h" ? "24 hours" : range === "7d" ? "7 days" : "30 days"}.`,
    });
  };

  return (
    <div className="space-y-6">
      <header className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-water-dark">
            Water Quality Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Monitor and analyze water quality across all systems
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Badge 
            variant="secondary"
            className="px-3 py-1 text-sm flex items-center gap-1"
          >
            <Activity className="h-3.5 w-3.5" />
            <span>System Normal</span>
          </Badge>
          
          <div className="border rounded-md overflow-hidden flex">
            <button 
              className={`px-2 py-1 text-xs ${timeRange === "24h" ? "bg-blue-100 text-blue-800" : "bg-transparent"}`}
              onClick={() => handleTimeRangeChange("24h")}
            >
              24h
            </button>
            <button 
              className={`px-2 py-1 text-xs ${timeRange === "7d" ? "bg-blue-100 text-blue-800" : "bg-transparent"}`}
              onClick={() => handleTimeRangeChange("7d")}
            >
              7d
            </button>
            <button 
              className={`px-2 py-1 text-xs ${timeRange === "30d" ? "bg-blue-100 text-blue-800" : "bg-transparent"}`}
              onClick={() => handleTimeRangeChange("30d")}
            >
              30d
            </button>
          </div>
        </div>
      </header>

      <Tabs 
        defaultValue="overview" 
        value={activeTab} 
        onValueChange={handleTabChange}
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
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <Gauge className="h-5 w-5 text-water-dark" />
                <h3 className="font-semibold">Overall Water Quality</h3>
              </div>
              <ToxicityGauge value={overallToxicity} />
            </Card>

            {/* Live Alerts */}
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <Bell className="h-5 w-5 text-amber-600" />
                <h3 className="font-semibold">Live Alerts</h3>
              </div>
              <LiveAlerts alerts={criticalCases} />
            </Card>

            {/* Quick Action Buttons */}
            <Card className="p-4 glass-card">
              <div className="flex items-center gap-2 mb-3">
                <Lightbulb className="h-5 w-5 text-green-600" />
                <h3 className="font-semibold">Quick Actions</h3>
              </div>
              <QuickActions />
            </Card>
          </div>
          
          {/* Priority Cases Preview */}
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownUp className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Priority Cases</h3>
            </div>
            <PriorityCasesCarousel cases={criticalCases.slice(0, 3)} />
          </Card>
          
          {/* System Status */}
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-2 mb-3">
              <Info className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">System Status</h3>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-blue-50">
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-sm font-medium text-gray-600">Monitoring Stations</h4>
                  <p className="text-2xl font-bold text-blue-700">24</p>
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                    All Online
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-50">
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-sm font-medium text-gray-600">Treatment Plants</h4>
                  <p className="text-2xl font-bold text-blue-700">8</p>
                  <Badge variant="outline" className="mt-1 bg-amber-50 text-amber-700">
                    1 Warning
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-50">
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-sm font-medium text-gray-600">Active Alerts</h4>
                  <p className="text-2xl font-bold text-blue-700">{criticalCases.length}</p>
                  <Badge variant={criticalCases.length > 3 ? "destructive" : "outline"} className={`mt-1 ${criticalCases.length <= 3 && 'bg-green-50 text-green-700'}`}>
                    {criticalCases.length > 3 ? "Critical" : "Normal"}
                  </Badge>
                </div>
              </div>
              
              <div className="p-3 rounded-lg bg-blue-50">
                <div className="flex flex-col items-center text-center">
                  <h4 className="text-sm font-medium text-gray-600">System Health</h4>
                  <p className="text-2xl font-bold text-blue-700">98%</p>
                  <Badge variant="outline" className="mt-1 bg-green-50 text-green-700">
                    Optimal
                  </Badge>
                </div>
              </div>
            </div>
          </Card>
          
          {/* Regional Map */}
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-2 mb-3">
              <Map className="h-5 w-5 text-teal-600" />
              <h3 className="font-semibold">Regional Overview</h3>
            </div>
            
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 opacity-60">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1174&q=80" 
                  alt="City Map"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              
              {/* Map Markers */}
              <div className="absolute left-[20%] top-[30%]">
                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="absolute left-[45%] top-[50%]">
                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="absolute left-[70%] top-[25%]">
                <div className="h-4 w-4 rounded-full bg-amber-500 animate-pulse"></div>
              </div>
              <div className="absolute left-[30%] top-[60%]">
                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              <div className="absolute left-[60%] top-[70%]">
                <div className="h-4 w-4 rounded-full bg-green-500 animate-pulse"></div>
              </div>
              
              <div className="relative z-10 bg-black/70 p-3 rounded-lg text-white">
                <p className="text-sm font-semibold">5 Water Sources Monitored</p>
                <p className="text-xs">{criticalCases.length} critical alerts in region</p>
              </div>
            </div>
          </Card>
        </TabsContent>
        
        {/* Metrics Tab - Detailed analytics */}
        <TabsContent value="metrics" className="space-y-4">
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-2 mb-3">
              <PieChart className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">Water Quality Metrics</h3>
            </div>
            <WaterQualityMetrics waterSamples={waterSamples} />
          </Card>
        </TabsContent>
        
        {/* Priority Cases Tab */}
        <TabsContent value="cases" className="space-y-4">
          <Card className="p-4 glass-card">
            <div className="flex items-center gap-2 mb-3">
              <ArrowDownUp className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold">Priority Cases</h3>
            </div>
            <PriorityCasesCarousel cases={criticalCases} />
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
