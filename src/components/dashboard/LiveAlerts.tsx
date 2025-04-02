
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaterSample } from "@/types/water";

interface LiveAlertsProps {
  isEmergencyMode: boolean;
  alerts: WaterSample[];
}

export function LiveAlerts({ isEmergencyMode, alerts }: LiveAlertsProps) {
  const [activeAlerts, setActiveAlerts] = useState<Array<{ id: string; text: string; level: 'critical' | 'warning' | 'info' }>>([]);

  useEffect(() => {
    // Generate alerts based on water samples
    const newAlerts = alerts.map(alert => ({
      id: `alert-${alert.id}`,
      text: `High toxicity detected in ${alert.location} (${alert.toxicityLevel}%)`,
      level: alert.toxicityLevel > 85 
        ? 'critical' as const
        : alert.toxicityLevel > 70 
          ? 'warning' as const 
          : 'info' as const
    }));
    
    setActiveAlerts(newAlerts);
    
    // Add a demo alert after 2 seconds for visual effect
    const timer = setTimeout(() => {
      setActiveAlerts(prev => [
        ...prev,
        {
          id: 'alert-new',
          text: 'New water sample received for processing',
          level: 'info'
        }
      ]);
    }, 2000);
    
    return () => clearTimeout(timer);
  }, [alerts]);

  const handleDismiss = (id: string) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className={cn(
          "text-xl font-semibold",
          isEmergencyMode ? "text-water-danger" : "text-water-dark"
        )}>
          Live Alerts
        </h2>
        <div className="relative">
          <Bell className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
          {activeAlerts.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-water-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              {activeAlerts.length}
            </span>
          )}
        </div>
      </div>

      <div className="space-y-2 max-h-[300px] overflow-y-auto pr-1">
        {activeAlerts.length === 0 ? (
          <div className={cn(
            "text-center p-4 border rounded-lg",
            isEmergencyMode ? "border-gray-700 bg-gray-800/50 text-gray-400" : "border-gray-200 bg-gray-50 text-gray-500"
          )}>
            <Check className="mx-auto h-6 w-6 mb-2 opacity-50" />
            <p>No active alerts</p>
          </div>
        ) : (
          activeAlerts.map((alert) => (
            <div 
              key={alert.id}
              className={cn(
                "p-3 rounded-lg border flex items-start justify-between",
                alert.level === 'critical' 
                  ? "border-water-danger/50 bg-water-danger/10" 
                  : alert.level === 'warning'
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : isEmergencyMode
                      ? "border-gray-700 bg-gray-800/50"
                      : "border-water-light bg-water-light/30"
              )}
            >
              <div className="flex items-start">
                {alert.level === 'critical' && (
                  <AlertTriangle className="h-5 w-5 text-water-danger mr-2 mt-0.5 flex-shrink-0" />
                )}
                {alert.level === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <p className={cn(
                  "text-sm",
                  alert.level === 'critical' 
                    ? "text-water-danger" 
                    : alert.level === 'warning'
                      ? "text-yellow-600"
                      : isEmergencyMode
                        ? "text-gray-300"
                        : "text-gray-700"
                )}>
                  {alert.text}
                </p>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0 ml-2 rounded-full"
                onClick={() => handleDismiss(alert.id)}
              >
                <Check className={cn(
                  "h-4 w-4",
                  isEmergencyMode ? "text-gray-400" : "text-gray-500"
                )} />
              </Button>
            </div>
          ))
        )}
      </div>

      {activeAlerts.length > 0 && (
        <Button 
          variant="outline" 
          size="sm" 
          className={cn(
            "w-full text-xs",
            isEmergencyMode 
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
              : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
          )}
          onClick={() => setActiveAlerts([])}
        >
          Dismiss All
        </Button>
      )}
    </div>
  );
}
