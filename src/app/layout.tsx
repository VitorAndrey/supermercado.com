import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "src/styles/globals.css";
import { twMerge } from "tailwind-merge";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Popular supermercado",
  description: "popular supermercado",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-br">
      <body className={twMerge("bg-zinc-100", inter.className)}>
        {children}
      </body>
    </html>
  );
}
