import React, { createContext, useContext, useState } from "react";

export type UserRole = "admin" | "lambda";

export interface UserProfile {
  name: string;
  email: string;
  role: UserRole;
  roleLabel: string;
  initials: string;
  company: string;
  isNabothUser?: boolean;
}

interface AuthContextType {
  role: UserRole;
  user: UserProfile;
  setRole: (role: UserRole) => void;
  setUserProfile: (profile: Partial<UserProfile> & { role: UserRole; isNabothUser?: boolean }) => void;
  canAccess: (permission: "admin_section" | "import_data" | "manage_users" | "customize_template") => boolean;
}

const YASEE_ADMIN_USER: UserProfile = {
  name: "Aïcha Mbaye",
  email: "admin@yasee-it.com",
  role: "admin",
  roleLabel: "Administrateur Yasee IT",
  initials: "AM",
  company: "Yasee IT",
  isNabothUser: false,
};

const NABOTH_USER: UserProfile = {
  name: "Jean Naboth",
  email: "contact@naboth.corp",
  role: "admin",
  roleLabel: "Client Naboth",
  initials: "JN",
  company: "Naboth SARL",
  isNabothUser: true,
};

const LAMBDA_USER: UserProfile = {
  name: "Moussa Diop",
  email: "moussa@atelierkora.fr",
  role: "lambda",
  roleLabel: "Collaborateur Client",
  initials: "MD",
  company: "Atelier Kora",
  isNabothUser: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [role, setRoleState] = useState<UserRole>("admin");
  const [customUser, setCustomUser] = useState<UserProfile | null>(null);

  const setRole = (newRole: UserRole) => {
    setRoleState(newRole);
    if (newRole === "admin") {
      setCustomUser(YASEE_ADMIN_USER);
    } else {
      setCustomUser(LAMBDA_USER);
    }
  };

  const setUserProfile = (profile: Partial<UserProfile> & { role: UserRole; isNabothUser?: boolean }) => {
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

    const isNaboth = Boolean(profile.isNabothUser || (profile.email && profile.email.toLowerCase().includes("naboth")));

    setCustomUser({
      name: profile.name || (isNaboth ? NABOTH_USER.name : profile.role === "admin" ? YASEE_ADMIN_USER.name : LAMBDA_USER.name),
      email: profile.email || (isNaboth ? NABOTH_USER.email : profile.role === "admin" ? YASEE_ADMIN_USER.email : LAMBDA_USER.email),
      role: profile.role,
      roleLabel: isNaboth ? "Client Naboth (Compte Dédié)" : profile.role === "admin" ? "Administrateur Yasee IT" : "Collaborateur Client",
      initials: initials || (isNaboth ? "JN" : "AM"),
      company: profile.company || (isNaboth ? "Naboth SARL" : "Yasee IT"),
      isNabothUser: isNaboth,
    });
  };

  const user = customUser || (role === "admin" ? YASEE_ADMIN_USER : LAMBDA_USER);

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
