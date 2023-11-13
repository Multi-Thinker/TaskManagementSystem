"use client";
import React from "react";
import LoginPopup from "@/src/component/Login";
import { SessionProvider } from "@/src/hooks/use-session";

export default function Login() {
  return (
    <SessionProvider>
      <LoginPopup />
    </SessionProvider>
  );
}
