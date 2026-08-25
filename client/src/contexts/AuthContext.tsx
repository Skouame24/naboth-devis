import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "lambda";

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
  company?: string;
}

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  setUserProfile: (profile: Partial<UserProfile> & { role: UserRole }) => void;
  canAccess: (permission: "admin_section" | "import_data" | "manage_users" | "customize_template") => boolean;
}

const ADMIN_USER: UserProfile = {
  name: "Aïcha Mbaye",
  email: "admin@naboth.corp",
  role: "admin",
  roleLabel: "Administrateur",
  initials: "AM",
  company: "Atelier Kora",
};

const LAMBDA_USER: UserProfile = {
  name: "Moussa Diop",
  email: "moussa@atelierkora.fr",
  role: "lambda",
  roleLabel: "Utilisateur (Collaborateur)",
  initials: "MD",
  company: "Atelier Kora",
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin");
  const [customUser, setCustomUser] = useState<UserProfile | null>(null);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === "admin") {
      setCustomUser(ADMIN_USER);
    } else {
      setCustomUser(LAMBDA_USER);
    }
  };

  const setUserProfile = (profile: Partial<UserProfile> & { role: UserRole }) => {
    setRoleState(profile.role);
    const initials = profile.name
      ? profile.name
          .split(" ")
          .filter(Boolean)
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2)
      : profile.role === "admin"
      ? "AM"
      : "MD";

    setCustomUser({
      name: profile.name || (profile.role === "admin" ? ADMIN_USER.name : LAMBDA_USER.name),
      email: profile.email || (profile.role === "admin" ? ADMIN_USER.email : LAMBDA_USER.email),
      role: profile.role,
      roleLabel: profile.role === "admin" ? "Administrateur" : "Utilisateur (Collaborateur)",
      initials: initials || "ND",
      company: profile.company || "Atelier Kora",
    });
  };

  const user = customUser || (role === "admin" ? ADMIN_USER : LAMBDA_USER);

  const canAccess = (permission: "admin_section" | "import_data" | "manage_users" | "customize_template") => {
    if (role === "admin") return true;
    return false;
  };

  return (
    <AuthContext.Provider value={{ role, user, setRole, setUserProfile, canAccess }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}

