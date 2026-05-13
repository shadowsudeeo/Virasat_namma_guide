import React, { useEffect, useState, useMemo } from 'react';
import { 
  APIProvider, 
  Map, 
  AdvancedMarker, 
  useMap,
  useMapsLibrary
} from '@vis.gl/react-google-maps';
import { Monument } from '../constants';
import { 
  X, 
  Navigation, 
  Car, 
  Footprints as Walk, 
  Bike, 
  MapPin, 
  Clock, 
  ArrowRight,
  Share2,
  Sparkles,
  History,
  Compass
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';

const API_KEY = process.env.GOOGLE_MAPS_PLATFORM_KEY || '';

interface NavigationOverlayProps {
  monument: Monument;
  onClose: () => void;
}

// --- Directions Logic Component ---
const DirectionsBuilder = ({ 
  origin, 
  destination, 
  mode,
  onRouteData 
}: { 
  origin: google.maps.LatLngLiteral; 
  destination: google.maps.LatLngLiteral;
  mode: string;
  onRouteData: (data: any) => void;
}) => {
  const map = useMap();
  const routesLib = useMapsLibrary('routes');
  const [directionsRenderer, setDirectionsRenderer] = useState<google.maps.DirectionsRenderer | null>(null);

  useEffect(() => {
    if (!routesLib || !map) return;
    const renderer = new google.maps.DirectionsRenderer({
      map,
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: '#984300', // Saffron/Sovereign theme
        strokeWeight: 6,
        strokeOpacity: 0.8
      }
    });
    setDirectionsRenderer(renderer);
    return () => renderer.setMap(null);
  }, [routesLib, map]);

  useEffect(() => {
    if (!directionsRenderer || !routesLib || !origin) return;

    const fetchDirections = async () => {
      try {
        const originStr = `${origin.lat},${origin.lng}`;
        const destStr = `${destination.lat},${destination.lng}`;
        const response = await fetch(`/api/directions?origin=${originStr}&destination=${destStr}&mode=${mode.toLowerCase()}`);
        const data = await response.json();
        
        if (data.status === 'OK') {
          // We let the SDK handle the actual rendering logic if possible
          const service = new routesLib.DirectionsService();
          service.route({
            origin: origin,
            destination: destination,
            travelMode: google.maps.TravelMode[mode.toUpperCase() as keyof typeof google.maps.TravelMode] || google.maps.TravelMode.DRIVING
          }, (result, status) => {
            if (status === 'OK' && result) {
              directionsRenderer.setDirections(result);
              onRouteData(result.routes[0].legs[0]);
            }
          });
        }
      } catch (err) {
        console.error("Route calculation error:", err);
      }
    };

    fetchDirections();
  }, [directionsRenderer, routesLib, origin, destination, mode]);

  return null;
};

