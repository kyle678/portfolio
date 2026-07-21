import { useState, useEffect, type CSSProperties } from "react";

type Palette = {
  paper: string;
  panel: string;
  ink: string;
  line: string;
  mute: string;
  faint: string;
  red: string;
  teal: string;
};

const THEMES: Record<string, { name: string; c: Palette }> = {
  paper: {
    name: "Paper",
    c: {
      paper: "#F1EBDA",
      panel: "#E7E0CC",
      ink: "#20201A",
      line: "#CEC5AE",
      mute: "#6E6757",
      faint: "#98907C",
      red: "#E03E1A",
      teal: "#127A6A",
    },
  },
  carbon: {
    name: "Carbon",
    c: {
      paper: "#141310",
      panel: "#1D1B15",
      ink: "#ECE6D6",
      line: "#302D26",
      mute: "#9A9282",
      faint: "#6C675A",
      red: "#FF5C34",
      teal: "#33BEA6",
    },
  },
  midnight: {
    name: "Midnight",
    c: {
      paper: "#080C14",
      panel: "#0F1624",
      ink: "#F1F5F9",
      line: "#1E293B",
      mute: "#94A3B8",
      faint: "#64748B",
      red: "#8B5CF6",
      teal: "#22D3EE",
    },
  },
};

const THEME_ORDER = ["paper", "carbon", "midnight"];

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  icon: string;
  accent: string;
  repo?: string;
  live?: string;
};

const projects: Project[] = [
  {
    title: "GridSAFE",
    subtitle: "Senior Capstone · Aug 2025 – May 2026",
    desc: "AI-based anomaly detection for power-grid networks. Built a simulated grid network to generate realistic traffic and anomaly data, then trained an XGBoost model that caught 80% of anomalies — flagging faults and intrusions on critical infrastructure. Delivered with a 5-person multidisciplinary team.",
    tech: ["Python", "XGBoost", "Machine Learning", "Networking"],
    icon: "🛡️",
    accent: "#F43F5E",
  },
  {
    title: "Secure Vault",
    subtitle: "Feb 2026 – May 2026",
    desc: "Zero-knowledge encrypted cloud storage and password manager. A cross-platform desktop app that encrypts files and filenames client-side with AES-256-GCM before upload — the server only ever stores ciphertext. Envelope encryption with PBKDF2-wrapped data keys enables atomic password rotation and Shamir's Secret Sharing recovery, plus resumable chunked sync with a crash-safe state ledger.",
    tech: ["Electron", "React", "Flask", "AWS S3", "AES-256-GCM"],
    icon: "🔐",
    accent: "#7C3AED",
    repo: "https://github.com/kyle678/SecureFileVault",
  },
  {
    title: "Gamers Unite",
    subtitle: "Live at gamersunite.us · 2026",
    desc: "Matchmaking for games that don't have it. Players form parties with game, mode, region, and skill parameters; the moment a party fills, a Discord bot spins up a private voice channel locked to its members and DMs everyone the link. Discord-only auth, mutual blocking and reporting for community safety, and a background sweeper that reaps expired parties and channels.",
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "Discord API"],
    icon: "🎮",
    accent: "#F59E0B",
    repo: "https://github.com/kyle678-labs/GamersUnite",
    live: "https://gamersunite.us",
  },
  {
    title: "LED-Flux",
    subtitle: "Personal Project",
    desc: "Real-time control system for 1,500-pixel WS2812B LED strips: a React web UI, Flask REST API, and Python render engine on Raspberry Pi communicating over UDP so HTTP latency can never stall the render loop. Includes a scene builder persisted to SQLite and a pytest suite that stubs the Pi hardware.",
    tech: ["React", "Flask", "Raspberry Pi", "UDP", "SQLite"],
    icon: "💡",
    accent: "#F59E0B",
    repo: "https://github.com/kyle678/LED-Flux",
  },
  {
    title: "Desktop Sticky Notes",
    subtitle: "Personal Project · 2026",
    desc: "Windows sticky-notes app in C# (.NET 8, WPF) that lives in the system tray and summons notes with global hotkeys. Rich text and image paste, note groups with per-workspace show/hide, a Notes Manager with 7-day recovery for deleted notes, continuous autosave, and one-click auto-updates from GitHub Releases via an Inno Setup installer.",
    tech: ["C#", ".NET 8", "WPF", "Inno Setup"],
    icon: "🗒️",
    accent: "#7C3AED",
    repo: "https://github.com/kyle678/desktopStickyNotes",
  },
  {
    title: "openMouseKeyboard",
    subtitle: "Personal Project · 2026",
    desc: "Software KVM switch for Windows, written in Rust: share one mouse and keyboard between two PCs over the LAN — no extra hardware, no cloud. Low-level input hooks capture events and stream them over TCP as relative deltas, UDP broadcast auto-discovers the other machine, and pushing the cursor past the screen edge hands control across. Includes bidirectional clipboard sync and a tray-icon UI in a single ~1 MB executable.",
    tech: ["Rust", "Windows API", "TCP/UDP", "Systems Programming"],
    icon: "🖱️",
    accent: "#F43F5E",
    repo: "https://github.com/kyle678/openMouseKeyboard",
  },
  {
    title: "Self-Hosted Homelab",
    subtitle: "Dec 2023 – Present",
    desc: "Self-managed MicroK8s (Kubernetes) cluster on Linux hosting a media server, NAS, photo management, and public websites — including this one. GitHub Actions + Keel CI/CD roll out updates on every push; Cloudflare Tunnel provides public DNS, proxying, and TLS with no open inbound ports; Grafana and Prometheus monitor cluster health.",
    tech: ["Kubernetes", "GitHub Actions", "Cloudflare Tunnel", "Grafana", "Prometheus"],
    icon: "☸️",
    accent: "#22D3EE",
  },
  {
    title: "Personal Journal",
    subtitle: "Personal Project · 2026",
    desc: "Password-protected journal app with a React frontend, Flask backend, and SQLite storage. Markdown entries autosave as you type and are searchable by title and content. Auth uses a scrypt-hashed password, HttpOnly session cookies, and a per-IP lockout after repeated failed attempts.",
    tech: ["React", "Flask", "SQLite", "scrypt"],
    icon: "📓",
    accent: "#22D3EE",
    repo: "https://github.com/kyle678-labs/personal-journal",
  },
  {
    title: "AES",
    subtitle: "Personal Project",
    desc: "Advanced Encryption Standard implementation in C, built to the NIST FIPS 197 specification. Supports 128, 192, and 256-bit keys and can encrypt and decrypt any file type.",
    tech: ["C", "Cryptography", "NIST FIPS 197"],
    icon: "🔏",
    accent: "#7C3AED",
    repo: "https://github.com/kyle678/AES",
  },
];

