import { useEffect, useRef, useState } from "react";

/* ============================================================
   Roger Rosenquist :: Portfolio
   Concept: "the status board" :: a clean ops-room aesthetic.
   Skills render as a live service-status grid, experience
   renders as rack units. Two semantic accents:
   green = operational, amber = provisioning (in progress).
   ============================================================ */

const SKILLS = [
  { name: "Python", detail: "LeetCode daily, scripting, automation", status: "operational" },
  { name: "JavaScript / TypeScript", detail: "Front-end builds, daily practice", status: "operational" },
  { name: "React", detail: "This site, component-driven UI", status: "operational" },
  { name: "IT Operations", detail: "Tier 1 support, imaging, inventory", status: "operational" },
  { name: "Networking & Hardware", detail: "Deployment, troubleshooting, AV", status: "operational" },
  { name: "AWS", detail: "Certification in progress", status: "provisioning" },
];

const EXPERIENCE = [
  {
    unit: "U3",
    org: "Mattituck-Cutchogue UFSD",
    role: "I.T. Technician, Level 1",
    period: "Current",
    points: [
      "Frontline support across three district sites: faculty, staff, and classrooms.",
      "District-wide equipment inventory reconciliation across asset tags, serials, and locations.",
      "Imaging, deployment, and lifecycle management for printers and end-user devices.",
    ],
  },
  {
    unit: "U2",
    org: "Right Financial Advisor",
    role: "Full-Stack Programming Intern",
    period: "Internship",
    points: [
      "Built a risk-assessment web application designed for an older client base.",
      "Helped troubleshoot production server issues on AWS after the internship ended.",
    ],
  },
  {
    unit: "U1",
    org: "Moka Graphics",
    role: "Web Development Intern",
    period: "Internship",
    points: [
      "Shipped bug fixes and front-end improvements for client sites, including a local medical business.",
    ],
  },
];

const PROJECTS = [
  {
    name: "Portfolio v2",
    detail: "This site. A single React component with no UI framework, deployed on GitHub Pages.",
    tag: "react",
  },
  {
    name: "AWS Lab Notes",
    detail: "Hands-on builds and notes from certification prep. Coming online as the cert wraps up.",
    tag: "cloud",
  },
  {
    name: "Front-End Builds",
    detail: "A series of production-grade interface projects, starting after the AWS certification.",
    tag: "queued",
  },
];

const LINKS = {
  email: "rosenquist.roger@gmail.com",
  github: "https://github.com/rogerrosenquist",
  linkedin: "https://www.linkedin.com/in/roger-rosenquist-8b867357",
};

/* ---------- tiny scroll-reveal hook (respects reduced motion) ---------- */
function useReveal() {
  const ref = useRef(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setShown(true);
      return;
    }
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && (setShown(true), obs.disconnect()),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, shown];
}

