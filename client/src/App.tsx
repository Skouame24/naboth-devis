/*
 * Fast Devis par Yasee IT
 * Plateforme SaaS multi-chartes avec personnalisation dynamique des thèmes clients.
 */
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import { CharterProvider } from "./contexts/CharterContext";
import Home, { AppPage } from "./pages/Home";
import { AuthPage, ClientQuotePage, RegisterPage } from "./pages/AdditionalPages";
import NotFound from "./pages/NotFound";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/inscription" component={RegisterPage} />
      <Route path="/connexion" component={AuthPage} />
      <Route path="/client/devis/:id" component={ClientQuotePage} />
      <Route path="/app/:section" component={AppPage} />
      <Route path="/admin" component={AppPage} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <CharterProvider>
          <AuthProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </AuthProvider>
        </CharterProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
