/**
 * CYBERCUP 6.0 - CORE TEAM & ATTENDEE REGISTRY
 * 
 * ℹ️ HOW PHYSICAL QR CODES & EDITING WORK:
 * 1. Each QR code printed on a card points to a permanent web URL:
 *    https://<your-vercel-domain>/<member-slug>
 * 2. When you edit any information in this file (names, roles, phones, emails, etc.)
 *    and push to GitHub, Vercel updates the website in seconds.
 * 3. The physical QR code printed on the i-card will ALWAYS work and immediately
 *    display the updated details. You NEVER need to reprint the QR code!
 */

export const ATTENDEES = {
  // 1. Siddhant Choudhary
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
    avatar: null, // Simple clean design with name only (add image path later if desired)
    accentColor: "#00f2fe",
    accentSecondary: "#4facfe",
    tier: "CORE TEAM / LEAD",
    bloodGroup: "O+",
    emergencyPhone: "+91 98765 00000",
    venue: "Main Arena & Tech Dome",
    accessLevel: "All-Access VIP / Arena Pass",
    description: "Core lead overseeing overall technical architecture, CTF operations, and symposium execution for Cybercup 6.0."
  },
  "siddhant": {
    aliasOf: "siddhant-choudhary"
  },

  // 2. Manan Nidar
  "manan-nidar": {
    slug: "manan-nidar",
    name: "Manan Nidar",
    shortName: "Manan",
    role: "Technical Operations Head",
    department: "Systems & Platform Infrastructure",
    event: "Cybercup 6.0",
    id: "CC6-002-TECH",
    email: "manan.nidar@cybercup.tech",
    phone: "+91 98765 43211",
    instagram: "manan_nidar",
    github: "manan-nidar",
    avatar: null,
    accentColor: "#38bdf8",
    accentSecondary: "#818cf8",
    tier: "CORE TEAM / TECH HEAD",
    bloodGroup: "B+",
    emergencyPhone: "+91 98765 00001",
    venue: "Main Arena & Server Hub",
    accessLevel: "Technical Operations VIP Pass",
    description: "Head of technical operations, managing live server orchestration, network stability, and platform defense."
  },
  "manan": {
    aliasOf: "manan-nidar"
  },

  // 3. Kusagra Rai
  "kusagra-rai": {
    slug: "kusagra-rai",
    name: "Kusagra Rai",
    shortName: "Kusagra",
    role: "Event Operations & Logistics Head",
    department: "Arena Management & Logistics",
    event: "Cybercup 6.0",
    id: "CC6-003-OPS",
    email: "kusagra.rai@cybercup.tech",
    phone: "+91 98765 43212",
    instagram: "kusagra_rai",
    github: "kusagra-rai",
    avatar: null,
    accentColor: "#10b981",
    accentSecondary: "#06b6d4",
    tier: "CORE TEAM / OPERATIONS",
    bloodGroup: "A+",
    emergencyPhone: "+91 98765 00002",
    venue: "Main Tech Dome & Operations Center",
    accessLevel: "Operations VIP Pass",
    description: "Directing event logistics, arena flow, schedule coordination, and on-ground symposium execution."
  },
  "kusagra": {
    aliasOf: "kusagra-rai"
  },

  // 4. Riddhi Jain
  "riddhi-jain": {
    slug: "riddhi-jain",
    name: "Riddhi Jain",
    shortName: "Riddhi",
    role: "Media & Creative Communications Head",
    department: "Brand Experience & Media Operations",
    event: "Cybercup 6.0",
    id: "CC6-004-MEDIA",
    email: "riddhi.jain@cybercup.tech",
    phone: "+91 98765 43213",
    instagram: "riddhi_jain",
    github: "riddhi-jain",
    avatar: null,
    accentColor: "#f43f5e",
    accentSecondary: "#fb7185",
    tier: "CORE TEAM / CREATIVE",
    bloodGroup: "B+",
    emergencyPhone: "+91 98765 00003",
    venue: "Media Center & Main Stage",
    accessLevel: "VIP Media Pass",
    description: "Overseeing media coverage, visual storytelling, broadcast streams, and attendee creative engagement."
  },
  "riddhi": {
    aliasOf: "riddhi-jain"
  },

  // 5. Tarun Tiwari
  "tarun-tiwari": {
    slug: "tarun-tiwari",
    name: "Tarun Tiwari",
    shortName: "Tarun",
    role: "Security & Arena Defense Head",
    department: "Cyber Defense & Arena Security",
    event: "Cybercup 6.0",
    id: "CC6-005-SEC",
    email: "tarun.tiwari@cybercup.tech",
    phone: "+91 98765 43214",
    instagram: "tarun_tiwari",
    github: "tarun-tiwari",
    avatar: null,
    accentColor: "#f59e0b",
    accentSecondary: "#d97706",
    tier: "CORE TEAM / SECURITY",
    bloodGroup: "O+",
    emergencyPhone: "+91 98765 00004",
    venue: "CTF Security Hub & Gate 1",
    accessLevel: "VIP Security Access",
    description: "Leading event cybersecurity protocol, access integrity, hardware monitoring, and incident response."
  },
  "tarun": {
    aliasOf: "tarun-tiwari"
  },

  // 6. Jewel Virmani
  "jewel-virmani": {
    slug: "jewel-virmani",
    name: "Jewel Virmani",
    shortName: "Jewel",
    role: "PR & Participant Experience Head",
    department: "Public Relations & Delegate Relations",
    event: "Cybercup 6.0",
    id: "CC6-006-PR",
    email: "jewel.virmani@cybercup.tech",
    phone: "+91 98765 43215",
    instagram: "jewel_virmani",
    github: "jewel-virmani",
    avatar: null,
    accentColor: "#a855f7",
    accentSecondary: "#c084fc",
    tier: "CORE TEAM / PR & RELATIONS",
    bloodGroup: "AB+",
    emergencyPhone: "+91 98765 00005",
    venue: "Delegate Lounge & Registration Dome",
    accessLevel: "VIP Delegate Pass",
    description: "Heading public relations, guest experience, institution delegations, and speaker communications."
  },
  "jewel": {
    aliasOf: "jewel-virmani"
  },

  // 7. Achintya Chaitanya
  "achintya-chaitanya": {
    slug: "achintya-chaitanya",
    name: "Achintya Chaitanya",
    shortName: "Achintya",
    role: "CTF Platform & Scoring Lead",
    department: "Cyber Challenges & Scored Tracks",
    event: "Cybercup 6.0",
    id: "CC6-007-CTF",
    email: "achintya.chaitanya@cybercup.tech",
    phone: "+91 98765 43216",
    instagram: "achintya_chaitanya",
    github: "achintya-chaitanya",
    avatar: null,
    accentColor: "#06b6d4",
    accentSecondary: "#3b82f6",
    tier: "CORE TEAM / CTF LEAD",
    bloodGroup: "A+",
    emergencyPhone: "+91 98765 00006",
    venue: "CTF War Room & Arena Stage",
    accessLevel: "VIP War Room Pass",
    description: "Architecting CTF scoring engines, binary exploitation challenges, and real-time telemetry leaderboards."
  },
  "achintya": {
    aliasOf: "achintya-chaitanya"
  },

  // 8. Anmol Middha
  "anmol-middha": {
    slug: "anmol-middha",
    name: "Anmol Middha",
    shortName: "Anmol",
    role: "Sponsorship & Industry Partnerships Head",
    department: "External Affairs & Sponsor Relations",
    event: "Cybercup 6.0",
    id: "CC6-008-EXT",
    email: "anmol.middha@cybercup.tech",
    phone: "+91 98765 43217",
    instagram: "anmol_middha",
    github: "anmol-middha",
    avatar: null,
    accentColor: "#eab308",
    accentSecondary: "#ef4444",
    tier: "CORE TEAM / SPONSORSHIPS",
    bloodGroup: "O-",
    emergencyPhone: "+91 98765 00007",
    venue: "VIP Corporate Lounge & Main Arena",
    accessLevel: "VIP Corporate Pass",
    description: "Leading corporate sponsorships, industry partner tie-ups, mentor outreach, and prize ecosystem."
  },
  "anmol": {
    aliasOf: "anmol-middha"
  }
};

