const { arabToRoman } = require("roman-numbers");

//Generating Achievements
const generateLeveledAchievements = (
  baseId: number,
  name: string,
  description: string,
  key: string,
  levels: any[],
  category: string,
) => {
  return levels.map((threshold: number, index: number) => ({
    id: baseId + index,
    name: `${name} ${arabToRoman(index + 1)}`,
    description: `${description} ${threshold}`,
    category,
    condition: (state: { [x: string]: number }) =>
      (state[key] ?? 0) >= threshold,
  }));
};

const prestigeLevels = [1, 5, 10, 20];
const clickMultiplierLevels = [10, 100, 1000];
const collectorLevels = [10, 100, 1000, 10000];

export const achievementsData = [
  // Earnings-Based Achievements (Wealth)
  {
    id: 1,
    name: "First Paw Point",
    description: "Earn your first Paw Point 🐾",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1,
    category: "Wealth",
  },
  {
    id: 2,
    name: "Getting Started",
    description: "Reach 1,000 Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1000,
    category: "Wealth",
  },
  {
    id: 3,
    name: "On the Grind",
    description: "Reach 10,000 Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 10000,
    category: "Wealth",
  },
  {
    id: 4,
    name: "Millionaire Mindset",
    description: "Earn 1M Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1000000,
    category: "Wealth",
  },
  {
    id: 5,
    name: "Billionaire Tycoon",
    description: "Earn 1B Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1000000000,
    category: "Wealth",
  },
  {
    id: 6,
    name: "Trillionaire Legend",
    description: "Earn 1T Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1000000000000,
    category: "Wealth",
  },

  // Click Multiplier Achievements (Efficiency)
  ...generateLeveledAchievements(
    100,
    "Veteran Clicker",
    "Reach Click Multiplier",
    "clickMultiplier",
    clickMultiplierLevels,
    "Efficiency",
  ),

  // Prestige-Based Achievements (Prestige)
  ...generateLeveledAchievements(
    200,
    "Prestige Master",
    "Reach Prestige Level",
    "prestigeLevel",
    prestigeLevels,
    "Prestige",
  ),

  // Upgrade-Based Achievements (Collector)
  {
    id: 13,
    name: "Latemeal Investor",
    description: "Own 250 Late Meals",
    condition: (state: { latemeal: number }) => state.latemeal >= 250,
    category: "Collector",
  },
  {
    id: 14,
    name: "Scanner Master",
    description: "Own 190 Scanners",
    condition: (state: { scanner: number }) => state.scanner >= 190,
    category: "Collector",
  },
  {
    id: 15,
    name: "Delivery Mogul",
    description: "Own 150 Delivery Units",
    condition: (state: { deliveries: number }) => state.deliveries >= 150,
    category: "Collector",
  },
  {
    id: 16,
    name: "Resco Ruler",
    description: "Own 120 Resco Facilities",
    condition: (state: { resco: number }) => state.resco >= 120,
    category: "Collector",
  },
  {
    id: 17,
    name: "Farm Empire",
    description: "Own 100 Farms",
    condition: (state: { farms: number }) => state.farms >= 100,
    category: "Collector",
  },
  {
    id: 18,
    name: "Mine Tycoon",
    description: "Own 90 Mines",
    condition: (state: { mine: number }) => state.mine >= 90,
    category: "Collector",
  },
  {
    id: 19,
    name: "Industrialist",
    description: "Own 75 Factories",
    condition: (state: { factories: number }) => state.factories >= 75,
    category: "Collector",
  },
  {
    id: 20,
    name: "Bankroll King",
    description: "Own 60 Banks",
    condition: (state: { bank: number }) => state.bank >= 60,
    category: "Collector",
  },
  {
    id: 21,
    name: "Scientific Pioneer",
    description: "Own 40 Labs",
    condition: (state: { lab: number }) => state.lab >= 40,
    category: "Collector",
  },
  {
    id: 22,
    name: "Divine Overseer",
    description: "Own 20 Temples",
    condition: (state: { temple: number }) => state.temple >= 20,
    category: "Collector",
  },
  {
    id: 23,
    name: "Galactic Overlord",
    description: "Own 10 Space Stations",
    condition: (state: { spaceStation: number }) => state.spaceStation >= 10,
    category: "Collector",
  },

  // Special Achievements
  {
    id: 24,
    name: "Click Frenzy",
    description: "Click 1,000 times",
    condition: (state: { count: number }) => state.count >= 1000,
    category: "Efficiency",
  },
  //passiveIncome
  {
    id: 25,
    name: "Paw Point Producer",
    description: "Earn 1000 Paw Points per second",
    condition: (state: { passiveIncome: number }) =>
      state.passiveIncome >= 1000,
    category: "Wealth",
  },
  {
    id: 26,
    name: "Paw Point Printer",
    description: "Earn 1M Paw Points per second",
    condition: (state: { passiveIncome: number }) =>
      state.passiveIncome >= 1000000,
    category: "Wealth",
  },
  //totalEfficiencyBoost

  {
    id: 27,
    name: "Time Traveler",
    description: "Play for 24 hours",
    condition: (state: { playTime: number }) => state.playTime >= 86400000,
    category: "Hidden",
  },
  {
    id: 28,
    name: "Weekend Warrior",
    description: "Play for 7 days",
    condition: (state: { playTime: number }) => state.playTime >= 604800000,
    category: "Hidden",
  },
  ...generateLeveledAchievements(
    300,
    "Collector Enthusiast",
    "Collectors Owned >=",
    "collectors",
    collectorLevels,
    "Collector",
  ),

  {
    id: 33,
    name: "Explorer",
    description: "Unlock a hidden feature",
    condition: (state: { hiddenFeaturesUnlocked: number }) =>
      state.hiddenFeaturesUnlocked >= 1,
    category: "Hidden",
  },
  {
    id: 34,
    name: "Wealth Overflow",
    description: "Earn 1 Quadrillion Paw Points",
    condition: (state: { lifeTimeEarnings: number }) =>
      state.lifeTimeEarnings >= 1000000000000000,
    category: "Wealth",
  },
];

//Colors for Achievements
export const categoryColors: Record<
  string,
  { bg: string; border: string; text: string }
> = {
  Collector: {
    bg: "bg-blue-200",
    border: "border-blue-500",
    text: "text-blue-800",
  },
  Efficiency: {
    bg: "bg-green-200",
    border: "border-green-500",
    text: "text-green-800",
  },
  Wealth: {
    bg: "bg-yellow-200",
    border: "border-yellow-500",
    text: "text-yellow-800",
  },
  Prestige: {
    bg: "bg-purple-200",
    border: "border-purple-500",
    text: "text-purple-800",
  },
  Hidden: {
    bg: "bg-gray-300",
    border: "border-gray-500",
    text: "text-gray-700",
  },
  Default: {
    bg: "bg-gray-200",
    border: "border-gray-400",
    text: "text-gray-600",
  },
};