export const NavigationOverlay: React.FC<NavigationOverlayProps> = ({ monument, onClose }) => {
  const [userLocation, setUserLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [travelMode, setTravelMode] = useState('DRIVING');
  const [routeInfo, setRouteInfo] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setIsLoading(false);
        },
        (err) => {
          console.error(err);
          // Fallback to a point near Bangalore for demo
          setUserLocation({ lat: 12.9716, lng: 77.5946 }); 
          setIsLoading(false);
        }
      );
    }
  }, []);

  const modes = [
    { id: 'DRIVING', icon: Car, label: 'Drive' },
    { id: 'WALKING', icon: Walk, label: 'Walk' },
    { id: 'BICYCLING', icon: Bike, label: 'Bike' },
  ];

  return (
    <div className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm flex flex-col">
      <div className="relative flex-grow">
        <APIProvider apiKey={API_KEY}>
          <Map
            defaultCenter={monument.location}
            defaultZoom={12}
            mapId="NAVIGATION_MAP"
            disableDefaultUI={true}
            gestureHandling="greedy"
          >
            {userLocation && (
              <>
                <AdvancedMarker position={userLocation}>
                  <div className="w-8 h-8 bg-blue-500 border-4 border-white rounded-full shadow-2xl flex items-center justify-center">
                    <Navigation className="w-4 h-4 text-white fill-current" />
                  </div>
                </AdvancedMarker>
                
                <DirectionsBuilder 
                  origin={userLocation} 
                  destination={monument.location} 
                  mode={travelMode}
                  onRouteData={setRouteInfo}
                />
              </>
            )}

            <AdvancedMarker position={monument.location}>
               <div className="w-10 h-10 bg-brand-primary border-4 border-white rounded-2xl shadow-2xl flex items-center justify-center rotate-45">
                 <MapPin className="w-6 h-6 text-white -rotate-45" />
               </div>
            </AdvancedMarker>
          </Map>
        </APIProvider>

        {/* Top bar controls */}
        <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-white/90 backdrop-blur-xl rounded-2xl flex items-center justify-center text-brand-primary shadow-xl active:scale-90 transition-all border border-brand-primary/10"
          >
            <X className="w-6 h-6" />
          </button>
          
          <div className="flex bg-white/90 backdrop-blur-xl p-1.5 rounded-2xl shadow-xl border border-brand-primary/10 gap-1">
             {modes.map((m) => {
               const Icon = m.icon;
               const active = travelMode === m.id;
               return (
                 <button
                   key={m.id}
                   onClick={() => setTravelMode(m.id)}
                   className={cn(
                     "flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all",
                     active ? "bg-brand-primary text-white shadow-lg" : "text-brand-brown-light hover:bg-black/5"
                   )}
                 >
                   <Icon className="w-4 h-4" />
                   <span className="hidden sm:inline">{m.label}</span>
                 </button>
               );
             })}
          </div>
        </div>
      </div>

      {/* Cinematic Bottom Sheet */}
      <motion.div 
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        className="flex-none bg-brand-brown text-brand-sandstone p-6 pt-8 rounded-t-[40px] shadow-[0_-20px_40px_rgba(0,0,0,0.3)] relative overflow-hidden"
      >
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-12 h-1.5 bg-white/20 rounded-full" />
        
        {/* Background texture subtle pattern */}
        <div className="absolute top-0 right-0 w-40 h-40 opacity-10 pointer-events-none">
           <Compass className="w-full h-full text-white rotate-12" />
        </div>

        <div className="flex flex-col sm:flex-row gap-8 relative z-10">
          <div className="flex-1 space-y-6">
            <div className="flex items-start justify-between">
              <div>
                <motion.p 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-[10px] font-bold text-brand-gold uppercase tracking-[0.3em] mb-2"
                >
                  Heritage Journey Path
                </motion.p>
                <h2 className="text-3xl font-display leading-tight">Towards {monument.name}</h2>
              </div>
              <button className="p-3 bg-white/10 rounded-2xl hover:bg-white/20 transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3 text-brand-gold mb-1">
                   <Navigation className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Distance</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold">{routeInfo?.distance?.text || '--'}</span>
                </div>
              </div>
              <div className="bg-white/5 rounded-3xl p-5 border border-white/10 backdrop-blur-md">
                <div className="flex items-center gap-3 text-brand-gold mb-1">
                   <Clock className="w-4 h-4" />
                   <span className="text-[10px] font-bold uppercase tracking-widest">Time</span>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-display font-bold">{routeInfo?.duration?.text || '--'}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4 py-2 text-brand-sandstone-dim italic text-sm">
               <History className="w-4 h-4 text-brand-gold" />
               <p>Passing through the historic {monument.district} trails...</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 justify-end min-w-[200px]">
            <button className="w-full py-5 bg-brand-primary text-white rounded-2xl font-bold text-sm tracking-[0.2em] uppercase shadow-[0_10px_20px_rgba(152,67,0,0.3)] hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-3 group border-t border-white/20">
               <Sparkles className="w-5 h-5 text-brand-gold" />
               <span>Start Navigation</span>
            </button>
            <p className="text-[10px] text-center text-white/40 uppercase font-medium tracking-tighter">
              Fastest route based on current traffic
            </p>
          </div>
        </div>

        {/* Nearby Stops Preview */}
        <div className="mt-8 pt-8 border-t border-white/10">
           <div className="flex justify-between items-center mb-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold">Heritage Stops on this trail</h4>
              <ArrowRight className="w-4 h-4 text-brand-gold" />
           </div>
           <div className="flex gap-4 overflow-x-auto no-scrollbar pb-2">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-none w-48 h-20 bg-white/5 rounded-2xl border border-white/10 p-3 flex gap-3 items-center">
                   <div className="w-14 h-14 bg-brand-sandstone-dim rounded-lg flex-none overflow-hidden grayscale">
                      <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuDhV70c3ChheK7xrkefoTbgVKfoBirhpdm1EvWXg5e1g60xLdTLWeK9zS0vI9Nml_DtEBCfHyxEXoKHtVYzEiUCVslJruLG-H1j6oF4qOHC6QxPjIksnO-qQhPd-gpfJdl9Z3BSjOoOs2XT5zVtdWbdg8wGJi8ICmnD7vCFgGZeHub7ZIn3trYg_0RhQ-WYVrDswdbunyV7nqPBgy8dIoefdxILwXSEM7w9xSp_nnDyYKZdpWTO2d9Sgcnx1GPJvaCWxGlVv6UVKCE" alt="Spot" className="w-full h-full object-cover" />
                   </div>
                   <div className="min-w-0">
                      <p className="text-[10px] font-bold truncate">Ancient Inscription Pillar</p>
                      <p className="text-[9px] text-white/40">2km detour</p>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </motion.div>
    </div>
  );
};
