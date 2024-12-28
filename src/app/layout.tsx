import "../styles/globals.css";
import { Jost } from "next/font/google";
import { cn } from "@/lib/utils";
const jost = Jost({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link
          rel="icon"
          type="image/png"
          href="/favicon-96x96.png"
          sizes="96x96"
        />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="shortcut icon" href="/favicon.ico" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Decision App" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body
        className={cn(
          jost.className,
          "relative container max-w-screen-lg h-dvh antialiased"
        )}
      >
        <div className="text-xs fixed top-0 left-0 text-gray opacity-75">
          <span>ALFA-1.0.0</span>
        </div>
        {children}
      </body>
    </html>
  );
}
