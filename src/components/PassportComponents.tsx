import React from 'react';
import { motion } from 'motion/react';
import { Lock, Sparkles, CheckCircle2 } from 'lucide-react';
import { cn } from '../lib/utils';
import { Monument } from '../constants';

interface HeritageStampProps {
  monument: Monument;
  isUnlocked: boolean;
  onClick?: () => void;
}

export const HeritageStamp: React.FC<HeritageStampProps> = ({ monument, isUnlocked, onClick }) => {
  return (
    <motion.button
      whileHover={isUnlocked ? { scale: 1.05 } : {}}
      whileTap={isUnlocked ? { scale: 0.95 } : {}}
      onClick={onClick}
      className="flex flex-col items-center gap-3 group relative"
    >
      <div className="relative w-24 h-24">
        {/* Stamp Frame */}
        <div className={cn(
          "absolute inset-0 rounded-full border-4 shadow-xl transition-all duration-700 overflow-hidden",
          isUnlocked 
            ? "border-brand-gold bg-brand-sandstone-dim" 
            : "border-brand-brown-light/20 bg-brand-sandstone-dim/50"
        )}>
          {/* Inner Image with Filter */}
          <img 
            src={monument.imageUrl} 
            alt={monument.name} 
            className={cn(
              "w-full h-full object-cover transition-all duration-700",
              isUnlocked ? "filter sepia-[0.4] contrast-125 saturate-[0.8] brightness-110" : "grayscale opacity-40 blur-[1px]"
            )}
          />

          {/* Overlay Texture */}
          <div className="absolute inset-0 bg-brand-secondary/5 mix-blend-multiply" />
          
          {/* Locked State Overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/20 backdrop-blur-[1px]">
              <Lock className="w-8 h-8 text-white/50" />
            </div>
          )}
        </div>

        {/* Shine/Glow for Unlocked */}
        {isUnlocked && (
          <div className="absolute -inset-2 bg-brand-gold/20 rounded-full blur-xl animate-pulse -z-10" />
        )}

        {/* Unlocked Badge */}
        {isUnlocked && (
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 bg-brand-primary text-white p-1 rounded-full border-2 border-white shadow-lg z-10"
          >
            <CheckCircle2 className="w-3 h-3" />
          </motion.div>
        )}
      </div>

      <span className={cn(
        "text-[10px] font-bold text-center leading-tight uppercase tracking-widest transition-colors",
        isUnlocked ? "text-brand-primary" : "text-brand-brown-light/40"
      )}>
        {monument.name.split(' ')[0]}
      </span>
    </motion.button>
  );
};

export const AchievementBadge: React.FC<{ 
  title: string; 
  icon: string; 
  unlocked: boolean; 
  description: string 
}> = ({ title, icon, unlocked, description }) => {
  return (
    <div className={cn(
      "flex items-center gap-4 p-4 rounded-3xl border transition-all",
      unlocked 
        ? "bg-white stone-shadow border-brand-primary/10" 
        : "bg-brand-sandstone-dim/50 border-black/5 opacity-60 grayscale"
    )}>
      <div className={cn(
        "w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-inner",
        unlocked ? "bg-brand-gold/10" : "bg-black/5"
      )}>
        {icon}
      </div>
      <div>
        <h4 className="text-sm font-bold text-brand-primary">{title}</h4>
        <p className="text-[10px] text-brand-brown-light leading-tight mt-0.5">{description}</p>
      </div>
      {unlocked && (
        <div className="ml-auto">
          <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
        </div>
      )}
    </div>
  );
};
