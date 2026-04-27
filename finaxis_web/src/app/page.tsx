"use client";

import React, { useState, useMemo, useEffect } from "react";
import { 
  Home, 
  Wallet, 
  BarChart3, 
  Bot, 
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
  MoreVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// --- Theme & Colors ---
const COLORS = {
  primary: "#3b82f6",
  secondary: "#10b981",
  accent: "#f59e0b",
  danger: "#ef4444",
  background: "#0a0a0a",
  surface: "#1a1a1a",
  surfaceLight: "#262626",
  text: "#ffffff",
  textSecondary: "#a1a1aa",
};

// --- Components ---

const GlassCard = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 ${className}`}>
    {children}
  </div>
);

const IconButton = ({ icon: Icon, onClick, active }: { icon: any, onClick?: () => void, active?: boolean }) => (
  <button 
    onClick={onClick}
    className={`p-3 rounded-2xl transition-all duration-300 ${active ? "bg-blue-600 text-white" : "bg-white/5 text-zinc-400 hover:bg-white/10"}`}
  >
    <Icon size={20} />
  </button>
);

export default function FinAxisWeb() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState<"attendee" | "organizer" | null>(null);
  const [activeTab, setActiveTab] = useState<"home" | "wallet" | "analytics">("home");
  const [balance, setBalance] = useState(12450.00);
  const [isPayModalOpen, setIsPayModalOpen] = useState(false);

  // --- Animations ---
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  // --- Screens ---

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-sans overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-20 pointer-events-none">
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600 rounded-full blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600 rounded-full blur-[120px]" />
        </div>

        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="z-10 flex flex-col items-center"
        >
          <div className="w-24 h-24 bg-blue-600 rounded-[2rem] flex items-center justify-center shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)] mb-8">
            <ShieldCheck size={48} className="text-white" />
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">FinAxis Secure</h1>
          <p className="text-zinc-500 mb-12">Institutional Grade Entry Active</p>
          
          <button 
            onClick={() => setIsAuthenticated(true)}
            className="flex items-center gap-3 bg-zinc-900 border border-white/10 px-10 py-5 rounded-full hover:bg-zinc-800 transition-all active:scale-95 group"
          >
            <Fingerprint className="text-blue-500 group-hover:scale-110 transition-transform" size={24} />
            <span className="font-semibold text-lg">Authenticate</span>
          </button>
        </motion.div>

        <p className="absolute bottom-10 text-[10px] uppercase tracking-[0.2em] text-zinc-600 font-bold">
          Created by Kid of Dynamics
        </p>
      </div>
    );
  }

  if (!role) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 text-white font-sans">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md text-center"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
             <div className="p-4 bg-blue-600/10 rounded-3xl border border-blue-500/20">
               <Bot size={40} className="text-blue-500" />
             </div>
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl font-bold mb-2">Initialize Profile</motion.h2>
          <motion.p variants={itemVariants} className="text-zinc-500 mb-12">Select your enterprise role within the ecosystem</p>
          
          <div className="grid grid-cols-2 gap-4 mb-8">
            <motion.button 
              variants={itemVariants}
              onClick={() => setRole("attendee")}
              className="group p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] hover:border-blue-500/50 transition-all flex flex-col items-center gap-4 active:scale-95"
            >
              <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-blue-600 transition-colors">
                <User size={24} />
              </div>
              <span className="font-bold">Attendee</span>
            </motion.button>

            <motion.button 
              variants={itemVariants}
              onClick={() => setRole("organizer")}
              className="group p-8 bg-zinc-900 border border-white/5 rounded-[2.5rem] hover:border-blue-500/50 transition-all flex flex-col items-center gap-4 active:scale-95"
            >
              <div className="p-4 bg-zinc-800 rounded-2xl group-hover:bg-blue-600 transition-colors">
                <LayoutDashboard size={24} />
              </div>
              <span className="font-bold">Organizer</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-32">
      {/* --- Header --- */}
      <header className="p-6 flex justify-between items-center max-w-2xl mx-auto w-full">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mb-1">
            {role === "organizer" ? "Admin Terminal" : "Attendee Terminal"}
          </p>
          <h1 className="text-xl font-bold">FinAxis <span className="text-blue-500">Eco</span></h1>
        </div>
        <div className="flex gap-3">
          <IconButton icon={Bell} />
          <IconButton icon={Settings} onClick={() => setIsAuthenticated(false)} />
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 space-y-8">
        <AnimatePresence mode="wait">
          {activeTab === "home" && (
            <motion.div 
              key="home"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Hero Event Card */}
              <GlassCard className="overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4">
                  <div className="px-3 py-1 bg-blue-600 text-[10px] font-bold rounded-full">ACTIVE PASS</div>
                </div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-1">Kid of Dynamics Summit</h3>
                  <p className="text-zinc-400 text-sm mb-6 flex items-center gap-2">
                    <BarChart3 size={14} className="text-blue-500" />
                    April 27 - May 2, 2026
                  </p>
                  
                  <div className="flex items-center justify-between">
                    <div className="flex -space-x-2">
                       {[1,2,3,4].map(i => (
                         <div key={i} className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-zinc-800" />
                       ))}
                       <div className="w-8 h-8 rounded-full border-2 border-[#1a1a1a] bg-zinc-900 flex items-center justify-center text-[10px] font-bold">
                         +42
                       </div>
                    </div>
                    <button className="bg-white text-black px-6 py-3 rounded-2xl font-bold text-sm hover:bg-zinc-200 transition-colors">
                      View QR Pass
                    </button>
                  </div>
                </div>
              </GlassCard>

              {/* Quick Actions */}
              <div className="grid grid-cols-4 gap-4">
                {[
                  { icon: Bot, label: "AI Butler", color: "bg-blue-500/10 text-blue-500" },
                  { icon: Scan, label: "Scan Pay", color: "bg-amber-500/10 text-amber-500", action: () => setIsPayModalOpen(true) },
                  { icon: Ticket, label: "Tickets", color: "bg-emerald-500/10 text-emerald-500" },
                  { icon: Hotel, label: "Lodging", color: "bg-purple-500/10 text-purple-500" }
                ].map((action, i) => (
                  <button 
                    key={i} 
                    onClick={action.action}
                    className="flex flex-col items-center gap-2 group"
                  >
                    <div className={`w-full aspect-square ${action.color} rounded-2xl flex items-center justify-center group-hover:scale-105 transition-transform border border-white/5`}>
                      <action.icon size={22} />
                    </div>
                    <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-tighter">{action.label}</span>
                  </button>
                ))}
              </div>

              {/* Feed */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-bold">Recent Activity</h3>
                  <button className="text-blue-500 text-xs font-bold">See All</button>
                </div>
                <div className="space-y-3">
                  {[
                    { title: "Summit Cafe", type: "Food & Beverage", amount: "-R 145", time: "2 min ago" },
                    { title: "Merch Store", type: "Exclusive Gear", amount: "-R 850", time: "1 hour ago" },
                  ].map((item, i) => (
                    <GlassCard key={i} className="p-4 flex items-center justify-between border-none">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center">
                          <Wallet size={20} className="text-zinc-400" />
                        </div>
                        <div>
                          <h4 className="font-bold text-sm">{item.title}</h4>
                          <p className="text-xs text-zinc-500">{item.type}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-sm">{item.amount}</p>
                        <p className="text-[10px] text-zinc-600 uppercase font-bold">{item.time}</p>
                      </div>
                    </GlassCard>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "wallet" && (
            <motion.div 
              key="wallet"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
              {/* Main Wallet Card */}
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(59,130,246,0.5)]">
                <div className="flex justify-between items-start mb-12">
                  <div>
                    <p className="text-blue-100 text-[10px] uppercase font-bold tracking-widest mb-1">Available Liquidity</p>
                    <h3 className="text-4xl font-bold">R {balance.toLocaleString()}</h3>
                  </div>
                  <div className="p-3 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20">
                    <ShieldCheck size={20} />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex-1 bg-white text-blue-600 py-4 rounded-2xl font-bold text-sm">Top Up</button>
                  <button className="flex-1 bg-white/10 text-white border border-white/20 py-4 rounded-2xl font-bold text-sm">Withdraw</button>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <GlassCard className="p-5">
                  <ArrowUpRight className="text-emerald-500 mb-2" size={20} />
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Inflow</p>
                  <p className="font-bold">R 4,200.00</p>
                </GlassCard>
                <GlassCard className="p-5">
                  <ArrowDownLeft className="text-rose-500 mb-2" size={20} />
                  <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Outflow</p>
                  <p className="font-bold">R 1,145.00</p>
                </GlassCard>
              </div>
            </motion.div>
          )}

          {activeTab === "analytics" && (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8"
            >
               <GlassCard>
                 <div className="flex justify-between items-center mb-6">
                   <h3 className="font-bold">Market Density</h3>
                   <MoreVertical size={20} className="text-zinc-500" />
                 </div>
                 <div className="h-48 flex items-end gap-2 px-2">
                    {[60, 40, 80, 50, 90, 70, 45].map((h, i) => (
                      <motion.div 
                        key={i}
                        initial={{ height: 0 }}
                        animate={{ height: `${h}%` }}
                        className="flex-1 bg-blue-600/40 rounded-t-lg border-t border-blue-500/50"
                      />
                    ))}
                 </div>
               </GlassCard>

               <div className="space-y-4">
                 {[
                   { name: "Mainstage Area", count: "1,240 people", density: "High", color: "bg-rose-500" },
                   { name: "Networking Lounge", count: "420 people", density: "Optimal", color: "bg-emerald-500" },
                   { name: "Vendor Alley", count: "890 people", density: "Active", color: "bg-amber-500" }
                 ].map((zone, i) => (
                   <GlassCard key={i} className="p-4 flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       <div className={`w-2 h-10 ${zone.color} rounded-full`} />
                       <div>
                         <h4 className="font-bold text-sm">{zone.name}</h4>
                         <p className="text-xs text-zinc-500">{zone.count}</p>
                       </div>
                     </div>
                     <span className="text-[10px] font-bold uppercase tracking-wider">{zone.density}</span>
                   </GlassCard>
                 ))}
               </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* --- Tab Navigation --- */}
      <nav className="fixed bottom-0 left-0 w-full p-6 z-50">
        <div className="max-w-md mx-auto bg-black/80 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-3 flex justify-between items-center shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <IconButton 
            icon={Home} 
            active={activeTab === "home"} 
            onClick={() => setActiveTab("home")} 
          />
          <IconButton 
            icon={Wallet} 
            active={activeTab === "wallet"} 
            onClick={() => setActiveTab("wallet")} 
          />
          <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center -mt-12 shadow-[0_10px_20px_rgba(255,255,255,0.2)] active:scale-90 transition-transform cursor-pointer" onClick={() => setIsPayModalOpen(true)}>
            <Scan className="text-black" />
          </div>
          <IconButton 
            icon={BarChart3} 
            active={activeTab === "analytics"} 
            onClick={() => setActiveTab("analytics")} 
          />
          <IconButton icon={User} />
        </div>
      </nav>

      {/* --- Modal --- */}
      <AnimatePresence>
        {isPayModalOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsPayModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
            />
            <motion.div 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="fixed bottom-0 left-0 w-full bg-zinc-900 rounded-t-[3rem] p-10 z-[70] border-t border-white/10"
            >
              <div className="w-12 h-1 bg-zinc-800 rounded-full mx-auto mb-8" />
              <h3 className="text-2xl font-bold mb-2">Authorize Payment</h3>
              <p className="text-zinc-500 mb-8">Institutional ledger confirmation required.</p>
              
              <GlassCard className="bg-white/5 mb-8 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Summit Cafe</h4>
                  <p className="text-xs text-zinc-500">Infrastructure Node #GP-10</p>
                </div>
                <p className="text-xl font-bold text-blue-500">R 150.00</p>
              </GlassCard>

              <button 
                onClick={() => {
                  setBalance(b => b - 150);
                  setIsPayModalOpen(false);
                }}
                className="w-full bg-blue-600 py-5 rounded-2xl font-bold text-lg hover:bg-blue-500 transition-colors active:scale-[0.98]"
              >
                Confirm & Pay
              </button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
