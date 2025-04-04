
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Home, 
  Settings as SettingsIcon, 
  Database, 
  Layers, 
  Cable, 
  Zap, 
  BarChart, 
  FileText,
  Upload,
  Share2,
  RefreshCw,
  Check,
  X,
  AlertTriangle,
  PlusCircle,
  Key,
  Download,
  ExternalLink,
  Github,
  Eye,
  EyeOff
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Mock integration data
interface Integration {
  id: string;
  name: string;
  description: string;
  icon: string;
  status: 'connected' | 'disconnected' | 'pending';
  category: 'data' | 'analytics' | 'erp' | 'iot' | 'reporting';
  lastSync?: string;
  apiKey?: string;
}

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  expires: string;
  scopes: string[];
}

const IntegrationsSettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedIntegration, setSelectedIntegration] = useState<Integration | null>(null);
  const [showApiKey, setShowApiKey] = useState(false);
  
  // Mocked integrations data
  const integrations: Integration[] = [
    {
      id: "1",
      name: "Salesforce",
      description: "Connect customer and water quality data with your CRM",
      icon: "https://upload.wikimedia.org/wikipedia/commons/f/f9/Salesforce.com_logo.svg",
      status: 'connected',
      category: 'erp',
      lastSync: "2025-04-02 16:30:05"
    },
    {
      id: "2",
      name: "SAP ERP",
      description: "Enterprise resource planning system integration",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/59/SAP_2011_logo.svg",
      status: 'disconnected',
      category: 'erp'
    },
    {
      id: "3",
      name: "AWS IoT",
      description: "Connect with AWS IoT platform for device management",
      icon: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg",
      status: 'connected',
      category: 'iot',
      lastSync: "2025-04-03 08:15:22"
    },
    {
      id: "4",
      name: "Tableau",
      description: "Advanced visualization and reporting platform",
      icon: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Tableau_Logo.png",
      status: 'connected',
      category: 'analytics',
      lastSync: "2025-04-03 10:45:15"
    },
    {
      id: "5",
      name: "Power BI",
      description: "Microsoft's business analytics service",
      icon: "https://upload.wikimedia.org/wikipedia/commons/c/cf/New_Power_BI_Logo.svg",
      status: 'disconnected',
      category: 'analytics'
    },
    {
      id: "6",
      name: "ArcGIS",
      description: "Geographic information system for mapping and spatial analytics",
      icon: "https://upload.wikimedia.org/wikipedia/commons/d/df/ArcGIS_logo.png",
      status: 'pending',
      category: 'analytics'
    },
    {
      id: "7",
      name: "Modbus TCP",
      description: "Industrial protocol for connecting to field devices",
      icon: "/placeholder.svg",
      status: 'connected',
      category: 'iot',
      lastSync: "2025-04-03 09:05:43"
    },
    {
      id: "8",
      name: "Google Cloud",
      description: "Cloud services and data storage integration",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/51/Google_Cloud_logo.svg",
      status: 'connected',
      category: 'data',
      lastSync: "2025-04-03 11:30:52"
    },
    {
      id: "9",
      name: "Oracle EBS",
      description: "Oracle E-Business Suite for enterprise operations",
      icon: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      status: 'disconnected',
      category: 'erp'
    },
    {
      id: "10",
      name: "DocuSign",
      description: "Electronic signature and document management",
      icon: "https://upload.wikimedia.org/wikipedia/commons/e/e1/DocuSign_logo.svg",
      status: 'connected',
      category: 'reporting',
      lastSync: "2025-04-02 14:25:10"
    }
  ];
  
  // Mock API keys
  const apiKeys: ApiKey[] = [
    {
      id: "1",
      name: "Production API Key",
      key: "hyd_prod_a1b2c3d4e5f6g7h8i9j0klm",
      created: "2025-01-15",
      expires: "2026-01-15",
      scopes: ["read:samples", "write:samples", "read:analytics"]
    },
    {
      id: "2",
      name: "Test Environment",
      key: "hyd_test_9z8y7x6w5v4u3t2s1r0qpnm",
      created: "2025-02-10",
      expires: "2025-08-10",
      scopes: ["read:samples", "write:samples", "read:analytics", "write:analytics"]
    },
    {
      id: "3",
      name: "Mobile App Key",
      key: "hyd_mobile_j9i8h7g6f5e4d3c2b1a0zyx",
      created: "2025-03-05",
      expires: "2025-09-05", 
      scopes: ["read:samples", "read:analytics"]
    }
  ];
  
  // Filter integrations based on search and category
  const getFilteredIntegrations = (category: string) => {
    return integrations.filter(integration => 
      (integration.category === category || category === 'all') && 
      (integration.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
       integration.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  };
  
  const handleIntegrationClick = (integration: Integration) => {
    setSelectedIntegration(integration);
  };
  
  const handleConnect = (integration: Integration) => {
    toast({
      title: `Connecting to ${integration.name}`,
      description: "Initiating connection process..."
    });
    
    // Simulate connection process
    setTimeout(() => {
      if (integration.id === "6") { // ArcGIS connection fails as an example
        toast({
          title: "Connection Failed",
          description: "Unable to connect to ArcGIS. Check credentials and try again.",
          variant: "destructive"
        });
      } else {
        toast({
          title: "Connection Successful",
          description: `${integration.name} has been connected successfully.`
        });
        
        // Update the integration status
        setSelectedIntegration({
          ...integration,
          status: 'connected',
          lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
        });
      }
    }, 2000);
  };
  
  const handleDisconnect = (integration: Integration) => {
    toast({
      title: `Disconnecting from ${integration.name}`,
      description: "Processing disconnection..."
    });
    
    // Simulate disconnection process
    setTimeout(() => {
      toast({
        title: "Disconnection Successful",
        description: `${integration.name} has been disconnected.`
      });
      
      // Update the integration status
      setSelectedIntegration({
        ...integration,
        status: 'disconnected',
        lastSync: undefined
      });
    }, 1500);
  };
  
  const handleSyncNow = (integration: Integration) => {
    toast({
      title: `Syncing with ${integration.name}`,
      description: "Starting data synchronization..."
    });
    
    // Simulate sync process
    setTimeout(() => {
      toast({
        title: "Sync Completed",
        description: `Data synchronization with ${integration.name} completed successfully.`
      });
      
      // Update last sync time
      setSelectedIntegration({
        ...integration,
        lastSync: new Date().toISOString().slice(0, 19).replace('T', ' ')
      });
    }, 3000);
  };
  
  const handleCreateApiKey = () => {
    toast({
      title: "New API Key Created",
      description: "Your new API key has been generated successfully."
    });
  };
  
  const handleRevokeApiKey = (keyId: string) => {
    toast({
      title: "API Key Revoked",
      description: "The API key has been revoked and is no longer valid."
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
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center">
                  <Cable className="h-4 w-4 mr-1" />
                  Integrations
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Integrations & API
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Connect Hydra with external systems and services
            </p>
          </div>

          <Tabs defaultValue="integrations" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="integrations">
                <Cable className="h-4 w-4 mr-2" />
                System Integrations
              </TabsTrigger>
              <TabsTrigger value="api">
                <Key className="h-4 w-4 mr-2" />
                API Access
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="integrations">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Available Integrations</CardTitle>
                      <CardDescription>Connect with external systems and services</CardDescription>
                      <div className="mt-2">
                        <Input 
                          placeholder="Search integrations..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[400px]">
                        <Accordion type="single" collapsible defaultValue="erp">
                          <AccordionItem value="erp">
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center">
                                <Database className="h-4 w-4 mr-2 text-blue-500" />
                                <span>ERP Systems</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 px-4 pb-2">
                                {getFilteredIntegrations('erp').map(integration => (
                                  <div 
                                    key={integration.id}
                                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedIntegration?.id === integration.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => handleIntegrationClick(integration)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={integration.icon} alt={integration.name} />
                                        <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{integration.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] truncate">{integration.description}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={integration.status === 'connected' ? 'outline' : (integration.status === 'pending' ? 'secondary' : 'destructive')}
                                      className={integration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                    >
                                      {integration.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="analytics">
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center">
                                <BarChart className="h-4 w-4 mr-2 text-purple-500" />
                                <span>Analytics & BI</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 px-4 pb-2">
                                {getFilteredIntegrations('analytics').map(integration => (
                                  <div 
                                    key={integration.id}
                                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedIntegration?.id === integration.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => handleIntegrationClick(integration)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={integration.icon} alt={integration.name} />
                                        <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{integration.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] truncate">{integration.description}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={integration.status === 'connected' ? 'outline' : (integration.status === 'pending' ? 'secondary' : 'destructive')}
                                      className={integration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                    >
                                      {integration.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="iot">
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center">
                                <Zap className="h-4 w-4 mr-2 text-amber-500" />
                                <span>IoT & Devices</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 px-4 pb-2">
                                {getFilteredIntegrations('iot').map(integration => (
                                  <div 
                                    key={integration.id}
                                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedIntegration?.id === integration.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => handleIntegrationClick(integration)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={integration.icon} alt={integration.name} />
                                        <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{integration.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] truncate">{integration.description}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={integration.status === 'connected' ? 'outline' : (integration.status === 'pending' ? 'secondary' : 'destructive')}
                                      className={integration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                    >
                                      {integration.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="data">
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center">
                                <Layers className="h-4 w-4 mr-2 text-green-500" />
                                <span>Data Services</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 px-4 pb-2">
                                {getFilteredIntegrations('data').map(integration => (
                                  <div 
                                    key={integration.id}
                                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedIntegration?.id === integration.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => handleIntegrationClick(integration)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={integration.icon} alt={integration.name} />
                                        <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{integration.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] truncate">{integration.description}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={integration.status === 'connected' ? 'outline' : (integration.status === 'pending' ? 'secondary' : 'destructive')}
                                      className={integration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                    >
                                      {integration.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                          <AccordionItem value="reporting">
                            <AccordionTrigger className="px-4">
                              <div className="flex items-center">
                                <FileText className="h-4 w-4 mr-2 text-red-500" />
                                <span>Reporting & Documentation</span>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-2 px-4 pb-2">
                                {getFilteredIntegrations('reporting').map(integration => (
                                  <div 
                                    key={integration.id}
                                    className={`p-3 border rounded-md cursor-pointer flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 ${selectedIntegration?.id === integration.id ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20' : ''}`}
                                    onClick={() => handleIntegrationClick(integration)}
                                  >
                                    <div className="flex items-center gap-3">
                                      <Avatar className="h-8 w-8">
                                        <AvatarImage src={integration.icon} alt={integration.name} />
                                        <AvatarFallback>{integration.name.charAt(0)}</AvatarFallback>
                                      </Avatar>
                                      <div>
                                        <p className="text-sm font-medium">{integration.name}</p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 max-w-[180px] truncate">{integration.description}</p>
                                      </div>
                                    </div>
                                    <Badge
                                      variant={integration.status === 'connected' ? 'outline' : (integration.status === 'pending' ? 'secondary' : 'destructive')}
                                      className={integration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                    >
                                      {integration.status}
                                    </Badge>
                                  </div>
                                ))}
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        </Accordion>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Custom Integration",
                          description: "Opening custom integration creator..."
                        });
                      }}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add Custom Integration
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  {selectedIntegration ? (
                    <Card>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar className="h-12 w-12">
                              <AvatarImage src={selectedIntegration.icon} alt={selectedIntegration.name} />
                              <AvatarFallback>{selectedIntegration.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="flex items-center gap-2">
                                {selectedIntegration.name}
                                <Badge
                                  variant={selectedIntegration.status === 'connected' ? 'outline' : (selectedIntegration.status === 'pending' ? 'secondary' : 'destructive')}
                                  className={selectedIntegration.status === 'connected' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                                >
                                  {selectedIntegration.status}
                                </Badge>
                              </CardTitle>
                              <CardDescription className="mt-1">{selectedIntegration.description}</CardDescription>
                            </div>
                          </div>
                          
                          {selectedIntegration.status === 'connected' && (
                            <div className="flex items-center text-xs text-gray-500">
                              <RefreshCw className="h-3 w-3 mr-1" />
                              Last Sync: {selectedIntegration.lastSync}
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        {selectedIntegration.status === 'connected' ? (
                          <>
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">Connection Status</h3>
                              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <Card className="bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-700">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center">
                                      <Check className="h-4 w-4 mr-2 text-green-600" />
                                      Connection Active
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">System is connected and working properly</p>
                                  </CardContent>
                                </Card>
                                
                                <Card className="bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-700">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center">
                                      <Share2 className="h-4 w-4 mr-2 text-blue-600" />
                                      Data Flow
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Bi-directional data transfer enabled</p>
                                  </CardContent>
                                </Card>
                                
                                <Card className="bg-purple-50 dark:bg-purple-900/10 border-purple-200 dark:border-purple-700">
                                  <CardHeader className="pb-2">
                                    <CardTitle className="text-sm flex items-center">
                                      <Zap className="h-4 w-4 mr-2 text-purple-600" />
                                      Permissions
                                    </CardTitle>
                                  </CardHeader>
                                  <CardContent className="pt-0">
                                    <p className="text-xs text-gray-600 dark:text-gray-400">Read-Write access configured</p>
                                  </CardContent>
                                </Card>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">Integration Settings</h3>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Auto-Sync</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Automatically sync data on a schedule</p>
                                  </div>
                                  <Switch defaultChecked id="auto-sync" />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Conflict Resolution</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">How to handle data conflicts</p>
                                  </div>
                                  <select className="border rounded-md p-1 text-sm">
                                    <option>Hydra System Wins</option>
                                    <option>External System Wins</option>
                                    <option>Newest Wins</option>
                                    <option>Manual Resolution</option>
                                  </select>
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Sync Frequency</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">How often to sync data</p>
                                  </div>
                                  <select className="border rounded-md p-1 text-sm">
                                    <option>Every 15 minutes</option>
                                    <option>Every hour</option>
                                    <option>Every 6 hours</option>
                                    <option>Daily</option>
                                  </select>
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-4">
                              <h3 className="text-lg font-medium">Data Mapping</h3>
                              <div className="border rounded-md overflow-hidden">
                                <table className="min-w-full divide-y divide-gray-200">
                                  <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Hydra Field</th>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">External Field</th>
                                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Transform</th>
                                    </tr>
                                  </thead>
                                  <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                                    <tr>
                                      <td className="px-4 py-2 text-sm">waterSample.id</td>
                                      <td className="px-4 py-2 text-sm">sample_uniq_id</td>
                                      <td className="px-4 py-2 text-sm">None</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-sm">waterSample.location</td>
                                      <td className="px-4 py-2 text-sm">sampling_location</td>
                                      <td className="px-4 py-2 text-sm">None</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-sm">waterSample.metrics.ph</td>
                                      <td className="px-4 py-2 text-sm">ph_reading</td>
                                      <td className="px-4 py-2 text-sm">Round(2)</td>
                                    </tr>
                                    <tr>
                                      <td className="px-4 py-2 text-sm">waterSample.contaminants</td>
                                      <td className="px-4 py-2 text-sm">contaminants_array</td>
                                      <td className="px-4 py-2 text-sm">JSON Transform</td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                              <Button variant="outline" size="sm" className="ml-auto block">
                                Edit Data Mapping
                              </Button>
                            </div>
                          </>
                        ) : selectedIntegration.status === 'pending' ? (
                          <div className="space-y-4">
                            <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-md p-4 flex items-start gap-3">
                              <AlertTriangle className="h-5 w-5 text-amber-500 mt-0.5" />
                              <div>
                                <h3 className="font-medium text-amber-800 dark:text-amber-300">Integration Pending</h3>
                                <p className="text-sm text-amber-700 dark:text-amber-400 mt-1">
                                  This integration is in the process of connecting. Please check back later or contact your system administrator for assistance.
                                </p>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <h3 className="text-lg font-medium">Connection Details</h3>
                              
                              <div className="space-y-3">
                                <div className="space-y-1">
                                  <Label htmlFor="api-endpoint">API Endpoint</Label>
                                  <Input id="api-endpoint" placeholder="https://api.example.com/v1" />
                                </div>
                                
                                <div className="space-y-1">
                                  <Label htmlFor="api-key">API Key/Client ID</Label>
                                  <Input id="api-key" placeholder="Enter API key or client ID" />
                                </div>
                                
                                <div className="space-y-1">
                                  <Label htmlFor="api-secret">API Secret/Client Secret</Label>
                                  <Input id="api-secret" type="password" placeholder="Enter API secret or client secret" />
                                </div>
                              </div>
                            </div>
                            
                            <div className="space-y-2">
                              <h3 className="text-lg font-medium">Data Access Permissions</h3>
                              
                              <div className="space-y-3">
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Read Water Samples</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow reading water sample data</p>
                                  </div>
                                  <Switch defaultChecked id="perm-read-samples" />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Write Water Samples</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow creating/updating water samples</p>
                                  </div>
                                  <Switch id="perm-write-samples" />
                                </div>
                                
                                <div className="flex items-center justify-between">
                                  <div className="space-y-0.5">
                                    <Label>Read Analytics</Label>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">Allow reading analytics data</p>
                                  </div>
                                  <Switch defaultChecked id="perm-read-analytics" />
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        {selectedIntegration.status === 'connected' ? (
                          <>
                            <Button variant="outline" onClick={() => handleDisconnect(selectedIntegration)}>
                              Disconnect
                            </Button>
                            <div className="flex gap-2">
                              <Button variant="outline" onClick={() => {
                                toast({
                                  title: "Opening Configuration",
                                  description: "Opening advanced integration settings..."
                                });
                              }}>
                                Configure
                              </Button>
                              <Button onClick={() => handleSyncNow(selectedIntegration)}>
                                Sync Now
                              </Button>
                            </div>
                          </>
                        ) : (
                          <>
                            <Button variant="outline" onClick={() => setSelectedIntegration(null)}>
                              Cancel
                            </Button>
                            <Button onClick={() => handleConnect(selectedIntegration)}>
                              Connect
                            </Button>
                          </>
                        )}
                      </CardFooter>
                    </Card>
                  ) : (
                    <div className="h-full flex items-center justify-center min-h-[300px] border rounded-md border-dashed bg-gray-50 dark:bg-gray-900">
                      <div className="text-center p-6">
                        <Cable className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                        <h3 className="text-lg font-medium mb-1">Select an Integration</h3>
                        <p className="text-gray-500 dark:text-gray-400 mb-4">
                          Choose a system from the list to view details or configure
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="api">
              <Card>
                <CardHeader>
                  <CardTitle>API Access Management</CardTitle>
                  <CardDescription>Generate and manage API keys for external access to Hydra</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Your API Keys</h3>
                    
                    <div className="border rounded-md overflow-hidden">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50 dark:bg-gray-800">
                          <tr>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Name</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Key</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Created</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Expires</th>
                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-800">
                          {apiKeys.map((apiKey) => (
                            <tr key={apiKey.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                              <td className="px-4 py-3 text-sm">
                                <div className="font-medium">{apiKey.name}</div>
                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                  {apiKey.scopes.join(", ")}
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex items-center">
                                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded font-mono mr-2">
                                    {showApiKey ? apiKey.key : apiKey.key.substring(0, 8) + "••••••••••••••"}
                                  </code>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    onClick={() => setShowApiKey(!showApiKey)}
                                    className="h-6 w-6"
                                  >
                                    {showApiKey ? <EyeOff className="h-3 w-3" /> : <Eye className="h-3 w-3" />}
                                  </Button>
                                </div>
                              </td>
                              <td className="px-4 py-3 text-sm">{apiKey.created}</td>
                              <td className="px-4 py-3 text-sm">{apiKey.expires}</td>
                              <td className="px-4 py-3 text-sm">
                                <div className="flex gap-1">
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8"
                                    onClick={() => {
                                      navigator.clipboard.writeText(apiKey.key);
                                      toast({
                                        title: "API Key Copied",
                                        description: "The API key has been copied to your clipboard"
                                      });
                                    }}
                                  >
                                    Copy
                                  </Button>
                                  <Button 
                                    variant="ghost" 
                                    size="sm" 
                                    className="h-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                                    onClick={() => handleRevokeApiKey(apiKey.id)}
                                  >
                                    Revoke
                                  </Button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  
                  <div className="space-y-4 pt-4 border-t">
                    <h3 className="text-lg font-medium">Create New API Key</h3>
                    
                    <div className="space-y-3">
                      <div className="space-y-1">
                        <Label htmlFor="key-name">Key Name</Label>
                        <Input id="key-name" placeholder="e.g., Development Environment" />
                      </div>
                      
                      <div className="space-y-1">
                        <Label>Permissions</Label>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <input type="checkbox" id="perm-read-samples-api" className="rounded" defaultChecked />
                            <Label htmlFor="perm-read-samples-api">Read Water Samples</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <input type="checkbox" id="perm-write-samples-api" className="rounded" />
                            <Label htmlFor="perm-write-samples-api">Write Water Samples</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <input type="checkbox" id="perm-read-analytics-api" className="rounded" defaultChecked />
                            <Label htmlFor="perm-read-analytics-api">Read Analytics</Label>
                          </div>
                          <div className="flex items-center space-x-2 border rounded-md p-3">
                            <input type="checkbox" id="perm-write-analytics-api" className="rounded" />
                            <Label htmlFor="perm-write-analytics-api">Write Analytics</Label>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="key-expiration">Key Expiration</Label>
                        <select id="key-expiration" className="w-full border rounded-md p-2">
                          <option value="90-days">90 Days</option>
                          <option value="180-days">180 Days</option>
                          <option value="1-year">1 Year</option>
                          <option value="never">Never (Not Recommended)</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleCreateApiKey}>
                    Create API Key
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle>API Documentation</CardTitle>
                  <CardDescription>Resources for integrating with Hydra's API</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">OpenAPI Spec</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Complete API specification in OpenAPI format</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast({
                            title: "OpenAPI Specification",
                            description: "Downloading API specification..."
                          });
                        }}>
                          <Download className="h-4 w-4 mr-2" />
                          Download Spec
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Developer Guide</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Comprehensive guide to using the Hydra API</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast({
                            title: "Developer Documentation",
                            description: "Opening developer documentation in new tab"
                          });
                          window.open('#', '_blank');
                        }}>
                          <ExternalLink className="h-4 w-4 mr-2" />
                          View Documentation
                        </Button>
                      </CardFooter>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-base">Code Examples</CardTitle>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-sm text-gray-500 dark:text-gray-400">Sample code in multiple languages</p>
                      </CardContent>
                      <CardFooter>
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast({
                            title: "Code Examples",
                            description: "Opening code repository in new tab"
                          });
                          window.open('#', '_blank');
                        }}>
                          <Github className="h-4 w-4 mr-2" />
                          View Examples
                        </Button>
                      </CardFooter>
                    </Card>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default IntegrationsSettings;
