"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import InputField from "@/design-system/InputField";

export default function PasswordField({ label = "Password", ...props }) {
  const [visible, setVisible] = useState(false);

  return (
    <InputField
      label={label}
      type={visible ? "text" : "password"}
      suffix={
        <button
          type="button"
          className="text-muted transition hover:text-ink"
          onClick={() => setVisible((current) => !current)}
          aria-label={visible ? "Hide password" : "Show password"}
        >
          {visible ? <EyeOff size={16} /> : <Eye size={16} />}
        </button>
      }
      {...props}
    />
  );
}
