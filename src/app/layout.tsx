import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.css";
import ClientWrapper from "./components/client-wrapper";
import { ThemeProvider } from "@/components/theme-provider";

const rubik = Rubik({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Flow Nodes",
  description: "Build mind maps and schema here!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={rubik.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <ClientWrapper>{children}</ClientWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
