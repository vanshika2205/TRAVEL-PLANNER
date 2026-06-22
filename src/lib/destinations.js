export const destinations = {
  ladakh: {
    name: "Leh Ladakh",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 94,
    image: "/images/leh ladakh.png",
    description: "The land of high passes, crystal-clear high-altitude lakes, and ancient Tibetan-Buddhist monasteries.",
    touristPlaces: [
      { id: "lad-pangong", name: "Pangong Tso Lake", category: "Nature", description: "Breathtaking high-altitude saltwater lake changing colors from blue to turquoise.", lat: 34.025, lng: 78.435, recommendedDuration: "4 hours", cost: 150, isOutdoor: true, rainAlternative: "Nomadic insulated yak-wool tents", foodRecommendation: { name: "Pangong Lake Cafe", dish: "Thukpa & Hot Momos" } },
      { id: "lad-hunder", name: "Hunder Sand Dunes", category: "Adventure", description: "Cold desert dunes featuring double-humped Bactrian camel rides.", lat: 34.582, lng: 77.429, recommendedDuration: "3 hours", cost: 300, isOutdoor: true, rainAlternative: "Covered camel farm lounge", foodRecommendation: { name: "Organic Dunes Shack", dish: "Apricot Cake" } },
      { id: "lad-diskit", name: "Diskit Monastery", category: "Spiritual", description: "14th-century monastery hosting a towering 106-ft Maitreya Buddha statue.", lat: 34.538, lng: 77.412, recommendedDuration: "2 hours", cost: 50, isOutdoor: true, rainAlternative: "Prayer hall interior", foodRecommendation: { name: "Diskit Monk Kitchen", dish: "Butter Tea & Tsampa" } },
      { id: "lad-palace", name: "Leh Palace", category: "Heritage", description: "Historic 9-story royal palace built in the 17th century, overlooking Leh town.", lat: 34.165, lng: 77.587, recommendedDuration: "2 hours", cost: 250, isOutdoor: false, rainAlternative: "Palace indoor museum", foodRecommendation: { name: "Tibet Kitchen (Leh)", dish: "Mutton Sha-Phaley" } },
      { id: "lad-magnetic", name: "Magnetic Hill", category: "Adventure", description: "Gravity-defying stretch where vehicles appear to roll uphill naturally.", lat: 34.218, lng: 77.352, recommendedDuration: "1 hour", cost: 0, isOutdoor: true, rainAlternative: "Guru Nanak Gurudwara cafe nearby", foodRecommendation: { name: "Gurudwara Langar Hall", dish: "Hot Kadha Prasad & Tea" } },
      { id: "lad-sangam", name: "Sangam Confluence", category: "Nature", description: "Scenic confluence of Indus and Zanskar rivers, perfect for rafting.", lat: 34.225, lng: 77.332, recommendedDuration: "3 hours", cost: 800, isOutdoor: true, rainAlternative: "Confluence viewpoints tea shop", foodRecommendation: { name: "Sangam Cafe", dish: "Maggie & Chai" } },
      { id: "lad-hemis", name: "Hemis National Park", category: "Wildlife", description: "High-altitude national park famous for snow leopards and bharal.", lat: 33.910, lng: 77.520, recommendedDuration: "6 hours", cost: 200, isOutdoor: true, rainAlternative: "Hemis museum archives", foodRecommendation: { name: "Hemis Eco Lodge", dish: "Ladakhi Skyu (pasta stew)" } },
      { id: "lad-turtuk", name: "Turtuk Village", category: "Hidden Gem", description: "Last village on the border, featuring unique Balti heritage and apricot orchards.", lat: 34.845, lng: 76.832, recommendedDuration: "4 hours", cost: 50, isOutdoor: true, rainAlternative: "Balti museum inside traditional home", foodRecommendation: { name: "Balti Heritage Cafe", dish: "Apricot Juice & Walnut Salad" } },
      { id: "lad-food", name: "Leh Old Town Food Street", category: "Food", description: "Bustling market lanes for butter tea, mutton momos, and traditional khambir bread.", lat: 34.164, lng: 77.585, recommendedDuration: "2 hours", cost: 150, isOutdoor: false, rainAlternative: "Indoor Tibetan Bakery", foodRecommendation: { name: "Lala's Cafe", dish: "Khambir with Butter Tea" } },
      { id: "lad-tsomoriri", name: "Tso Moriri Lake", category: "Nature", description: "Remote, high-altitude sanctuary with pristine blue waters and snow peak reflections.", lat: 32.898, lng: 78.312, recommendedDuration: "4 hours", cost: 100, isOutdoor: true, rainAlternative: "Nomadic homestays near Karzok", foodRecommendation: { name: "Karzok Homestay Kitchen", dish: "Warm Noodle Soup" } }
    ],
    visaGuidance: "Inner Line Permit (ILP) required for Indian Citizens to visit Pangong and Nubra. PAP required for Foreigners.",
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-1982-252297" },
    scams: [
      { name: "Taxi Union Boycotts", description: "Leh Taxi Union does not allow non-local cabs to do local sightseeing. Rent Leh cabs.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Acclimatize 24 Hours", detail: "Do absolute rest on Day 1 to adjust to high altitudes (11,500 ft) and avoid AMS." }
    ],
    packingBasics: ["Heavy woolens", "Sunscreen (SPF 50)", "Postpaid SIM (Jio/Airtel)"],
    festivals: ["Hemis Festival", "Losar (Ladakhi New Year)", "Sindhu Darshan"],
    weatherTemplates: {
      spring: { temp: "5-15°C", condition: "Cool & Sunny", packing: ["Fleece layers", "Gloves"] },
      summer: { temp: "15-25°C", condition: "Pleasant & Clear", packing: ["T-shirts", "Windcheater"] },
      autumn: { temp: "0-12°C", condition: "Cold & Golden", packing: ["Heavy coat", "Thermal wear"] },
      winter: { temp: "-15 to -5°C", condition: "Snowy & Freezing", packing: ["Down jacket", "Snow boots"] }
    }
  },
  goa: {
    name: "Goa Coast",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 84,
    image: "/images/goa.png",
    description: "Sun-kissed golden beaches, Portuguese churches, and spice plantations.",
    touristPlaces: [
      { id: "goa-baga", name: "Baga Beach", category: "Adventure", description: "Active beach famous for parasailing, jet-skis, and lively shacks.", lat: 15.555, lng: 73.751, recommendedDuration: "3 hours", cost: 1200, isOutdoor: true, rainAlternative: "Brittos indoor dining", foodRecommendation: { name: "Brittos", dish: "Goan Crab Curry" } },
      { id: "goa-fort", name: "Fort Aguada", category: "Heritage", description: "17th-century Portuguese coastal fort and lighthouse with sunset views.", lat: 15.492, lng: 73.771, recommendedDuration: "2 hours", cost: 50, isOutdoor: true, rainAlternative: "Reis Magos indoor museum", foodRecommendation: { name: "Tony's Shack", dish: "Pork Vindaloo" } },
      { id: "goa-latin", name: "Fontainhas Latin Quarter", category: "Heritage", description: "Vibrant pastel Portuguese houses, art galleries, and cafes in Panaji.", lat: 15.498, lng: 73.811, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Confeitaria 31 de Janeiro", foodRecommendation: { name: "Viva Panjim", dish: "Chicken Cafreal" } },
      { id: "goa-churches", name: "Basilica of Bom Jesus", category: "Spiritual", description: "UNESCO site housing the mortal remains of St. Francis Xavier.", lat: 15.501, lng: 73.911, recommendedDuration: "1.5 hours", cost: 0, isOutdoor: false, rainAlternative: "Basilica of Bom Jesus", foodRecommendation: { name: "Old Goa Restaurant", dish: "Bebinca (Goan Layered Cake)" } },
      { id: "goa-spice", name: "Sahakari Spice Farm", category: "Nature", description: "Spices tour with local buffet, elephant washings, and vanilla shrubs.", lat: 15.435, lng: 74.015, recommendedDuration: "3 hours", cost: 500, isOutdoor: true, rainAlternative: "Covered spice farm restaurant", foodRecommendation: { name: "Sahakari Dining Hall", dish: "Traditional Fish Curry Buffet" } },
      { id: "goa-dudhsagar", name: "Dudhsagar Waterfalls", category: "Nature", description: "Scenic 4-tiered cascading waterfall inside forest borders.", lat: 15.312, lng: 74.314, recommendedDuration: "5 hours", cost: 800, isOutdoor: true, rainAlternative: "Nature education center", foodRecommendation: { name: "Mollem forest stop", dish: "Local Goan Bread (Pao) & Bhaji" } },
      { id: "goa-lagoon", name: "Cola Beach Lagoon", category: "Hidden Gem", description: "A freshwater lagoon that flows directly onto a peaceful coconut grove beach.", lat: 15.054, lng: 73.988, recommendedDuration: "4 hours", cost: 0, isOutdoor: true, rainAlternative: "Blue Lagoon resort interior", foodRecommendation: { name: "Blue Lagoon Shack", dish: "Tandoori Pomfret" } },
      { id: "goa-cotigao", name: "Cotigao Wildlife Sanctuary", category: "Wildlife", description: "Tall multi-tiered forest canopy home to flying squirrels and gaurs.", lat: 14.982, lng: 74.112, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Cotigao forest cottages", foodRecommendation: { name: "Canacona Highway Dhaba", dish: "Prawn Thali" } },
      { id: "goa-food", name: "Fisherman's Wharf Panaji", category: "Food", description: "Riverside fine dining offering authentic Goan fish thali and bebinca.", lat: 15.485, lng: 73.831, recommendedDuration: "2 hours", cost: 800, isOutdoor: false, rainAlternative: "Indoor Dining Hall", foodRecommendation: { name: "Fisherman's Wharf", dish: "Goan Fish Thali & Bebinca" } },
      { id: "goa-mangueshi", name: "Mangueshi Temple", category: "Spiritual", description: "400-year-old temple dedicated to Lord Shiva, showcasing Goan-Hindu architecture.", lat: 15.443, lng: 73.968, recommendedDuration: "1.5 hours", cost: 0, isOutdoor: false, rainAlternative: "Temple Prayer Halls", foodRecommendation: { name: "Mangueshi Pure Veg", dish: "Traditional Kokum Sherbet & Dosa" } }
    ],
    visaGuidance: "Standard tourist guidelines apply. ID card needed for scooter rentals.",
    emergencyContacts: { police: "100", ambulance: "108", touristSupport: "+91-832-2437053" },
    scams: [
      { name: "Rental Bike Damage Trap", description: "Rental agents inspect the bike on return and charge hefty fees for minor pre-existing scratches. Take a full video before renting.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Decent Clothes in Churches", detail: "Avoid wearing beachwear or tank tops inside historical churches or temples." }
    ],
    packingBasics: ["Linen shirts", "Beach slippers", "Mosquito spray"],
    festivals: ["Goa Carnival", "Shigmo Festival", "Sunburn Festival"],
    weatherTemplates: {
      spring: { temp: "24-32°C", condition: "Warm & Dry", packing: ["Cotton clothes", "Sun cap"] },
      summer: { temp: "28-35°C", condition: "Humid & Pre-monsoon", packing: ["Linen shorts", "Umbrella"] },
      autumn: { temp: "24-31°C", condition: "Green Monsoon ending", packing: ["Poncho", "Waterproof shoes"] },
      winter: { temp: "20-30°C", condition: "Breezy & Pleasant", packing: ["Light jacket for bikes", "Swimwear"] }
    }
  },
  kerala: {
    name: "Kerala",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 92,
    image: "/images/kerala.png",
    description: "Serene backwater houseboats, emerald green Munnar tea estates, and classical arts.",
    touristPlaces: [
      { id: "ker-munnar", name: "Munnar Tea Estates", category: "Nature", description: "Sprawling tea gardens and museum detailing leaf processing.", lat: 10.088, lng: 77.059, recommendedDuration: "3 hours", cost: 150, isOutdoor: true, rainAlternative: "Tea Tasting covered rooms", foodRecommendation: { name: "Saravana Bhavan", dish: "Masala Dosa & Filter Coffee" } },
      { id: "ker-alleppey", name: "Alleppey Houseboats", category: "Adventure", description: "Bamboo kettuvallam boats cruising palm-lined backwater canals.", lat: 9.498, lng: 76.338, recommendedDuration: "6 hours", cost: 4500, isOutdoor: true, rainAlternative: "Glass-sheltered AC boat cabins", foodRecommendation: { name: "Backwater Floating Kitchen", dish: "Karimeen Pollichathu (Pearl Spot Fish)" } },
      { id: "ker-fortkochi", name: "Fort Kochi Chinese Nets", category: "Heritage", description: "Iconic shore fishing nets, colonial streets, and St. Francis church.", lat: 9.964, lng: 76.241, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Indo-Portuguese museum", foodRecommendation: { name: "Kashi Art Cafe", dish: "Avocado toast & cold coffee" } },
      { id: "ker-periyar", name: "Periyar Wildlife Sanctuary", category: "Wildlife", description: "Lake boat safari inside a thick forest reserve sheltering wild elephants.", lat: 9.578, lng: 77.162, recommendedDuration: "4 hours", cost: 400, isOutdoor: true, rainAlternative: "Wildlife museum galleries", foodRecommendation: { name: "Kumily Spice Cafe", dish: "Banana Fritters (Pazham Pori) & Tea" } },
      { id: "ker-guruvayur", name: "Guruvayur Temple", category: "Spiritual", description: "Ancient temple dedicated to Lord Krishna, highly sacred to pilgrims.", lat: 10.595, lng: 76.038, recommendedDuration: "2 hours", cost: 0, isOutdoor: false, rainAlternative: "Guruvayur Temple inner court", foodRecommendation: { name: "Temple Vegetarian Mess", dish: "Sadhya Feast on Banana Leaf" } },
      { id: "ker-athirappilly", name: "Athirappilly Waterfalls", category: "Nature", description: "Breathtaking 80-ft roaring waterfall dubbed as India's Niagara.", lat: 10.285, lng: 76.569, recommendedDuration: "3 hours", cost: 50, isOutdoor: true, rainAlternative: "Waterfall covered viewpoints", foodRecommendation: { name: "Rainforest Resort Cafe", dish: "Malabar Parotta & Veg Kurma" } },
      { id: "ker-marari", name: "Marari Quiet Beach", category: "Hidden Gem", description: "Pristine white sand beach skipped by commercial speedboats.", lat: 9.601, lng: 76.302, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Beach wellness resort pavilion", foodRecommendation: { name: "Marari Fish Shack", dish: "Coconut Crab Roast" } },
      { id: "ker-vagamon", name: "Vagamon Pine Forests", category: "Hidden Gem", description: "Misty pine valleys and grass meadows, highly scenic.", lat: 9.688, lng: 76.905, recommendedDuration: "2 hours", cost: 20, isOutdoor: true, rainAlternative: "Pine woods tea shelter", foodRecommendation: { name: "Misty Hill Dhaba", dish: "Spicy Kappa Biryani (Tapioca dish)" } },
      { id: "ker-food", name: "Kozhikode Halwa Street", category: "Food", description: "Famous Mittai Theruvu street lined with colourful ghee halwas and banana chips shops.", lat: 11.258, lng: 75.780, recommendedDuration: "2 hours", cost: 200, isOutdoor: false, rainAlternative: "Indoor sweet houses", foodRecommendation: { name: "Zains Cafe", dish: "Kozhikode Biryani & Ghee Halwa" } },
      { id: "ker-wayanad", name: "Wayanad Ziplining & Trekking", category: "Adventure", description: "Thrilling zipline across tea plantations and trekking to Chembra peak.", lat: 11.605, lng: 76.082, recommendedDuration: "4 hours", cost: 1200, isOutdoor: true, rainAlternative: "Wayanad Heritage Museum", foodRecommendation: { name: "ClayHut Restaurant", dish: "Bamboo Biryani" } }
    ],
    visaGuidance: "Standard rules. No local permits. Keep ID for houseboat check-ins.",
    emergencyContacts: { police: "112", ambulance: "108", touristSupport: "+91-471-2321132" },
    scams: [
      { name: "Fake Ayurvedic Clinics", description: "Unregistered massage tables using cheap mineral oil. Check green-leaf certification tags before booking.", rating: "Medium Risk" }
    ],
    customs: [
      { rule: "Eat with Right Hand", detail: "Always use your right hand when eating traditional sadhya meals." }
    ],
    packingBasics: ["Cotton kurtas", "Sandal shoes", "Umbrella"],
    festivals: ["Onam", "Vishu", "Thrissur Pooram"],
    weatherTemplates: {
      spring: { temp: "22-30°C", condition: "Warm & Sunny hills", packing: ["Sunscreen", "Light shirt"] },
      summer: { temp: "25-34°C", condition: "Hot & Heavy Monsoon", packing: ["Poncho", "Mosquito lotion"] },
      autumn: { temp: "22-29°C", condition: "Lush & Rain-soaked scenery", packing: ["Raincoat", "Dry pack bags"] },
      winter: { temp: "18-28°C", condition: "Misty & Pleasant", packing: ["Cardigan for Munnar", "Linen clothes"] }
    }
  },
  rajasthan: {
    name: "Rajasthan (Jaipur)",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 82,
    image: "/images/rajasthan.png",
    description: "Desert fortresses, palace corridors, stepwells, and traditional arts.",
    touristPlaces: [
      { id: "raj-citypalace", name: "City Palace Jaipur", category: "Heritage", description: "Active royal palace and museum showing royal robes and armor vaults.", lat: 26.926, lng: 75.824, recommendedDuration: "3 hours", cost: 700, isOutdoor: false, rainAlternative: "City Palace interior galleries", foodRecommendation: { name: "Baradari Restaurant", dish: "Laal Maas (Royal Lamb Curry)" } },
      { id: "raj-jantar", name: "Jantar Mantar", category: "Heritage", description: "18th-century stone astronomical instruments and world's biggest sundial.", lat: 26.926, lng: 75.822, recommendedDuration: "1.5 hours", cost: 200, isOutdoor: true, rainAlternative: "Jantar Mantar video galleries", foodRecommendation: { name: "City Palace Coffee Shop", dish: "Cold Coffee & Samosas" } },
      { id: "raj-hawa", name: "Hawa Mahal", category: "Heritage", description: "Iconic honeycomb pink window facade designed for royal ladies.", lat: 26.924, lng: 75.827, recommendedDuration: "1 hour", cost: 200, isOutdoor: true, rainAlternative: "Wind Cafe opposite Hawa Mahal", foodRecommendation: { name: "Wind View Cafe", dish: "Ginger Chai & Club Sandwich" } },
      { id: "raj-galtaji", name: "Galta Ji Monkey Temple", category: "Spiritual", description: "Sacred spring tanks and temples nested in cliffs, filled with friendly macaques.", lat: 26.917, lng: 75.859, recommendedDuration: "2 hours", cost: 100, isOutdoor: true, rainAlternative: "Temple shelter rooms", foodRecommendation: { name: "Ghat Gate Sweet Shop", dish: "Pyaaz Kachori & Rabdi" } },
      { id: "raj-amer", name: "Amer Fort", category: "Heritage", description: "Massive hill fortress of yellow sandstone with the Sheesh Mahal mirror rooms.", lat: 26.985, lng: 75.851, recommendedDuration: "3 hours", cost: 200, isOutdoor: true, rainAlternative: "Albert Hall museum (alternative)", foodRecommendation: { name: "1135 AD (Inside Fort)", dish: "Rajasthani Thali" } },
      { id: "raj-panna", name: "Panna Meena Stepwell", category: "Hidden Gem", description: "8-story symmetrical staircases designed to harvest rainwater.", lat: 26.988, lng: 75.853, recommendedDuration: "1 hour", cost: 50, isOutdoor: true, rainAlternative: "Anokhi Handblock Museum nearby", foodRecommendation: { name: "Anokhi Cafe", dish: "Organic Lemon Cake & Salad" } },
      { id: "raj-jhalana", name: "Jhalana Leopard Safari", category: "Wildlife", description: "Open gypsy safari inside Jaipur hills, offering excellent leopard sightings.", lat: 26.852, lng: 75.821, recommendedDuration: "3.5 hours", cost: 1200, isOutdoor: true, rainAlternative: "Jhalana nature center", foodRecommendation: { name: "Dal Bati Churma" } },
      { id: "raj-chokhidhani", name: "Chokhi Dhani Resort", category: "Food", description: "Ethnic Rajasthani village experience with dances, puppet shows, and a massive feast.", lat: 26.766, lng: 75.836, recommendedDuration: "4 hours", cost: 900, isOutdoor: true, rainAlternative: "Boutique Indoor dining hall", foodRecommendation: { name: "Sangri Dining Hall", dish: "Ghee Daal Bati Churma & Sangri" } },
      { id: "raj-adventure", name: "Nahargarh Cycle & Zipline", category: "Adventure", description: "Scenic early morning cycle trail up the Aravalli hills and zipline over the fort lake.", lat: 26.938, lng: 75.816, recommendedDuration: "3 hours", cost: 1000, isOutdoor: true, rainAlternative: "Nahargarh Fort Wax Museum", foodRecommendation: { name: "Padao Restaurant", dish: "Chai & Pakoras" } },
      { id: "raj-nature", name: "Sambhar Salt Lake", category: "Nature", description: "India's largest inland salt lake, offering endless white horizons and nesting flamingos.", lat: 26.901, lng: 75.195, recommendedDuration: "4 hours", cost: 100, isOutdoor: true, rainAlternative: "Sambhar heritage resort indoor cafe", foodRecommendation: { name: "Sambhar Resort Diner", dish: "Rajasthani Kadhi Khichdi" } }
    ],
    visaGuidance: "Standard Indian tourist rules. Photo ID required at monuments.",
    emergencyContacts: { police: "100", ambulance: "108", touristSupport: "+91-141-2822863" },
    scams: [
      { name: "Fake Gems Export Trap", description: "Rickshaw drivers offer to lead you to 'government emporiums' where you buy cheap gems to export for high profits. It is a scam.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Footwear off in temples", detail: "Remove shoes and socks before entering any religious shrine." }
    ],
    packingBasics: ["Sun hat", "Sanitizer", "Linen garments"],
    festivals: ["Pushkar Camel Fair", "Desert Festival", "Gangaur Festival", "Teej"],
    weatherTemplates: {
      spring: { temp: "18-32°C", condition: "Warm & Clear", packing: ["Sunglasses", "Light cottons"] },
      summer: { temp: "35-44°C", condition: "Scorching & Dry", packing: ["UV protection", "Electrolytes"] },
      autumn: { temp: "22-35°C", condition: "Pleasant days", packing: ["Cottons", "Light layer for night"] },
      winter: { temp: "8-24°C", condition: "Cool nights & Sunny days", packing: ["Fleece jacket", "Shawl"] }
    }
  },
  himachal: {
    name: "Himachal Pradesh",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 90,
    image: "/images/himachal pradesh.png",
    description: "Snow-capped peaks, paragliding meadows, Dalai Lama's monastery, and apple orchards.",
    touristPlaces: [
      { id: "him-solang", name: "Solang Valley", category: "Adventure", description: "High adventure valley offering skiing, zorbing, and paragliding.", lat: 32.315, lng: 77.155, recommendedDuration: "4 hours", cost: 1500, isOutdoor: true, rainAlternative: "Naggar Castle art gallery", foodRecommendation: { name: "Solang Adventure Cafe", dish: "Steamed Momos & Maggi" } },
      { id: "him-hadimba", name: "Hadimba Temple", category: "Spiritual", description: "Ancient wooden pagoda-style temple nestled inside dense cedar forests in Manali.", lat: 32.245, lng: 77.175, recommendedDuration: "1.5 hours", cost: 0, isOutdoor: true, rainAlternative: "Under temple wooden pagoda roof", foodRecommendation: { name: "Mall Road Cafe", dish: "Siddu (local Himachali bread) with ghee" } },
      { id: "him-ridge", name: "The Ridge Shimla", category: "Heritage", description: "Wide open pedestrian mall road with colonial libraries and snow peak views.", lat: 31.104, lng: 77.172, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Shimla historic theater interior", foodRecommendation: { name: "Indian Coffee House", dish: "Filter Coffee & Veg Cutlet" } },
      { id: "him-tsug", name: "Tsuglagkhang Temple", category: "Spiritual", description: "Tibetan compound housing the spiritual residence of H.H. Dalai Lama.", lat: 32.235, lng: 76.325, recommendedDuration: "2 hours", cost: 0, isOutdoor: false, rainAlternative: "Tibetan scriptures museum", foodRecommendation: { name: "Tibet Quality Cafe", dish: "Tibetan Butter Tea & Sha-Phaley" } },
      { id: "him-rohtang", name: "Rohtang Pass", category: "Nature", description: "Scenic snow-pass at 13,000 ft connecting Kullu and Lahaul.", lat: 32.372, lng: 77.245, recommendedDuration: "4 hours", cost: 500, isOutdoor: true, rainAlternative: "Rohtang transit rest houses", foodRecommendation: { name: "Pass Tea Shop", dish: "Spicy Chai & Maggi Noodles" } },
      { id: "him-spiti", name: "Key Monastery (Spiti)", category: "Spiritual", description: "Spectacular fort-like monastery built on a volcanic hill in Spiti Valley.", lat: 32.472, lng: 78.012, recommendedDuration: "3 hours", cost: 0, isOutdoor: false, rainAlternative: "Key Monastery assembly hall", foodRecommendation: { name: "Kaza Local Diner", dish: "Hot Thukpa Soup" } },
      { id: "him-jibhi", name: "Jibhi Valley Pinewoods", category: "Hidden Gem", description: "Quiet pine forests, waterfalls, and wooden cottages alongside Tirthan river.", lat: 31.635, lng: 77.345, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Riverside wooden cottage room", foodRecommendation: { name: "Jibhi Pine Shack", dish: "Local Trout Fish Fry" } },
      { id: "him-pinvalley", name: "Pin Valley National Park", category: "Wildlife", description: "Cold desert reserve hosting rare snow leopards and Siberian ibex.", lat: 32.115, lng: 77.925, recommendedDuration: "5 hours", cost: 100, isOutdoor: true, rainAlternative: "Pin Forest camps", foodRecommendation: { name: "Mudh Village Kitchen", dish: "Warm Dal Fry & Rice" } },
      { id: "him-food", name: "Dharamshala Tibetan Trail", category: "Food", description: "Bustling lanes of Mcleodganj famous for steamed tingmo, momos, and soup.", lat: 32.236, lng: 76.324, recommendedDuration: "2 hours", cost: 300, isOutdoor: false, rainAlternative: "Tibetan indoor cafes", foodRecommendation: { name: "Illiterati Cafe", dish: "Steamed Momos & Shakshuka" } },
      { id: "him-bir", name: "Bir Billing Paragliding", category: "Adventure", description: "World-famous paragliding take-off site offering panoramic views of Dhauladhar ranges.", lat: 32.045, lng: 76.721, recommendedDuration: "3 hours", cost: 2500, isOutdoor: true, rainAlternative: "Bir local tea cafes", foodRecommendation: { name: "Garden Cafe Bir", dish: "Handmade Pasta & Himalayan Herbal Tea" } }
    ],
    visaGuidance: "Standard rules. Permits needed for vehicles entering Rohtang pass lanes.",
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-177-2625860" },
    scams: [
      { name: "Solang Snowsuit scam", description: "Drivers insist you rent bulky snow suits at roadside booths before reaching Solang. Solang has cheaper, cleaner vendors inside.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Respect prayer flags", detail: "Do not step over or drag Buddhist script flags on the ground." }
    ],
    packingBasics: ["Fleece hoodie", "Sport shoes", "Lip balm"],
    festivals: ["Kullu Dussehra", "Shimla Summer Festival", "Lahaul Festival"],
    weatherTemplates: {
      spring: { temp: "10-22°C", condition: "Breezy & Fresh", packing: ["Sweater", "Comfy pants"] },
      summer: { temp: "15-28°C", condition: "Warm escape from plains", packing: ["T-shirt", "Light hoodie"] },
      autumn: { temp: "5-18°C", condition: "Chilly & Clear", packing: ["Jacket", "Woolen socks"] },
      winter: { temp: "-2 to 10°C", condition: "Snowy & Freezing", packing: ["Down coat", "Thermals", "Beanie"] }
    }
  },
  uttarakhand: {
    name: "Uttarakhand",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 88,
    image: "/images/uttarakhand.png",
    description: "Yoga retreats in Rishikesh, emerald Nainital lakes, and majestic Himalayan pilgrim paths.",
    touristPlaces: [
      { id: "ut-triveni", name: "Triveni Ghat Rishikesh", category: "Spiritual", description: "River banks where holy Ganga flows, famous for Ganga Aarti fire prayers.", lat: 30.125, lng: 78.305, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Ganga Ashram library", foodRecommendation: { name: "Chotiwala Restaurant", dish: "Traditional Garhwali Thali" } },
      { id: "ut-naini", name: "Naini Lake Boating", category: "Nature", description: "Scenic volcanic lake surrounded by mountains and yacht clubs.", lat: 29.385, lng: 79.455, recommendedDuration: "2 hours", cost: 250, isOutdoor: true, rainAlternative: "Nainital Boat House club", foodRecommendation: { name: "Nainital Lake Cafe", dish: "Spicy Aloo Gutke & Chai" } },
      { id: "ut-kempty", name: "Kempty Falls", category: "Nature", description: "Tiered waterfalls cascading down rocky cliffs, ideal for bathing.", lat: 30.455, lng: 78.022, recommendedDuration: "3 hours", cost: 50, isOutdoor: true, rainAlternative: "Mussoorie covered libraries", foodRecommendation: { name: "Falls Junction Restaurant", dish: "Hot Maggi & Momos" } },
      { id: "ut-rafting", name: "Rishikesh River Rafting", category: "Adventure", description: "Trekking and river rafting through Ganges rapids (grades II-IV).", lat: 30.145, lng: 78.325, recommendedDuration: "3 hours", cost: 800, isOutdoor: true, rainAlternative: "Beatles Ashram domes", foodRecommendation: { name: "Freedom Cafe Rishikesh", dish: "Lemon Honey Ginger Tea & Pizza" } },
      { id: "ut-valley", name: "Valley of Flowers", category: "Nature", description: "UNESCO valley trek showing thousands of wild lilies and orchids in monsoon.", lat: 30.725, lng: 79.605, recommendedDuration: "6 hours", cost: 150, isOutdoor: true, rainAlternative: "Ghangaria base shelters", foodRecommendation: { name: "Ghangaria Local Diner", dish: "Dal Khichdi" } },
      { id: "ut-kedarnath", name: "Kedarnath Temple", category: "Spiritual", description: "Majestic stone temple of Lord Shiva backdropped by snowy peaks.", lat: 30.735, lng: 79.065, recommendedDuration: "5 hours", cost: 0, isOutdoor: true, rainAlternative: "Kedarnath pilgrim rest houses", foodRecommendation: { name: "Kedarnath Bhandara Mess", dish: "Simple Rice & Lentil stew" } },
      { id: "ut-corbett", name: "Jim Corbett National Park", category: "Wildlife", description: "Tiger reserve famous for open jeep safari and wild leopards.", lat: 29.535, lng: 78.784, recommendedDuration: "4 hours", cost: 900, isOutdoor: true, rainAlternative: "Forest research center museum", foodRecommendation: { name: "Corbett Grill House", dish: "Kumaoni Mutton Curry & Rice" } },
      { id: "ut-kanatal", name: "Kanatal Pine Hammocks", category: "Hidden Gem", description: "Quiet pine forests offering panoramic snow peak views away from Mussoorie crowds.", lat: 30.415, lng: 78.345, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Alpine wooden huts", foodRecommendation: { name: "Kanatal Eco Cafe", dish: "Local Gahat ki Dal & Roti" } },
      { id: "ut-food", name: "Dehradun Rajpur Cafe Crawl", category: "Food", description: "Famous street cafes serving local bakery items, cheese Maggi, and ginger teas.", lat: 30.354, lng: 78.061, recommendedDuration: "2 hours", cost: 400, isOutdoor: false, rainAlternative: "Indoor bakery shops", foodRecommendation: { name: "Ellora's Melting Moments", dish: "Stick Jaw Sweets & Bun Maska" } },
      { id: "ut-beatles", name: "Beatles Ashram", category: "Heritage", description: "Ruins of Maharishi Mahesh Yogi's ashram where the Beatles wrote the White Album.", lat: 30.118, lng: 78.315, recommendedDuration: "2 hours", cost: 150, isOutdoor: true, rainAlternative: "Ashram gallery domes", foodRecommendation: { name: "Beatles Cafe Rishikesh", dish: "Vegan Burger & Herbal Infusion" } }
    ],
    visaGuidance: "Standard rules. Registration required for pilgrims entering Char Dham circuits.",
    emergencyContacts: { police: "112", ambulance: "108", touristSupport: "+91-135-2720584" },
    scams: [
      { name: "Fake Yoga Instructor Courses", description: "Unlicensed Rishikesh schools selling dynamic Teacher Training certifications. Verify Yoga Alliance approval tags.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Respect Ganga River", detail: "Do not throw litter or soaps inside the holy Ganga. Walk bare feet on ghats." }
    ],
    packingBasics: ["Comfortable hiking shoes", "Water bottle", "Modest temple clothes"],
    festivals: ["Kumbh Mela", "International Yoga Festival", "Ganga Dussehra"],
    weatherTemplates: {
      spring: { temp: "12-25°C", condition: "Pleasant & Clear", packing: ["Light jacket", "Sunhat"] },
      summer: { temp: "18-30°C", condition: "Warm in valley, cool in hills", packing: ["Cottons", "Light fleece"] },
      autumn: { temp: "8-20°C", condition: "Crisp mountain wind", packing: ["Windbreaker", "Thermals"] },
      winter: { temp: "2-12°C", condition: "Cold & Chilly nights", packing: ["Heavy woolens", "Gloves"] }
    }
  },
  uttarpradesh: {
    name: "Uttar Pradesh",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 76,
    image: "/images/uttarpradesh.png",
    description: "The magnificent Taj Mahal, holy Ganga Aarti in Varanasi, and Nawabi cuisine in Lucknow.",
    touristPlaces: [
      { id: "up-taj", name: "Taj Mahal", category: "Heritage", description: "UNESCO world wonder white marble mausoleum, the ultimate symbol of Mughal love.", lat: 27.175, lng: 78.042, recommendedDuration: "3 hours", cost: 50, isOutdoor: true, rainAlternative: "Taj Museum inside the compound", foodRecommendation: { name: "Pinch of Spice (Agra)", dish: "Paneer Butter Masala & Garlic Naan" } },
      { id: "up-agrafort", name: "Agra Fort", category: "Heritage", description: "Massive walled sandstone palace fort built by Emperor Akbar.", lat: 27.179, lng: 78.022, recommendedDuration: "2 hours", cost: 350, isOutdoor: true, rainAlternative: "Agra Fort sheltered galleries", foodRecommendation: { name: "Agra Mughal Cafe", dish: "Petha sweets & Chai" } },
      { id: "up-varanasi", name: "Dashashwamedh Ghat", category: "Spiritual", description: "Varanasi riverbank hosting daily holy Ganga fire Aarti rituals.", lat: 25.308, lng: 83.011, recommendedDuration: "2 hours", cost: 300, isOutdoor: true, rainAlternative: "Ganga Aarti view from covered boats", foodRecommendation: { name: "Kashi Chat Bhandar", dish: "Tamatar Chat & Golgappe" } },
      { id: "up-bara", name: "Bara Imambara", category: "Heritage", description: "Nawabi labyrinth (Bhool Bhulaiya) with architectural gravity-defying halls.", lat: 26.868, lng: 80.915, recommendedDuration: "2.5 hours", cost: 300, isOutdoor: false, rainAlternative: "Bara Imambara chambers", foodRecommendation: { name: "Tunday Kababi", dish: "Galouti Kebab & Mughlai Parotta" } },
      { id: "up-sarnath", name: "Sarnath Deer Park", category: "Hidden Gem", description: "Buddhist stupas and deer park where Buddha preached first.", lat: 25.378, lng: 83.025, recommendedDuration: "2.5 hours", cost: 200, isOutdoor: true, rainAlternative: "Sarnath archaeological museum", foodRecommendation: { name: "Sarnath Cafe", dish: "Tibetan Momos" } },
      { id: "up-lucknow", name: "Chowk Street Food", category: "Food", description: "Vibrant Lucknow bazaar lanes famous for Kebabs, Malai Gilori, and Chikan clothes.", lat: 26.862, lng: 80.902, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Lucknow sweet shops interior", foodRecommendation: { name: "Mubeen's Diner", dish: "Nihari Kulcha" } },
      { id: "up-katarniaghat", name: "Katarniaghat Sanctuary", category: "Wildlife", description: "Terai forest reserve home to tigers, dolphins, and gharials.", lat: 28.188, lng: 81.332, recommendedDuration: "4 hours", cost: 500, isOutdoor: true, rainAlternative: "Katarnia wildlife camps", foodRecommendation: { name: "Bahraich Highway Rest Stop", dish: "Simple Dal Tadka & Roti" } },
      { id: "up-fatehpur", name: "Fatehpur Sikri Ruins", category: "Heritage", description: "16th-century ghost city built by Akbar, featuring Buland Darwaza and Salim Chishti tomb.", lat: 27.094, lng: 77.668, recommendedDuration: "3 hours", cost: 80, isOutdoor: true, rainAlternative: "Archaeological museum Fatehpur", foodRecommendation: { name: "Sikri Highway Restaurant", dish: "Petha Sweets & Bedai Sabzi" } },
      { id: "up-adventure", name: "Yamuna Sunset Boating", category: "Adventure", description: "Boating behind the Taj Mahal to capture the perfect sunset reflections.", lat: 27.178, lng: 78.046, recommendedDuration: "1 hour", cost: 500, isOutdoor: true, rainAlternative: "Taj View Hotel cafe", foodRecommendation: { name: "Taj View Cafe", dish: "Ginger Tea & Samosa" } },
      { id: "up-nature", name: "Sur Sarovar Bird Reserve", category: "Nature", description: "Quiet lake forest sheltering migratory birds and python conservation centers.", lat: 27.214, lng: 77.842, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Forest rest house rooms", foodRecommendation: { name: "Keetham Lake Stall", dish: "Hot Tea & Pakoras" } }
    ],
    visaGuidance: "Standard tourist guidelines apply. Pre-book Taj Mahal tickets online.",
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-522-2308916" },
    scams: [
      { name: "Varanasi Boat Overcharging", description: "Local boatmen quoting up to ₹5000 for standard Ganga boat rides. Never pay more than ₹500-1000.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Cremation Ghats Silence", detail: "Strictly no photography at Manikarnika cremation Ghat in Varanasi. Maintain silence." }
    ],
    packingBasics: ["Comfortable slip-on shoes", "Socks for hot marble floors", "Modest garments"],
    festivals: ["Taj Mahotsav", "Kumbh Mela (Prayagraj)", "Lathmar Holi"],
    weatherTemplates: {
      spring: { temp: "20-32°C", condition: "Warm & Clear", packing: ["Light fabrics", "Sunglasses"] },
      summer: { temp: "36-45°C", condition: "Extremely Hot (Loo wind)", packing: ["Umbrella for shade", "Electrolytes"] },
      autumn: { temp: "22-34°C", condition: "Humid & Pleasant evenings", packing: ["Cottons", "Cap"] },
      winter: { temp: "6-22°C", condition: "Chilly & Foggy", packing: ["Sweater or light coat", "Scarf"] }
    }
  },
  delhi: {
    name: "Delhi Capital",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 78,
    image: "/images/delhi.png",
    description: "Mughal sandstone fortresses, national war monuments, and Chandni Chowk street food.",
    touristPlaces: [
      { id: "del-redfort", name: "Red Fort", category: "Heritage", description: "UNESCO red sandstone fortress and seat of Mughal emperors.", lat: 28.656, lng: 77.241, recommendedDuration: "3 hours", cost: 80, isOutdoor: true, rainAlternative: "Red fort museum galleries", foodRecommendation: { name: "Karim's Old Delhi", dish: "Mutton Korma & Khamiri Roti" } },
      { id: "del-qutub", name: "Qutub Minar", category: "Heritage", description: "Historic 240-ft brick minaret covered in delicate calligraphic carvings.", lat: 28.524, lng: 77.185, recommendedDuration: "2 hours", cost: 50, isOutdoor: true, rainAlternative: "National Museum (alternative)", foodRecommendation: { name: "Olive Bar & Kitchen", dish: "Wood-fired Pizza" } },
      { id: "del-indiagate", name: "India Gate", category: "Heritage", description: "National triumphal arch war memorial surrounded by lawns.", lat: 28.612, lng: 77.229, recommendedDuration: "1 hour", cost: 0, isOutdoor: true, rainAlternative: "National Gallery of Modern Art (NGMA)", foodRecommendation: { name: "Pandara Road Gulati", dish: "Butter Chicken & Garlic Naan" } },
      { id: "del-lotus", name: "Lotus Temple", category: "Spiritual", description: "Lotus-shaped Bahai House of Worship famous for silent meditation.", lat: 28.553, lng: 77.258, recommendedDuration: "1.5 hours", cost: 0, isOutdoor: true, rainAlternative: "Lotus Temple interior dome", foodRecommendation: { name: "Kalkaji Dhaba", dish: "Dal Makhani & Naan" } },
      { id: "del-chandnichowk", name: "Chandni Chowk Market", category: "Food", description: "Charming narrow alleys of Old Delhi famous for Paranthas and Jalebis.", lat: 28.658, lng: 77.228, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Covered Paranthe Wali Gali shops", foodRecommendation: { name: "Babu Ram Devi Dayal", dish: "Spicy Mix Parantha with chutney" } },
      { id: "del-agrasen", name: "Agrasen ki Baoli", category: "Hidden Gem", description: "Ancient 100-step stone well tucked between high-rise office towers.", lat: 28.626, lng: 77.224, recommendedDuration: "1 hour", cost: 0, isOutdoor: true, rainAlternative: "British Council library nearby", foodRecommendation: { name: "CP Cha Bar", dish: "Darjeeling Tea & Scones" } },
      { id: "del-zoo", name: "National Zoological Park", category: "Wildlife", description: "Vast forest park housing white tigers, swamp deers, and gaurs.", lat: 28.613, lng: 77.248, recommendedDuration: "3 hours", cost: 80, isOutdoor: true, rainAlternative: "National Science Centre nearby", foodRecommendation: { name: "Science Centre Cafe", dish: "Veg Chowmein & Tea" } },
      { id: "del-sundernursery", name: "Sunder Nursery", category: "Nature", description: "16th-century heritage park parkland with Mughal monuments, lakes, and bonsai gardens.", lat: 28.595, lng: 77.243, recommendedDuration: "2 hours", cost: 50, isOutdoor: true, rainAlternative: "Sunder Nursery indoor cafe", foodRecommendation: { name: "Fabcafe by the Lake", dish: "Jackfruit Momos & Masala Tea" } },
      { id: "del-akshardham", name: "Akshardham Temple", category: "Spiritual", description: "Massive stone temple complex displaying classical Indian culture and water shows.", lat: 28.612, lng: 77.277, recommendedDuration: "4 hours", cost: 250, isOutdoor: false, rainAlternative: "Akshardham indoor exhibitions", foodRecommendation: { name: "Premvati Food Court", dish: "Swaminarayan Khichdi & Buttermilk" } },
      { id: "del-adventure", name: "Sanjay Van Eco Trekking", category: "Adventure", description: "Forest trekking through ancient ruins and rock climbing points in South Delhi.", lat: 28.528, lng: 77.162, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Qutub Minar restaurants", foodRecommendation: { name: "Sanjay Van Dhabas", dish: "Spicy Paneer Tikka & Naan" } }
    ],
    visaGuidance: "Standard rules. Metro smart card highly recommended to save travel queues.",
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-11-23365358" },
    scams: [
      { name: "Fake Tourist Information Centres", description: "Touts claim government info offices are closed or roads blocked, directing you to fake agencies. Ignore and use GPS.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Women Coach Metro", detail: "First coach of all Delhi Metro trains is reserved for female passengers." }
    ],
    packingBasics: ["Metro smart card", "Sun cap", "Anti-pollution mask (for winter months)"],
    festivals: ["Qutub Festival", "India International Trade Fair", "Phool Walon Ki Sair"],
    weatherTemplates: {
      spring: { temp: "15-30°C", condition: "Pleasant & Clear", packing: ["Cottons", "Light cardigans"] },
      summer: { temp: "35-45°C", condition: "Scorching & Dry", packing: ["Sunglasses", "Hydration flasks"] },
      autumn: { temp: "20-33°C", condition: "Humid but Cooler", packing: ["Cottons"] },
      winter: { temp: "5-18°C", condition: "Cold & Foggy (Smog prone)", packing: ["Warm coat", "Muffler"] }
    }
  },
  maharashtra: {
    name: "Maharashtra",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 82,
    image: "/images/maharashtra.png",
    description: "Gateway of India harbor, Lonavala hill caves, and the busy Marine Drive.",
    touristPlaces: [
      { id: "mah-gateway", name: "Gateway of India", category: "Heritage", description: "Iconic colonial basalt archway overlooking Mumbai harbor.", lat: 18.922, lng: 72.834, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "CSMVS museum nearby", foodRecommendation: { name: "Cafe Mondegar", dish: "Keema Ghotala & Bun Maska" } },
      { id: "mah-caves", name: "Karla Buddhist Caves", category: "Heritage", description: "Ancient Buddhist rock-cut shrines dating back to the 2nd century BC.", lat: 18.785, lng: 73.472, recommendedDuration: "4 hours", cost: 100, isOutdoor: true, rainAlternative: "Karla Cave temple structures", foodRecommendation: { name: "Lonavala Highway Dhaba", dish: "Spicy Kolhapuri Chicken" } },
      { id: "mah-marinedrive", name: "Marine Drive Promenade", category: "Nature", description: "Coastal road promenade illuminated as the 'Queen's Necklace' at night.", lat: 18.942, lng: 72.822, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Pizza by the Bay (indoor dining)", foodRecommendation: { name: "Pizza by the Bay", dish: "Bombil Fry & Seafood Pizza" } },
      { id: "mah-sanjay", name: "Sanjay Gandhi National Park", category: "Wildlife", description: "Protected forest reserve hosting leopards, tigers, and Kanheri Caves.", lat: 19.228, lng: 72.905, recommendedDuration: "4 hours", cost: 120, isOutdoor: true, rainAlternative: "Kanheri rock-cut cave tunnels", foodRecommendation: { name: "Borivali Station Eat", dish: "Vada Pav & Misal Pav" } },
      { id: "mah-food", name: "Girgaon Chowpatty Food", category: "Food", description: "Vibrant beachside food stalls famous for spicy bhel puri, pav bhaji, and kulfi.", lat: 18.954, lng: 72.812, recommendedDuration: "2 hours", cost: 250, isOutdoor: true, rainAlternative: "Sukh Sagar indoor restaurant", foodRecommendation: { name: "Badshah Cold Drink", dish: "Pav Bhaji & Mango Kulfi" } },
      { id: "mah-siddhivinayak", name: "Siddhivinayak Temple", category: "Spiritual", description: "Famous historic temple dedicated to Lord Ganesha, highly revered.", lat: 19.016, lng: 72.830, recommendedDuration: "1.5 hours", cost: 0, isOutdoor: false, rainAlternative: "Temple inner halls", foodRecommendation: { name: "Prabhadevi Sweets", dish: "Modak Sweet & Tea" } },
      { id: "mah-adventure", name: "Kolad River Rafting", category: "Adventure", description: "Thrilling whitewater rafting fed by dam water release in Western Ghats.", lat: 18.364, lng: 73.232, recommendedDuration: "5 hours", cost: 1500, isOutdoor: true, rainAlternative: "Kolad resort camps", foodRecommendation: { name: "Kolad Riverside Dhaba", dish: "Spicy Maharashtrian Pitla Bhakri" } },
      { id: "mah-lonar", name: "Lonar Crater Lake", category: "Hidden Gem", description: "Unique hyper-velocity meteorite impact lake, highly saline and surrounded by temple ruins.", lat: 19.975, lng: 76.505, recommendedDuration: "4 hours", cost: 50, isOutdoor: true, rainAlternative: "MTDC resort indoor restaurant", foodRecommendation: { name: "MTDC Crater Restaurant", dish: "Spicy Shev Bhaji & Roti" } },
      { id: "mah-lonavala", name: "Tiger's Point Lonavala", category: "Nature", description: "Stunning cliff viewpoint overlooking deep green valleys and waterfalls in monsoon.", lat: 18.732, lng: 73.415, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Lonavala indoor wax museum", foodRecommendation: { name: "Tiger Point Stalls", dish: "Cheese Corn Pakora & Ginger Tea" } }
    ],
    visaGuidance: "Standard rules. Elephanta Caves ferry tickets must be booked at Gateway jetty.",
    emergencyContacts: { police: "100", ambulance: "108", touristSupport: "+91-22-22845421" },
    scams: [
      { name: "Aggressive Portrait Photographers", description: "Photographers at Gateway pressure tourists for instant print photos, then demand large fees. Decline firmly.", rating: "Medium Risk" }
    ],
    customs: [
      { rule: "Let passengers de-board", detail: "Let local train passengers exit before attempting to step inside train coaches." }
    ],
    packingBasics: ["Comfortable sandals", "Rain gear (for monsoon)", "Linen wear"],
    festivals: ["Ganesh Chaturthi", "Gudi Padwa", "Ellora Ajanta Festival"],
    weatherTemplates: {
      spring: { temp: "22-32°C", condition: "Warm & Humid", packing: ["Breathable cottons"] },
      summer: { temp: "26-34°C", condition: "Heavy monsoons & High winds", packing: ["Heavy duty umbrella", "Waterproof footwear"] },
      autumn: { temp: "24-32°C", condition: "Post-monsoon warm", packing: ["Cottons"] },
      winter: { temp: "18-30°C", condition: "Pleasant coastal breeze", packing: ["Light cottons", "Light layers"] }
    }
  },
  westbengal: {
    name: "West Bengal",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 85,
    image: "/images/west bengal.png",
    description: "Darjeeling Toy Train rides, Victoria Memorial museum, and Sundarbans mangroves.",
    touristPlaces: [
      { id: "wb-victoria", name: "Victoria Memorial", category: "Heritage", description: "Stunning white marble palace museum and park dedicated to Queen Victoria.", lat: 22.545, lng: 88.342, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Victoria Memorial indoor galleries", foodRecommendation: { name: "Peter Cat (Park Street)", dish: "Cheelo Kebab" } },
      { id: "wb-darjeeling", name: "Darjeeling Toy Train", category: "Adventure", description: "Historic steam train running loops through mountain tea estates.", lat: 27.042, lng: 88.262, recommendedDuration: "2 hours", cost: 1500, isOutdoor: true, rainAlternative: "Darjeeling station shelter museum", foodRecommendation: { name: "Glenary's Bakery", dish: "Apple Pie & Darjeeling Tea" } },
      { id: "wb-sundarbans", name: "Sundarbans Tiger Reserve", category: "Wildlife", description: "Monstrous mangrove forest boating channels home to Royal Bengal Tigers.", lat: 22.115, lng: 88.855, recommendedDuration: "6 hours", cost: 600, isOutdoor: true, rainAlternative: "Sajnekhali watchtower interior", foodRecommendation: { name: "Mangrove Lodge Dining", dish: "Bhetki Macher Jhol (Fish Curry) & Rice" } },
      { id: "wb-food", name: "Dacres Lane Street Food", category: "Food", description: "Famous Kolkata office lane serving delicious stew, toast, and rolls.", lat: 22.568, lng: 88.352, recommendedDuration: "2 hours", cost: 150, isOutdoor: true, rainAlternative: "Chitto Babur Dokan indoor stalls", foodRecommendation: { name: "Chitto Babur Dokan", dish: "Chicken Stew & Toast" } },
      { id: "wb-dakshineswar", name: "Dakshineswar Kali Temple", category: "Spiritual", description: "Famous Hindu temple on the Hooghly river banks, associated with Ramakrishna Paramahansa.", lat: 22.655, lng: 88.358, recommendedDuration: "2.5 hours", cost: 0, isOutdoor: false, rainAlternative: "Temple inner courtyard galleries", foodRecommendation: { name: "Dakshineswar Veg Stall", dish: "Radhaballavi & Dum Aloo" } },
      { id: "wb-nature", name: "Darjeeling Tiger Hill", category: "Nature", description: "Breathtaking peak viewpoint offering panoramic sunrise views of Kanchenjunga.", lat: 27.015, lng: 88.285, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Tiger Hill observatory dome", foodRecommendation: { name: "Keventers Darjeeling", dish: "Hot Chocolate & Sausages" } },
      { id: "wb-hiddengem", name: "Lepchajagat Pine Village", category: "Hidden Gem", description: "Quiet forested village near Darjeeling, ideal for birdwatching and misty treks.", lat: 27.012, lng: 88.204, recommendedDuration: "4 hours", cost: 0, isOutdoor: true, rainAlternative: "Forest rest house lodge", foodRecommendation: { name: "Lepcha Homestay Kitchen", dish: "Chicken Thukpa & Momos" } },
      { id: "wb-historical", name: "Howrah Bridge Market", category: "Heritage", description: "Iconic cantilever bridge over Ganges and the adjoining vibrant flower market.", lat: 22.580, lng: 88.348, recommendedDuration: "2 hours", cost: 0, isOutdoor: true, rainAlternative: "Kolkata Town Hall museum", foodRecommendation: { name: "Mullick Ghat Tea Stall", dish: "Bhaanr-er Cha & Samosa" } },
      { id: "wb-jaldapara", name: "Jaldapara Elephant Safari", category: "Wildlife", description: "Forest reserve famous for one-horned rhinos, elephants, and leopards.", lat: 26.691, lng: 89.314, recommendedDuration: "4 hours", cost: 800, isOutdoor: true, rainAlternative: "Forest information centre", foodRecommendation: { name: "Madarihat Dhaba", dish: "Spicy Bengali Chicken Thali" } }
    ],
    visaGuidance: "Standard rules. Tiger Reserve entries need local forest permit stamps.",
    emergencyContacts: { police: "100", ambulance: "102", touristSupport: "+91-33-22488271" },
    scams: [
      { name: "Taxi refusal traps", description: "Yellow taxis refusing metered rides from Howrah/Sealdah station. Use ride-hailing Yatri Sathi app.", rating: "Medium Risk" }
    ],
    customs: [
      { rule: "Queue for trams", detail: "Stand on marked zones when boarding Kolkata's heritage trams in streets." }
    ],
    packingBasics: ["Comfortable sandals", "Sweater for Darjeeling", "Wet wipes"],
    festivals: ["Durga Puja", "Poila Baisakh", "Ganga Sagar Mela"],
    weatherTemplates: {
      spring: { temp: "18-28°C", condition: "Pleasant", packing: ["Cottons", "Light cardigan"] },
      summer: { temp: "28-36°C", condition: "Hot, Humid & Heavy Monsoons", packing: ["Umbrella", "Linen clothes"] },
      autumn: { temp: "22-31°C", condition: "Festive season (Durga Puja)", packing: ["Traditional wear", "Cottons"] },
      winter: { temp: "10-22°C", condition: "Cool & Pleasant (Chilly in hills)", packing: ["Sweater for hills", "Light coat"] }
    }
  },
  karnataka: {
    name: "Karnataka",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 88,
    image: "/images/karnataka.png",
    description: "Hampi stone temples, Mysore royal palace, and Coorg coffee estates.",
    touristPlaces: [
      { id: "kar-hampi", name: "Hampi Stone Chariot", category: "Heritage", description: "UNESCO site featuring ancient stone temples of the Vijayanagara Empire.", lat: 15.335, lng: 76.460, recommendedDuration: "4 hours", cost: 100, isOutdoor: true, rainAlternative: "Archaeological Museum Hampi", foodRecommendation: { name: "Mango Tree Restaurant", dish: "South Indian Thali" } },
      { id: "kar-mysore", name: "Mysore Palace", category: "Heritage", description: "Indo-Saracenic royal palace illuminated by 100,000 lightbulbs on Sundays.", lat: 12.302, lng: 76.655, recommendedDuration: "3 hours", cost: 100, isOutdoor: false, rainAlternative: "Mysore Palace interior corridors", foodRecommendation: { name: "Guru Sweet Mart", dish: "Mysore Pak (Ghee Sweet)" } },
      { id: "kar-coorg", name: "Coorg Coffee Estates", category: "Nature", description: "Rolling misty hills, cardamom shrubs, and coffee processing farms.", lat: 12.422, lng: 75.732, recommendedDuration: "3 hours", cost: 0, isOutdoor: true, rainAlternative: "Estates covered processing halls", foodRecommendation: { name: "Coorg Cuisine Restaurant", dish: "Pandi Curry & Kadambuttu" } },
      { id: "kar-food", name: "Bengaluru Food Street", category: "Food", description: "Famous evening street market serving butter dosas, paddu, and floating idli.", lat: 12.952, lng: 77.578, recommendedDuration: "2 hours", cost: 200, isOutdoor: true, rainAlternative: "Vidyarthi Bhavan (indoor restaurant)", foodRecommendation: { name: "Sri Vasavi Cafe", dish: "Avarebele Dosa & Akki Roti" } },
      { id: "kar-spiritual", name: "Murudeshwar Shiva Statue", category: "Spiritual", description: "World's second-tallest Shiva statue nested on the Arabian sea shore.", lat: 14.094, lng: 74.485, recommendedDuration: "3 hours", cost: 50, isOutdoor: true, rainAlternative: "Murudeshwar temple gopuram lifts", foodRecommendation: { name: "Nayak Veg Restaurant", dish: "Neer Dosa & Filter Coffee" } },
      { id: "kar-adventure", name: "Dandeli River Rafting", category: "Adventure", description: "Thrilling river rafting and canopy walks through Western Ghat forest reserves.", lat: 15.242, lng: 74.615, recommendedDuration: "5 hours", cost: 1200, isOutdoor: true, rainAlternative: "Dandeli forest eco lodge", foodRecommendation: { name: "Dandeli Forest Kitchen", dish: "Traditional Karnataka Jolada Roti Meal" } },
      { id: "kar-hiddengem", name: "Gokarna Half Moon Beach", category: "Hidden Gem", description: "Secluded crescent-shaped beach accessible only via forest trekking.", lat: 14.518, lng: 74.318, recommendedDuration: "4 hours", cost: 0, isOutdoor: true, rainAlternative: "Beach shacks under coconut trees", foodRecommendation: { name: "Namaste Cafe Gokarna", dish: "Prawn Ghee Roast" } },
      { id: "kar-wildlife", name: "Nagarhole Tiger Safari", category: "Wildlife", description: "Vast tiger reserve and elephant sanctuary inside the Nilgiri Biosphere.", lat: 12.025, lng: 76.155, recommendedDuration: "4 hours", cost: 1000, isOutdoor: true, rainAlternative: "Forest interpretation hall", foodRecommendation: { name: "Kabini Jungle Lodge", dish: "Steaming Hot South Indian Meals" } },
      { id: "kar-nature", name: "Jog Falls", category: "Nature", description: "Second-highest plunge waterfall in India, roaring down rocky cliffs during monsoon.", lat: 14.218, lng: 74.811, recommendedDuration: "3 hours", cost: 50, isOutdoor: true, rainAlternative: "Falls view cafe gallery", foodRecommendation: { name: "Jog Falls Cafe", dish: "Hot Onion Bhajji & Chai" } }
    ],
    visaGuidance: "Standard rules. Palace entry needs tickets from counters.",
    emergencyContacts: { police: "112", ambulance: "108", touristSupport: "+91-80-22352828" },
    scams: [
      { name: "Sandalwood Souvenir overpricing", description: "Hampi rickshaw drivers steer tourists to non-authorized shops selling fake sandalwood carvings. Go only to Cauvery Emporiums.", rating: "Medium Risk" }
    ],
    customs: [
      { rule: "Footwear off on platforms", detail: "Remove shoes before stepping onto active temple platform stones in Hampi." }
    ],
    packingBasics: ["Hiking socks", "Sunglasses", "Mosquito repellent"],
    festivals: ["Mysore Dasara", "Ugadi", "Kambala Buffalo Races"],
    weatherTemplates: {
      spring: { temp: "20-30°C", condition: "Warm & Clear", packing: ["Light garments", "Hat"] },
      summer: { temp: "22-32°C", condition: "Heavy Monsoons in Western Ghats", packing: ["Strong umbrella", "Rain boots"] },
      autumn: { temp: "18-28°C", condition: "Lush & Misty", packing: ["Light jacket", "Quick dry clothes"] },
      winter: { temp: "15-26°C", condition: "Pleasant & Fresh (Peak)", packing: ["Light sweater", "Cottons"] }
    }
  },
  sikkim: {
    name: "Sikkim",
    country: "India",
    currency: "INR (₹)",
    exchangeRate: "Local Currency",
    safetyScore: 95,
    image: "/images/sikkim.png",
    description: "Glacial lakes near the Indo-China border, Teesta river rafting, and mountain monasteries.",
    touristPlaces: [
      { id: "sik-tsomgo", name: "Tsomgo Glacial Lake", category: "Nature", description: "Sacred high-altitude lake that remains frozen during winter.", lat: 27.375, lng: 88.762, recommendedDuration: "3 hours", cost: 200, isOutdoor: true, rainAlternative: "Lake visitor shelter room", foodRecommendation: { name: "Lake Junction Stall", dish: "Hot Veg Thukpa & Maggie" } },
      { id: "sik-rumtek", name: "Rumtek Monastery", category: "Spiritual", description: "UNESCO-nominated Tibetan monastery hosting golden stupas and relics.", lat: 27.275, lng: 88.602, recommendedDuration: "3 hours", cost: 50, isOutdoor: false, rainAlternative: "Rumtek Prayer hall chambers", foodRecommendation: { name: "Rumtek Cafe", dish: "Tibetan Butter Tea & Tingmo" } },
      { id: "sik-teesta", name: "Teesta River Rafting", category: "Adventure", description: "Whitewater rafting along Teesta rapids backdropped by mountains.", lat: 27.125, lng: 88.502, recommendedDuration: "3 hours", cost: 1000, isOutdoor: true, rainAlternative: "Institute of Tibetology nearby", foodRecommendation: { name: "Melli Highway Dhaba", dish: "Pork Momos & Spicy Chutney" } },
      { id: "sik-food", name: "Gangtok MG Marg Trail", category: "Food", description: "Vibrant pedestrian mall road famous for local Tibetan and Sikkimese dining stalls.", lat: 27.328, lng: 88.612, recommendedDuration: "2 hours", cost: 300, isOutdoor: true, rainAlternative: "Baker's Cafe indoor seating", foodRecommendation: { name: "Roll House MG Marg", dish: "Mutton Momos & Cheese Rolls" } },
      { id: "sik-namchi", name: "Char Dham Namchi", category: "Spiritual", description: "Spiritual pilgrimage complex displaying a 108-ft Shiva statue and replicas of Char Dhams.", lat: 27.164, lng: 88.358, recommendedDuration: "3 hours", cost: 100, isOutdoor: true, rainAlternative: "Namchi cultural exhibition center", foodRecommendation: { name: "Char Dham Mess", dish: "Sikkimese Veg Sel Roti & Dum Aloo" } },
      { id: "sik-hiddengem", name: "Zuluk Silk Route Loop", category: "Hidden Gem", description: "High-altitude ancient silk route loop featuring 32 hairpin turns and sunrise views.", lat: 27.248, lng: 88.784, recommendedDuration: "4 hours", cost: 200, isOutdoor: true, rainAlternative: "Zuluk military transit shelters", foodRecommendation: { name: "Zuluk Homestay Dining", dish: "Chicken Thukpa & Ginger Tea" } },
      { id: "sik-wildlife", name: "Khangchendzonga Park", category: "Wildlife", description: "UNESCO high-altitude national park hosting red pandas, musk deer, and snow leopards.", lat: 27.605, lng: 88.258, recommendedDuration: "6 hours", cost: 350, isOutdoor: true, rainAlternative: "Wildlife interpretation museum", foodRecommendation: { name: "Yuksom Local Diner", dish: "Himalayan Shyaphaly" } },
      { id: "sik-nature", name: "Yumthang Flower Valley", category: "Nature", description: "Spectacular meadow of alpine flowers, hot springs, and yaks in North Sikkim.", lat: 27.824, lng: 88.692, recommendedDuration: "5 hours", cost: 150, isOutdoor: true, rainAlternative: "Yumthang hot spring bath house", foodRecommendation: { name: "Lachung Homestay Kitchen", dish: "Butter Tea & Thukpa" } },
      { id: "sik-historical", name: "Rabdentse Ruins", category: "Heritage", description: "17th-century ruins of the second capital of the Kingdom of Sikkim, nestled in forests.", lat: 27.294, lng: 88.235, recommendedDuration: "2 hours", cost: 50, isOutdoor: true, rainAlternative: "Pemayangtse Monastery museum", foodRecommendation: { name: "Pelling Cafe", dish: "Aloo Dum & Tingmo" } }
    ],
    visaGuidance: "Sikkim Inner Line Permit (ILP) required for Foreigners. Protected Area Permit (PAP) required for Tsomgo Lake.",
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-3592-209090" },
    scams: [
      { name: "Border Permit markup fees", description: "Agencies in Gangtok charging triple fees to arrange Nathula/Tsomgo permits. Arrange directly through registered hotels.", rating: "High Risk" }
    ],
    customs: [
      { rule: "Plastic Bottles Banned", detail: "Single-use plastic bottles are strictly banned in Lachen/Lachung valleys. Use flasks." }
    ],
    packingBasics: ["Heavy woolens", "ILP permit copy", "Anti-nausea medicines"],
    festivals: ["Losoong Festival", "Saga Dawa", "Bhumchu"],
    weatherTemplates: {
      spring: { temp: "10-18°C", condition: "Fresh & Flowers blooming", packing: ["Fleece jackets", "Walking boots"] },
      summer: { temp: "15-22°C", condition: "Heavy Rain (Landslide prone)", packing: ["Raincoat", "Quick dry socks"] },
      autumn: { temp: "5-15°C", condition: "Extremely clear views of peaks", packing: ["Heavy sweaters", "Windbreaker"] },
      winter: { temp: "-5 to 8°C", condition: "Freezing & Snowfall", packing: ["Down coat", "Thermals", "Snow gloves"] }
    }
  }
};

export const curatedDestinations = [
  { 
    id: "dest-ayodhya", 
    name: "Ayodhya", 
    state: "Uttar Pradesh", 
    lat: 26.792, 
    lng: 82.199, 
    description: "Ancient holy city, birthplace of Lord Rama, backdropped by the sacred Saryu river.", 
    category: "Spiritual", 
    recommendedDuration: "2 days", 
    cost: 0, 
    customs: "Remove shoes at entries. Modest clothing. Leather accessories prohibited inside shrines.", 
    scams: "Unauthorized local guides selling overpriced fast-darshan coupons.", 
    transport: "E-Rickshaws & walking", 
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-5278-223455" }, 
    foodRecommendation: { name: "Ramayana Mess", dish: "Kesar Rabdi & Ayodhya Pedas" },
    festivals: ["Deepotsav", "Ram Navami", "Kartik Mela"],
    peopleAlsoVisit: ["dest-kashi", "dest-vrindavan"],
    hotels: [
      { name: "The Ramayana Hotel", type: "Hotel", budgetTier: "Standard", rating: 4.5, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Saket Hotel", type: "Hotel", budgetTier: "Budget", rating: 3.8, features: ["Family Friendly"] },
      { name: "Taraji Resort", type: "Resort", budgetTier: "Luxury", rating: 4.8, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Ramayana Mess", rating: 4.5, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] },
      { name: "Kanak Rasoi", rating: 4.2, priceTier: "$", tags: ["Vegetarian", "Local Food"] }
    ]
  },
  { 
    id: "dest-kashi", 
    name: "Kashi (Varanasi)", 
    state: "Uttar Pradesh", 
    lat: 25.318, 
    lng: 83.008, 
    description: "Sacred city of lights and temples, famous for riverfront Ganga fire Aarti and historic Vishwanath temple.", 
    category: "Spiritual", 
    recommendedDuration: "3 days", 
    cost: 0, 
    customs: "Strictly no photography at cremation ghats. Maintain absolute quiet.", 
    scams: "Boatmen charging exorbitant rates. Fix prices or use government ticket counters.", 
    transport: "Auto-Rickshaws, cycle-rickshaws, and walking", 
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-542-2502263" }, 
    foodRecommendation: { name: "Kashi Chat Bhandar", dish: "Spicy Tamatar Chat & Rabdi" },
    festivals: ["Dev Deepawali", "Maha Shivratri", "Ganga Mahotsav"],
    peopleAlsoVisit: ["dest-ayodhya", "dest-vrindavan"],
    hotels: [
      { name: "BrijRama Palace", type: "Resort", budgetTier: "Luxury", rating: 4.8, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Alka Hotel", type: "Hotel", budgetTier: "Standard", rating: 4.2, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Ghat Guest House", type: "Guest House", budgetTier: "Budget", rating: 3.9, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Kashi Chat Bhandar", rating: 4.6, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] },
      { name: "Brown Bread Bakery", rating: 4.4, priceTier: "$$", tags: ["Cafe", "Vegetarian"] }
    ]
  },
  { 
    id: "dest-vrindavan", 
    name: "Vrindavan", 
    state: "Uttar Pradesh", 
    lat: 27.565, 
    lng: 77.701, 
    description: "Transcendental playground of Lord Krishna, featuring Banke Bihari temple and Prem Mandir.", 
    category: "Spiritual", 
    recommendedDuration: "2 days", 
    cost: 0, 
    customs: "Hold hands in respect. Chanting Hare Krishna is highly appreciated by locals.", 
    scams: "Aggressive monkeys stealing specs/phones. Local boys charging high to retrieve them. Store items.", 
    rating: "High Risk", 
    transport: "Auto-rickshaws, e-rickshaws", 
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-565-2442231" }, 
    foodRecommendation: { name: "Brijwasi Mithai", dish: "Mathura Peda & Malpua" },
    festivals: ["Lathmar Holi", "Janmashtami", "Radhashtami"],
    peopleAlsoVisit: ["dest-govardhan", "dest-barsana", "dest-ayodhya"],
    hotels: [
      { name: "Nidhivan Sarovar Portico", type: "Hotel", budgetTier: "Standard", rating: 4.4, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Ananda Krishna Van", type: "Hotel", budgetTier: "Budget", rating: 4.0, features: ["Family Friendly"] },
      { name: "MVT Guesthouse", type: "Guest House", budgetTier: "Budget", rating: 4.5, features: ["Couple Friendly"] }
    ],
    restaurants: [
      { name: "Govinda's Restaurant (ISKCON)", rating: 4.7, priceTier: "$$", tags: ["Vegetarian", "Family-friendly"] },
      { name: "Brijwasi Mithai", rating: 4.3, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-govardhan", 
    name: "Govardhan", 
    state: "Uttar Pradesh", 
    lat: 27.498, 
    lng: 77.469, 
    description: "Sacred hill lifted by Lord Krishna, walked by thousands of pilgrims performing the 21km Parikrama.", 
    category: "Spiritual", 
    recommendedDuration: "1 day", 
    cost: 0, 
    customs: "Circumambulate clockwise. Walking bare feet on the path is traditional.", 
    scams: "Touts selling fake Govardhan stones. Never purchase or remove sacred stones.", 
    transport: "E-rickshaws & walking", 
    emergencyContacts: { police: "112", ambulance: "102" }, 
    foodRecommendation: { name: "Radha Kund Diner", dish: "Kadhi Kachori & Lassi" },
    festivals: ["Guru Purnima", "Govardhan Puja"],
    peopleAlsoVisit: ["dest-vrindavan", "dest-barsana"],
    hotels: [
      { name: "Radha Kund Heritage", type: "Guest House", budgetTier: "Budget", rating: 4.1, features: ["Family Friendly"] },
      { name: "Govardhan Palace", type: "Hotel", budgetTier: "Standard", rating: 4.3, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Radha Kund Diner", rating: 4.0, priceTier: "$", tags: ["Vegetarian", "Local Food"] },
      { name: "Shri Krishna Bhojnalaya", rating: 4.2, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-barsana", 
    name: "Barsana", 
    state: "Uttar Pradesh", 
    lat: 27.648, 
    lng: 77.378, 
    description: "Birthplace of Radha Rani, nested on a hill with Radha Rani Temple, famous for Lathmar Holi.", 
    category: "Spiritual", 
    recommendedDuration: "1 day", 
    cost: 0, 
    customs: "Remove shoes. Dress modestly. Chant 'Radhe Radhe' when greeting.", 
    scams: "Local priests demanding heavy donation slips for temple trust. Keep a small change.", 
    transport: "Auto-rickshaws", 
    emergencyContacts: { police: "112", ambulance: "102" }, 
    foodRecommendation: { name: "Barsana Sweet Stall", dish: "Peda & Makhan Mishri" },
    festivals: ["Lathmar Holi", "Radhashtami"],
    peopleAlsoVisit: ["dest-vrindavan", "dest-govardhan"],
    hotels: [
      { name: "Shriji Guest House", type: "Guest House", budgetTier: "Budget", rating: 4.0, features: ["Family Friendly"] },
      { name: "Radha Rani Residency", type: "Hotel", budgetTier: "Standard", rating: 4.2, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Barsana Sweet Stall", rating: 4.3, priceTier: "$", tags: ["Vegetarian", "Local Food"] },
      { name: "Brij Bhoomi Bhojnalaya", rating: 4.1, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-nathdwara", 
    name: "Nathdwara", 
    state: "Rajasthan", 
    lat: 24.931, 
    lng: 73.821, 
    description: "Home of Shrinathji temple, hosting the massive 17th-century avatar of Lord Krishna, famous for Pichwai paintings.", 
    category: "Spiritual", 
    recommendedDuration: "1 day", 
    cost: 0, 
    customs: "Photography & electronics completely banned inside the temple. Dress traditionally.", 
    scams: "Vip darshan touts charging up to ₹2000. Use standard lines or official online slots.", 
    transport: "Auto-rickshaws", 
    emergencyContacts: { police: "100", ambulance: "108" }, 
    foodRecommendation: { name: "Shrinath Dining Mess", dish: "Pudina Lemonade & Rabdi Rab" },
    festivals: ["Janmashtami", "Annakut Utsav"],
    peopleAlsoVisit: ["dest-vrindavan"],
    hotels: [
      { name: "Hotel Radhika Palace", type: "Hotel", budgetTier: "Standard", rating: 4.2, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Shrinath Guesthouse", type: "Guest House", budgetTier: "Budget", rating: 3.9, features: ["Family Friendly"] },
      { name: "Marigold Resort Nathdwara", type: "Resort", budgetTier: "Luxury", rating: 4.6, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Shrinath Dining Mess", rating: 4.4, priceTier: "$$", tags: ["Vegetarian", "Local Food", "Family-friendly"] },
      { name: "Prasadam Veg Bistro", rating: 4.1, priceTier: "$", tags: ["Vegetarian", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-tirupati", 
    name: "Tirupati", 
    state: "Andhra Pradesh", 
    lat: 13.628, 
    lng: 79.419, 
    description: "Abode of Lord Venkateswara on Tirumala hills, the richest and most visited temple in India.", 
    category: "Spiritual", 
    recommendedDuration: "2 days", 
    cost: 300, 
    customs: "Tonsuring (head shaving) is traditional. Traditional dress code (dhoti/saree) is mandatory.", 
    scams: "Black market ticket sellers charging 5x. Always pre-book tickets online via official TTD portal.", 
    transport: "TTD Free buses, taxis", 
    emergencyContacts: { police: "112", ambulance: "108", touristSupport: "+91-877-2233333" }, 
    foodRecommendation: { name: "TTD Laddu Stall", dish: "Tirupati Laddu Prasad" },
    festivals: ["Srivari Brahmotsavam", "Vaikuntha Ekadashi"],
    peopleAlsoVisit: ["dest-rameswaram", "dest-hampi"],
    hotels: [
      { name: "Fortune Select Grand Ridge", type: "Hotel", budgetTier: "Luxury", rating: 4.5, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Marasa Sarovar Premiere", type: "Hotel", budgetTier: "Standard", rating: 4.3, features: ["Family Friendly", "Couple Friendly"] },
      { name: "TTD Srinivasam Guesthouse", type: "Guest House", budgetTier: "Budget", rating: 4.0, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Andhra Bhojanam Restaurant", rating: 4.4, priceTier: "$$", tags: ["Local Food", "Vegetarian", "Family-friendly"] },
      { name: "Sravana Bhavan Tirupati", rating: 4.2, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-shillong", 
    name: "Shillong", 
    state: "Meghalaya", 
    lat: 25.578, 
    lng: 91.893, 
    description: "Scotland of the East, featuring rolling green hills, waterfalls, and living root bridges.", 
    category: "Nature", 
    recommendedDuration: "3 days", 
    cost: 100, 
    customs: "Littering is strictly banned and fined. Respect indigenous Khasi cultural norms.", 
    scams: "Taxi drivers quoting high prices for Cherrapunji day trips. Rent through tourist taxi booths.", 
    transport: "Local shared cabs, private taxis", 
    emergencyContacts: { police: "100", ambulance: "108", touristSupport: "+91-364-2226220" }, 
    foodRecommendation: { name: "Trattoria Police Bazar", dish: "Jadoh (Khasi rice and pork)" },
    festivals: ["Shillong Autumn Festival", "Nongkrem Dance Festival"],
    peopleAlsoVisit: ["dest-tawang", "dest-ziro"],
    hotels: [
      { name: "Pinewood Hotel", type: "Hotel", budgetTier: "Standard", rating: 4.3, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Ri Kynjai Serenity Lake Resort", type: "Resort", budgetTier: "Luxury", rating: 4.7, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Police Bazar Guesthouse", type: "Guest House", budgetTier: "Budget", rating: 3.9, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Trattoria Police Bazar", rating: 4.5, priceTier: "$", tags: ["Local Food", "Family-friendly"] },
      { name: "Cafe Shillong", rating: 4.4, priceTier: "$$", tags: ["Cafe", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-chail", 
    name: "Chail", 
    state: "Himachal Pradesh", 
    lat: 30.985, 
    lng: 77.202, 
    description: "Quiet pine retreat, famous for the world's highest cricket ground and the historic Chail Palace.", 
    category: "Nature", 
    recommendedDuration: "2 days", 
    cost: 100, 
    customs: "Maintain environmental peace. Avoid playing loud music in forest trails.", 
    scams: "Overpricing on adventure rides inside the wildlife sanctuary. Check government rates.", 
    transport: "Private taxi, walk", 
    emergencyContacts: { police: "112", ambulance: "102" }, 
    foodRecommendation: { name: "Chail Palace Restaurant", dish: "Himachali Dham & Siddu" },
    festivals: ["Chail Summer Festival", "Lohri"],
    peopleAlsoVisit: ["dest-tawang", "dest-chail"],
    hotels: [
      { name: "Chail Palace Hotel", type: "Hotel", budgetTier: "Standard", rating: 4.3, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Ramsay Pine Resort", type: "Resort", budgetTier: "Luxury", rating: 4.6, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Hilltop Guest House", type: "Guest House", budgetTier: "Budget", rating: 4.0, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Chail Palace Restaurant", rating: 4.2, priceTier: "$$", tags: ["Local Food", "Family-friendly"] },
      { name: "Pineview Cafe", rating: 4.1, priceTier: "$", tags: ["Cafe", "Vegetarian"] }
    ]
  },
  { 
    id: "dest-tawang", 
    name: "Tawang", 
    state: "Arunachal Pradesh", 
    lat: 27.585, 
    lng: 91.859, 
    description: "Breathtaking valley hosting India's largest monastery (Tawang Monastery) near the Tibetan border.", 
    category: "Spiritual", 
    recommendedDuration: "3 days", 
    cost: 100, 
    customs: "Inner Line Permit (ILP) required. Clockwise rotation around stupas and prayer wheels.", 
    scams: "Permit agent markups. Arrange directly online via official ILP portal or registered hotels.", 
    transport: "Shared sumo cabs, private jeeps", 
    emergencyContacts: { police: "112", ambulance: "102", touristSupport: "+91-3794-222221" }, 
    foodRecommendation: { name: "Tawang Diner", dish: "Traditional Thukpa & Gyapa Khazi" },
    festivals: ["Torgya Festival", "Losar Tibetan Festival"],
    peopleAlsoVisit: ["dest-mechuka", "dest-ziro"],
    hotels: [
      { name: "Hotel Tawang Heights", type: "Hotel", budgetTier: "Standard", rating: 4.2, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Tawang Monastic Homestay", type: "Guest House", budgetTier: "Budget", rating: 4.5, features: ["Family Friendly"] },
      { name: "Dondrub Homestay", type: "Guest House", budgetTier: "Budget", rating: 4.6, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Tawang Diner", rating: 4.3, priceTier: "$", tags: ["Local Food", "Vegetarian"] },
      { name: "Dragon Cafe", rating: 4.2, priceTier: "$$", tags: ["Cafe", "Family-friendly"] }
    ]
  },
  { 
    id: "dest-mechuka", 
    name: "Mechuka", 
    state: "Arunachal Pradesh", 
    lat: 28.601, 
    lng: 94.135, 
    description: "Exquisite offbeat valley featuring snow peaks, wooden bridges, and the Yarlung Tsangpo river.", 
    category: "Hidden Gem", 
    recommendedDuration: "3 days", 
    cost: 100, 
    customs: "Respect local Memba Buddhist customs. Carry sufficient cash as ATMs are sparse.", 
    scams: "Very high rates for winter tyre chain rentals. Pre-negotiate with taxi unions in Along.", 
    transport: "Jeeps, walking", 
    emergencyContacts: { police: "112", ambulance: "102" }, 
    foodRecommendation: { name: "Memba Homestay Kitchen", dish: "Butter Tea & Roast Barley (Tsampa)" },
    festivals: ["Losar Festival", "Mechuka Adventure Festival"],
    peopleAlsoVisit: ["dest-tawang", "dest-ziro"],
    hotels: [
      { name: "Memba Heritage Homestay", type: "Guest House", budgetTier: "Budget", rating: 4.6, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Mechuka Riverview Lodge", type: "Hotel", budgetTier: "Standard", rating: 4.1, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Mechuka Local Kitchen", rating: 4.2, priceTier: "$", tags: ["Local Food", "Vegetarian"] },
      { name: "Mountain View Cafe", rating: 4.0, priceTier: "$$", tags: ["Cafe"] }
    ]
  },
  { 
    id: "dest-ziro", 
    name: "Ziro Valley", 
    state: "Arunachal Pradesh", 
    lat: 27.592, 
    lng: 93.831, 
    description: "Scenic pine valley, home of the Apatani tribe, paddy-cum-fish culture, and music festivals.", 
    category: "Hidden Gem", 
    recommendedDuration: "3 days", 
    cost: 200, 
    customs: "Seek permission before taking photos of Apatani elders with traditional nose plugs.", 
    scams: "Music festival ticket resale scams. Purchase passes only from official websites.", 
    transport: "Taxis, cycles", 
    emergencyContacts: { police: "112", ambulance: "102" }, 
    foodRecommendation: { name: "Apatani Kitchen", dish: "Pike Pila (bamboo shoot dish)" },
    festivals: ["Ziro Festival of Music", "Myoko Festival"],
    peopleAlsoVisit: ["dest-tawang", "dest-mechuka"],
    hotels: [
      { name: "Ziro Pine Resort", type: "Resort", budgetTier: "Standard", rating: 4.2, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Apatani Traditional Homestay", type: "Guest House", budgetTier: "Budget", rating: 4.7, features: ["Family Friendly", "Couple Friendly"] }
    ],
    restaurants: [
      { name: "Apatani Kitchen", rating: 4.4, priceTier: "$$", tags: ["Local Food", "Family-friendly"] },
      { name: "Ziro Valley Bistro", rating: 4.1, priceTier: "$", tags: ["Vegetarian", "Cafe"] }
    ]
  },
  { 
    id: "dest-hampi", 
    name: "Hampi", 
    state: "Karnataka", 
    lat: 15.335, 
    lng: 76.462, 
    description: "Spectacular ruins of the Vijayanagara Empire, featuring stone temples, monoliths, and coracle rides.", 
    category: "Heritage", 
    recommendedDuration: "3 days", 
    cost: 80, 
    customs: "Alcohol is banned in Hampi temple village. Respect sacred steps. Wear modest clothes.", 
    scams: "Fake tour guides charging double. Hire only verified guides showing official licenses.", 
    transport: "Bicycles, scooters, auto-rickshaws", 
    emergencyContacts: { police: "112", ambulance: "108", touristSupport: "+91-8394-221333" }, 
    foodRecommendation: { name: "Mango Tree Restaurant", dish: "South Indian Thali on banana leaf" },
    festivals: ["Hampi Utsav", "Purandara Dasa Aradhana"],
    peopleAlsoVisit: ["dest-tirupati", "dest-rameswaram"],
    hotels: [
      { name: "Evolve Back Kamalapura Palace", type: "Resort", budgetTier: "Luxury", rating: 4.9, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Hampi Boulders Resort", type: "Resort", budgetTier: "Standard", rating: 4.4, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Shanthi Guest House", type: "Guest House", budgetTier: "Budget", rating: 4.2, features: ["Couple Friendly"] }
    ],
    restaurants: [
      { name: "Mango Tree Restaurant", rating: 4.6, priceTier: "$$", tags: ["Vegetarian", "Local Food", "Family-friendly"] },
      { name: "Laughing Buddha Cafe", rating: 4.4, priceTier: "$$", tags: ["Cafe", "Vegetarian"] }
    ]
  },
  { 
    id: "dest-rameswaram", 
    name: "Rameswaram", 
    state: "Tamil Nadu", 
    lat: 9.288, 
    lng: 79.312, 
    description: "Sacred island temple, home to Ramanathaswamy temple with the longest corridor and Dhanushkodi ghost town.", 
    category: "Spiritual", 
    recommendedDuration: "2 days", 
    cost: 0, 
    customs: "Bathe in the 22 holy water tanks inside the temple before entering the main shrine.", 
    scams: "Purohits charging high fees to perform customized pujas. Pay only at official trust counters.", 
    transport: "Auto-rickshaws, local buses", 
    emergencyContacts: { police: "100", ambulance: "108", touristSupport: "+91-4573-221371" }, 
    foodRecommendation: { name: "Ramanatha Mess", dish: "Ghee Roast Dosa & Idli" },
    festivals: ["Maha Shivratri", "Thirukalyanam Festival"],
    peopleAlsoVisit: ["dest-tirupati", "dest-hampi"],
    hotels: [
      { name: "Daiwik Hotels Rameswaram", type: "Hotel", budgetTier: "Standard", rating: 4.3, features: ["Family Friendly", "Couple Friendly"] },
      { name: "Jiwan Residency", type: "Hotel", budgetTier: "Standard", rating: 4.1, features: ["Family Friendly"] },
      { name: "Ramanatha Pilgrim Lodge", type: "Guest House", budgetTier: "Budget", rating: 3.8, features: ["Family Friendly"] }
    ],
    restaurants: [
      { name: "Ramanatha Mess", rating: 4.4, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] },
      { name: "Aaryas Veg Restaurant", rating: 4.1, priceTier: "$", tags: ["Vegetarian", "Local Food", "Family-friendly"] }
    ]
  }
];
