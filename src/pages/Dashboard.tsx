import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import Logo from '../components/Logo';
import { 
  LayoutDashboard, 
  Share2, 
  ShieldCheck, 
  TrendingUp, 
  Settings, 
  Rocket,
  ArrowUp,
  Cpu,
  Globe,
  GanttChartSquare,
  AlertCircle,
  MoreHorizontal,
  ChevronRight,
  Database,
  UserPlus,
  UserMinus,
  IdCard,
  Mail,
  ShieldAlert,
  LogOut,
  Key,
  Clock,
  Activity,
  Zap,
  Briefcase,
  HardDrive,
  Network
} from 'lucide-react';
import { IMAGES } from '../constants';
import { cn } from '../lib/utils';
import { getSupabase, signOut, updatePassword } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { User } from '@supabase/supabase-js';

interface NavItemProps {
  icon: React.ElementType;
  label: string;
  active?: boolean;
  onClick: () => void;
}

function NavItem({ icon: Icon, label, active, onClick }: NavItemProps) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-4 py-3 transition-all duration-300 font-display uppercase tracking-widest text-[10px] border-l-4 rounded-r-lg text-left",
        active 
          ? "bg-amber-500/10 text-amber-500 border-amber-500 shadow-[inset_10px_0_20px_-10px_rgba(212,175,55,0.15)]" 
          : "text-zinc-500 hover:bg-zinc-800/50 hover:text-amber-500 border-transparent"
      )}
    >
      <Icon className="w-[18px] h-[18px]" />
      {label}
    </button>
  );
}

interface Member {
  id: string;
  name: string;
  email: string;
  role: string;
  addedAt: string;
}

