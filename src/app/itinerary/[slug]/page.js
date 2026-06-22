import Link from "next/link";
import { destinations } from "@/lib/destinations";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const stateKey = slug.toLowerCase();
  const stateData = destinations[stateKey];

  if (!stateData) {
    return {
      title: "Itinerary Not Found | EasyGo",
      description: "Discover curated travel plans across India."
    };
  }

  return {
    title: `${stateData.name} Curated Itinerary & Route Plan | EasyGo`,
    description: `${stateData.description} Explore attractions, culture, and safety advisories for ${stateData.name}.`,
    keywords: [stateData.name, "travel itinerary", "route optimizer", ...(stateData.festivals || [])],
    openGraph: {
      title: `${stateData.name} Travel Itinerary | EasyGo`,
      description: stateData.description,
      images: [{ url: stateData.image }],
      type: "website"
    }
  };
}

export default async function ItineraryPage({ params }) {
  const { slug } = await params;
  const stateKey = slug.toLowerCase();
  const stateData = destinations[stateKey];

  if (!stateData) {
    return (
      <div style={{ padding: "4rem 2rem", textAlign: "center", minHeight: "100vh", background: "#07090e", color: "#f3f4f6" }}>
        <h1 style={{ fontSize: "2rem" }}>Itinerary Not Found</h1>
        <p style={{ color: "#9ca3af", margin: "1rem 0" }}>{"We couldn't find a travel plan matching this region."}</p>
        <Link href="/" style={{ color: "#06b6d4", textDecoration: "underline" }}>Return to Home</Link>
      </div>
    );
  }

  // Create a deterministic 3-day split of tourist places
  const places = stateData.touristPlaces || [];
  const days = [
    { number: 1, title: "Arrival & Core Heritage Sights", activities: places.slice(0, 3) },
    { number: 2, title: "Nature & Local Adventure Trails", activities: places.slice(3, 6) },
    { number: 3, title: "Cultural Exploration & Hidden Gems", activities: places.slice(6, 9) }
  ].filter(d => d.activities.length > 0);

  // JSON-LD Structured Data
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "TouristRoute",
    "name": `${stateData.name} Curated Route Plan`,
    "description": stateData.description,
    "itinerary": days.map(d => ({
      "@type": "HowToStep",
      "name": `Day ${d.number}: ${d.title}`,
      "itemListElement": d.activities.map((a, idx) => ({
        "@type": "TouristAttraction",
        "name": a.name,
        "description": a.description
      }))
    }))
  };

  return (
    <div style={{ background: "#07090e", color: "#f3f4f6", minHeight: "100vh", fontFamily: "sans-serif" }}>
      {/* JSON-LD Structured Data Card */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Navigation Header */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "1rem 2rem", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", position: "sticky", top: 0, zIndex: 100 }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <div style={{ background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", width: "32px", height: "32px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", color: "white", fontWeight: "bold" }}>E</div>
          <span style={{ fontSize: "1.2rem", fontWeight: "bold", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>EasyGo</span>
        </Link>
        <Link href={`/?state=${stateKey}`} style={{ background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", color: "white", padding: "0.5rem 1rem", borderRadius: "6px", fontWeight: "bold", textDecoration: "none" }}>
          Customize on Planner
        </Link>
      </header>

      {/* Image Banner */}
      <div style={{ height: "350px", backgroundImage: `url(${stateData.image})`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "100%", background: "linear-gradient(to top, #07090e 0%, rgba(7,9,14,0.4) 60%, transparent 100%)", display: "flex", alignItems: "flex-end", padding: "2rem" }}>
          <div style={{ maxWidth: "800px" }}>
            <span style={{ textTransform: "uppercase", fontSize: "0.75rem", letterSpacing: "0.1em", color: "#06b6d4", fontWeight: "bold", border: "1px solid rgba(6,182,212,0.3)", padding: "0.25rem 0.5rem", borderRadius: "4px", background: "rgba(6,182,212,0.1)" }}>Curated Itinerary</span>
            <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginTop: "0.5rem", textShadow: "0 2px 4px rgba(0,0,0,0.5)", color: "white" }}>{stateData.name}</h1>
            <p style={{ color: "#9ca3af", fontSize: "1.1rem", marginTop: "0.5rem" }}>{stateData.description}</p>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem", display: "grid", gridTemplateColumns: "2fr 1fr", gap: "2.5rem" }}>
        {/* Left Column: Itinerary timeline */}
        <div>
          <h2 style={{ fontSize: "1.5rem", marginBottom: "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.06)", paddingBottom: "0.5rem", color: "white" }}>📅 Day-by-Day Timeline</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
            {days.map(d => (
              <div key={d.number} style={{ background: "rgba(16,22,36,0.65)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
                <h3 style={{ color: "#06b6d4", fontSize: "1.2rem", marginBottom: "1rem" }}>Day {d.number}: {d.title}</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                  {d.activities.map((a, idx) => (
                    <div key={idx} style={{ padding: "1rem", background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)", borderRadius: "8px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 style={{ color: "white", margin: 0 }}>{a.name}</h4>
                        <span style={{ fontSize: "0.75rem", background: "rgba(124,58,237,0.15)", color: "#c084fc", padding: "0.1rem 0.4rem", borderRadius: "4px" }}>{a.category}</span>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: "#9ca3af", marginTop: "0.5rem" }}>{a.description}</p>
                      <div style={{ fontSize: "0.78rem", color: "#6b7280", marginTop: "0.5rem" }}>
                        ⏱️ Duration: {a.recommendedDuration} | 💵 Entry: {a.cost === 0 ? "Free" : `₹ ${a.cost}`}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Local insights sidebar */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {/* Permits & Safety */}
          <div style={{ background: "rgba(16,22,36,0.65)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
            <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: "0.75rem" }}>🛡️ Regional Info & Safety</h3>
            <p style={{ fontSize: "0.88rem", color: "#9ca3af", lineHeight: "1.5" }}>{stateData.visaGuidance}</p>
            <div style={{ marginTop: "1rem", fontSize: "0.88rem" }}>
              Safety Index Score: <strong style={{ color: "#10b981" }}>{stateData.safetyScore}/100</strong>
            </div>
          </div>

          {/* Festivals */}
          {stateData.festivals && stateData.festivals.length > 0 && (
            <div style={{ background: "rgba(16,22,36,0.65)", border: "1px solid rgba(255,255,255,0.06)", borderRadius: "12px", padding: "1.5rem" }}>
              <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: "0.75rem" }}>🎉 Festivals & Culture</h3>
              <ul style={{ display: "flex", flexDirection: "column", gap: "0.5rem", listStyle: "none", padding: 0 }}>
                {stateData.festivals.map(f => (
                  <li key={f} style={{ fontSize: "0.88rem", color: "#9ca3af", display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span>✨</span> {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Call to action */}
          <div style={{ background: "linear-gradient(135deg, rgba(124,58,237,0.1) 0%, rgba(6,182,212,0.1) 100%)", border: "1px solid rgba(6,182,212,0.25)", borderRadius: "12px", padding: "1.5rem", textAlign: "center" }}>
            <h3 style={{ color: "white", fontSize: "1.1rem", marginBottom: "0.5rem" }}>Modify This Journey</h3>
            <p style={{ fontSize: "0.82rem", color: "#9ca3af", marginBottom: "1rem", lineHeight: "1.4" }}>Add or remove sights, calculate exact transit costs, and customize travel options.</p>
            <Link href={`/?state=${stateKey}`} style={{ display: "block", background: "linear-gradient(135deg, #7c3aed 0%, #06b6d4 100%)", color: "white", padding: "0.6rem", borderRadius: "6px", fontWeight: "bold", fontSize: "0.9rem", textDecoration: "none" }}>
              Open in EasyGo App
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
