
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Send, Book, Shield, FileCheck, AlertTriangle, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

const AIChatbot = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [inputMessage, setInputMessage] = useState("");
  const isMobile = useIsMobile();
  
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real implementation, this would send the message to an AI service
    console.log("Sending message:", inputMessage);
    setInputMessage("");
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
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ai-chatbot">HydroLex AI Assistant</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className={`text-2xl md:text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              HydroLex AI Legal Assistant
            </h1>
            <p className={`text-base md:text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI-powered water regulations compliance assistant
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'} h-[calc(100vh-14rem)]`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Book className="h-5 w-5 text-purple-500" />
                    Regulatory Assistant Chat
                  </CardTitle>
                  <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                    Ask in plain English about water regulations and compliance
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex-1 overflow-auto">
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className={`p-3 rounded-lg ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-100'} max-w-[80%]`}>
                        <p className="text-sm">Welcome to HydroLex! How can I assist you with water regulations today?</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-3 justify-end">
                      <div className={`p-3 rounded-lg bg-blue-600 text-white max-w-[80%]`}>
                        <p className="text-sm">Is 0.3ppm lead level illegal in Kenya?</p>
                      </div>
                      <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>ME</AvatarFallback>
                      </Avatar>
                    </div>
                    
                    <div className="flex gap-3">
                      <Avatar>
                        <AvatarFallback>AI</AvatarFallback>
                      </Avatar>
                      <div className={`p-3 rounded-lg ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-100'} max-w-[80%]`}>
                        <p className="text-sm">Yes, 0.3ppm lead exceeds Kenya's Environmental Management and Coordination (Water Quality) Regulations limit of 0.05ppm for drinking water. I recommend the Ion Exchange Filter (D&S SKU #FX-203) for remediation. Would you like me to generate a compliance report?</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <form onSubmit={handleSendMessage} className="flex w-full gap-2">
                    <Input
                      placeholder="Ask about water regulations..."
                      value={inputMessage}
                      onChange={(e) => setInputMessage(e.target.value)}
                      className={isEmergencyMode ? 'bg-gray-900 border-gray-800' : ''}
                    />
                    <Button type="submit" size="icon">
                      <Send className="h-4 w-4" />
                    </Button>
                  </form>
                </CardFooter>
              </Card>
            </div>
            
            <div className="space-y-6">
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-green-500" />
                    Compliance Tools
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button className="w-full flex items-center justify-start gap-2">
                    <FileCheck className="h-4 w-4" />
                    Generate Compliance Report
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center justify-start gap-2">
                    <AlertTriangle className="h-4 w-4" />
                    Risk Assessment
                  </Button>
                  
                  <Button variant="outline" className="w-full flex items-center justify-start gap-2">
                    <Scale className="h-4 w-4" />
                    Regulatory Cross-Check
                  </Button>
                </CardContent>
              </Card>
              
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Quick References</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className={`p-3 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'} border ${isEmergencyMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className="text-sm font-medium">WHO Drinking Standards</p>
                      <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Global guidelines for drinking water quality</p>
                    </div>
                    
                    <div className={`p-3 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'} border ${isEmergencyMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className="text-sm font-medium">Local Regulations</p>
                      <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Country-specific water quality laws</p>
                    </div>
                    
                    <div className={`p-3 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'} border ${isEmergencyMode ? 'border-gray-800' : 'border-gray-200'}`}>
                      <p className="text-sm font-medium">Treatment Solutions</p>
                      <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>Recommended products for compliance</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <p className={`text-xs italic ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    "Avoid million-dollar fines—let AI be your water lawyer"
                  </p>
                </CardFooter>
              </Card>
            </div>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default AIChatbot;
