
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { Home, Settings as SettingsIcon, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AccountSettings = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const [userData, setUserData] = useState({
    fullName: "John Doe",
    email: "john.doe@hydra.com",
    role: "Water Quality Specialist",
    department: "Quality Assessment",
    bio: "Water quality specialist with over 8 years of experience in environmental monitoring and compliance. Certified in advanced water treatment technologies.",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    timezone: "Eastern Time (ET)",
    language: "English"
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUserData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = () => {
    toast({
      title: "Account updated",
      description: "Your account information has been saved successfully."
    });
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
                <BreadcrumbLink asChild>
                  <Link to="/">
                    <Home className="h-4 w-4 mr-1" />
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/settings">
                    <SettingsIcon className="h-4 w-4 mr-1" />
                    Settings
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink className="flex items-center" href="/settings/account">
                  <User className="h-4 w-4 mr-1" />
                  Account
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Account Settings
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Manage your personal account information
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-1">
              <Card className={`h-full ${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <div className="flex flex-col items-center">
                    <Avatar className="h-32 w-32 mb-4">
                      <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" alt="John Doe" />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <h2 className="text-2xl font-bold">{userData.fullName}</h2>
                    <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{userData.role}</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium">Department</h3>
                      <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{userData.department}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Contact</h3>
                      <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{userData.email}</p>
                      <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{userData.phone}</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Location</h3>
                      <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{userData.location}</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Public Profile
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-2">
              <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                <CardHeader>
                  <h2 className="text-xl font-bold">Personal Information</h2>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="fullName">Full Name</Label>
                        <Input 
                          id="fullName" 
                          name="fullName" 
                          value={userData.fullName} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input 
                          id="email" 
                          name="email" 
                          type="email" 
                          value={userData.email} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="role">Job Title</Label>
                        <Input 
                          id="role" 
                          name="role" 
                          value={userData.role} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="department">Department</Label>
                        <Input 
                          id="department" 
                          name="department" 
                          value={userData.department} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input 
                          id="phone" 
                          name="phone" 
                          value={userData.phone} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="location">Location</Label>
                        <Input 
                          id="location" 
                          name="location" 
                          value={userData.location} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="timezone">Timezone</Label>
                        <Input 
                          id="timezone" 
                          name="timezone" 
                          value={userData.timezone} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="language">Language</Label>
                        <Input 
                          id="language" 
                          name="language" 
                          value={userData.language} 
                          onChange={handleInputChange}
                          className={isEmergencyMode ? 'bg-gray-800 border-gray-700 text-white' : ''}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Biography</Label>
                      <textarea 
                        id="bio" 
                        name="bio"
                        rows={4} 
                        className={`w-full min-h-[120px] rounded-md border p-3 text-sm ${
                          isEmergencyMode 
                            ? 'bg-gray-800 border-gray-700 text-white' 
                            : 'border-gray-300'
                        }`}
                        value={userData.bio} 
                        onChange={handleInputChange}
                      />
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleSaveChanges}>
                    Save Changes
                  </Button>
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

export default AccountSettings;
