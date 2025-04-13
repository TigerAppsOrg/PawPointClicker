import "~/styles/globals.css";
import "@radix-ui/themes/styles.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";

import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";

// import { Roboto } from "next/font/google";

// const roboto = Roboto({
//   weight: "400",
//   subsets: ["latin"],
//   display: "swap",
// });

import { Theme } from "@radix-ui/themes";

export const metadata: Metadata = {
  title: "PawPointClicker",
  description:
    "PawPointClicker is a game about making an absurd amount of paw points from scanning your prox. To help you in this endeavor, you will recruit a wide variety of helpful prox scanners.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
  session,
}: Readonly<{ children: React.ReactNode; session: Session | null }>) {
  return (
    <html
      lang="en"
      className={`${GeistSans.variable}`}
      // className={roboto.className}
    >
      <body>
        <Theme>
          <SessionProvider session={session}>{children}</SessionProvider>
        </Theme>
      </body>
    </html>
  );
}
