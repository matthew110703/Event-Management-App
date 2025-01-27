const year = new Date().getFullYear();
export const months = [
  { label: "Jan", from: `${year}-01-01`, to: `${year}-01-31` },
  { label: "Feb", from: `${year}-02-01`, to: `${year}-02-28` },
  { label: "Mar", from: `${year}-03-01`, to: `${year}-03-31` },
  { label: "Apr", from: `${year}-04-01`, to: `${year}-04-30` },
  { label: "May", from: `${year}-05-01`, to: `${year}-05-31` },
  { label: "Jun", from: `${year}-06-01`, to: `${year}-06-30` },
  { label: "Jul", from: `${year}-07-01`, to: `${year}-07-31` },
  { label: "Aug", from: `${year}-08-01`, to: `${year}-08-31` },
  { label: "Sep", from: `${year}-09-01`, to: `${year}-09-30` },
  { label: "Oct", from: `${year}-10-01`, to: `${year}-10-31` },
  { label: "Nov", from: `${year}-11-01`, to: `${year}-11-30` },
  { label: "Dec", from: `${year}-12-01`, to: `${year}-12-31` },
];

// Navigation Links
// Icons
import { homeIcon, heartIcon, privateIcon } from "../assets";
export const navLinks = [
  { label: "Home", icon: homeIcon, href: "/dashboard" },
  { label: "My Events", icon: heartIcon, href: "/my-events" },
  { label: "Join Event", icon: privateIcon, href: "/join-event" },
];
