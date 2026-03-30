import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";
import { siteConfig } from "@/lib/site";

export const metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: "ElevateX",
    template: "%s | ElevateX",
  },
  description: siteConfig.description,
  keywords: [
    "ElevateX",
    "edtech platform",
    "AI learning platform",
    "placement preparation",
    "online courses India",
    "verifiable certificates",
    "career dashboard",
  ],
  openGraph: {
    title: "ElevateX",
    description:
      "Learn skills, build proof, earn certificates, and get placement-ready faster with ElevateX.",
    siteName: "ElevateX",
    type: "website",
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "ElevateX",
    description:
      "Learn skills, build proof, earn certificates, and get placement-ready faster with ElevateX.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
        <GoogleAnalytics />
        <Providers>
          <div className="flex min-h-screen flex-col text-ink">
            <Navbar />
            <main className="flex-1 pt-20">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
