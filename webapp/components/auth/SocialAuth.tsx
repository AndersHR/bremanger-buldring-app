"use client";

import { createClient } from "@/lib/supabase/browserClient";
import { getCssVariable } from "@/utils/utils";
import { Skeleton } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { useEffect, useState } from "react";
import styles from "./auth.module.css";

export function SocialAuth() {
  const supabaseClient = createClient();
  const [variables, setVariables] = useState<Record<string, string>>({});

  useEffect(() => {
    const fontSize = getCssVariable("--font-size-m");
    if (fontSize) setVariables((prev) => ({ ...prev, fontSize: fontSize }));

    const fontWeightBold = getCssVariable("--font-weight-bold");
    if (fontWeightBold)
      setVariables((prev) => ({ ...prev, fontWeightBold: fontWeightBold }));
  }, []);

  return (
    <div className={styles.authContainer}>
      <div className={styles.authButton}>
        <Auth
          supabaseClient={supabaseClient}
          providers={["google"]}
          appearance={{
            theme: ThemeSupa,
            style: {
              button: {
                height: "100%",
                width: "100%",
                margin: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: `none`,
                fontSize: variables["fontSize"] ?? "16px",
                fontWeight: variables["fontWeightBold"] ?? 700,
                color: "black",
                columnGap: "8px",
              },
              container: {
                height: "42px",
                width: "100%",
                maxWidth: "100%",
                flex: 1,
                margin: "0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              },
            },
          }}
          onlyThirdPartyProviders
          localization={{
            variables: {
              sign_in: {
                social_provider_text: "Fortsett med Google",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export function SocialAuthSkeleton() {
  return (
    <div className={styles.authContainer}>
      <Skeleton />
    </div>
  );
}
