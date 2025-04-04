
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const Settings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const settingsCategories = [
    {
      id: "account",
      title: "Account Settings",
      description: "Manage your account information and preferences",
      icon: "👤",
      route: "/settings/account"
    },
    {
      id: "notifications",
      title: "Notification Preferences",
      description: "Control how and when you receive alerts and notifications",
      icon: "🔔",
      route: "/settings/notifications"
    },
    {
      id: "appearance",
      title: "Appearance",
      description: "Customize how the application looks and feels",
      icon: "🎨",
      route: "/settings/appearance"
    },
    {
      id: "security",
      title: "Security & Privacy",
      description: "Manage your password, two-factor authentication, and privacy settings",
      icon: "🔒",
      route: "/settings/security"
    },
    {
      id: "integrations",
      title: "Integrations",
      description: "Connect with other systems and manage API access",
      icon: "🔌",
      route: "/settings/integrations"
    },
    {
      id: "data",
      title: "Data Management",
      description: "Control your data, exports, and sample management policies",
      icon: "💾",
      route: "/settings/data"
    },
    {
      id: "help",
      title: "Help & Documentation",
      description: "Access support resources and documentation",
      icon: "❓",
      route: "/settings/help"
    }
  ];

  const navigateToSetting = (route: string) => {
    navigate(route);
    toast({
      title: "Navigating to settings",
      description: "Opening settings page..."
    });
  };

  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'emergency-mode' : ''}`}>
      <Navbar isEmergencyMode={isEmergencyMode} setIsEmergencyMode={setIsEmergencyMode} />
      <div className="flex">
        {!isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
        <main className="flex-1 p-4 md:p-6 max-w-full overflow-x-hidden">
          <Breadcrumb className="mb-4 md:mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings">
                  <SettingsIcon className="h-4 w-4 mr-1" />
                  Settings
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              System Settings
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Configure and customize your Hydra platform experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {settingsCategories.map((category) => (
              <Card 
                key={category.id}
                className={`h-full cursor-pointer transition-all duration-300 hover:shadow-md ${
                  isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white border-water-light/80'
                }`}
                onClick={() => navigateToSetting(category.route)}
              >
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div>
                      <CardTitle className="text-xl">{category.title}</CardTitle>
                      <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                        {category.description}
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="flex justify-end">
                  <Button variant="outline">
                    Configure
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default Settings;
