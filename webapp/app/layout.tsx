import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { Provider } from "@/components/ui/provider";
import { AuthProvider } from "@/lib/providers/AuthProvider";
import { NavBarProvider } from "@/lib/providers/NavBarProvider";
import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Bremanger Buldring",
  description: "Buldring i Bremanger og omegn.",
  icons: {
    icon: [
      {
        url: "/favicon-black.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-white.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="no" suppressHydrationWarning>
      <body className={`${lato.className} antialiased`}>
        <Provider>
          <AuthProvider>
            <NavBarProvider>
              <div className={styles.background}>
                <NavBar />
                <div className={styles.content}>
                  <div className={styles.pageLayout}>
                    <div className={styles.page}>{children}</div>
                  </div>
                </div>
                <Footer />
              </div>
            </NavBarProvider>
          </AuthProvider>
        </Provider>
      </body>
    </html>
  );
}
