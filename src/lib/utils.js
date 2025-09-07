import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    ...options,
  }).format(date);
};

export const getEventStatus = (endTime, startTime) => {
  const now = new Date();
  const start = new Date(startTime);
  const end = new Date(endTime);

  if (now < start) return "upcoming";
  if (now >= start && now <= end) return "ongoing";
  return "ended";
};

export const BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";

export const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const getNowISO = () => new Date().toISOString().slice(0, 16);

export const getMinEndTime = (start) => {
  if (!start) return getNowISO();
  const startDate = new Date(start);
  startDate.setHours(startDate.getHours() + 3);
  return startDate.toISOString().slice(0, 16);
};
