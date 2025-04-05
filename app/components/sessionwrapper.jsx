
// components/SessionWrapper.jsx
"use client"; // Mark this as a Client Component

import { SessionProvider } from "next-auth/react";

export default function SessionWrapper({ children }) {
  return <SessionProvider>{children}</SessionProvider>;
}
