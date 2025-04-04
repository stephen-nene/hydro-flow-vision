
import { Button } from "@/components/ui/button";
import { Bell, Download, RefreshCw, Zap } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function QuickActions() {
  const { toast } = useToast();
  
  const handleAction = (action: string) => {
    toast({
      title: `Action: ${action}`,
      description: "Processing your request...",
    });
    
    // Simulate completion after a delay
    setTimeout(() => {
      toast({
        title: "Complete",
        description: `${action} completed successfully`,
      });
    }, 1500);
  };
  
  return (
    <div className="grid grid-cols-2 gap-2">
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4 border-blue-200 hover:bg-blue-50 hover:text-blue-700" 
        onClick={() => handleAction("Scan System")}
      >
        <RefreshCw className="h-4 w-4 text-blue-600" />
        <div className="text-left">
          <div className="font-medium">Scan System</div>
          <div className="text-xs text-gray-600">Run diagnostics</div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4 border-amber-200 hover:bg-amber-50 hover:text-amber-700" 
        onClick={() => handleAction("Configure Alerts")}
      >
        <Bell className="h-4 w-4 text-amber-600" />
        <div className="text-left">
          <div className="font-medium">Configure Alerts</div>
          <div className="text-xs text-gray-600">Notification settings</div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4 border-green-200 hover:bg-green-50 hover:text-green-700" 
        onClick={() => handleAction("Generate Report")}
      >
        <Download className="h-4 w-4 text-green-600" />
        <div className="text-left">
          <div className="font-medium">Generate Report</div>
          <div className="text-xs text-gray-600">Water quality data</div>
        </div>
      </Button>
      
      <Button 
        variant="outline" 
        className="flex items-center gap-2 h-auto py-4 border-purple-200 hover:bg-purple-50 hover:text-purple-700" 
        onClick={() => handleAction("Quick Fix")}
      >
        <Zap className="h-4 w-4 text-purple-600" />
        <div className="text-left">
          <div className="font-medium">Quick Fix</div>
          <div className="text-xs text-gray-600">Auto-remediation</div>
        </div>
      </Button>
    </div>
  );
}
