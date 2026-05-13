import React, { useEffect, useState, useCallback, useRef } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  Pin, 
  useMap,
  MapCameraChangedEvent
} from '@vis.gl/react-google-maps';
import { MONUMENTS, Monument } from '../constants';
import { MapPin, Info, Navigation, History, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';
const hasValidKey = Boolean(API_KEY) && API_KEY !== 'YOUR_API_KEY';

// --- Map Theme (Custom Heritage Sandstone & Stone) ---
const MAP_ID = "HERITAGE_MAP_V1";
const HERITAGE_STYLE = [
  { "featureType": "administrative", "elementType": "all", "stylers": [{ "visibility": "on" }] },
  { "featureType": "landscape", "elementType": "all", "stylers": [{ "color": "#f2f0e9" }] }, // Sandstone
  { "featureType": "landscape.man_made", "elementType": "all", "stylers": [{ "visibility": "on" }, { "color": "#e8e4d8" }] },
  { "featureType": "poi", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "saturation": "-100" }, { "lightness": "45" }] },
  { "featureType": "poi.park", "elementType": "all", "stylers": [{ "color": "#d9d0b8" }] },
  { "featureType": "road", "elementType": "all", "stylers": [{ "saturation": "-100" }, { "lightness": "45" }] },
  { "featureType": "road.highway", "elementType": "all", "stylers": [{ "visibility": "simplified" }, { "color": "#c4bcac" }] },
  { "featureType": "water", "elementType": "all", "stylers": [{ "color": "#cbd2d0" }] }
];

interface HeritageMapProps {
  onSelectMonument: (monument: Monument) => void;
  radius: number; // in km
}

