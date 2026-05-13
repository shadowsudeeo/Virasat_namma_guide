import React from 'react';
import { motion } from 'motion/react';
import { Shield, Award, Calendar, IdCard, Sparkles, TrendingUp } from 'lucide-react';
import { UserProfile } from '../types';
import { cn } from '../lib/utils';

export const PassportCard: React.FC<{ user: UserProfile }> = ({ user }) => {
  const nextLevelXp = user.level * 100;
  const progress = (user.xp / nextLevelXp) * 100;

  return (
    <motion.div 
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="relative w-full aspect-[1.6/1] rounded-[32px] overflow-hidden shadow-2xl stone-shadow border border-brand-primary/10 bg-brand-sandstone-dim"
    >
      {/* Decorative Textures */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none parchment-texture mix-blend-multiply" />
      <div className="absolute -top-12 -right-12 w-48 h-48 bg-brand-gold/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-brand-secondary/10 rounded-full blur-3xl" />
      
      {/* Top Bar */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center bg-gradient-to-b from-brand-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <Shield className="text-brand-secondary w-5 h-5" />
          <span className="text-[10px] font-bold text-brand-primary uppercase tracking-[0.4em]">Heritage Passport</span>
        </div>
        <div className="flex items-center gap-1 bg-brand-gold px-3 py-1 rounded-full shadow-lg">
           <Sparkles className="w-3 h-3 text-brand-secondary" />
           <span className="text-[10px] font-bold text-brand-secondary">LVL {user.level}</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 pt-8">
        <div className="flex items-center gap-6">
          <div className="relative">
            <div className="w-24 h-24 rounded-2xl border-[3px] border-brand-primary p-1 bg-white shadow-xl rotate-3 transform transition-transform hover:rotate-0 duration-500">
              <img src={user.avatar} alt={user.name} className="w-full h-full object-cover rounded-xl" />
            </div>
            <div className="absolute -bottom-2 -right-2 bg-brand-secondary text-white p-1.5 rounded-lg shadow-lg border-2 border-white">
              <Award className="w-4 h-4" />
            </div>
          </div>

          <div className="flex-1 space-y-1">
            <h3 className="text-3xl font-display font-bold text-brand-primary tracking-tight leading-none">{user.name}</h3>
            <p className="text-sm font-semibold italic text-brand-secondary">{user.rank}</p>
            <div className="flex gap-4 mt-3">
               <div>
                  <p className="text-[8px] font-bold text-brand-brown-light/60 uppercase">Member Since</p>
                  <p className="text-xs font-bold text-brand-primary">OCT 2023</p>
               </div>
               <div className="w-px h-6 bg-brand-primary/10 self-center" />
               <div>
                  <p className="text-[8px] font-bold text-brand-brown-light/60 uppercase">Passport ID</p>
                  <p className="text-xs font-bold text-brand-primary">VIR-2024-88A</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Bottom Bar */}
      <div className="absolute bottom-0 left-0 w-full p-6 space-y-3">
        <div className="flex justify-between items-end">
           <div className="flex gap-6">
              <div className="text-center">
                 <span className="block text-xl font-display font-bold text-brand-secondary">{user.visitedIds.length}</span>
                 <span className="text-[8px] font-bold text-brand-brown-light/60 uppercase">Visits</span>
              </div>
              <div className="text-center">
                 <span className="block text-xl font-display font-bold text-brand-secondary">{(user.xp / 1000).toFixed(1)}k</span>
                 <span className="text-[8px] font-bold text-brand-brown-light/60 uppercase">XP</span>
              </div>
           </div>

           <div className="flex items-center gap-2 group cursor-help">
              <TrendingUp className="w-3 h-3 text-brand-primary opacity-40" />
              <span className="text-[8px] font-bold text-brand-primary/60 uppercase">Next Rank: Heritage Guardian</span>
           </div>
        </div>

        <div className="relative h-1.5 w-full bg-black/5 rounded-full overflow-hidden">
           <motion.div 
             initial={{ width: 0 }}
             animate={{ width: `${progress}%` }}
             transition={{ duration: 1, ease: 'easeOut' }}
             className="h-full bg-gradient-to-r from-brand-secondary to-brand-primary" 
           />
        </div>
      </div>
    </motion.div>
  );
};
