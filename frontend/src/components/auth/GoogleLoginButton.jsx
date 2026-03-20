"use client";

import { useEffect, useId, useRef, useState } from "react";

export default function GoogleLoginButton({ onCredential }) {
  const buttonId = useId().replace(/:/g, "");
  const hostRef = useRef(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;

    if (!clientId) {
      setError("Google OAuth is not configured yet.");
      return;
    }

    const initializeGoogle = () => {
      if (!window.google?.accounts?.id || !hostRef.current) return;

      window.google.accounts.id.initialize({
        client_id: clientId,
        callback: ({ credential }) => {
          if (credential) {
            onCredential(credential);
          }
        },
      });

      hostRef.current.innerHTML = "";
      window.google.accounts.id.renderButton(hostRef.current, {
        theme: "outline",
        size: "large",
        shape: "pill",
        text: "continue_with",
        width: 320,
      });
    };

    if (window.google?.accounts?.id) {
      initializeGoogle();
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.onload = initializeGoogle;
    script.onerror = () =>
      setError("Google sign-in could not load. Please try again.");
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, [buttonId, onCredential]);

  return (
    <div className="space-y-3">
      <div ref={hostRef} id={buttonId} className="flex justify-center" />
      {error ? <p className="text-center text-xs text-rose-500">{error}</p> : null}
    </div>
  );
}
