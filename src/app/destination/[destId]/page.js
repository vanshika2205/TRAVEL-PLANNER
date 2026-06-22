import React from "react";
import Link from "next/link";
import { destinations, curatedDestinations } from "@/lib/destinations";

// Flatten function to find destination details
function getPlaceById(id) {
  // Check curatedDestinations first
  const curatedMatch = curatedDestinations.find(cd => cd.id === id);
  if (curatedMatch) {
    return {
      ...curatedMatch,
      isCurated: true,
      stateName: curatedMatch.state,
      stateKey: curatedMatch.state.toLowerCase().replace(/[^a-z]/g, "")
    };
  }

  // Check state databases
  for (const sKey of Object.keys(destinations)) {
    const stateObj = destinations[sKey];
    const placeMatch = stateObj.touristPlaces.find(p => p.id === id);
    if (placeMatch) {
      return {
        ...placeMatch,
        isCurated: false,
        stateName: stateObj.name,
        stateKey: sKey,
        safetyScore: stateObj.safetyScore,
        emergencyContacts: stateObj.emergencyContacts,
        customsList: stateObj.customs,
        scamsList: stateObj.scams
      };
    }
  }

  return null;
}

export async function generateMetadata({ params }) {
  const { destId } = params;
  const place = getPlaceById(destId);

  if (!place) {
    return {
      title: "Destination Guide | EasyGo",
      description: "Explore tourist spots across India with EasyGo's dynamic itinerary planner."
    };
  }

  return {
    title: `${place.name} Guide - Sightseeing, Hotels & Tips in ${place.stateName} | EasyGo`,
    description: `Comprehensive travel advice for ${place.name} (${place.category}) in ${place.stateName}. Duration: ${place.recommendedDuration}. Read safety tips, local dining, custom rules, and nearby links.`
  };
}