function DigitalClock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex items-center gap-2 font-mono text-[10px] text-zinc-500 bg-black/40 px-3 py-1 rounded border border-white/5">
      <Clock className="w-3 h-3 text-amber-500/50" />
      <span>{time.toLocaleTimeString([], { hour12: false })}</span>
    </div>
  );
}

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Dashboard');
  
  // existing members state...
  const [members, setMembers] = useState<Member[]>(() => {
    const saved = localStorage.getItem('lorven_members');
    return saved ? JSON.parse(saved) : [
      { id: '1', name: 'Viswak', email: 'viswak@lorven.intel', role: 'Main Admin', addedAt: '2026-04-01' }
    ];
  });

  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Strategist' });
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const [isUpdatingPassword, setIsUpdatingPassword] = useState(false);
  const [passwordStatus, setPasswordStatus] = useState<{ type: 'success' | 'error', msg: string } | null>(null);

  useEffect(() => {
    const checkUser = async () => {
      const supabase = getSupabase();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate('/login');
      } else {
        setUser(user);
      }
      setLoading(false);
    };
    checkUser();
  }, [navigate]);

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newPassword.length < 6) {
      setPasswordStatus({ type: 'error', msg: 'Password must be at least 6 characters.' });
      return;
    }

    setIsUpdatingPassword(true);
    setPasswordStatus(null);
    try {
      await updatePassword(newPassword);
      setPasswordStatus({ type: 'success', msg: 'Security key updated successfully.' });
      setNewPassword('');
      setTimeout(() => setShowPasswordModal(false), 2000);
    } catch (err: any) {
      setPasswordStatus({ type: 'error', msg: err.message || 'Failed to update security key.' });
    } finally {
      setIsUpdatingPassword(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  useEffect(() => {
    localStorage.setItem('lorven_members', JSON.stringify(members));
  }, [members]);

  const addMember = () => {
    if (!newMember.name || !newMember.email) return;
    const member: Member = {
      id: Math.random().toString(36).substr(2, 9),
      name: newMember.name,
      email: newMember.email,
      role: newMember.role,
      addedAt: new Date().toISOString().split('T')[0]
    };
    setMembers([...members, member]);
    setNewMember({ name: '', email: '', role: 'Strategist' });
  };

  const removeMember = (id: string) => {
    const member = members.find(m => m.id === id);
    if (member?.name.toUpperCase() === 'VISWAK') return;
    setMembers(members.filter(m => m.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6 text-center">
        <Logo size={80} className="mb-8 opacity-20" />
        <div className="w-48 h-1 bg-zinc-900 overflow-hidden rounded-full">
          <motion.div 
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
            className="w-full h-full bg-primary"
          />
        </div>
        <p className="mt-4 font-label-caps text-zinc-500 text-[10px] tracking-[0.2em] uppercase">Checking Identification</p>
      </div>
    );
  }

  const userDisplayName = user?.user_metadata?.full_name || user?.email?.split('@')[0] || 'Unknown User';
  const userAvatar = user?.user_metadata?.avatar_url || IMAGES.STRATEGIST_AVATAR;

  return (
    <div className="bg-background text-on-surface flex min-h-screen overflow-hidden selection:bg-primary/30 selection:text-primary font-sans">
      {/* Sidebar */}
      <aside className="bg-zinc-950/80 backdrop-blur-xl h-screen w-64 fixed left-0 border-r border-amber-500/20 shadow-[0_0_20px_rgba(212,175,55,0.1)] z-50">
        <div className="flex flex-col h-full py-6">
          {/* Brand */}
          <div className="px-6 mb-12 flex items-center gap-4 cursor-pointer group" onClick={() => navigate('/')}>
            <Logo size={48} className="group-hover:scale-110 transition-transform duration-500" />
            <div>
              <h1 className="text-amber-500 font-bold font-display text-sm tracking-wide group-hover:text-amber-400 transition-colors">Terminal</h1>
              <span className="text-zinc-500 text-[10px] uppercase tracking-widest font-display">Intelligence Grid</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 flex flex-col gap-1 px-3">
            <NavItem icon={LayoutDashboard} label="Dashboard" active={activeTab === 'Dashboard'} onClick={() => setActiveTab('Dashboard')} />
            <NavItem icon={Briefcase} label="Client Portal" active={activeTab === 'Client Portal'} onClick={() => navigate('/portal')} />
            <NavItem icon={TrendingUp} label="Market Strategy" active={activeTab === 'Market Strategy'} onClick={() => navigate('/strategy')} />
            <NavItem icon={Activity} label="Operational Feed" active={activeTab === 'Operational Telemetry'} onClick={() => navigate('/telemetry')} />
            <NavItem icon={Rocket} label="Asset Pipeline" active={activeTab === 'Asset Pipeline'} onClick={() => navigate('/growth')} />
            <NavItem icon={ShieldCheck} label="Risk Analysis" active={activeTab === 'Risk Analysis'} onClick={() => navigate('/risk')} />
            <div className="my-4 h-px bg-white/5 mx-4" />
            <NavItem icon={Settings} label="Admin Settings" active={activeTab === 'Admin Settings'} onClick={() => setActiveTab('Admin Settings')} />
          </nav>

          {/* User Profile */}
          <div className="px-6 mt-auto pt-6 border-t border-amber-500/10 flex flex-col gap-4">
            <div className="flex items-center gap-3 group">
              <div className="w-9 h-9 rounded-full border border-amber-500/30 overflow-hidden relative bg-zinc-900 flex items-center justify-center group-hover:border-amber-500/60 transition-colors">
                <img src={userAvatar} className="w-full h-full object-cover opacity-80" alt="User" referrerPolicy="no-referrer" />
              </div>
              <div className="flex flex-col overflow-hidden">
                <span className="font-display uppercase tracking-widest text-[9px] text-zinc-500 truncate">Authenticated As</span>
                <span className="font-display text-xs text-amber-500/80 truncate capitalize">{userDisplayName}</span>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-zinc-500 hover:text-error hover:bg-error/5 transition-all text-[10px] font-label-caps border border-white/5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sever Connection
            </button>

            {user?.app_metadata?.provider === 'email' && (
              <button 
                onClick={() => setShowPasswordModal(true)}
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded text-zinc-500 hover:text-primary hover:bg-primary/5 transition-all text-[10px] font-label-caps border border-white/5"
              >
                <Key className="w-3.5 h-3.5" />
                Change Security Key
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Password Change Modal */}
      <AnimatePresence>
        {showPasswordModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowPasswordModal(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-md bg-zinc-900 border border-white/10 p-8 rounded-xl shadow-2xl"
            >
              <h2 className="font-display text-amber-500 text-lg mb-2 uppercase tracking-widest">Update Security Key</h2>
              <p className="text-zinc-500 text-xs font-body-md mb-6">Modify your enterprise authentication credentials.</p>
              
              <form onSubmit={handlePasswordChange} className="flex flex-col gap-4">
                {passwordStatus && (
                  <div className={cn(
                    "p-3 rounded text-[11px] font-medium text-center",
                    passwordStatus.type === 'success' ? "bg-green-500/10 text-green-500 border border-green-500/20" : "bg-error/10 text-error border border-error/20"
                  )}>
                    {passwordStatus.msg}
                  </div>
                )}
                
                <div className="flex flex-col gap-1.5">
                  <label className="font-label-caps text-zinc-500 text-[9px] tracking-widest uppercase ml-1">New Security Key</label>
                  <input 
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Enter new password"
                    className="w-full bg-zinc-800/50 border border-white/5 rounded px-4 py-3 text-sm focus:outline-none focus:border-amber-500/50"
                    required
                  />
                </div>

                <div className="flex gap-3 mt-4">
                  <button 
                    type="button"
                    onClick={() => setShowPasswordModal(false)}
                    className="flex-1 px-4 py-3 bg-zinc-800 text-zinc-400 rounded font-label-caps text-[10px] hover:bg-zinc-700 transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    disabled={isUpdatingPassword}
                    className="flex-1 px-4 py-3 bg-amber-500 text-zinc-950 rounded font-label-caps text-[10px] font-bold hover:bg-amber-400 transition-colors shadow-lg shadow-amber-500/10 disabled:opacity-50"
                  >
                    {isUpdatingPassword ? 'Syncing...' : 'Confirm Update'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="ml-64 flex-1 h-screen overflow-y-auto bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-surface-container/60 via-background to-background relative font-sans">
        {/* Ambient Data Particles Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(212,175,55,0.03)_1px,_transparent_1px)] bg-[size:40px_40px] opacity-20 pointer-events-none"></div>

        <div className="p-10 max-w-[1440px] mx-auto relative z-10">
          {activeTab === 'Dashboard' ? (
            <>
              {/* Header */}
              <header className="flex justify-between items-end mb-10 border-b border-white/5 pb-6">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="font-display text-[9px] uppercase tracking-[0.4em] text-amber-500/60">Execution Terminal</span>
                    <ChevronRight className="w-3 h-3 text-zinc-800" />
                    <span className="font-display text-[9px] uppercase tracking-[0.4em] text-zinc-500">Node_01</span>
                  </div>
                  <h2 className="font-headline-xl text-on-surface mb-2 tracking-tight">Executive Control</h2>
                  <p className="font-body-lg text-on-surface-variant flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(212,175,55,0.8)] animate-pulse"></span>
                    Holographic telemetry active. All systems nominal.
                  </p>
                </motion.div>
                <div className="flex items-center gap-4">
                  <DigitalClock />
                  <div className="h-8 w-px bg-white/5 mx-2" />
                  <button className="px-6 py-2.5 bg-transparent border border-outline/30 text-on-surface-variant font-label-caps rounded flex items-center gap-2 hover:bg-white/5 transition-colors">
                    <GanttChartSquare className="w-4 h-4" />
                    Parameters
                  </button>
                  <button className="px-8 py-2.5 bg-primary text-on-primary font-label-caps rounded shadow-[0_0_20px_rgba(212,175,55,0.3)] hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] hover:bg-primary-fixed-dim transition-all">
                    Deploy Strategy
                  </button>
                </div>
              </header>

              {/* Grid */}
              <div className="grid grid-cols-12 gap-6">
                {/* Global Map */}
                <motion.div 
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="col-span-12 lg:col-span-8 row-span-2 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden flex flex-col group hover:border-primary/20 transition-colors duration-500"
                >
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <div className="flex justify-between items-center mb-6 relative z-10">
                    <h3 className="font-headline-md text-on-surface">Global Asset Pipeline</h3>
                    <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-secondary/10 text-secondary font-label-caps text-[10px] rounded border border-secondary/20">Live Sync</span>
                      <MoreHorizontal className="w-5 h-5 text-outline" />
                    </div>
                  </div>
                  <div className="flex-1 relative rounded-lg border border-white/5 bg-black/40 overflow-hidden min-h-[360px]">
                    <img src={IMAGES.GLOBE_HOLOGRAPHIC} className="absolute inset-0 w-full h-full object-cover mix-blend-screen opacity-70 scale-105" alt="Holographic Globe" referrerPolicy="no-referrer" />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-transparent to-background/30"></div>
                    
                    <div className="absolute bottom-6 left-6 flex gap-8">
                      <div>
                        <div className="font-label-caps text-outline mb-1">Active Nodes</div>
                        <div className="font-headline-lg text-primary">1,204</div>
                      </div>
                      <div>
                        <div className="font-label-caps text-outline mb-1">Bandwidth</div>
                        <div className="font-headline-lg text-secondary">98.4%</div>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Yield Projection */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 border-l-2 border-l-primary relative overflow-hidden flex flex-col"
                >
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-primary/10 rounded-full blur-3xl pointer-events-none"></div>
                  <h3 className="font-label-caps text-on-surface-variant mb-2">Total Yield Projection</h3>
                  <div className="font-headline-xl text-on-surface mb-1">$4.2B</div>
                  <div className="font-body-md text-sm text-primary flex items-center gap-1 mb-6">
                    <ArrowUp className="w-3.5 h-3.5" /> +14.2% Growth
                  </div>
                  <div className="flex-1 relative rounded border border-white/5 bg-black/20 overflow-hidden min-h-[160px]">
                    <img src={IMAGES.BAR_CHART_3D} className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-screen" alt="Chart" referrerPolicy="no-referrer" />
                  </div>
                </motion.div>

                {/* Risk Exposure */}
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                  className="col-span-12 md:col-span-6 lg:col-span-4 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 border-l-2 border-l-tertiary relative overflow-hidden flex flex-col"
                >
                  <div className="absolute -right-16 -top-16 w-48 h-48 bg-tertiary/10 rounded-full blur-3xl pointer-events-none"></div>
                  <h3 className="font-label-caps text-on-surface-variant mb-2">Risk Exposure Level</h3>
                  <div className="font-headline-xl text-on-surface mb-1">Nominal</div>
                  <div className="font-body-md text-sm text-tertiary flex items-center gap-1 mb-6">
                    <ShieldCheck className="w-3.5 h-3.5" /> Protected State
                  </div>
                  <div className="flex-1 relative rounded border border-white/5 bg-black/20 overflow-hidden min-h-[160px] flex items-center justify-center">
                    <img src={IMAGES.RADAR_HOLOGRAPHIC} className="absolute inset-0 w-full h-full object-cover opacity-50 mix-blend-screen scale-125" alt="Radar" referrerPolicy="no-referrer" />
                    <div className="absolute w-12 h-12 rounded-full border border-tertiary/50 shadow-[0_0_15px_rgba(186,207,255,0.4)] z-10 flex items-center justify-center bg-black/50 backdrop-blur">
                      <Database className="w-5 h-5 text-tertiary" />
                    </div>
                  </div>
                </motion.div>

                {/* System Health */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className="col-span-12 lg:col-span-4 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col gap-4"
                >
                  <div className="flex justify-between items-center">
                    <h3 className="font-label-caps text-on-surface-variant">System Status</h3>
                    <div className="flex gap-1">
                      {[1,2,3,4].map(i => <div key={i} className="w-1.5 h-1.5 bg-primary/40 rounded-full" />)}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-white/5 border border-white/5 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Cpu className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-display">Compute</span>
                      </div>
                      <div className="text-xl font-display text-white">42%</div>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-display">Latency</span>
                      </div>
                      <div className="text-xl font-display text-white">12ms</div>
                    </div>
                    <div className="p-3 bg-white/5 border border-white/5 rounded col-span-2">
                      <div className="flex items-center gap-2 mb-2">
                        <HardDrive className="w-3 h-3 text-amber-500" />
                        <span className="text-[9px] uppercase tracking-widest text-zinc-500 font-display">Neural Storage</span>
                      </div>
                      <div className="w-full bg-white/10 h-1 rounded-full overflow-hidden">
                        <div className="w-4/5 h-full bg-amber-500" />
                      </div>
                      <div className="mt-2 text-[10px] text-zinc-600 font-display uppercase tracking-widest">842.1 TB / 1.0 PB</div>
                    </div>
                  </div>
                </motion.div>

                {/* Strategic Matrix */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-12 lg:col-span-6 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 relative overflow-hidden min-h-[300px] flex flex-col justify-end"
                >
                  <img src={IMAGES.MATRIX_STRUCTURAL} className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-plus-lighter pointer-events-none" alt="Matrix" referrerPolicy="no-referrer" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/90 via-background/40 to-transparent pointer-events-none"></div>
                  <div className="relative z-10">
                    <h3 className="font-headline-md text-on-surface mb-2">Growth Matrix Analysis</h3>
                    <p className="font-body-md text-on-surface-variant max-w-md">Multi-dimensional assessment of current portfolio vectors against predicted market volatilities.</p>
                    <button className="mt-6 px-5 py-2 bg-white/5 border border-white/10 hover:border-primary/50 text-on-surface font-label-caps rounded backdrop-blur transition-colors">
                      Initiate Deep Scan
                    </button>
                  </div>
                </motion.div>

                {/* Telemetry Logs */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="col-span-12 lg:col-span-6 bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6 flex flex-col"
                >
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-headline-md text-on-surface">System Telemetry Log</h3>
                    <span className="font-label-caps text-outline">Last 24h</span>
                  </div>
                  <div className="space-y-4 flex-1 overflow-y-auto max-h-[220px] scrollbar-hide">
                    <LogItem 
                      icon={Activity} 
                      title="Neural Net Calibrated" 
                      desc="Optimization sequence completed across primary alpha clusters." 
                      time="T-00:02:14"
                      color="primary"
                    />
                    <LogItem 
                      icon={Network} 
                      title="Market Protocol Sync" 
                      desc="Ingesting real-time volume data from European sector nodes." 
                      time="T-00:15:30"
                      color="secondary"
                    />
                    <LogItem 
                      icon={ShieldCheck} 
                      title="Compliance Audit" 
                      desc="Automated ledger verification executed without anomalies." 
                      time="T-01:45:00"
                      color="outline"
                    />
                  </div>
                </motion.div>
              </div>
            </>
          ) : activeTab === 'Admin Settings' ? (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex flex-col gap-10"
            >
              <header className="border-b border-white/5 pb-6">
                <h2 className="font-headline-xl text-on-surface mb-2 tracking-tight">Member Management</h2>
                <p className="font-body-lg text-on-surface-variant">Update, authorize, or revoke node access for administrative personnel.</p>
              </header>

              <div className="grid grid-cols-12 gap-8">
                {/* Add Member Form */}
                <div className="col-span-12 lg:col-span-4 flex flex-col gap-6">
                  <div className="bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl p-6">
                    <h3 className="font-headline-md text-on-surface mb-6 flex items-center gap-2">
                       <UserPlus className="w-5 h-5 text-primary" />
                       Add New Member
                    </h3>
                    <div className="flex flex-col gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-2">
                          <IdCard className="w-3 h-3" /> Full Name
                        </label>
                        <input 
                          type="text" 
                          value={newMember.name}
                          onChange={e => setNewMember({...newMember, name: e.target.value})}
                          placeholder="e.g. John Doe"
                          className="bg-surface-container-lowest/50 border border-white/10 rounded px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[10px] text-on-surface-variant flex items-center gap-2">
                          <Mail className="w-3 h-3" /> Email Address
                        </label>
                        <input 
                          type="email" 
                          value={newMember.email}
                          onChange={e => setNewMember({...newMember, email: e.target.value})}
                          placeholder="j.doe@lorven.intel"
                          className="bg-surface-container-lowest/50 border border-white/10 rounded px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="font-label-caps text-[10px] text-on-surface-variant">Access Role</label>
                        <select 
                          value={newMember.role}
                          onChange={e => setNewMember({...newMember, role: e.target.value})}
                          className="bg-surface-container-lowest/50 border border-white/10 rounded px-4 py-2.5 text-sm focus:border-primary outline-none transition-colors appearance-none"
                        >
                          <option value="Strategist">Strategist</option>
                          <option value="Analyst">Analyst</option>
                          <option value="Associate">Associate</option>
                        </select>
                      </div>
                      <button 
                        onClick={addMember}
                        className="mt-4 bg-primary text-on-primary font-label-caps py-3 rounded shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transition-all flex justify-center items-center gap-2"
                      >
                         Authorize Member
                         <ChevronRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="bg-error/5 border border-error/20 rounded-xl p-4 flex gap-3 text-error">
                    <ShieldAlert className="w-5 h-5 shrink-0" />
                    <p className="text-xs leading-relaxed opacity-80 italic">
                      Warning: Member authorization grants high-level access to neural pipelines. Verify credentials before initializing uplink.
                    </p>
                  </div>
                </div>

                {/* Member List */}
                <div className="col-span-12 lg:col-span-8">
                  <div className="bg-surface-container-low/40 backdrop-blur-md border border-white/5 rounded-xl overflow-hidden">
                    <table className="w-full text-left">
                      <thead className="bg-white/5">
                        <tr className="font-label-caps text-[10px] text-outline uppercase">
                          <th className="px-6 py-4">Identification</th>
                          <th className="px-6 py-4">Role</th>
                          <th className="px-6 py-4">Date Added</th>
                          <th className="px-6 py-4 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {members.map(member => (
                          <tr key={member.id} className="hover:bg-white/[0.02] transition-colors">
                            <td className="px-6 py-5">
                              <div className="flex flex-col">
                                <span className="font-semibold text-on-surface">{member.name}</span>
                                <span className="text-xs text-on-surface-variant opacity-60">{member.email}</span>
                              </div>
                            </td>
                            <td className="px-6 py-5">
                              <span className={cn(
                                "px-2 py-1 rounded text-[10px] font-label-caps",
                                member.role === 'Main Admin' ? "bg-amber-500/10 text-amber-500 border border-amber-500/20" : "bg-white/5 text-on-surface-variant border border-white/10"
                              )}>
                                {member.role}
                              </span>
                            </td>
                            <td className="px-6 py-5">
                               <span className="text-sm opacity-60">{member.addedAt}</span>
                            </td>
                            <td className="px-6 py-5 text-right">
                              {member.name.toUpperCase() !== 'VISWAK' && (
                                <button 
                                  onClick={() => removeMember(member.id)}
                                  className="p-2 hover:bg-error/10 text-error/60 hover:text-error rounded transition-colors group"
                                  title="Revoke Access"
                                >
                                  <UserMinus className="w-4 h-4" />
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="flex flex-col items-center justify-center h-[70vh] text-on-surface-variant opacity-40">
              <AlertCircle className="w-12 h-12 mb-4" />
              <p className="font-headline-md tracking-widest uppercase">Encryption Protected</p>
              <p className="text-sm mt-2">Required clearance not detected for this node.</p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function LogItem({ icon: Icon, title, desc, time, color }: any) {
  const colors: any = {
    primary: "border-primary/20 bg-primary/5 text-primary",
    secondary: "border-secondary/20 bg-secondary/5 text-secondary",
    outline: "border-outline/20 bg-white/5 text-outline",
  };

  return (
    <div className="flex items-start gap-4 p-4 rounded bg-surface-container-highest/20 border border-white/5 hover:bg-surface-container-highest/40 transition-colors">
      <div className={cn("w-10 h-10 rounded border flex items-center justify-center shrink-0", colors[color])}>
        <Icon className="w-[18px] h-[18px]" />
      </div>
      <div className="flex-1">
        <div className="font-sans text-on-surface font-semibold mb-1">{title}</div>
        <div className="font-sans text-[13px] text-on-surface-variant">{desc}</div>
      </div>
      <div className="font-label-caps text-[10px] text-outline whitespace-nowrap">{time}</div>
    </div>
  );
}
