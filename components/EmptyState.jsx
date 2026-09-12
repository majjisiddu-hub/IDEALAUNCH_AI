import Link from "next/link";
export default function EmptyState({ title, message, href = "/ideas", label = "Explore ideas" }) { return <div className="empty-state"><div className="empty-icon">✦</div><h3>{title}</h3><p>{message}</p><Link className="button button-primary" href={href}>{label}</Link></div>; }
