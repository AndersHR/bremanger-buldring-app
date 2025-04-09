import Footer from "@/components/layout/Footer";
import NavBar from "@/components/layout/NavBar";
import { Provider } from "@/components/ui/provider";
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
          <div className={styles.background}>
            {/* <HeaderWrapper /> */}
            <NavBar />
            <div className={styles.content}>
              <div className={styles.pageLayout}>
                <div className={styles.page}>{children}</div>
              </div>
            </div>
            <Footer />
          </div>
        </Provider>
      </body>
    </html>
  );
}
