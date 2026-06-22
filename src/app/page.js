"use client";

/* eslint-disable react-hooks/set-state-in-effect */

// Intercept and suppress Google Maps auth errors to prevent Next.js dev overlay crash
if (typeof window !== "undefined") {
  const originalError = console.error;
  console.error = (...args) => {
    const errorMsg = args.join(" ");
    if (
      errorMsg.includes("Google Maps JavaScript API error") || 
      errorMsg.includes("InvalidKeyMapError")
    ) {
      return;
    }
    originalError.apply(console, args);
  };
}

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { destinations, curatedDestinations } from "@/lib/destinations";

// Icon components (using clean SVG layouts)
const SvgIcon = ({ type }) => {
  switch (type) {
    case "dashboard":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
        </svg>
      );
    case "itinerary":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
        </svg>
      );
    case "budget":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.879a3 3 0 004.243 0L15 13.182a3 3 0 00-4.243-4.243L9 10.5m-9 1.5a9 9 0 1118 0 9 9 0 01-18 0z" />
        </svg>
      );
    case "packing":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>
      );
    case "safety":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
        </svg>
      );
    case "live":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="18" height="18">
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5" />
        </svg>
      );
    case "arrow-right":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
        </svg>
      );
    case "plus":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="16" height="16">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
        </svg>
      );
    case "chevron-left":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      );
    case "chevron-right":
      return (
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" width="20" height="20">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
        </svg>
      );
    default:
      return null;
  }
};

