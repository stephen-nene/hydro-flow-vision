
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { AlertTriangle, TestTube, FileText, Send } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

export function QuickActions() {
  const [runningAnalysis, setRunningAnalysis] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [reportDialogOpen, setReportDialogOpen] = useState(false);
  const [notifyDialogOpen, setNotifyDialogOpen] = useState(false);
  const [treatmentDialogOpen, setTreatmentDialogOpen] = useState(false);
  const { toast } = useToast();

  const handleRunAnalysis = () => {
    setRunningAnalysis(true);
    setAnalysisProgress(0);
    
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setRunningAnalysis(false);
          toast({
            title: "Analysis Complete",
            description: "Water sample analysis has been completed successfully.",
          });
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleGenerateReport = () => {
    setReportDialogOpen(true);
  };

  const confirmGenerateReport = (event: React.FormEvent) => {
    event.preventDefault();
    setReportDialogOpen(false);
    
    toast({
      title: "Report Generated",
      description: "Your water quality report has been generated and is available for download.",
    });
  };

  const handleNotifyTeam = () => {
    setNotifyDialogOpen(true);
  };

  const confirmNotifyTeam = (event: React.FormEvent) => {
    event.preventDefault();
    setNotifyDialogOpen(false);
    
    toast({
      title: "Team Notified",
      description: "Your message has been sent to all team members.",
    });
  };

  const handleTreatmentOptions = () => {
    setTreatmentDialogOpen(true);
  };

  const confirmTreatmentAction = (event: React.FormEvent) => {
    event.preventDefault();
    setTreatmentDialogOpen(false);
    
    toast({
      title: "Treatment Plan Created",
      description: "Your treatment plan has been created and added to the schedule.",
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-water-dark">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-3">
        <Dialog open={runningAnalysis}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-1 text-sm bg-white border-gray-200 hover:bg-gray-50"
              onClick={handleRunAnalysis}
            >
              <TestTube className="h-6 w-6 text-water-dark" />
              <span>Run Analysis</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Running Water Analysis</DialogTitle>
              <DialogDescription>
                Analyzing water sample components and quality indicators...
              </DialogDescription>
            </DialogHeader>
            <div className="py-6">
              <Progress value={analysisProgress} className="h-2 mb-2" />
              <div className="text-sm text-gray-500 flex justify-between">
                <span>Processing...</span>
                <span>{analysisProgress}%</span>
              </div>
              <div className="mt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Collecting sample data</span>
                  <span className="text-green-600">Complete</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Analyzing chemical composition</span>
                  <span className={analysisProgress >= 40 ? "text-green-600" : "text-gray-500"}>
                    {analysisProgress >= 40 ? "Complete" : "In progress..."}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Detecting contaminants</span>
                  <span className={analysisProgress >= 60 ? "text-green-600" : "text-gray-500"}>
                    {analysisProgress >= 60 ? "Complete" : "Waiting..."}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Assessing quality indicators</span>
                  <span className={analysisProgress >= 80 ? "text-green-600" : "text-gray-500"}>
                    {analysisProgress >= 80 ? "Complete" : "Waiting..."}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Generating comprehensive report</span>
                  <span className={analysisProgress >= 100 ? "text-green-600" : "text-gray-500"}>
                    {analysisProgress >= 100 ? "Complete" : "Waiting..."}
                  </span>
                </div>
              </div>
            </div>
            <DialogFooter>
              {analysisProgress >= 100 ? (
                <DialogClose asChild>
                  <Button>View Results</Button>
                </DialogClose>
              ) : (
                <Button variant="outline" disabled>Processing...</Button>
              )}
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <Dialog open={reportDialogOpen} onOpenChange={setReportDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-1 text-sm bg-white border-gray-200 hover:bg-gray-50"
              onClick={handleGenerateReport}
            >
              <FileText className="h-6 w-6 text-water-dark" />
              <span>Generate Report</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={confirmGenerateReport}>
              <DialogHeader>
                <DialogTitle>Generate Water Quality Report</DialogTitle>
                <DialogDescription>
                  Customize your report settings below.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="report-type" className="text-right">
                    Report Type
                  </Label>
                  <Select defaultValue="comprehensive">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="comprehensive">Comprehensive Analysis</SelectItem>
                      <SelectItem value="contaminants">Contaminants Only</SelectItem>
                      <SelectItem value="compliance">Regulatory Compliance</SelectItem>
                      <SelectItem value="treatment">Treatment Recommendations</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time-period" className="text-right">
                    Time Period
                  </Label>
                  <Select defaultValue="last-30">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select time period" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="last-7">Last 7 days</SelectItem>
                      <SelectItem value="last-30">Last 30 days</SelectItem>
                      <SelectItem value="last-90">Last 90 days</SelectItem>
                      <SelectItem value="custom">Custom Range</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="format" className="text-right">
                    Format
                  </Label>
                  <Select defaultValue="pdf">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select report format" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF Document</SelectItem>
                      <SelectItem value="excel">Excel Spreadsheet</SelectItem>
                      <SelectItem value="csv">CSV File</SelectItem>
                      <SelectItem value="interactive">Interactive Dashboard</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div></div>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-charts" defaultChecked />
                      <Label htmlFor="include-charts">Include charts and graphs</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-recommendations" defaultChecked />
                      <Label htmlFor="include-recommendations">Include recommendations</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-history" defaultChecked />
                      <Label htmlFor="include-history">Include historical comparison</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Generate</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={notifyDialogOpen} onOpenChange={setNotifyDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="h-24 flex flex-col items-center justify-center space-y-1 text-sm bg-white border-gray-200 hover:bg-gray-50"
              onClick={handleNotifyTeam}
            >
              <Send className="h-6 w-6 text-water-dark" />
              <span>Notify Team</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={confirmNotifyTeam}>
              <DialogHeader>
                <DialogTitle>Notify Team</DialogTitle>
                <DialogDescription>
                  Send an important message to your team members.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="recipients" className="text-right">
                    Recipients
                  </Label>
                  <Select defaultValue="all">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select recipients" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Team Members</SelectItem>
                      <SelectItem value="technicians">Field Technicians</SelectItem>
                      <SelectItem value="managers">Managers</SelectItem>
                      <SelectItem value="analysts">Data Analysts</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="priority" className="text-right">
                    Priority
                  </Label>
                  <Select defaultValue="medium">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="subject" className="text-right">
                    Subject
                  </Label>
                  <Input
                    id="subject"
                    placeholder="Enter message subject"
                    className="col-span-3"
                    defaultValue="Water Quality Update"
                  />
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="message" className="text-right pt-2">
                    Message
                  </Label>
                  <textarea
                    id="message"
                    className="col-span-3 flex min-h-[100px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    placeholder="Enter your message here"
                    defaultValue="New water quality test results have been uploaded to the system. Please review at your earliest convenience."
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <div></div>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-email" defaultChecked />
                      <Label htmlFor="send-email">Send via email</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-sms" />
                      <Label htmlFor="send-sms">Send via SMS</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="send-app" defaultChecked />
                      <Label htmlFor="send-app">Send as in-app notification</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Send Notification</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        <Dialog open={treatmentDialogOpen} onOpenChange={setTreatmentDialogOpen}>
          <DialogTrigger asChild>
            <Button 
              className="h-24 flex flex-col items-center justify-center space-y-1 text-sm bg-water-dark hover:bg-water-dark/90"
              onClick={handleTreatmentOptions}
            >
              <AlertTriangle className="h-6 w-6" />
              <span>Treatment Options</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <form onSubmit={confirmTreatmentAction}>
              <DialogHeader>
                <DialogTitle>
                  Water Treatment Options
                </DialogTitle>
                <DialogDescription>
                  Select appropriate treatment methods for the current water quality conditions.
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="water-source" className="text-right">
                    Water Source
                  </Label>
                  <Select defaultValue="municipal">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select water source" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="municipal">Municipal Supply</SelectItem>
                      <SelectItem value="groundwater">Groundwater Well</SelectItem>
                      <SelectItem value="surface">Surface Water</SelectItem>
                      <SelectItem value="rainwater">Rainwater Collection</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treatment-goal" className="text-right">
                    Treatment Goal
                  </Label>
                  <Select defaultValue="contaminant">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select primary goal" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contaminant">Contaminant Removal</SelectItem>
                      <SelectItem value="disinfection">Disinfection</SelectItem>
                      <SelectItem value="minerals">Mineral Balancing</SelectItem>
                      <SelectItem value="taste">Taste & Odor Improvement</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="treatment-method" className="text-right">
                    Treatment Method
                  </Label>
                  <Select defaultValue="multi">
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select treatment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="filtration">Filtration</SelectItem>
                      <SelectItem value="chemical">Chemical Treatment</SelectItem>
                      <SelectItem value="biological">Biological Treatment</SelectItem>
                      <SelectItem value="multi">Multi-Stage Treatment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-4 items-start gap-4">
                  <Label htmlFor="options" className="text-right pt-2">
                    Options
                  </Label>
                  <div className="col-span-3 space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="carbon" defaultChecked />
                      <Label htmlFor="carbon">Activated Carbon Filtration</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="uv" defaultChecked />
                      <Label htmlFor="uv">UV Disinfection</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="chlorination" defaultChecked />
                      <Label htmlFor="chlorination">Chlorination</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ro" />
                      <Label htmlFor="ro">Reverse Osmosis</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="ion" />
                      <Label htmlFor="ion">Ion Exchange</Label>
                    </div>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Apply Treatment Plan</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