const skills = [
  { label: "Languages", items: ["Python", "Java", "C", "C++", "C#", "Rust", "JavaScript", "TypeScript", "SQL", "Bash", "VHDL"] },
  { label: "Frameworks & Tools", items: ["React", "Flask", "Electron", "Node.js", "Vite", "REST APIs", "pytest", "Git"] },
  { label: "Cloud & DevOps", items: ["AWS (S3)", "Azure", "GCP", "Kubernetes (MicroK8s)", "Terraform", "Linux", "GitHub Actions", "Keel", "Grafana", "Prometheus"] },
  { label: "Networking & Security", items: ["Cloudflare Tunnel", "AdGuard Home", "Wireshark", "Nmap", "Applied Cryptography", "Terrascan"] },
  { label: "Databases", items: ["MySQL", "SQLite", "NoSQL"] },
];

const timeline = [
  {
    year: "2026",
    title: "B.S. Software Engineering, Minor in Cybersecurity",
    org: "Iowa State University — Ames, IA",
    desc: "Coursework in Cloud Computing, Network Security, Cryptography, Operating Systems, Data Structures & Algorithms, and Software Design.",
    type: "edu",
  },
  {
    year: "2023 – now",
    title: "Self-Hosted Kubernetes Platform",
    org: "Homelab",
    desc: "Designed, deployed, and maintain a MicroK8s cluster on Linux serving production-style services and public websites — end-to-end Linux administration, networking, CI/CD, monitoring, and recovery from hardware and service failures.",
    type: "work",
  },
  {
    year: "2022 – 2026",
    title: "Dining Hall Supervisor",
    org: "Iowa State University Dining",
    desc: "Supervised a team of student staff during high-volume service, coordinating daily operations and resolving issues in real time while upholding health, safety, and quality standards.",
    type: "work",
  },
];

