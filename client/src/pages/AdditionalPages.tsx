/*
 * Direction artistique — Flux en mouvement
 * Écrans complémentaires : les décisions, les contrôles et les états restent lisibles,
 * avec le vert émeraude et le bleu ciel réservé aux actions qui font avancer un devis.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { 
  AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Building, Building2, Check, CheckCheck, 
  CheckCircle2, ChevronRight, ClipboardCheck, Copy, Crown, Download, Eye, FileCheck2, FileText, 
  Globe, GripVertical, KeyRound, Lock, Mail, MessageCircle, MoreHorizontal, Palette, Send, Shield, ShieldCheck, 
  Sparkles, Upload, UserCheck, UserRound, Users, X, Zap 
} from "lucide-react";
import { Brand, FlowTrail } from "./Home";
import { useAuth } from "../contexts/AuthContext";
import { useCharter, PRESET_THEMES, CustomTheme } from "../contexts/CharterContext";

const navy = "#0F172A";
const yellow = "#00D254";

function PageShell({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`min-h-screen ${light ? "bg-[#f3f5f2]" : "bg-[#fbfaf7]"} text-[#0F172A]`}><header className="flex items-center justify-between border-b border-[#e3e9e6] bg-[#fbfaf7] px-5 py-4 sm:px-8 lg:px-12"><Brand /><Link href="/app/dashboard" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-extrabold text-[#71828a] hover:bg-white hover:text-[#0F172A]"><ArrowLeft size={15} /> Retour à l’espace</Link></header>{children}</div>;
}

export function AuthPage() {
  const [, setLocation] = useLocation();
  const { setUserProfile } = useAuth();
  const { setCharterType } = useCharter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      toast("Veuillez saisir votre adresse e-mail professionnelle.");
      return;
    }
    const isNaboth = email.toLowerCase().includes("naboth");
    const isAdmin = email.toLowerCase().includes("admin") || email.toLowerCase().includes("yasee") || isNaboth;

    if (isNaboth) {
      setUserProfile({
        name: "Jean Naboth",
        email: email || "contact@naboth.corp",
        role: "admin",
        company: "Naboth SARL",
        isNabothUser: true,
      });
      setCharterType("naboth");
      toast.success("Connexion réussie : Charte Graphique Client Naboth active");
    } else if (isAdmin) {
      setUserProfile({
        name: "Aïcha Mbaye",
        email: email || "admin@yasee-it.com",
        role: "admin",
        company: "Yasee IT",
        isNabothUser: false,
      });
      setCharterType("yasee");
      toast.success("Connexion réussie : Espace Administrateur Yasee IT actif");
    } else {
      setUserProfile({
        name: "Moussa Diop",
        email: email || "moussa@atelierkora.fr",
        role: "lambda",
        company: "Atelier Kora",
        isNabothUser: false,
      });
      toast.info("Connexion réussie : Espace Collaborateur Client actif");
    }
    setLocation("/app/dashboard");
  };

  const quickDemoLogin = (profile: "yasee_admin" | "naboth" | "lambda") => {
    if (profile === "naboth") {
      setEmail("contact@naboth.corp");
      setPassword("password123");
      setUserProfile({
        name: "Jean Naboth",
        email: "contact@naboth.corp",
        role: "admin",
        company: "Naboth SARL",
        isNabothUser: true,
      });
      setCharterType("naboth");
      toast.success("Session démo Naboth : Charte Client Naboth appliquée !");
      setLocation("/app/dashboard");
    } else if (profile === "yasee_admin") {
      setEmail("admin@yasee-it.com");
      setPassword("password123");
      setUserProfile({
        name: "Aïcha Mbaye",
        email: "admin@yasee-it.com",
        role: "admin",
        company: "Yasee IT",
        isNabothUser: false,
      });
      setCharterType("yasee");
      toast.success("Session démo Yasee IT : Thème Standard Fast Devis appliqué !");
      setLocation("/app/dashboard");
    } else {
      setEmail("moussa@atelierkora.fr");
      setPassword("password123");
      setUserProfile({
        name: "Moussa Diop",
        email: "moussa@atelierkora.fr",
        role: "lambda",
        company: "Atelier Kora",
        isNabothUser: false,
      });
      toast.info("Session démo Collaborateur Client chargée.");
      setLocation("/app/dashboard");
    }
  };

  return (
    <PageShell>
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1200px] items-center gap-10 px-5 py-10 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
        <div className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#00D254]/30 bg-[#00D254]/10 px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#00D254]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#00D254]" /> Fast Devis — par Yasee IT
          </span>
          <h1 className="mt-7 max-w-[460px] font-display text-[54px] font-bold leading-[.98] tracking-[-.06em]">
            Vos devis avec la charte de votre marque.
          </h1>
          <p className="mt-6 max-w-[390px] text-[14px] leading-6 text-[#71828a]">
            Connectez-vous avec votre compte d'entreprise pour retrouver automatiquement vos couleurs, vos clients et vos modèles.
          </p>
          <div className="mt-12 flex items-center gap-3 text-[11px] font-extrabold text-[#71828a]">
            <ShieldCheck size={16} className="text-[#00D254]" /> Multi-tenancy & Charte dynamique
          </div>
        </div>

        <div className="mx-auto w-full max-w-[490px] rounded-[28px] bg-white p-6 shadow-[0_18px_55px_rgba(17,42,70,.1)] sm:p-9">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00D254]">Fast Devis</p>
              <h2 className="mt-2 font-display text-[28px] font-bold tracking-[-.05em]">Ravi de vous revoir</h2>
              <p className="mt-1 text-[12px] text-[#849399]">Accédez directement à vos devis et dossiers.</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#00D254]/15 text-[#00D254]">
              <UserRound size={22} />
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-7 space-y-4">
            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Adresse e-mail professionnelle
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ex: contact@naboth.corp ou vous@yasee-it.com"
                className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
              />
            </label>

            <label className="block">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">Mot de passe</span>
                <button
                  type="button"
                  onClick={() => toast("Un lien de récupération a été préparé.")}
                  className="text-[10px] font-bold text-[#637684] hover:underline"
                >
                  Mot de passe oublié ?
                </button>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
              />
            </label>

            <button
              type="submit"
              className="btn-action mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#00D254] py-3.5 text-[12px] font-black text-slate-950 hover:bg-[#00e65c]"
            >
              Se connecter à mon espace <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Simulation with Charter Switch */}
          <div className="mt-7 rounded-[18px] border border-[#edf1ee] bg-[#f9faf8] p-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Zap size={14} className="text-[#00D254]" />
                <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#78888f]">
                  Démonstration & Chartes Clients
                </span>
              </div>
            </div>
            <p className="text-[11px] text-[#71828a] mb-3">
              Cliquez ci-dessous pour tester l'activation instantanée des chartes :
            </p>

            <div className="space-y-2">
              {/* Naboth Client Login Button */}
              <button
                type="button"
                onClick={() => quickDemoLogin("naboth")}
                className="flex w-full items-center justify-between rounded-[12px] border border-[#00D254]/40 bg-[#0F172A] p-3 text-left transition-all hover:scale-[1.01] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00D254] font-display text-[10px] font-black text-[#0F172A]">
                    N
                  </div>
                  <div>
                    <span className="block text-[11px] font-black text-white">Compte Utilisateur Naboth</span>
                    <span className="block text-[9px] font-bold text-[#00D254]">🟢 Active automatiquement la Charte Naboth</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#00D254]" />
              </button>

              {/* Yasee IT Admin Login Button */}
              <button
                type="button"
                onClick={() => quickDemoLogin("yasee_admin")}
                className="flex w-full items-center justify-between rounded-[12px] border border-[#00D254]/40 bg-[#0F172A] p-3 text-left transition-all hover:scale-[1.01] shadow-sm"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#00D254] font-display text-[10px] font-black text-slate-950">
                    Y
                  </div>
                  <div>
                    <span className="block text-[11px] font-black text-white">Compte Admin Yasee IT</span>
                    <span className="block text-[9px] font-bold text-[#00D254]">⚡ Standard Fast Devis (Vert/Bleu)</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-[#00D254]" />
              </button>

              {/* Standard Collaborator Login Button */}
              <button
                type="button"
                onClick={() => quickDemoLogin("lambda")}
                className="flex w-full items-center justify-between rounded-[12px] border border-slate-200 bg-white p-2.5 text-left transition-all hover:border-slate-400"
              >
                <div className="flex items-center gap-2.5">
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-200 text-[10px] font-bold text-slate-700">
                    MD
                  </div>
                  <div>
                    <span className="block text-[11px] font-bold text-slate-800">Collaborateur (Atelier Kora)</span>
                    <span className="block text-[9px] font-medium text-slate-500">Profil opérationnel client</span>
                  </div>
                </div>
                <ArrowRight size={14} className="text-slate-400" />
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-[#91a0a5]">
            Nouveau sur Fast Devis ?{" "}
            <Link href="/inscription" className="font-extrabold text-[#0F172A] underline decoration-[#00D254] decoration-2 underline-offset-2">
              Simuler le parcours d'inscription
            </Link>
          </p>
        </div>
      </main>
    </PageShell>
  );
}

export function ClientQuotePage() {
  const [decision, setDecision] = useState<"none" | "accepted" | "refused">("none");
  return <PageShell light><main className="mx-auto max-w-[960px] px-5 py-8 sm:px-8 lg:py-12"><div className="mx-auto max-w-[740px] text-center"><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#637684] shadow-sm"><ShieldCheck size={13} className="text-[#00D254]" /> Document sécurisé</span><h1 className="mt-6 font-display text-[39px] font-bold tracking-[-.06em] sm:text-[55px]">Une proposition pour <span className="text-[#00D254]">Atelier Kora.</span></h1><p className="mt-4 text-[14px] leading-6 text-[#71828a]">Bonjour, voici le devis préparé par Yasee IT. Prenez le temps de le consulter puis indiquez votre décision.</p></div><div className="mx-auto mt-10 max-w-[720px] overflow-hidden rounded-[26px] bg-white shadow-[0_18px_55px_rgba(15,23,42,.1)]"><div className="flex items-start justify-between bg-[#0F172A] p-6 text-white sm:p-8"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/45">Devis</p><p className="mt-3 font-display text-[25px] font-bold">DV-2026-018</p><p className="mt-1 text-[11px] text-white/50">Émis le 23 août 2026 · valable jusqu’au 22 septembre</p></div><FileCheck2 size={25} className="text-[#00D254]" /></div><div className="p-6 sm:p-8"><div className="grid gap-5 border-b border-[#eef1ef] pb-7 sm:grid-cols-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Émetteur</p><p className="mt-2 text-[12px] font-extrabold">Yasee IT</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Destinataire</p><p className="mt-2 text-[12px] font-extrabold">Atelier Kora</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Total</p><p className="mt-2 font-display text-[20px] font-bold">4 850 €</p></div></div><div className="mt-7 divide-y divide-[#eef1ef]">{[{name:"Pack identité visuelle", detail:"Direction artistique et kit de marque", price:"1 200 €"},{name:"Site vitrine essentiel", detail:"Conception, intégration et mise en ligne", price:"2 450 €"},{name:"Accompagnement lancement", detail:"Deux ateliers de suivi", price:"1 200 €"}].map((line) => <div key={line.name} className="flex items-center justify-between gap-4 py-4"><div><p className="text-[12px] font-extrabold">{line.name}</p><p className="mt-1 text-[11px] text-[#87969d]">{line.detail}</p></div><span className="font-display text-[13px] font-bold">{line.price}</span></div>)}</div><div className="mt-6 flex items-center justify-between border-t border-[#0F172A] pt-5"><span className="text-[12px] font-extrabold">Total proposé</span><span className="font-display text-[26px] font-bold">4 850 €</span></div>{decision === "none" ? <div className="mt-8 grid gap-3 sm:grid-cols-2"><button onClick={() => setDecision("refused")} className="flex items-center justify-center gap-2 rounded-full border border-[#e1e7e4] py-3.5 text-[12px] font-extrabold text-[#00D254] hover:bg-[#fcecea]"><X size={15} />Refuser la proposition</button><button onClick={() => setDecision("accepted")} className="btn-action flex items-center justify-center gap-2 rounded-full bg-[#00D254] py-3.5 text-[12px] font-extrabold text-slate-950"><Check size={15} />Accepter le devis</button></div> : <div className={`mt-8 rounded-[16px] p-4 text-center ${decision === "accepted" ? "bg-[#e9f5ef] text-[#00D254]" : "bg-[#fcecea] text-[#00D254]"}`}><div className="flex items-center justify-center gap-2 text-[12px] font-extrabold">{decision === "accepted" ? <CheckCircle2 size={16} /> : <X size={16} />}{decision === "accepted" ? "Merci, votre acceptation a bien été enregistrée." : "Votre refus a bien été enregistré."}</div><p className="mt-2 text-[11px] opacity-75">Yasee IT a été informée de votre décision.</p></div>}</div></div><p className="mt-7 text-center text-[10px] font-bold text-[#95a1a4]">Lien personnel · Ne pas transférer ce document</p></main></PageShell>;
}

export function QuoteDetailPage() {
  const [, setLocation] = useLocation();
  const [copied, setCopied] = useState(false);

  const clientShareUrl = `${window.location.origin}/client/devis/DV-2026-018`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(clientShareUrl);
    setCopied(true);
    toast.success("Lien client sécurisé copié dans le presse-papier !");
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="space-y-6">
      {/* Top Breadcrumb & Actions Bar */}
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <button
            onClick={() => setLocation("/app/devis")}
            className="group inline-flex items-center gap-2 text-[12px] font-bold text-slate-500 hover:text-slate-900 transition-colors mb-2"
          >
            <ArrowLeft size={14} className="transition-transform group-hover:-translate-x-1" />
            Retour à la liste des devis
          </button>
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="font-display text-[28px] font-black tracking-tight text-slate-900 sm:text-[34px]">
              Devis DV-2026-018
            </h1>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200/80 px-3 py-1 text-[11px] font-extrabold text-emerald-800">
              <span className="h-2 w-2 rounded-full bg-[#00D254]" />
              Envoyé · En attente décision
            </span>
          </div>
          <p className="mt-1 text-[12px] text-slate-500 font-medium">
            Destinataire : <strong className="text-slate-800">Atelier Kora</strong> · Émis le 23 août 2026 (Valable 30 jours)
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            href="/client/devis/DV-2026-018"
            target="_blank"
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <Eye size={15} className="text-slate-700" />
            Vue client directe
          </Link>
          <button
            onClick={() => toast.success("Téléchargement du PDF en cours...")}
            className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-[12px] font-black text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-300 transition-all"
          >
            <FileText size={15} className="text-slate-700" />
            PDF
          </button>
          <button
            onClick={() => toast.success("Relance automatique envoyée par e-mail au client !")}
            className="btn-action inline-flex items-center gap-2 rounded-full bg-[#00D254] px-5 py-2.5 text-[12px] font-black text-slate-950 shadow-md hover:bg-[#00e65c] transition-all"
          >
            <Send size={15} />
            Relancer le client
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
        {/* Left Column: Official Quote Details */}
        <div className="space-y-6">
          {/* Client Destination Card */}
          <div className="card-shadow rounded-[22px] bg-white p-6 border border-slate-100">
            <div className="flex items-start justify-between border-b border-slate-100 pb-5">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#00D254] font-display text-[14px] font-black text-slate-950 shadow-sm">
                  AK
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="font-display text-[18px] font-bold text-slate-900">Atelier Kora</h2>
                    <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600">Client Pro</span>
                  </div>
                  <p className="text-[12px] text-slate-500 font-medium mt-0.5">contact@atelierkora.fr · +33 1 42 68 55 00</p>
                </div>
              </div>
              <button onClick={() => toast("Fiche client")} className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-slate-700">
                <MoreHorizontal size={18} />
              </button>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-[12px] sm:grid-cols-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Date d'émission</span>
                <p className="font-bold text-slate-800 mt-0.5">23 août 2026</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Validité</span>
                <p className="font-bold text-slate-800 mt-0.5">30 jours (22 sept.)</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Mode de règlement</span>
                <p className="font-bold text-slate-800 mt-0.5">Virement bancaire</p>
              </div>
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Émetteur</span>
                <p className="font-bold text-slate-800 mt-0.5">Yasee IT</p>
              </div>
            </div>
          </div>

          {/* Line Items Table */}
          <div className="card-shadow overflow-hidden rounded-[22px] bg-white border border-slate-100">
            <div className="border-b border-slate-100 px-6 py-4">
              <h2 className="font-display text-[17px] font-bold text-slate-900">Prestations & Lignes du devis</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-[12px]">
                <thead className="border-b border-slate-100 bg-slate-50/70 text-[10px] font-black uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="px-6 py-3">Description</th>
                    <th className="px-4 py-3 text-center">Qté</th>
                    <th className="px-4 py-3 text-right">Prix Unitaire</th>
                    <th className="px-6 py-3 text-right">Total HT</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {[
                    {
                      name: "Pack identité visuelle & Logo",
                      detail: "Création charte graphique complète, kit typographique et déclinaisons.",
                      qty: 1,
                      unit: "1 200,00 €",
                      total: "1 200,00 €",
                    },
                    {
                      name: "Site vitrine essentiel sur-mesure",
                      detail: "Conception UX/UI, développement responsive et mise en ligne sécurisée.",
                      qty: 1,
                      unit: "2 450,00 €",
                      total: "2 450,00 €",
                    },
                    {
                      name: "Accompagnement & Lancement",
                      detail: "2 sessions d'ateliers de prise en main et support technique prioritaire.",
                      qty: 1,
                      unit: "1 200,00 €",
                      total: "1 200,00 €",
                    },
                  ].map((row, idx) => (
                    <tr key={idx} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-4">
                        <p className="font-black text-slate-900">{row.name}</p>
                        <p className="text-[11px] text-slate-500 mt-0.5">{row.detail}</p>
                      </td>
                      <td className="px-4 py-4 text-center font-bold text-slate-700">{row.qty}</td>
                      <td className="px-4 py-4 text-right font-bold text-slate-700">{row.unit}</td>
                      <td className="px-6 py-4 text-right font-black text-slate-900">{row.total}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Financial Summary */}
            <div className="border-t border-slate-100 bg-slate-50/40 p-6">
              <div className="ml-auto max-w-[280px] space-y-2">
                <div className="flex justify-between text-[12px] text-slate-600 font-bold">
                  <span>Sous-total HT</span>
                  <span>4 041,67 €</span>
                </div>
                <div className="flex justify-between text-[12px] text-slate-600 font-bold">
                  <span>TVA (20%)</span>
                  <span>808,33 €</span>
                </div>
                <div className="flex justify-between border-t border-slate-200 pt-2.5">
                  <span className="font-black text-slate-900 text-[14px]">Total TTC</span>
                  <strong className="font-display text-[26px] font-black text-slate-900 leading-none">
                    4 850,00 €
                  </strong>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Share Link, Timeline & Actions */}
        <div className="space-y-6">
          {/* Public Share Link Card */}
          <div className="card-shadow rounded-[22px] bg-white p-6 border border-slate-100">
            <div className="flex items-center gap-2 text-slate-900 font-black text-[13px] mb-2">
              <Globe size={16} className="text-[#00D254]" />
              Lien de consultation client
            </div>
            <p className="text-[11px] text-slate-500 font-medium mb-3">
              Ce lien unique permet au client d'accepter ou signer ce devis sans créer de compte.
            </p>
            <div className="flex items-center gap-2">
              <input
                readOnly
                value={clientShareUrl}
                className="w-full truncate rounded-[12px] border border-slate-200 bg-slate-50 px-3 py-2 text-[11px] font-mono text-slate-700 outline-none"
              />
              <button
                onClick={handleCopyLink}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-[12px] bg-slate-900 px-3.5 py-2 text-[11px] font-black text-white hover:bg-slate-800 transition-colors shadow-sm"
              >
                {copied ? <Check size={14} className="text-[#00D254]" /> : <Copy size={14} />}
                {copied ? "Copié" : "Copier"}
              </button>
            </div>
          </div>

          {/* Timeline Tracking */}
          <div className="card-shadow rounded-[22px] bg-[#0F172A] p-6 text-white shadow-lg">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-[#00D254]">
                Suivi d'activité en direct
              </p>
              <span className="flex items-center gap-1.5 text-[10px] font-bold text-white/60">
                <span className="h-2 w-2 rounded-full bg-[#00D254] animate-pulse" />
                Synchronisé
              </span>
            </div>
            <div className="mt-5 space-y-0">
              {[
                { label: "Brouillon composé", date: "23 août 2026 à 09:42", done: true },
                { label: "Envoyé par e-mail", date: "23 août 2026 à 10:24", done: true },
                { label: "Consulté par le client", date: "23 août 2026 à 11:15", done: true },
                { label: "Décision / Signature client", date: "En attente de réponse", done: false },
              ].map((event, i) => (
                <div key={event.label} className="relative flex gap-3 pb-6 last:pb-0">
                  <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 border border-white/20">
                    {event.done ? <Check size={12} className="text-[#00D254] font-black" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/30" />}
                  </div>
                  {i < 3 && <span className="absolute left-3 top-6 h-full w-px bg-white/10" />}
                  <div>
                    <p className={`text-[12px] font-black ${event.done ? "text-white" : "text-white/40"}`}>
                      {event.label}
                    </p>
                    <p className="mt-0.5 text-[10px] text-white/50">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Channels */}
          <div className="card-shadow rounded-[22px] bg-white p-6 border border-slate-100">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-slate-400 mb-4">
              Canaux d'envoi & Partage
            </p>
            <div className="space-y-2.5">
              <button
                onClick={() => toast.success("Ouverture de votre client e-mail...")}
                className="flex w-full items-center gap-3 rounded-[14px] border border-slate-200 p-3.5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-slate-100 text-slate-800">
                  <Mail size={16} />
                </span>
                <div>
                  <span className="block text-[12px] font-black text-slate-900">E-mail officiel</span>
                  <span className="block text-[10px] text-slate-500">Envoyé à contact@atelierkora.fr</span>
                </div>
                <ChevronRight size={15} className="ml-auto text-slate-400" />
              </button>

              <button
                onClick={() => toast.success("Préparation du message WhatsApp...")}
                className="flex w-full items-center gap-3 rounded-[14px] border border-slate-200 p-3.5 text-left hover:bg-slate-50 transition-colors"
              >
                <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <MessageCircle size={16} />
                </span>
                <div>
                  <span className="block text-[12px] font-black text-slate-900">WhatsApp direct</span>
                  <span className="block text-[10px] text-slate-500">Partager le lien sécurisé</span>
                </div>
                <ChevronRight size={15} className="ml-auto text-slate-400" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
function SendIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  );
}

export function ImportPage() {
  const [type, setType] = useState("Clients");
  const [uploaded, setUploaded] = useState(false);
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#00D254]">
            Assistant d’import
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Injectez vos données sans perdre le contrôle.
          </h1>
          <p className="mt-2 text-[13px] text-[#829198]">
            Importez des clients ou produits, prévisualisez les lignes puis confirmez.
          </p>
        </div>
        <button
          onClick={() => toast("Modèle CSV téléchargé")}
          className="inline-flex items-center gap-2 rounded-full border border-[#dfe7e2] bg-white px-4 py-3 text-[11px] font-extrabold text-[#0F172A] shadow-sm hover:bg-[#fbfaf7]"
        >
          <FileText size={14} />
          Télécharger un modèle
        </button>
      </div>

      <div className="mt-8 grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="card-shadow rounded-[22px] bg-white p-6">
          <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
            1. Type de données
          </p>
          <div className="mt-5 space-y-2">
            {["Clients", "Produits"].map((item) => (
              <button
                key={item}
                onClick={() => setType(item)}
                className={`flex w-full items-center justify-between rounded-[14px] border p-4 text-left transition-all ${
                  type === item ? "border-[#00D254] bg-[#fff7df]" : "border-[#e6ece8] bg-white hover:border-[#cfdad5]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${
                      item === "Clients" ? "bg-[#f1f5f9] text-[#0F172A]" : "bg-[#e9f5ef] text-[#00D254]"
                    }`}
                  >
                    {item === "Clients" ? <UserRound size={15} /> : <ClipboardCheck size={15} />}
                  </span>
                  <span className="text-[12px] font-extrabold">{item}</span>
                </span>
                {type === item && <CheckCircle2 size={16} className="text-[#00D254]" />}
              </button>
            ))}
          </div>
          <div className="mt-8 border-t border-[#eef1ef] pt-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
              2. Règle des doublons
            </p>
            <select className="mt-4 w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none">
              <option>Signaler et ne pas écraser</option>
              <option>Mettre à jour la fiche existante</option>
              <option>Créer une nouvelle fiche</option>
            </select>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
              3. Déposer le fichier
            </p>
            <button
              onClick={() => setUploaded(true)}
              className={`mt-5 flex min-h-[220px] w-full flex-col items-center justify-center rounded-[20px] border-2 border-dashed transition-all ${
                uploaded ? "border-[#00D254] bg-[#e9f5ef]" : "border-[#cfdad5] bg-[#fbfcfa] hover:border-[#00D254] hover:bg-[#fffaf0]"
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-[17px] ${
                  uploaded ? "bg-white text-[#00D254]" : "bg-[#fff7df] text-[#00D254]"
                }`}
              >
                {uploaded ? <CheckCircle2 size={24} /> : <Upload size={24} />}
              </span>
              <span className="mt-4 text-[13px] font-extrabold text-[#0F172A]">
                {uploaded ? `${type.toLowerCase()}_aout.xlsx prêt à analyser` : "Glissez votre fichier ici"}
              </span>
              <span className="mt-2 text-[11px] text-[#8a989e]">CSV ou XLSX · 10 Mo maximum</span>
            </button>
          </div>

          {uploaded && (
            <div className="card-shadow rounded-[22px] bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#00D254]">
                    4. Prévisualisation
                  </p>
                  <h2 className="mt-2 font-display text-[19px] font-bold text-[#0F172A]">24 lignes détectées</h2>
                </div>
                <span className="rounded-full bg-[#e9f5ef] px-3 py-1.5 text-[10px] font-extrabold text-[#00D254]">
                  22 valides · 2 à vérifier
                </span>
              </div>
              <div className="mt-5 overflow-hidden rounded-[14px] border border-[#e8edeb]">
                <div className="grid grid-cols-3 gap-3 bg-[#f5f7f5] px-4 py-3 text-[9px] font-extrabold uppercase tracking-[.1em] text-[#98a4a7]">
                  <span>Nom</span>
                  <span>E-mail</span>
                  <span>État</span>
                </div>
                {["Atelier Kora", "Maison Naya", "Studio Baobab"].map((name, i) => (
                  <div key={name} className="grid grid-cols-3 gap-3 border-t border-[#eef1ef] px-4 py-3 text-[10px]">
                    <span className="font-extrabold text-[#0F172A]">{name}</span>
                    <span className="truncate text-[#87969d]">
                      contact@{name.toLowerCase().replaceAll(" ", "")}.fr
                    </span>
                    <span className={`font-extrabold ${i === 2 ? "text-[#00D254]" : "text-[#00D254]"}`}>
                      {i === 2 ? "À vérifier" : "Valide"}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast(`${type} importés avec succès dans la démonstration.`)}
                className="btn-action mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#00D254] py-3 text-[11px] font-extrabold text-[#0F172A]"
              >
                <Zap size={14} />
                Confirmer l’import
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export function SettingsPage() {
  const { theme, updateTheme, applyPreset } = useCharter();
  const { user, setUserProfile } = useAuth();

  const [activeTab, setActiveTab] = useState<"identity" | "colors" | "users" | "notifications">("identity");

  const [companyName, setCompanyName] = useState(theme.companyName || user.company || "Mon Entreprise");
  const [email, setEmail] = useState(user.email || "contact@mon-entreprise.com");
  const [phone, setPhone] = useState("+33 1 84 80 20 26");
  const [address, setAddress] = useState("12 rue de l'Innovation, 75001 Paris");
  
  const [primaryColor, setPrimaryColor] = useState(theme.primaryColor || "#00D254");
  const [secondaryColor, setSecondaryColor] = useState(theme.secondaryColor || "#0F172A");
  const [darkColor, setDarkColor] = useState(theme.darkColor || "#0F172A");
  const [logoName, setLogoName] = useState("Logo officiel.png");
  const [logoPreview, setLogoPreview] = useState<string | null>(theme.logoUrl || null);
  
  const [saved, setSaved] = useState(false);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLogoName(file.name);
      const url = URL.createObjectURL(file);
      setLogoPreview(url);
      setSaved(false);
    }
  };

  const handleSave = () => {
    updateTheme({
      primaryColor,
      secondaryColor,
      darkColor,
      accentColor: primaryColor,
      companyName,
      logoUrl: logoPreview || undefined,
    });
    setUserProfile({ role: user.role, company: companyName });
    setSaved(true);
    toast.success("Votre logo, vos coordonnées et la charte de votre dashboard ont été enregistrés !");
  };

  const tabs = [
    { key: "identity", label: "Identité & Logo", icon: Building },
    { key: "colors", label: "Couleurs Dashboard", icon: Palette },
    { key: "users", label: "Utilisateurs", icon: Users },
    { key: "notifications", label: "Notifications", icon: Mail },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#00D254]">
            Réglages
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Paramètres de votre espace entreprise
          </h1>
          <p className="mt-2 text-[13px] text-[#829198]">
            Configurez votre identité visuelle, vos couleurs de travail et vos préférences.
          </p>
        </div>
        <button
          onClick={handleSave}
          className="btn-action rounded-full bg-[#00D254] px-6 py-3 text-[12px] font-black text-slate-950 shadow-md hover:bg-[#00e65c] transition-all"
        >
          <Check size={16} className="inline mr-1.5" />
          Enregistrer les changements
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        {/* Left Tabs Menu & Live Preview */}
        <div className="space-y-4">
          <div className="card-shadow h-fit rounded-[20px] bg-white p-2.5 space-y-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.key;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key as any)}
                  className={`flex w-full items-center justify-between rounded-[12px] px-3.5 py-3 text-left text-[12px] font-extrabold transition-all ${
                    isActive
                      ? "bg-[#0F172A] text-white shadow-sm"
                      : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Icon size={16} className={isActive ? "text-white" : "text-slate-400"} />
                    <span>{tab.label}</span>
                  </div>
                  {isActive && <ChevronRight size={14} className="text-white/80" />}
                </button>
              );
            })}
          </div>

          {/* Live Preview Card */}
          <div className="card-shadow rounded-[20px] bg-white p-5 border border-slate-100">
            <p className="text-[10px] font-extrabold uppercase tracking-[.14em] text-slate-400 mb-3">
              Aperçu en direct sur votre dashboard
            </p>
            <div className="rounded-[16px] p-4 text-white shadow-md transition-all bg-[#0F172A]">
              <div className="flex items-center gap-3">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo" className="h-9 w-9 rounded-lg object-contain bg-white p-1 border" />
                ) : (
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg font-black text-xs text-slate-950 shadow-sm bg-[#00D254]">
                    {companyName.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-display font-bold text-sm leading-none">{companyName}</p>
                  <span className="text-[9px] opacity-75">Marque active sur le dashboard</span>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <span className="rounded-full bg-[#00D254] px-3 py-1 text-[10px] font-black text-slate-950 shadow-sm">
                  Bouton Principal
                </span>
                <span className="rounded-full px-3 py-1 text-[10px] font-bold text-white border border-white/20">
                  Badge Étape
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Active Tab Content */}
        <div className="space-y-6">
          {/* TAB 1: IDENTITÉ & LOGO */}
          {activeTab === "identity" && (
            <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#eef1ef] pb-6">
                <div>
                  <h2 className="font-display text-[20px] font-bold text-[#0F172A]">Identité & Logo de l'entreprise</h2>
                  <p className="mt-1 text-[11px] text-[#8a989e]">Ce logo et ces coordonnées s'afficheront sur le dashboard et vos devis.</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-slate-100 text-slate-800">
                  <Building size={18} />
                </span>
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                    Logo officiel
                  </span>
                  <div className="flex items-center gap-4">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-[16px] border border-dashed border-slate-300 bg-slate-50 overflow-hidden">
                      {logoPreview ? (
                        <img src={logoPreview} alt="Logo" className="h-full w-full object-contain p-1" />
                      ) : (
                        <Building size={24} className="text-slate-400" />
                      )}
                    </div>
                    <label className="flex-1 cursor-pointer rounded-[14px] border border-dashed border-slate-300 bg-slate-50/50 p-4 text-center hover:bg-slate-100 transition-colors">
                      <Upload size={18} className="mx-auto text-slate-700 mb-1" />
                      <span className="block text-[11px] font-black text-slate-800">{logoName}</span>
                      <span className="block text-[9px] text-slate-500">PNG, JPG, SVG acceptés</span>
                      <input type="file" accept="image/*" className="hidden" onChange={handleLogoUpload} />
                    </label>
                  </div>
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                    Nom de l’entreprise
                  </span>
                  <input
                    value={companyName}
                    onChange={(e) => { setCompanyName(e.target.value); setSaved(false); }}
                    placeholder="ex: Mon Entreprise SARL"
                    className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-slate-800"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                    E-mail professionnel
                  </span>
                  <input
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setSaved(false); }}
                    className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-slate-800"
                  />
                </label>

                <label>
                  <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                    Téléphone
                  </span>
                  <input
                    value={phone}
                    onChange={(e) => { setPhone(e.target.value); setSaved(false); }}
                    className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-slate-800"
                  />
                </label>

                <label className="sm:col-span-2">
                  <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                    Adresse du siège
                  </span>
                  <input
                    value={address}
                    onChange={(e) => { setAddress(e.target.value); setSaved(false); }}
                    className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-slate-800"
                  />
                </label>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#eef1ef] pt-6">
                <span className={`text-[11px] font-extrabold ${saved ? "text-[#00D254]" : "text-[#a0abad]"}`}>
                  {saved ? "Modifications enregistrées" : "Modifications non enregistrées"}
                </span>
                <button
                  onClick={handleSave}
                  className="btn-action rounded-full bg-[#00D254] px-6 py-3 text-[12px] font-black text-slate-950 shadow-md hover:bg-[#00e65c]"
                >
                  <Check size={16} className="inline mr-1.5" />
                  Enregistrer mon identité
                </button>
              </div>
            </div>
          )}

          {/* TAB 2: COULEURS DASHBOARD */}
          {activeTab === "colors" && (
            <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#eef1ef] pb-6">
                <div>
                  <h2 className="font-display text-[20px] font-bold text-[#0F172A]">Personnalisation des Couleurs du Dashboard</h2>
                  <p className="mt-1 text-[11px] text-[#8a989e]">Choisissez les teintes appliquées sur vos menus, boutons et devis.</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-slate-100 text-slate-800">
                  <Palette size={18} />
                </span>
              </div>

              <div className="mt-6 space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <label className="flex flex-col gap-2 rounded-[14px] border border-slate-200 p-3.5 bg-slate-50">
                    <span className="text-[10px] font-black uppercase text-slate-600">Couleur Principale (Boutons CTA)</span>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => { setPrimaryColor(e.target.value); setSaved(false); }}
                        className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
                      />
                      <span className="text-[12px] font-mono font-bold text-slate-800">{primaryColor}</span>
                    </div>
                  </label>

                  <label className="flex flex-col gap-2 rounded-[14px] border border-slate-200 p-3.5 bg-slate-50">
                    <span className="text-[10px] font-black uppercase text-slate-600">Couleur Secondaire</span>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={secondaryColor}
                        onChange={(e) => { setSecondaryColor(e.target.value); setSaved(false); }}
                        className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
                      />
                      <span className="text-[12px] font-mono font-bold text-slate-800">{secondaryColor}</span>
                    </div>
                  </label>

                  <label className="flex flex-col gap-2 rounded-[14px] border border-slate-200 p-3.5 bg-slate-50">
                    <span className="text-[10px] font-black uppercase text-slate-600">Fond Sombre (Sidebar / Header)</span>
                    <div className="flex items-center gap-2.5">
                      <input
                        type="color"
                        value={darkColor}
                        onChange={(e) => { setDarkColor(e.target.value); setSaved(false); }}
                        className="h-9 w-12 cursor-pointer rounded-lg border-0 bg-transparent"
                      />
                      <span className="text-[12px] font-mono font-bold text-slate-800">{darkColor}</span>
                    </div>
                  </label>
                </div>

                {/* Quick Theme Presets */}
                <div>
                  <span className="mb-2.5 block text-[10px] font-extrabold uppercase tracking-[.1em] text-slate-400">
                    Palettes de couleurs en 1 clic
                  </span>
                  <div className="flex flex-wrap gap-2.5">
                    {(Object.entries(PRESET_THEMES) as [string, CustomTheme][]).map(([key, preset]) => (
                      <button
                        key={key}
                        type="button"
                        onClick={() => {
                          applyPreset(key as any);
                          setPrimaryColor(preset.primaryColor);
                          setSecondaryColor(preset.secondaryColor);
                          setDarkColor(preset.darkColor);
                          setSaved(false);
                          toast.success(`Palette "${preset.presetName}" chargée !`);
                        }}
                        className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-3.5 py-2 text-[11px] font-extrabold text-slate-700 hover:border-slate-400 shadow-sm"
                      >
                        <span className="h-3.5 w-3.5 rounded-full border" style={{ backgroundColor: preset.primaryColor }} />
                        {preset.presetName}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center justify-between border-t border-[#eef1ef] pt-6">
                <span className={`text-[11px] font-extrabold ${saved ? "text-[#00D254]" : "text-[#a0abad]"}`}>
                  {saved ? "Modifications enregistrées" : "Modifications non enregistrées"}
                </span>
                <button
                  onClick={handleSave}
                  className="btn-action rounded-full bg-[#00D254] px-6 py-3 text-[12px] font-black text-slate-950 shadow-md hover:bg-[#00e65c]"
                >
                  <Check size={16} className="inline mr-1.5" />
                  Appliquer les couleurs à mon Dashboard
                </button>
              </div>
            </div>
          )}

          {/* TAB 3: UTILISATEURS */}
          {activeTab === "users" && (
            <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#eef1ef] pb-6">
                <div>
                  <h2 className="font-display text-[20px] font-bold text-[#0F172A]">Membres de l'équipe & Rôles</h2>
                  <p className="mt-1 text-[11px] text-[#8a989e]">Contrôlez les accès administrateurs et collaborateurs de votre entreprise.</p>
                </div>
                <button onClick={() => toast("Invitation envoyée")} className="btn-action rounded-full px-4 py-2 text-[11px] font-black text-slate-950 shadow-sm" style={{ backgroundColor: primaryColor }}>
                  + Inviter un membre
                </button>
              </div>

              <div className="mt-6 divide-y divide-slate-100">
                {[
                  { name: user.name, email: user.email, role: user.role === "admin" ? "Administrateur principal" : "Opérationnel", status: "Actif" },
                  { name: "Moussa Diop", email: "moussa@entreprise.com", role: "Collaborateur commercial", status: "Actif" },
                  { name: "Fatou Fall", email: "fatou@entreprise.com", role: "Assistante administrative", status: "Invité" },
                ].map((member, i) => (
                  <div key={i} className="flex items-center justify-between py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-full font-bold text-xs bg-slate-100 text-slate-800">
                        {member.name.split(" ").map(n => n[0]).join("")}
                      </div>
                      <div>
                        <p className="text-[12px] font-extrabold text-slate-900">{member.name}</p>
                        <p className="text-[10px] text-slate-400">{member.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-slate-100 px-3 py-1 text-[10px] font-bold text-slate-700">
                        {member.role}
                      </span>
                      <span className="rounded-full bg-emerald-50 text-emerald-700 px-2.5 py-0.5 text-[9px] font-black">
                        {member.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: NOTIFICATIONS */}
          {activeTab === "notifications" && (
            <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
              <div className="flex items-center justify-between border-b border-[#eef1ef] pb-6">
                <div>
                  <h2 className="font-display text-[20px] font-bold text-[#0F172A]">Notifications & Relances automatiques</h2>
                  <p className="mt-1 text-[11px] text-[#8a989e]">Soyez informé en direct de l'activité de vos clients sur vos devis.</p>
                </div>
                <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-slate-100 text-slate-800">
                  <Mail size={18} />
                </span>
              </div>

              <div className="mt-6 space-y-4">
                {[
                  { title: "Ouverture d'un devis", desc: "Recevoir un e-mail dès qu'un client consulte votre lien de devis." },
                  { title: "Devis accepté", desc: "Notification prioritaire et confirmation de signature électronique." },
                  { title: "Relance automatique J+7", desc: "Envoyer automatiquement une relance polie après 7 jours sans réponse." },
                  { title: "Rapport hebdomadaire", desc: "Résumé chiffré des propositions envoyées et acceptées chaque lundi." },
                ].map((item, i) => (
                  <label key={i} className="flex items-start justify-between p-3.5 rounded-[14px] border border-slate-100 hover:bg-slate-50 cursor-pointer">
                    <div>
                      <p className="text-[12px] font-extrabold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-500">{item.desc}</p>
                    </div>
                    <input type="checkbox" defaultChecked={i < 3} className="h-4 w-4 rounded accent-slate-900" />
                  </label>
                ))}
              </div>

              <div className="mt-8 flex justify-end border-t border-[#eef1ef] pt-6">
                <button
                  onClick={() => toast.success("Préférences de notifications enregistrées !")}
                  className="btn-action rounded-full px-6 py-3 text-[11px] font-black text-slate-950 shadow-sm"
                  style={{ backgroundColor: primaryColor }}
                >
                  <Check size={14} className="inline mr-1" />
                  Enregistrer les préférences
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


export function RegisterPage() {
  const [, setLocation] = useLocation();
  const { setUserProfile } = useAuth();
  
  // Registration Mode : Admin (Créateur d'entreprise) vs User (Collaborateur invité)
  const [mode, setMode] = useState<"admin" | "lambda">("admin");
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Admin form fields
  const [company, setCompany] = useState("");
  const [activity, setActivity] = useState("Services professionnels & Conseil");
  const [currency, setCurrency] = useState("€ EUR");
  const [adminName, setAdminName] = useState("");
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [firstCollaborator, setFirstCollaborator] = useState("");

  // User / Collaborateur form fields
  const [inviteCode, setInviteCode] = useState("KORA-INV-2026");
  const [invitedCompany, setInvitedCompany] = useState("Atelier Kora");
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userRoleTitle, setUserRoleTitle] = useState("Chargé d'affaires / Devis");
  const [userPassword, setUserPassword] = useState("");

  // 1-Click Simulation Fillers
  const fillSimulationAdmin = () => {
    setMode("admin");
    setCompany("Atelier Kora");
    setActivity("Artisanat & Création");
    setCurrency("€ EUR");
    setAdminName("Aïcha Mbaye");
    setAdminEmail("aicha@atelierkora.fr");
    setAdminPassword("MotDePasseAdmin2026!");
    setFirstCollaborator("moussa@atelierkora.fr");
    setStep(2);
    toast("✨ Simulation Admin pré-remplie (Atelier Kora · Aïcha Mbaye)");
  };

  const fillSimulationUser = () => {
    setMode("lambda");
    setInviteCode("KORA-INV-2026");
    setInvitedCompany("Atelier Kora");
    setUserName("Moussa Diop");
    setUserEmail("moussa@atelierkora.fr");
    setUserRoleTitle("Commercial & Suivi de devis");
    setUserPassword("MotDePasseUser2026!");
    setStep(2);
    toast("👤 Simulation Collaborateur (User) pré-remplie (Invitation Atelier Kora)");
  };

  const submitAdmin = () => {
    if (step === 1) {
      if (!company.trim()) {
        toast("Veuillez renseigner le nom de votre entreprise.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!adminName.trim() || !adminEmail.trim() || !adminPassword.trim()) {
        toast("Veuillez remplir votre nom, e-mail et mot de passe.");
        return;
      }
      setStep(3);
      return;
    }
    // Final Step 3
    setUserProfile({
      name: adminName || "Aïcha Mbaye",
      email: adminEmail || "aicha@atelierkora.fr",
      company: company || "Atelier Kora",
      role: "admin",
    });
    toast(`✨ Entreprise « ${company || "Atelier Kora"} » créée ! Bienvenue Administrateur.`);
    setLocation("/app/dashboard");
  };

  const submitUser = () => {
    if (step === 1) {
      if (!inviteCode.trim()) {
        toast("Veuillez saisir un code d'invitation valide.");
        return;
      }
      setStep(2);
      return;
    }
    if (step === 2) {
      if (!userName.trim() || !userEmail.trim() || !userPassword.trim()) {
        toast("Veuillez renseigner votre nom, e-mail professionnel et mot de passe.");
        return;
      }
      setStep(3);
      return;
    }
    // Final Step 3
    setUserProfile({
      name: userName || "Moussa Diop",
      email: userEmail || "moussa@atelierkora.fr",
      company: invitedCompany || "Atelier Kora",
      role: "lambda",
    });
    toast(`🎉 Bienvenue dans l'équipe ${invitedCompany || "Atelier Kora"} ! Espace collaborateur actif.`);
    setLocation("/app/dashboard");
  };

  return (
    <PageShell>
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1240px] items-center gap-10 px-5 py-10 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
        {/* Left Editorial Panel */}
        <div className="hidden lg:block">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#dce4e7] bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#637684]">
              <span className="h-1.5 w-1.5 rounded-full bg-[#00D254]" />
              Simulation · Parcours {mode === "admin" ? "Administrateur" : "Utilisateur (User)"}
            </span>
            <span className="rounded-full bg-[#eef3f0] px-3 py-1.5 text-[10px] font-extrabold text-[#00D254]">
              Étape {step} sur 3
            </span>
          </div>

          <h1 className="mt-7 max-w-[490px] font-display text-[50px] font-bold leading-[1] tracking-[-0.06em] text-[#0F172A]">
            {mode === "admin"
              ? "Créez votre entreprise et pilotez vos devis."
              : "Rejoignez votre équipe et préparez vos propositions."}
          </h1>

          <p className="mt-6 max-w-[420px] text-[14px] leading-6 text-[#71828a]">
            {mode === "admin"
              ? "En tant qu'administrateur, vous définissez les modèles de devis, gérez l'équipe et importez votre catalogue clients et produits."
              : "En tant que collaborateur, vous accédez directement aux fiches clients et aux devis opérationnels préparés pour votre activité."}
          </p>

          {/* Dynamic Privileges Card */}
          <div className="mt-10 max-w-[420px] rounded-[22px] border border-[#e5ebe7] bg-white p-5 shadow-sm">
            <div className="flex items-center gap-3">
              <span className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${mode === "admin" ? "bg-[#0F172A] text-[#00D254]" : "bg-[#00D254] text-[#0F172A]"}`}>
                {mode === "admin" ? <Crown size={18} /> : <UserCheck size={18} />}
              </span>
              <div>
                <p className="text-[12px] font-extrabold text-[#0F172A]">
                  {mode === "admin" ? "Droits Super-Administrateur" : "Droits Collaborateur Opérationnel"}
                </p>
                <p className="text-[10px] font-bold text-[#829198]">
                  {mode === "admin" ? "Contrôle global & Réglages" : "Gestion courante des devis"}
                </p>
              </div>
            </div>

            <div className="mt-4 space-y-2 text-[11px] text-[#556973]">
              {mode === "admin" ? (
                <>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Création & envoi illimité de devis
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Import de fichiers CSV/Excel & Catalogue
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Invitation et gestion des utilisateurs
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Personnalisation du modèle de devis
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Création et suivi de vos devis clients
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#00D254]" /> Accès au catalogue produits partagé
                  </div>
                  <div className="flex items-center gap-2 font-medium text-[#84959c]">
                    <Lock size={12} className="text-[#99a6ab]" /> Réglages entreprise gérés par l'admin
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Right Interactive Form Box */}
        <div className="mx-auto w-full max-w-[530px] rounded-[30px] bg-white p-6 shadow-[0_20px_60px_rgba(17,42,70,.1)] sm:p-9">
          
          {/* Quick Simulation One-Click Buttons */}
          <div className="mb-6 rounded-[20px] bg-[#f8faf8] border border-[#e8eee9] p-3.5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#71828a]">
                <Zap size={13} className="text-[#00D254]" />
                Simulateur de parcours en 1 clic
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillSimulationAdmin}
                className={`flex items-center justify-center gap-2 rounded-[13px] border px-3 py-2 text-[11px] font-extrabold transition-all ${
                  mode === "admin"
                    ? "border-[#0F172A] bg-[#0F172A] text-white shadow-sm"
                    : "border-[#dce4e0] bg-white text-[#0F172A] hover:border-[#0F172A]"
                }`}
              >
                <Crown size={13} />
                Parcours Admin
              </button>
              <button
                type="button"
                onClick={fillSimulationUser}
                className={`flex items-center justify-center gap-2 rounded-[13px] border px-3 py-2 text-[11px] font-extrabold transition-all ${
                  mode === "lambda"
                    ? "border-[#00D254] bg-[#00D254] text-[#0F172A] shadow-sm"
                    : "border-[#dce4e0] bg-white text-[#0F172A] hover:border-[#00D254]"
                }`}
              >
                <Users size={13} />
                Parcours User (Invité)
              </button>
            </div>
          </div>

          {/* Stepper Progress Bar */}
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#00D254]">
                {mode === "admin" ? "Inscription Entreprise · Administrateur" : "Invitation Équipe · Collaborateur"}
              </p>
              <h2 className="mt-2 font-display text-[26px] font-bold tracking-[-0.04em] text-[#0F172A]">
                {mode === "admin"
                  ? step === 1
                    ? "Votre entreprise"
                    : step === 2
                    ? "Compte Administrateur"
                    : "Finalisation & Accès"
                  : step === 1
                  ? "Code d'invitation"
                  : step === 2
                  ? "Identité Collaborateur"
                  : "Confirmation des droits"}
              </h2>
            </div>
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#fff7df] text-[#00D254]">
              {mode === "admin" ? <Crown size={20} /> : <UserRound size={20} />}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-1.5">
            <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#00D254]" : "bg-[#e8eeea]"}`} />
            <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#00D254]" : "bg-[#e8eeea]"}`} />
            <span className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-[#00D254]" : "bg-[#e8eeea]"}`} />
          </div>

          {/* ======================= ADMIN FLOW ======================= */}
          {mode === "admin" && (
            <div className="mt-6">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Nom de l’entreprise
                    </span>
                    <div className="relative">
                      <input
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        placeholder="Ex. : Atelier Kora"
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] pl-10 pr-3 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                      />
                      <Building2 size={16} className="absolute left-3.5 top-3.5 text-[#9ab0b8]" />
                    </div>
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                        Secteur d'activité
                      </span>
                      <select
                        value={activity}
                        onChange={(e) => setActivity(e.target.value)}
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#00D254]"
                      >
                        <option>Services & Conseil</option>
                        <option>Artisanat & Création</option>
                        <option>Commerce & Négoce</option>
                        <option>Agence digitale / Tech</option>
                        <option>BTP & Travaux</option>
                      </select>
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                        Devise principale
                      </span>
                      <select
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#00D254]"
                      >
                        <option>€ EUR (Euro)</option>
                        <option>$ USD (Dollar)</option>
                        <option>FCFA (Franc CFA)</option>
                        <option>£ GBP (Livre)</option>
                      </select>
                    </label>
                  </div>

                  <div className="rounded-[14px] bg-[#f4f7f5] p-3.5 text-[11px] text-[#61747e] leading-5">
                    <span className="font-extrabold text-[#0F172A]">Rôle attribué à l'issue de la création :</span>
                    <p className="mt-0.5">Super-Administrateur avec gestion illimitée des modèles, imports et utilisateurs.</p>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Votre Nom & Prénom (Administrateur)
                    </span>
                    <input
                      value={adminName}
                      onChange={(e) => setAdminName(e.target.value)}
                      placeholder="Ex. : Aïcha Mbaye"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      E-mail professionnel (Identifiant de connexion)
                    </span>
                    <input
                      type="email"
                      value={adminEmail}
                      onChange={(e) => setAdminEmail(e.target.value)}
                      placeholder="aicha@atelierkora.fr"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Mot de passe sécurisé
                    </span>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="8 caractères minimum"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-[16px] border border-[#d6e5dc] bg-[#eef7f2] p-4 text-[12px] text-[#2c614c]">
                    <div className="flex items-center gap-2 font-extrabold">
                      <CheckCircle2 size={16} /> Prêt à activer votre espace « {company || "Atelier Kora"} »
                    </div>
                    <p className="mt-1 text-[11px] text-[#4d7968] leading-5">
                      Administrateur : <strong>{adminName || "Aïcha Mbaye"}</strong> ({adminEmail || "aicha@atelierkora.fr"})
                    </p>
                  </div>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Inviter un premier collaborateur (Optionnel)
                    </span>
                    <input
                      type="email"
                      value={firstCollaborator}
                      onChange={(e) => setFirstCollaborator(e.target.value)}
                      placeholder="moussa@atelierkora.fr"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>

                  <div className="rounded-[14px] bg-[#fffaf0] border border-[#f3e7c8] p-3.5 text-[11px] text-[#856515] leading-5">
                    <span className="font-extrabold text-[#5c440a]">💡 Ce qui vous attend dès l'ouverture :</span>
                    <ul className="mt-1 list-disc list-inside space-y-0.5 text-[10px]">
                      <li>Accès complet au Hub Administrateur</li>
                      <li>Assistant d'import de données clients & produits</li>
                      <li>Éditeur de modèle de devis aux couleurs de votre marque</li>
                    </ul>
                  </div>
                </div>
              )}

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={submitAdmin}
                  className="btn-action flex w-full items-center justify-center gap-2 rounded-full bg-[#00D254] py-3.5 text-[12px] font-extrabold text-[#0F172A]"
                >
                  {step === 1 ? "Continuer vers le profil Admin" : step === 2 ? "Valider les privilèges Admin" : "Créer l'entreprise & Ouvrir l'espace"}
                  <ArrowRight size={15} />
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    className="flex w-full items-center justify-center gap-2 text-[11px] font-extrabold text-[#7f9096] hover:text-[#0F172A]"
                  >
                    <ArrowLeft size={14} /> Retour à l'étape précédente
                  </button>
                )}
              </div>
            </div>
          )}

          {/* ======================= USER / LAMBDA FLOW ======================= */}
          {mode === "lambda" && (
            <div className="mt-6">
              {step === 1 && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Code ou lien d'invitation
                    </span>
                    <div className="relative">
                      <input
                        value={inviteCode}
                        onChange={(e) => setInviteCode(e.target.value)}
                        placeholder="Ex. : KORA-INV-2026"
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] pl-10 pr-3 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                      />
                      <KeyRound size={16} className="absolute left-3.5 top-3.5 text-[#9ab0b8]" />
                    </div>
                  </label>

                  <div className="rounded-[16px] border border-[#dce6e1] bg-[#f2f7f4] p-4 text-[11px] text-[#00D254] leading-5">
                    <div className="flex items-center gap-2 font-extrabold">
                      <BadgeCheck size={16} /> Invitation validée
                    </div>
                    <p className="mt-1 text-[#45695a]">
                      Entreprise : <strong>{invitedCompany}</strong> · Invité par <strong>Aïcha Mbaye (Admin)</strong>
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-[#0F172A]">
                      Rôle assigné : Collaborateur Opérationnel
                    </span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      Votre Nom complet (Collaborateur)
                    </span>
                    <input
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      placeholder="Ex. : Moussa Diop"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>

                  <label className="block">
                    <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                      E-mail professionnel
                    </span>
                    <input
                      type="email"
                      value={userEmail}
                      onChange={(e) => setUserEmail(e.target.value)}
                      placeholder="moussa@atelierkora.fr"
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
                    />
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    <label className="block">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                        Fonction / Métier
                      </span>
                      <input
                        value={userRoleTitle}
                        onChange={(e) => setUserRoleTitle(e.target.value)}
                        placeholder="Commercial"
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#00D254]"
                      />
                    </label>

                    <label className="block">
                      <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                        Mot de passe
                      </span>
                      <input
                        type="password"
                        value={userPassword}
                        onChange={(e) => setUserPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#00D254]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-[16px] border border-[#e2e8e4] bg-[#f8faf8] p-4 text-[12px]">
                    <p className="font-extrabold text-[#0F172A]">Récapitulatif de votre accès collaborateur :</p>
                    <div className="mt-3 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Entreprise rejointe</span>
                        <span className="font-extrabold text-[#0F172A]">{invitedCompany}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Membre</span>
                        <span className="font-extrabold text-[#0F172A]">{userName || "Moussa Diop"}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Identifiant</span>
                        <span className="font-extrabold text-[#0F172A]">{userEmail || "moussa@atelierkora.fr"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#72838c]">Périmètre</span>
                        <span className="rounded-full bg-[#f1f5f9] px-2 py-0.5 text-[9px] font-extrabold text-[#0F172A]">
                          Devis, Clients & Produits
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] bg-[#f4f7f5] p-3 text-[11px] text-[#556973] leading-5">
                    <span className="font-extrabold text-[#0F172A]">Protection des données :</span>
                    <p className="mt-0.5">Les paramètres généraux et modèles légaux restent sous la responsabilité de l'administrateur.</p>
                  </div>
                </div>
              )}

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={submitUser}
                  className="btn-action flex w-full items-center justify-center gap-2 rounded-full bg-[#00D254] py-3.5 text-[12px] font-extrabold text-[#0F172A]"
                >
                  {step === 1 ? "Valider l'invitation" : step === 2 ? "Vérifier mes permissions" : "Rejoindre l'équipe & Accéder aux devis"}
                  <ArrowRight size={15} />
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    className="flex w-full items-center justify-center gap-2 text-[11px] font-extrabold text-[#7f9096] hover:text-[#0F172A]"
                  >
                    <ArrowLeft size={14} /> Retour à l'étape précédente
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] text-[#91a0a5]">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="font-extrabold text-[#0F172A] underline decoration-[#00D254] decoration-2 underline-offset-2">
              Se connecter
            </Link>
          </p>
        </div>
      </main>
    </PageShell>
  );
}


export function UsersPage() {
  const { role, setRole } = useAuth();
  const [showAdd, setShowAdd] = useState(false);
  const [pendingChange, setPendingChange] = useState<string | null>(null);
  const users = [
    { name: "Aïcha Mbaye", email: "aicha@atelierkora.fr", role: "Administrateur", status: "Actif", initials: "AM" },
    { name: "Moussa Diop", email: "moussa@atelierkora.fr", role: "Utilisateur lambda", status: "Actif", initials: "MD" },
    { name: "Nadia Fall", email: "nadia@atelierkora.fr", role: "Utilisateur lambda", status: "Invitation en attente", initials: "NF" },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#00D254]">
            Administration · Accès & Équipe
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Gestion des accès et permissions
          </h1>
          <p className="mt-2 max-w-[560px] text-[13px] leading-6 text-[#829198]">
            L’administrateur contrôle l’espace. L’utilisateur lambda prépare les devis, clients et produits qui lui sont attribués.
          </p>
        </div>
        <button
          onClick={() => setShowAdd(!showAdd)}
          className="btn-action inline-flex items-center justify-center gap-2 rounded-full bg-[#00D254] px-4 py-3 text-[11px] font-extrabold text-[#0F172A]"
        >
          <UserRound size={14} />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <div className="space-y-6">
          <div className="card-shadow rounded-[22px] bg-[#0F172A] p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#00D254] text-[#0F172A]">
                <ShieldCheck size={18} />
              </span>
              <span className="rounded-full bg-white/10 px-3 py-1.5 text-[10px] font-extrabold text-white/70">
                Profil actif
              </span>
            </div>
            <h2 className="mt-5 font-display text-[25px] font-bold">
              {role === "admin" ? "Administrateur" : "Utilisateur lambda"}
            </h2>
            <p className="mt-2 text-[11px] leading-5 text-white/55">
              {role === "admin"
                ? "Accès complet aux réglages, imports, modèles et membres de l’entreprise."
                : "Accès opérationnel aux devis et fiches clients du catalogue."}
            </p>
            <div className="mt-6 grid grid-cols-2 gap-2">
              <button
                onClick={() => setRole("admin")}
                className={`rounded-[13px] px-3 py-3 text-left text-[10px] font-extrabold transition-colors ${
                  role === "admin" ? "bg-white text-[#0F172A]" : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                Administrateur
                <span className="mt-1 block text-[9px] font-bold opacity-60">Tout gérer</span>
              </button>
              <button
                onClick={() => setRole("lambda")}
                className={`rounded-[13px] px-3 py-3 text-left text-[10px] font-extrabold transition-colors ${
                  role === "lambda" ? "bg-white text-[#0F172A]" : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                Utilisateur lambda
                <span className="mt-1 block text-[9px] font-bold opacity-60">Opérations</span>
              </button>
            </div>
          </div>

          <div className="card-shadow rounded-[22px] bg-white p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
              Droits par profil
            </p>
            <div className="mt-5 space-y-3">
              {[
                { label: "Créer et envoyer un devis", admin: true, lambda: true },
                { label: "Gérer les clients et produits", admin: true, lambda: true },
                { label: "Importer des données brutes", admin: true, lambda: false },
                { label: "Modifier le modèle de devis", admin: true, lambda: false },
                { label: "Gérer les utilisateurs & accès", admin: true, lambda: false },
              ].map((item) => {
                const isAllowed = role === "admin" ? item.admin : item.lambda;
                return (
                  <div key={item.label} className="flex items-center justify-between border-b border-[#eef1ef] pb-3 last:border-0 last:pb-0">
                    <span className="text-[11px] font-bold text-[#627580]">{item.label}</span>
                    <span
                      className={`rounded-full px-2 py-1 text-[9px] font-extrabold ${
                        isAllowed ? "bg-[#e9f5ef] text-[#00D254]" : "bg-[#f2f4f2] text-[#adb6b6]"
                      }`}
                    >
                      {isAllowed ? "Autorisé" : "Limité"}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="card-shadow overflow-hidden rounded-[22px] bg-white">
          <div className="flex items-center justify-between border-b border-[#eef1ef] px-5 py-5 sm:px-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
                Membres de l’entreprise
              </p>
              <h2 className="mt-2 font-display text-[20px] font-bold">3 accès configurés</h2>
            </div>
            <span className="rounded-full bg-[#f1f5f9] px-3 py-1.5 text-[10px] font-extrabold text-[#0F172A]">
              Espace Naboth
            </span>
          </div>

          {showAdd && (
            <div className="border-b border-[#eef1ef] bg-[#fffaf0] p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#00D254]">
                Nouvel accès collaborateur
              </p>
              <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
                <input
                  placeholder="Nom complet (ex. Moussa Diop)"
                  className="rounded-[12px] border border-[#e6e2d3] bg-white px-3 py-3 text-[11px] font-bold outline-none"
                />
                <input
                  placeholder="E-mail professionnel"
                  className="rounded-[12px] border border-[#e6e2d3] bg-white px-3 py-3 text-[11px] font-bold outline-none"
                />
                <button
                  onClick={() => {
                    setShowAdd(false);
                    toast("Invitation préparée pour le nouvel utilisateur.");
                  }}
                  className="rounded-[12px] bg-[#0F172A] px-4 py-3 text-[11px] font-extrabold text-white"
                >
                  Inviter
                </button>
              </div>
            </div>
          )}

          <div className="divide-y divide-[#eef1ef]">
            {users.map((user) => (
              <div key={user.email} className="flex flex-col gap-3 px-5 py-5 sm:flex-row sm:items-center sm:px-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#eef2f2] font-display text-[11px] font-bold text-[#4f6572]">
                  {user.initials}
                </span>
                <div className="min-w-0 flex-1">
                  <p className="text-[12px] font-extrabold text-[#0F172A]">{user.name}</p>
                  <p className="mt-1 truncate text-[10px] text-[#8a989e]">{user.email}</p>
                </div>
                <span className="rounded-full bg-[#f2f5f2] px-3 py-1.5 text-[10px] font-extrabold text-[#637684]">
                  {user.role}
                </span>
                <span className={`text-[10px] font-extrabold ${user.status === "Actif" ? "text-[#00D254]" : "text-[#00D254]"}`}>
                  {user.status}
                </span>
                <button onClick={() => setPendingChange(user.name)} className="rounded-full p-2 text-[#8a989e] hover:bg-[#f3f5f2]">
                  <MoreHorizontal size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {pendingChange && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#0F172A]/35 p-5 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="permission-title" className="w-full max-w-[470px] rounded-[24px] bg-white p-6 shadow-[0_24px_80px_rgba(17,42,70,.24)] sm:p-8">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#fff7df] text-[#00D254]">
                <AlertTriangle size={18} />
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#00D254]">
                  Confirmation requise
                </p>
                <h2 id="permission-title" className="mt-2 font-display text-[22px] font-bold">
                  Modifier les accès de {pendingChange} ?
                </h2>
              </div>
            </div>
            <p className="mt-5 text-[12px] leading-6 text-[#637684]">
              Cette modification peut changer les actions disponibles pour cet utilisateur. Le nouveau rôle sera appliqué à ses prochains accès.
            </p>
            <div className="mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
              <button onClick={() => setPendingChange(null)} className="rounded-full border border-[#dfe7e2] px-4 py-3 text-[11px] font-extrabold text-[#637684]">
                Annuler
              </button>
              <button
                onClick={() => {
                  setPendingChange(null);
                  toast(`Les permissions de ${pendingChange} ont été mises à jour.`);
                }}
                className="rounded-full bg-[#0F172A] px-4 py-3 text-[11px] font-extrabold text-white"
              >
                Confirmer la modification
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

const EXAMPLE_TEMPLATES = [
  {
    name: "Minimaliste & Épuré",
    brandColor: "#0F172A",
    accentColor: "#00D254",
    companyName: "Naboth Corporation",
    badge: "SaaS Classique",
  },
  {
    name: "Studio Créatif & Digital",
    brandColor: "#4A154B",
    accentColor: "#007A5A",
    companyName: "Baobab Creative Studio",
    badge: "Design",
  },
  {
    name: "Artisanat & BTP Confiance",
    brandColor: "#1E3A8A",
    accentColor: "#00D254",
    companyName: "BTP Innovation & Construction",
    badge: "Artisan / BTP",
  },
  {
    name: "Cabinet Conseil Premium",
    brandColor: "#0F172A",
    accentColor: "#38BDF8",
    companyName: "Mbaye Conseil & Associés",
    badge: "Finance & Audit",
  },
];

export function QuoteTemplatePage() {
  const { updateTheme, theme } = useCharter();
  const [brandColor, setBrandColor] = useState(theme.primaryColor || "#00D254");
  const [accentColor, setAccentColor] = useState(theme.accentColor || "#0F172A");
  const [companyName, setCompanyName] = useState(theme.companyName || "Mon Entreprise");
  const [logoName, setLogoName] = useState("Logo Officiel");
  const [showTax, setShowTax] = useState(true);
  const [showSignature, setShowSignature] = useState(true);
  const [saved, setSaved] = useState(false);
  const [sections, setSections] = useState(["Informations entreprise", "Client & validité", "Lignes du devis", "Résumé & total", "Signature"]);
  const [draggedSection, setDraggedSection] = useState<string | null>(null);

  const moveSection = (target: string) => {
    if (!draggedSection || draggedSection === target) return;
    const next = [...sections];
    const from = next.indexOf(draggedSection);
    const to = next.indexOf(target);
    next.splice(from, 1);
    next.splice(to, 0, draggedSection);
    setSections(next);
    setDraggedSection(null);
    setSaved(false);
  };

  const handleSave = () => {
    updateTheme({
      primaryColor: brandColor,
      accentColor: accentColor,
      companyName: companyName,
    });
    setSaved(true);
    toast.success("Charte graphique et modèle de devis enregistrés pour votre entreprise !");
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#00D254]">
            Réglages · Modèle de devis & Charte
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Votre devis, vos couleurs.
          </h1>
          <p className="mt-2 text-[13px] text-[#829198]">
            Modifiez le logo, le nom d'entreprise et les couleurs de votre charte graphique ci-dessous.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-2 text-[10px] font-extrabold ${saved ? "bg-[#00D254]/20 text-[#00D254]" : "bg-amber-100 text-amber-800"}`}>
            {saved ? "Modèle enregistré" : "Modifications non enregistrées"}
          </span>
          <button
            onClick={handleSave}
            className="btn-action inline-flex items-center gap-2 rounded-full bg-[#00D254] px-4 py-3 text-[11px] font-black text-slate-950 hover:bg-[#00e65c]"
          >
            <Check size={14} />
            Enregistrer ma charte
          </button>
        </div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[.75fr_1.25fr]">
        <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3 border-b border-[#eef1ef] pb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#fff7df] text-[#00D254]">
              <FileText size={16} />
            </span>
            <div>
              <h2 className="font-display text-[18px] font-bold">Personnaliser le modèle</h2>
              <p className="mt-1 text-[11px] text-[#8a989e]">Ces réglages s’appliqueront aux futurs devis.</p>
            </div>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-[18px] border border-[#e8eee9] bg-[#fffaf0] p-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#00D254]">
                  ⚡ Importer un modèle d'exemple
                </span>
                <span className="text-[9px] font-bold text-[#8a989e]">1-clic pour charger</span>
              </div>
              <div className="mt-3 grid grid-cols-2 gap-2">
                {EXAMPLE_TEMPLATES.map((tmpl) => (
                  <button
                    key={tmpl.name}
                    onClick={() => {
                      setBrandColor(tmpl.brandColor);
                      setAccentColor(tmpl.accentColor);
                      setCompanyName(tmpl.companyName);
                      setSaved(false);
                      toast(`Modèle "${tmpl.name}" chargé !`);
                    }}
                    className="flex flex-col rounded-[12px] border border-[#e6ece8] bg-white p-2.5 text-left transition-all hover:border-[#00D254] hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#0F172A]">{tmpl.name}</span>
                    </div>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tmpl.brandColor }} />
                      <span className="h-3 w-3 rounded-full" style={{ backgroundColor: tmpl.accentColor }} />
                      <span className="text-[9px] font-bold text-[#8a989e] truncate">{tmpl.companyName}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Nom affiché
              </span>
              <input
                value={companyName}
                onChange={(e) => {
                  setCompanyName(e.target.value);
                  setSaved(false);
                }}
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#00D254]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Logo de l’entreprise
              </span>
              <div className="flex items-center gap-2">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-[13px] border border-dashed border-[#cfdad5] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold text-[#637684] hover:border-[#00D254]">
                  <Upload size={14} className="text-[#00D254]" />
                  {logoName}
                  <input
                    type="file"
                    accept="image/png,image/jpeg"
                    className="hidden"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        setLogoName(e.target.files[0].name);
                        setSaved(false);
                      }
                    }}
                  />
                </label>
              </div>
            </label>

            <div>
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Couleurs de marque
              </span>
              <div className="flex items-center gap-3">
                <label className="flex flex-1 items-center gap-2 rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] p-2">
                  <input
                    type="color"
                    value={brandColor}
                    onChange={(e) => {
                      setBrandColor(e.target.value);
                      setSaved(false);
                    }}
                    className="h-8 w-8 cursor-pointer rounded-[8px] border-0 bg-transparent"
                  />
                  <span className="text-[10px] font-extrabold">Bleu principal</span>
                </label>
                <label className="flex flex-1 items-center gap-2 rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] p-2">
                  <input
                    type="color"
                    value={accentColor}
                    onChange={(e) => {
                      setAccentColor(e.target.value);
                      setSaved(false);
                    }}
                    className="h-8 w-8 cursor-pointer rounded-[8px] border-0 bg-transparent"
                  />
                  <span className="text-[10px] font-extrabold">Accent</span>
                </label>
              </div>
            </div>

            <div className="rounded-[16px] border border-[#e8eee9] bg-[#fbfcfa] p-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#829198]">
                  Ordre des sections
                </span>
                <span className="text-[9px] font-bold text-[#a0abad]">Glissez pour réorganiser</span>
              </div>
              <div className="mt-3 space-y-2">
                {sections.map((section) => (
                  <div
                    key={section}
                    draggable
                    onDragStart={() => setDraggedSection(section)}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={() => moveSection(section)}
                    className={`flex cursor-grab items-center gap-2 rounded-[11px] border px-3 py-2.5 text-[10px] font-extrabold transition-all active:cursor-grabbing ${
                      draggedSection === section
                        ? "border-[#00D254] bg-[#fff7df] opacity-60"
                        : "border-[#e6ece8] bg-white text-[#637684] hover:-translate-y-0.5 hover:border-[#cddbd3]"
                    }`}
                  >
                    <GripVertical size={14} className="shrink-0 text-[#a0abad]" />
                    <span className="flex-1">{section}</span>
                    <span className="text-[9px] font-bold text-[#a0abad]">{sections.indexOf(section) + 1}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3">
              <button
                onClick={() => {
                  setShowTax(!showTax);
                  setSaved(false);
                }}
                className="flex w-full items-center justify-between rounded-[13px] bg-[#fbfcfa] p-3 text-left"
              >
                <span>
                  <span className="block text-[11px] font-extrabold">Afficher la TVA</span>
                  <span className="mt-1 block text-[10px] text-[#8a989e]">Afficher le détail fiscal dans le résumé.</span>
                </span>
                <span className={`h-6 w-10 rounded-full p-1 transition-colors ${showTax ? "bg-[#00D254]" : "bg-[#cfd8d4]"}`}>
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${showTax ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>

              <button
                onClick={() => {
                  setShowSignature(!showSignature);
                  setSaved(false);
                }}
                className="flex w-full items-center justify-between rounded-[13px] bg-[#fbfcfa] p-3 text-left"
              >
                <span>
                  <span className="block text-[11px] font-extrabold">Zone de signature</span>
                  <span className="mt-1 block text-[10px] text-[#8a989e]">Préparer l’acceptation du client.</span>
                </span>
                <span className={`h-6 w-10 rounded-full p-1 transition-colors ${showSignature ? "bg-[#00D254]" : "bg-[#cfd8d4]"}`}>
                  <span className={`block h-4 w-4 rounded-full bg-white transition-transform ${showSignature ? "translate-x-4" : "translate-x-0"}`} />
                </span>
              </button>
            </div>
          </div>
        </div>

        <div className="rounded-[22px] bg-[#e9eeeb] p-4 sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#829198]">
                Prévisualisation temps réel
              </p>
              <p className="mt-1 text-[11px] font-bold text-[#637684]">Devis DV-2026-018 · modèle par défaut</p>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => toast("Prévisualisation plein écran disponible prochainement.")} className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-extrabold text-[#637684]">
                <Eye size={13} />
                Aperçu
              </button>
              <button
                onClick={() => {
                  toast("Ouverture de l’export PDF…");
                  window.print();
                }}
                className="inline-flex items-center gap-2 rounded-full bg-[#0F172A] px-3 py-2 text-[10px] font-extrabold text-white"
              >
                <Download size={13} />
                Exporter PDF
              </button>
            </div>
          </div>

          <div className="mx-auto min-h-[640px] max-w-[650px] bg-white p-6 shadow-[0_18px_45px_rgba(17,42,70,.12)] sm:p-10">
            <div className="mb-5 flex flex-wrap gap-1.5 border-b border-[#eef1ef] pb-4">
              {sections.map((section) => (
                <span key={section} className="rounded-full px-2 py-1 text-[8px] font-extrabold" style={{ backgroundColor: `${accentColor}22`, color: brandColor }}>
                  {section}
                </span>
              ))}
            </div>

            <div className="flex items-start justify-between border-b-2 pb-7" style={{ borderColor: accentColor }}>
              <div>
                <div className="flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-[10px] text-[10px] font-extrabold text-white" style={{ backgroundColor: brandColor }}>
                    N
                  </span>
                  <div>
                    <p className="font-display text-[14px] font-bold" style={{ color: brandColor }}>
                      {companyName || "Votre entreprise"}
                    </p>
                    <p className="text-[8px] font-bold uppercase tracking-[.16em] text-[#9aa7ab]">
                      Solutions & services
                    </p>
                  </div>
                </div>
                <p className="mt-6 text-[9px] font-bold leading-4 text-[#8a989e]">
                  12 rue de l’Innovation<br />
                  75001 Paris · contact@naboth.corp
                </p>
              </div>
              <div className="text-right">
                <p className="text-[9px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">Devis</p>
                <p className="mt-2 font-display text-[20px] font-bold" style={{ color: brandColor }}>
                  DV-2026-018
                </p>
                <p className="mt-1 text-[9px] text-[#8a989e]">23 août 2026</p>
              </div>
            </div>

            <div className="mt-8 flex justify-between">
              <div>
                <p className="text-[8px] font-extrabold uppercase tracking-[.14em] text-[#9aa7ab]">Préparé pour</p>
                <p className="mt-2 text-[12px] font-extrabold" style={{ color: brandColor }}>
                  Atelier Kora
                </p>
                <p className="mt-1 text-[9px] text-[#8a989e]">contact@atelierkora.fr</p>
              </div>
              <div className="text-right">
                <p className="text-[8px] font-extrabold uppercase tracking-[.14em] text-[#9aa7ab]">Valable jusqu’au</p>
                <p className="mt-2 text-[11px] font-extrabold">22 septembre 2026</p>
              </div>
            </div>

            <div className="mt-8 overflow-hidden rounded-[8px] border border-[#edf0ee]">
              <div className="grid grid-cols-[1fr_auto] px-3 py-2 text-[8px] font-extrabold uppercase tracking-[.12em] text-white" style={{ backgroundColor: brandColor }}>
                <span>Description</span>
                <span>Montant</span>
              </div>
              {[
                { name: "Pack identité visuelle", price: "1 200 €" },
                { name: "Site vitrine essentiel", price: "2 450 €" },
                { name: "Accompagnement lancement", price: "1 200 €" },
              ].map((line) => (
                <div key={line.name} className="grid grid-cols-[1fr_auto] border-b border-[#edf0ee] px-3 py-3 text-[9px]">
                  <span className="font-bold">{line.name}</span>
                  <span className="font-extrabold">{line.price}</span>
                </div>
              ))}
            </div>

            <div className="mt-7 ml-auto max-w-[220px] space-y-2 text-[9px]">
              <div className="flex justify-between text-[#8a989e]">
                <span>Sous-total</span>
                <span>4 850 €</span>
              </div>
              {showTax && (
                <div className="flex justify-between text-[#8a989e]">
                  <span>TVA</span>
                  <span>Non incluse</span>
                </div>
              )}
              <div className="flex justify-between border-t pt-3 text-[13px] font-extrabold" style={{ borderColor: accentColor, color: brandColor }}>
                <span>Total TTC</span>
                <span>4 850 €</span>
              </div>
            </div>

            {showSignature && (
              <div className="mt-10 border-t border-dashed border-[#ccd7d1] pt-5">
                <p className="text-[8px] font-extrabold uppercase tracking-[.14em] text-[#9aa7ab]">Acceptation client</p>
                <div className="mt-5 h-10 w-44 border-b border-[#cfd8d4]" />
              </div>
            )}

            <div className="mt-10 text-center text-[8px] text-[#a3adae]">
              Merci pour votre confiance · {companyName || "Votre entreprise"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
