import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  ChevronLeft, 
  AlertTriangle, 
  Fingerprint, 
  Eye, 
  Lock,
  Cpu,
  Activity,
  Zap,
  Info
} from 'lucide-react';

export default function RiskAnalysis() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Header */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl px-10 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div 
            className="flex items-center gap-4 cursor-pointer group" 
            onClick={() => navigate('/portal')}
          >
            <ChevronLeft className="w-5 h-5 text-amber-500 group-hover:-translate-x-1 transition-transform" />
            <span className="font-display text-xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">RISK_ANALYSIS</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full">
                <span className="text-[8px] uppercase font-black tracking-widest text-amber-500">Security_Level_SSS</span>
             </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col gap-12">
        <header className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-4"
          >
            <span className="w-16 h-px bg-amber-500" />
            <span className="font-display text-xs uppercase tracking-[0.5em] text-amber-500">Stability & Security Protocols</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
          >
            Absolute<br />
            <span className="text-zinc-800 not-italic">Integrity.</span>
          </motion.h1>
        </header>

        <div className="grid grid-cols-12 gap-8">
           {/* Main Security Panel */}
           <div className="col-span-12 lg:col-span-7 flex flex-col gap-8">
              <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
                 <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/[0.03] blur-[80px] rounded-full -ml-32 -mt-32" />
                 
                 <div className="flex flex-col gap-10 relative z-10">
                    <div className="flex items-center gap-6">
                       <div className="w-16 h-16 bg-black border border-amber-500/20 rounded-2xl flex items-center justify-center text-amber-500 shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                          <ShieldCheck className="w-8 h-8" />
                       </div>
                       <div>
                          <h2 className="font-display text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Mitigation Engine</h2>
                          <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-2 mb-1">Autonomous threat suppression</p>
                       </div>
                    </div>

                    <div className="flex flex-col gap-6">
                       {[
                         { title: "Anomaly Detection", status: "Nominal", impact: "Zero", icon: Eye },
                         { title: "Network Encryption", status: "Quantum_Locked", impact: "High", icon: Lock },
                         { title: "Identity Verification", status: "SSS_Active", impact: "Max", icon: Fingerprint },
                       ].map((protocol, i) => (
                         <div key={i} className="flex items-center justify-between p-6 bg-black/40 border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all duration-500 group/item">
                            <div className="flex items-center gap-6">
                               <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-500 group-hover/item:text-amber-500 group-hover/item:scale-110 transition-all">
                                  <protocol.icon className="w-5 h-5" />
                               </div>
                               <div>
                                  <span className="font-display text-lg font-bold text-white uppercase tracking-tight">{protocol.title}</span>
                                  <span className="text-[9px] uppercase tracking-[0.4em] text-zinc-600 block mt-1">Status: {protocol.status}</span>
                               </div>
                            </div>
                            <div className="hidden sm:flex flex-col items-end">
                               <span className="text-[10px] uppercase font-black tracking-widest text-zinc-400">Impact_Vector</span>
                               <span className="text-[10px] uppercase font-black tracking-widest text-amber-500">{protocol.impact}</span>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>
              </section>

              <div className="bg-amber-500 p-12 rounded-[3rem] text-black group hover:scale-[1.01] transition-transform duration-700">
                 <div className="flex justify-between items-start">
                    <AlertTriangle className="w-10 h-10 animate-pulse" />
                    <span className="font-display text-[10px] uppercase tracking-[0.5em] font-black opacity-30 italic">Threat_Response_Active</span>
                 </div>
                 <div className="mt-8">
                    <h3 className="font-display text-4xl font-black text-black italic uppercase leading-none tracking-tighter italic">Vulnerability<br />Filtered.</h3>
                    <p className="text-black/60 text-[11px] mt-6 font-black uppercase tracking-[0.4em] leading-relaxed max-w-lg">
                      Autonomous filters have successfully sequestered 4,201 potential market anomalies in the last 24 hours. Your assets remain in an absolute safety state.
                    </p>
                 </div>
              </div>
           </div>

           {/* Metrics Column */}
           <div className="col-span-12 lg:col-span-5 flex flex-col gap-8">
              <section className="bg-zinc-900/60 border border-white/10 rounded-[3rem] p-10 flex flex-col gap-10">
                 <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xs uppercase tracking-[0.5em] text-zinc-500 font-black">Environmental_Metrics</h3>
                    <div className="h-[1px] w-full bg-white/5" />
                 </div>

                 <div className="space-y-12">
                    {[
                      { label: "Resilience Index", value: "99.99%", color: "text-amber-500", icon: Zap },
                      { label: "Suppression Rate", value: "100%", color: "text-green-500", icon: ShieldCheck },
                      { label: "Calculated Volatility", value: "0.24%", color: "text-zinc-400", icon: Activity },
                      { label: "Integrity Checks", value: "12,402", color: "text-white", icon: Cpu },
                    ].map((m, i) => (
                      <div key={i} className="flex flex-col gap-3">
                         <div className="flex items-center gap-3">
                            <m.icon className="w-3.5 h-3.5 text-zinc-600" />
                            <span className="text-[10px] uppercase font-black tracking-[0.3em] text-zinc-400">{m.label}</span>
                         </div>
                         <span className={`font-display text-4xl font-black italic tracking-tighter ${m.color}`}>{m.value}</span>
                      </div>
                    ))}
                 </div>

                 <button className="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:text-white hover:bg-white/10 transition-all duration-500 mt-4 underline underline-offset-8 decoration-white/5">
                    Execute_Audit_Full
                 </button>
              </section>

              <div className="bg-zinc-900/40 border border-white/10 rounded-[3rem] p-10 flex gap-6 items-start">
                 <div className="w-12 h-12 shrink-0 bg-black border border-white/5 rounded-xl flex items-center justify-center text-amber-500">
                    <Info className="w-6 h-6" />
                 </div>
                 <div>
                    <h3 className="font-display text-xs uppercase tracking-[0.3em] font-black text-white italic">Direct Advisory Note</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.2em] leading-relaxed mt-3 font-medium">
                       Security protocols for Node_EU-01 have been upgraded to Version 9. All operational data is now obfuscated at the kernel level. No further action required.
                    </p>
                 </div>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
