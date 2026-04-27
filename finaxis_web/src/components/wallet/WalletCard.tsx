"use client";

import React from "react";
import { Wallet, ArrowUpRight, ArrowDownLeft } from "lucide-react";
import { motion } from "framer-motion";

interface WalletCardProps {
  balance: number;
}

export const WalletCard = ({ balance }: WalletCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 p-8 rounded-[2.5rem] text-white shadow-[0_20px_50px_-15px_rgba(124,58,237,0.5)] relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:scale-110 transition-transform">
        <Wallet size={80} />
      </div>

      <div className="relative z-10">
        <div className="flex justify-between items-start mb-12">
          <div>
            <p className="text-white/60 text-[10px] uppercase font-bold tracking-[0.2em] mb-1">Available Credits</p>
            <h3 className="text-4xl font-extrabold tracking-tight">
              R {balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h3>
          </div>
          <div className="bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20 text-[10px] font-bold">
            MASTER NODE
          </div>
        </div>

        <div className="flex gap-4">
          <button className="flex-1 bg-white text-purple-600 py-4 rounded-2xl font-bold text-sm hover:bg-zinc-100 transition-all active:scale-[0.98] shadow-lg">
            Top Up
          </button>
          <button className="flex-1 bg-white/10 text-white border border-white/20 py-4 rounded-2xl font-bold text-sm hover:bg-white/20 transition-all active:scale-[0.98]">
            Withdraw
          </button>
        </div>
      </div>
    </motion.div>
  );
};
