"use client";

import React, { useState } from "react";
import Link from "next/link";
import { destinations as initialDestinations, curatedDestinations as initialCurated } from "@/lib/destinations";

export default function AdminDashboard() {
  const [destinations, setDestinations] = useState(initialDestinations);
  const [curatedDestinations, setCuratedDestinations] = useState(initialCurated);
  const [activeTab, setActiveTab] = useState("states"); // states or curated
  const [selectedStateKey, setSelectedStateKey] = useState("ladakh");
  const [selectedCuratedId, setSelectedCuratedId] = useState("dest-ayodhya");
  const [saveStatus, setSaveStatus] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  // States fields editing handlers
  const handleStateMetaChange = (field, val) => {
    setDestinations((prev) => ({
      ...prev,
      [selectedStateKey]: {
        ...prev[selectedStateKey],
        [field]: val
      }
    }));
  };

  const handleStatePlaceChange = (placeIndex, field, val) => {
    setDestinations((prev) => {
      const places = [...prev[selectedStateKey].touristPlaces];
      places[placeIndex] = {
        ...places[placeIndex],
        [field]: val
      };
      return {
        ...prev,
        [selectedStateKey]: {
          ...prev[selectedStateKey],
          touristPlaces: places
        }
      };
    });
  };

  const handleStatePlaceFoodChange = (placeIndex, field, val) => {
    setDestinations((prev) => {
      const places = [...prev[selectedStateKey].touristPlaces];
      places[placeIndex] = {
        ...places[placeIndex],
        foodRecommendation: {
          ...places[placeIndex].foodRecommendation,
          [field]: val
        }
      };
      return {
        ...prev,
        [selectedStateKey]: {
          ...prev[selectedStateKey],
          touristPlaces: places
        }
      };
    });
  };

  const handleAddStatePlace = () => {
    setDestinations((prev) => {
      const stateObj = prev[selectedStateKey];
      const newPlace = {
        id: `pl-${selectedStateKey}-${Date.now()}`,
        name: "New Attraction",
        category: "Nature",
        description: "Description of the new attraction",
        lat: stateObj.touristPlaces[0]?.lat || 20.0,
        lng: stateObj.touristPlaces[0]?.lng || 77.0,
        recommendedDuration: "2 hours",
        cost: 100,
        isOutdoor: true,
        rainAlternative: "Indoor shelter",
        foodRecommendation: { name: "Local restaurant", dish: "Popular local dish" }
      };
      return {
        ...prev,
        [selectedStateKey]: {
          ...stateObj,
          touristPlaces: [...stateObj.touristPlaces, newPlace]
        }
      };
    });
  };

  const handleRemoveStatePlace = (index) => {
    setDestinations((prev) => {
      const stateObj = prev[selectedStateKey];
      const places = [...stateObj.touristPlaces];
      places.splice(index, 1);
      return {
        ...prev,
        [selectedStateKey]: {
          ...stateObj,
          touristPlaces: places
        }
      };
    });
  };

  // Curated fields editing handlers
  const handleCuratedChange = (field, val) => {
    setCuratedDestinations((prev) => {
      return prev.map((item) => {
        if (item.id === selectedCuratedId) {
          return { ...item, [field]: val };
        }
        return item;
      });
    });
  };

  const handleCuratedHotelChange = (hotelIndex, field, val) => {
    setCuratedDestinations((prev) => {
      return prev.map((item) => {
        if (item.id === selectedCuratedId) {
          const hotels = [...item.hotels];
          hotels[hotelIndex] = { ...hotels[hotelIndex], [field]: val };
          return { ...item, hotels };
        }
        return item;
      });
    });
  };

  const handleCuratedRestaurantChange = (restIndex, field, val) => {
    setCuratedDestinations((prev) => {
      return prev.map((item) => {
        if (item.id === selectedCuratedId) {
          const restaurants = [...item.restaurants];
          restaurants[restIndex] = { ...restaurants[restIndex], [field]: val };
          return { ...item, restaurants };
        }
        return item;
      });
    });
  };

  const handleSaveAll = async () => {
    setIsSaving(true);
    setSaveStatus("Saving changes...");
    try {
      const response = await fetch("/api/admin/save", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ destinations, curatedDestinations })
      });
      const result = await response.json();
      if (result.success) {
        setSaveStatus("Changes saved successfully to database!");
        setTimeout(() => setSaveStatus(""), 4000);
      } else {
        setSaveStatus(`Error saving changes: ${result.error}`);
      }
    } catch (err) {
      console.error(err);
      setSaveStatus("Network error occurred while trying to save.");
    } finally {
      setIsSaving(false);
    }
  };

  const activeState = destinations[selectedStateKey] || { name: "", description: "", touristPlaces: [] };
  const activeCurated = curatedDestinations.find((d) => d.id === selectedCuratedId) || {
    name: "",
    state: "",
    description: "",
    hotels: [],
    restaurants: []
  };

  return (
    <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem 1.5rem" }}>
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem", borderBottom: "1px solid var(--card-border)", paddingBottom: "1rem" }}>
        <div>
          <h1 style={{ fontSize: "2rem", color: "var(--text-primary)", marginBottom: "0.25rem" }}>EasyGo CMS Dashboard</h1>
          <p style={{ color: "var(--text-secondary)", fontSize: "0.95rem" }}>Manage states, tourist attractions, hotels, and restaurant details in real time.</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
          <Link href="/" className="btn btn-secondary" style={{ padding: "0.6rem 1.2rem", borderRadius: "8px", background: "rgba(255, 255, 255, 0.05)", border: "1px solid var(--card-border)", color: "var(--text-primary)" }}>
            ← Back to App
          </Link>
          <button 
            onClick={handleSaveAll} 
            disabled={isSaving}
            className="btn btn-primary"
            style={{ 
              padding: "0.6rem 1.4rem", 
              borderRadius: "8px", 
              background: "var(--gradient-accent)", 
              border: "none", 
              color: "white", 
              fontWeight: 600, 
              cursor: "pointer",
              boxShadow: "0 4px 12px var(--primary-glow)"
            }}
          >
            {isSaving ? "Saving..." : "Save Changes Server-Side"}
          </button>
        </div>
      </header>

      {saveStatus && (
        <div style={{ 
          background: saveStatus.includes("Error") ? "var(--gradient-danger)" : "var(--gradient-success)", 
          padding: "1rem", 
          borderRadius: "8px", 
          marginBottom: "1.5rem", 
          fontWeight: 600, 
          color: "white" 
        }}>
          {saveStatus}
        </div>
      )}

      {/* Tabs */}
      <div style={{ display: "flex", gap: "0.5rem", marginBottom: "2rem" }}>
        <button
          onClick={() => setActiveTab("states")}
          style={{
            padding: "0.75rem 1.5rem",
            background: activeTab === "states" ? "rgba(124, 58, 237, 0.15)" : "transparent",
            border: "1px solid",
            borderColor: activeTab === "states" ? "var(--primary)" : "var(--card-border)",
            borderRadius: "8px",
            color: activeTab === "states" ? "var(--text-primary)" : "var(--text-secondary)",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.2s"
          }}
        >
          State Explorers Database ({Object.keys(destinations).length})
        </button>
        <button
          onClick={() => setActiveTab("curated")}
          style={{
            padding: "0.75rem 1.5rem",
            background: activeTab === "curated" ? "rgba(124, 58, 237, 0.15)" : "transparent",
            border: "1px solid",
            borderColor: activeTab === "curated" ? "var(--primary)" : "var(--card-border)",
            borderRadius: "8px",
            color: activeTab === "curated" ? "var(--text-primary)" : "var(--text-secondary)",
            cursor: "pointer",
            fontWeight: 600,
            transition: "0.2s"
          }}
        >
          Curated Destination Stays & Dining ({curatedDestinations.length})
        </button>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: "2rem" }}>
        
        {/* Left Side: Navigation Lists */}
        <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--card-border)", padding: "1.5rem", borderRadius: "12px", height: "fit-content" }}>
          {activeTab === "states" ? (
            <div>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Select State</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {Object.keys(destinations).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSelectedStateKey(key)}
                    style={{
                      textAlign: "left",
                      padding: "0.6rem 1rem",
                      borderRadius: "6px",
                      background: selectedStateKey === key ? "var(--primary)" : "transparent",
                      border: "none",
                      color: selectedStateKey === key ? "white" : "var(--text-secondary)",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "0.2s"
                    }}
                  >
                    {destinations[key].name}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h3 style={{ marginBottom: "1rem", fontSize: "1.1rem" }}>Select Destination</h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {curatedDestinations.map((cd) => (
                  <button
                    key={cd.id}
                    onClick={() => setSelectedCuratedId(cd.id)}
                    style={{
                      textAlign: "left",
                      padding: "0.6rem 1rem",
                      borderRadius: "6px",
                      background: selectedCuratedId === cd.id ? "var(--primary)" : "transparent",
                      border: "none",
                      color: selectedCuratedId === cd.id ? "white" : "var(--text-secondary)",
                      cursor: "pointer",
                      fontWeight: 500,
                      transition: "0.2s"
                    }}
                  >
                    {cd.name} ({cd.state})
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Form details editing */}
        <div style={{ background: "var(--card-bg)", border: "1px solid var(--card-border)", padding: "2rem", borderRadius: "12px", backdropFilter: "blur(10px)" }}>
          
          {activeTab === "states" ? (
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Editing State: <span style={{ color: "var(--secondary)" }}>{activeState.name}</span>
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>State Display Name</label>
                  <input
                    type="text"
                    value={activeState.name || ""}
                    onChange={(e) => handleStateMetaChange("name", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Safety Rating (1-100)</label>
                  <input
                    type="number"
                    value={activeState.safetyScore || 80}
                    onChange={(e) => handleStateMetaChange("safetyScore", parseInt(e.target.value, 10))}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>State Description</label>
                <textarea
                  value={activeState.description || ""}
                  onChange={(e) => handleStateMetaChange("description", e.target.value)}
                  rows={3}
                  style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white", resize: "vertical" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Visa & Permit Advice</label>
                  <input
                    type="text"
                    value={activeState.visaGuidance || ""}
                    onChange={(e) => handleStateMetaChange("visaGuidance", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>State Image Banner URL</label>
                  <input
                    type="text"
                    value={activeState.image || ""}
                    onChange={(e) => handleStateMetaChange("image", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Title Override</label>
                  <input
                    type="text"
                    value={activeState.seoTitle || ""}
                    onChange={(e) => handleStateMetaChange("seoTitle", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Description Override</label>
                  <input
                    type="text"
                    value={activeState.seoDescription || ""}
                    onChange={(e) => handleStateMetaChange("seoDescription", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Keywords</label>
                  <input
                    type="text"
                    value={activeState.seoKeywords || ""}
                    onChange={(e) => handleStateMetaChange("seoKeywords", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              {/* Tourist places section */}
              <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem" }}>
                  <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)" }}>Attractions & Sightseeing Spots ({activeState.touristPlaces?.length || 0})</h3>
                  <button
                    onClick={handleAddStatePlace}
                    style={{ padding: "0.5rem 1rem", background: "var(--secondary)", border: "none", color: "white", borderRadius: "6px", cursor: "pointer", fontWeight: 600 }}
                  >
                    + Add Attraction
                  </button>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
                  {activeState.touristPlaces?.map((place, idx) => (
                    <div key={place.id} style={{ padding: "1.5rem", background: "rgba(255,255,255,0.02)", border: "1px solid var(--card-border)", borderRadius: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
                        <span style={{ fontWeight: 600, color: "var(--secondary)" }}>#{idx + 1}: {place.name}</span>
                        <button
                          onClick={() => handleRemoveStatePlace(idx)}
                          style={{ background: "transparent", border: "none", color: "#ef4444", cursor: "pointer", fontWeight: 600 }}
                        >
                          Delete
                        </button>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Name</label>
                          <input
                            type="text"
                            value={place.name}
                            onChange={(e) => handleStatePlaceChange(idx, "name", e.target.value)}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Category (Heritage/Adventure/Nature/Spiritual/Food/Wildlife)</label>
                          <input
                            type="text"
                            value={place.category}
                            onChange={(e) => handleStatePlaceChange(idx, "category", e.target.value)}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Latitude</label>
                          <input
                            type="number"
                            step="any"
                            value={place.lat}
                            onChange={(e) => handleStatePlaceChange(idx, "lat", parseFloat(e.target.value))}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Longitude</label>
                          <input
                            type="number"
                            step="any"
                            value={place.lng}
                            onChange={(e) => handleStatePlaceChange(idx, "lng", parseFloat(e.target.value))}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                      </div>

                      <div style={{ marginBottom: "1rem" }}>
                        <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Description</label>
                        <textarea
                          value={place.description}
                          onChange={(e) => handleStatePlaceChange(idx, "description", e.target.value)}
                          rows={2}
                          style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                        />
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Recommended Duration</label>
                          <input
                            type="text"
                            value={place.recommendedDuration}
                            onChange={(e) => handleStatePlaceChange(idx, "recommendedDuration", e.target.value)}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Approx Entry Ticket Cost (INR)</label>
                          <input
                            type="number"
                            value={place.cost}
                            onChange={(e) => handleStatePlaceChange(idx, "cost", parseInt(e.target.value, 10))}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                      </div>

                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Is Outdoor attraction?</label>
                          <select
                            value={place.isOutdoor ? "yes" : "no"}
                            onChange={(e) => handleStatePlaceChange(idx, "isOutdoor", e.target.value === "yes")}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          >
                            <option value="yes">Yes</option>
                            <option value="no">No</option>
                          </select>
                        </div>
                        <div>
                          <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>Rainy Weather Alternative</label>
                          <input
                            type="text"
                            value={place.rainAlternative}
                            onChange={(e) => handleStatePlaceChange(idx, "rainAlternative", e.target.value)}
                            style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                          />
                        </div>
                      </div>

                      {/* Food rec */}
                      <div style={{ borderTop: "1px dashed rgba(255,255,255,0.06)", paddingTop: "1rem", marginTop: "1rem" }}>
                        <span style={{ fontSize: "0.85rem", fontWeight: 600, color: "var(--text-secondary)" }}>Food Proximity Recommendations</span>
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginTop: "0.5rem" }}>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>Restaurant Name</label>
                            <input
                              type="text"
                              value={place.foodRecommendation?.name || ""}
                              onChange={(e) => handleStatePlaceFoodChange(idx, "name", e.target.value)}
                              style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                            />
                          </div>
                          <div>
                            <label style={{ display: "block", marginBottom: "0.25rem", fontSize: "0.8rem", color: "var(--text-muted)" }}>Must Try Dish</label>
                            <input
                              type="text"
                              value={place.foodRecommendation?.dish || ""}
                              onChange={(e) => handleStatePlaceFoodChange(idx, "dish", e.target.value)}
                              style={{ width: "100%", padding: "0.5rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white" }}
                            />
                          </div>
                        </div>
                      </div>

                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                Editing Curated Destination: <span style={{ color: "var(--secondary)" }}>{activeCurated.name}</span>
              </h2>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Destination Name</label>
                  <input
                    type="text"
                    value={activeCurated.name || ""}
                    onChange={(e) => handleCuratedChange("name", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>State Name</label>
                  <input
                    type="text"
                    value={activeCurated.state || ""}
                    onChange={(e) => handleCuratedChange("state", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Description</label>
                  <textarea
                    value={activeCurated.description || ""}
                    onChange={(e) => handleCuratedChange("description", e.target.value)}
                    rows={3}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white", resize: "vertical" }}
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>Destination Image Banner URL</label>
                  <input
                    type="text"
                    value={activeCurated.image || ""}
                    onChange={(e) => handleCuratedChange("image", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "1rem", marginBottom: "2rem" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Title Override</label>
                  <input
                    type="text"
                    value={activeCurated.seoTitle || ""}
                    onChange={(e) => handleCuratedChange("seoTitle", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Description Override</label>
                  <input
                    type="text"
                    value={activeCurated.seoDescription || ""}
                    onChange={(e) => handleCuratedChange("seoDescription", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "0.5rem", fontWeight: 500, fontSize: "0.9rem", color: "var(--text-secondary)" }}>SEO Keywords</label>
                  <input
                    type="text"
                    value={activeCurated.seoKeywords || ""}
                    onChange={(e) => handleCuratedChange("seoKeywords", e.target.value)}
                    style={{ width: "100%", padding: "0.75rem", background: "rgba(0,0,0,0.2)", border: "1px solid var(--card-border)", borderRadius: "6px", color: "white" }}
                  />
                </div>
              </div>

              {/* Hotels List */}
              <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem", marginBottom: "2rem" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Curated Hotels ({activeCurated.hotels?.length || 0})</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {activeCurated.hotels?.map((hotel, idx) => (
                    <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "6px" }}>
                      <span style={{ fontWeight: 600, color: "var(--secondary)", fontSize: "0.9rem" }}>Hotel #{idx + 1}</span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Hotel Name</label>
                          <input
                            type="text"
                            value={hotel.name}
                            onChange={(e) => handleCuratedHotelChange(idx, "name", e.target.value)}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Type (Hotel/Resort/Hostel)</label>
                          <input
                            type="text"
                            value={hotel.type}
                            onChange={(e) => handleCuratedHotelChange(idx, "type", e.target.value)}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Budget (Budget/Standard/Luxury)</label>
                          <input
                            type="text"
                            value={hotel.budgetTier}
                            onChange={(e) => handleCuratedHotelChange(idx, "budgetTier", e.target.value)}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Restaurants List */}
              <div style={{ borderTop: "1px solid var(--card-border)", paddingTop: "1.5rem" }}>
                <h3 style={{ fontSize: "1.2rem", color: "var(--text-primary)", marginBottom: "1rem" }}>Curated Dining ({activeCurated.restaurants?.length || 0})</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {activeCurated.restaurants?.map((rest, idx) => (
                    <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid var(--card-border)", borderRadius: "6px" }}>
                      <span style={{ fontWeight: 600, color: "var(--secondary)", fontSize: "0.9rem" }}>Restaurant #{idx + 1}</span>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.75rem", marginTop: "0.5rem" }}>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Name</label>
                          <input
                            type="text"
                            value={rest.name}
                            onChange={(e) => handleCuratedRestaurantChange(idx, "name", e.target.value)}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Rating (1-5)</label>
                          <input
                            type="number"
                            step="0.1"
                            value={rest.rating}
                            onChange={(e) => handleCuratedRestaurantChange(idx, "rating", parseFloat(e.target.value))}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                        <div>
                          <label style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>Price tier ($, $$, $$$)</label>
                          <input
                            type="text"
                            value={rest.priceTier}
                            onChange={(e) => handleCuratedRestaurantChange(idx, "priceTier", e.target.value)}
                            style={{ width: "100%", padding: "0.4rem", background: "rgba(0,0,0,0.3)", border: "1px solid var(--card-border)", borderRadius: "4px", color: "white", fontSize: "0.85rem" }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
}
