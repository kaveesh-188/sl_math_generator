import { useState, useRef, useEffect } from "react";

export function useWindowWidth() {
  const [w, setW] = useState(typeof window !== "undefined" ? window.innerWidth : 800);
  useEffect(() => {
    const handler = () => setW(window.innerWidth);
    window.addEventListener("resize", handler);
    return () => window.removeEventListener("resize", handler);
  }, []);
  return w;
}

export const NAV = "#0F1F3D";
export const GOLD = "#C8992A";
export const SLATE = "#4A6280";
export const SAGE = "#059669";
export const RED = "#B84040";
export const CREAM = "#F8F6F1";
export const BG = "#F0F4F8";
export const BORDER = "#CBD5E0";
export const PURPLE = "#7C3AED";
export const BLUE = "#2563EB";
export const PINK = "#DB2777";
export const ORANGE = "#EA580C";

export const SERIF = "Georgia, serif";
export const SANS = "system-ui, -apple-system, sans-serif";

export const PAPER_DATA = {
  ol: {
    "Paper I": {
      duration: "2 hours", total: 100,
      sections: [
        { name: "Section A", marks: 50, count: 25, note: "25 compulsory short-answer questions · 2 marks each" },
        { name: "Section B", marks: 50, count: 5, note: "5 compulsory structured questions · 10 marks each" }
      ]
    },
    "Paper II": {
      duration: "2.5 hours", total: 100,
      sections: [
        { name: "Part A", marks: 50, count: "5/6", note: "Commercial arithmetic, graphs, trig, statistics" },
        { name: "Part B", marks: 50, count: "5/6", note: "Geometry, constructions, matrices, progressions" }
      ]
    }
  },
  junior: {
    "Paper I": {
      duration: "1–1.5 hr", total: 40,
      sections: [
        { name: "Section A", marks: 40, count: 20, note: "20 compulsory short-answer questions · 2 marks each" }
      ]
    },
    "Paper II": {
      duration: "1.5–2 hr", total: 60,
      sections: [
        { name: "Section A", marks: 60, count: "5/6", note: "5 out of 6 structured questions" }
      ]
    }
  }
};

export const OL_TOPICS = {
  "Commercial Arithmetic": ["Profit & Loss", "Simple & Compound Interest", "Hire Purchase", "Income Tax", "Percentages & Ratios"],
  "Algebra": ["Quadratic Equations", "Simultaneous Equations", "Inequalities", "Algebraic Expressions", "Indices & Surds"],
  "Geometry": ["Circle Theorems", "Congruence & Similarity", "Loci & Constructions", "Pythagoras & Trigonometry", "Coordinate Geometry"],
  "Statistics & Probability": ["Mean/Median/Mode", "Frequency Distributions", "Probability", "Cumulative Frequency", "Box Plots"],
  "Matrices": ["Matrix Operations", "Inverse Matrices", "Transformations", "Solving Systems via Matrices"],
  "Progressions": ["Arithmetic Progressions", "Geometric Progressions", "Sum of Series", "Real-world AP/GP"],
  "Sets": ["Venn Diagrams", "Set Operations", "Word problems with sets"],
  "Graphs": ["Quadratic Graphs", "Linear Graphs", "Distance-Time Graphs", "Interpreting Graphs"],
  "Mensuration": ["Area & Perimeter", "Surface Area & Volume", "Sector & Arc", "Composite Shapes"],
  "Trigonometry": ["Sin/Cos/Tan ratios", "Elevation & Depression", "Sine & Cosine Rules", "Bearings"]
};

export const JUNIOR_TOPICS = {
  "Arithmetic": ["Fractions", "Decimals", "Percentages", "Ratios & Proportions", "Integers"],
  "Algebra": ["Simple Equations", "Patterns & Sequences", "Basic Expressions"],
  "Geometry": ["Angles", "Triangles & Quadrilaterals", "Basic Constructions", "Symmetry"],
  "Measurement": ["Length/Area/Perimeter", "Volume & Capacity", "Time"],
  "Statistics": ["Graphs & Charts", "Mean & Range", "Data Collection"],
  "Sets": ["Basic Set Notation", "Venn Diagrams"]
};

export const ALL_TOPICS_FLAT = [
  ...Object.values(OL_TOPICS).flat(),
  ...Object.values(JUNIOR_TOPICS).flat()
];

export const Q_TYPES = [
  { id: "short", icon: "⚡", label: "Short Answer", color: BLUE, defaultMarks: 2, defaultSubs: 0, desc: "Single-step — 1–3 marks" },
  { id: "mcq", icon: "🔘", label: "MCQ", color: PURPLE, defaultMarks: 2, defaultSubs: 0, desc: "Four options (A)–(D)" },
  { id: "structured", icon: "📋", label: "Structured", color: NAV, defaultMarks: 8, defaultSubs: 3, desc: "Multi-part — 6–12 marks" },
  { id: "essay", icon: "📝", label: "Essay / Proof", color: GOLD, defaultMarks: 10, defaultSubs: 0, desc: "Full analytical — 8–15 marks" },
  { id: "wordproblem", icon: "🏙", label: "Word Problem", color: SAGE, defaultMarks: 6, defaultSubs: 0, desc: "Real-life Sri Lankan context" },
  { id: "graph", icon: "📈", label: "Graph / Sketch", color: PINK, defaultMarks: 6, defaultSubs: 0, desc: "Plot or interpret a graph" },
  { id: "construction", icon: "📐", label: "Construction", color: ORANGE, defaultMarks: 7, defaultSubs: 0, desc: "Ruler & compass" }
];

export const DIFF_OPTIONS = [
  { id: "Foundation", color: SAGE },
  { id: "Standard", color: GOLD },
  { id: "Challenge", color: RED }
];

export const SECTION_COLORS = [NAV, GOLD, SAGE, RED, PURPLE, PINK, ORANGE, SLATE];

export const GRAPH_PRESETS = {
  quadratic: { a: 1, b: -2, c: -3, xMin: -3, xMax: 5, yMin: -5, yMax: 6 },
  linear: { m: 2, k: -1, xMin: -3, xMax: 4, yMin: -7, yMax: 7 },
  "distance-time": { pts: [[0,0],[1,40],[2,40],[3,80],[4,100]] },
  cumulative: { cf: [[10,2],[20,8],[30,18],[40,32],[50,42],[60,48],[70,50]] },
  histogram: { bars: [[0,10,5],[10,20,12],[20,30,18],[30,40,10],[40,50,5]] },
  "blank-grid": { xMin: -5, xMax: 5, yMin: -5, yMax: 5 },
  "box-plot": { data: { min: 15, q1: 30, med: 45, q3: 60, max: 80 } }
};

export const GRAPH_TYPES_LIST = Object.keys(GRAPH_PRESETS);

