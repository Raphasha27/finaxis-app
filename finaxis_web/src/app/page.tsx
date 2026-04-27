"use client";

import React, { useState, useEffect, useRef } from "react";
import { 
  Home, 
  Wallet, 
  BarChart3, 
  Bot, 
  ScanLine, 
  Scan,
  Ticket, 
  Hotel, 
  Bell, 
  Lock, 
  ShieldCheck, 
  Fingerprint,
  LayoutDashboard,
  User,
  ChevronRight,
  ArrowUpRight,
  ArrowDownLeft,
  Search,
  Settings,
  MoreVertical,
  Zap,
  Power,
  MapPin,
  CheckCircle2,
  Info,
  QrCode,
  Copy,
  X,
  Send,
  Coffee,
  ShoppingBag,
  ShieldAlert,
  TrendingUp,
  Users,
  BarChart2,
  Sparkles
} from "lucide-react";

// --- Components ---
const GlassCard = ({ children, className = "", onClick }: { children: React.ReactNode, className?: string, onClick?: () => void }) => (
  <div onClick={onClick} className={`bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 ${className} ${onClick ? 'cursor-pointer' : ''}`}>
    {children}
  </div>
);

export default function FinAxisWeb() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"ATTENDEE" | "ORGANIZER" | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "analytics" | "ai">("home");
  const [balance, setBalance] = useState(24500.00);
  
  // Modals
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);
  const [isQRModalOpen, setIsQRModalOpen] = useState(false);
  
  // Toast
  const [toast, setToast] = useState<{msg: string, type: 'info'|'success'|'error'} | null>(null);
  
  // AI Chat
  const [aiInput, setAiInput] = useState("");
  const [chatHistory, setChatHistory] = useState<Array<{sender: 'bot'|'user', text: string}>>([
    { sender: 'bot', text: "Welcome to the Kirov Innovation Summit! I'm your dedicated AI Butler. I can help you find vendors, check your schedule, or authorize payments hands-free. Try asking: 'Where is the nearest coffee shop?'" }
  ]);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // Live Data
  const [liveAttendees, setLiveAttendees] = useState(4892);
  const [vendorStats, setVendorStats] = useState([88, 45, 62]);

  // Toast effect
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (msg: string, type: 'info'|'success'|'error' = 'info') => {
    setToast({ msg, type });
  };

  // Live data simulation
  useEffect(() => {
    if (activeTab === "analytics") {
      const interval = setInterval(() => {
        setVendorStats([
          Math.floor(Math.random() * 40) + 40,
          Math.floor(Math.random() * 40) + 40,
          Math.floor(Math.random() * 40) + 40,
        ]);
        setLiveAttendees(prev => prev + Math.floor(Math.random() * 10) - 3);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [activeTab]);

  // Chat auto-scroll
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory, activeTab]);

  const handleSendAI = () => {
    if (!aiInput.trim()) return;
    setChatHistory(prev => [...prev, { sender: 'user', text: aiInput }]);
    setAiInput("");
    
    setTimeout(() => {
      setChatHistory(prev => [...prev, { sender: 'bot', text: "I've logged that request in the ecosystem. You'll receive a push notification if action is required." }]);
    }, 1000);
  };

  const simulatePayment = () => {
    showToast('Processing payment via Ledger...', 'info');
    setTimeout(() => {
      setIsPayModalOpen(false);
      setTimeout(() => {
        setBalance(prev => prev - 120);
        showToast('-R 120.00 Paid to VIP Catering', 'success');
      }, 500);
    }, 1000);
  };

  // --- Screens ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-10 text-white font-sans overflow-hidden relative">
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
            <div className="absolute -bottom-[10%] -right-[10%] w-[80%] h-[50%] bg-blue-900/10 rounded-full blur-[120px] animate-pulse" style={{animationDelay: '-5s'}}></div>
        </div>

        <div className="w-full max-w-md flex flex-col items-center">
            <div className="mb-12 relative group">
                 <div className="absolute inset-0 bg-blue-600/20 blur-[40px] rounded-full group-hover:bg-blue-600/40 transition-all duration-700"></div>
                <div className="w-24 h-24 bg-[#0F172A] rounded-[30px] flex items-center justify-center relative z-10 shadow-[0_0_50px_-10px_rgba(37,99,235,0.5)] border border-blue-500/20">
                    <ShieldCheck size={48} className="text-blue-500" />
                </div>
            </div>
            <h2 className="text-3xl font-black mb-2">Welcome Back</h2>
            <p className="text-slate-500 mb-12">Secure login to FinAxis Hub</p>
            
            <div className="w-full space-y-4 mb-8">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                    <User className="w-5 h-5 text-slate-500" />
                    <input type="text" value="raphasha@kirov.com" className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-slate-200" readOnly />
                </div>
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4">
                    <Lock className="w-5 h-5 text-slate-500" />
                    <input type="password" value="••••••••" className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-slate-200" readOnly />
                    <Fingerprint className="w-5 h-5 text-blue-500 cursor-pointer" />
                </div>
            </div>

            <button onClick={() => setIsAuthenticated(true)} className="w-full bg-blue-600 py-5 rounded-[24px] font-black text-lg shadow-xl shadow-blue-600/30 mb-6 active:scale-95 transition-transform flex items-center justify-center gap-3 hover:bg-blue-500">
                <span>Login Now</span>
                <ChevronRight className="w-5 h-5" />
            </button>
            <p className="text-center text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold mt-8">Created by Kirov Dynamics Technology</p>
        </div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-10 text-white font-sans relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none -z-10">
            <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[50%] bg-blue-600/10 rounded-full blur-[120px]"></div>
        </div>
        <div className="w-full max-w-md">
            <h2 className="text-4xl font-bold mb-3 text-center">Identify Role</h2>
            <p className="text-slate-500 mb-14 text-lg text-center">Initialize your secure terminal</p>
            
            <div className="w-full space-y-6">
                <button onClick={() => { setRole("ATTENDEE"); setActiveTab("home"); }} className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col items-center gap-6 hover:border-blue-500/50 hover:bg-white/10 transition-all active:scale-[0.98] group relative overflow-hidden">
                    <div className="p-5 bg-blue-600/10 rounded-3xl group-hover:bg-blue-600 transition-colors">
                        <User className="text-blue-500 group-hover:text-white w-10 h-10" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="font-bold text-2xl block mb-2">Attendee</span>
                        <p className="text-sm text-slate-400">Payments & AI Butler Access</p>
                    </div>
                </button>

                <button onClick={() => { setRole("ORGANIZER"); setActiveTab("analytics"); }} className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col items-center gap-6 hover:border-emerald-500/50 hover:bg-white/10 transition-all active:scale-[0.98] group relative overflow-hidden">
                    <div className="p-5 bg-emerald-500/10 rounded-3xl group-hover:bg-emerald-500 transition-colors">
                        <LayoutDashboard className="text-emerald-500 group-hover:text-white w-10 h-10" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="font-bold text-2xl block mb-2">Organizer</span>
                        <p className="text-sm text-slate-400">Security & Revenue Analytics</p>
                    </div>
                </button>
            </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-white font-sans pb-40 relative">
      <div className="fixed inset-0 pointer-events-none -z-10">
          <div className="absolute -top-[10%] -left-[10%] w-[80%] h-[50%] bg-blue-600/10 rounded-full blur-[120px] opacity-50"></div>
      </div>

      {/* --- Header --- */}
      <header className="p-6 flex justify-between items-center sticky top-0 bg-[#05070A]/80 backdrop-blur-3xl z-40 border-b border-white/5 max-w-2xl mx-auto">
          <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center cursor-pointer" onClick={() => setActiveTab('home')}>
                  <Zap className="text-blue-500 w-5 h-5" />
              </div>
              <div>
                  <h1 className="text-lg font-black tracking-tight leading-none">FinAxis</h1>
                  <p className="text-[9px] uppercase font-bold text-blue-500 tracking-widest mt-1">
                      {role === "ORGANIZER" ? "ORGANIZER HUB" : "SECURE TERMINAL"}
                  </p>
              </div>
          </div>
          <div className="flex gap-3">
              <button className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-white active:scale-95" onClick={() => showToast('Security Audit Clean', 'success')}><ShieldCheck className="w-5 h-5" /></button>
              <button onClick={() => { setIsAuthenticated(false); setRole(null); }} className="p-3 bg-white/5 rounded-2xl text-slate-400 hover:text-rose-500 active:scale-95"><Power className="w-5 h-5" /></button>
          </div>
      </header>

      {/* --- Content --- */}
      <main className="max-w-xl mx-auto px-6 mt-6">
        {activeTab === "home" && (
          <div className="space-y-8 animate-[slide-in_0.3s_ease-out]">
              <div className="flex justify-between items-center px-2">
                  <div className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
                      <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Network Secure</span>
                  </div>
                  <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest bg-white/5 px-2 py-1 rounded-md">LIVE EVENT</span>
              </div>

              {/* Hero */}
              <GlassCard className="relative overflow-hidden group shadow-2xl border-blue-500/20">
                  <h3 className="text-2xl font-black mb-1">Kirov Innovation Summit</h3>
                  <p className="text-slate-400 text-xs mb-10 flex items-center gap-2">
                      <MapPin className="w-3 h-3 text-blue-500" /> Sandton Convention Centre
                  </p>
                  <div className="flex items-center justify-between relative z-10">
                      <div className="flex -space-x-3">
                          <div className="w-10 h-10 rounded-full border-4 border-[#0F172A] bg-slate-800" />
                          <div className="w-10 h-10 rounded-full border-4 border-[#0F172A] bg-slate-700" />
                          <div className="w-10 h-10 rounded-full border-4 border-[#0F172A] bg-blue-600 flex items-center justify-center text-[10px] font-bold">+2.4k</div>
                      </div>
                      <button onClick={() => setIsQRModalOpen(true)} className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-[20px] text-sm font-black shadow-xl transition-all active:scale-95 flex items-center gap-2">
                          <QrCode className="w-4 h-4" /> Access Pass
                      </button>
                  </div>
              </GlassCard>

              {/* Actions Grid */}
              <div className="grid grid-cols-2 gap-4">
                  <GlassCard onClick={() => setIsPayModalOpen(true)} className="flex flex-col gap-4 group hover:border-amber-500/30">
                      <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                          <ScanLine className="w-6 h-6" />
                      </div>
                      <div>
                          <h5 className="font-bold text-sm text-slate-200">Scan & Pay</h5>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Zero Wait Time</p>
                      </div>
                  </GlassCard>
                  <GlassCard onClick={() => setActiveTab('ai')} className="flex flex-col gap-4 group hover:border-blue-500/30">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-2xl flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                          <Bot className="w-6 h-6" />
                      </div>
                      <div>
                          <h5 className="font-bold text-sm text-slate-200">AI Butler</h5>
                          <p className="text-[10px] text-slate-500 mt-1 uppercase tracking-wider">Ask Anything</p>
                      </div>
                  </GlassCard>
              </div>

              {/* Schedule */}
              <GlassCard className="space-y-4">
                   <div className="flex justify-between items-center">
                      <h4 className="font-bold text-sm">Up Next</h4>
                      <span className="text-xs text-blue-500 cursor-pointer hover:underline">Full Schedule</span>
                  </div>
                  <div className="flex gap-4 items-center p-3 hover:bg-white/5 rounded-xl transition-colors cursor-pointer">
                      <div className="bg-blue-600/20 text-blue-500 rounded-lg p-2 text-center w-14">
                          <span className="block text-xs font-black">14:00</span>
                      </div>
                      <div>
                          <p className="text-sm font-bold">Keynote: Future AI</p>
                          <p className="text-xs text-slate-400">Mainstage Hall A</p>
                      </div>
                  </div>
              </GlassCard>
          </div>
        )}

        {activeTab === "wallet" && (
          <div className="space-y-10 animate-[slide-in_0.3s_ease-out]">
              <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-black">Event Wallet</h3>
                  <span className="text-xs text-emerald-500 font-bold bg-emerald-500/10 px-3 py-1 rounded-full flex items-center"><CheckCircle2 className="w-3 h-3 mr-1" />Ledger Synced</span>
              </div>
              
              <div className="bg-gradient-to-br from-blue-600 to-indigo-900 p-10 rounded-[44px] text-white shadow-3xl shadow-blue-600/40 relative overflow-hidden">
                  <p className="text-white/70 text-[10px] font-black uppercase tracking-[0.3em] mb-2">Available Credits</p>
                  <h4 className="text-5xl font-black mb-12 tracking-tighter">R {balance.toFixed(2)}</h4>
                  <div className="flex gap-4 relative z-10">
                      <button onClick={() => showToast('Secure top-up gateway opening...')} className="flex-1 bg-white text-blue-800 py-4 rounded-[20px] font-black text-sm active:scale-95">Top Up</button>
                      <button onClick={() => showToast('Withdrawal queued')} className="flex-1 bg-white/10 text-white border border-white/20 py-4 rounded-[20px] font-black text-sm active:scale-95">Withdraw</button>
                  </div>
              </div>

              <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                      <h4 className="font-extrabold text-lg">Transaction Vault</h4>
                  </div>
                  <div className="space-y-3">
                      <GlassCard className="p-5 flex justify-between items-center hover:bg-white/5">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-slate-400"><Coffee className="w-5 h-5" /></div>
                              <div>
                                  <p className="font-bold text-sm">Summit Café</p>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Today, 12:45 PM</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="font-black text-sm text-slate-200">-R 65.00</p>
                          </div>
                      </GlassCard>
                      <GlassCard className="p-5 flex justify-between items-center hover:bg-white/5">
                          <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-[#0F172A] rounded-2xl flex items-center justify-center text-emerald-500"><ArrowDownLeft className="w-5 h-5" /></div>
                              <div>
                                  <p className="font-bold text-sm">Initial Deposit</p>
                                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest mt-1">Yesterday</p>
                              </div>
                          </div>
                          <div className="text-right">
                              <p className="font-black text-sm text-emerald-500">+R 25,000.00</p>
                          </div>
                      </GlassCard>
                  </div>
              </div>
          </div>
        )}

        {activeTab === "analytics" && (
          <div className="space-y-10 animate-[slide-in_0.3s_ease-out]">
              <div className="flex justify-between items-end">
                  <h3 className="text-3xl font-black">Live Analytics</h3>
                  <span className="text-xs text-rose-500 font-bold bg-rose-500/10 px-3 py-1 rounded-full flex items-center animate-pulse"><Activity className="w-3 h-3 mr-1" />Live Data</span>
              </div>

              <GlassCard className="flex items-center gap-6 border-l-4 border-rose-500">
                  <div className="w-14 h-14 bg-rose-500/20 rounded-2xl flex items-center justify-center shrink-0">
                      <ShieldAlert className="text-rose-500 w-7 h-7" />
                  </div>
                  <div>
                      <p className="font-black text-slate-200 text-sm mb-1">Velocity Protection On</p>
                      <p className="text-xs text-slate-400 font-medium">AML engine monitoring live nodes. 0 anomalies detected.</p>
                  </div>
              </GlassCard>
              
              <div className="grid grid-cols-2 gap-4">
                  <GlassCard className="flex flex-col justify-between h-32 border-t-2 border-emerald-500">
                      <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Gross Revenue</p>
                      <div>
                          <p className="text-2xl font-black">R 1.2M</p>
                          <p className="text-emerald-500 text-xs font-bold mt-1 flex items-center"><TrendingUp className="w-3 h-3 mr-1" /> 14% vs yesterday</p>
                      </div>
                  </GlassCard>
                  <GlassCard className="flex flex-col justify-between h-32 border-t-2 border-blue-500">
                       <p className="text-slate-500 text-[10px] font-black uppercase tracking-widest">Active Attendees</p>
                      <div>
                          <p className="text-2xl font-black">{liveAttendees.toLocaleString()}</p>
                          <p className="text-blue-500 text-xs font-bold mt-1 flex items-center"><Users className="w-3 h-3 mr-1" /> Peak Capacity</p>
                      </div>
                  </GlassCard>
              </div>

              <GlassCard className="space-y-8">
                  <div className="flex justify-between items-center">
                      <h4 className="font-black text-lg">Vendor Traffic Load</h4>
                      <BarChart2 className="w-5 h-5 text-slate-500" />
                  </div>
                  <div className="space-y-5">
                      {[
                        { name: 'Mainstage Bar', val: vendorStats[0], color: 'bg-blue-600' },
                        { name: 'VIP Catering', val: vendorStats[1], color: 'bg-emerald-500' },
                        { name: 'Merch Plaza A', val: vendorStats[2], color: 'bg-amber-500' }
                      ].map((v, i) => (
                        <div key={i} className="space-y-2">
                            <div className="flex justify-between text-xs font-bold text-slate-300">
                                <span>{v.name}</span>
                                <span className={v.color.replace('bg-', 'text-')}>{v.val}%</span>
                            </div>
                            <div className="h-2.5 bg-[#0F172A] rounded-full overflow-hidden">
                                <div className={`h-full ${v.color} transition-all duration-1000`} style={{width: `${v.val}%`}}></div>
                            </div>
                        </div>
                      ))}
                  </div>
              </GlassCard>
          </div>
        )}

        {activeTab === "ai" && (
           <div className="space-y-6 flex flex-col h-[75vh] animate-[slide-in_0.3s_ease-out]">
              <div className="flex items-center gap-4 px-2">
                  <div className="w-12 h-12 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/30">
                      <Bot className="text-blue-500 w-6 h-6" />
                  </div>
                  <div>
                      <h3 className="text-2xl font-black">AI Assistant</h3>
                      <div className="flex items-center gap-1 mt-0.5">
                          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Online & Ready</p>
                      </div>
                  </div>
              </div>

              <div ref={chatBoxRef} className="flex-1 overflow-y-auto space-y-6 pr-2 scroll-smooth">
                  {chatHistory.map((msg, i) => (
                    <div key={i} className={`flex gap-3 ${msg.sender === 'user' ? 'flex-row-reverse' : ''} animate-[slide-in_0.3s_ease-out]`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-blue-600 shadow-lg shadow-blue-600/30' : 'bg-white/5 border border-blue-500/30'}`}>
                            {msg.sender === 'user' ? <User className="w-4 h-4 text-white" /> : <Sparkles className="w-4 h-4 text-blue-400" />}
                        </div>
                        <div className={`p-4 rounded-[24px] text-sm font-medium leading-relaxed shadow-lg ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 text-white rounded-tl-none'}`}>
                            {msg.text}
                        </div>
                    </div>
                  ))}
              </div>
              
              <div className="relative pt-2 pb-4">
                  <input 
                    type="text" 
                    value={aiInput}
                    onChange={(e) => setAiInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendAI()}
                    placeholder="Type a message..." 
                    className="w-full bg-white/5 backdrop-blur-xl p-5 rounded-[28px] pr-16 text-sm border border-white/10 focus:border-blue-500/50 outline-none text-white" 
                  />
                  <button onClick={handleSendAI} className="absolute right-4 top-[22px] p-2.5 bg-blue-600 hover:bg-blue-500 rounded-xl text-white shadow-lg active:scale-95 transition-all"><Send className="w-5 h-5" /></button>
              </div>
          </div>
        )}
      </main>

      {/* --- Tab Navigation --- */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-6">
        <div className="bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 rounded-[40px] p-4 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <button onClick={() => switchTab('home')} className={`p-4 rounded-2xl transition-colors ${activeTab === 'home' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'}`}><Home className="w-6 h-6" /></button>
            <button onClick={() => switchTab('wallet')} className={`p-4 rounded-2xl transition-colors ${activeTab === 'wallet' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'}`}><Wallet className="w-6 h-6" /></button>
            
            <div className="relative -top-8">
                <div className="absolute inset-0 bg-blue-600 blur-xl opacity-50 rounded-full"></div>
                <div className="w-16 h-16 bg-gradient-to-tr from-blue-700 to-blue-500 rounded-full flex items-center justify-center shadow-2xl active:scale-90 transition-all cursor-pointer border-[4px] border-[#05070A] relative z-10" onClick={() => setIsPayModalOpen(true)}>
                    <ScanLine className="text-white w-7 h-7" />
                </div>
            </div>
            
            {role === "ORGANIZER" && (
                <button onClick={() => switchTab('analytics')} className={`p-4 rounded-2xl transition-colors ${activeTab === 'analytics' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'}`}><BarChart3 className="w-6 h-6" /></button>
            )}
            <button onClick={() => switchTab('ai')} className={`p-4 rounded-2xl transition-colors ${activeTab === 'ai' ? 'text-blue-500 bg-blue-500/10' : 'text-slate-500 hover:text-white'}`}><Bot className="w-6 h-6" /></button>
        </div>
      </nav>

      {/* --- Modals --- */}
      {isPayModalOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
            <div onClick={() => setIsPayModalOpen(false)} className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-[fade-in_0.3s_ease-out]"></div>
            <div className="relative bg-[#0F172A] rounded-t-[40px] p-8 pb-12 border-t border-white/10 animate-[slide-up_0.3s_ease-out] shadow-[0_-20px_50px_rgba(0,0,0,0.5)]">
                <div className="w-12 h-1.5 bg-slate-700 rounded-full mx-auto mb-8"></div>
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center text-amber-500"><ScanLine className="w-6 h-6" /></div>
                    <div>
                        <h3 className="text-2xl font-black">Scan to Pay</h3>
                        <p className="text-xs text-slate-400">Hold camera up to vendor QR</p>
                    </div>
                </div>
                
                <div onClick={simulatePayment} className="w-full aspect-square bg-[#05070A] rounded-[32px] border-2 border-dashed border-slate-700 flex flex-col items-center justify-center relative overflow-hidden mb-8 group cursor-pointer">
                    <QrCode className="w-16 h-16 text-slate-600 group-hover:text-amber-500 transition-colors" />
                    <p className="text-xs text-slate-500 mt-4 font-medium">Tap to simulate scan</p>
                </div>
                <button onClick={() => setIsPayModalOpen(false)} className="w-full py-4 rounded-2xl font-bold text-sm text-slate-400 hover:text-white hover:bg-white/5 transition-colors">Cancel</button>
            </div>
        </div>
      )}

      {isQRModalOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6">
            <div onClick={() => setIsQRModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-md animate-[fade-in_0.3s_ease-out]"></div>
            <div className="relative bg-white rounded-[40px] p-8 w-full max-w-sm text-center animate-[pop-in_0.3s_ease-out]">
                <div className="mb-6">
                    <h3 className="text-2xl font-black text-slate-900">VIP Access Pass</h3>
                    <p className="text-slate-500 text-sm font-medium">Raphasha Kirov</p>
                </div>
                <div className="w-full aspect-square rounded-[24px] bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-inner mb-6" style={{ backgroundImage: 'linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 75%, #0F172A 75%, #0F172A), linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 75%, #0F172A 75%, #0F172A)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}>
                    <div className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg"><Zap className="w-8 h-8 text-blue-600" /></div>
                </div>
                <div className="bg-slate-100 rounded-2xl p-4 flex items-center justify-between border border-slate-200">
                    <div className="text-left">
                        <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Ticket ID</p>
                        <p className="text-sm font-black text-slate-800 font-mono">KV-8892-A7X</p>
                    </div>
                    <Copy className="w-5 h-5 text-slate-400 cursor-pointer hover:text-blue-600" onClick={() => showToast('ID Copied')} />
                </div>
                <button onClick={() => setIsQRModalOpen(false)} className="mt-6 w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500 hover:bg-slate-200"><X className="w-5 h-5" /></button>
            </div>
        </div>
      )}

      {/* --- Toast --- */}
      {toast && (
        <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[300] w-max max-w-[90vw] animate-[slide-down_0.3s_ease-out]">
            <div className={`bg-[#0F172A]/95 border px-6 py-4 rounded-full flex items-center gap-3 shadow-2xl ${toast.type === 'success' ? 'border-emerald-500/50' : 'border-blue-500/50'}`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-500" /> : <Info className="w-5 h-5 text-blue-500" />}
                <p className="font-bold text-sm text-white">{toast.msg}</p>
            </div>
        </div>
      )}

      <style dangerouslySetInnerHTML={{__html: `
        @keyframes slide-in { from { transform: translateX(20px); opacity: 0; } to { transform: translateX(0); opacity: 1; } }
        @keyframes fade-in { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slide-up { from { transform: translateY(100%); } to { transform: translateY(0); } }
        @keyframes pop-in { from { transform: scale(0.95); opacity: 0; } to { transform: scale(1); opacity: 1; } }
        @keyframes slide-down { from { transform: translateY(-20px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      `}} />
    </div>
  );
}

// Activity Icon Component Polyfill since lucide-react import list was getting long
function Activity(props: any) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
}
