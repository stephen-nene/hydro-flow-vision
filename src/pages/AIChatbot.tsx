
import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Sidebar } from "@/components/layout/Sidebar";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home, Book, Shield, Scale } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { WaterChatbot } from "@/components/chatbot/WaterChatbot";
import { useToast } from "@/hooks/use-toast";
import { QuickReference } from "@/components/chatbot/QuickReference";
import { ComplianceTools } from "@/components/chatbot/ComplianceTools";

interface QuickReference {
  title: string;
  description: string;
  content: string;
}

const AIChatbot = () => {
  const [isEmergencyMode, setIsEmergencyMode] = useState(false);
  const [activeReference, setActiveReference] = useState<QuickReference | null>(null);
  const isMobile = useIsMobile();
  const { toast } = useToast();
  
  const quickReferences: QuickReference[] = [
    {
      title: "WHO Drinking Standards",
      description: "Global guidelines for drinking water quality",
      content: `# WHO Drinking Water Standards (2023)

## Priority Contaminants and Guidelines

| Contaminant | WHO Guideline | Health Impact |
|-------------|---------------|---------------|
| Lead (Pb) | 0.01 mg/L | Neurotoxic, affects brain development |
| Arsenic (As) | 0.01 mg/L | Carcinogenic, skin lesions |
| Fluoride (F) | 1.5 mg/L | Dental/skeletal fluorosis at high levels |
| Nitrate (NO₃) | 50 mg/L | Methemoglobinemia in infants |
| E. coli | Not detectable in 100mL | Indicator of fecal contamination |
| Turbidity | <1 NTU, ideally <0.2 NTU | Interferes with disinfection |
| Chlorine residual | 0.2-0.5 mg/L | Ensures disinfection in distribution |

## Implementation
- Regular monitoring according to risk assessment
- Source protection as first barrier
- Multiple treatment barriers
- Safe distribution systems
- Comprehensive water safety plans

## Regional Adaptations
WHO guidelines are adapted by each country based on local conditions, technological capabilities, and economic considerations.`
    },
    {
      title: "Local Regulations",
      description: "Country-specific water quality laws",
      content: `# Kenya Water Quality Regulations (2022)

## Kenya Environmental Management and Coordination (Water Quality) Regulations

| Parameter | Drinking Water Limit | Effluent Discharge Limit |
|-----------|----------------------|--------------------------|
| Lead | 0.05 mg/L | 0.1 mg/L |
| Arsenic | 0.01 mg/L | 0.02 mg/L |
| pH | 6.5-8.5 | 6.0-9.0 |
| E. coli | Not detectable in 100mL | - |
| Total suspended solids | < 30 mg/L | 30 mg/L |
| Fluoride | 1.5 mg/L | 2 mg/L |

## Regulatory Authority
Water Services Regulatory Board (WASREB) and National Environment Management Authority (NEMA)

## Compliance Requirements
- Quarterly monitoring and reporting
- Annual license renewal
- Mandatory treatment for surface water
- Consumer alerts for violations
- Penalties up to KES 1 million for non-compliance

## Recent Updates
New microplastic monitoring requirements added in 2022 amendment`
    },
    {
      title: "Treatment Solutions",
      description: "Recommended products for compliance",
      content: `# Hydra Treatment Solutions

## Lead Removal
- **HYD-F103 Ion Exchange Filter**
  - 99.8% lead removal efficiency
  - Capacity: 100,000 liters
  - Replacement: Every 12 months
  - Cost: $1,200-$1,800

## Biological Contamination
- **HYD-UV100 Ultraviolet System**
  - 99.9999% pathogen inactivation
  - Flow rate: 12-40 LPM
  - Lamp replacement: 12 months
  - Cost: $800-$1,500

## Arsenic Removal
- **HYD-A200 Adsorption Media**
  - 98% arsenic removal
  - Capacity: 80,000 liters
  - Replacement: Every 8-12 months
  - Cost: $1,500-$2,200

## Complete Treatment System
- **HYD-PRO Municipal Water Package**
  - Multi-stage filtration + UV + monitoring
  - Handles all major contaminants
  - Remote monitoring capability
  - Cost: $3,800-$6,500

## Industrial Solutions
- **HYD-IND Series**
  - Custom treatment trains
  - Flow rates: 50-5000 LPM
  - Remote monitoring + automated maintenance
  - PLC controls + HMI interface
  - Cost: Based on specifications`
    }
  ];

  const handleViewReference = (reference: QuickReference) => {
    setActiveReference(reference);
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
                <BreadcrumbLink href="/">
                  <Home className="h-4 w-4 mr-1" />
                  Dashboard
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/ai-chatbot">HydraLex AI Assistant</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          
          <header className="mb-6">
            <h1 className={`text-2xl md:text-3xl font-bold ${isEmergencyMode ? 'text-water-danger' : 'text-water-dark'}`}>
              HydraLex AI Legal Assistant
            </h1>
            <p className={`text-base md:text-lg ${isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}`}>
              AI-powered water regulations compliance assistant
            </p>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              {activeReference ? (
                <QuickReference 
                  reference={activeReference} 
                  onBack={() => setActiveReference(null)} 
                  isEmergencyMode={isEmergencyMode}
                />
              ) : (
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
                  <WaterChatbot isEmergencyMode={isEmergencyMode} />
                </Card>
              )}
            </div>
            
            <div className="space-y-6">
              <ComplianceTools isEmergencyMode={isEmergencyMode} />
              
              <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'}`}>
                <CardHeader>
                  <CardTitle>Quick References</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {quickReferences.map((reference, index) => (
                      <div 
                        key={index}
                        className={`p-3 rounded ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-50'} border ${isEmergencyMode ? 'border-gray-800' : 'border-gray-200'} cursor-pointer hover:bg-opacity-80`}
                        onClick={() => handleViewReference(reference)}
                      >
                        <p className="text-sm font-medium">{reference.title}</p>
                        <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'} mt-1`}>{reference.description}</p>
                      </div>
                    ))}
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
