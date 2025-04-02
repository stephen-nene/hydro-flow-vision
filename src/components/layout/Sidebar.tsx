
import { cn } from "@/lib/utils";
import { Home, Droplets, TestTube, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceCommandButton } from "@/components/ui/voice-command-button";
import { Link, useLocation } from "react-router-dom";

interface SidebarProps {
  isEmergencyMode: boolean;
}

export function Sidebar({ isEmergencyMode }: SidebarProps) {
  const location = useLocation();
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  return (
    <div className={cn(
      "w-[240px] h-[calc(100vh-4rem)] flex flex-col p-4 border-r",
      isEmergencyMode ? "bg-black/90 border-water-danger/30" : "bg-white border-water-light/80"
    )}>
      <div className="space-y-2">
        <h2 className={cn(
          "text-lg font-semibold mb-4",
          isEmergencyMode ? "text-water-danger" : "text-water-dark"
        )}>
          Navigation
        </h2>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start",
            isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
            isActivePath("/") && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
          )}
          asChild
        >
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start",
            isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
            isActivePath("/water-samples") && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
          )}
          asChild
        >
          <Link to="/water-samples">
            <Droplets className="mr-2 h-4 w-4" />
            Water Samples
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start",
            isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
            isActivePath("/treatment-simulator") && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
          )}
          asChild
        >
          <Link to="/treatment-simulator">
            <TestTube className="mr-2 h-4 w-4" />
            Treatment Simulator
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start",
            isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
            isActivePath("/reports") && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
          )}
          asChild
        >
          <Link to="/reports">
            <FileText className="mr-2 h-4 w-4" />
            Reports
          </Link>
        </Button>
        
        <Button 
          variant="ghost" 
          className={cn(
            "w-full justify-start",
            isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
            isActivePath("/ai-chatbot") && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
          )}
          asChild
        >
          <Link to="/ai-chatbot">
            <MessageCircle className="mr-2 h-4 w-4" />
            AI Chatbot
          </Link>
        </Button>
      </div>
      
      <div className="mt-auto">
        <VoiceCommandButton isEmergencyMode={isEmergencyMode} />
      </div>
    </div>
  );
}
