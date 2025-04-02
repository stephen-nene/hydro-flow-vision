
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Flask, FileText, Send } from "lucide-react";

interface QuickActionsProps {
  isEmergencyMode: boolean;
}

export function QuickActions({ isEmergencyMode }: QuickActionsProps) {
  return (
    <div className="space-y-4">
      <h2 className={cn(
        "text-xl font-semibold",
        isEmergencyMode ? "text-water-danger" : "text-water-dark"
      )}>
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Button 
          variant="outline" 
          className={cn(
            "h-24 flex flex-col items-center justify-center space-y-1 text-sm",
            isEmergencyMode 
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}
        >
          <Flask className={isEmergencyMode ? "h-6 w-6 text-water-light" : "h-6 w-6 text-water-dark"} />
          <span>Run Analysis</span>
        </Button>

        <Button 
          variant="outline" 
          className={cn(
            "h-24 flex flex-col items-center justify-center space-y-1 text-sm",
            isEmergencyMode 
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}
        >
          <FileText className={isEmergencyMode ? "h-6 w-6 text-water-light" : "h-6 w-6 text-water-dark"} />
          <span>Generate Report</span>
        </Button>

        <Button 
          variant="outline" 
          className={cn(
            "h-24 flex flex-col items-center justify-center space-y-1 text-sm",
            isEmergencyMode 
              ? "bg-gray-800 border-gray-700 text-white hover:bg-gray-700" 
              : "bg-white border-gray-200 hover:bg-gray-50"
          )}
        >
          <Send className={isEmergencyMode ? "h-6 w-6 text-water-light" : "h-6 w-6 text-water-dark"} />
          <span>Notify Team</span>
        </Button>

        <Button 
          className={cn(
            "h-24 flex flex-col items-center justify-center space-y-1 text-sm",
            isEmergencyMode 
              ? "bg-water-danger hover:bg-water-danger/90" 
              : "bg-water-dark hover:bg-water-dark/90"
          )}
        >
          <AlertTriangle className="h-6 w-6" />
          <span>{isEmergencyMode ? "Emergency Response" : "Treatment Options"}</span>
        </Button>
      </div>
    </div>
  );
}
