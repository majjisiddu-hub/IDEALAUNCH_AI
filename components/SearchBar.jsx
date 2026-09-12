"use client";
export default function SearchBar({ value, onChange }) { return <div className="field-wrap"><span className="search-icon">⌕</span><input id="idea-search" type="search" value={value} onChange={(event) => onChange(event.target.value)} placeholder="Search titles, problems, tags..." aria-label="Search startup ideas" /></div>; }
