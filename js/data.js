/* ==========================================================================
   PLAYHUB — Product Data
   Every product has a "cover" spec instead of an image URL. The UI layer
   (render functions in products.js) turns this into a generated poster:
   a duotone gradient with a signature diagonal blade cut, in lieu of
   hot-linked artwork that could break. This keeps every card visually
   distinct and premium instead of a generic gray placeholder.
   ========================================================================== */

const PRODUCTS = [
  {
    id: 1,
    name: "GTA VI",
    subtitle: "Rockstar Games",
    platform: "PS5",
    category: "Action",
    price: 3200000,
    oldPrice: null,
    rating: 5,
    tag: "new",
    cover: { from: "#ff5f6d", to: "#1a0e2e", accent: "#ffd166" }
  },
  {
    id: 2,
    name: "GTA V",
    subtitle: "Rockstar Games",
    platform: "PS4",
    category: "Action",
    price: 850000,
    oldPrice: 1200000,
    rating: 5,
    tag: "sale",
    cover: { from: "#2b5876", to: "#4e4376", accent: "#8fd3f4" }
  },
  {
    id: 3,
    name: "EA Sports FC 26",
    subtitle: "EA Vancouver",
    platform: "PS5",
    category: "Sports",
    price: 2100000,
    oldPrice: null,
    rating: 4,
    tag: "new",
    cover: { from: "#0f9b0f", to: "#062b17", accent: "#c8ff4d" }
  },
  {
    id: 4,
    name: "Call of Duty: Black Ops 7",
    subtitle: "Treyarch",
    platform: "PS5",
    category: "Action",
    price: 2900000,
    oldPrice: null,
    rating: 4,
    tag: "new",
    cover: { from: "#232526", to: "#0d0d0f", accent: "#ff4d4d" }
  },
  {
    id: 5,
    name: "Marvel's Spider-Man 2",
    subtitle: "Insomniac Games",
    platform: "PS5",
    category: "Action",
    price: 2450000,
    oldPrice: 2900000,
    rating: 5,
    tag: "sale",
    cover: { from: "#8a0303", to: "#1a1a2e", accent: "#3b6fff" }
  },
  {
    id: 6,
    name: "God of War Ragnarök",
    subtitle: "Santa Monica Studio",
    platform: "PS5",
    category: "Adventure",
    price: 1950000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#1e3c72", to: "#0a0a0a", accent: "#e8c27a" }
  },
  {
    id: 7,
    name: "Resident Evil 4",
    subtitle: "Capcom",
    platform: "PS5",
    category: "Horror",
    price: 1750000,
    oldPrice: 2100000,
    rating: 5,
    tag: "sale",
    cover: { from: "#3a0d0d", to: "#0a0505", accent: "#c0392b" }
  },
  {
    id: 8,
    name: "Red Dead Redemption 2",
    subtitle: "Rockstar Games",
    platform: "PS4",
    category: "Adventure",
    price: 990000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#5a3a22", to: "#1a1208", accent: "#d98e3f" }
  },
  {
    id: 9,
    name: "Horizon Forbidden West",
    subtitle: "Guerrilla Games",
    platform: "PS5",
    category: "RPG",
    price: 1600000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#0f4c5c", to: "#071e26", accent: "#e07a5f" }
  },
  {
    id: 10,
    name: "The Last of Us Part II",
    subtitle: "Naughty Dog",
    platform: "PS4",
    category: "Adventure",
    price: 890000,
    oldPrice: 1100000,
    rating: 5,
    tag: "sale",
    cover: { from: "#1b1b1b", to: "#3a3a3a", accent: "#7fae59" }
  },
  {
    id: 11,
    name: "Elden Ring",
    subtitle: "FromSoftware",
    platform: "PS5",
    category: "RPG",
    price: 2050000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#3b2f1e", to: "#0a0806", accent: "#c9a24b" }
  },
  {
    id: 12,
    name: "Ghost of Tsushima",
    subtitle: "Sucker Punch",
    platform: "PS4",
    category: "Action",
    price: 1150000,
    oldPrice: null,
    rating: 5,
    tag: null,
    cover: { from: "#7a1f1f", to: "#1a0a0a", accent: "#f2c14e" }
  },
  {
    id: 13,
    name: "Final Fantasy XVI",
    subtitle: "Square Enix",
    platform: "PS5",
    category: "RPG",
    price: 1890000,
    oldPrice: 2300000,
    rating: 4,
    tag: "sale",
    cover: { from: "#4a0e0e", to: "#120202", accent: "#ff6b6b" }
  },
  {
    id: 14,
    name: "Gran Turismo 7",
    subtitle: "Polyphony Digital",
    platform: "PS5",
    category: "Racing",
    price: 1690000,
    oldPrice: null,
    rating: 4,
    tag: null,
    cover: { from: "#0d1b2a", to: "#000000", accent: "#00a8ff" }
  },
  {
    id: 15,
    name: "Demon's Souls",
    subtitle: "Bluepoint Games",
    platform: "PS5",
    category: "RPG",
    price: 1400000,
    oldPrice: null,
    rating: 4,
    tag: null,
    cover: { from: "#151021", to: "#050308", accent: "#6a4cff" }
  },
  {
    id: 16,
    name: "Returnal",
    subtitle: "Housemarque",
    platform: "PS5",
    category: "Action",
    price: 1250000,
    oldPrice: 1600000,
    rating: 4,
    tag: "sale",
    cover: { from: "#6a0f6a", to: "#100815", accent: "#ff5ec4" }
  },
  {
    id: 17,
    name: "EA Sports UFC 5",
    subtitle: "EA Vancouver",
    platform: "PS5",
    category: "Fighting",
    price: 1550000,
    oldPrice: null,
    rating: 4,
    tag: null,
    cover: { from: "#1b1b1b", to: "#4d0000", accent: "#ff2e2e" }
  },
  {
    id: 18,
    name: "Street Fighter 6",
    subtitle: "Capcom",
    platform: "PS5",
    category: "Fighting",
    price: 1450000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#111827", to: "#f59e0b22", accent: "#f59e0b" }
  },
  {
    id: 19,
    name: "F1 26",
    subtitle: "Codemasters",
    platform: "PS5",
    category: "Racing",
    price: 1990000,
    oldPrice: null,
    rating: 4,
    tag: "new",
    cover: { from: "#1c1c1c", to: "#3a0000", accent: "#e10600" }
  },
  {
    id: 20,
    name: "Dead Space",
    subtitle: "Motive Studio",
    platform: "PS5",
    category: "Horror",
    price: 1350000,
    oldPrice: 1700000,
    rating: 5,
    tag: "sale",
    cover: { from: "#0a0f0f", to: "#031a1a", accent: "#ff8c00" }
  },
  {
    id: 21,
    name: "Persona 5 Royal",
    subtitle: "Atlus",
    platform: "PS4",
    category: "RPG",
    price: 990000,
    oldPrice: null,
    rating: 5,
    tag: "popular",
    cover: { from: "#1a0000", to: "#000000", accent: "#e60023" }
  },
  {
    id: 22,
    name: "Death Stranding 2",
    subtitle: "Kojima Productions",
    platform: "PS5",
    category: "Adventure",
    price: 2250000,
    oldPrice: null,
    rating: 4,
    tag: "new",
    cover: { from: "#1a2b3c", to: "#05080b", accent: "#ffcb47" }
  },
  {
    id: 23,
    name: "Until Dawn",
    subtitle: "Supermassive Games",
    platform: "PS4",
    category: "Horror",
    price: 650000,
    oldPrice: 900000,
    rating: 4,
    tag: "sale",
    cover: { from: "#1a1a2e", to: "#0d0d17", accent: "#e94560" }
  },
  {
    id: 24,
    name: "Sackboy: A Big Adventure",
    subtitle: "Sumo Digital",
    platform: "PS5",
    category: "Adventure",
    price: 780000,
    oldPrice: null,
    rating: 4,
    tag: null,
    cover: { from: "#0e4d64", to: "#062330", accent: "#ffd23f" }
  }
];

const CATEGORIES = [
  { id: "ps5", label: "PS5 Games", filterKey: "platform", filterVal: "PS5", cover: { from: "#0d1b2a", to: "#000", accent: "#00a8ff" } },
  { id: "ps4", label: "PS4 Games", filterKey: "platform", filterVal: "PS4", cover: { from: "#1e3c72", to: "#0a0a0a", accent: "#8fd3f4" } },
  { id: "plus", label: "PlayStation Plus", filterKey: null, filterVal: null, cover: { from: "#003b6f", to: "#001220", accent: "#00a8ff" } },
  { id: "gift", label: "Gift Cards", filterKey: null, filterVal: null, cover: { from: "#3a0d5c", to: "#0e0316", accent: "#c77dff" } }
];

const GENRES = ["Action", "Adventure", "RPG", "Sports", "Racing", "Fighting", "Horror"];
const PLATFORMS = ["PS5", "PS4"];

function formatToman(n) {
  return n.toLocaleString("fa-IR") + " تومان";
}