export default function App() {
  const [activeTab, setActiveTab] = useState("landing"); // tabs: landing, dashboard, itinerary, budget, packing, safety, live
  const [onboarded, setOnboarded] = useState(false);
  const [loadingPlan, setLoadingPlan] = useState(false);
  
  // Modal toggle states
  const [stateDetailOpen, setStateDetailOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedStateKey, setSelectedStateKey] = useState("ladakh");

  // Selected places selection checkboxes inside state explorer
  const [selectedPlaces, setSelectedPlaces] = useState([]);
  const [selectedPlaceIds, setSelectedPlaceIds] = useState([]);
  const [attractionFilter, setAttractionFilter] = useState("All");

  // API Integration Configuration states
  const [googleMapsKey, setGoogleMapsKey] = useState("");
  const [geminiKey, setGeminiKey] = useState("");
  const [settingsOpen, setSettingsOpen] = useState(false);

  // Autocomplete and search states
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  
  // Simple local authentication state
  const [authenticated, setAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [authEmail, setAuthEmail] = useState("");
  const [authPassword, setAuthPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [authPromptOpen, setAuthPromptOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [registeredUsers, setRegisteredUsers] = useState([]);
  const [pendingExploreState, setPendingExploreState] = useState(null);

  // Unified global search/filter state (for state explorer backup)
  const [globalSearch, setGlobalSearch] = useState("");
  const [globalCategoryFilter, setGlobalCategoryFilter] = useState("All");
  const [globalStateFilter, setGlobalStateFilter] = useState("All");

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const savedUsers = JSON.parse(localStorage.getItem("easygo_users") || "[]");
      const savedCurrent = JSON.parse(localStorage.getItem("easygo_current_user") || "null");
      setRegisteredUsers(Array.isArray(savedUsers) ? savedUsers : []);
      if (savedCurrent?.email) {
        setAuthenticated(true);
        setCurrentUser(savedCurrent);
      }
    } catch (error) {
      console.error("Failed to load auth storage:", error);
    }
  }, []);

  // Form criteria state
  const [formData, setFormData] = useState({
    destination: "ladakh",
    startDate: "",
    endDate: "",
    tripType: "Solo",
    budgetTier: "Comfort",
    interests: ["Food", "Nature"],
    dietary: "None",
    specialRequirements: "",
    budgetCap: ""
  });

  const [copilotQuery, setCopilotQuery] = useState("");
  const [copilotLoading, setCopilotLoading] = useState(false);
  const [selectedTransportMode, setSelectedTransportMode] = useState("road");
  const [discoverFilter, setDiscoverFilter] = useState("all");
  const [googleHotels, setGoogleHotels] = useState([]);
  const [googleRestaurants, setGoogleRestaurants] = useState([]);
  const [loadingPlaces, setLoadingPlaces] = useState(false);

  // New state parameters for advanced features
  const [staysFilter, setStaysFilter] = useState("All");
  const [diningFilter, setDiningFilter] = useState("All");
  const [savedTrips, setSavedTrips] = useState([]);
  const [expandedSegmentIdx, setExpandedSegmentIdx] = useState(null);

  // Budget entry form inputs
  const [newExpense, setNewExpense] = useState({ title: "", amount: "", category: "Food & Dining" });

  // Custom activity form inputs
  const [newActivity, setNewActivity] = useState({
    name: "",
    slot: "Morning",
    time: "09:00 AM",
    description: "",
    zone: "Local Spot",
    cost: "200",
    transport: "Walking"
  });

  // Live simulation alerts
  const [alerts, setAlerts] = useState([]);
  const [alertActions, setAlertActions] = useState({}); // alertId -> success message


  // Carousel slider state
  const [currentSlide, setCurrentSlide] = useState(0);
  const carouselSlides = [
    {
      image: "/images/leh ladakh.png",
      title: "Majestic Ladakh Mountains",
      caption: "Discover high altitude sand dunes, crystal blue lakes, and ancient cliff monasteries."
    },
    {
      image: "/images/goa.png",
      title: "Goa's Sunkissed Beaches",
      caption: "Stroll along historic Portuguese quarters, sample fish thalis, and enjoy beach watersports."
    },
    {
      image: "/images/rajasthan.png",
      title: "Jaipur's Royal Heritage",
      caption: "Explore ancient stone forts, mirror palaces, stepwells, and traditional Block print arts."
    }
  ];

  // Auto transition for slide bar
  useEffect(() => {
    if (activeTab === "landing") {
      const interval = setInterval(() => {
        setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [activeTab, carouselSlides.length]);

  // Comprehensive 12 States List Directory
  const destinationsList = [
    { key: "uttarpradesh", name: "Uttar Pradesh", tag: "Heritage wonders", image: "/images/uttarpradesh.png", desc: "Taj Mahal, Varanasi riverbank fire Aarti, and Nawabi food." },
    { key: "kerala", name: "Kerala", tag: "Backwaters & Mist hills", image: "/images/kerala.png", desc: "Tea fields, houseboats, and classical dance arts." },
    { key: "uttarakhand", name: "Uttarakhand", tag: "Spiritual & Trekking", image: "/images/uttarakhand.png", desc: "Rishikesh yoga rapids, Nainital boating, and Kempty falls." },
    { key: "delhi", name: "Delhi Capital", tag: "Historic Markets", image: "/images/delhi.png", desc: "Mughal Red Fort, India Gate, and Chandni Chowk street food." },
    { key: "westbengal", name: "West Bengal", tag: "Heritage & Wildlife", image: "/images/west bengal.png", desc: "Darjeeling Toy Train, Victoria Memorial, and Tiger mangroves." },
    { key: "sikkim", name: "Sikkim", tag: "Glacial Passages", image: "/images/sikkim.png", desc: "Gangtok monastery, high alpine lakes, and border passes." },
    { key: "ladakh", name: "Leh Ladakh", tag: "Himalayan Adventure", image: "/images/leh ladakh.png", desc: "Monasteries, cold deserts, and high-altitude lakes." },
    { key: "goa", name: "Goa Coast", tag: "Beaches & Nightlife", image: "/images/goa.png", desc: "Sandy shores, sea food, water sports, and old churches." },
    { key: "rajasthan", name: "Rajasthan (Jaipur)", tag: "Forts & Palaces", image: "/images/rajasthan.png", desc: "Maharaja palaces, stepwells, and desert safaris." },
    { key: "himachal", name: "Himachal Pradesh", tag: "Snow peaks & Adventure", image: "/images/himachal pradesh.png", desc: "Shimla Mall road, Manali skiing, and Dharamshala temples." },
    { key: "maharashtra", name: "Maharashtra", tag: "Coastal & Caves", image: "/images/maharashtra.png", desc: "Mumbai Gateway, Marine Drive, and Lonavala rock caves." },
    { key: "karnataka", name: "Karnataka", tag: "Ancient Empires", image: "/images/karnataka.png", desc: "Hampi stone chariot, Mysore Palace, and Coorg coffee estates." }
  ];

  // Active state data details from destinations DB
  const activeStateData = destinations[selectedStateKey] || destinations.ladakh;

  // Sync state detail modal prechecks (precheck state places only if basket is empty)
  useEffect(() => {
    if (stateDetailOpen && activeStateData) {
      if (selectedPlaceIds.length === 0) {
        setSelectedPlaceIds(activeStateData.touristPlaces.map(p => p.id));
      }
      setAttractionFilter("All");
    }
  }, [stateDetailOpen, activeStateData, selectedPlaceIds.length]);

  // Load API Keys and saved trips from localStorage on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      setGoogleMapsKey(localStorage.getItem("google_maps_key") || "");
      setGeminiKey(localStorage.getItem("gemini_key") || "");

      const saved = localStorage.getItem("easygo_saved_trips");
      if (saved) {
        try {
          setSavedTrips(JSON.parse(saved));
        } catch (e) {
          console.error("Failed to load saved trips on mount:", e);
        }
      }

      // Handle Google Maps API key authentication failures gracefully
      window.gm_authFailure = () => {
        console.error("Google Maps API authentication failed. Falling back to keyless mode.");
        alert("The Google Maps API key provided is invalid or inactive. EasyGo has automatically reverted to keyless mode.");
        setGoogleMapsKey("");
        localStorage.removeItem("google_maps_key");
        const script = document.getElementById("google-maps-script");
        if (script) {
          script.remove();
        }
        if (window.google) {
          delete window.google.maps;
        }
      };
    }
  }, []);

  // Dynamically load Google Maps Javascript script if a key is present
  useEffect(() => {
    if (googleMapsKey && googleMapsKey.trim() !== "") {
      const scriptId = "google-maps-script";
      if (!document.getElementById(scriptId)) {
        const script = document.createElement("script");
        script.id = scriptId;
        script.src = `https://maps.googleapis.com/maps/api/js?key=${googleMapsKey}&libraries=places`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
    }
  }, [googleMapsKey]);

  const findCuratedDestination = (name) => {
    if (!name) return null;

    const normalized = name.trim().toLowerCase();
    return curatedDestinations.find(c => 
      c.name.toLowerCase() === normalized ||
      c.name.toLowerCase().includes(normalized) ||
      normalized.includes(c.name.toLowerCase())
    );
  };

  const getActiveCuratedPlace = () => {
    if (!selectedPlaces.length) return null;
    const primaryPlace = selectedPlaces[0];
    const exactMatch = findCuratedDestination(primaryPlace.name);
    if (exactMatch) return exactMatch;

    const nearMatch = curatedDestinations.find(c => {
      const dist = getDistanceBetween(c.lat, c.lng, primaryPlace.lat, primaryPlace.lng);
      return dist <= 15;
    });
    return nearMatch || null;
  };

  const fetchOsmSuggestions = async (inputVal) => {
    const trimmedInput = inputVal.trim().toLowerCase();
    const curatedMatches = curatedDestinations.filter(d => 
      d.name.toLowerCase().includes(trimmedInput)
    ).map(d => ({
      id: d.id,
      name: d.name,
      description: `${d.name}, ${d.state}, India (Local Index)`,
      isGoogle: false,
      localData: d
    }));

    if (curatedMatches.length > 0) {
      setSuggestions(curatedMatches.slice(0, 5));
      return;
    }

    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&countrycodes=in&q=${encodeURIComponent(inputVal)}`);
      const data = await res.json();
      const osmMatches = data.map(item => ({
        id: `osm-${item.place_id}`,
        name: item.display_name.split(",")[0],
        description: item.display_name,
        isGoogle: false,
        lat: parseFloat(item.lat),
        lng: parseFloat(item.lon)
      }));

      setSuggestions(osmMatches.slice(0, 5));
    } catch (e) {
      setSuggestions(curatedMatches.slice(0, 5));
    }
  };

  const saveAuthState = (users, current) => {
    try {
      localStorage.setItem("easygo_users", JSON.stringify(users));
      localStorage.setItem("easygo_current_user", JSON.stringify(current));
    } catch (error) {
      console.error("Failed to save auth state:", error);
    }
  };

  const handleRegister = () => {
    setAuthError("");
    if (!authEmail || !authPassword) {
      setAuthError("Please enter both email and password to register.");
      return;
    }
    const existing = registeredUsers.find(user => user.email.toLowerCase() === authEmail.toLowerCase());
    if (existing) {
      setAuthError("An account with this email already exists. Please login.");
      return;
    }
    const newUser = { email: authEmail.toLowerCase(), password: authPassword };
    const nextUsers = [...registeredUsers, newUser];
    setRegisteredUsers(nextUsers);
    setAuthenticated(true);
    setCurrentUser({ email: newUser.email });
    saveAuthState(nextUsers, { email: newUser.email });
    setAuthPromptOpen(false);
    if (pendingExploreState) {
      openStateProfile(pendingExploreState);
      setPendingExploreState(null);
    }
  };

  const handleLogin = () => {
    setAuthError("");
    if (!authEmail || !authPassword) {
      setAuthError("Enter both email and password to login.");
      return;
    }
    const matching = registeredUsers.find(user => user.email.toLowerCase() === authEmail.toLowerCase() && user.password === authPassword);
    if (!matching) {
      setAuthError("Credentials not found. Please sign up or try again.");
      return;
    }
    setAuthenticated(true);
    setCurrentUser({ email: matching.email });
    saveAuthState(registeredUsers, { email: matching.email });
    setAuthPromptOpen(false);
    if (pendingExploreState) {
      openStateProfile(pendingExploreState);
      setPendingExploreState(null);
    }
  };

  const openAuthPrompt = (mode = "login", stateKey = null) => {
    setAuthMode(mode);
    setAuthError("");
    setAuthEmail("");
    setAuthPassword("");
    setPendingExploreState(stateKey);
    setAuthPromptOpen(true);
  };

  const closeAuthPrompt = () => {
    setAuthPromptOpen(false);
    setPendingExploreState(null);
  };

  const handleLogout = () => {
    setAuthenticated(false);
    setCurrentUser(null);
    localStorage.removeItem("easygo_current_user");
  };

  const handleProtectedExplore = (stateKey) => {
    if (!authenticated) {
      openAuthPrompt("login", stateKey);
      return;
    }
    openStateProfile(stateKey);
  };

  const scrollToContact = () => {
    if (typeof window === "undefined") return;
    const el = document.getElementById("contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.hash = "#contact-section";
    }
  };

  // Autocomplete suggestions debounced fetching
  useEffect(() => {
    if (!searchQuery || searchQuery.trim().length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      if (googleMapsKey && typeof window !== "undefined" && window.google?.maps?.places) {
        try {
          const service = new window.google.maps.places.AutocompleteService();
          service.getPlacePredictions(
            { input: searchQuery, componentRestrictions: { country: "in" } },
            (predictions, status) => {
              if (status === window.google.maps.places.PlacesServiceStatus.OK && predictions) {
                setSuggestions(predictions.map(p => ({
                  id: p.place_id,
                  name: p.structured_formatting.main_text,
                  description: p.description,
                  isGoogle: true
                })));
              }
            }
          );
        } catch (e) {
          console.error("Google prediction error:", e);
          fetchOsmSuggestions(searchQuery);
        }
      } else {
        fetchOsmSuggestions(searchQuery);
      }
    }, 400);

    return () => clearTimeout(timer);
  }, [searchQuery, googleMapsKey]);



  // Resolve coordinates and metadata for a selected place
  const selectSuggestion = (sug) => {
    const exactCurated = findCuratedDestination(sug.name);
    if (exactCurated) {
      addPlaceToBasket({
        id: exactCurated.id,
        name: exactCurated.name,
        lat: exactCurated.lat,
        lng: exactCurated.lng,
        city: exactCurated.name,
        state: exactCurated.state,
        country: "India",
        category: exactCurated.category
      });
      return;
    }

    if (sug.isGoogle) {
      if (typeof window !== "undefined" && window.google) {
        const mapEl = document.createElement("div");
        const service = new window.google.maps.places.PlacesService(mapEl);
        service.getDetails({ placeId: sug.id, fields: ["name", "geometry", "address_components"] }, (place, status) => {
          if (status === window.google.maps.places.PlacesServiceStatus.OK && place) {
            const lat = place.geometry.location.lat();
            const lng = place.geometry.location.lng();
            
            let city = "";
            let state = "";
            place.address_components.forEach(comp => {
              if (comp.types.includes("locality")) city = comp.long_name;
              if (comp.types.includes("administrative_area_level_1")) state = comp.long_name;
            });
            
            addPlaceToBasket({
              id: sug.id,
              name: place.name,
              lat,
              lng,
              city: city || place.name,
              state: state || "India",
              country: "India",
              category: "Sightseeing"
            });
          }
        });
      }
    } else if (sug.localData) {
      addPlaceToBasket({
        id: sug.id,
        name: sug.name,
        lat: sug.localData.lat,
        lng: sug.localData.lng,
        city: sug.name,
        state: sug.localData.state,
        country: "India",
        category: sug.localData.category
      });
    } else {
      const parts = sug.description.split(",");
      const state = parts[parts.length - 3]?.trim() || "India";
      const city = parts[0]?.trim();
      addPlaceToBasket({
        id: sug.id,
        name: sug.name,
        lat: sug.lat,
        lng: sug.lng,
        city: city || sug.name,
        state: state || "India",
        country: "India",
        category: "Sightseeing"
      });
    }
  };

  const addPlaceToBasket = (place) => {
    if (selectedPlaces.find(p => p.id === place.id || p.name.toLowerCase() === place.name.toLowerCase())) {
      setSearchQuery("");
      setSuggestions([]);
      return;
    }
    setSelectedPlaces(prev => [...prev, place]);
    setSelectedPlaceIds(prev => [...prev, place.id]);
    setSearchQuery("");
    setSuggestions([]);
  };

  const removePlaceFromBasket = (placeId) => {
    setSelectedPlaces(prev => prev.filter(p => p.id !== placeId));
    setSelectedPlaceIds(prev => prev.filter(id => id !== placeId));
  };

  // Handle attraction selection toggle from state profile modal
  const togglePlaceSelection = (placeId) => {
    setSelectedPlaceIds(prev => {
      const isChecked = prev.includes(placeId);
      const nextIds = isChecked ? prev.filter(id => id !== placeId) : [...prev, placeId];
      
      if (isChecked) {
        setSelectedPlaces(pPrev => pPrev.filter(p => p.id !== placeId));
      } else {
        const found = allAttractions.find(p => p.id === placeId);
        if (found) {
          setSelectedPlaces(pPrev => [...pPrev, {
            id: found.id,
            name: found.name,
            lat: found.lat,
            lng: found.lng,
            city: found.name,
            state: found.stateName,
            country: "India",
            category: found.category
          }]);
        }
      }
      return nextIds;
    });
  };

  // Loaded Trip Plan state
  const [planData, setPlanData] = useState(null);

  // User interactive states overlays
  const [activeItineraryDay, setActiveItineraryDay] = useState(1);
  const [rainMode, setRainMode] = useState(false);
  const [packingList, setPackingList] = useState([]);
  const [customExpenses, setCustomExpenses] = useState([]);
  const [visitedActivities, setVisitedActivities] = useState({}); // activityId -> boolean

  // Google Maps active location & selected item logic
  const [mapLocation, setMapLocation] = useState("Leh Ladakh, India");
  const [selectedActivityId, setSelectedActivityId] = useState(null);

  const fetchAlerts = async (dest) => {
    try {
      const res = await fetch(`/api/alerts?destination=${dest}`);
      const data = await res.json();
      if (data.success) {
        setAlerts(data.alerts);
        setAlertActions({});
      }
    } catch (e) {
      console.error(e);
    }
  };

  // Direct planning request helper that supports copilot triggers and key injection
  async function generatePlanDirect(formVal, placesVal) {
    setLoadingPlan(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formVal,
          selectedPlaces: placesVal,
          geminiApiKey: geminiKey || localStorage.getItem("gemini_key") || "",
          googleMapsKey: googleMapsKey || localStorage.getItem("google_maps_key") || ""
        })
      });
      const data = await res.json();
      if (data.success) {
        setPlanData(data);
        if (data.packingList) {
          setPackingList(data.packingList);
        }
        
        // Setup default expenses
        if (data.feasible !== false && data.budget?.breakdown) {
          const defaultExpenses = data.budget.breakdown.map((b, idx) => ({
            id: `default-${idx}`,
            title: `Estimated ${b.category}`,
            amount: b.allocated,
            category: b.category,
            date: "Before Trip"
          }));
          setCustomExpenses(defaultExpenses);
        } else {
          setCustomExpenses([]);
        }
        
        setVisitedActivities({});
        fetchAlerts(formVal.destination);

        // Reset map to general destination area
        setMapLocation(data.destination + ", India");
        setSelectedActivityId(null);

        setModalOpen(false);
        setOnboarded(true);
        setActiveTab("dashboard");
      } else {
        alert(data.error || "Failed to generate your plan.");
      }
    } catch (e) {
      console.error(e);
      alert("Failed to connect to the advisor backend.");
    } finally {
      setLoadingPlan(false);
    }
  }

  // Check for imported shared trip on mount or state URL parameter
  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Check for state search query parameter
      const searchParams = new URLSearchParams(window.location.search);
      const stateParam = searchParams.get("state");
      if (stateParam && destinations[stateParam.toLowerCase()]) {
        setSelectedStateKey(stateParam.toLowerCase());
        setStateDetailOpen(true);
        // Clean URL parameter without reloading
        window.history.replaceState({}, document.title, window.location.pathname);
      }

      // 2. Check for imported trip
      const imported = localStorage.getItem("imported_trip_params");
      if (imported) {
        try {
          const params = JSON.parse(imported);
          setFormData({
            destination: params.destination || "ladakh",
            startDate: params.startDate || "",
            endDate: params.endDate || "",
            tripType: params.tripType || "Solo",
            budgetTier: params.budgetTier || "Comfort",
            interests: params.interests || ["Food", "Nature"],
            dietary: params.dietary || "None",
            specialRequirements: params.specialRequirements || "",
            budgetCap: params.budgetCap || ""
          });
          
          setSelectedPlaces(params.selectedPlaces || []);
          setSelectedPlaceIds((params.selectedPlaces || []).map(p => p.id));
          
          localStorage.removeItem("imported_trip_params");
          
          generatePlanDirect({
            destination: params.destination || "ladakh",
            startDate: params.startDate || "",
            endDate: params.endDate || "",
            tripType: params.tripType || "Solo",
            budgetTier: params.budgetTier || "Comfort",
            interests: params.interests || ["Food", "Nature"],
            dietary: params.dietary || "None",
            specialRequirements: params.specialRequirements || "",
            budgetCap: params.budgetCap || ""
          }, params.selectedPlaces || []);
          
          alert("Imported shared trip! Auto-generating route plan...");
        } catch (e) {
          console.error("Failed to parse imported trip:", e);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Fetch Google Places hotels & restaurants if Google Maps API Key is active
  useEffect(() => {
    if (onboarded && planData && googleMapsKey && typeof window !== "undefined" && window.google?.maps?.places) {
      setLoadingPlaces(true);
      const mapEl = document.createElement("div");
      const service = new window.google.maps.places.PlacesService(mapEl);
      const queryLoc = planData.destination + ", India";

      // Query Stays
      const staysQuery = staysFilter === "All" ? `hotels in ${queryLoc}` : `${staysFilter} hotels in ${queryLoc}`;
      service.textSearch({ query: staysQuery }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setGoogleHotels(results.slice(0, 5).map(r => ({
            name: r.name,
            rating: r.rating || "N/A",
            address: r.formatted_address || "",
            priceLevel: r.price_level !== undefined ? "$".repeat(r.price_level) : "$$"
          })));
        }
      });

      // Query Dining
      const diningQuery = diningFilter === "All" ? `restaurants in ${queryLoc}` : `${diningFilter} restaurants in ${queryLoc}`;
      service.textSearch({ query: diningQuery }, (results, status) => {
        if (status === window.google.maps.places.PlacesServiceStatus.OK && results) {
          setGoogleRestaurants(results.slice(0, 5).map(r => ({
            name: r.name,
            rating: r.rating || "N/A",
            address: r.formatted_address || "",
            priceLevel: r.price_level !== undefined ? "$".repeat(r.price_level) : "$$"
          })));
        }
        setLoadingPlaces(false);
      });
    }
  }, [onboarded, planData, googleMapsKey, staysFilter, diningFilter]);

  // AI Copilot Query Processing
  const handleCopilotSubmit = async () => {
    if (!copilotQuery.trim()) return;
    setCopilotLoading(true);
    try {
      const res = await fetch("/api/copilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: copilotQuery, geminiApiKey: geminiKey })
      });
      const data = await res.json();
      if (data.success) {
        // Clear basket
        const newPlaces = [];
        const newPlaceIds = [];

        // Build updated form criteria
        const updatedForm = {
          ...formData,
          tripType: data.tripType || "Solo",
          budgetTier: data.budgetTier || "Comfort",
          interests: data.interests || ["Nature"],
          budgetCap: data.budgetCap || ""
        };

        const days = data.durationDays || 3;
        const today = new Date();
        updatedForm.startDate = today.toISOString().split("T")[0];
        const endD = new Date();
        endD.setDate(today.getDate() + (days - 1));
        updatedForm.endDate = endD.toISOString().split("T")[0];
        setFormData(updatedForm);

        // Discovered places mapping
        const dbPlaces = [
          ...curatedDestinations,
          ...Object.keys(destinations).flatMap(sKey => 
            destinations[sKey].touristPlaces.map(p => ({
              ...p,
              stateKey: sKey,
              stateName: destinations[sKey].name
            }))
          )
        ];

        data.destinations.forEach(dest => {
          const lowerD = dest.toLowerCase();
          const matchingStateKey = Object.keys(destinations).find(sKey => 
            destinations[sKey].name.toLowerCase().includes(lowerD) ||
            lowerD.includes(destinations[sKey].name.toLowerCase())
          );

          if (matchingStateKey) {
            destinations[matchingStateKey].touristPlaces.slice(0, 4).forEach(p => {
              if (!newPlaceIds.includes(p.id)) {
                newPlaces.push({
                  id: p.id,
                  name: p.name,
                  lat: p.lat,
                  lng: p.lng,
                  city: p.name,
                  state: destinations[matchingStateKey].name,
                  country: "India",
                  category: p.category
                });
                newPlaceIds.push(p.id);
              }
            });
          } else {
            const curatedMatch = curatedDestinations.find(c => 
              c.name.toLowerCase().includes(lowerD) || lowerD.includes(c.name.toLowerCase())
            );
            if (curatedMatch) {
              if (!newPlaceIds.includes(curatedMatch.id)) {
                newPlaces.push({
                  id: curatedMatch.id,
                  name: curatedMatch.name,
                  lat: curatedMatch.lat,
                  lng: curatedMatch.lng,
                  city: curatedMatch.name,
                  state: curatedMatch.state,
                  country: "India",
                  category: curatedMatch.category
                });
                newPlaceIds.push(curatedMatch.id);
              }
            } else {
              const placeMatch = dbPlaces.find(p => 
                p.name.toLowerCase().includes(lowerD) || lowerD.includes(p.name.toLowerCase())
              );
              if (placeMatch) {
                if (!newPlaceIds.includes(placeMatch.id)) {
                  newPlaces.push({
                    id: placeMatch.id,
                    name: placeMatch.name,
                    lat: placeMatch.lat,
                    lng: placeMatch.lng,
                    city: placeMatch.name,
                    state: placeMatch.stateName,
                    country: "India",
                    category: placeMatch.category
                  });
                  newPlaceIds.push(placeMatch.id);
                }
              }
            }
          }
        });

        if (newPlaces.length === 0) {
          destinations.rajasthan.touristPlaces.slice(0, 3).forEach(p => {
            newPlaces.push({
              id: p.id,
              name: p.name,
              lat: p.lat,
              lng: p.lng,
              city: p.name,
              state: destinations.rajasthan.name,
              country: "India",
              category: p.category
            });
            newPlaceIds.push(p.id);
          });
        }

        setSelectedPlaces(newPlaces);
        setSelectedPlaceIds(newPlaceIds);

        // Instantly trigger plan generation directly with resolved parameters
        await generatePlanDirect(updatedForm, newPlaces);
        alert(`EasyGo AI Copilot Processed!\n- Set trip length to ${days} days.\n- Budget tier set to ${data.budgetTier} (${data.budgetCap ? `Cap: ₹${data.budgetCap}` : "No budget limit"}).\n- Auto-optimizing route and generating itinerary.`);
      } else {
        alert(data.error || "Failed to process prompt.");
      }
    } catch (e) {
      console.error(e);
      alert("Error contacting AI Copilot.");
    } finally {
      setCopilotLoading(false);
    }
  };



  // Standard planning trigger mapping
  const generatePlan = () => {
    generatePlanDirect(formData, selectedPlaces);
  };

  // Saved trips local storage library handlers
  const saveTripToLibrary = (customName = "") => {
    if (!planData) return;
    const name = customName.trim() || `${planData.destination} (${planData.durationDays} Days)`;
    const newTrip = {
      id: `trip-${Date.now()}`,
      name,
      timestamp: new Date().toLocaleString(),
      planData,
      formData,
      selectedPlaces,
      customExpenses,
      visitedActivities
    };
    const updated = [...savedTrips, newTrip];
    setSavedTrips(updated);
    localStorage.setItem("easygo_saved_trips", JSON.stringify(updated));
    alert(`Trip "${name}" saved to your personal library!`);
  };

  const reopenTrip = (trip) => {
    setPlanData(trip.planData);
    setFormData(trip.formData);
    setSelectedPlaces(trip.selectedPlaces);
    setSelectedPlaceIds(trip.selectedPlaces.map(p => p.id));
    setCustomExpenses(trip.customExpenses || []);
    setVisitedActivities(trip.visitedActivities || {});
    setOnboarded(true);
    setActiveTab("dashboard");
    alert(`Reopened saved trip: "${trip.name}"`);
  };

  const duplicateTrip = (trip) => {
    const duplicated = {
      ...trip,
      id: `trip-${Date.now()}`,
      name: `${trip.name} (Copy)`,
      timestamp: new Date().toLocaleString()
    };
    const updated = [...savedTrips, duplicated];
    setSavedTrips(updated);
    localStorage.setItem("easygo_saved_trips", JSON.stringify(updated));
    alert(`Duplicated trip copy created!`);
  };

  const deleteTrip = (tripId) => {
    if (!confirm("Are you sure you want to delete this trip?")) return;
    const updated = savedTrips.filter(t => t.id !== tripId);
    setSavedTrips(updated);
    localStorage.setItem("easygo_saved_trips", JSON.stringify(updated));
    alert("Trip deleted from library.");
  };

  // Curated fallback filter resolvers sorted by nearest distance
  const getCuratedStays = () => {
    const activeCurated = getActiveCuratedPlace();
    const relevantHotels = [];

    if (activeCurated && activeCurated.hotels) {
      activeCurated.hotels.forEach(h => {
        relevantHotels.push({
          ...h,
          destName: activeCurated.name,
          destState: activeCurated.state,
          lat: activeCurated.lat,
          lng: activeCurated.lng,
          distance: 0
        });
      });
    } else {
      curatedDestinations.forEach(c => {
        if (c.hotels) {
          c.hotels.forEach(h => {
            relevantHotels.push({
              ...h,
              destName: c.name,
              destState: c.state,
              lat: c.lat,
              lng: c.lng
            });
          });
        }
      });
    }

    const hotelsWithDist = relevantHotels.map(h => {
      let minDist = 0;
      if (!activeCurated && selectedPlaces.length > 0) {
        minDist = selectedPlaces.reduce((best, p) => {
          const dist = getDistanceBetween(h.lat, h.lng, p.lat, p.lng);
          return dist < best ? dist : best;
        }, Infinity);
      }
      return { ...h, distance: minDist };
    });

    let sorted = hotelsWithDist.sort((a, b) => a.distance - b.distance);

    if (staysFilter !== "All") {
      if (["Budget", "Standard", "Luxury"].includes(staysFilter)) {
        sorted = sorted.filter(h => h.budgetTier === staysFilter);
      } else {
        sorted = sorted.filter(h => h.features?.includes(staysFilter));
      }
    }
    return sorted;
  };

  const getCuratedDining = () => {
    const activeCurated = getActiveCuratedPlace();
    const relevantDining = [];

    if (activeCurated && activeCurated.restaurants) {
      activeCurated.restaurants.forEach(r => {
        relevantDining.push({
          ...r,
          destName: activeCurated.name,
          destState: activeCurated.state,
          lat: activeCurated.lat,
          lng: activeCurated.lng,
          distance: 0
        });
      });
    } else {
      curatedDestinations.forEach(c => {
        if (c.restaurants) {
          c.restaurants.forEach(r => {
            relevantDining.push({
              ...r,
              destName: c.name,
              destState: c.state,
              lat: c.lat,
              lng: c.lng
            });
          });
        }
      });
    }

    const diningWithDist = relevantDining.map(r => {
      let minDist = 0;
      if (!activeCurated && selectedPlaces.length > 0) {
        minDist = selectedPlaces.reduce((best, p) => {
          const dist = getDistanceBetween(r.lat, r.lng, p.lat, p.lng);
          return dist < best ? dist : best;
        }, Infinity);
      }
      return { ...r, distance: minDist };
    });

    let sorted = diningWithDist.sort((a, b) => a.distance - b.distance);

    if (diningFilter !== "All") {
      if (diningFilter === "Cafes") sorted = sorted.filter(r => r.tags?.includes("Cafe"));
      else if (diningFilter === "Vegetarian") sorted = sorted.filter(r => r.tags?.includes("Vegetarian"));
      else if (diningFilter === "Top-rated") sorted = sorted.filter(r => r.rating >= 4.5);
      else if (diningFilter === "Local Spot") sorted = sorted.filter(r => r.tags?.includes("Local Food") || r.tags?.includes("Street Food"));
    }
    return sorted;
  };
  // Nearby Recommendation Engine (Strict Nearest-to-Far Sorting)
  const getRecommendations = () => {
    if (!selectedPlaces.length) return [];
    const dbPlaces = [
      ...curatedDestinations,
      ...Object.keys(destinations).flatMap(sKey => 
        destinations[sKey].touristPlaces.map(p => ({
          ...p,
          stateKey: sKey,
          stateName: destinations[sKey].name
        }))
      )
    ];
    const unselected = dbPlaces.filter(p => !selectedPlaceIds.includes(p.id));
    const recs = unselected.map(p => {
      let minDist = Infinity;
      selectedPlaces.forEach(sel => {
        const dist = getDistanceBetween(p.lat, p.lng, sel.lat, sel.lng);
        if (dist < minDist) minDist = dist;
      });
      return { ...p, distance: minDist };
    });
    // Sort strictly nearest to far within 400km range
    return recs.filter(r => r.distance < 400).sort((a, b) => a.distance - b.distance).slice(0, 6);
  };

  // Dynamic AI Advisor Hinglish Plan Recommendation Summary
  const getPlannerSummaryRecommendation = () => {
    if (!planData || !selectedPlaces.length) return null;

    const firstPlace = selectedPlaces[0];
    const stateKey = firstPlace.stateKey || formData.destination || "ladakh";
    const stateData = destinations[stateKey] || destinations.ladakh;

    const routeSequence = selectedPlaces.map(p => p.name).join(" ➔ ");
    const hotels = getCuratedStays();
    const restaurants = getCuratedDining();
    
    const bestHotel = hotels[0];
    const bestRestaurant = restaurants[0];
    const signatureDish = firstPlace.foodRecommendation?.dish || stateData.touristPlaces?.[0]?.foodRecommendation?.dish || "local specialities";

    let adviceText = "";
    if (stateKey === "uttarpradesh") {
      adviceText = "Uttar Pradesh ki yatra ke liye, Agra me Taj Mahal ke tickets online pehle se book kar lein. Aur Varanasi me Manikarnika Ghat par shanti banaye rakhein. Khane me Kashi Chat Bhandar ki local chat trail zaroor try karein.";
    } else if (stateKey === "rajasthan") {
      adviceText = "Rajasthan me palaces aur forts ghumne ke liye slip-on shoes pehnein kyunki mandiron aur historical chambers me shoes utarne padte hain. Shrinathji (Nathdwara) temple ke andar mobile aur cameras strictly banned hain, iska dhyan rakhein.";
    } else if (stateKey === "ladakh") {
      adviceText = "Leh Ladakh pahunchte hi pehle 24 ghante rest karein taaki body acclimatize ho sake. Nubra aur Pangong Tso jane ke liye Inner Line Permit (ILP) zaroor nikalwayein.";
    } else {
      adviceText = `Is region me explore karte waqt local customs ka dhyan rakhein. Temperature ke hisab se warm/light layers carry karein aur transport ke liye standard local rates check karein.`;
    }

    return (
      <div className="glass-panel" style={{ padding: "2rem", marginTop: "1.5rem", border: "1px solid rgba(16, 185, 129, 0.35)", background: "rgba(16, 185, 129, 0.04)" }}>
        <h3 style={{ color: "#10b981", fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span>🤖</span> Mere Hisab Se Aapko Aise Karna Chahiye (Copilot Recommendation)
        </h3>
        <div style={{ fontSize: "0.95rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "1rem", lineHeight: "1.6" }}>
          <p>
            Aapki selected destination list (<strong>{routeSequence}</strong>) ke adhar par, maine aapka optimal itinerary taiyar kiya hai.
          </p>
          <div>
            <strong>📍 Optimal Route Advice:</strong>
            <ul style={{ paddingLeft: "1.25rem", marginTop: "0.35rem" }}>
              <li>Sabse pehle <strong>{firstPlace.name}</strong> se shuru karein aur line-wise travel karein taaki backtracking na ho.</li>
              <li>Aapki yatra ke liye recommended mode of transport <strong>{selectedTransportMode === "road" ? "Cab / Taxi" : selectedTransportMode}</strong> hai.</li>
            </ul>
          </div>
          {bestHotel && (
            <div>
              <strong>🏨 Stay Recommendation (Nearest First):</strong>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.35rem" }}>
                <li>Aapke set budget tier (<em>{formData.budgetTier}</em>) ke hisab se, sabse nearest aur best option <strong>{bestHotel.name}</strong> hai (jo ki {bestHotel.destName} ke paas hai {bestHotel.distance > 0 ? `aur lagbhag ${Math.round(bestHotel.distance)} km door hai` : ""}).</li>
              </ul>
            </div>
          )}
          {bestRestaurant && (
            <div>
              <strong>🍽️ Food & Dining Recommendations:</strong>
              <ul style={{ paddingLeft: "1.25rem", marginTop: "0.35rem" }}>
                <li>Khane ke liye sabse pasandida local spot <strong>{bestRestaurant.name}</strong> hai. Yahan ka <strong>{signatureDish}</strong> zaroor try karein!</li>
              </ul>
            </div>
          )}
          <div>
            <strong>💡 Special Local Advisory:</strong>
            <p style={{ marginTop: "0.25rem" }}>{adviceText}</p>
          </div>
        </div>
      </div>
    );
  };

  const getDistanceBetween = (lat1, lng1, lat2, lng2) => {
    if (lat1 === undefined || lng1 === undefined || lat2 === undefined || lng2 === undefined) return 0;
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const handleAddRecommendation = async (rec) => {
    const place = {
      id: rec.id,
      name: rec.name,
      lat: rec.lat,
      lng: rec.lng,
      city: rec.name,
      state: rec.stateName || rec.state || "India",
      country: "India",
      category: rec.category
    };
    const nextPlaces = [...selectedPlaces, place];
    const nextPlaceIds = [...selectedPlaceIds, rec.id];
    setSelectedPlaces(nextPlaces);
    setSelectedPlaceIds(nextPlaceIds);
    await generatePlanDirect(formData, nextPlaces);
    alert(`Added "${rec.name}" to your journey basket! Re-routing and optimizing itinerary...`);
  };

  // Dynamically update transfers allocation on select transport mode
  const updateTransportMode = (mode) => {
    setSelectedTransportMode(mode);
    if (!planData?.budget) return;
    
    let multiplier = 1;
    if (mode === "flight") multiplier = 4;
    else if (mode === "train") multiplier = 1;
    else if (mode === "road") multiplier = 2;
    else if (mode === "self-drive") multiplier = 1.5;
    
    const baseVal = planData.durationDays * (formData.budgetTier === "Budget" ? 200 : formData.budgetTier === "Comfort" ? 600 : 2000);
    const newTransfers = Math.round(baseVal * multiplier);

    setPlanData(prev => {
      const breakdown = prev.budget.breakdown.map(b => {
        if (b.category === "Transfers & Transit") {
          return { ...b, allocated: newTransfers };
        }
        return b;
      });
      const newTotal = breakdown.reduce((sum, b) => sum + b.allocated, 0);
      return {
        ...prev,
        budget: {
          ...prev.budget,
          totalLimit: newTotal,
          breakdown
        }
      };
    });
  };

  // Google Maps active route rendering
  useEffect(() => {
    if (activeTab === "itinerary" && planData?.itinerary) {
      const mapDiv = document.getElementById("google-route-map");
      if (mapDiv) {
        // Find active day's activities
        const dayData = planData.itinerary.find(d => d.dayNumber === activeItineraryDay);
        const activities = dayData ? dayData.activities : [];
        const coords = activities
          .filter(act => act.lat !== undefined && act.lng !== undefined)
          .map(act => ({
            id: act.id,
            name: act.name,
            lat: parseFloat(act.lat),
            lng: parseFloat(act.lng)
          }));

        // Determine map center
        let center = { lat: 20.5937, lng: 78.9629 }; // India default
        if (selectedActivityId) {
          const selAct = activities.find(act => act.id === selectedActivityId);
          if (selAct && selAct.lat !== undefined && selAct.lng !== undefined) {
            center = { lat: parseFloat(selAct.lat), lng: parseFloat(selAct.lng) };
          }
        } else if (coords.length > 0) {
          center = { lat: coords[0].lat, lng: coords[0].lng };
        }

        if (googleMapsKey && googleMapsKey.trim() !== "" && window.google?.maps) {
          try {
            const map = new window.google.maps.Map(mapDiv, {
              center: center,
              zoom: selectedActivityId ? 15 : 12,
              styles: [
                { elementType: "geometry", stylers: [{ color: "#1e293b" }] },
                { elementType: "labels.text.stroke", stylers: [{ color: "#1e293b" }] },
                { elementType: "labels.text.fill", stylers: [{ color: "#94a3b8" }] },
                { featureType: "water", elementType: "geometry", stylers: [{ color: "#0f172a" }] },
                { featureType: "road", elementType: "geometry", stylers: [{ color: "#334155" }] },
                { featureType: "road", elementType: "labels.text.fill", stylers: [{ color: "#64748b" }] }
              ]
            });

            const bounds = new window.google.maps.LatLngBounds();
            const pathCoordinates = [];

            coords.forEach((coord, idx) => {
              const position = { lat: coord.lat, lng: coord.lng };
              pathCoordinates.push(position);
              bounds.extend(position);

              const marker = new window.google.maps.Marker({
                position: position,
                map: map,
                label: {
                  text: (idx + 1).toString(),
                  color: "white",
                  fontWeight: "bold"
                },
                title: coord.name
              });

              const infowindow = new window.google.maps.InfoWindow({
                content: `<div style="color: #0f172a; padding: 5px; font-family: sans-serif;">
                  <strong style="display:block;margin-bottom:2px;">${coord.name}</strong>
                  <span style="font-size:0.8rem;color:#64748b;">Stop ${idx + 1}</span>
                </div>`
              });

              marker.addListener("click", () => {
                infowindow.open(map, marker);
                setSelectedActivityId(coord.id);
              });
            });

            if (pathCoordinates.length > 1) {
              const routePath = new window.google.maps.Polyline({
                path: pathCoordinates,
                geodesic: true,
                strokeColor: "#06b6d4",
                strokeOpacity: 1.0,
                strokeWeight: 4
              });
              routePath.setMap(map);
            }

            if (coords.length > 1 && !selectedActivityId) {
              map.fitBounds(bounds);
            }
          } catch (e) {
            console.error("Error creating Google Map:", e);
          }
        }
      }
    }
  }, [activeTab, googleMapsKey, planData, activeItineraryDay, selectedActivityId]);



  const interestOptions = ["Food", "Nature", "History", "Adventure", "Nightlife", "Relaxing"];

  // Open first modal: State Sights profile
  const openStateProfile = (key) => {
    setSelectedStateKey(key);
    setStateDetailOpen(true);
  };

  // Switch to modal two: Personalization form
  const proceedToPlanning = () => {
    if (selectedPlaceIds.length === 0) {
      alert("Please check at least 1 tourist attraction to plan your journey!");
      return;
    }
    setStateDetailOpen(false);
    
    // Resolve first place's state as the primary state for the wizard defaults
    const allPlaces = Object.keys(destinations).flatMap(sKey => 
      destinations[sKey].touristPlaces.map(p => ({ ...p, stateKey: sKey }))
    );
    const firstPlace = allPlaces.find(p => selectedPlaceIds.includes(p.id));
    const startState = firstPlace ? firstPlace.stateKey : selectedStateKey;

    setFormData(prev => ({ ...prev, destination: startState }));
    setModalOpen(true);
  };





  const handleInterestToggle = (interest) => {
    setFormData(prev => {
      const newInterests = prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest];
      return { ...prev, interests: newInterests };
    });
  };

  const handleAddActivity = (e) => {
    e.preventDefault();
    if (!newActivity.name.trim()) return;

    const formatted = {
      id: `custom-act-${Date.now()}`,
      name: newActivity.name,
      slot: newActivity.slot,
      time: newActivity.time,
      description: newActivity.description || "Self-planned activity.",
      zone: newActivity.zone || "Local Spot",
      cost: parseFloat(newActivity.cost) || 0,
      duration: "2 hours",
      transport: newActivity.transport,
      isOutdoor: true,
      rainAlternative: { name: newActivity.name, description: "Indoor alternative not set." },
      foodRecommendation: { name: "Nearby Diner", dish: "Local snacks" },
      travelTimeNext: "Transit to next stop"
    };

    const updatedItinerary = planData.itinerary.map(day => {
      if (day.dayNumber === activeItineraryDay) {
        return {
          ...day,
          activities: [...day.activities, formatted]
        };
      }
      return day;
    });

    setPlanData({ ...planData, itinerary: updatedItinerary });

    if (formatted.cost > 0) {
      setCustomExpenses(prev => [
        ...prev,
        {
          id: `exp-${formatted.id}`,
          title: `Added Activity: ${formatted.name}`,
          amount: formatted.cost,
          category: "Activities",
          date: `Day ${activeItineraryDay}`
        }
      ]);
    }

    setNewActivity({
      name: "",
      slot: "Morning",
      time: "09:00 AM",
      description: "",
      zone: "Local Spot",
      cost: "200",
      transport: "Walking"
    });
  };

  const handleAddExpense = (e) => {
    e.preventDefault();
    if (!newExpense.title.trim() || !newExpense.amount) return;

    const entry = {
      id: `exp-${Date.now()}`,
      title: newExpense.title,
      amount: parseFloat(newExpense.amount),
      category: newExpense.category,
      date: "Logged Item"
    };

    setCustomExpenses(prev => [...prev, entry]);
    setNewExpense({ title: "", amount: "", category: "Food & Dining" });
  };

  const handleDeleteExpense = (id) => {
    setCustomExpenses(prev => prev.filter(e => e.id !== id));
  };

  const togglePackingItem = (idx) => {
    setPackingList(prev => prev.map((item, i) => i === idx ? { ...item, packed: !item.packed } : item));
  };

  const toggleVisitedActivity = (actId) => {
    setVisitedActivities(prev => ({ ...prev, [actId]: !prev[actId] }));
  };

  const triggerAlertAction = (alertId, successMessage) => {
    setAlertActions(prev => ({ ...prev, [alertId]: successMessage }));
    if (alertId === "alert-weather") {
      setRainMode(true);
    }
  };

  const handleResetTrip = () => {
    setOnboarded(false);
    setPlanData(null);
    setActiveTab("landing");
    setRainMode(false);
    setPackingList([]);
    setCustomExpenses([]);
  };

  const prevSlide = () => {
    setCurrentSlide(prev => (prev - 1 + carouselSlides.length) % carouselSlides.length);
  };
  const nextSlide = () => {
    setCurrentSlide(prev => (prev + 1) % carouselSlides.length);
  };

  // Attraction category filter items in modal
  const categoryFilters = ["All", "Heritage", "Nature", "Adventure", "Spiritual", "Wildlife", "Hidden Gem"];

  // Filtered tourist places inside State Profile Modal
  const filteredPlaces = activeStateData.touristPlaces?.filter(place => 
    attractionFilter === "All" || place.category === attractionFilter
  ) || [];

  // Flat list of all attractions across all states
  const allAttractions = Object.keys(destinations).flatMap(stateKey => 
    destinations[stateKey].touristPlaces.map(p => ({
      ...p,
      stateKey,
      stateName: destinations[stateKey].name
    }))
  );

  // Filtered global attractions for the Unified Explorer
  const filteredGlobalAttractions = allAttractions.filter(place => {
    const matchesSearch = 
      place.name.toLowerCase().includes(globalSearch.toLowerCase()) ||
      place.description.toLowerCase().includes(globalSearch.toLowerCase()) ||
      place.stateName.toLowerCase().includes(globalSearch.toLowerCase());
      
    const matchesCategory = 
      globalCategoryFilter === "All" || place.category === globalCategoryFilter;
      
    const matchesState = 
      globalStateFilter === "All" || place.stateKey === globalStateFilter;
      
    return matchesSearch && matchesCategory && matchesState;
  });

  // Calculations
  const totalSpent = customExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  const budgetLimit = planData?.budget?.totalLimit || 0;
  const remainingBudget = budgetLimit - totalSpent;
  const spentPercentage = Math.min(100, Math.round((totalSpent / (budgetLimit || 1)) * 100));

  const packedCount = packingList.filter(item => item.packed).length;
  const packingTotal = packingList.length;
  const packedPercentage = Math.round((packedCount / (packingTotal || 1)) * 100);

  const totalActivitiesCount = planData?.itinerary?.reduce((acc, d) => acc + d.activities.length, 0) || 0;
  const completedActivitiesCount = Object.values(visitedActivities).filter(Boolean).length;
  const completionPercentage = Math.round((completedActivitiesCount / (totalActivitiesCount || 1)) * 100);

  const shareTrip = () => {
    if (!planData) return;
    const tripData = {
      startDate: formData.startDate,
      endDate: formData.endDate,
      tripType: formData.tripType,
      budgetTier: formData.budgetTier,
      interests: formData.interests,
      dietary: formData.dietary,
      specialRequirements: formData.specialRequirements,
      selectedPlaces: selectedPlaces,
      budgetCap: formData.budgetCap
    };
    try {
      const hash = btoa(unescape(encodeURIComponent(JSON.stringify(tripData))));
      const shareUrl = `${window.location.origin}/trip/${hash}`;
      navigator.clipboard.writeText(shareUrl);
      alert("Journey share link copied to clipboard! Anyone can open this link to see your optimized itinerary.");
    } catch (err) {
      console.error(err);
      alert("Failed to generate share link.");
    }
  };

  const exportBudgetCSV = () => {
    if (!planData?.budget) return;
    let csv = "Category,Allocated Cost (INR),Percentage,Description\n";
    planData.budget.breakdown.forEach(b => {
      csv += `"${b.category}",${b.allocated},${b.percentage}%,"${b.desc}"\n`;
    });
    csv += `\n"Total suggested budget",${planData.budget.totalLimit},100%,"Estimated overall trip expense"\n`;
    
    if (customExpenses && customExpenses.length > 0) {
      csv += "\n\nActual Recorded Expenses:\n";
      csv += "Title,Amount (INR),Category,Date\n";
      customExpenses.forEach(exp => {
        csv += `"${exp.title}",${exp.amount},"${exp.category}","${exp.date}"\n`;
      });
    }

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EasyGo_Budget_${planData.destination.replace(/[^a-zA-Z0-9]/g, "_")}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportItineraryMD = () => {
    if (!planData?.itinerary) return;
    let md = `# Travel Itinerary: ${planData.destination} (${planData.durationDays} Days)\n\n`;
    md += `**Travel Style / Budget Level:** ${formData.budgetTier}\n`;
    md += `**Traveler Type:** ${formData.tripType}\n`;
    md += `**Special Requests:** ${formData.specialRequirements || "None"}\n`;
    md += `**Safety Score:** ${planData.safetyScore}/100\n`;
    md += `**Emergency Contacts:** Police: ${planData.emergencyContacts.police}, Ambulance: ${planData.emergencyContacts.ambulance}\n\n`;
    md += `## Day-by-Day Plan\n\n`;
    
    planData.itinerary.forEach(day => {
      md += `### Day ${day.dayNumber}: ${day.title} (Zone: ${day.zone})\n\n`;
      day.activities.forEach(act => {
        md += `#### ${act.time} - ${act.name} (${act.slot})\n`;
        md += `- **Duration:** ${act.duration}\n`;
        md += `- **Activity Type:** ${act.category}\n`;
        md += `- **Description:** ${act.description}\n`;
        md += `- **Transit to Next:** ${act.travelTimeNext}\n`;
        md += `- **Recommended Local Transport:** ${act.transport}\n`;
        md += `- **Approx Ticket Entry Cost:** ₹${act.cost}\n`;
        md += `- **Weather Rain Alternative:** ${act.rainAlternative.name}\n`;
        md += `- **Food Recommendation:** Try *${act.foodRecommendation.dish}* at *${act.foodRecommendation.name}*\n\n`;
      });
      md += `***\n\n`;
    });
    
    const blob = new Blob([md], { type: "text/markdown;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EasyGo_Itinerary_${planData.destination.replace(/[^a-zA-Z0-9]/g, "_")}.md`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={onboarded ? "app-container" : ""}>
      
      {/* Sidebar Navigation */}
      {/* Sidebar Navigation */}
      {onboarded && (
        <aside className="sidebar">
          <div className="brand">
            <div className="brand-icon">E</div>
            <div className="brand-text">EasyGo</div>
          </div>
          
          {/* Check if the active planned trip route is unfeasible */}
          {(() => {
            const isUnfeasible = planData && planData.feasibility && !planData.feasibility.feasible;
            return (
              <ul className="nav-menu">
                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "dashboard" ? "active" : ""}`}
                    onClick={() => setActiveTab("dashboard")}
                  >
                    <span className="nav-icon"><SvgIcon type="dashboard" /></span>
                    <span>Dashboard</span>
                  </div>
                </li>
                
                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "itinerary" ? "active" : ""}`}
                    style={{ opacity: isUnfeasible ? 0.5 : 1, cursor: isUnfeasible ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (isUnfeasible) {
                        alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                        return;
                      }
                      setActiveTab("itinerary");
                      setActiveItineraryDay(1);
                      setMapLocation(planData.destination + ", India");
                      setSelectedActivityId(null);
                    }}
                  >
                    <span className="nav-icon"><SvgIcon type="itinerary" /></span>
                    <span>Itinerary</span>
                  </div>
                </li>
                
                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "budget" ? "active" : ""}`}
                    style={{ opacity: isUnfeasible ? 0.5 : 1, cursor: isUnfeasible ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (isUnfeasible) {
                        alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                        return;
                      }
                      setActiveTab("budget");
                    }}
                  >
                    <span className="nav-icon"><SvgIcon type="budget" /></span>
                    <span>Budget Tracker</span>
                  </div>
                </li>
                
                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "packing" ? "active" : ""}`}
                    style={{ opacity: isUnfeasible ? 0.5 : 1, cursor: isUnfeasible ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (isUnfeasible) {
                        alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                        return;
                      }
                      setActiveTab("packing");
                    }}
                  >
                    <span className="nav-icon"><SvgIcon type="packing" /></span>
                    <span>Pack & Weather</span>
                  </div>
                </li>

                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "safety" ? "active" : ""}`}
                    style={{ opacity: isUnfeasible ? 0.5 : 1, cursor: isUnfeasible ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (isUnfeasible) {
                        alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                        return;
                      }
                      setActiveTab("safety");
                    }}
                  >
                    <span className="nav-icon"><SvgIcon type="safety" /></span>
                    <span>Safety & Guide</span>
                  </div>
                </li>

                <li className="nav-item">
                  <div 
                    className={`nav-link ${activeTab === "live" ? "active" : ""}`}
                    style={{ opacity: isUnfeasible ? 0.5 : 1, cursor: isUnfeasible ? "not-allowed" : "pointer" }}
                    onClick={() => {
                      if (isUnfeasible) {
                        alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                        return;
                      }
                      setActiveTab("live");
                    }}
                  >
                    <span className="nav-icon"><SvgIcon type="live" /></span>
                    <span>During Trip Hub</span>
                    {alerts.length > 0 && !alertActions["alert-flight"] && (
                      <span className="badge-pill" style={{backgroundColor: "#ef4444", color: "white", padding: "0.1rem 0.35rem", fontSize: "0.7rem", marginLeft: "auto"}}>
                        {alerts.length}
                      </span>
                    )}
                  </div>
                </li>

                <li className="nav-item">
                  <div 
                    className="nav-link"
                    style={{cursor: "pointer"}}
                    onClick={() => setSettingsOpen(true)}
                  >
                    <span className="nav-icon" style={{fontSize: "1.1rem"}}>⚙️</span>
                    <span>API Setup</span>
                  </div>
                </li>
              </ul>
            );
          })()}
          <ul className="nav-menu" style={{ marginTop: 0 }}>
            <li className="nav-item">
              <Link href="/admin" className="nav-link" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span className="nav-icon" style={{fontSize: "1.1rem"}}>🛠️</span>
                <span>Admin CMS</span>
              </Link>
            </li>
          </ul>

          <div className="sidebar-footer">
            <button className="btn btn-secondary btn-sm" style={{width: "100%"}} onClick={handleResetTrip}>
              Plan New Trip
            </button>
          </div>
        </aside>
      )}

      {/* Main Panel Content */}
      <main className={onboarded ? "main-content" : "main-content-centered"}>
        
        {/* ============================================================== */}
        {/* LANDING SCREEN (SLIDER & 12 STATES GALLERY) */}
        {/* ============================================================== */}
        {!onboarded && activeTab === "landing" && (
          <div>
            
            {/* Landing Top Header with settings */}
            <div style={{
              display: "flex", 
              justifyContent: "space-between", 
              alignItems: "center", 
              padding: "1.25rem 2rem", 
              background: "rgba(15,19,26,0.5)", 
              backdropFilter: "blur(12px)", 
              border: "1px solid var(--card-border)",
              borderRadius: "12px",
              marginBottom: "1.5rem",
              marginTop: "0.5rem"
            }}>
                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                <div className="brand-icon" style={{width: "32px", height: "32px", fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, var(--secondary) 0%, var(--primary) 100%)", borderRadius: "50%", color: "white", fontWeight: "bold"}}>E</div>
                <h1 style={{fontSize: "1.25rem", fontWeight: "700", color: "white", margin: 0, letterSpacing: "0.05em"}}>EasyGo</h1>
              </div>
              <button 
                className="btn btn-secondary btn-sm" 
                onClick={() => setSettingsOpen(true)}
                style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", cursor: "pointer", fontSize: "0.85rem", marginRight: "0.5rem"}}
              >
                ⚙️ API Settings
              </button>
              <button
                className="btn btn-secondary btn-sm"
                onClick={scrollToContact}
                style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", cursor: "pointer", fontSize: "0.85rem", marginRight: "0.5rem"}}
              >
                Contact Us
              </button>
              <a
                className="btn btn-primary btn-sm"
                href="https://digitalheroesco.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{display: "inline-flex", alignItems: "center", gap: "0.5rem", padding: "0.5rem 0.9rem", cursor: "pointer", fontSize: "0.85rem"}}
              >
                Built for Digital Heroes
              </a>
            </div>
            
            {/* Sliding Hero Carousel */}
            <div className="hero-carousel">
              {carouselSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`carousel-slide ${index === currentSlide ? "active" : ""}`}
                  style={{ backgroundImage: `url("${slide.image}")` }}
                >
                  <div className="carousel-overlay">
                    <h2 className="carousel-title">{slide.title}</h2>
                    <p className="carousel-caption">{slide.caption}</p>
                  </div>
                </div>
              ))}
              
              <button className="carousel-btn carousel-btn-left" onClick={prevSlide} aria-label="Prev Slide">
                <SvgIcon type="chevron-left" />
              </button>

              <div className="carousel-indicators">
                {carouselSlides.map((_, index) => (
                  <div 
                    key={index} 
                    className={`carousel-dot ${index === currentSlide ? "active" : ""}`}
                    onClick={() => setCurrentSlide(index)}
                  ></div>
                ))}
              </div>
            </div>

            {/* AI Trip Copilot Console Widget */}
            <div className="journey-section" style={{ paddingBottom: "1.5rem", marginTop: "2rem" }}>
              <div className="glass-panel advisor-card" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
                <div style={{ display: "flex", gap: "1rem", alignItems: "center", marginBottom: "1rem" }}>
                  <span style={{ fontSize: "2rem" }}>🤖</span>
                  <div>
                    <h3 style={{ color: "white", fontSize: "1.25rem", margin: 0 }}>EasyGo Travel Copilot</h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>Describe your dream trip in natural language and we&apos;ll auto-configure your itinerary and basket!</p>
                  </div>
                </div>

                {!authenticated && (
                  <div style={{ marginBottom: "1rem", padding: "1rem", borderRadius: "14px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}>
                    <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      Please login first to use EasyGo search and exploration features.
                    </p>
                    <button className="btn btn-primary btn-sm" style={{ marginTop: "0.75rem" }} onClick={() => openAuthPrompt("login")}>
                      Login / Register
                    </button>
                  </div>
                )}

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  <textarea
                    placeholder='e.g., "Plan a 5-day spiritual trip to Ayodhya and Vrindavan under ₹20,000" or "Suggest a family trip to Kerala for 7 days with nature interests"'
                    value={copilotQuery}
                    onChange={(e) => setCopilotQuery(e.target.value)}
                    rows={2}
                    style={{
                      width: "100%",
                      padding: "1rem",
                      background: "rgba(0, 0, 0, 0.3)",
                      border: "1px solid var(--card-border)",
                      borderRadius: "8px",
                      color: "white",
                      fontSize: "0.95rem",
                      resize: "none"
                    }}
                  />
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                      AI automatically configures stays, travel limits, duration, and attractions.
                    </span>
                    <button
                      onClick={handleCopilotSubmit}
                      disabled={copilotLoading}
                      className="btn btn-primary"
                      style={{ padding: "0.6rem 1.4rem", borderRadius: "6px", border: "none", cursor: "pointer", fontWeight: "bold" }}
                    >
                      {copilotLoading ? "Processing request..." : "Process AI Request"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Saved Trips Library Section */}
            {savedTrips.length > 0 && (
              <div className="journey-section" style={{ paddingBottom: "1.5rem" }}>
                <div className="glass-panel" style={{ maxWidth: "800px", margin: "0 auto", padding: "2rem" }}>
                  <h3 style={{ color: "white", fontSize: "1.25rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>📂</span> Your Saved Journeys Library ({savedTrips.length})
                  </h3>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                    {savedTrips.map(trip => (
                      <div 
                        key={trip.id} 
                        style={{ 
                          padding: "1.5rem 1.25rem", 
                          background: "rgba(255,255,255,0.01)", 
                          border: "1px solid var(--card-border)", 
                          borderRadius: "8px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "space-between",
                          transition: "0.3s"
                        }}
                      >
                        <div>
                          <strong style={{ color: "white", fontSize: "0.95rem", display: "block" }}>{trip.name}</strong>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", display: "block", marginTop: "0.25rem" }}>
                            🕒 Saved: {trip.timestamp}
                          </span>
                          <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", display: "block", marginTop: "0.5rem" }}>
                            {trip.planData?.destination} • {trip.planData?.durationDays} Days
                          </span>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
                          <button 
                            className="btn btn-primary btn-sm" 
                            style={{ flex: 1, padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
                            onClick={() => reopenTrip(trip)}
                          >
                            Open
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem" }}
                            onClick={() => duplicateTrip(trip)}
                            title="Duplicate"
                          >
                            👥
                          </button>
                          <button 
                            className="btn btn-secondary btn-sm" 
                            style={{ padding: "0.35rem 0.5rem", fontSize: "0.75rem", color: "#ef4444" }}
                            onClick={() => deleteTrip(trip.id)}
                            title="Delete"
                          >
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Destination-First Autocomplete Search Section */}
            <div className="journey-section" style={{ paddingBottom: "0rem" }}>
              <div className="journey-title-block" style={{ marginBottom: "1.5rem" }}>
                <span className="dest-card-tag" style={{ background: "rgba(6, 182, 212, 0.1)", color: "var(--secondary)", border: "1px solid rgba(6, 182, 212, 0.2)", display: "inline-block" }}>
                  Destination Search
                </span>
                <h2>Search ANY Destination in India</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem" }}>
                  Type a city, town, or tourist spot (e.g. Ayodhya, Shillong, Kashi, Tawang, Hampi, Vrindavan, Nathdwara) to add it to your travel basket.
                </p>
                {!authenticated && (
                  <div style={{ marginTop: "1rem", padding: "1rem", borderRadius: "14px", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                    <p style={{ margin: 0, color: "var(--text-secondary)", fontSize: "0.95rem" }}>
                      Login or sign up first to explore destinations. Tap any state card or the search box and authentication will appear.
                    </p>
                  </div>
                )}
              </div>

              {/* Autocomplete Search input */}
              <div className="autocomplete-container" style={{ maxWidth: "600px", margin: "0 auto 2rem auto" }}>
                <div className="search-input-wrapper">
                  <span className="search-icon-decor">🔍</span>
                  <input
                    type="text"
                    className="search-input-field"
                    placeholder="Search city, town, or tourist spot in India..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>

                {/* Suggestions dropdown list */}
                {suggestions.length > 0 && (
                  <div className="suggestions-dropdown">
                    {suggestions.map((sug) => (
                      <div
                        key={sug.id}
                        className="suggestion-item"
                        onClick={() => selectSuggestion(sug)}
                      >
                        <span className="suggestion-name">{sug.name}</span>
                        <span className="suggestion-desc">{sug.description}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Selection Basket display queue */}
              {selectedPlaces.length > 0 && (
                <div className="glass-panel" style={{ padding: "1.5rem", maxWidth: "800px", margin: "0 auto 2rem auto", border: "1px solid rgba(6, 182, 212, 0.25)", background: "rgba(15, 23, 42, 0.35)" }}>
                  <h4 style={{ color: "white", marginBottom: "1rem", fontSize: "0.95rem", textTransform: "uppercase", letterSpacing: "0.05em", display: "flex", justifyContent: "space-between" }}>
                    <span>🧳 Your Custom Journey Basket ({selectedPlaces.length})</span>
                    <span style={{ color: "var(--secondary)", fontSize: "0.8rem", textTransform: "none" }}>Optimized travel sequence</span>
                  </h4>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", alignItems: "center" }}>
                    {selectedPlaces.map((place, idx) => (
                      <React.Fragment key={place.id}>
                        {idx > 0 && <span style={{ color: "var(--text-muted)", fontWeight: "bold" }}>→</span>}
                        <div style={{
                          background: "rgba(6, 182, 212, 0.08)",
                          border: "1px solid rgba(6, 182, 212, 0.3)",
                          borderRadius: "20px",
                          padding: "0.4rem 0.85rem",
                          display: "flex",
                          alignItems: "center",
                          gap: "0.5rem",
                          color: "white",
                          fontSize: "0.9rem"
                        }}>
                          <span style={{ color: "var(--secondary)", fontWeight: "bold" }}>{idx + 1}.</span>
                          <span>{place.name}</span>
                          <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>({place.state})</span>
                          <button
                            onClick={() => removePlaceFromBasket(place.id)}
                            style={{
                              background: "none",
                              border: "none",
                              color: "var(--text-muted)",
                              cursor: "pointer",
                              fontSize: "1.1rem",
                              lineHeight: "1",
                              padding: "0 0 0 0.25rem",
                              display: "flex",
                              alignItems: "center"
                            }}
                          >
                            ×
                          </button>
                        </div>
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Plan Your Journey Section */}
            <div className="journey-section">
              <div className="journey-title-block">
                <h2>Explore & Plan Your Journey</h2>
                <p style={{color: "var(--text-secondary)", fontSize: "1.05rem"}}>
                  Select a state, discover attractions, select your favorite destinations, and let the AI compile a route-optimized itinerary.
                </p>
              </div>

              <div className="dest-grid">
                {destinationsList.map((dest) => (
                  <div 
                      key={dest.key} 
                      className="dest-card"
                      onClick={() => openStateProfile(dest.key)}
                    >
                      <div className="dest-card-bg" style={{ backgroundImage: `url("${dest.image}")` }}></div>
                    <div className="dest-card-overlay"></div>
                    <div className="dest-card-content">
                      <span className="dest-card-tag">{dest.tag}</span>
                      <h3 className="dest-card-title">{dest.name}</h3>
                      <p className="dest-card-desc">{dest.desc}</p>
                      
                      <button className="btn btn-primary btn-sm" style={{marginTop: "0.5rem", width: "100%"}} onClick={() => handleProtectedExplore(dest.key)}>
                        Explore Attractions
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unified Destination Explorer Section (Destination-Centric) */}
            <div className="destination-explorer-section">
              <div className="journey-title-block" style={{marginBottom: "2rem"}}>
                <span className="dest-card-tag" style={{background: "rgba(6, 182, 212, 0.1)", color: "var(--secondary)", border: "1px solid rgba(6, 182, 212, 0.2)"}}>
                  Cross-Region Sights
                </span>
                <h2>Destination-Centric Route Builder</h2>
                <p style={{color: "var(--text-secondary)", fontSize: "1.05rem"}}>
                  Search and select attractions across different states. We will sort them geographically to compile a single integrated itinerary.
                </p>
              </div>

              {/* Search and Filters Controls */}
              {!authenticated && (
                <div style={{ padding: "1rem", marginBottom: "1rem", borderRadius: "14px", background: "rgba(15, 23, 42, 0.9)", border: "1px solid rgba(255,255,255,0.08)", color: "white" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem", flexWrap: "wrap" }}>
                    <div>
                      <strong style={{ fontSize: "1rem" }}>Authentication Required</strong>
                      <p style={{ margin: "0.5rem 0 0", color: "var(--text-secondary)", fontSize: "0.9rem" }}>
                        Sign in or create an account before searching and exploring places.
                      </p>
                    </div>
                    <button className="btn btn-primary btn-sm" onClick={() => openAuthPrompt("login")}>Login / Sign Up</button>
                  </div>
                </div>
              )}
              <div className="search-filter-controls">
                <div className="search-filter-row">
                  {/* Search Bar */}
                  <div className="search-input-wrapper">
                    <span className="search-icon-decor">🔍</span>
                    <input
                      type="text"
                      className="search-input-field"
                      placeholder="Search attractions by name, description, or region..."
                      value={globalSearch}
                      onChange={(e) => setGlobalSearch(e.target.value)}
                    />
                  </div>

                  {/* State Select Filter */}
                  <select
                    className="state-select-field"
                    value={globalStateFilter}
                    onChange={(e) => setGlobalStateFilter(e.target.value)}
                  >
                    <option value="All">All States / Regions</option>
                    {destinationsList.map(d => (
                      <option key={d.key} value={d.key}>{d.name}</option>
                    ))}
                  </select>
                </div>

                {/* Category Filter Tabs */}
                <div className="category-filter-row">
                  {categoryFilters.map(filter => (
                    <button
                      key={filter}
                      className={`day-tab-btn ${globalCategoryFilter === filter ? "active" : ""}`}
                      onClick={() => setGlobalCategoryFilter(filter)}
                      style={{padding: "0.5rem 1rem", fontSize: "0.85rem"}}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {/* Attractions Grid */}
              <div className="attraction-grid">
                {filteredGlobalAttractions.length === 0 ? (
                  <div className="empty-search-state">
                    <p style={{fontSize: "1.1rem"}}>No attractions match your search criteria.</p>
                    <button className="btn btn-secondary btn-sm" style={{marginTop: "1rem"}} onClick={() => { setGlobalSearch(""); setGlobalCategoryFilter("All"); setGlobalStateFilter("All"); }}>
                      Reset Filters
                    </button>
                  </div>
                ) : (
                  filteredGlobalAttractions.map(place => {
                    const isSelected = selectedPlaceIds.includes(place.id);
                    return (
                      <div
                        key={place.id}
                        className={`attraction-card ${isSelected ? "selected" : ""}`}
                        onClick={() => togglePlaceSelection(place.id)}
                      >
                        <div className="attraction-card-top">
                          <div className="attraction-card-header">
                            <span className="attraction-card-state">{place.stateName}</span>
                            <span className="badge-pill badge-purple" style={{fontSize: "0.65rem", padding: "0.1rem 0.4rem"}}>
                              {place.category}
                            </span>
                          </div>
                          <h4 className="attraction-card-title">{place.name}</h4>
                          <p className="attraction-card-desc">{place.description}</p>
                        </div>
                        
                        <div className="attraction-card-footer">
                          <div className="attraction-meta-row">
                            <span>⏱️ {place.recommendedDuration}</span>
                            <span>💵 {place.cost === 0 ? "Free entry" : `₹ ${place.cost}`}</span>
                          </div>
                          
                          <button
                            className={`btn btn-sm ${isSelected ? "btn-primary" : "btn-secondary"}`}
                            onClick={(e) => {
                              e.stopPropagation();
                              togglePlaceSelection(place.id);
                            }}
                            style={{
                              fontSize: "0.8rem",
                              padding: "0.35rem 0.75rem",
                              borderColor: isSelected ? "var(--secondary)" : "var(--card-border)",
                              boxShadow: isSelected ? "0 0 10px rgba(6, 182, 212, 0.25)" : "none"
                            }}
                          >
                            {isSelected ? "✓ Selected" : "+ Add to Journey"}
                          </button>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>

            {/* STEP 1: State Profile Explorer Modal (SIGHTS CHECKLIST & FILTERS) */}
            <div className={`modal-backdrop ${stateDetailOpen ? "open" : ""}`} onClick={() => setStateDetailOpen(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{maxWidth: "840px"}}>
                <button className="modal-close-btn" onClick={() => setStateDetailOpen(false)}>×</button>
                
                {/* Header Image banner */}
                <div style={{
                  height: "200px", 
                  borderRadius: "12px", 
                  backgroundImage: `url("${activeStateData.image}")`, 
                  backgroundSize: "cover", 
                  backgroundPosition: "center",
                  position: "relative",
                  marginBottom: "1.5rem"
                }}>
                  <div style={{
                    position: "absolute",
                    bottom: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    background: "linear-gradient(to top, rgba(15,19,26,0.95) 0%, transparent 80%)",
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "flex-end",
                    padding: "1.5rem"
                  }}>
                    <div>
                      <span className="dest-card-tag" style={{marginBottom: "0.25rem"}}>Select Destinations</span>
                      <h2 style={{fontSize: "2rem", color: "white", textShadow: "0 2px 4px rgba(0,0,0,0.5)"}}>
                        {activeStateData.name} Journey Planner
                      </h2>
                    </div>
                  </div>
                </div>

                {/* Sights category filters inside modal */}
                <div style={{display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "1.5rem"}}>
                  {categoryFilters.map(filter => (
                    <button
                      key={filter}
                      className={`day-tab-btn ${attractionFilter === filter ? "active" : ""}`}
                      onClick={() => setAttractionFilter(filter)}
                      style={{padding: "0.5rem 1rem", fontSize: "0.85rem"}}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Sights Checklist with descriptions */}
                <h3 style={{color: "white", fontSize: "1.2rem", marginBottom: "1rem", display: "flex", justifyContent: "space-between"}}>
                  <span>📍 Check Attractions to Visit:</span>
                  <span style={{fontSize: "0.9rem", color: "var(--secondary)"}}>{selectedPlaceIds.length} Sights Selected</span>
                </h3>
                
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  maxHeight: "300px",
                  overflowY: "auto",
                  paddingRight: "0.5rem",
                  marginBottom: "1.5rem"
                }}>
                  {filteredPlaces.length === 0 ? (
                    <p style={{color: "var(--text-muted)", padding: "1rem 0"}}>No sights in this category.</p>
                  ) : (
                    filteredPlaces.map((place) => {
                      const isChecked = selectedPlaceIds.includes(place.id);
                      
                      return (
                        <div 
                          key={place.id}
                          className={`expense-item ${isChecked ? "selected" : ""}`}
                          onClick={() => togglePlaceSelection(place.id)}
                          style={{
                            cursor: "pointer",
                            border: isChecked ? "1px solid var(--secondary)" : "1px solid var(--card-border)",
                            background: isChecked ? "rgba(6, 182, 212, 0.03)" : "rgba(255,255,255,0.01)"
                          }}
                        >
                          <div style={{display: "flex", gap: "1rem", alignItems: "flex-start"}}>
                            <input 
                              type="checkbox"
                              checked={isChecked}
                              readOnly
                              className="activity-checkbox"
                              style={{marginTop: "0.2rem"}}
                            />
                            <div>
                              <div style={{display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "0.2rem"}}>
                                <h4 style={{color: "white", fontSize: "1rem", margin: 0}}>{place.name}</h4>
                                <span className="badge-pill badge-purple" style={{fontSize: "0.68rem", padding: "0.1rem 0.4rem"}}>
                                  {place.category}
                                </span>
                              </div>
                              <p style={{fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0}}>{place.description}</p>
                              <div style={{fontSize: "0.78rem", color: "var(--text-muted)", marginTop: "0.25rem"}}>
                                ⏱️ Visit: {place.recommendedDuration} | 💵 Entry: {place.cost === 0 ? "Free" : `₹ ${place.cost}`}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>

                {/* State Permits Guide snippet */}
                <div style={{background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", padding: "1rem", borderRadius: "8px", marginBottom: "1rem"}}>
                  <h4 style={{color: "white", fontSize: "0.95rem", marginBottom: "0.25rem"}}>🛡️ Regional Travel Permits & Safety Score</h4>
                  <p style={{fontSize: "0.85rem", color: "var(--text-secondary)", margin: 0}}>
                    {activeStateData.visaGuidance} (State Safety Index: {activeStateData.safetyScore}/100)
                  </p>
                </div>

                {/* Cultural Festivals & Events */}
                {activeStateData.festivals && activeStateData.festivals.length > 0 && (
                  <div style={{background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.15)", padding: "1rem", borderRadius: "8px", marginBottom: "2rem"}}>
                    <h4 style={{color: "white", fontSize: "0.95rem", marginBottom: "0.25rem"}}>🎉 Cultural Festivals & Events</h4>
                    <div style={{display: "flex", flexWrap: "wrap", gap: "0.5rem", marginTop: "0.5rem"}}>
                      {activeStateData.festivals.map(fest => (
                        <span key={fest} className="badge-pill badge-purple" style={{fontSize: "0.78rem", padding: "0.2rem 0.5rem"}}>
                          {fest}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div style={{display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
                  <button className="btn btn-secondary" onClick={() => setStateDetailOpen(false)}>
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={proceedToPlanning}
                    style={{minWidth: "250px"}}
                    disabled={selectedPlaceIds.length === 0}
                  >
                    Plan Journey with Selected Sights ({selectedPlaceIds.length})
                    <SvgIcon type="arrow-right" />
                  </button>
                </div>
              </div>
            </div>

            {/* STEP 2: Personalization Setup Modal */}
            <div className={`modal-backdrop ${modalOpen ? "open" : ""}`} onClick={() => setModalOpen(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close-btn" onClick={() => setModalOpen(false)}>×</button>
                
                <h2 style={{fontSize: "1.6rem", marginBottom: "0.5rem", color: "white"}}>
                  Personalize Your Journey
                </h2>
                <p style={{fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.5rem"}}>
                  Select travel style and budget levels to estimate transport fees.
                </p>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="startDate">Start Date</label>
                    <input 
                      id="startDate" 
                      type="date" 
                      className="form-input"
                      value={formData.startDate}
                      onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="endDate">End Date</label>
                    <input 
                      id="endDate" 
                      type="date" 
                      className="form-input"
                      value={formData.endDate}
                      onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="tripType">Trip Type</label>
                    <select 
                      id="tripType" 
                      className="form-select"
                      value={formData.tripType}
                      onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    >
                      <option value="Solo">Solo Explorer</option>
                      <option value="Couple">Couple&apos;s Journey</option>
                      <option value="Family">Family Vacation</option>
                      <option value="Friends">Friends Trip</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budgetTier">Budget Level</label>
                    <select 
                      id="budgetTier" 
                      className="form-select"
                      value={formData.budgetTier}
                      onChange={(e) => setFormData({ ...formData, budgetTier: e.target.value })}
                    >
                      <option value="Budget">Budget (Value hotels, local rickshaw/bus)</option>
                      <option value="Comfort">Comfort (Boutique homestays, app cabs)</option>
                      <option value="Luxury">Luxury (5-star resorts, private AC chauffeur)</option>
                    </select>
                  </div>
                </div>

                <div className="form-group" style={{marginBottom: "1.25rem"}}>
                  <label>Interests</label>
                  <div className="interests-grid">
                    {interestOptions.map((interest) => (
                      <div 
                        key={interest}
                        className={`interest-tag ${formData.interests.includes(interest) ? "active" : ""}`}
                        onClick={() => handleInterestToggle(interest)}
                      >
                        {interest}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label htmlFor="dietary">Dietary Restrictions</label>
                    <select 
                      id="dietary" 
                      className="form-select"
                      value={formData.dietary}
                      onChange={(e) => setFormData({ ...formData, dietary: e.target.value })}
                    >
                      <option value="None">No Dietary Restrictions</option>
                      <option value="Vegetarian">Vegetarian (No meat/fish)</option>
                      <option value="Vegan">Vegan (Plant based)</option>
                      <option value="Gluten-Free">Gluten-Free</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="specialRequirements">Special Requests / Notes</label>
                    <input 
                      id="specialRequirements"
                      type="text" 
                      className="form-input" 
                      placeholder="e.g. wheelchair access, senior citizen..."
                      value={formData.specialRequirements}
                      onChange={(e) => setFormData({ ...formData, specialRequirements: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group" style={{marginTop: "1.25rem"}}>
                  <label htmlFor="budgetCap">Maximum Budget Cap (INR ₹) - Optional</label>
                  <input
                    id="budgetCap"
                    type="number"
                    className="form-input"
                    placeholder="e.g. 20000"
                    value={formData.budgetCap || ""}
                    onChange={(e) => setFormData({ ...formData, budgetCap: e.target.value ? parseInt(e.target.value, 10) : "" })}
                  />
                  <p style={{fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem"}}>
                    We will analyze costs and auto-suggest optimizations if your plan exceeds this limit.
                  </p>
                </div>

                <div style={{marginTop: "2rem", display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
                  <button className="btn btn-secondary" onClick={() => setModalOpen(false)}>
                    Cancel
                  </button>
                  <button 
                    className="btn btn-primary" 
                    onClick={generatePlan}
                    disabled={loadingPlan}
                    style={{minWidth: "180px"}}
                  >
                    {loadingPlan ? "Compiling..." : "Generate Optimized Route"}
                    {!loadingPlan && <SvgIcon type="arrow-right" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Sticky Journey Basket Bar */}
            {selectedPlaceIds.length > 0 && (
              <div className="journey-basket-bar">
                <div className="basket-bar-container">
                  <div className="basket-info">
                    <div className="basket-badge">{selectedPlaceIds.length}</div>
                    <div className="basket-text">
                      <h4>Your Custom Journey Basket</h4>
                      <p>
                        Selected {selectedPlaceIds.length} attraction{selectedPlaceIds.length > 1 ? "s" : ""} from {
                          Array.from(new Set(allAttractions.filter(p => selectedPlaceIds.includes(p.id)).map(p => p.stateName))).length
                        } region{
                          Array.from(new Set(allAttractions.filter(p => selectedPlaceIds.includes(p.id)).map(p => p.stateName))).length > 1 ? "s" : ""
                        }.
                      </p>
                    </div>
                  </div>
                  <div className="basket-actions">
                    <button className="btn btn-secondary btn-sm" style={{padding: "0.5rem 1rem"}} onClick={() => setSelectedPlaceIds([])}>
                      Clear Basket
                    </button>
                    <button className="btn btn-primary btn-sm btn-pulse" style={{padding: "0.5rem 1.25rem"}} onClick={proceedToPlanning}>
                      Plan Optimized Journey
                      <SvgIcon type="arrow-right" />
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* API Key Configuration Modal */}
            <div className={`modal-backdrop ${settingsOpen ? "open" : ""}`} onClick={() => setSettingsOpen(false)}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{maxWidth: "500px"}}>
                <button className="modal-close-btn" onClick={() => setSettingsOpen(false)}>×</button>
                
                <h2 style={{fontSize: "1.5rem", color: "white", marginBottom: "0.5rem"}}>⚙️ AI & Maps Integration Setup</h2>
                <p style={{fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem"}}>
                  Configure your cloud API credentials to unlock Google Places search and Gemini AI itinerary planning. Credentials are saved locally in your browser.
                </p>

                <div className="form-group" style={{marginBottom: "1.25rem"}}>
                  <label htmlFor="googleKey" style={{display: "flex", justifyContent: "space-between"}}>
                    <span style={{color: "white", fontSize: "0.9rem", fontWeight: "600"}}>Google Maps API Key</span>
                    <a href="https://developers.google.com/maps/gmp-get-started" target="_blank" rel="noopener noreferrer" style={{fontSize: "0.75rem", color: "var(--secondary)"}}>Get Key ↗</a>
                  </label>
                  <input 
                    id="googleKey" 
                    type="password" 
                    className="form-input" 
                    placeholder="AIzaSy..." 
                    value={googleMapsKey} 
                    onChange={(e) => setGoogleMapsKey(e.target.value)}
                  />
                </div>

                <div className="form-group" style={{marginBottom: "1.5rem"}}>
                  <label htmlFor="gemKey" style={{display: "flex", justifyContent: "space-between"}}>
                    <span style={{color: "white", fontSize: "0.9rem", fontWeight: "600"}}>Gemini API Key</span>
                    <a href="https://aistudio.google.com/" target="_blank" rel="noopener noreferrer" style={{fontSize: "0.75rem", color: "var(--secondary)"}}>Get Key ↗</a>
                  </label>
                  <input 
                    id="gemKey" 
                    type="password" 
                    className="form-input" 
                    placeholder="AIzaSy..." 
                    value={geminiKey} 
                    onChange={(e) => setGeminiKey(e.target.value)}
                  />
                </div>

                <div style={{background: "rgba(6,182,212,0.04)", border: "1px solid rgba(6,182,212,0.15)", padding: "1rem", borderRadius: "8px", marginBottom: "1.5rem"}}>
                  <h4 style={{color: "white", fontSize: "0.85rem", margin: "0 0 0.25rem 0"}}>🛡️ Free Fallback Mode Active</h4>
                  <p style={{fontSize: "0.78rem", color: "var(--text-secondary)", margin: 0}}>
                    If left blank, EasyGo automatically operates in keyless demo mode, using **OpenStreetMap Nominatim** for geocoding and a robust **Local Rule-Based Expert System** to build routes.
                  </p>
                </div>

                <div style={{display: "flex", justifyContent: "flex-end", gap: "1rem"}}>
                  <button className="btn btn-secondary" onClick={() => setSettingsOpen(false)}>Cancel</button>
                  <button className="btn btn-primary" onClick={() => {
                    localStorage.setItem("google_maps_key", googleMapsKey);
                    localStorage.setItem("gemini_key", geminiKey);
                    setSettingsOpen(false);
                    alert("Configuration saved! Real-time APIs updated.");
                  }}>Save configuration</button>
                </div>
              </div>
            </div>

            <div className={`modal-backdrop ${authPromptOpen ? "open" : ""}`} onClick={closeAuthPrompt}>
              <div className="modal-box" onClick={(e) => e.stopPropagation()} style={{maxWidth: "440px"}}>
                <button className="modal-close-btn" onClick={closeAuthPrompt}>×</button>
                <div style={{marginBottom: "1rem"}}>
                  <h2 style={{margin: 0, fontSize: "1.7rem", color: "white"}}>{authMode === "login" ? "Welcome Back" : "Create Your EasyGo Account"}</h2>
                  <p style={{color: "var(--text-secondary)", marginTop: "0.75rem", fontSize: "0.95rem"}}>
                    {authMode === "login"
                      ? "Sign in to unlock destination exploration, curated itineraries, and saved trips."
                      : "Register once and save your journeys. Your login persists securely in this browser."}
                  </p>
                </div>
                <div className="form-group" style={{marginBottom: "1rem"}}>
                  <label htmlFor="authEmail" style={{color: "white", fontSize: "0.9rem", fontWeight: 600}}>Email address</label>
                  <input
                    id="authEmail"
                    type="email"
                    className="form-input"
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="you@example.com"
                    autoComplete="username"
                  />
                </div>
                <div className="form-group" style={{marginBottom: "1rem"}}>
                  <label htmlFor="authPassword" style={{color: "white", fontSize: "0.9rem", fontWeight: 600}}>Password</label>
                  <input
                    id="authPassword"
                    type="password"
                    className="form-input"
                    value={authPassword}
                    onChange={(e) => setAuthPassword(e.target.value)}
                    placeholder="Enter password"
                    autoComplete={authMode === "login" ? "current-password" : "new-password"}
                  />
                </div>
                {authError && (
                  <div style={{padding: "0.85rem 1rem", borderRadius: "10px", background: "rgba(255, 69, 96, 0.12)", border: "1px solid rgba(255, 69, 96, 0.22)", color: "#ff7a8f", marginBottom: "1rem"}}>
                    {authError}
                  </div>
                )}
                <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                  <button
                    className="btn btn-primary"
                    onClick={authMode === "login" ? handleLogin : handleRegister}
                    style={{width: "100%"}}
                  >
                    {authMode === "login" ? "Login to EasyGo" : "Register & Continue"}
                  </button>
                  <button
                    className="btn btn-secondary"
                    onClick={() => openAuthPrompt(authMode === "login" ? "register" : "login", pendingExploreState)}
                    style={{width: "100%"}}
                  >
                    {authMode === "login" ? "Create an EasyGo account" : "Already have an account? Login"}
                  </button>
                </div>
              </div>
            </div>

            {/* Contact Section (Landing Footer) */}
            <div id="contact-section" style={{marginTop: "2.5rem", padding: "1.5rem", borderRadius: "12px", background: "rgba(10,12,16,0.6)", border: "1px solid var(--card-border)", textAlign: "center"}}>
              <h3 style={{color: "white", margin: 0}}>Contact Us</h3>
              <p style={{color: "var(--text-secondary)", margin: "0.5rem 0 1rem"}}>We're here to help — send us a message or reach out via phone.</p>
              <div style={{display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap", marginBottom: "0.75rem"}}>
                <div>
                  <strong style={{color: "white", display: "block"}}>Email</strong>
                  <a href="mailto:hello@easygo.com" style={{color: "var(--secondary)", textDecoration: "underline"}}>hello@easygo.com</a>
                </div>
                <div>
                  <strong style={{color: "white", display: "block"}}>Phone</strong>
                  <a href="tel:+911234567890" style={{color: "var(--secondary)", textDecoration: "underline"}}>+91 12345 67890</a>
                </div>
                <div>
                  <strong style={{color: "white", display: "block"}}>Address</strong>
                  <span style={{color: "var(--text-secondary)"}}>Suite 200, EasyGo HQ, Mumbai, India</span>
                </div>
              </div>
              <div style={{display: "flex", justifyContent: "center", gap: "0.75rem"}}>
                <button className="btn btn-secondary btn-sm" onClick={() => { window.location.href = '#'; }}>
                  Send a Message
                </button>
                <a className="btn btn-primary btn-sm" href="https://digitalheroesco.com" target="_blank" rel="noopener noreferrer">Built for Digital Heroes</a>
              </div>
            </div>

          </div>
        )}

        {/* ============================================================== */}
        {/* TRIP DASHBOARD TAB */}
        {/* ============================================================== */}
        {onboarded && activeTab === "dashboard" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <p style={{color: "var(--secondary)", textTransform: "uppercase", fontSize: "0.8rem", letterSpacing: "0.1em", fontWeight: "700"}}>
                  Trip Dashboard
                </p>
                <h1>Explore {planData.destination}, {planData.country}</h1>
                <p>Scheduled {formData.startDate || "soon"} • {planData.durationDays} Days Plan • {formData.tripType} Setup</p>
              </div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", justifyContent: "flex-end" }} className="no-print">
                <button 
                  className="btn btn-secondary btn-sm" 
                  onClick={() => {
                    const customName = prompt("Enter a name for this trip:", `${planData.destination} (${planData.durationDays} Days)`);
                    if (customName !== null) {
                      saveTripToLibrary(customName);
                    }
                  }} 
                  style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem", color: "var(--secondary)" }}
                >
                  💾 Save Trip
                </button>
                <button className="btn btn-secondary btn-sm" onClick={shareTrip} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  🔗 Share Trip
                </button>
                <button className="btn btn-secondary btn-sm" onClick={() => window.print()} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  🖨️ PDF/Print
                </button>
                <button className="btn btn-secondary btn-sm" onClick={exportBudgetCSV} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  📊 CSV Budget
                </button>
                <button className="btn btn-secondary btn-sm" onClick={exportItineraryMD} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  📝 MD Itinerary
                </button>
                <button className="btn btn-primary btn-sm" onClick={() => {
                  if (planData.feasibility && !planData.feasibility.feasible) {
                    alert("Your route is currently not feasible. Please adjust trip duration or deselect destinations first!");
                    return;
                  }
                  setActiveTab("itinerary");
                }} style={{ display: "flex", alignItems: "center", gap: "0.25rem", padding: "0.4rem 0.8rem", cursor: "pointer", fontSize: "0.8rem" }}>
                  Open Itinerary
                  <SvgIcon type="arrow-right" />
                </button>
              </div>
            </header>

            {planData.feasibility && !planData.feasibility.feasible ? (
              /* Dedicated Feasibility Blocking Screen */
              <div className="glass-panel" style={{ padding: "3rem 2rem", border: "1px solid #ef4444", background: "rgba(239, 68, 68, 0.05)", borderRadius: "12px", textAlign: "center", maxWidth: "800px", margin: "2rem auto" }}>
                <span style={{ fontSize: "3.5rem", display: "block", marginBottom: "1rem" }}>⚠️</span>
                <h2 style={{ color: "#ef4444", fontSize: "1.75rem", fontWeight: 800 }}>Trip Route Not Feasible</h2>
                <p style={{ color: "var(--text-secondary)", fontSize: "1.05rem", marginTop: "0.5rem", maxWidth: "600px", marginLeft: "auto", marginRight: "auto" }}>
                  Your current route is too tight. The total required travel and sightseeing hours exceed your available time.
                </p>
                
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", margin: "2rem 0", background: "rgba(0,0,0,0.2)", padding: "1.5rem", borderRadius: "8px", textAlign: "left" }}>
                  <div>
                    <h4 style={{ color: "white", marginBottom: "0.5rem" }}>📊 Trip Duration Audit</h4>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <div>Selected Duration: <strong>{planData.durationDays} Days</strong></div>
                      <div>Total Distance: <strong>{planData.feasibility.totalDistanceKm} km</strong></div>
                      <div>Unsorted Distance: <strong>{planData.feasibility.unsortedDistanceKm} km</strong></div>
                      <div>Transit Driving: <strong>{planData.feasibility.travelHours} hours</strong></div>
                      <div>Attractions Sightseeing: <strong>{planData.feasibility.sightseeingHours} hours</strong></div>
                    </div>
                  </div>
                  <div>
                    <h4 style={{ color: "white", marginBottom: "0.5rem" }}>⚡ Actionable Insights</h4>
                    <div style={{ fontSize: "0.9rem", color: "var(--text-secondary)", display: "flex", flexDirection: "column", gap: "0.35rem" }}>
                      <div>Total Required Time: <strong style={{ color: "#ef4444" }}>{planData.feasibility.totalHours} hours</strong></div>
                      <div>Max Available Time: <strong>{planData.durationDays * 10} hours</strong> (10h/day)</div>
                      <div style={{ marginTop: "0.5rem", color: "var(--secondary)" }}>
                        💡 Recommended Duration: <strong>{planData.feasibility.recommendedDuration} Days</strong>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: "450px", margin: "0 auto" }}>
                  <button 
                    className="btn btn-primary"
                    style={{ padding: "0.75rem", fontWeight: "bold", fontSize: "0.95rem" }}
                    onClick={async () => {
                      const newDays = planData.feasibility.recommendedDuration;
                      const startD = new Date(formData.startDate || new Date());
                      const endD = new Date(startD);
                      endD.setDate(startD.getDate() + (newDays - 1));
                      const updatedEndDate = endD.toISOString().split("T")[0];
                      const updatedForm = { ...formData, endDate: updatedEndDate };
                      setFormData(updatedForm);
                      await generatePlanDirect(updatedForm, selectedPlaces);
                    }}
                  >
                    ⏱️ Auto-Extend Trip to {planData.feasibility.recommendedDuration} Days & Recalculate
                  </button>
                  
                  <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1rem", marginTop: "0.5rem" }}>
                    <h4 style={{ color: "white", fontSize: "0.95rem", marginBottom: "1rem" }}>Deselect Low Priority Attractions to Fit inside {planData.durationDays} Days</h4>
                    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem", maxHeight: "150px", overflowY: "auto", paddingRight: "0.5rem", textAlign: "left", marginBottom: "1rem" }}>
                      {selectedPlaces.map((place) => (
                        <label key={place.id} style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "white", fontSize: "0.85rem", cursor: "pointer" }}>
                          <input 
                            type="checkbox"
                            checked={selectedPlaceIds.includes(place.id)}
                            onChange={() => {
                              setSelectedPlaceIds(prev => {
                                const nextIds = prev.includes(place.id) ? prev.filter(id => id !== place.id) : [...prev, place.id];
                                return nextIds;
                              });
                              setSelectedPlaces(pPrev => {
                                if (selectedPlaceIds.includes(place.id)) {
                                  return pPrev.filter(p => p.id !== place.id);
                                } else {
                                  return [...pPrev, place];
                                }
                              });
                            }}
                          />
                          <span>{place.name} <span style={{ color: "var(--text-muted)", fontSize: "0.75rem" }}>({place.category})</span></span>
                        </label>
                      ))}
                    </div>
                    <button 
                      className="btn btn-secondary"
                      style={{ width: "100%", padding: "0.5rem" }}
                      disabled={selectedPlaceIds.length === 0}
                      onClick={async () => {
                        const nextPlaces = selectedPlaces.filter(p => selectedPlaceIds.includes(p.id));
                        await generatePlanDirect(formData, nextPlaces);
                      }}
                    >
                      Optimize Basket & Recalculate Route
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Regular Dashboard View */
              <>
                <div className="dashboard-grid">
                  
                  {/* Advisor Insights Panel */}
                  <div className="glass-panel advisor-card">
                    <div className="advisor-header">
                      <div className="advisor-avatar">🤖</div>
                      <div>
                        <h3 style={{color: "white", fontSize: "1.1rem"}}>AI Advisor Insights</h3>
                        <p style={{fontSize: "0.8rem"}}>Intelligent Trip Optimizer</p>
                      </div>
                    </div>
                    <div style={{display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.95rem"}}>
                      <div style={{background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", padding: "1rem", borderRadius: "8px"}}>
                        <span style={{fontWeight: 700, color: "var(--secondary)"}}>💡 Route-Aware Sorting Active: </span>
                        {"We've"} ordered your checked attractions using a distance minimization algorithm. This minimizes travel segments, resolving backtracking delays!
                      </div>

                      {formData.dietary !== "None" && (
                        <div style={{background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", padding: "1rem", borderRadius: "8px"}}>
                          <span style={{fontWeight: 700, color: "var(--primary)"}}>🥗 Dietary Alert: </span>
                          We generated your food itinerary matching your {formData.dietary} restriction. A laminated translation card is added to your packing list so local servers understand your needs.
                        </div>
                      )}

                      <div style={{background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", padding: "1rem", borderRadius: "8px"}}>
                        <span style={{fontWeight: 700, color: "#10b981"}}>🌧️ Weather Proofing: </span>
                        Rain plan switch is live. If weather conditions worsen during your trip, toggle &quot;Rain Mode&quot; on the itinerary page to swap outdoor tours with pre-selected museums or classes.
                      </div>
                    </div>
                  </div>

                  {/* Quick Logistics Stats Panel */}
                  <div className="glass-panel" style={{padding: "2rem"}}>
                    <h3 style={{color: "white", fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem"}}>
                      <span>⚙️</span> Logistics & Quick Facts
                    </h3>
                    
                    <div className="stat-row">
                      <span className="stat-label">Currency</span>
                      <span className="stat-value">{planData.currency}</span>
                    </div>
                    
                    <div className="stat-row">
                      <span className="stat-label">Safety Rating</span>
                      <span className="stat-value" style={{color: "#10b981"}}>{planData.safetyScore}/100</span>
                    </div>

                    <div className="stat-row" style={{flexDirection: "column", gap: "0.25rem"}}>
                      <span className="stat-label">Visa / Permits guidance</span>
                      <span className="stat-value" style={{fontSize: "0.85rem", fontWeight: "normal", color: "white", marginTop: "0.25rem"}}>
                        {planData.visaGuidance}
                      </span>
                    </div>

                    <div className="stat-row">
                      <span className="stat-label">Emergency Contacts</span>
                      <span className="stat-value" style={{fontSize: "0.85rem"}}>
                        Police: {planData.emergencyContacts.police} | Ambulance: {planData.emergencyContacts.ambulance}
                      </span>
                    </div>
                  </div>

                  {/* Quality Scorecard */}
                  <div className="glass-panel" style={{ padding: "2rem" }}>
                    <h3 style={{ color: "white", fontSize: "1.2rem", marginBottom: "1.25rem" }}>Smart Route Quality Scorecard</h3>
                    
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", padding: "1rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                      <div>
                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Trip Health Rating</span>
                        <h4 style={{ fontSize: "1.8rem", color: "var(--primary)", fontWeight: 800 }}>{planData.scorecard?.tripScore || 90}/100</h4>
                      </div>
                      <div style={{ width: "60px", height: "60px", borderRadius: "50%", background: `conic-gradient(var(--primary) ${planData.scorecard?.tripScore || 90}%, rgba(255,255,255,0.05) 0)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "8px" }}>
                        <div style={{ width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.8rem", fontWeight: "bold" }}>
                          {planData.scorecard?.tripScore || 90}%
                        </div>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Route Efficiency</span>
                          <strong style={{ color: "white" }}>{planData.scorecard?.routeEfficiency || 100}%</strong>
                        </div>
                        <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${planData.scorecard?.routeEfficiency || 100}%`, background: "var(--secondary)", borderRadius: "3px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Travel Fatigue Protection</span>
                          <strong style={{ color: "white" }}>{planData.scorecard?.travelFatigue || 100}%</strong>
                        </div>
                        <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${planData.scorecard?.travelFatigue || 100}%`, background: "#10b981", borderRadius: "3px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Budget Fit</span>
                          <strong style={{ color: "white" }}>{planData.scorecard?.budgetFit || 100}%</strong>
                        </div>
                        <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${planData.scorecard?.budgetFit || 100}%`, background: "#f59e0b", borderRadius: "3px" }} />
                        </div>
                      </div>

                      <div>
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.85rem", marginBottom: "0.25rem" }}>
                          <span style={{ color: "var(--text-secondary)" }}>Destination Coverage</span>
                          <strong style={{ color: "white" }}>{planData.scorecard?.destinationCoverage || 100}%</strong>
                        </div>
                        <div style={{ height: "6px", width: "100%", background: "rgba(255,255,255,0.05)", borderRadius: "3px" }}>
                          <div style={{ height: "100%", width: `${planData.scorecard?.destinationCoverage || 100}%`, background: "var(--primary)", borderRadius: "3px" }} />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Cultural Events & Festivals Panel */}
                  {(() => {
                    const stateKey = selectedPlaces[0]?.stateKey || formData.destination || "ladakh";
                    const stateData = destinations[stateKey];
                    if (!stateData || !stateData.festivals || stateData.festivals.length === 0) return null;
                    return (
                      <div className="glass-panel" style={{padding: "2rem"}}>
                        <h3 style={{color: "white", fontSize: "1.2rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem"}}>
                          <span>🎉</span> Events & Culture
                        </h3>
                        <p style={{fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1rem"}}>
                          Plan your visit around these major local cultural celebrations in {stateData.name}:
                        </p>
                        <div style={{display: "flex", flexDirection: "column", gap: "0.75rem"}}>
                          {stateData.festivals.map((fest, idx) => (
                            <div key={idx} style={{padding: "0.8rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "6px", display: "flex", alignItems: "center", gap: "0.75rem"}}>
                              <span style={{fontSize: "1.25rem"}}>🎈</span>
                              <strong style={{color: "white", fontSize: "0.95rem"}}>{fest}</strong>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })()}

                </div>

                {/* People Also Visit Section */}
                {getRecommendations().length > 0 && (
                  <div className="glass-panel" style={{ padding: "2rem", marginTop: "1.5rem" }}>
                    <h3 style={{ color: "white", fontSize: "1.25rem", marginBottom: "0.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <span>🌟</span> People Also Visit (Nearby Attractions)
                    </h3>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginBottom: "1.5rem" }}>
                      Based on your interests and proximity to your selected route, you might like these places:
                    </p>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
                      {getRecommendations().map((rec) => (
                        <div key={rec.id} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                          <div>
                            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "0.5rem" }}>
                              <strong style={{ color: "white", fontSize: "0.95rem" }}>{rec.name}</strong>
                              <span className="badge-pill badge-purple" style={{ fontSize: "0.65rem", padding: "0.1rem 0.35rem" }}>{rec.category}</span>
                            </div>
                            <p style={{ fontSize: "0.8rem", color: "var(--text-secondary)", marginTop: "0.5rem", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                              {rec.description}
                            </p>
                            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.5rem" }}>
                              📍 ~{Math.round(rec.distance)} km away
                            </span>
                          </div>
                          <button 
                            onClick={() => handleAddRecommendation(rec)}
                            className="btn btn-secondary btn-sm"
                            style={{ marginTop: "1rem", width: "100%", fontSize: "0.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.25rem" }}
                          >
                            <SvgIcon type="plus" /> Add to Trip & Optimize
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

            {/* Dashboard Progress Cards */}
            <div className="grid-2col">
              
              {/* packing card summary */}
              <div className="glass-panel" style={{padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                  <h4 style={{fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.5rem"}}>
                    Preparation Status
                  </h4>
                  <h3 style={{fontSize: "1.75rem", color: "white", marginBottom: "0.5rem"}}>{packedPercentage}% Packed</h3>
                  <p style={{fontSize: "0.9rem"}}>{packedCount} of {packingTotal} items checked off</p>
                  <button className="btn btn-secondary btn-sm" style={{marginTop: "1rem"}} onClick={() => setActiveTab("packing")}>
                    Manage Packing List
                  </button>
                </div>
                <div style={{width: "80px", height: "80px", borderRadius: "50%", background: `conic-gradient(var(--secondary) ${packedPercentage}%, rgba(255,255,255,0.05) 0)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"}}>
                  <div style={{width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: "bold"}}>
                    {packedPercentage}%
                  </div>
                </div>
              </div>

              {/* itinerary card summary */}
              <div className="glass-panel" style={{padding: "2rem", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                <div>
                  <h4 style={{fontSize: "0.85rem", textTransform: "uppercase", color: "var(--text-secondary)", marginBottom: "0.5rem"}}>
                    Trip Progress
                  </h4>
                  <h3 style={{fontSize: "1.75rem", color: "white", marginBottom: "0.5rem"}}>{completionPercentage}% Complete</h3>
                  <p style={{fontSize: "0.9rem"}}>{completedActivitiesCount} of {totalActivitiesCount} activities completed</p>
                  <button className="btn btn-secondary btn-sm" style={{marginTop: "1rem"}} onClick={() => setActiveTab("itinerary")}>
                    Track Activities
                  </button>
                </div>
                <div style={{width: "80px", height: "80px", borderRadius: "50%", background: `conic-gradient(var(--primary) ${completionPercentage}%, rgba(255,255,255,0.05) 0)`, display: "flex", alignItems: "center", justifyContent: "center", padding: "10px"}}>
                  <div style={{width: "100%", height: "100%", borderRadius: "50%", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.9rem", fontWeight: "bold"}}>
                    {completionPercentage}%
                  </div>
                </div>
              </div>

            </div>

            {/* Dynamic Transport Selector & Budget Optimization */}
            <div className="grid-2col no-print" style={{ marginTop: "1rem" }}>
              
              {/* Dynamic Transport Selector */}
              <div className="glass-panel" style={{ padding: "2rem" }}>
                <h3 style={{ color: "white", fontSize: "1.25rem", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                  <span>✈️</span> Route Transport Selector
                </h3>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1.25rem" }}>
                  Choose your travel transit mode to adjust cost allocations for transfers:
                </p>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "0.5rem", marginBottom: "1.5rem" }}>
                  {["flight", "train", "road", "self-drive"].map(mode => (
                    <button
                      key={mode}
                      onClick={() => updateTransportMode(mode)}
                      style={{
                        padding: "0.75rem 0.25rem",
                        background: selectedTransportMode === mode ? "rgba(124, 58, 237, 0.15)" : "transparent",
                        border: "1px solid",
                        borderColor: selectedTransportMode === mode ? "var(--primary)" : "var(--card-border)",
                        borderRadius: "6px",
                        color: selectedTransportMode === mode ? "white" : "var(--text-secondary)",
                        cursor: "pointer",
                        fontWeight: 600,
                        fontSize: "0.8rem",
                        textTransform: "capitalize",
                        transition: "0.2s"
                      }}
                    >
                      {mode === "flight" ? "✈️ Flight" : mode === "train" ? "🚆 Train" : mode === "road" ? "🚗 Taxi/Bus" : "🚘 Self Drive"}
                    </button>
                  ))}
                </div>
                {planData.feasibility && (
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)", padding: "1rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "6px" }}>
                    <strong>Est. Transit Details ({planData.feasibility.totalDistanceKm} km):</strong>
                    {selectedTransportMode === "flight" && ` ~1.5 - 2.5 hrs transit flight. Higher cost but saves significant sightseeing hours.`}
                    {selectedTransportMode === "train" && ` ~${Math.max(3, Math.round(planData.feasibility.totalDistanceKm / 75))} hrs train journey. Standard ticket cost, very relaxed fatigue level.`}
                    {selectedTransportMode === "road" && ` ~${Math.round(planData.feasibility.totalDistanceKm / 50)} hrs cab/bus route. Direct transfers, scenic but higher road exhaustion.`}
                    {selectedTransportMode === "self-drive" && ` ~${Math.round(planData.feasibility.totalDistanceKm / 60)} hrs self driven car. Fuel + Toll cost, absolute travel flexibility.`}
                  </div>
                )}
              </div>

              {/* Budget Optimization */}
              {planData.budgetOptimizations && planData.budgetOptimizations.length > 0 ? (
                <div className="glass-panel" style={{ padding: "2rem", border: "1px solid rgba(245, 158, 11, 0.3)", background: "rgba(245, 158, 11, 0.03)" }}>
                  <h3 style={{ color: "#f59e0b", fontSize: "1.25rem", marginBottom: "1rem" }}>💰 Budget Optimization Engine</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginBottom: "1rem" }}>
                    Your estimated cost (<strong>₹{planData.budget.totalLimit.toLocaleString()}</strong>) exceeds your set budget limit of <strong>₹{planData.budgetCap?.toLocaleString()}</strong> by <strong>₹{(planData.budget.totalLimit - planData.budgetCap).toLocaleString()}</strong>. Here are suggested actions:
                  </p>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {planData.budgetOptimizations.map((opt, idx) => (
                      <div key={idx} style={{ padding: "0.8rem 1rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "6px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <div>
                          <span style={{ fontSize: "0.75rem", background: "rgba(245, 158, 11, 0.15)", color: "#f59e0b", padding: "0.15rem 0.4rem", borderRadius: "4px", fontWeight: 600, marginRight: "0.5rem" }}>
                            {opt.type}
                          </span>
                          <span style={{ fontSize: "0.9rem", color: "white" }}>{opt.detail}</span>
                        </div>
                        <span style={{ color: "#10b981", fontSize: "0.9rem", fontWeight: 700 }}>Save ~₹{opt.savings.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="glass-panel" style={{ padding: "2rem", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", textAlign: "center" }}>
                  <span style={{ fontSize: "2.5rem" }}>🎉</span>
                  <h3 style={{ color: "#10b981", fontSize: "1.2rem", marginTop: "0.5rem" }}>Budget Alignment Perfect</h3>
                  <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem", maxWidth: "300px" }}>
                    {planData.budgetCap ? `Your estimated trip cost fits beautifully within your set budget cap of ₹${planData.budgetCap.toLocaleString()}!` : "No budget cap limit set. Enter one in plan criteria to run cost-saving algorithms."}
                  </p>
                </div>
              )}

            </div>

            {/* Hotel & Restaurant Discovery */}
            <div className="glass-panel" style={{ padding: "2rem", marginTop: "1.5rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
                <div>
                  <h3 style={{ color: "white", fontSize: "1.25rem" }}>🏢 Hotel & Restaurant Discovery</h3>
                  <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                    {googleMapsKey ? "Dynamic local data queried from Google Places API client-side." : "Curated local options from the database."}
                  </p>
                </div>
                <div style={{ display: "flex", gap: "0.5rem" }} className="no-print">
                  {["all", "stays", "dining"].map(filter => (
                    <button 
                      key={filter}
                      onClick={() => setDiscoverFilter(filter)} 
                      style={{ 
                        padding: "0.4rem 0.8rem", 
                        borderRadius: "6px", 
                        background: discoverFilter === filter ? "var(--primary)" : "rgba(255,255,255,0.02)", 
                        border: "1px solid var(--card-border)", 
                        color: "white", 
                        cursor: "pointer", 
                        fontSize: "0.8rem",
                        textTransform: "capitalize"
                      }}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>

              {loadingPlaces ? (
                <div style={{ textAlign: "center", padding: "2rem" }}>Loading local options...</div>
              ) : (
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.5rem" }}>
                  
                  {/* Stays column */}
                  {(discoverFilter === "all" || discoverFilter === "stays") && (
                    <div>
                      <h4 style={{ color: "var(--secondary)", fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span>🏨</span> Local Stays & Lodges
                      </h4>
                      {/* FILTER CHIPS FOR STAYS */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.75rem" }} className="no-print">
                        {["All", "Budget", "Standard", "Luxury", "Family Friendly", "Couple Friendly"].map(f => (
                          <button
                            key={f}
                            onClick={() => setStaysFilter(f)}
                            style={{
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              background: staysFilter === f ? "var(--secondary)" : "rgba(255,255,255,0.02)",
                              border: "1px solid var(--card-border)",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "0.7rem"
                            }}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {googleMapsKey && googleHotels.length > 0 ? (
                          googleHotels.map((h, i) => (
                            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                              <strong style={{ color: "white", display: "block" }}>{h.name}</strong>
                              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Rating: ⭐ {h.rating} | Price: {h.priceLevel}</span>
                              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{h.address}</span>
                            </div>
                          ))
                        ) : (
                          // Local DB Curated Hotels fallback
                          getCuratedStays().slice(0, 12).map((h, i) => (
                            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong style={{ color: "white" }}>{h.name}</strong>
                                <span style={{ fontSize: "0.75rem", background: "rgba(124,58,237,0.15)", color: "var(--primary)", padding: "0.1rem 0.35rem", borderRadius: "4px" }}>
                                  {h.budgetTier}
                                </span>
                              </div>
                              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>
                                Rating: ⭐ {h.rating}/5 | Type: {h.type}
                                {h.distance > 0 && ` | 📍 Near ${h.destName} (~${Math.round(h.distance)} km)`}
                                {h.distance === 0 && ` | 📍 ${h.destName}`}
                              </span>
                              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>Features: {h.features?.join(", ")}</span>
                            </div>
                          ))
                        )}
                        {(!googleMapsKey || googleHotels.length === 0) && getCuratedStays().length === 0 && (
                          <div style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                            No custom stays recommendations listed for this destination matching the active filter.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Dining column */}
                  {(discoverFilter === "all" || discoverFilter === "dining") && (
                    <div>
                      <h4 style={{ color: "var(--primary)", fontSize: "1.1rem", marginBottom: "1rem", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                        <span>🍽️</span> Local Dining & Cafes
                      </h4>
                      {/* FILTER CHIPS FOR DINING */}
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.25rem", marginBottom: "0.75rem" }} className="no-print">
                        {["All", "Top-rated", "Cafes", "Local Spot", "Vegetarian"].map(f => (
                          <button
                            key={f}
                            onClick={() => setDiningFilter(f)}
                            style={{
                              padding: "0.25rem 0.5rem",
                              borderRadius: "4px",
                              background: diningFilter === f ? "var(--primary)" : "rgba(255,255,255,0.02)",
                              border: "1px solid var(--card-border)",
                              color: "white",
                              cursor: "pointer",
                              fontSize: "0.7rem"
                            }}
                          >
                            {f}
                          </button>
                        ))}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                        {googleMapsKey && googleRestaurants.length > 0 ? (
                          googleRestaurants.map((r, i) => (
                            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                              <strong style={{ color: "white", display: "block" }}>{r.name}</strong>
                              <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)" }}>Rating: ⭐ {r.rating} | Price: {r.priceLevel}</span>
                              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>{r.address}</span>
                            </div>
                          ))
                        ) : (
                          // Local DB Curated Restaurants fallback
                          getCuratedDining().slice(0, 12).map((r, i) => (
                            <div key={i} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                              <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <strong style={{ color: "white" }}>{r.name}</strong>
                                <span style={{ fontSize: "0.8rem", color: "var(--secondary)" }}>Rating: ⭐ {r.rating} | Price: {r.priceLevel || r.priceTier}</span>
                              </div>
                              <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-muted)", marginTop: "0.25rem" }}>
                                Tags: {r.tags?.join(", ")}
                                {r.distance > 0 && ` | 📍 Near ${r.destName} (~${Math.round(r.distance)} km)`}
                                {r.distance === 0 && ` | 📍 ${r.destName}`}
                              </span>
                            </div>
                          ))
                        )}
                        {(!googleMapsKey || googleRestaurants.length === 0) && getCuratedDining().length === 0 && (
                          <div style={{ padding: "1rem", color: "var(--text-muted)", fontSize: "0.85rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                            No custom restaurant recommendations listed for this destination matching the active filter.
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                </div>
              )}
            </div>
            {getPlannerSummaryRecommendation()}
            </>
            )}

          </div>
        )}

        {/* ============================================================== */}
        {/* ITINERARY OPTIMIZER TAB (WITH SPLIT GOOGLE MAPS & TRAVEL CONNECTOR) */}
        {/* ============================================================== */}
        {onboarded && activeTab === "itinerary" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <h1>Itinerary Optimizer</h1>
                <p>Route-aware day plans sorted by distance. Click sights to update the map pin.</p>
              </div>
              <div className="backtracking-badge">
                <span>🛡️</span>
                <span>Travel Distance Minimization Active</span>
              </div>
            </header>

            {/* Rain mode controller */}
            <div className="rain-mode-banner">
              <div className="rain-mode-info">
                <span style={{fontSize: "1.75rem"}}>{rainMode ? "🌧️" : "☀️"}</span>
                <div>
                  <h3 style={{fontSize: "1.1rem", color: "white"}}>Rain Mode Alternatives</h3>
                  <p style={{fontSize: "0.85rem", color: "var(--text-secondary)"}}>
                    {rainMode 
                      ? "Showing indoor alternative activities to shield you from wet weather." 
                      : "Forecast is clear. Toggle to switch outdoor events with indoor museums/classes."}
                  </p>
                </div>
              </div>
              <div>
                <label className="toggle-switch">
                  <input 
                    type="checkbox" 
                    checked={rainMode} 
                    onChange={(e) => setRainMode(e.target.checked)}
                  />
                  <span className="slider"></span>
                </label>
              </div>
            </div>

            {/* Day Selector */}
            <div className="itinerary-day-nav">
              {planData.itinerary.map((day) => (
                <button
                  key={day.dayNumber}
                  className={`day-tab-btn ${activeItineraryDay === day.dayNumber ? "active" : ""}`}
                  onClick={() => {
                    setActiveItineraryDay(day.dayNumber);
                    setMapLocation(planData.destination + ", India");
                    setSelectedActivityId(null);
                  }}
                >
                  Day {day.dayNumber}: {day.zone}
                </button>
              ))}
            </div>

            {/* 2-Column Split Itinerary Layout */}
            <div className="itinerary-split-layout">
              
              {/* Left Column: Timeline items */}
              <div>
                {planData.itinerary.map((day) => {
                  if (day.dayNumber !== activeItineraryDay) return null;

                  return (
                    <div key={day.dayNumber} className="timeline" style={{paddingLeft: "1.5rem"}}>
                      {day.activities.map((act, aIdx) => {
                        const isVisited = !!visitedActivities[act.id];
                        const isSelected = selectedActivityId === act.id;
                        
                        return (
                          <div key={act.id} style={{position: "relative"}}>
                            <div className="timeline-dot" style={{left: "-1.5rem"}}></div>
                            
                            <div 
                              className={`glass-panel timeline-card ${isSelected ? "selected" : ""}`}
                              onClick={() => {
                                setSelectedActivityId(act.id);
                                const actName = rainMode && act.isOutdoor ? act.rainAlternative.name : act.name;
                                setMapLocation(`${actName}, ${planData.destination}, India`);
                              }}
                              style={{marginBottom: act.travelTimeNext ? "1.5rem" : "0"}}
                            >
                              <div className="timeline-time-slot">
                                <div style={{display: "flex", alignItems: "center", gap: "0.75rem"}}>
                                  <span className="time-badge">{act.time} - {act.slot}</span>
                                  <span className="zone-badge">📍 {act.zone}</span>
                                </div>
                                
                                <label className="packing-item-checkbox" style={{margin: 0}} onClick={(e) => e.stopPropagation()}>
                                  <input 
                                    type="checkbox"
                                    checked={isVisited}
                                    onChange={() => toggleVisitedActivity(act.id)}
                                  />
                                  <span style={{fontSize: "0.85rem", color: isVisited ? "var(--text-muted)" : "white"}}>
                                    Mark Visited
                                  </span>
                                </label>
                              </div>

                              <div className="timeline-details">
                                <h3 style={{
                                  textDecoration: isVisited ? "line-through" : "none",
                                  color: isVisited ? "var(--text-muted)" : "white"
                                }}>
                                  {rainMode && act.isOutdoor ? act.rainAlternative.name : act.name}
                                </h3>
                                <p style={{
                                  fontSize: "0.92rem", 
                                  color: isVisited ? "var(--text-muted)" : "var(--text-secondary)",
                                  marginBottom: "0.75rem"
                                }}>
                                  {rainMode && act.isOutdoor ? act.rainAlternative.description : act.description}
                                </p>

                                {/* Local food suggestion on itinerary card */}
                                {act.foodRecommendation && (
                                  <div style={{
                                    display: "inline-flex",
                                    alignItems: "center",
                                    gap: "0.4rem",
                                    fontSize: "0.82rem",
                                    background: "rgba(245, 158, 11, 0.08)",
                                    border: "1px solid rgba(245, 158, 11, 0.2)",
                                    color: "#f59e0b",
                                    padding: "0.3rem 0.6rem",
                                    borderRadius: "4px",
                                    marginBottom: "0.5rem"
                                  }}>
                                    🍽️ <strong>Food Tip:</strong> Try {act.foodRecommendation.dish} at {act.foodRecommendation.name}
                                  </div>
                                )}

                                {rainMode && act.isOutdoor && (
                                  <div style={{marginTop: "0.25rem", display: "inline-flex", fontSize: "0.8rem", color: "var(--secondary)", background: "rgba(6, 182, 212, 0.08)", padding: "0.2rem 0.6rem", borderRadius: "4px", border: "1px solid rgba(6, 182, 212, 0.2)"}}>
                                    ☔ Rain Plan replacement activated
                                  </div>
                                )}
                              </div>

                              <div className="timeline-meta-bar">
                                <div className="meta-item">
                                  <span>🚇 Transit:</span>
                                  <strong>{act.transport}</strong>
                                </div>
                                <div className="meta-item">
                                  <span>⏱️ Duration:</span>
                                  <strong>{act.duration}</strong>
                                </div>
                                <div className="meta-item">
                                  <span>💵 Est. Cost:</span>
                                  <strong>{act.cost === 0 ? "Free" : `₹ ${act.cost}`}</strong>
                                </div>
                                <div className="meta-item" style={{marginLeft: "auto", color: "var(--secondary)", fontSize: "0.8rem", fontWeight: "bold"}}>
                                  Map Pin 🗺️
                                </div>
                              </div>
                            </div>

                            {/* Segment-wise Transit time gap connector */}
                            {aIdx < day.activities.length - 1 && (() => {
                              const fromAct = act;
                              const toAct = day.activities[aIdx + 1];
                              const dist = getDistanceBetween(fromAct.lat, fromAct.lng, toAct.lat, toAct.lng);
                              const distKm = parseFloat(dist.toFixed(1));
                              
                              const cabCost = Math.round(distKm * 15 + 100);
                              const cabTime = (distKm / 45).toFixed(1);
                              
                              const selfCost = Math.round(distKm * 8 + 50);
                              const selfTime = (distKm / 55).toFixed(1);
                              
                              const showTrain = distKm > 80;
                              const trainCost = Math.round(120 + distKm * 1.2);
                              const trainTime = (distKm / 70 + 0.8).toFixed(1);
                              
                              const showFlight = distKm > 250;
                              const flightCost = Math.round(3000 + distKm * 2.5);
                              const flightTime = "1.5";
                              
                              let recommendedMode = "🚗 Cab / Taxi";
                              if (distKm > 350) {
                                recommendedMode = formData.budgetTier === "Budget" ? "🚆 Train" : "✈️ Flight";
                              } else if (distKm > 100) {
                                recommendedMode = "🚆 Train";
                              }
                              
                              const isExpanded = expandedSegmentIdx === `${day.dayNumber}-${aIdx}`;
                              
                              return (
                                <div style={{
                                  margin: "0.5rem 0 1.2rem 0.75rem",
                                  paddingLeft: "1.5rem",
                                  borderLeft: "2px dashed rgba(6, 182, 212, 0.25)",
                                  position: "relative"
                                }}>
                                  <div 
                                    onClick={() => setExpandedSegmentIdx(isExpanded ? null : `${day.dayNumber}-${aIdx}`)}
                                    style={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: "0.5rem",
                                      color: "var(--secondary)",
                                      fontSize: "0.82rem",
                                      fontWeight: "600",
                                      cursor: "pointer",
                                      userSelect: "none",
                                      padding: "0.2rem 0"
                                    }}
                                    className="no-print"
                                  >
                                    <span>➔ Transit: {distKm} km • Rec: {recommendedMode}</span>
                                    <span style={{ fontSize: "0.75rem", color: "var(--text-muted)", marginLeft: "0.5rem" }}>
                                      {isExpanded ? "▲ Hide Details" : "▼ Compare Transit Options"}
                                    </span>
                                  </div>
                                  
                                  <div className="print-only" style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontStyle: "italic" }}>
                                    Transit segment: {distKm} km via {recommendedMode}
                                  </div>
                                  
                                  {isExpanded && (
                                    <div 
                                      className="glass-panel" 
                                      style={{
                                        marginTop: "0.5rem", 
                                        padding: "1rem", 
                                        maxWidth: "480px", 
                                        background: "rgba(15, 23, 42, 0.9)", 
                                        border: "1px solid rgba(6, 182, 212, 0.25)",
                                        borderRadius: "6px",
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: "0.5rem"
                                      }}
                                    >
                                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.25rem", marginBottom: "0.25rem" }}>
                                        <span style={{ fontSize: "0.8rem", color: "var(--text-secondary)", fontWeight: "bold" }}>Compare Transit Modes</span>
                                        <span style={{ fontSize: "0.72rem", background: "rgba(16, 185, 129, 0.15)", color: "#10b981", padding: "0.1rem 0.35rem", borderRadius: "3px", fontWeight: "bold" }}>
                                          Rec: {recommendedMode}
                                        </span>
                                      </div>
                                      
                                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                                        <div style={{ padding: "0.4rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "4px", fontSize: "0.75rem" }}>
                                          <div style={{ color: "white", fontWeight: "bold" }}>🚗 Taxi / Cab</div>
                                          <div>Time: {cabTime} hrs</div>
                                          <div>Cost: ~₹{cabCost}</div>
                                        </div>
                                        <div style={{ padding: "0.4rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "4px", fontSize: "0.75rem" }}>
                                          <div style={{ color: "white", fontWeight: "bold" }}>🚘 Self-Drive</div>
                                          <div>Time: {selfTime} hrs</div>
                                          <div>Cost: ~₹{selfCost}</div>
                                        </div>
                                        {showTrain && (
                                          <div style={{ padding: "0.4rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "4px", fontSize: "0.75rem" }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>🚆 Train Option</div>
                                            <div>Time: {trainTime} hrs</div>
                                            <div>Cost: ~₹{trainCost}</div>
                                          </div>
                                        )}
                                        {showFlight && (
                                          <div style={{ padding: "0.4rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "4px", fontSize: "0.75rem" }}>
                                            <div style={{ color: "white", fontWeight: "bold" }}>✈️ Flight Option</div>
                                            <div>Time: {flightTime} hrs</div>
                                            <div>Cost: ~₹{flightCost}</div>
                                          </div>
                                        )}
                                      </div>
                                    </div>
                                  )}
                                </div>
                              );
                            })()}
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
              </div>

              {/* Right Column: Sticky Google Maps panel */}
              <div className="glass-panel map-sticky-panel">
                <div style={{display: "flex", flexDirection: "column", gap: "0.25rem"}}>
                  <h3 style={{color: "white", fontSize: "1.1rem", display: "flex", alignItems: "center", gap: "0.5rem"}}>
                    <span>🗺️ Live Route Location</span>
                  </h3>
                  <p style={{fontSize: "0.82rem", color: "var(--text-secondary)", margin: 0, textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap"}}>
                    Center: <strong>{mapLocation}</strong>
                  </p>
                </div>
                
                <div className="map-iframe-container">
                  {googleMapsKey && googleMapsKey.trim() !== "" ? (
                    <div id="google-route-map" style={{ width: "100%", height: "100%", borderRadius: "8px", minHeight: "350px" }} />
                  ) : (
                    <iframe
                      width="100%"
                      height="100%"
                      style={{ border: 0 }}
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      src={`https://maps.google.com/maps?q=${encodeURIComponent(mapLocation)}&t=&z=14&ie=UTF8&iwloc=&output=embed`}
                    ></iframe>
                  )}
                </div>
                
                <p style={{fontSize: "0.78rem", color: "var(--text-muted)", margin: 0, textAlign: "center"}}>
                  Interact with the map above, zoom, or click to find directions.
                </p>

                {/* Details Drawer inside map stick panel */}
                {selectedActivityId && (() => {
                  const dayData = planData.itinerary.find(d => d.dayNumber === activeItineraryDay);
                  const act = dayData?.activities.find(a => a.id === selectedActivityId);
                  if (!act) return null;
                  
                  return (
                    <div className={`map-details-drawer ${selectedActivityId ? "open" : ""}`}>
                      <div className="drawer-header">
                        <span className="badge-pill badge-purple" style={{ fontSize: "0.7rem" }}>{act.category}</span>
                        <button className="drawer-close" onClick={() => setSelectedActivityId(null)}>×</button>
                      </div>
                      <h4 className="drawer-title">{rainMode && act.isOutdoor ? act.rainAlternative?.name || act.name : act.name}</h4>
                      <p className="drawer-desc">{rainMode && act.isOutdoor ? act.rainAlternative?.description || act.description : act.description}</p>
                      
                      <div className="drawer-meta-grid">
                        <div>⏱️ <strong>Duration:</strong> {act.duration}</div>
                        <div>💵 <strong>Entry Cost:</strong> {act.cost === 0 ? "Free" : `₹ ${act.cost}`}</div>
                        <div>🚗 <strong>Transport:</strong> {act.transport}</div>
                        <div>📍 <strong>Zone:</strong> {act.zone}</div>
                      </div>
                      
                      {act.foodRecommendation && (
                        <div className="drawer-food-tip">
                          🍽️ <strong>Food Tip:</strong> Try <em>{act.foodRecommendation.dish}</em> at <strong>{act.foodRecommendation.name}</strong>
                        </div>
                      )}
                      
                      {act.rainAlternative && (
                        <div className="drawer-rain-alt">
                          ☔ <strong>Rain Plan Alt:</strong> {act.rainAlternative.name}
                        </div>
                      )}
                    </div>
                  );
                })()}
              </div>

            </div>

            {/* Add Custom Activity Form */}
            <div className="glass-panel custom-activities-sec" style={{padding: "2rem"}}>
              <h3 style={{color: "white", marginBottom: "1rem"}}>➕ Add Custom Activity to Day {activeItineraryDay}</h3>
              
              <form onSubmit={handleAddActivity} className="form-grid" style={{gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem"}}>
                <div className="form-group" style={{gridColumn: "span 2"}}>
                  <label>Activity Name</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Local bazaar shopping, dinner table, taxi ride..."
                    value={newActivity.name}
                    onChange={(e) => setNewActivity({ ...newActivity, name: e.target.value })}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Estimated Cost (INR ₹)</label>
                  <input 
                    type="number" 
                    className="form-input" 
                    placeholder="300"
                    value={newActivity.cost}
                    onChange={(e) => setNewActivity({ ...newActivity, cost: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Time Slot</label>
                  <select 
                    className="form-select"
                    value={newActivity.slot}
                    onChange={(e) => setNewActivity({ ...newActivity, slot: e.target.value })}
                  >
                    <option value="Morning">Morning</option>
                    <option value="Afternoon">Afternoon</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Exact Time</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. 09:30 AM"
                    value={newActivity.time}
                    onChange={(e) => setNewActivity({ ...newActivity, time: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Transport Mode</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="e.g. Auto, Walk, Cab"
                    value={newActivity.transport}
                    onChange={(e) => setNewActivity({ ...newActivity, transport: e.target.value })}
                  />
                </div>

                <div className="form-group" style={{gridColumn: "span 3"}}>
                  <label>Description / Notes</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Write details of the reservation, meeting points, addresses..."
                    value={newActivity.description}
                    onChange={(e) => setNewActivity({ ...newActivity, description: e.target.value })}
                  />
                  <div style={{marginTop: "1rem", display: "flex", justifyContent: "flex-end"}}>
                    <button type="submit" className="btn btn-secondary btn-sm" style={{display: "inline-flex", gap: "0.5rem", alignItems: "center"}}>
                      <SvgIcon type="plus" />
                      Add to Day {activeItineraryDay} Timeline
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* BUDGET TRACKER TAB */}
        {/* ============================================================== */}
        {onboarded && activeTab === "budget" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <h1>Smart Budget Tracker</h1>
                <p>Ensure cost-safety, avoid hidden fees, and log real-time travel expenses.</p>
              </div>
            </header>

            {/* budget summary cards */}
            <div className="budget-overview-header">
              <div className="glass-panel budget-mini-card">
                <h4>Suggested Cap</h4>
                <div className="budget-num limit">₹ {budgetLimit}</div>
              </div>
              <div className="glass-panel budget-mini-card">
                <h4>Logged Spent</h4>
                <div className="budget-num spent">₹ {totalSpent}</div>
              </div>
              <div className="glass-panel budget-mini-card">
                <h4>Net Remaining</h4>
                <div className={`budget-num remaining ${remainingBudget < 0 ? "danger" : ""}`}>
                  ₹ {remainingBudget}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="glass-panel budget-meter-container">
              <div className="meter-header">
                <span style={{fontSize: "0.9rem", color: "var(--text-secondary)"}}>Expense Threshold</span>
                <span style={{fontWeight: 700, color: remainingBudget < 0 ? "#ef4444" : "white"}}>
                  {spentPercentage}% Spent
                </span>
              </div>
              <div className="meter-track">
                <div 
                  className={`meter-fill ${spentPercentage > 100 ? "danger" : spentPercentage > 85 ? "warning" : ""}`}
                  style={{width: `${spentPercentage}%`}}
                ></div>
              </div>
              <p style={{fontSize: "0.85rem", marginTop: "0.75rem", color: "var(--text-secondary)"}}>
                {remainingBudget < 0 
                  ? "⚠️ Budget Exceeded! AI Advisor suggests limiting luxury dinners and walking where safe."
                  : "✓ Spending behaves within optimal parameters. Good job pacing your travel expenses!"}
              </p>
            </div>

            {/* Expense entries layout */}
            <div className="expense-breakdown">
              
              {/* Logger Form */}
              <div className="glass-panel" style={{padding: "2rem"}}>
                <h3 style={{color: "white", marginBottom: "1.25rem"}}>➕ Log New Expense</h3>
                <form onSubmit={handleAddExpense} className="flex-column-gap" style={{gap: "1.25rem"}}>
                  <div className="form-group">
                    <label>Expense Name / Title</label>
                    <input 
                      type="text" 
                      className="form-input"
                      placeholder="e.g. Autorickshaw ride, Thali lunch..."
                      value={newExpense.title}
                      onChange={(e) => setNewExpense({ ...newExpense, title: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-grid" style={{gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
                    <div className="form-group">
                      <label>Amount (INR ₹)</label>
                      <input 
                        type="number" 
                        className="form-input"
                        placeholder="350"
                        value={newExpense.amount}
                        onChange={(e) => setNewExpense({ ...newExpense, amount: e.target.value })}
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label>Category</label>
                      <select 
                        className="form-select"
                        value={newExpense.category}
                        onChange={(e) => setNewExpense({ ...newExpense, category: e.target.value })}
                      >
                        <option value="Stays">Accommodation / Hotel</option>
                        <option value="Flights">Flight / Train Tickets</option>
                        <option value="Food & Dining">Food & Dining</option>
                        <option value="Activities">Activities & Sights</option>
                        <option value="Transfers & Transit">Local Transport</option>
                        <option value="Shopping">Shopping & Gifts</option>
                        <option value="Other">Other / Emergency</option>
                      </select>
                    </div>
                  </div>

                  <button type="submit" className="btn btn-primary" style={{width: "100%"}}>
                    Add Expense Item
                  </button>
                </form>
              </div>

              {/* Expense list */}
              <div className="glass-panel" style={{padding: "2rem"}}>
                <h3 style={{color: "white", marginBottom: "1.25rem"}}>🧾 Expense Log</h3>
                
                {customExpenses.length === 0 ? (
                  <p style={{color: "var(--text-muted)", fontSize: "0.95rem"}}>No items logged yet.</p>
                ) : (
                  <div className="expense-list">
                    {customExpenses.map((exp) => (
                      <div key={exp.id} className="expense-item">
                        <div className="expense-meta">
                          <h4>{exp.title}</h4>
                          <span>{exp.category}</span>
                        </div>
                        <div className="expense-amount-row">
                          <span className="expense-val">₹ {exp.amount}</span>
                          <button 
                            className="delete-expense-btn"
                            onClick={() => handleDeleteExpense(exp.id)}
                            title="Delete item"
                          >
                            ×
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* PACKING LIST & WEATHER TAB */}
        {/* ============================================================== */}
        {onboarded && activeTab === "packing" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <h1>Pack & Prepare</h1>
                <p>Weather-driven dynamic packing checklists to reduce uncertainty.</p>
              </div>
            </header>

            {/* weather status card */}
            <div className="glass-panel weather-status-card">
              <span className="weather-emoji">
                {planData.weather.season === "summer" ? "☀️" : planData.weather.season === "winter" ? "❄️" : "⛅"}
              </span>
              <div className="weather-info-grid">
                <h3>{planData.weather.forecast} ({planData.weather.temperature})</h3>
                <p style={{fontSize: "0.9rem", color: "var(--text-secondary)"}}>
                  Climate conditions for your start date. {"We've"} customized your clothing recommendation accordingly.
                </p>
              </div>
            </div>

            {/* Travel Seasonal weather advisory warning */}
            {planData.weather.advisory && (
              <div className="glass-panel" style={{ padding: "1.2rem", border: "1px solid #f59e0b", background: "rgba(245, 158, 11, 0.08)", borderRadius: "8px", display: "flex", gap: "1rem", alignItems: "center" }}>
                <span style={{ fontSize: "1.75rem" }}>⚠️</span>
                <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", margin: 0 }}>{planData.weather.advisory}</p>
              </div>
            )}

            {/* 5-Day Weather Forecast */}
            {planData.weather.dailyForecast && planData.weather.dailyForecast.length > 0 && (
              <div className="glass-panel" style={{ padding: "1.5rem" }}>
                <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: "1rem" }}>📅 5-Day Daily Weather Forecast</h3>
                <div style={{ display: "flex", gap: "1rem", overflowX: "auto", paddingBottom: "0.5rem" }}>
                  {planData.weather.dailyForecast.map((f, i) => (
                    <div key={i} style={{ flex: "0 0 120px", padding: "0.75rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "6px", textAlign: "center" }}>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>
                        {new Date(f.date).toLocaleDateString("en-US", { weekday: "short", month: "short", day: "numeric" })}
                      </span>
                      <div style={{ fontSize: "1.25rem", margin: "0.25rem 0" }}>
                        {f.condition.includes("Rain") ? "🌧️" : f.condition.includes("Snow") ? "❄️" : f.condition.includes("Cloud") || f.condition.includes("Overcast") ? "☁️" : "☀️"}
                      </div>
                      <div style={{ fontSize: "0.85rem", color: "white", fontWeight: "bold" }}>{f.minTemp}°C - {f.maxTemp}°C</div>
                      <div style={{ fontSize: "0.7rem", color: "var(--text-muted)", marginTop: "0.2rem" }}>{f.condition}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* packing lists */}
            <div className="glass-panel" style={{padding: "2rem"}}>
              <div style={{display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "1rem"}}>
                <h3 style={{color: "white"}}>🧳 Trip Packing Checklist</h3>
                <span className="badge-pill badge-purple">{packedCount} of {packingTotal} Packed ({packedPercentage}%)</span>
              </div>

              {packingList.length === 0 ? (
                <p>No packing items generated.</p>
              ) : (
                <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem"}}>
                  {packingList.map((item, idx) => (
                    <label 
                      key={idx} 
                      className={`packing-item-checkbox ${item.packed ? "checked" : ""}`}
                      style={{
                        padding: "0.75rem 1rem", 
                        border: "1px solid var(--card-border)", 
                        borderRadius: "8px", 
                        background: item.packed ? "rgba(255,255,255,0.01)" : "rgba(255,255,255,0.02)"
                      }}
                    >
                      <input 
                        type="checkbox" 
                        checked={item.packed} 
                        onChange={() => togglePackingItem(idx)}
                      />
                      <span>{item.name}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* SAFETY & GUIDE TAB */}
        {/* ============================================================== */}
        {onboarded && activeTab === "safety" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <h1>Local Safety & Custom Guide</h1>
                <p>Avoid local scams, respect etiquette rules, and explore off-the-beaten-path hidden gems.</p>
              </div>
            </header>

            {/* scam alerts */}
            <div className="glass-panel" style={{padding: "2rem"}}>
              <h3 style={{color: "white", marginBottom: "1.25rem", display: "flex", alignItems: "center", gap: "0.5rem"}}>
                <span style={{color: "#ef4444"}}>🚨</span> Scam Warnings & Traps
              </h3>
              
              {planData.scams?.map((scam, idx) => (
                <div key={idx} className="scam-warning-card">
                  <div className="scam-header-row">
                    <h4 style={{color: "white", fontSize: "1.1rem"}}>{scam.name}</h4>
                    <span className="risk-level-badge">{scam.rating}</span>
                  </div>
                  <p style={{fontSize: "0.95rem", color: "var(--text-secondary)"}}>{scam.description}</p>
                </div>
              ))}
            </div>

            {/* customs and etiquette */}
            <div className="glass-panel" style={{padding: "2rem"}}>
              <h3 style={{color: "white", marginBottom: "1.25rem"}}>🗣️ Customs & Local Rules</h3>
              <div style={{display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem"}}>
                {planData.customs?.map((custom, idx) => (
                  <div key={idx} className="custom-card">
                    <h4>{custom.rule}</h4>
                    <p style={{fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem"}}>
                      {custom.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* ============================================================== */}
        {/* DURING-TRIP LIVE SUPPORT TAB */}
        {/* ============================================================== */}
        {onboarded && activeTab === "live" && (
          <div className="flex-column-gap">
            <header className="dashboard-header">
              <div className="header-title-section">
                <h1>During-Trip Live Support</h1>
                <p>Simulate real-time logistics events, delayed flights, rain alerts, or look up emergency details.</p>
              </div>
            </header>

            {/* Simulation controls panel */}
            <div className="glass-panel simulation-bar">
              <div className="simulation-info">
                <h3>Alert Simulator Console</h3>
                <p style={{fontSize: "0.85rem"}}>Trigger simulated incidents to see how the Advisor handles them.</p>
              </div>
              <div style={{display: "flex", gap: "0.5rem", flexWrap: "wrap"}}>
                <button 
                  className="btn btn-secondary btn-sm"
                  onClick={() => fetchAlerts(formData.destination)}
                  style={{fontSize: "0.8rem"}}
                >
                  🔄 Reset Simulation
                </button>
              </div>
            </div>

            {/* Alerts feed */}
            <div className="alerts-feed">
              <h3 style={{color: "white"}}>🔔 Active Event Alerts</h3>
              
              {alerts.length === 0 ? (
                <div className="glass-panel" style={{padding: "2rem", textAlign: "center"}}>
                  <p style={{color: "var(--text-muted)"}}>No active notifications. All systems operational.</p>
                </div>
              ) : (
                alerts.map((alertItem) => {
                  const hasResponse = alertActions[alertItem.id];
                  
                  return (
                    <div key={alertItem.id} className={`glass-panel alert-message-card ${alertItem.severity}`}>
                      <div className="alert-card-header">
                        <div className="alert-card-title">
                          <span>
                            {alertItem.type === "flight" ? "✈️" : alertItem.type === "weather" ? "☔" : alertItem.type === "scam" ? "🛡️" : "💎"}
                          </span>
                          <span>{alertItem.title}</span>
                        </div>
                        <span className="alert-tag-time">{alertItem.time}</span>
                      </div>

                      <p style={{fontSize: "0.95rem", color: "var(--text-secondary)"}}>{alertItem.message}</p>

                      <div className="alert-action-area">
                        {!hasResponse ? (
                          <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => triggerAlertAction(alertItem.id, alertItem.actionResponse)}
                            style={{padding: "0.5rem 1rem", fontSize: "0.85rem"}}
                          >
                            {alertItem.actionLabel}
                          </button>
                        ) : (
                          <div className="alert-action-result">
                            ✔️ {hasResponse}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>

            {/* Emergency resource finder directories */}
            <div className="grid-2col" style={{marginTop: "2rem"}}>
              
              {/* ATM guidance */}
              <div className="glass-panel" style={{padding: "2rem"}}>
                <h3 style={{color: "white", marginBottom: "1rem"}}>🏪 Fee-Free ATM Locations</h3>
                <p style={{fontSize: "0.95rem", marginBottom: "1rem"}}>
                  Avoid steep transaction markup rates. Our advisor recommends:
                </p>
                {formData.destination === "ladakh" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>State Bank of India (SBI) ATMs</strong>: Located in Leh Main Market. Highly reliable with cash availability.
                    </div>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>J&K Bank ATMs</strong>: Good cash supply. ATMs rare outside Leh town.
                    </div>
                  </div>
                )}
                {formData.destination === "goa" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>HDFC Bank / ICICI Bank ATMs</strong>: High transaction limits. Use ATMs with security guards near beach junctions to prevent skimming.
                    </div>
                  </div>
                )}
                {formData.destination === "kerala" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>Federal Bank / SBI ATMs</strong>: Most prevalent in Kerala towns. Choose indoor ATMs inside bank yards.
                    </div>
                  </div>
                )}
                {formData.destination === "rajasthan" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>SBI / Bank of Baroda ATMs</strong>: Located near Walled City gates. Verify ATM card slots for structural anomalies.
                    </div>
                  </div>
                )}
                {!["ladakh", "goa", "kerala", "rajasthan"].includes(formData.destination) && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>SBI / HDFC Bank ATMs</strong>: Major state bank outlets are safest. Decline dynamic conversion if using a foreign card.
                    </div>
                  </div>
                )}
              </div>

              {/* Medical support finder */}
              <div className="glass-panel" style={{padding: "2rem"}}>
                <h3 style={{color: "white", marginBottom: "1rem"}}>🏥 Emergency Medical Facilities</h3>
                <p style={{fontSize: "0.95rem", marginBottom: "1rem"}}>
                  Reliable healthcare services in tourist centers:
                </p>
                {formData.destination === "ladakh" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>SNM Hospital Leh</strong>: Government hospital with specialized high-altitude sickness (AMS) oxygen wards. Tel: +91-1982-252012.
                    </div>
                  </div>
                )}
                {formData.destination === "goa" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>Manipal Hospital Goa</strong>: Dona Paula, Panaji. Leading private tertiary care center. Tel: +91-832-3048800.
                    </div>
                  </div>
                )}
                {formData.destination === "kerala" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>Aster Medcity</strong>: Cheranelloor, Kochi. Premium private care facilities. Tel: +91-484-6699999.
                    </div>
                  </div>
                )}
                {formData.destination === "rajasthan" && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>Fortis Escorts Hospital</strong>: Malviya Nagar, Jaipur. Leading multi-specialty care. Tel: +91-141-2547000.
                    </div>
                  </div>
                )}
                {!["ladakh", "goa", "kerala", "rajasthan"].includes(formData.destination) && (
                  <div style={{fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.5rem"}}>
                    <div style={{background: "rgba(255,255,255,0.02)", padding: "0.75rem", borderRadius: "6px"}}>
                      <strong>District Civil Hospital / Private Max Health</strong>: Reach out to local tourist support desk or call national helpline 112.
                    </div>
                  </div>
                )}
              </div>

            </div>
          </div>
        )}

      </main>
    </div>
  );
}
