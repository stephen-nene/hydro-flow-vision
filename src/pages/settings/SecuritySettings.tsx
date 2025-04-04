
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, Shield, Lock, Eye, EyeOff, AlertTriangle, History, Smartphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

const SecuritySettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(true);
  const [twoFactorMethod, setTwoFactorMethod] = useState("app");
  const [dataRetentionPeriod, setDataRetentionPeriod] = useState("1-year");
  const [sessionTimeout, setSessionTimeout] = useState("30-minutes");
  const [showLoginHistory, setShowLoginHistory] = useState(true);
  
  // Password strength calculation
  const calculatePasswordStrength = (password: string) => {
    if (!password) return 0;
    
    let score = 0;
    
    // Length check
    if (password.length >= 8) score += 20;
    if (password.length >= 12) score += 10;
    
    // Complexity checks
    if (/[A-Z]/.test(password)) score += 20; // Has uppercase
    if (/[a-z]/.test(password)) score += 10; // Has lowercase
    if (/[0-9]/.test(password)) score += 20; // Has number
    if (/[^A-Za-z0-9]/.test(password)) score += 20; // Has special char
    
    return Math.min(score, 100);
  };
  
  const passwordStrength = calculatePasswordStrength(newPassword);
  
  const getPasswordStrengthLabel = () => {
    if (passwordStrength >= 80) return { label: "Strong", color: "bg-green-500" };
    if (passwordStrength >= 50) return { label: "Medium", color: "bg-amber-500" };
    return { label: "Weak", color: "bg-red-500" };
  };
  
  const strengthInfo = getPasswordStrengthLabel();
  
  // Mock login history
  const loginHistory = [
    { id: 1, date: "2025-04-03 08:45 AM", ip: "192.168.1.105", location: "San Francisco, CA", device: "Chrome on Windows", status: "success" },
    { id: 2, date: "2025-04-01 02:30 PM", ip: "192.168.1.105", location: "San Francisco, CA", device: "Mobile App on iOS", status: "success" },
    { id: 3, date: "2025-03-28 11:15 AM", ip: "45.23.126.87", location: "New York, NY", device: "Safari on MacOS", status: "success" },
    { id: 4, date: "2025-03-25 09:20 PM", ip: "117.98.45.12", location: "Beijing, China", device: "Chrome on Windows", status: "failed" },
  ];
  
  const handlePasswordChange = () => {
    // Validation checks
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast({
        title: "Missing Information",
        description: "Please fill in all password fields.",
        variant: "destructive"
      });
      return;
    }
    
    if (newPassword !== confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "New password and confirmation do not match.",
        variant: "destructive"
      });
      return;
    }
    
    if (passwordStrength < 50) {
      toast({
        title: "Weak Password",
        description: "Please choose a stronger password.",
        variant: "destructive"
      });
      return;
    }
    
    // Success case
    toast({
      title: "Password Updated",
      description: "Your password has been changed successfully."
    });
    
    // Reset fields
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };
  
  const handleTwoFactorToggle = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    
    toast({
      title: checked ? "Two-Factor Authentication Enabled" : "Two-Factor Authentication Disabled",
      description: checked 
        ? "Your account is now more secure." 
        : "Warning: Your account is less secure without 2FA.",
      variant: checked ? "default" : "destructive"
    });
  };
  
  const handleSavePrivacySettings = () => {
    toast({
      title: "Privacy Settings Saved",
      description: "Your privacy preferences have been updated."
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
                  <Shield className="h-4 w-4 mr-1" />
                  Security & Privacy
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Security & Privacy
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your account security and privacy settings
            </p>
          </div>

          <Tabs defaultValue="password" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="password">Password</TabsTrigger>
              <TabsTrigger value="two-factor">Two-Factor Authentication</TabsTrigger>
              <TabsTrigger value="privacy">Privacy & Data</TabsTrigger>
            </TabsList>
            
            <TabsContent value="password">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-blue-500" />
                    Password Management
                  </CardTitle>
                  <CardDescription>Change your password to keep your account secure</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <div className="relative">
                        <Input
                          id="current-password"
                          type={showPassword ? "text" : "password"}
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          placeholder="Enter your current password"
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <div className="relative">
                        <Input
                          id="new-password"
                          type={showPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          type="button"
                          className="absolute right-2 top-1/2 transform -translate-y-1/2"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                      </div>
                      
                      {newPassword && (
                        <div className="mt-2 space-y-1">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Password Strength:</span>
                            <Badge className={strengthInfo.color}>{strengthInfo.label}</Badge>
                          </div>
                          <Progress value={passwordStrength} className={strengthInfo.color} />
                          <ul className="text-xs text-gray-500 dark:text-gray-400 mt-2 space-y-1">
                            <li className={newPassword.length >= 8 ? "text-green-600" : ""}>• Minimum 8 characters</li>
                            <li className={/[A-Z]/.test(newPassword) ? "text-green-600" : ""}>• At least one uppercase letter</li>
                            <li className={/[0-9]/.test(newPassword) ? "text-green-600" : ""}>• At least one number</li>
                            <li className={/[^A-Za-z0-9]/.test(newPassword) ? "text-green-600" : ""}>• At least one special character</li>
                          </ul>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input
                        id="confirm-password"
                        type={showPassword ? "text" : "password"}
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                      />
                      {confirmPassword && newPassword !== confirmPassword && (
                        <p className="text-sm text-red-500 mt-1">Passwords do not match</p>
                      )}
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline">
                    Reset Password by Email
                  </Button>
                  <Button onClick={handlePasswordChange}>
                    Update Password
                  </Button>
                </CardFooter>
              </Card>
              
              {showLoginHistory && (
                <Card className="mt-6">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <History className="h-5 w-5 text-blue-500" />
                      Recent Login Activity
                    </CardTitle>
                    <CardDescription>Monitor your account's recent login history</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left py-3 px-2">Date & Time</th>
                            <th className="text-left py-3 px-2">IP Address</th>
                            <th className="text-left py-3 px-2">Location</th>
                            <th className="text-left py-3 px-2">Device</th>
                            <th className="text-left py-3 px-2">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {loginHistory.map((login) => (
                            <tr key={login.id} className="border-b hover:bg-gray-50 dark:hover:bg-gray-900">
                              <td className="py-3 px-2">{login.date}</td>
                              <td className="py-3 px-2">{login.ip}</td>
                              <td className="py-3 px-2">{login.location}</td>
                              <td className="py-3 px-2">{login.device}</td>
                              <td className="py-3 px-2">
                                <Badge
                                  variant={login.status === "success" ? "outline" : "destructive"}
                                  className={login.status === "success" ? "bg-green-100 text-green-800" : ""}
                                >
                                  {login.status === "success" ? "Success" : "Failed"}
                                </Badge>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full" onClick={() => {
                      toast({
                        title: "Full Activity Report",
                        description: "Generating complete login activity report..."
                      });
                    }}>
                      View Complete Login History
                    </Button>
                  </CardFooter>
                </Card>
              )}
            </TabsContent>
            
            <TabsContent value="two-factor">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-blue-500" />
                    Two-Factor Authentication
                  </CardTitle>
                  <CardDescription>Add an extra layer of security to your account</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between border-b pb-4">
                    <div className="space-y-0.5">
                      <h3 className="text-base font-medium">Enable Two-Factor Authentication</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Require a second form of verification when signing in</p>
                    </div>
                    <Switch checked={twoFactorEnabled} onCheckedChange={handleTwoFactorToggle} />
                  </div>
                  
                  {twoFactorEnabled && (
                    <div className="space-y-4 pt-2">
                      <h3 className="text-base font-medium">Authentication Method</h3>
                      <RadioGroup value={twoFactorMethod} onValueChange={setTwoFactorMethod}>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="app" id="app" />
                          <Label htmlFor="app" className="cursor-pointer flex-1">
                            <span className="font-medium">Authenticator App</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Use Google Authenticator, Authy, or similar apps</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="sms" id="sms" />
                          <Label htmlFor="sms" className="cursor-pointer flex-1">
                            <span className="font-medium">SMS Authentication</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive a verification code via text message</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="email" id="email" />
                          <Label htmlFor="email" className="cursor-pointer flex-1">
                            <span className="font-medium">Email Authentication</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Receive a verification code via email</p>
                          </Label>
                        </div>
                      </RadioGroup>
                      
                      <div className="pt-4">
                        {twoFactorMethod === "app" && (
                          <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 text-center">
                            <div className="inline-block p-2 bg-white rounded-md border mb-4">
                              <div className="w-40 h-40 bg-gray-200 mx-auto flex items-center justify-center text-xs text-gray-600">
                                [QR Code Placeholder]
                              </div>
                            </div>
                            <p className="text-sm mb-2">Scan this QR code with your authenticator app</p>
                            <p className="text-xs text-gray-500">Or enter this code manually: <span className="font-mono">HTRA 4DEF 2X9P L3KW</span></p>
                          </div>
                        )}
                        
                        {twoFactorMethod === "sms" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="phone-number">Phone Number</Label>
                              <Input id="phone-number" placeholder="+1 (555) 123-4567" />
                            </div>
                            <Button onClick={() => {
                              toast({
                                title: "Verification Code Sent",
                                description: "Check your phone for a verification code"
                              });
                            }}>
                              Send Verification Code
                            </Button>
                          </div>
                        )}
                        
                        {twoFactorMethod === "email" && (
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label htmlFor="email-2fa">Email</Label>
                              <Input id="email-2fa" type="email" value="john.doe@example.com" disabled />
                              <p className="text-xs text-gray-500">This is your account email address</p>
                            </div>
                            <Button onClick={() => {
                              toast({
                                title: "Verification Code Sent",
                                description: "Check your email for a verification code"
                              });
                            }}>
                              Send Verification Code
                            </Button>
                          </div>
                        )}
                      </div>
                      
                      <div className="border-t pt-4 mt-4">
                        <h3 className="text-base font-medium mb-2">Recovery Options</h3>
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast({
                            title: "Recovery Codes Generated",
                            description: "Store these codes in a secure location"
                          });
                        }}>
                          Generate Recovery Codes
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
                <CardFooter>
                  {twoFactorEnabled && (
                    <p className="text-xs flex items-center">
                      <AlertTriangle className="h-3 w-3 text-amber-500 mr-1" />
                      Two-factor authentication significantly improves your account security
                    </p>
                  )}
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="privacy">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5 text-blue-500" />
                    Privacy & Data Settings
                  </CardTitle>
                  <CardDescription>Manage how your data is stored and used</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Data Retention</h3>
                      <RadioGroup value={dataRetentionPeriod} onValueChange={setDataRetentionPeriod}>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="3-months" id="3-months" />
                          <Label htmlFor="3-months" className="cursor-pointer flex-1">
                            <span className="font-medium">3 Months</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Minimum required for regulatory compliance</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="1-year" id="1-year" />
                          <Label htmlFor="1-year" className="cursor-pointer flex-1">
                            <span className="font-medium">1 Year</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Recommended for typical use cases</p>
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                          <RadioGroupItem value="5-years" id="5-years" />
                          <Label htmlFor="5-years" className="cursor-pointer flex-1">
                            <span className="font-medium">5 Years</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Extended historical analysis</p>
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Session Management</h3>
                      <div className="space-y-2">
                        <Label htmlFor="session-timeout">Session Timeout</Label>
                        <RadioGroup value={sessionTimeout} onValueChange={setSessionTimeout}>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                              <RadioGroupItem value="15-minutes" id="15-minutes" />
                              <Label htmlFor="15-minutes" className="cursor-pointer">15 Minutes</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                              <RadioGroupItem value="30-minutes" id="30-minutes" />
                              <Label htmlFor="30-minutes" className="cursor-pointer">30 Minutes</Label>
                            </div>
                            <div className="flex items-center space-x-2 border rounded-md p-4 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800">
                              <RadioGroupItem value="1-hour" id="1-hour" />
                              <Label htmlFor="1-hour" className="cursor-pointer">1 Hour</Label>
                            </div>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Activity Monitoring</h3>
                      <div className="flex items-center justify-between">
                        <div className="space-y-0.5">
                          <Label htmlFor="login-history">Login History</Label>
                          <p className="text-sm text-gray-500 dark:text-gray-400">Show recent login activity on your account</p>
                        </div>
                        <Switch checked={showLoginHistory} onCheckedChange={setShowLoginHistory} id="login-history" />
                      </div>
                    </div>
                    
                    <div className="pt-4 border-t">
                      <h3 className="text-lg font-medium mb-3">Data Export & Deletion</h3>
                      <div className="space-y-3">
                        <Button variant="outline" className="w-full" onClick={() => {
                          toast({
                            title: "Data Export Started",
                            description: "Your data export is being prepared and will be emailed to you"
                          });
                        }}>
                          Request Data Export
                        </Button>
                        <Button variant="outline" className="w-full text-red-500 hover:text-red-600 hover:bg-red-50" onClick={() => {
                          toast({
                            title: "Account Deletion",
                            description: "Please contact your administrator to delete your account",
                            variant: "destructive"
                          });
                        }}>
                          Request Account Deletion
                        </Button>
                      </div>
                      <p className="text-xs text-gray-500 mt-2">
                        Note: Account deletion requires administrator approval due to regulatory requirements
                      </p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="ml-auto" onClick={handleSavePrivacySettings}>
                    Save Privacy Settings
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default SecuritySettings;
