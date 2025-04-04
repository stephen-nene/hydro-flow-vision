import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Rocket, Ghost, Home, RefreshCw, AlertCircle, Search, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [isExploring, setIsExploring] = useState(false);
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );

    // Initial terminal output
    setTerminalOutput([
      "$ system diagnostics running...",
      `$ ERROR 404: Route "${location.pathname}" not found`,
      "$ checking possible solutions...",
      "$ type 'help' for options"
    ]);
  }, [location.pathname]);

  const handleSearch = () => {
    if (searchQuery.trim()) {
      toast({
        title: "Search initiated",
        description: `Looking for "${searchQuery}"`,
      });
      // Simulate search action
      setTimeout(() => {
        toast({
          title: "Search complete",
          description: `No results found for "${searchQuery}"`,
          variant: "destructive",
        });
      }, 1500);
    }
  };

  const addTerminalOutput = (command: string) => {
    const newOutput = [...terminalOutput, `$ ${command}`];
    
    if (command === "help") {
      newOutput.push(
        "Available commands:",
        "- home: navigate to homepage",
        "- explore: discover our site",
        "- refresh: reload current page",
        "- clear: clean terminal"
      );
    } else if (command === "home") {
      navigate("/");
    } else if (command === "explore") {
      setIsExploring(true);
      newOutput.push("Launching exploration mode...");
    } else if (command === "refresh") {
      window.location.reload();
    } else if (command === "clear") {
      setTerminalOutput([]);
      return;
    } else {
      newOutput.push(`Command not found: ${command}`);
    }

    setTerminalOutput(newOutput);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-gray-800 p-4">
      <motion.div 
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-2xl"
      >
        <Card className="bg-background/90 backdrop-blur-sm border-gray-700">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertCircle className="w-8 h-8 text-red-500" />
              <div>
                <CardTitle className="text-3xl flex items-center gap-2">
                  404 <Ghost className={cn("w-6 h-6", isHovered && "animate-bounce")} />
                </CardTitle>
                <CardDescription className="text-lg">
                  Houston, we have a problem!
                </CardDescription>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <div>
              <p className="text-muted-foreground mb-2">
                The page at <code className="bg-gray-800 px-2 py-1 rounded">{location.pathname}</code> doesn't exist.
              </p>
              
              <div className="flex gap-2 mt-4">
                <Button 
                  variant="default" 
                  onClick={() => navigate("/")}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  <Home className="mr-2 h-4 w-4" /> Go Home
                </Button>
                
                <Button 
                  variant="outline" 
                  onClick={() => window.location.reload()}
                >
                  <RefreshCw className="mr-2 h-4 w-4" /> Retry
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <p className="font-medium">Looking for something specific?</p>
              <div className="flex gap-2">
                <Input 
                  placeholder="Search our site..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <Button onClick={handleSearch}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
            </div>

            <div className="border-t border-gray-700 pt-4">
              <div className="flex items-center gap-2 mb-3">
                <Terminal className="w-5 h-5 text-green-400" />
                <p className="font-mono text-sm">Debug Terminal</p>
              </div>
              
              <div className="bg-black rounded-lg p-4 font-mono text-sm h-48 overflow-y-auto">
                {terminalOutput.map((line, i) => (
                  <p key={i} className={i < 4 ? "text-gray-400" : "text-gray-200"}>
                    {line}
                  </p>
                ))}
              </div>
              
              <Input 
                placeholder="Type 'help' for options"
                className="mt-2 font-mono"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    addTerminalOutput(e.currentTarget.value);
                    e.currentTarget.value = "";
                  }
                }}
              />
            </div>
          </CardContent>

          <CardFooter className="flex justify-between border-t border-gray-700 pt-4">
            <p className="text-sm text-muted-foreground">
              Need help? Contact support
            </p>
            <Button variant="ghost" className="text-primary hover:text-primary">
              <Rocket className="mr-2 h-4 w-4" /> Emergency Beam
            </Button>
          </CardFooter>
        </Card>

        {isExploring && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6"
          >
            <Card>
              <CardHeader>
                <CardTitle>Explore Our Site</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={() => navigate("/features")}>
                  Features
                </Button>
                <Button variant="outline" onClick={() => navigate("/blog")}>
                  Blog
                </Button>
                <Button variant="outline" onClick={() => navigate("/pricing")}>
                  Pricing
                </Button>
                <Button variant="outline" onClick={() => navigate("/contact")}>
                  Contact
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
};

export default NotFound;