import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "PawPoint Clicker",
  description:
    "Paw Point Clicker is a game about making an absurd amount of paw points from scanning your prox. To help you in this endeavor, you will recruit a wide variety of helpful prox scanners.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body>
        <Theme>{children} </Theme>
      </body>
    </html>
  );
}
