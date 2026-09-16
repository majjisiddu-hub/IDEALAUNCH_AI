"use client";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isLoggedIn } from "../lib/storage";
import Sidebar from "./Sidebar";
import MobileNavigation from "./MobileNavigation";
import DashboardProblems from "./DashboardProblems";
export default function AppShell({ children }) { const router = useRouter(); const pathname = usePathname(); useEffect(() => { if (!isLoggedIn()) router.replace(`/login?next=${encodeURIComponent(pathname)}`); }, [pathname, router]); return <div className="app-shell"><Sidebar /><main className="main-content"><MobileNavigation />{children}{pathname === "/dashboard" && <DashboardProblems />}</main></div>; }
