const NAMES = {
  common: [
    "James","John","Robert","Michael","William","David","Richard","Joseph","Thomas","Charles",
    "Mary","Patricia","Jennifer","Linda","Barbara","Susan","Jessica","Sarah","Karen","Lisa",
    "Daniel","Matthew","Anthony","Donald","Mark","Paul","Steven","Andrew","Kenneth","Joshua",
    "Kevin","Brian","George","Timothy","Ronald","Edward","Jason","Jeffrey","Ryan","Jacob",
    "Gary","Nicholas","Eric","Jonathan","Stephen","Larry","Justin","Scott","Brandon","Benjamin",
    "Emma","Olivia","Ava","Isabella","Sophia","Mia","Charlotte","Amelia","Harper","Evelyn",
    "Abigail","Emily","Elizabeth","Sofia","Ella","Madison","Scarlett","Victoria","Aria","Grace",
    "Chloe","Camila","Penelope","Riley","Layla","Lillian","Nora","Zoey","Hannah","Addison",
    "Claire","Elena","Anna","Samantha","Natalie","Leah","Hailey","Aubrey","Stella","Violet",
    "Aurora","Lucy","Savannah","Audrey","Brooklyn","Bella","Zoe","Alexa","Kylie","Julia",
    "Henry","Owen","Sebastian","Liam","Noah","Ethan","Mason","Logan","Lucas","Jackson",
    "Aiden","Carter","Jayden","Grayson","Luke","Dylan","Jack","Wyatt","Lincoln","Caleb",
    "Connor","Nathan","Aaron","Hunter","Eli","Adam","Adrian","Ian","Landon","Cameron"
  ],
  uncommon: [
    "Theodore","Dominic","Maxwell","Harrison","Nathaniel","Elliot","Jasper","Atticus","Emmett",
    "Silas","Declan","Rowan","Finnegan","Callum","Sullivan","Beckett","Fletcher","Holden",
    "Desmond","Margot","Vivienne","Genevieve","Cordelia","Rosalind","Beatrice","Cecelia",
    "Adelaide","Isadora","Josephine","Evangeline","Arabella","Seraphina","Clementine",
    "Wilhelmina","Octavia","Leonora","Celestine","Imogen","Elspeth","Aldric","Bramwell",
    "Crispin","Edmund","Florian","Gideon","Hadrian","Ignatius","Jethro","Lysander",
    "Merrick","Oberon","Phineas","Quentin","Raleigh","Thaddeus","Upton","Vaughn",
    "Warwick","Xander","Yorick","Zebediah","Alaric","Bastian","Cassandra","Frederica",
    "Guinevere","Harriet","Ingrid","Lavinia","Mirabel","Nadia","Odette","Prudence",
    "Rosamund","Sylvie","Tamsin","Ursula","Verity","Winifred","Xanthe","Yvette","Zelda",
    "Alistair","Benedict","Clifford","Duncan","Everett","Ferdinand","Gordon","Herbert",
    "Irving","Jasper","Kendrick","Leopold","Magnus","Norbert","Ogden","Prescott","Reginald"
  ],
  rare: [
    "Aurelius","Balthazar","Caelum","Dorian","Evander","Fionn","Griffith","Hawthorne",
    "Isidore","Jareth","Keiran","Leander","Mordecai","Orion","Percival","Quillan",
    "Remington","Stellan","Tarquin","Ulric","Vesper","Willoughby","Xiomara","Ysolde",
    "Zephyrine","Breccan","Caelan","Devereux","Elowen","Faustine","Hesper","Iolanthe",
    "Jocasta","Keturah","Lysandra","Marisol","Nerissa","Ophelia","Quintessa","Rowena",
    "Saoirse","Thessaly","Undine","Valentijn","Wisteria","Xanthippe","Yseult","Zenobia",
    "Amaranta","Bellatrix","Calixta","Delphine","Endymion","Florentine","Galatea",
    "Hieronymus","Iphigenia","Juniper","Katrijn","Lilavati","Mehetabel","Nkechi",
    "Oleander","Ptolemy","Rhiannon","Seraphiel","Thalassa","Vespasian","Xaviera",
    "Yewande","Zephyrus","Alcyone","Brynhild","Caoimhe","Dagomar","Eulalia"
  ],
  legendary: [
    "Achilles","Brennius","Cassivellaunus","Etherion","Forsvar","Galahad","Havelock",
    "Iamblichus","Jadwiga","Kerridwen","Laoghaire","Maelgwn","Niamh","Ossian","Pryderi",
    "Quilaztli","Ragnvald","Sigrdriva","Taranis","Vercingetorix","Wynflaed",
    "Xochiquetzal","Ymoja","Zosime","Aethelmearc","Branwaladr","Cunobelin","Draupnir",
    "Erechwydd","Feannag","Gwyddbwyll","Hallbjorn","Ingvarr","Jormundrek","Kalevala",
    "Lughaidh","Morrigan","Nemhain","Oengus","Periboea","Rigantona","Skjaldvor",
    "Thorvaldsen","Uinnseann","Veleda","Wulfnoth","Ximenia","Yspadaden","Zalmoxis"
  ]
};

