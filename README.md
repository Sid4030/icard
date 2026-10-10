# 🪪 Cybercup 6.0 | Dynamic I-Card System

A dynamic, 3D animated identity card web application built for **Cybercup 6.0**.

Inspired by physical event badges, featuring real lanyard physics, interactive 3D perspective tilt, holographic reflections, giant condensed typography, cutout foreground portrait layering, flip-to-back security matrix, and comprehensive attendee credentials revealed upon scrolling.

---

## ⚡ Dynamic URL Routing (`/:name`)

Attendee iCards dynamically adapt based on the path in the URL:

- `/siddhant-choudhary` or `/siddhant` — **Siddhant Choudhary** (Lead Organizer & Core Lead)
- `/harsh` or `/harsh-choudhary` — **Harsh Choudhary** (Cybersecurity Lead & Analyst)
- `/:any-name` (e.g. `/rohit-sharma`, `/ananya-verma`) — Dynamically generates custom Cybercup 6.0 badge credentials and verification code in real time!

Fallback support is also included for:
- Query parameters: `?name=siddhant-choudhary`
- Hash routing: `#/siddhant-choudhary`

---

## 🎨 Key Features & Aesthetics

- **Physical Badge Design**:
  - Realistic woven lanyard ribbon with silver clip ring and swivel clasp.
  - Realistic slot hole punch cutout at the top of the ID card.
  - Giant condensed typographic background (**CYBER 6.0**) layered behind the person.
  - Studio portrait overlapping the typography with cutout depth and smooth bottom gradient fade.
  - Glowing role tag pill, micro-barcode, NFC/RFID active indicator, and event badges.
- **Interactive 3D Motion**:
  - Built with **Framer Motion** & **GSAP**.
  - Interactive mouse/touch 3D perspective tilt with real-time holographic glare reflection.
  - Click/tap to flip the badge in 3D to reveal the magnetic stripe, security clearance, barcode, and emergency contact.
- **Scroll-Down Attendee Credentials**:
  - No navbar — seamless focus on the card hero.
  - Scrolling down reveals the full Cybercup 6.0 dossier:
    - Official email (with 1-click copy)
    - Instagram profile (@handle link)
    - Direct phone contact
    - GitHub profile
    - Security pass ID and allocated arena
    - Live scannable QR verification code
    - Share link with celebration confetti burst
    - Interactive live URL tester and switcher

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Start Vite dev server
npm run dev

# Build for production
npm run build
```

---

## 🌐 Deployment (Vercel / Netlify)

1. Connect your GitHub repository: [Sid4030/icard](https://github.com/Sid4030/icard)
2. Build command: `npm run build`
3. Output directory: `dist`
4. Set Single Page Application (SPA) rewrite to `index.html` so all `/:name` subpaths route directly to the React application.
