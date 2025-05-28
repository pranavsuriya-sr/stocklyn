"use client";

import React, { memo } from "react";

interface AuroraTextProps {
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  animationDuration?: number;
}

export const AuroraText = memo(
  ({
    children,
    className = "",
    containerClassName,
    colors = ["#2563eb", "#4f46e5", "#7c3aed", "#0ea5e9", "#22d3ee"],
    animationDuration = 3000,
  }: AuroraTextProps) => {
    const gradientStyle = {
      backgroundImage: `linear-gradient(135deg, ${colors.join(",")}, ${
        colors[0]
      })`,
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      animationDuration: `${animationDuration}ms`,
    };

    return (
      <span
        className={`relative inline-block ${className} ${containerClassName}`}
      >
        <span className="sr-only">{children}</span>
        <span
          className="relative animate-aurora bg-[length:200%_auto] bg-clip-text text-transparent"
          style={gradientStyle}
          aria-hidden="true"
        >
          {children}
        </span>
      </span>
    );
  }
);

AuroraText.displayName = "AuroraText";
