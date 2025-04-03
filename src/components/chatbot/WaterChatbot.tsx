
import { useState, useRef, useEffect } from "react";
import { Send, Mic, MicOff, Bot, User } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

interface WaterChatbotProps {
  isEmergencyMode: boolean;
}

// Knowledge base for water treatment
const waterKnowledgeBase = [
  {
    q: ["lead", "0.3ppm", "kenya", "illegal"],
    a: "Yes, 0.3ppm lead exceeds Kenya's Environmental Management and Coordination (Water Quality) Regulations limit of 0.05ppm for drinking water. I recommend the Ion Exchange Filter (HYD-F103) for remediation. This is a serious violation that requires immediate action."
  },
  {
    q: ["chlorine", "residual", "treatment"],
    a: "Chlorine residual should be maintained at 0.2-0.5 mg/L in distribution systems. For treatment, maintain a CT value (concentration × time) of at least 30 mg-min/L for effective disinfection. Use sodium/calcium hypochlorite for household applications and gas chlorine for larger systems."
  },
  {
    q: ["turbidity", "standards", "who"],
    a: "WHO recommends turbidity levels below 1 NTU for effective disinfection, and ideally below 0.2 NTU for optimal treatment. High turbidity can shield microorganisms from disinfection and increase chlorine demand. For remediation, consider sand filtration or coagulation-flocculation processes."
  },
  {
    q: ["arsenic", "removal", "treatment"],
    a: "For arsenic removal, I recommend: 1) Iron-based adsorption media (effectiveness: 95%), 2) Reverse osmosis (effectiveness: 90%), or 3) Coagulation with iron salts followed by filtration (effectiveness: 85%). The HYD-A200 Arsenic Filter is our most cost-effective solution for levels up to 0.5ppm."
  },
  {
    q: ["fluoride", "concentration", "health"],
    a: "Optimal fluoride concentration for dental health is 0.7-1.2 mg/L. Concentrations above 1.5 mg/L may cause dental fluorosis, while levels above 4 mg/L can cause skeletal fluorosis. For high fluoride areas, I recommend activated alumina filters or reverse osmosis systems."
  },
  {
    q: ["bacteria", "microbial", "coliform", "treatment"],
    a: "For microbial contamination, recommended treatments include: 1) Chlorination (CT value of 30-60 mg-min/L), 2) UV disinfection (40 mJ/cm² dose), 3) Ozonation (0.5-2 mg/L), or 4) Membrane filtration (0.1-1.0 micron pore size). Our HYD-UV100 system combines UV with 0.5-micron filtration for 99.9999% bacteria removal."
  },
  {
    q: ["regulations", "standards", "compliance"],
    a: "Key water quality regulations include: WHO Guidelines, EU Drinking Water Directive, US EPA Safe Drinking Water Act, and country-specific standards. Compliance requires regular monitoring, documentation, proper treatment, and prompt reporting of violations. Our HYD-Comply software automates compliance tracking across all major regulatory frameworks."
  },
  {
    q: ["ph", "acidity", "alkalinity"],
    a: "Optimal pH range for drinking water is 6.5-8.5. For acidic water (pH < 6.5), use limestone filters or soda ash injection. For alkaline water (pH > 8.5), use acid injection systems with pH controllers. pH affects disinfection efficiency, with chlorine working best between pH 6.5-7.5."
  },
  {
    q: ["filter", "replace", "maintenance"],
    a: "Filter replacement schedules: 1) Sediment pre-filters: 3-6 months, 2) Carbon filters: 6-12 months, 3) Reverse osmosis membranes: 2-3 years, 4) UV lamps: 12 months. Proper maintenance improves efficacy and extends system life. Our HYD-Alert system can monitor filter status and automatically notify when replacement is needed."
  },
  {
    q: ["hydra", "about", "company", "product"],
    a: "Hydra is a leading water quality technology company specializing in advanced monitoring, treatment, and prediction systems. Our core products include HYD-Lens (AR monitoring), HYD-Filter (treatment systems), HYD-Score (quality analytics), and HYD-Lex (regulatory compliance). Our mission is to ensure safe water through innovation and AI-powered solutions."
  }
];

