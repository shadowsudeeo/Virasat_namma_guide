import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, 
  Compass, 
  IdCard, 
  User, 
  QrCode, 
  ArrowLeft, 
  Share2, 
  Menu, 
  Bookmark,
  Play,
  History,
  Info,
  Calendar,
  MapPin,
  Flame,
  Globe,
  Stars,
  AudioLines,
  ArrowRight
} from 'lucide-react';
import { cn } from './lib/utils';
import { MONUMENTS, DYNASTIES, Monument } from './constants';
import { HeritageMap } from './components/HeritageMap';
import { RadiusSelector } from './components/RadiusSelector';
import { NavigationOverlay } from './components/NavigationOverlay';
import { INITIAL_USER, UserProfile } from './types';
import { PassportCard } from './components/PassportCard';
import { HeritageStamp, AchievementBadge } from './components/PassportComponents';
import { 
  Settings, 
  Bell, 
  Map as MapIcon, 
  Download, 
  Lock as PrivacyIcon, 
  LogOut, 
  Edit3,
  BadgeCheck,
  CheckCircle,
  Clock as TimeIcon,
  ChevronRight,
  UserCheck
} from 'lucide-react';

// --- Components ---

const SplashScreen = ({ onComplete }: { onComplete: () => void }) => {
  useEffect(() => {
    const timer = setTimeout(onComplete, 2500);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 z-[100] bg-brand-sandstone flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0 bg-gradient-to-t from-brand-sandstone-dim via-brand-sandstone to-brand-gold/10" />
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 flex flex-col items-center"
      >
        <div className="w-48 h-48 mb-8 relative group">
          <div className="absolute inset-0 bg-brand-secondary blur-3xl opacity-10 rounded-full scale-150 animate-pulse" />
          <img 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuDEHC0sDsl4rTC0XZvIRZ2u2nW2Omc7zgCLNHmrVs56oTdyZ3zjsHgiAnH5Zp7qPq4E2BDf_jYZr05peOwhcNQlABQeVCyuMEFjH0z8JnycaDf-Ut-Kormvv8zpi-KkCclumVapzNhEhVJCVQadqjlHf3sUdcMD6VdRcK2fvXhVSuFHiZzxDwCAKYYidozBEX5PiZLX1_h5IAPOt6a15U7DqwWIo6alzHzU_DVeu3LJC5Hhvd7JqcuTDDkjmqaCoZuDJnLBA4Ilyro" 
            alt="Virasat Logo" 
            className="w-full h-full object-contain relative z-10"
          />
        </div>
        <div className="text-center space-y-4">
          <h1 className="text-4xl text-brand-primary tracking-widest uppercase font-bold">VIRASAT</h1>
          <div className="flex flex-col items-center space-y-2">
            <div className="h-[1px] w-12 bg-outline-variant/50" />
            <Stars className="text-brand-secondary w-5 h-5 fill-current" />
          </div>
          <p className="font-display text-2xl text-brand-primary tracking-wide">
            Discover Karnataka’s Hidden Heritage
          </p>
          <div className="flex justify-center items-center gap-4 text-brand-brown-light/60">
            <span className="h-[1px] w-8 bg-brand-brown-light/30" />
            <span className="text-xs uppercase tracking-widest font-semibold">Namma Guide</span>
            <span className="h-[1px] w-8 bg-brand-brown-light/30" />
          </div>
        </div>
      </motion.div>
    </div>
  );
};

const BottomNav = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    { path: '/home', icon: Home, label: 'Home' },
    { path: '/discover', icon: Compass, label: 'Discover' },
    { path: '/passport', icon: IdCard, label: 'Passport' },
    { path: '/profile', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center px-4 py-3 pb-8 bg-surface-container border-t border-outline-variant/30 shadow-[0_-4px_12px_rgba(44,36,25,0.12)] rounded-t-2xl">
      {navItems.map(({ path, icon: Icon, label }) => {
        const isActive = location.pathname === path;
        return (
          <button
            key={path}
            onClick={() => navigate(path)}
            className={cn(
              "flex flex-col items-center justify-center px-5 py-1 transition-all duration-200",
              isActive ? "bg-secondary-container text-on-secondary-container rounded-full scale-105" : "text-brand-brown-light"
            )}
          >
            <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            <span className="text-[10px] font-semibold mt-1 uppercase tracking-wider">{label}</span>
          </button>
        );
      })}
    </nav>
  );
};

