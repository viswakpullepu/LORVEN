import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
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
  Target,
  BrainCircuit,
  Loader2,
  Sparkles,
  RefreshCcw
} from 'lucide-react';
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  Tooltip, 
  CartesianGrid 
} from 'recharts';
import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

interface AIInsight {
  title: string;
  analysis: string;
  impactLevel: 'High' | 'Medium' | 'Low';
}

interface MarketDataPoint {
  time: string;
  probability: number;
}

export default function MarketStrategy() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [insights, setInsights] = useState<AIInsight[]>([]);
  const [chartData, setChartData] = useState<MarketDataPoint[]>([]);
  const [error, setError] = useState<string | null>(null);

  const performAIAnalysis = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: "Analyze current global market trends (simulated for current timeframe) and provide 3 actionable high-alpha strategy insights for a private equity firm named LORVEN. Also generate 7 data points for a 'Strategic Alpha Probability' trend graph (time vs percentage).",
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              insights: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    analysis: { type: Type.STRING },
                    impactLevel: { type: Type.STRING, enum: ['High', 'Medium', 'Low'] }
                  },
                  required: ['title', 'analysis', 'impactLevel']
                }
              },
              trendData: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING },
                    probability: { type: Type.NUMBER }
                  },
                  required: ['time', 'probability']
                }
              }
            },
            required: ['insights', 'trendData']
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setInsights(data.insights || []);
      setChartData(data.trendData || []);
    } catch (err) {
      console.error("AI Analysis Failed:", err);
      setError("Unable to initialize Neural Link. Please verify connection credentials.");
      // Fallback data if AI fails
      setInsights([
        { title: "Liquidity Capture", analysis: "Aggressive positioning in emerging tech sectors showing 12% alpha variance.", impactLevel: "High" },
        { title: "Risk Arbitrage", analysis: "Exploiting multi-vector market inefficiencies in APAC currency corridors.", impactLevel: "Medium" }
      ]);
      setChartData([
        { time: 'T-6', probability: 45 }, { time: 'T-5', probability: 52 }, 
        { time: 'T-4', probability: 48 }, { time: 'T-3', probability: 61 },
        { time: 'T-2', probability: 55 }, { time: 'T-1', probability: 72 }, 
        { time: 'NOW', probability: 85 }
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performAIAnalysis();
  }, []);

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

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-16 flex flex-col gap-16">
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

        {/* AI Analysis Section */}
        <section className="flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BrainCircuit className="w-6 h-6 text-amber-500" />
              <h2 className="font-display text-2xl font-black italic tracking-tighter uppercase text-white">Neural Sentiment Analysis</h2>
            </div>
            <button 
              onClick={performAIAnalysis}
              disabled={loading}
              className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-zinc-500 hover:text-amber-500 hover:border-amber-500/50 transition-all flex items-center gap-2 group disabled:opacity-50"
            >
              <RefreshCcw className={`w-3 h-3 ${loading ? 'animate-spin' : 'group-hover:rotate-180 transition-transform duration-500'}`} />
              Re-Sync_Neural_Link
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Visualization */}
            <div className="lg:col-span-8 bg-zinc-900/40 border border-white/5 rounded-[3rem] p-10 relative overflow-hidden backdrop-blur-xl h-[500px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.02] blur-[100px] rounded-full -mr-32 -mt-32" />
              
              <div className="flex flex-col h-full relative z-10">
                <div className="flex justify-between items-center mb-8">
                  <div className="flex flex-col">
                    <span className="font-display text-xs font-black uppercase tracking-[0.4em] text-amber-500/60">ALPHA_PROBABILITY_WAVE</span>
                    <span className="text-[10px] uppercase tracking-widest text-zinc-600 mt-1">Real-time market variance projection</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                       <div className="w-2 h-2 bg-amber-500 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]" />
                       <span className="text-[9px] uppercase font-black text-zinc-400">Projected_Yield</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 w-full">
                  <AnimatePresence mode="wait">
                    {loading ? (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="h-full flex items-center justify-center flex-col gap-4"
                      >
                        <Loader2 className="w-12 h-12 text-amber-500 animate-spin" />
                        <span className="font-display text-[10px] uppercase tracking-[0.5em] text-zinc-700 animate-pulse">Scanning_Market_Neural_Folds...</span>
                      </motion.div>
                    ) : (
                      <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-full w-full"
                      >
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={chartData}>
                            <defs>
                              <linearGradient id="colorProb" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#f59e0b" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#ffffff08" vertical={false} />
                            <XAxis 
                              dataKey="time" 
                              axisLine={false} 
                              tickLine={false} 
                              tick={{ fill: '#52525b', fontSize: 10, fontWeight: 700 }}
                              dy={10}
                            />
                            <YAxis 
                              hide 
                              domain={[0, 100]} 
                            />
                            <Tooltip 
                              contentStyle={{ 
                                backgroundColor: '#09090b', 
                                border: '1px solid #ffffff10', 
                                borderRadius: '12px',
                                fontSize: '10px',
                                color: '#fff',
                                textTransform: 'uppercase'
                              }}
                            />
                            <Area 
                              type="monotone" 
                              dataKey="probability" 
                              stroke="#f59e0b" 
                              strokeWidth={3}
                              fillOpacity={1} 
                              fill="url(#colorProb)" 
                              animationDuration={2000}
                            />
                          </AreaChart>
                        </ResponsiveContainer>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            </div>

            {/* AI Insights Panel */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <AnimatePresence mode="wait">
                {loading ? (
                  Array(3).fill(0).map((_, i) => (
                    <div key={i} className="bg-zinc-900/20 border border-white/5 rounded-3xl p-8 h-[140px] animate-pulse flex flex-col gap-4">
                      <div className="w-1/3 h-2 bg-zinc-800 rounded-full" />
                      <div className="w-full h-8 bg-zinc-800 rounded-xl" />
                    </div>
                  ))
                ) : (
                  insights.map((insight, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="bg-zinc-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden group hover:border-amber-500/30 transition-all duration-500"
                    >
                      <div className={`absolute top-4 right-4 text-[8px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                        insight.impactLevel === 'High' ? 'bg-amber-500/20 text-amber-500' : 'bg-zinc-800 text-zinc-500'
                      }`}>
                        {insight.impactLevel}_Impact
                      </div>
                      <div className="flex items-center gap-3 mb-4">
                        <Sparkles className="w-4 h-4 text-amber-500/40 group-hover:text-amber-500 transition-colors" />
                        <h3 className="font-display text-sm font-black italic tracking-tighter uppercase text-white">{insight.title}</h3>
                      </div>
                      <p className="text-zinc-500 text-[10px] leading-relaxed uppercase tracking-widest font-medium">
                        {insight.analysis}
                      </p>
                    </motion.div>
                  ))
                )}
              </AnimatePresence>
              
              {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-2xl flex items-center gap-3">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                  <span className="text-[10px] uppercase font-black tracking-widest text-red-500">{error}</span>
                </div>
              )}
            </div>
          </div>
        </section>

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

