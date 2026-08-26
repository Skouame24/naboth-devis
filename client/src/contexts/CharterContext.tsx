import React, { createContext, useContext, useEffect, useState } from "react";

export type CharterType = "yasee" | "custom" | "naboth";

export interface CustomTheme {
  primaryColor: string;
  secondaryColor: string;
  darkColor: string;
  accentColor: string;
  companyName: string;
  presetName: string;
  logoUrl?: string;
}

export const PRESET_THEMES: Record<string, CustomTheme> = {
  yasee: {
    presetName: "Standard Fast Devis (Yasee IT)",
    primaryColor: "#00D254",
    secondaryColor: "#0F172A",
    darkColor: "#0F172A",
    accentColor: "#00D254",
    companyName: "Yasee IT",
  },
  gold: {
    presetName: "Or & Noir Prestige",
    primaryColor: "#F5B43C",
    secondaryColor: "#112A46",
    darkColor: "#112A46",
    accentColor: "#E45A48",
    companyName: "Client Gold",
  },
  emerald: {
    presetName: "Émeraude Industrielle",
    primaryColor: "#05DF72",
    secondaryColor: "#0F766E",
    darkColor: "#042F2E",
    accentColor: "#F59E0B",
    companyName: "Client Émeraude",
  },
  violet: {
    presetName: "Cyber Tech Violet",
    primaryColor: "#8B5CF6",
    secondaryColor: "#4C1D95",
    darkColor: "#1E1B4B",
    accentColor: "#EC4899",
    companyName: "Client Tech",
  },
  slate: {
    presetName: "Minimal Slate",
    primaryColor: "#00D254",
    secondaryColor: "#334155",
    darkColor: "#0F172A",
    accentColor: "#38BDF8",
    companyName: "Client Slate",
  },
};

interface CharterContextType {
  charterType: CharterType;
  theme: CustomTheme;
  setCharterType: (type: CharterType) => void;
  updateTheme: (newColors: Partial<CustomTheme>) => void;
  applyPreset: (presetKey: keyof typeof PRESET_THEMES) => void;
  resetTheme: () => void;
}

const CharterContext = createContext<CharterContextType | undefined>(undefined);

const STORAGE_KEY = "fast_devis_charter_config";

export function CharterProvider({ children }: { children: React.ReactNode }) {
  const [charterType, setCharterTypeState] = useState<CharterType>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        return parsed.charterType || "yasee";
      }
    } catch (e) {
      console.error(e);
    }
    return "yasee";
  });

  const [theme, setTheme] = useState<CustomTheme>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.theme) {
          // If primaryColor was saved as dark by mistake in past session, reset it to bright green #00D254
          const isDarkPrimary = ["#0F172A", "#112A46", "#112a46", "#0f172a", "#000000", "#1e293b"].includes(parsed.theme.primaryColor);
          return {
            ...parsed.theme,
            primaryColor: isDarkPrimary ? "#00D254" : (parsed.theme.primaryColor || "#00D254"),
            secondaryColor: parsed.theme.secondaryColor || "#00D254",
            darkColor: parsed.theme.darkColor || "#0F172A",
          };
        }
      }
    } catch (e) {
      console.error(e);
    }
    return PRESET_THEMES.yasee;
  });

  // Apply CSS variables on DOM
  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-charter", charterType);

    root.style.setProperty("--client-primary", theme.primaryColor);
    root.style.setProperty("--client-secondary", theme.secondaryColor);
    root.style.setProperty("--client-dark", theme.darkColor);
    root.style.setProperty("--client-accent", theme.accentColor);

    // Save state
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ charterType, theme })
    );
  }, [charterType, theme]);

  const setCharterType = (type: CharterType) => {
    setCharterTypeState(type);
    if (type === "yasee") {
      setTheme(PRESET_THEMES.yasee);
    }
  };

  const updateTheme = (newColors: Partial<CustomTheme>) => {
    setCharterTypeState("custom");
    setTheme((prev) => ({
      ...prev,
      ...newColors,
      presetName: "Charte Personnalisée Client",
    }));
  };

  const applyPreset = (presetKey: keyof typeof PRESET_THEMES) => {
    const preset = PRESET_THEMES[presetKey];
    if (preset) {
      setTheme(preset);
      if (presetKey === "yasee") {
        setCharterTypeState("yasee");
      } else {
        setCharterTypeState("custom");
      }
    }
  };

  const resetTheme = () => {
    setCharterTypeState("yasee");
    setTheme(PRESET_THEMES.yasee);
  };

  return (
    <CharterContext.Provider
      value={{
        charterType,
        theme,
        setCharterType,
        updateTheme,
        applyPreset,
        resetTheme,
      }}
    >
      {children}
    </CharterContext.Provider>
  );
}

export function useCharter() {
  const context = useContext(CharterContext);
  if (!context) {
    throw new Error("useCharter must be used within CharterProvider");
  }
  return context;
}