/**
 * List of primary core members for navigation & QR code generation
 */
export const CORE_MEMBERS = [
  "siddhant-choudhary",
  "manan-nidar",
  "kusagra-rai",
  "riddhi-jain",
  "tarun-tiwari",
  "jewel-virmani",
  "achintya-chaitanya",
  "anmol-middha"
];

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

  // Normalize slug: lowercase, replace spaces/underscores with hyphen, strip slashes
  const cleanSlug = rawSlug
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/^\/+|\/+$/g, "");

  // Direct match or alias
  if (ATTENDEES[cleanSlug]) {
    const entry = ATTENDEES[cleanSlug];
    if (entry.aliasOf) {
      return ATTENDEES[entry.aliasOf];
    }
    return entry;
  }

  // Check without hyphens (e.g. "manannidar" -> "manan-nidar")
  const noHyphenSlug = cleanSlug.replace(/-/g, "");
  for (const key of Object.keys(ATTENDEES)) {
    if (key.replace(/-/g, "") === noHyphenSlug) {
      const entry = ATTENDEES[key];
      return entry.aliasOf ? ATTENDEES[entry.aliasOf] : entry;
    }
  }

  // Dynamic fallback for any custom URL name passed (e.g. /rohit-verma or /guest)
  const formattedName = formatSlugToName(cleanSlug);
  const shortName = formattedName.split(" ")[0] || formattedName;
  const hashId = Math.abs(
    cleanSlug.split("").reduce((acc, char) => (acc * 31 + char.charCodeAt(0)) | 0, 0)
  ).toString().slice(-4).padStart(4, "7");

  return {
    slug: cleanSlug,
    name: formattedName,
    shortName: shortName,
    role: "Cybercup 6.0 Member",
    department: "Cyber Security & Operations",
    event: "Cybercup 6.0",
    id: `CC6-${hashId}-MBR`,
    email: `${cleanSlug.replace(/[^a-z0-9]/g, ".")}@cybercup.tech`,
    phone: "+91 98*** *****",
    instagram: cleanSlug.replace(/[^a-z0-9]/g, "_"),
    github: cleanSlug.replace(/[^a-z0-9]/g, "-"),
    avatar: null,
    accentColor: "#38bdf8",
    accentSecondary: "#818cf8",
    tier: "CORE TEAM / MEMBER",
    bloodGroup: "A+",
    emergencyPhone: "+91 98000 00000",
    venue: "Main Tech Auditorium",
    accessLevel: "Official Member Pass",
    description: `Official Cybercup 6.0 identity credentials issued for ${formattedName}.`
  };
}
