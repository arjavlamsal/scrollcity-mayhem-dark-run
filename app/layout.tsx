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
        <link rel="preload" href="https://drive.google.com/thumbnail?id=1LfRNG8pJK8F0lYtXH9tfGT70l4IW-66S&sz=w1000" as="image" />
        <link rel="preload" href="https://drive.google.com/thumbnail?id=1oxPBLaiwJR1QzOrLC4Z_dt5nFl56RzoN&sz=w1000" as="image" />
        <link rel="preload" href="https://drive.google.com/thumbnail?id=1tbtI6RBfVzPV8TbA-Ww44E5Dz5_Ek3m0&sz=w1000" as="image" />
        <link rel="preload" href="https://drive.google.com/thumbnail?id=1eIBkrLk1cMlnsLETX1sLeqOc0On0D2R2&sz=w1000" as="image" />
      </head>
      <body>
        {children}
      </body>
    </html>
  );
}
