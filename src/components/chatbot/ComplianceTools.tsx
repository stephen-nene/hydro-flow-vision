
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Scale, Shield, VolumeX } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function ComplianceTools() {
  const { toast } = useToast();

  const handleToolClick = (toolName: string) => {
    toast({
      title: `${toolName} Launched`,
      description: "Opening tool in new window...",
    });
  };

  return (
    <Card className="bg-white">
      <CardHeader>
        <CardTitle>Compliance Tools</CardTitle>
        <CardDescription>AI-powered regulatory compliance assistants</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-blue-100 p-2 rounded text-blue-700">
                <Scale className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Penalty Calculator</h4>
                <p className="text-sm text-gray-600">
                  Calculate potential penalties for non-compliance
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleToolClick("Penalty Calculator")}
                >
                  Open Calculator
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-purple-100 p-2 rounded text-purple-700">
                <Shield className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Regulatory Scanner</h4>
                <p className="text-sm text-gray-600">
                  Scan documents for compliance vulnerabilities
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleToolClick("Regulatory Scanner")}
                >
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
          
          <div className="p-3 rounded bg-gray-50 border border-gray-200">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 p-2 rounded text-red-700">
                <VolumeX className="h-5 w-5" />
              </div>
              <div className="flex-1 space-y-1">
                <h4 className="font-medium">Violation Resolver</h4>
                <p className="text-sm text-gray-600">
                  AI guidance to resolve existing violations
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full mt-2"
                  onClick={() => handleToolClick("Violation Resolver")}
                >
                  Start Resolution
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
