import React, { useState, useEffect, useMemo } from 'react';
import { ELEMENT_PRESETS } from '../data';
import { ElementPreset } from '../types';
import { Plus, Minus, RotateCcw, Sparkles, AlertCircle, CheckCircle2, FlaskConical } from 'lucide-react';
import { motion } from 'motion/react';

interface AtomSimulatorProps {
  onAddSimulatedElement: (symbol: string) => void;
}

export default function AtomSimulator({ onAddSimulatedElement }: AtomSimulatorProps) {
  // State for particles
  const [protons, setProtons] = useState<number>(6); // Default Carbon
  const [neutrons, setNeutrons] = useState<number>(6);
  const [electrons, setElectrons] = useState<number>(6);

  // Load a preset
  const loadPreset = (preset: ElementPreset) => {
    setProtons(preset.protons);
    setNeutrons(preset.neutrons);
    setElectrons(preset.electrons);
    onAddSimulatedElement(preset.symbol);
  };

  // Find if matching standard element
  const matchedElement = useMemo(() => {
    return ELEMENT_PRESETS.find(el => el.protons === protons) || null;
  }, [protons]);

  // Calculate Net Charge: Protons - Electrons
  const netCharge = protons - electrons;
  const chargeText = useMemo(() => {
    if (netCharge === 0) return { label: "Atom Netral", color: "text-emerald-500 bg-emerald-50/80 border-emerald-200" };
    if (netCharge > 0) return { label: `Kation (Ion Positif: +${netCharge})`, color: "text-blue-500 bg-blue-50/80 border-blue-200" };
    return { label: `Anion (Ion Negatif: ${netCharge})`, color: "text-rose-500 bg-rose-50/80 border-rose-200" };
  }, [netCharge]);

  // Calculate Atomic Mass: Protons + Neutrons
  const atomicMass = protons + neutrons;

  // Isotope Stability Rules (simplified educational heuristics)
  const stabilityInfo = useMemo(() => {
    if (protons === 0) return { label: "Kosong", isStable: false, explain: "Tambahkan proton untuk membuat atom." };
    if (protons === 1) {
      if (neutrons === 0 || neutrons === 1) return { label: "Stabil", isStable: true, explain: "Isotop Hidrogen (Protium/Deuterium) ini sangat stabil." };
      if (neutrons === 2) return { label: "Radioaktif", isStable: false, explain: "Tritium merupakan isotop radioaktif yang meluruh seiring waktu." };
      return { label: "Sangat Tidak Stabil", isStable: false, explain: "Terlalu banyak neutron untuk satu proton." };
    }
    
    // N/Z ratio rule for stable elements (Z <= 20, stable ratio is close to 1:1 up to 1.25:1)
    const ratio = neutrons / protons;
    if (ratio >= 0.8 && ratio <= 1.25) {
      return { label: "Stabil", isStable: true, explain: `Keseimbangan proton (${protons}) & neutron (${neutrons}) menghasilkan gaya ikat inti yang sangat stabil.` };
    } else if (ratio < 0.8) {
      return { label: "Tidak Stabil", isStable: false, explain: "Kekurangan neutron! Penolakan elektrostatik antar proton merusak kestabilan inti." };
    } else {
      return { label: "Tidak Stabil (Radioaktif)", isStable: false, explain: "Kelebihan neutron! Inti atom cenderung tidak stabil dan akan mengalami peluruhan nuklir." };
    }
  }, [protons, neutrons]);

  // Calculate Electron Shell configuration (Bohr Model: K <= 2, L <= 8, M <= 8)
  const shellDistribution = useMemo(() => {
    let remaining = electrons;
    const k = Math.min(remaining, 2);
    remaining -= k;
    const l = Math.min(remaining, 8);
    remaining -= l;
    const m = Math.min(remaining, 8); // simplified limit for Alkali and Earth metals up to Ca
    remaining -= m;
    const n = Math.min(remaining, 16); // remainder
    return { k, l, m, n };
  }, [electrons]);

  const configString = useMemo(() => {
    const list = [];
    if (shellDistribution.k > 0) list.push(shellDistribution.k);
    if (shellDistribution.l > 0) list.push(shellDistribution.l);
    if (shellDistribution.m > 0) list.push(shellDistribution.m);
    if (shellDistribution.n > 0) list.push(shellDistribution.n);
    return list.length > 0 ? list.join(" , ") : "0";
  }, [shellDistribution]);

  // Generate electron coordinate arrays for rendering
  const getElectronCoords = (count: number, radius: number) => {
    const coords = [];
    for (let i = 0; i < count; i++) {
      const angle = (i * 2 * Math.PI) / count + (Math.PI / 4); // staggered
      const x = 200 + radius * Math.cos(angle);
      const y = 200 + radius * Math.sin(angle);
      coords.push({ x, y });
    }
    return coords;
  };

  const kCoords = useMemo(() => getElectronCoords(shellDistribution.k, 60), [shellDistribution.k]);
  const lCoords = useMemo(() => getElectronCoords(shellDistribution.l, 110), [shellDistribution.l]);
  const mCoords = useMemo(() => getElectronCoords(shellDistribution.m, 160), [shellDistribution.m]);

  return (
    <div id="atom_simulator_module" className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Canvas Area - 5 Columns */}
      <div className="lg:col-span-7 bg-white rounded-3xl p-6 border border-slate-100 shadow-xs flex flex-col items-center">
        <div className="w-full flex justify-between items-center mb-4">
          <div>
            <h3 className="font-sans font-medium text-slate-800 text-lg flex items-center gap-2">
              <FlaskConical className="w-5 h-5 text-indigo-500 animate-pulse" />
              Visualisasi Model Bohr Indah
            </h3>
            <p className="text-xs text-slate-400">Elektron mengitari lintasan kulit atom dengan tingkat energi stabil</p>
          </div>
          <button 
            onClick={() => { setProtons(6); setNeutrons(6); setElectrons(6); }}
            className="p-2 text-slate-400 hover:text-indigo-500 hover:bg-slate-50 rounded-xl transition duration-200"
            title="Reset Simulator"
            id="reset_sim_btn"
          >
            <RotateCcw className="w-4 h-4" />
          </button>
        </div>

        {/* The SVG Canvas Box */}
        <div className="relative w-full aspect-square max-w-[380px] md:max-w-[420px] bg-slate-50/80 rounded-2xl border border-slate-100 flex items-center justify-center overflow-hidden">
          {/* Legend Details Overlay */}
          <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-xs p-2 rounded-lg text-[10px] space-y-1.5 border border-slate-150 shadow-xs z-10 font-mono">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 inline-block"></span>
              <span>Proton ({protons})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 inline-block"></span>
              <span>Neutron ({neutrons})</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 inline-block"></span>
              <span>Elektron ({electrons})</span>
            </div>
          </div>

          {/* Standard Nuclear Notation Overlay */}
          <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-xs p-3 rounded-xl border border-slate-150 shadow-xs font-mono text-center min-w-[70px] z-10">
            <div className="relative inline-block text-left">
              {/* Charge index top-right of symbol */}
              {netCharge !== 0 && (
                <span className="absolute -top-1.5 -right-3 text-[10px] font-bold text-slate-500">
                  {netCharge > 0 ? `+${netCharge}` : `${netCharge}`}
                </span>
              )}
              {/* Elements sub and super script before symbol */}
              <div className="inline-flex flex-col text-right justify-center align-middle mr-1 text-[10px] leading-tight text-slate-500">
                <span>{atomicMass}</span>
                <span>{protons}</span>
              </div>
              <span className="text-2xl font-bold bg-gradient-to-br from-indigo-600 to-indigo-400 bg-clip-text text-transparent">
                {matchedElement ? matchedElement.symbol : "??"}
              </span>
            </div>
            <div className="text-[9px] text-slate-400 mt-1 font-sans">{matchedElement?.name || "Unsur Baru"}</div>
          </div>

          {/* Atomic Bohr SVG */}
          <svg viewBox="0 0 400 400" className="w-full h-full max-w-[400px] z-0">
            {/* Ambient Background Glow */}
            <circle cx="200" cy="200" r="180" fill="url(#bgGlow)" opacity="0.35" />

            {/* Bohr Shell Orbits styled precisely to SLeek instructions (dashed indigo rings) */}
            {/* Shell K - n=1 */}
            <circle cx="200" cy="200" r="60" fill="none" stroke="rgba(99, 102, 241, 0.35)" strokeDasharray="6,4" strokeWidth="1.5" />
            {/* Shell L - n=2 */}
            <circle cx="200" cy="200" r="110" fill="none" stroke="rgba(99, 102, 241, 0.35)" strokeDasharray="6,4" strokeWidth="1.5" />
            {/* Shell M - n=3 */}
            <circle cx="200" cy="200" r="160" fill="none" stroke="rgba(99, 102, 241, 0.35)" strokeDasharray="6,4" strokeWidth="1.5" />

            {/* Rotating Orbits containing Electrons to avoid manual recalculation in loops */}
            {/* Shell K Orbit */}
            <g className="origin-center animate-[spin_8s_linear_infinite]">
              {kCoords.map((coord, i) => (
                <circle 
                  key={`k-e-${i}`} 
                  cx={coord.x} 
                  cy={coord.y} 
                  r="6.5" 
                  fill="#3B82F6" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                  filter="url(#electronGlow)"
                />
              ))}
            </g>

            {/* Shell L Orbit */}
            <g className="origin-center animate-[spin_16s_linear_infinite_reverse]">
              {lCoords.map((coord, i) => (
                <circle 
                  key={`l-e-${i}`} 
                  cx={coord.x} 
                  cy={coord.y} 
                  r="6.5" 
                  fill="#3B82F6" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                  filter="url(#electronGlow)"
                />
              ))}
            </g>

            {/* Shell M Orbit */}
            <g className="origin-center animate-[spin_24s_linear_infinite]">
              {mCoords.map((coord, i) => (
                <circle 
                  key={`m-e-${i}`} 
                  cx={coord.x} 
                  cy={coord.y} 
                  r="6.5" 
                  fill="#3B82F6" 
                  stroke="#ffffff" 
                  strokeWidth="1.5"
                  filter="url(#electronGlow)"
                />
              ))}
            </g>

            {/* Nucleus Core - Central Compound Globe */}
            <g transform="translate(200, 200)">
              {/* Outer Core Glow */}
              <circle cx="0" cy="0" r="28" fill="url(#nucleusGlow)" opacity="0.9" className="nucleus-glow-ring" />
              
              {/* Dynamic Proton and Neutron Core Clump representation */}
              {Array.from({ length: Math.min(protons + neutrons, 16) }).map((_, idx) => {
                const angle = (idx * 2 * Math.PI) / Math.min(protons + neutrons, 16) + (idx * 15 * Math.PI / 180);
                const distance = idx === 0 ? 0 : (idx % 2 === 0 ? 8 : 15);
                const px = distance * Math.cos(angle);
                const py = distance * Math.sin(angle);
                const isProton = idx % 2 === 0 ? (idx / 2 < protons) : (Math.floor(idx / 2) >= neutrons);
                return (
                  <circle
                    key={`subatom-${idx}`}
                    cx={px}
                    cy={py}
                    r="5.5"
                    fill={isProton ? "#ef4444" : "#3b82f6"}
                    stroke={isProton ? "#fca5a5" : "#93c5fd"}
                    strokeWidth="0.5"
                  />
                );
              })}
              
              {/* Core Text Label Overlay (if too crowded) */}
              <circle cx="0" cy="0" r="14" fill="#1e1b4b" opacity="0.95" />
              <text x="0" y="3.5" textAnchor="middle" fill="#f8fafc" fontSize="10" fontWeight="extrabold" fontFamily="sans-serif">
                {protons}
              </text>
            </g>

            {/* Definitions */}
            <defs>
              <filter id="electronGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>
              <radialGradient id="nucleusGlow" cx="40%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#f87171" />
                <stop offset="40%" stopColor="#ef4444" />
                <stop offset="85%" stopColor="#2563eb" />
                <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
              </radialGradient>
              <radialGradient id="bgGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#e0e7ff" />
                <stop offset="100%" stopColor="#f8fafc" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        {/* Element Details Badge */}
        {matchedElement && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full mt-4 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex flex-col"
          >
            <div className="flex justify-between items-start">
              <div>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-100 px-2.5 py-0.5 rounded-full uppercase tracking-wider font-sans">
                  {matchedElement.category}
                </span>
                <h4 className="text-base font-semibold text-slate-800 mt-1 font-sans">{matchedElement.name} ({matchedElement.symbol})</h4>
              </div>
              <div className="text-right text-xs text-indigo-500 font-mono">
                Gol. {matchedElement.group} | Per. {matchedElement.period}
              </div>
            </div>
            <p className="text-xs text-slate-600 mt-2 leading-relaxed">{matchedElement.description}</p>
            <div className="mt-3 text-xs bg-white/90 p-2.5 rounded-xl border border-indigo-100 text-indigo-700 italic flex gap-1.5 items-start">
              <Sparkles className="w-4.5 h-4.5 shrink-0 text-indigo-500 mt-0.5" />
              <span>&ldquo;{matchedElement.funFact}&rdquo;</span>
            </div>
          </motion.div>
        )}
      </div>

      {/* Adjust Controls Panel - 5 Columns */}
      <div className="lg:col-span-5 space-y-6">
        {/* Particle Customizers */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
          <h3 className="font-sans font-semibold text-slate-800 text-lg mb-4">Setel Partikel Atom</h3>
          
          <div className="space-y-5">
            {/* Proton Controls */}
            <div className="flex items-center justify-between p-3.5 bg-rose-50/40 rounded-2xl border border-rose-100/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-rose-500 text-white flex items-center justify-center font-bold text-lg shadow-sm font-mono">+</span>
                <div>
                  <h4 className="font-medium text-slate-800 text-sm font-sans">Proton (p⁺)</h4>
                  <p className="text-[10px] text-slate-400">Muatan positif, penentu jenis unsur.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => protons > 0 && setProtons(p => p - 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-50 transition active:scale-95 shadow-2xs"
                  id="dec_proton"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-slate-800 font-bold font-mono">{protons}</span>
                <button 
                  onClick={() => protons < 12 && setProtons(p => p + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-rose-200 text-rose-500 flex items-center justify-center hover:bg-rose-50 transition active:scale-95 shadow-2xs"
                  id="inc_proton"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Neutron Controls */}
            <div className="flex items-center justify-between p-3.5 bg-blue-50/40 rounded-2xl border border-blue-100/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-blue-500 text-white flex items-center justify-center font-bold text-lg shadow-sm font-mono">0</span>
                <div>
                  <h4 className="font-medium text-slate-800 text-sm font-sans">Neutron (n⁰)</h4>
                  <p className="text-[10px] text-slate-400">Netral, perekat kestabilan inti atom.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => neutrons > 0 && setNeutrons(n => n - 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition active:scale-95 shadow-2xs"
                  id="dec_neutron"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-slate-800 font-bold font-mono">{neutrons}</span>
                <button 
                  onClick={() => neutrons < 14 && setNeutrons(n => n + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-blue-200 text-blue-500 flex items-center justify-center hover:bg-blue-50 transition active:scale-95 shadow-2xs"
                  id="inc_neutron"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Electron Controls */}
            <div className="flex items-center justify-between p-3.5 bg-amber-50/40 rounded-2xl border border-amber-100/50">
              <div className="flex items-center gap-3">
                <span className="w-10 h-10 rounded-xl bg-amber-400 text-amber-950 flex items-center justify-center font-bold text-lg shadow-sm font-mono">-</span>
                <div>
                  <h4 className="font-medium text-slate-800 text-sm font-sans">Elektron (e⁻)</h4>
                  <p className="text-[10px] text-slate-400">Muatan negatif, penentu elektron valensi.</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => electrons > 0 && setElectrons(e => e - 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-amber-200 text-amber-600 flex items-center justify-center hover:bg-amber-50 transition active:scale-95 shadow-2xs"
                  id="dec_electron"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-8 text-center text-slate-800 font-bold font-mono">{electrons}</span>
                <button 
                  onClick={() => electrons < 12 && setElectrons(e => e + 1)}
                  className="w-8 h-8 rounded-lg bg-white border border-amber-200 text-amber-600 flex items-center justify-center hover:bg-amber-50 transition active:scale-95 shadow-2xs"
                  id="inc_electron"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Presets Picker */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs">
          <h3 className="font-sans font-semibold text-slate-800 text-base mb-3 flex items-center gap-2">
            <Sparkles className="w-4.5 h-4.5 text-indigo-500" />
            Preset Unsur Golongan Utama
          </h3>
          <p className="text-xs text-slate-400 mb-4">Pilih unsur di bawah untuk langsung memuat konfigurasi partikel aslinya:</p>
          <div className="grid grid-cols-4 gap-2">
            {ELEMENT_PRESETS.map((preset) => {
              const isActive = protons === preset.protons && neutrons === preset.neutrons && electrons === preset.electrons;
              return (
                <button
                  key={preset.symbol}
                  onClick={() => loadPreset(preset)}
                  className={`py-3 px-1 rounded-xl font-mono text-center transition duration-200 ${
                    isActive 
                      ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200 scale-102 border-indigo-600' 
                      : 'bg-slate-50 text-slate-700 border border-slate-150 hover:bg-slate-100 hover:border-slate-300'
                  }`}
                  id={`preset_${preset.symbol}`}
                >
                  <div className="text-base font-bold">{preset.symbol}</div>
                  <div className="text-[9px] opacity-75 font-sans truncate">{preset.name}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Chemical Analytics Indicators */}
        <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-xs space-y-4">
          <h3 className="font-sans font-semibold text-slate-800 text-base">Hasil Analisis Kimia</h3>
          
          <div className="grid grid-cols-2 gap-3">
            {/* Mass Box */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center font-sans">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Massa Atom (A)</span>
              <span className="text-xl font-extrabold text-slate-700 font-mono inline-block mt-1">{atomicMass}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">p⁺ + n⁰</span>
            </div>

            {/* Electron Configuration */}
            <div className="p-3 bg-slate-50 rounded-2xl border border-slate-100 text-center font-sans">
              <span className="text-[10px] text-slate-400 uppercase tracking-wider block">Konfigurasi Bohr</span>
              <span className="text-lg font-extrabold text-slate-700 font-mono inline-block mt-1 truncate max-w-full">{configString}</span>
              <span className="text-[10px] text-slate-400 block mt-0.5">
                Valensi: {shellDistribution.n > 0 ? shellDistribution.n : (shellDistribution.m > 0 ? shellDistribution.m : (shellDistribution.l > 0 ? shellDistribution.l : shellDistribution.k))}
              </span>
            </div>
          </div>

          {/* Charge Status row */}
          <div className={`p-4 rounded-2xl border flex items-center justify-between ${chargeText.color}`}>
            <span className="text-xs font-semibold font-sans">Status Muatan:</span>
            <span className="text-xs font-bold font-sans uppercase tracking-wider">{chargeText.label}</span>
          </div>

          {/* Stability Status row */}
          <div className={`p-4 rounded-2xl border flex flex-col gap-1.5 ${
            stabilityInfo.isStable 
              ? 'bg-emerald-50/50 border-emerald-100 text-emerald-800' 
              : 'bg-amber-50/50 border-amber-100 text-amber-800'
          }`}>
            <div className="flex items-center justify-between text-xs font-semibold">
              <span className="font-sans">Kestabilan Inti:</span>
              <span className="font-bold flex items-center gap-1 font-sans uppercase tracking-wider">
                {stabilityInfo.isStable ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <AlertCircle className="w-4 h-4 text-amber-500" />}
                {stabilityInfo.label}
              </span>
            </div>
            <p className="text-[11px] opacity-90 leading-relaxed font-sans">{stabilityInfo.explain}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
