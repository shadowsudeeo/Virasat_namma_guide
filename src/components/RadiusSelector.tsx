import React, { useState, useEffect, useMemo } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'motion/react';
import { MapPin, Compass, Sparkles } from 'lucide-react';
import { cn } from '../lib/utils';
import { MONUMENTS } from '../constants';

interface RadiusSelectorProps {
  initialValue?: number;
  onRadiusChange?: (radius: number) => void;
  className?: string;
}

export const RadiusSelector: React.FC<RadiusSelectorProps> = ({ 
  initialValue = 25, 
  onRadiusChange,
  className 
}) => {
  const [radius, setRadius] = useState(initialValue);
  const [isDragging, setIsDragging] = useState(false);

  // Mock distance logic for "site count" - in a real app this would query the backend/DB
  const sitesInRange = useMemo(() => {
    // Basic logic: more radius = more sites, capped by actual count + random fluff for UI feel
    const baseCount = MONUMENTS.length;
    if (radius < 5) return Math.min(2, baseCount);
    if (radius < 15) return Math.min(5, baseCount + 2);
    if (radius < 30) return Math.min(12, baseCount + 7);
    return Math.min(24, baseCount + 15);
  }, [radius]);

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setRadius(val);
    onRadiusChange?.(val);
    
    // Haptic feedback simulation for major intervals
    if ([5, 10, 25, 50].includes(val)) {
      if (window.navigator.vibrate) {
        window.navigator.vibrate(10);
      }
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-brand-sandstone-dim/20 rounded-3xl p-6 engraved-border stone-shadow relative overflow-hidden group",
        className
      )}
    >
      {/* Background Ornate Subtle Motif */}
      <div className="absolute -top-10 -right-10 opacity-5 pointer-events-none rotate-12 group-hover:rotate-45 transition-transform duration-[3000ms]">
        <Compass className="w-40 h-40 text-brand-secondary" />
      </div>

      <div className="flex justify-between items-start mb-6">
        <div>
          <h3 className="font-display text-2xl text-brand-primary leading-tight">Nearby Heritage</h3>
          <p className="text-xs text-brand-brown-light font-medium tracking-wide">Find history within your reach</p>
        </div>
        <div className="bg-brand-gold/10 p-2 rounded-xl">
           <MapPin className="text-brand-secondary fill-current w-5 h-5" />
        </div>
      </div>

      <div className="flex flex-col items-center space-y-8 relative z-10">
        {/* Large Distance Display */}
        <div className="flex items-baseline gap-2">
          <motion.span 
            key={radius}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-6xl font-display font-bold text-brand-primary tabular-nums"
          >
            {radius}
          </motion.span>
          <span className="text-xl font-display font-medium text-brand-secondary">km</span>
        </div>

        {/* Custom Slider */}
        <div className="w-full space-y-4">
          <div className="relative h-12 flex items-center">
            {/* Custom Track Background */}
            <div className="absolute w-full h-[6px] bg-brand-sandstone-dim rounded-full overflow-hidden">
               <div 
                 className="h-full bg-gradient-to-r from-brand-primary to-brand-gold transition-all duration-150 ease-out" 
                 style={{ width: `${(radius / 50) * 100}%` }}
               />
            </div>

            {/* Range Input Hidden but functioning */}
            <input 
              type="range" 
              min="1" 
              max="50" 
              value={radius}
              onChange={handleSliderChange}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onTouchStart={() => setIsDragging(true)}
              onTouchEnd={() => setIsDragging(false)}
              className="absolute w-full opacity-0 cursor-pointer z-20 h-full"
            />

            {/* Custom Pointer (Thumb) */}
            <motion.div 
               animate={{ 
                 left: `calc(${(radius / 50) * 100}% - 12px)`,
                 scale: isDragging ? 1.4 : 1
               }}
               transition={{ type: 'spring', stiffness: 300, damping: 20 }}
               className="absolute w-6 h-6 bg-brand-secondary rounded-full shadow-lg border-[3px] border-white z-10 pointer-events-none"
            >
               <div className="absolute inset-0 rounded-full border border-brand-brown/10" />
            </motion.div>
          </div>

          <div className="flex justify-between px-1 text-[10px] font-bold text-brand-brown-light uppercase tracking-widest">
            <span>1 km</span>
            <span>50 km</span>
          </div>
        </div>

        {/* Site Count Message */}
        <div className="w-full py-4 px-6 bg-white/50 backdrop-blur-sm rounded-2xl border border-brand-primary/5 flex items-center justify-center gap-3">
           <Sparkles className="w-4 h-4 text-brand-gold animate-pulse" />
           <p className="font-bold text-[11px] text-brand-primary uppercase tracking-[0.1em]">
              Showing <span className="text-brand-secondary tabular-nums text-sm mx-0.5">{sitesInRange}</span> sites in <span className="text-brand-secondary tabular-nums text-sm mx-0.5">{radius} km</span> radius
           </p>
        </div>
      </div>
    </motion.div>
  );
};
