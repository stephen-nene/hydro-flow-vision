
import { AlertTriangle, Clock, MapPin } from "lucide-react";
import { WaterSample } from "@/types/water";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface LiveAlertsProps {
  alerts: WaterSample[];
}

export function LiveAlerts({ alerts }: LiveAlertsProps) {
  const maxAlerts = 3;
  const displayAlerts = alerts.slice(0, maxAlerts);
  
  return (
    <div className="space-y-2">
      {displayAlerts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <p>No active alerts</p>
        </div>
      ) : (
        <>
          {displayAlerts.map((alert, index) => (
            <div
              key={alert.id}
              className={cn(
                "p-3 rounded-lg flex items-start gap-3 border",
                alert.toxicityLevel > 85 
                  ? "bg-red-50 border-red-200" 
                  : "bg-amber-50 border-amber-200"
              )}
            >
              <div className={alert.toxicityLevel > 85 ? "text-red-500" : "text-amber-500"}>
                <AlertTriangle className="h-5 w-5" />
              </div>
              
              <div className="flex-1">
                <div className="flex justify-between">
                  <h4 className="font-medium">Sample #{alert.id}</h4>
                  <span className={cn(
                    "text-xs px-2 py-0.5 rounded-full",
                    alert.toxicityLevel > 85 
                      ? "bg-red-100 text-red-800" 
                      : "bg-amber-100 text-amber-800"
                  )}>
                    {alert.toxicityLevel}% Toxicity
                  </span>
                </div>
                
                <div className="mt-1 text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    <span>{alert.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    <span>Detected {alert.timestamp || alert.collectionDate}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {alerts.length > maxAlerts && (
            <div className="mt-2 text-center">
              <Button variant="ghost" size="sm">
                View {alerts.length - maxAlerts} more alerts
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
