import { useState, useEffect } from "react";
import {
  Github, Linkedin, Mail, ChevronRight, ExternalLink,
  MapPin, GraduationCap, Shield, Server, Code2, Wrench,ChevronDown,
} from "lucide-react";
import { Copyright } from "lucide-react";
// ---------------------------------------------------------------------------
// DATA — modifie librement ce bloc pour mettre à jour le contenu du site.
// Remplace les valeurs marquées [À COMPLÉTER] par tes vraies coordonnées.
// ---------------------------------------------------------------------------

const CONTACT = {
  email: "madiousarr652@gmail.com",
  github: "https://github.com/Madjilouh",
  githubLabel: "github.com/Madjilouh",
  linkedin: "https://www.linkedin.com/in/madiou-sarr-70413633a/", // [À COMPLÉTER]
  linkedinLabel: "linkedin.com/in/madiou-sarr-70413633a/", // [À COMPLÉTER]
  location: "Dakar, Sénégal",
};

const NAV_LINKS = [
  { id: "about", label: "about" },
  { id: "skills", label: "skills" },
  { id: "projects", label: "projects" },
  { id: "formation", label: "formation" },
  { id: "contact", label: "contact" },
];

const SKILLS = [
  {
    category: "Systèmes & Réseaux",
    icon: Server,
    items: [
      { name: "Administration Linux (users, ACL POSIX, ext4, systemd)", level: "Confirmé" },
      { name: "Administration Windows Server (PowerShell, NTFS ACL)", level: "Confirmé" },
      { name: "Virtualisation (VirtualBox)", level: "Confirmé" },
      { name: "Réseaux TCP/IP", level: "Intermédiaire" },
    ],
  },
  {
    category: "Sécurité",
    icon: Shield,
    items: [
      { name: "Détection d'intrusion (IDS/IPS)", level: "Confirmé" },
      { name: "SIEM & corrélation de logs", level: "Confirmé" },
      { name: "Tests d'intrusion (SQLi)", level: "Intermédiaire" },
      { name: "Gestion d'incidents & secrets", level: "Confirmé" },
    ],
  },
  {
    category: "Développement",
    icon: Code2,
    items: [
      { name: "Python (FastAPI, Django)", level: "Confirmé" },
      { name: "C (systèmes bas niveau)", level: "Intermédiaire" },
      { name: "JavaScript / Node.js / React", level: "Confirmé" },
      { name: "SQL & modélisation de bases de données", level: "Confirmé" },
    ],
  },
  {
    category: "Outils",
    icon: Wrench,
    items: [
      { name: "Git / GitHub", level: "Confirmé" },
      { name: "Selenium (automatisation)", level: "Confirmé" },
      { name: "Chart.js / dashboards", level: "Confirmé" },
      { name: "WebSocket / temps réel", level: "Intermédiaire" },
    ],
  },
];

const PROJECTS = [
  {
    name: "device-tracker.service",
    status: "En cours",
    description:
      "Système de géolocalisation full-stack pensé comme un vrai service Linux : API FastAPI, base SQLite, WebSocket temps réel et déploiement systemd sur Ubuntu 22.04.",
    stack: ["FastAPI", "SQLite", "WebSocket", "PWA", "systemd"],
    link: CONTACT.github,
  },
  {
    name: "scabs-siem.service",
    status: "Déployé",
    description:
      "Plateforme Django de diagnostic sécurité pour PME : détection d'anomalies (IsolationForest / RandomForest), moteur IDS, AutoDefender iptables/netsh, tests SQLi et rapports PDF automatiques.",
    stack: ["Django", "Machine Learning", "IDS", "Chart.js"],
    link: CONTACT.github,
  },
  {
    name: "food-del.service",
    status: "Déployé",
    description:
      "Application de livraison de repas en stack MERN complète, avec paiement Stripe, authentification JWT et back-office admin. Incident de sécurité géré : rotation de clés après une alerte GitGuardian.",
    stack: ["MongoDB", "Express", "React", "Node.js", "Stripe"],
    link: "https://github.com/Madjilouh/Food-Del",
  },
  {
    name: "redis-clone.c",
    status: "En cours",
    description:
      "Redis réécrit depuis zéro pour comprendre ce qu'il y a sous le capot : serveur TCP sur le port 6379 et parseur du protocole RESP, inspiré du projet build-your-own-x.",
    stack: ["C", "TCP", "RESP"],
    link: CONTACT.github,
  },
  {
    name: "kairos-notifier.service",
    status: "Déployé",
    description:
      "Bot Python qui scrute l'emploi du temps universitaire et envoie une capture d'écran par email, planifié via le Task Scheduler Windows.",
    stack: ["Python", "Selenium", "Automatisation"],
    link: CONTACT.github,
  },
  {
    name: "arduino-projects",
    status: "Prototype",
    description:
      "ArduiGame (console de jeu LCD) et SenAgri WaterGuard (irrigation intelligente), simulés sous Wokwi et Tinkercad.",
    stack: ["Arduino", "Wokwi", "Tinkercad"],
    link: CONTACT.github,
  },
];

