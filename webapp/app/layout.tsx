import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";
import styles from "./layout.module.css";
import Header from "@/components/ui/Header";
import Footer from "@/components/ui/Footer";

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
    <html lang="no">
      <body className={`${lato.className} antialiased`}>
        <div className={styles.background}>
          <Header />
          <div className={styles.content}>{children}</div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
