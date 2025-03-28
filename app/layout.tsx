import { Providers } from "@/components/utilities/providers";
import { ClerkProvider } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { createProfile, getProfileByUserId } from "@/db/queries/profiles-queries";
import Header from "@/components/header"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Todo App",
  description: "A full-stack template for a todo app."
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { userId } = await auth();

  if (userId) {
    const profile = await getProfileByUserId(userId);
    if (!profile) {
      await createProfile({ userId });
    }
  }

  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <Providers
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            <Header />
            {children}
          </Providers>
        </body>
      </html>
    </ClerkProvider>
  );
}