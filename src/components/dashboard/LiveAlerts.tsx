
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { AlertTriangle, Bell, Check, ChevronRight, MoreHorizontal, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WaterSample } from "@/types/water";
import { useToast } from "@/hooks/use-toast";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";

interface LiveAlertsProps {
  isEmergencyMode: boolean;
  alerts: WaterSample[];
}

interface Alert {
  id: string;
  text: string;
  level: 'critical' | 'warning' | 'info';
  source: string;
  time: string;
  details?: string;
}

export function LiveAlerts({ isEmergencyMode, alerts }: LiveAlertsProps) {
  const [activeAlerts, setActiveAlerts] = useState<Alert[]>([]);
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Generate alerts based on water samples
    const initialAlerts = alerts.map(alert => ({
      id: `alert-${alert.id}`,
      text: `High toxicity detected in ${alert.location} (${alert.toxicityLevel}%)`,
      level: alert.toxicityLevel > 85 
        ? 'critical' as const
        : alert.toxicityLevel > 70 
          ? 'warning' as const 
          : 'info' as const,
      source: alert.location,
      time: '10 minutes ago',
      details: `Water sample analysis from ${alert.location} shows elevated levels of ${alert.contaminants.join(', ')}. The toxicity level is ${alert.toxicityLevel}%, which ${alert.toxicityLevel > 70 ? 'exceeds' : 'approaches'} safety thresholds. Collected on ${alert.collectionDate}.`
    }));
    
    setActiveAlerts(initialAlerts);
    
    // Add a demo alert after 2 seconds for visual effect
    const timer = setTimeout(() => {
      const newAlert = {
        id: 'alert-new',
        text: 'New water sample received for processing',
        level: 'info' as const,
        source: 'Laboratory',
        time: 'Just now',
        details: 'A new water sample has been received and is currently being processed by the laboratory. Results will be available shortly.'
      };
      
      setActiveAlerts(prev => [...prev, newAlert]);
      
      toast({
        title: "New Alert",
        description: "A new water sample has been received for processing.",
      });
    }, 2000);
    
    // Add critical alert after 5 seconds in emergency mode
    let criticalTimer: NodeJS.Timeout;
    if (isEmergencyMode) {
      criticalTimer = setTimeout(() => {
        const criticalAlert = {
          id: 'alert-critical',
          text: 'URGENT: Contamination detected in main reservoir',
          level: 'critical' as const,
          source: 'Main Reservoir',
          time: 'Just now',
          details: 'Critical contamination levels detected in the main water reservoir. Immediate isolation and emergency response required. Potential health risk to consumers if not addressed immediately.'
        };
        
        setActiveAlerts(prev => [criticalAlert, ...prev]);
        
        toast({
          title: "CRITICAL ALERT",
          description: "Contamination detected in main reservoir.",
          variant: "destructive"
        });
      }, 5000);
    }
    
    return () => {
      clearTimeout(timer);
      if (isEmergencyMode) clearTimeout(criticalTimer);
    };
  }, [alerts, toast, isEmergencyMode]);

  const handleDismiss = (id: string) => {
    setActiveAlerts(prev => prev.filter(alert => alert.id !== id));
    
    toast({
      description: "Alert dismissed",
    });
  };
  
  const handleDismissAll = () => {
    setActiveAlerts([]);
    
    toast({
      title: "All Alerts Cleared",
      description: "All alerts have been dismissed.",
    });
  };
  
  const handleViewDetails = (alert: Alert) => {
    setSelectedAlert(alert);
    setDetailsOpen(true);
  };
  
  const handleRespond = (alert: Alert) => {
    setDetailsOpen(false);
    
    toast({
      title: "Response Initiated",
      description: `Response to ${alert.source} alert has been initiated.`,
    });
    
    // Remove the alert after response
    setActiveAlerts(prev => prev.filter(a => a.id !== alert.id));
  };
  
  const handleMarkAsRead = (id: string) => {
    // This would typically update a 'read' status, but for demo we'll just dismiss
    handleDismiss(id);
  };
  
  const handleShare = (alert: Alert) => {
    toast({
      title: "Alert Shared",
      description: `Alert about ${alert.source} has been shared with the team.`,
    });
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
                "p-3 rounded-lg border flex items-start justify-between relative group",
                alert.level === 'critical' 
                  ? "border-water-danger/50 bg-water-danger/10" 
                  : alert.level === 'warning'
                    ? "border-yellow-500/50 bg-yellow-500/10"
                    : isEmergencyMode
                      ? "border-gray-700 bg-gray-800/50"
                      : "border-water-light bg-water-light/30",
                alert.level === 'critical' && "animate-pulse"
              )}
            >
              <div className="flex items-start flex-1 mr-2">
                {alert.level === 'critical' && (
                  <AlertTriangle className="h-5 w-5 text-water-danger mr-2 mt-0.5 flex-shrink-0" />
                )}
                {alert.level === 'warning' && (
                  <AlertTriangle className="h-5 w-5 text-yellow-500 mr-2 mt-0.5 flex-shrink-0" />
                )}
                <div>
                  <div className="flex items-center">
                    <p className={cn(
                      "text-sm font-medium",
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
                    <Badge 
                      variant={
                        alert.level === 'critical' 
                          ? 'destructive' 
                          : alert.level === 'warning' 
                            ? 'outline' 
                            : 'secondary'
                      }
                      className="ml-2 h-5"
                    >
                      {alert.level}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-xs text-gray-500">{alert.source} • {alert.time}</span>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 px-2 text-xs ml-2"
                      onClick={() => handleViewDetails(alert)}
                    >
                      View details
                      <ChevronRight className="h-3 w-3 ml-1" />
                    </Button>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-6 w-6 p-0 rounded-full"
                  onClick={() => handleDismiss(alert.id)}
                >
                  <X className={cn(
                    "h-4 w-4",
                    isEmergencyMode ? "text-gray-400" : "text-gray-500"
                  )} />
                </Button>
                
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-6 w-6 p-0 rounded-full ml-1"
                    >
                      <MoreHorizontal className={cn(
                        "h-4 w-4",
                        isEmergencyMode ? "text-gray-400" : "text-gray-500"
                      )} />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleViewDetails(alert)}>
                      View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleMarkAsRead(alert.id)}>
                      Mark as Read
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleShare(alert)}>
                      Share with Team
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem 
                      className={alert.level === 'critical' ? "text-water-danger" : ""}
                      onClick={() => handleRespond(alert)}
                    >
                      Respond Now
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
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
          onClick={handleDismissAll}
        >
          Dismiss All
        </Button>
      )}
      
      {/* Alert Details Dialog */}
      {selectedAlert && (
        <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle className={cn(
                selectedAlert.level === 'critical' ? "text-water-danger" : 
                selectedAlert.level === 'warning' ? "text-yellow-600" : 
                "text-gray-900"
              )}>
                {selectedAlert.level === 'critical' && (
                  <AlertTriangle className="inline-block h-5 w-5 mr-2" />
                )}
                {selectedAlert.text}
              </DialogTitle>
              <DialogDescription>
                From {selectedAlert.source} • {selectedAlert.time}
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <div className={cn(
                "p-4 rounded-md",
                selectedAlert.level === 'critical' ? "bg-water-danger/10" : 
                selectedAlert.level === 'warning' ? "bg-yellow-500/10" : 
                "bg-blue-100"
              )}>
                <p className="text-sm">{selectedAlert.details}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <h4 className="text-sm font-semibold mb-1">Source</h4>
                  <p className="text-sm text-gray-600">{selectedAlert.source}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Alert Level</h4>
                  <Badge 
                    variant={
                      selectedAlert.level === 'critical' 
                        ? 'destructive' 
                        : selectedAlert.level === 'warning' 
                          ? 'outline' 
                          : 'secondary'
                    }
                  >
                    {selectedAlert.level}
                  </Badge>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Received</h4>
                  <p className="text-sm text-gray-600">{selectedAlert.time}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold mb-1">Alert ID</h4>
                  <p className="text-sm text-gray-600">{selectedAlert.id}</p>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-semibold mb-1">Recommended Actions</h4>
                <ul className="text-sm text-gray-600 list-disc pl-4 space-y-1">
                  {selectedAlert.level === 'critical' ? (
                    <>
                      <li>Immediately isolate the affected water source</li>
                      <li>Deploy emergency response team to the location</li>
                      <li>Conduct comprehensive contamination testing</li>
                      <li>Prepare public notification if necessary</li>
                      <li>Implement emergency water treatment protocols</li>
                    </>
                  ) : selectedAlert.level === 'warning' ? (
                    <>
                      <li>Increase monitoring frequency at the location</li>
                      <li>Review and adjust treatment processes</li>
                      <li>Prepare for potential escalation if values increase</li>
                      <li>Notify relevant team members about the situation</li>
                      <li>Document all observations and actions taken</li>
                    </>
                  ) : (
                    <>
                      <li>Log the information in the system</li>
                      <li>Continue standard monitoring procedures</li>
                      <li>No immediate action required</li>
                      <li>Include in the next scheduled report</li>
                    </>
                  )}
                </ul>
              </div>
            </div>
            
            <DialogFooter className="flex justify-between space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setDetailsOpen(false)}
              >
                Close
              </Button>
              <Button 
                variant={selectedAlert.level === 'critical' ? "destructive" : "default"}
                onClick={() => handleRespond(selectedAlert)}
              >
                {selectedAlert.level === 'critical' ? 'Respond Immediately' : 'Acknowledge & Respond'}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}