const TIMELINE = [
  {
    status: "En cours",
    title: "L2 Ingénierie Informatique — Systèmes, Data & Sécurité",
    place: "Polytech Diamniadio, Université Amadou Mahtar Mbow",
    detail:
      "Fondamentaux des systèmes d'exploitation (SE1, encadré par Dr. Kéba Gueye), modélisation de bases de données, administration systèmes.",
  },
  {
    status: "Terminé",
    title: "Rapport de fin de module SE1",
    place: "Scénario SENTECH SARL",
    detail:
      "Administration multi-utilisateurs Linux/Windows : rapport complet, présentation PowerPoint et soutenance orale.",
  },
  {
    status: "Planifié",
    title: "Certifications visées",
    place: "CompTIA Linux+ · LPIC-1 · CompTIA Security+ · AWS Cloud Practitioner",
    detail: "Objectif : consolider le profil SysAdmin / Sécurité en vue des premières candidatures.",
  },
  {
    status: "En route",
    title: "Objectif carrière",
    place: "Junior SysAdmin / Support IT → DevOps / SOC Analyst",
    detail: "Cible : opérateurs télécom, banques et institutions publiques au Sénégal.",
  },
];

const START_DATE = new Date("2024-09-01T00:00:00Z");

function formatUptime(ms) {
  let s = Math.floor(ms / 1000);
  const days = Math.floor(s / 86400); s -= days * 86400;
  const hours = Math.floor(s / 3600); s -= hours * 3600;
  const mins = Math.floor(s / 60); s -= mins * 60;
  const years = Math.floor(days / 365);
  const remDays = days % 365;
  return `${years}a ${remDays}j ${hours}h ${mins}m ${s}s`;
}

const STATUS_STYLES = {
  "Déployé": "text-emerald-400 border-emerald-400/30 bg-emerald-400/10",
  "En cours": "text-amber-400 border-amber-400/30 bg-amber-400/10",
  "Prototype": "text-sky-400 border-sky-400/30 bg-sky-400/10",
  "Planifié": "text-zinc-400 border-zinc-500/30 bg-zinc-500/10",
  "Terminé": "text-cyan-400 border-cyan-400/30 bg-cyan-400/10",
  "En route": "text-zinc-400 border-zinc-500/30 bg-zinc-500/10",
};