const building = [
  {
    topic: "Discord Manager",
    detail: "A discord.js bot that receives GitHub webhooks over HTTP and posts CI results, pushes, and releases to a Discord channel as rich embeds — it powers the build notifications for this site.",
    repo: "https://github.com/kyle678-labs/discordManager",
  },
];

const links = [
  { label: "GitHub", href: "https://github.com/kyle678", tag: "GH" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-maloney-3641501b9", tag: "IN" },
  { label: "Resume", target: "_blank", href: "Kyle_Maloney_Resume.pdf", tag: "PDF" },
  { label: "Email", href: "mailto:ktmaloney115@gmail.com", tag: "@" },
];

function SectionHead({ index, title, note, c }: { index: string; title: string; note?: string; c: Palette }) {
  return (
    <div style={{ display: "flex", alignItems: "baseline", gap: "16px", marginBottom: "36px" }}>
      <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: c.red, letterSpacing: "1px" }}>{index}</span>
      <h2 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(1.4rem, 3vw, 1.9rem)", fontWeight: 700, letterSpacing: "-0.5px", color: c.ink, whiteSpace: "nowrap" }}>
        {title}
      </h2>
      <span style={{ flex: 1, height: "1px", background: c.line, transform: "translateY(-4px)" }} />
      {note && (
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: c.faint, letterSpacing: "1px", whiteSpace: "nowrap" }}>{note}</span>
      )}
    </div>
  );
}

