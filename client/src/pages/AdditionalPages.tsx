/*
 * Direction artistique — Flux en mouvement
 * Écrans complémentaires : les décisions, les contrôles et les états restent lisibles,
 * avec le bleu de confiance et le jaune réservé aux actions qui font avancer un devis.
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { toast } from "sonner";
import { 
  AlertTriangle, ArrowLeft, ArrowRight, BadgeCheck, Briefcase, Building2, Check, CheckCheck, 
  CheckCircle2, ChevronRight, ClipboardCheck, Crown, Download, Eye, FileCheck2, FileText, 
  GripVertical, KeyRound, Lock, Mail, MessageCircle, MoreHorizontal, Shield, ShieldCheck, 
  Sparkles, Upload, UserCheck, UserRound, Users, X, Zap 
} from "lucide-react";
import { Brand, FlowTrail } from "./Home";
import { useAuth } from "../contexts/AuthContext";

const navy = "#112A46";
const yellow = "#F5B43C";

function PageShell({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return <div className={`min-h-screen ${light ? "bg-[#f3f5f2]" : "bg-[#fbfaf7]"} text-[#112A46]`}><header className="flex items-center justify-between border-b border-[#e3e9e6] bg-[#fbfaf7] px-5 py-4 sm:px-8 lg:px-12"><Brand /><Link href="/app/dashboard" className="inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-extrabold text-[#71828a] hover:bg-white hover:text-[#112A46]"><ArrowLeft size={15} /> Retour à l’espace</Link></header>{children}</div>;
}

export function AuthPage() {
  const [, setLocation] = useLocation();
  const { setUserProfile } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!email.trim()) {
      toast("Veuillez saisir votre adresse e-mail professionnelle.");
      return;
    }
    const isAdmin = email.toLowerCase().includes("admin") || email.toLowerCase().includes("aicha");
    if (isAdmin) {
      setUserProfile({
        name: "Aïcha Mbaye",
        email: email || "admin@naboth.corp",
        role: "admin",
        company: "Atelier Kora",
      });
      toast("Connexion réussie : Espace Administrateur actif");
    } else {
      setUserProfile({
        name: "Moussa Diop",
        email: email || "moussa@atelierkora.fr",
        role: "lambda",
        company: "Atelier Kora",
      });
      toast("Connexion réussie : Espace Collaborateur (User) actif");
    }
    setLocation("/app/dashboard");
  };

  const quickDemoLogin = (profile: "admin" | "lambda") => {
    if (profile === "admin") {
      setEmail("admin@naboth.corp");
      setPassword("password123");
      setUserProfile({
        name: "Aïcha Mbaye",
        email: "admin@naboth.corp",
        role: "admin",
        company: "Atelier Kora",
      });
      toast("Session démo chargée : Profil Administrateur");
      setLocation("/app/dashboard");
    } else {
      setEmail("moussa@atelierkora.fr");
      setPassword("password123");
      setUserProfile({
        name: "Moussa Diop",
        email: "moussa@atelierkora.fr",
        role: "lambda",
        company: "Atelier Kora",
      });
      toast("Session démo chargée : Profil Collaborateur (User)");
      setLocation("/app/dashboard");
    }
  };

  return (
    <PageShell>
      <main className="mx-auto grid min-h-[calc(100vh-73px)] max-w-[1200px] items-center gap-10 px-5 py-10 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
        <div className="hidden lg:block">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#dce4e7] bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[0.18em] text-[#637684]">
            <span className="h-1.5 w-1.5 rounded-full bg-[#F5B43C]" /> Votre espace de pilotage
          </span>
          <h1 className="mt-7 max-w-[460px] font-display text-[54px] font-bold leading-[.98] tracking-[-.06em]">
            Gardez le fil de chaque proposition.
          </h1>
          <p className="mt-6 max-w-[390px] text-[14px] leading-6 text-[#71828a]">
            Connectez-vous pour retrouver vos devis, vos clients et piloter l'activité commerciale en temps réel.
          </p>
          <div className="mt-12 flex items-center gap-3 text-[11px] font-extrabold text-[#71828a]">
            <ShieldCheck size={16} className="text-[#317459]" /> Connexion chiffrée et protégée
          </div>
        </div>

        <div className="mx-auto w-full max-w-[490px] rounded-[28px] bg-white p-6 shadow-[0_18px_55px_rgba(17,42,70,.1)] sm:p-9">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E45A48]">Connexion</p>
              <h2 className="mt-2 font-display text-[28px] font-bold tracking-[-.05em]">Ravi de vous revoir</h2>
              <p className="mt-1 text-[12px] text-[#849399]">Accédez directement à vos devis et dossiers.</p>
            </div>
            <div className="flex h-12 w-12 items-center justify-center rounded-[16px] bg-[#fff7df] text-[#a87500]">
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
                placeholder="vous@entreprise.fr"
                className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>

            <button
              type="submit"
              className="btn-action mt-2 flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B43C] py-3.5 text-[12px] font-extrabold text-[#112A46]"
            >
              Ouvrir mon espace <ArrowRight size={15} />
            </button>
          </form>

          {/* Quick Demo Simulation */}
          <div className="mt-7 rounded-[18px] border border-[#edf1ee] bg-[#f9faf8] p-4">
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-[#a87500]" />
              <span className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-[#78888f]">
                Simulation de connexion rapide
              </span>
            </div>
            <p className="mt-1 text-[11px] text-[#71828a]">
              Testez immédiatement un profil pour voir ses droits :
            </p>
            <div className="mt-3 grid gap-2 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => quickDemoLogin("admin")}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#e2e8e4] bg-white p-2.5 text-left transition-all hover:border-[#112A46] hover:shadow-sm"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#112A46] text-[10px] font-bold text-white">
                  AM
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-[11px] font-extrabold text-[#112A46]">Aïcha Mbaye</span>
                  <span className="block text-[9px] font-bold text-[#317459]">👑 Admin (Complet)</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => quickDemoLogin("lambda")}
                className="flex items-center gap-2.5 rounded-[12px] border border-[#e2e8e4] bg-white p-2.5 text-left transition-all hover:border-[#F5B43C] hover:shadow-sm"
              >
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#F5B43C] text-[10px] font-bold text-[#112A46]">
                  MD
                </div>
                <div className="min-w-0">
                  <span className="block truncate text-[11px] font-extrabold text-[#112A46]">Moussa Diop</span>
                  <span className="block text-[9px] font-bold text-[#39719a]">👤 User (Opérations)</span>
                </div>
              </button>
            </div>
          </div>

          <p className="mt-6 text-center text-[11px] text-[#91a0a5]">
            Nouveau sur Naboth ?{" "}
            <Link href="/inscription" className="font-extrabold text-[#112A46] underline decoration-[#F5B43C] decoration-2 underline-offset-2">
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
  return <PageShell light><main className="mx-auto max-w-[960px] px-5 py-8 sm:px-8 lg:py-12"><div className="mx-auto max-w-[740px] text-center"><span className="inline-flex items-center gap-2 rounded-full bg-white px-3 py-2 text-[10px] font-extrabold uppercase tracking-[.18em] text-[#637684] shadow-sm"><ShieldCheck size={13} className="text-[#317459]" /> Document sécurisé</span><h1 className="mt-6 font-display text-[39px] font-bold tracking-[-.06em] sm:text-[55px]">Une proposition pour <span className="text-[#E45A48]">Atelier Kora.</span></h1><p className="mt-4 text-[14px] leading-6 text-[#71828a]">Bonjour, voici le devis préparé par Naboth Corporation. Prenez le temps de le consulter puis indiquez votre décision.</p></div><div className="mx-auto mt-10 max-w-[720px] overflow-hidden rounded-[26px] bg-white shadow-[0_18px_55px_rgba(17,42,70,.1)]"><div className="flex items-start justify-between bg-[#112A46] p-6 text-white sm:p-8"><div><p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/45">Devis</p><p className="mt-3 font-display text-[25px] font-bold">DV-2026-018</p><p className="mt-1 text-[11px] text-white/50">Émis le 23 août 2026 · valable jusqu’au 22 septembre</p></div><FileCheck2 size={25} className="text-[#F5B43C]" /></div><div className="p-6 sm:p-8"><div className="grid gap-5 border-b border-[#eef1ef] pb-7 sm:grid-cols-3"><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Émetteur</p><p className="mt-2 text-[12px] font-extrabold">Naboth Corporation</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Destinataire</p><p className="mt-2 text-[12px] font-extrabold">Atelier Kora</p></div><div><p className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#9aa7ab]">Total</p><p className="mt-2 font-display text-[20px] font-bold">4 850 €</p></div></div><div className="mt-7 divide-y divide-[#eef1ef]">{[{name:"Pack identité visuelle", detail:"Direction artistique et kit de marque", price:"1 200 €"},{name:"Site vitrine essentiel", detail:"Conception, intégration et mise en ligne", price:"2 450 €"},{name:"Accompagnement lancement", detail:"Deux ateliers de suivi", price:"1 200 €"}].map((line) => <div key={line.name} className="flex items-center justify-between gap-4 py-4"><div><p className="text-[12px] font-extrabold">{line.name}</p><p className="mt-1 text-[11px] text-[#87969d]">{line.detail}</p></div><span className="font-display text-[13px] font-bold">{line.price}</span></div>)}</div><div className="mt-6 flex items-center justify-between border-t border-[#112A46] pt-5"><span className="text-[12px] font-extrabold">Total proposé</span><span className="font-display text-[26px] font-bold">4 850 €</span></div>{decision === "none" ? <div className="mt-8 grid gap-3 sm:grid-cols-2"><button onClick={() => setDecision("refused")} className="flex items-center justify-center gap-2 rounded-full border border-[#e1e7e4] py-3.5 text-[12px] font-extrabold text-[#bc4b3d] hover:bg-[#fcecea]"><X size={15} />Refuser la proposition</button><button onClick={() => setDecision("accepted")} className="btn-action flex items-center justify-center gap-2 rounded-full bg-[#F5B43C] py-3.5 text-[12px] font-extrabold text-[#112A46]"><Check size={15} />Accepter le devis</button></div> : <div className={`mt-8 rounded-[16px] p-4 text-center ${decision === "accepted" ? "bg-[#e9f5ef] text-[#317459]" : "bg-[#fcecea] text-[#bc4b3d]"}`}><div className="flex items-center justify-center gap-2 text-[12px] font-extrabold">{decision === "accepted" ? <CheckCircle2 size={16} /> : <X size={16} />}{decision === "accepted" ? "Merci, votre acceptation a bien été enregistrée." : "Votre refus a bien été enregistré."}</div><p className="mt-2 text-[11px] opacity-75">Naboth Corporation a été informée de votre décision.</p></div>}</div></div><p className="mt-7 text-center text-[10px] font-bold text-[#95a1a4]">Lien personnel · Ne pas transférer ce document</p></main></PageShell>;
}

export function QuoteDetailPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#E45A48]">
            Détail du devis
          </p>
          <div className="mt-3 flex items-center gap-3">
            <h1 className="font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
              DV-2026-018
            </h1>
            <span className="rounded-full bg-[#eaf2f8] px-3 py-1.5 text-[10px] font-extrabold text-[#39719a]">
              Envoyé
            </span>
          </div>
          <p className="mt-2 text-[12px] text-[#829198]">
            Atelier Kora · envoyé aujourd’hui à 10:24
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => toast("Prévisualisation du document")}
            className="rounded-full border border-[#dfe7e2] bg-white px-4 py-3 text-[11px] font-extrabold text-[#112A46] shadow-sm hover:bg-[#fbfaf7]"
          >
            Prévisualiser
          </button>
          <button
            onClick={() => toast("Une relance a été préparée.")}
            className="btn-action inline-flex items-center gap-2 rounded-full bg-[#F5B43C] px-4 py-3 text-[11px] font-extrabold text-[#112A46]"
          >
            <SendIcon />
            Relancer
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
        <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
          <div className="flex items-start justify-between border-b border-[#eef1ef] pb-6">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
                Client destinataire
              </p>
              <div className="mt-3 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5b43c] font-display text-[11px] font-bold text-[#112A46]">
                  AK
                </span>
                <div>
                  <p className="font-display text-[17px] font-bold text-[#112A46]">Atelier Kora</p>
                  <p className="mt-1 text-[11px] text-[#829198]">contact@atelierkora.fr</p>
                </div>
              </div>
            </div>
            <button onClick={() => toast("Options du devis")} className="rounded-full p-2 text-[#829198] hover:bg-[#f2f5f2]">
              <MoreHorizontal size={18} />
            </button>
          </div>
          <div className="mt-6 divide-y divide-[#eef1ef]">
            {[
              { name: "Pack identité visuelle", price: "1 200 €" },
              { name: "Site vitrine essentiel", price: "2 450 €" },
              { name: "Accompagnement lancement", price: "1 200 €" },
            ].map((line) => (
              <div key={line.name} className="flex justify-between py-4 text-[12px]">
                <span className="font-extrabold text-[#112A46]">{line.name}</span>
                <span className="font-display font-bold text-[#112A46]">{line.price}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-between border-t border-[#112A46] pt-5">
            <span className="text-[12px] font-extrabold text-[#112A46]">Total TTC</span>
            <strong className="font-display text-[25px] text-[#112A46]">4 850 €</strong>
          </div>
        </div>

        <div className="space-y-6">
          <div className="card-shadow rounded-[22px] bg-[#112A46] p-6 text-white">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-white/45">
              Suivi du devis
            </p>
            <div className="mt-6 space-y-0">
              {[
                { label: "Brouillon créé", date: "23 août · 09:42", done: true },
                { label: "Envoyé par e-mail", date: "23 août · 10:24", done: true },
                { label: "Lien consulté", date: "En attente", done: false },
                { label: "Décision client", date: "En attente", done: false },
              ].map((event, i) => (
                <div key={event.label} className="relative flex gap-3 pb-6 last:pb-0">
                  <div className="relative z-10 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-[#112A46] bg-[#203e5b]">
                    {event.done ? <Check size={12} className="text-[#F5B43C]" /> : <span className="h-1.5 w-1.5 rounded-full bg-white/30" />}
                  </div>
                  {i < 3 && <span className="absolute left-3 top-6 h-full w-px bg-white/12" />}
                  <div>
                    <p className={`text-[11px] font-extrabold ${event.done ? "text-white" : "text-white/40"}`}>{event.label}</p>
                    <p className="mt-1 text-[10px] text-white/40">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="card-shadow rounded-[22px] bg-white p-6">
            <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#9aa7ab]">
              Canaux d’envoi
            </p>
            <div className="mt-5 space-y-2">
              <button onClick={() => toast("Ouverture de l’e-mail")} className="flex w-full items-center gap-3 rounded-[13px] border border-[#e8edeb] p-3 text-left hover:bg-[#fbfaf7]">
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#eaf2f8] text-[#39719a]">
                  <Mail size={15} />
                </span>
                <span>
                  <span className="block text-[11px] font-extrabold text-[#112A46]">E-mail</span>
                  <span className="mt-1 block text-[10px] text-[#8a989e]">Envoyé · consulté bientôt</span>
                </span>
                <ChevronRight size={14} className="ml-auto text-[#b5c0c1]" />
              </button>
              <button onClick={() => toast("Message WhatsApp préparé")} className="flex w-full items-center gap-3 rounded-[13px] border border-[#e8edeb] p-3 text-left hover:bg-[#fbfaf7]">
                <span className="flex h-8 w-8 items-center justify-center rounded-[10px] bg-[#e9f5ef] text-[#317459]">
                  <MessageCircle size={15} />
                </span>
                <span>
                  <span className="block text-[11px] font-extrabold text-[#112A46]">WhatsApp</span>
                  <span className="mt-1 block text-[10px] text-[#8a989e]">Partager le lien sécurisé</span>
                </span>
                <ChevronRight size={14} className="ml-auto text-[#b5c0c1]" />
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
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#317459]">
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
          className="inline-flex items-center gap-2 rounded-full border border-[#dfe7e2] bg-white px-4 py-3 text-[11px] font-extrabold text-[#112A46] shadow-sm hover:bg-[#fbfaf7]"
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
                  type === item ? "border-[#F5B43C] bg-[#fff7df]" : "border-[#e6ece8] bg-white hover:border-[#cfdad5]"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span
                    className={`flex h-8 w-8 items-center justify-center rounded-[10px] ${
                      item === "Clients" ? "bg-[#eaf2f8] text-[#39719a]" : "bg-[#e9f5ef] text-[#317459]"
                    }`}
                  >
                    {item === "Clients" ? <UserRound size={15} /> : <ClipboardCheck size={15} />}
                  </span>
                  <span className="text-[12px] font-extrabold">{item}</span>
                </span>
                {type === item && <CheckCircle2 size={16} className="text-[#a87500]" />}
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
                uploaded ? "border-[#8db9a6] bg-[#e9f5ef]" : "border-[#cfdad5] bg-[#fbfcfa] hover:border-[#F5B43C] hover:bg-[#fffaf0]"
              }`}
            >
              <span
                className={`flex h-14 w-14 items-center justify-center rounded-[17px] ${
                  uploaded ? "bg-white text-[#317459]" : "bg-[#fff7df] text-[#a87500]"
                }`}
              >
                {uploaded ? <CheckCircle2 size={24} /> : <Upload size={24} />}
              </span>
              <span className="mt-4 text-[13px] font-extrabold text-[#112A46]">
                {uploaded ? `${type.toLowerCase()}_aout.xlsx prêt à analyser` : "Glissez votre fichier ici"}
              </span>
              <span className="mt-2 text-[11px] text-[#8a989e]">CSV ou XLSX · 10 Mo maximum</span>
            </button>
          </div>

          {uploaded && (
            <div className="card-shadow rounded-[22px] bg-white p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#317459]">
                    4. Prévisualisation
                  </p>
                  <h2 className="mt-2 font-display text-[19px] font-bold text-[#112A46]">24 lignes détectées</h2>
                </div>
                <span className="rounded-full bg-[#e9f5ef] px-3 py-1.5 text-[10px] font-extrabold text-[#317459]">
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
                    <span className="font-extrabold text-[#112A46]">{name}</span>
                    <span className="truncate text-[#87969d]">
                      contact@{name.toLowerCase().replaceAll(" ", "")}.fr
                    </span>
                    <span className={`font-extrabold ${i === 2 ? "text-[#bc4b3d]" : "text-[#317459]"}`}>
                      {i === 2 ? "À vérifier" : "Valide"}
                    </span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => toast(`${type} importés avec succès dans la démonstration.`)}
                className="btn-action mt-5 flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B43C] py-3 text-[11px] font-extrabold text-[#112A46]"
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
  const [saved, setSaved] = useState(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#E45A48]">
            Réglages
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Votre espace, à votre façon.
          </h1>
          <p className="mt-2 text-[13px] text-[#829198]">
            Paramétrez l’entreprise, les documents et les préférences d’envoi.
          </p>
        </div>
        <button
          onClick={() => {
            setSaved(true);
            toast("Réglages enregistrés.");
          }}
          className="btn-action rounded-full bg-[#F5B43C] px-5 py-3 text-[11px] font-extrabold text-[#112A46]"
        >
          Enregistrer les changements
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
        <div className="card-shadow h-fit rounded-[20px] bg-white p-3 space-y-1">
          {["Entreprise", "Modèle de devis", "Utilisateurs", "Notifications", "Sécurité"].map((item, i) => (
            <button
              key={item}
              onClick={() => toast(`Onglet ${item} sélectionné`)}
              className={`flex w-full items-center justify-between rounded-[12px] px-3 py-3 text-left text-[11px] font-extrabold transition-colors ${
                i === 0 ? "bg-[#112A46] text-white" : "text-[#71828a] hover:bg-[#f4f6f4] hover:text-[#112A46]"
              }`}
            >
              {item}
              {i === 0 && <ChevronRight size={14} />}
            </button>
          ))}
        </div>

        <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-8">
          <div className="flex items-center justify-between border-b border-[#eef1ef] pb-6">
            <div>
              <h2 className="font-display text-[20px] font-bold text-[#112A46]">Informations entreprise</h2>
              <p className="mt-1 text-[11px] text-[#8a989e]">Ces informations apparaîtront sur vos devis.</p>
            </div>
            <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#fff7df] text-[#a87500]">
              <FileText size={18} />
            </span>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <label className="sm:col-span-2">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Nom de l’entreprise
              </span>
              <input
                defaultValue="Naboth Corporation"
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>
            <label>
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                E-mail
              </span>
              <input
                defaultValue="contact@naboth.corp"
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>
            <label>
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Téléphone
              </span>
              <input
                defaultValue="+33 1 84 80 20 26"
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>
            <label className="sm:col-span-2">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Adresse
              </span>
              <input
                defaultValue="12 rue de l'Innovation, Paris"
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>
          </div>
          <div className="mt-8 flex items-center justify-between border-t border-[#eef1ef] pt-6">
            <span className={`text-[11px] font-extrabold ${saved ? "text-[#317459]" : "text-[#a0abad]"}`}>
              {saved ? "Modifications enregistrées" : "Dernière sauvegarde : Aujourd'hui"}
            </span>
            <button
              onClick={() => {
                setSaved(true);
                toast("Réglages enregistrés.");
              }}
              className="btn-action rounded-full bg-[#F5B43C] px-5 py-3 text-[11px] font-extrabold text-[#112A46]"
            >
              Enregistrer les changements
            </button>
          </div>
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
              <span className="h-1.5 w-1.5 rounded-full bg-[#F5B43C]" />
              Simulation · Parcours {mode === "admin" ? "Administrateur" : "Utilisateur (User)"}
            </span>
            <span className="rounded-full bg-[#eef3f0] px-3 py-1.5 text-[10px] font-extrabold text-[#317459]">
              Étape {step} sur 3
            </span>
          </div>

          <h1 className="mt-7 max-w-[490px] font-display text-[50px] font-bold leading-[1] tracking-[-0.06em] text-[#112A46]">
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
              <span className={`flex h-9 w-9 items-center justify-center rounded-[12px] ${mode === "admin" ? "bg-[#112A46] text-[#F5B43C]" : "bg-[#F5B43C] text-[#112A46]"}`}>
                {mode === "admin" ? <Crown size={18} /> : <UserCheck size={18} />}
              </span>
              <div>
                <p className="text-[12px] font-extrabold text-[#112A46]">
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
                    <CheckCircle2 size={13} className="text-[#317459]" /> Création & envoi illimité de devis
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#317459]" /> Import de fichiers CSV/Excel & Catalogue
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#317459]" /> Invitation et gestion des utilisateurs
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#317459]" /> Personnalisation du modèle de devis
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#317459]" /> Création et suivi de vos devis clients
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <CheckCircle2 size={13} className="text-[#317459]" /> Accès au catalogue produits partagé
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
                <Zap size={13} className="text-[#F5B43C]" />
                Simulateur de parcours en 1 clic
              </div>
            </div>
            <div className="mt-2.5 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={fillSimulationAdmin}
                className={`flex items-center justify-center gap-2 rounded-[13px] border px-3 py-2 text-[11px] font-extrabold transition-all ${
                  mode === "admin"
                    ? "border-[#112A46] bg-[#112A46] text-white shadow-sm"
                    : "border-[#dce4e0] bg-white text-[#112A46] hover:border-[#112A46]"
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
                    ? "border-[#F5B43C] bg-[#F5B43C] text-[#112A46] shadow-sm"
                    : "border-[#dce4e0] bg-white text-[#112A46] hover:border-[#F5B43C]"
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
              <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#E45A48]">
                {mode === "admin" ? "Inscription Entreprise · Administrateur" : "Invitation Équipe · Collaborateur"}
              </p>
              <h2 className="mt-2 font-display text-[26px] font-bold tracking-[-0.04em] text-[#112A46]">
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
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-[14px] bg-[#fff7df] text-[#a87500]">
              {mode === "admin" ? <Crown size={20} /> : <UserRound size={20} />}
            </span>
          </div>

          <div className="mt-5 flex items-center gap-1.5">
            <span className={`h-1.5 flex-1 rounded-full ${step >= 1 ? "bg-[#F5B43C]" : "bg-[#e8eeea]"}`} />
            <span className={`h-1.5 flex-1 rounded-full ${step >= 2 ? "bg-[#F5B43C]" : "bg-[#e8eeea]"}`} />
            <span className={`h-1.5 flex-1 rounded-full ${step >= 3 ? "bg-[#F5B43C]" : "bg-[#e8eeea]"}`} />
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] pl-10 pr-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#F5B43C]"
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#F5B43C]"
                      >
                        <option>€ EUR (Euro)</option>
                        <option>$ USD (Dollar)</option>
                        <option>FCFA (Franc CFA)</option>
                        <option>£ GBP (Livre)</option>
                      </select>
                    </label>
                  </div>

                  <div className="rounded-[14px] bg-[#f4f7f5] p-3.5 text-[11px] text-[#61747e] leading-5">
                    <span className="font-extrabold text-[#112A46]">Rôle attribué à l'issue de la création :</span>
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                  className="btn-action flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B43C] py-3.5 text-[12px] font-extrabold text-[#112A46]"
                >
                  {step === 1 ? "Continuer vers le profil Admin" : step === 2 ? "Valider les privilèges Admin" : "Créer l'entreprise & Ouvrir l'espace"}
                  <ArrowRight size={15} />
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    className="flex w-full items-center justify-center gap-2 text-[11px] font-extrabold text-[#7f9096] hover:text-[#112A46]"
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] pl-10 pr-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
                      />
                      <KeyRound size={16} className="absolute left-3.5 top-3.5 text-[#9ab0b8]" />
                    </div>
                  </label>

                  <div className="rounded-[16px] border border-[#dce6e1] bg-[#f2f7f4] p-4 text-[11px] text-[#317459] leading-5">
                    <div className="flex items-center gap-2 font-extrabold">
                      <BadgeCheck size={16} /> Invitation validée
                    </div>
                    <p className="mt-1 text-[#45695a]">
                      Entreprise : <strong>{invitedCompany}</strong> · Invité par <strong>Aïcha Mbaye (Admin)</strong>
                    </p>
                    <span className="mt-2 inline-block rounded-full bg-white px-2.5 py-1 text-[9px] font-extrabold text-[#112A46]">
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                      className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3.5 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#F5B43C]"
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
                        className="w-full rounded-[13px] border border-[#e0e8e3] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold outline-none focus:border-[#F5B43C]"
                      />
                    </label>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="rounded-[16px] border border-[#e2e8e4] bg-[#f8faf8] p-4 text-[12px]">
                    <p className="font-extrabold text-[#112A46]">Récapitulatif de votre accès collaborateur :</p>
                    <div className="mt-3 space-y-2 text-[11px]">
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Entreprise rejointe</span>
                        <span className="font-extrabold text-[#112A46]">{invitedCompany}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Membre</span>
                        <span className="font-extrabold text-[#112A46]">{userName || "Moussa Diop"}</span>
                      </div>
                      <div className="flex items-center justify-between border-b border-[#ecefe6] pb-2">
                        <span className="text-[#72838c]">Identifiant</span>
                        <span className="font-extrabold text-[#112A46]">{userEmail || "moussa@atelierkora.fr"}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-[#72838c]">Périmètre</span>
                        <span className="rounded-full bg-[#eaf2f8] px-2 py-0.5 text-[9px] font-extrabold text-[#39719a]">
                          Devis, Clients & Produits
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-[14px] bg-[#f4f7f5] p-3 text-[11px] text-[#556973] leading-5">
                    <span className="font-extrabold text-[#112A46]">Protection des données :</span>
                    <p className="mt-0.5">Les paramètres généraux et modèles légaux restent sous la responsabilité de l'administrateur.</p>
                  </div>
                </div>
              )}

              <div className="mt-7 space-y-3">
                <button
                  type="button"
                  onClick={submitUser}
                  className="btn-action flex w-full items-center justify-center gap-2 rounded-full bg-[#F5B43C] py-3.5 text-[12px] font-extrabold text-[#112A46]"
                >
                  {step === 1 ? "Valider l'invitation" : step === 2 ? "Vérifier mes permissions" : "Rejoindre l'équipe & Accéder aux devis"}
                  <ArrowRight size={15} />
                </button>

                {step > 1 && (
                  <button
                    type="button"
                    onClick={() => setStep((s) => (s - 1) as 1 | 2 | 3)}
                    className="flex w-full items-center justify-center gap-2 text-[11px] font-extrabold text-[#7f9096] hover:text-[#112A46]"
                  >
                    <ArrowLeft size={14} /> Retour à l'étape précédente
                  </button>
                )}
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-[11px] text-[#91a0a5]">
            Vous avez déjà un compte ?{" "}
            <Link href="/connexion" className="font-extrabold text-[#112A46] underline decoration-[#F5B43C] decoration-2 underline-offset-2">
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
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#E45A48]">
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
          className="btn-action inline-flex items-center justify-center gap-2 rounded-full bg-[#F5B43C] px-4 py-3 text-[11px] font-extrabold text-[#112A46]"
        >
          <UserRound size={14} />
          Ajouter un utilisateur
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-[.75fr_1.25fr]">
        <div className="space-y-6">
          <div className="card-shadow rounded-[22px] bg-[#112A46] p-6 text-white">
            <div className="flex items-center justify-between">
              <span className="flex h-10 w-10 items-center justify-center rounded-[13px] bg-[#F5B43C] text-[#112A46]">
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
                  role === "admin" ? "bg-white text-[#112A46]" : "bg-white/10 text-white/60 hover:bg-white/15"
                }`}
              >
                Administrateur
                <span className="mt-1 block text-[9px] font-bold opacity-60">Tout gérer</span>
              </button>
              <button
                onClick={() => setRole("lambda")}
                className={`rounded-[13px] px-3 py-3 text-left text-[10px] font-extrabold transition-colors ${
                  role === "lambda" ? "bg-white text-[#112A46]" : "bg-white/10 text-white/60 hover:bg-white/15"
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
                        isAllowed ? "bg-[#e9f5ef] text-[#317459]" : "bg-[#f2f4f2] text-[#adb6b6]"
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
            <span className="rounded-full bg-[#eaf2f8] px-3 py-1.5 text-[10px] font-extrabold text-[#39719a]">
              Espace Naboth
            </span>
          </div>

          {showAdd && (
            <div className="border-b border-[#eef1ef] bg-[#fffaf0] p-5">
              <p className="text-[10px] font-extrabold uppercase tracking-[.15em] text-[#a87500]">
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
                  className="rounded-[12px] bg-[#112A46] px-4 py-3 text-[11px] font-extrabold text-white"
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
                  <p className="text-[12px] font-extrabold text-[#112A46]">{user.name}</p>
                  <p className="mt-1 truncate text-[10px] text-[#8a989e]">{user.email}</p>
                </div>
                <span className="rounded-full bg-[#f2f5f2] px-3 py-1.5 text-[10px] font-extrabold text-[#637684]">
                  {user.role}
                </span>
                <span className={`text-[10px] font-extrabold ${user.status === "Actif" ? "text-[#317459]" : "text-[#a87500]"}`}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#112A46]/35 p-5 backdrop-blur-sm">
          <div role="dialog" aria-modal="true" aria-labelledby="permission-title" className="w-full max-w-[470px] rounded-[24px] bg-white p-6 shadow-[0_24px_80px_rgba(17,42,70,.24)] sm:p-8">
            <div className="flex items-start gap-3">
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[13px] bg-[#fff7df] text-[#a87500]">
                <AlertTriangle size={18} />
              </span>
              <div>
                <p className="text-[10px] font-extrabold uppercase tracking-[.18em] text-[#a87500]">
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
                className="rounded-full bg-[#112A46] px-4 py-3 text-[11px] font-extrabold text-white"
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
    brandColor: "#112A46",
    accentColor: "#F5B43C",
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
    accentColor: "#E45A48",
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
  const [brandColor, setBrandColor] = useState("#112A46");
  const [accentColor, setAccentColor] = useState("#F5B43C");
  const [companyName, setCompanyName] = useState("Naboth Corporation");
  const [logoName, setLogoName] = useState("Logo Naboth");
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-[#317459]">
            Réglages · Modèle de devis
          </p>
          <h1 className="mt-3 font-display text-[32px] font-bold tracking-[-.05em] sm:text-[36px]">
            Votre devis, votre signature.
          </h1>
          <p className="mt-2 text-[13px] text-[#829198]">
            Modifiez les informations à gauche ou importez un modèle d'exemple en 1-clic.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <span className={`rounded-full px-3 py-2 text-[10px] font-extrabold ${saved ? "bg-[#e9f5ef] text-[#317459]" : "bg-[#fff7df] text-[#a87500]"}`}>
            {saved ? "Modèle enregistré" : "Modifications non enregistrées"}
          </span>
          <button
            onClick={() => {
              setSaved(true);
              toast("Modèle de devis enregistré pour cette entreprise.");
            }}
            className="btn-action inline-flex items-center gap-2 rounded-full bg-[#F5B43C] px-4 py-3 text-[11px] font-extrabold text-[#112A46]"
          >
            <Check size={14} />
            Enregistrer
          </button>
        </div>
      </div>

      <div className="grid gap-7 xl:grid-cols-[.75fr_1.25fr]">
        <div className="card-shadow rounded-[22px] bg-white p-6 sm:p-7">
          <div className="flex items-center gap-3 border-b border-[#eef1ef] pb-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-[11px] bg-[#fff7df] text-[#a87500]">
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
                <span className="text-[10px] font-extrabold uppercase tracking-[.12em] text-[#a87500]">
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
                    className="flex flex-col rounded-[12px] border border-[#e6ece8] bg-white p-2.5 text-left transition-all hover:border-[#F5B43C] hover:shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-extrabold text-[#112A46]">{tmpl.name}</span>
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
                className="w-full rounded-[13px] border border-[#e1e8e4] bg-[#fbfcfa] px-3 py-3 text-[12px] font-bold outline-none focus:border-[#F5B43C]"
              />
            </label>

            <label className="block">
              <span className="mb-2 block text-[10px] font-extrabold uppercase tracking-[.1em] text-[#829198]">
                Logo de l’entreprise
              </span>
              <div className="flex items-center gap-2">
                <label className="flex flex-1 cursor-pointer items-center gap-2 rounded-[13px] border border-dashed border-[#cfdad5] bg-[#fbfcfa] px-3 py-3 text-[11px] font-bold text-[#637684] hover:border-[#F5B43C]">
                  <Upload size={14} className="text-[#a87500]" />
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
                        ? "border-[#F5B43C] bg-[#fff7df] opacity-60"
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
                <span className={`h-6 w-10 rounded-full p-1 transition-colors ${showTax ? "bg-[#317459]" : "bg-[#cfd8d4]"}`}>
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
                <span className={`h-6 w-10 rounded-full p-1 transition-colors ${showSignature ? "bg-[#317459]" : "bg-[#cfd8d4]"}`}>
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
                className="inline-flex items-center gap-2 rounded-full bg-[#112A46] px-3 py-2 text-[10px] font-extrabold text-white"
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
