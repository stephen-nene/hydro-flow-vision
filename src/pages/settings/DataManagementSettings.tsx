import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
// Import missing Check and X icons
import { 
  Home, 
  Settings as SettingsIcon, 
  Database, 
  ServerCog, 
  Trash2, 
  Archive, 
  FileDown, 
  FileUp, 
  RefreshCw, 
  AlertTriangle, 
  Lock, 
  Check,
  X,
  PlusCircle  // Add this import for the PlusCircle icon
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
import { 
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
  DialogFooter // Add this import for DialogFooter
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"

// Mock data interfaces
interface Sample {
  id: string;
  name: string;
  location: string;
  date: string;
  parameters: number;
  status: 'pending' | 'analyzed' | 'approved' | 'rejected';
  contaminants: string[];
  notes?: string;
}

interface ExportTask {
  id: string;
  type: 'csv' | 'excel' | 'pdf';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  created: string;
  completed?: string;
  fileUrl?: string;
}

interface RetentionPolicy {
  id: string;
  name: string;
  description: string;
  duration: number;
  unit: 'days' | 'months' | 'years';
  automaticDeletion: boolean;
  lastRun?: string;
}

const DataManagementSettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSample, setSelectedSample] = useState<Sample | null>(null);
  const [isSampleDialogOpen, setIsSampleDialogOpen] = useState(false);
  const [isPolicyDialogOpen, setIsPolicyDialogOpen] = useState(false);
  const [selectedPolicy, setSelectedPolicy] = useState<RetentionPolicy | null>(null);
  
  // Mock sample data
  const samples: Sample[] = [
    {
      id: "1",
      name: "Well #1 - Spring 2025",
      location: "Downtown Well",
      date: "2025-03-15",
      parameters: 27,
      status: 'analyzed',
      contaminants: ["Lead", "E. coli", "Nitrates"],
      notes: "High lead levels detected. Retesting recommended."
    },
    {
      id: "2",
      name: "River Intake - March 2025",
      location: "River Intake Point",
      date: "2025-03-22",
      parameters: 32,
      status: 'approved',
      contaminants: ["Turbidity", "PFAS"],
      notes: "Turbidity levels slightly elevated due to recent rainfall."
    },
    {
      id: "3",
      name: "Reservoir A - Winter 2025",
      location: "Main Reservoir",
      date: "2025-02-28",
      parameters: 22,
      status: 'pending',
      contaminants: [],
      notes: "Awaiting lab results."
    },
    {
      id: "4",
      name: "Well #2 - Spring 2025",
      location: "Uptown Well",
      date: "2025-03-18",
      parameters: 29,
      status: 'rejected',
      contaminants: ["Arsenic", "Fluoride"],
      notes: "Arsenic levels exceed regulatory limits. Shut down well immediately."
    },
    {
      id: "5",
      name: "Treatment Plant Output - March 2025",
      location: "Treatment Plant",
      date: "2025-03-25",
      parameters: 35,
      status: 'approved',
      contaminants: ["Chlorine Residual"],
      notes: "Chlorine residual within acceptable range."
    },
    {
      id: "6",
      name: "Distribution Point #1 - March 2025",
      location: "Downtown Distribution",
      date: "2025-03-29",
      parameters: 25,
      status: 'analyzed',
      contaminants: ["Lead"],
      notes: "Lead levels slightly elevated. Further investigation required."
    },
    {
      id: "7",
      name: "Well #3 - Spring 2025",
      location: "Industrial Well",
      date: "2025-03-20",
      parameters: 31,
      status: 'approved',
      contaminants: ["Benzene", "Toluene"],
      notes: "Industrial contaminants detected. Implement treatment protocol."
    },
    {
      id: "8",
      name: "River Sample - April 2025",
      location: "River Sampling Point",
      date: "2025-04-01",
      parameters: 28,
      status: 'pending',
      contaminants: [],
      notes: "Awaiting lab results."
    },
    {
      id: "9",
      name: "Reservoir B - Spring 2025",
      location: "Secondary Reservoir",
      date: "2025-03-27",
      parameters: 26,
      status: 'analyzed',
      contaminants: ["Algae", "Sediment"],
      notes: "Algae bloom detected. Adjust treatment accordingly."
    },
    {
      id: "10",
      name: "Distribution Point #2 - April 2025",
      location: "Uptown Distribution",
      date: "2025-04-03",
      parameters: 33,
      status: 'approved',
      contaminants: ["Copper"],
      notes: "Copper levels within acceptable range."
    }
  ];
  
  // Mock export tasks
  const exportTasks: ExportTask[] = [
    {
      id: "e1",
      type: 'csv',
      status: 'completed',
      created: "2025-04-01 10:00:00",
      completed: "2025-04-01 10:05:00",
      fileUrl: "/exports/sample_data_2025-04-01.csv"
    },
    {
      id: "e2",
      type: 'excel',
      status: 'processing',
      created: "2025-04-02 14:30:00"
    },
    {
      id: "e3",
      type: 'pdf',
      status: 'failed',
      created: "2025-04-03 09:15:00",
      completed: "2025-04-03 09:20:00"
    },
    {
      id: "e4",
      type: 'csv',
      status: 'completed',
      created: "2025-04-03 16:45:00",
      completed: "2025-04-03 16:50:00",
      fileUrl: "/exports/sample_data_2025-04-03.csv"
    }
  ];
  
  // Mock retention policies
  const retentionPolicies: RetentionPolicy[] = [
    {
      id: "rp1",
      name: "Standard Policy",
      description: "Retain all data for 2 years",
      duration: 2,
      unit: 'years',
      automaticDeletion: true,
      lastRun: "2025-04-02 08:00:00"
    },
    {
      id: "rp2",
      name: "Compliance Policy",
      description: "Retain compliance-related data for 5 years",
      duration: 5,
      unit: 'years',
      automaticDeletion: true,
      lastRun: "2025-04-03 08:00:00"
    },
    {
      id: "rp3",
      name: "Minimal Retention",
      description: "Retain data for 6 months",
      duration: 6,
      unit: 'months',
      automaticDeletion: true,
      lastRun: "2025-04-03 08:00:00"
    },
    {
      id: "rp4",
      name: "Indefinite Retention",
      description: "Retain all data indefinitely",
      duration: 0,
      unit: 'years',
      automaticDeletion: false
    }
  ];
  
  // Zod schema for form validation
  const policySchema = z.object({
    name: z.string().min(2, {
      message: "Policy name must be at least 2 characters.",
    }),
    description: z.string().min(10, {
      message: "Description must be at least 10 characters.",
    }),
    duration: z.number().min(1, {
      message: "Duration must be at least 1 day.",
    }),
    unit: z.enum(['days', 'months', 'years']),
    automaticDeletion: z.boolean().default(false),
  })
  
  // React Hook Form setup
  const form = useForm<z.infer<typeof policySchema>>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      name: selectedPolicy?.name || "",
      description: selectedPolicy?.description || "",
      duration: selectedPolicy?.duration || 1,
      unit: selectedPolicy?.unit || "days",
      automaticDeletion: selectedPolicy?.automaticDeletion || false,
    },
    mode: "onChange",
  })
  
  // Filter samples based on search query
  const getFilteredSamples = () => {
    return samples.filter(sample => 
      sample.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sample.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const handleSampleClick = (sample: Sample) => {
    setSelectedSample(sample);
    setIsSampleDialogOpen(true);
  };
  
  const handleCloseSampleDialog = () => {
    setIsSampleDialogOpen(false);
    setSelectedSample(null);
  };
  
  const handleExportData = (type: string) => {
    toast({
      title: `Exporting data to ${type.toUpperCase()}`,
      description: "Preparing data for export..."
    });
    
    // Simulate export process
    setTimeout(() => {
      toast({
        title: "Export Task Started",
        description: `Your data is being exported to ${type.toUpperCase()}. You'll be notified when it's ready.`,
        duration: 5000
      });
    }, 2000);
  };
  
  const handleDeleteSample = (sampleId: string) => {
    toast({
      title: "Deleting Sample",
      description: "Removing sample from the system..."
    });
    
    // Simulate deletion process
    setTimeout(() => {
      toast({
        title: "Sample Deleted",
        description: "The sample has been successfully deleted."
      });
      handleCloseSampleDialog();
    }, 1500);
  };
  
  const handleRunPolicy = (policyId: string) => {
    toast({
      title: "Running Retention Policy",
      description: "Initiating data retention policy..."
    });
    
    // Simulate policy run
    setTimeout(() => {
      toast({
        title: "Policy Run Completed",
        description: "The data retention policy has been executed."
      });
    }, 3000);
  };
  
  const handlePolicyClick = (policy: RetentionPolicy) => {
    setSelectedPolicy(policy);
    
    // Update form default values
    form.reset({
      name: policy.name,
      description: policy.description,
      duration: policy.duration,
      unit: policy.unit,
      automaticDeletion: policy.automaticDeletion,
    });
    
    setIsPolicyDialogOpen(true);
  };
  
  const handleClosePolicyDialog = () => {
    setIsPolicyDialogOpen(false);
    setSelectedPolicy(null);
  };
  
  const handleCreatePolicy = () => {
    toast({
      title: "New Policy Created",
      description: "Your new data retention policy has been created."
    });
  };
  
  const handleUpdatePolicy = () => {
    toast({
      title: "Policy Updated",
      description: "The data retention policy has been updated."
    });
  };
  
  const handleDeletePolicy = (policyId: string) => {
    toast({
      title: "Deleting Policy",
      description: "Removing data retention policy..."
    });
    
    // Simulate deletion process
    setTimeout(() => {
      toast({
        title: "Policy Deleted",
        description: "The data retention policy has been successfully deleted."
      });
      handleClosePolicyDialog();
    }, 1500);
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
              Manage your water quality data, exports, and retention policies
            </p>
          </div>

          <Tabs defaultValue="samples" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="samples">
                <Database className="h-4 w-4 mr-2" />
                Water Samples
              </TabsTrigger>
              <TabsTrigger value="exports">
                <FileDown className="h-4 w-4 mr-2" />
                Data Exports
              </TabsTrigger>
              <TabsTrigger value="retention">
                <Lock className="h-4 w-4 mr-2" />
                Data Retention
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="samples">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Water Sample Management</CardTitle>
                      <CardDescription>View, search, and manage your water quality samples</CardDescription>
                      <div className="mt-2">
                        <Input 
                          placeholder="Search samples..." 
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="w-full"
                        />
                      </div>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[450px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">Name</TableHead>
                              <TableHead>Location</TableHead>
                              <TableHead>Date</TableHead>
                              <TableHead>Parameters</TableHead>
                              <TableHead>Status</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {getFilteredSamples().map(sample => (
                              <TableRow key={sample.id} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handleSampleClick(sample)}>
                                <TableCell className="font-medium">{sample.name}</TableCell>
                                <TableCell>{sample.location}</TableCell>
                                <TableCell>{sample.date}</TableCell>
                                <TableCell>{sample.parameters}</TableCell>
                                <TableCell>
                                  <Badge variant={sample.status === 'approved' ? 'outline' : (sample.status === 'rejected' ? 'destructive' : 'secondary')} className={sample.status === 'approved' ? "bg-green-100 text-green-800 border-green-300" : ""}>
                                    {sample.status}
                                  </Badge>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter>
                      <Button>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Sample
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sample Actions</CardTitle>
                      <CardDescription>Quick actions for managing samples</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full" onClick={() => handleExportData('csv')}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Export to CSV
                      </Button>
                      <Button className="w-full" onClick={() => handleExportData('excel')}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Export to Excel
                      </Button>
                      <Button className="w-full" onClick={() => handleExportData('pdf')}>
                        <FileDown className="h-4 w-4 mr-2" />
                        Generate PDF Report
                      </Button>
                      <Button variant="outline" className="w-full">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh Sample Data
                      </Button>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Last updated: 2025-04-03 17:23:00
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              {/* Sample Details Dialog */}
              <Dialog open={isSampleDialogOpen} onOpenChange={setIsSampleDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>Sample Details</DialogTitle>
                    <DialogDescription>
                      View and manage details for the selected water sample
                    </DialogDescription>
                  </DialogHeader>
                  
                  {selectedSample && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                      <div>
                        <Label>Sample Name</Label>
                        <Input value={selectedSample.name} readOnly />
                      </div>
                      <div>
                        <Label>Location</Label>
                        <Input value={selectedSample.location} readOnly />
                      </div>
                      <div>
                        <Label>Date</Label>
                        <Input value={selectedSample.date} readOnly />
                      </div>
                      <div>
                        <Label>Parameters</Label>
                        <Input value={selectedSample.parameters.toString()} readOnly />
                      </div>
                      <div>
                        <Label>Status</Label>
                        <Input value={selectedSample.status} readOnly />
                      </div>
                      <div>
                        <Label>Contaminants</Label>
                        <Input value={selectedSample.contaminants.join(", ")} readOnly />
                      </div>
                      <div className="md:col-span-2">
                        <Label>Notes</Label>
                        <Textarea value={selectedSample.notes || ""} readOnly />
                      </div>
                    </div>
                  )}
                  
                  <DialogFooter>
                    <Button type="button" variant="destructive" onClick={() => selectedSample && handleDeleteSample(selectedSample.id)}>
                      Delete Sample
                    </Button>
                    <div className="ml-auto flex gap-2">
                      <Button type="button" variant="outline" onClick={handleCloseSampleDialog}>
                        Cancel
                      </Button>
                      <Button type="submit">
                        Save Changes
                      </Button>
                    </div>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </TabsContent>
            
            <TabsContent value="exports">
              <Card>
                <CardHeader>
                  <CardTitle>Data Export Management</CardTitle>
                  <CardDescription>Track and manage your data export tasks</CardDescription>
                </CardHeader>
                <CardContent className="p-0">
                  <ScrollArea className="h-[450px]">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Type</TableHead>
                          <TableHead>Created</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Completed</TableHead>
                          <TableHead>Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {exportTasks.map(task => (
                          <TableRow key={task.id}>
                            <TableCell>{task.type.toUpperCase()}</TableCell>
                            <TableCell>{task.created}</TableCell>
                            <TableCell>
                              {task.status === 'completed' ? (
                                <Badge variant="outline" className="bg-green-100 text-green-800 border-green-300">
                                  Completed
                                </Badge>
                              ) : task.status === 'processing' ? (
                                <Badge variant="secondary">Processing</Badge>
                              ) : (
                                <Badge variant="destructive">Failed</Badge>
                              )}
                            </TableCell>
                            <TableCell>{task.completed || "N/A"}</TableCell>
                            <TableCell>
                              {task.status === 'completed' && task.fileUrl ? (
                                <Button variant="ghost" size="sm" asChild>
                                  <a href={task.fileUrl} target="_blank" rel="noopener noreferrer">
                                    Download
                                  </a>
                                </Button>
                              ) : task.status === 'failed' ? (
                                <Button variant="ghost" size="sm" className="text-red-500">
                                  View Log
                                </Button>
                              ) : (
                                <Button variant="ghost" size="sm" disabled>
                                  Pending
                                </Button>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </ScrollArea>
                </CardContent>
                <CardFooter>
                  <Button>
                    <FileUp className="h-4 w-4 mr-2" />
                    Import Data
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="retention">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                <div className="lg:col-span-3">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Retention Policies</CardTitle>
                      <CardDescription>Manage your data retention and deletion policies</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0">
                      <ScrollArea className="h-[450px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Name</TableHead>
                              <TableHead>Description</TableHead>
                              <TableHead>Duration</TableHead>
                              <TableHead>Automatic Deletion</TableHead>
                              <TableHead>Last Run</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {retentionPolicies.map(policy => (
                              <TableRow key={policy.id} className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800" onClick={() => handlePolicyClick(policy)}>
                                <TableCell className="font-medium">{policy.name}</TableCell>
                                <TableCell>{policy.description}</TableCell>
                                <TableCell>{policy.duration} {policy.unit}</TableCell>
                                <TableCell>
                                  {policy.automaticDeletion ? (
                                    <Check className="h-4 w-4 text-green-500" />
                                  ) : (
                                    <X className="h-4 w-4 text-red-500" />
                                  )}
                                </TableCell>
                                <TableCell>{policy.lastRun || "N/A"}</TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                    <CardFooter>
                      <Button onClick={() => {
                        setSelectedPolicy(null);
                        form.reset();
                        setIsPolicyDialogOpen(true);
                      }}>
                        <PlusCircle className="h-4 w-4 mr-2" />
                        Add New Policy
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Policy Actions</CardTitle>
                      <CardDescription>Quick actions for managing retention policies</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <Button className="w-full" onClick={() => handleRunPolicy("rp1")}>
                        <ServerCog className="h-4 w-4 mr-2" />
                        Run Policy Now
                      </Button>
                      <Button variant="outline" className="w-full">
                        <Archive className="h-4 w-4 mr-2" />
                        View Policy Archive
                      </Button>
                      <Button variant="destructive" className="w-full">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Purge Deleted Data
                      </Button>
                    </CardContent>
                    <CardFooter>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Next policy run: 2025-04-04 08:00:00
                      </p>
                    </CardFooter>
                  </Card>
                </div>
              </div>
              
              {/* Retention Policy Dialog */}
              <Dialog open={isPolicyDialogOpen} onOpenChange={setIsPolicyDialogOpen}>
                <DialogContent className="sm:max-w-[625px]">
                  <DialogHeader>
                    <DialogTitle>{selectedPolicy ? "Edit Policy" : "Create New Policy"}</DialogTitle>
                    <DialogDescription>
                      {selectedPolicy ? "Update the details of the selected data retention policy" : "Define a new policy for managing data retention"}
                    </DialogDescription>
                  </DialogHeader>
                  
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit((values) => {
                      // Handle form submission
                      if (selectedPolicy) {
                        // Update existing policy
                        handleUpdatePolicy();
                      } else {
                        // Create new policy
                        handleCreatePolicy();
                      }
                      handleClosePolicyDialog();
                    })} className="space-y-8">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-4">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Policy Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., Standard Retention" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Input placeholder="Brief description of the policy" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="duration"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Duration</FormLabel>
                              <FormControl>
                                <Input type="number" placeholder="e.g., 2" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="unit"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Unit</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select a unit" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="days">Days</SelectItem>
                                  <SelectItem value="months">Months</SelectItem>
                                  <SelectItem value="years">Years</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        
                        <FormField
                          control={form.control}
                          name="automaticDeletion"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">Automatic Deletion</FormLabel>
                                <FormDescription>Automatically delete data after the specified duration</FormDescription>
                              </div>
                              <FormControl>
                                <Checkbox
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <DialogFooter>
                        {selectedPolicy && (
                          <Button type="button" variant="destructive" onClick={() => selectedPolicy && handleDeletePolicy(selectedPolicy.id)}>
                            Delete Policy
                          </Button>
                        )}
                        <div className="ml-auto flex gap-2">
                          <Button type="button" variant="outline" onClick={handleClosePolicyDialog}>
                            Cancel
                          </Button>
                          <Button type="submit">
                            {selectedPolicy ? "Update Policy" : "Create Policy"}
                          </Button>
                        </div>
                      </DialogFooter>
                    </form>
                  </Form>
                </DialogContent>
              </Dialog>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default DataManagementSettings;
