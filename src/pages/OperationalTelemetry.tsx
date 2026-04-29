import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  Activity, 
  ChevronLeft, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Terminal,
  Globe,
  Database,
  Cloud,
  Layers,
  Search,
  Settings
} from 'lucide-react';

export default function OperationalTelemetry() {
  const navigate = useNavigate();

  const logs = [
    { id: '1', level: 'INFO', node: 'EU-WEST-1', action: 'NEURAL_SYNC', status: 'SUCCESS', ts: '2ms ago' },
    { id: '2', level: 'WARN', node: 'US-EAST-2', action: 'LATENCY_SPIKE', status: 'MITIGATING', ts: '45ms ago' },
    { id: '3', level: 'INFO', node: 'ASIA-SOUTH-1', action: 'ALPHA_CAPTURE', status: 'ACTIVE', ts: '120ms ago' },
    { id: '4', level: 'DEBUG', node: 'GLOBAL_CORE', action: 'DATA_PIPELINE', status: 'CLEAR', ts: '1s ago' },
    { id: '5', level: 'INFO', node: 'SECURITY_NODE', action: 'ENCRYPTION_ROLL', status: 'COMPLETED', ts: '5s ago' },
  ];

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
            <span className="font-display text-xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">OPERATIONAL_TELEMETRY</span>
          </div>
          <div className="flex items-center gap-6">
             <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] uppercase font-black tracking-widest text-zinc-400">Nodes_Healthy</span>
             </div>
             <Settings className="w-4 h-4 text-zinc-500 cursor-pointer hover:text-white transition-colors" />
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
            <span className="font-display text-xs uppercase tracking-[0.5em] text-amber-500">Live Execution Monitoring</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
          >
            Tactical<br />
            <span className="text-zinc-800 not-italic">Awareness.</span>
          </motion.h1>
        </header>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-12 gap-8">
           
           {/* Left Console: System Logs */}
           <div className="col-span-12 lg:col-span-8 bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-10 flex flex-col gap-10 relative overflow-hidden backdrop-blur-xl">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] blur-[80px] rounded-full -mr-32 -mt-32" />
              
              <div className="flex justify-between items-center relative z-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                      <Terminal className="w-6 h-6" />
                    </div>
                    <div>
                      <h2 className="font-display text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Kernel Feed</h2>
                      <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-1.5">Real-time system events</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-4">
                    <div className="relative">
                       <Search className="w-4 h-4 text-zinc-600 absolute left-3 top-1/2 -translate-y-1/2" />
                       <input 
                         type="text" 
                         placeholder="FILTER_LOGS" 
                         className="bg-black/40 border border-white/5 pl-10 pr-6 py-2 rounded-xl text-[10px] uppercase tracking-widest focus:outline-none focus:border-amber-500/50 transition-colors w-48"
                       />
                    </div>
                 </div>
              </div>

              <div className="flex flex-col gap-4 relative z-10 font-mono">
                 {logs.map((log) => (
                   <motion.div 
                     key={log.id}
                     initial={{ opacity: 0, x: -10 }}
                     animate={{ opacity: 1, x: 0 }}
                     className="flex flex-wrap items-center gap-4 p-4 bg-black/40 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest group hover:border-amber-500/20 transition-all"
                   >
                     <span className={`px-2 py-0.5 rounded text-[8px] font-black ${
                       log.level === 'INFO' ? 'bg-green-500/10 text-green-500' :
                       log.level === 'WARN' ? 'bg-amber-500/10 text-amber-500' : 'bg-zinc-800 text-zinc-500'
                     }`}>
                       {log.level}
                     </span>
                     <span className="text-zinc-600 font-bold">[{log.node}]</span>
                     <span className="text-white font-bold italic">{log.action}:</span>
                     <span className={`font-black ${log.status === 'SUCCESS' ? 'text-green-500' : 'text-amber-500 animate-pulse'}`}>
                        {log.status}
                     </span>
                     <span className="ml-auto text-zinc-700">{log.ts}</span>
                   </motion.div>
                 ))}
              </div>
              
              <button className="w-full py-4 border border-white/5 rounded-xl text-[10px] font-black uppercase tracking-[0.4em] text-zinc-600 hover:text-amber-500 hover:bg-white/5 transition-all mt-4">
                Fetch_Archives_01
              </button>
           </div>

           {/* Right Console: Stats */}
           <div className="col-span-12 lg:col-span-4 flex flex-col gap-8">
              <div className="bg-zinc-900/60 border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-10">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                      <Cpu className="w-6 h-6 text-amber-500" />
                    </div>
                    <div>
                      <h2 className="font-display text-xl font-black italic tracking-tighter text-white uppercase leading-none">Compute Hub</h2>
                      <p className="text-zinc-600 text-[9px] uppercase tracking-[0.4em] mt-1.5">Neural Architecture</p>
                    </div>
                 </div>

                 <div className="space-y-6">
                    {[
                      { label: "Core Load", progress: 0, icon: Activity },
                      { label: "Neural Drift", progress: 0, icon: Zap },
                      { label: "Data Flow", progress: 0, icon: Database },
                    ].map((stat, i) => (
                      <div key={i} className="flex flex-col gap-4">
                         <div className="flex justify-between items-center text-[10px] uppercase tracking-widest font-black text-zinc-400">
                            <div className="flex items-center gap-2">
                               <stat.icon className="w-3.5 h-3.5 text-amber-500" />
                               {stat.label}
                            </div>
                            <span>{stat.progress}%</span>
                         </div>
                         <div className="h-1.5 bg-black rounded-full overflow-hidden border border-white/5">
                            <motion.div 
                              initial={{ width: 0 }}
                              animate={{ width: `${stat.progress}%` }}
                              transition={{ duration: 1, delay: i * 0.2 }}
                              className="h-full bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]"
                            />
                         </div>
                      </div>
                    ))}
                 </div>
              </div>

              <div className="bg-amber-500 p-10 rounded-[2.5rem] flex flex-col gap-8 group cursor-pointer hover:bg-white transition-all duration-700">
                 <ShieldCheck className="w-12 h-12 text-black transition-transform group-hover:rotate-12 duration-700" />
                 <div>
                    <h3 className="font-display text-3xl font-black text-black italic uppercase leading-none tracking-tighter">Security<br />Enforced.</h3>
                    <p className="text-black/60 text-[10px] mt-4 font-black uppercase tracking-[0.3em] leading-relaxed">Multi-layer encryption active. No intrusion detected in last 0 cycles.</p>
                 </div>
              </div>
           </div>
        </div>

        {/* Distributed Nodes */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
           {[
             { name: "Node_London", load: "Inactive", ping: "0ms", icon: Globe },
             { name: "Node_S_Francisco", load: "Inactive", ping: "0ms", icon: Cloud },
             { name: "Node_Singapore", load: "Inactive", ping: "0ms", icon: Layers },
             { name: "Node_Global_Relay", load: "Inactive", ping: "0ms", icon: Zap }
           ].map((node, i) => (
             <motion.div 
               key={i}
               className="bg-black/40 border border-white/5 p-8 rounded-[2rem] flex flex-col gap-6 hover:border-amber-500/20 transition-all group"
             >
               <div className="w-12 h-12 rounded-xl bg-zinc-900 border border-white/5 flex items-center justify-center text-zinc-500 group-hover:text-amber-500 transition-colors">
                  <node.icon className="w-5 h-5" />
               </div>
               <div className="flex flex-col gap-1">
                  <span className="font-display text-[10px] uppercase font-black tracking-widest text-white">{node.name}</span>
                  <div className="flex items-center justify-between mt-2">
                     <span className="text-[8px] uppercase font-black tracking-widest text-zinc-600">{node.load}</span>
                     <span className="text-[8px] uppercase font-black tracking-widest text-amber-500/50">{node.ping}</span>
                  </div>
               </div>
             </motion.div>
           ))}
        </div>

      </main>
    </div>
  );
}
