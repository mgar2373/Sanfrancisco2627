import { useState, useEffect, useRef } from "react";

// ─── COLOURS ───────────────────────────────────────────────
const C = {
  erasmus: "#003DA5",
  erasmusMid: "#1A56B8",
  erasmusLight: "#E8F0FB",
  orange: "#F97316",
  yellow: "#EAB308",
  green: "#16A34A",
  red: "#DC2626",
  teal: "#0D9488",
  bg: "#F5F7FA",
  white: "#FFFFFF",
  border: "#E2E8F0",
  text: "#1E293B",
  muted: "#64748B",
  light: "#94A3B8",
};

// ─── DATA ───────────────────────────────────────────────────
const PARTICIPANTS = [
  { id: 1, name: "Marissa García Martín", role: "Admin. econòmica / Prof. Màrqueting", emoji: "👩‍💼", color: C.orange },
  { id: 2, name: "Mònica Regi Pell", role: "Prof. anglès / Coord. Mobilitat VET", emoji: "👩‍🏫", color: C.teal },
  { id: 3, name: "Èrika Ramón Larios", role: "Estudiant CFGM Gestió Administrativa", emoji: "👩‍🎓", color: C.yellow },
  { id: 4, name: "Eric Rodriguez González", role: "Estudiant CFGM Màrqueting", emoji: "👨‍🎓", color: C.green },
  { id: 5, name: "Andrea Battaglia Rayo", role: "Estudiant CFGM Administració", emoji: "👩‍🎓", color: "#E11D74" },
];

const INITIAL_CONTACTS = [
  // ── SFUSD / HOST ──────────────────────────────────────────
  { id: 1, name: "Erin Deis", institution: "SFUSD – College & Career Readiness (Director)", email: "deise@sfusd.edu", phone: "+1 707-559-8225", sentDate: "2026-01-15", status: "Confirmat ✅", lastContact: "2026-02-24", notes: "Principal interlocutora SFUSD. Reunió confirmada: dimarts 14/04 a les 9:30h a 750 25th Ave, San Francisco CA 94121 (2n pis, sala de conferències). Business Pathway Competition (NFTE) divendres 17/04, 9h–15h, cerimònia de premis 14:30h. Gestiona possible visita a classe de 10è durant la setmana (pendent de confirmar). Responsable de signar el Mobility Agreement com a organització d'acollida." },
  { id: 2, name: "Nadia Talbot", institution: "Galileo Academy of Science & Technology (SFUSD)", email: "", phone: "", sentDate: "2026-01-23", status: "Redirigit ↗️", lastContact: "2026-01-23", notes: "Contact inicial a Galileo Academy. Va redirigir totes les gestions cap a Erin Deis (SFUSD central), ja que qualsevol visita a centres SFUSD s'ha de coordinar des de College & Career Readiness." },
  { id: 3, name: "NFTE Partner", institution: "NFTE – Network for Teaching Entrepreneurship", email: "", phone: "", sentDate: "2026-02-24", status: "Confirmat ✅", lastContact: "2026-02-24", notes: "Organitzadors de la Business Pathway Competition del 17/04. Estudiants participants: 11è i 12è de Galileo HS i Lincoln HS (San Francisco). Localització exacta de l'acte pendent de confirmar per Erin Deis. Cerimònia de premis prevista a les 14:30h." },
  // ── EMPRESES / ENTITATS SF ────────────────────────────────
  { id: 4, name: "Naomi Maisel", institution: "La Cocina SF – Incubadora gastronòmica", email: "naomi@lacocinasf.org", phone: "(415) 824-2729 ext. 321", sentDate: "2026-02-20", status: "En procés 🔄", lastContact: "2026-02-25", notes: "Directora de programes de La Cocina (incubadora de petits negocis liderats per dones i immigrants). Ofereix tour de 45 min. No fan job shadowing formal però sí observació de l'espai i explicació del model de negoci. Opció de dinar preparat per un cuiner en pràctiques ~$30/persona. Disponibilitat: dimarts, dimecres o dijous (NO dilluns ni divendres). Pendent confirmar dia definitiu i si s'inclou el dinar. Emetran certificat d'assistència per als arxius Erasmus+. Adreça: 101 Polk St, Civic Center, SF." },
  { id: 5, name: "CCSF Outreach", institution: "City College of San Francisco (CCSF)", email: "outreach@ccsf.edu", phone: "", sentDate: "2026-01-28", status: "Parcial 🟡", lastContact: "2026-01-28", notes: "No ofereixen job shadowing formal ni visites de classe per a grups externs. Sí ofereixen campus tour de l'edifici principal. Possibilitat de contactar amb el departament de CTE/apprenticeships a través d'Erin Deis per a una visita més específica. No prioritari si l'agenda s'omple." },
  { id: 6, name: "Lick-Wilmerding HS", institution: "Lick-Wilmerding High School (escola privada, SF)", email: "", phone: "", sentDate: "2026-01-29", status: "Pendent ⏳", lastContact: "2026-01-29", notes: "Escola privada fundada com a 'trades school' amb fort component pràctic i tècnic. Suggerida per Erin Deis com a referent de model educatiu innovador. Ofereix formació en àrees d'ofici (fusta, metal·listeria, cuina, electrònica). Pendent de resposta al correu inicial. Adreça: 755 Ocean Ave, San Francisco." },
  // ── ALLOTJAMENT / VIATGES ────────────────────────────────
  { id: 7, name: "Eduardo Temprano", institution: "Viajes Radialtours S.L. – Agent de viatges", email: "info@radialtours.com", phone: "+34 972 34 60 60", sentDate: "2026-02-02", status: "Confirmat ✅", lastContact: "2026-02-02", notes: "Agent de viatges responsable del paquet. Expedient núm. 260410. Pressupost total: 7.050€ per 5 passatgers (1.410€/persona). Inclou: vols BCN-SFO-BCN (United/Lufthansa), hotel FOUND Carlton Nob Hill (10–18 abril, 2 dobles + 1 individual), assegurança Asistencia + Cancelación Start Plus. IMPORTANT: ESTA pendent de tramitar per tots els participants abans d'emissió de bitllets." },
  { id: 8, name: "FOUND Hotel Carlton", institution: "FOUND Hotel Carlton, Nob Hill – Allotjament", email: "", phone: "+1 (415) 673-0242", sentDate: "2026-02-02", status: "Confirmat ✅", lastContact: "2026-02-02", notes: "Hotel reservat via Radialtours. Adreça: 1075 Sutter St, Nob Hill, San Francisco CA 94109. Valoració Google: 4.1/5 (1.175 ressenyes). Check-in: 10/04 · Check-out: 18/04 (8 nits). Habitacions: 2 dobles + 1 individual. IMPORTANT: esmorzar NO inclòs. Estil boutique/hostel modern. Ben comunicat amb transport públic (MUNI, linia 2 i 3)." },
  // ── EQUIP INTERN SERRALLARGA ─────────────────────────────
  { id: 9, name: "Rubén Fernández Carvajal", institution: "Institut Serrallarga – Director", email: "rferna55@xtec.cat", phone: "+34 686 163 582", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Director del centre i responsable institucional del projecte Erasmus+. Signatari dels Learning Agreements (secció institució d'origen) i dels Mobility Agreements. Ha donat el vist-i-plau als 5 participants seleccionats. Cal mantenir-lo informat de qualsevol canvi en l'itinerari o en els contactes amb SFUSD." },
  { id: 10, name: "Marissa García Martín", institution: "Institut Serrallarga – Admin. econòmica / Prof. Màrqueting", email: "mgar2373@xtec.cat", phone: "+34 619 352 787", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Administradora econòmica i professora de màrqueting. Coordinadora operativa del viatge: gestió de pressupost, comunicació amb Radialtours, contactes amb SFUSD i La Cocina, tramitació ESTA. Participa com a Staff Training (KA121). Europass referència: pendent." },
  { id: 11, name: "Mònica Regi Pell", institution: "Institut Serrallarga – Professora anglès / Coord. Mobilitat VET", email: "mregi@xtec.cat", phone: "+34 687 566 402", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Professora d'anglès als cicles formatius i Coordinadora de Mobilitat VET. Participa com a Job Shadowing (KA121). Responsable de la comunicació en anglès amb les organitzacions d'acollida. Europass: 15071-MOB-0001. Col·labora en la preparació lingüística i cultural dels estudiants." },
  { id: 12, name: "Èrika Ramón Larios", institution: "Institut Serrallarga – Estudiant CFGM Gestió Administrativa", email: "", phone: "", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Estudiant del CFGM d'Administració i Gestió. Participant KA131 (mobilitat estudiantil). Activitats previstes: observació SFUSD, visita empreses, Business Pathway Competition. Competències treballades: Literacy, Multilingual, Digital, Personal/Social, Citizenship, Entrepreneurship, Cultural Awareness. Reconeixement: 3 ECTS (embedded)." },
  { id: 13, name: "Eric Rodriguez González", institution: "Institut Serrallarga – Estudiant CFGM Màrqueting", email: "", phone: "", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Estudiant del CFGM de Màrqueting i Publicitat. Participant KA131 (mobilitat estudiantil). Activitats previstes: observació SFUSD CTE Business Pathway, visita La Cocina (model de negoci), Business Pathway Competition. Interès especial en emprenedoria i models de màrqueting nord-americans." },
  { id: 14, name: "Andrea Battaglia Rayo", institution: "Institut Serrallarga – Estudiant CFGM Administració", email: "", phone: "", sentDate: "2026-01-01", status: "Intern ✅", lastContact: "2026-02-25", notes: "Estudiant del CFGM d'Administració. Participant KA131 (mobilitat estudiantil). Activitats previstes: observació SFUSD, visites empresarials, Business Pathway Competition. Competències a desenvolupar: gestió administrativa en entorn internacional, comunicació en anglès professional." },
  // ── ASSEGURANÇA / DOCUMENTACIÓ ───────────────────────────
  { id: 15, name: "Servei d'Assistència en Viatge", institution: "Assegurança Viatge – Paquet Asistencia + Cancelación Start Plus", email: "", phone: "+34 900 (inclosa al paquet Radialtours)", sentDate: "2026-02-02", status: "Confirmat ✅", lastContact: "2026-02-02", notes: "Assegurança inclosa al paquet Radialtours (Expedient 260410). Cobertures: Mèdica: 500.000€ a l'estranger / 6.000€ a Espanya. Cancel·lació: 3.500€ (44 causes cobertes). Equipatge: 1.500€. Retards: 15€/hora (màx 450€). Responsabilitat civil: 60.000€. Accidents: 10.000€ (24h) / 35.000€ (transport públic). IMPORTANT: guardar documentació de la pòlissa per a tots els participants." },
  { id: 16, name: "CBDP / Esta.cbp.dhs.gov", institution: "ESTA – Autorització Electrònica de Viatge als EUA", email: "", phone: "", sentDate: "2026-02-25", status: "Pendent ⏳", lastContact: "2026-02-25", notes: "Tots els participants han de tramitar l'ESTA abans de l'emissió de bitllets. URL oficial: https://esta.cbp.dhs.gov. IMPORTANT: Viatgers que hagin visitat Cuba després del 12/01/2021 NO poden usar ESTA i han de sol·licitar visat tradicional a l'Ambaixada dels EUA a Madrid (temps d'espera actual: diversos mesos). Cost ESTA: $21/persona. Validesa: 2 anys o fins a expiració del passaport. Participants pendents: tots 5." },
];

const FLIGHT_EVENTS = [
  { date: "2026-04-10", time: "06:40", title: "✈️ Sortida BCN Terminal 1 → Frankfurt (UA9317 op. Lufthansa)", type: "flight" },
  { date: "2026-04-10", time: "08:50", title: "🛬 Arribada Frankfurt – escala 1h35m", type: "flight" },
  { date: "2026-04-10", time: "10:25", title: "✈️ Sortida Frankfurt → SFO Terminal I (UA8829 op. Lufthansa)", type: "flight" },
  { date: "2026-04-10", time: "12:40", title: "🛬 Arribada SFO – Check-in Hotel Carlton Nob Hill", type: "arrive" },
  { date: "2026-04-14", time: "09:30", title: "🤝 Reunió Erin Deis – SFUSD, 750 25th Ave, 2n pis", type: "meeting" },
  { date: "2026-04-17", time: "09:00", title: "🏆 Business Pathway Competition – NFTE + SFUSD (Galileo & Lincoln HS)", type: "event" },
  { date: "2026-04-17", time: "14:30", title: "🎖️ Cerimònia de premis Business Pathway Competition", type: "event" },
  { date: "2026-04-18", time: "12:10", title: "✈️ Sortida SFO Terminal 3 → Chicago O'Hare (UA1394 op. United)", type: "flight" },
  { date: "2026-04-18", time: "18:43", title: "🛬 Arribada Chicago – escala 2h57m", type: "flight" },
  { date: "2026-04-18", time: "21:40", title: "✈️ Sortida Chicago → BCN Terminal 1 (UA769 op. United)", type: "flight" },
  { date: "2026-04-19", time: "13:15", title: "🏠 Arribada BCN Terminal 1", type: "arrive" },
  { date: "2026-04-15", time: "10:00", title: "🍴 Tour La Cocina SF (per confirmar dia)", type: "pending" },
];

const TABS = ["🏠 Inici", "📋 CRM", "📅 Calendari", "🌉 Info SF", "💰 Pressupost", "📖 Diari", "📊 Avaluació"];

const STATUS_COLORS = {
  "Confirmat ✅": { bg: "#DCFCE7", text: "#166534", border: "#BBF7D0" },
  "En procés 🔄": { bg: "#FEF9C3", text: "#854D0E", border: "#FDE68A" },
  "Pendent ⏳": { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" },
  "Parcial 🟡": { bg: "#FFF7ED", text: "#9A3412", border: "#FDBA74" },
  "Redirigit ↗️": { bg: "#EFF6FF", text: "#1E40AF", border: "#BFDBFE" },
  "Intern ✅": { bg: "#EDE9FE", text: "#4C1D95", border: "#C4B5FD" },
};

// ─── UTILS ──────────────────────────────────────────────────
const fmtDate = (d) => d ? new Date(d + "T12:00:00").toLocaleDateString("ca-ES") : "—";
const getDaysUntil = (targetDate) => {
  const now = new Date();
  const target = new Date(targetDate + "T00:00:00");
  return Math.ceil((target - now) / 86400000);
};

function useClocks() {
  const [t, setT] = useState(new Date());
  useEffect(() => { const i = setInterval(() => setT(new Date()), 1000); return () => clearInterval(i); }, []);
  return t;
}

function AnalogClock({ time, tzOffset }) {
  const utc = time.getTime() + time.getTimezoneOffset() * 60000;
  const local = new Date(utc + tzOffset * 3600000);
  const h = ((local.getUTCHours() % 12) + local.getUTCMinutes() / 60) * 30;
  const m = local.getUTCMinutes() * 6;
  const s = local.getUTCSeconds() * 6;
  const pt = (a, r) => [50 + r * Math.sin((a * Math.PI) / 180), 50 - r * Math.cos((a * Math.PI) / 180)];
  return (
    <svg viewBox="0 0 100 100" width="100" height="100">
      <circle cx="50" cy="50" r="48" fill="white" stroke={C.erasmus} strokeWidth="2.5" />
      {[...Array(12)].map((_, i) => {
        const [x, y] = pt(i * 30, 42);
        return <circle key={i} cx={x} cy={y} r="2.5" fill={C.erasmus} opacity="0.4" />;
      })}
      <line x1="50" y1="50" x2={pt(h, 26)[0]} y2={pt(h, 26)[1]} stroke={C.text} strokeWidth="3.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2={pt(m, 34)[0]} y2={pt(m, 34)[1]} stroke={C.text} strokeWidth="2.5" strokeLinecap="round" />
      <line x1="50" y1="50" x2={pt(s, 36)[0]} y2={pt(s, 36)[1]} stroke={C.orange} strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="50" cy="50" r="3" fill={C.erasmus} />
    </svg>
  );
}

function Countdown() {
  const [left, setLeft] = useState({});
  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const target = new Date("2026-04-10T06:40:00");
      const diff = target - now;
      if (diff <= 0) { setLeft({ done: true }); return; }
      setLeft({ d: Math.floor(diff / 86400000), h: Math.floor((diff % 86400000) / 3600000), m: Math.floor((diff % 3600000) / 60000), s: Math.floor((diff % 60000) / 1000) });
    };
    calc();
    const i = setInterval(calc, 1000);
    return () => clearInterval(i);
  }, []);
  if (left.done) return <div style={{ color: C.green, fontWeight: 700, fontSize: 20 }}>✈️ Bon viatge!</div>;
  return (
    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
      {[["dies", left.d], ["hores", left.h], ["minuts", left.m], ["seg", left.s]].map(([l, v]) => (
        <div key={l} style={{ textAlign: "center", background: C.erasmus, borderRadius: 12, padding: "16px 20px", minWidth: 70 }}>
          <div style={{ fontSize: 32, fontWeight: 800, color: "white", fontFamily: "monospace" }}>{String(v).padStart(2, "0")}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.7)", textTransform: "uppercase", letterSpacing: 1 }}>{l}</div>
        </div>
      ))}
    </div>
  );
}

// ─── LOGOS (SVG inline) ─────────────────────────────────────
const ErasmusLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 32, height: 32, background: C.erasmus, borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <span style={{ color: "white", fontSize: 18, fontWeight: 900, fontFamily: "serif" }}>E+</span>
    </div>
    <span style={{ color: "white", fontWeight: 700, fontSize: 13 }}>Erasmus+</span>
  </div>
);

const SerrallargaLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.2)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.4)" }}>
      <span style={{ color: "white", fontSize: 10, fontWeight: 900 }}>INS</span>
    </div>
    <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>Institut Serrallarga</span>
  </div>
);

