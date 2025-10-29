import React, { useState, useEffect, useRef } from 'react';
import { Language, Shelter } from '../types';
import { TEXTS } from '../constants';
import { getAiShelterRecommendation } from '../services/geminiService';
import { getShelters } from '../services/shelterService';
import { CheckCircleIcon, ListIcon, MapIcon, MyLocationIcon, SpinnerIcon, XIcon } from '../components/icons';
import Modal from '../components/Modal';

// Since Leaflet is loaded from a script tag, we need to assert its type on the window object.
const L = (window as any).L;

// Create a custom icon for shelters
const shelterIconSvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="38" height="38"><path fill="%232563eb" d="M12 0C7.582 0 4 3.582 4 8c0 5.25 8 16 8 16s8-10.75 8-16c0-4.418-3.582-8-8-8z"/><path fill="%23ffffff" d="M12 6l-4 3.5V13h2v-2.5h4V13h2V9.5L12 6z"/></svg>';
const shelterIcon = L.icon({
    iconUrl: `data:image/svg+xml,${shelterIconSvg}`,
    iconSize: [38, 38],
    iconAnchor: [19, 38], // point of the icon which will correspond to marker's location
    popupAnchor: [0, -38] // point from which the popup should open relative to the iconAnchor
});

const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c; // Distance in km
    return d;
};


