import { NextResponse } from "next/server";
import { destinations } from "@/lib/destinations";

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const destination = searchParams.get("destination") || "ladakh";
  const key = destination.toLowerCase().trim();
  const destData = destinations[key] || destinations.ladakh;

  // Retrieve dynamic hidden gems from touristPlaces by category
  const hiddenGems = destData.touristPlaces?.filter(p => p.category === "Hidden Gem") || [];
  const gemName = hiddenGems[0]?.name || "A hidden sanctuary";
  const gemDesc = hiddenGems[0]?.description || "A gorgeous spot mostly skipped by tourists.";

  // Inject location-specific weather, road closures, flood warnings, or landslide alerts
  const isHimalayanOrNortheast = ["ladakh", "himachal", "uttarakhand", "sikkim"].includes(key);
  const locationAlerts = [];
  
  if (isHimalayanOrNortheast) {
    if (key === "ladakh") {
      locationAlerts.push({
        id: "alert-road-closure",
        type: "weather",
        severity: "danger",
        title: "Pass Closure Alert: Khardung La & Chang La",
        message: "Border Road Organisation (BRO) reports heavy snowfall at high passes. Tourist vehicular traffic is suspended. Check with your local taxi operator before heading out.",
        time: "10 mins ago",
        actionLabel: "View BRO Updates",
        actionResponse: "BRO command logs checked. Route clearance scheduled for tomorrow morning."
      });
    } else if (key === "himachal") {
      locationAlerts.push({
        id: "alert-landslide",
        type: "weather",
        severity: "danger",
        title: "Landslide Warning: National Highway NH-5",
        message: "Active landslide warnings reported near Kinnaur/Shimla. Commuters are advised to avoid night travel. BRO teams are on standby.",
        time: "5 mins ago",
        actionLabel: "Show Alternate Routes",
        actionResponse: "Alternate route via Baspa Valley has been highlighted on your interactive map."
      });
    } else if (key === "uttarakhand") {
      locationAlerts.push({
        id: "alert-cloudburst",
        type: "weather",
        severity: "danger",
        title: "Flash Flood Advisory: Rishikesh & Kedarnath",
        message: "Heavy rain advisory issued by IMD for the upper Ganga watershed. White-water rafting activities are suspended until further notice.",
        time: "Just now",
        actionLabel: "Verify Activity Status",
        actionResponse: "Rafting activity refunded. Recommended indoor alternative: Beatles Ashram."
      });
    } else if (key === "sikkim") {
      locationAlerts.push({
        id: "alert-sikkim-monsoon",
        type: "weather",
        severity: "danger",
        title: "BRO Road Closure: Teesta Valley NH-10",
        message: "Water logging and rockfalls reported on NH-10 connecting Siliguri to Gangtok. Vehicles are being rerouted through Gorubathan.",
        time: "15 mins ago",
        actionLabel: "Route Bypass Details",
        actionResponse: "Gangtok taxi operators confirmed rerouting. Travel time extended by 1.5 hours."
      });
    }
  }

  const alerts = [
    ...locationAlerts,
    {
      id: "alert-flight",
      type: "flight",
      severity: "warning",
      title: "Local Transport Alert",
      message: `Your domestic connection to ${destData.name} has been delayed by 1 hour and 30 minutes due to weather changes. We have automatically contacted your taxi pickup to postpone pick up.`,
      time: "Just now",
      actionLabel: "Re-schedule Transfer Cab",
      actionResponse: "Pickup adjusted. Driver will arrive 1.5 hours later. Uncertainty resolved!"
    },
    {
      id: "alert-weather",
      type: "weather",
      severity: "info",
      title: "Local Rain Shower Notice",
      message: `Minor precipitation heading to your sector. Activate "Rain Mode" to replace outdoor sights with indoor heritage spots/workshops?`,
      time: "10 minutes ago",
      actionLabel: "Activate Rain Mode",
      actionResponse: "Itinerary adjusted! Outdoor tours replaced with indoor alternatives."
    },
    {
      id: "alert-scam",
      type: "scam",
      severity: "danger",
      title: `Safety Warning: High Scam Zone`,
      message: `Active report near your location: ${destData.scams?.[0]?.name || "Fake Guides"}. Tip: ${destData.scams?.[0]?.description || "Politely walk away."}`,
      time: "20 minutes ago",
      actionLabel: "Show Safety Tips",
      actionResponse: "Safety Tips highlighted in your Safety Guidelines tab."
    },
    {
      id: "alert-gem",
      type: "gem",
      severity: "success",
      title: "Hidden Gem Nearby!",
      message: `Insider Tip: You are 5 minutes from "${gemName}". Details: ${gemDesc}`,
      time: "1 hour ago",
      actionLabel: "Add to Itinerary",
      actionResponse: "Added to today's schedule! Check Itinerary."
    }
  ];

  return NextResponse.json({ success: true, alerts });
}
