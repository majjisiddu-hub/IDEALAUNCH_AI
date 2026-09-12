import { ideas } from "../data/ideas";
import { getUserIdeas } from "./storage";
export function getAllIdeas() { return [...ideas, ...getUserIdeas()]; }
export function getIdeaById(id) { return getAllIdeas().find((idea) => idea.id === id); }
export function getIdeasByIds(ids) { return ids.map((id) => getIdeaById(id)).filter(Boolean); }
export function titleOf(idea) { return idea?.title || idea?.name || "Untitled idea"; }
