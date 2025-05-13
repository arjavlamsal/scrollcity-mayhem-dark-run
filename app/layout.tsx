import type { Metadata } from "next";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import "./hammers.css";
import "./birds.css";

export const metadata: Metadata = {
  title: "Scroll Game: Dark Run",
  description: "A horizontal scrolling game through the darkness to find home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