export const QUESTION_BANK = [
  { id: "qb1", type: "wordproblem", topic: "Hire Purchase", difficulty: "Standard", marks: 6,
    text: "Kamal wishes to buy a refrigerator priced at LKR 48 000. He can pay a deposit of 25% of the marked price and settle the balance in 18 equal monthly instalments with an interest rate of 12% per annum on the reducing balance.\n(a) Calculate the deposit amount. [1 mark]\n(b) Find the total amount paid under the hire-purchase scheme. [3 marks]\n(c) How much more does Kamal pay compared to the cash price? [2 marks]" },
  { id: "qb2", type: "structured", topic: "Circle Theorems", difficulty: "Challenge", marks: 8,
    text: "In the figure, O is the centre of the circle. Points A, B, C and D lie on the circle. Angle AOB = 112°.\n(a) Write down the value of the reflex angle AOB. [1 mark]\n(b) Find angle ADB, giving reasons. [2 marks]\n(c) If AB is a diameter and angle ACB = 36°, find angle CAB. [3 marks]\n(d) Prove that ABCD is a cyclic quadrilateral. [2 marks]" },
  { id: "qb3", type: "mcq", topic: "Set Operations", difficulty: "Foundation", marks: 2,
    text: "If A = {2, 4, 6, 8, 10} and B = {1, 2, 3, 4, 5}, then A ∩ B is equal to:\n(A) {2, 4}\n(B) {1, 2, 3, 4, 5, 6, 8, 10}\n(C) {6, 8, 10}\n(D) {1, 3, 5}" },
  { id: "qb4", type: "construction", topic: "Loci & Constructions", difficulty: "Standard", marks: 7,
    text: "Using a ruler and a pair of compasses only, construct the following:\n(a) A triangle PQR such that PQ = 8 cm, QR = 6 cm and PR = 7 cm. [2 marks]\n(b) The perpendicular bisector of PQ. [2 marks]\n(c) The bisector of angle QPR. [2 marks]\n(d) Mark the point X that lies on both bisectors. Measure and write down the distance PX. [1 mark]" },
  { id: "qb5", type: "graph", topic: "Cumulative Frequency", difficulty: "Standard", marks: 6,
    text: "The table below shows the marks scored by 50 students in a mathematics test.\nMark: 10–20, 20–30, 30–40, 40–50, 50–60, 60–70\nFrequency: 2, 6, 10, 14, 12, 6\n(a) Complete a cumulative frequency table for this data. [2 marks]\n(b) Draw a cumulative frequency curve. [2 marks]\nGRAPH_PLACEHOLDER:cumulative\n(c) Use your graph to estimate the median mark. [1 mark]\n(d) Find the number of students who scored more than 55 marks. [1 mark]" },
  { id: "qb6", type: "structured", topic: "Matrix Operations", difficulty: "Challenge", marks: 10,
    text: "A = (2  3; 1  4) and B = (5  -1; 2  3).\n(a) Find AB. [3 marks]\n(b) Find the determinant of A. [1 mark]\n(c) Find A⁻¹, the inverse of A. [2 marks]\n(d) Using A⁻¹, solve the simultaneous equations:\n    2x + 3y = 11\n    x + 4y = 10 [4 marks]" },
  { id: "qb7", type: "wordproblem", topic: "Simple & Compound Interest", difficulty: "Standard", marks: 6,
    text: "Sandya deposited LKR 75 000 in a bank for 3 years. The bank offers 8% per annum simple interest for the first year and 10% per annum compound interest for the remaining years.\n(a) Calculate the interest earned in the first year. [1 mark]\n(b) Find the total amount in the account at the end of 3 years. [4 marks]\n(c) Nimal deposited the same amount at 9% compound interest for 3 years. Who earned more interest? Show your working. [1 mark]" },
  { id: "qb8", type: "short", topic: "Arithmetic Progressions", difficulty: "Foundation", marks: 3,
    text: "The first three terms of an arithmetic progression are 7, 11, 15.\n(a) Write down the common difference. [1 mark]\n(b) Find the 20th term. [1 mark]\n(c) Find the sum of the first 20 terms. [1 mark]" },
  { id: "qb9", type: "graph", topic: "Quadratic Graphs", difficulty: "Standard", marks: 8,
    text: "Consider the function y = x² − 2x − 3.\n(a) Complete the table of values for −2 ≤ x ≤ 4:\nGRAPH_PLACEHOLDER:quadratic\n(b) Using your graph, write down the minimum value of y. [1 mark]\n(c) Solve x² − 2x − 3 = 0 using your graph. [2 marks]\n(d) On the same axes, draw the line y = x + 1 and hence solve x² − 3x − 4 = 0. [3 marks]" },
  { id: "qb10", type: "structured", topic: "Sine & Cosine Rules", difficulty: "Challenge", marks: 9,
    text: "In triangle ABC, AB = 9 cm, BC = 7 cm and angle ABC = 64°.\n(a) Calculate AC, giving your answer correct to 3 significant figures. [3 marks]\n(b) Find the area of triangle ABC. [2 marks]\n(c) Priya stands at point P which is equidistant from A and C. The bearing of A from P is 035°. Find the bearing of C from P, given that P lies to the south of AC. [4 marks]" }
];

