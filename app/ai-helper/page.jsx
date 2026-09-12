"use client";
import { useEffect, useState } from "react";
import AppShell from "../../components/AppShell";
import AIChat from "../../components/AIChat";
import { getIdeaById } from "../../lib/ideas";
export default function AIHelperPage() { const [context, setContext] = useState(null); useEffect(() => { const id = new URLSearchParams(window.location.search).get("ideaId"); if (id) setContext(getIdeaById(id)); }, []); return <AppShell><header className="page-header ai-page-header"><div><span className="eyebrow">IDEALAUNCH AI / Startup companion</span><h1>IDEALAUNCH AI</h1><p>Your AI-powered startup companion for sharper ideas and clearer next steps.</p></div><button className="button button-quiet" onClick={() => window.location.reload()}>＋ New conversation</button></header>{context && <section className="ai-context"><div className="ai-context-icon">✦</div><div><span className="section-label">AI Assistant is ready to help with</span><h2>{context.title || context.name}</h2><p>{context.category} · {context.description}</p><small>Audience: {context.audience || context.targetAudience}</small></div></section>}<AIChat context={context} /></AppShell>; }
