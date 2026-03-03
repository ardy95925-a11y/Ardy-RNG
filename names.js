const NAMES = {
  common: [
    "James","John","Robert","Michael","William","David","Richard","Joseph",
    "Thomas","Charles","Mary","Patricia","Jennifer","Linda","Barbara","Susan",
    "Jessica","Sarah","Karen","Lisa","Daniel","Matthew","Anthony","Donald",
    "Mark","Paul","Steven","Andrew","Kenneth","Joshua","Kevin","Brian",
    "George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob",
    "Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott",
    "Brandon","Benjamin","Emma","Olivia","Ava","Isabella","Sophia","Mia",
    "Charlotte","Amelia","Harper","Evelyn","Abigail","Emily","Elizabeth",
    "Sofia","Ella","Madison","Scarlett","Victoria","Aria","Grace","Chloe",
    "Camila","Penelope","Riley","Layla","Lillian","Nora","Zoey","Hannah"
  ],
  uncommon: [
    "Theodore","Sebastian","Dominic","Maxwell","Harrison","Nathaniel","Elliot",
    "Jasper","Atticus","Emmett","Silas","Declan","Rowan","Finnegan","Callum",
    "Sullivan","Beckett","Fletcher","Holden","Desmond","Margot","Vivienne",
    "Genevieve","Cordelia","Rosalind","Beatrice","Cecelia","Adelaide","Isadora",
    "Josephine","Evangeline","Arabella","Seraphina","Clementine","Wilhelmina",
    "Octavia","Leonora","Celestine","Imogen","Elspeth","Aldric","Bramwell",
    "Crispin","Edmund","Florian","Gideon","Hadrian","Ignatius","Jethro",
    "Lysander","Merrick","Oberon","Phineas","Quentin","Raleigh","Thaddeus",
    "Upton","Vaughn","Warwick","Xander","Yorick","Zebediah","Alaric","Bastian"
  ],
  rare: [
    "Aurelius","Balthazar","Caelum","Dorian","Evander","Fionn","Griffith",
    "Hawthorne","Isidore","Jareth","Keiran","Leander","Mordecai","Niall",
    "Orion","Percival","Quillan","Remington","Stellan","Tarquin","Ulric",
    "Vesper","Willoughby","Xiomara","Ysolde","Zephyrine","Alistair","Breccan",
    "Caelan","Devereux","Elowen","Faustine","Hesper","Iolanthe",
    "Jocasta","Keturah","Lysandra","Marisol","Nerissa","Ophelia","Palatine",
    "Quintessa","Rowena","Saoirse","Thessaly","Undine","Valentijn","Wisteria",
    "Xanthippe","Yseult","Zenobia","Amaranta","Bellatrix","Calixta","Delphine"
  ],
  legendary: [
    "Achilles","Brennius","Cassivellaunus","Etherion","Forsvar",
    "Galahad","Havelock","Iamblichus","Jadwiga","Kerridwen","Laoghaire",
    "Maelgwn","Niamh","Ossian","Pryderi","Quilaztli","Ragnvald","Sigrdriva",
    "Taranis","Ulfryn","Vercingetorix","Wynflaed","Xochiquetzal","Ymoja","Zosime"
  ]
};

const RARITY_CONFIG = {
  common:    { label: "Common",    color: "#888",    textColor: "#555",    bg: "#efefef" },
  uncommon:  { label: "Uncommon",  color: "#4a7a4a", textColor: "#3a6a3a", bg: "#dceadc" },
  rare:      { label: "Rare",      color: "#3a5a8a", textColor: "#2a4a7a", bg: "#d4e0f0" },
  legendary: { label: "Legendary", color: "#9a6010", textColor: "#7a4a00", bg: "#f0e4cc" }
};

function rollWeightedRarity() {
  const roll = Math.random() * 100;
  if (roll < 3)  return "legendary";
  if (roll < 15) return "rare";
  if (roll < 45) return "uncommon";
  return "common";
}

function rollName() {
  const rarity = rollWeightedRarity();
  const pool = NAMES[rarity];
  const name = pool[Math.floor(Math.random() * pool.length)];
  return { name, rarity };
}
