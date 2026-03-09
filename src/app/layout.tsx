import type { Metadata } from "next";
import { Cormorant_Garamond, Playfair_Display } from "next/font/google";
import { ColorSchemeScript, MantineProvider, createTheme } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const theme = createTheme({
  primaryColor: "brown",
  colors: {
    brown: [
      "#f9f5f0",
      "#f0e6d8",
      "#dcc4a8",
      "#c9a27a",
      "#b8845a",
      "#9e6840",
      "#7d5030",
      "#5e3a21",
      "#3d2b1f",
      "#2a1d14",
    ],
  },
  fontFamily: `var(--font-cormorant), Georgia, serif`,
  headings: {
    fontFamily: `var(--font-playfair), Georgia, serif`,
  },
});

export const metadata: Metadata = {
  title: "Tom & Jane Bernard — 50th Anniversary",
  description:
    "Join us to celebrate Tom & Jane Bernard's 50th wedding anniversary on Sunday, June 7th, 2026.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={`${playfair.variable} ${cormorant.variable}`}>
        <MantineProvider theme={theme} forceColorScheme="light">
          <Notifications position="top-center" />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
