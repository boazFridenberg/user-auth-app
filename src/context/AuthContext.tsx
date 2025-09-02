import React, { createContext, useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import type { User, Session } from "../types";

interface AuthContextProps {
  users: User[];
  currentUser: Session | null;
  register: (data: Omit<User, "id" | "createdAt">) => User;
  login: (data: { email: string; password: string }) => User;
  logout: () => void;
  updateUser: (user: User) => void;
  deleteUser: (id: string) => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const USERS_KEY = "auth_app_users_v1";
const SESSION_KEY = "auth_app_session_v1";

function loadUsers(): User[] {
  try {
    const raw = localStorage.getItem(USERS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveUsers(users: User[]) {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [users, setUsers] = useState<User[]>(loadUsers);
  const [currentUser, setCurrentUser] = useState<Session | null>(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    saveUsers(users);
  }, [users]);

  useEffect(() => {
    if (currentUser) localStorage.setItem(SESSION_KEY, JSON.stringify(currentUser));
    else localStorage.removeItem(SESSION_KEY);
  }, [currentUser]);

  function register(data: Omit<User, "id" | "createdAt">): User {
    const exists = users.find((u) => u.email === data.email);
    if (exists) throw new Error("Email already in use");

    const newUser: User = {
      ...data,
      id: uuidv4(),
      createdAt: new Date().toISOString(),
    };
    setUsers((prev) => [...prev, newUser]);
    setCurrentUser({ id: newUser.id, name: newUser.name, email: newUser.email, role: newUser.role });
    return newUser;
  }

  function login({ email, password }: { email: string; password: string }): User {
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) throw new Error("Invalid credentials");
    setCurrentUser({ id: found.id, name: found.name, email: found.email, role: found.role });
    return found;
  }

  function logout() {
    setCurrentUser(null);
  }

  function updateUser(updated: User) {
    setUsers((prev) => prev.map((u) => (u.id === updated.id ? updated : u)));
    if (currentUser && currentUser.id === updated.id) {
      setCurrentUser({ id: updated.id, name: updated.name, email: updated.email, role: updated.role });
    }
  }

  function deleteUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
    if (currentUser && currentUser.id === id) logout();
  }

  return (
    <AuthContext.Provider value={{ users, currentUser, register, login, logout, updateUser, deleteUser }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
