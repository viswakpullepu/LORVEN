import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  User, 
  Settings, 
  LogOut, 
  Calendar, 
  FileText, 
  Zap, 
  TrendingUp, 
  ChevronRight,
  MessageSquare,
  Clock,
  History,
  Rocket,
  DollarSign,
  Activity,
  Briefcase,
  HelpCircle,
  Sparkles,
  Brain,
  Layout,
  Target,
  Cpu,
  ShieldCheck,
  PartyPopper,
  XCircle,
  CheckCircle2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { getSupabase } from '../lib/supabase';

// Helper component for animated numbers
const Counter = ({ value, duration = 1.5, prefix = "", suffix = "" }: { value: number, duration?: number, prefix?: string, suffix?: string }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    const increment = end / (duration * 60);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [value, duration]);

  const formatted = count.toLocaleString(undefined, { maximumFractionDigits: (value % 1 === 0 ? 0 : 1) });
  return <span>{prefix}{formatted}{suffix}</span>;
};

interface Milestone {
  date: string;
  title: string;
  description: string;
  type: 'success' | 'ongoing' | 'future';
  icon: any;
  statusLabel: string;
}

interface UpcomingProject {
  title: string;
  startDate: string;
  description: string;
  status: 'initializing' | 'planning' | 'queued';
}

interface AIInsight {
  title: string;
  recommendation: string;
  impact: 'High' | 'Medium' | 'Low';
  category: string;
}

interface LiveActivity {
  id: string;
  message: string;
  time: string;
  icon: any;
  category: string;
}

const milestones: Milestone[] = [
  { 
    date: 'OCT 2025', 
    title: 'Partnership Initiation', 
    description: 'Establishment of secure data pipelines and initial strategic baseline audit.',
    type: 'success',
    icon: ShieldCheck,
    statusLabel: 'COMPLETED'
  },
  { 
    date: 'JAN 2026', 
    title: 'Market Entry Alpha', 
    description: 'Successful deployment of algorithmic entry strategies in selected Tier-2 markets.',
    type: 'success',
    icon: Activity,
    statusLabel: 'COMPLETED'
  },
  { 
    date: 'APR 2026', 
    title: 'Growth Acceleration', 
    description: 'Current execution phase focusing on scaling throughput and optimizing customer acquisition costs.',
    type: 'ongoing',
    icon: Zap,
    statusLabel: 'ACTIVE'
  },
  { 
    date: 'JUL 2026', 
    title: 'Strategic Mastery', 
    description: 'Planned realization of multi-vector dominance across core operational regions.',
    type: 'future',
    icon: Target,
    statusLabel: 'PLANNED'
  }
];

const sharedProjects: UpcomingProject[] = [
  {
    title: "Project Aethelgard: Neural Integration",
    startDate: "SEPTEMBER 2026",
    description: "Deployment of proprietary neural decision engines across your Tier-1 operational nodes to automate real-time risk mitigation.",
    status: "planning"
  },
  {
    title: "Quantum Growth Spurt: Phase Delta",
    startDate: "NOVEMBER 2026",
    description: "A multi-vector scaling operation targeting established European markets through high-frequency algorithmic positioning.",
    status: "initializing"
  },
  {
    title: "Horizon 2027: Asset Decoupling",
    startDate: "JANUARY 2027",
    description: "Executing a strategic shift in asset allocation to maximize liquidity while maintaining absolute market dominance in emerging sectors.",
    status: "queued"
  }
];

const aiInsights: AIInsight[] = [
  {
    title: "Strategic Scaling Opportunity",
    recommendation: "Operational efficiency in the APAC node is 22% higher than predicted. Redirecting excess throughput to European markets could capture $340k in quarterly revenue.",
    impact: 'High',
    category: 'Revenue'
  },
  {
    title: "Risk Mitigation Protocol",
    recommendation: "Predictive telemetry indicates a potential bottleneck in Phase Delta. Synchronizing Tier-3 assets 48 hours early is recommended to bypass saturation.",
    impact: 'Medium',
    category: 'Operation'
  },
  {
    title: "Cognitive Performance Window",
    recommendation: "Partner interaction patterns peak during pre-market hours. Scheduling strategic reviews at 07:00 UTC aligns with maximum engagement cycles.",
    impact: 'High',
    category: 'Strategy'
  }
];