const ShelterCard: React.FC<{
  shelter: Shelter;
  language: Language;
  onBook: (shelter: Shelter) => void;
}> = ({ shelter, language, onBook }) => (
  <div className="bg-white p-4 rounded-lg shadow-md border border-gray-200 hover:shadow-lg transition-shadow h-full flex flex-col">
    <div className="flex justify-between items-start">
      <h3 className="text-lg font-bold text-primary">{shelter.name}</h3>
      {shelter.verified && (
        <div className="flex items-center space-x-1 text-sm text-green-600 flex-shrink-0 ml-2">
          <CheckCircleIcon className="h-5 w-5" />
          <span>{TEXTS.verified[language]}</span>
        </div>
      )}
    </div>
    <p className="text-sm text-lighttext mt-1">{shelter.address}</p>
    {shelter.distance !== undefined && (
        <p className="text-sm font-semibold text-secondary mt-2">
            {TEXTS.kmAway[language].replace('{distance}', shelter.distance.toFixed(1))}
        </p>
    )}
    <div className="mt-3 text-sm space-y-2 flex-grow">
      <p>
        <strong>{TEXTS.bedsAvailable[language]}:</strong>
        <span className={`font-bold ml-2 ${shelter.bedsAvailable > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {shelter.bedsAvailable} / {shelter.capacity}
        </span>
      </p>
      <p><strong>For:</strong> {shelter.forWhom.join(', ')}</p>
      <p><strong>Services:</strong> {shelter.services.join(', ')}</p>
    </div>
    <div className="mt-4 flex items-center space-x-2">
      <a
        href={`https://www.google.com/maps/search/?api=1&query=${shelter.lat},${shelter.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-secondary text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-green-600 transition-colors"
      >
        {TEXTS.getDirections[language]}
      </a>
      <button
        onClick={() => onBook(shelter)}
        disabled={shelter.bedsAvailable <= 0}
        className="inline-block bg-primary text-white text-sm font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {shelter.bedsAvailable > 0 ? TEXTS.bookBed[language] : TEXTS.noBedsAvailable[language]}
      </button>
    </div>
  </div>
);

const ShelterFinderPage: React.FC<{ language: Language }> = ({ language }) => {
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'default' | 'beds' | 'distance'>('default');
  const [filteredShelters, setFilteredShelters] = useState<Shelter[]>([]);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  
  // Map state
  const mapRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const userMarkerRef = useRef<any>(null);

  // Location state
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [isWatchingLocation, setIsWatchingLocation] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
  const watchIdRef = useRef<number | null>(null);

  // Modal states
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [isLoadingAi, setIsLoadingAi] = useState(false);
  const [aiRecommendation, setAiRecommendation] = useState<Shelter | null>(null);
  const [aiError, setAiError] = useState<string | null>(null);
  const [animationKey, setAnimationKey] = useState(0);

  // Booking states
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [shelterToBook, setShelterToBook] = useState<Shelter | null>(null);
  const [peopleCount, setPeopleCount] = useState(1);
  const [isBookingSuccess, setIsBookingSuccess] = useState(false);

  // Fetch shelters on component mount
  useEffect(() => {
    const fetchShelters = async () => {
      try {
        const data = await getShelters();
        setShelters(data);
      } catch (error) {
        console.error("Failed to fetch shelters:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchShelters();
  }, []);

  // Cleanup effect to stop watching location when component unmounts
  useEffect(() => {
    return () => {
        if (watchIdRef.current !== null) {
            navigator.geolocation.clearWatch(watchIdRef.current);
        }
    };
  }, []);

  useEffect(() => {
    let results = shelters.filter(shelter => {
      const searchTermMatch = shelter.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            shelter.address.toLowerCase().includes(searchTerm.toLowerCase());
      const filterMatch = filters.length === 0 || filters.some(f => shelter.forWhom.includes(f as any));
      return searchTermMatch && filterMatch;
    });

    if (userLocation) {
        results = results.map(shelter => ({
            ...shelter,
            distance: calculateDistance(userLocation.lat, userLocation.lng, shelter.lat, shelter.lng)
        }));
    }

    if (sortBy === 'beds') {
      results.sort((a, b) => b.bedsAvailable - a.bedsAvailable);
    } else if (sortBy === 'distance' && userLocation) {
      results.sort((a, b) => (a.distance ?? Infinity) - (b.distance ?? Infinity));
    }

    setFilteredShelters(results);
    setAnimationKey(prevKey => prevKey + 1);
  }, [searchTerm, filters, sortBy, shelters, userLocation]);

  useEffect(() => {
    if (viewMode === 'map') {
        // If a map instance from a previous view exists, remove it before creating a new one.
        if (mapRef.current) {
            mapRef.current.remove();
        }
        // The user marker is tied to the map instance, so it must be cleared too.
        userMarkerRef.current = null;

        const map = L.map('map-container').setView([11.0, 78.3], 7); // Default to Tamil Nadu
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(map);
        mapRef.current = map;
        
        // Handle popup button clicks
        map.on('popupopen', (e: any) => {
            const shelterId = e.popup.getElement().querySelector('.book-bed-popup-btn')?.dataset.shelterId;
            if(shelterId){
                const shelter = shelters.find(s => s.id === parseInt(shelterId, 10));
                if(shelter) {
                    e.popup.getElement().querySelector('.book-bed-popup-btn').onclick = () => {
                       handleOpenBookingModal(shelter);
                    };
                }
            }
        });

        // Clear existing shelter markers
        markersRef.current.forEach(marker => marker.remove());
        markersRef.current = [];

        // Add new shelter markers
        filteredShelters.forEach(shelter => {
            const marker = L.marker([shelter.lat, shelter.lng], { icon: shelterIcon }).addTo(mapRef.current);
            const popupContent = `...`; // Popup content remains the same
            marker.bindPopup(popupContent);
            markersRef.current.push(marker);
        });
        
        // Auto-zoom to fit markers
        if (filteredShelters.length > 0 && !userLocation) {
            const markerBounds = L.latLngBounds(filteredShelters.map(s => [s.lat, s.lng]));
            mapRef.current.fitBounds(markerBounds, { padding: [50, 50], maxZoom: 14 });
        }
        
        // Re-create user marker if location is known
        if (userLocation) {
            const userIconHtml = isWatchingLocation
                ? `<div class="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md animate-pulse-location"></div>`
                : `<div class="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>`;

            const userIcon = L.divIcon({ html: userIconHtml, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
            const userMarker = L.marker([userLocation.lat, userLocation.lng], { icon: userIcon }).addTo(mapRef.current);
            userMarker.bindPopup(TEXTS.youAreHere[language]);
            userMarkerRef.current = userMarker;
            if (!filteredShelters.length) {
                map.setView([userLocation.lat, userLocation.lng], 13);
            }
        }
    }
  }, [viewMode, filteredShelters, language, isWatchingLocation, userLocation]); // Re-run when these change
  
  const handleFilterChange = (filter: string) => {
    setFilters(prev => prev.includes(filter) ? prev.filter(f => f !== filter) : [...prev, filter]);
  };

  const handleClearFilters = () => {
    setFilters([]);
  };

  const handleStartWatchingLocation = () => {
    if (!navigator.geolocation) {
        setLocationError(TEXTS.locationNotSupported[language]);
        return;
    }
    setIsLocationLoading(true);
    setLocationError(null);

    watchIdRef.current = navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            const newLocation = { lat: latitude, lng: longitude };
            
            setUserLocation(newLocation); // This will trigger distance recalculations

            // Center map on the first successful detection
            if (!isWatchingLocation && mapRef.current) {
                mapRef.current.setView(newLocation, 15);
                setSortBy('distance');
            }

            // Create or update the user marker for smooth movement
            if (mapRef.current) {
                const pulsingIcon = L.divIcon({ html: `<div class="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md animate-pulse-location"></div>`, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
                if (userMarkerRef.current) {
                    userMarkerRef.current.setLatLng(newLocation);
                    userMarkerRef.current.setIcon(pulsingIcon);
                } else {
                    const userMarker = L.marker(newLocation, { icon: pulsingIcon }).addTo(mapRef.current);
                    userMarker.bindPopup(TEXTS.youAreHere[language]);
                    userMarkerRef.current = userMarker;
                }
                mapRef.current.panTo(newLocation);
            }

            setIsLocationLoading(false);
            setIsWatchingLocation(true);
        },
        (error) => {
            let message = TEXTS.locationError[language];
            if (error.code === error.PERMISSION_DENIED) message = TEXTS.locationPermissionDenied[language];
            else if (error.code === error.POSITION_UNAVAILABLE) message = TEXTS.locationUnavailable[language];
            else if (error.code === error.TIMEOUT) message = TEXTS.locationTimeout[language];
            
            setLocationError(message);
            setIsLocationLoading(false);
            setIsWatchingLocation(false);
            if (watchIdRef.current !== null) {
                navigator.geolocation.clearWatch(watchIdRef.current);
                watchIdRef.current = null;
            }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
    );
  };

  const handleStopWatchingLocation = () => {
    if (watchIdRef.current !== null) {
        navigator.geolocation.clearWatch(watchIdRef.current);
        watchIdRef.current = null;
    }
    setIsWatchingLocation(false);
    
    // Change marker style back to non-pulsing
    if (userMarkerRef.current) {
        const staticIcon = L.divIcon({ html: `<div class="h-4 w-4 bg-blue-600 rounded-full border-2 border-white shadow-md"></div>`, className: '', iconSize: [16, 16], iconAnchor: [8, 8] });
        userMarkerRef.current.setIcon(staticIcon);
    }
  };

  const handleLocationButtonClick = () => {
    if (isWatchingLocation) {
        handleStopWatchingLocation();
    } else {
        handleStartWatchingLocation();
    }
  };
  
  const handleGetRecommendation = async () => {
    if (!aiPrompt) return;
    setIsLoadingAi(true);
    setAiRecommendation(null);
    setAiError(null);
    try {
        const recommendation = await getAiShelterRecommendation(aiPrompt, shelters);
        if (recommendation) {
            setAiRecommendation(recommendation);
        } else {
            setAiError(TEXTS.recommendationNotFound[language]);
        }
    } catch (e) {
        console.error("AI Recommendation Error:", e);
        setAiError(TEXTS.recommendationError[language]);
    } finally {
        setIsLoadingAi(false);
    }
  };
  
  const handleOpenBookingModal = (shelter: Shelter) => {
    setShelterToBook(shelter);
    setIsBookingModalOpen(true);
    setPeopleCount(1);
    setIsBookingSuccess(false);
  };
  
  const handleCloseBookingModal = () => {
    setIsBookingModalOpen(false);
    setShelterToBook(null);
  };
  
  const handleConfirmBooking = () => {
    if (!shelterToBook || peopleCount <= 0 || peopleCount > shelterToBook.bedsAvailable) {
        return;
    }
    setShelters(prevShelters => 
        prevShelters.map(s => 
            s.id === shelterToBook.id 
            ? { ...s, bedsAvailable: s.bedsAvailable - peopleCount } 
            : s
        )
    );
    setIsBookingSuccess(true);
  };

  const filterOptions = ['men', 'women', 'families', 'children'];

  return (
    <div className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-center mb-2">
                 <h1 className="text-3xl font-bold">{TEXTS[ "shelter-finder" ][language]}</h1>
                 {/* View Toggle */}
                 <div className="flex items-center space-x-1 border border-gray-300 rounded-lg p-1">
                    <button 
                        onClick={() => setViewMode('list')} 
                        className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-pressed={viewMode === 'list'}
                    >
                        <ListIcon className="h-5 w-5" />
                        <span className="sr-only">{TEXTS.listView[language]}</span>
                    </button>
                     <button 
                        onClick={() => setViewMode('map')} 
                        className={`px-3 py-1 rounded-md transition-colors ${viewMode === 'map' ? 'bg-primary text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                        aria-pressed={viewMode === 'map'}
                    >
                         <MapIcon className="h-5 w-5" />
                         <span className="sr-only">{TEXTS.mapView[language]}</span>
                    </button>
                </div>
            </div>
            <p className="text-lighttext mb-4">{TEXTS.finderSubtitle[language]}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="text" placeholder={TEXTS.searchPlaceholder[language]} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary" />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button 
                        onClick={handleLocationButtonClick} 
                        disabled={isLocationLoading} 
                        className={`flex items-center justify-center font-semibold py-2 px-4 rounded-md transition-colors disabled:bg-gray-200 disabled:cursor-not-allowed ${
                            isWatchingLocation 
                                ? 'bg-red-100 text-red-800 hover:bg-red-200' 
                                : 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                        }`}
                    >
                        {isLocationLoading ? (
                            <>
                                <SpinnerIcon className="h-5 w-5 mr-2" />
                                {TEXTS.detectingLocation[language]}
                            </>
                        ) : isWatchingLocation ? (
                            <>
                                <XIcon className="h-5 w-5 mr-2" />
                                {TEXTS.stopLiveTracking[language]}
                            </>
                        ) : (
                            <>
                                <MyLocationIcon className="h-5 w-5 mr-2" />
                                {TEXTS.startLiveTracking[language]}
                            </>
                        )}
                    </button>
                    <button onClick={() => setIsAiModalOpen(true)} className="bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors whitespace-nowrap">{TEXTS.aiRecommendation[language]}</button>
                </div>
            </div>
            {locationError && <p className="text-red-600 text-sm mt-2">{locationError}</p>}
            
            {/* Enhanced Filter Section */}
            <div className="mt-4 p-4 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
                <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-800">{TEXTS.filterBy[language]}</span>
                    {filters.length > 0 && (
                        <button 
                            onClick={handleClearFilters}
                            className="text-sm font-medium text-primary hover:underline"
                        >
                            Clear
                        </button>
                    )}
                </div>
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex items-center flex-wrap gap-x-6 gap-y-2">
                        {filterOptions.map(opt => (
                            <label key={opt} className="flex items-center space-x-2 cursor-pointer text-gray-700 hover:text-primary transition-colors">
                                <input 
                                    type="checkbox" 
                                    checked={filters.includes(opt)} 
                                    onChange={() => handleFilterChange(opt)} 
                                    className="rounded text-primary focus:ring-primary-dark focus:ring-2 focus:ring-offset-1"
                                />
                                <span>{TEXTS[opt as keyof typeof TEXTS][language]}</span>
                            </label>
                        ))}
                    </div>
                     <div className="flex items-center space-x-2">
                        <label htmlFor="sort-by" className="text-sm font-medium text-gray-700 shrink-0">{TEXTS.sortBy[language]}:</label>
                        <select 
                            id="sort-by" 
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value as any)}
                            className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-primary focus:border-primary"
                        >
                            <option value="default">{TEXTS.sortDefault[language]}</option>
                            <option value="beds">{TEXTS.sortBeds[language]}</option>
                            <option value="distance" disabled={!userLocation}>{TEXTS.sortDistance[language]}</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <SpinnerIcon className="h-12 w-12 text-primary" />
          <p className="ml-4 text-lg text-lighttext">{TEXTS.loading[language]}</p>
        </div>
      ) : (
        <div key={animationKey} className="animate-fade-in">
          {viewMode === 'list' ? (
            <>
              {filteredShelters.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredShelters.map(shelter => 
                    <ShelterCard 
                      key={shelter.id} 
                      shelter={shelter} 
                      language={language} 
                      onBook={handleOpenBookingModal} 
                    />
                  )}
                </div>
              ) : (
                <p className="text-center text-lighttext pt-10">{TEXTS.noSheltersFound[language]}</p>
              )}
            </>
          ) : (
            <div id="map-container" className="h-[60vh] rounded-lg shadow-md z-0"></div>
          )}
        </div>
      )}

      {/* AI Recommendation Modal */}
      {isAiModalOpen && (
        <Modal title={TEXTS.aiRecommendation[language]} onClose={() => setIsAiModalOpen(false)}>
          <div>
            <label htmlFor="aiPrompt" className="block text-sm font-medium text-gray-700">{TEXTS.aiPrompt[language]}</label>
            <textarea
              id="aiPrompt"
              rows={3}
              value={aiPrompt}
              onChange={(e) => {
                setAiPrompt(e.target.value);
                setAiRecommendation(null);
                setAiError(null);
              }}
              placeholder={TEXTS.aiModalPlaceholder[language]}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
            />
            <button onClick={handleGetRecommendation} disabled={isLoadingAi} className="mt-4 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400">
              {isLoadingAi ? TEXTS.loading[language] : TEXTS.getRecommendation[language]}
            </button>
            {aiRecommendation && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                <h4 className="font-bold text-green-800">{TEXTS.recommendationTitle[language]}</h4>
                <p className="text-sm text-green-700">{aiRecommendation.name} - {aiRecommendation.address}</p>
              </div>
            )}
            {aiError && (
                <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm text-yellow-800">{aiError}</p>
                </div>
            )}
          </div>
        </Modal>
      )}
      
      {/* Booking Modal */}
      {isBookingModalOpen && shelterToBook && (
        <Modal 
          title={isBookingSuccess ? TEXTS.bookingSuccessful[language] : TEXTS.bookBedsAt[language].replace('{shelterName}', shelterToBook.name)} 
          onClose={handleCloseBookingModal}
        >
          {isBookingSuccess ? (
            <div className="text-center">
              <CheckCircleIcon className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <p className="text-lg">
                {TEXTS.bedsBookedMessage[language]
                  .replace('{count}', peopleCount.toString())
                  .replace('{shelterName}', shelterToBook.name)}
              </p>
              <button onClick={handleCloseBookingModal} className="mt-6 bg-primary text-white font-semibold py-2 px-6 rounded-md hover:bg-primary-dark transition-colors">
                Close
              </button>
            </div>
          ) : (
            <div>
              <label htmlFor="peopleCount" className="block text-sm font-medium text-gray-700">{TEXTS.numberOfPeople[language]}</label>
              <input
                type="number"
                id="peopleCount"
                value={peopleCount}
                onChange={(e) => setPeopleCount(parseInt(e.target.value, 10))}
                min="1"
                max={shelterToBook.bedsAvailable}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-primary focus:border-primary"
                aria-describedby="beds-available-hint"
              />
              <p id="beds-available-hint" className="text-xs text-lighttext mt-1">
                {shelterToBook.bedsAvailable} {TEXTS.bedsAvailable[language]}.
              </p>
              <button 
                onClick={handleConfirmBooking}
                disabled={!peopleCount || peopleCount <= 0 || peopleCount > shelterToBook.bedsAvailable}
                className="mt-6 w-full bg-primary text-white font-semibold py-2 px-4 rounded-md hover:bg-primary-dark transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {TEXTS.confirmBooking[language]}
              </button>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};

export default ShelterFinderPage;