export const WaterChatbot = ({ isEmergencyMode }: WaterChatbotProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Welcome to HydraLex! How can I assist you with water regulations today?",
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isThinking, setIsThinking] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  
  // Speech recognition setup
  const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  const recognition = SpeechRecognition ? new SpeechRecognition() : null;
  
  if (recognition) {
    recognition.continuous = false;
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    
    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInputMessage(transcript);
      setIsListening(false);
      
      // Auto send after voice recognition
      setTimeout(() => {
        sendMessage(transcript);
      }, 500);
    };
    
    recognition.onerror = (event) => {
      console.error('Speech recognition error', event.error);
      setIsListening(false);
      toast({
        title: "Voice recognition error",
        description: "Please try again or type your message",
        variant: "destructive",
      });
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
  }
  
  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);
  
  const toggleListening = () => {
    if (!recognition) {
      toast({
        title: "Voice recognition not supported",
        description: "Your browser doesn't support voice recognition. Please type your message instead.",
        variant: "destructive",
      });
      return;
    }
    
    if (isListening) {
      recognition.stop();
      setIsListening(false);
    } else {
      setIsListening(true);
      try {
        recognition.start();
        toast({
          title: "Listening...",
          description: "Speak your water quality question",
        });
      } catch (error) {
        console.error('Speech recognition error', error);
        setIsListening(false);
      }
    }
  };
  
  const sendMessage = (content = inputMessage) => {
    if (!content.trim()) return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: content.trim(),
      sender: 'user',
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsThinking(true);
    
    // Simulate AI thinking and responding
    setTimeout(() => {
      const response = generateResponse(content);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: response,
        sender: 'bot',
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, botMessage]);
      setIsThinking(false);
    }, 1500);
  };
  
  const generateResponse = (query: string): string => {
    // Simple keyword matching from knowledge base
    const lowerQuery = query.toLowerCase();
    
    // Try to find an exact match
    for (const item of waterKnowledgeBase) {
      if (item.q.every(keyword => lowerQuery.includes(keyword.toLowerCase()))) {
        return item.a;
      }
    }
    
    // Try partial matching
    let bestMatch = null;
    let maxMatchCount = 0;
    
    for (const item of waterKnowledgeBase) {
      const matchCount = item.q.filter(keyword => 
        lowerQuery.includes(keyword.toLowerCase())
      ).length;
      
      if (matchCount > maxMatchCount) {
        maxMatchCount = matchCount;
        bestMatch = item;
      }
    }
    
    if (bestMatch && maxMatchCount > 0) {
      return bestMatch.a;
    }
    
    // Default responses
    if (lowerQuery.includes("hello") || lowerQuery.includes("hi")) {
      return "Hello! I'm HydraLex, your water regulations assistant. How can I help you today?";
    }
    
    if (lowerQuery.includes("thank")) {
      return "You're welcome! If you need any more information about water regulations or treatment solutions, feel free to ask.";
    }
    
    // Generic fallback
    return "I don't have specific information on that topic yet. For water treatment questions, try asking about contaminants (lead, arsenic, bacteria), regulations, or specific treatments. How else can I assist you?";
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage();
  };
  
  const formatDate = (date: Date) => {
    return date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  };
  
  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {messages.map((message) => (
          <div key={message.id} className={`flex gap-3 ${message.sender === 'bot' ? '' : 'justify-end'}`}>
            {message.sender === 'bot' && (
              <Avatar>
                <AvatarFallback className="bg-water-dark text-white">AI</AvatarFallback>
                <AvatarImage src="/hydra-bot.png" />
              </Avatar>
            )}
            
            <div className={`max-w-[80%] space-y-1`}>
              <div className={`p-3 rounded-lg ${
                message.sender === 'bot'
                  ? isEmergencyMode ? 'bg-gray-900' : 'bg-gray-100'
                  : 'bg-water-dark text-white'
              }`}>
                <p className="text-sm">{message.content}</p>
              </div>
              <p className={`text-xs ${isEmergencyMode ? 'text-gray-400' : 'text-gray-500'} ${message.sender === 'user' ? 'text-right' : ''}`}>
                {formatDate(message.timestamp)}
              </p>
            </div>
            
            {message.sender === 'user' && (
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>ME</AvatarFallback>
              </Avatar>
            )}
          </div>
        ))}
        
        {isThinking && (
          <div className="flex gap-3">
            <Avatar>
              <AvatarFallback className="bg-water-dark text-white">AI</AvatarFallback>
            </Avatar>
            <div className={`p-3 rounded-lg ${isEmergencyMode ? 'bg-gray-900' : 'bg-gray-100'}`}>
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 border-t flex gap-2">
        <Button 
          type="button" 
          size="icon" 
          variant={isListening ? "default" : "outline"} 
          onClick={toggleListening}
          className={isListening ? "bg-water-danger text-white" : ""}
        >
          {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
        </Button>
        
        <Input
          placeholder={isListening ? "Listening..." : "Ask about water regulations..."}
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          className={isEmergencyMode ? 'bg-gray-900 border-gray-800' : ''}
          disabled={isListening}
        />
        
        <Button type="submit" size="icon" disabled={!inputMessage.trim() && !isListening}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
};