const DeptLogo = () => (
  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
    <div style={{ width: 32, height: 32, background: "rgba(255,255,255,0.2)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(255,255,255,0.4)" }}>
      <span style={{ color: "white", fontSize: 8, fontWeight: 900, textAlign: "center", lineHeight: 1.2 }}>DEPT<br/>EDU</span>
    </div>
    <span style={{ color: "white", fontWeight: 600, fontSize: 12 }}>Dept. d'Educació i FP</span>
  </div>
);

// ─── MAIN APP ────────────────────────────────────────────────
export default function App() {
  const [activeTab, setActiveTab] = useState(0);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [expenses, setExpenses] = useState([]);
  const [diaryEntries, setDiaryEntries] = useState([]);
  const [boardNotes, setBoardNotes] = useState([]);

  useEffect(() => {
    const load = async () => {
      try {
        const r1 = await window.storage.get("sf2-contacts"); if (r1) setContacts(JSON.parse(r1.value));
        const r2 = await window.storage.get("sf2-expenses"); if (r2) setExpenses(JSON.parse(r2.value));
        const r3 = await window.storage.get("sf2-diary"); if (r3) setDiaryEntries(JSON.parse(r3.value));
        const r4 = await window.storage.get("sf2-board"); if (r4) setBoardNotes(JSON.parse(r4.value));
      } catch (e) {}
    };
    load();
  }, []);

  const save = (key, setter) => async (data) => { setter(data); try { await window.storage.set(key, JSON.stringify(data), true); } catch (e) {} };

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: C.bg, minHeight: "100vh", color: C.text }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700;800&family=DM+Serif+Display&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-thumb { background: ${C.erasmus}44; border-radius: 3px; }
        body { font-family: 'DM Sans', sans-serif; }
        .card { background: white; border: 1px solid ${C.border}; border-radius: 12px; padding: 20px; }
        .card-sm { background: white; border: 1px solid ${C.border}; border-radius: 10px; padding: 14px; }
        .btn { background: ${C.erasmus}; color: white; border: none; border-radius: 8px; padding: 8px 18px; cursor: pointer; font-size: 13px; font-weight: 600; transition: all 0.15s; font-family: 'DM Sans', sans-serif; }
        .btn:hover { background: ${C.erasmusMid}; transform: translateY(-1px); box-shadow: 0 4px 12px ${C.erasmus}33; }
        .btn-sm { padding: 5px 12px; font-size: 12px; }
        .btn-ghost { background: transparent; color: ${C.erasmus}; border: 1.5px solid ${C.erasmus}; }
        .btn-ghost:hover { background: ${C.erasmusLight}; transform: none; box-shadow: none; }
        .btn-red { background: ${C.red}; }
        .btn-red:hover { background: #b91c1c; }
        .input { background: white; border: 1.5px solid ${C.border}; border-radius: 8px; padding: 8px 12px; color: ${C.text}; font-size: 13px; font-family: 'DM Sans', sans-serif; width: 100%; transition: border 0.15s; }
        .input:focus { outline: none; border-color: ${C.erasmus}; box-shadow: 0 0 0 3px ${C.erasmusLight}; }
        .select { background: white; border: 1.5px solid ${C.border}; border-radius: 8px; padding: 8px 12px; color: ${C.text}; font-size: 13px; font-family: 'DM Sans', sans-serif; cursor: pointer; }
        .select:focus { outline: none; border-color: ${C.erasmus}; }
        .badge { display: inline-block; padding: 3px 10px; border-radius: 20px; font-size: 11px; font-weight: 600; border: 1px solid; }
        .tab-btn { background: none; border: none; cursor: pointer; padding: 10px 18px; font-size: 13px; font-weight: 500; border-bottom: 2.5px solid transparent; transition: all 0.15s; white-space: nowrap; font-family: 'DM Sans', sans-serif; color: rgba(255,255,255,0.7); }
        .tab-btn:hover { color: white; }
        .tab-btn.active { color: white; border-bottom-color: white; font-weight: 700; }
        .section-title { font-family: 'DM Serif Display', serif; font-size: 24px; color: ${C.erasmus}; margin-bottom: 16px; }
        .grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 16px; }
        .grid-5 { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
        @media (max-width: 900px) { .grid-2, .grid-3, .grid-5 { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 600px) { .grid-2, .grid-3, .grid-5 { grid-template-columns: 1fr; } }
        textarea { background: white; border: 1.5px solid ${C.border}; border-radius: 8px; padding: 8px 12px; color: ${C.text}; font-size: 13px; font-family: 'DM Sans', sans-serif; resize: vertical; }
        textarea:focus { outline: none; border-color: ${C.erasmus}; }
        hr { border: none; border-top: 1px solid ${C.border}; margin: 14px 0; }
        .shadow { box-shadow: 0 2px 12px rgba(0,61,165,0.08); }
        .hover-lift { transition: transform 0.15s, box-shadow 0.15s; cursor: pointer; }
        .hover-lift:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,61,165,0.12); }
      `}</style>

      {/* Header */}
      <div style={{ background: `linear-gradient(135deg, ${C.erasmus} 0%, ${C.erasmusMid} 100%)`, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 16px rgba(0,61,165,0.3)" }}>
        <div style={{ maxWidth: 1400, margin: "0 auto", padding: "0 20px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0 0", flexWrap: "wrap", gap: 10 }}>
            <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
              <ErasmusLogo />
              <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.3)" }} />
              <SerrallargaLogo />
              <div style={{ width: 1, height: 28, background: "rgba(255,255,255,0.3)" }} />
              <DeptLogo />
            </div>
            <div>
              <div style={{ textAlign: "right", color: "rgba(255,255,255,0.85)", fontSize: 11, letterSpacing: 0.5 }}>
                KA121 · 2025-1-ES01-KA121-VET-000315070 &nbsp;|&nbsp; KA131 · 2025-1-ES01-KA131-HED-000315070
              </div>
              <div style={{ textAlign: "right", color: "white", fontWeight: 700, fontSize: 15, marginTop: 2 }}>
                Mobilitat San Francisco 25-26 &nbsp;·&nbsp; 13–17 abril 2026
              </div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 0, overflowX: "auto", marginTop: 4 }}>
            {TABS.map((t, i) => (
              <button key={i} className={`tab-btn ${activeTab === i ? "active" : ""}`} onClick={() => setActiveTab(i)}>{t}</button>
            ))}
          </div>
        </div>
      </div>

      {/* Body */}
      <div style={{ maxWidth: 1400, margin: "0 auto", padding: "28px 20px" }}>
        {activeTab === 0 && <HomeTab />}
        {activeTab === 1 && <CRMTab contacts={contacts} setContacts={save("sf2-contacts", setContacts)} />}
        {activeTab === 2 && <CalendarTab boardNotes={boardNotes} setBoard={save("sf2-board", setBoardNotes)} />}
        {activeTab === 3 && <SFInfoTab />}
        {activeTab === 4 && <BudgetTab expenses={expenses} setExpenses={save("sf2-expenses", setExpenses)} />}
        {activeTab === 5 && <DiaryTab entries={diaryEntries} setEntries={save("sf2-diary", setDiaryEntries)} />}
        {activeTab === 6 && <EvalTab />}
      </div>
    </div>
  );
}

// ─── TIMEZONE UTILS ─────────────────────────────────────────
// Europe/Madrid: UTC+1 (CET) → UTC+2 (CEST) last Sunday of March
// US/Pacific: UTC-8 (PST) → UTC-7 (PDT) second Sunday of March
function getEuropeMadridOffset(date) {
  // CEST starts last Sunday of March at 02:00 local, ends last Sunday of October
  const year = date.getUTCFullYear();
  // Last Sunday of March
  const mar31 = new Date(Date.UTC(year, 2, 31));
  const dstStart = new Date(Date.UTC(year, 2, 31 - mar31.getUTCDay())); // last Sun Mar
  // Last Sunday of October
  const oct31 = new Date(Date.UTC(year, 9, 31));
  const dstEnd = new Date(Date.UTC(year, 9, 31 - oct31.getUTCDay())); // last Sun Oct
  // During CEST window → UTC+2, otherwise CET → UTC+1
  return (date >= dstStart && date < dstEnd) ? 2 : 1;
}

function getUSPacificOffset(date) {
  const year = date.getUTCFullYear();
  // Second Sunday of March
  const mar1 = new Date(Date.UTC(year, 2, 1));
  const firstSunMar = (7 - mar1.getUTCDay()) % 7;
  const dstStart = new Date(Date.UTC(year, 2, 1 + firstSunMar + 7)); // 2nd Sun Mar
  // First Sunday of November
  const nov1 = new Date(Date.UTC(year, 10, 1));
  const firstSunNov = (7 - nov1.getUTCDay()) % 7;
  const dstEnd = new Date(Date.UTC(year, 10, 1 + firstSunNov)); // 1st Sun Nov
  // During PDT window → UTC-7, otherwise PST → UTC-8
  return (date >= dstStart && date < dstEnd) ? -7 : -8;
}

// ─── HOME ────────────────────────────────────────────────────
function HomeTab() {
  const time = useClocks();
  const blanesOff = getEuropeMadridOffset(time);
  const sfOff = getUSPacificOffset(time);
  const getCity = (off) => {
    const utc = time.getTime() + time.getTimezoneOffset() * 60000;
    return new Date(utc + off * 3600000);
  };
  const fmt = (d) => d.toLocaleTimeString("ca-ES", { hour: "2-digit", minute: "2-digit", second: "2-digit" });
  const blanesLabel = blanesOff === 2 ? "🇪🇸 Blanes (CEST)" : "🇪🇸 Blanes (CET)";
  const sfLabel = sfOff === -7 ? "🇺🇸 San Francisco (PDT)" : "🇺🇸 San Francisco (PST)";

  return (
    <div>
      {/* Top row: countdown + clocks */}
      <div className="grid-2" style={{ marginBottom: 24, gap: 20 }}>
        {/* Countdown */}
        <div className="card shadow" style={{ borderTop: `4px solid ${C.erasmus}`, padding: "28px 24px" }}>
          <div style={{ textAlign: "center", marginBottom: 20 }}>
            <div style={{ fontSize: 13, color: C.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 6 }}>Compte enrere fins l'enlairament</div>
            <div style={{ fontFamily: "DM Serif Display", fontSize: 28, color: C.erasmus }}>✈️ Barcelona → San Francisco</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 4 }}>Divendres 10 d'abril 2026 · 06:40h · BCN Terminal 1</div>
          </div>
          <Countdown />
        </div>

        {/* Clocks */}
        <div className="card shadow" style={{ borderTop: `4px solid ${C.teal}` }}>
          <div style={{ display: "flex", gap: 24, justifyContent: "center", alignItems: "center", height: "100%", flexWrap: "wrap", padding: "8px 0" }}>
            {[{ city: blanesLabel, t: getCity(blanesOff), off: blanesOff }, { city: sfLabel, t: getCity(sfOff), off: sfOff }].map((c) => (
              <div key={c.city} style={{ textAlign: "center", padding: "0 16px" }}>
                <AnalogClock time={time} tzOffset={c.off - (-time.getTimezoneOffset() / 60)} />
                <div style={{ fontFamily: "monospace", fontSize: 24, fontWeight: 700, color: C.erasmus, marginTop: 8 }}>{fmt(c.t)}</div>
                <div style={{ fontSize: 12, color: C.muted, marginTop: 2 }}>{c.city}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Participants */}
      <div className="section-title">El nostre equip</div>
      <div className="grid-5" style={{ marginBottom: 28 }}>
        {PARTICIPANTS.map(p => (
          <div key={p.id} className="card shadow hover-lift" style={{ textAlign: "center", padding: "22px 12px", borderTop: `4px solid ${p.color}` }}>
            <div style={{ fontSize: 44, marginBottom: 10 }}>{p.emoji}</div>
            <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: C.text }}>{p.name}</div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.5 }}>{p.role}</div>
          </div>
        ))}
      </div>

      {/* Objectives */}
      <div className="section-title">Objectius del projecte</div>
      <div className="grid-2">
        {[
          { icon: "🎓", title: "Anàlisi del sistema CTE", text: "Analitzar com s'organitzen els pathways de Career Technical Education a nivell de districte dins el SFUSD, observant governança, currículum i avaluació." },
          { icon: "🤝", title: "Models de col·laboració", text: "Explorar models de col·laboració entre institucions educatives i empreses, comparant el sistema americà i l'espanyol per identificar sinèrgies." },
          { icon: "💡", title: "Pràctiques transferibles", text: "Identificar pràctiques innovadores per enfortir la internacionalització i la coordinació de mobilitats a l'Institut Serrallarga." },
          { icon: "🌐", title: "Diversificació internacional", text: "Ampliar les aliances internacionals més enllà del marc Erasmus+, establint connexions transatlàntiques sostenibles." },
        ].map((o) => (
          <div key={o.title} className="card shadow" style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
            <div style={{ fontSize: 32, flexShrink: 0, marginTop: 2 }}>{o.icon}</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: C.erasmus }}>{o.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{o.text}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── CRM ─────────────────────────────────────────────────────
function CRMTab({ contacts, setContacts }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("Tots");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [selectedCard, setSelectedCard] = useState(null);
  const [form, setForm] = useState({ name: "", institution: "", email: "", phone: "", sentDate: "", status: "Pendent ⏳", lastContact: "", notes: "" });

  const statuses = ["Tots", ...Object.keys(STATUS_COLORS)];
  const filtered = contacts.filter(c =>
    (statusFilter === "Tots" || c.status === statusFilter) &&
    [c.name, c.institution, c.email, c.notes].some(f => f?.toLowerCase().includes(search.toLowerCase()))
  );

  const openEdit = (c) => { setForm(c); setEditId(c.id); setShowForm(true); setSelectedCard(null); };
  const del = (id) => { setContacts(contacts.filter(c => c.id !== id)); if (selectedCard?.id === id) setSelectedCard(null); };
  const save = () => {
    if (editId) setContacts(contacts.map(c => c.id === editId ? { ...form, id: editId } : c));
    else setContacts([...contacts, { ...form, id: Date.now() }]);
    setShowForm(false); setEditId(null);
    setForm({ name: "", institution: "", email: "", phone: "", sentDate: "", status: "Pendent ⏳", lastContact: "", notes: "" });
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, flexWrap: "wrap", gap: 12 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Gestió de Contactes (CRM)</div>
        <button className="btn" onClick={() => { setShowForm(true); setEditId(null); setForm({ name: "", institution: "", email: "", phone: "", sentDate: "", status: "Pendent ⏳", lastContact: "", notes: "" }); }}>+ Afegir contacte</button>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
        {[["Total", contacts.length, C.erasmus], ["Confirmats", contacts.filter(c => c.status.includes("Confirmat")).length, C.green], ["En procés", contacts.filter(c => c.status.includes("procés")).length, C.yellow], ["Pendents", contacts.filter(c => c.status.includes("Pendent")).length, C.muted]].map(([l, v, col]) => (
          <div key={l} className="card-sm" style={{ borderLeft: `4px solid ${col}`, display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ fontSize: 26, fontWeight: 800, color: col }}>{v}</div>
            <div style={{ fontSize: 12, color: C.muted }}>{l}</div>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20, flexWrap: "wrap", alignItems: "center" }}>
        <input className="input" style={{ maxWidth: 280 }} placeholder="🔍 Cercar per nom, institució, notes..." value={search} onChange={e => { setSearch(e.target.value); setSelectedCard(null); }} />
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          {statuses.map(s => {
            const sc = STATUS_COLORS[s];
            return (
              <button key={s} onClick={() => setStatusFilter(s)} style={{ padding: "5px 14px", borderRadius: 20, border: `1.5px solid ${statusFilter === s ? C.erasmus : C.border}`, background: statusFilter === s ? C.erasmusLight : "white", color: statusFilter === s ? C.erasmus : C.muted, cursor: "pointer", fontSize: 12, fontFamily: "DM Sans, sans-serif", fontWeight: statusFilter === s ? 700 : 400 }}>{s}</button>
            );
          })}
        </div>
      </div>

      {/* Card grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14, marginBottom: 20 }}>
        {filtered.map(c => {
          const sc = STATUS_COLORS[c.status] || { bg: "#F1F5F9", text: "#475569", border: "#CBD5E1" };
          const isSelected = selectedCard?.id === c.id;
          return (
            <div key={c.id} className="card hover-lift" onClick={() => setSelectedCard(isSelected ? null : c)} style={{ cursor: "pointer", border: `1.5px solid ${isSelected ? C.erasmus : C.border}`, boxShadow: isSelected ? `0 0 0 3px ${C.erasmusLight}` : undefined, padding: 16 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 10 }}>
                <div style={{ fontWeight: 700, fontSize: 14, color: C.text }}>{c.name}</div>
                <span className="badge" style={{ background: sc.bg, color: sc.text, borderColor: sc.border, fontSize: 10, flexShrink: 0, marginLeft: 8 }}>{c.status}</span>
              </div>
              <div style={{ fontSize: 12, color: C.muted, marginBottom: 6 }}>🏢 {c.institution}</div>
              {c.email && <div style={{ fontSize: 12, color: C.erasmus }}>{c.email}</div>}
              {c.phone && <div style={{ fontSize: 12, color: C.muted }}>{c.phone}</div>}
              <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 11, color: C.light }}>
                {c.sentDate && <span>📤 {fmtDate(c.sentDate)}</span>}
                {c.lastContact && <span>💬 {fmtDate(c.lastContact)}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Detail card */}
      {selectedCard && (
        <div className="card" style={{ border: `2px solid ${C.erasmus}`, marginBottom: 20, position: "relative" }}>
          <button onClick={() => setSelectedCard(null)} style={{ position: "absolute", top: 12, right: 12, background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 20 }}>
            <div style={{ width: 60, height: 60, borderRadius: 12, background: C.erasmusLight, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28, border: `2px solid ${C.erasmus}22` }}>
              {selectedCard.name.charAt(0)}
            </div>
            <div>
              <div style={{ fontFamily: "DM Serif Display", fontSize: 22, color: C.erasmus }}>{selectedCard.name}</div>
              <div style={{ color: C.muted, fontSize: 13 }}>{selectedCard.institution}</div>
            </div>
          </div>
          <hr />
          <div className="grid-2" style={{ marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 11, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Email</div>
              <div style={{ fontSize: 14, color: C.erasmus }}>{selectedCard.email || "—"}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Telèfon</div>
              <div style={{ fontSize: 14 }}>{selectedCard.phone || "—"}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Data d'enviament</div>
              <div style={{ fontSize: 14 }}>{fmtDate(selectedCard.sentDate)}</div>
            </div>
            <div>
              <div style={{ fontSize: 11, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 4 }}>Última conversa</div>
              <div style={{ fontSize: 14 }}>{fmtDate(selectedCard.lastContact)}</div>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 11, color: C.light, textTransform: "uppercase", letterSpacing: 0.5, marginBottom: 6 }}>Notes i historial</div>
            <div style={{ fontSize: 13, color: C.text, lineHeight: 1.7, background: C.bg, padding: "12px 16px", borderRadius: 8, border: `1px solid ${C.border}` }}>{selectedCard.notes || "—"}</div>
          </div>
          <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
            <button className="btn btn-sm btn-ghost" onClick={() => openEdit(selectedCard)}>✏️ Editar</button>
            <button className="btn btn-sm btn-red" onClick={() => del(selectedCard.id)}>🗑️ Eliminar</button>
          </div>
        </div>
      )}

      {/* Modal Form */}
      {showForm && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
          <div className="card" style={{ width: "100%", maxWidth: 580, maxHeight: "90vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
              <div style={{ fontFamily: "DM Serif Display", fontSize: 20, color: C.erasmus }}>{editId ? "Editar contacte" : "Nou contacte"}</div>
              <button onClick={() => setShowForm(false)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 20 }}>✕</button>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
              {[["Nom *", "name", "text"], ["Institució *", "institution", "text"], ["Email", "email", "email"], ["Telèfon", "phone", "text"], ["Data enviament", "sentDate", "date"], ["Última conversa", "lastContact", "date"]].map(([l, k, t]) => (
                <div key={k}>
                  <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>{l}</label>
                  <input className="input" type={t} value={form[k] || ""} onChange={e => setForm({ ...form, [k]: e.target.value })} />
                </div>
              ))}
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>Estat</label>
              <select className="select" style={{ width: "100%" }} value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                {Object.keys(STATUS_COLORS).map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ marginTop: 14 }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>Notes i historial</label>
              <textarea className="input" rows="4" style={{ width: "100%" }} value={form.notes || ""} onChange={e => setForm({ ...form, notes: e.target.value })} />
            </div>
            <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
              <button className="btn" onClick={save}>Desar</button>
              <button className="btn btn-ghost" onClick={() => setShowForm(false)}>Cancel·lar</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── CALENDAR ────────────────────────────────────────────────
function CalendarTab({ boardNotes, setBoard }) {
  const [view, setView] = useState("timeline");
  const [noteText, setNoteText] = useState("");
  const [noteColor, setNoteColor] = useState("#003DA5");
  const [noteTarget, setNoteTarget] = useState("board");
  // movable events: { id, date, time, title, type }
  const [events, setEvents] = useState(FLIGHT_EVENTS.map((e, i) => ({ ...e, id: i })));
  const [dragId, setDragId] = useState(null);
  const [dragOverDate, setDragOverDate] = useState(null);
  const [tooltip, setTooltip] = useState(null); // { id, x, y }

  const typeColors = { flight: C.erasmus, meeting: C.orange, event: C.green, arrive: C.teal, pending: C.yellow };
  const typeLabels = { flight: "Vol", meeting: "Reunió", event: "Activitat", arrive: "Arribada", pending: "Pendent" };

  const today = new Date();
  const phases = [
    { label: "Fase preparació", start: "2026-02-25", end: "2026-03-09", color: C.orange },
    { label: "Reunions pre-viatge", start: "2026-03-09", end: "2026-04-06", color: "#EAB308" },
    { label: "Darrera setmana", start: "2026-04-06", end: "2026-04-10", color: C.green },
    { label: "Viatge SF", start: "2026-04-10", end: "2026-04-19", color: C.teal },
  ];

  const weeklyMeetings = ["2026-03-02", "2026-03-09", "2026-03-16", "2026-03-23", "2026-03-30", "2026-04-06"];
  const week1 = ["2026-04-06", "2026-04-07", "2026-04-08", "2026-04-09", "2026-04-10", "2026-04-11", "2026-04-12"];
  const week2 = ["2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17", "2026-04-18", "2026-04-19"];

  const addNote = () => {
    if (!noteText.trim()) return;
    const note = { id: Date.now(), text: noteText, color: noteColor, target: noteTarget };
    setBoard([...boardNotes, note]);
    setNoteText("");
  };

  const handleDragStart = (e, evtId) => {
    setDragId(evtId);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDrop = (e, dateStr) => {
    e.preventDefault();
    if (dragId === null) return;
    setEvents(prev => prev.map(ev => ev.id === dragId ? { ...ev, date: dateStr } : ev));
    setDragId(null);
    setDragOverDate(null);
  };

  const EventChip = ({ ev }) => {
    const col = typeColors[ev.type] || C.erasmus;
    return (
      <div
        draggable
        onDragStart={e => handleDragStart(e, ev.id)}
        onDragEnd={() => { setDragId(null); setDragOverDate(null); }}
        title={ev.title}
        style={{
          fontSize: 11, background: `${col}18`, border: `1.5px solid ${col}55`,
          borderRadius: 5, padding: "4px 7px", marginBottom: 4,
          color: col, fontWeight: 600, lineHeight: 1.3, cursor: "grab",
          userSelect: "none", display: "flex", alignItems: "flex-start", gap: 4,
          opacity: dragId === ev.id ? 0.4 : 1,
          boxShadow: dragId === ev.id ? "none" : `0 1px 4px ${col}22`,
          transition: "opacity 0.15s, box-shadow 0.15s",
        }}
      >
        <span style={{ flexShrink: 0, marginTop: 1 }}>⠿</span>
        <span><span style={{ opacity: 0.7, marginRight: 3 }}>{ev.time}</span>{ev.title.slice(0, 42)}{ev.title.length > 42 ? "…" : ""}</span>
      </div>
    );
  };

  const DayCell = ({ dateStr, isTrip }) => {
    const dayEvents = events.filter(e => e.date === dateStr).sort((a, b) => a.time.localeCompare(b.time));
    const dayNotes = (boardNotes || []).filter(n => n.target === dateStr);
    const d = new Date(dateStr + "T12:00:00");
    const label = d.toLocaleDateString("ca-ES", { weekday: "short" }).toUpperCase();
    const num = d.getDate();
    const hasEvents = dayEvents.length > 0;
    const isOver = dragOverDate === dateStr;

    return (
      <div
        onDragOver={e => { e.preventDefault(); setDragOverDate(dateStr); }}
        onDragLeave={() => setDragOverDate(null)}
        onDrop={e => handleDrop(e, dateStr)}
        style={{
          background: isOver ? "#DBEAFE" : isTrip ? "#EFF6FF" : "white",
          border: `1.5px solid ${isOver ? C.erasmus : hasEvents ? `${C.erasmus}66` : C.border}`,
          borderRadius: 10, padding: 10, minHeight: 100,
          transition: "background 0.15s, border-color 0.15s",
          outline: isOver ? `2px dashed ${C.erasmus}` : "none",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
          <span style={{ fontWeight: 800, fontSize: 20, color: hasEvents ? C.erasmus : C.muted }}>{num}</span>
          <span style={{ fontSize: 10, color: C.light, letterSpacing: 0.5 }}>{label}</span>
        </div>
        {dayEvents.map(ev => <EventChip key={ev.id} ev={ev} />)}
        {dayNotes.map(n => (
          <div key={n.id} style={{ fontSize: 11, background: `${n.color}15`, border: `1px solid ${n.color}44`, borderRadius: 5, padding: "3px 7px", marginBottom: 3, color: n.color, fontWeight: 500 }}>📌 {n.text}</div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* Cronograma */}
      <div className="card" style={{ marginBottom: 20, padding: 16 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: C.muted, marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.5 }}>Cronograma del projecte</div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {phases.map(ph => {
            const start = new Date(ph.start + "T12:00:00");
            const end = new Date(ph.end + "T12:00:00");
            const active = today >= start && today <= end;
            return (
              <div key={ph.label} style={{ flex: 1, minWidth: 120, background: active ? ph.color : `${ph.color}22`, border: `2px solid ${ph.color}`, borderRadius: 8, padding: "8px 12px", position: "relative" }}>
                {active && <div style={{ position: "absolute", top: -6, right: 8, background: ph.color, color: "white", fontSize: 9, padding: "1px 6px", borderRadius: 4, fontWeight: 700 }}>ARA</div>}
                <div style={{ fontWeight: 700, fontSize: 12, color: active ? "white" : ph.color }}>{ph.label}</div>
                <div style={{ fontSize: 10, color: active ? "rgba(255,255,255,0.8)" : C.muted, marginTop: 2 }}>
                  {start.toLocaleDateString("ca-ES", { day: "numeric", month: "short" })} → {end.toLocaleDateString("ca-ES", { day: "numeric", month: "short" })}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View selector */}
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {[["timeline", "📅 Reunions pre-viatge"], ["daily", "🗓️ Calendari del viatge"], ["board", "📌 Pissarra"]].map(([v, l]) => (
          <button key={v} onClick={() => setView(v)} className={`btn ${view === v ? "" : "btn-ghost"}`} style={{ fontSize: 12 }}>{l}</button>
        ))}
      </div>

      {view === "timeline" && (
        <div>
          <div className="section-title">Reunions Erasmus+ setmanals — dilluns 15:00h</div>
          <div style={{ display: "grid", gap: 10 }}>
            {weeklyMeetings.map(d => {
              const dd = new Date(d + "T12:00:00");
              const passed = dd < today;
              return (
                <div key={d} className="card" style={{ display: "flex", alignItems: "center", gap: 16, padding: "14px 20px", borderLeft: `4px solid ${passed ? C.border : C.green}`, opacity: passed ? 0.6 : 1 }}>
                  <div style={{ background: passed ? C.bg : "#DCFCE7", borderRadius: 8, padding: "8px 16px", textAlign: "center", minWidth: 72, border: `1px solid ${passed ? C.border : "#BBF7D0"}` }}>
                    <div style={{ fontSize: 22, fontWeight: 800, color: passed ? C.muted : C.green }}>{dd.getDate()}</div>
                    <div style={{ fontSize: 10, color: C.light, letterSpacing: 0.5 }}>{dd.toLocaleDateString("ca-ES", { month: "short" }).toUpperCase()}</div>
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: 700 }}>🔄 Reunió Erasmus+ — {dd.toLocaleDateString("ca-ES", { weekday: "long", day: "numeric", month: "long" })}</div>
                    <div style={{ fontSize: 12, color: C.muted }}>15:00h · Institut Serrallarga · Sala de reunions</div>
                  </div>
                  <span className="badge" style={{ background: passed ? C.bg : "#DCFCE7", color: passed ? C.muted : C.green, borderColor: passed ? C.border : "#BBF7D0" }}>{passed ? "Completada" : "Pendent"}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {view === "daily" && (
        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div className="section-title" style={{ marginBottom: 0 }}>Setmana 1 · 6–12 abril 2026</div>
            <div style={{ fontSize: 11, color: C.muted, display: "flex", alignItems: "center", gap: 6 }}>
              <span>⠿</span> Arrossega els esdeveniments entre dies
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10, marginBottom: 24 }}>
            {week1.map(d => <DayCell key={d} dateStr={d} isTrip={d >= "2026-04-10"} />)}
          </div>
          <div className="section-title">Setmana 2 · 13–19 abril 2026</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 10 }}>
            {week2.map(d => <DayCell key={d} dateStr={d} isTrip={d <= "2026-04-19"} />)}
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 16, flexWrap: "wrap" }}>
            {Object.entries(typeLabels).map(([k, v]) => (
              <div key={k} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 12 }}>
                <div style={{ width: 12, height: 12, borderRadius: 3, background: typeColors[k] }} />
                <span style={{ color: C.muted }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {view === "board" && (
        <div>
          <div className="section-title">Pissarra interactiva</div>
          <div className="card" style={{ marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-end", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 200 }}>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>Text del post-it</label>
                <input className="input" placeholder="Escriu una idea, proposta o nota..." value={noteText} onChange={e => setNoteText(e.target.value)} onKeyDown={e => e.key === "Enter" && addNote()} />
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>Color</label>
                <div style={{ display: "flex", gap: 8 }}>
                  {[C.erasmus, C.orange, C.green, C.yellow, C.teal, "#E11D74"].map(col => (
                    <div key={col} onClick={() => setNoteColor(col)} style={{ width: 28, height: 28, borderRadius: "50%", background: col, cursor: "pointer", border: noteColor === col ? "3px solid #1E293B" : "3px solid transparent", transition: "transform 0.1s" }} />
                  ))}
                </div>
              </div>
              <div>
                <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 5, fontWeight: 600 }}>Ubicació</label>
                <select className="select" value={noteTarget} onChange={e => setNoteTarget(e.target.value)}>
                  <option value="board">📌 Pissarra general</option>
                  <optgroup label="Setmana 1 (6–12 abr)">
                    {["2026-04-06","2026-04-07","2026-04-08","2026-04-09","2026-04-10","2026-04-11","2026-04-12"].map(d => <option key={d} value={d}>📅 {new Date(d + "T12:00:00").toLocaleDateString("ca-ES", { weekday: "long", day: "numeric" })}</option>)}
                  </optgroup>
                  <optgroup label="Setmana 2 (13–19 abr)">
                    {["2026-04-13","2026-04-14","2026-04-15","2026-04-16","2026-04-17","2026-04-18","2026-04-19"].map(d => <option key={d} value={d}>📅 {new Date(d + "T12:00:00").toLocaleDateString("ca-ES", { weekday: "long", day: "numeric" })}</option>)}
                  </optgroup>
                </select>
              </div>
              <button className="btn" onClick={addNote}>+ Afegir</button>
            </div>
          </div>

          {/* Board notes */}
          <div className="section-title" style={{ fontSize: 18 }}>📌 Notes a la pissarra</div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 24, minHeight: 80 }}>
            {boardNotes.filter(n => n.target === "board").length === 0 && <div style={{ color: C.light, fontSize: 13, padding: 20 }}>La pissarra general està buida. Afegeix notes!</div>}
            {boardNotes.filter(n => n.target === "board").map(n => (
              <div key={n.id} style={{ background: `${n.color}15`, border: `2px solid ${n.color}55`, borderRadius: 10, padding: "12px 16px", maxWidth: 220, position: "relative" }}>
                <div style={{ fontSize: 13, color: C.text, lineHeight: 1.5 }}>{n.text}</div>
                <button onClick={() => setBoard(boardNotes.filter(x => x.id !== n.id))} style={{ position: "absolute", top: 5, right: 7, background: "none", border: "none", color: C.light, cursor: "pointer", fontSize: 13 }}>✕</button>
              </div>
            ))}
          </div>

          <div style={{ fontSize: 12, color: C.muted, padding: "12px 16px", background: "#FFF7ED", borderRadius: 8, border: `1px solid #FDBA74` }}>
            💡 Tip col·laboració en temps real: Per a pissarres col·laboratives avançades (dibuix, imatges, múltiples usuaris simultanis), recomanem <strong>Miro.com</strong> (pla gratuït) o <strong>FigJam</strong>. Els post-its creats aquí es guarden i sincronitzen entre tots els participants via la base de dades compartida.
          </div>
        </div>
      )}
    </div>
  );
}