function Reveal({ children, delay = 0 }) {
  const [ref, shown] = useReveal();
  return (
    <div ref={ref} className={`reveal ${shown ? "shown" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function StatusDot({ kind }) {
  return <span className={`dot ${kind}`} aria-hidden="true" />;
}

function Badge({ kind }) {
  const label = kind === "operational" ? "Operational" : "Provisioning";
  return (
    <span className={`badge ${kind}`}>
      <StatusDot kind={kind} />
      {label}
    </span>
  );
}

export default function App() {
  const year = new Date().getFullYear();

  return (
    <div className="site">
      <style>{css}</style>

      {/* ---------------- Nav ---------------- */}
      <header className="nav">
        <a className="logo" href="#top" aria-label="Back to top">
          <span className="logo-mark">RR</span>
          <span className="logo-path">~/portfolio</span>
        </a>
        <nav className="nav-links" aria-label="Sections">
          <a href="#about">About</a>
          <a href="#skills">Skills</a>
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#contact" className="nav-cta">Contact</a>
        </nav>
      </header>

      <main id="top">
        {/* ---------------- Hero ---------------- */}
        <section className="hero">
          <p className="prompt">
            <span className="prompt-user">roger@longisland</span>
            <span className="prompt-sep">:</span>
            <span className="prompt-path">~</span>
            <span className="prompt-sep">$ </span>
            whoami<span className="cursor" aria-hidden="true" />
          </p>
          <h1>
            Roger <span className="thin">Rosenquist</span>
          </h1>
          <p className="hero-sub">
            I.T. technician keeping a school district running, building toward
            cloud engineering. Computer Science grad, Stony Brook University.
          </p>
          <div className="hero-status" role="status">
            <Badge kind="operational" />
            <span className="hero-loc">Long Island, NY</span>
            <span className="hero-div" aria-hidden="true">/</span>
            <span className="hero-loc">Open to cloud and platform roles</span>
          </div>
          <div className="hero-actions">
            <a className="btn primary" href="#experience">View experience</a>
            <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
        </section>

        {/* ---------------- About ---------------- */}
        <section id="about" className="section">
          <Reveal>
            <p className="eyebrow">// about</p>
            <h2>The short version</h2>
          </Reveal>
          <Reveal delay={80}>
            <div className="about-grid">
              <p>
                By day I handle Tier 1 support for a Long Island school
                district: imaging machines, untangling networks, and keeping a
                three-site equipment inventory honest. It is hands-on
                infrastructure work, and it taught me that reliability is a
                feature.
              </p>
              <p>
                The next step is the cloud. I am working through an AWS
                certification and keeping my programming sharp with daily
                problem solving in Python, JavaScript, and TypeScript. I came
                up through web development internships, so the front of the
                stack still feels like home.
              </p>
            </div>
          </Reveal>
        </section>

        {/* ---------------- Skills / status board ---------------- */}
        <section id="skills" className="section">
          <Reveal>
            <p className="eyebrow">// status board</p>
            <h2>Skills, monitored</h2>
          </Reveal>
          <div className="board">
            {SKILLS.map((s, i) => (
              <Reveal key={s.name} delay={i * 60}>
                <div className="card skill">
                  <div className="skill-top">
                    <h3>{s.name}</h3>
                    <Badge kind={s.status} />
                  </div>
                  <p className="muted">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Experience / rack ---------------- */}
        <section id="experience" className="section">
          <Reveal>
            <p className="eyebrow">// rack 01</p>
            <h2>Experience</h2>
          </Reveal>
          <div className="rack">
            {EXPERIENCE.map((job, i) => (
              <Reveal key={job.org} delay={i * 80}>
                <article className="unit">
                  <div className="rail" aria-hidden="true">
                    <span className="screw" />
                    <span className="unit-id">{job.unit}</span>
                    <span className="screw" />
                  </div>
                  <div className="unit-body">
                    <div className="unit-head">
                      <h3>{job.org}</h3>
                      <span className="period">{job.period}</span>
                    </div>
                    <p className="role">{job.role}</p>
                    <ul>
                      {job.points.map((p) => (
                        <li key={p}>{p}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="rail" aria-hidden="true">
                    <span className="screw" />
                    <span className="screw" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Projects ---------------- */}
        <section id="projects" className="section">
          <Reveal>
            <p className="eyebrow">// deployments</p>
            <h2>Projects</h2>
          </Reveal>
          <div className="board">
            {PROJECTS.map((p, i) => (
              <Reveal key={p.name} delay={i * 60}>
                <div className="card project">
                  <span className="tag">{p.tag}</span>
                  <h3>{p.name}</h3>
                  <p className="muted">{p.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ---------------- Contact ---------------- */}
        <section id="contact" className="section contact">
          <Reveal>
            <p className="eyebrow">// open a ticket</p>
            <h2>Get in touch</h2>
            <a className="email" href={`mailto:${LINKS.email}`}>{LINKS.email}</a>
            <div className="socials">
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">GitHub</a>
              <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            </div>
          </Reveal>
        </section>
      </main>

      <footer className="footer">
        <span className="muted">© {year} Roger Rosenquist</span>
        <span className="muted mono">uptime: continuous since 1995</span>
      </footer>
    </div>
  );
}

/* ============================ styles ============================ */
const css = `
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&family=IBM+Plex+Sans:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500&display=swap');

:root {
  --bg: #0f1419;
  --bg-raise: #151c24;
  --surface: #18212b;
  --line: #26323f;
  --text: #e9eef4;
  --muted: #91a3b5;
  --green: #4ade80;
  --green-dim: rgba(74, 222, 128, 0.12);
  --amber: #fbbf24;
  --amber-dim: rgba(251, 191, 36, 0.12);
  --link: #7cc0ff;
  --max: 1060px;
  --display: 'Space Grotesk', sans-serif;
  --body: 'IBM Plex Sans', sans-serif;
  --mono: 'IBM Plex Mono', monospace;
}

* { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
@media (prefers-reduced-motion: reduce) { html { scroll-behavior: auto; } }

.site {
  background:
    radial-gradient(1200px 500px at 80% -10%, rgba(124, 192, 255, 0.06), transparent 60%),
    var(--bg);
  color: var(--text);
  font-family: var(--body);
  font-size: 17px;
  line-height: 1.65;
  min-height: 100vh;
}

a { color: var(--link); text-decoration: none; }
a:focus-visible, .btn:focus-visible {
  outline: 2px solid var(--green);
  outline-offset: 3px;
  border-radius: 4px;
}

h1, h2, h3 { font-family: var(--display); letter-spacing: -0.01em; }
.mono { font-family: var(--mono); font-size: 0.85rem; }
.muted { color: var(--muted); }

/* ---------- nav ---------- */
.nav {
  position: sticky; top: 0; z-index: 10;
  display: flex; align-items: center; justify-content: space-between;
  max-width: var(--max); margin: 0 auto; padding: 18px 24px;
  backdrop-filter: blur(10px);
  background: rgba(15, 20, 25, 0.82);
  border-bottom: 1px solid var(--line);
}
.logo { display: flex; align-items: baseline; gap: 10px; color: var(--text); }
.logo-mark {
  font-family: var(--display); font-weight: 700; font-size: 1.05rem;
  border: 1px solid var(--line); border-radius: 6px; padding: 2px 8px;
}
.logo-path { font-family: var(--mono); font-size: 0.8rem; color: var(--muted); }
.nav-links { display: flex; gap: 22px; align-items: center; }
.nav-links a { color: var(--muted); font-size: 0.92rem; transition: color 0.15s; }
.nav-links a:hover { color: var(--text); }
.nav-cta {
  color: var(--green) !important;
  border: 1px solid rgba(74, 222, 128, 0.35);
  border-radius: 999px; padding: 5px 14px;
}
@media (max-width: 640px) { .logo-path { display: none; } .nav-links { gap: 14px; } }

/* ---------- hero ---------- */
.hero {
  max-width: var(--max); margin: 0 auto;
  padding: 110px 24px 90px;
}
.prompt { font-family: var(--mono); font-size: 0.95rem; color: var(--muted); margin-bottom: 22px; }
.prompt-user { color: var(--green); }
.prompt-path { color: var(--link); }
.prompt-sep { color: var(--muted); }
.cursor {
  display: inline-block; width: 9px; height: 1.1em;
  background: var(--green); margin-left: 6px; vertical-align: text-bottom;
  animation: blink 1.1s steps(1) infinite;
}
@keyframes blink { 50% { opacity: 0; } }
@media (prefers-reduced-motion: reduce) { .cursor { animation: none; } }

.hero h1 {
  font-size: clamp(2.6rem, 7vw, 4.6rem);
  font-weight: 700; line-height: 1.05; margin-bottom: 22px;
}
.hero h1 .thin { font-weight: 400; color: var(--muted); }
.hero-sub { max-width: 560px; font-size: 1.12rem; color: var(--muted); margin-bottom: 26px; }
.hero-status {
  display: flex; flex-wrap: wrap; align-items: center; gap: 12px;
  font-family: var(--mono); font-size: 0.85rem; color: var(--muted);
  margin-bottom: 36px;
}
.hero-div { color: var(--line); }
.hero-actions { display: flex; gap: 14px; flex-wrap: wrap; }

.btn {
  display: inline-block; font-family: var(--mono); font-size: 0.9rem;
  color: var(--text); border: 1px solid var(--line); border-radius: 8px;
  padding: 10px 20px; transition: border-color 0.15s, background 0.15s, transform 0.15s;
}
.btn:hover { border-color: var(--muted); transform: translateY(-1px); }
.btn.primary { background: var(--green); border-color: var(--green); color: #0c1310; font-weight: 500; }
.btn.primary:hover { background: #6ee7a0; }

/* ---------- status badges ---------- */
.badge {
  display: inline-flex; align-items: center; gap: 7px;
  font-family: var(--mono); font-size: 0.72rem; letter-spacing: 0.06em;
  text-transform: uppercase; border-radius: 999px; padding: 4px 11px;
}
.badge.operational { color: var(--green); background: var(--green-dim); }
.badge.provisioning { color: var(--amber); background: var(--amber-dim); }
.dot { width: 7px; height: 7px; border-radius: 50%; }
.dot.operational { background: var(--green); animation: pulse 2.4s ease-in-out infinite; }
.dot.provisioning { background: var(--amber); animation: pulse 1.4s ease-in-out infinite; }
@keyframes pulse { 50% { opacity: 0.35; } }
@media (prefers-reduced-motion: reduce) { .dot { animation: none; } }

/* ---------- sections ---------- */
.section { max-width: var(--max); margin: 0 auto; padding: 70px 24px; }
.eyebrow {
  font-family: var(--mono); font-size: 0.8rem; color: var(--green);
  letter-spacing: 0.08em; margin-bottom: 10px;
}
.section h2 { font-size: clamp(1.7rem, 4vw, 2.3rem); margin-bottom: 34px; }

.about-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 34px; max-width: 920px; }
.about-grid p { color: var(--muted); }
@media (max-width: 720px) { .about-grid { grid-template-columns: 1fr; } }

/* ---------- cards / board ---------- */
.board { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
@media (max-width: 900px) { .board { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 580px) { .board { grid-template-columns: 1fr; } }

.card {
  background: var(--surface); border: 1px solid var(--line);
  border-radius: 12px; padding: 22px;
  transition: border-color 0.15s, transform 0.15s;
  height: 100%;
}
.card:hover { border-color: #3a4c5f; transform: translateY(-2px); }
.skill-top { display: flex; justify-content: space-between; align-items: start; gap: 10px; margin-bottom: 10px; }
.card h3 { font-size: 1.02rem; font-weight: 600; }
.card .muted { font-size: 0.92rem; }
.project .tag {
  font-family: var(--mono); font-size: 0.72rem; color: var(--link);
  border: 1px solid var(--line); border-radius: 999px; padding: 3px 10px;
  display: inline-block; margin-bottom: 14px;
}
.project h3 { margin-bottom: 8px; }

/* ---------- rack ---------- */
.rack { display: flex; flex-direction: column; gap: 14px; }
.unit {
  display: grid; grid-template-columns: 44px 1fr 44px;
  background: var(--bg-raise); border: 1px solid var(--line); border-radius: 10px;
  overflow: hidden;
}
.rail {
  display: flex; flex-direction: column; align-items: center; justify-content: space-between;
  padding: 14px 0; background: var(--surface); border-inline: 1px solid var(--line);
}
.unit .rail:first-child { border-left: none; }
.unit .rail:last-child { border-right: none; }
.screw {
  width: 9px; height: 9px; border-radius: 50%;
  background: var(--bg); border: 1px solid var(--line);
}
.unit-id {
  font-family: var(--mono); font-size: 0.7rem; color: var(--muted);
  writing-mode: vertical-rl; letter-spacing: 0.15em;
}
.unit-body { padding: 22px 26px; }
.unit-head { display: flex; justify-content: space-between; align-items: baseline; gap: 14px; flex-wrap: wrap; }
.unit-head h3 { font-size: 1.15rem; }
.period { font-family: var(--mono); font-size: 0.78rem; color: var(--amber); }
.role { font-family: var(--mono); font-size: 0.85rem; color: var(--muted); margin: 4px 0 14px; }
.unit ul { list-style: none; display: flex; flex-direction: column; gap: 8px; }
.unit li { color: var(--muted); font-size: 0.95rem; padding-left: 18px; position: relative; }
.unit li::before { content: '>'; position: absolute; left: 0; color: var(--green); font-family: var(--mono); }
@media (max-width: 580px) {
  .unit { grid-template-columns: 30px 1fr 30px; }
  .unit-body { padding: 18px; }
}

/* ---------- contact ---------- */
.contact { text-align: center; padding-bottom: 100px; }
.contact .eyebrow { margin-bottom: 12px; }
.email {
  display: inline-block; font-family: var(--display);
  font-size: clamp(1.3rem, 4.5vw, 2.1rem); font-weight: 500;
  color: var(--text); margin: 6px 0 30px;
  border-bottom: 2px solid var(--green);
  transition: color 0.15s;
}
.email:hover { color: var(--green); }
.socials { display: flex; gap: 14px; justify-content: center; }

/* ---------- footer ---------- */
.footer {
  max-width: var(--max); margin: 0 auto; padding: 26px 24px;
  border-top: 1px solid var(--line);
  display: flex; justify-content: space-between; gap: 12px; flex-wrap: wrap;
  font-size: 0.88rem;
}

/* ---------- reveal ---------- */
.reveal { opacity: 0; transform: translateY(14px); transition: opacity 0.5s ease, transform 0.5s ease; }
.reveal.shown { opacity: 1; transform: none; }
@media (prefers-reduced-motion: reduce) { .reveal { opacity: 1; transform: none; transition: none; } }
`;