const RARITY_CONFIG = {
  common:    { label:"Common",    color:"#888",    textColor:"#555",    bg:"#efefef",  rollWeight:55 },
  uncommon:  { label:"Uncommon",  color:"#4a7a4a", textColor:"#3a6a3a", bg:"#dceadc",  rollWeight:30 },
  rare:      { label:"Rare",      color:"#3a5a8a", textColor:"#2a4a7a", bg:"#d4e0f0",  rollWeight:12 },
  legendary: { label:"Legendary", color:"#9a6010", textColor:"#7a4a00", bg:"#f0e4cc",  rollWeight:3  }
};

const BUTTON_STYLES = [
  {
    id: "default",
    name: "Default",
    description: "Clean and minimal",
    unlockAt: 0,
    css: `background:#1c1a17;color:#fff;border:1px solid #1c1a17;border-radius:4px;letter-spacing:0.15em;`,
    animation: "none"
  },
  {
    id: "ghost",
    name: "Ghost",
    description: "Outlined, no fill",
    unlockAt: 5,
    css: `background:transparent;color:#1c1a17;border:1px solid #1c1a17;border-radius:4px;letter-spacing:0.15em;`,
    animation: "none"
  },
  {
    id: "stone",
    name: "Stone",
    description: "Textured grey",
    unlockAt: 15,
    css: `background:#888;color:#fff;border:1px solid #777;border-radius:4px;letter-spacing:0.15em;`,
    animation: "none"
  },
  {
    id: "ink",
    name: "Ink",
    description: "Deep black with glow",
    unlockAt: 30,
    css: `background:#000;color:#fff;border:1px solid #000;border-radius:4px;letter-spacing:0.15em;box-shadow:0 0 12px rgba(0,0,0,0.4);`,
    animation: "none"
  },
  {
    id: "ember",
    name: "Ember",
    description: "Warm amber tones",
    unlockAt: 50,
    css: `background:#8a4a10;color:#fde8c8;border:1px solid #6a3a08;border-radius:4px;letter-spacing:0.15em;`,
    animation: "none"
  },
  {
    id: "frost",
    name: "Frost",
    description: "Cold blue shimmer",
    unlockAt: 75,
    css: `background:#1a3a6a;color:#d4e8ff;border:1px solid #0a2a5a;border-radius:4px;letter-spacing:0.15em;`,
    animation: "none"
  },
  {
    id: "pulse",
    name: "Pulse",
    description: "Breathing glow effect",
    unlockAt: 100,
    css: `background:#1c1a17;color:#fff;border:1px solid #1c1a17;border-radius:4px;letter-spacing:0.15em;`,
    animation: "btn-pulse 2s ease-in-out infinite"
  },
  {
    id: "forge",
    name: "Forge",
    description: "Shifting fire gradient",
    unlockAt: 150,
    css: `background:linear-gradient(90deg,#8a2a00,#cc6600,#8a2a00);background-size:200%;color:#fff;border:none;border-radius:4px;letter-spacing:0.15em;`,
    animation: "btn-forge 3s linear infinite"
  },
  {
    id: "void",
    name: "Void",
    description: "Dark shimmer gradient",
    unlockAt: 200,
    css: `background:linear-gradient(90deg,#0a0a0a,#2a2a3a,#0a0a0a);background-size:200%;color:#aaa;border:none;border-radius:4px;letter-spacing:0.15em;`,
    animation: "btn-forge 4s linear infinite"
  },
  {
    id: "legend",
    name: "Legend",
    description: "Gold legendary shimmer",
    unlockAt: 300,
    css: `background:linear-gradient(90deg,#3a2a00,#c8960a,#f0c84a,#c8960a,#3a2a00);background-size:300%;color:#fff;border:none;border-radius:3px;letter-spacing:0.2em;`,
    animation: "btn-forge 2.5s linear infinite"
  }
];

function rollWeightedRarity() {
  const r = Math.random() * 100;
  if (r < 3)  return "legendary";
  if (r < 15) return "rare";
  if (r < 45) return "uncommon";
  return "common";
}

function rollName() {
  const rarity = rollWeightedRarity();
  const pool = NAMES[rarity];
  return { name: pool[Math.floor(Math.random() * pool.length)], rarity };
}
