"use client";

import { Suspense, useEffect, useRef } from "react";
import Script from "next/script";
import { usePathname, useSearchParams } from "next/navigation";

const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

function trackPageView(url) {
  if (!measurementId || typeof window === "undefined" || typeof window.gtag !== "function") {
    return;
  }

  window.gtag("event", "page_view", {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
  });
}

function GoogleAnalyticsPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isFirstPageView = useRef(true);

  useEffect(() => {
    if (isFirstPageView.current) {
      isFirstPageView.current = false;
      return;
    }

    const query = searchParams?.toString();
    const url = query ? `${pathname}?${query}` : pathname;
    trackPageView(url);
  }, [pathname, searchParams]);

  return null;
}

export default function GoogleAnalytics() {
  if (!measurementId) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){window.dataLayer.push(arguments);}
          window.gtag = gtag;
          gtag('js', new Date());
          gtag('config', '${measurementId}', { send_page_view: false });
          gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href,
            page_path: window.location.pathname + window.location.search
          });
        `}
      </Script>
      <Suspense fallback={null}>
        <GoogleAnalyticsPageTracker />
      </Suspense>
    </>
  );
}
