
import { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ChevronRight, Download, ExternalLink, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuickReferenceProps {
  reference: {
    title: string;
    description: string;
    content: string;
  };
  onBack: () => void;
  isEmergencyMode: boolean;
}

export function QuickReference({ reference, onBack, isEmergencyMode }: QuickReferenceProps) {
  const { toast } = useToast();
  const [activeSection, setActiveSection] = useState<string | null>(null);
  
  const formatMarkdown = (content: string) => {
    // Extract sections from the markdown content
    const sections: Record<string, string> = {};
    let currentSection: string | null = null;
    let currentContent: string[] = [];
    
    content.split('\n').forEach(line => {
      if (line.startsWith('# ')) {
        // This is a main title, skip it
      } else if (line.startsWith('## ')) {
        // This is a section header
        if (currentSection && currentContent.length) {
          sections[currentSection] = currentContent.join('\n');
          currentContent = [];
        }
        currentSection = line.substring(3);
        if (!activeSection) setActiveSection(currentSection);
      } else if (currentSection) {
        // This is content for the current section
        currentContent.push(line);
      }
    });
    
    // Add the last section
    if (currentSection && currentContent.length) {
      sections[currentSection] = currentContent.join('\n');
    }
    
    return sections;
  };
  
  const sections = formatMarkdown(reference.content);
  const sectionNames = Object.keys(sections);
  
  const handleCopyContent = () => {
    navigator.clipboard.writeText(reference.content);
    toast({
      title: "Content Copied",
      description: "Reference content copied to clipboard",
    });
  };
  
  const handleDownloadPDF = () => {
    toast({
      title: "PDF Download",
      description: "Preparing PDF document for download...",
    });
    
    // In a real implementation, this would generate a PDF
    setTimeout(() => {
      toast({
        title: "Download Ready",
        description: `${reference.title}.pdf is ready`,
      });
    }, 1500);
  };

  return (
    <Card className={`${isEmergencyMode ? 'bg-black/60 border-water-danger/30 text-white' : 'bg-white'} h-[calc(100vh-14rem)]`}>
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="flex items-center gap-2 text-xl">
              {reference.title}
            </CardTitle>
            <CardDescription className={isEmergencyMode ? 'text-gray-300' : 'text-gray-600'}>
              {reference.description}
            </CardDescription>
          </div>
          <Button variant="ghost" size="sm" onClick={onBack}>
            Back to Chat
          </Button>
        </div>
      </CardHeader>
      
      <div className="grid grid-cols-1 md:grid-cols-3 h-[calc(100%-140px)]">
        <div className="border-r hidden md:block">
          <div className="p-4">
            <h3 className="text-sm font-medium mb-2">Contents</h3>
            <div className="space-y-1">
              {sectionNames.map((section) => (
                <div 
                  key={section}
                  className={`text-sm py-1.5 px-2 rounded-md cursor-pointer flex items-center justify-between ${
                    activeSection === section 
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' 
                      : 'hover:bg-gray-50 dark:hover:bg-gray-800'
                  }`}
                  onClick={() => setActiveSection(section)}
                >
                  <span>{section}</span>
                  {activeSection === section && (
                    <ChevronRight className="h-4 w-4" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
        
        <div className="col-span-2 overflow-auto px-4 pb-4">
          {activeSection && sections[activeSection] ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between sticky top-0 bg-white dark:bg-black/60 py-2 border-b z-10">
                <h2 className="text-lg font-medium">{activeSection}</h2>
                <div className="flex md:hidden gap-2">
                  <Button variant="outline" size="sm" onClick={() => setActiveSection(null)}>
                    View Sections
                  </Button>
                </div>
              </div>
              
              <div className="prose dark:prose-invert max-w-none">
                {sections[activeSection].split('\n').map((line, i) => {
                  if (line.startsWith('| ')) {
                    // This is a table row
                    const cells = line.split('|').filter(cell => cell.trim() !== '');
                    return (
                      <div key={i} className="flex border-b dark:border-gray-700 my-1">
                        {cells.map((cell, cellIndex) => (
                          <div 
                            key={cellIndex} 
                            className={`p-2 flex-1 ${i === 0 || line.includes('---') ? 'font-bold' : ''}`}
                          >
                            {cell.trim()}
                          </div>
                        ))}
                      </div>
                    );
                  } else if (line.startsWith('- ')) {
                    return <li key={i} className="ml-4 my-1">{line.substring(2)}</li>;
                  } else if (line.trim() === '') {
                    return <div key={i} className="h-4"></div>;
                  } else {
                    return <p key={i} className="my-2">{line}</p>;
                  }
                })}
              </div>
            </div>
          ) : (
            // Mobile section selector
            <div className="md:hidden">
              <h3 className="text-lg font-medium mb-4">Sections</h3>
              <div className="space-y-2">
                {sectionNames.map((section) => (
                  <div 
                    key={section}
                    className="border rounded-md p-3 hover:bg-gray-50 dark:hover:bg-gray-800 cursor-pointer"
                    onClick={() => setActiveSection(section)}
                  >
                    <div className="flex items-center justify-between">
                      <span>{section}</span>
                      <ChevronRight className="h-4 w-4" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      
      <CardFooter className="border-t pt-4">
        <div className="flex justify-between w-full">
          <Button variant="outline" size="sm" onClick={handleCopyContent}>
            <Copy className="h-4 w-4 mr-2" />
            Copy Content
          </Button>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handleDownloadPDF}>
              <Download className="h-4 w-4 mr-2" />
              Download PDF
            </Button>
            <Button variant="outline" size="sm" onClick={() => {
              toast({
                title: "External Resource",
                description: "Opening resource in new tab..."
              });
              window.open('#', '_blank');
            }}>
              <ExternalLink className="h-4 w-4 mr-2" />
              View Full Docs
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
