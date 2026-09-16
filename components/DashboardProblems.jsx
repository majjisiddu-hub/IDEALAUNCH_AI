"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { api } from "../lib/api";
import ProblemCard from "./ProblemCard";
export default function DashboardProblems() { const [problems, setProblems] = useState([]); useEffect(() => { api.get("/problems?sort=newest").then((result) => setProblems(result.problems.slice(0, 3))).catch(() => setProblems([])); }, []); return <section className="dashboard-problems"><div className="section-heading"><div><span className="section-label">Live signal</span><h2>Real-Time Problems</h2><p className="muted">Discover real-world problems that can become startup opportunities.</p></div><Link className="button button-secondary" href="/problems">View All Problems</Link></div>{problems.length ? <div className="idea-grid">{problems.map((problem) => <ProblemCard key={problem.id} problem={problem} />)}</div> : <div className="recent-empty"><p>Real-time problem data is currently unavailable.</p><Link href="/problems">Retry</Link></div>}</section>; }
