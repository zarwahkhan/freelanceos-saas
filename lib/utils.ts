import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number, currency = "USD") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
  }).format(amount);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}

export function getTrustLevel(score: number) {
  if (score >= 90) return { label: "Elite", color: "text-purple-400" };
  if (score >= 75) return { label: "Expert", color: "text-blue-400" };
  if (score >= 60) return { label: "Advanced", color: "text-green-400" };
  if (score >= 40) return { label: "Rising", color: "text-yellow-400" };
  return { label: "Newcomer", color: "text-gray-400" };
}

export function getRiskColor(risk: string) {
  switch (risk) {
    case "LOW":
      return "text-green-400 bg-green-400/10";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-400/10";
    case "HIGH":
      return "text-red-400 bg-red-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}

export function getPriorityColor(priority: string) {
  switch (priority) {
    case "URGENT":
      return "text-red-400 bg-red-400/10";
    case "HIGH":
      return "text-orange-400 bg-orange-400/10";
    case "MEDIUM":
      return "text-yellow-400 bg-yellow-400/10";
    case "LOW":
      return "text-green-400 bg-green-400/10";
    default:
      return "text-gray-400 bg-gray-400/10";
  }
}
