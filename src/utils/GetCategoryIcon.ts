export const getCategoryIcon = (category: string) => {
  const icons: Record<string, string> = {
    // --- Core Restaurant Categories ---
    appetizers: "🥗",
    starters: "🥗",
    mains: "🍝",
    entrees: "🍽️",
    desserts: "🍰",
    sweets: "🧁",
    drinks: "🥤",
    beverages: "🍹",
    sides: "🍟",
    specials: "⭐",
    combos: "🍱",
    kids: "🧒",
    breakfast: "🍳",
    brunch: "🥞",
    lunch: "🍱",
    dinner: "🍽️",

    // --- Food Types ---
    pizza: "🍕",
    burgers: "🍔",
    sandwiches: "🥪",
    pasta: "🍝",
    noodles: "🍜",
    sushi: "🍣",
    seafood: "🦞",
    steak: "🥩",
    chicken: "🍗",
    barbecue: "🍖",
    salad: "🥗",
    soup: "🍲",
    rice: "🍚",

    // --- Cuisines ----
    italian: "🇮🇹",
    japanese: "🇯🇵",
    chinese: "🇨🇳",
    thai: "🇹🇭",
    indian: "🇮🇳",
    mexican: "🇲🇽",
    french: "🇫🇷",
    turkish: "🇹🇷",
    american: "🇺🇸",
    iranian: "🇮🇷",
    arabic: "🕌",
    korean: "🇰🇷",
    greek: "🇬🇷",
    spanish: "🇪🇸",

    // --- Desserts ---
    icecream: "🍨",
    donut: "🍩",
    pastry: "🥐",
    cake: "🍰",
    chocolate: "🍫",
    candy: "🍬",

    // --- Drinks ---
    coffee: "☕",
    tea: "🫖",
    juice: "🧃",
    smoothie: "🥤",
    alcohol: "🍺",
    beer: "🍻",
    wine: "🍷",
    cocktail: "🍸",
    milkshake: "🥛",

    // --- Diet / Health ---
    vegan: "🌱",
    vegetarian: "🥦",
    glutenfree: "🚫🌾",
    keto: "🥓",
    halal: "🕌",
    kosher: "✡️",
    healthy: "🍏",

    // --- Fast Food ---
    fried: "🍗",
    tacos: "🌮",
    burrito: "🌯",
    hotdogs: "🌭",
    fries: "🍟",

    // --- Bakery ---
    bakery: "🥖",
    bread: "🍞",
    buns: "🥯",

    // --- Snacks ---
    chips: "🍿",
    popcorn: "🍿",
    nuts: "🥜",
    fruit: "🍎",
    cheese: "🧀",

    // --- Seasonal / Events ---
    christmas: "🎄",
    halloween: "🎃",
    valentines: "❤️",
    summer: "☀️",
    winter: "❄️",

    // --- Misc categories ---
    chef: "👨‍🍳",
    trending: "🔥",
    new: "🆕",
    recommended: "👍",
    bestseller: "🏆",
  };

  return icons[category.toLowerCase()] || "📋";
};
