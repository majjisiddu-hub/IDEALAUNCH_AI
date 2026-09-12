"use client";
import { useState } from "react";
import Navbar from "./Navbar";
export default function MobileNavigation() { const [open, setOpen] = useState(false); return <><div className="mobile-topbar"><div className="brand"><span className="brand-mark">I</span><span className="brand-name">IDEA<span>LAUNCH</span></span></div><button className="menu-button" type="button" aria-label="Open navigation" aria-expanded={open} onClick={() => setOpen(!open)}>☰</button></div>{open && <div className="mobile-nav-overlay"><Navbar /></div>}</>; }
