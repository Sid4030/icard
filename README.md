# 🪪 Cybercup 6.0 | Dynamic I-Card System

A dynamic, 3D animated identity card web application built for **Cybercup 6.0**.

Inspired by physical event badges, featuring real lanyard physics, interactive 3D perspective tilt, holographic reflections, giant condensed typography, name-only cyber crest badge design, flip-to-back security matrix, and comprehensive attendee credentials revealed upon scrolling.

---

## ⚡ Core Team Head URLs (`/:name`)

Dedicated clean URLs for all 8 Core Team Heads:

1. **Siddhant Choudhary**: `/siddhant-choudhary` (or `/siddhant`) — *Lead Organizer & Core Lead*
2. **Manan Nidar**: `/manan-nidar` (or `/manan`) — *Technical Operations Head*
3. **Kusagra Rai**: `/kusagra-rai` (or `/kusagra`) — *Event Operations & Logistics Head*
4. **Riddhi Jain**: `/riddhi-jain` (or `/riddhi`) — *Media & Creative Communications Head*
5. **Tarun Tiwari**: `/tarun-tiwari` (or `/tarun`) — *Security & Arena Defense Head*
6. **Jewel Virmani**: `/jewel-virmani` (or `/jewel`) — *PR & Participant Experience Head*
7. **Achintya Chaitanya**: `/achintya-chaitanya` (or `/achintya`) — *CTF Platform & Scoring Lead*
8. **Anmol Middha**: `/anmol-middha` (or `/anmol`) — *Sponsorship & Industry Partnerships Head*

*Dynamic fallback:* Any other URL (e.g. `/rohit-sharma`) generates an authentic credential card dynamically!

---

## 🖨️ Physical I-Card Maker & QR Code Guide

### How QR codes work when printed:
- Each QR code printed on a card points to that member's web link on Vercel:
  `https://<your-domain>/<member-slug>`
- **You can edit cards at ANY time after printing:**
  Whenever you change details (roles, phones, emails, emergency contacts, or bios) in `src/data/attendees.js` and push to GitHub, Vercel updates the website in seconds.
- Anyone scanning the physical card will **immediately see the latest information**.
- The physical card **never needs to be reprinted!**

### Generating & Downloading QR Codes for the Card Maker:
Scroll down to the **Physical I-Card Printing Suite** section on the web page:
- Download high-res (512x512) scannable PNG QR codes individually.
- Or click **"Download All 8 QR Codes"** to download all files at once for the printer.

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

## 🌐 Deployment (Vercel)

1. Repository: [Sid4030/icard](https://github.com/Sid4030/icard)
2. Build command: `npm run build`
3. Output directory: `dist`
4. The repo includes `vercel.json` with SPA rewrite rules for all `/:name` routes.
