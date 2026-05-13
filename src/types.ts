
export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlocked: boolean;
  threshold: number;
}

export interface UserVisit {
  monumentId: string;
  timestamp: number;
  pointsEarned: number;
}

export interface UserProfile {
  name: string;
  rank: 'Explorer' | 'Archivist' | 'Rajaguru' | 'Heritage Guardian';
  xp: number;
  level: number;
  avatar: string;
  favDynasty: string;
  bio: string;
  visitedIds: string[];
  visits: UserVisit[];
  achievements: Achievement[];
}

export const INITIAL_USER: UserProfile = {
  name: "Arya Deshpande",
  rank: "Rajaguru",
  xp: 750,
  level: 12,
  avatar: "https://lh3.googleusercontent.com/aida-public/AB6AXuCI8wFSA-5quvjR6KuRk3EhVQ7Hss6g_z5MV794lwXQltj_pDMLKCQTBeJ5xzov69Jb0DHfEzIuCgZttxVkBU7zXaummWAxXizfijlRIpYUzP1BefPF8zkx_I68-L9osfVSi1KDP7A1Cm6Hj3Mhu63CYudh7k78KKqakoq-KnL40yd6SNyHJURBxmjE-Rl2vl9XmKoZcTWJ7NBdAyr2kkwdOk5uZqZ2apO9sdUkxgKySLYejaAHWzpWxk25EOy8BVXu18r9ZWZymS8",
  favDynasty: "Hoysala",
  bio: "Passionate about stone carvings and the hidden history of the Deccan plateau. Currently on a mission to map all underground temples in Bagalkot.",
  visitedIds: ["hampi-stone-chariot", "badami-caves"],
  visits: [
    { monumentId: "hampi-stone-chariot", timestamp: Date.now() - 86400000 * 5, pointsEarned: 500 },
    { monumentId: "badami-caves", timestamp: Date.now() - 86400000 * 2, pointsEarned: 450 },
  ],
  achievements: [
    { id: 'temple-explorer', title: 'Temple Explorer', description: 'Visit 10 temples', icon: '🕍', unlocked: true, threshold: 10 },
    { id: 'dynasty-scholar', title: 'Dynasty Scholar', description: 'Explore sites from 5 dynasties', icon: '📜', unlocked: false, threshold: 5 },
    { id: 'hidden-gem', title: 'Hidden Gem Hunter', description: 'Find a site not on the map', icon: '💎', unlocked: true, threshold: 1 },
  ]
};

export const RANKS = ['Explorer', 'Archivist', 'Rajaguru', 'Heritage Guardian'] as const;
