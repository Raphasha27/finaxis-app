import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "FinAxis | Kirov Dynamics Secure Hub",
  description: "Enterprise banking and event management ecosystem.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600;700;800&family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet" />
      </head>
      <body className="font-sans bg-[#05070A] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
