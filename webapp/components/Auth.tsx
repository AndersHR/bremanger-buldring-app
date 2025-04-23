"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import styles from "./auth.module.css";

export const SocialAuth = () => {
  const supabaseClient = createClient();
  return (
    <div className={styles.authContainer}>
      <Auth
        supabaseClient={supabaseClient}
        providers={["google"]}
        socialLayout="horizontal"
        appearance={{ theme: ThemeSupa }}
        onlyThirdPartyProviders
      />
    </div>
  );
};
