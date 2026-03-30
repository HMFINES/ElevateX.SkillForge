"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/design-system/Button";
import { api } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

let razorpayScriptPromise;

const ensureRazorpayCheckout = () => {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Checkout is only available in the browser."));
  }

  if (typeof window.Razorpay === "function") {
    return Promise.resolve();
  }

  if (!razorpayScriptPromise) {
    razorpayScriptPromise = new Promise((resolve, reject) => {
      const existingScript = document.querySelector('script[data-razorpay-checkout="true"]');

      if (existingScript) {
        existingScript.addEventListener("load", () => resolve(), { once: true });
        existingScript.addEventListener(
          "error",
          () => reject(new Error("Secure checkout could not load right now.")),
          { once: true }
        );
        return;
      }

      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      script.dataset.razorpayCheckout = "true";
      script.onload = () => resolve();
      script.onerror = () => reject(new Error("Secure checkout could not load right now."));
      document.body.appendChild(script);
    });
  }

  return razorpayScriptPromise;
};

export default function UpgradeButton({
  label = "Upgrade to Pro",
  variant = "primary",
  size = "lg",
  className,
  redirectTo = "/dashboard",
  onSuccess,
}) {
  const router = useRouter();
  const { token, user, isAuthenticated, refreshProfile } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCheckout = async () => {
    if (user?.plan === "pro" && user?.planStatus === "active") {
      router.push(redirectTo);
      return;
    }

    if (!isAuthenticated || !token) {
      router.push(`/auth/signup?next=${encodeURIComponent(redirectTo)}`);
      return;
    }

    setLoading(true);
    setError("");

    try {
      const configResponse = await api.getPaymentConfig();
      if (!configResponse.enabled || !configResponse.keyId) {
        throw new Error("Payments are not configured yet. Add Razorpay keys to go live.");
      }

      await ensureRazorpayCheckout();

      const orderResponse = await api.createProOrder(token);
      const checkout = new window.Razorpay({
        key: configResponse.keyId,
        amount: orderResponse.order.amount,
        currency: orderResponse.order.currency,
        order_id: orderResponse.order.id,
        name: "ElevateX",
        description: configResponse.plan.description,
        prefill: {
          name: orderResponse.prefill?.name || user?.name || "",
          email: orderResponse.prefill?.email || user?.email || "",
        },
        theme: {
          color: configResponse.themeColor || "#5169ff",
        },
        modal: {
          ondismiss: () => setLoading(false),
        },
        handler: async (paymentResponse) => {
          setLoading(true);

          try {
            await api.verifyProPayment(token, paymentResponse);
            await refreshProfile();

            if (typeof onSuccess === "function") {
              onSuccess();
            } else {
              router.push(redirectTo);
              router.refresh();
            }
          } catch (checkoutError) {
            setError(checkoutError.message || "Payment verification failed.");
          } finally {
            setLoading(false);
          }
        },
      });

      checkout.on("payment.failed", (event) => {
        setError(
          event?.error?.description ||
            event?.error?.reason ||
            "Payment failed before completion."
        );
        setLoading(false);
      });

      checkout.open();
      setLoading(false);
    } catch (checkoutError) {
      setError(checkoutError.message || "Could not start the payment flow.");
      setLoading(false);
    }
  };

  return (
    <div className="space-y-2">
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={handleCheckout}
        disabled={loading}
      >
        {loading ? "Preparing checkout..." : label}
      </Button>
      {error ? <p className="text-sm text-error">{error}</p> : null}
    </div>
  );
}
