
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, Palette } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

const AppearanceSettings = () => {
  const [fontSize, setFontSize] = useState(16);
  const [colorScheme, setColorScheme] = useState("blue");
  const [reduceMotion, setReduceMotion] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [denseUI, setDenseUI] = useState(false);
  
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const handleSaveSettings = () => {
    toast({
      title: "Appearance Settings Saved",
      description: "Your appearance preferences have been updated.",
    });
  };

  const resetToDefaults = () => {
    setFontSize(16);
    setColorScheme("blue");
    setReduceMotion(false);
    setHighContrast(false);
    setDenseUI(false);
    
    toast({
      title: "Default Settings Restored",
      description: "Your appearance settings have been reset to defaults.",
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="flex">
        {!isMobile && <Sidebar />}
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
                  <Palette className="h-4 w-4 mr-1" />
                  Appearance
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className="text-3xl font-bold mb-2 text-water-dark">
              Appearance Settings
            </h1>
            <p className="text-lg text-gray-600">
              Customize how Hydra looks and feels
            </p>
          </div>

          <Tabs defaultValue="themes" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="themes">Themes</TabsTrigger>
              <TabsTrigger value="layout">Layout & Density</TabsTrigger>
              <TabsTrigger value="accessibility">Accessibility</TabsTrigger>
            </TabsList>
            
            <TabsContent value="themes">
              <Card>
                <CardHeader>
                  <CardTitle>Theme Selection</CardTitle>
                  <CardDescription>Choose your preferred color theme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Primary Color</h3>
                      <RadioGroup value={colorScheme} onValueChange={setColorScheme} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100">
                          <RadioGroupItem value="blue" id="color-blue" />
                          <div className="h-5 w-5 rounded-full bg-blue-500 mr-2"></div>
                          <Label htmlFor="color-blue" className="cursor-pointer flex-1">Blue</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100">
                          <RadioGroupItem value="green" id="color-green" />
                          <div className="h-5 w-5 rounded-full bg-green-500 mr-2"></div>
                          <Label htmlFor="color-green" className="cursor-pointer flex-1">Green</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100">
                          <RadioGroupItem value="purple" id="color-purple" />
                          <div className="h-5 w-5 rounded-full bg-purple-500 mr-2"></div>
                          <Label htmlFor="color-purple" className="cursor-pointer flex-1">Purple</Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100">
                          <RadioGroupItem value="amber" id="color-amber" />
                          <div className="h-5 w-5 rounded-full bg-amber-500 mr-2"></div>
                          <Label htmlFor="color-amber" className="cursor-pointer flex-1">Amber</Label>
                        </div>
                      </RadioGroup>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="layout">
              <Card>
                <CardHeader>
                  <CardTitle>Layout & Density</CardTitle>
                  <CardDescription>Adjust the layout density of the user interface</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Text Size</h3>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span>Small</span>
                          <span>{fontSize}px</span>
                          <span>Large</span>
                        </div>
                        <Slider value={[fontSize]} onValueChange={(values) => setFontSize(values[0])} max={24} min={12} step={1} />
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="dense-ui">Compact UI</Label>
                        <p className="text-sm text-gray-500">Reduce spacing between elements</p>
                      </div>
                      <Switch checked={denseUI} onCheckedChange={setDenseUI} id="dense-ui" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="accessibility">
              <Card>
                <CardHeader>
                  <CardTitle>Accessibility</CardTitle>
                  <CardDescription>Settings to improve your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="reduce-motion">Reduce Motion</Label>
                        <p className="text-sm text-gray-500">Minimize animations throughout the interface</p>
                      </div>
                      <Switch checked={reduceMotion} onCheckedChange={setReduceMotion} id="reduce-motion" />
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="space-y-0.5">
                        <Label htmlFor="high-contrast">High Contrast</Label>
                        <p className="text-sm text-gray-500">Enhance visual distinction between elements</p>
                      </div>
                      <Switch checked={highContrast} onCheckedChange={setHighContrast} id="high-contrast" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="mt-6 flex justify-between">
            <Button variant="outline" onClick={resetToDefaults}>
              Reset to Defaults
            </Button>
            <Button onClick={handleSaveSettings}>
              Save Settings
            </Button>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar />}
    </div>
  );
};

export default AppearanceSettings;
