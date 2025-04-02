
import { cn } from "@/lib/utils";
import { Home, Droplets, Flask, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceCommandButton } from "@/components/ui/voice-command-button";

interface SidebarProps {
  isEmergencyMode: boolean;
}

export function Sidebar({ isEmergencyMode }: SidebarProps) {
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
        
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50"
        )}>
          <Home className="mr-2 h-4 w-4" />
          Dashboard
        </Button>
        
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50"
        )}>
          <Droplets className="mr-2 h-4 w-4" />
          Water Samples
        </Button>
        
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50"
        )}>
          <Flask className="mr-2 h-4 w-4" />
          Treatment Simulator
        </Button>
        
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50"
        )}>
          <FileText className="mr-2 h-4 w-4" />
          Reports
        </Button>
        
        <Button variant="ghost" className={cn(
          "w-full justify-start",
          isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50"
        )}>
          <MessageCircle className="mr-2 h-4 w-4" />
          AI Chatbot
        </Button>
      </div>
      
      <div className="mt-auto">
        <VoiceCommandButton isEmergencyMode={isEmergencyMode} />
      </div>
    </div>
  );
}