export function GraphCanvas({ type, params = {}, width = 380, height = 280 }) {
  const canvasRef = useRef(null);
  const p = { ...GRAPH_PRESETS[type], ...params };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = "#fafaf8";
    ctx.fillRect(0, 0, width, height);

    const pad = { top: 30, bottom: 50, left: 50, right: 20 };
    const W = width - pad.left - pad.right;
    const H = height - pad.top - pad.bottom;

    function toX(v, min, max) { return pad.left + ((v - min) / (max - min)) * W; }
    function toY(v, min, max) { return pad.top + ((max - v) / (max - min)) * H; }

    function drawAxes(xMin, xMax, yMin, yMax, xLabel = "x", yLabel = "y") {
      ctx.strokeStyle = "#888"; ctx.lineWidth = 0.5;
      const xStep = Math.ceil((xMax - xMin) / 8);
      const yStep = Math.ceil((yMax - yMin) / 6);
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        ctx.beginPath(); ctx.moveTo(toX(x, xMin, xMax), pad.top); ctx.lineTo(toX(x, xMin, xMax), pad.top + H); ctx.stroke();
      }
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        ctx.beginPath(); ctx.moveTo(pad.left, toY(y, yMin, yMax)); ctx.lineTo(pad.left + W, toY(y, yMin, yMax)); ctx.stroke();
      }
      ctx.strokeStyle = "#333"; ctx.lineWidth = 1.5;
      const ox = Math.max(xMin, Math.min(xMax, 0));
      const oy = Math.max(yMin, Math.min(yMax, 0));
      ctx.beginPath(); ctx.moveTo(pad.left, toY(oy, yMin, yMax)); ctx.lineTo(pad.left + W + 10, toY(oy, yMin, yMax)); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(toX(ox, xMin, xMax), pad.top + H + 5); ctx.lineTo(toX(ox, xMin, xMax), pad.top - 5); ctx.stroke();
      const ax = pad.left + W + 10, ay = toY(oy, yMin, yMax);
      ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(ax - 7, ay - 4); ctx.lineTo(ax - 7, ay + 4); ctx.fill();
      const bx = toX(ox, xMin, xMax), by = pad.top - 5;
      ctx.beginPath(); ctx.moveTo(bx, by); ctx.lineTo(bx - 4, by + 8); ctx.lineTo(bx + 4, by + 8); ctx.fill();
      ctx.fillStyle = "#555"; ctx.font = "10px " + SANS; ctx.textAlign = "center";
      for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) {
        if (x !== 0) ctx.fillText(x, toX(x, xMin, xMax), toY(oy, yMin, yMax) + 14);
      }
      ctx.textAlign = "right";
      for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) {
        if (y !== 0) ctx.fillText(y, toX(ox, xMin, xMax) - 5, toY(y, yMin, yMax) + 4);
      }
      ctx.font = "italic 11px " + SERIF; ctx.fillStyle = "#333"; ctx.textAlign = "center";
      ctx.fillText(xLabel, pad.left + W + 14, toY(oy, yMin, yMax) - 8);
      ctx.fillText(yLabel, toX(ox, xMin, xMax) + 10, pad.top - 10);
    }

    if (type === "quadratic") {
      const { a, b, c, xMin, xMax, yMin, yMax } = p;
      drawAxes(xMin, xMax, yMin, yMax);
      ctx.strokeStyle = NAV; ctx.lineWidth = 2; ctx.beginPath();
      let first = true;
      for (let px2 = 0; px2 <= W; px2++) {
        const xv = xMin + (px2 / W) * (xMax - xMin);
        const yv = a * xv * xv + b * xv + c;
        const cx2 = pad.left + px2, cy = toY(yv, yMin, yMax);
        if (first) { ctx.moveTo(cx2, cy); first = false; } else ctx.lineTo(cx2, cy);
      }
      ctx.stroke();
      const vx = -b / (2 * a), vy = a * vx * vx + b * vx + c;
      ctx.fillStyle = RED; ctx.beginPath(); ctx.arc(toX(vx, xMin, xMax), toY(vy, yMin, yMax), 4, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#333"; ctx.font = "10px " + SANS; ctx.textAlign = "left";
      ctx.fillText("(" + vx.toFixed(1) + ", " + vy.toFixed(1) + ")", toX(vx, xMin, xMax) + 5, toY(vy, yMin, yMax) - 5);
      const disc = b * b - 4 * a * c;
      if (disc >= 0) {
        const r1 = (-b - Math.sqrt(disc)) / (2 * a), r2 = (-b + Math.sqrt(disc)) / (2 * a);
        [r1, r2].forEach(r => {
          ctx.fillStyle = SAGE; ctx.beginPath(); ctx.arc(toX(r, xMin, xMax), toY(0, yMin, yMax), 4, 0, Math.PI * 2); ctx.fill();
        });
      }
      ctx.fillStyle = "#333"; ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("y = " + a + "x\u00B2 " + (b >= 0 ? "+" : "") + b + "x " + (c >= 0 ? "+" : "") + c, pad.left + W / 2, height - 8);
    } else if (type === "linear") {
      const { m, k, xMin, xMax, yMin, yMax } = p;
      drawAxes(xMin, xMax, yMin, yMax);
      ctx.strokeStyle = BLUE; ctx.lineWidth = 2; ctx.beginPath();
      ctx.moveTo(pad.left, toY(m * xMin + k, yMin, yMax));
      ctx.lineTo(pad.left + W, toY(m * xMax + k, yMin, yMax));
      ctx.stroke();
      ctx.fillStyle = "#333"; ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("y = " + m + "x " + (k >= 0 ? "+" : "") + k, pad.left + W / 2, height - 8);
    } else if (type === "distance-time") {
      const { pts } = p;
      const ts = pts.map(p2 => p2[0]), ds = pts.map(p2 => p2[1]);
      const tMax = Math.max(...ts), dMax = Math.max(...ds);
      drawAxes(0, tMax, 0, dMax * 1.1, "t (h)", "d (km)");
      ctx.strokeStyle = NAV; ctx.lineWidth = 2; ctx.beginPath();
      pts.forEach(([t, d], i) => {
        const x2 = toX(t, 0, tMax), y2 = toY(d, 0, dMax * 1.1);
        i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      });
      ctx.stroke();
      ctx.fillStyle = RED;
      pts.forEach(([t, d]) => {
        const x2 = toX(t, 0, tMax), y2 = toY(d, 0, dMax * 1.1);
        ctx.beginPath(); ctx.arc(x2, y2, 4, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = "#333"; ctx.font = "9px " + SANS; ctx.textAlign = "left";
        ctx.fillText("(" + t + "," + d + ")", x2 + 4, y2 - 3);
        ctx.fillStyle = RED;
      });
      ctx.fillStyle = "#333"; ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("Distance\u2013Time Graph", pad.left + W / 2, height - 8);
    } else if (type === "cumulative") {
      const { cf } = p;
      const vals = cf.map(r => r[0]), cfs = cf.map(r => r[1]);
      const vMax = Math.max(...vals), cfMax = Math.max(...cfs);
      drawAxes(0, vMax, 0, cfMax * 1.05, "Mark", "Cum. Freq.");
      ctx.strokeStyle = NAV; ctx.lineWidth = 2; ctx.beginPath();
      cf.forEach(([v, f], i) => {
        const x2 = toX(v, 0, vMax), y2 = toY(f, 0, cfMax * 1.05);
        i === 0 ? ctx.moveTo(x2, y2) : ctx.lineTo(x2, y2);
      });
      ctx.stroke();
      const med = cfMax / 2;
      ctx.strokeStyle = RED; ctx.lineWidth = 1; ctx.setLineDash([4, 3]);
      ctx.beginPath();
      ctx.moveTo(pad.left, toY(med, 0, cfMax * 1.05));
      ctx.lineTo(pad.left + W, toY(med, 0, cfMax * 1.05));
      ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = "#333"; ctx.font = "9px " + SANS; ctx.textAlign = "left";
      ctx.fillText("Median", pad.left + 3, toY(med, 0, cfMax * 1.05) - 3);
      ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("Cumulative Frequency Curve", pad.left + W / 2, height - 8);
    } else if (type === "histogram") {
      const { bars } = p;
      const allMax = Math.max(...bars.map(b2 => b2[2]));
      const xMin2 = bars[0][0], xMax2 = bars[bars.length - 1][1];
      drawAxes(xMin2, xMax2, 0, allMax * 1.15, "Class", "Frequency");
      ctx.fillStyle = SLATE + "55";
      bars.forEach(([lo, hi, freq]) => {
        const x1 = toX(lo, xMin2, xMax2), x2 = toX(hi, xMin2, xMax2);
        const y1 = toY(freq, 0, allMax * 1.15), y2 = toY(0, 0, allMax * 1.15);
        ctx.fillRect(x1, y1, x2 - x1, y2 - y1);
        ctx.strokeStyle = NAV; ctx.lineWidth = 1; ctx.strokeRect(x1, y1, x2 - x1, y2 - y1);
        ctx.fillStyle = "#333"; ctx.font = "9px " + SANS; ctx.textAlign = "center";
        ctx.fillText(freq, (x1 + x2) / 2, y1 - 3);
        ctx.fillStyle = SLATE + "55";
      });
      ctx.fillStyle = "#333"; ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("Histogram", pad.left + W / 2, height - 8);
    } else if (type === "blank-grid") {
      const { xMin, xMax, yMin, yMax } = p;
      drawAxes(xMin, xMax, yMin, yMax);
      ctx.fillStyle = "#aaa"; ctx.font = "12px " + SANS; ctx.textAlign = "center";
      ctx.fillText("(Plot your answer here)", pad.left + W / 2, pad.top + H / 2);
    } else if (type === "box-plot") {
      const { min, q1, med, q3, max } = p.data;
      const scale = { min: min - 5, max: max + 5 };
      const y = pad.top + H / 2;
      const bh = 40;
      function bx(v) { return toX(v, scale.min, scale.max); }
      ctx.strokeStyle = "#ccc"; ctx.lineWidth = 0.5;
      for (let i = scale.min; i <= scale.max; i += 10) {
        ctx.beginPath(); ctx.moveTo(bx(i), pad.top); ctx.lineTo(bx(i), pad.top + H - 20); ctx.stroke();
      }
      ctx.strokeStyle = NAV; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(bx(min), y); ctx.lineTo(bx(q1), y); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(bx(q3), y); ctx.lineTo(bx(max), y); ctx.stroke();
      ctx.fillStyle = SLATE + "44";
      ctx.fillRect(bx(q1), y - bh / 2, bx(q3) - bx(q1), bh);
      ctx.strokeRect(bx(q1), y - bh / 2, bx(q3) - bx(q1), bh);
      ctx.strokeStyle = RED; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(bx(med), y - bh / 2); ctx.lineTo(bx(med), y + bh / 2); ctx.stroke();
      [[min,"Min"],[q1,"Q1"],[med,"Med"],[q3,"Q3"],[max,"Max"]].forEach(([v, lbl]) => {
        ctx.fillStyle = "#333"; ctx.font = "9px " + SANS; ctx.textAlign = "center";
        ctx.fillText(lbl, bx(v), y - bh / 2 - 8);
        ctx.fillText(v, bx(v), y + bh / 2 + 14);
      });
      ctx.strokeStyle = NAV; ctx.lineWidth = 1.5;
      [[min],[max]].forEach(([v]) => {
        ctx.beginPath(); ctx.moveTo(bx(v), y - 10); ctx.lineTo(bx(v), y + 10); ctx.stroke();
      });
      ctx.fillStyle = "#333"; ctx.font = "11px " + SERIF; ctx.textAlign = "center";
      ctx.fillText("Box-and-Whisker Plot", pad.left + W / 2, height - 8);
    }
  }, [type, width, height]);

  return <canvas ref={canvasRef} width={width} height={height} style={{ display: "block", borderRadius: 4 }} />;
}

