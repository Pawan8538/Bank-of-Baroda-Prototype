import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, X, ChevronDown, User, Bot, ShieldQuestion } from 'lucide-react';

const faqs = [
  {
    category: "Security & Fraud",
    q: "I suspect someone got my OTP. Am I safe?",
    a: "Yes. Our platform goes beyond OTPs using Device Fingerprinting and Geo-Risk Analysis. Even if an attacker steals your OTP, any login attempt from an unknown device or suspicious location will be automatically blocked by the ICE Engine."
  },
  {
    category: "Customer Support",
    q: "I lost my ATM card, what should I do?",
    a: "Please instantly block your card via the 'Protection Mode' in the app, or call our 24/7 toll-free number 1800-258-4455. The Identity Trust Platform will immediately lock down your digital accounts to prevent unauthorized access."
  },
  {
    category: "Architecture & Privacy (Hackathon)",
    q: "How does the ICE Engine handle False Positives?",
    a: "We prioritize customer experience. If a user's trust score is ambiguous (Medium Risk), they are not blocked outright. Instead, they are routed to 'Step-up Authentication' (like a quick passive biometric check) ensuring real customers never get locked out."
  },
  {
    category: "Architecture & Privacy (Hackathon)",
    q: "How do you detect SIM Swaps? Where is the data from?",
    a: "We integrate with GSMA Mobile Connect and telecom aggregator APIs (like RouteMobile). This allows the bank to securely check the 'last_sim_change_date' and 'call_forwarding_status' directly from the telco network without ever reading user SMS."
  },
  {
    category: "Architecture & Privacy (Hackathon)",
    q: "Is this platform compliant with the DPDP Act / GDPR?",
    a: "Absolutely. All collected signals (Geolocation, Device IDs) are edge-hashed on the device. The ICE engine processes anonymized mathematical vectors, not Personally Identifiable Information (PII), ensuring full compliance with the Digital Personal Data Protection Act."
  },
  {
    category: "Architecture & Privacy (Hackathon)",
    q: "What about the 'Cold Start' problem for new accounts?",
    a: "New accounts start in a secure 'sandbox' governed by strict traditional rule-based policies. The AI engine runs silently in the background, building a highly accurate behavioral baseline over the first 30 days before taking full control."
  },
  {
    category: "Technical Implementation (Hackathon)",
    q: "What ML models power the ICE Engine?",
    a: "We use a hybrid ensemble. Fast, rule-based heuristics block known threats instantly, while an XGBoost anomaly detection model running on the backend handles complex behavioral pattern analysis in under 50ms."
  },
  {
    category: "Technical Implementation (Hackathon)",
    q: "How does the system scale for millions of users?",
    a: "The architecture is designed as a distributed, event-driven microservices mesh. The Signal Collection and ICE Engine components can be deployed as serverless edge functions to ensure zero-latency scoring during peak banking hours."
  },
  {
    category: "Security Strategy (Hackathon)",
    q: "Why use a Shadow Honeypot instead of just blocking?",
    a: "Blocking attackers tells them their method failed, prompting them to adapt. A honeypot silently contains them in a simulated environment, allowing us to safely collect critical threat intelligence on their tactics without risking actual funds."
  }
];

export default function ChatbotFAQ() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'Hello! I am the Bank of Baroda Trust Assistant. I can answer questions about your account security, or explain the architecture of the Identity Trust Platform to our hackathon judges. What would you like to know?' }
  ]);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [isOpen, messages]);

  const handleAsk = (faq) => {
    // Add user message
    setMessages(prev => [...prev, { type: 'user', text: faq.q }]);
    
    // Simulate thinking delay then add bot response
    setTimeout(() => {
      setMessages(prev => [...prev, { type: 'bot', text: faq.a }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: isOpen ? 0 : 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-corporate text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-primary transition-colors z-50 border-2 border-white/20"
        whileHover={{ y: -2 }}
        whileTap={{ scale: 0.95 }}
      >
        <MessageSquare size={24} />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-[400px] h-[600px] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex flex-col z-50 border border-slate-200 overflow-hidden"
          >
            {/* Header */}
            <div className="bg-corporate px-5 py-4 flex items-center justify-between text-white shadow-md relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                  <ShieldQuestion size={18} className="text-white" />
                </div>
                <div>
                  <div className="font-bold text-sm">BoB Trust Assistant</div>
                  <div className="text-[10px] text-green-400 font-medium flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
                    Online
                  </div>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-white/60 hover:text-white transition-colors p-1"
              >
                <X size={20} />
              </button>
            </div>

            {/* Chat History */}
            <div className="flex-1 overflow-y-auto p-5 bg-slate-50 flex flex-col gap-4">
              {messages.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex items-end gap-2 ${msg.type === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${msg.type === 'user' ? 'bg-primary text-white' : 'bg-slate-200 text-corporate'}`}>
                    {msg.type === 'user' ? <User size={12} /> : <Bot size={12} />}
                  </div>
                  <div 
                    className={`px-4 py-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                      msg.type === 'user' 
                        ? 'bg-primary text-white rounded-br-sm' 
                        : 'bg-white text-corporate border border-slate-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Questions */}
            <div className="bg-white border-t border-slate-100 p-4 shrink-0">
              <div className="text-xs font-bold text-text-secondary/60 uppercase tracking-wider mb-3">
                Suggested Questions
              </div>
              <div className="flex flex-wrap gap-2 overflow-y-auto max-h-[160px] pr-2 custom-scrollbar">
                {faqs.map((faq, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleAsk(faq)}
                    className="text-left text-xs font-medium text-corporate bg-slate-50 hover:bg-primary/10 hover:text-primary border border-slate-200 hover:border-primary/30 px-3 py-2 rounded-xl transition-colors duration-200"
                  >
                    {faq.q}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
