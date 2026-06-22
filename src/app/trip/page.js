"use client";

import React, { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

function SharedTripContent() {
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [planData, setPlanData] = useState(null);
  const [originalParams, setOriginalParams] = useState(null);

  const fetchPlan = async (params) => {
    setLoading(true);
    try {
      const res = await fetch("/api/plan", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          startDate: params.startDate,
          endDate: params.endDate,
          tripType: params.tripType || "Solo",
          budgetTier: params.budgetTier || "Comfort",
          interests: params.interests || [],
          dietary: params.dietary || "None",
          specialRequirements: params.specialRequirements || "",
          selectedPlaces: params.selectedPlaces || [],
          budgetCap: params.budgetCap || null
        })
      });

      const data = await res.json();
      if (data.success) {
        setPlanData(data);
      } else {
        setError(data.error || "Failed to generate shared itinerary.");
      }
    } catch (e) {
      console.error(e);
      setError("Error connecting to EasyGo planning services.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const dataHash = searchParams.get("data");
    
    // Defer state updates to next tick to prevent cascading rendering alerts and satisfy hook constraints
    Promise.resolve().then(() => {
      if (!dataHash) {
        setError("No trip data found in this link. Please check the URL.");
        setLoading(false);
        return;
      }

      try {
        // Decode Base64
        const decodedString = atob(dataHash);
        const decodedParams = JSON.parse(decodedString);
        setOriginalParams(decodedParams);

        // Fetch plan from the API
        fetchPlan(decodedParams);
      } catch (e) {
        console.error(e);
        setError("Failed to parse the shared trip. The URL hash may be corrupted.");
        setLoading(false);
      }
    });
  }, [searchParams]);

  if (loading) {
    return (
      <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <div style={{ display: "inline-block", width: "40px", height: "40px", border: "4px solid rgba(124, 58, 237, 0.2)", borderTopColor: "var(--primary)", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
        <h2 style={{ color: "var(--text-primary)", marginTop: "1.5rem" }}>Loading Shared Journey...</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem" }}>Re-optimizing route coordinates and local safety information.</p>
        <style jsx global>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: "6rem 2rem", textAlign: "center" }}>
        <span style={{ fontSize: "3rem" }}>⚠️</span>
        <h2 style={{ color: "var(--text-primary)", marginTop: "1rem" }}>Shared Trip Issue</h2>
        <p style={{ color: "var(--text-secondary)", marginTop: "0.5rem", marginBottom: "2rem" }}>{error}</p>
        <Link href="/" className="btn btn-primary" style={{ padding: "0.6rem 1.4rem", background: "var(--gradient-accent)", border: "none", borderRadius: "8px", color: "white" }}>
          Go to EasyGo Planner
        </Link>
      </div>
    );
  }

  const { scorecard, feasibility, itinerary, destination, weather, budget, scams, customs } = planData;

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "3rem 1.5rem" }}>
      
      {/* Header Banner */}
      <header style={{ 
        background: "var(--gradient-glow)", 
        border: "1px solid var(--card-border-glow)", 
        borderRadius: "16px", 
        padding: "2.5rem", 
        marginBottom: "2.5rem",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "1.5rem"
      }}>
        <div>
          <span style={{ fontSize: "0.8rem", color: "var(--secondary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em" }}>Shared Itinerary via EasyGo</span>
          <h1 style={{ fontSize: "2.5rem", color: "var(--text-primary)", marginTop: "0.5rem", marginBottom: "0.5rem" }}>{destination}</h1>
          <p style={{ color: "var(--text-secondary)" }}>
            📅 {planData.durationDays} Days · Budget Level: {originalParams?.budgetTier} · Mode: {originalParams?.tripType}
          </p>
        </div>
        
        {/* CTA to Import */}
        <div>
          <button 
            onClick={() => {
              if (typeof window !== "undefined") {
                localStorage.setItem("imported_trip_params", JSON.stringify(originalParams));
                window.location.href = "/?import=true";
              }
            }}
            style={{ 
              padding: "0.8rem 1.6rem", 
              background: "var(--gradient-accent)", 
              color: "white", 
              border: "none", 
              borderRadius: "8px", 
              fontWeight: 700, 
              cursor: "pointer",
              boxShadow: "0 4px 15px var(--primary-glow)"
            }}
          >
            Copy & Customize This Trip
          </button>
        </div>
      </header>

      {/* Main Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: "2.5rem", alignItems: "start" }}>
        
        {/* Left Side: Day Wise Itinerary */}
        <div>
          <h2 style={{ fontSize: "1.6rem", color: "var(--text-primary)", marginBottom: "1.5rem" }}>Day-by-Day Journey Path</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {itinerary.map((day) => (
              <div key={day.dayNumber} style={{ borderLeft: "2px solid var(--primary)", paddingLeft: "1.5rem", marginLeft: "0.5rem", position: "relative" }}>
                {/* Dot */}
                <div style={{ position: "absolute", left: "-7px", top: "0", width: "12px", height: "12px", borderRadius: "50%", background: "var(--primary)", border: "2px solid var(--bg-primary)" }} />
                
                <h3 style={{ fontSize: "1.3rem", color: "var(--text-primary)", marginBottom: "1rem" }}>
                  Day {day.dayNumber}: {day.title} <span style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 400 }}>({day.zone})</span>
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {day.activities.map((act) => (
                    <div key={act.id} style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", borderRadius: "10px", padding: "1.2rem" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem", flexWrap: "wrap" }}>
                        <div>
                          <span style={{ fontSize: "0.75rem", color: "var(--secondary)", background: "rgba(6,182,212,0.1)", padding: "0.2rem 0.5rem", borderRadius: "4px", fontWeight: 600 }}>
                            {act.slot} ({act.time}) · {act.category}
                          </span>
                          <h4 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginTop: "0.4rem" }}>{act.name}</h4>
                        </div>
                        <span style={{ fontSize: "0.85rem", color: "var(--text-muted)" }}>
                          🚶 {act.duration}
                        </span>
                      </div>
                      <p style={{ color: "var(--text-secondary)", fontSize: "0.9rem", margin: "0.75rem 0" }}>{act.description}</p>
                      
                      <div style={{ display: "flex", gap: "1.5rem", flexWrap: "wrap", fontSize: "0.8rem", color: "var(--text-muted)", borderTop: "1px solid rgba(255,255,255,0.03)", paddingTop: "0.6rem" }}>
                        <div>🚖 Transport: <strong style={{ color: "var(--text-secondary)" }}>{act.transport}</strong></div>
                        <div>🎫 Entry: <strong style={{ color: "var(--text-secondary)" }}>{act.cost > 0 ? `₹${act.cost}` : "Free"}</strong></div>
                        <div>🍲 Dining Tip: <strong style={{ color: "var(--text-secondary)" }}>{act.foodRecommendation.dish} at {act.foodRecommendation.name}</strong></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Scorecard, Weather, Safety */}
        <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
          
          {/* Trip Scorecard */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1.2rem" }}>Route Analytics & Score</h3>
            
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", textAlign: "center", marginBottom: "1.2rem" }}>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)" }}>Overall Score</span>
                <strong style={{ fontSize: "1.4rem", color: "var(--primary)" }}>{scorecard.tripScore}/100</strong>
              </div>
              <div style={{ padding: "0.75rem", background: "rgba(255,255,255,0.02)", borderRadius: "8px", border: "1px solid var(--card-border)" }}>
                <span style={{ display: "block", fontSize: "0.75rem", color: "var(--text-secondary)" }}>Feasibility</span>
                <strong style={{ fontSize: "1rem", color: feasibility.feasible ? "#10b981" : "#ef4444" }}>
                  {feasibility.feasible ? "High" : "Low Fatigue"}
                </strong>
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.8rem", fontSize: "0.85rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Route Efficiency</span>
                <strong style={{ color: "var(--text-primary)" }}>{scorecard.routeEfficiency}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Fatigue Level</span>
                <strong style={{ color: "var(--text-primary)" }}>{scorecard.travelFatigue}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Budget Alignment</span>
                <strong style={{ color: "var(--text-primary)" }}>{scorecard.budgetFit}%</strong>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "var(--text-secondary)" }}>Total Distance</span>
                <strong style={{ color: "var(--text-primary)" }}>{feasibility.totalDistanceKm} km</strong>
              </div>
            </div>
          </div>

          {/* Budget Breakdown */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Cost Estimate</h3>
            <div style={{ fontSize: "1.8rem", fontWeight: 800, color: "#10b981", marginBottom: "1rem" }}>
              ₹{budget.totalLimit.toLocaleString()}
            </div>
            
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", fontSize: "0.85rem" }}>
              {budget.breakdown.map((item, idx) => (
                <div key={idx} style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "var(--text-secondary)" }}>{item.category}</span>
                  <strong style={{ color: "var(--text-primary)" }}>₹{item.allocated.toLocaleString()}</strong>
                </div>
              ))}
            </div>
          </div>

          {/* Weather */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "0.75rem" }}>Weather Profile</h3>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)" }}>
              Season: <strong style={{ color: "var(--text-primary)", textTransform: "capitalize" }}>{weather.season}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              Condition: <strong style={{ color: "var(--text-primary)" }}>{weather.forecast}</strong>
            </p>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
              Range: <strong style={{ color: "var(--secondary)" }}>{weather.temperature}</strong>
            </p>
          </div>

          {/* Warnings */}
          <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ fontSize: "1.1rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Safety & Customs</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem", fontSize: "0.85rem" }}>
              <div>
                <span style={{ display: "block", color: "#f59e0b", fontWeight: 600, marginBottom: "0.25rem" }}>⚠️ Common Scam Advice:</span>
                <p style={{ color: "var(--text-secondary)" }}>{scams[0]?.description || scams[0]?.name}</p>
              </div>
              <div style={{ borderTop: "1px solid rgba(255,255,255,0.04)", paddingTop: "0.75rem" }}>
                <span style={{ display: "block", color: "var(--secondary)", fontWeight: 600, marginBottom: "0.25rem" }}>🕌 Etiquette Rule:</span>
                <p style={{ color: "var(--text-secondary)" }}><strong>{customs[0]?.rule}:</strong> {customs[0]?.detail}</p>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}

export default function SharedTrip() {
  return (
    <Suspense fallback={
      <div style={{ padding: "8rem 2rem", textAlign: "center" }}>
        <h2 style={{ color: "var(--text-primary)" }}>Loading EasyGo Shared trip...</h2>
      </div>
    }>
      <SharedTripContent />
    </Suspense>
  );
}
