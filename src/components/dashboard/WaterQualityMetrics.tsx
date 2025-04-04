
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { WaterSample } from "@/types/water";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  Legend
} from "recharts";

interface WaterQualityMetricsProps {
  waterSamples: WaterSample[];
}

export function WaterQualityMetrics({ waterSamples }: WaterQualityMetricsProps) {
  const [activeTab, setActiveTab] = useState("trends");
  
  // Process data for toxicity trend chart
  const trendData = waterSamples.map(sample => ({
    name: sample.id.toString(),
    toxicity: sample.toxicityLevel,
    pH: sample.metrics?.pH || 7,
    chlorine: sample.metrics?.chlorine || 0
  }));
  
  // Process data for contaminants chart
  const contaminantMap = new Map<string, number>();
  waterSamples.forEach(sample => {
    sample.contaminants.forEach(contaminant => {
      contaminantMap.set(
        contaminant, 
        (contaminantMap.get(contaminant) || 0) + 1
      );
    });
  });
  
  const contaminantData = Array.from(contaminantMap.entries()).map(([name, count]) => ({
    name,
    count
  }));
  
  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-water-dark">
        Water Quality Metrics
      </h2>
      
      <Tabs 
        value={activeTab} 
        onValueChange={setActiveTab}
        className="space-y-4"
      >
        <TabsList className="grid w-full grid-cols-3 max-w-md mx-auto">
          <TabsTrigger value="trends">Toxicity Trends</TabsTrigger>
          <TabsTrigger value="contaminants">Contaminants</TabsTrigger>
          <TabsTrigger value="metrics">Key Metrics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="trends" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorToxicity" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ea384c" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#ea384c" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#eee"
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                      label={{ 
                        value: 'Sample ID', 
                        position: 'insideBottom', 
                        offset: -5,
                        style: { fill: '#888' }
                      }}
                    />
                    <YAxis 
                      stroke="#888"
                      label={{ 
                        value: 'Toxicity %', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: '#888' }
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        color: '#333'
                      }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="toxicity" 
                      name="Toxicity Level"
                      stroke="#ea384c" 
                      fillOpacity={1} 
                      fill="url(#colorToxicity)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="contaminants" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={contaminantData}
                    margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#eee"
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                    />
                    <YAxis 
                      stroke="#888"
                      label={{ 
                        value: 'Count', 
                        angle: -90, 
                        position: 'insideLeft',
                        style: { fill: '#888' }
                      }}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        color: '#333'
                      }}
                    />
                    <Legend />
                    <Bar 
                      dataKey="count" 
                      name="Occurrence" 
                      fill="#33C3F0"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="metrics" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={trendData}
                    margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorPh" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                      </linearGradient>
                      <linearGradient id="colorChlorine" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                        <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid 
                      strokeDasharray="3 3" 
                      stroke="#eee"
                    />
                    <XAxis 
                      dataKey="name" 
                      stroke="#888"
                      label={{ 
                        value: 'Sample ID', 
                        position: 'insideBottom', 
                        offset: -5,
                        style: { fill: '#888' }
                      }}
                    />
                    <YAxis 
                      stroke="#888"
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#fff',
                        borderColor: '#ddd',
                        color: '#333'
                      }}
                    />
                    <Legend />
                    <Area 
                      type="monotone" 
                      dataKey="pH" 
                      name="pH Level"
                      stroke="#8884d8" 
                      fillOpacity={1} 
                      fill="url(#colorPh)" 
                    />
                    <Area 
                      type="monotone" 
                      dataKey="chlorine" 
                      name="Chlorine (ppm)"
                      stroke="#82ca9d" 
                      fillOpacity={1} 
                      fill="url(#colorChlorine)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