export function GraphModal({ onClose }) {
  const [sel, setSel] = useState("quadratic");
  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 480, maxWidth: "95vw", maxHeight: "90vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: NAV, borderRadius: "12px 12px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span style={{ color: "#fff", fontFamily: SERIF, fontSize: 16, fontWeight: "bold" }}>📈 Graph Type Preview</span>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ padding: 20 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
            {GRAPH_TYPES_LIST.map(g => (
              <button key={g} onClick={() => setSel(g)} style={{ padding: "5px 12px", borderRadius: 20, border: "2px solid " + (sel === g ? PINK : BORDER), background: sel === g ? PINK + "15" : "#fff", color: sel === g ? PINK : "#555", fontFamily: SANS, fontSize: 12, cursor: "pointer", fontWeight: sel === g ? 600 : 400 }}>{g}</button>
            ))}
          </div>
          <div style={{ background: "#f8f8f6", border: "1px solid " + BORDER, borderRadius: 8, padding: 12, display: "flex", justifyContent: "center" }}>
            <GraphCanvas type={sel} width={400} height={280} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   ScanCropTool — FIXED
   - Added explicit Scroll / Crop mode toggle so the page/image
     can be scrolled normally on mobile without triggering a crop.
   - Cropping (pointer-down/move/up handlers) now only runs while
     "Crop Mode" is active.
   - Calls onClose() after "Insert into Paper" so the modal closes
     automatically instead of staying open.
   ============================================================ */
export function ScanCropTool({ onInsert, targetSection, onClose }) {
  const [imgSrc, setImgSrc] = useState(null);
  const [crops, setCrops] = useState([]);
  const [cropMode, setCropMode] = useState(false); // false = scroll/pan, true = draw crop box
  const [dragStart, setDragStart] = useState(null);
  const [dragRect, setDragRect] = useState(null);
  const imgRef = useRef(null);
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);

  function handleFile(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { setImgSrc(ev.target.result); setCrops([]); setCropMode(false); };
    reader.readAsDataURL(file);
  }

  function getPointerPos(e) {
    const rect = containerRef.current.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: Math.max(0, Math.min(rect.width, clientX - rect.left)),
      y: Math.max(0, Math.min(rect.height, clientY - rect.top))
    };
  }

  function handlePointerDown(e) {
    if (!cropMode) return; // let native scrolling happen
    e.preventDefault();
    const pos = getPointerPos(e);
    setDragStart(pos);
    setDragRect({ x: pos.x, y: pos.y, w: 0, h: 0 });
  }
  function handlePointerMove(e) {
    if (!cropMode || !dragStart) return;
    e.preventDefault();
    const pos = getPointerPos(e);
    setDragRect({ x: Math.min(dragStart.x, pos.x), y: Math.min(dragStart.y, pos.y), w: Math.abs(pos.x - dragStart.x), h: Math.abs(pos.y - dragStart.y) });
  }
  function handlePointerUp() {
    if (!cropMode) return;
    if (dragRect && dragRect.w > 14 && dragRect.h > 14) {
      const img = imgRef.current;
      if (img) {
        const scaleX = img.naturalWidth / img.clientWidth;
        const scaleY = img.naturalHeight / img.clientHeight;
        const canvas = document.createElement("canvas");
        canvas.width = dragRect.w * scaleX; canvas.height = dragRect.h * scaleY;
        canvas.getContext("2d").drawImage(img, dragRect.x * scaleX, dragRect.y * scaleY, canvas.width, canvas.height, 0, 0, canvas.width, canvas.height);
        const dataUrl = canvas.toDataURL("image/png");
        setCrops(prev => [...prev, { id: "crop" + Date.now(), x: dragRect.x, y: dragRect.y, w: dragRect.w, h: dragRect.h, dataUrl, marks: 4, type: "short", difficulty: "Standard" }]);
      }
    }
    setDragStart(null); setDragRect(null);
  }

  function handleInsertCrop(c) {
    onInsert({ type: c.type, marks: c.marks, topic: "", difficulty: c.difficulty, text: "[Cropped image question]", isOwn: true, ownText: "[CROPPED_IMAGE_QUESTION]", imageDataUrl: c.dataUrl }, targetSection);
    if (onClose) onClose();
  }

  return (
    <>
      <div style={{ background: "#FFFBEB", border: "1px solid " + GOLD + "44", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12, color: "#92400E", fontFamily: SANS, lineHeight: 1.6 }}>
        📷 Upload a photo or scan of an existing paper, then switch to Crop Mode to select each question.
      </div>
      {!imgSrc ? (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "32px 20px", border: "2px dashed " + BORDER, borderRadius: 8, color: "#888", fontFamily: SANS, fontSize: 13 }}>
          <span style={{ fontSize: 30, marginBottom: 10 }}>🖼</span>
          <span style={{ marginBottom: 14 }}>Choose a photo or scan of the paper</span>
          <input ref={fileInputRef} type="file" accept="image/*" onChange={handleFile} style={{ display: "none" }} />
          <button onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ padding: "12px 24px", background: NAV, color: "#fff", border: "none", borderRadius: 7, fontFamily: SANS, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>📁 Open Gallery / Files</button>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
            <button
              onClick={() => setCropMode(false)}
              style={{ flex: 1, padding: "9px 10px", borderRadius: 7, border: "2px solid " + (!cropMode ? NAV : BORDER), background: !cropMode ? NAV + "12" : "#fff", color: !cropMode ? NAV : "#666", fontFamily: SANS, fontSize: 12, fontWeight: !cropMode ? 700 : 500, cursor: "pointer" }}
            >✋ Scroll Image</button>
            <button
              onClick={() => setCropMode(true)}
              style={{ flex: 1, padding: "9px 10px", borderRadius: 7, border: "2px solid " + (cropMode ? PINK : BORDER), background: cropMode ? PINK + "12" : "#fff", color: cropMode ? PINK : "#666", fontFamily: SANS, fontSize: 12, fontWeight: cropMode ? 700 : 500, cursor: "pointer" }}
            >✂️ Crop Mode</button>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontFamily: SANS, fontSize: 11, color: "#888" }}>
              {cropMode ? "Drag a box around a question to crop it." : "Scroll normally to view the page. Tap “Crop Mode” when ready to select a question."}
            </span>
            <button onClick={() => { setImgSrc(null); setCrops([]); setCropMode(false); }} style={{ background: "none", border: "1px solid " + BORDER, borderRadius: 6, padding: "4px 10px", fontFamily: SANS, fontSize: 11, color: "#666", cursor: "pointer", flexShrink: 0, marginLeft: 8 }}>Change image</button>
          </div>
          <div
            ref={containerRef}
            style={{
              position: "relative",
              display: "inline-block",
              maxWidth: "100%",
              border: "1px solid " + BORDER,
              borderRadius: 6,
              overflow: cropMode ? "hidden" : "auto",
              maxHeight: cropMode ? "none" : "70vh",
              cursor: cropMode ? "crosshair" : "default",
              touchAction: cropMode ? "none" : "pan-y"
            }}
            onMouseDown={handlePointerDown} onMouseMove={handlePointerMove} onMouseUp={handlePointerUp}
            onMouseLeave={() => { if (dragStart) handlePointerUp(); }}
            onTouchStart={handlePointerDown} onTouchMove={handlePointerMove} onTouchEnd={handlePointerUp}
          >
            <img ref={imgRef} src={imgSrc} alt="Uploaded paper" style={{ display: "block", maxWidth: "100%", userSelect: "none", pointerEvents: "none" }} draggable={false} />
            {crops.map(c => <div key={c.id} style={{ position: "absolute", left: c.x, top: c.y, width: c.w, height: c.h, border: "2px solid " + SAGE, background: SAGE + "18", pointerEvents: "none" }} />)}
            {dragRect && <div style={{ position: "absolute", left: dragRect.x, top: dragRect.y, width: dragRect.w, height: dragRect.h, border: "2px dashed " + PINK, background: PINK + "18", pointerEvents: "none" }} />}
          </div>
          {crops.length > 0 && (
            <div style={{ marginTop: 16, display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ fontFamily: SANS, fontSize: 12, fontWeight: 700, color: "#888", textTransform: "uppercase" }}>{crops.length} cropped question{crops.length !== 1 ? "s" : ""}</div>
              {crops.map((c, i) => (
                <div key={c.id} style={{ border: "1px solid " + BORDER, borderRadius: 8, padding: 12, display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <img src={c.dataUrl} alt={"Crop " + (i+1)} style={{ width: 110, height: "auto", border: "1px solid " + BORDER, borderRadius: 4, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 180 }}>
                    <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                      <div><label style={{ fontFamily: SANS, fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>Marks</label><input type="number" value={c.marks} onChange={e => setCrops(prev => prev.map(x => x.id === c.id ? { ...x, marks: +e.target.value } : x))} min={1} style={{ padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, width: 60 }} /></div>
                      <div><label style={{ fontFamily: SANS, fontSize: 11, color: "#666", display: "block", marginBottom: 4 }}>Type</label><select value={c.type} onChange={e => setCrops(prev => prev.map(x => x.id === c.id ? { ...x, type: e.target.value } : x))} style={{ padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, background: "#fff" }}>{Q_TYPES.map(qt => <option key={qt.id} value={qt.id}>{qt.icon} {qt.label}</option>)}</select></div>
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => handleInsertCrop(c)} style={{ padding: "6px 14px", background: SAGE, color: "#fff", border: "none", borderRadius: 6, fontFamily: SANS, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+ Insert into Paper</button>
                      <button onClick={() => setCrops(prev => prev.filter(x => x.id !== c.id))} style={{ padding: "6px 12px", background: "#fff", border: "1px solid " + RED, color: RED, borderRadius: 6, fontFamily: SANS, fontSize: 12, cursor: "pointer" }}>Discard</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
}

export function QuestionBankModal({ onInsert, onClose, targetSection }) {
  const [tab, setTab] = useState(0);
  const [typeFilter, setTypeFilter] = useState("all");
  const [diffFilter, setDiffFilter] = useState("all");
  const [pasteText, setPasteText] = useState("");
  const [pasteMarks, setPasteMarks] = useState(2);
  const [pasteType, setPasteType] = useState("short");
  const [uploadQuestions, setUploadQuestions] = useState([]);
  const [uploadMarks, setUploadMarks] = useState({});
  const txtFileInputRef = useRef(null);

  const filtered = QUESTION_BANK.filter(q =>
    (typeFilter === "all" || q.type === typeFilter) &&
    (diffFilter === "all" || q.difficulty === diffFilter)
  );

  function handleUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => {
      const lines = ev.target.result.split(/\n\n+/).map(s => s.trim()).filter(Boolean);
      setUploadQuestions(lines);
      setUploadMarks(Object.fromEntries(lines.map((_, i) => [i, 2])));
    };
    reader.readAsText(file);
  }

  const tabs = ["📖 Library", "✍ Write", "📂 .txt", "📷 Scan"];
  const iSty = { padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, color: "#222", outline: "none", boxSizing: "border-box" };
  const sSty = { padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, color: "#222", background: "#fff", cursor: "pointer" };

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.55)", zIndex: 900, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ background: "#fff", borderRadius: 12, width: 680, maxWidth: "95vw", maxHeight: "88vh", overflow: "auto", boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}>
        <div style={{ background: NAV, borderRadius: "12px 12px 0 0", padding: "16px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ color: "#fff", fontFamily: SERIF, fontSize: 17, fontWeight: "bold" }}>📚 Question Bank & Import</div>
            <div style={{ color: "#A8BCCF", fontSize: 11, fontFamily: SANS }}>Add existing questions or write your own</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", color: "#fff", fontSize: 22, cursor: "pointer" }}>×</button>
        </div>
        <div style={{ display: "flex", borderBottom: "1px solid " + BORDER, overflowX: "auto" }}>
          {tabs.map((t, i) => (
            <button key={i} onClick={() => setTab(i)} style={{ flex: "1 0 auto", minWidth: 70, padding: "10px 6px", border: "none", borderBottom: tab === i ? "3px solid " + NAV : "3px solid transparent", background: "#fff", fontFamily: SANS, fontSize: 11, cursor: "pointer", color: tab === i ? NAV : "#666", fontWeight: tab === i ? 600 : 400, whiteSpace: "nowrap" }}>{t}</button>
          ))}
        </div>
        <div style={{ padding: 20 }}>
          {tab === 0 && (
            <>
              <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
                <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} style={sSty}>
                  <option value="all">All Types</option>
                  {Q_TYPES.map(qt => <option key={qt.id} value={qt.id}>{qt.icon} {qt.label}</option>)}
                </select>
                <select value={diffFilter} onChange={e => setDiffFilter(e.target.value)} style={sSty}>
                  <option value="all">All Difficulties</option>
                  {DIFF_OPTIONS.map(d => <option key={d.id} value={d.id}>{d.id}</option>)}
                </select>
              </div>
              <div style={{ fontSize: 11, color: "#888", fontFamily: SANS, marginBottom: 12 }}>{filtered.length} question{filtered.length !== 1 ? "s" : ""}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {filtered.map(q => {
                  const qt = Q_TYPES.find(t => t.id === q.type);
                  const df = DIFF_OPTIONS.find(d => d.id === q.difficulty);
                  return (
                    <div key={q.id} style={{ border: "1px solid " + BORDER, borderRadius: 8, padding: 14, background: "#fafaf8" }}>
                      <div style={{ display: "flex", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
                        <span style={{ background: qt?.color + "18", color: qt?.color, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontFamily: SANS, fontWeight: 600 }}>{qt?.icon} {qt?.label}</span>
                        <span style={{ background: df?.color + "18", color: df?.color, padding: "2px 8px", borderRadius: 20, fontSize: 11, fontFamily: SANS, fontWeight: 600 }}>{q.difficulty}</span>
                        <span style={{ background: "#f0f0f0", color: "#555", padding: "2px 8px", borderRadius: 20, fontSize: 11, fontFamily: SANS }}>{q.topic}</span>
                        <span style={{ marginLeft: "auto", color: NAV, fontFamily: SERIF, fontWeight: 700, fontSize: 13 }}>[{q.marks} marks]</span>
                      </div>
                      <pre style={{ fontFamily: SERIF, fontSize: 13, lineHeight: 1.7, whiteSpace: "pre-wrap", margin: 0, color: "#222" }}>{q.text.replace(/GRAPH_PLACEHOLDER:\w+/g, "[Graph diagram]")}</pre>
                      <button onClick={() => { onInsert({ ...q }, targetSection); onClose(); }} style={{ marginTop: 10, padding: "6px 14px", background: SAGE, color: "#fff", border: "none", borderRadius: 6, fontFamily: SANS, fontSize: 12, cursor: "pointer", fontWeight: 600 }}>+ Insert into Paper</button>
                    </div>
                  );
                })}
              </div>
            </>
          )}
          {tab === 1 && (
            <>
              <div style={{ background: "#EFF6FF", border: "1px solid " + BLUE + "44", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12, color: BLUE, fontFamily: SANS }}>
                ℹ Paste your exact question text below. It will be inserted verbatim.
              </div>
              <textarea value={pasteText} onChange={e => setPasteText(e.target.value)} placeholder="Type or paste your question here..." style={{ ...iSty, width: "100%", minHeight: 120, fontFamily: SERIF, fontSize: 13, resize: "vertical" }} />
              <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                <input type="number" value={pasteMarks} onChange={e => setPasteMarks(+e.target.value)} min={1} style={{ ...iSty, width: 70 }} placeholder="Marks" />
                <select value={pasteType} onChange={e => setPasteType(e.target.value)} style={{ ...sSty, flex: 1 }}>
                  {Q_TYPES.map(qt => <option key={qt.id} value={qt.id}>{qt.icon} {qt.label}</option>)}
                </select>
              </div>
              <button disabled={!pasteText.trim()} onClick={() => { onInsert({ type: pasteType, marks: pasteMarks, topic: "", difficulty: "Standard", text: pasteText, isOwn: true, ownText: pasteText }, targetSection); onClose(); }} style={{ marginTop: 12, padding: "8px 18px", background: pasteText.trim() ? NAV : "#ccc", color: "#fff", border: "none", borderRadius: 6, fontFamily: SANS, fontSize: 13, cursor: pasteText.trim() ? "pointer" : "not-allowed", fontWeight: 600 }}>+ Insert Question</button>
            </>
          )}
          {tab === 2 && (
            <>
              <div style={{ background: "#FFFBEB", border: "1px solid " + GOLD + "44", borderRadius: 8, padding: 12, marginBottom: 14, fontSize: 12, color: "#92400E", fontFamily: SANS }}>
                ⚠ Upload a .txt file with questions separated by blank lines.
              </div>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "24px 20px", border: "2px dashed " + BORDER, borderRadius: 8, color: "#888", fontFamily: SANS, fontSize: 13 }}>
                <span style={{ fontSize: 28, marginBottom: 8 }}>📄</span>
                <span style={{ marginBottom: 12 }}>Choose a .txt file from your device</span>
                <input ref={txtFileInputRef} type="file" accept=".txt,text/plain" onChange={handleUpload} style={{ display: "none" }} />
                <button onClick={() => txtFileInputRef.current && txtFileInputRef.current.click()} style={{ padding: "10px 22px", background: NAV, color: "#fff", border: "none", borderRadius: 7, fontFamily: SANS, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>📁 Open Files</button>
              </div>
              {uploadQuestions.length > 0 && (
                <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 10 }}>
                  {uploadQuestions.map((q, i) => (
                    <div key={i} style={{ border: "1px solid " + BORDER, borderRadius: 8, padding: 12 }}>
                      <pre style={{ fontFamily: SERIF, fontSize: 12, whiteSpace: "pre-wrap", margin: "0 0 8px 0" }}>{q.slice(0, 200)}{q.length > 200 ? "…" : ""}</pre>
                      <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                        <label style={{ fontFamily: SANS, fontSize: 11, color: "#666" }}>Marks:</label>
                        <input type="number" value={uploadMarks[i] || 2} onChange={e => setUploadMarks(m => ({ ...m, [i]: +e.target.value }))} style={{ ...iSty, width: 55 }} min={1} />
                        <button onClick={() => { onInsert({ type: "short", marks: uploadMarks[i] || 2, topic: "", difficulty: "Standard", text: q, isOwn: true, ownText: q }, targetSection); onClose(); }} style={{ padding: "5px 12px", background: SAGE, color: "#fff", border: "none", borderRadius: 6, fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>+ Insert</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
          {tab === 3 && (
            <ScanCropTool onInsert={onInsert} targetSection={targetSection} onClose={onClose} />
          )}
        </div>
      </div>
    </div>
  );
}

export function SavedPapersPanel({ getConfig, onLoad }) {
  const [name, setName] = useState("");
  const [saved, setSaved] = useState([]);
  const [msg, setMsg] = useState(null);

  async function loadList() {
    try {
      const res = await window.storage.list("paper:");
      const items = [];
      for (const key of (res?.keys || [])) {
        try {
          const item = await window.storage.get(key);
          if (item?.value) items.push({ key, ...JSON.parse(item.value) });
        } catch {}
      }
      items.sort((a, b) => b.savedAt - a.savedAt);
      setSaved(items);
    } catch {}
  }

  useEffect(() => { loadList(); }, []);

  async function handleSave() {
    if (!name.trim()) return;
    try {
      const config = getConfig();
      await window.storage.set("paper:" + Date.now(), JSON.stringify({ name: name.trim(), savedAt: Date.now(), config }));
      setMsg({ type: "ok", text: '"' + name.trim() + '" saved!' });
      setName(""); loadList();
    } catch { setMsg({ type: "err", text: "Save failed." }); }
    setTimeout(() => setMsg(null), 3000);
  }

  async function handleDelete(key) {
    try { await window.storage.delete(key); loadList(); } catch {}
  }

  const iSty = { padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, color: "#222", outline: "none", boxSizing: "border-box" };
  const cSty = { background: "#fff", borderRadius: 10, border: "1px solid " + BORDER, boxShadow: "0 2px 8px rgba(0,0,0,0.055)", padding: "20px", marginBottom: 18 };

  return (
    <div style={cSty}>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
        <span style={{ fontSize: 16 }}>💾</span>
        <div>
          <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: "bold", color: NAV }}>Saved Papers</div>
          <div style={{ fontFamily: SANS, fontSize: 11, color: "#888" }}>Save your current setup and reload it any time</div>
        </div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <input value={name} onChange={e => setName(e.target.value)} onKeyDown={e => e.key === "Enter" && handleSave()} placeholder="Name this paper…" style={{ ...iSty, flex: 1 }} />
        <button onClick={handleSave} style={{ background: NAV, color: CREAM, border: "none", borderRadius: 7, fontFamily: SERIF, fontSize: 13, fontWeight: "bold", cursor: "pointer", padding: "7px 14px" }}>Save</button>
      </div>
      {msg && <div style={{ marginTop: 8, padding: "6px 10px", borderRadius: 6, background: msg.type === "ok" ? SAGE + "18" : RED + "18", color: msg.type === "ok" ? SAGE : RED, fontSize: 12, fontFamily: SANS }}>{msg.text}</div>}
      {saved.length > 0 && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
          {saved.map(s => (
            <div key={s.key} style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 10px", background: BG, borderRadius: 6 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: NAV }}>{s.name}</div>
                <div style={{ fontFamily: SANS, fontSize: 10, color: "#888" }}>{new Date(s.savedAt).toLocaleString()}</div>
              </div>
              <button onClick={() => onLoad(s.config)} style={{ padding: "4px 10px", background: NAV, color: "#fff", border: "none", borderRadius: 5, fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>Load</button>
              <button onClick={() => handleDelete(s.key)} style={{ padding: "4px 8px", background: "#fff", color: RED, border: "1px solid " + RED, borderRadius: 5, fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>✕</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export const cardStyle = { background: "#fff", borderRadius: 10, border: "1px solid " + BORDER, boxShadow: "0 2px 8px rgba(0,0,0,0.055)", padding: "20px", marginBottom: 18 };
export const inputStyle = { padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, color: "#222", outline: "none", boxSizing: "border-box" };
export const selectStyle = { padding: "8px 11px", border: "1px solid " + BORDER, borderRadius: 6, fontFamily: SANS, fontSize: 13, color: "#222", background: "#fff", cursor: "pointer" };
export const btnPrimary = { background: NAV, color: CREAM, border: "none", borderRadius: 7, fontFamily: SERIF, fontSize: 14, fontWeight: "bold", cursor: "pointer", padding: "10px 20px" };
export const labelSty = { fontFamily: SANS, fontSize: 11, color: "#666", display: "block", marginBottom: 4 };

export function SectionHeader({ n, title, sub }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 14 }}>
      <div style={{ width: 24, height: 24, background: typeof n === "number" ? NAV : "transparent", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontFamily: SANS, fontSize: 12, fontWeight: "bold", flexShrink: 0 }}>
        {typeof n === "number" ? n : <span style={{ fontSize: 16 }}>{n}</span>}
      </div>
      <div>
        <div style={{ fontFamily: SANS, fontSize: 14, fontWeight: "bold", color: NAV }}>{title}</div>
        {sub && <div style={{ fontFamily: SANS, fontSize: 11, color: "#888" }}>{sub}</div>}
      </div>
    </div>
  );
}

export function ToggleBtn({ active, onClick, children, activeColor = NAV, style: extraStyle = {} }) {
  return (
    <button onClick={onClick} style={{ border: "2px solid " + (active ? activeColor : BORDER), background: active ? activeColor + "12" : "#fff", color: active ? activeColor : "#666", borderRadius: 8, padding: "8px 14px", fontFamily: SANS, fontSize: 13, cursor: "pointer", fontWeight: active ? 600 : 400, transition: "all 0.15s", ...extraStyle }}>{children}</button>
  );
}

export function PaperOutput({ text, meta, imageMap = {} }) {
  function parseSegments(raw) {
    const parts = raw.split(/(GRAPH_PLACEHOLDER:\S+|CROPPED_IMAGE_PLACEHOLDER:\S+)/g);
    return parts.map(p2 => {
      const gm = p2.match(/^GRAPH_PLACEHOLDER:(\S+)$/);
      if (gm) return { type: "graph", graphType: gm[1] };
      const im = p2.match(/^CROPPED_IMAGE_PLACEHOLDER:(\S+)$/);
      if (im) return { type: "image", imageId: im[1] };
      return { type: "text", content: p2 };
    });
  }
  function copyText() { navigator.clipboard.writeText(text); }
  function printPDF() {
    const w = window.open("", "_blank");
    const clean = text
      .replace(/GRAPH_PLACEHOLDER:(\S+)/g, (_, t) => "\n[Graph: " + t + " — see digital version]\n")
      .replace(/CROPPED_IMAGE_PLACEHOLDER:(\S+)/g, () => "\n[Teacher-provided image question]\n");
    w.document.write("<html><head><title>" + (meta.title||"Exam Paper") + "</title><style>body{font-family:Georgia,serif;font-size:14px;line-height:2;max-width:720px;margin:40px auto;padding:0 30px}pre{white-space:pre-wrap;font-family:Georgia,serif}</style></head><body><h1>" + (meta.title||"Mathematics Examination") + "</h1><h2>" + (meta.sub||"") + "</h2><pre>" + clean + "</pre></body></html>");
    w.document.close(); w.print();
  }
  const segments = parseSegments(text);
  return (
    <div style={{ background: "#fff", border: "2px solid " + BORDER, borderTop: "6px solid " + NAV, borderRadius: 10, boxShadow: "0 6px 24px rgba(0,0,0,0.1)", overflow: "hidden", marginTop: 20 }}>
      <div style={{ background: NAV, borderTop: "4px solid " + GOLD, padding: "16px 20px", display: "flex", flexWrap: "wrap", alignItems: "flex-start", gap: 14 }}>
        <div style={{ width: 44, height: 44, borderRadius: "50%", border: "2.5px solid " + GOLD, background: NAV, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>🦁</div>
        <div style={{ flex: 1, minWidth: 160 }}>
          <div style={{ color: GOLD, fontSize: 9, fontFamily: SANS, textTransform: "uppercase", letterSpacing: 1.2, marginBottom: 4 }}>Democratic Socialist Republic of Sri Lanka — Department of Examinations</div>
          <div style={{ color: "#fff", fontFamily: SERIF, fontSize: 17, fontWeight: "bold", lineHeight: 1.2 }}>{meta.title || "Mathematics Examination Paper"}</div>
          <div style={{ color: "#A8BCCF", fontFamily: SANS, fontSize: 11, marginTop: 4 }}>{meta.sub || ""}</div>
        </div>
        <div style={{ display: "flex", gap: 8, flexShrink: 0 }}>
          <button onClick={copyText} style={{ border: "1.5px solid " + GOLD, background: "transparent", color: GOLD, borderRadius: 7, padding: "7px 12px", fontFamily: SANS, fontSize: 11, cursor: "pointer" }}>Copy</button>
          <button onClick={printPDF} style={{ background: GOLD, border: "none", color: "#fff", borderRadius: 7, padding: "7px 12px", fontFamily: SANS, fontSize: 11, cursor: "pointer", fontWeight: 600 }}>Print</button>
        </div>
      </div>
      <div style={{ padding: "24px 20px", lineHeight: 2, fontFamily: SERIF, fontSize: 14, color: "#1a1a1a", overflowX: "auto" }}>
        {segments.map((seg, i) => {
          if (seg.type === "graph") {
            const gt = GRAPH_TYPES_LIST.includes(seg.graphType) ? seg.graphType : "blank-grid";
            return (
              <div key={i} style={{ background: "#f8f8f6", border: "1px solid " + BORDER, borderRadius: 8, padding: "14px 16px", margin: "16px 0", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontFamily: SANS, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 10 }}>Graph / Diagram</div>
                <GraphCanvas type={gt} width={420} height={280} />
              </div>
            );
          }
          if (seg.type === "image") {
            const src = imageMap[seg.imageId];
            return (
              <div key={i} style={{ background: "#f8f8f6", border: "1px solid " + BORDER, borderRadius: 8, padding: "14px 16px", margin: "16px 0", textAlign: "center" }}>
                <div style={{ fontSize: 10, fontFamily: SANS, textTransform: "uppercase", letterSpacing: 1, color: "#999", marginBottom: 10 }}>Teacher-Provided Question</div>
                {src ? <img src={src} alt="Cropped question" style={{ maxWidth: "100%", borderRadius: 4 }} /> : <span style={{ color: "#aaa", fontFamily: SANS, fontSize: 12 }}>[Image not found]</span>}
              </div>
            );
          }
          return <pre key={i} style={{ whiteSpace: "pre-wrap", fontFamily: SERIF, fontSize: 14, margin: 0, lineHeight: 2 }}>{seg.content}</pre>;
        })}
      </div>
      <div style={{ background: "#f5f5f3", borderTop: "1px solid " + BORDER, padding: "10px 28px", textAlign: "center", color: "#aaa", fontSize: 11, fontFamily: SANS }}>
        Generated by Sri Lanka Mathematics Paper Generator · For educational use only
      </div>
    </div>
  );
}

export function buildStandardPrompt(state) {
  const { grade, paper, difficulty, selectedTopics, schoolName, teacherName, year, extraInstructions } = state;
  const gradeKey = grade === "ol" ? "ol" : "junior";
  const pd = PAPER_DATA[gradeKey][paper];
  const topicsText = selectedTopics.length > 0 ? selectedTopics.join(", ") : "mixed across full syllabus";
  const gradeName = grade === "ol" ? "G.C.E. O/L (Grades 10–11)" : "Junior Secondary";
  const sections = pd.sections.map(s => s.name + ": " + s.marks + " marks, " + s.count + " questions — " + s.note).join("\n");
  return "You are generating an official Sri Lankan mathematics examination paper.\n\nPAPER IDENTITY:\n- Grade/Level: " + gradeName + "\n- Paper: " + paper + "\n- Duration: " + pd.duration + "\n- Total Marks: " + pd.total + "\n- School: " + (schoolName || "Sri Lanka National School") + "\n- Teacher: " + (teacherName || "") + "\n- Year: " + (year || new Date().getFullYear()) + "\n- Difficulty: " + difficulty + "\n- Topics: " + topicsText + "\n\nEXACT SECTION STRUCTURE:\n" + sections + (grade === "ol" ? "\n\nInclude header: Scaling — (Paper I + Paper II) ÷ 1.8 = 100%" : "") + "\n\nGENERATION RULES:\n1. Number questions Q1, Q2... with sub-parts (a)(b)(c)\n2. Put [x marks] after every part\n3. Use Sri Lankan context: LKR, names like Kamal/Nimal/Sandya/Priya\n4. For any graph output EXACTLY: GRAPH_PLACEHOLDER:[type] on its own line (types: quadratic, linear, distance-time, cumulative, histogram, blank-grid, box-plot). NEVER use ASCII graphs\n5. All marks must sum to " + pd.total + "\n6. Difficulty: " + difficulty + (grade === "ol" && paper === "Paper I" ? "\n7. Section A: 25 questions × 2 marks = 50. Section B: 5 questions × 10 marks = 50. Section B must have multi-part structured questions." : "") + (extraInstructions ? "\n\nSPECIAL INSTRUCTIONS:\n" + extraInstructions : "") + "\n\nEnd with marks summary and END OF PAPER. Begin now.";
}

export function buildCustomPrompt(state) {
  const { customTitle, customSchool, customTeacher, customLevel, customGrade, customDuration, customYear, customDate, addAnswerKey, addFormula, sections, customExtraInstructions } = state;
  const qsText = sections.map((sec, si) => {
    const qs = sec.questions.map((q, qi) => {
      if (q.imageDataUrl) return "  Q" + (qi+1) + " [" + q.marks + " marks] (TEACHER-PROVIDED IMAGE — output CROPPED_IMAGE_PLACEHOLDER:" + q.id + " on its own line only)";
      if (q.isOwn) return "  Q" + (qi+1) + " [" + q.marks + " marks] (VERBATIM):\n" + (q.ownText || q.text || "");
      return "  Q" + (qi+1) + " [" + q.marks + " marks] — " + (Q_TYPES.find(t => t.id === q.type)?.label || q.type) + ", Difficulty: " + (q.difficulty||"Standard") + ", Topic: " + (q.topic||"General") + (q.subParts > 0 ? ", Sub-parts: " + q.subParts : "") + (q.note ? ", Note: " + q.note : "") + (q.type === "graph" ? ", output GRAPH_PLACEHOLDER:" + (q.graphType||"blank-grid") + " on its own line" : "");
    }).join("\n");
    return "SECTION " + String.fromCharCode(65+si) + ": " + sec.name + "\nInstructions: \"" + sec.instructions + "\"\n" + qs;
  }).join("\n\n");
  return "Generate a custom Sri Lankan maths exam paper.\n\nTitle: " + (customTitle||"Mathematics Examination") + "\nSchool: " + (customSchool||"") + "\nTeacher: " + (customTeacher||"") + "\nLevel: " + (customLevel||"G.C.E. O/L") + "\nGrade: " + (customGrade||"10") + "\nDuration: " + (customDuration||"2 hours") + "\nYear: " + (customYear||new Date().getFullYear()) + "\nDate: " + (customDate||"") + (addFormula ? "\nPREPEND a formula sheet.\n" : "") + "\n\n" + qsText + "\n\nRULES:\n1. VERBATIM questions: reproduce exactly\n2. IMAGE questions: output only CROPPED_IMAGE_PLACEHOLDER:[id]\n3. MCQ: exactly 4 options (A)(B)(C)(D)\n4. Graph questions: GRAPH_PLACEHOLDER:[type]\n5. Print section instructions exactly\n6. [x marks] after each question\n7. Sri Lankan context\n8. End with END OF PAPER" + (addAnswerKey ? "\nAppend full MARKING SCHEME after END OF PAPER." : "") + (customExtraInstructions ? "\n\nEXTRA: " + customExtraInstructions : "");
}

export function makeDefaultSections() {
  return [
    { id: "sec1", name: "Section A — Short Answer", instructions: "Answer all questions. Each question carries 2 marks.",
      questions: [
        { id: "q1", type: "short", marks: 2, difficulty: "Standard", topic: "", subParts: 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false },
        { id: "q2", type: "short", marks: 2, difficulty: "Standard", topic: "", subParts: 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false },
        { id: "q3", type: "mcq", marks: 2, difficulty: "Foundation", topic: "", subParts: 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false }
      ], collapsed: false },
    { id: "sec2", name: "Section B — Structured Questions", instructions: "Answer all questions. Show all working clearly.",
      questions: [
        { id: "q4", type: "structured", marks: 10, difficulty: "Standard", topic: "", subParts: 3, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false },
        { id: "q5", type: "wordproblem", marks: 10, difficulty: "Standard", topic: "", subParts: 0, note: "", isOwn: false, ownText: "", graphType: "blank-grid", expanded: false }
      ], collapsed: false }
  ];
}
