import Link from "next/link";
import { destinations } from "@/lib/destinations";

// Decode helper
function decodeTripData(slug) {
  try {
    const jsonStr = decodeURIComponent(escape(atob(slug)));
    return JSON.parse(jsonStr);
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const tripData = decodeTripData(slug);

  if (!tripData || !tripData.selectedPlaces || tripData.selectedPlaces.length === 0) {
    return {
      title: "Shared Trip | EasyGo",
      description: "Curated travel plans shared via EasyGo."
    };
  }

  const primaryPlace = tripData.selectedPlaces[0].name;
  const routeString = tripData.selectedPlaces.map(p => p.name).join(" ➔ ");

  return {
    title: `Shared Trip: ${primaryPlace} Journey Plan | EasyGo`,
    description: `Check out this customized, route-optimized itinerary for: ${routeString}. Planned with EasyGo.`,
    keywords: [primaryPlace, "shared itinerary", "travel planning", "route optimizer"],
    openGraph: {
      title: `Shared Travel Plan to ${primaryPlace} | EasyGo`,
      description: `Curated route sequence: ${routeString}. Open to import this trip.`,
      type: "website"
    }
  };
}

export default async function SharedTripPage({ params }) {
  const { slug } = await params;
  const tripData = decodeTripData(slug);

  if (!tripData || !tripData.selectedPlaces || tripData.selectedPlaces.length === 0) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "100vh", background: "#07090e", color: "#f3f4f6" }}>
        <h1 style={{ fontSize: "2rem" }}>Invalid Shared Trip Link</h1>
        <p style={{ color: "#9ca3af", margin: "1rem 0" }}>The travel configuration could not be loaded.</p>
        <Link href="/" style={{ color: "#06b6d4", textDecoration: "underline" }}>Go to EasyGo Home</Link>
      </div>
    );
  }

  const routeString = tripData.selectedPlaces.map(p => p.name).join(" ➔ ");
  const primaryPlace = tripData.selectedPlaces[0].name;

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristRoute",
    "name": `Shared Journey to ${primaryPlace}`,
    "description": `Custom travel route including: ${routeString}`,
    "itinerary": tripData.selectedPlaces.map((p, idx) => ({
      "@type": "HowToStep",
      "position": idx + 1,
      "name": `Stop ${idx + 1}: ${p.name}`,
      "itemListElement": {
        "@type": "TouristAttraction",
        "name": p.name,
        "address": `${p.city || p.name}, ${p.state || "India"}`
      }
    }))
  };

  return (
    <div style={{ background: "#07090e", color: "#f3f4f6", minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", fontFamily: "sans-serif", padding: "2rem", textAlign: "center" }}>
      {/* JSON-LD for Search Engine */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Auto-import client script */}
      <script
        dangerouslySetInnerHTML={{
          __html: `
            try {
              localStorage.setItem("imported_trip_params", JSON.stringify(${JSON.stringify(tripData)}));
              window.location.href = "/";
            } catch(e) {
              console.error("Auto import redirection failed:", e);
            }
          `
        }}
      />

      <div style={{ maxWidth: "600px", background: "rgba(16,22,36,0.65)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "16px", padding: "3rem 2rem", boxShadow: "0 10px 25px rgba(0,0,0,0.5)" }}>
        <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🧳</span>
        <h1 style={{ fontSize: "1.75rem", fontWeight: "bold", marginBottom: "1rem" }}>Shared Travel Plan Found!</h1>
        <p style={{ color: "#9ca3af", fontSize: "0.95rem", lineHeight: "1.6", marginBottom: "1.5rem" }}>
          You have been shared a customized route plan to <strong>{primaryPlace}</strong>.
        </p>

        <div style={{ background: "rgba(0,0,0,0.2)", padding: "1rem", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.04)", margin: "1.5rem 0", textAlign: "left" }}>
          <div style={{ fontSize: "0.8rem", color: "#06b6d4", fontWeight: "bold", textTransform: "uppercase", marginBottom: "0.25rem" }}>Travel Route Sequence:</div>
          <div style={{ color: "white", fontSize: "0.95rem", fontWeight: "600" }}>{routeString}</div>
          <div style={{ display: "flex", gap: "1rem", marginTop: "0.85rem", fontSize: "0.8rem", color: "#9ca3af" }}>
            <div>Style: <strong>{tripData.budgetTier}</strong></div>
            <div>Travelers: <strong>{tripData.tripType}</strong></div>
            {tripData.budgetCap && <div>Cap: <strong>₹{tripData.budgetCap}</strong></div>}
          </div>
        </div>

        <p style={{ color: "#6b7280", fontSize: "0.8rem", marginBottom: "2rem" }}>
          Redirecting you to the interactive dashboard... If you are not redirected automatically, click the button below.
        </p>

        <Link href="/" style={{ display: "inline-block", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", color: "white", padding: "0.8rem 2rem", borderRadius: "8px", fontWeight: "bold", textDecoration: "none", boxShadow: "0 4px 15px rgba(124, 58, 237, 0.3)" }}>
          Open Shared Plan
        </Link>
      </div>
    </div>
  );
}
