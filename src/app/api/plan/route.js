import { NextResponse } from "next/server";
import { destinations, curatedDestinations } from "@/lib/destinations";

// Helper function to calculate Haversine distance in km
function haversineDistance(lat1, lon1, lat2, lon2) {
  if (lat1 === undefined || lon1 === undefined || lat2 === undefined || lon2 === undefined) return 0;
  const R = 6371; // Earth radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

// Fetch actual driving distance & duration via Google Distance Matrix API
async function getGoogleRoute(lat1, lng1, lat2, lng2, apiKey) {
  try {
    const res = await fetch(
      `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${lat1},${lng1}&destinations=${lat2},${lng2}&key=${apiKey}`
    );
    if (res.ok) {
      const data = await res.json();
      if (data.status === "OK" && data.rows?.[0]?.elements?.[0]?.status === "OK") {
        const element = data.rows[0].elements[0];
        return {
          distanceKm: element.distance.value / 1000,
          durationHrs: element.duration.value / 3600
        };
      }
    }
  } catch (e) {
    console.error("Error fetching Google Distance Matrix:", e);
  }
  return null;
}

// Fetch real-time weather and forecast via Open-Meteo API
async function getOpenMeteoWeather(lat, lng) {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,weathercode&timezone=auto`
    );
    if (res.ok) {
      const data = await res.json();
      return data;
    }
  } catch (e) {
    console.error("Error fetching Open-Meteo weather:", e);
  }
  return null;
}

// Map Open-Meteo WMO weather codes to user-friendly conditions
function mapWeatherCode(code) {
  const mapping = {
    0: "Clear Sky",
    1: "Mainly Clear",
    2: "Partly Cloudy",
    3: "Overcast",
    45: "Foggy",
    48: "Depositing Rime Fog",
    51: "Light Drizzle",
    53: "Moderate Drizzle",
    55: "Dense Drizzle",
    56: "Light Freezing Drizzle",
    57: "Dense Freezing Drizzle",
    61: "Slight Rain",
    63: "Moderate Rain",
    65: "Heavy Rain",
    66: "Light Freezing Rain",
    67: "Heavy Freezing Rain",
    71: "Slight Snowfall",
    73: "Moderate Snowfall",
    75: "Heavy Snowfall",
    77: "Snow Grains",
    80: "Slight Rain Showers",
    81: "Moderate Rain Showers",
    82: "Violent Rain Showers",
    85: "Slight Snow Showers",
    86: "Heavy Snow Showers",
    95: "Thunderstorm",
    96: "Thunderstorm with Slight Hail",
    99: "Thunderstorm with Heavy Hail"
  };
  return mapping[code] || "Scattered Clouds";
}

export async function POST(req) {
  try {
    const body = await req.json();
    const {
      startDate,
      endDate,
      tripType = "Solo",
      budgetTier = "Comfort",
      interests = [],
      dietary = "None",
      specialRequirements = "",
      selectedPlaces = [], // array of resolved places { name, lat, lng, city, state, country, category }
      geminiApiKey = "",
      googleMapsKey = "",
      budgetCap = null // user's budget limit
    } = body;

    const effectiveGoogleMapsKey = googleMapsKey?.trim() || process.env.GOOGLE_MAPS_API_KEY || "";
    const effectiveGeminiApiKey = geminiApiKey?.trim() || process.env.GEMINI_API_KEY || "";

    if (!selectedPlaces || selectedPlaces.length === 0) {
      return NextResponse.json(
        { success: false, error: "Please select at least one destination to plan a journey." },
        { status: 400 }
      );
    }

    // Calculate dates and trip duration
    const start = startDate ? new Date(startDate) : new Date();
    const end = endDate ? new Date(endDate) : new Date(start.getTime() + 3 * 24 * 60 * 60 * 1000);
    const timeDiff = end.getTime() - start.getTime();
    const durationDays = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)) + 1);

    // --- Route-Aware Optimizing (Nearest-Neighbor Sorting of places) ---
    const sortedPlaces = [];
    const remaining = [...selectedPlaces];
    let current = remaining.shift();
    sortedPlaces.push(current);

    while (remaining.length > 0) {
      let nearestIndex = 0;
      let nearestDist = Infinity;

      for (let i = 0; i < remaining.length; i++) {
        const dLat = remaining[i].lat - current.lat;
        const dLng = remaining[i].lng - current.lng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        if (dist < nearestDist) {
          nearestDist = dist;
          nearestIndex = i;
        }
      }
      current = remaining.splice(nearestIndex, 1)[0];
      sortedPlaces.push(current);
    }

    // --- Calculate Travel Distance & Travel Hours ---
    let sortedDistance = 0;
    let travelHours = 0;

    if (effectiveGoogleMapsKey) {
      for (let i = 0; i < sortedPlaces.length - 1; i++) {
        const fromPlace = sortedPlaces[i];
        const toPlace = sortedPlaces[i + 1];
        const googleRoute = await getGoogleRoute(fromPlace.lat, fromPlace.lng, toPlace.lat, toPlace.lng, effectiveGoogleMapsKey);
        if (googleRoute) {
          sortedDistance += googleRoute.distanceKm;
          travelHours += googleRoute.durationHrs;
        } else {
          // Fallback to winding Haversine
          const hDist = haversineDistance(fromPlace.lat, fromPlace.lng, toPlace.lat, toPlace.lng) * 1.3;
          sortedDistance += hDist;
          travelHours += hDist / 50;
        }
      }
    } else {
      for (let i = 0; i < sortedPlaces.length - 1; i++) {
        const hDist = haversineDistance(
          sortedPlaces[i].lat,
          sortedPlaces[i].lng,
          sortedPlaces[i + 1].lat,
          sortedPlaces[i + 1].lng
        ) * 1.3;
        sortedDistance += hDist;
      }
      travelHours = sortedDistance / 50;
    }

    let unsortedDistance = 0;
    for (let i = 0; i < selectedPlaces.length - 1; i++) {
      unsortedDistance += haversineDistance(
        selectedPlaces[i].lat,
        selectedPlaces[i].lng,
        selectedPlaces[i + 1].lat,
        selectedPlaces[i + 1].lng
      ) * 1.3;
    }

    const sightseeingHours = selectedPlaces.length * 4; // 4 hours per destination
    const totalRequiredHours = travelHours + sightseeingHours;
    const maxAvailableHours = durationDays * 10; // Assume max 10 hours travel/sightseeing per day

    const feasible = totalRequiredHours <= maxAvailableHours;
    const recommendedDuration = Math.ceil(totalRequiredHours / 10);

    // --- Calculate Smart Route Quality Scores ---
    // 1. Route Efficiency: compact vs spread out
    const avgDistance = sortedDistance / (selectedPlaces.length || 1);
    const routeEfficiency = Math.max(30, Math.min(100, Math.round(100 - avgDistance / 15)));

    // 2. Travel Fatigue: travel time per day
    const averageTravelHoursPerDay = travelHours / durationDays;
    const travelFatigue = Math.max(10, Math.min(100, Math.round(100 - averageTravelHoursPerDay * 12)));

    // 3. Destination Coverage: items selected vs length
    const destinationCoverage = Math.max(30, Math.min(100, Math.round(50 + selectedPlaces.length * 8)));

    // --- Fetch Open-Meteo Weather Data ---
    let liveWeatherInfo = null;
    if (sortedPlaces[0] && sortedPlaces[0].lat !== undefined) {
      const weatherData = await getOpenMeteoWeather(sortedPlaces[0].lat, sortedPlaces[0].lng);
      if (weatherData) {
        const current = weatherData.current_weather || {};
        const daily = weatherData.daily || {};
        const dailyForecast = [];
        if (daily.time) {
          for (let i = 0; i < Math.min(5, daily.time.length); i++) {
            dailyForecast.push({
              date: daily.time[i],
              maxTemp: daily.temperature_2m_max?.[i] !== undefined ? Math.round(daily.temperature_2m_max[i]) : "N/A",
              minTemp: daily.temperature_2m_min?.[i] !== undefined ? Math.round(daily.temperature_2m_min[i]) : "N/A",
              condition: mapWeatherCode(daily.weathercode?.[i])
            });
          }
        }
        liveWeatherInfo = {
          currentTemp: current.temperature !== undefined ? Math.round(current.temperature) : "N/A",
          currentCondition: mapWeatherCode(current.weathercode),
          dailyForecast: dailyForecast
        };
      }
    }

    // Weather seasonal safety advisories
    let travelAdvisory = "";
    const primaryStateKey = sortedPlaces[0]?.state?.toLowerCase().replace(/[^a-z]/g, "") || "ladakh";
    const startMonth = start.getMonth();
    
    if (primaryStateKey === "ladakh" && (startMonth <= 2 || startMonth >= 10)) {
      travelAdvisory = "⚠️ Ladakh Travel Advisory: Heavy snowfall in winter may lead to road closures and high altitude passes (Khardung La, Chang La) being blocked. Carry extra medications, portable oxygen, and expect cellular signal disruptions.";
    } else if ((primaryStateKey === "himachal" || primaryStateKey === "uttarakhand" || primaryStateKey === "sikkim") && (startMonth >= 5 && startMonth <= 7)) {
      travelAdvisory = "⚠️ Mountain Travel Alert: Heavy monsoon rains can trigger landslides and flash floods in high elevation zones. Rafting and trekking trails are restricted during heavy rainstorms. Watch BRO road alerts closely.";
    }

    // Dynamic warning alert for Himalayas, Northeast India, and Remote destinations
    let safetyAlert = null;
    if (["ladakh", "himachal", "uttarakhand", "sikkim"].includes(primaryStateKey)) {
      safetyAlert = {
        title: "Active Weather Warning: BRO Road Closure alert",
        message: `High risk road closure or landslide warnings active in ${sortedPlaces[0]?.state || "Himalayan sector"}. Safe transport via local government-approved guides only.`,
        severity: "warning"
      };
    }

    // --- Strict Feasibility Blocking ---
    if (!feasible) {
      return NextResponse.json({
        success: true,
        feasible: false,
        destination: sortedPlaces.length > 1
          ? `${sortedPlaces[0].name} - ${sortedPlaces[sortedPlaces.length - 1].name} Tour`
          : sortedPlaces[0].name,
        durationDays,
        feasibility: {
          feasible: false,
          travelHours: parseFloat(travelHours.toFixed(1)),
          sightseeingHours,
          totalHours: parseFloat(totalRequiredHours.toFixed(1)),
          recommendedDuration,
          totalDistanceKm: parseFloat(sortedDistance.toFixed(1)),
          unsortedDistanceKm: parseFloat(unsortedDistance.toFixed(1))
        },
        scorecard: {
          routeEfficiency,
          travelFatigue: Math.max(10, Math.min(45, travelFatigue)),
          budgetFit: 100,
          destinationCoverage,
          tripScore: 40
        },
        budget: {
          totalLimit: 0,
          breakdown: []
        },
        itinerary: [],
        weather: {
          season: startMonth >= 2 && startMonth <= 4 ? "spring" : startMonth >= 5 && startMonth <= 7 ? "summer" : startMonth >= 8 && startMonth <= 10 ? "autumn" : "winter",
          forecast: liveWeatherInfo?.currentCondition || "Cool & Sunny",
          temperature: liveWeatherInfo?.currentTemp !== undefined ? `${liveWeatherInfo.currentTemp}°C` : "15°C",
          currentTemp: liveWeatherInfo?.currentTemp || "N/A",
          currentCondition: liveWeatherInfo?.currentCondition || "N/A",
          dailyForecast: liveWeatherInfo?.dailyForecast || [],
          advisory: travelAdvisory
        },
        safetyAlert
      });
    }

    let finalResult = null;

    // Attempt Gemini AI Itinerary Generation if key is present
    if (effectiveGeminiApiKey) {
      try {
        const prompt = `You are a premium AI Travel Advisor for India. Generate a highly detailed, day-wise travel itinerary in JSON format for a trip to the following optimized sequence of destinations in India: 
${sortedPlaces.map((p, idx) => `${idx + 1}. ${p.name} (located in ${p.state}, coords: ${p.lat}, ${p.lng})`).join("\n")}

Trip Details:
- Duration: ${durationDays} Days
- Travel Style / Budget: ${budgetTier} level
- Traveler Type: ${tripType}
- Interests: ${interests.join(", ")}
- Dietary restrictions: ${dietary}
- Special requests: ${specialRequirements}

Ensure the response is a single valid JSON object containing exactly the following keys:
{
  "destination": "Short name for the combined journey",
  "country": "India",
  "currency": "INR (₹)",
  "exchangeRate": "Local Currency",
  "durationDays": ${durationDays},
  "safetyScore": (number out of 100),
  "visaGuidance": "Brief visa / local permit advice for Indian citizens and foreigners visiting these areas.",
  "emergencyContacts": {
    "police": "112",
    "ambulance": "102",
    "touristSupport": "Provide a phone number"
  },
  "scams": [
    { "name": "Scam Name", "description": "Scam description and warning specific to these regions" }
  ],
  "customs": [
    { "rule": "Custom/Etiquette rule", "detail": "Details on what to wear or how to behave in these specific spots" }
  ],
  "weather": {
    "season": "Season name based on dates",
    "forecast": "Weather condition forecast",
    "temperature": "Temp range e.g. 22-30°C"
  },
  "packingList": [
    { "name": "Item name e.g. sunscreen, fleece jacket", "packed": false }
  ],
  "itinerary": [
    {
      "dayNumber": 1,
      "title": "Day 1 Title",
      "zone": "City/Region name",
      "activities": [
        {
          "id": "Unique string ID e.g. act-1-1",
          "name": "Detailed attraction or activity name",
          "slot": "Morning",
          "time": "09:00 AM",
          "category": "One of: Spiritual, Nature, Adventure, Heritage, Food, Wildlife, Relaxing",
          "description": "Highly engaging overview of what to see and do there",
          "zone": "Locality/Neighborhood",
          "cost": (Approx ticket cost in INR as a number),
          "duration": "e.g. 2 hours",
          "transport": "Recommended local transit mode (e.g. Auto-Rickshaw, Walk, Taxi)",
          "isOutdoor": (true/false),
          "rainAlternative": {
            "name": "Alternative Indoor Spot",
            "description": "What to do if it rains"
          },
          "foodRecommendation": {
            "name": "Highly rated restaurant name nearby",
            "dish": "Must-try local dish name"
          },
          "travelTimeNext": "Transit time estimate to next spot e.g. '🚗 30 mins transit to next destination'",
          "lat": (latitude number e.g. 27.565),
          "lng": (longitude number e.g. 77.701)
        }
      ]
    }
  ],
  "budget": {
    "totalLimit": (approx total cost in INR for the whole trip as a number),
    "breakdown": [
      { "category": "Stays", "allocated": (allocated INR), "percentage": (percent), "desc": "Details" },
      { "category": "Flights", "allocated": (allocated INR), "percentage": (percent), "desc": "Details" },
      { "category": "Food & Dining", "allocated": (allocated INR), "percentage": (percent), "desc": "Details" },
      { "category": "Activities", "allocated": (allocated INR), "percentage": (percent), "desc": "Details" },
      { "category": "Transfers & Transit", "allocated": (allocated INR), "percentage": (percent), "desc": "Details" }
    ]
  }
}

Important Instructions:
- Format response strictly as a clean JSON object. Do not include markdown code fence wrappers or backticks around the JSON.
- Make all prices and budgets in Indian Rupees (INR).
- The itinerary must cover exactly ${durationDays} days. Allocate activities to Morning, Afternoon, Evening slots.
- Ensure the route order of activities aligns with the optimized geographic sequence provided. Avoid backtracking.`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }],
            generationConfig: { responseMimeType: "application/json" }
          })
        });

        if (geminiRes.ok) {
          const geminiData = await geminiRes.json();
          const textResponse = geminiData.candidates?.[0]?.content?.parts?.[0]?.text;
          if (textResponse) {
            const cleanJson = textResponse.trim().replace(/^```json/, "").replace(/```$/, "").trim();
            finalResult = JSON.parse(cleanJson);
          }
        }
      } catch (geminiError) {
        console.error("Gemini API error, falling back to local layout generator:", geminiError);
      }
    }

    // --- Keyless Rule-Based Fallback Itinerary Compiler ---
    if (!finalResult) {
      // Flatten curated destinations + state attractions for local database checks
      const dbPlaces = [
        ...curatedDestinations,
        ...Object.keys(destinations).flatMap((sKey) =>
          destinations[sKey].touristPlaces.map((p) => ({
            ...p,
            stateKey: sKey,
            state: destinations[sKey].name
          }))
        )
      ];

      // Build day-wise activities by distributing sorted selected places
      const itinerary = [];
      let placeIdx = 0;

      for (let day = 1; day <= durationDays; day++) {
        const dayActivities = [];
        const slots = ["Morning", "Afternoon", "Evening"];
        const times = ["09:00 AM", "02:00 PM", "07:30 PM"];

        for (let s = 0; s < 3; s++) {
          // Morning/Afternoon are sightseeing slots, Evening is food trail
          if (s < 2 && placeIdx < sortedPlaces.length) {
            const rawPlace = sortedPlaces[placeIdx];

            // Cross-reference with our database to load rich pre-curated details
            const dbMatch = dbPlaces.find(
              (p) =>
                p.id === rawPlace.id ||
                p.name.toLowerCase() === rawPlace.name.toLowerCase() ||
                p.name.toLowerCase().includes(rawPlace.name.toLowerCase())
            );

            // Resolve place details with database or defaults
            const name = rawPlace.name;
            const category = dbMatch?.category || rawPlace.category || "Sightseeing";
            const desc =
              dbMatch?.description ||
              `Explore the beautiful attractions of ${rawPlace.name}. Discover its local history, architecture, and scenic surroundings.`;
            const cost =
              dbMatch?.cost !== undefined
                ? dbMatch.cost
                : budgetTier === "Budget"
                ? 50
                : budgetTier === "Comfort"
                ? 150
                : 500;
            const duration = dbMatch?.recommendedDuration || "2 hours";
            const isOutdoor = dbMatch?.isOutdoor !== undefined ? dbMatch.isOutdoor : true;
            const rainAlt = dbMatch?.rainAlternative || "Local sheltered tea shop or museum";
            const foodRec = dbMatch?.foodRecommendation || {
              name: "Local Recommended Stall",
              dish: "Authentic regional snacks"
            };

            // Calculate travel time to next destination
            let travelTimeText = "";
            if (placeIdx < sortedPlaces.length - 1) {
              const nextAct = sortedPlaces[placeIdx + 1];
              const dist = haversineDistance(rawPlace.lat, rawPlace.lng, nextAct.lat, nextAct.lng);

              // Map distance to travel minutes
              const minutes = Math.max(15, Math.min(600, Math.round(dist * 1.2)));
              if (minutes > 180) {
                const hours = (minutes / 60).toFixed(1);
                travelTimeText = `🚗 ${hours} hours transit to next destination`;
              } else {
                travelTimeText = `🚗 ${minutes} mins transit to next destination`;
              }
            } else {
              travelTimeText = "20 mins transit back to your hotel";
            }

            let transportMode = dbMatch?.transport || "Auto-Rickshaw";
            if (budgetTier === "Budget") {
              transportMode = "Local Bus / Metro / Walk";
            } else if (budgetTier === "Luxury") {
              transportMode = "Private AC Sedan";
            }

            dayActivities.push({
              id: `act-${day}-${placeIdx}`,
              name,
              slot: slots[s],
              time: times[s],
              category,
              description: desc,
              zone: rawPlace.city || rawPlace.state || "Local Area",
              cost,
              duration,
              transport: transportMode,
              isOutdoor,
              rainAlternative: {
                name: rainAlt,
                description: `Indoor shelter: Visit ${rainAlt}.`
              },
              foodRecommendation: foodRec,
              travelTimeNext: travelTimeText,
              lat: rawPlace.lat,
              lng: rawPlace.lng
            });

            placeIdx++;
          } else if (s === 2 || placeIdx >= sortedPlaces.length) {
            // Evening: Regional food crawl
            const activeState =
              sortedPlaces[placeIdx - 1]?.state || sortedPlaces[0]?.state || "Local State";

            // Match state for food tips
            const stateKey = activeState.toLowerCase().replace(/[^a-z]/g, "");
            const stateData = destinations[stateKey] || destinations.ladakh;
            const foodRecommendation = stateData.touristPlaces?.[0]?.foodRecommendation || {
              name: "Local Bazaar",
              dish: "Regional Sweets and Snacks"
            };

            const lastLoc = sortedPlaces[placeIdx - 1] || sortedPlaces[0];

            dayActivities.push({
              id: `relax-${day}-${s}`,
              name: `Dinner & Local Food Crawl`,
              slot: slots[s],
              time: times[s],
              category: "Food",
              description: `Wind down your day with an authentic regional dinner path. Sample specialties in the local food district.`,
              zone: "Food Court",
              cost: budgetTier === "Budget" ? 200 : budgetTier === "Comfort" ? 500 : 1500,
              duration: "2 hours",
              transport: "Walk",
              isOutdoor: false,
              rainAlternative: {
                name: "Cozy Indoor Cafe",
                description: "Indulge in sweet hot desserts out of the weather."
              },
              foodRecommendation,
              travelTimeNext: "Walk back to hotel",
              lat: lastLoc.lat,
              lng: lastLoc.lng
            });
          }
        }

        itinerary.push({
          dayNumber: day,
          title: `Journey through Sights`,
          zone: dayActivities[0]?.zone || "Local Region",
          activities: dayActivities
        });
      }

      // Merge Scams, Customs, Emergency Numbers across all visited states
      const involvedStates = Array.from(
        new Set(sortedPlaces.map((p) => p.state?.toLowerCase().replace(/[^a-z]/g, "")))
      );
      const firstStateKey = involvedStates[0] || "ladakh";
      const primaryStateData = destinations[firstStateKey] || destinations.ladakh;

      const aggregatedScams = [];
      const seenScams = new Set();
      const aggregatedCustoms = [];
      const seenCustoms = new Set();
      const aggregatedContacts = { ...primaryStateData.emergencyContacts };

      involvedStates.forEach((sKey) => {
        const stateData = destinations[sKey];
        if (stateData) {
          // Scams
          if (stateData.scams) {
            stateData.scams.forEach((scam) => {
              if (!seenScams.has(scam.name)) {
                seenScams.add(scam.name);
                aggregatedScams.push(scam);
              }
            });
          }
          // Customs
          if (stateData.customs) {
            stateData.customs.forEach((c) => {
              if (!seenCustoms.has(c.rule)) {
                seenCustoms.add(c.rule);
                aggregatedCustoms.push(c);
              }
            });
          }
          // Contacts
          if (sKey !== firstStateKey && stateData.emergencyContacts) {
            aggregatedContacts[`${stateData.name} Support`] =
              stateData.emergencyContacts.touristSupport || stateData.emergencyContacts.police;
          }
        }
      });

      // Curated destinations custom merge for specific places
      sortedPlaces.forEach((place) => {
        const match = curatedDestinations.find(
          (cd) => cd.name.toLowerCase() === place.name.toLowerCase()
        );
        if (match) {
          if (match.scams && !seenScams.has(match.name + " Scam")) {
            seenScams.add(match.name + " Scam");
            aggregatedScams.push({ name: `${match.name} Scam Warning`, description: match.scams });
          }
          if (match.customs && !seenCustoms.has(match.name + " Rule")) {
            seenCustoms.add(match.name + " Rule");
            aggregatedCustoms.push({ rule: `${match.name} Etiquette`, detail: match.customs });
          }
        }
      });

      // Fallback scams/customs if empty
      if (aggregatedScams.length === 0) {
        aggregatedScams.push({
          name: "Unlicensed Touts",
          description: "Politely decline tour offers from guides lacking government badges."
        });
      }
      if (aggregatedCustoms.length === 0) {
        aggregatedCustoms.push({
          rule: "Dress Modestly",
          detail: "Avoid sleeveless tops or beachwear when visiting historical or sacred monuments."
        });
      }

      // Determine travel season based on dates
      const startMonth = start.getMonth();
      let season = "spring";
      if (startMonth >= 2 && startMonth <= 4) season = "spring";
      else if (startMonth >= 5 && startMonth <= 7) season = "summer";
      else if (startMonth >= 8 && startMonth <= 10) season = "autumn";
      else season = "winter";

      const weatherInfo = primaryStateData.weatherTemplates?.[season] || {
        temp: "22-32°C",
        condition: "Pleasant Days",
        packing: ["Sunscreen", "Light shirt"]
      };

      const packingList = [
        "Comfortable walking shoes",
        "Sufficient cash (regional shops prefer UPI or cash)",
        ...weatherInfo.packing
      ];
      if (dietary !== "None") {
        packingList.push(`Dietary specification card for "${dietary}"`);
      }

      // Budget Calculations in INR
      let baseDailyCost = 2500;
      let baseFlightCost = 8000;
      if (budgetTier === "Budget") {
        baseDailyCost = 1000;
        baseFlightCost = 3000;
      } else if (budgetTier === "Luxury") {
        baseDailyCost = 8000;
        baseFlightCost = 18000;
      }

      const calculatedStays = baseDailyCost * durationDays;
      const calculatedFlights = baseFlightCost;
      const calculatedFood =
        durationDays * (budgetTier === "Budget" ? 400 : budgetTier === "Comfort" ? 1000 : 3000);
      const calculatedActivities = itinerary.reduce(
        (acc, d) => acc + d.activities.reduce((sum, act) => sum + (act.cost || 0), 0),
        0
      );
      const calculatedTransfers =
        durationDays * (budgetTier === "Budget" ? 200 : budgetTier === "Comfort" ? 600 : 2000);
      const totalSuggestedBudget =
        calculatedStays +
        calculatedFlights +
        calculatedFood +
        calculatedActivities +
        calculatedTransfers;

      const budgetBreakdown = [
        {
          category: "Stays",
          allocated: calculatedStays,
          percentage: Math.round((calculatedStays / totalSuggestedBudget) * 100),
          desc: `${budgetTier} hotel or home stays`
        },
        {
          category: "Flights",
          allocated: calculatedFlights,
          percentage: Math.round((calculatedFlights / totalSuggestedBudget) * 100),
          desc: "Round-trip long distance transit"
        },
        {
          category: "Food & Dining",
          allocated: calculatedFood,
          percentage: Math.round((calculatedFood / totalSuggestedBudget) * 100),
          desc: "Local meals & regional dining trails"
        },
        {
          category: "Activities",
          allocated: calculatedActivities,
          percentage: Math.round((calculatedActivities / totalSuggestedBudget) * 100),
          desc: "Monuments, safaris, and ticket entries"
        },
        {
          category: "Transfers & Transit",
          allocated: calculatedTransfers,
          percentage: Math.round((calculatedTransfers / totalSuggestedBudget) * 100),
          desc: "Local vehicle hire and transit transfers"
        }
      ];

      finalResult = {
        success: true,
        destination:
          sortedPlaces.length > 1
            ? `${sortedPlaces[0].name} - ${sortedPlaces[sortedPlaces.length - 1].name} Tour`
            : sortedPlaces[0].name,
        country: "India",
        currency: "INR (₹)",
        exchangeRate: "Local Currency",
        durationDays,
        safetyScore: primaryStateData.safetyScore || 85,
        visaGuidance:
          primaryStateData.visaGuidance ||
          "Standard Indian domestic tourism rules. Permits needed for border areas.",
        emergencyContacts: aggregatedContacts,
        scams: aggregatedScams,
        customs: aggregatedCustoms,
        weather: {
          season,
          forecast: liveWeatherInfo?.currentCondition || weatherInfo.condition,
          temperature: liveWeatherInfo?.currentTemp !== undefined ? `${liveWeatherInfo.currentTemp}°C` : weatherInfo.temp,
          currentTemp: liveWeatherInfo?.currentTemp || "N/A",
          currentCondition: liveWeatherInfo?.currentCondition || "N/A",
          dailyForecast: liveWeatherInfo?.dailyForecast || [],
          advisory: travelAdvisory
        },
        packingList: packingList.map((item) => ({ name: item, packed: false })),
        itinerary,
        budget: {
          totalLimit: totalSuggestedBudget,
          breakdown: budgetBreakdown
        }
      };
    }

    // --- Enrich Final Output with Scores, Feasibility Engine & Budget Optimization ---
    const totalLimit = finalResult.budget?.totalLimit || 10000;
    const breakdown = finalResult.budget?.breakdown || [];
    
    let budgetFit = 100;
    if (budgetCap) {
      if (totalLimit <= budgetCap) {
        budgetFit = 100;
      } else {
        budgetFit = Math.max(20, Math.round((budgetCap / totalLimit) * 100));
      }
    }

    const tripScore = Math.round(
      routeEfficiency * 0.3 +
      travelFatigue * 0.3 +
      budgetFit * 0.2 +
      destinationCoverage * 0.2
    );

    // Build budget optimization savings suggestions
    const budgetOptimizations = [];
    if (budgetCap && totalLimit > budgetCap) {
      const staysBreakdown = breakdown.find(b => b.category === "Stays")?.allocated || 0;
      const transBreakdown = breakdown.find(b => b.category === "Transfers & Transit")?.allocated || 0;
      const actBreakdown = breakdown.find(b => b.category === "Activities")?.allocated || 0;

      if (durationDays > 3) {
        const dailySavings = Math.round(totalLimit / durationDays);
        budgetOptimizations.push({
          type: "Duration",
          detail: `Reduce trip duration by 1-2 days`,
          savings: dailySavings
        });
      }

      if (budgetTier === "Luxury" || budgetTier === "Comfort") {
        budgetOptimizations.push({
          type: "Accommodation",
          detail: `Downgrade stays to budget hotels or homestays`,
          savings: Math.round(staysBreakdown * 0.4)
        });
        budgetOptimizations.push({
          type: "Transport",
          detail: `Swap private taxis for local buses, trains, or metro lines`,
          savings: Math.round(transBreakdown * 0.5)
        });
      }

      if (selectedPlaces.length > 3) {
        budgetOptimizations.push({
          type: "Sightseeing",
          detail: `Limit visits to high-priority sights (keep 3 sights)`,
          savings: Math.round(actBreakdown * 0.4)
        });
      }
    }

    // Attach enriched parameters
    finalResult.feasibility = {
      feasible,
      travelHours: parseFloat(travelHours.toFixed(1)),
      sightseeingHours,
      totalHours: parseFloat(totalRequiredHours.toFixed(1)),
      recommendedDuration,
      totalDistanceKm: parseFloat(sortedDistance.toFixed(1)),
      unsortedDistanceKm: parseFloat(unsortedDistance.toFixed(1))
    };

    finalResult.scorecard = {
      routeEfficiency,
      travelFatigue,
      budgetFit,
      destinationCoverage,
      tripScore
    };

    finalResult.budgetCap = budgetCap;
    finalResult.budgetOptimizations = budgetOptimizations;
    finalResult.safetyAlert = safetyAlert;

    return NextResponse.json(finalResult);
  } catch (error) {
    console.error("API Error in plan route:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