const Header = ({ title = "Virasat" }) => (
  <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-5 h-16 bg-brand-sandstone/40 backdrop-blur-md">
    <div className="flex items-center gap-4">
      <Menu className="text-brand-primary w-6 h-6" />
      <h1 className="text-2xl text-brand-primary tracking-tight font-display font-semibold">{title}</h1>
    </div>
    <div className="flex items-center gap-4">
      <button className="bg-brand-sandstone-dim px-3 py-1 rounded-full border border-outline-variant/30 text-brand-primary text-xs font-bold shadow-sm">
        KN/EN
      </button>
    </div>
  </header>
);

// --- Screens ---

const OnboardingScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-brand-sandstone relative overflow-hidden">
      <Header />
      <div className="relative w-full h-[55vh] overflow-hidden">
        <img 
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAT14nXJNnc4UIgOnS7oPsLu-7zqLpxYV-DL03-BvNeCsBjTrmW78-0DtQ_z5_yUWDbv_PpMbhEHLYYwVMPsrOR8ZhHWdo5eIkA1DBmtPGFuYfoFOjGUIWCYYSoKrpdncYgS1sLDwfbzB9-JHaGiHkp6QsipMqHENDaWXkI5m0z5yOvW6XTPidD1XvwZA-EdrtyLSHSyDl-xWDtMnQzYLWhfdJq-O1TuBWc3DK1fZX_YoUYeIXhSKM3Z8FliRNb3_QD-eB1GTQ6O7w" 
          alt="Hampi" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-sandstone via-transparent to-transparent" />
        <div className="absolute inset-0 bg-black/10 mix-blend-overlay" />
      </div>
      
      <div className="px-5 -mt-16 z-20 flex flex-col items-center text-center max-w-2xl mx-auto w-full flex-grow pb-12">
        <div className="bg-white/70 backdrop-blur-xl p-6 rounded-2xl engraved-border stone-shadow mb-8 w-full">
          <div className="flex justify-center mb-4">
            <div className="w-12 h-1 bg-brand-gold rounded-full opacity-40" />
          </div>
          <h2 className="text-[2.5rem] text-brand-primary mb-4 leading-tight">
            A Personal Historian in Your Pocket
          </h2>
          <p className="text-lg text-brand-brown-light mb-8 leading-relaxed">
            Scan QR codes at heritage sites to unlock hidden stories, audio guides, and virtual artifacts.
          </p>
          <div className="grid grid-cols-3 gap-4 border-t border-brand-brown-light/10 pt-6">
            <div className="flex flex-col items-center">
              <QrCode className="text-brand-secondary mb-1 w-6 h-6" />
              <span className="text-[10px] font-bold text-brand-brown-light tracking-widest">SCAN</span>
            </div>
            <div className="flex flex-col items-center">
              <AudioLines className="text-brand-secondary mb-1 w-6 h-6" />
              <span className="text-[10px] font-bold text-brand-brown-light tracking-widest">LISTEN</span>
            </div>
            <div className="flex flex-col items-center">
              <Globe className="text-brand-secondary mb-1 w-6 h-6" />
              <span className="text-[10px] font-bold text-brand-brown-light tracking-widest">REVEAL</span>
            </div>
          </div>
        </div>

        <button 
          onClick={() => navigate('/home')}
          className="w-full py-4 bg-brand-gold text-brand-secondary rounded-xl font-bold uppercase tracking-widest shadow-lg active:scale-95 transition-all flex items-center justify-center gap-2 group border-t border-white/30"
        >
          <span>Get Started</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};

const HomeScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-brand-sandstone pb-32">
      <Header />
      <main className="pt-20 px-5 max-w-4xl mx-auto space-y-12">
        <section>
          <h2 className="text-3xl text-brand-primary mb-1">Explore the Timeless</h2>
          <p className="text-brand-brown-light italic">Uncover the architectural marvels of Karnataka</p>
        </section>

        <RadiusSelector 
          className="stone-shadow" 
          onRadiusChange={(r) => console.log('Searching in', r, 'km')} 
        />

        <section>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-semibold">Royal Legacies</h3>
            <button className="text-brand-primary font-bold text-xs flex items-center gap-1">VIEW ALL <ArrowRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MONUMENTS.slice(0, 2).map((monument) => (
              <div 
                key={monument.id}
                onClick={() => navigate(`/monument/${monument.id}`)}
                className="group relative rounded-2xl overflow-hidden aspect-[4/5] stone-shadow border border-outline-variant/20 cursor-pointer"
              >
                <img src={monument.imageUrl} alt={monument.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-brown via-transparent to-transparent flex flex-col justify-end p-6">
                  <span className="px-3 py-1 bg-brand-gold/90 text-brand-secondary rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-2">
                    {monument.tag}
                  </span>
                  <h4 className="text-2xl text-white mb-1 font-display">{monument.name}</h4>
                  <p className="text-white/80 text-sm line-clamp-1">{monument.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-4">Continue Exploring</h3>
          <div className="flex overflow-x-auto gap-4 pb-4 no-scrollbar -mx-5 px-5">
            {MONUMENTS.slice(2).map((monument) => (
              <div 
                key={monument.id}
                onClick={() => navigate(`/monument/${monument.id}`)}
                className="flex-none w-64 bg-brand-sandstone-dim/20 rounded-xl overflow-hidden border border-outline-variant/20 stone-shadow cursor-pointer"
              >
                <div className="h-32 w-full relative">
                  <img src={monument.imageUrl} alt={monument.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-4">
                  <h5 className="font-bold text-base">{monument.name}</h5>
                  <p className="text-brand-brown-light text-[10px] font-semibold uppercase tracking-wider">{monument.dynasty}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <BottomNav />
      <button 
        onClick={() => navigate('/scan')}
        className="fixed bottom-24 right-6 w-14 h-14 bg-brand-primary text-white rounded-2xl shadow-xl flex items-center justify-center active:scale-95 transition-all z-40"
      >
        <QrCode className="w-7 h-7" />
      </button>
    </div>
  );
};

const MonumentDetailScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const id = location.pathname.split('/').pop();
  const monument = MONUMENTS.find(m => m.id === id) || MONUMENTS[0];
  const [showNavigation, setShowNavigation] = useState(false);

  return (
    <div className="min-h-screen bg-brand-sandstone pb-32 relative">
      <AnimatePresence>
        {showNavigation && (
          <NavigationOverlay 
            monument={monument} 
            onClose={() => setShowNavigation(false)} 
          />
        )}
      </AnimatePresence>
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-4 h-16 bg-brand-sandstone/30 backdrop-blur-md">
        <button onClick={() => navigate(-1)} className="text-brand-primary p-2 active:scale-90"><ArrowLeft /></button>
        <h1 className="text-2xl text-brand-primary font-display font-semibold">Virasat</h1>
        <div className="flex gap-2">
          <button className="text-brand-primary p-2"><Bookmark /></button>
          <button className="text-brand-primary p-2"><Share2 /></button>
        </div>
      </header>

      <div className="relative h-[65vh] w-full overflow-hidden">
        <img src={monument.imageUrl} alt={monument.name} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-brown/80 via-transparent to-transparent flex flex-col justify-end p-5">
          {monument.isUNESCO && (
            <span className="px-3 py-1 bg-brand-gold text-brand-secondary rounded-full text-[10px] font-bold uppercase tracking-widest w-fit mb-3">
              UNESCO World Heritage Site
            </span>
          )}
          <h2 className="text-4xl text-white font-display mb-1">{monument.name}</h2>
          <div className="flex items-center gap-1 text-white/80">
            <MapPin className="w-4 h-4" />
            <span className="text-sm font-semibold">{monument.district}, Karnataka</span>
          </div>
        </div>
      </div>

      <div className="px-5 -mt-6 relative z-10 space-y-12 max-w-3xl mx-auto">
        <div className="bg-brand-sandstone-dim p-4 rounded-2xl flex items-center gap-4 stone-shadow border border-white/20">
          <button className="w-12 h-12 rounded-full bg-brand-primary flex items-center justify-center text-white shadow-lg active:scale-95 transition-all">
            <Play className="fill-current" />
          </button>
          <div className="flex-1">
            <p className="text-[10px] font-bold text-brand-primary tracking-widest uppercase mb-1">Audio Guide: The King's Vision</p>
            <div className="flex items-end gap-[2px] h-6 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <div key={i} className="bg-brand-primary w-[3px] rounded-full" style={{ height: `${20 + Math.random() * 80}%` }} />
              ))}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-bold text-brand-brown-light">04:22</span>
          </div>
        </div>

        <section className="bg-brand-sandstone-dim/20 rounded-2xl p-6 border-b-4 border-brand-primary parchment-texture">
          <div className="flex items-center gap-2 mb-4 relative z-10">
            <History className="text-brand-primary w-5 h-5" />
            <h3 className="text-2xl text-brand-primary">History</h3>
          </div>
          <p className="text-brand-brown-light leading-relaxed mb-6 relative z-10">
            {monument.description} It marks the architectural brilliance of the era, becoming a symbol of defiance and devotion through stone.
          </p>
          <div className="flex gap-6 border-t border-brand-brown-light/10 pt-6 relative z-10">
            <div>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Founded</p>
              <p className="text-xl font-display font-bold">{monument.era}</p>
            </div>
            <div className="w-px bg-brand-brown-light/10 h-10" />
            <div>
              <p className="text-[10px] font-bold text-brand-primary uppercase tracking-widest">Dynasty</p>
              <p className="text-xl font-display font-bold">{monument.dynasty}</p>
            </div>
          </div>
        </section>

        <section className="bg-brand-brown text-brand-sandstone rounded-3xl p-6 shadow-2xl flex flex-col sm:flex-row justify-between items-center gap-6">
          <div>
            <p className="text-[10px] font-bold text-brand-gold uppercase tracking-widest mb-1">Plan Your Visit</p>
            <h4 className="text-xl">Best time: Oct - Feb</h4>
            <p className="text-sm opacity-70">Entry: ₹40 (Indian) | ₹600 (Foreign)</p>
          </div>
          <button 
            onClick={() => setShowNavigation(true)}
            className="w-full sm:w-auto px-8 py-3 bg-brand-primary text-white rounded-full font-bold shadow-lg hover:scale-105 transition-transform active:scale-95"
          >
            GET DIRECTIONS
          </button>
        </section>
      </div>
      <BottomNav />
    </div>
  );
};

const ScanScreen = () => {
  const navigate = useNavigate();
  return (
    <div className="h-screen bg-brand-brown relative overflow-hidden flex flex-col">
      <div className="absolute inset-0 z-0 opacity-50 contrast-125 saturate-50">
        <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDtj-ir0wOoJRd26KefrnPNf_SlQ0sss1-Hs4T1kD2UJOUj172UklFlc_nHpqb5q0XHyAryY0U_ae43OHFNE2YUfhviYdgKd18TdK4ZLkmYVIZ80ASi7o_P-NkIU_g28sGu7Lx6ctLt_uDfEwnTA5W-oDXADQH4-Tf_oN4xmQy_0jbQ7CHoV_QyZFeKFpEeFGXKRgUBdCcfgGM5ljSL7-ZilVMl9pr6zE9EHVNn1VPvbtt_QINCA6C7huBWHZN7LT_6Mk9a_DdT14U" alt="BG" className="w-full h-full object-cover blur-sm" />
      </div>

      <header className="relative z-10 flex justify-between items-center px-4 h-16 bg-black/20 backdrop-blur-md text-white">
        <button onClick={() => navigate(-1)} className="p-2 active:scale-75"><ArrowLeft /></button>
        <h1 className="text-xl font-display font-semibold">Scan Heritage</h1>
        <div className="bg-white/10 px-3 py-1 rounded-full text-xs font-bold border border-white/20">KN/EN</div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-5 relative z-10">
        <div className="w-72 h-72 border-2 border-white/20 rounded-3xl relative">
          <div className="absolute -top-[2px] -left-[2px] w-12 h-12 border-t-4 border-l-4 border-brand-primary rounded-tl-2xl shadow-[0_0_15px_#984300]" />
          <div className="absolute -top-[2px] -right-[2px] w-12 h-12 border-t-4 border-r-4 border-brand-primary rounded-tr-2xl shadow-[0_0_15px_#984300]" />
          <div className="absolute -bottom-[2px] -left-[2px] w-12 h-12 border-b-4 border-l-4 border-brand-primary rounded-bl-2xl shadow-[0_0_15px_#984300]" />
          <div className="absolute -bottom-[2px] -right-[2px] w-12 h-12 border-b-4 border-r-4 border-brand-primary rounded-br-2xl shadow-[0_0_15px_#984300]" />
          
          <motion.div 
            animate={{ top: ['5%', '95%', '5%'] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
            className="absolute left-4 right-4 h-1 bg-brand-gold shadow-[0_0_10px_#fdc34d] z-10"
          />
        </div>
        <p className="mt-12 text-white text-center text-lg drop-shadow-lg max-w-[200px]">Point at the QR code on the monument plaque</p>
      </main>

      <div className="relative z-10 flex justify-center gap-16 pb-32">
        <div className="flex flex-col items-center gap-2">
          <button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all"><Flame /></button>
          <span className="text-white text-xs font-bold uppercase tracking-widest">Flash</span>
        </div>
        <div className="flex flex-col items-center gap-2">
          <button className="w-16 h-16 bg-white/10 backdrop-blur-xl rounded-full border border-white/20 flex items-center justify-center text-white active:scale-90 transition-all"><History /></button>
          <span className="text-white text-xs font-bold uppercase tracking-widest">History</span>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

const PassportScreen = ({ user }: { user: UserProfile }) => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-brand-sandstone pb-32">
      <Header title="Heritage Passport" />
      <main className="pt-24 px-5 max-w-4xl mx-auto space-y-12">
        {/* Passport Card */}
        <section>
          <PassportCard user={user} />
        </section>

        {/* Achievement Badges */}
        <section className="space-y-4">
          <div className="flex justify-between items-center">
            <h3 className="font-display text-2xl text-brand-primary">Achievements</h3>
            <span className="text-[10px] font-bold text-brand-secondary uppercase tracking-widest">
              {user.achievements.filter(a => a.unlocked).length}/{user.achievements.length} UNLOCKED
            </span>
          </div>
          <div className="grid gap-3">
             {user.achievements.map((ach) => (
                <AchievementBadge 
                  key={ach.id} 
                  title={ach.title} 
                  icon={ach.icon} 
                  description={ach.description} 
                  unlocked={ach.unlocked} 
                />
             ))}
          </div>
        </section>

        {/* Stamp Collection */}
        <section>
          <div className="flex justify-between items-end mb-8">
            <div>
              <h3 className="font-display text-2xl text-brand-primary">Collected Seals</h3>
              <p className="text-xs text-brand-brown-light italic">Your journey carved in stone</p>
            </div>
            <button className="text-brand-secondary text-[10px] font-bold uppercase tracking-widest hover:underline flex items-center gap-1">
              Store All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          <div className="grid grid-cols-3 gap-y-10 gap-x-6">
            {MONUMENTS.map((monument) => (
              <HeritageStamp 
                key={monument.id} 
                monument={monument} 
                isUnlocked={user.visitedIds.includes(monument.id)}
                onClick={() => navigate(`/monument/${monument.id}`)}
              />
            ))}
          </div>
        </section>

        {/* Timeline of Visits */}
        <section className="space-y-6">
          <h3 className="font-display text-2xl text-brand-primary">Journey Timeline</h3>
          <div className="relative pl-8 space-y-8">
             <div className="absolute left-3 top-2 bottom-0 w-0.5 bg-brand-primary/10 border-l border-dashed border-brand-primary/30" />
             {user.visits.sort((a,b) => b.timestamp - a.timestamp).map((visit, idx) => {
                const mon = MONUMENTS.find(m => m.id === visit.monumentId);
                if (!mon) return null;
                return (
                  <motion.div 
                    key={visit.monumentId + idx}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    className="relative"
                  >
                    <div className="absolute -left-8 top-1 w-6 h-6 bg-brand-sandstone border-2 border-brand-primary rounded-full flex items-center justify-center z-10">
                       <CheckCircle className="w-3 h-3 text-brand-primary" />
                    </div>
                    <div className="bg-white/40 p-4 rounded-2xl border border-white/20 stone-shadow-sm">
                       <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-brand-primary text-sm">{mon.name}</h4>
                          <span className="text-[9px] font-bold text-brand-gold bg-brand-primary px-2 py-0.5 rounded-full">+{visit.pointsEarned} XP</span>
                       </div>
                       <p className="text-[10px] text-brand-brown-light font-medium uppercase tracking-widest flex items-center gap-1">
                          <TimeIcon className="w-3 h-3" /> {new Date(visit.timestamp).toLocaleDateString()} • {mon.district}
                       </p>
                    </div>
                  </motion.div>
                );
             })}
          </div>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

const DiscoverScreen = () => {
  const navigate = useNavigate();
  const [radius, setRadius] = useState(25);

  return (
    <div className="min-h-screen bg-brand-sandstone pb-32">
       <Header title="Discovery Map" />
       <main className="pt-20 px-5 space-y-6 max-w-4xl mx-auto flex flex-col h-[calc(100vh-140px)]">
          <div className="flex-none space-y-4">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search monuments or dynasties..." 
                className="w-full h-14 pl-12 bg-white/80 backdrop-blur rounded-2xl engraved-border shadow-lg focus:ring-0 text-brand-brown" 
              />
              <Compass className="absolute left-4 top-1/2 -translate-y-1/2 text-brand-brown-light/40" />
            </div>

            <RadiusSelector 
              initialValue={radius}
              onRadiusChange={(val) => setRadius(val)}
              className="bg-white/40 border-none stone-shadow-sm"
            />
          </div>

          <div className="flex-1 relative min-h-[400px]">
             <HeritageMap 
               radius={radius}
               onSelectMonument={(monument) => navigate(`/monument/${monument.id}`)} 
             />
          </div>
       </main>
       <BottomNav />
    </div>
  );
};

const ProfileScreen = ({ user, onUpdateUser }: { user: UserProfile; onUpdateUser: (u: UserProfile) => void }) => {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="min-h-screen bg-brand-sandstone pb-32">
      <header className="fixed top-0 left-0 w-full z-50 flex justify-between items-center px-6 h-20 bg-brand-sandstone/30 backdrop-blur-xl border-b border-brand-primary/5">
         <h1 className="text-2xl font-display font-semibold text-brand-primary tracking-tight">Identity</h1>
         <div className="flex gap-2">
            <button className="w-10 h-10 bg-white/50 rounded-xl flex items-center justify-center text-brand-primary shadow-sm hover:scale-105 active:scale-95 transition-all">
              <Bell className="w-5 h-5" />
            </button>
            <button 
              onClick={() => setIsEditing(!isEditing)}
              className={cn(
                "w-10 h-10 rounded-xl flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-all",
                isEditing ? "bg-brand-primary text-white" : "bg-white/50 text-brand-primary"
              )}
            >
              <Settings className="w-5 h-5" />
            </button>
         </div>
      </header>

      <main className="pt-24 px-5 max-w-4xl mx-auto space-y-12">
        {/* Cinematic Profile Header */}
        <section className="flex flex-col items-center text-center relative pt-8">
            <div className="relative group">
                <div className="absolute -inset-4 bg-brand-gold/10 rounded-full blur-2xl animate-pulse" />
                <div className="relative w-40 h-40 rounded-full border-8 border-white p-1 stone-shadow overflow-hidden mb-6 group-hover:scale-105 transition-transform duration-500">
                    <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-full" />
                    {isEditing && (
                      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                        <Edit3 className="text-white w-8 h-8" />
                      </div>
                    )}
                </div>
                <div className="absolute bottom-6 right-2 bg-brand-gold text-brand-secondary p-2 rounded-2xl shadow-xl border-2 border-white">
                  <BadgeCheck className="w-6 h-6 fill-current" />
                </div>
            </div>

            <div className="space-y-1">
              {isEditing ? (
                <input 
                  type="text" 
                  value={user.name} 
                  onChange={(e) => onUpdateUser({ ...user, name: e.target.value })}
                  className="text-3xl font-display font-bold text-brand-primary bg-transparent border-b-2 border-brand-gold text-center focus:outline-none max-w-[200px]"
                />
              ) : (
                <h2 className="text-4xl font-display font-bold text-brand-primary">{user.name}</h2>
              )}
              <div className="flex items-center justify-center gap-2">
                 <div className="h-px w-6 bg-brand-gold" />
                 <p className="text-xs font-bold text-brand-secondary uppercase tracking-[0.3em]">{user.rank}</p>
                 <div className="h-px w-6 bg-brand-gold" />
              </div>
            </div>

            <div className="mt-8 flex gap-3">
               <div className="px-5 py-3 bg-white rounded-2xl stone-shadow-sm border border-brand-primary/5">
                  <span className="block text-[8px] font-bold text-brand-brown-light/60 uppercase mb-1">XP Points</span>
                  <span className="text-lg font-display font-bold text-brand-primary">{user.xp}</span>
               </div>
               <div className="px-5 py-3 bg-white rounded-2xl stone-shadow-sm border border-brand-primary/5">
                  <span className="block text-[8px] font-bold text-brand-brown-light/60 uppercase mb-1">Stamps</span>
                  <span className="text-lg font-display font-bold text-brand-primary">{user.visitedIds.length}</span>
               </div>
            </div>
        </section>

        {/* Bio Section */}
        <section className="bg-brand-sandstone-dim/30 p-8 rounded-[40px] border border-outline-variant/30 stone-shadow relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-6 opacity-0 group-hover:opacity-10 transition-opacity">
               <History className="w-12 h-12" />
            </div>
            <h3 className="font-display text-xl text-brand-primary mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-brand-secondary" />
              Historian's Bio
            </h3>
            {isEditing ? (
              <textarea 
                value={user.bio}
                onChange={(e) => onUpdateUser({ ...user, bio: e.target.value })}
                className="w-full bg-white/50 p-4 rounded-2xl border border-brand-primary/10 text-xs italic leading-relaxed text-brand-brown min-h-[100px] focus:outline-none"
              />
            ) : (
              <p className="text-xs italic leading-relaxed text-brand-brown">
                 "{user.bio}"
              </p>
            )}
            
            <div className="mt-6 flex flex-wrap gap-2">
               <span className="px-3 py-1.5 bg-brand-primary text-white text-[9px] font-bold rounded-lg tracking-widest uppercase">
                  {user.favDynasty} Expert
               </span>
               <span className="px-3 py-1.5 bg-brand-secondary text-white text-[9px] font-bold rounded-lg tracking-widest uppercase">
                  Ancient Inscriptions
               </span>
               <span className="px-3 py-1.5 bg-brand-gold text-brand-secondary text-[9px] font-bold rounded-lg tracking-widest uppercase">
                  Heritage Guardian
               </span>
            </div>
        </section>

        {/* Settings Groups */}
        <section className="space-y-4">
           <h3 className="font-display text-xl text-brand-primary ml-2 mb-4">Core Preferences</h3>
           
           <div className="bg-white rounded-3xl stone-shadow-sm border border-brand-primary/5 divide-y divide-black/5 overflow-hidden">
              <SettingsItem icon={MapIcon} label="Primary Dynasty" value={user.favDynasty} />
              <SettingsItem icon={Globe} label="Language Interface" value="Kannada / Eng" />
              <SettingsItem icon={Download} label="Offline Chronicles" value="2.1 GB used" />
              <SettingsItem icon={Bell} label="Echo Notifications" value="Active" />
              <SettingsItem icon={PrivacyIcon} label="Legacy Permissions" />
           </div>

           <button className="w-full flex items-center justify-between p-6 bg-red-50 text-red-600 rounded-3xl mt-8 font-bold text-xs uppercase tracking-[0.2em] group">
              <div className="flex items-center gap-4">
                 <LogOut className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                 <span>Depart from Virasat</span>
              </div>
              <ChevronRight className="w-4 h-4" />
           </button>
        </section>
      </main>
      <BottomNav />
    </div>
  );
};

const SettingsItem = ({ icon: Icon, label, value }: { icon: any; label: string; value?: string }) => (
  <div className="flex justify-between items-center p-6 hover:bg-black/[0.02] transition-colors cursor-pointer group">
    <div className="flex items-center gap-4">
       <div className="w-10 h-10 bg-brand-sandstone-dim rounded-xl flex items-center justify-center text-brand-brown-light group-hover:bg-brand-primary/10 group-hover:text-brand-primary transition-all">
          <Icon className="w-5 h-5" />
       </div>
       <span className="text-sm font-semibold text-brand-primary">{label}</span>
    </div>
    <div className="flex items-center gap-2">
       {value && <span className="text-xs text-brand-secondary bg-brand-gold/10 px-2.5 py-1 rounded-lg font-bold">{value}</span>}
       <ChevronRight className="w-4 h-4 text-brand-brown-light" />
    </div>
  </div>
);

// --- Main App ---

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [user, setUser] = useState<UserProfile>(INITIAL_USER);

  if (showSplash) {
    return <SplashScreen onComplete={() => setShowSplash(false)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<OnboardingScreen />} />
      <Route path="/home" element={<HomeScreen />} />
      <Route path="/discover" element={<DiscoverScreen />} />
      <Route path="/monument/:id" element={<MonumentDetailScreen />} />
      <Route path="/scan" element={<ScanScreen />} />
      <Route path="/passport" element={<PassportScreen user={user} />} />
      <Route path="/profile" element={<ProfileScreen user={user} onUpdateUser={setUser} />} />
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}
