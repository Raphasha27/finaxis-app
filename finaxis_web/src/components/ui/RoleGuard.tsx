"use client";

import React, { useEffect } from "react";
import { useAuthStore } from "@/store/useAuthStore";
import { useRouter } from "next/navigation";

interface RoleGuardProps {
  role: "ATTENDEE" | "ORGANIZER";
  children: React.ReactNode;
}

export const RoleGuard = ({ role, children }: RoleGuardProps) => {
  const userRole = useAuthStore((s) => s.role);
  
  if (userRole !== role) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] text-center p-12">
        <div className="w-20 h-20 bg-rose-500/10 rounded-full flex items-center justify-center mb-6 border border-rose-500/20">
          <span className="text-3xl text-rose-500">🚫</span>
        </div>
        <h3 className="text-xl font-bold mb-2">Access Restricted</h3>
        <p className="text-zinc-500 max-w-xs">Your current enterprise role does not have authorization for this terminal.</p>
      </div>
    );
  }

  return <>{children}</>;
};
