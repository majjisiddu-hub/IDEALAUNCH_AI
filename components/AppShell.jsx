"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { ensureDemoAccount } from "../lib/auth";
import { isLoggedIn } from "../lib/storage";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
export default function AppShell({ children }) { const router = useRouter(); const pathname = usePathname(); useEffect(() => { ensureDemoAccount(); if (!isLoggedIn()) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [pathname, router]); return <div className="app-shell"><Sidebar /><main className="main-content"><MobileNavigation />{children}</main></div>; }