// ─── SF INFO ─────────────────────────────────────────────────
function SFInfoTab() {
  const [restTab, setRestTab] = useState("breakfast");
  const [mapSearch, setMapSearch] = useState("");
  const [currency, setCurrency] = useState({ eur: "", usd: "" });
  const rate = 1.085;

  const practical = [
    { icon: "🕐", title: "Diferència horària", info: "San Francisco (PDT, abril) = Blanes (CEST) – 9 hores. Quan a Blanes són les 18h, a SF són les 9h del matí." },
    { icon: "🌡️", title: "Clima a l'abril", info: "15–18°C de dia, 10–12°C de nit. Possible boira matinal (Karl the Fog). Portar jaqueta i capes. Pot ploure. Sabates còmodes per caminar." },
    { icon: "🔌", title: "Electricitat", info: "120V / 60Hz. Endolls tipus A (dos pins plans) i tipus B (tres pins). NECESSARI adaptador universal! No fa falta transformador per càrregues modernes." },
    { icon: "🚌", title: "Transport públic", info: "MUNI (metro + autobusos, $3/viatge). BART (tren, aerport ↔ centre $10.65). Clipper Card recomanada. App: SF MTA o Transit. Uber/Lyft abundants." },
    { icon: "🏥", title: "Salut", info: "UCSF Medical Center (públic). Carbon Health (urgent care privat, sense cita). Kaiser Permanente. CVS Pharmacy. Emergències: 911. Assegurança viatge inclosa al paquet Radialtours." },
  ];

  const rests = {
    breakfast: [
      { name: "Tartine Manufactory", address: "595 Alabama St, Mission", phone: "(415) 487-2600", price: "15–25$" },
      { name: "Sightglass Coffee", address: "270 7th St, SoMa", phone: "(415) 861-1313", price: "8–15$" },
      { name: "Brenda's French Soul Food", address: "652 Polk St, Tenderloin", phone: "(415) 345-8100", price: "15–25$" },
      { name: "Plow", address: "1299 18th St, Potrero Hill", phone: "(415) 821-7569", price: "20–30$" },
      { name: "Café Réveille", address: "4 Embarcadero Ctr, Financial District", phone: "(415) 757-0060", price: "12–20$" },
    ],
    lunch: [
      { name: "La Cocina Mercado", address: "101 Polk St, Civic Center", phone: "", price: "12–20$" },
      { name: "Tacolicious", address: "741 Valencia St, Mission", phone: "(415) 626-1344", price: "15–25$" },
      { name: "Bix", address: "56 Gold St, Financial District", phone: "(415) 433-6300", price: "30–45$" },
      { name: "Swan Oyster Depot", address: "1517 Polk St, Russian Hill", phone: "(415) 673-1101", price: "30–50$" },
      { name: "Burma Superstar", address: "309 Clement St, Richmond", phone: "(415) 387-2147", price: "15–25$" },
    ],
    dinner: [
      { name: "Zuni Café", address: "1658 Market St, Hayes Valley", phone: "(415) 552-2522", price: "40–65$" },
      { name: "Flour + Water", address: "2401 Harrison St, Mission", phone: "(415) 826-7000", price: "35–55$" },
      { name: "Rich Table", address: "199 Gough St, Hayes Valley", phone: "(415) 355-9085", price: "50–80$" },
      { name: "Nopalito", address: "306 Broderick St, Lower Haight", phone: "(415) 437-0303", price: "25–40$" },
      { name: "State Bird Provisions", address: "1529 Fillmore St, Fillmore", phone: "(415) 795-1272", price: "50–75$" },
    ],
    tourism: [
      { name: "Golden Gate Bridge", address: "Golden Gate Bridge, SF", phone: "", price: "Gratuït a peu/bici" },
      { name: "Alcatraz Island", address: "Pier 33, Embarcadero", phone: "(415) 981-7625", price: "45–50$ (inclou ferry)" },
      { name: "Fisherman's Wharf", address: "Jefferson St & Taylor St", phone: "", price: "Gratuït" },
      { name: "Ferry Building Marketplace", address: "1 Ferry Building, Embarcadero", phone: "", price: "Gratuït" },
      { name: "SFMOMA", address: "151 3rd St, SoMa", phone: "(415) 357-4000", price: "25$" },
    ],
  };
  const tabLabels = { breakfast: "☀️ Esmorzar", lunch: "🍽️ Dinar", dinner: "🌙 Sopar", tourism: "🗺️ Turisme" };

  const mapUrl = mapSearch ? `https://www.google.com/maps/embed/v1/search?key=AIzaSyD-9tSrke72FloFkd3y-KKSJaC3HFI5Csc&q=${encodeURIComponent(mapSearch + " San Francisco")}` : null;

  return (
    <div>
      {/* Map search */}
      <div className="card shadow" style={{ marginBottom: 24, borderTop: `4px solid ${C.teal}` }}>
        <div style={{ fontFamily: "DM Serif Display", fontSize: 20, color: C.teal, marginBottom: 12 }}>🔍 Cercador de llocs — San Francisco</div>
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <input className="input" style={{ flex: 1, minWidth: 200 }} placeholder="Cerca un restaurant, lloc turístic, carrer..." value={mapSearch} onChange={e => setMapSearch(e.target.value)} />
          {mapSearch && <button className="btn btn-ghost" onClick={() => setMapSearch("")}>Netejar</button>}
        </div>
        {mapSearch ? (
          <div style={{ borderRadius: 10, overflow: "hidden", height: 320, background: C.bg, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 12, border: `1px solid ${C.border}` }}>
            <div style={{ fontSize: 40 }}>🗺️</div>
            <div style={{ fontWeight: 700, color: C.erasmus }}>Obertura Google Maps</div>
            <div style={{ fontSize: 13, color: C.muted, textAlign: "center", maxWidth: 320 }}>Per privacitat de l'API, el mapa s'obre directament a Google Maps.</div>
            <a href={`https://www.google.com/maps/search/${encodeURIComponent(mapSearch + " San Francisco, CA")}`} target="_blank" rel="noopener noreferrer" className="btn">Obrir a Google Maps 🔗</a>
          </div>
        ) : (
          <div style={{ background: C.bg, borderRadius: 10, padding: 24, textAlign: "center", color: C.light, border: `1px dashed ${C.border}` }}>
            Escriu un lloc per obrir-lo a Google Maps
          </div>
        )}
        <div style={{ display: "flex", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
          {["La Cocina SF", "SFUSD 750 25th Ave", "Hotel Carlton Nob Hill", "Ferry Building", "Golden Gate Bridge"].map(s => (
            <button key={s} onClick={() => setMapSearch(s)} style={{ padding: "4px 12px", borderRadius: 16, background: C.erasmusLight, color: C.erasmus, border: `1px solid ${C.erasmus}33`, cursor: "pointer", fontSize: 12, fontFamily: "DM Sans" }}>{s}</button>
          ))}
        </div>
      </div>

      {/* Practical */}
      <div className="section-title">Informació pràctica</div>
      <div className="grid-2" style={{ marginBottom: 28 }}>
        {practical.map(item => (
          <div key={item.title} className="card shadow" style={{ display: "flex", gap: 16 }}>
            <div style={{ fontSize: 30, flexShrink: 0 }}>{item.icon}</div>
            <div>
              <div style={{ fontWeight: 700, marginBottom: 5, color: C.erasmus }}>{item.title}</div>
              <div style={{ fontSize: 13, color: C.muted, lineHeight: 1.65 }}>{item.info}</div>
            </div>
          </div>
        ))}
        {/* Currency */}
        <div className="card shadow">
          <div style={{ fontWeight: 700, marginBottom: 12, color: C.erasmus }}>💱 Convertidor EUR ↔ USD</div>
          <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4 }}>€ Euros</label>
              <input className="input" type="number" placeholder="0.00" value={currency.eur} onChange={e => { const v = e.target.value; setCurrency({ eur: v, usd: v ? (parseFloat(v) * rate).toFixed(2) : "" }); }} />
            </div>
            <div style={{ fontSize: 20, color: C.erasmus, marginTop: 16 }}>⇄</div>
            <div style={{ flex: 1 }}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4 }}>$ Dòlars</label>
              <input className="input" type="number" placeholder="0.00" value={currency.usd} onChange={e => { const v = e.target.value; setCurrency({ usd: v, eur: v ? (parseFloat(v) / rate).toFixed(2) : "" }); }} />
            </div>
          </div>
          <div style={{ fontSize: 11, color: C.light, marginTop: 8, textAlign: "center" }}>1 EUR ≈ {rate} USD (taxa orientativa abril 2026)</div>
        </div>
      </div>

      {/* Restaurants */}
      <div className="section-title">On menjar i què fer</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 18, flexWrap: "wrap" }}>
        {Object.entries(tabLabels).map(([k, l]) => (
          <button key={k} onClick={() => setRestTab(k)} className={`btn ${restTab === k ? "" : "btn-ghost"}`} style={{ fontSize: 12 }}>{l}</button>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 14 }}>
        {rests[restTab].map(r => (
          <div key={r.name} className="card shadow hover-lift" style={{ borderTop: `3px solid ${C.erasmus}` }}>
            <div style={{ fontWeight: 700, marginBottom: 6 }}>{r.name}</div>
            <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>📍 {r.address}</div>
            {r.phone && <div style={{ fontSize: 12, color: C.muted, marginBottom: 8 }}>📞 {r.phone}</div>}
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <span className="badge" style={{ background: "#FFF7ED", color: "#9A3412", borderColor: "#FDBA74" }}>{r.price}</span>
              <button onClick={() => { /* search logic */ }} style={{ background: "none", border: "none", color: C.erasmus, cursor: "pointer", fontSize: 12, textDecoration: "underline" }} onClick={() => window.open(`https://www.google.com/maps/search/${encodeURIComponent(r.name + " " + r.address + " San Francisco")}`, "_blank")}>Ver al mapa 🗺️</button>
            </div>
          </div>
        ))}
      </div>

      {/* Hotel */}
      <div className="card shadow" style={{ marginTop: 24, borderLeft: `5px solid ${C.teal}` }}>
        <div style={{ fontFamily: "DM Serif Display", fontSize: 20, color: C.teal, marginBottom: 10 }}>🏨 Allotjament: FOUND Hotel Carlton, Nob Hill</div>
        <div style={{ display: "flex", gap: 24, flexWrap: "wrap", fontSize: 13, color: C.muted }}>
          <div>📬 1075 Sutter St, Nob Hill, SF 94109</div>
          <div>🛏️ 2 dobles + 1 individual</div>
          <div>⭐ 4.1/5 Google (1.175 res.)</div>
          <div>📅 Check-in: 10/04 · Check-out: 18/04</div>
          <div>🍳 Esmorzar NO inclòs</div>
        </div>
      </div>
    </div>
  );
}

