/**
 * CYBERCUP 6.0 — OFFICIAL HEADS & VIRTUAL IDENTITY REGISTRY
 * 
 * ℹ️ HOW PHYSICAL QR CODES & PERMALINKS WORK:
 * 1. Each QR code printed points to an individual web URL:
 *    https://<domain>/<member-slug> (e.g. /siddhant-choudhary or /manan-nidar)
 * 2. Aliases supported (e.g. /siddhant, /manan, /kusagra, /kushagra, /riddhi, etc.)
 * 3. Verified attendees only (returns null for unknown slugs).
 */

export const HEADS_DATA = {
  // 1. Siddhant Choudhary — Technical Head
  "siddhant-choudhary": {
    slug: "siddhant-choudhary",
    name: "Siddhant Choudhary",
    firstName: "Siddhant",
    lastName: "Choudhary",
    shortName: "Siddhant",
    role: "Technical Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-001-TECH",
    email: "chosiddhant125@gmail.com",
    phone: "+91 98765 43210",
    linkedin: "siddhant-choudhary",
    github: "siddhant-choudhary",
    avatar: "/images-without-background/Siddhant-removebg-preview.png",
    accentColor: "#5b86ff",
    accentSecondary: "#85a7ff",
    venue: "Main Arena & Tech Dome",
    description: "Technical Head overseeing technical execution and architecture for Cybercup 6.0."
  },
  "siddhant": {
    aliasOf: "siddhant-choudhary"
  },

  // 2. Manan Nidar — Design Head
  "manan-nidar": {
    slug: "manan-nidar",
    name: "Manan Nidar",
    firstName: "Manan",
    lastName: "Nidar",
    shortName: "Manan",
    role: "Design Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-002-DES",
    email: "manan.nidar@cybercup.tech",
    phone: "+91 98765 43211",
    linkedin: "manan-nidar",
    github: "manan-nidar",
    avatar: "/images-without-background/Manan_ridar-removebg-preview.png",
    avatarScale: 1.25,
    accentColor: "#38bdf8",
    accentSecondary: "#818cf8",
    venue: "Design & Creative Studio",
    description: "Design Head overseeing brand identity, visual systems, and creative direction."
  },
  "manan": {
    aliasOf: "manan-nidar"
  },

  // 3. Kushagra Rai — Registration Head
  "kusagra-rai": {
    slug: "kusagra-rai",
    name: "Kushagra Rai",
    firstName: "Kushagra",
    lastName: "Rai",
    shortName: "Kushagra",
    role: "Registration Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-003-REG",
    email: "kusagra.rai@cybercup.tech",
    phone: "+91 98765 43212",
    linkedin: "kusagra-rai",
    github: "kusagra-rai",
    avatar: "/images-without-background/kushagra.png",
    accentColor: "#10b981",
    accentSecondary: "#06b6d4",
    venue: "Registration Dome & Operations Center",
    description: "Registration Head managing participant onboarding, check-ins, and delegate credentials."
  },
  "kusagra": {
    aliasOf: "kusagra-rai"
  },
  "kushagra-rai": {
    aliasOf: "kusagra-rai"
  },
  "kushagra": {
    aliasOf: "kusagra-rai"
  },

  // 4. Riddhi Jain — Marketing Head
  "riddhi-jain": {
    slug: "riddhi-jain",
    name: "Riddhi Jain",
    firstName: "Riddhi",
    lastName: "Jain",
    shortName: "Riddhi",
    role: "Marketing Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-004-MKT",
    email: "riddhi.jain@cybercup.tech",
    phone: "+91 98765 43213",
    linkedin: "riddhi-jain",
    github: "riddhi-jain",
    avatar: "/images-without-background/Riddhi-removebg-preview.png",
    accentColor: "#f43f5e",
    accentSecondary: "#fb7185",
    venue: "Media Center & Main Stage",
    description: "Marketing Head directing campaign strategy, digital reach, and event promotions."
  },
  "riddhi": {
    aliasOf: "riddhi-jain"
  },

  // 5. Tarun Tiwari — Sponsorship Head
  "tarun-tiwari": {
    slug: "tarun-tiwari",
    name: "Tarun Tiwari",
    firstName: "Tarun",
    lastName: "Tiwari",
    shortName: "Tarun",
    role: "Sponsorship Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-005-SPON",
    email: "tarun.tiwari@cybercup.tech",
    phone: "+91 98765 43214",
    linkedin: "tarun-tiwari",
    github: "tarun-tiwari",
    avatar: "/images-without-background/Tarun-removebg-preview.png",
    accentColor: "#f59e0b",
    accentSecondary: "#d97706",
    venue: "Corporate Partnerships & VIP Lounge",
    description: "Sponsorship Head heading sponsor relations, industry alliances, and partnerships."
  },
  "tarun": {
    aliasOf: "tarun-tiwari"
  },

  // 6. Jewel Virmani — Social Media Head
  "jewel-virmani": {
    slug: "jewel-virmani",
    name: "Jewel Virmani",
    firstName: "Jewel",
    lastName: "Virmani",
    shortName: "Jewel",
    role: "Social Media Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-006-SOC",
    email: "jewel.virmani@cybercup.tech",
    phone: "+91 98765 43215",
    linkedin: "jewel-virmani",
    github: "jewel-virmani",
    avatar: "/images-without-background/jewel.png",
    accentColor: "#a855f7",
    accentSecondary: "#c084fc",
    venue: "Social Media Hub & Live Broadcast",
    description: "Social Media Head managing official channels, content drops, and community engagement."
  },
  "jewel": {
    aliasOf: "jewel-virmani"
  },

  // 7. Achintya Chaitanya — Overall Head
  "achintya-chaitanya": {
    slug: "achintya-chaitanya",
    name: "Achintya Chaitanya",
    firstName: "Achintya",
    lastName: "Chaitanya",
    shortName: "Achintya",
    role: "Overall Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-007-OVR",
    email: "achintya.chaitanya@cybercup.tech",
    phone: "+91 98765 43216",
    linkedin: "achintya-chaitanya",
    github: "achintya-chaitanya",
    avatar: "/images-without-background/Achintaya-removebg-preview.png",
    accentColor: "#06b6d4",
    accentSecondary: "#3b82f6",
    venue: "Main Stage & Operations Hub",
    description: "Overall Head leading symposium operations, track coordination, and general management."
  },
  "achintya": {
    aliasOf: "achintya-chaitanya"
  },

  // 8. Anmol Middha — Overall Head
  "anmol-middha": {
    slug: "anmol-middha",
    name: "Anmol Middha",
    firstName: "Anmol",
    lastName: "Middha",
    shortName: "Anmol",
    role: "Overall Head",
    category: "EXECUTIVE LEAD",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-008-OVR",
    email: "anmol.middha@cybercup.tech",
    phone: "+91 98765 43217",
    linkedin: "anmol-middha",
    github: "anmol-middha",
    avatar: "/images-without-background/anmol-removebg-preview.png",
    accentColor: "#eab308",
    accentSecondary: "#ef4444",
    venue: "VIP Lounge & Main Arena",
    description: "Overall Head directing symposium strategy, institutional alliances, and cross-team execution."
  },
  "anmol": {
    aliasOf: "anmol-middha"
  },

  // 9. Chahat — Core Member
  "chahat": {
    slug: "chahat",
    name: "Chahat",
    firstName: "Chahat",
    lastName: "",
    shortName: "Chahat",
    role: "Core Member",
    category: "ORGANIZING COMMITTEE",
    batch: "2024 - 2028",
    event: "Cybercup 6.0",
    id: "CC6-009-CORE",
    email: "chahat@cybercup.tech",
    phone: "+91 98765 43218",
    linkedin: "chahat",
    github: "chahat",
    avatar: "/images-without-background/chahat-removed-background.png",
    avatarScale: 1.28,
    accentColor: "#ec4899",
    accentSecondary: "#a855f7",
    venue: "Main Arena & Tech Dome",
    description: "Core team member coordinating symposium tracks and on-ground operations."
  }
};

