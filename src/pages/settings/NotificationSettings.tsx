
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Bell, Home, Settings as SettingsIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const NotificationSettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  // Notification preferences state
  const [emailAlerts, setEmailAlerts] = useState({
    criticalAlerts: true,
    weeklyReports: true,
    systemUpdates: false,
    teamMessages: true,
    newSamples: false
  });
  
  const [pushNotifications, setPushNotifications] = useState({
    criticalAlerts: true,
    qualityAlerts: true,
    systemUpdates: true,
    teamMessages: true,
    newSamples: true
  });
  
  const [smsAlerts, setSmsAlerts] = useState({
    criticalAlerts: true,
    qualityAlerts: false,
    systemUpdates: false,
    teamMessages: false,
    newSamples: false
  });

  const handleEmailToggle = (key: keyof typeof emailAlerts) => {
    setEmailAlerts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handlePushToggle = (key: keyof typeof pushNotifications) => {
    setPushNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSmsToggle = (key: keyof typeof smsAlerts) => {
    setSmsAlerts(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated."
    });
  };

  return (
    <div className={`min-h-screen ${isEmergencyMode ? 'emergency-mode' : ''}`}>
      <Navbar isEmergencyMode={isEmergencyMode} setIsEmergencyMode={setIsEmergencyMode} />
      <div className="flex">
        {!isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
        <main className="flex-1 p-4 md:p-6">
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
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings/notifications">
                  <Bell className="h-4 w-4 mr-1" />
                  Notifications
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Notification Preferences
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage how and when you receive updates and alerts
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6">
            <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="px-2 py-1 bg-blue-600">
                    <Bell className="h-4 w-4 mr-1" />
                    Email
                  </Badge>
                  <CardTitle>Email Notifications</CardTitle>
                </div>
                <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                  Control which emails you receive from the system
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Critical Water Quality Alerts</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive immediate alerts for critical water quality issues
                      </p>
                    </div>
                    <Switch 
                      checked={emailAlerts.criticalAlerts} 
                      onCheckedChange={() => handleEmailToggle('criticalAlerts')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Weekly Summary Reports</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive weekly summary reports of all water quality data
                      </p>
                    </div>
                    <Switch 
                      checked={emailAlerts.weeklyReports} 
                      onCheckedChange={() => handleEmailToggle('weeklyReports')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Updates</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive notifications about system updates and maintenance
                      </p>
                    </div>
                    <Switch 
                      checked={emailAlerts.systemUpdates} 
                      onCheckedChange={() => handleEmailToggle('systemUpdates')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Team Messages</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive email notifications for team communications
                      </p>
                    </div>
                    <Switch 
                      checked={emailAlerts.teamMessages} 
                      onCheckedChange={() => handleEmailToggle('teamMessages')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Water Samples</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get notified when new water samples are added to the system
                      </p>
                    </div>
                    <Switch 
                      checked={emailAlerts.newSamples} 
                      onCheckedChange={() => handleEmailToggle('newSamples')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="px-2 py-1 bg-purple-600">
                    <Bell className="h-4 w-4 mr-1" />
                    Push
                  </Badge>
                  <CardTitle>Push Notifications</CardTitle>
                </div>
                <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                  Configure browser and mobile push notifications
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Critical Water Quality Alerts</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive immediate push alerts for critical water quality issues
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications.criticalAlerts} 
                      onCheckedChange={() => handlePushToggle('criticalAlerts')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Quality Parameter Alerts</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get notified when water quality parameters exceed thresholds
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications.qualityAlerts} 
                      onCheckedChange={() => handlePushToggle('qualityAlerts')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Updates</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive push notifications about system updates
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications.systemUpdates} 
                      onCheckedChange={() => handlePushToggle('systemUpdates')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Team Messages</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive push notifications for team communications
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications.teamMessages} 
                      onCheckedChange={() => handlePushToggle('teamMessages')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Water Samples</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get push notifications when new samples are added
                      </p>
                    </div>
                    <Switch 
                      checked={pushNotifications.newSamples} 
                      onCheckedChange={() => handlePushToggle('newSamples')}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <Badge className="px-2 py-1 bg-green-600">
                    <Bell className="h-4 w-4 mr-1" />
                    SMS
                  </Badge>
                  <CardTitle>SMS Notifications</CardTitle>
                </div>
                <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                  Configure text message alerts for critical situations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Critical Water Quality Alerts</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive immediate SMS alerts for critical water quality issues
                      </p>
                    </div>
                    <Switch 
                      checked={smsAlerts.criticalAlerts} 
                      onCheckedChange={() => handleSmsToggle('criticalAlerts')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Quality Parameter Alerts</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get SMS when water quality parameters exceed thresholds
                      </p>
                    </div>
                    <Switch 
                      checked={smsAlerts.qualityAlerts} 
                      onCheckedChange={() => handleSmsToggle('qualityAlerts')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">System Updates</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive SMS about system updates and maintenance
                      </p>
                    </div>
                    <Switch 
                      checked={smsAlerts.systemUpdates} 
                      onCheckedChange={() => handleSmsToggle('systemUpdates')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Team Messages</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Receive SMS for important team communications
                      </p>
                    </div>
                    <Switch 
                      checked={smsAlerts.teamMessages} 
                      onCheckedChange={() => handleSmsToggle('teamMessages')}
                    />
                  </div>
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Water Samples</h3>
                      <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        Get SMS when new water samples are added
                      </p>
                    </div>
                    <Switch 
                      checked={smsAlerts.newSamples} 
                      onCheckedChange={() => handleSmsToggle('newSamples')}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-end">
                <Button onClick={handleSaveChanges}>
                  Save All Notification Preferences
                </Button>
              </CardFooter>
            </Card>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default NotificationSettings;
