import React, { useState } from "react";
import { useCharter, PRESET_THEMES } from "../contexts/CharterContext";
import { Check, Palette, RefreshCw, Sparkles, X, Layers, Pipette, Building } from "lucide-react";
import { toast } from "sonner";

interface ThemeCustomizerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ThemeCustomizerModal({ isOpen, onClose }: ThemeCustomizerModalProps) {
  const { charterType, theme, updateTheme, applyPreset, resetTheme } = useCharter();

  const [companyName, setCompanyName] = useState(theme.companyName || "Mon Entreprise");

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-scale-in">
      <div className="relative w-full max-w-2xl rounded-3xl bg-white p-6 md:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#00D254]/15 text-[#00D254]">
              <Palette size={24} />
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold text-slate-900">
                Personnalisation de la Charte & Couleurs
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                Adaptez les couleurs du dashboard et des devis à l'image de votre entreprise
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="mt-6 space-y-6">
          {/* Preset Theme Selection */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-3">
              1. Thèmes & Palettes Prédéfinies
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {Object.entries(PRESET_THEMES).map(([key, p]) => {
                const isActive =
                  (key === "yasee" && charterType === "yasee") ||
                  (key === "naboth" && charterType === "naboth") ||
                  (theme.primaryColor === p.primaryColor && theme.darkColor === p.darkColor);

                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => {
                      applyPreset(key as any);
                      toast.success(`Palettes "${p.presetName}" appliquée !`);
                    }}
                    className={`flex flex-col gap-2 rounded-2xl border p-3 text-left transition-all hover:scale-[1.02] ${
                      isActive
                        ? "border-[#00D254] bg-[#00D254]/5 ring-2 ring-[#00D254]/30"
                        : "border-slate-200 bg-slate-50/50 hover:bg-slate-100/80"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-extrabold text-slate-800">
                        {p.presetName}
                      </span>
                      {isActive && <Check size={14} className="text-[#00D254]" />}
                    </div>
                    {/* Swatches */}
                    <div className="flex items-center gap-1.5 mt-1">
                      <span
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: p.primaryColor }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: p.secondaryColor }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: p.darkColor }}
                      />
                      <span
                        className="h-4 w-4 rounded-full border border-white shadow-sm"
                        style={{ backgroundColor: p.accentColor }}
                      />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Custom Color Picker Fields */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-3">
              2. Couleurs sur-mesure (Client Inscrit)
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 rounded-2xl p-4 border border-slate-200/80">
              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="block text-xs font-extrabold text-slate-800">Couleur Principale (Boutons / CTA)</span>
                  <span className="text-[10px] text-slate-400 font-mono">{theme.primaryColor}</span>
                </div>
                <input
                  type="color"
                  value={theme.primaryColor}
                  onChange={(e) => updateTheme({ primaryColor: e.target.value })}
                  className="h-9 w-9 rounded-lg border-0 cursor-pointer shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="block text-xs font-extrabold text-slate-800">Couleur Secondaire (Nav / Titres)</span>
                  <span className="text-[10px] text-slate-400 font-mono">{theme.secondaryColor}</span>
                </div>
                <input
                  type="color"
                  value={theme.secondaryColor}
                  onChange={(e) => updateTheme({ secondaryColor: e.target.value })}
                  className="h-9 w-9 rounded-lg border-0 cursor-pointer shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="block text-xs font-extrabold text-slate-800">Surfaces Sombres / Headers</span>
                  <span className="text-[10px] text-slate-400 font-mono">{theme.darkColor}</span>
                </div>
                <input
                  type="color"
                  value={theme.darkColor}
                  onChange={(e) => updateTheme({ darkColor: e.target.value })}
                  className="h-9 w-9 rounded-lg border-0 cursor-pointer shadow-sm"
                />
              </div>

              <div className="flex items-center justify-between p-2.5 bg-white rounded-xl border border-slate-200">
                <div>
                  <span className="block text-xs font-extrabold text-slate-800">Accents & Alertes</span>
                  <span className="text-[10px] text-slate-400 font-mono">{theme.accentColor}</span>
                </div>
                <input
                  type="color"
                  value={theme.accentColor}
                  onChange={(e) => updateTheme({ accentColor: e.target.value })}
                  className="h-9 w-9 rounded-lg border-0 cursor-pointer shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Company Identity */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
              3. Nom de l'entreprise sur les devis
            </label>
            <div className="relative">
              <Building size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={theme.companyName}
                onChange={(e) => updateTheme({ companyName: e.target.value })}
                placeholder="Ex: Naboth SARL / Mon Agence"
                className="w-full pl-10 pr-4 py-3 text-xs font-extrabold bg-slate-50 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-[#00D254]"
              />
            </div>
          </div>

          {/* Live Preview Card */}
          <div>
            <label className="text-xs font-black uppercase tracking-wider text-slate-400 block mb-2">
              Aperçu en Direct du Dashboard & Devis
            </label>
            <div
              className="rounded-2xl p-5 border text-white transition-all shadow-md"
              style={{ backgroundColor: theme.darkColor }}
            >
              <div className="flex items-center justify-between mb-4 pb-3 border-b border-white/10">
                <span className="font-display text-sm font-extrabold" style={{ color: theme.primaryColor }}>
                  {theme.companyName || "Mon Dashboard Client"}
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-black uppercase tracking-wider"
                  style={{ backgroundColor: theme.primaryColor, color: theme.darkColor }}
                >
                  Charte Active
                </span>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-bold text-white/60">Devis N° DV-2026-088</p>
                  <p className="font-display text-lg font-bold text-white mt-0.5">3 450 € TTC</p>
                </div>
                <button
                  type="button"
                  className="px-4 py-2 rounded-full text-xs font-black transition-transform hover:scale-105"
                  style={{ backgroundColor: theme.primaryColor, color: "#111827" }}
                >
                  Envoyer le Devis
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={() => {
              resetTheme();
              toast.info("Thème réinitialisé à Yasee IT Standard.");
            }}
            className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-slate-800 transition-colors"
          >
            <RefreshCw size={14} /> Réinitialiser le thème
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-full text-xs font-extrabold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="button"
              onClick={() => {
                toast.success("Couleurs de votre entreprise enregistrées avec succès !");
                onClose();
              }}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full text-xs font-black bg-[#00D254] text-slate-950 hover:bg-[#00e65c] shadow-lg shadow-[#00D254]/25 transition-all"
            >
              <Sparkles size={14} /> Enregistrer la Charte
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