export default function App() {
  const [blink, setBlink] = useState(true);
  const [theme, setTheme] = useState<string>(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("km-theme") : null;
    if (saved && THEMES[saved]) return saved;
    const prefersDark = typeof window !== "undefined" && window.matchMedia?.("(prefers-color-scheme: dark)").matches;
    return prefersDark ? "carbon" : "paper";
  });

  const C = THEMES[theme].c;

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    window.localStorage.setItem("km-theme", theme);
  }, [theme]);

  return (
    <div style={{ background: C.paper, minHeight: "100vh", color: C.ink }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing: border-box; }
        html, body { margin: 0; }
        body {
          font-family: 'Inter', system-ui, sans-serif;
          color: ${C.ink};
          background: ${C.paper};
          background-image:
            linear-gradient(${C.line}55 1px, transparent 1px),
            linear-gradient(90deg, ${C.line}55 1px, transparent 1px);
          background-size: 26px 26px;
          background-position: -1px -1px;
        }
        ::selection { background: ${C.red}; color: ${C.paper}; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: ${C.paper}; }
        ::-webkit-scrollbar-thumb { background: ${C.line}; border: 3px solid ${C.paper}; }

        a { color: inherit; }

        .entry {
          position: relative;
          border: 1px solid ${C.line};
          background: ${C.paper};
          padding: 22px 22px 20px;
          transition: border-color 0.18s ease, background 0.18s ease, transform 0.18s ease;
        }
        .entry::before {
          content: '';
          position: absolute;
          left: -1px; top: -1px; bottom: -1px;
          width: 3px;
          background: var(--edge);
          opacity: 0;
          transition: opacity 0.18s ease;
        }
        .entry:hover {
          border-color: ${C.ink};
          background: ${C.panel};
          transform: translateY(-2px);
        }
        .entry:hover::before { opacity: 1; }

        .chip {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.68rem;
          padding: 3px 8px;
          border: 1px solid ${C.line};
          color: ${C.mute};
          background: ${C.paper};
          white-space: nowrap;
        }

        .src {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.72rem;
          font-weight: 500;
          text-decoration: none;
          border-bottom: 1px solid transparent;
          transition: border-color 0.15s ease;
        }
        .src:hover { border-bottom-color: currentColor; }

        .navlink {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.78rem;
          text-decoration: none;
          color: ${C.ink};
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 9px 14px;
          border: 1px solid ${C.line};
          background: ${C.paper};
          transition: all 0.16s ease;
        }
        .navlink:hover {
          border-color: ${C.ink};
          background: ${C.ink};
          color: ${C.paper};
        }
        .navlink:hover .navtag { color: ${C.red}; }
        .navtag { color: ${C.red}; font-weight: 700; font-size: 0.68rem; }

        .skillrow { border-top: 1px solid ${C.line}; }
        .skillrow:last-child { border-bottom: 1px solid ${C.line}; }

        .themeswitch {
          display: inline-flex;
          border: 1px solid ${C.line};
        }
        .themeseg {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.62rem;
          letter-spacing: 1px;
          text-transform: uppercase;
          padding: 6px 10px;
          border: none;
          border-left: 1px solid ${C.line};
          background: transparent;
          color: ${C.faint};
          cursor: pointer;
          transition: color 0.15s ease, background 0.15s ease;
        }
        .themeseg:first-child { border-left: none; }
        .themeseg:hover { color: ${C.ink}; }
        .themeseg.active { background: ${C.ink}; color: ${C.paper}; }
      `}</style>

      <div style={{ maxWidth: "980px", margin: "0 auto", padding: "0 24px 90px" }}>

        {/* ── TOP BAR ── */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "16px", flexWrap: "wrap", padding: "18px 0", borderBottom: `1px solid ${C.ink}`, fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", letterSpacing: "1px" }}>
          <span style={{ fontWeight: 700 }}>K·T·M</span>
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <span style={{ color: C.mute, whiteSpace: "nowrap" }}>
              <span style={{ color: C.teal }}>●</span> OPEN TO WORK — JULY 2026
            </span>
            <div className="themeswitch" role="group" aria-label="Color theme">
              {THEME_ORDER.map((t) => (
                <button
                  key={t}
                  className={`themeseg${t === theme ? " active" : ""}`}
                  onClick={() => setTheme(t)}
                  aria-pressed={t === theme}
                >
                  {THEMES[t].name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── MASTHEAD ── */}
        <header style={{ padding: "56px 0 44px", borderBottom: `1px solid ${C.line}`, display: "grid", gridTemplateColumns: "minmax(0, 1fr)", gap: "20px" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.faint, letterSpacing: "2px" }}>
            PORTFOLIO / No. 2026 — AMES, IOWA
            <span style={{ opacity: blink ? 1 : 0, color: C.red }}> ▍</span>
          </div>
          <h1 style={{ margin: 0, fontFamily: "'Space Grotesk', sans-serif", fontSize: "clamp(3rem, 10vw, 6rem)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-2.5px" }}>
            Kyle<br />Maloney<span style={{ color: C.red }}>.</span>
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.82rem", color: C.ink }}>
            <span style={{ borderBottom: `2px solid ${C.red}`, paddingBottom: "2px" }}>SOFTWARE ENGINEER</span>
            <span style={{ color: C.faint }}>/</span>
            <span style={{ borderBottom: `2px solid ${C.teal}`, paddingBottom: "2px" }}>CLOUD · DEVOPS · SECURITY</span>
          </div>
          <p style={{ margin: "8px 0 0", color: C.mute, lineHeight: 1.7, maxWidth: "560px", fontSize: "1rem" }}>
            Software Engineering graduate from Iowa State University (May 2026) with a minor in Cybersecurity.
            I build secure full-stack systems and run the self-hosted Kubernetes platform that serves this site.
          </p>
          <div style={{ marginTop: "14px", display: "flex", gap: "10px", flexWrap: "wrap" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.target || "_self"} rel="noopener noreferrer" className="navlink">
                <span className="navtag">{l.tag}</span>{l.label}
              </a>
            ))}
          </div>
        </header>

        {/* ── PROJECTS ── */}
        <section style={{ paddingTop: "64px" }}>
          <SectionHead index="01" title="Selected Work" note={`${projects.length} ENTRIES`} c={C} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: C.line, border: `1px solid ${C.line}` }}>
            {projects.map((p, i) => {
              const edge = i % 2 === 0 ? C.red : C.teal;
              return (
                <div key={i} className="entry" style={{ "--edge": edge, border: "none" } as CSSProperties}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                    <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", fontWeight: 700, color: edge, letterSpacing: "1px" }}>
                      P-{String(i + 1).padStart(2, "0")}
                    </span>
                    <span style={{ fontSize: "1.5rem", lineHeight: 1 }}>{p.icon}</span>
                  </div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.35rem", fontWeight: 700, letterSpacing: "-0.5px" }}>{p.title}</h3>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", color: C.faint, marginBottom: "12px" }}>{p.subtitle}</div>
                  <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: C.mute, lineHeight: 1.6 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginBottom: (p.live || p.repo) ? "16px" : 0 }}>
                    {p.tech.map((t) => (
                      <span key={t} className="chip">{t}</span>
                    ))}
                  </div>
                  {(p.live || p.repo) && (
                    <div style={{ display: "flex", gap: "18px", borderTop: `1px solid ${C.line}`, paddingTop: "12px" }}>
                      {p.live && (
                        <a href={p.live} target="_blank" rel="noopener noreferrer" className="src" style={{ color: C.teal }}>↗ VISIT SITE</a>
                      )}
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="src" style={{ color: C.ink }}>↗ SOURCE</a>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section style={{ paddingTop: "72px" }}>
          <SectionHead index="02" title="Stack" note="TOOLS & LANGUAGES" c={C} />
          <div>
            {skills.map((group) => (
              <div key={group.label} className="skillrow" style={{ display: "grid", gridTemplateColumns: "minmax(140px, 200px) 1fr", gap: "20px", padding: "18px 4px", alignItems: "start" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.78rem", fontWeight: 700, color: C.ink, letterSpacing: "0.5px" }}>
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map((item) => (
                    <span key={item} className="chip">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ paddingTop: "72px" }}>
          <SectionHead index="03" title="Trajectory" note="EDUCATION & WORK" c={C} />
          <div>
            {timeline.map((item, i) => (
              <div key={i} style={{ display: "grid", gridTemplateColumns: "110px 1fr", gap: "24px", padding: "22px 4px", borderTop: `1px solid ${C.line}`, borderBottom: i === timeline.length - 1 ? `1px solid ${C.line}` : "none" }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", fontWeight: 700, color: item.type === "edu" ? C.red : C.teal, paddingTop: "3px" }}>
                  {item.year}
                </div>
                <div>
                  <h3 style={{ margin: "0 0 4px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.1rem", fontWeight: 700, letterSpacing: "-0.3px" }}>{item.title}</h3>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: C.mute, marginBottom: "8px" }}>{item.org}</div>
                  <p style={{ margin: 0, color: C.mute, fontSize: "0.9rem", lineHeight: 1.6 }}>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── IN PROGRESS ── */}
        <section style={{ paddingTop: "72px" }}>
          <SectionHead index="04" title="In Progress" note="CURRENTLY BUILDING" c={C} />
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "16px" }}>
            {building.map((item, i) => (
              <div key={i} className="entry" style={{ "--edge": C.red } as CSSProperties}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.68rem", fontWeight: 700, color: C.red, letterSpacing: "1px", marginBottom: "10px" }}>
                  ◆ WIP
                </div>
                <h3 style={{ margin: "0 0 8px", fontFamily: "'Space Grotesk', sans-serif", fontSize: "1.15rem", fontWeight: 700, letterSpacing: "-0.3px" }}>{item.topic}</h3>
                <p style={{ margin: "0 0 14px", color: C.mute, fontSize: "0.875rem", lineHeight: 1.6 }}>{item.detail}</p>
                {item.repo && (
                  <a href={item.repo} target="_blank" rel="noopener noreferrer" className="src" style={{ color: C.ink }}>↗ SOURCE</a>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ marginTop: "80px", borderTop: `1px solid ${C.ink}`, paddingTop: "22px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", fontFamily: "'JetBrains Mono', monospace", fontSize: "0.72rem", color: C.mute, letterSpacing: "0.5px" }}>
          <span><span style={{ color: C.red, fontWeight: 700 }}>K·T·M</span> — © {new Date().getFullYear()}</span>
          <span>SELF-HOSTED ON K8S · BUILT WITH REACT</span>
        </footer>
      </div>
    </div>
  );
}
