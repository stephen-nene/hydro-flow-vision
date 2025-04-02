
import { cn } from "@/lib/utils";
import { Home, Droplets, TestTube, FileText, MessageCircle, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VoiceCommandButton } from "@/components/ui/voice-command-button";
import { Link, useLocation } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useState } from "react";

interface SidebarProps {
  isEmergencyMode: boolean;
}

export function Sidebar({ isEmergencyMode }: SidebarProps) {
  const location = useLocation();
  const isMobile = useIsMobile();
  const [open, setOpen] = useState(false);
  
  const isActivePath = (path: string) => {
    return location.pathname === path;
  };
  
  const navigationItems = [
    {
      name: "Dashboard",
      path: "/",
      icon: Home
    },
    {
      name: "Water Samples",
      path: "/water-samples",
      icon: Droplets
    },
    {
      name: "Treatment Simulator",
      path: "/treatment-simulator",
      icon: TestTube
    },
    {
      name: "Reports",
      path: "/reports",
      icon: FileText
    },
    {
      name: "AI Chatbot",
      path: "/ai-chatbot",
      icon: MessageCircle
    }
  ];

  const SidebarContent = () => (
    <div className={cn(
      "w-full h-full flex flex-col p-4",
      isEmergencyMode ? "bg-black/90 text-white" : "bg-white text-gray-800"
    )}>
      <div className="space-y-2">
        <h2 className={cn(
          "text-lg font-semibold mb-4",
          isEmergencyMode ? "text-water-danger" : "text-water-dark"
        )}>
          Navigation
        </h2>
        
        {navigationItems.map((item) => (
          <Button 
            key={item.path}
            variant="ghost" 
            className={cn(
              "w-full justify-start",
              isEmergencyMode ? "text-white hover:bg-gray-800" : "text-gray-700 hover:bg-water-light/50",
              isActivePath(item.path) && (isEmergencyMode ? "bg-gray-800" : "bg-water-light/50")
            )}
            onClick={() => isMobile && setOpen(false)}
            asChild
          >
            <Link to={item.path}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.name}
            </Link>
          </Button>
        ))}
      </div>
      
      <div className="mt-auto">
        <VoiceCommandButton isEmergencyMode={isEmergencyMode} />
      </div>
    </div>
  );
  
  // For mobile, we show a sheet that slides in from the left
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild className="fixed bottom-4 left-4 z-40 md:hidden">
          <Button 
            size="icon" 
            className={cn(
              "rounded-full shadow-lg h-12 w-12",
              isEmergencyMode ? "bg-water-danger text-white" : "bg-water-dark text-white"
            )}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-[240px]">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    );
  }
  
  // For desktop, we show the regular sidebar
  return (
    <div className={cn(
      "w-[240px] h-[calc(100vh-4rem)] flex flex-col p-4 border-r",
      isEmergencyMode ? "bg-black/90 border-water-danger/30" : "bg-white border-water-light/80"
    )}>
      <SidebarContent />
    </div>
  );
}
