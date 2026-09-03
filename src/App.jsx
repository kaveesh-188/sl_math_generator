import { useState, useRef, useEffect } from "react";
import {
  useWindowWidth, NAV, GOLD, SLATE, SAGE, RED, CREAM, BG, BORDER,
  PURPLE, BLUE, PINK, ORANGE, SERIF, SANS,
  PAPER_DATA, OL_TOPICS, JUNIOR_TOPICS, ALL_TOPICS_FLAT,
  Q_TYPES, DIFF_OPTIONS, SECTION_COLORS, GRAPH_TYPES_LIST,
  cardStyle, inputStyle, selectStyle, btnPrimary, labelSty,
  SectionHeader, ToggleBtn, NumberField, PaperOutput, SavedPapersPanel,
  QuestionBankModal, GraphModal, buildStandardPrompt, buildCustomPrompt,
  makeDefaultSections, stripMarkdownArtifacts, SAMPLE_PAPER_TEXT
} from "./AppParts";

function SectionPanel({ sec, si, secColor, onToggleCollapse, onRemove, canRemove, onUpdateName, onUpdateInstructions, onAddQuestion, onOpenBank, onShowGraphModal, onUpdateQ, onRemoveQ, onDuplicateQ }) {
  const letter = String.fromCharCode(65 + si);
  return (
    <div style={{ border: "1px solid " + BORDER, borderLeft: "4px solid " + secColor, borderRadius: 8, marginBottom: 12, overflow: "hidden" }}>
      <div style={{ background: BG, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={onToggleCollapse}>
        <div style={{ width: 26, height: 26, borderRadius: "50%", background: secColor, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{letter}</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: NAV }}>{sec.name}</div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: "#888" }}>{sec.questions.length} questions · {sec.questions.reduce((a, q) => a + (q.marks || 0), 0)} marks</div>
        </div>
        {canRemove && <button onClick={e => { e.stopPropagation(); onRemove(); }} style={{ background: "none", border: "none", color: RED, fontSize: 12, cursor: "pointer", fontFamily: SANS }}>Remove</button>}
        <span style={{ color: "#aaa", fontSize: 14 }}>{sec.collapsed ? "▶" : "▼"}</span>
      </div>
      {!sec.collapsed && (
        <div style={{ padding: "12px 14px" }}>
          <div style={{ background: BG, borderRadius: 6, padding: "10px 12px", marginBottom: 12 }}>
            <div style={{ marginBottom: 8 }}><label style={labelSty}>Section name</label><input value={sec.name} onChange={e => onUpdateName(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
            <div><label style={labelSty}>Instructions printed on paper</label><input value={sec.instructions} onChange={e => onUpdateInstructions(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
          </div>
          {sec.questions.map((q, qi) => (
            <QuestionRow key={q.id} q={q} qi={qi} si={si} onUpdate={(k, v) => onUpdateQ(qi, k, v)} onRemove={() => onRemoveQ(qi)} onDuplicate={() => onDuplicateQ(qi)} onShowGraphModal={onShowGraphModal} />
          ))}
          <div style={{ borderTop: "1px solid " + BORDER, paddingTop: 10, marginTop: 6, display: "flex", flexWrap: "wrap", gap: 6, alignItems: "center" }}>
            {Q_TYPES.map(qt => (
              <button key={qt.id} onClick={() => onAddQuestion(qt.id)} style={{ padding: "4px 10px", border: "1px solid " + qt.color + "44", background: qt.color + "10", color: qt.color, borderRadius: 20, fontFamily: SANS, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>+ {qt.icon} {qt.label}</button>
            ))}
            <button onClick={onOpenBank} style={{ padding: "4px 12px", border: "1px solid " + NAV, background: "#fff", color: NAV, borderRadius: 20, fontFamily: SANS, fontSize: 11, cursor: "pointer", fontWeight: 600, marginLeft: "auto" }}>📚 Import</button>
          </div>
        </div>
      )}
    </div>
  );
}

function QuestionRow({ q, qi, onUpdate, onRemove, onDuplicate, onShowGraphModal }) {
  const qt = Q_TYPES.find(t => t.id === q.type);
  const df = DIFF_OPTIONS.find(d => d.id === q.difficulty);
  const expanded = q.expanded;
  const descPreview = q.imageDataUrl ? "📷 Cropped image question" : q.isOwn ? (q.ownText || "").slice(0, 60) + ((q.ownText || "").length > 60 ? "…" : "") : (q.note || (qt?.label || "") + " question");

  return (
    <div style={{ border: "1px solid " + BORDER, borderRadius: 7, marginBottom: 8, overflow: "hidden" }}>
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 8, cursor: "pointer", background: expanded ? BG : "#fff" }} onClick={() => onUpdate("expanded", !expanded)}>
        <div style={{ width: 22, height: 22, borderRadius: "50%", background: NAV + "15", color: NAV, display: "flex", alignItems: "center", justifyContent: "center", fontFamily: SANS, fontWeight: 700, fontSize: 11, flexShrink: 0 }}>Q{qi + 1}</div>
        {q.imageDataUrl ? <img src={q.imageDataUrl} alt="" style={{ width: 22, height: 22, objectFit: "cover", borderRadius: 3, border: "1px solid " + BORDER, flexShrink: 0 }} /> : <span style={{ fontSize: 14 }}>{qt?.icon}</span>}
        <span style={{ flex: 1, fontFamily: SANS, fontSize: 12, color: "#444", overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis" }}>{descPreview || "Click to configure"}</span>
        <span style={{ background: (df?.color || "#888") + "18", color: df?.color || "#888", borderRadius: 20, padding: "1px 7px", fontFamily: SANS, fontSize: 10, fontWeight: 600 }}>{q.difficulty}</span>
        <span style={{ fontFamily: SERIF, fontSize: 13, fontWeight: 700, color: NAV }}>[{q.marks}]</span>
        <button onClick={e => { e.stopPropagation(); onDuplicate(); }} style={{ background: "none", border: "none", color: "#aaa", fontSize: 14, cursor: "pointer" }}>⧉</button>
        <button onClick={e => { e.stopPropagation(); onRemove(); }} style={{ background: "none", border: "none", color: RED, fontSize: 14, cursor: "pointer" }}>✕</button>
        <span style={{ color: "#aaa", fontSize: 12 }}>{expanded ? "▲" : "▼"}</span>
      </div>
      {expanded && (
        <div style={{ padding: "12px 14px", borderTop: "1px solid " + BORDER }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 14 }}>
            <div style={{ fontFamily: SANS, fontSize: 12, color: "#666", alignSelf: "center" }}>Written by:</div>
            <ToggleBtn active={!q.isOwn} onClick={() => onUpdate("isOwn", false)} activeColor={BLUE} style={{ fontSize: 12, padding: "5px 12px", textAlign: "center", lineHeight: 1.3 }}>🤖 AI<br /><span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>(describe it below)</span></ToggleBtn>
            <ToggleBtn active={q.isOwn} onClick={() => onUpdate("isOwn", true)} activeColor={SAGE} style={{ fontSize: 12, padding: "5px 12px", textAlign: "center", lineHeight: 1.3 }}>✍ Me<br /><span style={{ fontSize: 10, fontWeight: 400, opacity: 0.8 }}>(type exact question)</span></ToggleBtn>
          </div>
          {q.isOwn ? (
            <>
              {q.imageDataUrl ? (
                <div style={{ background: BG, border: "1px solid " + BORDER, borderRadius: 8, padding: 12, marginBottom: 10, textAlign: "center" }}>
                  <img src={q.imageDataUrl} alt="Cropped question" style={{ maxWidth: "100%", maxHeight: 220, borderRadius: 4, border: "1px solid " + BORDER }} />
                  <div style={{ fontFamily: SANS, fontSize: 11, color: "#888", marginTop: 6 }}>This question will be printed exactly as cropped.</div>
                  <button onClick={() => onUpdate("imageDataUrl", null)} style={{ marginTop: 6, background: "none", border: "1px solid " + RED, color: RED, borderRadius: 6, padding: "4px 10px", fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>Remove image, use text instead</button>
                </div>
              ) : (
                <textarea value={q.ownText || ""} onChange={e => onUpdate("ownText", e.target.value)} placeholder="Type or paste the exact question text here..." style={{ ...inputStyle, width: "100%", minHeight: 100, fontFamily: SERIF, fontSize: 13, resize: "vertical" }} />
              )}
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <div><label style={labelSty}>Marks</label><NumberField value={q.marks} onChange={v => onUpdate("marks", v)} min={1} style={{ width: 65 }} /></div>
                <div style={{ flex: 1 }}><label style={labelSty}>Type</label><select value={q.type} onChange={e => onUpdate("type", e.target.value)} style={{ ...selectStyle, width: "100%" }}>{Q_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}</select></div>
                <div style={{ flex: 1 }}><label style={labelSty}>Topic</label><select value={q.topic} onChange={e => onUpdate("topic", e.target.value)} style={{ ...selectStyle, width: "100%" }}><option value="">— select —</option>{ALL_TOPICS_FLAT.map(t => <option key={t}>{t}</option>)}</select></div>
              </div>
            </>
          ) : (
            <>
              <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                <div><label style={labelSty}>Marks</label><NumberField value={q.marks} onChange={v => onUpdate("marks", v)} min={1} style={{ width: 65 }} /></div>
                <div style={{ flex: 1 }}><label style={labelSty}>Question Type</label><select value={q.type} onChange={e => onUpdate("type", e.target.value)} style={{ ...selectStyle, width: "100%" }}>{Q_TYPES.map(t => <option key={t.id} value={t.id}>{t.icon} {t.label}</option>)}</select></div>
                <div><label style={labelSty}>Difficulty</label><select value={q.difficulty} onChange={e => onUpdate("difficulty", e.target.value)} style={selectStyle}>{DIFF_OPTIONS.map(d => <option key={d.id}>{d.id}</option>)}</select></div>
                {qt?.defaultSubs > 0 && <div><label style={labelSty}>Sub-parts</label><NumberField value={q.subParts || qt.defaultSubs} onChange={v => onUpdate("subParts", v)} min={0} style={{ width: 65 }} /></div>}
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 10, flexWrap: "wrap" }}>
                <div style={{ flex: 1 }}><label style={labelSty}>Topic</label><select value={q.topic} onChange={e => onUpdate("topic", e.target.value)} style={{ ...selectStyle, width: "100%" }}><option value="">— select —</option>{ALL_TOPICS_FLAT.map(t => <option key={t}>{t}</option>)}</select></div>
                <div style={{ flex: 2 }}><label style={labelSty}>Note for AI</label><input value={q.note || ""} onChange={e => onUpdate("note", e.target.value)} placeholder="Describe what the question should cover…" style={{ ...inputStyle, width: "100%" }} /></div>
              </div>
              {q.type === "graph" && (
                <div style={{ marginTop: 10, background: PINK + "10", border: "1px solid " + PINK + "44", borderRadius: 7, padding: "10px 12px" }}>
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                    <div style={{ flex: 1 }}><label style={labelSty}>Graph Type</label><select value={q.graphType || "blank-grid"} onChange={e => onUpdate("graphType", e.target.value)} style={{ ...selectStyle, width: "100%" }}>{GRAPH_TYPES_LIST.map(g => <option key={g}>{g}</option>)}</select></div>
                    <button onClick={onShowGraphModal} style={{ padding: "7px 12px", background: PINK, color: "#fff", border: "none", borderRadius: 6, fontFamily: SANS, fontSize: 11, cursor: "pointer", marginBottom: 1 }}>Preview</button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function App() {
  const isMobile = useWindowWidth() < 700;
  const [mode, setMode] = useState("standard");
  const [grade, setGrade] = useState("ol");
  const [paper, setPaper] = useState("Paper I");
  const [difficulty, setDifficulty] = useState("Standard");
  const [selectedTopics, setSelectedTopics] = useState([]);
  const [schoolName, setSchoolName] = useState("");
  const [teacherName, setTeacherName] = useState("");
  const [year, setYear] = useState(String(new Date().getFullYear()));
  const [extraInstructions, setExtraInstructions] = useState("");
  const [customTitle, setCustomTitle] = useState("");
  const [customSchool, setCustomSchool] = useState("");
  const [customTeacher, setCustomTeacher] = useState("");
  const [customLevel, setCustomLevel] = useState("G.C.E. O/L");
  const [customGrade, setCustomGrade] = useState("10");
  const [customDuration, setCustomDuration] = useState("2 hours");
  const [customYear, setCustomYear] = useState(String(new Date().getFullYear()));
  const [customDate, setCustomDate] = useState("");
  const [addAnswerKey, setAddAnswerKey] = useState(false);
  const [addFormula, setAddFormula] = useState(false);
  const [sections, setSections] = useState(makeDefaultSections);
  const [customExtraInstructions, setCustomExtraInstructions] = useState("");
  const [generated, setGenerated] = useState(null);
  const [loading, setLoading] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState(null);
  const [showBankModal, setShowBankModal] = useState(false);
  const [bankTargetSection, setBankTargetSection] = useState(0);
  const [showGraphModal, setShowGraphModal] = useState(false);
  const [testMode, setTestMode] = useState(false);
  const timerRef = useRef(null);

  function startTimer() { setElapsed(0); timerRef.current = setInterval(() => setElapsed(e => e + 1), 1000); }
  function stopTimer() { clearInterval(timerRef.current); }

  async function handleGenerate() {
    setError(null); setGenerated(null); setLoading(true); startTimer();
    try {
      let text;
      if (testMode) {
        // No prompt built, no fetch made — zero API credits used.
        await new Promise(r => setTimeout(r, 600));
        text = stripMarkdownArtifacts(SAMPLE_PAPER_TEXT);
      } else {
        const prompt = mode === "standard"
          ? buildStandardPrompt({ grade, paper, difficulty, selectedTopics, schoolName, teacherName, year, extraInstructions })
          : buildCustomPrompt({ customTitle, customSchool, customTeacher, customLevel, customGrade, customDuration, customYear, customDate, addAnswerKey, addFormula, sections, customExtraInstructions });

        // Calls our own /api/generate serverless proxy — the Anthropic key
        // stays server-side and is never bundled into the browser JS.
        const res = await fetch("/api/generate", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ prompt })
        });
        const data = await res.json();
        if (!res.ok) {
          const errMsg = typeof data.error === "string"
            ? data.error
            : (data?.error?.message || (data.error ? JSON.stringify(data.error) : "API error (" + res.status + ")"));
          throw new Error(errMsg);
        }
        text = stripMarkdownArtifacts(data.text || "");
      }
      const meta = mode === "standard"
        ? { title: "Mathematics " + paper + " — " + (grade === "ol" ? "G.C.E. O/L" : "Junior Secondary"), sub: (schoolName || "National School") + " | " + paper + " | " + year }
        : { title: customTitle || "Mathematics Examination", sub: (customSchool || "") + " | Grade " + customGrade + " | " + customYear };
      const imageMap = {};
      if (mode === "custom") sections.forEach(s => s.questions.forEach(q => { if (q.imageDataUrl) imageMap[q.id] = q.imageDataUrl; }));
      setGenerated({ text, meta, imageMap });
    } catch (e) {
      const msg = e instanceof Error ? e.message : (typeof e === "string" ? e : JSON.stringify(e));
      setError(msg || "Something went wrong. Please try again.");
    }
    finally { setLoading(false); stopTimer(); }
  }

  function toggleTopic(t) { setSelectedTopics(prev => prev.includes(t) ? prev.filter(x => x !== t) : [...prev, t]); }
  function addSection() {
    setSections(prev => [...prev, { id: "sec" + Date.now(), name: "Section " + String.fromCharCode(65 + prev.length), instructions: "Answer all questions.", questions: [{ id: "q" + Date.now(), type: "short", marks: 2, difficulty: "Standard", topic: "", subParts: 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false }], collapsed: false }]);
  }
  function removeSection(idx) { setSections(prev => prev.filter((_, i) => i !== idx)); }
  function updateSection(idx, key, val) { setSections(prev => prev.map((s, i) => i === idx ? { ...s, [key]: val } : s)); }
  function addQuestion(secIdx, typeId) {
    const qt = Q_TYPES.find(t => t.id === typeId);
    setSections(prev => prev.map((s, i) => i === secIdx ? { ...s, questions: [...s.questions, { id: "q" + Date.now(), type: typeId, marks: qt?.defaultMarks || 2, difficulty: "Standard", topic: "", subParts: qt?.defaultSubs || 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", imageDataUrl: null, expanded: true }] } : s));
  }
  function removeQuestion(secIdx, qIdx) { setSections(prev => prev.map((s, i) => i === secIdx ? { ...s, questions: s.questions.filter((_, j) => j !== qIdx) } : s)); }
  function updateQuestion(secIdx, qIdx, key, val) { setSections(prev => prev.map((s, i) => i === secIdx ? { ...s, questions: s.questions.map((q, j) => j === qIdx ? { ...q, [key]: val } : q) } : s)); }
  function duplicateQuestion(secIdx, qIdx) {
    setSections(prev => prev.map((s, i) => {
      if (i !== secIdx) return s;
      const q = { ...s.questions[qIdx], id: "q" + Date.now() };
      const qs = [...s.questions]; qs.splice(qIdx + 1, 0, q);
      return { ...s, questions: qs };
    }));
  }
  function insertFromBank(qData, secIdx) {
    const newQ = { id: "q" + Date.now(), type: qData.type || "short", marks: qData.marks || 2, difficulty: qData.difficulty || "Standard", topic: qData.topic || "", subParts: 0, note: "", isOwn: true, ownText: qData.ownText !== undefined ? qData.ownText : (qData.text || ""), graphType: "blank-grid", imageDataUrl: qData.imageDataUrl || null, expanded: false };
    setSections(prev => prev.map((s, i) => i === secIdx ? { ...s, questions: [...s.questions, newQ] } : s));
  }
  function getConfig() {
    return { mode, grade, paper, difficulty, selectedTopics, schoolName, teacherName, year, extraInstructions, customTitle, customSchool, customTeacher, customLevel, customGrade, customDuration, customYear, customDate, addAnswerKey, addFormula, sections, customExtraInstructions };
  }
  function loadConfig(c) {
    if (!c) return;
    if (c.mode) setMode(c.mode); if (c.grade) setGrade(c.grade); if (c.paper) setPaper(c.paper);
    if (c.difficulty) setDifficulty(c.difficulty); if (c.selectedTopics) setSelectedTopics(c.selectedTopics);
    if (c.schoolName !== undefined) setSchoolName(c.schoolName); if (c.teacherName !== undefined) setTeacherName(c.teacherName);
    if (c.year) setYear(c.year); if (c.extraInstructions !== undefined) setExtraInstructions(c.extraInstructions);
    if (c.customTitle !== undefined) setCustomTitle(c.customTitle); if (c.customSchool !== undefined) setCustomSchool(c.customSchool);
    if (c.customTeacher !== undefined) setCustomTeacher(c.customTeacher); if (c.customLevel) setCustomLevel(c.customLevel);
    if (c.customGrade) setCustomGrade(c.customGrade); if (c.customDuration) setCustomDuration(c.customDuration);
    if (c.customYear) setCustomYear(c.customYear); if (c.customDate !== undefined) setCustomDate(c.customDate);
    if (c.addAnswerKey !== undefined) setAddAnswerKey(c.addAnswerKey); if (c.addFormula !== undefined) setAddFormula(c.addFormula);
    if (c.sections) setSections(c.sections); if (c.customExtraInstructions !== undefined) setCustomExtraInstructions(c.customExtraInstructions);
    setGenerated(null);
  }

  const currentTopics = grade === "ol" ? OL_TOPICS : JUNIOR_TOPICS;
  const pd = PAPER_DATA[grade === "ol" ? "ol" : "junior"][paper];
  const totalMarks = sections.reduce((a, s) => a + s.questions.reduce((b, q) => b + (q.marks || 0), 0), 0);
  const totalQs = sections.reduce((a, s) => a + s.questions.length, 0);
  const diffCounts = { Foundation: 0, Standard: 0, Challenge: 0 };
  const typeCounts = {};
  sections.forEach(s => s.questions.forEach(q => {
    if (q.difficulty) diffCounts[q.difficulty] = (diffCounts[q.difficulty] || 0) + 1;
    typeCounts[q.type] = (typeCounts[q.type] || 0) + 1;
  }));

  return (
    <div style={{ minHeight: "100vh", background: BG, fontFamily: SANS }}>
      <div style={{ background: NAV, borderBottom: "4px solid " + GOLD, padding: "0 16px" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", display: "flex", alignItems: "center", gap: 12, height: 64 }}>
          <div style={{ width: 40, height: 40, borderRadius: "50%", background: NAV, border: "2.5px solid " + GOLD, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🦁</div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ color: "#fff", fontFamily: SERIF, fontSize: isMobile ? 15 : 19, fontWeight: "bold", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>Sri Lanka Maths Paper Generator</div>
            {!isMobile && <div style={{ color: "#A8BCCF", fontSize: 11.5 }}>Official syllabus-accurate examination paper builder</div>}
          </div>
          <div style={{ background: GOLD, color: "#fff", borderRadius: 20, padding: "4px 10px", fontFamily: SANS, fontSize: 10, fontWeight: 700, flexShrink: 0 }}>AI-Powered</div>
        </div>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "16px 12px" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, background: testMode ? ORANGE + "12" : "#fff", border: "1.5px solid " + (testMode ? ORANGE : BORDER), borderRadius: 8, padding: "10px 14px", marginBottom: 16 }}>
          <div>
            <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: testMode ? ORANGE : "#444" }}>🧪 Test Mode</div>
            <div style={{ fontFamily: SANS, fontSize: 11, color: "#888" }}>Generates a sample paper locally — no API call, no credits used. Use it to test Copy / Print / Download PDF.</div>
          </div>
          <ToggleBtn active={testMode} onClick={() => setTestMode(!testMode)} activeColor={ORANGE}>{testMode ? "ON" : "OFF"}</ToggleBtn>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 20 }}>
          {[
            { id: "standard", icon: "📋", title: "Standard Paper", sub: "Follows official O/L and Junior syllabus" },
            { id: "custom", icon: "✏️", title: "Custom Builder", sub: "Design your own sections and questions" }
          ].map(m => (
            <button key={m.id} onClick={() => { setMode(m.id); setGenerated(null); }} style={{ background: mode === m.id ? NAV : "#fff", color: mode === m.id ? CREAM : "#666", border: "2px solid " + (mode === m.id ? NAV : BORDER), borderRadius: 10, padding: "14px 12px", cursor: "pointer", textAlign: "left" }}>
              <div style={{ fontFamily: SERIF, fontSize: isMobile ? 14 : 16, fontWeight: "bold", marginBottom: 4 }}>{m.icon} {m.title}</div>
              <div style={{ fontFamily: SANS, fontSize: 11, opacity: 0.75 }}>{m.sub}</div>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 18, alignItems: "flex-start" }}>
          <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
            {mode === "standard" ? (
              <>
                <div style={cardStyle}>
                  <SectionHeader n={1} title="Select Level" sub="Choose the examination type" />
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 18 }}>
                    {[
                      { id: "ol", title: "G.C.E. O/L (Grades 10–11)", sub: "National standardised examination" },
                      { id: "junior", title: "Junior Secondary (Grades 6–9)", sub: "School-level term test" }
                    ].map(g => (
                      <button key={g.id} onClick={() => { setGrade(g.id); setPaper("Paper I"); setSelectedTopics([]); setGenerated(null); }} style={{ background: grade === g.id ? NAV : "#fff", color: grade === g.id ? CREAM : "#444", border: "2px solid " + (grade === g.id ? NAV : BORDER), borderRadius: 8, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ fontFamily: SERIF, fontSize: 14, fontWeight: "bold" }}>{g.title}</div>
                        <div style={{ fontFamily: SANS, fontSize: 11, opacity: 0.75, marginTop: 3 }}>{g.sub}</div>
                      </button>
                    ))}
                  </div>

                  <SectionHeader n={2} title="Select Paper" sub="Duration and total marks" />
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    {["Paper I", "Paper II"].map(p2 => {
                      const pd2 = PAPER_DATA[grade === "ol" ? "ol" : "junior"][p2];
                      return (
                        <button key={p2} onClick={() => { setPaper(p2); setGenerated(null); }} style={{ background: paper === p2 ? NAV : "#fff", color: paper === p2 ? CREAM : "#444", border: "2px solid " + (paper === p2 ? NAV : BORDER), borderRadius: 8, padding: "12px 14px", cursor: "pointer", textAlign: "left" }}>
                          <div style={{ fontFamily: SERIF, fontSize: 14, fontWeight: "bold" }}>{p2}</div>
                          <div style={{ fontFamily: SANS, fontSize: 11, opacity: 0.75, marginTop: 3 }}>{pd2.duration} · {pd2.total} marks</div>
                        </button>
                      );
                    })}
                  </div>
                  <div style={{ background: BG, border: "1px solid " + BORDER, borderRadius: 8, padding: "12px 14px", marginBottom: 18 }}>
                    {pd.sections.map(s => (
                      <div key={s.name} style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                        <span style={{ background: NAV, color: "#fff", borderRadius: 12, padding: "2px 10px", fontFamily: SANS, fontSize: 11, fontWeight: 700, whiteSpace: "nowrap" }}>{s.name}</span>
                        <span style={{ fontFamily: SANS, fontSize: 12, color: "#555" }}><strong>{s.marks} marks</strong> · {s.note}</span>
                      </div>
                    ))}
                    {grade === "ol" && <div style={{ marginTop: 8, color: SAGE, fontFamily: SANS, fontSize: 11, fontWeight: 600 }}>📊 Scaling: (P1 + P2) ÷ 1.8 = 100%</div>}
                  </div>

                  <SectionHeader n={3} title="Difficulty" sub="Controls question complexity" />
                  <div style={{ display: "flex", gap: 8, marginBottom: 18 }}>
                    {DIFF_OPTIONS.map(d => (
                      <ToggleBtn key={d.id} active={difficulty === d.id} onClick={() => setDifficulty(d.id)} activeColor={d.color}>{d.id}</ToggleBtn>
                    ))}
                  </div>

                  <SectionHeader n={4} title="Topics" sub="Leave blank for mixed syllabus" />
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                    <span style={{ fontFamily: SANS, fontSize: 11, color: "#999" }}>(leave blank for mixed)</span>
                    {selectedTopics.length > 0 && <button onClick={() => setSelectedTopics([])} style={{ background: "none", border: "none", color: SLATE, fontFamily: SANS, fontSize: 12, cursor: "pointer", textDecoration: "underline" }}>Clear all</button>}
                  </div>
                  {Object.entries(currentTopics).map(([cat, topics]) => (
                    <div key={cat} style={{ marginBottom: 10 }}>
                      <div style={{ fontFamily: SANS, fontSize: 10, fontWeight: 700, color: "#999", textTransform: "uppercase", letterSpacing: 1, marginBottom: 6 }}>{cat}</div>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                        {topics.map(t => (
                          <button key={t} onClick={() => toggleTopic(t)} style={{ padding: "4px 11px", borderRadius: 20, border: "2px solid " + (selectedTopics.includes(t) ? NAV : BORDER), background: selectedTopics.includes(t) ? NAV + "12" : "#fff", color: selectedTopics.includes(t) ? NAV : "#666", fontFamily: SANS, fontSize: 12, cursor: "pointer", fontWeight: selectedTopics.includes(t) ? 600 : 400 }}>{t}</button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <div style={{ marginTop: 18 }}>
                    <SectionHeader n={5} title="Paper Details" sub="School info and special instructions" />
                    <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr 1fr" : "1fr 1fr 1fr", gap: 10, marginBottom: 10 }}>
                      <div><label style={labelSty}>School Name</label><input value={schoolName} onChange={e => setSchoolName(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. Nalanda College" /></div>
                      <div><label style={labelSty}>Teacher Name</label><input value={teacherName} onChange={e => setTeacherName(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. Mrs. Perera" /></div>
                      <div><label style={labelSty}>Year</label><input value={year} onChange={e => setYear(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
                    </div>
                    <textarea value={extraInstructions} onChange={e => setExtraInstructions(e.target.value)} style={{ ...inputStyle, width: "100%", minHeight: 70, resize: "vertical" }} placeholder="Special instructions for AI…" />
                  </div>
                </div>

                <button onClick={handleGenerate} disabled={loading} style={{ ...btnPrimary, width: "100%", padding: "14px 20px", fontSize: 16, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer", marginBottom: 18, background: testMode ? ORANGE : NAV }}>
                  {loading ? (testMode ? "⏳ Building sample… " : "⏳ Composing… ") + elapsed + "s" : testMode ? "🧪 Generate Sample Paper (No API Call)" : "🖨 Generate Examination Paper"}
                </button>
                {error && <div style={{ marginBottom: 18, padding: "12px 16px", background: RED + "12", border: "1px solid " + RED, borderRadius: 8, color: RED, fontFamily: SANS, fontSize: 13 }}>⚠ {error}</div>}
                <SavedPapersPanel getConfig={getConfig} onLoad={loadConfig} />
              </>
            ) : (
              <>
                <div style={{ background: "#EFF6FF", border: "1px solid " + BLUE + "44", borderRadius: 10, padding: "16px 18px", marginBottom: 18 }}>
                  <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: "#1D4ED8", marginBottom: 8 }}>ℹ How Custom Builder works</div>
                  <ol style={{ margin: 0, paddingLeft: 18, fontFamily: SANS, fontSize: 12.5, color: "#1D4ED8", lineHeight: 1.9 }}>
                    <li><strong>Paper Identity</strong> — school, level, grade, duration.</li>
                    <li><strong>Sections & Questions</strong> — tap a coloured "+ button" (e.g. + Short Answer) to add a question, then tap it to open it. Set its marks, difficulty and topic.</li>
                    <li>For each question choose <strong>🤖 AI</strong> (you describe the topic, the AI writes the full question) or <strong>✍ Me</strong> (you type the exact question yourself — printed exactly as typed).</li>
                    <li>Tap <strong>Generate Custom Paper</strong> at the bottom when done.</li>
                  </ol>
                </div>

                <div style={cardStyle}>
                  <SectionHeader n={1} title="Paper Identity" sub="Define your examination header" />
                  <div style={{ display: "grid", gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", gap: 10, marginBottom: 10 }}>
                    <div style={{ gridColumn: "1/-1" }}><label style={labelSty}>Paper Title</label><input value={customTitle} onChange={e => setCustomTitle(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. Mathematics Term Test — Paper I" /></div>
                    <div><label style={labelSty}>School Name</label><input value={customSchool} onChange={e => setCustomSchool(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
                    <div><label style={labelSty}>Teacher Name</label><input value={customTeacher} onChange={e => setCustomTeacher(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
                    <div><label style={labelSty}>Level</label><select value={customLevel} onChange={e => setCustomLevel(e.target.value)} style={{ ...selectStyle, width: "100%" }}><option>G.C.E. O/L</option><option>Junior Secondary</option></select></div>
                    <div><label style={labelSty}>Grade</label><select value={customGrade} onChange={e => setCustomGrade(e.target.value)} style={{ ...selectStyle, width: "100%" }}>{[6,7,8,9,10,11].map(g => <option key={g}>{g}</option>)}</select></div>
                    <div><label style={labelSty}>Duration</label><select value={customDuration} onChange={e => setCustomDuration(e.target.value)} style={{ ...selectStyle, width: "100%" }}>{["30 minutes","45 minutes","1 hour","1.5 hours","2 hours","2.5 hours","3 hours"].map(d => <option key={d}>{d}</option>)}</select></div>
                    <div><label style={labelSty}>Year</label><input value={customYear} onChange={e => setCustomYear(e.target.value)} style={{ ...inputStyle, width: "100%" }} /></div>
                    <div><label style={labelSty}>Exam Date</label><input value={customDate} onChange={e => setCustomDate(e.target.value)} style={{ ...inputStyle, width: "100%" }} placeholder="e.g. 15 October 2025" /></div>
                  </div>
                  <div style={{ borderTop: "1px solid " + BORDER, paddingTop: 12 }}>
                    <div style={{ fontFamily: SANS, fontSize: 12, color: "#666", marginBottom: 8 }}>Optional add-ons:</div>
                    <div style={{ display: "flex", flexDirection: isMobile ? "column" : "row", gap: 10 }}>
                      <ToggleBtn active={addAnswerKey} onClick={() => setAddAnswerKey(!addAnswerKey)} activeColor={NAV} style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: "bold" }}>📝 Answer Key & Marking Scheme</div>
                        <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>Full solutions appended</div>
                      </ToggleBtn>
                      <ToggleBtn active={addFormula} onClick={() => setAddFormula(!addFormula)} activeColor={NAV} style={{ flex: 1, textAlign: "left" }}>
                        <div style={{ fontSize: 13, fontWeight: "bold" }}>📐 Formula Sheet</div>
                        <div style={{ fontSize: 10, marginTop: 2, opacity: 0.7 }}>Formulas printed at the start</div>
                      </ToggleBtn>
                    </div>
                  </div>
                </div>

                <div style={cardStyle}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                    <SectionHeader n={2} title="Sections & Questions" sub={totalQs + " questions — " + totalMarks + " marks total"} />
                    <button onClick={() => { setBankTargetSection(0); setShowBankModal(true); }} style={{ padding: "7px 13px", background: "#fff", border: "1.5px solid " + NAV, color: NAV, borderRadius: 7, fontFamily: SANS, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>📚 Question Bank</button>
                  </div>
                  {sections.map((sec, si) => (
                    <SectionPanel key={sec.id} sec={sec} si={si} secColor={SECTION_COLORS[si % SECTION_COLORS.length]}
                      onToggleCollapse={() => updateSection(si, "collapsed", !sec.collapsed)}
                      onRemove={() => removeSection(si)} canRemove={sections.length > 1}
                      onUpdateName={v => updateSection(si, "name", v)}
                      onUpdateInstructions={v => updateSection(si, "instructions", v)}
                      onAddQuestion={typeId => addQuestion(si, typeId)}
                      onOpenBank={() => { setBankTargetSection(si); setShowBankModal(true); }}
                      onShowGraphModal={() => setShowGraphModal(true)}
                      onUpdateQ={(qi, k, v) => updateQuestion(si, qi, k, v)}
                      onRemoveQ={qi => removeQuestion(si, qi)}
                      onDuplicateQ={qi => duplicateQuestion(si, qi)}
                    />
                  ))}
                  <button onClick={addSection} style={{ width: "100%", padding: "12px", border: "2px dashed " + BORDER, borderRadius: 8, background: "#fff", color: "#888", fontFamily: SANS, fontSize: 13, cursor: "pointer", marginTop: 8 }}>+ Add another section</button>
                </div>

                <div style={cardStyle}>
                  <SectionHeader n={3} title="Extra AI Instructions" sub="Optional guidance for the whole paper" />
                  <textarea value={customExtraInstructions} onChange={e => setCustomExtraInstructions(e.target.value)} style={{ ...inputStyle, width: "100%", minHeight: 80, resize: "vertical" }} placeholder="e.g. Use only integer values; Set Q3 in a banking context" />
                </div>

                <button onClick={handleGenerate} disabled={loading} style={{ ...btnPrimary, width: "100%", padding: "14px 20px", fontSize: 16, opacity: loading ? 0.7 : 1, cursor: loading ? "wait" : "pointer", marginBottom: 18, background: testMode ? ORANGE : NAV }}>
                  {loading ? (testMode ? "⏳ Building sample… " : "⏳ Composing… ") + elapsed + "s" : testMode ? "🧪 Generate Sample Paper (No API Call)" : "🖨 Generate Custom Paper"}
                </button>
                {error && <div style={{ marginBottom: 18, padding: "12px 16px", background: RED + "12", border: "1px solid " + RED, borderRadius: 8, color: RED, fontFamily: SANS, fontSize: 13 }}>⚠ {error}</div>}
                <SavedPapersPanel getConfig={getConfig} onLoad={loadConfig} />
              </>
            )}
            {generated && <PaperOutput text={generated.text} meta={generated.meta} imageMap={generated.imageMap} />}
          </div>

          <div style={{ width: isMobile ? "100%" : 270, flexShrink: 0, position: isMobile ? "static" : "sticky", top: 16 }}>
            {mode === "standard" ? (
              <div style={cardStyle}>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: "bold", color: NAV, marginBottom: 12 }}>Quick Reference</div>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 700, color: NAV }}>{grade === "ol" ? "G.C.E. O/L" : "Junior Secondary"} — {paper}</div>
                <div style={{ fontFamily: SANS, fontSize: 12, color: "#666", marginBottom: 10 }}>{pd.duration} · {pd.total} marks total</div>
                {pd.sections.map(s => (
                  <div key={s.name} style={{ borderLeft: "3px solid " + NAV, paddingLeft: 10, marginBottom: 8 }}>
                    <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: NAV }}>{s.name}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: "#666" }}>{s.marks} marks · {s.note}</div>
                  </div>
                ))}
                {grade === "ol" && <div style={{ marginTop: 10, padding: "8px 10px", background: SAGE + "12", border: "1px solid " + SAGE + "44", borderRadius: 6, color: SAGE, fontSize: 11, fontFamily: SANS, fontWeight: 600 }}>📊 Scaling: (P1 + P2) ÷ 1.8 = 100%</div>}
                {selectedTopics.length > 0 && (
                  <div style={{ marginTop: 12 }}>
                    <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Selected Topics</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {selectedTopics.map(t => <span key={t} style={{ background: NAV + "12", color: NAV, borderRadius: 20, padding: "2px 8px", fontSize: 10, fontFamily: SANS }}>{t}</span>)}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div style={cardStyle}>
                <div style={{ fontFamily: SERIF, fontSize: 15, fontWeight: "bold", color: NAV, marginBottom: 14 }}>Live Summary</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 14 }}>
                  <div style={{ gridColumn: "1/-1", background: GOLD + "15", border: "1px solid " + GOLD + "44", borderRadius: 8, padding: "12px", textAlign: "center" }}>
                    <div style={{ fontFamily: SERIF, fontSize: 28, fontWeight: "bold", color: GOLD }}>{totalMarks}</div>
                    <div style={{ fontFamily: SANS, fontSize: 11, color: "#666" }}>Total Marks</div>
                  </div>
                  <div style={{ background: SLATE + "15", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                    <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: "bold", color: SLATE }}>{totalQs}</div>
                    <div style={{ fontFamily: SANS, fontSize: 10, color: "#666" }}>Questions</div>
                  </div>
                  <div style={{ background: SAGE + "15", borderRadius: 8, padding: "10px", textAlign: "center" }}>
                    <div style={{ fontFamily: SERIF, fontSize: 22, fontWeight: "bold", color: SAGE }}>{sections.length}</div>
                    <div style={{ fontFamily: SANS, fontSize: 10, color: "#666" }}>Sections</div>
                  </div>
                </div>
                <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 8 }}>Sections</div>
                {sections.map((s, i) => {
                  const sm = s.questions.reduce((a, q) => a + (q.marks || 0), 0);
                  const pct = totalMarks > 0 ? Math.round((sm / totalMarks) * 100) : 0;
                  const col = SECTION_COLORS[i % SECTION_COLORS.length];
                  return (
                    <div key={s.id} style={{ marginBottom: 8 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 11 }}>
                        <span style={{ color: col, fontWeight: 600 }}>{s.name}</span>
                        <span style={{ color: "#888" }}>{s.questions.length} qs · {pct}%</span>
                      </div>
                      <div style={{ height: 5, background: "#eee", borderRadius: 3, marginTop: 3, overflow: "hidden" }}>
                        <div style={{ width: pct + "%", height: "100%", background: col, borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
                {Object.keys(typeCounts).length > 0 && (
                  <>
                    <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, margin: "12px 0 8px" }}>Question Types</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                      {Object.entries(typeCounts).map(([tid, cnt]) => {
                        const qt = Q_TYPES.find(t => t.id === tid);
                        return <span key={tid} style={{ background: (qt?.color || "#888") + "18", color: qt?.color || "#888", borderRadius: 20, padding: "2px 8px", fontSize: 10, fontFamily: SANS, fontWeight: 600 }}>{qt?.icon} {qt?.label} ×{cnt}</span>;
                      })}
                    </div>
                  </>
                )}
                <div style={{ fontFamily: SANS, fontSize: 11, fontWeight: 700, color: "#888", textTransform: "uppercase", letterSpacing: 0.8, margin: "12px 0 8px" }}>Difficulty Balance</div>
                {DIFF_OPTIONS.map(d => {
                  const cnt = diffCounts[d.id] || 0;
                  const pct = totalQs > 0 ? Math.round((cnt / totalQs) * 100) : 0;
                  return (
                    <div key={d.id} style={{ marginBottom: 6 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontFamily: SANS, fontSize: 11 }}>
                        <span style={{ color: d.color, fontWeight: 600 }}>{d.id}</span>
                        <span style={{ color: "#888" }}>{cnt} ({pct}%)</span>
                      </div>
                      <div style={{ height: 4, background: "#eee", borderRadius: 3, marginTop: 2, overflow: "hidden" }}>
                        <div style={{ width: pct + "%", height: "100%", background: d.color, borderRadius: 3 }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {showBankModal && <QuestionBankModal onInsert={insertFromBank} onClose={() => setShowBankModal(false)} targetSection={bankTargetSection} />}
      {showGraphModal && <GraphModal onClose={() => setShowGraphModal(false)} />}
    </div>
  );
}