/**
 * Filter unique official core heads list (excluding aliases)
 */
export const ALL_HEADS = Object.values(HEADS_DATA).filter(
  (entry) => !entry.aliasOf
);

/**
 * Retrieve attendee by slug or alias. Returns null if not found.
 */
export function getHeadBySlug(rawSlug) {
  if (!rawSlug) {
    return HEADS_DATA["siddhant-choudhary"];
  }

  const cleanSlug = rawSlug
    .trim()
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/^\/+|\/+$/g, "");

  // Direct match
  if (HEADS_DATA[cleanSlug]) {
    const entry = HEADS_DATA[cleanSlug];
    return entry.aliasOf ? HEADS_DATA[entry.aliasOf] : entry;
  }

  // Without hyphens match
  const noHyphens = cleanSlug.replace(/-/g, "");
  for (const key of Object.keys(HEADS_DATA)) {
    if (key.replace(/-/g, "") === noHyphens) {
      const entry = HEADS_DATA[key];
      return entry.aliasOf ? HEADS_DATA[entry.aliasOf] : entry;
    }
  }

  // Return null for unknown slugs (plain "Pass not found" screen)
  return null;
}

/**
 * Robust avatar resolver:
 * Checks entry.avatar, falls back to mapped transparent images in /images-without-background/
 */
export function resolveAvatar(attendee) {
  if (attendee?.avatar) return attendee.avatar;
  const slug = attendee?.slug;
  const avatarMap = {
    'siddhant-choudhary': '/images-without-background/Siddhant-removebg-preview.png',
    'siddhant': '/images-without-background/Siddhant-removebg-preview.png',
    'manan-nidar': '/images-without-background/Manan_ridar-removebg-preview.png',
    'manan': '/images-without-background/Manan_ridar-removebg-preview.png',
    'kusagra-rai': '/images-without-background/kushagra.png',
    'kusagra': '/images-without-background/kushagra.png',
    'kushagra-rai': '/images-without-background/kushagra.png',
    'kushagra': '/images-without-background/kushagra.png',
    'riddhi-jain': '/images-without-background/Riddhi-removebg-preview.png',
    'riddhi': '/images-without-background/Riddhi-removebg-preview.png',
    'tarun-tiwari': '/images-without-background/Tarun-removebg-preview.png',
    'tarun': '/images-without-background/Tarun-removebg-preview.png',
    'jewel-virmani': '/images-without-background/jewel.png',
    'jewel': '/images-without-background/jewel.png',
    'achintya-chaitanya': '/images-without-background/Achintaya-removebg-preview.png',
    'achintya': '/images-without-background/Achintaya-removebg-preview.png',
    'anmol-middha': '/images-without-background/anmol-removebg-preview.png',
    'anmol': '/images-without-background/anmol-removebg-preview.png',
    'chahat': '/images-without-background/chahat-removed-background.png'
  };
  return avatarMap[slug] || '/images-without-background/Siddhant-removebg-preview.png';
}
