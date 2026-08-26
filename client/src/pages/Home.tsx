/*
 * Direction artistique — Flux en mouvement
 * Cette page transforme le cycle du devis en parcours visible : créer, envoyer, décider.
 * Structure asymétrique, fonds ivoire, surfaces bleu nuit, accents jaune Naboth et corail.
 */
import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Bell,
  Calculator,
  Check,
  CheckCheck,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Clock3,
  Eye,
  FileCheck2,
  FilePlus2,
  FileText,
  Filter,
  Inbox,
  LayoutDashboard,
  Lock,
  Mail,
  Menu,
  MessageCircle,
  Minus,
  MoreHorizontal,
  MousePointerClick,
  Package,
  Plus,
  RotateCcw,
  Search,
  Send,
  Settings,
  ShieldCheck,
  Sparkles,
  Upload,
  UserCheck,
  Users,
  X,
  Zap,
  Palette,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import { useCharter } from "../contexts/CharterContext";
import { YaseeLogo, NabothLogo } from "../components/YaseeLogo";
import { ThemeCustomizerModal } from "../components/ThemeCustomizerModal";
import { UsersPage, QuoteTemplatePage, ImportPage, SettingsPage, QuoteDetailPage } from "./AdditionalPages";

const MARK = "/images/naboth-mark-standard.png";
const HERO = "/images/naboth-flow-hero-standard.png";
const QUOTE_VISUAL = "/images/naboth-quote-preview-standard.png";
const IMPORT_VISUAL = "/images/naboth-admin-import-standard.png";

const quotes = [
  { id: "DV-2026-018", client: "Atelier Kora", date: "Aujourd’hui", amount: "4 850 €", status: "Envoyé", tone: "blue", initials: "AK" },
  { id: "DV-2026-017", client: "Maison Naya", date: "Hier", amount: "1 280 €", status: "Accepté", tone: "green", initials: "MN" },
  { id: "DV-2026-016", client: "Studio Baobab", date: "12 août", amount: "780 €", status: "Brouillon", tone: "gray", initials: "SB" },
  { id: "DV-2026-015", client: "Clinique Étoile", date: "10 août", amount: "2 400 €", status: "Refusé", tone: "red", initials: "CE" },
];
const clients = [
  { name: "Atelier Kora", email: "contact@atelierkora.fr", phone: "+33 6 42 18 90 11", quotes: 8, initials: "AK", color: "#00D254" },
  { name: "Maison Naya", email: "bonjour@maisonnaya.com", phone: "+33 7 58 20 12 04", quotes: 5, initials: "MN", color: "#00D254" },
  { name: "Studio Baobab", email: "hello@studiobaobab.co", phone: "+33 6 11 42 36 80", quotes: 3, initials: "SB", color: "#77A9C9" },
  { name: "Clinique Étoile", email: "admin@cliniqueetoile.fr", phone: "+33 6 09 88 21 65", quotes: 2, initials: "CE", color: "#00D254" },
];
const products = [
  { name: "Pack identité visuelle", ref: "BRAND-001", price: "1 200 €", category: "Design", color: "#00D254" },
  { name: "Site vitrine essentiel", ref: "WEB-014", price: "2 450 €", category: "Digital", color: "#77A9C9" },
  { name: "Accompagnement mensuel", ref: "SUP-007", price: "380 €", category: "Conseil", color: "#00D254" },
  { name: "Audit de parcours client", ref: "AUDIT-009", price: "720 €", category: "Stratégie", color: "#00D254" },
];

