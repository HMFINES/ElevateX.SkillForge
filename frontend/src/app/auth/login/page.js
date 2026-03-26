import { Suspense } from "react";
import LoginView from "@/components/auth/LoginView";

export default function AuthLoginPage() {
  return (
    <Suspense fallback={<div className="shell pb-20">Loading login...</div>}>
      <LoginView />
    </Suspense>
  );
}
