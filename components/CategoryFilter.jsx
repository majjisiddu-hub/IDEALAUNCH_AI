"use client";
export default function CategoryFilter({ value, onChange, categories }) { return <select value={value} onChange={(event) => onChange(event.target.value)} aria-label="Filter by category"><option value="all">All Categories</option>{categories.map((category) => <option key={category}>{category}</option>)}</select>; }
