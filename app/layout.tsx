import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SessionContext from "@/components/SessionContext";
import { Akaya_Kanadaka, Atma, Carattere } from "next/font/google";
import { Metadata } from "next";

const akaya = Akaya_Kanadaka({
  variable: "--subtitle-font",
  weight: "400",
  subsets: ["latin"],
});

const atma = Atma({
  variable: "--text-font",
  weight: "400",
  subsets: ["latin"],
});

const carattere = Carattere({
  variable: "--title-font",
  weight: "400",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Trenuj szczęście - Fizjoterapia i Trening Medyczny",
    template: "%s | Fizjotrenerka.eu",
  },
  description:
    "Profesjonalna fizjoterapia, rehabilitacja i trening medyczny. Pomagam wrócić do sprawności po kontuzjach i pozbyć się bólu. Zapraszam na konsultacje w Szczecinie.",
  keywords: [
    "fizjoterapia",
    "trening medyczny",
    "rehabilitacja",
    "fizjoterapeuta",
    "powrót do sportu",
    "leczenie bólu kręgosłupa",
  ],
  authors: [{ name: "Cezary Makowski" }],
  creator: "Cezary Makowski",
  metadataBase: new URL("https://fizjotrenerka.eu"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Trenuj szczęście - Fizjoterapia i Trening Medyczny",
    description:
      "Skuteczna rehabilitacja i wsparcie w treningu. Sprawdź ofertę i umów się na wizytę!",
    url: "https://fizjotrenerka.eu",
    siteName: "Fizjotrenerka",
    locale: "pl_PL",
    type: "website",
    images: [
      {
        url: "/logo-Graph.png",
        width: 1200,
        height: 1200,
        alt: "Fizjotrenerka - Patrycja Makowska",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={`${akaya.variable} ${atma.variable} ${carattere.variable}`}
      >
        <Nav />
        <SessionContext>
          <div className="page-wrapper">{children}</div>
        </SessionContext>
        <Footer />
      </body>
    </html>
  );
}
