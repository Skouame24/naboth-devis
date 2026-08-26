import React from "react";

interface YaseeLogoProps {
  size?: "sm" | "md" | "lg" | "xl";
  showText?: boolean;
  showProductTag?: boolean;
  className?: string;
}

export function YaseeLogo({
  size = "md",
  showText = true,
  showProductTag = true,
  className = "",
}: YaseeLogoProps) {
  const dimensions = {
    sm: { iconWidth: 32, iconHeight: 32, textSize: "text-sm", tagSize: "text-[8px]" },
    md: { iconWidth: 42, iconHeight: 42, textSize: "text-base", tagSize: "text-[9px]" },
    lg: { iconWidth: 54, iconHeight: 54, textSize: "text-xl", tagSize: "text-[10px]" },
    xl: { iconWidth: 72, iconHeight: 72, textSize: "text-2xl", tagSize: "text-[11px]" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      {/* Icon Mark SVG */}
      <svg
        width={dimensions.iconWidth}
        height={dimensions.iconHeight}
        viewBox="0 0 200 200"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="shrink-0 drop-shadow-sm transition-transform duration-200 hover:scale-105"
      >
        {/* Left Green Rounded Bubble (with cut-out diagonal tip & letter Y) */}
        <path
          d="M 25,25 H 105 L 85,175 H 25 C 13.954,175 5,166.046 5,155 V 45 C 5,33.954 13.954,25 25,25 Z"
          fill="#00D254"
        />
        {/* White Letter Y inside green bubble */}
        <path
          d="M 32,50 L 52,90 V 135 H 68 V 90 L 88,50 H 70 L 60,74 L 50,50 Z"
          fill="#FFFFFF"
        />

        {/* Right Blue Rounded Bubble (with cut-out diagonal tip & letter A) */}
        <path
          d="M 115,25 H 175 C 186.046,25 195,33.954 195,45 V 155 C 195,166.046 186.046,175 175,175 H 95 Z"
          fill="#00D254"
        />
        {/* White Letter A inside blue bubble */}
        <path
          d="M 145,50 L 120,135 H 138 L 143,118 H 163 L 168,135 H 186 L 161,50 Z M 148,102 L 153,82 L 158,102 Z"
          fill="#FFFFFF"
        />
      </svg>

      {/* Brand & Product Labels */}
      {showText && (
        <div className="flex flex-col leading-none">
          <div className="flex items-center gap-1.5">
            <span
              className={`font-display font-black tracking-tighter text-[#0F172A] ${dimensions.textSize}`}
              style={{ letterSpacing: "-0.03em" }}
            >
              FAST DEVIS
            </span>
          </div>

          {showProductTag && (
            <div className="mt-1 flex items-center gap-1">
              <span className="font-display font-black uppercase tracking-[0.18em] text-[#00D254] text-[9px]">
                par YASEE IT
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function NabothLogo({
  size = "md",
  showText = true,
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  className?: string;
}) {
  const dimensions = {
    sm: { iconWidth: 32, iconHeight: 32, textSize: "text-sm" },
    md: { iconWidth: 40, iconHeight: 40, textSize: "text-base" },
    lg: { iconWidth: 50, iconHeight: 50, textSize: "text-xl" },
  }[size];

  return (
    <div className={`inline-flex items-center gap-3 ${className}`}>
      <div
        className="flex shrink-0 items-center justify-center rounded-xl bg-[#112A46] text-[#F5B43C] font-black shadow-md border border-[#F5B43C]/30"
        style={{ width: dimensions.iconWidth, height: dimensions.iconHeight }}
      >
        <span className="font-display tracking-tighter text-lg">N</span>
      </div>
      {showText && (
        <div className="leading-none">
          <span className="block font-display text-[15px] font-black tracking-tight text-[#112A46]">
            NABOTH
          </span>
          <span className="mt-1 block text-[9px] font-extrabold uppercase tracking-[0.25em] text-[#E45A48]">
            Charte Client
          </span>
        </div>
      )}
    </div>
  );
}