function StatusBadge({ status }) {
  return (
    <span className={`inline-flex items-center gap-1.5 rounded border px-2 py-0.5 text-xs font-display ${STATUS_STYLES[status] || STATUS_STYLES["Planifié"]}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

function SectionLabel({ children }) {
  return <p className="font-display text-amber-400 text-sm mb-3">{children}</p>;
}

function WindowChrome({ title }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-800 bg-zinc-900/80">
      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-amber-500/70" />
      <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/70" />
      <span className="ml-2 text-xs text-zinc-500 font-display">{title}</span>
    </div>
  );
}

export default function Portfolio() {
  const [now, setNow] = useState(new Date());
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  const uptime = formatUptime(now - START_DATE);

  return (
    <div id="top" className="animated-bg min-h-screen font-body text-zinc-300">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700;800&family=IBM+Plex+Sans:wght@400;500;600;700&display=swap');
        .font-display { font-family: 'JetBrains Mono', ui-monospace, monospace; }
        .font-body { font-family: 'IBM Plex Sans', ui-sans-serif, system-ui, sans-serif; }
        html { scroll-behavior: smooth; }
        ::selection { background: #fbbf24; color: #09090b; }
        a:focus-visible, button:focus-visible { outline: 2px solid #fbbf24; outline-offset: 2px; }
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.25; } }
        .status-dot { animation: blink 2s ease-in-out infinite; }
        @keyframes float-blob-1 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -40px) scale(1.15); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes scrollIndicator {
          0%, 100% {
            transform: translateY(0);
            opacity: 0.3;
          }
          50% {
            transform: translateY(10px);
            opacity: 1;
          }
        }

        .scroll-indicator {
          animation: scrollIndicator 1.8s ease-in-out infinite;
        }
        
        @keyframes gradientMove {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        .animated-bg {
          background: linear-gradient(
            120deg,
            #01030f,
            #090e1a,
            #0f151d,
            #020616
          );
          background-size: 300% 300%;
          animation: gradientMove 12s ease infinite;
        }

        @keyframes float-blob-2 {
          0%, 100% { transform: translate(0, 0) scale(1); }
          50% { transform: translate(-60px, 40px) scale(1.2); }
        }
        .blob-1 { animation: float-blob-1 14s ease-in-out infinite; }
        .blob-2 { animation: float-blob-2 18s ease-in-out infinite; }
        @media (prefers-reduced-motion: reduce) {
          .status-dot, .blob-1, .blob-2 { animation: none; }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="fixed top-4 inset-x-0 z-50 flex justify-center">
        <div
          className={`w-[85%] max-w-[1500px] flex items-center px-8 sm:px-10 py-4 rounded-2xl transition-all duration-300 ${
            scrolled
              ? "bg-zinc-950/60 backdrop-blur-md border border-zinc-800/60 shadow-lg shadow-black/20"
              : "bg-transparent border border-transparent"
          }`}
        >
          <a href="#top" className="font-display text-xl text-zinc-100 tracking-tight shrink-0 mr-8 hover:scale-105 transition-transform">
            <span className="text-amber-400 ">{"<"}</span> MADIOU<span className="text-amber-400 ">{" />"}</span>
          </a>

          <nav className="ml-auto flex items-center gap-6 sm:gap-10 overflow-x-auto">
            {NAV_LINKS.map((l) => (
              <a
                key={l.id}
                href={`#${l.id}`}
                className="font-display text-base sm:text-lg text-zinc-400 hover:text-amber-400 transition whitespace-nowrap"
              >
                ~/{l.label}
              </a>
            ))}
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="ml-4 inline-flex items-center gap-2 rounded-lg border border-amber-400/70 bg-amber-400 px-4 py-2 font-display text-sm font-semibold text-black transition-all duration-300 hover:-translate-y-0.5 hover:bg-amber-300 hover:shadow-lg hover:shadow-amber-400/20"
            >
              View Resume
              <ChevronRight size={16} />
            </a>
          </nav>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden pt-36 pb-20 px-6">
        <div className="absolute -left-24 top-10 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl blob-1" style={{ zIndex: -1 }} />
        <div className="absolute -right-24 bottom-0 w-96 h-96 bg-cyan-500/20 rounded-full blur-3xl blob-2" style={{ zIndex: -1 }} />
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
          <div>
            <p className="font-display text-amber-400 text-sm mb-4">$ whoami</p>
            <h1 className="font-display font-bold text-4xl sm:text-5xl text-zinc-100 leading-tight mb-4">
              Madiou <span className="text-zinc-600 text-2xl align-middle">// Yt</span>
            </h1>
            <p className="text-lg sm:text-xl text-zinc-200 mb-6">
              Étudiant Ingénieur Informatique — Systèmes, Data &amp; Sécurité
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8 max-w-xl">
              Je conçois, casse et sécurise des systèmes — du noyau Linux jusqu'à l'application web.
              En L2 à Polytech Diamniadio, direction l'administration système, le DevOps et la cybersécurité.
            </p>
            <div className="flex flex-wrap gap-4 mb-8">
              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-5 py-3 bg-amber-400 text-zinc-950 font-display text-sm font-semibold rounded hover:bg-amber-300 transition"
              >
                Voir mes projets <ChevronRight size={16} />
              </a>
              <a
                href="#contact"
                className="px-5 py-3 border border-zinc-700 text-zinc-200 font-display text-sm rounded hover:border-amber-400 hover:text-amber-400 transition"
              >
                Me contacter
              </a>
            </div>
            <div className="flex gap-5 text-zinc-500">
              <a href={CONTACT.github} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition" aria-label="GitHub">
                <Github size={20} />
              </a>
              <a href={`mailto:${CONTACT.email}`} className="hover:text-amber-400 transition" aria-label="Email">
                <Mail size={20} />
              </a>
              <a href={CONTACT.linkedin} target="_blank" rel="noreferrer" className="hover:text-amber-400 transition" aria-label="LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden shadow-2xl shadow-black/40">
            <WindowChrome title="status.sh" />
            <div className="p-5 font-display text-sm leading-7">
              <p className="text-zinc-500">$ systemctl status madiou.service</p>
              <p className="text-zinc-100 mt-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 mr-2 status-dot" />
                madiou.service - Étudiant Ingénieur &amp; futur SysAdmin
              </p>
              <p className="text-zinc-500 ml-4">
                Loaded: <span className="text-zinc-300">loaded (/senegal/dakar/polytech-diamniadio)</span>
              </p>
              <p className="text-zinc-500 ml-4">
                Active: <span className="text-emerald-400">active (running)</span> since 2024-09-01;{" "}
                <span className="text-zinc-300">{uptime}</span> ago
              </p>
              <p className="text-zinc-500 ml-4">
                Focus: <span className="text-zinc-300">Linux · Sécurité · DevOps</span>
              </p>
              <p className="text-zinc-500 ml-4">
                Main PID: <span className="text-zinc-300">@Madjilouh (github)</span>
              </p>
              <p className="text-zinc-500 ml-4">
                Status: <span className="text-amber-400">"Ouvert aux stages &amp; alternances"</span>
              </p>
            </div>
          </div>
        </div>
        <a
          href="#about"
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-amber-400/70 hover:text-amber-400 transition"
          aria-label="Scroll"
        >
          <ChevronDown size={40} className="scroll-indicator" />
        </a>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14">
          <div>
            <SectionLabel>$ cat about.md</SectionLabel>
            <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-6">À propos</h2>
            <p className="text-zinc-400 leading-relaxed mb-6">
              Je suis étudiant en deuxième année d'ingénierie informatique, spécialisation Systèmes
              d'Information, Data et Sécurité. Mon truc, c'est comprendre comment les systèmes tiennent
              debout — et comment ils tombent. Entre les TP d'administration Linux/Windows et mes projets
              perso, je passe autant de temps à construire des services qu'à les casser pour les sécuriser.
            </p>
            <p className="text-zinc-400 leading-relaxed mb-8">
              Mon objectif : rejoindre une équipe SysAdmin, DevOps ou SOC pour apprendre au contact de
              vrais systèmes de production, tout en continuant à monter en compétence sur la sécurité.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <GraduationCap size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-xs text-zinc-500">Formation</p>
                  <p className="text-sm text-zinc-300">L2 Ingénierie Informatique</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Shield size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-xs text-zinc-500">Spécialité</p>
                  <p className="text-sm text-zinc-300">Systèmes, Data &amp; Sécurité</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-xs text-zinc-500">Basé à</p>
                  <p className="text-sm text-zinc-300">Dakar, Sénégal</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Server size={18} className="text-amber-400 mt-0.5 shrink-0" />
                <div>
                  <p className="font-display text-xs text-zinc-500">Objectif</p>
                  <p className="text-sm text-zinc-300">SysAdmin / DevOps / SOC</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden self-start overflow-hidden shadow-2xl shadow-black/40">
            <WindowChrome title="neofetch" />
            <div className="p-5 font-display text-sm space-y-2.5">
              {[
                ["OS", "Sénégal 26.07 LTS"],
                ["Host", "Polytech Diamniadio"],
                ["Kernel", "L2 — Ingénierie Informatique"],
                ["Shell", "/bin/curiosité"],
                ["DE", "Systèmes, Data & Sécurité"],
                ["Terminal", "VS Code + Git Bash + PowerShell"],
                ["CPU", "Résolution de bugs (typos & imports)"],
                ["Memory", "Linux · Windows Server · Python · JS"],
              ].map(([k, v]) => (
                <p key={k} className="flex gap-3">
                  <span className="text-amber-400 w-20 shrink-0">{k}</span>
                  <span className="text-zinc-300">{v}</span>
                </p>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-24 px-6 border-t border-zinc-900 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>$ systemctl list-units --type=skill</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-12">Compétences</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {SKILLS.map((cat) => (
              <div key={cat.category}>
                <div className="flex items-center gap-2 mb-4">
                  <cat.icon size={18} className="text-amber-400" />
                  <h3 className="font-display text-zinc-100 font-semibold">{cat.category}</h3>
                </div>
                <ul>
                  {cat.items.map((s) => (
                    <li
                      key={s.name}
                      className="flex items-center justify-between gap-4 border-b border-zinc-800/60 py-2.5"
                    >
                      <span className="flex items-center gap-2 text-sm text-zinc-300">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shrink-0" />
                        {s.name}
                      </span>
                      <span className="font-display text-xs text-zinc-500 shrink-0">{s.level}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-6xl mx-auto">
          <SectionLabel>$ ls -la ~/projects</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-12">Projets</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROJECTS.map((p) => (
              <div
                key={p.name}
                className="flex flex-col rounded-lg border border-zinc-800 bg-zinc-900/30 p-5 hover:border-amber-400/40 transition"
              >
                <div className="mb-3">
                  <StatusBadge status={p.status} />
                </div>
                <h3 className="font-display text-zinc-100 font-semibold mb-2">{p.name}</h3>
                <p className="text-sm text-zinc-400 leading-relaxed mb-4 flex-1">{p.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.stack.map((s) => (
                    <span
                      key={s}
                      className="font-display text-xs px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700"
                    >
                      {s}
                    </span>
                  ))}
                </div>
                <a
                  href={p.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-display text-amber-400 hover:text-amber-300 transition"
                >
                  Voir sur GitHub <ExternalLink size={12} />
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FORMATION / TIMELINE */}
      <section id="formation" className="py-24 px-6 border-t border-zinc-900 bg-zinc-900/10">
        <div className="max-w-6xl mx-auto max-w-3xl">
          <SectionLabel>$ journalctl -u parcours.service --since=2024</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-12">Formation &amp; Parcours</h2>
          <div>
            {TIMELINE.map((item, i) => (
              <div key={item.title} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <span className="w-3 h-3 rounded-full bg-amber-400 mt-1.5 shrink-0" />
                  {i < TIMELINE.length - 1 && <span className="w-px flex-1 bg-zinc-800" />}
                </div>
                <div className="pb-10">
                  <div className="mb-2">
                    <StatusBadge status={item.status} />
                  </div>
                  <h3 className="font-display text-zinc-100 font-semibold mb-1">{item.title}</h3>
                  <p className="text-sm text-amber-400/80 font-display mb-2">{item.place}</p>
                  <p className="text-sm text-zinc-400 leading-relaxed">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="py-24 px-6 border-t border-zinc-900">
        <div className="max-w-3xl mx-auto text-center">
          <SectionLabel>$ ssh madiou@contact -p 2026</SectionLabel>
          <h2 className="font-display font-bold text-3xl sm:text-4xl text-zinc-100 mb-4">Travaillons ensemble</h2>
          <p className="text-zinc-400 leading-relaxed mb-10 max-w-xl mx-auto">
            Actuellement à la recherche d'un stage ou d'une alternance en administration système,
            sécurité ou DevOps. Une question, une opportunité, ou juste envie d'échanger sur Linux ?
            Écris-moi.
          </p>

          <div className="rounded-lg border border-zinc-800 bg-zinc-900/40 overflow-hidden text-left mb-8">
            <WindowChrome title="contact.sh" />
            <div className="p-5 font-display text-sm">
              {[
                ["Email", CONTACT.email, `mailto:${CONTACT.email}`],
                ["GitHub", CONTACT.githubLabel, CONTACT.github],
                ["LinkedIn", CONTACT.linkedinLabel, CONTACT.linkedin],
              ].map(([k, v, href]) => (
                <a
                  key={k}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border-b border-zinc-800/60 py-2.5 last:border-0 group"
                >
                  <span className="text-zinc-500">{k}</span>
                  <span className="text-amber-400 group-hover:text-amber-300 transition">{v}</span>
                </a>
              ))}
              <div className="flex items-center justify-between py-2.5">
                <span className="text-zinc-500">Location</span>
                <span className="text-zinc-300">{CONTACT.location}</span>
              </div>
            </div>
          </div>

          <a
            href={`mailto:${CONTACT.email}`}
            className="inline-flex items-center gap-2 px-6 py-3 bg-amber-400 text-zinc-950 font-display text-sm font-semibold rounded hover:bg-amber-300 transition"
          >
            <Mail size={16} /> Envoyer un email
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-8 px-6 border-t border-zinc-900 text-center">
        <p className="font-display text-xs text-zinc-600">
          // build: React + Tailwind · thème terminal · Dakar, Sénégal {new Date().getFullYear()}
        </p>
        <div className="flex flex-col items-center gap-1 mt-1">
          <p className="font-display text-xs text-zinc-700">
            Madiou----------------------SARR
          </p>
          <div className="flex items-center gap-2">
            <Copyright size={14} className="text-zinc-500" />
            <p className="font-display text-xs text-zinc-500">
              All Rights Reserved - 2026
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}