export const HeritageMap = ({ onSelectMonument, radius }: HeritageMapProps) => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [selectedMonument, setSelectedMonument] = useState<Monument | null>(null);
  const [recommendations, setRecommendations] = useState<any[]>([]);
  const [isAiLoading, setIsAiLoading] = useState(false);
  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => console.error("Error getting location:", error),
        { enableHighAccuracy: true }
      );
    }
  }, []);

  const fetchAiRecommendations = useCallback(async (loc: google.maps.LatLngLiteral) => {
    setIsAiLoading(true);
    try {
      const response = await fetch('/api/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          lat: loc.lat, 
          lng: loc.lng, 
          radius: radius,
          visitedCount: 0 // In real app, get from storage
        }),
      });
      const data = await response.json();
      setRecommendations(data);
    } catch (err) {
      console.error(err);
    } finally {
      setIsAiLoading(false);
    }
  }, [radius]);

  useEffect(() => {
    if (userLocation) {
      fetchAiRecommendations(userLocation);
    }
  }, [userLocation, fetchAiRecommendations]);

  if (!hasValidKey) {
    return (
      <div className="flex flex-col items-center justify-center h-[60vh] bg-brand-sandstone-dim p-8 text-center rounded-3xl border-2 border-dashed border-brand-primary/20">
        <MapPin className="w-12 h-12 text-brand-primary mb-4" />
        <h2 className="text-xl font-bold text-brand-primary mb-2">Maps API Key Required</h2>
        <p className="text-xs text-brand-brown-light mb-6 leading-relaxed">
          To enable the heritage navigation experience, please configure your 
          <code className="bg-white px-1 mx-1 rounded">GOOGLE_MAPS_PLATFORM_KEY</code> 
          in the Settings panel.
        </p>
      </div>
    );
  }

  const center = userLocation || { lat: 15.3350, lng: 76.4600 }; // Default Hampi

  return (
    <APIProvider apiKey={API_KEY} version="weekly">
      <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl stone-shadow border border-outline-variant/30">
        <Map
          defaultCenter={center}
          defaultZoom={11}
          mapId="HERITAGE_MAP_ID"
          internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
          gestureHandling={'greedy'}
          disableDefaultUI={true}
          styles={HERITAGE_STYLE}
        >
          {/* User Location */}
          {userLocation && (
            <AdvancedMarker position={userLocation}>
              <div className="relative flex items-center justify-center">
                <div className="absolute w-12 h-12 bg-brand-primary/20 rounded-full animate-ping" />
                <div className="relative w-6 h-6 bg-brand-primary border-2 border-white rounded-full shadow-lg" />
              </div>
            </AdvancedMarker>
          )}

          {/* Curated Monuments */}
          {MONUMENTS.map((monument) => (
            <AdvancedMarker
              key={monument.id}
              position={monument.location}
              onClick={() => setSelectedMonument(monument)}
            >
              <div className={cn(
                "group transition-all duration-300",
                selectedMonument?.id === monument.id ? "scale-150 z-50" : "hover:scale-125"
              )}>
                <Pin 
                  background={monument.isUNESCO ? "#984300" : "#2C2419"} 
                  glyphColor={monument.isUNESCO ? "#fdc34d" : "#FFFFFF"}
                  borderColor="#FFFFFF"
                />
              </div>
            </AdvancedMarker>
          ))}

          {/* AI Recommended "Hidden Gems" */}
          {recommendations.map((gem, idx) => (
            <AdvancedMarker
              key={`gem-${idx}`}
              position={gem.location}
              onClick={() => {
                const mon: any = { 
                   id: `ai-${idx}`,
                   name: gem.name,
                   description: gem.description,
                   location: gem.location,
                   dynasty: gem.dynasty,
                   era: gem.architecturalStyle,
                   district: "Nearby",
                   imageUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuDhV70c3ChheK7xrkefoTbgVKfoBirhpdm1EvWXg5e1g60xLdTLWeK9zS0vI9Nml_DtEBCfHyxEXoKHtVYzEiUCVslJruLG-H1j6oF4qOHC6QxPjIksnO-qQhPd-gpfJdl9Z3BSjOoOs2XT5zVtdWbdg8wGJi8ICmnD7vCFgGZeHub7ZIn3trYg_0RhQ-WYVrDswdbunyV7nqPBgy8dIoefdxILwXSEM7w9xSp_nnDyYKZdpWTO2d9Sgcnx1GPJvaCWxGlVv6UVKCE",
                   tag: "HIDDEN GEM",
                   isUNESCO: false
                };
                setSelectedMonument(mon);
              }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-brand-gold blur-lg opacity-40 animate-pulse rounded-full" />
                <Pin 
                  background="#984300" 
                  glyphColor="#fdc34d"
                  borderColor="#fdc34d"
                >
                   <Sparkles className="w-3 h-3 text-brand-gold p-0.5" />
                </Pin>
              </div>
            </AdvancedMarker>
          ))}
        </Map>

        {/* Floating Controls */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button 
             onClick={() => userLocation && mapRef.current?.panTo(userLocation)}
             className="w-10 h-10 bg-white/90 backdrop-blur rounded-xl flex items-center justify-center text-brand-primary shadow-lg active:scale-95 transition-all"
          >
            <Navigation className="w-5 h-5" />
          </button>
          <div className="w-10 h-32 bg-white/90 backdrop-blur rounded-xl flex flex-col items-center justify-between py-2 text-[10px] font-bold text-brand-primary shadow-lg">
             <span>+</span>
             <div className="h-full w-px bg-brand-primary/10 mx-auto my-1" />
             <span>-</span>
          </div>
        </div>

        {/* Bottom Preview Sheet */}
        <AnimatePresence>
          {selectedMonument && (
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              className="absolute bottom-4 left-4 right-4 bg-white rounded-2xl shadow-2xl overflow-hidden z-50 stone-shadow border border-brand-primary/10"
            >
              <div className="relative h-24 w-full">
                <img src={selectedMonument.imageUrl} alt={selectedMonument.name} className="w-full h-full object-cover" />
                <button 
                  onClick={() => setSelectedMonument(null)}
                  className="absolute top-2 right-2 w-6 h-6 bg-black/40 text-white rounded-full flex items-center justify-center text-xs backdrop-blur-sm"
                >
                  Ã—
                </button>
                <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent" />
              </div>
              <div className="p-4 pt-0">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="text-xl font-display font-bold text-brand-primary leading-tight">{selectedMonument.name}</h3>
                    <p className="text-[10px] font-bold text-brand-brown-light uppercase tracking-widest">{selectedMonument.dynasty} Era</p>
                  </div>
                  {selectedMonument.isUNESCO && (
                    <div className="bg-brand-gold/10 p-1 rounded-lg">
                       <History className="w-4 h-4 text-brand-primary" />
                    </div>
                  )}
                </div>
                <p className="text-xs text-brand-brown-light line-clamp-2 mb-4 leading-relaxed italic">
                  "{selectedMonument.description}"
                </p>
                <div className="flex gap-2">
                  <button 
                    onClick={() => onSelectMonument(selectedMonument)}
                    className="flex-1 py-3 bg-brand-primary text-white rounded-xl text-[10px] font-bold uppercase tracking-widest active:scale-95 transition-all shadow-lg shadow-brand-primary/20"
                  >
                    Explore Site
                  </button>
                  <button className="px-4 py-3 bg-brand-sandstone-dim text-brand-primary rounded-xl active:scale-95 transition-all">
                    <Navigation className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {isAiLoading && (
          <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl animate-pulse">
            <Sparkles className="w-3 h-3" />
            <span>AI Mapping hidden gems...</span>
          </div>
        )}
      </div>
    </APIProvider>
  );
};
