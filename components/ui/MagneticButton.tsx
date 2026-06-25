"use client";

import { forwardRef } from "react";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  strength?: number;
  variant?: "primary" | "ghost";
}

/** A magnetic, glowing call-to-action button. */
export const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.4, variant = "primary", ...props }, _ref) => {
    const magnet = useMagnetic<HTMLButtonElement>(strength);

    return (
      <button
        ref={magnet.ref}
        onMouseMove={magnet.onMouseMove}
        onMouseLeave={magnet.onMouseLeave}
        data-cursor="hover"
        className={cn(
          "group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-full px-9 py-4 text-sm font-medium uppercase tracking-[0.22em] transition-colors",
          variant === "primary"
            ? "text-white"
            : "text-white/80 hover:text-white",
          className
        )}
        {...props}
      >
        {variant === "primary" && (
          <span className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-neon-violet via-neon-magenta to-neon-cyan bg-[length:200%_100%] animate-gradient-pan opacity-90" />
        )}
        {variant === "primary" && (
          <span className="absolute inset-[1.5px] -z-10 rounded-full bg-ink/85 transition-colors duration-300 group-hover:bg-ink/60" />
        )}
        {variant === "ghost" && (
          <span className="absolute inset-0 -z-10 rounded-full border border-white/15 transition-colors duration-300 group-hover:border-white/40" />
        )}
        <span className="relative z-10 flex items-center gap-3">{children}</span>
      </button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";
