import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import StyledComponentsRegistry from "@/components/Registry";
import PageContainer from "@/components/PageContainer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Boocket",
  description: "Calculate how much paint you need to paint a room!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StyledComponentsRegistry>
          <PageContainer>{children}</PageContainer>
        </StyledComponentsRegistry>
      </body>
    </html>
  );
}