export function Brand({ compact = false }: { compact?: boolean }) {
  const { theme } = useCharter();
  const { user } = useAuth();
  
  const isCustomized = Boolean(theme.logoUrl || (theme.companyName && theme.companyName !== "Yasee IT"));

  if (isCustomized) {
    return (
      <Link href="/app/dashboard" className={`inline-flex items-center gap-2.5 ${compact ? "" : "group"}`}>
        {theme.logoUrl ? (
          <img src={theme.logoUrl} alt="Logo" className={`${compact ? "h-7 w-7" : "h-9 w-9"} rounded-lg object-contain bg-white p-1 border border-slate-200 shadow-sm`} />
        ) : (
          <div
            className={`flex ${compact ? "h-7 w-7 text-xs" : "h-9 w-9 text-sm"} shrink-0 items-center justify-center rounded-xl font-black text-slate-950 shadow-sm`}
            style={{ backgroundColor: theme.primaryColor }}
          >
            {(theme.companyName || user.company || "C").charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex flex-col">
          <span className={`font-display ${compact ? "text-[12px]" : "text-[14px]"} font-black tracking-tight text-slate-900 leading-tight`}>
            {theme.companyName || user.company}
          </span>
          <span className="text-[9px] font-bold text-slate-400">Espace Entreprise</span>
        </div>
      </Link>
    );
  }

  return (
    <Link href="/" className={`inline-flex items-center gap-3 ${compact ? "" : "group"}`}>
      <YaseeLogo size={compact ? "sm" : "md"} />
    </Link>
  );
}

function PrimaryButton({ children, onClick, href, dark = false, className = "" }: { children: React.ReactNode; onClick?: () => void; href?: string; dark?: boolean; className?: string }) {
  const content = (
    <span
      className={`btn-action inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-[13px] font-black transition-all ${
        dark
          ? "bg-[#0F172A] text-white hover:bg-slate-800 shadow-md"
          : "bg-[#00D254] text-slate-950 hover:bg-[#00e65c] shadow-md hover:shadow-emerald-500/20"
      } ${className}`}
    >
      {children}
    </span>
  );
  return href ? <Link href={href}>{content}</Link> : <button onClick={onClick}>{content}</button>;
}

function PublicNav({ onOpenCustomizer }: { onOpenCustomizer?: () => void }) {
  return (
    <header className="relative z-20 flex items-center justify-between px-6 py-5 lg:px-12">
      <Link href="/" className="inline-flex items-center gap-3">
        <YaseeLogo size="md" />
      </Link>
      <nav className="hidden items-center gap-8 text-[13px] font-bold text-slate-600 lg:flex">
        <a href="#flux" className="transition-colors hover:text-[#00D254]">Le flux</a>
        <a href="#modules" className="transition-colors hover:text-[#00D254]">Fonctionnalités</a>
        <a href="#admin" className="transition-colors hover:text-[#00D254]">Administration</a>
      </nav>
      <div className="flex items-center gap-3">
        <Link href="/connexion" className="hidden rounded-full border border-slate-300 bg-white px-5 py-2.5 text-[12px] font-extrabold text-[#0F172A] transition-colors hover:bg-slate-100 sm:inline-flex shadow-sm">
          Se connecter
        </Link>
        <PrimaryButton href="/inscription">
          Créer mon espace <ArrowUpRight size={15} />
        </PrimaryButton>
      </div>
    </header>
  );
}

function RouteVisual() {
  const [activeState, setActiveState] = useState<0 | 1 | 2>(1);

  const states = [
    {
      label: "01 · Émis",
      badgeText: "Lien sécurisé actif",
      badgeColor: "bg-[#f1f5f9] text-[#0F172A]",
      beacon: "bg-[#0F172A] status-beacon-yellow",
      clientStatus: "Notification reçue sur smartphone",
      clientDecision: "En attente de lecture",
      pillIcon: Send,
      pillText: "Envoyé par e-mail",
    },
    {
      label: "02 · Consulté",
      badgeText: "Ouvert en direct",
      badgeColor: "bg-[#fff7df] text-[#00D254]",
      beacon: "bg-[#00D254] status-beacon-yellow",
      clientStatus: "Lien ouvert aujourd'hui à 10:24",
      clientDecision: "Consultation en cours",
      pillIcon: Eye,
      pillText: "Devis ouvert à Paris",
    },
    {
      label: "03 · Signé",
      badgeText: "Accord & Signature certifiée",
      badgeColor: "bg-[#e9f5ef] text-[#00D254]",
      beacon: "bg-[#00D254] status-beacon-green",
      clientStatus: "Signature électronique validée",
      clientDecision: "Accord client validé",
      pillIcon: CheckCircle2,
      pillText: "Signé électroniquement",
    },
  ];

  const current = states[activeState];
  const PillIcon = current.pillIcon;

  return (
    <div className="relative mx-auto h-[480px] w-full max-w-[620px] lg:h-[540px]">
      {/* Background Ambient Glows */}
      <div className="ambient-blob pointer-events-none absolute -left-6 -top-6 h-64 w-64 rounded-full bg-[#00D254]/12 blur-3xl" />
      <div className="ambient-blob pointer-events-none absolute -bottom-6 -right-6 h-72 w-72 rounded-full bg-[#0F172A]/10 blur-3xl" style={{ animationDelay: "-6s" }} />

      <div className="absolute right-0 top-2 h-[380px] w-[88%] rounded-[34px] bg-[#e7edf1] opacity-70" />
      
      {/* Main High-Res Visual Document Card with Real Image */}
      <div className="hover-lift absolute left-0 top-0 w-[92%] overflow-hidden rounded-[30px] border border-white/80 bg-white p-2 shadow-[0_30px_70px_rgba(17,42,70,.14)] animate-float-slow">
        <div className="relative overflow-hidden rounded-[23px]">
          <img
            src={HERO}
            alt="Flux entre un devis et sa validation client"
            className="h-[285px] w-full object-cover lg:h-[345px]"
          />
          {/* Subtle Live Laser Beam across Image */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1 overflow-hidden bg-black/20">
            <div className="animate-beam h-full w-1/3 bg-gradient-to-r from-transparent via-[#00D254] to-transparent" />
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-2 px-5 py-3.5">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.19em] text-[#9aa8b1]">
              Devis en circulation
            </p>
            <p className="mt-0.5 font-display text-[17px] font-bold text-[#0F172A]">
              DV-2026-018
            </p>
          </div>

          <span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-[11px] font-extrabold transition-all duration-200 ${current.badgeColor}`}>
            <span className={`h-2 w-2 rounded-full ${current.beacon}`} />
            {current.badgeText}
          </span>
        </div>
      </div>

      {/* Decision Card with Client Real Data */}
      <div
        className="hover-lift absolute -bottom-2 right-0 w-[63%] rounded-[26px] border border-white/20 bg-[#0F172A] p-5 text-white shadow-[0_28px_60px_rgba(17,42,70,.24)] animate-float-slow"
        style={{ animationDelay: "-2.5s" }}
      >
        <div className="mb-4 flex items-center justify-between">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
            Décision client
          </span>
          <CheckCircle2 size={18} className={activeState === 2 ? "text-[#00D254]" : "text-[#00D254]"} />
        </div>
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#00D254] font-display text-sm font-bold text-[#0F172A]">
            AK
          </div>
          <div>
            <p className="font-display text-[14px] font-bold">Atelier Kora</p>
            <p className="text-[11px] text-white/60">{current.clientStatus}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-white/10 pt-3">
          <span className="text-[11px] text-white/55">Montant proposé</span>
          <strong className="font-display text-[19px] font-bold text-[#00D254]">
            4 850 €
          </strong>
        </div>
      </div>

      {/* Floating Status Pill with Dynamic Transition */}
      <div className="hover-lift absolute left-[3%] top-[43%] flex items-center gap-2.5 rounded-full border border-white bg-white/95 px-3.5 py-2 shadow-[0_12px_26px_rgba(17,42,70,.13)] backdrop-blur-sm transition-all duration-200">
        <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#00D254] text-[#0F172A]">
          <PillIcon size={12} />
        </span>
        <span className="text-[11px] font-extrabold text-[#0F172A]">
          {current.pillText}
        </span>
      </div>

      {/* Interactive State Switcher Pills */}
      <div className="absolute -top-3 right-[4%] z-20 flex items-center gap-1 rounded-full border border-white/80 bg-white/95 p-1 shadow-[0_8px_20px_rgba(17,42,70,.12)] backdrop-blur-md">
        {states.map((st, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveState(idx as 0 | 1 | 2)}
            className={`rounded-full px-3 py-1 text-[10px] font-extrabold transition-all duration-200 ${
              activeState === idx
                ? "bg-[#0F172A] text-[#00D254] shadow-sm scale-105"
                : "text-[#6c7d86] hover:bg-[#f1f4f1] hover:text-[#0F172A]"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>

      {/* Active Pulse Beacon */}
      <div className="absolute right-[5%] top-[51%] h-3.5 w-3.5 rounded-full bg-[#00D254] shadow-[0_0_0_8px_rgba(228,90,72,.18)] animate-pulse-route" />
    </div>
  );
}

function WorkflowShowcase() {
  const steps = [
    {
      key: "prepare",
      number: "01",
      label: "Préparer",
      title: "Votre base est prête.",
      desc: "Importez vos clients et gardez vos produits favoris à portée de main.",
      icon: Users,
      color: "#77A9C9",
    },
    {
      key: "create",
      number: "02",
      label: "Créer",
      title: "Une proposition qui se tient.",
      desc: "Assemblez vos lignes, quantités, remises et conditions sans friction.",
      icon: FilePlus2,
      color: "#00D254",
    },
    {
      key: "send",
      number: "03",
      label: "Envoyer",
      title: "Le bon lien, au bon moment.",
      desc: "Envoyez par e-mail ou WhatsApp et laissez un lien sécurisé faire le reste.",
      icon: Send,
      color: "#0F172A",
    },
    {
      key: "follow",
      number: "04",
      label: "Suivre",
      title: "Vous voyez ce qui avance.",
      desc: "Ouvert, consulté, accepté : chaque étape est lisible depuis votre tableau de bord.",
      icon: Eye,
      color: "#00D254",
    },
    {
      key: "decide",
      number: "05",
      label: "Décider",
      title: "Une réponse sans détour.",
      desc: "Votre client accepte ou refuse depuis une page simple, sans créer de compte.",
      icon: CheckCircle2,
      color: "#00D254",
    },
  ];

  const [selected, setSelected] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  // Auto-cycle through workflow steps smoothly every 4.5s with instant pause on hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setSelected((prev) => (prev + 1) % steps.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [isPaused, steps.length]);

  const current = steps[selected];

  return (
    <section
      id="workflow"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative overflow-hidden border-y border-[#e4eae6] bg-[#f1f4f1] px-6 py-20 lg:px-12 lg:py-28"
    >
      <div className="mx-auto max-w-[1260px]">
        <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
          <div>
            <div className="flex items-center gap-2">
              <p className="text-[11px] font-extrabold uppercase tracking-[.25em] text-[#00D254]">
                Le workflow Fast Devis
              </p>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-[9px] font-bold text-[#71828a] shadow-sm">
                {isPaused ? "⏸ En pause" : "▶ Défilement automatique"}
              </span>
            </div>
            <h2 className="mt-4 max-w-[650px] font-display text-[39px] font-bold leading-[1.03] tracking-[-.05em] sm:text-[54px]">
              Un devis n’est pas un fichier. C’est un chemin.
            </h2>
          </div>
          <p className="max-w-[360px] text-[14px] leading-6 text-[#71828a]">
            Chaque étape a son espace, son signal et sa prochaine action. Rien ne se perd entre votre bureau et votre client.
          </p>
        </div>

        <div className="relative mt-14">
          <div className="workflow-path absolute left-[8%] right-[8%] top-7 hidden h-[3px] rounded-full lg:block" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = index === selected;
              return (
                <button
                  key={step.key}
                  onClick={() => setSelected(index)}
                  className={`hover-lift relative flex flex-col justify-between rounded-[22px] border p-5 text-left transition-all ${
                    isActive
                      ? "border-[#00D254] bg-white shadow-xl ring-2 ring-[#00D254]/30 scale-[1.02]"
                      : "border-white/70 bg-white/55 hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-[24px] font-bold text-[#0F172A]/20">
                      {step.number}
                    </span>
                    <span
                      className="flex h-9 w-9 items-center justify-center rounded-[11px] transition-transform duration-200 hover:scale-110"
                      style={{ backgroundColor: `${step.color}22`, color: step.color }}
                    >
                      <Icon size={17} />
                    </span>
                  </div>
                  <span
                    className={`mt-10 block text-[10px] font-extrabold uppercase tracking-[.14em] ${
                      isActive ? "text-[#00D254]" : "text-[#8b999e]"
                    }`}
                  >
                    {step.label}
                  </span>
                  <h3 className="mt-2 font-display text-[17px] font-bold leading-tight text-[#0F172A]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-[11px] leading-5 text-[#71828a]">{step.desc}</p>
                  <span
                    className={`mt-5 inline-flex items-center gap-1.5 text-[10px] font-extrabold ${
                      isActive ? "text-[#0F172A]" : "text-[#9aa6aa]"
                    }`}
                  >
                    {isActive ? "Étape active" : "Voir l’étape"}
                    <ChevronRight size={13} />
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div className="animate-scale-in mt-7 flex flex-col items-start justify-between gap-4 rounded-[20px] bg-[#0F172A] px-5 py-4 text-white shadow-lg sm:flex-row sm:items-center sm:px-6">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00D254] text-slate-950">
              <current.icon size={15} />
            </span>
            <span className="text-[11px] font-bold text-white/75">
              Maintenant : <strong className="text-white">{current.title}</strong> — {current.desc}
            </span>
          </div>
          <span className="text-[10px] font-extrabold uppercase tracking-[.14em] text-[#00D254]">
            Étape {current.number} / 05
          </span>
        </div>
      </div>
    </section>
  );
}

function Landing() {
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  return (
    <div className="min-h-screen overflow-hidden bg-[#fbfaf7] text-[#0F172A]">
      <div className="shell-grid absolute inset-x-0 top-0 h-[740px] opacity-60" />
      <div className="relative">
        <PublicNav onOpenCustomizer={() => setIsCustomizerOpen(true)} />
        <main>
          <section className="mx-auto grid max-w-[1400px] items-center gap-8 px-6 pb-20 pt-10 lg:grid-cols-[.88fr_1.12fr] lg:px-12 lg:pb-28 lg:pt-16">
            <div className="relative z-10 max-w-[620px]">
              <div className="reveal-up mb-7 inline-flex items-center gap-2 rounded-full border border-[#00D254]/30 bg-[#00D254]/10 px-3.5 py-2 text-[11px] font-extrabold uppercase tracking-[0.15em] text-[#00D254] shadow-sm">
                <span className="h-2 w-2 rounded-full bg-[#00D254] status-beacon-green" /> Fast Devis — par Yasee IT
              </div>
              <h1 className="reveal-up reveal-delay-1 max-w-[650px] font-display text-[49px] font-bold leading-[.98] tracking-[-0.065em] text-[#0F172A] sm:text-[64px] lg:text-[72px]">
                Du premier montant à la{" "}
                <span className="relative inline-block text-[#00D254]">
                  décision
                  <span className="absolute -bottom-2 left-0 h-2 w-[92%] rounded-full bg-[#00D254]/30" />
                </span>{" "}
                client.
              </h1>
              <p className="reveal-up reveal-delay-2 mt-7 max-w-[500px] text-[16px] leading-7 text-[#637684]">
                Fast Devis par Yasee IT rassemble vos clients, vos produits et vos propositions dans un même flux ultra-rapide avec charte graphique sur-mesure.
              </p>
              <div className="reveal-up reveal-delay-3 mt-9 flex flex-wrap items-center gap-3">
                <PrimaryButton href="/connexion">
                  Ouvrir mon espace <ArrowRight size={16} />
                </PrimaryButton>
                <a
                  href="#flux"
                  className="hover-lift inline-flex items-center gap-2 rounded-full border border-[#dfe5e1] bg-white/80 px-4 py-3 text-[13px] font-extrabold text-[#0F172A] transition-colors hover:bg-white"
                >
                  Voir comment ça marche <ChevronRight size={15} />
                </a>
              </div>
              <div className="mt-14 flex items-center gap-7 border-t border-[#e1e6e4] pt-5 text-[11px] font-bold text-[#80909a]">
                <span className="flex items-center gap-2">
                  <ShieldCheck size={15} className="text-[#00D254]" /> Lien sécurisé
                </span>
                <span className="flex items-center gap-2">
                  <Clock3 size={15} className="text-[#00D254]" /> Suivi en temps réel
                </span>
              </div>
            </div>
            <RouteVisual />
          </section>

          <WorkflowShowcase />

          <section id="flux" className="relative bg-[#0F172A] px-6 py-20 text-white lg:px-12 lg:py-28">
            <div className="mx-auto grid max-w-[1260px] gap-14 lg:grid-cols-[.65fr_1.35fr] lg:items-end">
              <div>
                <p className="mb-5 text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#00D254]">
                  Un flux, pas une friction
                </p>
                <h2 className="max-w-[450px] font-display text-[38px] font-bold leading-[1.02] tracking-[-0.05em] sm:text-[52px]">
                  Tout ce qu’il faut pour faire avancer un devis.
                </h2>
                <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-white/58">
                  Chaque étape est pensée pour réduire les allers-retours et laisser une trace claire de la décision.
                </p>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  { n: "01", t: "Préparer", d: "Clients et articles restent à portée de main." },
                  { n: "02", t: "Proposer", d: "Un devis net, calculé et prêt à partir." },
                  { n: "03", t: "Décider", d: "Le client valide depuis un lien simple." },
                ].map((item) => (
                  <div
                    key={item.n}
                    className="hover-lift group rounded-[24px] border border-white/12 bg-white/[.06] p-5 transition-colors hover:bg-white/[.11]"
                  >
                    <div className="mb-14 flex items-start justify-between">
                      <span className="font-display text-3xl font-bold text-white/25">{item.n}</span>
                      <ArrowUpRight size={17} className="text-[#00D254] opacity-0 transition-opacity group-hover:opacity-100" />
                    </div>
                    <h3 className="font-display text-xl font-bold">{item.t}</h3>
                    <p className="mt-2 text-[12px] leading-5 text-white/50">{item.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="mx-auto mt-16 max-w-[1260px] border-t border-white/12 pt-6">
              <div className="flex flex-wrap items-center justify-between gap-4 text-[12px] font-bold text-white/45">
                <span>Conçu pour les équipes qui veulent garder le cap.</span>
                <span className="flex items-center gap-2 text-[#00D254]">
                  <span className="h-2 w-2 rounded-full bg-[#00D254] status-beacon-green" /> Yasee IT
                </span>
              </div>
            </div>
          </section>

          <section id="modules" className="mx-auto grid max-w-[1260px] gap-12 px-6 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-12 lg:py-28">
            <div>
              <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#00D254]">
                Le poste de pilotage
              </p>
              <h2 className="mt-5 max-w-[400px] font-display text-[39px] font-bold leading-[1.03] tracking-[-0.05em]">
                Moins de dispersion. Plus de décisions.
              </h2>
              <p className="mt-6 max-w-[390px] text-[15px] leading-7 text-[#637684]">
                Un espace de travail lisible, avec les bons raccourcis au bon moment.
              </p>
              <Link
                href="/app/dashboard"
                className="hover-lift mt-8 inline-flex items-center gap-2 text-[13px] font-extrabold text-[#0F172A] underline decoration-[#00D254] decoration-2 underline-offset-4"
              >
                Explorer le tableau de bord <ArrowRight size={15} />
              </Link>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <FeatureCard icon={<Users size={19} />} title="Clients" text="Retrouvez les bonnes coordonnées, l’historique et les échanges." color="yellow" />
              <FeatureCard icon={<Package size={19} />} title="Produits" text="Vos articles et tarifs sont prêts à être ajoutés en quelques clics." color="blue" />
              <FeatureCard icon={<FileText size={19} />} title="Devis" text="Composez une proposition claire avec totaux et conditions maîtrisés." color="coral" />
              <FeatureCard icon={<Send size={19} />} title="Envoi" text="Partagez par e-mail ou WhatsApp et suivez chaque ouverture." color="green" />
            </div>
          </section>

          <section id="admin" className="border-t border-[#e5e9e6] bg-[#f1f4f1] px-6 py-20 lg:px-12 lg:py-24">
            <div className="mx-auto grid max-w-[1260px] items-center gap-12 lg:grid-cols-[1fr_1fr]">
              <div className="order-2 lg:order-1">
                <div className="hover-lift overflow-hidden rounded-[28px] border border-white bg-white p-2 shadow-[0_24px_55px_rgba(15,23,42,.12)]">
                  <img src={IMPORT_VISUAL} alt="Illustration d'import de données" className="h-[290px] w-full rounded-[21px] object-cover" />
                </div>
              </div>
              <div className="order-1 lg:order-2">
                <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-[#00D254]">Administration</p>
                <h2 className="mt-5 max-w-[470px] font-display text-[39px] font-bold leading-[1.03] tracking-[-0.05em]">
                  Commencer avec des données déjà prêtes.
                </h2>
                <p className="mt-6 max-w-[470px] text-[15px] leading-7 text-[#637684]">
                  L’administrateur importe les clients et produits par fichier, contrôle les erreurs et garde l’historique des opérations.
                </p>
                <div className="mt-7 flex flex-wrap gap-2">
                  <span className="hover-lift rounded-full bg-white px-3 py-2 text-[11px] font-extrabold text-[#516572] shadow-sm">CSV / XLSX</span>
                  <span className="hover-lift rounded-full bg-white px-3 py-2 text-[11px] font-extrabold text-[#516572] shadow-sm">Prévisualisation</span>
                  <span className="hover-lift rounded-full bg-white px-3 py-2 text-[11px] font-extrabold text-[#516572] shadow-sm">Rapport d’erreurs</span>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-[#00D254] px-6 py-16 lg:px-12 lg:py-20">
            <div className="mx-auto flex max-w-[1260px] flex-col items-start justify-between gap-7 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] font-extrabold uppercase tracking-[0.25em] text-slate-950/60">
                  Prêt à passer du fichier au flux ?
                </p>
                <h2 className="mt-3 max-w-[600px] font-display text-[38px] font-bold leading-[1.02] tracking-[-0.05em] text-slate-950 sm:text-[50px]">
                  Créez un devis qui avance.
                </h2>
              </div>
              <PrimaryButton href="/inscription" dark>
                Créer mon espace <ArrowUpRight size={16} />
              </PrimaryButton>
            </div>
          </section>
        </main>
        <footer className="flex flex-col justify-between gap-4 bg-[#0F172A] px-6 py-6 text-[11px] font-bold text-white/50 sm:flex-row lg:px-12">
          <Brand compact />
          <span>© 2026 Fast Devis — par Yasee IT. Plateforme de devis avec chartes clients dynamiques.</span>
        </footer>
      </div>

      <ThemeCustomizerModal isOpen={isCustomizerOpen} onClose={() => setIsCustomizerOpen(false)} />
    </div>
  );
}


function FeatureCard({
  icon,
  title,
  text,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  text: string;
  color: "yellow" | "blue" | "coral" | "green";
}) {
  const styles = {
    yellow: "bg-[#fff7df] text-[#00D254]",
    blue: "bg-[#f1f5f9] text-[#0F172A]",
    coral: "bg-[#fcecea] text-[#00D254]",
    green: "bg-[#eaf5ef] text-[#00D254]",
  };
  return (
    <div className="hover-lift group rounded-[24px] bg-white p-5 shadow-[0_8px_24px_rgba(17,42,70,.06)] border border-[#edf2ee]">
      <div className={`mb-10 flex h-10 w-10 items-center justify-center rounded-[13px] transition-transform duration-200 group-hover:scale-110 ${styles[color]}`}>
        {icon}
      </div>
      <h3 className="font-display text-[19px] font-bold text-[#0F172A]">{title}</h3>
      <p className="mt-2 text-[12px] leading-5 text-[#71818b]">{text}</p>
      <ArrowUpRight size={16} className="mt-5 text-[#b9c3c6] transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-[#0F172A]" />
    </div>
  );
}

function Sidebar({ section, setSection }: { section: string; setSection: (value: string) => void }) {
  const { role } = useAuth();
  const { theme } = useCharter();
  const [, setLocation] = useLocation();
  const items = [
    { key: "dashboard", label: "Vue d’ensemble", icon: LayoutDashboard },
    { key: "devis", label: "Mes devis", icon: FileText },
    { key: "clients", label: "Clients", icon: Users },
    { key: "produits", label: "Produits", icon: Package },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-[248px] flex-col border-r border-[#e5e9e6] bg-[#f7f8f5] px-5 py-6 lg:flex">
      <Brand />
      <div className="mt-10">
        <p className="px-3 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9aa8ad]">
          Espace de travail
        </p>
        <nav className="mt-3 space-y-1">
          {items.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setSection(key)}
              className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-3 text-left text-[13px] font-extrabold transition-all ${
                section === key
                  ? "bg-[#0F172A] text-white shadow-sm font-black"
                  : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
              }`}
            >
              <Icon size={17} className={section === key ? "text-white" : "text-[#667985]"} />
              <span>{label}</span>
              {key === "devis" && (
                <span
                  className={`ml-auto rounded-full px-2 py-0.5 text-[10px] ${
                    section === key ? "bg-white/20 text-white" : "bg-[#e9edef] text-[#70808b]"
                  }`}
                >
                  12
                </span>
              )}
            </button>
          ))}
        </nav>
      </div>

      <div className="mt-7">
        <div className="flex items-center justify-between px-3">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#9aa8ad]">
            Administration
          </p>
          {role === "lambda" && (
            <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-extrabold text-slate-600">
              Restreint
            </span>
          )}
        </div>
        <nav className="mt-3 space-y-1">
          <button
            onClick={() => setSection("admin")}
            className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-2.5 text-left text-[13px] font-extrabold transition-all ${
              section === "admin"
                ? "bg-[#0F172A] text-white shadow-sm font-black"
                : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
            }`}
          >
            <ShieldCheck size={17} className={section === "admin" ? "text-white" : "text-[#667985]"} />
            <span>Hub Administrateur</span>
          </button>
          {role === "admin" && (
            <>
              <button
                onClick={() => setSection("utilisateurs")}
                className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-2.5 text-left text-[13px] font-extrabold transition-all ${
                  section === "utilisateurs"
                    ? "bg-[#0F172A] text-white shadow-sm font-black"
                    : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
                }`}
              >
                <Users size={17} className={section === "utilisateurs" ? "text-white" : "text-[#667985]"} />
                <span>Gestion des accès</span>
              </button>
              <button
                onClick={() => setSection("modele-devis")}
                className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-2.5 text-left text-[13px] font-extrabold transition-all ${
                  section === "modele-devis"
                    ? "bg-[#0F172A] text-white shadow-sm font-black"
                    : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
                }`}
              >
                <FileText size={17} className={section === "modele-devis" ? "text-white" : "text-[#667985]"} />
                <span>Modèle de devis</span>
              </button>
              <button
                onClick={() => setSection("import")}
                className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-2.5 text-left text-[13px] font-extrabold transition-all ${
                  section === "import"
                    ? "bg-[#0F172A] text-white shadow-sm font-black"
                    : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
                }`}
              >
                <Upload size={17} className={section === "import" ? "text-white" : "text-[#667985]"} />
                <span>Assistant d'import</span>
              </button>
              <button
                onClick={() => setSection("reglages")}
                className={`flex w-full items-center gap-3 rounded-[13px] px-3.5 py-2.5 text-left text-[13px] font-extrabold transition-all ${
                  section === "reglages"
                    ? "bg-[#0F172A] text-white shadow-sm font-black"
                    : "text-[#667985] hover:bg-white hover:text-[#0F172A]"
                }`}
              >
                <Sparkles size={17} className={section === "reglages" ? "text-white" : "text-[#667985]"} />
                <span>Réglages entreprise</span>
              </button>
            </>
          )}
        </nav>
      </div>

      <div className="mt-auto border-t border-[#e8ecea] pt-4">
        <div className="flex items-center gap-2 text-slate-700">
          <Sparkles size={15} className="text-[#00D254]" />
          <span className="text-[11px] font-extrabold text-[#0F172A]">Rôle actif</span>
        </div>
        <p className="mt-1 text-[11px] font-bold text-[#00D254]">
          {role === "admin" ? "★ Administrateur (Accès total)" : "• Utilisateur lambda (Opérationnel)"}
        </p>
      </div>
    </aside>
  );
}

export function FlowTrail({ active = "devis" }: { active?: string }) {
  const steps = [{ key: "prepare", label: "Préparer" }, { key: "devis", label: "Proposer" }, { key: "send", label: "Envoyer" }, { key: "decision", label: "Décider" }];
  return (
    <div className="mx-auto flex max-w-[1500px] items-center gap-0 overflow-x-auto px-5 pb-5 pt-1 sm:px-8 lg:px-10">
      <div className="mr-4 hidden items-center gap-2 sm:flex">
        <span className="flex h-7 w-7 items-center justify-center rounded-[9px] bg-[#00D254] text-slate-950 font-black text-xs shadow-sm">F</span>
        <span className="whitespace-nowrap font-display text-[10px] font-bold uppercase tracking-[0.18em] text-[#0F172A]">Fast Devis</span>
      </div>
      {steps.map((step, index) => (
        <div key={step.key} className="flex items-center">
          <div
            className={`flex items-center gap-2 whitespace-nowrap rounded-full border px-3 py-1.5 text-[11px] font-extrabold transition-all ${
              active === step.key || (active === "devis" && step.key === "prepare")
                ? "bg-slate-900 border-slate-900 text-white shadow-sm"
                : "border-slate-200 bg-white text-slate-500"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                active === step.key || (active === "devis" && step.key === "prepare") ? "bg-[#00D254]" : "bg-slate-300"
              }`}
            />
            {step.label}
          </div>
          {index < steps.length - 1 && <span className="mx-1.5 hidden h-px w-6 bg-[#d9e2df] sm:block" />}
        </div>
      ))}
    </div>
  );
}

function AppTopbar({ section, onMenu, onOpenCustomizer }: { section: string; onMenu: () => void; onOpenCustomizer?: () => void }) {
  const { role, user, setRole } = useAuth();
  const firstName = user.name.split(" ")[0];
  const titles: Record<string, [string, string]> = {
    dashboard: [`Bonjour, ${firstName}`, role === "admin" ? "Voici la vue globale d'administration et les indicateurs commerciaux." : "Voici vos devis et activités opérationnelles."],
    devis: ["Mes devis", "Suivez vos propositions du brouillon à la décision."],
    clients: ["Clients", "Votre relation commerciale, au même endroit."],
    produits: ["Produits", "Un catalogue prêt à composer."],
    admin: ["Hub Administrateur", role === "admin" ? "Importez, contrôlez et gardez la main sur l’espace." : "Espace réservé à l'administrateur."],
    utilisateurs: ["Gestion des accès", "Membres de l’entreprise et permissions attribuées."],
    "modele-devis": ["Modèle de devis", "Personnalisez la signature de vos propositions commerciales."],
    import: ["Assistant d’import", "Injectez vos données brutes sans perdre le contrôle."],
    reglages: ["Réglages entreprise", "Paramétrez vos informations légales et préférences."],
    new: ["Nouveau devis", "Une proposition claire, prête à partir."],
    detail: ["Détail du devis", "Historique, suivi et relances du document."],
  };
  const [title, subtitle] = titles[section] ?? titles.dashboard;

  const toggleRole = () => {
    const newRole = role === "admin" ? "lambda" : "admin";
    setRole(newRole);
    toast(newRole === "admin" ? "Basculé sur le profil Administrateur (Accès complet)" : "Basculé sur le profil Utilisateur lambda (Accès limité)");
  };

  return (
    <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#e5e9e6] bg-[#fbfaf7]/95 px-5 py-4 backdrop-blur-xl sm:px-8 lg:px-10">
      <div className="flex items-center gap-4">
        <button onClick={onMenu} className="rounded-lg p-2 text-[#0F172A] hover:bg-[#eef1ed] lg:hidden">
          <Menu size={20} />
        </button>
        <div>
          <h1 className="font-display text-[22px] font-bold tracking-[-0.04em] text-[#0F172A] sm:text-[28px]">
            {title}
          </h1>
          <p className="text-[11px] text-[#829099]">{subtitle}</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Dashboard Theme Customizer Button */}
        {onOpenCustomizer && (
          <button
            onClick={onOpenCustomizer}
            className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[10px] font-black text-slate-800 shadow-sm hover:border-[#00D254] transition-all"
            title="Modifier les couleurs de son dashboard client"
          >
            <Palette size={14} className="text-[#00D254]" />
            <span className="hidden sm:inline">Couleurs Dashboard</span>
          </button>
        )}

        <button
          onClick={toggleRole}
          className={`hidden items-center gap-2 rounded-full px-3 py-2 text-[10px] font-extrabold transition-all sm:flex ${
            role === "admin" ? "bg-[#0F172A] text-white" : "bg-[#00D254]/10 border border-[#00D254]/30 text-slate-800"
          }`}
          title="Cliquer pour changer de profil et tester les permissions"
        >
          {role === "admin" ? <ShieldCheck size={14} /> : <UserCheck size={14} />}
          <span>{user.roleLabel}</span>
          <span className="rounded bg-white/20 px-1 py-0.5 text-[8px] font-bold">Changer</span>
        </button>

        <button
          onClick={() => toast("Aucune nouvelle notification.")}
          className="relative rounded-full p-2.5 text-[#6b7e89] transition-colors hover:bg-white hover:text-[#0F172A]"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#00D254]" />
        </button>

        <div className="hidden h-7 w-px bg-[#e1e6e4] sm:block" />

        <button
          onClick={toggleRole}
          className="flex items-center gap-2 rounded-full bg-white py-1.5 pl-1.5 pr-3 shadow-sm hover:ring-2 hover:ring-slate-300"
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full font-display text-[11px] font-black text-slate-950 shadow-sm bg-[#00D254]">
            {user.initials}
          </span>
          <div className="hidden text-left sm:block">
            <span className="block text-[11px] font-extrabold leading-tight text-[#0F172A]">{user.name}</span>
            <span className="block text-[9px] font-bold text-[#829099]">{user.roleLabel}</span>
          </div>
          <ChevronDown size={14} className="text-[#829099]" />
        </button>
      </div>
    </header>
  );
}

function StatCard({ label, value, detail, icon, accent }: { label: string; value: string; detail: string; icon: React.ReactNode; accent: string }) {
  return (
    <div className="card-shadow rounded-[20px] bg-white p-5 border border-slate-100">
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-black uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <span className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${accent}`}>{icon}</span>
      </div>
      <div className="mt-6 flex items-end justify-between gap-3">
        <strong className="font-display text-[32px] font-black tracking-[-0.05em] text-slate-900 leading-none">{value}</strong>
        <span className="text-[11px] font-bold text-slate-500">{detail}</span>
      </div>
    </div>
  );
}

function StatusPill({ status, tone }: { status: string; tone: string }) {
  const map: Record<string, string> = {
    blue: "bg-slate-100 text-slate-800 border border-slate-200",
    green: "bg-emerald-50 text-emerald-800 border border-emerald-200/80",
    gray: "bg-slate-100 text-slate-700 border border-slate-200",
    red: "bg-rose-50 text-rose-800 border border-rose-200",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-extrabold ${map[tone] ?? map.gray}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current opacity-80" />
      {status}
    </span>
  );
}

function RecentQuotes({ onOpen }: { onOpen: (id: string) => void }) {
  return (
    <div className="card-shadow overflow-hidden rounded-[22px] bg-white border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <h2 className="font-display text-[18px] font-bold text-slate-900">Derniers devis</h2>
          <p className="mt-0.5 text-[11px] font-medium text-slate-500">Vos propositions commerciales récentes.</p>
        </div>
        <button
          onClick={() => onOpen("devis")}
          className="text-[12px] font-black text-slate-900 hover:text-[#00D254] transition-colors"
        >
          Voir tout →
        </button>
      </div>
      <div className="divide-y divide-slate-100">
        {quotes.map((quote) => (
          <button
            key={quote.id}
            onClick={() => onOpen("devis")}
            className="flex w-full items-center gap-3 px-6 py-4 text-left transition-colors hover:bg-slate-50/70"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 font-display text-[12px] font-black text-slate-800">
              {quote.initials}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="truncate text-[13px] font-black text-slate-900">{quote.client}</p>
                <span className="text-[10px] font-bold text-slate-400">{quote.id}</span>
              </div>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">{quote.date}</p>
            </div>
            <div className="text-right">
              <p className="font-display text-[14px] font-black text-slate-900">{quote.amount}</p>
              <div className="mt-1">
                <StatusPill status={quote.status} tone={quote.tone} />
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400 ml-1" />
          </button>
        ))}
      </div>
    </div>
  );
}

function QuoteInsights() {
  const [range, setRange] = useState("30 jours");
  const [focus, setFocus] = useState<"accepted" | "pending" | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 350);
    return () => window.clearTimeout(timer);
  }, [range]);

  const datasets: Record<string, { accepted: number; pending: number; bars: number[] }> = {
    "7 jours": { accepted: 9, pending: 4, bars: [42, 58, 49, 74, 65, 80, 92] },
    "30 jours": { accepted: 28, pending: 11, bars: [38, 52, 46, 68, 58, 78, 91] },
    "90 jours": { accepted: 76, pending: 24, bars: [31, 45, 52, 61, 57, 76, 88] },
  };

  const data = datasets[range];
  const total = data.accepted + data.pending;
  const acceptedPercent = Math.round((data.accepted / total) * 100);

  return (
    <section className="card-shadow relative overflow-hidden rounded-[22px] bg-white border border-slate-100" aria-busy={loading}>
      <div className="flex flex-col gap-4 border-b border-slate-100 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-[12px] bg-slate-100 text-slate-800">
            <FileCheck2 size={18} />
          </span>
          <div>
            <h2 className="font-display text-[19px] font-black text-slate-900">Suivi des décisions</h2>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">Taux d'acceptation et devis à relancer.</p>
          </div>
        </div>
        <div className="flex rounded-full bg-slate-100 p-1">
          {Object.keys(datasets).map((item) => (
            <button
              key={item}
              onClick={() => setRange(item)}
              className={`rounded-full px-3.5 py-1.5 text-[11px] font-black transition-all ${
                range === item ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      </div>

      <div className={`grid gap-8 p-6 lg:grid-cols-[.9fr_1.1fr] lg:items-center transition-opacity duration-300 ${loading ? "opacity-50" : "opacity-100"}`}>
        <div className="flex items-center gap-7">
          <div
            className="relative flex h-[150px] w-[150px] shrink-0 items-center justify-center rounded-full shadow-inner"
            style={{ background: `conic-gradient(#00D254 0 ${acceptedPercent}%, #0F172A ${acceptedPercent}% 100%)` }}
          >
            <div className="flex h-[106px] w-[106px] flex-col items-center justify-center rounded-full bg-white shadow-sm">
              <strong className="font-display text-[30px] font-black text-slate-900 leading-none">{acceptedPercent}%</strong>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wide mt-1">Acceptés</span>
            </div>
          </div>
          <div className="space-y-4">
            <button
              onClick={() => setFocus("accepted")}
              className={`block text-left transition-opacity ${focus && focus !== "accepted" ? "opacity-40" : "opacity-100"}`}
            >
              <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[.1em] text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-[#00D254]" />
                Acceptés
              </span>
              <strong className="mt-1 block font-display text-[26px] font-black text-slate-900">
                {data.accepted} <span className="text-[12px] font-bold text-slate-400">devis</span>
              </strong>
            </button>

            <button
              onClick={() => setFocus("pending")}
              className={`block text-left transition-opacity ${focus && focus !== "pending" ? "opacity-40" : "opacity-100"}`}
            >
              <span className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[.1em] text-slate-500">
                <span className="h-2.5 w-2.5 rounded-full bg-[#0F172A]" />
                En attente
              </span>
              <strong className="mt-1 block font-display text-[26px] font-black text-slate-900">
                {data.pending} <span className="text-[12px] font-bold text-slate-400">devis</span>
              </strong>
            </button>
          </div>
        </div>

        <div>
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-black uppercase tracking-[.14em] text-slate-400">Volume traité</p>
              <p className="mt-0.5 text-[13px] font-black text-slate-900">{total} devis sur {range.toLowerCase()}</p>
            </div>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-black text-emerald-800">
              +18,4% conversion
            </span>
          </div>
          <div className="flex h-[135px] items-end gap-2.5 border-b border-slate-200 pb-0">
            {data.bars.map((height, i) => (
              <div key={i} className="group relative flex h-full flex-1 items-end">
                <div
                  className={`w-full rounded-t-[6px] transition-all duration-200 group-hover:bg-slate-900 ${
                    i % 2 === 0 ? "bg-[#00D254]" : "bg-[#0F172A]"
                  }`}
                  style={{ height: `${height}%` }}
                />
              </div>
            ))}
          </div>
          <div className="mt-3 flex justify-between text-[10px] font-black text-slate-400">
            <span>Sem. 1</span>
            <span>Sem. 2</span>
            <span>Sem. 3</span>
            <span>Sem. 4</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowPulse() {
  const steps = [
    { label: "Base prête", meta: "24 clients · 18 produits", done: true },
    { label: "Devis composé", meta: "12 propositions ce mois", done: true },
    { label: "En attente client", meta: "05 décisions à suivre", done: false },
    { label: "Décision reçue", meta: "07 devis acceptés", done: false },
  ];
  return (
    <div className="card-shadow overflow-hidden rounded-[22px] bg-white border border-slate-100">
      <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
        <div>
          <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400">
            Workflow en cours
          </p>
          <h2 className="mt-0.5 font-display text-[19px] font-black text-slate-900">
            Avancement de vos propositions
          </h2>
        </div>
        <span className="flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-black text-emerald-800">
          <span className="h-2 w-2 rounded-full bg-[#00D254]" />
          En direct
        </span>
      </div>
      <div className="grid gap-0 p-6 sm:grid-cols-4">
        {steps.map((step, index) => (
          <div key={step.label} className="relative flex gap-3 pb-5 last:pb-0 sm:block sm:pb-0 sm:pr-4">
            <div className="flex items-center gap-2 sm:block">
              <span
                className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full text-[11px] font-black ${
                  step.done
                    ? "bg-[#00D254] text-slate-950 shadow-sm"
                    : "border-2 border-slate-200 bg-slate-50 text-slate-600"
                }`}
              >
                {step.done ? <Check size={14} /> : index + 1}
              </span>
              <span className="absolute left-4 top-8 h-full w-px bg-slate-200 sm:left-4 sm:top-4 sm:h-px sm:w-[calc(100%-16px)]" />
            </div>
            <div className="sm:mt-3">
              <p className="text-[12px] font-black text-slate-900">{step.label}</p>
              <p className="mt-0.5 text-[11px] font-medium text-slate-500">{step.meta}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function Dashboard({ section, setSection }: { section: string; setSection: (value: string) => void }) {
  const { role, user } = useAuth();
  const { theme } = useCharter();

  return (
    <div className="space-y-6">
      {/* Admin Hub Banner */}
      {role === "admin" ? (
        <div className="card-shadow rounded-[24px] p-6 text-white sm:p-8 transition-colors shadow-lg" style={{ backgroundColor: theme.darkColor || "#0F172A" }}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="flex h-7 w-7 items-center justify-center rounded-full text-slate-950 font-black shadow-sm" style={{ backgroundColor: theme.primaryColor || "#00D254" }}>
                  <ShieldCheck size={16} />
                </span>
                <span className="text-[11px] font-black uppercase tracking-[0.2em] text-[#00D254]">
                  Centre de pilotage entreprise
                </span>
              </div>
              <h2 className="mt-3 font-display text-[24px] font-black tracking-tight sm:text-[28px] text-white">
                Espace {theme.companyName || user.company || "Yasee IT"}
              </h2>
              <p className="mt-1.5 max-w-[620px] text-[13px] leading-relaxed text-slate-300 font-normal">
                Pilotez votre activité commerciale, gérez les accès de votre équipe et personnalisez votre modèle de devis officiel.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => setSection("reglages")}
                className="btn-action inline-flex items-center gap-2 rounded-full px-5 py-3 text-[12px] font-black text-slate-950 shadow-md hover:opacity-90"
                style={{ backgroundColor: theme.primaryColor || "#00D254" }}
              >
                <Palette size={15} />
                Personnaliser Logo & Couleurs
              </button>
              <button
                onClick={() => setSection("utilisateurs")}
                className="btn-action inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-[12px] font-black text-slate-950 hover:bg-slate-100 shadow-sm"
              >
                <Users size={15} />
                Gestion des accès
              </button>
              <button
                onClick={() => setSection("admin")}
                className="btn-action inline-flex items-center gap-2 rounded-full bg-white/15 px-4 py-3 text-[12px] font-bold text-white border border-white/20 hover:bg-white/20"
              >
                <Upload size={15} />
                Imports
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="card-shadow rounded-[20px] bg-white p-5 border border-slate-200">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-8 w-8 items-center justify-center rounded-full text-slate-950 font-black shadow-sm" style={{ backgroundColor: theme.primaryColor || "#00D254" }}>
                <UserCheck size={16} />
              </span>
              <div>
                <p className="text-[13px] font-black text-slate-900">
                  Espace Collaborateur — {theme.companyName || user.company || "Entreprise"}
                </p>
                <p className="text-[11px] font-medium text-slate-500">
                  Créez, éditez et relancez vos devis clients en toute autonomie.
                </p>
              </div>
            </div>
            <span className="rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-black text-emerald-800">
              Accès Opérationnel Actif
            </span>
          </div>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Devis ce mois" value="12" detail="+ 18% ce mois" icon={<FileCheck2 size={18} className="text-slate-700" />} accent="bg-slate-100" />
        <StatCard label="En attente" value="05" detail="2 à relancer" icon={<Clock3 size={18} className="text-amber-700" />} accent="bg-amber-50 border border-amber-200/60" />
        <StatCard label="Acceptés" value="07" detail="58% de conversion" icon={<CheckCircle2 size={18} className="text-emerald-700" />} accent="bg-emerald-50 border border-emerald-200/60" />
        <StatCard label="Montant accepté" value="8 450 €" detail="+ 12% de volume" icon={<ArrowUpRight size={18} className="text-slate-900" />} accent="bg-slate-100" />
      </div>

      <QuoteInsights />
      <WorkflowPulse />

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        {/* Commercial Activity Banner */}
        <div className="card-shadow rounded-[22px] p-6 text-white sm:p-7 transition-colors shadow-md" style={{ backgroundColor: theme.darkColor || "#0F172A" }}>
          <div className="flex items-start justify-between">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.15em] text-[#00D254]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#00D254]" /> Activité commerciale
              </span>
              <h2 className="mt-4 max-w-[380px] font-display text-[24px] font-black leading-tight tracking-tight text-white">
                Votre activité garde le bon rythme.
              </h2>
            </div>
            <button onClick={() => toast("Le détail analytique sera disponible prochainement.")} className="rounded-full bg-white/10 p-2 text-white/70 hover:bg-white/20 hover:text-white">
              <MoreHorizontal size={17} />
            </button>
          </div>
          <div className="mt-8 grid grid-cols-7 items-end gap-2 sm:gap-4">
            <div className="col-span-7 flex items-center justify-between text-[11px] text-white/60 font-bold mb-2">
              <span>Montant des devis acceptés</span>
              <span className="font-black text-[#00D254]">+ 22,8%</span>
            </div>
            {[36, 54, 43, 69, 57, 80, 93].map((height, i) => (
              <div key={i} className="group flex flex-col items-center gap-2">
                <div
                  className={`w-full rounded-t-[7px] transition-all duration-300 group-hover:bg-[#00D254] ${
                    i === 6 ? "bg-[#00D254]" : "bg-white/20"
                  }`}
                  style={{ height: `${height}px` }}
                />
                <span className="text-[10px] font-bold text-white/50">{["L", "M", "M", "J", "V", "S", "D"][i]}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Action Reminder Card */}
        <div className="card-shadow relative overflow-hidden rounded-[22px] bg-white p-6 border border-slate-100 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-slate-500">
              <Inbox size={18} />
              <span className="text-[11px] font-black uppercase tracking-[0.16em]">À ne pas oublier</span>
            </div>
            <h2 className="mt-4 font-display text-[22px] font-black leading-snug text-slate-900">
              Deux clients attendent votre retour.
            </h2>
            <p className="mt-2 text-[13px] leading-relaxed text-slate-600">
              Relancez vos devis en attente pour accélérer la signature.
            </p>
          </div>
          <div className="mt-6">
            <button
              onClick={() => setSection("devis")}
              className="btn-action inline-flex items-center gap-2 rounded-full bg-slate-900 px-5 py-2.5 text-[12px] font-black text-white hover:bg-slate-800 shadow-sm"
            >
              Voir les devis à relancer <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[1.2fr_.8fr]">
        <RecentQuotes onOpen={setSection} />
        <div className="card-shadow overflow-hidden rounded-[22px] bg-white border border-slate-100">
          <div className="border-b border-slate-100 px-6 py-4">
            <h2 className="font-display text-[18px] font-bold text-slate-900">Accès rapide</h2>
            <p className="mt-0.5 text-[11px] font-medium text-slate-500">Les actions courantes de votre espace.</p>
          </div>
          <div className="grid grid-cols-2 gap-3 p-4">
            <QuickAction icon={<FilePlus2 size={18} />} label="Nouveau devis" color="green" onClick={() => setSection("new")} />
            <QuickAction icon={<Users size={18} />} label="Ajouter client" color="neutral" onClick={() => setSection("clients")} />
            <QuickAction icon={<Package size={18} />} label="Ajouter produit" color="neutral" onClick={() => setSection("produits")} />
            <QuickAction icon={<Upload size={18} />} label="Importer" color="neutral" onClick={() => setSection("admin")} />
          </div>
        </div>
      </div>
    </div>
  );
}

function QuickAction({ icon, label, color, onClick }: { icon: React.ReactNode; label: string; color: string; onClick: () => void }) {
  const isGreen = color === "green";
  return (
    <button
      onClick={onClick}
      className={`group rounded-[16px] border p-4 text-left transition-all hover:-translate-y-0.5 hover:shadow-sm ${
        isGreen
          ? "border-emerald-200 bg-emerald-50/40 hover:border-emerald-300"
          : "border-slate-200 bg-slate-50/50 hover:border-slate-300"
      }`}
    >
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-[11px] font-black ${
          isGreen ? "bg-[#00D254] text-slate-950 shadow-sm" : "bg-white text-slate-800 border border-slate-200"
        }`}
      >
        {icon}
      </span>
      <span className="mt-6 block text-[12px] font-black leading-tight text-slate-900">{label}</span>
      <ArrowUpRight size={14} className="mt-2 text-slate-400 transition-colors group-hover:text-slate-900" />
    </button>
  );
}

function SearchBar({ placeholder }: { placeholder: string }) { return <div className="flex min-w-0 items-center gap-2 rounded-full border border-[#e3e9e6] bg-white px-4 py-2.5 text-[#a1adb0] shadow-sm"><Search size={15} /><input aria-label={placeholder} placeholder={placeholder} className="min-w-0 flex-1 bg-transparent text-[12px] font-semibold text-[#0F172A] outline-none placeholder:text-[#a1adb0]" /></div>; }

function SectionHeader({ title, count, button, onButton, search }: { title: string; count: string; button: string; onButton: () => void; search: string }) {
  const { theme } = useCharter();
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <div className="flex items-center gap-2">
          <h2 className="font-display text-[21px] font-bold text-[#0F172A]">{title}</h2>
          <span className="rounded-full bg-[#e9eff2] px-2 py-1 text-[10px] font-extrabold text-[#647985]">{count}</span>
        </div>
        <p className="mt-1 text-[11px] text-[#89979d]">Gérez vos données sans perdre le fil.</p>
      </div>
      <div className="flex items-center gap-2">
        <div className="w-full sm:w-[210px]"><SearchBar placeholder={search} /></div>
        <button onClick={onButton} className="btn-action inline-flex shrink-0 items-center gap-2 rounded-full px-4 py-3 text-[11px] font-black text-slate-950" style={{ backgroundColor: theme.primaryColor }}>
          <Plus size={14} />{button}
        </button>
      </div>
    </div>
  );
}

function ClientsSection() {
  return <div className="space-y-5"><SectionHeader title="Clients" count="24" search="Rechercher un client" button="Ajouter" onButton={() => toast("Le formulaire d’ajout client sera connecté dans la prochaine étape.")} /><div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{clients.map((client) => <div key={client.name} className="card-shadow group rounded-[20px] bg-white p-5 transition-transform hover:-translate-y-1"><div className="flex items-start justify-between"><div className="flex items-center gap-3"><span className="flex h-10 w-10 items-center justify-center rounded-full font-display text-[11px] font-bold text-[#0F172A]" style={{ backgroundColor: client.color }}>{client.initials}</span><div><h3 className="font-display text-[15px] font-bold text-[#0F172A]">{client.name}</h3><p className="mt-1 text-[10px] text-[#87969d]">{client.quotes} devis envoyés</p></div></div><button onClick={() => toast(`Fiche de ${client.name}`)} className="rounded-full p-1.5 text-[#a7b1b3] hover:bg-[#f1f4f1] hover:text-[#0F172A]"><MoreHorizontal size={17} /></button></div><div className="mt-5 space-y-2 border-t border-[#eef1ef] pt-4 text-[11px] text-[#73838b]"><p>{client.email}</p><p>{client.phone}</p></div><button onClick={() => toast(`Ouverture de la fiche ${client.name}`)} className="mt-4 flex items-center gap-2 text-[11px] font-extrabold text-[#0F172A]">Voir la fiche <ArrowUpRight size={13} /></button></div>)}</div></div>;
}

function ProductsSection() {
  return <div className="space-y-5"><SectionHeader title="Produits" count="18" search="Rechercher un article" button="Ajouter" onButton={() => toast("Le formulaire d’ajout produit sera connecté dans la prochaine étape.")} /><div className="card-shadow overflow-hidden rounded-[22px] bg-white"><div className="hidden grid-cols-[1.6fr_.9fr_.7fr_.6fr_40px] gap-4 border-b border-[#eef1ef] px-5 py-3 text-[10px] font-extrabold uppercase tracking-[0.12em] text-[#9aa7ab] md:grid"><span>Article</span><span>Référence</span><span>Catégorie</span><span>Prix</span><span /></div>{products.map((product) => <div key={product.ref} className="grid gap-3 border-b border-[#eef1ef] px-5 py-4 last:border-0 md:grid-cols-[1.6fr_.9fr_.7fr_.6fr_40px] md:items-center md:gap-4"><div className="flex items-center gap-3"><span className="h-8 w-1 rounded-full" style={{ backgroundColor: product.color }} /><div><p className="text-[12px] font-extrabold text-[#0F172A]">{product.name}</p><p className="mt-1 text-[10px] text-[#97a4a8] md:hidden">{product.ref} · {product.category}</p></div></div><span className="hidden text-[11px] font-bold text-[#829198] md:block">{product.ref}</span><span className="hidden text-[11px] font-bold text-[#829198] md:block">{product.category}</span><span className="font-display text-[13px] font-bold text-[#0F172A]">{product.price}</span><button onClick={() => toast(`Options de ${product.name}`)} className="absolute right-5 rounded-full p-1.5 text-[#a7b1b3] hover:bg-[#f1f4f1] hover:text-[#0F172A] md:static"><MoreHorizontal size={17} /></button></div>)}</div></div>;
}

function QuotesSection({ setSection }: { setSection: (value: string) => void }) {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="font-display text-[22px] font-black text-slate-900">Mes devis</h2>
            <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[11px] font-black text-slate-700">12</span>
          </div>
          <p className="mt-0.5 text-[12px] text-slate-500 font-medium">Consultez l'historique et le suivi de vos propositions commerciales.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-full sm:w-[240px]">
            <SearchBar placeholder="Rechercher un devis..." />
          </div>
          <button
            onClick={() => setSection("new")}
            className="btn-action inline-flex shrink-0 items-center gap-2 rounded-full bg-[#00D254] px-5 py-2.5 text-[12px] font-black text-slate-950 shadow-md hover:bg-[#00e65c] transition-all"
          >
            <Plus size={15} />
            Nouveau devis
          </button>
        </div>
      </div>

      <div className="flex items-center gap-2 overflow-x-auto pb-1">
        <button className="rounded-full bg-[#0F172A] px-4 py-2 text-[11px] font-black text-white shadow-sm">
          Tous · 12
        </button>
        {["Brouillons · 3", "Envoyés · 5", "Acceptés · 3", "Refusés · 1"].map((filter) => (
          <button
            key={filter}
            onClick={() => toast(`Filtre : ${filter}`)}
            className="whitespace-nowrap rounded-full border border-slate-200 bg-white px-4 py-2 text-[11px] font-bold text-slate-600 hover:border-slate-300 hover:text-slate-900 transition-colors shadow-sm"
          >
            {filter}
          </button>
        ))}
        <button
          onClick={() => toast("Filtres avancés")}
          className="ml-auto rounded-full border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 shadow-sm"
        >
          <Filter size={14} />
        </button>
      </div>

      <div className="card-shadow overflow-hidden rounded-[22px] bg-white border border-slate-100">
        <div className="hidden grid-cols-[1.1fr_1.4fr_.75fr_.8fr_.7fr_24px] gap-4 border-b border-slate-100 bg-slate-50/70 px-6 py-3.5 text-[10px] font-black uppercase tracking-wider text-slate-500 md:grid">
          <span>Numéro</span>
          <span>Client</span>
          <span>Date d'émission</span>
          <span>Montant TTC</span>
          <span>Statut</span>
          <span />
        </div>
        <div className="divide-y divide-slate-100">
          {quotes.map((quote) => (
            <button
              key={quote.id}
              onClick={() => setSection("detail")}
              className="grid w-full gap-3 px-6 py-4 text-left transition-colors hover:bg-slate-50/80 md:grid-cols-[1.1fr_1.4fr_.75fr_.8fr_.7fr_24px] md:items-center md:gap-4"
            >
              <span className="font-display text-[13px] font-black text-slate-900">{quote.id}</span>
              <span className="flex items-center gap-2.5 text-[13px] font-black text-slate-900">
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-slate-100 font-display text-[10px] font-black text-slate-800">
                  {quote.initials}
                </span>
                {quote.client}
              </span>
              <span className="text-[12px] font-medium text-slate-500">{quote.date}</span>
              <span className="font-display text-[14px] font-black text-slate-900">{quote.amount}</span>
              <span>
                <StatusPill status={quote.status} tone={quote.tone} />
              </span>
              <ChevronRight size={16} className="text-slate-400" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminSection() {
  const { role, setRole } = useAuth();

  if (role === "lambda") {
    return (
      <div className="space-y-6">
        <div className="card-shadow rounded-[24px] bg-white p-8 sm:p-10 border border-[#e5ebe7]">
          <div className="max-w-[620px]">
            <div className="flex items-center gap-2 text-[#00D254]">
              <Lock size={20} />
              <span className="text-[11px] font-extrabold uppercase tracking-[0.2em]">
                Accès restreint par l'administrateur
              </span>
            </div>
            <h2 className="mt-5 font-display text-[30px] font-bold text-[#0F172A]">
              Espace réservé à l'administrateur
            </h2>
            <p className="mt-4 text-[13px] leading-6 text-[#637684]">
              En tant qu'<strong>Utilisateur lambda</strong>, vous n'avez pas accès à la gestion des imports bruts, à la configuration du modèle de devis ni à la gestion des membres de l'entreprise.
            </p>
            <div className="mt-6 rounded-[16px] bg-[#f4f6f4] p-4 text-[12px] text-[#526570] space-y-2">
              <p className="font-extrabold text-[#0F172A]">Ce que l'administrateur fait pour vous :</p>
              <ul className="list-disc list-inside space-y-1 text-[11px]">
                <li>Création de votre accès utilisateur et attribution des permissions.</li>
                <li>Import initial de la base clients et du catalogue produits.</li>
                <li>Personnalisation du modèle de devis (Logo, couleurs, CGV).</li>
              </ul>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                onClick={() => {
                  setRole("admin");
                  toast("Basculé temporairement en profil Administrateur !");
                }}
                className="btn-action inline-flex items-center gap-2 rounded-full bg-[#00D254] px-5 py-3 text-[12px] font-extrabold text-[#0F172A]"
              >
                <ShieldCheck size={16} />
                Passer en profil Administrateur (Test)
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="rounded-[24px] bg-[#0F172A] p-6 text-white sm:p-8">
        <div className="max-w-[600px]">
          <div className="flex items-center gap-2 text-[#00D254]">
            <ShieldCheck size={17} />
            <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">Espace administrateur</span>
          </div>
          <h2 className="mt-5 font-display text-[29px] font-bold leading-tight tracking-[-0.04em]">
            Préparez les données. Gardez le contrôle.
          </h2>
          <p className="mt-3 max-w-[520px] text-[13px] leading-6 text-white/55">
            Importez des clients ou des produits, contrôlez les doublons et gardez une trace de chaque opération.
          </p>
          <button
            onClick={() => toast("Ouverture de l’assistant d’import")}
            className="btn-action mt-6 inline-flex items-center gap-2 rounded-full bg-[#00D254] px-4 py-3 text-[11px] font-extrabold text-[#0F172A]"
          >
            <Upload size={14} />
            Démarrer un import
          </button>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          <div className="rounded-[15px] border border-white/10 bg-white/[.06] p-4">
            <p className="text-[10px] font-bold text-white/40">Dernier import</p>
            <p className="mt-3 font-display text-xl font-bold">Aujourd’hui</p>
            <p className="mt-1 text-[10px] text-white/45">24 clients ajoutés</p>
          </div>
          <div className="rounded-[15px] border border-white/10 bg-white/[.06] p-4">
            <p className="text-[10px] font-bold text-white/40">Produits actifs</p>
            <p className="mt-3 font-display text-xl font-bold">118</p>
            <p className="mt-1 text-[10px] text-white/45">+ 12 ce mois</p>
          </div>
          <div className="rounded-[15px] border border-white/10 bg-white/[.06] p-4">
            <p className="text-[10px] font-bold text-white/40">Erreurs à traiter</p>
            <p className="mt-3 font-display text-xl font-bold text-[#00D254]">03</p>
            <p className="mt-1 text-[10px] text-white/45">Dans le dernier fichier</p>
          </div>
        </div>
      </div>
      <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
        <div className="card-shadow overflow-hidden rounded-[22px] bg-white">
          <div className="flex items-center justify-between border-b border-[#eef1ef] px-5 py-4">
            <div>
              <h2 className="font-display text-[17px] font-bold text-[#0F172A]">Historique des imports</h2>
              <p className="mt-1 text-[11px] text-[#8a989e]">Les opérations récentes.</p>
            </div>
            <button onClick={() => toast("Historique complet")} className="rounded-full p-2 text-[#829198] hover:bg-[#f1f4f1]">
              <MoreHorizontal size={17} />
            </button>
          </div>
          {[
            { date: "23 août 2026", file: "clients_été.xlsx", type: "Clients", lines: "24 lignes", ok: true },
            { date: "19 août 2026", file: "catalogue_v3.csv", type: "Produits", lines: "118 lignes", ok: true },
            { date: "12 août 2026", file: "anciens_clients.csv", type: "Clients", lines: "03 erreurs", ok: false },
          ].map((item) => (
            <div key={item.file} className="flex items-center gap-3 border-b border-[#eef1ef] px-5 py-4 last:border-0">
              <div
                className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${
                  item.ok ? "bg-[#e9f5ef] text-[#00D254]" : "bg-[#fcecea] text-[#00D254]"
                }`}
              >
                <Upload size={15} />
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[12px] font-extrabold text-[#0F172A]">{item.file}</p>
                <p className="mt-1 text-[10px] text-[#8a989e]">
                  {item.date} · {item.type}
                </p>
              </div>
              <span className={`text-[10px] font-extrabold ${item.ok ? "text-[#00D254]" : "text-[#00D254]"}`}>
                {item.lines}
              </span>
            </div>
          ))}
        </div>
        <div className="overflow-hidden rounded-[22px] bg-[#f1f4f1] p-2">
          <img src={QUOTE_VISUAL} alt="Aperçu d'un devis Naboth" className="h-full min-h-[260px] w-full rounded-[17px] object-cover" />
          <div className="-mt-16 relative rounded-[16px] bg-white/90 p-4 backdrop-blur-md">
            <div className="flex items-center gap-2">
              <FileCheck2 size={15} className="text-[#00D254]" />
              <span className="text-[11px] font-extrabold text-[#0F172A]">Contrôle des données</span>
            </div>
            <p className="mt-2 text-[11px] leading-5 text-[#6d7e85]">
              Un import documenté, c’est un catalogue qui reste fiable.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function MobileNav({ section, setSection, close }: { section: string; setSection: (v: string) => void; close: () => void }) { const items = [{ key: "dashboard", label: "Vue d’ensemble", icon: LayoutDashboard }, { key: "devis", label: "Mes devis", icon: FileText }, { key: "clients", label: "Clients", icon: Users }, { key: "produits", label: "Produits", icon: Package }, { key: "admin", label: "Import & réglages", icon: ShieldCheck }]; return <div className="fixed inset-0 z-40 bg-[#0F172A]/30 backdrop-blur-sm lg:hidden"><div className="h-full w-[280px] bg-[#f7f8f5] px-5 py-6 shadow-2xl"><div className="flex items-center justify-between"><Brand /><button onClick={close} className="rounded-full p-2 text-[#0F172A] hover:bg-white"><X size={18} /></button></div><nav className="mt-12 space-y-1">{items.map(({ key, label, icon: Icon }) => <button key={key} onClick={() => { setSection(key); close(); }} className={`flex w-full items-center gap-3 rounded-[13px] px-3 py-3 text-left text-[13px] font-extrabold ${section === key ? "bg-[#0F172A] text-white" : "text-[#667985] hover:bg-white"}`}><Icon size={17} />{label}</button>)}</nav></div></div>; }

export function AppPage() {
  const [, setLocation] = useLocation();
  const path = window.location.pathname;
  const initialSection = path === "/admin" ? "admin" : path.split("/")[2] || "dashboard";
  const [section, setSectionState] = useState(initialSection === "nouveau" ? "new" : initialSection);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCustomizerOpen, setIsCustomizerOpen] = useState(false);

  const setSection = (value: string) => {
    setSectionState(value);
    setLocation(value === "admin" ? "/admin" : `/app/${value}`);
  };

  return (
    <div className="min-h-screen bg-[#fbfaf7] text-[#0F172A]">
      <Sidebar section={section} setSection={setSection} />
      {mobileOpen && <MobileNav section={section} setSection={setSection} close={() => setMobileOpen(false)} />}
      <div className="lg:pl-[248px]">
        <AppTopbar
          section={section}
          onMenu={() => setMobileOpen(true)}
          onOpenCustomizer={() => setIsCustomizerOpen(true)}
        />
        <FlowTrail active={section === "admin" || section === "import" ? "prepare" : section === "new" || section === "devis" ? "devis" : "prepare"} />
        <main className="mx-auto max-w-[1500px] px-5 py-6 sm:px-8 lg:px-10 lg:py-8">
          {section === "dashboard" && <Dashboard section={section} setSection={setSection} />}
          {section === "clients" && <ClientsSection />}
          {section === "produits" && <ProductsSection />}
          {section === "devis" && <QuotesSection setSection={setSection} />}
          {section === "admin" && <AdminSection />}
          {section === "utilisateurs" && <UsersPage />}
          {section === "modele-devis" && <QuoteTemplatePage />}
          {section === "import" && <ImportPage />}
          {section === "reglages" && <SettingsPage />}
          {section === "new" && <NewQuoteSection setSection={setSection} />}
          {section === "detail" && <QuoteDetailPage />}
        </main>
      </div>

      <ThemeCustomizerModal
        isOpen={isCustomizerOpen}
        onClose={() => setIsCustomizerOpen(false)}
      />
    </div>
  );
}

export function NewQuoteSection({ setSection }: { setSection?: (v: string) => void }) {
  const [, setLocation] = useLocation();
  const [lines, setLines] = useState([
    { name: "Pack identité visuelle", qty: 1, price: 1200 },
    { name: "Site vitrine essentiel", qty: 1, price: 2450 },
  ]);
  const total = useMemo(() => lines.reduce((sum, line) => sum + line.qty * line.price, 0), [lines]);
  const addLine = () => setLines([...lines, { name: "Nouvel article", qty: 1, price: 0 }]);
  const updateQty = (index: number, delta: number) =>
    setLines(lines.map((line, i) => (i === index ? { ...line, qty: Math.max(1, line.qty + delta) } : line)));
  const removeLine = (index: number) => setLines(lines.filter((_, i) => i !== index));

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.22em] text-[#00D254]">Nouveau devis</p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-0.05em] sm:text-[40px]">
            Une proposition claire, prête à partir.
          </h1>
          <p className="mt-2 text-[13px] text-[#7c8b91]">
            Complétez les informations essentielles, puis choisissez votre canal d’envoi.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => (setSection ? setSection("devis") : setLocation("/app/devis"))}
            className="rounded-full border border-[#dfe6e1] bg-white px-4 py-2.5 text-[11px] font-extrabold text-[#0F172A] shadow-sm hover:bg-[#fbfaf7]"
          >
            Annuler
          </button>
          <button
            onClick={() => toast("Brouillon enregistré localement.")}
            className="rounded-full bg-[#0F172A] px-4 py-2.5 text-[11px] font-extrabold text-white"
          >
            Enregistrer
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="space-y-5">
          <div className="card-shadow rounded-[22px] bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef1ef] pb-5">
              <div>
                <h2 className="font-display text-[18px] font-bold">Informations client</h2>
                <p className="mt-1 text-[11px] text-[#8a989e]">À qui cette proposition est-elle destinée ?</p>
              </div>
              <Users size={19} className="text-[#77A9C9]" />
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <label className="sm:col-span-2">
                <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7f9096]">Client</span>
                <div className="flex items-center gap-3 rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#00D254] font-display text-[10px] font-bold text-[#0F172A]">AK</span>
                  <select className="w-full bg-transparent text-[12px] font-bold outline-none">
                    <option>Atelier Kora</option>
                    <option>Maison Naya</option>
                    <option>Studio Baobab</option>
                  </select>
                  <ChevronDown size={14} className="text-[#86959b]" />
                </div>
              </label>
              <label>
                <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7f9096]">Date du devis</span>
                <input defaultValue="23/08/2026" className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]" />
              </label>
              <label>
                <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#7f9096]">Valable jusqu’au</span>
                <input defaultValue="22/09/2026" className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]" />
              </label>
            </div>
          </div>

          <div className="card-shadow rounded-[22px] bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef1ef] pb-5">
              <div>
                <h2 className="font-display text-[18px] font-bold">Articles et prestations</h2>
                <p className="mt-1 text-[11px] text-[#8a989e]">Ajoutez ce que vous proposez.</p>
              </div>
              <button onClick={addLine} className="inline-flex items-center gap-2 rounded-full bg-[#fff7df] px-3 py-2 text-[10px] font-extrabold text-[#00D254]">
                <Plus size={14} />
                Ajouter une ligne
              </button>
            </div>
            <div className="mt-4 hidden grid-cols-[1.5fr_.45fr_.7fr_.7fr_24px] gap-3 px-1 text-[10px] font-extrabold uppercase tracking-[0.1em] text-[#9aa7ab] sm:grid">
              <span>Désignation</span>
              <span>Qté</span>
              <span>Prix unitaire</span>
              <span>Total</span>
              <span />
            </div>
            <div className="divide-y divide-[#eef1ef]">
              {lines.map((line, index) => (
                <div key={`${line.name}-${index}`} className="grid gap-3 py-4 sm:grid-cols-[1.5fr_.45fr_.7fr_.7fr_24px] sm:items-center">
                  <div>
                    <input value={line.name} onChange={(e) => setLines(lines.map((item, i) => (i === index ? { ...item, name: e.target.value } : item)))} className="w-full bg-transparent text-[12px] font-extrabold text-[#0F172A] outline-none" />
                    <span className="mt-1 block text-[10px] text-[#9aa7ab] sm:hidden">Ligne {index + 1}</span>
                  </div>
                  <div className="flex items-center justify-between rounded-[10px] border border-[#e5ebe7] px-2 py-1 text-[12px] font-bold sm:justify-center">
                    <button onClick={() => updateQty(index, -1)} className="p-1 text-[#8a989e] hover:text-[#0F172A]">−</button>
                    <span className="px-2">{line.qty}</span>
                    <button onClick={() => updateQty(index, 1)} className="p-1 text-[#8a989e] hover:text-[#0F172A]">+</button>
                  </div>
                  <div className="text-[12px] font-bold text-[#526875]">{line.price.toLocaleString("fr-FR")} €</div>
                  <div className="font-display text-[13px] font-bold text-[#0F172A]">{(line.qty * line.price).toLocaleString("fr-FR")} €</div>
                  <button onClick={() => removeLine(index)} className="rounded-full p-1 text-[#a7b1b3] hover:bg-[#fcecea] hover:text-[#00D254]">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
            <button onClick={addLine} className="mt-2 inline-flex items-center gap-2 text-[11px] font-extrabold text-[#0F172A]">
              <Plus size={14} className="text-[#00D254]" />
              Ajouter un article
            </button>
          </div>

          <div className="card-shadow rounded-[22px] bg-white p-5 sm:p-7">
            <div className="flex items-center justify-between border-b border-[#eef1ef] pb-5">
              <div>
                <h2 className="font-display text-[18px] font-bold">Conditions</h2>
                <p className="mt-1 text-[11px] text-[#8a989e]">Une note pour accompagner votre proposition.</p>
              </div>
              <ClipboardList size={19} className="text-[#00D254]" />
            </div>
            <textarea placeholder="Ex. : règlement à 30 jours, démarrage après validation..." className="mt-5 min-h-[100px] w-full resize-none rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] p-3 text-[12px] font-semibold outline-none placeholder:text-[#a2afb2] focus:border-[#00D254]" />
          </div>
        </div>

        <aside className="space-y-5">
          <div className="card-shadow overflow-hidden rounded-[22px] bg-[#0F172A] text-white">
            <div className="border-b border-white/10 p-5 sm:p-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-white/45">Résumé</span>
                <span className="rounded-full bg-[#00D254] px-2.5 py-1 text-[10px] font-extrabold text-[#0F172A]">Brouillon</span>
              </div>
              <p className="mt-6 text-[11px] text-white/48">Total proposé</p>
              <p className="mt-1 font-display text-[39px] font-bold tracking-[-0.06em]">
                {total.toLocaleString("fr-FR")} <span className="text-[20px]">€</span>
              </p>
            </div>
            <div className="space-y-3 p-5 text-[11px] sm:p-6">
              <div className="flex justify-between text-white/55">
                <span>Sous-total</span>
                <span className="font-bold text-white">{total.toLocaleString("fr-FR")} €</span>
              </div>
              <div className="flex justify-between text-white/55">
                <span>TVA</span>
                <span className="font-bold text-white">Non incluse</span>
              </div>
              <div className="flex justify-between border-t border-white/10 pt-3 font-bold text-[#00D254]">
                <span>Total TTC</span>
                <span>{total.toLocaleString("fr-FR")} €</span>
              </div>
            </div>
          </div>

          <div className="card-shadow rounded-[22px] bg-white p-5">
            <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#8a989e]">Prêt à envoyer ?</p>
            <p className="mt-3 text-[12px] leading-5 text-[#6e8088]">
              Le client recevra un lien sécurisé pour consulter et répondre.
            </p>
            <div className="mt-5 space-y-2">
              <button onClick={() => toast("Prévisualisation du devis ouverte.")} className="flex w-full items-center justify-center gap-2 rounded-full border border-[#dfe7e2] bg-white py-3 text-[11px] font-extrabold text-[#0F172A] hover:bg-[#f7f9f7]">
                <Eye size={15} />
                Prévisualiser
              </button>
              <button onClick={() => toast("Le devis est prêt à être envoyé par e-mail ou WhatsApp.")} className="btn-action flex w-full items-center justify-center gap-2 rounded-full bg-[#00D254] py-3 text-[11px] font-extrabold text-[#0F172A]">
                <Send size={15} />
                Envoyer le devis
              </button>
            </div>
            <div className="mt-5 flex items-start gap-2 border-t border-[#eef1ef] pt-4 text-[10px] leading-4 text-[#8a989e]">
              <ShieldCheck size={14} className="mt-0.5 shrink-0 text-[#00D254]" />
              Lien client unique, révocable et protégé.
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export function NewQuotePage() {
  return <AppPage />;
}

export default function Home() {
  return <Landing />;
}
