
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList } from "@/components/ui/breadcrumb";
import { 
  Home, 
  User, 
  Calendar, 
  Award, 
  FileText, 
  RefreshCw, 
  MapPin, 
  Briefcase, 
  Mail, 
  Phone, 
  Clock,
  Edit,
  Shield
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const Profile = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editField, setEditField] = useState<{
    label: string;
    id: string;
    value: string;
    type?: string;
  }>({ label: "", id: "", value: "" });
  
  const [userData, setUserData] = useState({
    id: "12345",
    fullName: "John Doe",
    title: "Water Quality Specialist",
    email: "john.doe@hydra.com",
    phone: "+1 (555) 123-4567",
    location: "Boston, MA",
    department: "Quality Assessment",
    joinDate: "January 15, 2020",
    bio: "Water quality specialist with over 8 years of experience in environmental monitoring and compliance. Certified in advanced water treatment technologies.",
    experience: [
      {
        id: "exp1",
        title: "Senior Water Quality Specialist",
        company: "Hydra Corp",
        location: "Boston, MA",
        from: "Jan 2020",
        to: "Present",
        description: "Lead water quality monitoring and assessment for municipal water systems."
      },
      {
        id: "exp2",
        title: "Water Quality Analyst",
        company: "EcoWaters Inc",
        location: "Portland, OR",
        from: "Jun 2016",
        to: "Dec 2019",
        description: "Conducted water sample analysis and prepared compliance reports."
      },
      {
        id: "exp3",
        title: "Environmental Technician",
        company: "Clear Waters Labs",
        location: "Seattle, WA",
        from: "Aug 2014",
        to: "May 2016",
        description: "Assisted with laboratory testing and field sample collection."
      }
    ],
    certifications: [
      {
        id: "cert1",
        title: "Certified Water Quality Analyst",
        issuer: "American Water Works Association",
        date: "2018",
        expires: "2024"
      },
      {
        id: "cert2",
        title: "Advanced Environmental Monitoring Certification",
        issuer: "Environmental Protection Agency",
        date: "2019",
        expires: "2025"
      },
      {
        id: "cert3",
        title: "Water Treatment Specialist Level III",
        issuer: "Water Environment Federation",
        date: "2021",
        expires: "2026"
      }
    ],
    skills: [
      { name: "Water Quality Analysis", level: 95 },
      { name: "Environmental Compliance", level: 90 },
      { name: "Laboratory Techniques", level: 85 },
      { name: "Data Analysis", level: 80 },
      { name: "Treatment Technologies", level: 88 },
      { name: "Regulatory Reporting", level: 92 },
      { name: "Field Sampling", level: 85 }
    ],
    recentActivity: [
      {
        id: "act1",
        action: "Submitted water quality report",
        date: "Today, 9:45 AM",
        description: "Quarterly compliance report for Downtown water treatment facility"
      },
      {
        id: "act2",
        action: "Reviewed sample analysis",
        date: "Yesterday, 2:30 PM",
        description: "Analysis of industrial outflow samples from North District"
      },
      {
        id: "act3",
        action: "Updated treatment parameters",
        date: "2 days ago",
        description: "Adjusted chlorination settings for Main Street reservoir"
      },
      {
        id: "act4",
        action: "Completed field inspection",
        date: "4 days ago",
        description: "On-site assessment of Westside distribution network"
      }
    ]
  });

  const handleEditClick = (label: string, id: string, value: string, type: string = "text") => {
    setEditField({ label, id, value, type });
    setIsEditDialogOpen(true);
  };

  const handleEditSave = () => {
    // This is a simplified example - in a real application, you would update the specific field
    toast({
      title: "Profile updated",
      description: `Updated ${editField.label.toLowerCase()} successfully.`
    });
    setIsEditDialogOpen(false);
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
                <BreadcrumbLink className="flex items-center" href="/profile">
                  <User className="h-4 w-4 mr-1" />
                  Profile
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div className="lg:col-span-1">
              <Card className={`h-full ${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader className="text-center">
                  <div className="relative mx-auto">
                    <Avatar className="h-32 w-32 mb-4 mx-auto border-4 border-white shadow-lg">
                      <AvatarImage src="https://images.unsplash.com/photo-1599566150163-29194dcaad36" alt={userData.fullName} />
                      <AvatarFallback>JD</AvatarFallback>
                    </Avatar>
                    <Button 
                      size="icon" 
                      className="absolute bottom-3 right-0 h-8 w-8 rounded-full"
                      onClick={() => toast({
                        description: "Upload profile picture functionality would be here"
                      })}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  </div>
                  <CardTitle className="text-2xl">{userData.fullName}</CardTitle>
                  <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                    {userData.title}
                  </CardDescription>
                  <div className="flex justify-center gap-2 mt-2">
                    <Badge variant="outline" className="bg-blue-50 text-blue-700 hover:bg-blue-100">
                      <Shield className="h-3 w-3 mr-1" />
                      Administrator
                    </Badge>
                    <Badge variant="outline" className="bg-green-50 text-green-700 hover:bg-green-100">
                      <Award className="h-3 w-3 mr-1" />
                      Certified
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <Mail className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Email</p>
                        <p className={`text-sm truncate ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {userData.email}
                        </p>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick("Email", "email", userData.email, "email")}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Phone</p>
                        <p className={`text-sm truncate ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {userData.phone}
                        </p>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick("Phone", "phone", userData.phone)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Location</p>
                        <p className={`text-sm truncate ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {userData.location}
                        </p>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick("Location", "location", userData.location)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Briefcase className="h-4 w-4 text-gray-500" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium">Department</p>
                        <p className={`text-sm truncate ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {userData.department}
                        </p>
                      </div>
                      <Button 
                        size="icon" 
                        variant="ghost" 
                        className="h-8 w-8"
                        onClick={() => handleEditClick("Department", "department", userData.department)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <div>
                        <p className="text-sm font-medium">Joined</p>
                        <p className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                          {userData.joinDate}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-center">
                  <Button asChild variant="outline" className="w-full">
                    <Link to="/settings/account">
                      Edit Account Settings
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </div>
            
            <div className="lg:col-span-3">
              <Tabs defaultValue="about" className="space-y-6">
                <TabsList className="w-full grid grid-cols-2 md:grid-cols-4">
                  <TabsTrigger value="about">About</TabsTrigger>
                  <TabsTrigger value="experience">Experience</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="activity">Activity</TabsTrigger>
                </TabsList>
                
                <TabsContent value="about" className="space-y-6">
                  <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>About Me</CardTitle>
                        <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                          Professional background and expertise
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-8"
                        onClick={() => handleEditClick("Bio", "bio", userData.bio)}
                      >
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <p className={`whitespace-pre-line ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {userData.bio}
                      </p>
                    </CardContent>
                  </Card>
                  
                  <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Certifications</CardTitle>
                        <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                          Professional certifications and qualifications
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          toast({
                            description: "Add certification functionality would be here"
                          });
                        }}
                      >
                        Add Certification
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {userData.certifications.map((cert, index) => (
                          <div key={cert.id} className="relative">
                            {index > 0 && <Separator className="mb-4" />}
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                              <div className="flex-1">
                                <h3 className="text-lg font-semibold">{cert.title}</h3>
                                <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>{cert.issuer}</p>
                              </div>
                              <div className="flex items-center gap-1">
                                <Badge variant="outline" className="whitespace-nowrap">
                                  <Calendar className="h-3 w-3 mr-1" />
                                  {cert.date}
                                </Badge>
                                <Badge variant="outline" className="whitespace-nowrap bg-amber-50 text-amber-800 border-amber-200">
                                  <Clock className="h-3 w-3 mr-1" />
                                  Expires {cert.expires}
                                </Badge>
                                <Button
                                  size="icon"
                                  variant="ghost"
                                  className="h-8 w-8"
                                  onClick={() => handleEditClick("Certification", cert.id, cert.title)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="experience" className="space-y-6">
                  <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Work Experience</CardTitle>
                        <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                          Professional work history
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          toast({
                            description: "Add work experience functionality would be here"
                          });
                        }}
                      >
                        Add Experience
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {userData.experience.map((exp, index) => (
                          <div key={exp.id} className="relative">
                            {index > 0 && <div className="absolute top-0 bottom-0 left-3 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700" style={{ top: "-1.5rem" }}></div>}
                            <div className="flex gap-6">
                              <div className="relative">
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${index === 0 ? 'bg-blue-600' : 'bg-gray-300'}`}>
                                  <div className="h-3 w-3 rounded-full bg-white"></div>
                                </div>
                                {index < userData.experience.length - 1 && (
                                  <div className="absolute top-6 bottom-0 left-3 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                  <h3 className="text-lg font-semibold">{exp.title}</h3>
                                  <div className="flex items-center gap-1">
                                    <Badge variant="outline" className="whitespace-nowrap">
                                      {exp.from} - {exp.to}
                                    </Badge>
                                    <Button
                                      size="icon"
                                      variant="ghost"
                                      className="h-8 w-8"
                                      onClick={() => handleEditClick("Experience", exp.id, exp.title)}
                                    >
                                      <Edit className="h-4 w-4" />
                                    </Button>
                                  </div>
                                </div>
                                <div className="mb-2">
                                  <p className="font-medium">{exp.company}</p>
                                  <div className="flex items-center text-sm">
                                    <MapPin className="h-3 w-3 mr-1 text-gray-500" />
                                    <span className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                      {exp.location}
                                    </span>
                                  </div>
                                </div>
                                <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {exp.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="skills" className="space-y-6">
                  <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Professional Skills</CardTitle>
                        <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                          Technical expertise and competencies
                        </CardDescription>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => {
                          toast({
                            description: "Add skill functionality would be here"
                          });
                        }}
                      >
                        Add Skill
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {userData.skills.map(skill => (
                          <div key={skill.name} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <h3 className="font-medium">{skill.name}</h3>
                              <span className={`text-sm ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                {skill.level}%
                              </span>
                            </div>
                            <div className="relative">
                              <Progress value={skill.level} className="h-2" />
                              <Button
                                size="icon"
                                variant="ghost"
                                className="h-6 w-6 absolute -top-6 right-0"
                                onClick={() => handleEditClick("Skill", skill.name, skill.level.toString())}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="activity" className="space-y-6">
                  <Card className={isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}>
                    <CardHeader>
                      <CardTitle>Recent Activity</CardTitle>
                      <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
                        Latest actions and platform activity
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-8">
                        {userData.recentActivity.map((activity, index) => (
                          <div key={activity.id} className="relative">
                            {index > 0 && <div className="absolute top-0 bottom-0 left-3 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700" style={{ top: "-2rem" }}></div>}
                            <div className="flex gap-6">
                              <div className="relative">
                                <div className={`h-6 w-6 rounded-full flex items-center justify-center ${
                                  index === 0 ? 'bg-green-600' : 'bg-gray-300'
                                }`}>
                                  <RefreshCw className="h-3 w-3 text-white" />
                                </div>
                                {index < userData.recentActivity.length - 1 && (
                                  <div className="absolute top-6 bottom-0 left-3 -translate-x-1/2 w-0.5 bg-gray-200 dark:bg-gray-700"></div>
                                )}
                              </div>
                              <div className="flex-1">
                                <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-1">
                                  <h3 className="text-lg font-semibold">{activity.action}</h3>
                                  <Badge variant="outline" className="whitespace-nowrap">
                                    {activity.date}
                                  </Badge>
                                </div>
                                <p className={`${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
                                  {activity.description}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-center">
                      <Button variant="outline">
                        View All Activity
                      </Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
      
      {/* Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit {editField.label}</DialogTitle>
            <DialogDescription>
              Make changes to your profile information.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Label htmlFor="edit-field">{editField.label}</Label>
            <Input 
              id="edit-field" 
              type={editField.type || "text"} 
              value={editField.value} 
              className="mt-2" 
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleEditSave}>
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Profile;