export default async function DestinationProfile({ params }) {
  const { destId } = params;
  const place = getPlaceById(destId);

  if (!place) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--text-primary)" }}>Destination Not Found</h1>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>The requested attraction could not be found in our database.</p>
        <Link href="/" className="btn btn-primary" style={{ padding: "0.6rem 1.2rem", background: "var(--gradient-accent)", border: "none", borderRadius: "8px", color: "white" }}>
          Back to Planner
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <header style={{ marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem", flexWrap: "wrap" }}>
          <Link href="/" style={{ color: "var(--secondary)", fontWeight: 500, fontSize: "0.95rem" }}>
            ← EasyGo Planner
          </Link>
          <span style={{ color: "var(--text-muted)" }}>/</span>
          <Link href={`/state/${place.stateKey}`} style={{ color: "var(--secondary)", fontWeight: 500, fontSize: "0.95rem" }}>
            {place.stateName} Hub
          </Link>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem" }}>
          <div>
            <span style={{ fontSize: "0.75rem", background: "rgba(124, 58, 237, 0.15)", color: "var(--primary)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontWeight: 600, textTransform: "uppercase" }}>
              {place.category}
            </span>
            <h1 style={{ fontSize: "2.8rem", color: "var(--text-primary)", marginTop: "0.5rem" }}>{place.name}</h1>
          </div>
          {place.lat && place.lng && (
            <div style={{ textAlign: "right" }}>
              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Coordinates</span>
              <code style={{ fontSize: "0.9rem", color: "var(--secondary)" }}>{place.lat.toFixed(4)}° N, {place.lng.toFixed(4)}° E</code>
            </div>
          )}
        </div>

        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "1rem" }}>{place.description}</p>
      </header>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1.8fr 1fr", gap: "2.5rem", alignItems: "start" }}>
        
        {/* Left column: Stay, Dining, and details */}
        <div>
          {/* Quick facts list */}
          <div style={{ background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem", marginBottom: "2rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.2rem" }}>
            <div>
              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Suggested Time Required</span>
              <strong style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>⏱️ {place.recommendedDuration || "3 hours"}</strong>
            </div>
            <div>
              <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Monuments Entry Cost</span>
              <strong style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>🎫 {place.cost > 0 ? `₹${place.cost}` : "Free Entry"}</strong>
            </div>
            {place.transport && (
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Best Local Transport</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>🛺 {place.transport}</strong>
              </div>
            )}
            {place.foodRecommendation && (
              <div>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)" }}>Must Try Dish</span>
                <strong style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>🍲 {place.foodRecommendation.dish}</strong>
              </div>
            )}
          </div>

          {place.isCurated ? (
            <div>
              {/* Curated Stays list */}
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
                Curated Stays & Hotels in {place.name}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", marginBottom: "2rem" }}>
                {place.hotels?.map((hotel, idx) => (
                  <div key={idx} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "10px", padding: "1.2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>🏨 {hotel.name}</h4>
                      <span style={{ fontSize: "0.75rem", background: "rgba(124,58,237,0.15)", color: "var(--primary)", padding: "0.2rem 0.5rem", borderRadius: "4px" }}>
                        {hotel.budgetTier} Tier
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      Rating: ⭐ {hotel.rating}/5 | Type: {hotel.type} | Features: {hotel.features?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>

              {/* Curated Dining list */}
              <h2 style={{ fontSize: "1.4rem", color: "var(--text-primary)", marginBottom: "1rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
                Curated Dining & Food Spots
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {place.restaurants?.map((rest, idx) => (
                  <div key={idx} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "10px", padding: "1.2rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)" }}>🍽️ {rest.name}</h4>
                      <span style={{ fontSize: "0.85rem", color: "var(--secondary)" }}>
                        {rest.priceTier} Rating: ⭐ {rest.rating}
                      </span>
                    </div>
                    <p style={{ fontSize: "0.85rem", color: "var(--text-secondary)", marginTop: "0.5rem" }}>
                      Tags: {rest.tags?.join(", ")}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              {/* Rain advice for standard places */}
              <div style={{ background: "rgba(6, 182, 212, 0.05)", border: "1px dashed rgba(6, 182, 212, 0.2)", borderRadius: "10px", padding: "1.2rem", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--secondary)", marginBottom: "0.5rem" }}>🌧️ Weather Advisory (Rain Alternative)</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                  If weather conditions degrade or heavy rains disrupt outdoor activities, the recommended shelter option is: <strong>{place.rainAlternative}</strong>.
                </p>
              </div>

              <div style={{ background: "rgba(124, 58, 237, 0.05)", border: "1px dashed rgba(124, 58, 237, 0.2)", borderRadius: "10px", padding: "1.2rem" }}>
                <h3 style={{ fontSize: "1.1rem", color: "var(--primary)", marginBottom: "0.5rem" }}>🍲 Local Recommended Cafe & Dish</h3>
                <p style={{ fontSize: "0.95rem", color: "var(--text-secondary)" }}>
                  When visiting this attraction, stop at <strong>{place.foodRecommendation.name}</strong> to try their famous local dish <strong>{place.foodRecommendation.dish}</strong>.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Right column: Customs, safety, safety ratings, neighbors */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Proximity / Neighbors */}
          {place.peopleAlsoVisit && (
            <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>People Also Visit</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {place.peopleAlsoVisit.map((nbId) => {
                  const nbPlace = getPlaceById(nbId);
                  if (!nbPlace) return null;
                  return (
                    <Link 
                      key={nbId} 
                      href={`/destination/${nbId}`}
                      style={{ 
                        display: "block", 
                        padding: "0.75rem", 
                        borderRadius: "8px", 
                        background: "rgba(255,255,255,0.02)", 
                        border: "1px solid var(--card-border)",
                        fontSize: "0.9rem" 
                      }}
                    >
                      <strong style={{ color: "var(--text-primary)", display: "block" }}>{nbPlace.name}</strong>
                      <span style={{ fontSize: "0.75rem", color: "var(--text-secondary)" }}>{nbPlace.category} · {nbPlace.stateName}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}

          {/* Local Customs & scams */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Safety & Etiquette</h3>
            
            {place.customs && (
              <div style={{ marginBottom: "1.2rem" }}>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Etiquette</span>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{place.customs}</p>
              </div>
            )}

            {place.scams && (
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
                <span style={{ display: "block", fontSize: "0.8rem", color: "#f59e0b", textTransform: "uppercase", marginBottom: "0.25rem" }}>⚠️ Common Scam Alert</span>
                <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>{place.scams}</p>
              </div>
            )}

            {/* If standard place, list its state's general advice */}
            {!place.isCurated && (
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                {place.customsList && place.customsList.length > 0 && (
                  <div>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "0.25rem" }}>Local Custom</span>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}><strong>{place.customsList[0].rule}:</strong> {place.customsList[0].detail}</p>
                  </div>
                )}
                {place.scamsList && place.scamsList.length > 0 && (
                  <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "1rem" }}>
                    <span style={{ display: "block", fontSize: "0.8rem", color: "#f59e0b", textTransform: "uppercase", marginBottom: "0.25rem" }}>⚠️ State Scam Warning</span>
                    <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}><strong>{place.scamsList[0].name}:</strong> {place.scamsList[0].description}</p>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Back button */}
          <Link href="/" className="btn btn-secondary" style={{ padding: "0.75rem", display: "block", textAlign: "center", border: "1px solid var(--card-border)", borderRadius: "8px", background: "rgba(255,255,255,0.02)", color: "var(--text-primary)", fontWeight: 600 }}>
            Back to Journey Planner
          </Link>

        </div>

      </div>
    </div>
  );
}
