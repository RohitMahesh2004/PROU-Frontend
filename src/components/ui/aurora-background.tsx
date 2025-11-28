"use client";
import { cn } from "@/lib/utils";
import React, { ReactNode } from "react";

interface AuroraBackgroundProps extends React.HTMLProps<HTMLDivElement> {
  children: ReactNode;
  showRadialGradient?: boolean;
}

export const AuroraBackground = ({
  className,
  children,
  showRadialGradient = true,
  ...props
}: AuroraBackgroundProps) => {
  return (
    <main>
      <div
        className={cn(
          "transition-bg relative flex h-[100vh] flex-col items-center justify-center bg-slate-950 text-slate-50",
          className,
        )}
        {...props}
      >
        <div
          className="absolute inset-0 overflow-hidden"
          style={
            {
              "--aurora":
                "repeating-linear-gradient(100deg,#1e40af_10%,#3b82f6_15%,#60a5fa_20%,#2563eb_25%,#1d4ed8_30%)",
              "--dark-gradient":
                "repeating-linear-gradient(100deg,#0c1222_0%,#0c1222_7%,transparent_10%,transparent_12%,#0c1222_16%)",
              "--blue-gradient":
                "repeating-linear-gradient(100deg,#1e3a8a_0%,#1e3a8a_7%,transparent_10%,transparent_12%,#1e3a8a_16%)",

              "--blue-900": "#1e3a8a",
              "--blue-800": "#1e40af",
              "--blue-700": "#1d4ed8",
              "--blue-600": "#2563eb",
              "--blue-500": "#3b82f6",
              "--blue-400": "#60a5fa",
              "--navy": "#0c1222",
              "--transparent": "transparent",
            } as React.CSSProperties
          }
        >
          <div
            className={cn(
              `after:animate-aurora pointer-events-none absolute -inset-[10px] [background-image:var(--blue-gradient),var(--aurora)] [background-size:300%,_200%] [background-position:50%_50%,50%_50%] opacity-40 blur-[10px] filter will-change-transform [--aurora:repeating-linear-gradient(100deg,var(--blue-800)_10%,var(--blue-500)_15%,var(--blue-400)_20%,var(--blue-600)_25%,var(--blue-700)_30%)] [--dark-gradient:repeating-linear-gradient(100deg,var(--navy)_0%,var(--navy)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--navy)_16%)] [--blue-gradient:repeating-linear-gradient(100deg,var(--blue-900)_0%,var(--blue-900)_7%,var(--transparent)_10%,var(--transparent)_12%,var(--blue-900)_16%)] after:absolute after:inset-0 after:[background-image:var(--blue-gradient),var(--aurora)] after:[background-size:200%,_100%] after:[background-attachment:fixed] after:mix-blend-screen after:content-[""] [background-image:var(--dark-gradient),var(--aurora)]`,

              showRadialGradient &&
                `[mask-image:radial-gradient(ellipse_at_100%_0%,black_10%,var(--transparent)_70%)]`,
            )}
          ></div>
        </div>
        {children}
      </div>
    </main>
  );
};