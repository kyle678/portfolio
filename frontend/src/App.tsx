import { useState, useEffect } from "react";

const COLORS = {
  bg: "#080C14",
  surface: "#0F1624",
  card: "#111827",
  cardBorder: "#1E293B",
  violet: "#7C3AED",
  coral: "#F43F5E",
  amber: "#F59E0B",
  cyan: "#22D3EE",
  text: "#F1F5F9",
  muted: "#94A3B8",
  subtle: "#64748B",
};

const gradientText = {
  background: "linear-gradient(135deg, #7C3AED 0%, #F43F5E 50%, #F59E0B 100%)",
  WebkitBackgroundClip: "text",
  WebkitTextFillColor: "transparent",
  backgroundClip: "text",
};

type Project = {
  title: string;
  subtitle: string;
  desc: string;
  tech: string[];
  icon: string;
  accent: string;
  repo?: string;
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
    title: "LED-Flux",
    subtitle: "Personal Project",
    desc: "Real-time control system for 1,500-pixel WS2812B LED strips: a React web UI, Flask REST API, and Python render engine on Raspberry Pi communicating over UDP so HTTP latency can never stall the render loop. Includes a scene builder persisted to SQLite and a pytest suite that stubs the Pi hardware.",
    tech: ["React", "Flask", "Raspberry Pi", "UDP", "SQLite"],
    icon: "💡",
    accent: "#F59E0B",
    repo: "https://github.com/kyle678/LED-Flux",
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
  { label: "Languages", items: ["Python", "Java", "C", "C++", "JavaScript", "TypeScript", "SQL", "Bash", "VHDL"] },
  { label: "Frameworks & Tools", items: ["React", "Flask", "Electron", "Node.js", "Vite", "REST APIs", "pytest", "Git"] },
  { label: "Cloud & DevOps", items: ["AWS (S3)", "Azure", "GCP", "Kubernetes (MicroK8s)", "Linux", "GitHub Actions", "Keel", "Grafana", "Prometheus"] },
  { label: "Networking & Security", items: ["Cloudflare Tunnel", "AdGuard Home", "Wireshark", "Nmap", "Applied Cryptography"] },
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

const links = [
  { label: "GitHub", href: "https://github.com/kyle678", icon: "⌥" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/kyle-maloney-3641501b9", icon: "in" },
  { label: "Resume", target: "_blank", href: "Kyle_Maloney_Resume.pdf", icon: "↓" },
  { label: "Email", href: "mailto:ktmaloney115@gmail.com", icon: "@" },
];

export default function App() {
  const [blink, setBlink] = useState(true);
  /*
  const [hoveredCard, setHoveredCard] = useState(null);
  const [hoveredLink, setHoveredLink] = useState(null);
  */

  useEffect(() => {
    const t = setInterval(() => setBlink((b) => !b), 530);
    return () => clearInterval(t);
  }, []);

  return (
    <div style={{ backgroundColor: COLORS.bg, minHeight: "100vh", color: COLORS.text, fontFamily: "'Inter', system-ui, sans-serif", padding: "0 20px 80px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;700&display=swap');
        * { box-sizing: border-box; text-align: left; }
        ::selection { background: #7C3AED44; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #080C14; }
        ::-webkit-scrollbar-thumb { background: #1E293B; border-radius: 3px; }

        .project-card {
          background: #111827;
          border: 1px solid #1E293B;
          border-radius: 16px;
          padding: 24px;
          transition: transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease;
          cursor: default;
          position: relative;
          overflow: hidden;
        }
        .project-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 16px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .project-card:hover {
          transform: translateY(-4px);
        }
        .project-card.violet:hover { border-color: #7C3AED55; box-shadow: 0 8px 30px #7C3AED22; }
        .project-card.coral:hover  { border-color: #F43F5E55; box-shadow: 0 8px 30px #F43F5E22; }
        .project-card.amber:hover  { border-color: #F59E0B55; box-shadow: 0 8px 30px #F59E0B22; }

        .skill-pill {
          font-size: 0.75rem;
          padding: 4px 12px;
          border-radius: 20px;
          border: 1px solid #1E293B;
          background: #0F1624;
          color: #94A3B8;
          transition: all 0.15s ease;
          cursor: default;
          font-family: 'JetBrains Mono', monospace;
        }
        .skill-pill:hover {
          border-color: #7C3AED88;
          color: #C4B5FD;
          background: #7C3AED11;
        }

        .link-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 10px 20px;
          border-radius: 10px;
          border: 1px solid #1E293B;
          background: #0F1624;
          color: #94A3B8;
          text-decoration: none;
          font-size: 0.875rem;
          font-weight: 500;
          line-height: 1;
          transition: all 0.2s ease;
          cursor: pointer;
          vertical-align: middle;
        }
        .link-btn:hover {
          border-color: #7C3AED;
          color: #C4B5FD;
          background: #7C3AED15;
          transform: translateY(-2px);
        }

        .section-label {
          font-family: 'JetBrains Mono', monospace;
          font-size: 0.7rem;
          letter-spacing: 3px;
          text-transform: uppercase;
          color: #64748B;
          margin-bottom: 8px;
        }
        .section-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: #F1F5F9;
          margin: 0 0 32px;
        }
      `}</style>

      <div style={{ maxWidth: "900px", margin: "0 auto" }}>

        {/* ── HERO ── */}
        <header style={{ padding: "80px 0 60px", borderBottom: `1px solid ${COLORS.cardBorder}`, marginBottom: "64px", textAlign: "left" }}>
          <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.8rem", color: COLORS.subtle, marginBottom: "20px", textAlign: "left" }}>
            <span style={{ color: COLORS.violet }}>~/</span>portfolio
            <span style={{ opacity: blink ? 1 : 0, color: COLORS.violet }}>▋</span>
          </div>
          <h1 style={{ margin: "0 0 8px", fontFamily: "'JetBrains Mono', monospace", fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: 700, lineHeight: 1.1, textAlign: "left", ...gradientText }}>
            Kyle Maloney
          </h1>
          <p style={{ margin: "0 0 20px", fontSize: "1.1rem", color: COLORS.muted, fontWeight: 300, letterSpacing: "0.5px", textAlign: "left" }}>
            Software Developer · Cloud, DevOps & Security
          </p>
          <p style={{ margin: 0, color: COLORS.muted, lineHeight: 1.8, maxWidth: "580px", fontSize: "0.95rem", textAlign: "left" }}>
            Software Engineering graduate from Iowa State University (May 2026) with a minor in Cybersecurity.
            I build secure full-stack systems and run the self-hosted Kubernetes platform that serves this site.
          </p>

          <div style={{ marginTop: "32px", display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "flex-start", gap: "10px", flexWrap: "wrap" }}>
            {links.map((l) => (
              <a key={l.label} href={l.href} target={l.target || "_self"} rel="noopener noreferrer" className="link-btn">
                <span style={{ fontFamily: "monospace", fontSize: "0.8rem", opacity: 0.6 }}>{l.icon}</span>
                {l.label}
              </a>
            ))}
          </div>
        </header>

        {/* ── PROJECTS ── */}
        <section style={{ marginBottom: "72px" }}>
          <div className="section-label">// work</div>
          <h2 className="section-title">Projects</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
            {projects.map((p, i) => {
              const colorName = ["violet", "coral", "amber"][i % 3];
              return (
                <div key={i} className={`project-card ${colorName}`}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{p.icon}</div>
                  <h3 style={{ margin: "0 0 4px", fontSize: "1.05rem", fontWeight: 600 }}>{p.title}</h3>
                  <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.7rem", color: COLORS.subtle, marginBottom: "10px" }}>{p.subtitle}</div>
                  <p style={{ margin: "0 0 16px", fontSize: "0.875rem", color: COLORS.muted, lineHeight: 1.65 }}>{p.desc}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {p.tech.map((t) => (
                      <span key={t} style={{
                        fontSize: "0.7rem",
                        padding: "3px 10px",
                        borderRadius: "20px",
                        border: `1px solid ${p.accent}44`,
                        color: p.accent,
                        background: `${p.accent}11`,
                        fontFamily: "'JetBrains Mono', monospace",
                      }}>{t}</span>
                    ))}
                  </div>
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noopener noreferrer" style={{
                      display: "inline-block",
                      marginTop: "14px",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.75rem",
                      color: p.accent,
                      textDecoration: "none",
                    }}>View source ↗</a>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* ── SKILLS ── */}
        <section style={{ marginBottom: "72px" }}>
          <div className="section-label">// tools</div>
          <h2 className="section-title">Skills & Stack</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "32px" }}>
            {skills.map((group) => (
              <div key={group.label}>
                <div style={{ fontSize: "0.7rem", fontFamily: "'JetBrains Mono', monospace", color: COLORS.violet, letterSpacing: "2px", marginBottom: "12px", textTransform: "uppercase" }}>
                  {group.label}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                  {group.items.map((item) => (
                    <span key={item} className="skill-pill">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── TIMELINE ── */}
        <section style={{ marginBottom: "72px" }}>
          <div className="section-label">// history</div>
          <h2 className="section-title">Experience & Education</h2>
          <div style={{ position: "relative", paddingLeft: "32px" }}>
            {/* vertical line */}
            <div style={{ position: "absolute", left: "7px", top: "6px", bottom: "6px", width: "1px", background: `linear-gradient(to bottom, ${COLORS.violet}, ${COLORS.coral}, ${COLORS.cardBorder})` }} />
            {timeline.map((item, i) => (
              <div key={i} style={{ position: "relative", marginBottom: i < timeline.length - 1 ? "36px" : 0 }}>
                {/* dot */}
                <div style={{
                  position: "absolute",
                  left: "-32px",
                  top: "4px",
                  width: "14px",
                  height: "14px",
                  borderRadius: "50%",
                  border: `2px solid ${i === 0 ? COLORS.violet : i === 1 ? COLORS.coral : COLORS.amber}`,
                  background: COLORS.bg,
                }} />
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", marginBottom: "6px" }}>
                  <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: COLORS.subtle }}>{item.year}</span>
                  <h3 style={{ margin: 0, fontSize: "1rem", fontWeight: 600 }}>{item.title}</h3>
                </div>
                <div style={{ fontSize: "0.8rem", color: i === 0 ? COLORS.violet : i === 1 ? COLORS.coral : COLORS.amber, marginBottom: "6px", fontWeight: 500 }}>
                  {item.org}
                </div>
                <p style={{ margin: 0, color: COLORS.muted, fontSize: "0.875rem", lineHeight: 1.65 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CURRENTLY LEARNING ── */}
        <section style={{ marginBottom: "72px" }}>
          <div className="section-label">// now</div>
          <h2 className="section-title">Currently Building</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { 
                topic: "Desktop Sticky Notes",
                detail: "A Windows sticky-notes app in C# (.NET 8, WPF) — global hotkeys, rich text, system-tray integration, and auto-updates from GitHub Releases",
                color: COLORS.violet
              },
              { 
                topic: "Gamers Unite", 
                detail: "A React-based web application facilitating user matchmaking and community engagement, featuring seamless Discord API integration for real-time communication.", 
                color: COLORS.amber 
              },
            ].map((item, i) => (
              <div key={i} style={{
                background: COLORS.surface,
                border: `1px solid ${COLORS.cardBorder}`,
                borderRadius: "12px",
                padding: "20px",
                borderLeft: `3px solid ${item.color}`,
              }}>
                <div style={{ fontWeight: 600, fontSize: "0.9rem", marginBottom: "6px" }}>{item.topic}</div>
                <div style={{ color: COLORS.muted, fontSize: "0.8rem", lineHeight: 1.6 }}>{item.detail}</div>
              </div>
            ))}
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{ borderTop: `1px solid ${COLORS.cardBorder}`, paddingTop: "32px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "0.75rem", color: COLORS.subtle }}>
            <span style={{ ...gradientText }}>Kyle</span> · {new Date().getFullYear()}
          </span>
          <span style={{ fontSize: "0.75rem", color: COLORS.subtle }}>Built with React</span>
        </footer>
      </div>
    </div>
  );
}
