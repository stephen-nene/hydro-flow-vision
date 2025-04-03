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
                    <Link to="/settings" onClick={() => setIsMenuOpen(false)}>
                      <span className={`text-sm ${isEmergencyMode ? 'text-gray-400' : 'text-gray-600'}`}>Settings</span>
                    </Link>
                  </div>
                  
                  <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                    <Avatar>
                      <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                  </Link>
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
                  <Link to="/settings/notifications" className="w-full text-center">
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
                  <DropdownMenuItem asChild>
                    <Link to="/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Bell className="mr-2 h-4 w-4" />
                      <span>Notifications</span>
                    </DropdownMenuSubTrigger>
                    <DropdownMenuPortal>
                      <DropdownMenuSubContent>
                        <DropdownMenuItem asChild>
                          <Link to="/settings/notifications">
                            <span>Email Alerts</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link to="/settings/notifications">
                            <span>Push Notifications</span>
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link to="/settings/notifications">
                            <span>Notification Settings</span>
                          </Link>
                        </DropdownMenuItem>
                      </DropdownMenuSubContent>
                    </DropdownMenuPortal>
                  </DropdownMenuSub>
                  <DropdownMenuItem asChild>
                    <Link to="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>System Preferences</span>
                    </Link>
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

            <Avatar 
              className="cursor-pointer hover:opacity-80 transition-opacity"
              onClick={() => {
                window.location.href = "/profile";
              }}
            >
              <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        )}
      </div>
    </div>
  );
}
