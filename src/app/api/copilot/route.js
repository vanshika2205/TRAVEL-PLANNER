import { NextResponse } from "next/server";
import { destinations, curatedDestinations } from "@/lib/destinations";

export async function POST(req) {
  try {
    const { query, geminiApiKey } = await req.json();
    const effectiveGeminiApiKey = geminiApiKey?.trim() || process.env.GEMINI_API_KEY || "";

    if (!query || query.trim() === "") {
      return NextResponse.json(
        { success: false, error: "Please enter a valid request." },
        { status: 400 }
      );
    }

    // List of known destinations and states from database to match against
    const allDbPlaceNames = [];
    const allStateNames = [];

    // Collect from destinations
    Object.keys(destinations).forEach((key) => {
      const stateObj = destinations[key];
      allStateNames.push({ key, name: stateObj.name });
      stateObj.touristPlaces.forEach((p) => {
        allDbPlaceNames.push({ id: p.id, name: p.name, state: stateObj.name, stateKey: key });
      });
    });

    // Collect from curatedDestinations
    curatedDestinations.forEach((cd) => {
      allDbPlaceNames.push({ id: cd.id, name: cd.name, state: cd.state, stateKey: cd.state.toLowerCase().replace(/[^a-z]/g, "") });
    });

    if (effectiveGeminiApiKey) {
      try {
        const prompt = `You are a travel database parser. Analyze this natural language travel query: "${query}"
Select relevant destinations or states from this list:
States: ${allStateNames.map(s => s.name).join(", ")}
Destinations: ${allDbPlaceNames.map(d => d.name).join(", ")}

Extract parameters and return a single valid JSON object with the following structure:
{
  "destinations": ["List of matching destination names or state names found in the list, or similar names in India"],
  "durationDays": (number of days, default to 3 if unspecified),
  "budgetCap": (approx total budget number in INR, default to null if unspecified),
  "interests": ["spiritual", "nature", "adventure", "heritage", "food", "wildlife" based on query],
  "tripType": "Solo" | "Family" | "Couple" | "Friends",
  "budgetTier": "Budget" | "Comfort" | "Luxury"
}
Ensure the response is strictly JSON and does not contain any markdown formatting, backticks, or comments.`;

        const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${effectiveGeminiApiKey}`, {
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
            const parsed = JSON.parse(cleanJson);
            return NextResponse.json({
              success: true,
              ...parsed
            });
          }
        }
      } catch (e) {
        console.error("Gemini Copilot Parser Error:", e);
      }
    }

    // --- Keyless Regex Parser Fallback ---
    const lowerQuery = query.toLowerCase();

    // 1. Extract duration
    let durationDays = 3;
    const durationMatch = lowerQuery.match(/(\d+)(?:[\s-]*)(?:day|days|night|nights)/);
    if (durationMatch) {
      durationDays = parseInt(durationMatch[1], 10);
    }

    // 2. Extract budget cap
    let budgetCap = null;
    const budgetMatch = lowerQuery.match(/(?:rs\.?|inr|₹|under|budget|of)\s*(\d+[\d,]*)/);
    if (budgetMatch) {
      const parsedNum = parseInt(budgetMatch[1].replace(/,/g, ""), 10);
      if (parsedNum > 100) { // filter out small matches
        budgetCap = parsedNum;
      }
    }
    // Check if budget is written in 'k' or 'thousand' format (e.g. 20k, 20 thousand)
    const kMatch = lowerQuery.match(/(\d+)\s*(?:k|thousand)/);
    if (kMatch) {
      budgetCap = parseInt(kMatch[1], 10) * 1000;
    }

    // Determine budget tier
    let budgetTier = "Comfort";
    if (budgetCap) {
      if (budgetCap < 15000) {
        budgetTier = "Budget";
      } else if (budgetCap >= 45000) {
        budgetTier = "Luxury";
      }
    } else {
      if (lowerQuery.includes("cheap") || lowerQuery.includes("low budget") || lowerQuery.includes("budget-friendly")) {
        budgetTier = "Budget";
        budgetCap = 15000;
      } else if (lowerQuery.includes("luxury") || lowerQuery.includes("premium") || lowerQuery.includes("five star")) {
        budgetTier = "Luxury";
        budgetCap = 60000;
      }
    }

    // 3. Extract interests
    const interests = [];
    if (lowerQuery.includes("spiritual") || lowerQuery.includes("temple") || lowerQuery.includes("relig") || lowerQuery.includes("holy") || lowerQuery.includes("god")) {
      interests.push("Spiritual");
    }
    if (lowerQuery.includes("nature") || lowerQuery.includes("hill") || lowerQuery.includes("mountain") || lowerQuery.includes("lake") || lowerQuery.includes("scenic") || lowerQuery.includes("beach")) {
      interests.push("Nature");
    }
    if (lowerQuery.includes("adventure") || lowerQuery.includes("rafting") || lowerQuery.includes("trek") || lowerQuery.includes("ski") || lowerQuery.includes("paragliding")) {
      interests.push("Adventure");
    }
    if (lowerQuery.includes("heritage") || lowerQuery.includes("fort") || lowerQuery.includes("palace") || lowerQuery.includes("history") || lowerQuery.includes("historic")) {
      interests.push("Heritage");
    }
    if (lowerQuery.includes("food") || lowerQuery.includes("eat") || lowerQuery.includes("dine") || lowerQuery.includes("cuisine") || lowerQuery.includes("restaurant") || lowerQuery.includes("taste")) {
      interests.push("Food");
    }
    if (lowerQuery.includes("wildlife") || lowerQuery.includes("tiger") || lowerQuery.includes("safari") || lowerQuery.includes("park") || lowerQuery.includes("animal")) {
      interests.push("Wildlife");
    }
    if (interests.length === 0) {
      interests.push("Nature"); // default fallback
    }

    // 4. Extract trip type
    let tripType = "Solo";
    if (lowerQuery.includes("family") || lowerQuery.includes("kids") || lowerQuery.includes("parent")) {
      tripType = "Family";
    } else if (lowerQuery.includes("couple") || lowerQuery.includes("husband") || lowerQuery.includes("wife") || lowerQuery.includes("honeymoon")) {
      tripType = "Couple";
    } else if (lowerQuery.includes("friend") || lowerQuery.includes("group") || lowerQuery.includes("gang") || lowerQuery.includes("colleague")) {
      tripType = "Friends";
    }

    // 5. Extract destinations / states
    const foundDestinations = [];
    
    // Check states
    allStateNames.forEach((s) => {
      if (lowerQuery.includes(s.name.toLowerCase().split(" ")[0])) { // match first word (e.g. "himachal")
        foundDestinations.push(s.name);
      }
    });

    // Check destinations
    allDbPlaceNames.forEach((d) => {
      const baseName = d.name.toLowerCase().replace("temple", "").replace("beach", "").replace("lake", "").replace("palace", "").trim();
      if (baseName.length > 3 && lowerQuery.includes(baseName)) {
        if (!foundDestinations.includes(d.name)) {
          foundDestinations.push(d.name);
        }
      }
    });

    // Hardcoded overrides for common queries if not matched
    if (foundDestinations.length === 0) {
      if (lowerQuery.includes("delhi")) foundDestinations.push("Delhi Capital");
      if (lowerQuery.includes("goa")) foundDestinations.push("Goa Coast");
      if (lowerQuery.includes("kerala")) foundDestinations.push("Kerala");
      if (lowerQuery.includes("ladakh") || lowerQuery.includes("leh")) foundDestinations.push("Leh Ladakh");
      if (lowerQuery.includes("jaipur") || lowerQuery.includes("rajasthan")) foundDestinations.push("Rajasthan (Jaipur)");
      if (lowerQuery.includes("shimla") || lowerQuery.includes("manali")) foundDestinations.push("Himachal Pradesh");
      if (lowerQuery.includes("rishikesh") || lowerQuery.includes("nainital")) foundDestinations.push("Uttarakhand");
      if (lowerQuery.includes("agra") || lowerQuery.includes("varanasi") || lowerQuery.includes("kashi")) foundDestinations.push("Uttar Pradesh");
      if (lowerQuery.includes("ayodhya")) foundDestinations.push("Ayodhya");
      if (lowerQuery.includes("vrindavan") || lowerQuery.includes("mathura")) foundDestinations.push("Vrindavan");
      if (lowerQuery.includes("hampi")) foundDestinations.push("Hampi");
      if (lowerQuery.includes("rameswaram")) foundDestinations.push("Rameswaram");
      if (lowerQuery.includes("tirupati")) foundDestinations.push("Tirupati");
    }

    // Ultimate fallback if no destination name matched
    if (foundDestinations.length === 0) {
      foundDestinations.push("Rajasthan (Jaipur)");
    }

    return NextResponse.json({
      success: true,
      destinations: foundDestinations,
      durationDays,
      budgetCap,
      interests,
      tripType,
      budgetTier
    });

  } catch (error) {
    console.error("API Error in copilot route:", error);
    return NextResponse.json(
      { success: false, error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
