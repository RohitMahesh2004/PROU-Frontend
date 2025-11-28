// src/components/ui/text-generate-effect.tsx
"use client";

import { useEffect } from "react";
import { motion, stagger, useAnimate } from "motion/react";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className = "",
  filter = true,
  duration = 0.5,
  glow = true,
  pulse = true,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  glow?: boolean;
  pulse?: boolean;
}) => {
  const [scope, animate] = useAnimate();
  const wordsArray = words.split(" ");

  useEffect(() => {
    animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration ?? 1,
        delay: stagger(0.12),
      }
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scope.current]);

  return (
    <div
      style={{ fontFamily: "var(--font-astro)" }}
      className={cn(
        "select-none font-bold",
        // Softer glow: smaller blur and lower opacity
        glow &&
          "text-white drop-shadow-[0_0_6px_rgba(0,190,255,0.55)]",
        // Subtle pulse (very slight)
        pulse && "animate-subtle-pulse",
        className
      )}
    >
      <div className="mt-4">
        <div className="text-center">
          <motion.div ref={scope}>
            {wordsArray.map((word, idx) => (
              <motion.span
                key={word + idx}
                className="opacity-0"
                style={{
                  filter: filter ? "blur(6px)" : "none",
                }}
              >
                {word}&nbsp;
              </motion.span>
            ))}
          </motion.div>
        </div>
      </div>
    </div>
  );
};
