import React from 'react';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { 
  DollarSign, 
  TrendingUp, 
  ChevronLeft, 
  Globe, 
  BarChart3, 
  PieChart, 
  Zap,
  ArrowUpRight,
  Target
} from 'lucide-react';

export default function MarketStrategy() {
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
            <span className="font-display text-xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">MARKET_STRATEGY</span>
          </div>
          <div className="flex items-center gap-4">
             <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse" />
             <span className="font-display text-[10px] uppercase tracking-[0.4em] text-zinc-500">Live_Market_Telemetery</span>
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
            <span className="font-display text-xs uppercase tracking-[0.5em] text-amber-500">Global Revenue Vectors</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-display text-6xl md:text-9xl font-black italic tracking-tighter leading-[0.85] uppercase"
          >
            Market<br />
            <span className="text-zinc-800 not-italic">Dominance.</span>
          </motion.h1>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: "Revenue Extraction", value: "$2.4M", desc: "Total capitalized asset appreciation across all nodes.", icon: DollarSign },
            { title: "Market Alpha", value: "+42%", desc: "Yield outperformance relative to baseline benchmarks.", icon: TrendingUp },
            { title: "Global Reach", value: "24", desc: "Active operational nodes executing high-frequency strategy.", icon: Globe }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i }}
              className="bg-zinc-900/40 border border-white/5 p-10 rounded-[2.5rem] flex flex-col gap-6 hover:border-amber-500/30 transition-all duration-700 group hover:bg-zinc-900/60"
            >
              <div className="w-14 h-14 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                <stat.icon className="w-7 h-7" />
              </div>
              <div>
                <h3 className="font-display text-xs uppercase tracking-[0.4em] text-zinc-500 font-black mb-2">{stat.title}</h3>
                <div className="text-5xl font-display font-black text-white italic tracking-tighter">{stat.value}</div>
                <p className="text-zinc-500 text-xs mt-4 leading-relaxed uppercase tracking-widest font-medium">{stat.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Strategic Analysis Section */}
        <section className="bg-zinc-900/40 border border-white/5 rounded-[3rem] p-12 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/[0.03] blur-[150px] rounded-full -mr-48 -mt-48" />
           
           <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-12 relative z-10">
              <div className="flex-1 flex flex-col gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500 text-black rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6" />
                  </div>
                  <h2 className="font-display text-3xl font-black italic tracking-tighter text-white uppercase">Vector Analysis</h2>
                </div>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-2xl font-medium">
                  Our proprietary algorithmic identification filters through market noise to isolate high-yield alpha opportunities. Every operational directive is simulated across 1,000+ market scenarios before execution.
                </p>
                <div className="flex gap-4 mt-4">
                  <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Risk_Adjusted_Returns
                  </div>
                  <div className="px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-[10px] uppercase tracking-widest text-zinc-400 font-bold">
                    Alpha_Capture_Protocol
                  </div>
                </div>
              </div>

              <div className="w-full md:w-80 flex flex-col gap-6">
                {[
                  { label: "Predictive Confidence", val: "94.2%" },
                  { label: "Execution Latency", val: "12ms" },
                  { label: "Liquidity Depth", val: "$125M+" }
                ].map((item, i) => (
                  <div key={i} className="flex flex-col gap-2 p-6 bg-black border border-white/5 rounded-2xl">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-600">{item.label}</span>
                    <span className="text-2xl font-display font-black text-amber-500">{item.val}</span>
                  </div>
                ))}
              </div>
           </div>
        </section>

        {/* Detailed Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="bg-zinc-900/60 border border-white/10 rounded-[2.5rem] p-10 flex flex-col gap-8">
              <div className="flex items-center justify-between">
                 <h2 className="font-display text-xl font-black italic tracking-tighter uppercase text-white">Market Sentiment</h2>
                 <PieChart className="w-6 h-6 text-amber-500" />
              </div>
              <div className="space-y-6">
                 {[
                   { region: "North America", sent: "Bullish", weight: "45%" },
                   { region: "European Union", sent: "Neutral", weight: "30%" },
                   { region: "Asia Pacific", sent: "Accumulating", weight: "25%" }
                 ].map((r, i) => (
                   <div key={i} className="flex items-center justify-between p-4 bg-black/40 border border-white/5 rounded-xl hover:border-amber-500/30 transition-colors">
                      <span className="font-display text-sm font-bold uppercase tracking-tight">{r.region}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-[10px] uppercase tracking-widest text-amber-500 font-black">{r.sent}</span>
                        <span className="text-[10px] uppercase tracking-widest text-zinc-600 font-black">{r.weight}</span>
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           <div className="bg-amber-500 p-10 rounded-[2.5rem] flex flex-col justify-between group hover:scale-[1.02] transition-all duration-700">
              <div className="flex justify-between items-start text-black">
                <Target className="w-10 h-10 font-black" />
                <ArrowUpRight className="w-8 h-8 opacity-30 group-hover:opacity-100 transition-opacity" />
              </div>
              <div className="mt-12">
                 <h3 className="font-display text-4xl font-black text-black italic uppercase leading-none tracking-tighter">Strategic<br />Positioning.</h3>
                 <p className="text-black/60 text-[11px] mt-6 font-black uppercase tracking-[0.3em] leading-relaxed">Your account is currently optimized for maximal liquidity capture. All nodes are reporting green for next-phase expansion.</p>
              </div>
           </div>
        </div>

      </main>
    </div>
  );
}
