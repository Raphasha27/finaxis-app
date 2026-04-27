"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  <motion.div 
    whileHover={onClick ? { scale: 1.02, backgroundColor: "rgba(255,255,255,0.08)" } : {}}
    whileTap={onClick ? { scale: 0.98 } : {}}
    onClick={onClick} 
    className={`bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[32px] p-6 shadow-2xl ${className} ${onClick ? 'cursor-pointer' : ''}`}
  >
    {children}
  </motion.div>
);

// --- Page Animation Variants ---
const pageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.98 },
  animate: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, staggerChildren: 0.1 } },
  exit: { opacity: 0, y: -20, scale: 0.98, transition: { duration: 0.3 } }
};

const itemVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
};

export default function FinAxisWeb() {
  const [mounted, setMounted] = useState(false);
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

  // Glow Tracker State
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setMounted(true);
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

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

  if (!mounted) return null; // Bypass SSR for framer-motion compatibility

  // --- Screens ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-10 text-white font-sans overflow-hidden relative">
        {/* Dynamic Glow Tracker */}
        <motion.div 
          className="fixed w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"
          animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
          transition={{ type: "spring", damping: 30, stiffness: 50, mass: 2 }}
        />

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md flex flex-col items-center"
        >
            <motion.div 
              whileHover={{ scale: 1.05 }}
              className="mb-12 relative group"
            >
                <div className="absolute inset-0 bg-blue-600/30 blur-[50px] rounded-full group-hover:bg-blue-600/50 transition-all duration-700"></div>
                <div className="w-28 h-28 bg-[#0F172A]/80 backdrop-blur-xl rounded-[36px] flex items-center justify-center relative z-10 shadow-[0_0_80px_-15px_rgba(37,99,235,0.6)] border border-blue-500/30">
                    <ShieldCheck size={56} className="text-blue-500 drop-shadow-[0_0_15px_rgba(37,99,235,0.8)]" />
                </div>
            </motion.div>
            
            <h2 className="text-4xl font-black mb-2 tracking-tight">Welcome Back</h2>
            <p className="text-slate-400 mb-12 text-lg">Secure login to FinAxis Hub</p>
            
            <div className="w-full space-y-4 mb-8">
                <motion.div whileTap={{ scale: 0.98 }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors focus-within:border-blue-500/50">
                    <User className="w-5 h-5 text-slate-500" />
                    <input type="text" value="raphasha@kirov.com" className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-slate-200" readOnly />
                </motion.div>
                <motion.div whileTap={{ scale: 0.98 }} className="bg-white/5 backdrop-blur-xl border border-white/10 p-5 rounded-2xl flex items-center gap-4 transition-colors focus-within:border-blue-500/50">
                    <Lock className="w-5 h-5 text-slate-500" />
                    <input type="password" value="••••••••" className="bg-transparent border-none outline-none flex-1 text-sm font-bold text-slate-200" readOnly />
                    <Fingerprint className="w-6 h-6 text-blue-500 cursor-pointer drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
                </motion.div>
            </div>

            <motion.button 
                whileHover={{ scale: 1.02, backgroundColor: "#2563EB" }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAuthenticated(true)} 
                className="w-full bg-blue-600/90 backdrop-blur-md py-5 rounded-[24px] font-black text-lg shadow-[0_20px_40px_-10px_rgba(37,99,235,0.5)] border border-blue-400/20 flex items-center justify-center gap-3 group"
            >
                <span>Login Now</span>
                <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </motion.button>
            <p className="text-center text-[10px] uppercase tracking-[0.3em] text-slate-500 font-bold mt-10">Created by Kirov Dynamics Technology</p>
        </motion.div>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-[#05070A] flex flex-col items-center justify-center p-10 text-white font-sans relative overflow-hidden">
        {/* Dynamic Glow Tracker */}
        <motion.div 
          className="fixed w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px] pointer-events-none -z-10"
          animate={{ x: mousePos.x - 300, y: mousePos.y - 300 }}
          transition={{ type: "spring", damping: 30, stiffness: 50 }}
        />

        <motion.div 
          initial="initial"
          animate="animate"
          variants={pageVariants}
          className="w-full max-w-md"
        >
            <motion.h2 variants={itemVariants} className="text-4xl font-black mb-3 text-center tracking-tight">Identify Role</motion.h2>
            <motion.p variants={itemVariants} className="text-slate-400 mb-14 text-lg text-center">Initialize your secure terminal</motion.p>
            
            <div className="w-full space-y-6">
                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, borderColor: "rgba(59,130,246,0.5)", backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setRole("ATTENDEE"); setActiveTab("home"); }} 
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col items-center gap-6 group relative overflow-hidden shadow-2xl"
                >
                    <div className="p-6 bg-blue-600/10 rounded-[28px] group-hover:bg-blue-600 group-hover:shadow-[0_0_30px_rgba(37,99,235,0.6)] transition-all duration-500">
                        <User className="text-blue-500 group-hover:text-white w-10 h-10 transition-colors" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="font-black text-2xl block mb-2 tracking-tight">Attendee</span>
                        <p className="text-sm text-slate-400 font-medium">Payments & AI Butler Access</p>
                    </div>
                </motion.button>

                <motion.button 
                    variants={itemVariants}
                    whileHover={{ scale: 1.02, borderColor: "rgba(16,185,129,0.5)", backgroundColor: "rgba(255,255,255,0.05)" }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => { setRole("ORGANIZER"); setActiveTab("analytics"); }} 
                    className="w-full bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[40px] flex flex-col items-center gap-6 group relative overflow-hidden shadow-2xl"
                >
                    <div className="p-6 bg-emerald-500/10 rounded-[28px] group-hover:bg-emerald-500 group-hover:shadow-[0_0_30px_rgba(16,185,129,0.6)] transition-all duration-500">
                        <LayoutDashboard className="text-emerald-500 group-hover:text-white w-10 h-10 transition-colors" />
                    </div>
                    <div className="text-center relative z-10">
                        <span className="font-black text-2xl block mb-2 tracking-tight">Organizer</span>
                        <p className="text-sm text-slate-400 font-medium">Security & Revenue Analytics</p>
                    </div>
                </motion.button>
            </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#05070A] text-white font-sans pb-40 relative overflow-hidden">
      <motion.div 
          className="fixed w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px] pointer-events-none -z-10"
          animate={{ x: mousePos.x - 400, y: mousePos.y - 400 }}
          transition={{ type: "spring", damping: 40, stiffness: 30 }}
      />

      {/* --- Header --- */}
      <motion.header 
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="p-6 flex justify-between items-center sticky top-0 bg-[#05070A]/60 backdrop-blur-3xl z-40 border-b border-white/5 max-w-2xl mx-auto shadow-sm"
      >
          <div className="flex items-center gap-4">
              <motion.div 
                whileHover={{ rotate: 15, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-12 h-12 bg-gradient-to-br from-white/10 to-white/5 border border-white/10 rounded-[16px] flex items-center justify-center cursor-pointer shadow-lg" 
                onClick={() => setActiveTab('home')}
              >
                  <Zap className="text-blue-500 w-6 h-6" />
              </motion.div>
              <div>
                  <h1 className="text-xl font-black tracking-tight leading-none">FinAxis</h1>
                  <p className="text-[10px] uppercase font-black text-blue-500 tracking-[0.2em] mt-1.5 drop-shadow-[0_0_5px_rgba(37,99,235,0.5)]">
                      {role === "ORGANIZER" ? "ORGANIZER HUB" : "SECURE TERMINAL"}
                  </p>
              </div>
          </div>
          <div className="flex gap-3">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="p-3.5 bg-white/5 border border-white/10 rounded-[16px] text-slate-400 hover:text-emerald-400 hover:border-emerald-500/30 transition-colors shadow-lg" onClick={() => showToast('Security Audit Clean', 'success')}><ShieldCheck className="w-5 h-5" /></motion.button>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => { setIsAuthenticated(false); setRole(null); }} className="p-3.5 bg-white/5 border border-white/10 rounded-[16px] text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-colors shadow-lg"><Power className="w-5 h-5" /></motion.button>
          </div>
      </motion.header>

      {/* --- Content --- */}
      <main className="max-w-xl mx-auto px-6 mt-8">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div key="home" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-8">
                <div className="flex justify-between items-center px-2">
                    <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.8)]"></span>
                        <span className="text-[11px] font-black text-emerald-500 uppercase tracking-[0.2em]">Network Secure</span>
                    </div>
                    <span className="text-[10px] text-slate-300 font-black uppercase tracking-[0.2em] bg-white/10 px-3 py-1.5 rounded-lg border border-white/10">LIVE EVENT</span>
                </div>

                {/* Hero */}
                <GlassCard className="relative overflow-hidden group border-blue-500/30 shadow-[0_20px_50px_-15px_rgba(37,99,235,0.3)]">
                    <div className="absolute right-0 top-0 w-48 h-48 bg-blue-600/20 rounded-bl-full blur-3xl pointer-events-none" />
                    <h3 className="text-3xl font-black mb-2 tracking-tight">Kirov Innovation Summit</h3>
                    <p className="text-slate-400 text-sm mb-10 flex items-center gap-2 font-medium">
                        <MapPin className="w-4 h-4 text-blue-500" /> Sandton Convention Centre
                    </p>
                    <div className="flex items-center justify-between relative z-10">
                        <div className="flex -space-x-4">
                            <div className="w-12 h-12 rounded-full border-[3px] border-[#0F172A] bg-slate-800 shadow-xl" />
                            <div className="w-12 h-12 rounded-full border-[3px] border-[#0F172A] bg-slate-700 shadow-xl" />
                            <div className="w-12 h-12 rounded-full border-[3px] border-[#0F172A] bg-blue-600 flex items-center justify-center text-[11px] font-black shadow-xl drop-shadow-[0_0_8px_rgba(37,99,235,0.8)]">+2.4k</div>
                        </div>
                        <motion.button 
                          whileHover={{ scale: 1.05 }} 
                          whileTap={{ scale: 0.95 }}
                          onClick={() => setIsQRModalOpen(true)} 
                          className="bg-blue-600 text-white px-6 py-4 rounded-[20px] text-sm font-black shadow-[0_10px_20px_rgba(37,99,235,0.4)] flex items-center gap-2"
                        >
                            <QrCode className="w-5 h-5" /> Access Pass
                        </motion.button>
                    </div>
                </GlassCard>

                {/* Actions Grid */}
                <div className="grid grid-cols-2 gap-4">
                    <GlassCard onClick={() => setIsPayModalOpen(true)} className="flex flex-col gap-5 hover:border-amber-500/40 hover:shadow-[0_10px_30px_-10px_rgba(245,158,11,0.3)] transition-all">
                        <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner">
                            <ScanLine className="w-7 h-7" />
                        </div>
                        <div>
                            <h5 className="font-black text-base text-slate-100">Scan & Pay</h5>
                            <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Zero Wait Time</p>
                        </div>
                    </GlassCard>
                    <GlassCard onClick={() => setActiveTab('ai')} className="flex flex-col gap-5 hover:border-blue-500/40 hover:shadow-[0_10px_30px_-10px_rgba(37,99,235,0.3)] transition-all">
                        <div className="w-14 h-14 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-center text-blue-500 shadow-inner">
                            <Bot className="w-7 h-7" />
                        </div>
                        <div>
                            <h5 className="font-black text-base text-slate-100">AI Butler</h5>
                            <p className="text-[11px] text-slate-400 mt-1 uppercase tracking-widest font-bold">Ask Anything</p>
                        </div>
                    </GlassCard>
                </div>

                {/* Schedule */}
                <GlassCard className="space-y-5">
                     <div className="flex justify-between items-center">
                        <h4 className="font-black text-base">Up Next</h4>
                        <span className="text-xs text-blue-400 cursor-pointer font-bold hover:text-blue-300">Full Schedule</span>
                    </div>
                    <motion.div whileHover={{ x: 5, backgroundColor: "rgba(255,255,255,0.05)" }} className="flex gap-5 items-center p-4 rounded-2xl transition-colors cursor-pointer border border-transparent hover:border-white/5">
                        <div className="bg-blue-600/20 border border-blue-500/30 text-blue-400 rounded-xl p-3 text-center w-16 shadow-inner">
                            <span className="block text-sm font-black">14:00</span>
                        </div>
                        <div>
                            <p className="text-base font-bold text-slate-100">Keynote: Future AI</p>
                            <p className="text-sm text-slate-400 font-medium mt-0.5">Mainstage Hall A</p>
                        </div>
                    </motion.div>
                </GlassCard>
            </motion.div>
          )}

          {activeTab === "wallet" && (
            <motion.div key="wallet" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
                <div className="flex justify-between items-end">
                    <h3 className="text-4xl font-black tracking-tight">Event Wallet</h3>
                    <span className="text-xs text-emerald-400 font-black bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg flex items-center shadow-[0_0_15px_rgba(16,185,129,0.2)]"><CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />Ledger Synced</span>
                </div>
                
                <motion.div 
                  layoutId="wallet-card"
                  className="bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-900 p-10 rounded-[40px] text-white shadow-[0_30px_60px_-15px_rgba(37,99,235,0.6)] relative overflow-hidden border border-blue-400/30"
                >
                    <div className="absolute -right-20 -top-20 w-64 h-64 bg-white/10 rounded-full blur-3xl pointer-events-none" />
                    <p className="text-blue-200 text-[11px] font-black uppercase tracking-[0.3em] mb-3 drop-shadow-md">Available Credits</p>
                    <h4 className="text-6xl font-black mb-12 tracking-tighter drop-shadow-lg">R {balance.toFixed(2)}</h4>
                    <div className="flex gap-4 relative z-10">
                        <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => showToast('Secure top-up gateway opening...')} className="flex-1 bg-white text-blue-900 py-4.5 rounded-[20px] font-black text-sm shadow-[0_10px_20px_rgba(0,0,0,0.2)]">Top Up</motion.button>
                        <motion.button whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }} whileTap={{ scale: 0.95 }} onClick={() => showToast('Withdrawal queued')} className="flex-1 bg-white/10 text-white border border-white/20 py-4.5 rounded-[20px] font-black text-sm backdrop-blur-md">Withdraw</motion.button>
                    </div>
                </motion.div>

                <div className="space-y-5">
                    <div className="flex justify-between items-center px-2">
                        <h4 className="font-black text-xl">Transaction Vault</h4>
                    </div>
                    <div className="space-y-4">
                        <GlassCard className="p-5 flex justify-between items-center hover:bg-white/10 group">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#0F172A] border border-white/5 rounded-2xl flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform shadow-inner"><Coffee className="w-6 h-6" /></div>
                                <div>
                                    <p className="font-bold text-base text-slate-100">Summit Café</p>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Today, 12:45 PM</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-base text-slate-200">-R 65.00</p>
                            </div>
                        </GlassCard>
                        <GlassCard className="p-5 flex justify-between items-center hover:bg-white/10 group">
                            <div className="flex items-center gap-5">
                                <div className="w-14 h-14 bg-[#0F172A] border border-white/5 rounded-2xl flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform shadow-inner"><ArrowDownLeft className="w-6 h-6" /></div>
                                <div>
                                    <p className="font-bold text-base text-slate-100">Initial Deposit</p>
                                    <p className="text-[11px] text-slate-400 font-bold uppercase tracking-[0.2em] mt-1">Yesterday</p>
                                </div>
                            </div>
                            <div className="text-right">
                                <p className="font-black text-base text-emerald-400 drop-shadow-[0_0_8px_rgba(16,185,129,0.5)]">+R 25,000.00</p>
                            </div>
                        </GlassCard>
                    </div>
                </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div key="analytics" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-10">
                <div className="flex justify-between items-end">
                    <h3 className="text-4xl font-black tracking-tight">Live Analytics</h3>
                    <span className="text-xs text-rose-400 font-black bg-rose-500/10 border border-rose-500/20 px-3 py-1.5 rounded-lg flex items-center shadow-[0_0_15px_rgba(244,63,94,0.2)] animate-pulse"><Activity className="w-3.5 h-3.5 mr-1.5" />Live Data</span>
                </div>

                <motion.div 
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1, transition: { delay: 0.2, type: "spring", stiffness: 100 } }}
                >
                  <GlassCard className="flex items-center gap-6 border-l-4 border-l-rose-500 bg-gradient-to-r from-rose-500/10 to-transparent">
                      <div className="w-16 h-16 bg-rose-500/20 rounded-2xl flex items-center justify-center shrink-0 border border-rose-500/30">
                          <ShieldAlert className="text-rose-400 w-8 h-8 drop-shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                      </div>
                      <div>
                          <p className="font-black text-slate-100 text-base mb-1">Velocity Protection Active</p>
                          <p className="text-sm text-slate-400 font-medium">AML engine monitoring live nodes. <span className="text-emerald-400 font-bold">0 anomalies</span> detected.</p>
                      </div>
                  </GlassCard>
                </motion.div>
                
                <div className="grid grid-cols-2 gap-4">
                    <GlassCard className="flex flex-col justify-between h-36 border-t-[3px] border-emerald-500/80 bg-gradient-to-b from-emerald-500/5 to-transparent">
                        <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">Gross Revenue</p>
                        <div>
                            <p className="text-3xl font-black tracking-tight">R 1.2M</p>
                            <p className="text-emerald-400 text-xs font-black mt-2 flex items-center drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]"><TrendingUp className="w-4 h-4 mr-1" /> 14% vs yesterday</p>
                        </div>
                    </GlassCard>
                    <GlassCard className="flex flex-col justify-between h-36 border-t-[3px] border-blue-500/80 bg-gradient-to-b from-blue-500/5 to-transparent">
                         <p className="text-slate-400 text-[11px] font-black uppercase tracking-[0.2em]">Active Attendees</p>
                        <div>
                            <motion.p 
                              key={liveAttendees} 
                              initial={{ scale: 1.2, color: "#3B82F6" }} 
                              animate={{ scale: 1, color: "#FFFFFF" }} 
                              className="text-3xl font-black tracking-tight"
                            >
                              {liveAttendees.toLocaleString()}
                            </motion.p>
                            <p className="text-blue-400 text-xs font-black mt-2 flex items-center drop-shadow-[0_0_5px_rgba(37,99,235,0.5)]"><Users className="w-4 h-4 mr-1" /> Peak Capacity</p>
                        </div>
                    </GlassCard>
                </div>

                <GlassCard className="space-y-8 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.5)]">
                    <div className="flex justify-between items-center">
                        <h4 className="font-black text-xl">Vendor Traffic Load</h4>
                        <div className="p-2 bg-white/5 rounded-lg border border-white/10"><BarChart2 className="w-5 h-5 text-slate-300" /></div>
                    </div>
                    <div className="space-y-6">
                        {[
                          { name: 'Mainstage Bar', val: vendorStats[0], color: 'bg-blue-500', glow: 'rgba(37,99,235,0.6)' },
                          { name: 'VIP Catering', val: vendorStats[1], color: 'bg-emerald-500', glow: 'rgba(16,185,129,0.6)' },
                          { name: 'Merch Plaza A', val: vendorStats[2], color: 'bg-amber-500', glow: 'rgba(245,158,11,0.6)' }
                        ].map((v, i) => (
                          <div key={i} className="space-y-3">
                              <div className="flex justify-between text-sm font-black text-slate-200">
                                  <span>{v.name}</span>
                                  <motion.span key={v.val} initial={{ scale: 1.2 }} animate={{ scale: 1 }} className={v.color.replace('bg-', 'text-')}>{v.val}%</motion.span>
                              </div>
                              <div className="h-3 bg-[#0F172A] rounded-full overflow-hidden border border-white/5 shadow-inner">
                                  <motion.div 
                                    className={`h-full ${v.color} rounded-full relative`}
                                    initial={{ width: 0 }}
                                    animate={{ width: `${v.val}%` }}
                                    transition={{ type: "spring", damping: 15, stiffness: 40 }}
                                    style={{ boxShadow: `0 0 15px ${v.glow}` }}
                                  >
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30" />
                                  </motion.div>
                              </div>
                          </div>
                        ))}
                    </div>
                </GlassCard>
            </motion.div>
          )}

          {activeTab === "ai" && (
             <motion.div key="ai" variants={pageVariants} initial="initial" animate="animate" exit="exit" className="space-y-6 flex flex-col h-[75vh]">
                <div className="flex items-center gap-5 px-2">
                    <div className="w-14 h-14 bg-blue-600/20 rounded-2xl flex items-center justify-center border border-blue-500/40 shadow-[0_0_20px_rgba(37,99,235,0.3)]">
                        <Bot className="text-blue-400 w-7 h-7" />
                    </div>
                    <div>
                        <h3 className="text-3xl font-black tracking-tight">AI Assistant</h3>
                        <div className="flex items-center gap-2 mt-1">
                            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <p className="text-[11px] text-slate-300 font-black uppercase tracking-[0.2em]">Online & Ready</p>
                        </div>
                    </div>
                </div>

                <div ref={chatBoxRef} className="flex-1 overflow-y-auto space-y-6 pr-2 scroll-smooth pb-4">
                    <AnimatePresence>
                    {chatHistory.map((msg, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ type: "spring", damping: 20, stiffness: 200 }}
                        className={`flex gap-4 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                      >
                          <div className={`w-10 h-10 rounded-[14px] flex items-center justify-center shrink-0 mt-1 ${msg.sender === 'user' ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-[0_5px_15px_rgba(37,99,235,0.5)]' : 'bg-[#0F172A] border border-blue-500/30 shadow-inner'}`}>
                              {msg.sender === 'user' ? <User className="w-5 h-5 text-white" /> : <Sparkles className="w-5 h-5 text-blue-400" />}
                          </div>
                          <div className={`p-5 rounded-[28px] text-sm font-medium leading-relaxed shadow-xl max-w-[85%] ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white/5 backdrop-blur-xl border border-white/10 text-slate-200 rounded-tl-none'}`}>
                              {msg.text}
                          </div>
                      </motion.div>
                    ))}
                    </AnimatePresence>
                </div>
                
                <motion.div 
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  className="relative pt-2 pb-6"
                >
                    <input 
                      type="text" 
                      value={aiInput}
                      onChange={(e) => setAiInput(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && handleSendAI()}
                      placeholder="Type a message..." 
                      className="w-full bg-[#0F172A]/80 backdrop-blur-2xl p-6 rounded-[32px] pr-20 text-base font-medium border border-white/10 focus:border-blue-500/60 focus:bg-[#0F172A] outline-none text-white shadow-2xl transition-all" 
                    />
                    <motion.button 
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={handleSendAI} 
                      className="absolute right-3 top-[15px] p-4 bg-blue-600 hover:bg-blue-500 rounded-[24px] text-white shadow-[0_10px_20px_rgba(37,99,235,0.4)] transition-colors"
                    >
                      <Send className="w-5 h-5" />
                    </motion.button>
                </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Tab Navigation --- */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm px-6">
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, type: "spring", damping: 20 }}
          className="bg-[#05070A]/80 backdrop-blur-3xl border border-white/10 rounded-[40px] p-4 flex justify-between items-center shadow-[0_30px_60px_rgba(0,0,0,0.8)]"
        >
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveTab('home')} className={`relative p-4 rounded-[20px] transition-colors ${activeTab === 'home' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {activeTab === 'home' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-600 rounded-[20px] -z-10 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />}
                <Home className="w-6 h-6 relative z-10" />
            </motion.button>
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveTab('wallet')} className={`relative p-4 rounded-[20px] transition-colors ${activeTab === 'wallet' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {activeTab === 'wallet' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-600 rounded-[20px] -z-10 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />}
                <Wallet className="w-6 h-6 relative z-10" />
            </motion.button>
            
            <div className="relative -top-10 mx-2">
                <div className="absolute inset-0 bg-blue-600 blur-2xl opacity-60 rounded-full animate-pulse"></div>
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  whileTap={{ scale: 0.9, rotate: -5 }}
                  className="w-20 h-20 bg-gradient-to-tr from-blue-700 via-blue-500 to-cyan-400 rounded-full flex items-center justify-center shadow-[0_20px_40px_rgba(37,99,235,0.5)] cursor-pointer border-[6px] border-[#05070A] relative z-10" 
                  onClick={() => setIsPayModalOpen(true)}
                >
                    <ScanLine className="text-white w-8 h-8" />
                </motion.div>
            </div>
            
            {role === "ORGANIZER" && (
                <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveTab('analytics')} className={`relative p-4 rounded-[20px] transition-colors ${activeTab === 'analytics' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                    {activeTab === 'analytics' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-600 rounded-[20px] -z-10 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />}
                    <BarChart3 className="w-6 h-6 relative z-10" />
                </motion.button>
            )}
            <motion.button whileTap={{ scale: 0.9 }} onClick={() => setActiveTab('ai')} className={`relative p-4 rounded-[20px] transition-colors ${activeTab === 'ai' ? 'text-white' : 'text-slate-500 hover:text-slate-300'}`}>
                {activeTab === 'ai' && <motion.div layoutId="nav-pill" className="absolute inset-0 bg-blue-600 rounded-[20px] -z-10 shadow-[0_0_20px_rgba(37,99,235,0.5)]" />}
                <Bot className="w-6 h-6 relative z-10" />
            </motion.button>
        </motion.div>
      </nav>

      {/* --- Modals --- */}
      <AnimatePresence>
      {isPayModalOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col justify-end">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsPayModalOpen(false)} 
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="relative bg-[#0F172A]/90 backdrop-blur-2xl rounded-t-[48px] p-10 pb-12 border-t border-white/10 shadow-[0_-30px_80px_rgba(0,0,0,0.8)]"
            >
                <div className="w-16 h-2 bg-slate-700/50 rounded-full mx-auto mb-10"></div>
                <div className="flex items-center gap-5 mb-10">
                    <div className="w-14 h-14 bg-amber-500/10 border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-inner"><ScanLine className="w-7 h-7" /></div>
                    <div>
                        <h3 className="text-3xl font-black tracking-tight">Scan to Pay</h3>
                        <p className="text-sm text-slate-400 font-medium mt-1">Hold camera up to vendor QR</p>
                    </div>
                </div>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={simulatePayment} 
                  className="w-full aspect-square bg-[#05070A]/50 rounded-[40px] border-[3px] border-dashed border-slate-700/50 flex flex-col items-center justify-center relative overflow-hidden mb-10 group cursor-pointer hover:border-amber-500/50 hover:bg-amber-500/5 transition-all"
                >
                    <motion.div 
                      animate={{ top: ["0%", "100%", "0%"] }}
                      transition={{ duration: 3, ease: "linear", repeat: Infinity }}
                      className="absolute left-0 right-0 h-1 bg-amber-500 shadow-[0_0_30px_rgba(245,158,11,1)]"
                    />
                    <QrCode className="w-20 h-20 text-slate-600 group-hover:text-amber-500 transition-colors duration-500" />
                    <p className="text-sm text-slate-500 mt-6 font-bold uppercase tracking-widest group-hover:text-amber-400 transition-colors duration-500">Tap to simulate scan</p>
                </motion.div>
                <button onClick={() => setIsPayModalOpen(false)} className="w-full py-5 rounded-[24px] font-black text-base text-slate-400 hover:text-white hover:bg-white/5 active:scale-95 transition-all">Cancel Payment</button>
            </motion.div>
        </div>
      )}
      </AnimatePresence>

      <AnimatePresence>
      {isQRModalOpen && (
        <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center px-6">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsQRModalOpen(false)} 
              className="absolute inset-0 bg-black/90 backdrop-blur-lg"
            />
            <motion.div 
              initial={{ scale: 0.8, opacity: 0, rotateY: 90 }} 
              animate={{ scale: 1, opacity: 1, rotateY: 0 }} 
              exit={{ scale: 0.8, opacity: 0, rotateY: -90 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
              className="relative bg-white rounded-[48px] p-10 w-full max-w-sm text-center shadow-[0_30px_80px_rgba(255,255,255,0.1)] border border-white/20"
            >
                <div className="mb-8">
                    <h3 className="text-3xl font-black text-slate-900 tracking-tight">VIP Access</h3>
                    <p className="text-slate-500 text-base font-bold mt-1">Raphasha Kirov</p>
                </div>
                <div className="w-full aspect-square rounded-[32px] bg-blue-600 flex items-center justify-center relative overflow-hidden shadow-inner mb-8" style={{ backgroundImage: 'linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 75%, #0F172A 75%, #0F172A), linear-gradient(45deg, #0F172A 25%, transparent 25%, transparent 75%, #0F172A 75%, #0F172A)', backgroundSize: '20px 20px', backgroundPosition: '0 0, 10px 10px' }}>
                    <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/50 to-transparent" />
                    <div className="w-20 h-20 bg-white rounded-[20px] flex items-center justify-center shadow-2xl relative z-10"><Zap className="w-10 h-10 text-blue-600" /></div>
                </div>
                <div className="bg-slate-50 rounded-[24px] p-5 flex items-center justify-between border border-slate-200">
                    <div className="text-left">
                        <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-1">Ticket ID</p>
                        <p className="text-lg font-black text-slate-800 font-mono tracking-wider">KV-8892-A7X</p>
                    </div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Copy className="w-6 h-6 text-slate-400 cursor-pointer hover:text-blue-600 transition-colors" onClick={() => showToast('ID Copied', 'success')} />
                    </motion.div>
                </div>
                <motion.button 
                  whileHover={{ scale: 1.1, backgroundColor: "#E2E8F0" }} 
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsQRModalOpen(false)} 
                  className="mt-8 w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-500 transition-colors"
                >
                    <X className="w-6 h-6" />
                </motion.button>
            </motion.div>
        </div>
      )}
      </AnimatePresence>

      {/* --- Toast --- */}
      <AnimatePresence>
      {toast && (
        <motion.div 
            initial={{ y: -50, opacity: 0, scale: 0.9 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: -50, opacity: 0, scale: 0.9 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed top-8 left-1/2 -translate-x-1/2 z-[300] w-max max-w-[90vw]"
        >
            <div className={`bg-[#0F172A]/90 backdrop-blur-xl border border-white/10 px-6 py-4 rounded-full flex items-center gap-4 shadow-[0_20px_40px_rgba(0,0,0,0.6)] ${toast.type === 'success' ? 'shadow-emerald-500/20' : 'shadow-blue-500/20'}`}>
                {toast.type === 'success' ? <CheckCircle2 className="w-5 h-5 text-emerald-400 drop-shadow-[0_0_5px_rgba(16,185,129,0.5)]" /> : <Info className="w-5 h-5 text-blue-400 drop-shadow-[0_0_5px_rgba(37,99,235,0.5)]" />}
                <p className="font-black text-sm text-white tracking-wide">{toast.msg}</p>
            </div>
        </motion.div>
      )}
      </AnimatePresence>
    </div>
  );
}

// Activity Icon Component Polyfill
function Activity(props: React.SVGProps<SVGSVGElement>) {
    return <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>;
}
