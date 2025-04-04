import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { useIsMobile } from "@/hooks/use-mobile";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { 
  Home, 
  Settings as SettingsIcon, 
  HelpCircle, 
  Book, 
  FileText, 
  Video, 
  MessageSquare, 
  Users, 
  Headphones, 
  Search,
  ChevronRight,
  BookOpen,
  ExternalLink,
  Mail,
  Phone,
  Globe,
  Award,
  Heart,
  ThumbsUp,
  Download,
  Calendar,
  Upload,
  Brain,
  Shield,
  Cable
} from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { 
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";

interface DocumentCategory {
  id: string;
  title: string;
  icon: React.ReactNode;
  articles: DocumentArticle[];
}

interface DocumentArticle {
  id: string;
  title: string;
  excerpt: string;
  lastUpdated: string;
  views: number;
  rating: number;
  content?: string;
}

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const HelpDocumentation = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("getting-started");
  const [selectedArticle, setSelectedArticle] = useState<DocumentArticle | null>(null);
  
  // Mock documentation categories
  const documentCategories: DocumentCategory[] = [
    {
      id: "getting-started",
      title: "Getting Started",
      icon: <Book className="h-5 w-5 text-blue-500" />,
      articles: [
        {
          id: "gs-1",
          title: "Welcome to Hydra",
          excerpt: "An introduction to the Hydra water quality management platform.",
          lastUpdated: "2025-03-15",
          views: 1523,
          rating: 4.8,
          content: `
# Welcome to Hydra Water Quality Management Platform

Hydra is a comprehensive water quality management platform designed for water treatment professionals. This guide will help you get started with the platform and understand its core features.

## Overview

Hydra combines AI-powered analytics, real-time monitoring, and regulatory compliance tools into one unified platform. It helps water treatment professionals identify, analyze, and resolve water quality issues efficiently.

## Key Features

### AI-Powered Analytics
- **Water Autopsy:** Interactive 3D visualization of water sample analysis with molecular-level insights
- **Crisis Prediction:** AI forecasting of potential water quality issues with 85%+ accuracy
- **HydraScore Analytics:** Prioritize clients with AI-generated water quality scores and risk assessment

### AR Field Assistant
- **HYDRA Lens Mobile Mode:** Real-time water source analysis through AR with contaminant detection
- **Installation Guides:** 3D visual guidance for filter and pipe installation
- **X-Ray Underground View:** GIS integration for underground pipe visualization and leak detection

### Treatment Simulator
- **Treatment Effectiveness:** Simulate different water treatment methods with predictive outcomes
- **Filtration, Chemical, Biological Models:** Compare different approaches with cost-benefit analysis
- **Long-Term Impact Analysis:** Visualize water quality improvement over time with trend forecasting

### HydraLex AI Assistant
- **Natural Language Water Regulations:** Plain English answers to compliance questions
- **Compliance Tools:** Generate reports, risk assessments, and regulatory cross-checks
- **Voice Commands:** Hands-free operation for field technicians with NLP processing

## Getting Started

1. **Dashboard Overview:** The main dashboard provides a real-time view of your water quality metrics, alerts, and priority cases.
2. **Water Samples:** Navigate to the Water Samples page to view, analyze, and manage water sample data.
3. **Treatment Simulator:** Use the Treatment Simulator to model different treatment approaches and their outcomes.
4. **AI Chatbot:** Access the HydraLex AI Assistant for regulatory guidance and compliance support.
5. **Reports:** Generate comprehensive analytics reports and compliance documentation.

## System Requirements

- **Browser:** Chrome 80+, Firefox 75+, Safari 13+, Edge 80+
- **Device:** Desktop, tablet, or mobile device with modern browser support
- **Internet:** Broadband connection (5 Mbps or faster recommended)
- **AR Features:** Compatible mobile device with camera for augmented reality features

## Support and Training

For additional support, please contact our support team at support@hydra-water.com or call our support line at +1-555-HYDRA-HELP.

Training webinars are available every Tuesday at
`
        },
        {
          id: "gs-2",
          title: "Quick Start Guide",
          excerpt: "Step-by-step instructions for setting up your first project.",
          lastUpdated: "2025-03-20",
          views: 942,
          rating: 4.5
        },
        {
          id: "gs-3",
          title: "Dashboard Overview",
          excerpt: "Understanding the main dashboard and its components.",
          lastUpdated: "2025-03-22",
          views: 876,
          rating: 4.6
        },
        {
          id: "gs-4",
          title: "User Roles and Permissions",
          excerpt: "Learn about different user roles and their access levels.",
          lastUpdated: "2025-03-18",
          views: 654,
          rating: 4.2
        }
      ]
    },
    {
      id: "water-samples",
      title: "Water Samples",
      icon: <FileText className="h-5 w-5 text-green-500" />,
      articles: [
        {
          id: "ws-1",
          title: "Adding New Water Samples",
          excerpt: "How to add and categorize new water samples in the system.",
          lastUpdated: "2025-03-14",
          views: 789,
          rating: 4.7
        },
        {
          id: "ws-2",
          title: "Sample Analysis Tools",
          excerpt: "Using the built-in tools to analyze water sample composition.",
          lastUpdated: "2025-03-10",
          views: 682,
          rating: 4.4
        },
        {
          id: "ws-3",
          title: "Batch Processing Samples",
          excerpt: "Process multiple water samples simultaneously for efficiency.",
          lastUpdated: "2025-03-05",
          views: 543,
          rating: 4.3
        }
      ]
    },
    {
      id: "ai-features",
      title: "AI & Analytics",
      icon: <Brain className="h-5 w-5 text-purple-500" />,
      articles: [
        {
          id: "ai-1",
          title: "Water Autopsy Feature",
          excerpt: "How to use the 3D water sample visualization tool.",
          lastUpdated: "2025-03-25",
          views: 1245,
          rating: 4.9
        },
        {
          id: "ai-2",
          title: "Predictive Analytics",
          excerpt: "Understanding the crisis prediction and forecasting capabilities.",
          lastUpdated: "2025-03-23",
          views: 1012,
          rating: 4.8
        },
        {
          id: "ai-3",
          title: "HydraScore Explained",
          excerpt: "How the AI generates water quality scores and risk assessments.",
          lastUpdated: "2025-03-21",
          views: 876,
          rating: 4.6
        }
      ]
    },
    {
      id: "ar-assistant",
      title: "AR Field Assistant",
      icon: <Video className="h-5 w-5 text-amber-500" />,
      articles: [
        {
          id: "ar-1",
          title: "Mobile Mode Setup",
          excerpt: "Setting up the AR capabilities on your mobile device.",
          lastUpdated: "2025-03-17",
          views: 632,
          rating: 4.5
        },
        {
          id: "ar-2",
          title: "Field Analysis Guide",
          excerpt: "Using AR for real-time water source analysis in the field.",
          lastUpdated: "2025-03-15",
          views: 548,
          rating: 4.4
        },
        {
          id: "ar-3",
          title: "Installation Assistant",
          excerpt: "How to use AR for filter and pipe installation guidance.",
          lastUpdated: "2025-03-12",
          views: 492,
          rating: 4.3
        }
      ]
    },
    {
      id: "compliance",
      title: "Regulatory Compliance",
      icon: <Shield className="h-5 w-5 text-red-500" />,
      articles: [
        {
          id: "rc-1",
          title: "Compliance Reporting",
          excerpt: "Generating regulatory compliance reports for different jurisdictions.",
          lastUpdated: "2025-03-19",
          views: 876,
          rating: 4.7
        },
        {
          id: "rc-2",
          title: "HydraLex AI Assistant",
          excerpt: "Using the AI assistant for regulatory guidance and compliance questions.",
          lastUpdated: "2025-03-16",
          views: 765,
          rating: 4.6
        },
        {
          id: "rc-3",
          title: "Regulation Updates",
          excerpt: "How Hydra keeps you updated with changing water regulations.",
          lastUpdated: "2025-03-14",
          views: 654,
          rating: 4.5
        }
      ]
    },
    {
      id: "integrations",
      title: "Integrations",
      icon: <Cable className="h-5 w-5 text-blue-500" />,
      articles: [
        {
          id: "int-1",
          title: "API Documentation",
          excerpt: "Complete reference for the Hydra API endpoints and usage.",
          lastUpdated: "2025-03-20",
          views: 789,
          rating: 4.6
        },
        {
          id: "int-2",
          title: "ERP System Integration",
          excerpt: "Connecting Hydra with common ERP and business systems.",
          lastUpdated: "2025-03-18",
          views: 654,
          rating: 4.4
        },
        {
          id: "int-3",
          title: "IoT Device Setup",
          excerpt: "Configuring IoT sensors and devices to work with Hydra.",
          lastUpdated: "2025-03-15",
          views: 543,
          rating: 4.3
        }
      ]
    }
  ];
  
  // Mock FAQ data
  const faqItems: FAQItem[] = [
    {
      question: "How do I reset my password?",
      answer: "To reset your password, click on your profile icon in the top right corner, select 'Settings', then navigate to 'Security & Privacy'. Click on 'Reset Password' and follow the instructions sent to your email.",
      category: "account"
    },
    {
      question: "Can I export data to Excel?",
      answer: "Yes, you can export data to various formats including Excel. Navigate to the relevant data view, click on the export icon in the top right of the data table, and select 'Export to Excel' from the dropdown menu.",
      category: "data"
    },
    {
      question: "How accurate is the crisis prediction feature?",
      answer: "The crisis prediction feature has demonstrated 85%+ accuracy in forecasting potential water quality issues 7-14 days in advance. The model is continuously trained on new data to improve accuracy over time.",
      category: "features"
    },
    {
      question: "Does Hydra support EPA compliance reporting?",
      answer: "Yes, Hydra fully supports EPA compliance reporting. You can generate EPA-formatted reports from the Reports section. Navigate to Reports > Compliance > EPA and select the reporting period.",
      category: "compliance"
    },
    {
      question: "How do I connect my water quality sensors?",
      answer: "To connect water quality sensors, go to Settings > Integrations > IoT Devices and click 'Add New Device'. You can connect via direct API, MQTT protocol, or through one of our gateway devices depending on your sensor type.",
      category: "integration"
    },
    {
      question: "Can multiple users access the system simultaneously?",
      answer: "Yes, Hydra supports unlimited concurrent users (depending on your subscription). Each user will have their own login credentials and permissions based on their assigned role.",
      category: "account"
    },
    {
      question: "How often is the regulatory database updated?",
      answer: "The regulatory database is updated in real-time as new regulations are published. Our compliance team monitors regulatory changes across all major jurisdictions, and the HydraLex AI is trained on new regulations within 24 hours of publication.",
      category: "compliance"
    },
    {
      question: "What mobile devices are supported for AR features?",
      answer: "AR features are supported on iOS devices running iOS 14+ (iPhone 8 and newer) and Android devices running Android 10+ with ARCore support. For optimal performance, we recommend devices with at least 4GB of RAM and a recent processor.",
      category: "features"
    }
  ];
  
  // Filter articles based on search
  const getFilteredArticles = (categoryId: string) => {
    const category = documentCategories.find(cat => cat.id === categoryId);
    if (!category) return [];
    
    return category.articles.filter(article => 
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      article.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  // Filter FAQs based on search
  const getFilteredFAQs = () => {
    if (!searchQuery) return faqItems;
    
    return faqItems.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedArticle(null);
  };
  
  const handleArticleSelect = (article: DocumentArticle) => {
    setSelectedArticle(article);
    
    // Mock view increment
    toast({
      title: "Article Viewed",
      description: `You're viewing "${article.title}"`
    });
  };
  
  const handleContactSupport = () => {
    toast({
      title: "Support Request Sent",
      description: "Our team will respond to your inquiry within 24 hours."
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
                  <HelpCircle className="h-4 w-4 mr-1" />
                  Help & Documentation
                </BreadcrumbLink>
              </BreadcrumbItem>
              {selectedArticle && (
                <>
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    <BreadcrumbLink className="flex items-center">
                      {selectedArticle.title}
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                </>
              )}
            </BreadcrumbList>
          </Breadcrumb>

          <div className="mb-6">
            <h1 className={`text-3xl font-bold mb-2 ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              Help & Documentation
            </h1>
            <p className={`text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Find guides, tutorials and answers to common questions
            </p>
          </div>

          <div className="mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                className="pl-10 py-6 text-lg"
                placeholder="Search documentation and help articles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          <Tabs defaultValue="documentation" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="documentation">
                <Book className="h-4 w-4 mr-2" />
                Documentation
              </TabsTrigger>
              <TabsTrigger value="faq">
                <MessageSquare className="h-4 w-4 mr-2" />
                FAQ
              </TabsTrigger>
              <TabsTrigger value="support">
                <Headphones className="h-4 w-4 mr-2" />
                Support
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="documentation">
              {selectedArticle ? (
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                      <CardTitle className="text-2xl">{selectedArticle.title}</CardTitle>
                      <CardDescription>
                        Last updated: {selectedArticle.lastUpdated} • {selectedArticle.views} views • 
                        <span className="ml-1 text-yellow-500">
                          {"★".repeat(Math.floor(selectedArticle.rating))}
                          {selectedArticle.rating % 1 >= 0.5 ? "½" : ""}
                        </span>
                      </CardDescription>
                    </div>
                    <Button variant="ghost" onClick={() => setSelectedArticle(null)}>
                      Back to Articles
                    </Button>
                  </CardHeader>
                  <CardContent>
                    {selectedArticle.content ? (
                      <div className="prose dark:prose-invert max-w-none">
                        {selectedArticle.content.split('\n\n').map((paragraph, index) => {
                          if (paragraph.startsWith('# ')) {
                            return <h1 key={index} className="text-3xl font-bold mt-4 mb-6">{paragraph.substring(2)}</h1>;
                          } else if (paragraph.startsWith('## ')) {
                            return <h2 key={index} className="text-2xl font-bold mt-6 mb-4">{paragraph.substring(3)}</h2>;
                          } else if (paragraph.startsWith('### ')) {
                            return <h3 key={index} className="text-xl font-bold mt-5 mb-3">{paragraph.substring(4)}</h3>;
                          } else if (paragraph.startsWith('- ')) {
                            return (
                              <ul key={index} className="list-disc pl-6 my-4">
                                {paragraph.split('\n').map((item, i) => (
                                  <li key={i} className="mb-1">{item.substring(2)}</li>
                                ))}
                              </ul>
                            );
                          } else if (paragraph.startsWith('1. ')) {
                            return (
                              <ol key={index} className="list-decimal pl-6 my-4">
                                {paragraph.split('\n').map((item, i) => {
                                  const numMatch = item.match(/^\d+\.\s/);
                                  return numMatch ? (
                                    <li key={i} className="mb-1">{item.substring(numMatch[0].length)}</li>
                                  ) : null;
                                })}
                              </ol>
                            );
                          } else {
                            return <p key={index} className="my-4">{paragraph}</p>;
                          }
                        })}
                      </div>
                    ) : (
                      <div className="p-12 text-center">
                        <p className="text-gray-500 dark:text-gray-400">
                          Full article content is being loaded...
                        </p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-6">
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "Article Feedback",
                        description: "Thank you for rating this article"
                      });
                    }}>
                      <ThumbsUp className="h-4 w-4 mr-2" />
                      Helpful
                    </Button>
                    <Button variant="outline" onClick={() => {
                      toast({
                        title: "PDF Generated",
                        description: "Article PDF is ready for download"
                      });
                    }}>
                      <Download className="h-4 w-4 mr-2" />
                      Download PDF
                    </Button>
                  </CardFooter>
                </Card>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                  <div className="lg:col-span-1">
                    <Card>
                      <CardHeader>
                        <CardTitle>Categories</CardTitle>
                      </CardHeader>
                      <CardContent className="p-0">
                        <ScrollArea className="h-[500px]">
                          <div className="p-1">
                            {documentCategories.map(category => (
                              <div 
                                key={category.id}
                                className={`flex items-center gap-2 p-3 rounded-md cursor-pointer ${
                                  selectedCategory === category.id 
                                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                                    : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                                }`}
                                onClick={() => handleCategorySelect(category.id)}
                              >
                                {category.icon}
                                <span>{category.title}</span>
                              </div>
                            ))}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="lg:col-span-3">
                    <Card>
                      <CardHeader>
                        <CardTitle>
                          {documentCategories.find(cat => cat.id === selectedCategory)?.title || 'Articles'}
                        </CardTitle>
                        <CardDescription>
                          {getFilteredArticles(selectedCategory).length} articles
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {getFilteredArticles(selectedCategory).length > 0 ? (
                            getFilteredArticles(selectedCategory).map(article => (
                              <div 
                                key={article.id}
                                className="border rounded-md p-4 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer transition-colors"
                                onClick={() => handleArticleSelect(article)}
                              >
                                <div className="flex justify-between items-start mb-2">
                                  <h3 className="text-lg font-medium">{article.title}</h3>
                                  <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                                    <span className="mr-2">{article.views} views</span>
                                    <span className="text-yellow-500">
                                      {"★".repeat(Math.floor(article.rating))}
                                      {article.rating % 1 >= 0.5 ? "½" : ""}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-gray-600 dark:text-gray-300 mb-2">{article.excerpt}</p>
                                <div className="flex justify-between items-center">
                                  <span className="text-sm text-gray-500 dark:text-gray-400">
                                    Last updated: {article.lastUpdated}
                                  </span>
                                  <Button variant="ghost" size="sm" className="flex items-center">
                                    Read Article
                                    <ChevronRight className="h-4 w-4 ml-1" />
                                  </Button>
                                </div>
                              </div>
                            ))
                          ) : (
                            <div className="text-center py-12">
                              <Book className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                              <h3 className="text-lg font-medium mb-1">No articles found</h3>
                              <p className="text-gray-500 dark:text-gray-400">
                                Try adjusting your search or browse a different category
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="faq">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-blue-500" />
                    Frequently Asked Questions
                  </CardTitle>
                  <CardDescription>
                    Find quick answers to common questions
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {getFilteredFAQs().length > 0 ? (
                    <Accordion type="single" collapsible className="w-full">
                      {getFilteredFAQs().map((faq, index) => (
                        <AccordionItem key={index} value={`faq-${index}`}>
                          <AccordionTrigger className="text-left">
                            {faq.question}
                            <Badge className="ml-2" variant="outline">
                              {faq.category}
                            </Badge>
                          </AccordionTrigger>
                          <AccordionContent className="text-gray-600 dark:text-gray-300 text-base">
                            {faq.answer}
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                  ) : (
                    <div className="text-center py-12">
                      <MessageSquare className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                      <h3 className="text-lg font-medium mb-1">No FAQs found</h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Try adjusting your search or check the documentation for more detailed information
                      </p>
                    </div>
                  )}
                </CardContent>
                <CardFooter className="border-t pt-6">
                  <div className="w-full space-y-4">
                    <p className="text-gray-600 dark:text-gray-300">
                      Can't find an answer to your question?
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Button variant="outline" className="flex-1" onClick={() => {
                        toast({
                          title: "Support Center",
                          description: "Opening the full support knowledge base..."
                        });
                      }}>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Browse Knowledge Base
                      </Button>
                      <Button className="flex-1" onClick={() => {
                        toast({
                          title: "Contact Form",
                          description: "Opening the support contact form..."
                        });
                      }}>
                        <MessageSquare className="h-4 w-4 mr-2" />
                        Ask a Question
                      </Button>
                    </div>
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="support">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-blue-500" />
                        Contact Support
                      </CardTitle>
                      <CardDescription>
                        Get help from our technical support team
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="name">Your Name</Label>
                            <Input id="name" placeholder="Enter your name" />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="email">Email Address</Label>
                            <Input id="email" type="email" placeholder="Enter your email" />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="subject">Subject</Label>
                          <Input id="subject" placeholder="Brief description of your issue" />
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="category">Category</Label>
                          <select 
                            id="category" 
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-transparent"
                          >
                            <option value="">Select a category</option>
                            <option value="technical">Technical Issue</option>
                            <option value="account">Account Management</option>
                            <option value="billing">Billing & Subscription</option>
                            <option value="feature">Feature Request</option>
                            <option value="other">Other</option>
                          </select>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="description">Detailed Description</Label>
                          <textarea 
                            id="description" 
                            className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-2 min-h-[150px] bg-transparent"
                            placeholder="Please describe your issue in detail..."
                          ></textarea>
                        </div>
                        
                        <div className="space-y-2">
                          <Label htmlFor="attachments">Attachments</Label>
                          <div className="border border-dashed border-gray-300 dark:border-gray-700 rounded-md p-6 text-center">
                            <Upload className="h-8 w-8 mx-auto mb-2 text-gray-400" />
                            <p className="text-gray-500 dark:text-gray-400 mb-2">
                              Drag and drop files here, or click to select files
                            </p>
                            <Button variant="outline" size="sm">
                              Choose Files
                            </Button>
                            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                              Max file size: 10MB. Supported formats: PNG, JPG, PDF, DOC
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="urgent" className="rounded" />
                          <Label htmlFor="urgent">This issue requires urgent attention</Label>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between border-t pt-6">
                      <Button variant="outline">
                        Reset Form
                      </Button>
                      <Button onClick={handleContactSupport}>
                        Submit Support Request
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
                
                <div className="lg:col-span-1 space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Headphones className="h-5 w-5 text-blue-500" />
                        Support Options
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <Mail className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium">Email Support</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            24/7 response within 4 hours
                          </p>
                          <p className="text-sm">support@hydra-water.com</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <Phone className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium">Phone Support</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                            Monday-Friday, 8AM-8PM ET
                          </p>
                          <p className="text-sm">+1 (555) HYDRA-HELP</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3 pb-3 border-b">
                        <Users className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium">Community Forums</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Connect with other Hydra users
                          </p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => {
                            toast({
                              title: "Community Forums",
                              description: "Opening Hydra community forums in a new tab..."
                            });
                            window.open('#', '_blank');
                          }}>
                            <Globe className="h-4 w-4 mr-2" />
                            Visit Forums
                          </Button>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-3">
                        <Award className="h-5 w-5 text-blue-500 mt-1" />
                        <div>
                          <h3 className="font-medium">Premium Support</h3>
                          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                            Dedicated support agent, priority response
                          </p>
                          <Button variant="outline" size="sm" className="w-full" onClick={() => {
                            toast({
                              title: "Premium Support",
                              description: "Opening premium support information..."
                            });
                          }}>
                            <Heart className="h-4 w-4 mr-2" />
                            Upgrade Support Plan
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        Training Resources
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-1 flex items-center">
                          <Video className="h-4 w-4 mr-2 text-red-500" />
                          Video Tutorials
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Step-by-step tutorial videos for all Hydra features
                        </p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => {
                          toast({
                            title: "Video Tutorials",
                            description: "Opening video tutorial library..."
                          });
                        }}>
                          View Tutorials
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-1 flex items-center">
                          <Calendar className="h-4 w-4 mr-2 text-blue-500" />
                          Live Webinars
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Interactive training sessions with Hydra experts
                        </p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => {
                          toast({
                            title: "Webinar Schedule",
                            description: "Opening upcoming webinar schedule..."
                          });
                        }}>
                          View Schedule
                        </Button>
                      </div>
                      
                      <div className="border rounded-md p-4">
                        <h3 className="font-medium mb-1 flex items-center">
                          <Users className="h-4 w-4 mr-2 text-green-500" />
                          Onsite Training
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                          Custom training at your facility
                        </p>
                        <Button variant="outline" size="sm" className="w-full" onClick={() => {
                          toast({
                            title: "Onsite Training",
                            description: "Opening onsite training request form..."
                          });
                        }}>
                          Request Quote
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </main>
      </div>
      {isMobile && <Sidebar isEmergencyMode={isEmergencyMode} />}
    </div>
  );
};

export default HelpDocumentation;
