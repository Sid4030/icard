export const ATTENDEES = {
  "siddhant-choudhary": {
    slug: "siddhant-choudhary",
    name: "Siddhant Choudhary",
    shortName: "Siddhant",
    role: "Lead Organizer & Core Lead",
    department: "Cyber Security & Infrastructure",
    event: "Cybercup 6.0",
    id: "CC6-001-CORE",
    email: "chosiddhant125@gmail.com",
    phone: "+91 98765 43210",
    instagram: "sid_choudhary",
    github: "Sid4030",
    avatar: "/avatars/siddhant.jpg",
    accentColor: "#00f2fe",
    accentSecondary: "#4facfe",
    tier: "CORE TEAM / ORGANIZER",
    bloodGroup: "O+",
    emergencyPhone: "+91 98765 00000",
    venue: "Main Arena & Tech Dome",
    accessLevel: "All-Access VIP / Arena Pass",
    description: "Core lead overseeing technical infrastructure, CTF challenges, and event operations for Cybercup 6.0."
  },
  "siddhant": {
    aliasOf: "siddhant-choudhary"
  },
  "harsh": {
    slug: "harsh",
    name: "Harsh Choudhary",
    shortName: "Harsh",
    role: "Cybersecurity Lead & Analyst",
    department: "Vulnerability Research & Red Team",
    event: "Cybercup 6.0",
    id: "CC6-007-SEC",
    email: "harsh.cybercup@gmail.com",
    phone: "+91 91234 56789",
    instagram: "harsh_choudhary",
    github: "harsh-sec",
    avatar: "/avatars/harsh.jpg",
    accentColor: "#a855f7",
    accentSecondary: "#ec4899",
    tier: "CORE TEAM / SECURITY",
    bloodGroup: "B+",
    emergencyPhone: "+91 91234 00000",
    venue: "Main Arena & CTF War Room",
    accessLevel: "VIP Security Pass",
    description: "Leading CTF challenge architecture, offensive security workshops, and participant defense tracks."
  },
  "harsh-choudhary": {
    aliasOf: "harsh"
  }
};

/**
 * Format raw slug into clean Title Case name
 * e.g. "siddhant-choudhary" -> "Siddhant Choudhary"
 */
export function formatSlugToName(slug) {
  if (!slug) return "Participant";
  return slug
    .split(/[-_]+/)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

/**
 * Retrieve attendee data or dynamically construct one for any custom URL name
 */
export function getAttendeeBySlug(rawSlug) {
  if (!rawSlug) {
    return ATTENDEES["siddhant-choudhary"];
  }

  const cleanSlug = rawSlug.trim().toLowerCase().replace(/^\/+|\/+$/g, "");
  
  if (ATTENDEES[cleanSlug]) {
    const entry = ATTENDEES[cleanSlug];
    if (entry.aliasOf) {
      return ATTENDEES[entry.aliasOf];
    }
    return entry;
  }

  // Dynamic fallback for any URL name passed (e.g. /rohit-verma or /ananya)
  const formattedName = formatSlugToName(cleanSlug);
  const shortName = formattedName.split(" ")[0] || formattedName;
  const hashId = Math.abs(
    cleanSlug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0)
  ).toString().slice(-4).padStart(4, "7");

  return {
    slug: cleanSlug,
    name: formattedName,
    shortName: shortName,
    role: "Cybercup 6.0 Attendee",
    department: "Offensive Security & CTF Track",
    event: "Cybercup 6.0",
    id: `CC6-${hashId}-ATT`,
    email: `${cleanSlug.replace(/[^a-z0-9]/g, ".")}@cybercup.tech`,
    phone: "+91 98*** *****",
    instagram: cleanSlug.replace(/[^a-z0-9]/g, "_"),
    github: cleanSlug.replace(/[^a-z0-9]/g, "-"),
    avatar: null, // dynamic initials avatar
    accentColor: "#38bdf8",
    accentSecondary: "#818cf8",
    tier: "REGISTERED PARTICIPANT",
    bloodGroup: "A+",
    emergencyPhone: "+91 98000 00000",
    venue: "Main Tech Auditorium",
    accessLevel: "Standard Participant Pass",
    description: `Official Cybercup 6.0 identity credentials issued for ${formattedName}.`
  };
}