const liveActivities: LiveActivity[] = [
  { id: '1', message: "Neural decision engine v4.2 synchronization completed", time: "2 hours ago", icon: Cpu, category: 'System' },
  { id: '2', message: "APAC market liquidity vector optimized", time: "5 hours ago", icon: Target, category: 'Strategic' },
  { id: '3', message: "Enterprise design system audit finalized", time: "8 hours ago", icon: Layout, category: 'Branding' },
  { id: '4', message: "High-level risk mitigation protocol initiated in EU node", time: "1 day ago", icon: ShieldCheck, category: 'Security' },
];

export default function ClientPortal() {
  const [user, setUser] = useState<any>(null);
  const [showCelebration, setShowCelebration] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
  const navigate = useNavigate();

  useEffect(() => {
    // Trigger celebration after a short delay for "demo" effect
    const timer = setTimeout(() => setShowCelebration(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await getSupabase().auth.getUser();
      setUser(user);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await getSupabase().auth.signOut();
    navigate('/');
  };

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 18) return "Good afternoon";
    return "Good evening";
  };

  const getDisplayName = () => {
    if (!user) return "PARTNER";
    const name = user.user_metadata?.full_name || user.user_metadata?.name;
    if (name) return name.toUpperCase();
    return user.email?.split('@')[0].toUpperCase().replace(/[._-]/g, ' ') || "PARTNER";
  };

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-amber-500 selection:text-black">
      {/* Navigation */}
      <nav className="border-b border-white/5 bg-black/50 backdrop-blur-xl px-10 py-6 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            <span className="font-display text-xl font-black uppercase tracking-tighter italic group-hover:text-amber-500 transition-colors">LORVEN</span>
            <div className="w-[1px] h-6 bg-white/10" />
            <span className="font-display text-[10px] uppercase tracking-[0.4em] text-amber-500">CLIENT_SPACE_01</span>
          </div>
          
          <div className="flex items-center gap-8">
            <div className="hidden lg:flex items-center gap-6 border-r border-white/10 pr-8">
              <button 
                onClick={() => navigate('/portal')}
                className="font-display text-[10px] uppercase tracking-[0.3em] text-amber-500 font-black"
              >
                Overview
              </button>
              <button 
                onClick={() => navigate('/dashboard')}
                className="font-display text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-white transition-colors font-black"
              >
                Executive Terminal
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="hidden md:flex flex-col items-end mr-4">
                <span className="font-display text-[10px] uppercase tracking-widest text-zinc-400">{user?.email}</span>
                <span className="font-display text-[8px] uppercase tracking-[0.2em] text-amber-500/50">Partner Identity Verified</span>
              </div>
              <button 
                onClick={handleLogout}
                className="p-2 hover:bg-white/5 rounded-full transition-colors group"
                title="Logout"
              >
                <LogOut className="w-5 h-5 text-zinc-500 group-hover:text-amber-500 transition-colors" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 md:px-10 py-10 md:py-16 flex flex-col gap-12">
        {/* Welcome Header */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-8"
            >
              <div className="flex items-center gap-3">
                <span className="w-8 md:w-16 h-px bg-amber-500" />
                <span className="font-display text-[10px] md:text-xs uppercase tracking-[0.5em] text-amber-500">{getGreeting()}</span>
              </div>
              <div className="hidden sm:flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
                <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                <span className="text-[8px] uppercase font-black tracking-widest text-zinc-400">Environment_Stable</span>
              </div>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="font-display text-5xl md:text-8xl font-black italic tracking-tighter leading-[0.85]"
            >
              WELCOME BACK,<br /> 
              <span className="text-zinc-800 not-italic">{getDisplayName()}.</span>
            </motion.h1>
          </div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:flex flex-col items-end gap-3 border-l border-white/10 pl-10 h-24 justify-center"
          >
            <div className="flex flex-col items-end gap-1">
              <span className="font-display text-[10px] uppercase tracking-[0.3em] text-zinc-500">Partnership Tenure</span>
              <span className="text-4xl font-display font-black">1.2 <span className="text-amber-500 italic">YEARS</span></span>
            </div>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="w-1 h-3 bg-amber-500/20 rounded-full" />
              ))}
              <div className="w-1 h-3 bg-amber-500 rounded-full" />
            </div>
          </motion.div>
        </header>

        <div className="grid grid-cols-12 gap-8 md:gap-12">
          
          {/* LEFT COLUMN: Primary Content (8 units) */}
          <div className="col-span-12 lg:col-span-8 flex flex-col gap-12">
            
            {/* 1. Impact Dashboard */}
            <section className="flex flex-col gap-8">
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="font-display text-xs uppercase tracking-[0.4em] text-zinc-500 font-black">Impact_Metrics.exe</h2>
                  <span className="text-[9px] uppercase tracking-[0.2em] text-zinc-700 font-medium">Last Updated: {lastUpdated}</span>
                </div>
                <div className="h-px flex-1 mx-6 bg-white/5" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { 
                    label: 'Revenue Impact', 
                    value: 2.4, 
                    prefix: '$', 
                    suffix: 'M', 
                    growth: '+42% YoY', 
                    icon: DollarSign, 
                    desc: 'Total capital appreciation generated through strategic optimizations.',
                    path: '/strategy'
                  },
                  { 
                    label: 'Time Autonomy', 
                    value: 160, 
                    suffix: ' HRS/MO', 
                    growth: 'Efficiency Peak', 
                    icon: Clock, 
                    desc: 'Operational hours reclaimed via automation and process restructuring.',
                    path: '/telemetry'
                  },
                  { 
                    label: 'Perf. Index', 
                    value: 88.4, 
                    suffix: '%', 
                    growth: 'High Yield', 
                    icon: Activity, 
                    desc: 'Aggregate performance growth across tracked operational KPIs.',
                    path: '/telemetry'
                  },
                  { 
                    label: 'Active Directives', 
                    value: 12, 
                    growth: '3 In-Queue', 
                    icon: Briefcase, 
                    desc: 'Current high-priority projects under Lorven execution.',
                    path: '/growth'
                  },
                ].map((metric, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 * i }}
                    onClick={() => navigate(metric.path)}
                    className="group bg-zinc-900/40 border border-white/5 p-8 rounded-3xl relative overflow-hidden flex flex-col gap-6 hover:border-amber-500/30 transition-all duration-700 hover:bg-zinc-900/60 cursor-pointer text-left"
                  >
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] rounded-full -mr-16 -mt-16 group-hover:bg-amber-500/10 transition-colors" />
                    
                    <div className="flex justify-between items-start relative z-10">
                      <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-amber-500 transition-transform duration-500 group-hover:scale-110">
                        <metric.icon className="w-6 h-6" />
                      </div>
                      <span className="text-[9px] font-display font-black uppercase tracking-[0.2em] px-3 py-1.5 bg-amber-500/10 text-amber-500 rounded-lg">
                        {metric.growth}
                      </span>
                    </div>

                    <div className="relative z-10">
                      <div className="text-4xl font-display font-black text-white italic tracking-tighter">
                        <Counter value={metric.value} prefix={metric.prefix} suffix={metric.suffix} />
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] uppercase tracking-[0.2em] text-zinc-500 font-black">{metric.label}</span>
                        <div className="group/tip relative">
                          <HelpCircle className="w-3.5 h-3.5 text-zinc-700 cursor-help hover:text-amber-500 transition-colors" />
                          <div className="absolute bottom-full left-0 mb-3 w-64 p-4 bg-zinc-800 text-[10px] text-zinc-300 rounded-xl opacity-0 group-hover/tip:opacity-100 transition-all pointer-events-none border border-white/5 shadow-2xl z-20 leading-relaxed uppercase tracking-[0.2em] translate-y-2 group-hover/tip:translate-y-0 backdrop-blur-xl">
                            {metric.desc}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </section>

            {/* 2. Success Chronicle (Timeline) */}
            <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-amber-500/[0.02] blur-[100px] rounded-full -mr-48 -mt-48" />
              
              <div className="flex flex-col gap-2 mb-16 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-amber-500/10 rounded-2xl flex items-center justify-center border border-amber-500/20">
                    <History className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase leading-none">Success Chronicle</h2>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-2 mb-1">Strategic Evolution Timeline</p>
                  </div>
                </div>
              </div>

              <motion.div 
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                variants={{
                  hidden: { opacity: 0 },
                  show: {
                    opacity: 1,
                    transition: { staggerChildren: 0.2 }
                  }
                }}
                className="space-y-12 relative z-10"
              >
                {milestones.map((m, idx) => (
                  <motion.div 
                    key={idx}
                    onClick={() => navigate('/telemetry')}
                    variants={{
                      hidden: { opacity: 0, x: -20 },
                      show: { opacity: 1, x: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
                    }}
                    className="flex gap-8 md:gap-12 group/item relative cursor-pointer"
                  >
                    <div className="flex flex-col items-center relative">
                      <motion.div 
                        whileHover={{ scale: 1.15, rotate: 5 }}
                        className={`w-12 h-12 md:w-16 md:h-16 rounded-2xl flex items-center justify-center border-2 z-10 transition-all duration-700 bg-black ${
                          m.type === 'success' ? 'border-amber-500/40 text-amber-500 shadow-[0_0_40px_rgba(245,158,11,0.15)]' :
                          m.type === 'ongoing' ? 'border-white text-white shadow-[0_0_40px_rgba(255,255,255,0.1)]' : 'border-zinc-800 text-zinc-700'
                        }`}
                      >
                        <m.icon className="w-6 h-6 md:w-8 md:h-8" />
                      </motion.div>
                      {idx !== milestones.length - 1 && (
                        <div className={`w-px h-full mt-4 absolute top-12 left-1/2 -translate-x-1/2 transition-colors duration-1000 ${
                          m.type === 'success' ? 'bg-amber-500/20' : 'bg-zinc-800'
                        }`} />
                      )}
                    </div>
                    <div className="flex flex-col gap-4 pb-16 flex-1 group/content">
                      <div className="flex flex-wrap items-center gap-5">
                        <span className="font-display text-[11px] md:text-xs uppercase tracking-[0.5em] text-zinc-500 group-hover/item:text-amber-500 transition-colors font-black">
                          {m.date}
                        </span>
                        <div className={`px-3 py-1 rounded-lg text-[9px] font-black uppercase tracking-[0.2em] ${
                          m.type === 'success' ? 'bg-amber-500/10 text-amber-500' :
                          m.type === 'ongoing' ? 'bg-white text-black' : 'bg-zinc-900 text-zinc-600'
                        }`}>
                          {m.statusLabel}
                        </div>
                      </div>
                      <h3 className="font-display text-3xl md:text-5xl font-black italic tracking-tighter text-white uppercase group-hover/item:translate-x-4 transition-transform duration-700">
                        {m.title}
                      </h3>
                      <p className="text-zinc-500 text-sm md:text-lg max-w-2xl leading-relaxed font-medium group-hover/item:text-zinc-300 transition-colors">
                        {m.description}
                      </p>
                      
                      <div className="pt-4 flex gap-4 opacity-40 group-hover/item:opacity-100 transition-opacity">
                        <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                          Verified_Asset
                        </div>
                        <div className="px-4 py-2 bg-white/5 border border-white/5 rounded-xl text-[10px] uppercase tracking-widest text-zinc-500 font-black">
                          Node_Locked
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </section>

            {/* 3. Live Activity Feed */}
            <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 md:p-12 flex flex-col gap-10 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/[0.03] blur-[80px] rounded-full -ml-32 -mt-32" />
              
              <div className="flex justify-between items-center relative z-10">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center text-amber-500">
                    <Activity className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-display text-2xl font-black italic tracking-tighter text-white uppercase leading-none">Operational Telemetry</h2>
                    <p className="text-zinc-500 text-[10px] uppercase tracking-[0.4em] mt-1">Live Feed Pipeline</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 px-4 py-2 bg-amber-500/5 rounded-xl border border-amber-500/10">
                   <div className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-ping" />
                   <span className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">Real_Time_Execution</span>
                </div>
              </div>

              <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-6">
                {liveActivities.map((activity, i) => (
                  <motion.div
                    key={activity.id}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="group relative flex gap-6 p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-amber-500/30 transition-all duration-500"
                  >
                    <div className={`w-12 h-12 shrink-0 rounded-xl flex items-center justify-center border transition-all duration-700 ${
                      i === 0 ? 'bg-amber-500/10 border-amber-500/30' : 'bg-black/60 border-white/5'
                    }`}>
                      <activity.icon className={`w-5 h-5 ${i === 0 ? 'text-amber-500' : 'text-zinc-600'}`} />
                    </div>
                    
                    <div className="flex flex-col gap-2 flex-1">
                      <div className="flex items-center justify-between">
                         <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${i === 0 ? 'text-amber-500' : 'text-zinc-600'}`}>
                           {activity.category}
                         </span>
                         <span className="text-[9px] font-display text-zinc-700 uppercase tracking-widest font-black">
                           {activity.time}
                         </span>
                      </div>
                      <p className={`text-sm leading-relaxed font-semibold transition-colors ${i === 0 ? 'text-white' : 'text-zinc-500 group-hover:text-zinc-300'}`}>
                        {activity.message}
                      </p>
                    </div>
                    
                    {i === 0 && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-12 bg-amber-500 rounded-full shadow-[0_0_15px_rgba(245,158,11,0.6)]" />
                    )}
                  </motion.div>
                ))}
              </div>
              
              <button 
                onClick={() => navigate('/telemetry')}
                className="font-display text-[11px] font-black uppercase tracking-[0.4em] text-zinc-700 hover:text-amber-500 transition-all duration-500 text-center pt-4 flex items-center justify-center gap-3 group"
              >
                 <div className="h-px w-8 bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
                 Open Comprehensive Archives
                 <div className="h-px w-8 bg-zinc-800 group-hover:bg-amber-500 transition-colors" />
              </button>
            </section>
          </div>

          {/* RIGHT COLUMN: Secondary Panels (4 units) */}
          <aside className="col-span-12 lg:col-span-4 flex flex-col gap-12">
            
            {/* 4. AI Strategic Insights Panel */}
            <motion.section 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-zinc-900/60 border border-amber-500/20 rounded-[2.5rem] p-8 relative overflow-hidden backdrop-blur-2xl group flex flex-col gap-8 shadow-[0_30px_60px_rgba(0,0,0,0.4)]"
            >
              <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/[0.05] blur-[80px] rounded-full -mr-32 -mt-32 animate-pulse" />
              
              <div className="flex flex-col gap-4 relative z-10">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-500 blur-[15px] opacity-20 animate-pulse" />
                    <div className="w-14 h-14 bg-black border border-amber-500/20 rounded-2xl flex items-center justify-center relative z-10">
                      <Brain className="w-7 h-7 text-amber-500" />
                    </div>
                  </div>
                  <div>
                    <h2 className="font-display text-xl font-black italic tracking-tighter uppercase text-white leading-none">Neural Insights</h2>
                    <p className="font-display text-[9px] uppercase tracking-[0.4em] text-amber-500/60 mt-1.5">Alpha_Core_01</p>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-6 relative z-10">
                {aiInsights.map((insight, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15 }}
                    onClick={() => navigate('/risk')}
                    className="flex flex-col gap-4 p-6 bg-black/60 border border-white/5 rounded-2xl hover:border-amber-500/30 transition-all duration-700 group/insight cursor-pointer"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display text-[8px] uppercase tracking-[0.4em] text-zinc-700 font-black group-hover/insight:text-amber-500/60 transition-colors">[{insight.category}]</span>
                      <div className="flex items-center gap-2">
                        <div className={`w-1.5 h-1.5 rounded-full ${insight.impact === 'High' ? 'bg-amber-500 shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'bg-zinc-600'}`} />
                        <span className={`text-[8px] font-black uppercase tracking-widest ${insight.impact === 'High' ? 'text-amber-500' : 'text-zinc-500'}`}>{insight.impact}_PROJECTION</span>
                      </div>
                    </div>
                    <h3 className="font-display text-base font-bold text-white uppercase tracking-tight leading-tight">{insight.title}</h3>
                    <p className="text-zinc-500 text-[11px] leading-relaxed font-medium uppercase tracking-[0.05em]">
                      {insight.recommendation}
                    </p>
                  </motion.div>
                ))}
              </div>

              <button 
                onClick={() => navigate('/risk')}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.4em] text-zinc-500 hover:bg-amber-500 hover:text-black hover:border-amber-500 transition-all duration-700 mt-2"
              >
                Sync_Neural_Architecture
              </button>
            </motion.section>

            {/* 5. Upcoming Projects (Roadmap) */}
            <section className="bg-zinc-900/40 border border-white/5 rounded-[2.5rem] p-8 flex flex-col gap-8 relative overflow-hidden">
               <div className="absolute bottom-0 right-0 w-48 h-48 bg-amber-500/[0.02] blur-[60px] rounded-full -mr-24 -mb-24" />
               
               <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 bg-black border border-white/10 rounded-2xl flex items-center justify-center">
                    <Rocket className="w-6 h-6 text-amber-500" />
                  </div>
                  <div>
                    <h2 className="font-display text-xl uppercase tracking-widest font-black text-white">Roadmap_01</h2>
                    <p className="text-zinc-500 text-[9px] uppercase tracking-[0.4em] mt-1.5">Future Directives</p>
                  </div>
                </div>

                <div className="flex flex-col gap-4 relative z-10">
                  {sharedProjects.map((project, idx) => (
                    <motion.div
                      key={idx}
                      onClick={() => navigate('/growth')}
                      initial={{ opacity: 0, y: 15 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: idx * 0.1 }}
                      className="group bg-black/40 border border-white/5 p-6 rounded-2xl hover:border-amber-500/30 transition-all duration-500 relative cursor-pointer"
                    >
                      <div className="flex justify-between items-center mb-4">
                        <span className="font-display text-[9px] uppercase tracking-[0.3em] text-amber-500/40 font-black">DIR_{idx + 1}</span>
                        <div className={`px-2 py-0.5 rounded-lg text-[8px] font-black uppercase tracking-widest ${
                          project.status === 'initializing' ? 'bg-amber-500 text-black' :
                          project.status === 'planning' ? 'bg-white text-black' : 'bg-zinc-800 text-zinc-500'
                        }`}>
                          {project.status}
                        </div>
                      </div>
                      <h3 className="font-display text-lg font-bold text-white mb-3 group-hover:text-amber-500 transition-colors uppercase tracking-tight leading-tight italic">
                        {project.title}
                      </h3>
                      <div className="flex items-center gap-2 mb-4 bg-white/5 w-fit px-3 py-1.5 rounded-lg border border-white/5">
                        <Calendar className="w-3 h-3 text-amber-500" />
                        <span className="font-display text-[9px] uppercase tracking-[0.2em] text-zinc-400 font-bold">
                          {project.startDate}
                        </span>
                      </div>
                      <p className="text-zinc-500 text-[11px] leading-relaxed font-medium uppercase tracking-widest opacity-80 group-hover:opacity-100 transition-opacity">
                        {project.description.substring(0, 80)}...
                      </p>
                    </motion.div>
                  ))}
                </div>
            </section>

            {/* Quick Metrics & System Status */}
            <div className="flex flex-col gap-6">
              <div className="bg-amber-500 p-10 rounded-[2.5rem] flex flex-col gap-10 group hover:scale-[1.03] transition-all duration-1000 shadow-[0_20px_40px_rgba(245,158,11,0.2)]">
                 <div className="flex justify-between items-start text-black">
                   <Zap className="w-10 h-10 font-black animate-pulse" />
                   <span className="font-display text-[10px] uppercase tracking-[0.4em] font-black opacity-30">Status_Online</span>
                 </div>
                 <div>
                    <h3 className="font-display text-4xl md:text-5xl font-black text-black italic uppercase italic leading-[0.85] tracking-tighter">STRATEGIC<br /><span className="not-italic">DOMINANCE.</span></h3>
                    <p className="text-black/60 text-[11px] mt-6 font-black uppercase tracking-[0.3em] leading-relaxed">Neural infrastructure synchronized across 24 global nodes. Execution potential: 100%.</p>
                 </div>
              </div>

              <div 
                onClick={() => navigate('/risk')}
                className="bg-zinc-900/60 border border-white/10 rounded-[2.5rem] p-10 text-center flex flex-col items-center gap-6 group cursor-pointer hover:bg-zinc-800 transition-all duration-700"
              >
                 <div className="w-16 h-16 bg-black border border-white/5 rounded-2xl flex items-center justify-center group-hover:scale-110 group-hover:rotate-12 transition-all duration-700 shadow-2xl">
                   <MessageSquare className="w-7 h-7 text-amber-500" />
                 </div>
                 <div className="flex flex-col gap-2">
                    <h3 className="font-display text-xs uppercase tracking-[0.5em] font-black text-white italic">Direct Advisory Line</h3>
                    <p className="text-[10px] text-zinc-500 uppercase tracking-[0.3em] leading-relaxed font-bold">Synchronize with your Senior Strategic Partner instantly.</p>
                 </div>
              </div>
            </div>

          </aside>

        </div>
      </main>

      {/* Floating Milestone Celebration */}
      <AnimatePresence>
        {showCelebration && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            className="fixed bottom-10 left-1/2 -translate-x-1/2 z-[100] w-[calc(100%-48px)] max-w-lg"
          >
            <div className="bg-zinc-900/90 backdrop-blur-3xl border border-amber-500/30 p-8 rounded-[2.5rem] shadow-[0_50px_100px_rgba(0,0,0,0.8)] relative overflow-hidden group">
              <div className="absolute inset-0 bg-amber-500/[0.03] animate-pulse" />
              <div className="absolute top-0 right-0 p-4">
                 <button onClick={() => setShowCelebration(false)} className="text-zinc-600 hover:text-white transition-colors">
                    <XCircle className="w-5 h-5" />
                 </button>
              </div>
              
              <div className="flex items-center gap-8 relative z-10">
                <div className="relative shrink-0">
                  <div className="absolute inset-0 bg-amber-500 blur-[30px] opacity-30 animate-ping" />
                  <div className="w-20 h-20 bg-amber-500 text-black rounded-3xl flex items-center justify-center shadow-[0_0_40px_rgba(245,158,11,0.4)]">
                    <PartyPopper className="w-10 h-10" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <span className="font-display text-[10px] uppercase tracking-[0.5em] text-amber-500 font-black underline underline-offset-8 decoration-amber-500/30">Milestone_03_Unlocked</span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl font-black italic tracking-tighter text-white uppercase leading-none mt-2">Efficiency Threshold Achieved.</h3>
                  <p className="text-zinc-400 text-xs md:text-sm mt-3 font-medium leading-relaxed uppercase tracking-widest">Your operational node has officially crossed the 85% autonomy index. Revenue scaling pipeline is now active.</p>
                  
                  <div className="flex gap-4 mt-6">
                    <button 
                      onClick={() => navigate('/strategy')}
                      className="px-6 py-3 bg-amber-500 text-black font-display font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white transition-all shadow-xl"
                    >
                      View Audit Details
                    </button>
                    <button onClick={() => setShowCelebration(false)} className="px-6 py-3 bg-white/5 border border-white/10 text-white font-display font-black text-[10px] uppercase tracking-[0.3em] rounded-xl hover:bg-white/10 transition-all">
                      Acknowledge
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer Branding */}
      <footer className="max-w-7xl mx-auto px-10 py-20 border-t border-white/5 mt-20">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8 opacity-20 hover:opacity-100 transition-opacity duration-1000">
           <div className="flex flex-col gap-1">
             <span className="font-display text-xs uppercase tracking-[0.4em] font-black italic">LORVEN GLOBAL</span>
             <span className="font-display text-[9px] uppercase tracking-[0.2em] text-zinc-500">Absolute Intelligence Engineering</span>
           </div>
           <div className="flex gap-12 font-display text-[9px] uppercase tracking-[0.4em] text-zinc-500">
             <span>Protocol_01</span>
             <span>Secured_Shell</span>
             <span>Alpha_Access</span>
           </div>
        </div>
      </footer>
    </div>
  );
}
