
import { useState } from "react";
import { BarChart, AlertTriangle, TrendingUp, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/components/ui/use-toast";

interface Prediction {
  location: string;
  risk: number;
  contaminant: string;
  timeFrame: string;
  description: string;
}

export const CrisisPrediction = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [showPredictions, setShowPredictions] = useState(false);
  const { toast } = useToast();

  const loadPredictions = () => {
    setIsLoading(true);
    
    // Simulate API call delay
    toast({
      title: "Analyzing historical data",
      description: "Our AI is processing regional water quality trends"
    });
    
    setTimeout(() => {
      const mockPredictions: Prediction[] = [
        {
          location: "Nairobi Pipeline Estate",
          risk: 89,
          contaminant: "Lead",
          timeFrame: "1-2 months",
          description: "Aging infrastructure and seasonal water scarcity will likely cause lead contamination levels to exceed safety standards in coming weeks."
        },
        {
          location: "Mombasa Coastal Village",
          risk: 72,
          contaminant: "Biological Pathogens",
          timeFrame: "2 weeks",
          description: "Upcoming rainfall combined with insufficient wastewater treatment creates high risk of pathogen spread."
        },
        {
          location: "Nakuru Industrial Zone",
          risk: 68,
          contaminant: "Industrial Chemicals",
          timeFrame: "3 months",
          description: "Seasonal temperature increase will accelerate chemical leaching from nearby factory sites."
        },
        {
          location: "Kisumu Lakeside Community",
          risk: 56,
          contaminant: "Agricultural Runoff",
          timeFrame: "1 month",
          description: "Planned increase in fertilizer use will cause nitrate levels to rise above WHO standards."
        },
        {
          location: "Eldoret Highland Settlement",
          risk: 42,
          contaminant: "Sediment",
          timeFrame: "4 months",
          description: "Deforestation and upcoming rainy season will increase turbidity and contamination transport."
        }
      ];
      
      setPredictions(mockPredictions);
      setShowPredictions(true);
      setIsLoading(false);
      
      toast({
        title: "Crisis predictions ready",
        description: "5 potential water quality issues identified",
        variant: "default"
      });
    }, 2500);
  };

  return (
    <div className="space-y-4">
      {!showPredictions ? (
        <div className="aspect-video rounded-md bg-gray-900 flex flex-col items-center justify-center p-6 text-center">
          <BarChart className="h-10 w-10 text-amber-500 mb-4" />
          <h3 className="text-white text-lg font-medium mb-2">AI-Powered Crisis Prediction</h3>
          <p className="text-gray-400 text-sm mb-6">
            Our advanced algorithms analyze historical water quality data, weather patterns, 
            infrastructure maps, and regional activities to predict potential water quality issues 
            before they become critical.
          </p>
          <Button 
            className="w-full md:w-auto"
            onClick={loadPredictions}
            disabled={isLoading}
          >
            {isLoading ? "Analyzing Data..." : "View Predictions"}
          </Button>
        </div>
      ) : (
        <div className="grid gap-4">
          <div className="p-4 rounded-md bg-gray-900 flex flex-col md:flex-row md:justify-between gap-4">
            <div className="flex-1">
              <h3 className="text-white text-xl font-semibold mb-2 flex items-center">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-2" />
                Crisis Prediction Dashboard
              </h3>
              <p className="text-gray-400 text-sm">
                AI has identified {predictions.length} potential water quality issues requiring 
                preventive action in the next 4 months.
              </p>
            </div>
            <div className="flex space-x-2">
              <Button variant="outline" onClick={() => setShowPredictions(false)}>
                Reset
              </Button>
              <Button 
                variant="default" 
                onClick={() => {
                  toast({
                    title: "Alert Team Generated",
                    description: "Sales team has been notified about high-risk areas",
                  });
                }}
              >
                Alert Sales Team
              </Button>
            </div>
          </div>
          
          {/* Predictions list */}
          <div className="space-y-3">
            {predictions.map((prediction, index) => (
              <Card 
                key={index} 
                className={`p-4 ${
                  prediction.risk > 75 
                    ? 'bg-red-50 border-red-200' 
                    : prediction.risk > 60 
                      ? 'bg-amber-50 border-amber-200' 
                      : 'bg-gray-50 border-gray-200'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-center gap-3">
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-semibold flex items-center text-gray-900">
                        <MapPin className="h-4 w-4 mr-1 inline" />
                        {prediction.location}
                      </h4>
                      <span className={`text-sm font-bold ${
                        prediction.risk > 75 ? 'text-red-600' : 
                        prediction.risk > 60 ? 'text-amber-600' : 
                        'text-blue-600'
                      }`}>
                        {prediction.risk}% Risk
                      </span>
                    </div>
                    
                    <div className="mt-1">
                      <Progress 
                        value={prediction.risk} 
                        className="h-1.5" 
                        indicatorClassName={
                          prediction.risk > 75 ? 'bg-red-500' : 
                          prediction.risk > 60 ? 'bg-amber-500' : 
                          'bg-blue-500'
                        }
                      />
                    </div>
                    
                    <div className="mt-2 grid grid-cols-2 gap-x-4 gap-y-1">
                      <div className="flex items-center">
                        <span className="text-xs text-gray-500">Contaminant:</span>
                        <span className="text-xs ml-1 font-medium text-gray-900">
                          {prediction.contaminant}
                        </span>
                      </div>
                      
                      <div className="flex items-center">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span className="text-xs text-gray-900">
                          Expected in {prediction.timeFrame}
                        </span>
                      </div>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">
                      {prediction.description}
                    </p>
                  </div>
                  
                  <Button 
                    variant="outline" 
                    className="md:self-center" 
                    size="sm"
                    onClick={() => {
                      toast({
                        title: "Opportunity Created",
                        description: `Sales lead created for ${prediction.location}`,
                      });
                    }}
                  >
                    <TrendingUp className="h-3.5 w-3.5 mr-1" />
                    Create Opportunity
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
