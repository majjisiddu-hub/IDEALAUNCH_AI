"use client";
export default function SortDropdown({ value, onChange }) { return <select value={value} onChange={(event) => onChange(event.target.value)} aria-label="Sort startup ideas"><option value="featured">Featured</option><option value="rating">Highest rated</option><option value="newest">Newest</option><option value="az">A-Z</option></select>; }
