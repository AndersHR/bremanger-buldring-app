"use client";

import { Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { createClient } from "../supabase/browserClient";

type AuthContextType = {
  user: User | null;
  isAdmin: boolean;
  loading: boolean;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  isAdmin: false,
  loading: true,
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const cached = sessionStorage.getItem("userInfo");

    const supabase = createClient();

    if (cached) {
      const { user, isAdmin } = JSON.parse(cached);

      setUser(user);
      setIsAdmin(isAdmin);
      setLoading(false);
    } else {
      const fetchUserInfo = async () => {
        const {
          data: { session },
        } = await supabase.auth.getSession();

        const currentUser = session?.user || null;
        setUser(currentUser);

        console.log("session", session);

        const admin = currentUser
          ? (await supabase.rpc("is_boulder_admin")).data
          : false;

        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({ user: currentUser, isAdmin: admin })
        );

        setLoading(false);
      };

      console.log("fetching data");

      fetchUserInfo();

      console.log("fetched");
    }

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      handleAuthChange(session);
    });

    const handleAuthChange = async (session: Session | null) => {
      if (session?.user) {
        const user = session.user;
        const admin = (await supabase.rpc("is_boulder_admin")).data;

        setUser(user);
        setIsAdmin(admin);

        sessionStorage.setItem(
          "userInfo",
          JSON.stringify({ user, isAdmin: admin })
        );
      } else {
        sessionStorage.removeItem("userInfo");
        setUser(null);
        setIsAdmin(false);
      }

      setLoading(false);
    };

    return () => {
      subscription.unsubscribe();
    };

    return;
  }, []);

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();

    sessionStorage.removeItem("userInfo");
    setUser(null);
    setIsAdmin(false);
    router.push("/");
  };

  return (
    <AuthContext.Provider value={{ user, isAdmin, loading, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
