import { Suspense } from "react";
import VerifyView from "@/components/auth/VerifyView";

export default function AuthVerifyPage() {
  return (
    <Suspense fallback={<div className="shell pb-20">Loading verification...</div>}>
      <VerifyView />
    </Suspense>
  );
}
