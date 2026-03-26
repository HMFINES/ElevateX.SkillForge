import "./globals.css";
import Providers from "./providers";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

export const metadata = {
  title: {
    default: "ElevateX",
    template: "%s | ElevateX",
  },
  description:
    "ElevateX is an AI-guided career learning platform for students in India to learn skills, build projects, earn verifiable certificates, and get placement-ready faster.",
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
  },
  twitter: {
    card: "summary_large_image",
    title: "ElevateX",
    description:
      "Learn skills, build proof, earn certificates, and get placement-ready faster with ElevateX.",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased">
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
