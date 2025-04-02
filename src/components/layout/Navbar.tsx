
import { Bell, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState } from "react";

interface NavbarProps {
  isEmergencyMode: boolean;
  setIsEmergencyMode: (value: boolean) => void;
}

export function Navbar({ isEmergencyMode, setIsEmergencyMode }: NavbarProps) {
  const [notificationsCount, setNotificationsCount] = useState(3);

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
      </div>
    </div>
  );
}
