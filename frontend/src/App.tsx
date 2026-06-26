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

const projects = [
  {
    title: "Secure Vault",
    desc: "End-to-end encrypted desktop sync application with zero-knowledge architecture. Files never leave your machine unencrypted.",
    tech: ["React", "Electron", "Flask", "AES-256"],
    icon: "🔐",
    accent: "#7C3AED",
  },
  {
    title: "Gridsafe",
    desc: "ML-powered log anomaly detector using XGBoost. Identifies threats in real time with sub-50ms latency on live streams.",
    tech: ["Python", "XGBoost", "Docker"],
    icon: "🛡️",
    accent: "#F43F5E",
  },
  /*
  {
    title: "8-bit Crawler",
    desc: "Procedural dungeon generator with BSP tree partitioning and pathfinding. Runs at 60fps with unlimited room complexity.",
    tech: ["C++", "SDL3", "BSP Trees"],
    icon: "🎮",
    accent: "#F59E0B",
  },
  */
];

const skills = [
  { label: "Languages", items: ["Python", "C++", "JavaScript", "TypeScript", "Bash", "SQL"] },
  { label: "Security", items: ["Network Forensics", "Penetration Testing", "Encryption", "CVE Analysis"] },
  { label: "Infrastructure", items: ["Docker", "Linux", "Nginx", "Proxmox", "Wireguard"] },
  { label: "Frameworks", items: ["React", "Flask", "Node.js", "Electron", "SDL3"] },
];

const timeline = [
  {
    year: "2026",
    title: "B.S. Software Engineering, Minor in Cybersecurity",
    org: "Iowa State University Graduate",
    desc: "Focused on systems programming, network security, and distributed systems.",
    type: "edu",
  },
  {
    year: "2022",
    title: "Homelab Infrastructure",
    org: "Personal Project",
    desc: "Built a 4-node Proxmox cluster running 20+ self-hosted services including private VPN, monitoring, and CI/CD.",
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
            Kyle
          </h1>
          <p style={{ margin: "0 0 20px", fontSize: "1.1rem", color: COLORS.muted, fontWeight: 300, letterSpacing: "0.5px", textAlign: "left" }}>
            Software Developer · Cloud & Security Enthusiast
          </p>
          <p style={{ margin: 0, color: COLORS.muted, lineHeight: 1.8, maxWidth: "580px", fontSize: "0.95rem", textAlign: "left" }}>
            Recent CS graduate building secure, scalable systems. I specialize in self-hosted infrastructure, 
            network forensics, and optimized backend architecture.
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
              const colorName = ["violet", "coral", "amber"][i];
              return (
                <div key={i} className={`project-card ${colorName}`}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "14px" }}>{p.icon}</div>
                  <h3 style={{ margin: "0 0 8px", fontSize: "1.05rem", fontWeight: 600 }}>{p.title}</h3>
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
          <h2 className="section-title">Currently Exploring</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
            {[
              { topic: "Malware Analysis", detail: "Static & dynamic analysis of real-world samples in isolated environments", color: COLORS.violet },
              { topic: "Kubernetes", detail: "Orchestrating self-hosted services with k3s on bare metal", color: COLORS.amber },
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
