import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
export const metadata: Metadata = {
  title: "Pokemon App",
  description: "Application Pokemon avec l'API PokeAPI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <html lang="fr">
      <body className="antialiased" style={{ backgroundColor: '#ff0000' }}>
      <div>
        <Toaster />
      </div>
        {children}
      </body>
    </html>
  );
}
