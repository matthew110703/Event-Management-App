const year = new Date().getFullYear();
export const months = [
  { label: "Jan", value: `${year}-01` },
  { label: "Feb", value: `${year}-02` },
  { label: "Mar", value: `${year}-03` },
  { label: "Apr", value: `${year}-04` },
  { label: "May", value: `${year}-05` },
  { label: "Jun", value: `${year}-06` },
  { label: "Jul", value: `${year}-07` },
  { label: "Aul", value: `${year}-08` },
  { label: "Sep", value: `${year}-09` },
  { label: "Oct", value: `${year}-10` },
  { label: "Nov", value: `${year}-11` },
  { label: "Dec", value: `${year}-12` },
];

// Navigation Links
// Icons
import { homeIcon, heartIcon, privateIcon } from "../assets";
export const navLinks = [
  { label: "Home", icon: homeIcon, href: "/dashboard" },
  { label: "My Events", icon: heartIcon, href: "/my-events" },
  { label: "Join Private", icon: privateIcon, href: "/join-private" },
];
