
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Home, 
  Settings as SettingsIcon, 
  Database, 
  HardDrive, 
  Archive, 
  Trash2, 
  Upload, 
  Download,
  RefreshCw,
  ServerCrash,
  BarChart,
  FileText,
  Clock,
  Filter,
  AlertTriangle,
  ChevronRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { Calendar } from "@/components/ui/calendar";
import { Badge } from "@/components/ui/badge";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";

// Mock data types
interface StorageSummary {
  totalSize: number;
  usedSize: number;
  categories: Array<{
    name: string;
    size: number;
    color: string;
  }>;
}

interface BackupSchedule {
  id: string;
  name: string;
  frequency: string;
  lastRun: string;
  nextRun: string;
  status: 'active' | 'paused' | 'failed';
  backupLocation: string;
}

interface SamplePolicy {
  id: string;
  name: string;
  sampleType: string;
  retentionPeriod: string;
  autoArchive: boolean;
  lastReview: string;
}

interface DataImport {
  id: string;
  source: string;
  date: string;
  status: 'completed' | 'failed' | 'in-progress';
  recordsCount: number;
}

const DataManagementSettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showFilters, setShowFilters] = useState(false);
  
  // Mock storage data
  const storageSummary: StorageSummary = {
    totalSize: 2048, // GB
    usedSize: 1280, // GB
    categories: [
      { name: 'Water Samples', size: 560, color: 'bg-blue-500' },
      { name: 'Analytics Data', size: 380, color: 'bg-purple-500' },
      { name: 'Reports', size: 180, color: 'bg-green-500' },
      { name: 'System Logs', size: 120, color: 'bg-amber-500' },
      { name: 'Other', size: 40, color: 'bg-gray-500' }
    ]
  };
  
  // Mock backup schedules
  const backupSchedules: BackupSchedule[] = [
    {
      id: '1',
      name: 'Full System Backup',
      frequency: 'Daily at 02:00 AM',
      lastRun: '2025-04-03 02:00 AM',
      nextRun: '2025-04-04 02:00 AM',
      status: 'active',
      backupLocation: 'AWS S3 - Primary Bucket'
    },
    {
      id: '2',
      name: 'Critical Data Backup',
      frequency: 'Every 6 hours',
      lastRun: '2025-04-03 12:00 PM',
      nextRun: '2025-04-03 06:00 PM',
      status: 'active',
      backupLocation: 'Google Cloud Storage'
    },
    {
      id: '3',
      name: 'Monthly Archive',
      frequency: '1st day of month at 03:00 AM',
      lastRun: '2025-04-01 03:00 AM',
      nextRun: '2025-05-01 03:00 AM',
      status: 'active',
      backupLocation: 'Azure Blob Storage'
    },
    {
      id: '4',
      name: 'Legacy Data Backup',
      frequency: 'Weekly on Sunday at 01:00 AM',
      lastRun: '2025-03-30 01:00 AM',
      nextRun: '2025-04-06 01:00 AM',
      status: 'failed',
      backupLocation: 'Local Storage Array'
    }
  ];
  
  // Mock sample policies
  const samplePolicies: SamplePolicy[] = [
    {
      id: '1',
      name: 'Drinking Water Samples',
      sampleType: 'Potable Water',
      retentionPeriod: '7 years',
      autoArchive: true,
      lastReview: '2025-01-15'
    },
    {
      id: '2',
      name: 'Wastewater Analysis',
      sampleType: 'Effluent Water',
      retentionPeriod: '5 years',
      autoArchive: true,
      lastReview: '2025-02-20'
    },
    {
      id: '3',
      name: 'River Monitoring',
      sampleType: 'Surface Water',
      retentionPeriod: '10 years',
      autoArchive: true,
      lastReview: '2025-03-10'
    },
    {
      id: '4',
      name: 'Groundwater Samples',
      sampleType: 'Well Water',
      retentionPeriod: '10 years',
      autoArchive: false,
      lastReview: '2025-03-25'
    }
  ];
  
  // Mock data imports
  const dataImports: DataImport[] = [
    {
      id: '1',
      source: 'City Water Authority - CSV Import',
      date: '2025-04-02 09:15 AM',
      status: 'completed',
      recordsCount: 1245
    },
    {
      id: '2',
      source: 'EPA Monitoring Data - API Sync',
      date: '2025-04-01 03:45 PM',
      status: 'completed',
      recordsCount: 3782
    },
    {
      id: '3',
      source: 'Legacy System Migration - Phase 2',
      date: '2025-03-28 10:30 AM',
      status: 'failed',
      recordsCount: 0
    },
    {
      id: '4',
      source: 'Field Technician Samples - Mobile Upload',
      date: '2025-03-25 02:10 PM',
      status: 'completed',
      recordsCount: 512
    },
    {
      id: '5',
      source: 'Industrial Client Sample Batch',
      date: '2025-03-24 11:45 AM',
      status: 'in-progress',
      recordsCount: 287
    }
  ];
  
  const handleRunBackup = (backupId: string) => {
    toast({
      title: "Backup Started",
      description: "Manual backup process has been initiated."
    });
  };
  
  const handleRestoreBackup = () => {
    toast({
      title: "Restore Process",
      description: "Please select a backup point to restore from."
    });
  };
  
  const handlePolicyEdit = (policyId: string) => {
    toast({
      title: "Edit Retention Policy",
      description: "Opening policy configuration..."
    });
  };
  
  const handleDataPurge = () => {
    toast({
      title: "Data Purge Request",
      description: "This action requires administrative approval.",
      variant: "destructive"
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
                  <Database className="h-4 w-4 mr-1" />
                  Data Management
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Data Management
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Control data storage, retention, and backup policies
            </p>
          </div>

          <Tabs defaultValue="storage" className="w-full">
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="storage">
                <HardDrive className="h-4 w-4 mr-2" />
                Storage
              </TabsTrigger>
              <TabsTrigger value="backup">
                <Archive className="h-4 w-4 mr-2" />
                Backup & Recovery
              </TabsTrigger>
              <TabsTrigger value="retention">
                <Clock className="h-4 w-4 mr-2" />
                Retention Policies
              </TabsTrigger>
              <TabsTrigger value="import-export">
                <RefreshCw className="h-4 w-4 mr-2" />
                Import/Export
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="storage">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-blue-500" />
                        Storage Usage
                      </CardTitle>
                      <CardDescription>Current system storage utilization</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-center">
                        <div className="relative inline-block">
                          <svg className="w-36 h-36">
                            <circle 
                              className="text-gray-200 dark:text-gray-800" 
                              strokeWidth="10" 
                              stroke="currentColor" 
                              fill="transparent" 
                              r="65" 
                              cx="72" 
                              cy="72"
                            />
                            <circle 
                              className="text-blue-600" 
                              strokeWidth="10" 
                              strokeDasharray={Math.round((storageSummary.usedSize / storageSummary.totalSize) * 408) + " 408"}
                              strokeLinecap="round" 
                              stroke="currentColor" 
                              fill="transparent" 
                              r="65" 
                              cx="72" 
                              cy="72"
                            />
                          </svg>
                          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                            <p className="text-2xl font-bold">
                              {Math.round((storageSummary.usedSize / storageSummary.totalSize) * 100)}%
                            </p>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Used</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Used: {storageSummary.usedSize} GB</span>
                          <span>Total: {storageSummary.totalSize} GB</span>
                        </div>
                        <Progress value={(storageSummary.usedSize / storageSummary.totalSize) * 100} />
                      </div>
                      
                      <div className="space-y-2 pt-4">
                        <h4 className="text-sm font-medium">Storage Breakdown</h4>
                        {storageSummary.categories.map((category, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <div className={`w-3 h-3 rounded-full ${category.color}`}></div>
                              <span className="text-sm">{category.name}</span>
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {category.size} GB ({Math.round((category.size / storageSummary.usedSize) * 100)}%)
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button variant="outline" className="w-full" onClick={() => {
                        toast({
                          title: "Storage Analysis",
                          description: "Analyzing storage usage patterns..."
                        });
                      }}>
                        Run Storage Analysis
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-2">
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Database className="h-5 w-5 text-blue-500" />
                        Storage Configuration
                      </CardTitle>
                      <CardDescription>Manage your data storage settings</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium mb-3">Primary Storage</h3>
                          <div className="space-y-3">
                            <div className="space-y-1">
                              <Label htmlFor="storage-type">Storage Type</Label>
                              <Select defaultValue="cloud">
                                <SelectTrigger id="storage-type">
                                  <SelectValue placeholder="Select storage type" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="cloud">Cloud Storage</SelectItem>
                                  <SelectItem value="local">Local Storage</SelectItem>
                                  <SelectItem value="hybrid">Hybrid Storage</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="provider">Cloud Provider</Label>
                              <Select defaultValue="aws">
                                <SelectTrigger id="provider">
                                  <SelectValue placeholder="Select provider" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="aws">Amazon Web Services</SelectItem>
                                  <SelectItem value="gcp">Google Cloud Platform</SelectItem>
                                  <SelectItem value="azure">Microsoft Azure</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                            
                            <div className="space-y-1">
                              <Label htmlFor="region">Storage Region</Label>
                              <Select defaultValue="us-east-1">
                                <SelectTrigger id="region">
                                  <SelectValue placeholder="Select region" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="us-east-1">US East (N. Virginia)</SelectItem>
                                  <SelectItem value="us-west-1">US West (N. California)</SelectItem>
                                  <SelectItem value="eu-central-1">EU (Frankfurt)</SelectItem>
                                  <SelectItem value="ap-northeast-1">Asia Pacific (Tokyo)</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium mb-3">Storage Policies</h3>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Encryption at Rest</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Encrypt all stored data</p>
                              </div>
                              <Switch defaultChecked id="encryption" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Compression</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Compress data to save space</p>
                              </div>
                              <Switch defaultChecked id="compression" />
                            </div>
                            
                            <div className="flex items-center justify-between">
                              <div className="space-y-0.5">
                                <Label>Lifecycle Policy</Label>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Automatically archive old data</p>
                              </div>
                              <Switch defaultChecked id="lifecycle" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-2 border-t">
                        <h3 className="text-lg font-medium mt-3 mb-2">Storage Quotas</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="sample-quota">Water Samples</Label>
                            <div className="flex items-center gap-2">
                              <Input id="sample-quota" type="number" defaultValue="800" />
                              <span className="text-sm text-gray-500">GB</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="analytics-quota">Analytics Data</Label>
                            <div className="flex items-center gap-2">
                              <Input id="analytics-quota" type="number" defaultValue="600" />
                              <span className="text-sm text-gray-500">GB</span>
                            </div>
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="reports-quota">Reports & Documents</Label>
                            <div className="flex items-center gap-2">
                              <Input id="reports-quota" type="number" defaultValue="300" />
                              <span className="text-sm text-gray-500">GB</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-3 pt-2 border-t">
                        <h3 className="text-lg font-medium mt-3 mb-2">Alerts & Notifications</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-1">
                            <Label htmlFor="storage-threshold">Storage Alert Threshold</Label>
                            <Select defaultValue="80">
                              <SelectTrigger id="storage-threshold">
                                <SelectValue placeholder="Select threshold" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="70">70% Usage</SelectItem>
                                <SelectItem value="80">80% Usage</SelectItem>
                                <SelectItem value="90">90% Usage</SelectItem>
                                <SelectItem value="95">95% Usage</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-1">
                            <Label htmlFor="notify-to">Notify</Label>
                            <Select defaultValue="all-admins">
                              <SelectTrigger id="notify-to">
                                <SelectValue placeholder="Select recipients" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all-admins">All Administrators</SelectItem>
                                <SelectItem value="system-admin">System Administrator Only</SelectItem>
                                <SelectItem value="custom">Custom Recipients</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" onClick={() => {
                        toast({
                          title: "Storage Reset",
                          description: "Storage settings have been reset to defaults."
                        });
                      }}>
                        Reset to Defaults
                      </Button>
                      <Button onClick={() => {
                        toast({
                          title: "Settings Saved",
                          description: "Storage configuration has been updated."
                        });
                      }}>
                        Save Settings
                      </Button>
                    </CardFooter>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <ServerCrash className="h-5 w-5 text-red-500" />
                        Dangerous Operations
                      </CardTitle>
                      <CardDescription>Use these options with extreme caution</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="border border-red-200 dark:border-red-900 rounded-md p-4 bg-red-50 dark:bg-red-900/10">
                          <h3 className="text-lg font-medium text-red-700 dark:text-red-400">Warning</h3>
                          <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                            The following operations can result in permanent data loss. These actions cannot be undone and should only be performed by authorized administrators.
                          </p>
                        </div>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => {
                            toast({
                              title: "Purge Temporary Data",
                              description: "Initiating temporary data cleanup process..."
                            });
                          }}>
                            Purge Temporary Data
                          </Button>
                          
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={() => {
                            toast({
                              title: "Clear Sample Cache",
                              description: "Clearing cached sample data, this may affect performance temporarily."
                            });
                          }}>
                            Clear Sample Cache
                          </Button>
                          
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" disabled>
                            Rebuild Database Indexes
                          </Button>
                          
                          <Button variant="outline" className="border-red-300 text-red-600 hover:bg-red-50" onClick={handleDataPurge}>
                            <Trash2 className="h-4 w-4 mr-2" />
                            Purge Archived Data
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="backup">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Archive className="h-5 w-5 text-blue-500" />
                    Backup Schedules
                  </CardTitle>
                  <CardDescription>Configure and monitor automated backup jobs</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-sm">Backup Name</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Frequency</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Last Run</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Next Run</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {backupSchedules.map((backup) => (
                          <tr key={backup.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="py-3 px-4">
                              <div className="font-medium">{backup.name}</div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">{backup.backupLocation}</div>
                            </td>
                            <td className="py-3 px-4 text-sm">{backup.frequency}</td>
                            <td className="py-3 px-4 text-sm">{backup.lastRun}</td>
                            <td className="py-3 px-4 text-sm">{backup.nextRun}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={backup.status === 'active' ? 'outline' : 'destructive'}
                                className={backup.status === 'active' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                              >
                                {backup.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleRunBackup(backup.id)}
                                >
                                  Run Now
                                </Button>
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Edit Backup Schedule",
                                      description: "Opening backup configuration..."
                                    });
                                  }}
                                >
                                  Edit
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Add Backup Schedule",
                      description: "Opening backup scheduler..."
                    });
                  }}>
                    Add Backup Schedule
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "Backup Configuration Saved",
                      description: "Your backup schedules have been updated."
                    });
                  }}>
                    Save Configuration
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-green-500" />
                      Restore from Backup
                    </CardTitle>
                    <CardDescription>Recover data from a previous backup point</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select Backup Source</Label>
                      <Select defaultValue="aws-s3">
                        <SelectTrigger>
                          <SelectValue placeholder="Select backup source" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="aws-s3">AWS S3 - Primary Bucket</SelectItem>
                          <SelectItem value="gcp">Google Cloud Storage</SelectItem>
                          <SelectItem value="azure">Azure Blob Storage</SelectItem>
                          <SelectItem value="local">Local Storage Array</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Select Backup Point</Label>
                      <div className="flex gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              {date ? format(date, "PPP") : "Select date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={setDate}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        
                        <Select defaultValue="02-00">
                          <SelectTrigger className="w-[150px]">
                            <SelectValue placeholder="Time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="00-00">12:00 AM</SelectItem>
                            <SelectItem value="02-00">2:00 AM</SelectItem>
                            <SelectItem value="08-00">8:00 AM</SelectItem>
                            <SelectItem value="14-00">2:00 PM</SelectItem>
                            <SelectItem value="20-00">8:00 PM</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label>Restore Options</Label>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="full-restore" name="restore-type" className="rounded" defaultChecked />
                          <Label htmlFor="full-restore">Full System Restore</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="partial-restore" name="restore-type" className="rounded" />
                          <Label htmlFor="partial-restore">Partial Restore (Select components)</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="pt-2 space-y-2 border-t">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="verify-restore" name="verify-restore" className="rounded" defaultChecked />
                        <Label htmlFor="verify-restore">Verify backup integrity before restore</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="create-snapshot" name="create-snapshot" className="rounded" defaultChecked />
                        <Label htmlFor="create-snapshot">Create snapshot of current system before restore</Label>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={handleRestoreBackup}>
                      Start Restoration Process
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BarChart className="h-5 w-5 text-purple-500" />
                      Backup Health
                    </CardTitle>
                    <CardDescription>Monitor the health of your backup system</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <h3 className="font-medium">Last Backup Success Rate</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Past 30 days</p>
                        </div>
                        <div className="text-xl font-bold text-green-600">94%</div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                          <span>94 Successful</span>
                          <span>6 Failed</span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                          <div className="bg-green-600 h-2.5 rounded-full" style={{ width: "94%" }}></div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <h3 className="font-medium">Backup Storage Usage</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm">AWS S3 Primary</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">1.2 TB / 2 TB</span>
                        </div>
                        <Progress value={60} />
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Google Cloud Storage</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">0.8 TB / 1 TB</span>
                        </div>
                        <Progress value={80} />
                        
                        <div className="flex justify-between">
                          <span className="text-sm">Azure Blob Storage</span>
                          <span className="text-sm text-gray-500 dark:text-gray-400">0.4 TB / 1 TB</span>
                        </div>
                        <Progress value={40} />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="font-medium">Recent Backup Issues</h3>
                      <div className="text-sm space-y-2">
                        <div className="flex items-start gap-2 text-red-600">
                          <AlertTriangle className="h-4 w-4 mt-0.5" />
                          <div>
                            <p>Legacy Data Backup failed on 2025-03-30</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Network timeout during file transfer</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-2 text-amber-600">
                          <AlertTriangle className="h-4 w-4 mt-0.5" />
                          <div>
                            <p>Full System Backup delayed on 2025-03-15</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">Completed 45 minutes after scheduled time</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Generating Backup Report",
                        description: "Creating detailed backup system health report..."
                      });
                    }}>
                      <FileText className="h-4 w-4 mr-2" />
                      Generate Backup Health Report
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="retention">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    Data Retention Policies
                  </CardTitle>
                  <CardDescription>Define how long different types of data are kept</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-sm">Policy Name</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Sample Type</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Retention Period</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Auto-Archive</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Last Review</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {samplePolicies.map((policy) => (
                          <tr key={policy.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="py-3 px-4 font-medium">{policy.name}</td>
                            <td className="py-3 px-4">{policy.sampleType}</td>
                            <td className="py-3 px-4">{policy.retentionPeriod}</td>
                            <td className="py-3 px-4">
                              {policy.autoArchive ? (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                  <Check className="h-3 w-3 mr-1" />
                                  Enabled
                                </span>
                              ) : (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                                  <X className="h-3 w-3 mr-1" />
                                  Disabled
                                </span>
                              )}
                            </td>
                            <td className="py-3 px-4">{policy.lastReview}</td>
                            <td className="py-3 px-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => handlePolicyEdit(policy.id)}
                              >
                                Edit Policy
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Add Retention Policy",
                      description: "Opening policy creation form..."
                    });
                  }}>
                    Add Policy
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "Run Retention Process",
                      description: "The system will process all retention policies now."
                    });
                  }}>
                    Run Retention Process Now
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Archive className="h-5 w-5 text-amber-500" />
                      Archiving Settings
                    </CardTitle>
                    <CardDescription>Configure how data is archived</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Archive Storage</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="archive-location">Archive Location</Label>
                          <Select defaultValue="aws-glacier">
                            <SelectTrigger id="archive-location">
                              <SelectValue placeholder="Select archive location" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="aws-glacier">AWS Glacier</SelectItem>
                              <SelectItem value="azure-archive">Azure Archive Storage</SelectItem>
                              <SelectItem value="gcp-coldline">Google Cloud Coldline</SelectItem>
                              <SelectItem value="tape">Tape Backup System</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="archive-format">Archive Format</Label>
                          <Select defaultValue="compressed">
                            <SelectTrigger id="archive-format">
                              <SelectValue placeholder="Select archive format" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="compressed">Compressed (ZIP)</SelectItem>
                              <SelectItem value="encrypted">Encrypted Archive</SelectItem>
                              <SelectItem value="raw">Raw Database Dump</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Archive Triggers</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Age-Based Archiving</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Archive data older than specified time</p>
                          </div>
                          <Switch defaultChecked id="age-based" />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="age-threshold">Age Threshold</Label>
                          <Select defaultValue="2-years">
                            <SelectTrigger id="age-threshold">
                              <SelectValue placeholder="Select age threshold" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6-months">6 Months</SelectItem>
                              <SelectItem value="1-year">1 Year</SelectItem>
                              <SelectItem value="2-years">2 Years</SelectItem>
                              <SelectItem value="5-years">5 Years</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Usage-Based Archiving</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Archive data that hasn't been accessed</p>
                          </div>
                          <Switch id="usage-based" />
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Archive Schedule</h3>
                      <div className="space-y-1">
                        <Label htmlFor="archive-frequency">Archiving Frequency</Label>
                        <Select defaultValue="monthly">
                          <SelectTrigger id="archive-frequency">
                            <SelectValue placeholder="Select frequency" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="weekly">Weekly</SelectItem>
                            <SelectItem value="monthly">Monthly</SelectItem>
                            <SelectItem value="quarterly">Quarterly</SelectItem>
                            <SelectItem value="yearly">Yearly</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="archive-day">Run on Day</Label>
                        <Select defaultValue="1">
                          <SelectTrigger id="archive-day">
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1st of month</SelectItem>
                            <SelectItem value="15">15th of month</SelectItem>
                            <SelectItem value="last">Last day of month</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Archive Settings Saved",
                        description: "Your archive configuration has been updated."
                      });
                    }}>
                      Save Archive Settings
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Trash2 className="h-5 w-5 text-red-500" />
                      Data Destruction Policies
                    </CardTitle>
                    <CardDescription>Configure secure data destruction protocols</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="border border-red-200 dark:border-red-900 rounded-md p-4 bg-red-50 dark:bg-red-900/10">
                      <h3 className="font-medium text-red-700 dark:text-red-400">Critical Settings</h3>
                      <p className="text-sm text-red-600 dark:text-red-300 mt-1">
                        Data destruction is permanent and cannot be reversed. These settings should be carefully reviewed.
                      </p>
                    </div>
                    
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Destruction Method</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="standard-delete" name="destruction-method" className="rounded" />
                          <Label htmlFor="standard-delete">Standard Deletion (faster)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="secure-wipe" name="destruction-method" className="rounded" defaultChecked />
                          <Label htmlFor="secure-wipe">Secure Data Wipe (recommended)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="radio" id="dod-standard" name="destruction-method" className="rounded" />
                          <Label htmlFor="dod-standard">DoD 5220.22-M Standard (most secure, slowest)</Label>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Automatic Destruction</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Enable Auto-Destruction</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Automatically destroy data after retention period</p>
                        </div>
                        <Switch id="auto-destruction" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Require Approval</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Admin must approve all data destruction</p>
                        </div>
                        <Switch defaultChecked id="approval-required" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Create Destruction Certificate</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Generate certificate of destruction for compliance</p>
                        </div>
                        <Switch defaultChecked id="certificate" />
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Destruction Safeguards</h3>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="legal-hold" className="rounded" defaultChecked />
                          <Label htmlFor="legal-hold">Preserve data under legal hold</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="regulatory-compliance" className="rounded" defaultChecked />
                          <Label htmlFor="regulatory-compliance">Check regulatory compliance before destruction</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="backup-verification" className="rounded" defaultChecked />
                          <Label htmlFor="backup-verification">Verify backup exists before destruction</Label>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Destruction Policies Saved",
                        description: "Your data destruction policies have been updated."
                      });
                    }}>
                      Save Destruction Policies
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="import-export">
              <Card className="mb-6">
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-blue-500" />
                      Recent Data Imports
                    </CardTitle>
                    <CardDescription>History of data imported into the system</CardDescription>
                  </div>
                  <Button variant="outline" size="sm" onClick={() => setShowFilters(!showFilters)}>
                    <Filter className="h-4 w-4 mr-2" />
                    {showFilters ? "Hide Filters" : "Show Filters"}
                  </Button>
                </CardHeader>
                {showFilters && (
                  <div className="px-6 py-3 border-b">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="date-range">Date Range</Label>
                        <Select defaultValue="30-days">
                          <SelectTrigger id="date-range">
                            <SelectValue placeholder="Select range" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="7-days">Last 7 days</SelectItem>
                            <SelectItem value="30-days">Last 30 days</SelectItem>
                            <SelectItem value="90-days">Last 90 days</SelectItem>
                            <SelectItem value="custom">Custom range</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="status-filter">Status</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="status-filter">
                            <SelectValue placeholder="Filter by status" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Statuses</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                            <SelectItem value="failed">Failed</SelectItem>
                            <SelectItem value="in-progress">In Progress</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="source-filter">Source</Label>
                        <Select defaultValue="all">
                          <SelectTrigger id="source-filter">
                            <SelectValue placeholder="Filter by source" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Sources</SelectItem>
                            <SelectItem value="csv">CSV Import</SelectItem>
                            <SelectItem value="api">API Integration</SelectItem>
                            <SelectItem value="mobile">Mobile Upload</SelectItem>
                            <SelectItem value="legacy">Legacy System</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-1">
                        <Label htmlFor="import-search">Search</Label>
                        <Input id="import-search" placeholder="Search imports..." />
                      </div>
                    </div>
                  </div>
                )}
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-3 px-4 font-medium text-sm">Source</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Date</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Status</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Records</th>
                          <th className="text-left py-3 px-4 font-medium text-sm">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {dataImports.map((importItem) => (
                          <tr key={importItem.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                            <td className="py-3 px-4 font-medium">{importItem.source}</td>
                            <td className="py-3 px-4 text-sm">{importItem.date}</td>
                            <td className="py-3 px-4">
                              <Badge
                                variant={
                                  importItem.status === 'completed' 
                                    ? 'outline' 
                                    : importItem.status === 'in-progress'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                                className={importItem.status === 'completed' ? 'bg-green-100 text-green-800 border-green-300' : ''}
                              >
                                {importItem.status}
                              </Badge>
                            </td>
                            <td className="py-3 px-4 text-sm">{importItem.recordsCount.toLocaleString()}</td>
                            <td className="py-3 px-4">
                              <div className="flex gap-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => {
                                    toast({
                                      title: "Viewing Import Details",
                                      description: "Opening import log and details..."
                                    });
                                  }}
                                >
                                  Details
                                </Button>
                                {importItem.status === 'failed' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => {
                                      toast({
                                        title: "Retrying Import",
                                        description: "Attempting to reprocess the failed import..."
                                      });
                                    }}
                                  >
                                    Retry
                                  </Button>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => {
                    toast({
                      title: "Import History",
                      description: "Generating complete import history report..."
                    });
                  }}>
                    Export History
                  </Button>
                  <Button onClick={() => {
                    toast({
                      title: "New Data Import",
                      description: "Opening data import wizard..."
                    });
                  }}>
                    Import New Data
                  </Button>
                </CardFooter>
              </Card>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Upload className="h-5 w-5 text-green-500" />
                      Import Data
                    </CardTitle>
                    <CardDescription>Import data from various sources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Import Source</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <Upload className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">File Upload</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">CSV, Excel, JSON formats</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <Database className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Database Import</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">SQL, MongoDB, PostgreSQL</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <RefreshCw className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">API Connection</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">REST, GraphQL, SOAP</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <Archive className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Legacy System</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Connect to older systems</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Import Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Validation</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Validate data before import</p>
                          </div>
                          <Switch defaultChecked id="data-validation" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Duplicate Detection</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Check for and handle duplicates</p>
                          </div>
                          <Switch defaultChecked id="duplicate-detection" />
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="duplicate-action">Duplicate Action</Label>
                          <Select defaultValue="skip">
                            <SelectTrigger id="duplicate-action">
                              <SelectValue placeholder="Select action" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="skip">Skip Duplicates</SelectItem>
                              <SelectItem value="overwrite">Overwrite Existing</SelectItem>
                              <SelectItem value="merge">Merge Records</SelectItem>
                              <SelectItem value="version">Create New Version</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Scheduling</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label>Scheduled Import</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Set up recurring imports</p>
                        </div>
                        <Switch id="scheduled-import" />
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Import Wizard",
                        description: "Opening the step-by-step import wizard..."
                      });
                    }}>
                      Continue to Import Wizard
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Download className="h-5 w-5 text-blue-500" />
                      Export Data
                    </CardTitle>
                    <CardDescription>Export data to various formats</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <h3 className="text-lg font-medium">Export Format</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-green-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">CSV Export</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Standard comma-separated values</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">Excel Export</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Microsoft Excel format</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-purple-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">JSON Export</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">JavaScript Object Notation</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="border rounded-md p-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-900">
                          <div className="flex items-center gap-3">
                            <div className="h-8 w-8 bg-amber-100 rounded-full flex items-center justify-center">
                              <FileText className="h-4 w-4 text-amber-600" />
                            </div>
                            <div>
                              <h4 className="font-medium">PDF Report</h4>
                              <p className="text-xs text-gray-500 dark:text-gray-400">Formatted PDF document</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Data Selection</h3>
                      <div className="space-y-3">
                        <div className="space-y-1">
                          <Label htmlFor="data-type">Data Type</Label>
                          <Select defaultValue="water-samples">
                            <SelectTrigger id="data-type">
                              <SelectValue placeholder="Select data type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="water-samples">Water Samples</SelectItem>
                              <SelectItem value="analytics">Analytics Data</SelectItem>
                              <SelectItem value="reports">Reports & Documents</SelectItem>
                              <SelectItem value="system-logs">System Logs</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        
                        <div className="space-y-1">
                          <Label htmlFor="date-filter">Date Filter</Label>
                          <div className="flex gap-2">
                            <Select defaultValue="last-90-days">
                              <SelectTrigger id="date-filter">
                                <SelectValue placeholder="Select date range" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="last-30-days">Last 30 Days</SelectItem>
                                <SelectItem value="last-90-days">Last 90 Days</SelectItem>
                                <SelectItem value="last-year">Last Year</SelectItem>
                                <SelectItem value="all-time">All Time</SelectItem>
                                <SelectItem value="custom">Custom Range</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                        
                        <div className="space-y-1">
                          <Label>Advanced Filters</Label>
                          <Button variant="outline" className="w-full text-left justify-between" onClick={() => {
                            toast({
                              title: "Advanced Filters",
                              description: "Opening advanced filtering options..."
                            });
                          }}>
                            <span>Configure filters</span>
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3 pt-3 border-t">
                      <h3 className="text-lg font-medium">Export Options</h3>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Include Headers</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Add column headers to export</p>
                          </div>
                          <Switch defaultChecked id="include-headers" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Data Anonymization</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Remove personally identifiable information</p>
                          </div>
                          <Switch id="anonymize" />
                        </div>
                        
                        <div className="flex items-center justify-between">
                          <div className="space-y-0.5">
                            <Label>Encryption</Label>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Password-protect exported files</p>
                          </div>
                          <Switch id="encryption" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full" onClick={() => {
                      toast({
                        title: "Preparing Export",
                        description: "Your data export is being prepared..."
                      });
                      
                      setTimeout(() => {
                        toast({
                          title: "Export Ready",
                          description: "Your export is ready for download"
                        });
                      }, 3000);
                    }}>
                      Generate Export
                    </Button>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default DataManagementSettings;
