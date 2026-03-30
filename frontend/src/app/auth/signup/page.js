import { Suspense } from "react";
import SignupView from "@/components/auth/SignupView";

export default function AuthSignupPage() {
  return (
    <Suspense fallback={<div className="shell pb-20">Loading signup...</div>}>
      <SignupView />
    </Suspense>
  );
}
