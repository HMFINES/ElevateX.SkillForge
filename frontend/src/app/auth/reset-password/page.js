import { Suspense } from "react";
import ResetPasswordView from "@/components/auth/ResetPasswordView";

export default function AuthResetPasswordPage() {
  return (
    <Suspense fallback={<div className="shell pb-20">Loading password recovery...</div>}>
      <ResetPasswordView />
    </Suspense>
  );
}