// ─── BUDGET ──────────────────────────────────────────────────
function BudgetTab({ expenses, setExpenses }) {
  const [form, setForm] = useState({ date: "", place: "", amount: "", person: PARTICIPANTS[0].name, category: "Menjar" });
  const [filterPerson, setFilterPerson] = useState("Tots");
  const [filterCat, setFilterCat] = useState("Totes");

  const categories = ["Menjar", "Transport", "Lleure", "Allotjament", "Altres"];
  const catColors = { Menjar: C.orange, Transport: C.erasmus, Lleure: C.green, Allotjament: C.teal, Altres: "#8B5CF6" };

  const add = () => {
    if (!form.date || !form.place || !form.amount) return;
    setExpenses([...expenses, { id: Date.now(), ...form, amount: parseFloat(form.amount) }]);
    setForm({ date: form.date, place: "", amount: "", person: form.person, category: form.category });
  };

  const filtered = expenses.filter(e => (filterPerson === "Tots" || e.person === filterPerson) && (filterCat === "Totes" || e.category === filterCat));
  const total = filtered.reduce((s, e) => s + e.amount, 0);

  // Treasury: group by date
  const tripDays = ["2026-04-10", "2026-04-11", "2026-04-12", "2026-04-13", "2026-04-14", "2026-04-15", "2026-04-16", "2026-04-17", "2026-04-18"];
  const byDay = tripDays.map(day => {
    const dayExp = expenses.filter(e => e.date === day);
    const dayTotal = dayExp.reduce((s, e) => s + e.amount, 0);
    const byCat = {};
    categories.forEach(c => { byCat[c] = dayExp.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0); });
    return { day, dayTotal, byCat, entries: dayExp };
  });
  const grandTotal = byDay.reduce((s, d) => s + d.dayTotal, 0);

  const byPerson = PARTICIPANTS.map(p => ({ ...p, total: expenses.filter(e => e.person === p.name).reduce((s, e) => s + e.amount, 0) }));
  const byCatTotal = categories.map(c => ({ cat: c, total: expenses.filter(e => e.category === c).reduce((s, e) => s + e.amount, 0) }));

  return (
    <div>
      <div className="section-title">Control de Pressupost</div>

      {/* Add form */}
      <div className="card shadow" style={{ marginBottom: 24, borderTop: `4px solid ${C.orange}` }}>
        <div style={{ fontWeight: 700, marginBottom: 14, color: C.orange }}>+ Registrar despesa</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12 }}>
          {[["Data", "date", "date"], ["Lloc / Comerç", "place", "text"], ["Import (€)", "amount", "number"]].map(([l, k, t]) => (
            <div key={k}>
              <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>{l}</label>
              <input className="input" type={t} value={form[k]} onChange={e => setForm({ ...form, [k]: e.target.value })} step={t === "number" ? "0.01" : undefined} min={t === "number" ? "0" : undefined} />
            </div>
          ))}
          <div>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>Persona</label>
            <select className="select" style={{ width: "100%" }} value={form.person} onChange={e => setForm({ ...form, person: e.target.value })}>
              {PARTICIPANTS.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
          </div>
          <div>
            <label style={{ fontSize: 11, color: C.muted, display: "block", marginBottom: 4, fontWeight: 600 }}>Categoria</label>
            <select className="select" style={{ width: "100%" }} value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}>
              {categories.map(c => <option key={c}>{c}</option>)}
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn" style={{ width: "100%" }} onClick={add}>Afegir</button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid-2" style={{ marginBottom: 24 }}>
        <div className="card shadow">
          <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 12 }}>Per persona</div>
          {byPerson.map(p => (
            <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
              <span style={{ fontSize: 18 }}>{p.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 3 }}>
                  <span style={{ color: C.text, fontWeight: 500 }}>{p.name.split(" ")[0]}</span>
                  <span style={{ color: p.color, fontWeight: 700 }}>{p.total.toFixed(2)}€</span>
                </div>
                <div style={{ height: 5, background: C.bg, borderRadius: 3 }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (p.total / (Math.max(...byPerson.map(x => x.total)) || 1)) * 100)}%`, background: p.color, borderRadius: 3, transition: "width 0.3s" }} />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="card shadow">
          <div style={{ fontSize: 13, fontWeight: 700, color: C.muted, marginBottom: 12 }}>Per categoria</div>
          {byCatTotal.map(c => (
            <div key={c.cat} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8, padding: "7px 12px", background: `${catColors[c.cat]}12`, borderRadius: 8, border: `1px solid ${catColors[c.cat]}33` }}>
              <span className="badge" style={{ background: `${catColors[c.cat]}20`, color: catColors[c.cat], borderColor: `${catColors[c.cat]}44` }}>{c.cat}</span>
              <span style={{ fontWeight: 700, color: catColors[c.cat] }}>{c.total.toFixed(2)}€</span>
            </div>
          ))}
          <hr />
          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: 16 }}>
            <span style={{ color: C.text }}>TOTAL</span>
            <span style={{ color: C.orange }}>{expenses.reduce((s, e) => s + e.amount, 0).toFixed(2)}€</span>
          </div>
        </div>
      </div>

      {/* Expense list */}
      <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap", alignItems: "center" }}>
        <select className="select" value={filterPerson} onChange={e => setFilterPerson(e.target.value)}>
          <option>Tots</option>
          {PARTICIPANTS.map(p => <option key={p.id}>{p.name}</option>)}
        </select>
        <select className="select" value={filterCat} onChange={e => setFilterCat(e.target.value)}>
          <option>Totes</option>
          {categories.map(c => <option key={c}>{c}</option>)}
        </select>
        <div style={{ marginLeft: "auto", fontWeight: 800, fontSize: 17, color: C.orange }}>Filtrat: {total.toFixed(2)}€</div>
      </div>

      {filtered.length > 0 && (
        <div className="card shadow" style={{ padding: 0, overflow: "hidden", marginBottom: 32 }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#F8FAFC", borderBottom: `1px solid ${C.border}` }}>
                {["Data", "Lloc", "Persona", "Categoria", "Import", ""].map(h => <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontWeight: 700, color: C.muted, fontSize: 11, letterSpacing: 0.5 }}>{h}</th>)}
              </tr>
            </thead>
            <tbody>
              {filtered.sort((a, b) => new Date(b.date) - new Date(a.date)).map(e => (
                <tr key={e.id} style={{ borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "10px 16px", color: C.muted, fontSize: 12 }}>{fmtDate(e.date)}</td>
                  <td style={{ padding: "10px 16px", fontWeight: 500 }}>{e.place}</td>
                  <td style={{ padding: "10px 16px", color: C.muted, fontSize: 12 }}>{e.person.split(" ")[0]}</td>
                  <td style={{ padding: "10px 16px" }}><span className="badge" style={{ background: `${catColors[e.category]}18`, color: catColors[e.category], borderColor: `${catColors[e.category]}44` }}>{e.category}</span></td>
                  <td style={{ padding: "10px 16px", fontWeight: 700, color: C.orange }}>{e.amount.toFixed(2)}€</td>
                  <td style={{ padding: "10px 16px" }}><button onClick={() => setExpenses(expenses.filter(x => x.id !== e.id))} style={{ background: "#FEF2F2", border: `1px solid #FECACA`, color: C.red, padding: "3px 10px", borderRadius: 6, cursor: "pointer", fontSize: 12, fontFamily: "DM Sans" }}>✕</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* TREASURY TABLE */}
      <div className="section-title">Taula de Tresoreria diària</div>
      <div style={{ fontSize: 12, color: C.muted, marginBottom: 14 }}>S'actualitza automàticament quan afegiu despeses. Valors en euros (€).</div>
      <div className="card shadow" style={{ padding: 0, overflow: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12, minWidth: 700 }}>
          <thead>
            <tr style={{ background: C.erasmus }}>
              <th style={{ padding: "10px 14px", textAlign: "left", color: "white", fontWeight: 700, whiteSpace: "nowrap" }}>Dia</th>
              {categories.map(c => <th key={c} style={{ padding: "10px 12px", color: "white", fontWeight: 700, textAlign: "right" }}>{c}</th>)}
              <th style={{ padding: "10px 14px", color: "white", fontWeight: 800, textAlign: "right" }}>TOTAL DIA</th>
              <th style={{ padding: "10px 14px", color: "rgba(255,255,255,0.8)", fontWeight: 700, textAlign: "right" }}>Acumulat</th>
            </tr>
          </thead>
          <tbody>
            {byDay.map((row, idx) => {
              const accum = byDay.slice(0, idx + 1).reduce((s, r) => s + r.dayTotal, 0);
              const hasData = row.dayTotal > 0;
              const d = new Date(row.day + "T12:00:00");
              return (
                <tr key={row.day} style={{ background: hasData ? "#FFFBEB" : idx % 2 === 0 ? "white" : "#F8FAFC", borderBottom: `1px solid ${C.border}` }}>
                  <td style={{ padding: "9px 14px", fontWeight: hasData ? 700 : 400, color: hasData ? C.text : C.muted, whiteSpace: "nowrap" }}>
                    {d.toLocaleDateString("ca-ES", { weekday: "short", day: "numeric", month: "short" })}
                  </td>
                  {categories.map(c => (
                    <td key={c} style={{ padding: "9px 12px", textAlign: "right", color: row.byCat[c] > 0 ? catColors[c] : C.light, fontWeight: row.byCat[c] > 0 ? 700 : 400 }}>
                      {row.byCat[c] > 0 ? row.byCat[c].toFixed(2) : "—"}
                    </td>
                  ))}
                  <td style={{ padding: "9px 14px", textAlign: "right", fontWeight: 800, color: hasData ? C.orange : C.light }}>
                    {hasData ? row.dayTotal.toFixed(2) + "€" : "—"}
                  </td>
                  <td style={{ padding: "9px 14px", textAlign: "right", color: C.muted, fontSize: 11 }}>
                    {accum > 0 ? accum.toFixed(2) + "€" : "—"}
                  </td>
                </tr>
              );
            })}
            <tr style={{ background: C.erasmusLight, borderTop: `2px solid ${C.erasmus}` }}>
              <td style={{ padding: "11px 14px", fontWeight: 800, color: C.erasmus }}>TOTAL</td>
              {categories.map(c => {
                const t = byDay.reduce((s, r) => s + r.byCat[c], 0);
                return <td key={c} style={{ padding: "11px 12px", textAlign: "right", fontWeight: 800, color: t > 0 ? catColors[c] : C.light }}>{t > 0 ? t.toFixed(2) + "€" : "—"}</td>;
              })}
              <td style={{ padding: "11px 14px", textAlign: "right", fontWeight: 900, color: C.orange, fontSize: 15 }}>{grandTotal.toFixed(2)}€</td>
              <td style={{ padding: "11px 14px" }} />
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── DIARY ───────────────────────────────────────────────────
function DiaryTab({ entries, setEntries }) {
  const [form, setForm] = useState({ author: PARTICIPANTS[0].name, text: "", date: new Date().toISOString().split("T")[0], type: "text", url: "" });
  const [open, setOpen] = useState(false);
  const typeIcons = { text: "📝", photo: "📸", video: "🎥", link: "🔗" };

  const add = () => {
    if (!form.text.trim()) return;
    setEntries([{ id: Date.now(), ...form }, ...entries]);
    setForm({ ...form, text: "", url: "" });
    setOpen(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="section-title" style={{ marginBottom: 0 }}>Diari col·laboratiu</div>
        <button className="btn" onClick={() => setOpen(!open)}>+ Nova entrada</button>
      </div>

      {open && (
        <div className="card shadow" style={{ marginBottom: 24, borderTop: `4px solid ${C.teal}` }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr auto", gap: 12, marginBottom: 12 }}>
            <select className="select" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })}>
              {PARTICIPANTS.map(p => <option key={p.id}>{p.name}</option>)}
            </select>
            <input className="input" type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
            <select className="select" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
              {Object.entries(typeIcons).map(([k, v]) => <option key={k} value={k}>{v} {k}</option>)}
            </select>
          </div>
          <textarea className="input" rows="4" placeholder="Explica el teu dia, aprenentatge o experiència..." value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} style={{ width: "100%", marginBottom: 10 }} />
          {form.type !== "text" && <input className="input" placeholder="URL de l'arxiu/enllaç..." value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} style={{ marginBottom: 10 }} />}
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" onClick={add}>Publicar</button>
            <button className="btn btn-ghost" onClick={() => setOpen(false)}>Cancel·lar</button>
          </div>
        </div>
      )}

      <div style={{ display: "grid", gap: 14 }}>
        {entries.length === 0 && <div className="card" style={{ textAlign: "center", padding: 56, color: C.light }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>📖</div>
          <div>El diari és buit. Sigues el primer en escriure!</div>
        </div>}
        {entries.map(e => {
          const p = PARTICIPANTS.find(x => x.name === e.author) || PARTICIPANTS[0];
          return (
            <div key={e.id} className="card shadow" style={{ borderLeft: `4px solid ${p.color}` }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                <div style={{ width: 40, height: 40, borderRadius: "50%", background: `${p.color}22`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, border: `2px solid ${p.color}44` }}>{p.emoji}</div>
                <div>
                  <div style={{ fontWeight: 700, color: C.text }}>{e.author.split(" ")[0]}</div>
                  <div style={{ fontSize: 11, color: C.light }}>{fmtDate(e.date)} · {typeIcons[e.type]} {e.type}</div>
                </div>
                <button onClick={() => setEntries(entries.filter(x => x.id !== e.id))} style={{ marginLeft: "auto", background: "none", border: "none", color: C.light, cursor: "pointer", fontSize: 16 }}>✕</button>
              </div>
              <div style={{ fontSize: 14, color: C.text, lineHeight: 1.7 }}>{e.text}</div>
              {e.url && <a href={e.url} target="_blank" rel="noopener noreferrer" style={{ display: "inline-block", marginTop: 10, color: C.erasmus, fontSize: 13, fontWeight: 600 }}>🔗 Veure {e.type}</a>}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── EVAL ────────────────────────────────────────────────────
function EvalTab() {
  const [active, setActive] = useState(null);
  const [answers, setAnswers] = useState({});
  const [openText, setOpenText] = useState("");
  const [done, setDone] = useState(false);
  const [allResults, setAllResults] = useState({});

  useEffect(() => {
    const load = async () => { try { const r = await window.storage.get("sf2-eval", true); if (r) setAllResults(JSON.parse(r.value)); } catch (e) {} };
    load();
  }, []);

  const questions = [
    { id: "q1", text: "He assolit els objectius d'aprenentatge del meu Learning Agreement", comp: "Literacy" },
    { id: "q2", text: "He millorat la meva competència en anglès professional", comp: "Multilingual" },
    { id: "q3", text: "He après eines i plataformes digitals noves", comp: "Digital" },
    { id: "q4", text: "He demostrat autonomia i resolució de problemes", comp: "Personal/Social" },
    { id: "q5", text: "He respectat les normes professionals i l'ètica", comp: "Citizenship" },
    { id: "q6", text: "He identificat oportunitats d'innovació i millora", comp: "Entrepreneurship" },
    { id: "q7", text: "He aprofundit en la comprensió de la cultura dels EUA", comp: "Cultural Awareness" },
    { id: "q8", text: "La mobilitat ha superat les meves expectatives generals", comp: "General" },
    { id: "q9", text: "Recomanaria aquesta mobilitat a companys/es", comp: "General" },
    { id: "q10", text: "Els aprenentatges seran transferibles a la meva institució", comp: "Impact" },
  ];

  const kpis = [
    { icon: "🤝", title: "Partenariats establerts", target: "1+", current: "SFUSD ✅ + La Cocina 🔄" },
    { icon: "📄", title: "Learning Agreements", target: "5/5", current: "5 ✅" },
    { icon: "🎓", title: "Competències treballades", target: "7/7", current: "7 ✅" },
    { icon: "📸", title: "Entrades al diari", target: "≥10", current: `${0} registrades` },
    { icon: "🌐", title: "Activitats completades", target: "4/4", current: "SFUSD, La Cocina, centres, competició" },
    { icon: "⭐", title: "Satisfacció participants", target: "≥4/5", current: `${Object.keys(allResults).length}/5 avaluats` },
  ];

  const submit = async () => {
    if (Object.keys(answers).length < questions.length) { alert("Respon totes les preguntes."); return; }
    const updated = { ...allResults, [active]: { answers, openText, date: new Date().toISOString() } };
    setAllResults(updated);
    try { await window.storage.set("sf2-eval", JSON.stringify(updated), true); } catch (e) {}
    setDone(true);
    alert(`✅ Avaluació de ${active.split(" ")[0]} guardada!\nEn una versió amb backend, s'enviaria automàticament a mgar2373@xtec.cat`);
  };

  return (
    <div>
      <div className="section-title">Avaluació del Projecte</div>

      {/* KPIs */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 14, marginBottom: 28 }}>
        {kpis.map(k => (
          <div key={k.title} className="card shadow" style={{ borderTop: `3px solid ${C.teal}` }}>
            <div style={{ display: "flex", gap: 12 }}>
              <span style={{ fontSize: 24, flexShrink: 0 }}>{k.icon}</span>
              <div>
                <div style={{ fontWeight: 700, fontSize: 13, marginBottom: 4, color: C.text }}>{k.title}</div>
                <span className="badge" style={{ background: "#CCFBF1", color: "#0F766E", borderColor: "#99F6E4", display: "block", marginBottom: 4 }}>{k.target}</span>
                <div style={{ fontSize: 11, color: C.muted }}>{k.current}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Completed */}
      {Object.keys(allResults).length > 0 && (
        <div className="card-sm" style={{ marginBottom: 20, background: "#F0FDF4", border: `1px solid #BBF7D0` }}>
          <div style={{ fontWeight: 700, color: C.green, marginBottom: 8 }}>Autoavaluacions recollides ({Object.keys(allResults).length}/5)</div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
            {PARTICIPANTS.map(p => <span key={p.id} className="badge" style={{ background: allResults[p.name] ? "#DCFCE7" : "#F1F5F9", color: allResults[p.name] ? C.green : C.light, borderColor: allResults[p.name] ? "#BBF7D0" : C.border, padding: "5px 14px" }}>{p.emoji} {p.name.split(" ")[0]} {allResults[p.name] ? "✓" : "—"}</span>)}
          </div>
        </div>
      )}

      {/* Self-eval selector */}
      {!active && !done && (
        <div>
          <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 12, color: C.erasmus }}>Autoavaluació individual</div>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 16 }}>Selecciona el teu nom per iniciar l'avaluació basada en els Learning Agreements:</div>
          <div className="grid-5">
            {PARTICIPANTS.map(p => (
              <button key={p.id} onClick={() => { setActive(p.name); setAnswers({}); setOpenText(""); setDone(false); }} className="card hover-lift" style={{ border: `2px solid ${allResults[p.name] ? C.green : C.border}`, cursor: "pointer", textAlign: "center", padding: "20px 10px", background: allResults[p.name] ? "#F0FDF4" : "white" }}>
                <div style={{ fontSize: 38, marginBottom: 8 }}>{p.emoji}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{p.name.split(" ")[0]}</div>
                <div style={{ fontSize: 11, color: allResults[p.name] ? C.green : C.muted, marginTop: 4 }}>{allResults[p.name] ? "✅ Feta" : "Iniciar →"}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {active && !done && (
        <div className="card shadow" style={{ borderTop: `4px solid ${C.erasmus}` }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
            <div style={{ fontFamily: "DM Serif Display", fontSize: 22, color: C.erasmus }}>Autoavaluació — {active}</div>
            <button onClick={() => setActive(null)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 18 }}>✕</button>
          </div>
          <div style={{ fontSize: 12, color: C.muted, marginBottom: 20 }}>Valora de l'1 al 5 (1 = Gens d'acord · 5 = Totalment d'acord)</div>
          {questions.map((q, i) => (
            <div key={q.id} style={{ marginBottom: 18, padding: 16, background: C.bg, borderRadius: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16 }}>
                <div>
                  <span className="badge" style={{ background: C.erasmusLight, color: C.erasmus, borderColor: `${C.erasmus}33`, marginBottom: 6, display: "inline-block" }}>{q.comp}</span>
                  <div style={{ fontSize: 14, color: C.text }}>{i + 1}. {q.text}</div>
                </div>
                <div style={{ display: "flex", gap: 4, flexShrink: 0 }}>
                  {[1, 2, 3, 4, 5].map(v => (
                    <span key={v} onClick={() => setAnswers({ ...answers, [q.id]: v })} style={{ cursor: "pointer", fontSize: 24, color: answers[q.id] >= v ? "#F59E0B" : "#D1D5DB", transition: "transform 0.1s", display: "inline-block" }}>★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20 }}>
            <label style={{ fontSize: 13, fontWeight: 700, display: "block", marginBottom: 8 }}>Reflexió personal i comentaris:</label>
            <textarea className="input" rows="4" style={{ width: "100%" }} placeholder="Aprenentatges destacats, dificultats trobades, impacte esperat..." value={openText} onChange={e => setOpenText(e.target.value)} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 20, alignItems: "center" }}>
            <button className="btn" onClick={submit}>📤 Enviar avaluació</button>
            <div style={{ fontSize: 12, color: C.muted }}>S'enviarà a: mgar2373@xtec.cat</div>
          </div>
        </div>
      )}

      {done && (
        <div className="card shadow" style={{ textAlign: "center", padding: 48, borderTop: `4px solid ${C.green}` }}>
          <div style={{ fontSize: 64, marginBottom: 12 }}>🎉</div>
          <div style={{ fontFamily: "DM Serif Display", fontSize: 28, color: C.green, marginBottom: 8 }}>Avaluació completada!</div>
          <div style={{ color: C.muted, marginBottom: 20 }}>Gràcies, {active?.split(" ")[0]}. La teva avaluació ha estat registrada.</div>
          <button className="btn btn-ghost" onClick={() => { setActive(null); setDone(false); }}>← Tornar</button>
        </div>
      )}
    </div>
  );
}
