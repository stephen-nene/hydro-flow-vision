
import { Bell, Menu, Settings, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";

interface NavbarProps {
  isEmergencyMode: boolean;
  setIsEmergencyMode: (value: boolean) => void;
}

export function Navbar({ isEmergencyMode, setIsEmergencyMode }: NavbarProps) {
  const [notificationsCount, setNotificationsCount] = useState(3);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className={`sticky top-0 z-50 w-full border-b ${isEmergencyMode ? 'bg-black/90 border-water-danger/30' : 'bg-white/90 border-water-light'} backdrop-blur-sm`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center overflow-hidden rounded-full h-8 w-8 bg-water-light">
            <span className="font-semibold text-water-dark">H</span>
          </div>
          <span className={`font-semibold text-xl ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
            Hydro-Flow-Vision
          </span>
        </div>

        {isMobile ? (
          <div className="flex items-center gap-2">
            <DropdownMenu open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="md:hidden"
                >
                  <Menu className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className={`w-64 p-2 ${isEmergencyMode ? 'bg-black text-white border-water-danger/30' : 'bg-white text-gray-800 border-water-light'}`}
                style={{ maxHeight: '90vh', overflowY: 'auto' }}
              >
                <div className="mb-3 px-2">
                  <ToggleGroup type="single" value={isEmergencyMode ? "emergency" : "clean"} 
                    onValueChange={(value) => {
                      if (value === "emergency" || value === "clean") {
                        setIsEmergencyMode(value === "emergency");
                      }
                    }}
                    className="w-full flex justify-center"
                  >
                    <ToggleGroupItem value="clean" aria-label="Clean Mode" className="flex-1 data-[state=on]:bg-water-light data-[state=on]:text-water-dark">
                      Clean Mode
                    </ToggleGroupItem>
                    <ToggleGroupItem value="emergency" aria-label="Emergency Mode" className="flex-1 data-[state=on]:bg-water-danger data-[state=on]:text-white">
                      Emergency Mode
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex justify-between items-center px-2 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Bell className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
                    <span className={`text-sm ${isEmergencyMode ? 'text-gray-400' : 'text-gray-600'}`}>Notifications</span>
                  </div>
                  {notificationsCount > 0 && (
                    <span className="bg-water-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationsCount}
                    </span>
                  )}
                </div>
                
                <div className="flex flex-col w-full">
                  <Link to="/" onClick={() => setIsMenuOpen(false)}>
                    <DropdownMenuItem className={`${isEmergencyMode ? 'hover:bg-gray-800' : 'hover:bg-water-light/50'}`}>
                      Dashboard
                    </DropdownMenuItem>
                  </Link>
                  
                  <Link to="/water-samples" onClick={() => setIsMenuOpen(false)}>
                    <DropdownMenuItem className={`${isEmergencyMode ? 'hover:bg-gray-800' : 'hover:bg-water-light/50'}`}>
                      Water Samples
                    </DropdownMenuItem>
                  </Link>
                  
                  <Link to="/treatment-simulator" onClick={() => setIsMenuOpen(false)}>
                    <DropdownMenuItem className={`${isEmergencyMode ? 'hover:bg-gray-800' : 'hover:bg-water-light/50'}`}>
                      Treatment Simulator
                    </DropdownMenuItem>
                  </Link>
                  
                  <Link to="/reports" onClick={() => setIsMenuOpen(false)}>
                    <DropdownMenuItem className={`${isEmergencyMode ? 'hover:bg-gray-800' : 'hover:bg-water-light/50'}`}>
                      AI Reports
                    </DropdownMenuItem>
                  </Link>
                  
                  <Link to="/ai-chatbot" onClick={() => setIsMenuOpen(false)}>
                    <DropdownMenuItem className={`${isEmergencyMode ? 'hover:bg-gray-800' : 'hover:bg-water-light/50'}`}>
                      AI Chatbot
                    </DropdownMenuItem>
                  </Link>
                </div>
                
                <div className="border-t border-gray-200 dark:border-gray-700 mt-2 pt-2 flex justify-between items-center px-2">
                  <div className="flex items-center gap-2">
                    <Settings className={isEmergencyMode ? "text-gray-400" : "text-gray-600"} />
                    <span className={`text-sm ${isEmergencyMode ? 'text-gray-400' : 'text-gray-600'}`}>Settings</span>
                  </div>
                  
                  <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>WE</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <ToggleGroup type="single" value={isEmergencyMode ? "emergency" : "clean"} onValueChange={(value) => {
              if (value === "emergency" || value === "clean") {
                setIsEmergencyMode(value === "emergency");
              }
            }}>
              <ToggleGroupItem value="clean" aria-label="Clean Mode" className="data-[state=on]:bg-water-light data-[state=on]:text-water-dark">
                Clean Mode
              </ToggleGroupItem>
              <ToggleGroupItem value="emergency" aria-label="Emergency Mode" className="data-[state=on]:bg-water-danger data-[state=on]:text-white">
                Emergency Mode
              </ToggleGroupItem>
            </ToggleGroup>

            <div className="relative">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
                {notificationsCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-water-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {notificationsCount}
                  </span>
                )}
              </Button>
            </div>

            <Button variant="ghost" size="icon">
              <Settings className={isEmergencyMode ? "text-gray-400" : "text-gray-600"} />
            </Button>

            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" />
              <AvatarFallback>WE</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}
