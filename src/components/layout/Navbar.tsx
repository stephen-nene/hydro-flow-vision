
import { Bell, Menu, Settings, Sun, Moon, User, LogOut, HelpCircle, ChevronDown, Shield, FileText, AlertTriangle, Database, Activity, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useState, useEffect } from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useToast } from "@/hooks/use-toast";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuPortal
} from "@/components/ui/dropdown-menu";
import { Link } from "react-router-dom";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

interface NavbarProps {
  isEmergencyMode: boolean;
  setIsEmergencyMode: (value: boolean) => void;
}

interface NotificationType {
  id: string;
  title: string;
  description: string;
  time: string;
  read: boolean;
  priority: 'low' | 'medium' | 'high';
  type: 'system' | 'alert' | 'update' | 'maintenance' | 'security';
}

export function Navbar({ isEmergencyMode, setIsEmergencyMode }: NavbarProps) {
  const [notificationsCount, setNotificationsCount] = useState(5);
  const [notifications, setNotifications] = useState<NotificationType[]>([
    {
      id: '1',
      title: 'Critical Water Quality Alert',
      description: 'High toxicity levels detected in Downtown reservoir. Immediate action required.',
      time: '10 minutes ago',
      read: false,
      priority: 'high',
      type: 'alert'
    },
    {
      id: '2',
      title: 'System Update Complete',
      description: 'Hydra platform has been updated to version 2.3.0 with new analytics features.',
      time: '1 hour ago',
      read: false,
      priority: 'medium',
      type: 'system'
    },
    {
      id: '3',
      title: 'New Water Sample Added',
      description: 'A new water sample from Westside Plant has been added to the database.',
      time: '3 hours ago',
      read: false,
      priority: 'low',
      type: 'update'
    },
    {
      id: '4',
      title: 'Security Alert',
      description: 'Unusual login activity detected from unknown IP address. Please verify account security.',
      time: '5 hours ago',
      read: false,
      priority: 'high',
      type: 'security'
    },
    {
      id: '5',
      title: 'Scheduled Maintenance',
      description: 'System maintenance scheduled for tomorrow at 2:00 AM. Expected downtime: 30 minutes.',
      time: '12 hours ago',
      read: false,
      priority: 'medium',
      type: 'maintenance'
    }
  ]);
  const isMobile = useIsMobile();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [activeProfileTab, setActiveProfileTab] = useState("account");
  const [securityDialogOpen, setSecurityDialogOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Update notification count whenever notifications change
    setNotificationsCount(notifications.filter(n => !n.read).length);
  }, [notifications]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    toast({
      title: "Notifications cleared",
      description: "All notifications have been marked as read",
    });
  };

  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const clearNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast({
      description: "Notification removed",
    });
  };

  const getPriorityColor = (priority: 'low' | 'medium' | 'high') => {
    switch (priority) {
      case 'high': return 'bg-water-danger/10 text-water-danger border-water-danger/30';
      case 'medium': return 'bg-amber-500/10 text-amber-600 border-amber-500/30';
      case 'low': return 'bg-green-500/10 text-green-600 border-green-500/30';
    }
  };

  const getTypeIcon = (type: 'system' | 'alert' | 'update' | 'maintenance' | 'security') => {
    switch (type) {
      case 'alert': return <AlertTriangle className="h-4 w-4 text-water-danger" />;
      case 'system': return <Settings className="h-4 w-4 text-blue-500" />;
      case 'update': return <ArrowUpRight className="h-4 w-4 text-green-500" />;
      case 'maintenance': return <Activity className="h-4 w-4 text-amber-500" />;
      case 'security': return <Shield className="h-4 w-4 text-purple-500" />;
    }
  };

  const handleNotificationAction = (notificationId: string, action: 'view' | 'dismiss' | 'share') => {
    switch (action) {
      case 'view':
        const notification = notifications.find(n => n.id === notificationId);
        if (notification) {
          markAsRead(notificationId);
          toast({
            title: notification.title,
            description: notification.description,
          });
        }
        break;
      case 'dismiss':
        clearNotification(notificationId);
        break;
      case 'share':
        toast({
          title: "Notification Shared",
          description: "This alert has been shared with your team",
        });
        break;
    }
  };

  const handleChangePassword = () => {
    toast({
      title: "Password Changed",
      description: "Your password has been updated successfully",
    });
    setSecurityDialogOpen(false);
  };

  const handleLogout = () => {
    toast({
      title: "Logged Out",
      description: "You have been logged out successfully",
    });
  };

  const handleSaveSettings = (tab: string) => {
    toast({
      title: "Settings Saved",
      description: `Your ${tab} settings have been updated successfully`,
    });
  };

  return (
    <div className={`sticky top-0 z-50 w-full border-b ${isEmergencyMode ? 'bg-black/90 border-water-danger/30' : 'bg-white/90 border-water-light'} backdrop-blur-sm`}>
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center overflow-hidden rounded-full h-8 w-8 bg-water-dark">
            <span className="font-semibold text-white">H</span>
          </div>
          <span className={`font-semibold text-xl ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
            Hydra
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
                  <ToggleGroup type="single" value={isEmergencyMode ? "dark" : "light"} 
                    onValueChange={(value) => {
                      if (value === "dark" || value === "light") {
                        setIsEmergencyMode(value === "dark");
                      }
                    }}
                    className="w-full flex justify-center"
                  >
                    <ToggleGroupItem value="light" aria-label="Light Mode" className="flex-1 data-[state=on]:bg-water-light data-[state=on]:text-water-dark">
                      <Sun className="h-4 w-4 mr-2" />
                      Light Mode
                    </ToggleGroupItem>
                    <ToggleGroupItem value="dark" aria-label="Dark Mode" className="flex-1 data-[state=on]:bg-water-danger data-[state=on]:text-white">
                      <Moon className="h-4 w-4 mr-2" />
                      Dark Mode
                    </ToggleGroupItem>
                  </ToggleGroup>
                </div>
                
                <div className="flex justify-between items-center px-2 py-3 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2">
                    <Bell className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
                    <span className={`text-sm ${isEmergencyMode ? 'text-gray-400' : 'text-gray-600'}`}>Notifications</span>
                  </div>
                  {notificationsCount > 0 && (
                    <Badge variant="destructive" className="bg-water-danger">
                      {notificationsCount}
                    </Badge>
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
                  
                  <Avatar onClick={() => {
                    setIsMenuOpen(false);
                    setProfileDialogOpen(true);
                  }}>
                    <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-6">
            <ToggleGroup type="single" value={isEmergencyMode ? "dark" : "light"} onValueChange={(value) => {
              if (value === "dark" || value === "light") {
                setIsEmergencyMode(value === "dark");
              }
            }}>
              <ToggleGroupItem value="light" aria-label="Light Mode" className="data-[state=on]:bg-water-light data-[state=on]:text-water-dark">
                <Sun className="h-4 w-4 mr-2" />
                Light Mode
              </ToggleGroupItem>
              <ToggleGroupItem value="dark" aria-label="Dark Mode" className="data-[state=on]:bg-water-danger data-[state=on]:text-white">
                <Moon className="h-4 w-4 mr-2" />
                Dark Mode
              </ToggleGroupItem>
            </ToggleGroup>

            <DropdownMenu open={notificationsOpen} onOpenChange={setNotificationsOpen}>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className={isEmergencyMode ? "text-water-danger" : "text-water-dark"} />
                  {notificationsCount > 0 && (
                    <span className="absolute -top-1 -right-1 bg-water-danger text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {notificationsCount}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80" align="end">
                <DropdownMenuLabel className="font-normal">
                  <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-lg">Notifications</h2>
                    <Button variant="ghost" size="sm" onClick={markAllAsRead} className="h-8 text-xs">
                      Mark all as read
                    </Button>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-[300px] overflow-y-auto">
                  {notifications.length > 0 ? (
                    notifications.map((notification) => (
                      <div key={notification.id} className="px-2 py-2 hover:bg-gray-100 dark:hover:bg-gray-800">
                        <div className="flex items-start gap-2">
                          <div className="mt-1">{getTypeIcon(notification.type)}</div>
                          <div className="flex-1 min-w-0">
                            <div className="flex justify-between items-start">
                              <h4 className={`font-medium text-sm ${notification.read ? 'text-gray-600' : 'text-gray-900'}`}>
                                {notification.title}
                              </h4>
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                className="h-6 w-6 p-0 text-gray-500 hover:text-gray-700"
                                onClick={() => clearNotification(notification.id)}
                              >
                                <span className="sr-only">Dismiss</span>
                                <ChevronDown className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-gray-500 mb-1 truncate">{notification.description}</p>
                            <div className="flex justify-between items-center">
                              <span className="text-xs text-gray-400">{notification.time}</span>
                              <Badge variant="outline" className={`text-xs ${getPriorityColor(notification.priority)}`}>
                                {notification.priority}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-1 mt-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs flex-1"
                            onClick={() => handleNotificationAction(notification.id, 'view')}
                          >
                            View
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs flex-1"
                            onClick={() => handleNotificationAction(notification.id, 'share')}
                          >
                            Share
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="h-7 text-xs flex-1"
                            onClick={() => handleNotificationAction(notification.id, 'dismiss')}
                          >
                            Dismiss
                          </Button>
                        </div>
                        <DropdownMenuSeparator className="my-1" />
                      </div>
                    ))
                  ) : (
                    <div className="py-4 text-center text-gray-500">
                      <p>No new notifications</p>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/notifications" className="w-full text-center">
                    View all notifications
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className={isEmergencyMode ? "text-gray-400" : "text-gray-600"} />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Settings</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem onClick={() => {
                    setProfileDialogOpen(true);
                    setActiveProfileTab("account");
                  }}>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem onClick={() => {
                          setProfileDialogOpen(true);
                          setActiveProfileTab("preferences");
                          toast({
                            title: "Notification Settings",
                            description: "Configure your email alert preferences here",
                          });
                        }}>
                          <span>Email Alerts</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => {
                          setProfileDialogOpen(true);
                          setActiveProfileTab("preferences");
                          toast({
                            title: "Notification Settings",
                            description: "Configure your push notification preferences here",
                          });
                        }}>
                          <span>Push Notifications</span>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => {
                          setProfileDialogOpen(true);
                          setActiveProfileTab("preferences");
                        }}>
                          <span>Notification Settings</span>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem onClick={() => {
                    setProfileDialogOpen(true);
                    setActiveProfileTab("preferences");
                  }}>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>System Preferences</span>
                  </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => {
                  toast({
                    title: "Help & Documentation",
                    description: "Opening documentation in a new tab",
                  });
                  window.open("#", "_blank");
                }}>
                  <HelpCircle className="mr-2 h-4 w-4" />
                  <span>Help & Documentation</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-water-danger" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Avatar onClick={() => setProfileDialogOpen(true)} className="cursor-pointer hover:opacity-80 transition-opacity">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
      
      {/* User Profile Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>User Profile</DialogTitle>
            <DialogDescription>
              Manage your account and preferences
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex flex-col items-center py-4">
            <Avatar className="h-24 w-24 mb-4 border-4 border-white shadow-md">
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <h2 className="text-xl font-bold">John Doe</h2>
            <p className="text-gray-500">Water Quality Specialist</p>
            <p className="text-sm text-gray-500 mt-1">john.doe@hydra.com</p>
            <div className="flex gap-2 mt-3">
              <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                Administrator
              </Badge>
              <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                Certified Analyst
              </Badge>
            </div>
          </div>
          
          <Tabs defaultValue={activeProfileTab} value={activeProfileTab} onValueChange={setActiveProfileTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="account">Account</TabsTrigger>
              <TabsTrigger value="preferences">Preferences</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
            </TabsList>
            <TabsContent value="account" className="mt-4">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input id="fullName" defaultValue="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" defaultValue="john.doe@hydra.com" type="email" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">Role</Label>
                    <Input id="role" defaultValue="Water Quality Specialist" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="department">Department</Label>
                    <Input id="department" defaultValue="Quality Assessment" />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <textarea 
                    id="bio"
                    rows={3}
                    className="w-full min-h-[80px] rounded-md border border-gray-300 p-2 text-sm"
                    defaultValue="Water quality specialist with over 8 years of experience in environmental monitoring and compliance. Certified in advanced water treatment technologies."
                  />
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('account')}
                  >
                    Save Changes
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="preferences" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="darkMode">Dark Mode</Label>
                      <p className="text-xs text-gray-500">Use dark theme for the application</p>
                    </div>
                    <Switch 
                      id="darkMode" 
                      checked={isEmergencyMode}
                      onCheckedChange={setIsEmergencyMode}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="emailNotifs">Email Notifications</Label>
                      <p className="text-xs text-gray-500">Receive alerts via email</p>
                    </div>
                    <Switch id="emailNotifs" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="pushNotifs">Push Notifications</Label>
                      <p className="text-xs text-gray-500">Receive alerts on your device</p>
                    </div>
                    <Switch id="pushNotifs" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label htmlFor="voiceCommands">Voice Commands</Label>
                      <p className="text-xs text-gray-500">Enable voice control features</p>
                    </div>
                    <Switch id="voiceCommands" defaultChecked />
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button 
                    onClick={() => handleSaveSettings('preferences')}
                  >
                    Save Preferences
                  </Button>
                </div>
              </div>
            </TabsContent>
            <TabsContent value="security" className="mt-4">
              <div className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Password</h3>
                      <p className="text-sm text-gray-500">Last changed 2 months ago</p>
                    </div>
                    <Button variant="outline" size="sm" onClick={() => setSecurityDialogOpen(true)}>
                      Change Password
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <div>
                      <h3 className="text-sm font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500">Enhanced security for your account</p>
                    </div>
                    <Switch id="2fa" defaultChecked />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Active Sessions</h3>
                  <div className="rounded-md border border-gray-200 p-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Current Session</p>
                        <p className="text-xs text-gray-500">Chrome • Windows • Boston, US</p>
                        <p className="text-xs text-gray-500">Started 1 hour ago</p>
                      </div>
                      <Badge>Active</Badge>
                    </div>
                    <div className="h-px bg-gray-200 my-2"></div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Mobile App</p>
                        <p className="text-xs text-gray-500">iOS • iPhone • Boston, US</p>
                        <p className="text-xs text-gray-500">Started 3 days ago</p>
                      </div>
                      <Button variant="outline" size="sm" className="h-7 text-xs">
                        Log Out
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="pt-4 flex justify-end">
                  <Button
                    variant="destructive"
                    onClick={handleLogout}
                  >
                    Log Out of All Devices
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setProfileDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => handleSaveSettings(activeProfileTab)}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Change Password Dialog */}
      <Dialog open={securityDialogOpen} onOpenChange={setSecurityDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password and new password below
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" />
            </div>
            
            <div className="space-y-2">
              <h4 className="text-sm font-medium">Password Requirements:</h4>
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                  <p className="text-xs text-gray-600">At least 8 characters</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                  <p className="text-xs text-gray-600">Contains uppercase letters</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                  <p className="text-xs text-gray-600">Contains lowercase letters</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-green-50 text-green-700">✓</Badge>
                  <p className="text-xs text-gray-600">Contains at least one number</p>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter className="flex justify-between">
            <Button variant="outline" onClick={() => setSecurityDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleChangePassword}>
              Update Password
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
