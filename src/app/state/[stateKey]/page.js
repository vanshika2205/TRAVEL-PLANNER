import React from "react";
import Link from "next/link";
import { destinations } from "@/lib/destinations";

export async function generateMetadata({ params }) {
  const { stateKey } = params;
  const stateData = destinations[stateKey?.toLowerCase()];
  if (!stateData) {
    return {
      title: "State Travel Profile | EasyGo",
      description: "Discover beautiful travel destinations across India with EasyGo's AI-enabled travel platform."
    };
  }
  return {
    title: `Travel to ${stateData.name} - Attractions, Safety & Guides | EasyGo`,
    description: `Complete travel guide for ${stateData.name}. Safety Rating: ${stateData.safetyScore}/100. Key sights include ${stateData.touristPlaces.slice(0, 3).map(p => p.name).join(", ")}. Plan your custom itinerary today.`
  };
}

export default async function StateProfile({ params }) {
  const { stateKey } = params;
  const stateData = destinations[stateKey?.toLowerCase()];

  if (!stateData) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center" }}>
        <h1 style={{ fontSize: "2rem", color: "var(--text-primary)" }}>State Not Found</h1>
        <p style={{ color: "var(--text-secondary)", margin: "1rem 0 2rem" }}>The state profile requested could not be resolved in the EasyGo directory.</p>
        <Link href="/" className="btn btn-primary" style={{ padding: "0.6rem 1.2rem", background: "var(--gradient-accent)", border: "none", borderRadius: "8px", color: "white" }}>
          Return Home
        </Link>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: "1000px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      <header style={{ marginBottom: "2.5rem" }}>
        <Link href="/" style={{ color: "var(--secondary)", fontWeight: 500, fontSize: "0.95rem", display: "inline-flex", alignItems: "center", gap: "0.4rem", marginBottom: "1rem" }}>
          ← Back to EasyGo Planner
        </Link>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
          <div>
            <span style={{ fontSize: "0.85rem", textTransform: "uppercase", letterSpacing: "0.1em", color: "var(--secondary)", fontWeight: 600 }}>Destination Hub</span>
            <h1 style={{ fontSize: "2.8rem", color: "var(--text-primary)", marginTop: "0.25rem", marginBottom: "0.75rem" }}>{stateData.name}</h1>
          </div>
          <div style={{ background: "rgba(124, 58, 237, 0.1)", border: "1px solid rgba(124, 58, 237, 0.2)", borderRadius: "12px", padding: "0.8rem 1.2rem", textAlign: "center" }}>
            <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)", textTransform: "uppercase" }}>Safety Score</span>
            <span style={{ fontSize: "1.8rem", fontWeight: 800, color: "var(--primary)", lineHeight: "1.2" }}>{stateData.safetyScore}%</span>
          </div>
        </div>
        <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", lineHeight: "1.6", marginTop: "1rem", maxWidth: "800px" }}>{stateData.description}</p>
      </header>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2.5rem", alignItems: "start" }}>
        
        {/* Left Side: Attractions */}
        <div>
          <h2 style={{ fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "1.5rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "0.5rem" }}>
            Top Attractions in {stateData.name}
          </h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {stateData.touristPlaces.map((place) => (
              <div 
                key={place.id}
                style={{ 
                  background: "var(--card-bg)", 
                  border: "1px solid var(--card-border)", 
                  borderRadius: "12px", 
                  padding: "1.5rem", 
                  backdropFilter: "blur(8px)" 
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", marginBottom: "0.75rem" }}>
                  <div>
                    <span style={{ fontSize: "0.75rem", background: "rgba(6, 182, 212, 0.1)", color: "var(--secondary)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                      {place.category}
                    </span>
                    <h3 style={{ fontSize: "1.25rem", color: "var(--text-primary)", marginTop: "0.4rem" }}>{place.name}</h3>
                  </div>
                  <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
                    ⏱️ {place.recommendedDuration}
                  </span>
                </div>
                <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem", lineHeight: "1.5", marginBottom: "1rem" }}>{place.description}</p>
                
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1.5rem", fontSize: "0.85rem", color: "var(--text-muted)", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "0.75rem" }}>
                  <div>🎫 Entry: <strong style={{ color: "var(--text-secondary)" }}>{place.cost > 0 ? `₹${place.cost}` : "Free"}</strong></div>
                  <div>🌧️ Rain Alternative: <strong style={{ color: "var(--text-secondary)" }}>{place.rainAlternative}</strong></div>
                  <div>🍲 Best Dish: <strong style={{ color: "var(--text-secondary)" }}>{place.foodRecommendation.dish} ({place.foodRecommendation.name})</strong></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Travel Packs / Sidebar Info */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Quick Guidance Box */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Local Rules & Customs</h3>
            <ul style={{ paddingLeft: "1.25rem", color: "var(--text-secondary)", fontSize: "0.9rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {stateData.customs?.map((c, idx) => (
                <li key={idx}>
                  <strong style={{ color: "var(--text-primary)" }}>{c.rule}:</strong> {c.detail}
                </li>
              ))}
            </ul>
          </div>

          {/* Packing Basics */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Packing Basics</h3>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
              {stateData.packingBasics?.map((item, idx) => (
                <span key={idx} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid var(--card-border)", padding: "0.3rem 0.6rem", borderRadius: "6px", fontSize: "0.85rem", color: "var(--text-secondary)" }}>
                  🎒 {item}
                </span>
              ))}
            </div>
          </div>

          {/* Seasons */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Weather Seasons</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
              {Object.keys(stateData.weatherTemplates || {}).map((season) => {
                const w = stateData.weatherTemplates[season];
                return (
                  <div key={season} style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px dashed rgba(255,255,255,0.03)", paddingBottom: "0.5rem" }}>
                    <span style={{ textTransform: "capitalize", fontWeight: 600, color: "var(--text-secondary)" }}>{season}</span>
                    <span style={{ textAlign: "right", color: "var(--text-muted)" }}>
                      <span style={{ color: "var(--secondary)", display: "block" }}>{w.temp}</span>
                      {w.condition}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Contacts */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Emergency Support</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", fontSize: "0.9rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Police Help</span>
                <strong style={{ color: "#ef4444" }}>{stateData.emergencyContacts.police}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Ambulance Help</span>
                <strong style={{ color: "#ef4444" }}>{stateData.emergencyContacts.ambulance}</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Tourist Helpline</span>
                <strong style={{ color: "var(--secondary)" }}>{stateData.emergencyContacts.touristSupport}</strong>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
