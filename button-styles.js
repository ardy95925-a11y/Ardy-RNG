/* ═══════════════════════════════════════════════════════════
   BUTTON STYLES — button-styles.js
   Standalone module: defines all styles, injects their CSS,
   and owns the Style Shop UI.
   ═══════════════════════════════════════════════════════════ */

// ─── STYLE DEFINITIONS ──────────────────────────────────────
// Each entry:
//   id        — unique key, used as CSS class suffix
//   name      — display name
//   desc      — short flavour description
//   category  — "classic" | "elemental" | "arcane" | "dark" | "prestige"
//   unlockAt  — total rolls required (0 = always available)
//   rarity    — "common" | "uncommon" | "rare" | "legendary" | "mythic"
//   previewLabel — text shown on the preview button (null = same as name)
window.BUTTON_STYLES = [

  /* ── CLASSIC ─────────────────────────────────────────── */
  {
    id:"classic", name:"Classic", category:"classic", unlockAt:0, rarity:"common",
    desc:"Timeless black. The original.",
    previewLabel:"Roll"
  },
  {
    id:"linen", name:"Linen", category:"classic", unlockAt:8, rarity:"common",
    desc:"Warm parchment tone. Understated elegance.",
    previewLabel:"Roll"
  },
  {
    id:"chalk", name:"Chalk", category:"classic", unlockAt:18, rarity:"common",
    desc:"Chalk-white with a soft border. Effortless.",
    previewLabel:"Roll"
  },
  {
    id:"graphite", name:"Graphite", category:"classic", unlockAt:30, rarity:"uncommon",
    desc:"Deep slate with a subtle sheen.",
    previewLabel:"Roll"
  },

  /* ── ELEMENTAL ───────────────────────────────────────── */
  {
    id:"ember", name:"Ember", category:"elemental", unlockAt:5, rarity:"common",
    desc:"Warm flame that breathes with heat.",
    previewLabel:"Roll"
  },
  {
    id:"frost", name:"Frost", category:"elemental", unlockAt:15, rarity:"common",
    desc:"Icy crystal drift on a pale sky.",
    previewLabel:"Roll"
  },
  {
    id:"storm", name:"Storm", category:"elemental", unlockAt:60, rarity:"uncommon",
    desc:"A lightning bolt tears through the dark.",
    previewLabel:"Roll"
  },
  {
    id:"tide", name:"Tide", category:"elemental", unlockAt:45, rarity:"uncommon",
    desc:"Deep ocean swell, shifting and alive.",
    previewLabel:"Roll"
  },
  {
    id:"inferno", name:"Inferno", category:"elemental", unlockAt:90, rarity:"rare",
    desc:"Molten core erupts through the surface.",
    previewLabel:"Roll"
  },

  /* ── ARCANE ──────────────────────────────────────────── */
  {
    id:"void", name:"Void", category:"arcane", unlockAt:25, rarity:"uncommon",
    desc:"Deep purple abyss that pulses from within.",
    previewLabel:"Roll"
  },
  {
    id:"ethereal", name:"Ethereal", category:"arcane", unlockAt:50, rarity:"rare",
    desc:"Translucent shimmer with shifting iridescence.",
    previewLabel:"Roll"
  },
  {
    id:"runic", name:"Runic", category:"arcane", unlockAt:70, rarity:"rare",
    desc:"Ancient glyphs drift across the surface.",
    previewLabel:"᛫ Roll ᛫"
  },
  {
    id:"astral", name:"Astral", category:"arcane", unlockAt:85, rarity:"rare",
    desc:"Star-speckled cosmos on deep midnight.",
    previewLabel:"Roll"
  },

  /* ── DARK ────────────────────────────────────────────── */
  {
    id:"forge", name:"Forge", category:"dark", unlockAt:40, rarity:"uncommon",
    desc:"Hammered gold relief on scorched iron.",
    previewLabel:"Roll"
  },
  {
    id:"blood", name:"Bloodmoon", category:"dark", unlockAt:80, rarity:"rare",
    desc:"Dark crimson ritual beneath a red moon.",
    previewLabel:"Roll"
  },
  {
    id:"obsidian", name:"Obsidian", category:"dark", unlockAt:95, rarity:"rare",
    desc:"Glass-black with sharp silver edges.",
    previewLabel:"Roll"
  },
  {
    id:"shadow", name:"Shadowweave", category:"dark", unlockAt:110, rarity:"legendary",
    desc:"Living shadows coil beneath the surface.",
    previewLabel:"Roll"
  },

  /* ── PRESTIGE ────────────────────────────────────────── */
  {
    id:"prismatic", name:"Prismatic", category:"prestige", unlockAt:100, rarity:"legendary",
    desc:"Every colour in the spectrum, cycling endlessly.",
    previewLabel:null
  },
  {
    id:"gilded", name:"Gilded", category:"prestige", unlockAt:130, rarity:"legendary",
    desc:"Pure 24-karat. Luxury made tangible.",
    previewLabel:"Roll"
  },
  {
    id:"celestial", name:"Celestial", category:"prestige", unlockAt:160, rarity:"mythic",
    desc:"The cosmos itself becomes the button.",
    previewLabel:"Roll"
  },
  {
    id:"divine_btn", name:"Divine Seal", category:"prestige", unlockAt:200, rarity:"mythic",
    desc:"Blessed by forces beyond comprehension.",
    previewLabel:"✧ Roll ✧"
  },
  {
    id:"nova", name:"Nova", category:"prestige", unlockAt:220, rarity:"mythic",
    desc:"A star is born. Blinding brilliance and radiant power.",
    previewLabel:"✦ Roll ✦"
  },

  /* ── EXPERT+ ─────────────────────────────────────────── */
  {
    id:"glitch", name:"Glitch", category:"expert", unlockAt:260, rarity:"legendary",
    desc:"Reality corrupts. The signal breaks apart into noise.",
    previewLabel:"Roll"
  },
  {
    id:"cipher", name:"Cipher", category:"expert", unlockAt:300, rarity:"legendary",
    desc:"Every name decodes from encrypted chaos.",
    previewLabel:"> Roll_"
  },
  {
    id:"overdrive", name:"Overdrive", category:"expert", unlockAt:340, rarity:"mythic",
    desc:"Raw kinetic force tears through the name reel.",
    previewLabel:"Roll"
  },
  {
    id:"fracture", name:"Fracture", category:"expert", unlockAt:380, rarity:"mythic",
    desc:"Reality splinters. The name emerges from the shards.",
    previewLabel:"Roll"
  },
  {
    id:"singularity", name:"Singularity", category:"expert", unlockAt:440, rarity:"mythic",
    desc:"A point of infinite density. All names spiral inward.",
    previewLabel:"⊗ Roll ⊗"
  }
];

// ─── RARITY CONFIG FOR SHOP DISPLAY ─────────────────────────
window.STYLE_RARITY = {
  common:    { label:"Common",    color:"#888",    glow:"rgba(150,150,150,.15)" },
  uncommon:  { label:"Uncommon",  color:"#4a7a4a", glow:"rgba(74,122,74,.2)"  },
  rare:      { label:"Rare",      color:"#2a4a8a", glow:"rgba(58,90,138,.25)" },
  legendary: { label:"Legendary", color:"#c8960a", glow:"rgba(200,150,10,.3)" },
  mythic:    { label:"Mythic",    color:"#aa00ee", glow:"rgba(170,0,238,.3)"  }
};

// ─── CSS INJECTION ────────────────────────────────────────────
(function injectStyles() {
  const style = document.createElement('style');
  style.id = 'btn-styles-injected';
  style.textContent = `

/* ── CLASSIC ── */
.btn-primary.style-classic{background:#1c1a17;color:#fff;border-color:#1c1a17}
.btn-primary.style-classic:hover{background:#2e2c28}

.btn-primary.style-linen{
  background:linear-gradient(160deg,#f5f1eb,#ede7de);
  border:1px solid #c8bfb0;color:#4a3f30;
  font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:400;letter-spacing:.12em;
  box-shadow:0 2px 8px rgba(0,0,0,.08),inset 0 1px 0 rgba(255,255,255,.7);
}
.btn-primary.style-linen:hover{background:linear-gradient(160deg,#ede7de,#e0d8cc);box-shadow:0 4px 14px rgba(0,0,0,.12)}

.btn-primary.style-chalk{
  background:#fafafa;border:1.5px solid #e0ddd8;color:#1c1a17;
  box-shadow:0 1px 4px rgba(0,0,0,.06),inset 0 -1px 0 #e0ddd8;
  letter-spacing:.2em;
}
.btn-primary.style-chalk:hover{background:#f3f0ec;box-shadow:0 3px 10px rgba(0,0,0,.09)}

.btn-primary.style-graphite{
  background:linear-gradient(180deg,#3c3c3c,#2a2a2a);
  border:1px solid #555;color:#d0d0d0;letter-spacing:.18em;
  box-shadow:0 3px 0 #111,0 4px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,255,255,.06);
}
.btn-primary.style-graphite:hover{background:linear-gradient(180deg,#484848,#343434);color:#eee}
.btn-primary.style-graphite:active{transform:translateY(2px)!important;box-shadow:0 1px 0 #111}

/* ── ELEMENTAL ── */
.btn-primary.style-ember{
  background:#1a0800;border:1px solid #c84000;color:#ff8040;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;
  box-shadow:0 0 18px rgba(200,64,0,.22),inset 0 0 30px rgba(200,64,0,.06);
  animation:ember-breathe 2.5s ease-in-out infinite;
}
.btn-primary.style-ember::before{content:'';position:absolute;inset:0;background:linear-gradient(180deg,rgba(255,120,40,.08),transparent);pointer-events:none}
@keyframes ember-breathe{0%,100%{box-shadow:0 0 18px rgba(200,64,0,.22),inset 0 0 30px rgba(200,64,0,.06)}50%{box-shadow:0 0 36px rgba(220,80,0,.52),inset 0 0 40px rgba(220,80,0,.12)}}
.btn-primary.style-ember:hover{background:#220a00;color:#ffaa60}

.btn-primary.style-frost{
  background:linear-gradient(135deg,#e8f4ff,#d0e8ff);
  border:1px solid #90c4e8;color:#1a3a5a;
  font-family:'Cormorant Garamond',serif;font-size:16px;font-weight:300;letter-spacing:.2em;
  box-shadow:0 2px 20px rgba(144,196,232,.28);animation:frost-drift 5s ease-in-out infinite;
}
@keyframes frost-drift{0%,100%{background:linear-gradient(135deg,#e8f4ff,#d0e8ff)}50%{background:linear-gradient(135deg,#d8ecff,#c0dcff)}}
.btn-primary.style-frost:hover{box-shadow:0 4px 30px rgba(144,196,232,.5)}

.btn-primary.style-storm{
  background:#080c14;border:1px solid #4060a0;color:#80aaff;overflow:hidden;
}
.btn-primary.style-storm::before{
  content:'';position:absolute;inset:0;opacity:0;
  background:linear-gradient(90deg,transparent,rgba(100,150,255,.32),transparent);
  animation:storm-bolt 3.5s ease-in-out infinite;
}
@keyframes storm-bolt{0%,100%{opacity:0;transform:translateX(-100%)}50%{opacity:1;transform:translateX(100%)}}
.btn-primary.style-storm:hover{box-shadow:0 0 20px rgba(100,150,255,.4);color:#aaccff}

.btn-primary.style-tide{
  background:linear-gradient(180deg,#0a3a5a,#082a4a);border:1px solid #2a6a8a;color:#60b0e0;
  animation:tide-wave 4s ease-in-out infinite;box-shadow:0 0 14px rgba(40,100,160,.2);
}
@keyframes tide-wave{0%,100%{text-shadow:none}50%{text-shadow:0 0 18px rgba(60,140,200,.4),0 0 36px rgba(40,100,160,.2)}}
.btn-primary.style-tide:hover{color:#80d0ff;box-shadow:0 0 22px rgba(60,140,200,.35)}

.btn-primary.style-inferno{
  background:linear-gradient(135deg,#661100,#330800);border:1px solid #994400;color:#ff6600;
  box-shadow:0 0 20px rgba(220,80,0,.3),inset 0 0 20px rgba(255,100,20,.08);
  animation:inferno-surge 2s ease-in-out infinite;
}
@keyframes inferno-surge{0%,100%{box-shadow:0 0 20px rgba(220,80,0,.3),inset 0 0 20px rgba(255,100,20,.08)}50%{box-shadow:0 0 40px rgba(240,100,0,.6),inset 0 0 30px rgba(255,120,40,.16)}}
.btn-primary.style-inferno:hover{color:#ff8822;box-shadow:0 0 50px rgba(250,110,20,.7),inset 0 0 30px rgba(255,120,40,.2)}

/* ── ARCANE ── */
.btn-primary.style-void{
  background:linear-gradient(135deg,#3a0a5a,#1a0a3a);border:1px solid #6a2a8a;color:#b080d0;
  box-shadow:0 0 16px rgba(140,60,180,.25),inset 0 0 20px rgba(180,80,220,.06);
  animation:void-pulse 3.2s ease-in-out infinite;
}
@keyframes void-pulse{0%,100%{box-shadow:0 0 16px rgba(140,60,180,.25),inset 0 0 20px rgba(180,80,220,.06)}50%{box-shadow:0 0 32px rgba(160,80,220,.45),inset 0 0 30px rgba(200,100,250,.12)}}
.btn-primary.style-void:hover{color:#d0a0ff;box-shadow:0 0 40px rgba(180,100,240,.5)}

.btn-primary.style-ethereal{
  background:rgba(230,180,255,.15);border:1px dashed #c8a0e8;color:#d8b8ff;
  backdrop-filter:blur(6px);box-shadow:0 0 20px rgba(200,150,255,.2);
  animation:ethereal-fade 3.8s ease-in-out infinite;
}
@keyframes ethereal-fade{0%,100%{opacity:.8;box-shadow:0 0 20px rgba(200,150,255,.2)}50%{opacity:1;box-shadow:0 0 40px rgba(220,180,255,.4)}}
.btn-primary.style-ethereal:hover{color:#fff;box-shadow:0 0 50px rgba(220,180,255,.5),inset 0 0 20px rgba(255,200,255,.1)}

.btn-primary.style-runic{
  background:linear-gradient(90deg,#1a1a3a,#0a0a2a);border:1px solid #3a3a6a;color:#8a9aff;
  font-family:'Uncial Antiqua',serif;letter-spacing:.08em;
  box-shadow:0 0 12px rgba(100,120,220,.2);
}
.btn-primary.style-runic::before{content:'';position:absolute;inset:0;opacity:.4;background:radial-gradient(circle at 30% 30%, rgba(150,150,255,.2), transparent 60%);pointer-events:none}
.btn-primary.style-runic:hover{color:#b0b0ff;box-shadow:0 0 24px rgba(140,160,255,.35)}

.btn-primary.style-astral{
  background:radial-gradient(ellipse at 30% 30%,rgba(100,200,255,.1),#0a0a2a);
  border:1px solid #3a6a9a;color:#60b0ff;
  box-shadow:0 0 18px rgba(60,120,200,.25),inset 0 0 15px rgba(100,150,255,.1);
  animation:astral-twinkle 4s ease-in-out infinite;
}
@keyframes astral-twinkle{0%,100%{box-shadow:0 0 18px rgba(60,120,200,.25),inset 0 0 15px rgba(100,150,255,.1)}25%{box-shadow:0 0 28px rgba(80,140,220,.4),inset 0 0 20px rgba(120,170,255,.15)}50%{box-shadow:0 0 22px rgba(70,130,210,.3),inset 0 0 18px rgba(110,160,245,.12)}}
.btn-primary.style-astral:hover{color:#90d0ff;box-shadow:0 0 40px rgba(100,160,240,.5),inset 0 0 20px rgba(140,180,255,.2)}

/* ── DARK ── */
.btn-primary.style-forge{
  background:linear-gradient(180deg,#5a4a2a,#3a2a0a);border:1px solid #9a7a3a;color:#d4a040;
  box-shadow:0 4px 0 #1a0a00,0 6px 18px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,200,100,.1);
}
.btn-primary.style-forge:hover{background:linear-gradient(180deg,#6a5a3a,#4a3a1a);color:#ffb860;box-shadow:0 4px 0 #1a0a00,0 8px 24px rgba(0,0,0,.5)}
.btn-primary.style-forge:active{transform:translateY(3px)!important;box-shadow:0 1px 0 #1a0a00,0 3px 10px rgba(0,0,0,.3)}

.btn-primary.style-blood{
  background:linear-gradient(135deg,#5a1a1a,#2a0a0a);border:1px solid #8a3a3a;color:#ff6060;
  box-shadow:0 0 20px rgba(180,0,0,.3),0 0 40px rgba(220,20,20,.15),inset 0 0 15px rgba(200,20,20,.08);
  animation:blood-pulse 2.4s ease-in-out infinite;
}
@keyframes blood-pulse{0%,100%{box-shadow:0 0 20px rgba(180,0,0,.3),0 0 40px rgba(220,20,20,.15),inset 0 0 15px rgba(200,20,20,.08)}50%{box-shadow:0 0 40px rgba(220,0,0,.5),0 0 80px rgba(255,40,40,.3),inset 0 0 25px rgba(240,40,40,.14)}}
.btn-primary.style-blood:hover{color:#ff9090;box-shadow:0 0 50px rgba(240,20,20,.6),0 0 100px rgba(255,60,60,.35)}

.btn-primary.style-obsidian{
  background:linear-gradient(135deg,#1a1a2a,#0a0a0a);border:1px solid #505080;color:#c0c0e0;
  box-shadow:0 0 8px rgba(200,200,255,.12),inset 0 0 20px rgba(80,80,180,.08);
  text-shadow:0 1px 3px rgba(0,0,0,.8);
}
.btn-primary.style-obsidian:hover{color:#e0e0ff;border-color:#6070a0;box-shadow:0 0 16px rgba(220,220,255,.2),inset 0 0 25px rgba(100,100,200,.12)}

.btn-primary.style-shadow{
  background:linear-gradient(135deg,rgba(0,0,0,.8),rgba(20,0,40,.6));border:1px solid #4a1a6a;color:#b880d0;
  box-shadow:0 0 20px rgba(100,0,140,.3),0 0 40px rgba(140,20,180,.12),inset 0 0 20px rgba(120,40,180,.1);
  animation:shadow-shift 4s ease-in-out infinite;
}
@keyframes shadow-shift{0%,100%{box-shadow:0 0 20px rgba(100,0,140,.3),0 0 40px rgba(140,20,180,.12),inset 0 0 20px rgba(120,40,180,.1)}50%{box-shadow:0 0 40px rgba(140,20,180,.45),0 0 80px rgba(180,60,220,.25),inset 0 0 30px rgba(160,60,220,.15)}}
.btn-primary.style-shadow:hover{color:#d0b0ff;box-shadow:0 0 50px rgba(160,40,200,.6),0 0 100px rgba(200,80,255,.3),inset 0 0 25px rgba(180,80,240,.2)}

/* ── PRESTIGE ── */
.btn-primary.style-prismatic{
  background:linear-gradient(90deg,#ff0000,#ff7700,#ffff00,#00ff00,#0088ff,#0000ff,#ff0088);
  background-size:200% 200%;border:1px solid #ffff00;color:#000;font-weight:600;letter-spacing:.15em;
  animation:prismatic-shift 3s ease infinite,prismatic-glow 3s ease infinite;
  text-shadow:0 0 8px rgba(255,255,255,.6);
  box-shadow:0 0 20px rgba(255,100,0,.4),0 0 40px rgba(100,200,255,.2);
}
@keyframes prismatic-shift{0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%}}
@keyframes prismatic-glow{0%,100%{box-shadow:0 0 20px rgba(255,0,0,.5),0 0 40px rgba(255,100,0,.35)}25%{box-shadow:0 0 20px rgba(0,255,0,.5),0 0 40px rgba(0,200,255,.35)}50%{box-shadow:0 0 20px rgba(0,0,255,.5),0 0 40px rgba(255,0,150,.35)}75%{box-shadow:0 0 20px rgba(255,100,0,.5),0 0 40px rgba(255,255,0,.35)}}
.btn-primary.style-prismatic:hover{filter:brightness(1.15);text-shadow:0 0 12px rgba(255,255,255,.9);box-shadow:0 0 30px rgba(255,50,0,.7),0 0 60px rgba(100,220,255,.4)}

.btn-primary.style-gilded{
  background:linear-gradient(135deg,#f0d040,#e0b820,#d0a010,#c08000);border:2px solid #ffd700;color:#000;
  font-weight:600;letter-spacing:.12em;
  box-shadow:0 0 30px rgba(255,215,0,.5),0 0 60px rgba(255,180,0,.25),0 0 100px rgba(255,200,50,.1),inset 0 0 20px rgba(255,255,200,.2);
  animation:gilded-shimmer 2.8s ease-in-out infinite;
}
@keyframes gilded-shimmer{0%,100%{box-shadow:0 0 30px rgba(255,215,0,.5),0 0 60px rgba(255,180,0,.25),0 0 100px rgba(255,200,50,.1),inset 0 0 20px rgba(255,255,200,.2)}50%{box-shadow:0 0 50px rgba(255,230,100,.7),0 0 100px rgba(255,200,0,.4),0 0 150px rgba(255,220,80,.2),inset 0 0 30px rgba(255,255,220,.35)}}
.btn-primary.style-gilded:hover{background:linear-gradient(135deg,#ffd860,#ffe040,#ffc820,#ffb000);box-shadow:0 0 60px rgba(255,230,100,.8),0 0 120px rgba(255,200,0,.5),0 0 200px rgba(255,230,100,.25),inset 0 0 40px rgba(255,255,230,.4)}

.btn-primary.style-celestial{
  background:radial-gradient(ellipse at 40% 40%,rgba(100,150,255,.2),#0a0a2a);
  border:1px solid #4a6aaa;color:#60b0ff;
  box-shadow:0 0 30px rgba(80,150,255,.4),0 0 60px rgba(100,100,200,.2),0 0 100px rgba(60,120,200,.1),inset 0 0 20px rgba(120,160,255,.1);
  animation:celestial-glow 2.5s ease-in-out infinite;
}
@keyframes celestial-glow{0%,100%{box-shadow:0 0 30px rgba(80,150,255,.4),0 0 60px rgba(100,100,200,.2),0 0 100px rgba(60,120,200,.1),inset 0 0 20px rgba(120,160,255,.1)}50%{box-shadow:0 0 50px rgba(100,180,255,.6),0 0 100px rgba(120,140,220,.35),0 0 160px rgba(80,150,240,.2),inset 0 0 30px rgba(150,190,255,.15)}}
.btn-primary.style-celestial:hover{color:#90e0ff;box-shadow:0 0 60px rgba(120,180,255,.7),0 0 120px rgba(140,160,240,.4),0 0 200px rgba(100,180,255,.2),inset 0 0 35px rgba(170,210,255,.2)}

.btn-primary.style-divine_btn{
  background:linear-gradient(135deg,#fff7a0,#ffe040,#ffc800);border:2px solid #ffd700;color:#6a4a00;font-weight:600;letter-spacing:.15em;
  box-shadow:0 0 40px rgba(255,215,0,.6),0 0 80px rgba(255,200,0,.3),0 0 120px rgba(255,230,100,.15),inset 0 0 20px rgba(255,255,200,.25);
  animation:divine-radiate 2s ease-in-out infinite;
}
@keyframes divine-radiate{0%,100%{box-shadow:0 0 40px rgba(255,215,0,.6),0 0 80px rgba(255,200,0,.3),0 0 120px rgba(255,230,100,.15),inset 0 0 20px rgba(255,255,200,.25)}50%{box-shadow:0 0 70px rgba(255,230,100,.85),0 0 140px rgba(255,210,50,.55),0 0 220px rgba(255,240,120,.25),inset 0 0 30px rgba(255,255,220,.35)}}
.btn-primary.style-divine_btn:hover{color:#4a2a00;box-shadow:0 0 90px rgba(255,240,120,1),0 0 180px rgba(255,230,80,.7),0 0 280px rgba(255,255,150,.3),inset 0 0 40px rgba(255,255,240,.4)}

.btn-primary.style-nova{
  background:radial-gradient(circle at 50% 50%,rgba(255,200,0,.4),rgba(255,100,0,.2),#1a0a00);
  border:1px solid #ff8800;color:#ffdd60;font-weight:700;letter-spacing:.12em;
  box-shadow:0 0 40px rgba(255,150,0,.6),0 0 80px rgba(255,100,0,.3),0 0 120px rgba(255,150,0,.15),inset 0 0 30px rgba(255,200,100,.15);
  animation:nova-explode 1.8s ease-in-out infinite;
}
@keyframes nova-explode{0%,100%{box-shadow:0 0 40px rgba(255,150,0,.6),0 0 80px rgba(255,100,0,.3),0 0 120px rgba(255,150,0,.15),inset 0 0 30px rgba(255,200,100,.15);transform:scale(1)}50%{box-shadow:0 0 80px rgba(255,200,0,.85),0 0 160px rgba(255,140,20,.55),0 0 240px rgba(255,180,50,.25),inset 0 0 50px rgba(255,220,150,.25);transform:scale(1.06)}}
.btn-primary.style-nova:hover{color:#ffff80;box-shadow:0 0 100px rgba(255,220,0,.95),0 0 200px rgba(255,160,20,.7),0 0 300px rgba(255,200,60,.3),inset 0 0 60px rgba(255,255,200,.3)}

/* ══════════════════════════════════════════════
   SHOP — Polished Dark Atelier
   ══════════════════════════════════════════════ */

/* Overlay backdrop */
#shopOverlay{
  position:fixed;inset:0;z-index:1000;
  display:flex;align-items:center;justify-content:center;
  background:rgba(0,0,0,0);
  backdrop-filter:blur(0px);
  pointer-events:none;
  transition:background .35s ease, backdrop-filter .35s ease;
}
#shopOverlay.open{
  background:rgba(0,0,0,.72);
  backdrop-filter:blur(8px);
  pointer-events:all;
}
#shopOverlay:not(.open) .shop{
  transform:translateY(28px) scale(.96);opacity:0;
}
#shopOverlay.open .shop{
  transform:translateY(0) scale(1);opacity:1;
}

.shop{
  background:linear-gradient(160deg,#111010 0%,#0d0c0c 60%,#0f0e10 100%);
  border:1px solid #2c2a28;
  border-radius:6px;
  max-width:980px;width:calc(100% - 32px);max-height:90vh;
  display:flex;flex-direction:column;
  box-shadow:0 32px 80px rgba(0,0,0,.9),0 0 0 1px rgba(255,255,255,.03),inset 0 1px 0 rgba(255,255,255,.06);
  transition:transform .4s cubic-bezier(.22,1,.36,1), opacity .35s ease;
  position:relative;overflow:hidden;
}

/* Subtle top-edge shimmer */
.shop::before{
  content:'';position:absolute;top:0;left:0;right:0;height:1px;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.12) 30%,rgba(255,255,255,.18) 50%,rgba(255,255,255,.12) 70%,transparent);
  pointer-events:none;z-index:1;
}

/* ── HEADER ── */
.shop-header{
  padding:22px 28px 18px;
  border-bottom:1px solid rgba(255,255,255,.05);
  display:flex;justify-content:space-between;align-items:center;
  flex-shrink:0;
  background:linear-gradient(180deg,rgba(255,255,255,.025) 0%,transparent 100%);
}
.shop-title-group{text-align:left;flex:1}
.shop-title{
  font-size:22px;font-family:'Cormorant Garamond',serif;
  letter-spacing:.06em;color:#e8e4de;font-weight:300;
  text-shadow:0 1px 12px rgba(255,255,255,.08);
}
.shop-sub{
  font-size:8.5px;letter-spacing:.22em;text-transform:uppercase;
  color:rgba(255,255,255,.22);margin-top:5px;
  font-family:'DM Mono',monospace;
}
.shop-close{
  font-size:8px;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(255,255,255,.3);cursor:pointer;background:none;
  border:1px solid rgba(255,255,255,.1);padding:7px 14px;border-radius:3px;
  font-family:'DM Mono',monospace;
  transition:color .2s,border-color .2s,background .2s;
}
.shop-close:hover{color:rgba(255,255,255,.7);border-color:rgba(255,255,255,.25);background:rgba(255,255,255,.04)}

/* ── META BAR ── */
.shop-meta{
  padding:10px 28px;
  border-bottom:1px solid rgba(255,255,255,.04);
  display:flex;align-items:center;gap:0;
  font-size:9.5px;letter-spacing:.14em;text-transform:uppercase;
  font-family:'DM Mono',monospace;
  background:rgba(0,0,0,.18);
  flex-shrink:0;
}
.shop-stat{
  color:rgba(255,255,255,.28);
  padding:0 20px 0 0;
  border-right:1px solid rgba(255,255,255,.07);
  margin-right:20px;
}
.shop-stat:last-of-type{border-right:none}
.shop-stat span{color:rgba(255,255,255,.65);font-weight:400}
.shop-active-label{
  margin-left:auto;
  color:rgba(255,255,255,.3);
  font-size:9px;
}
.shop-active-label span{
  color:#7ab87a;
  font-size:9.5px;letter-spacing:.08em;
}

/* ── CATEGORY TABS ── */
.shop-cats{
  padding:14px 28px 12px;
  border-bottom:1px solid rgba(255,255,255,.05);
  display:flex;gap:6px;flex-wrap:wrap;flex-shrink:0;
  background:rgba(0,0,0,.12);
}
.shop-cat{
  font-size:8.5px;letter-spacing:.16em;text-transform:uppercase;
  padding:6px 14px;
  border:1px solid rgba(255,255,255,.08);
  border-radius:3px;
  background:none;color:rgba(255,255,255,.28);
  cursor:pointer;font-family:'DM Mono',monospace;
  transition:all .18s ease;
  position:relative;
}
.shop-cat:hover{
  color:rgba(255,255,255,.6);
  border-color:rgba(255,255,255,.18);
  background:rgba(255,255,255,.04);
}
.shop-cat.active{
  color:#e8e4de;
  border-color:rgba(255,255,255,.22);
  background:rgba(255,255,255,.08);
  box-shadow:0 0 12px rgba(255,255,255,.04),inset 0 1px 0 rgba(255,255,255,.08);
}

/* ── GRID ── */
.shop-grid{
  flex:1;overflow-y:auto;padding:18px;
  display:grid;grid-template-columns:repeat(auto-fill,minmax(192px,1fr));gap:14px;
  scrollbar-width:thin;scrollbar-color:rgba(255,255,255,.08) transparent;
}
.shop-grid::-webkit-scrollbar{width:4px}
.shop-grid::-webkit-scrollbar-track{background:transparent}
.shop-grid::-webkit-scrollbar-thumb{background:rgba(255,255,255,.1);border-radius:2px}

/* ── ITEM CARD ── */
.shop-item{
  background:linear-gradient(160deg,#141312 0%,#0f0e0e 100%);
  border:1px solid rgba(255,255,255,.08);
  border-radius:5px;overflow:hidden;
  display:flex;flex-direction:column;
  transition:all .28s cubic-bezier(.22,1,.36,1);
  position:relative;
  opacity:.82;
}
.shop-item::after{
  content:'';position:absolute;inset:0;border-radius:5px;
  box-shadow:inset 0 1px 0 rgba(255,255,255,.05);
  pointer-events:none;z-index:1;
}
.shop-item:hover{
  opacity:1;
  border-color:rgba(255,255,255,.18);
  transform:translateY(-2px);
  box-shadow:0 12px 40px rgba(0,0,0,.55),0 4px 16px rgba(0,0,0,.3);
}
.shop-item.locked{
  opacity:.38;
  filter:saturate(.3);
}
.shop-item.locked:hover{
  opacity:.52;
  filter:saturate(.4);
  transform:translateY(-1px);
}
.shop-item.si-active{
  opacity:1;
  border-color:rgba(100,180,100,.35);
  box-shadow:0 0 0 1px rgba(100,180,100,.12),0 8px 30px rgba(60,140,60,.15);
}
.shop-item.si-active:hover{
  box-shadow:0 0 0 1px rgba(100,180,100,.18),0 12px 40px rgba(60,140,60,.22);
}

/* ── PREVIEW AREA ── */
.shop-preview{
  padding:18px 16px;
  display:flex;justify-content:center;align-items:center;
  background:radial-gradient(ellipse at 50% 60%,rgba(255,255,255,.025) 0%,#050404 100%);
  height:86px;
  border-bottom:1px solid rgba(255,255,255,.04);
}
.shop-preview .btn{width:100%;pointer-events:none;font-size:9.5px;letter-spacing:.18em}

/* ── RARITY BAND ── */
.shop-rarity-band{height:2px;flex-shrink:0}

/* ── ITEM INFO ── */
.shop-info{
  padding:12px 14px 10px;
  flex:1;display:flex;flex-direction:column;gap:5px;
  border-bottom:1px solid rgba(255,255,255,.04);
}
.shop-item-name{
  font-size:10px;letter-spacing:.18em;text-transform:uppercase;
  color:rgba(255,255,255,.82);font-family:'DM Mono',monospace;
  font-weight:400;
}
.shop-item-desc{
  font-size:9px;letter-spacing:.03em;
  color:rgba(255,255,255,.3);
  line-height:1.65;flex:1;
  font-family:'Cormorant Garamond',serif;font-style:italic;
  font-size:11px;
}
.shop-item-rarity{
  font-size:7.5px;letter-spacing:.18em;text-transform:uppercase;
  font-family:'DM Mono',monospace;
  opacity:.8;
  margin-top:2px;
}

/* ── ITEM FOOTER ── */
.shop-item-footer{
  display:flex;align-items:center;justify-content:space-between;
  padding:9px 14px;gap:8px;
  background:rgba(0,0,0,.2);
}
.shop-lock-badge{
  font-size:8px;letter-spacing:.06em;color:rgba(255,255,255,.22);
  text-transform:uppercase;flex:1;min-width:0;
  font-family:'DM Mono',monospace;line-height:1.5;
}
.shop-lock-badge[style*="4a7a4a"]{
  color:#6aaa6a !important;
  letter-spacing:.1em;
}

/* Equip button */
.shop-select-btn{
  font-size:7.5px;letter-spacing:.18em;text-transform:uppercase;
  padding:6px 13px;border-radius:3px;cursor:pointer;
  border:1px solid rgba(255,255,255,.1);
  background:rgba(255,255,255,.04);color:rgba(255,255,255,.35);
  font-family:'DM Mono',monospace;
  transition:all .2s ease;white-space:nowrap;
  flex-shrink:0;
}
.shop-select-btn:hover:not(:disabled){
  background:rgba(255,255,255,.1);
  color:rgba(255,255,255,.8);
  border-color:rgba(255,255,255,.25);
  box-shadow:0 0 12px rgba(255,255,255,.06);
}
.shop-select-btn:disabled{
  opacity:.25;cursor:default;
}
.shop-select-btn.active-btn{
  background:rgba(90,160,90,.15);
  color:#8ad08a;
  border-color:rgba(100,180,100,.3);
  box-shadow:0 0 10px rgba(80,160,80,.12);
}

/* ── LOCK ICON ── */
.shop-lock-icon{
  position:absolute;top:10px;right:10px;
  font-size:11px;opacity:.18;z-index:2;
  filter:grayscale(1);
}

/* ── PROGRESS BAR ── */
.shop-prog-wrap{
  height:2px;background:rgba(255,255,255,.07);
  border-radius:2px;overflow:hidden;margin-top:5px;
}
.shop-prog-fill{
  height:100%;
  background:linear-gradient(90deg,rgba(255,255,255,.15),rgba(255,255,255,.35));
  border-radius:2px;transition:width .7s cubic-bezier(.22,1,.36,1);
}

/* ── ACTIVE BADGE ── */
.shop-active-indicator{
  position:absolute;top:8px;left:8px;z-index:3;
  font-size:7px;letter-spacing:.18em;text-transform:uppercase;
  background:rgba(80,160,80,.25);color:#8ad08a;
  padding:3px 8px;border-radius:3px;
  border:1px solid rgba(100,180,100,.2);
  font-family:'DM Mono',monospace;
  backdrop-filter:blur(4px);
}

/* ══════════════════════════════════════════════
   EXPERT+ BUTTON STYLES
   ══════════════════════════════════════════════ */

/* ── GLITCH ── */
.btn-primary.style-glitch{
  background:#05080f;border:1px solid #00ddcc;color:#00ffee;
  font-family:'DM Mono',monospace;letter-spacing:.22em;
  text-shadow:0 0 8px rgba(0,255,220,.7),0 0 20px rgba(0,200,180,.3);
  box-shadow:0 0 18px rgba(0,220,200,.2),inset 0 0 20px rgba(0,180,160,.04);
  animation:glitch-idle 3s steps(1) infinite;overflow:hidden;
}
.btn-primary.style-glitch::before{content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 3px,rgba(0,255,220,.025) 3px,rgba(0,255,220,.025) 4px);
  pointer-events:none}
@keyframes glitch-idle{
  0%,89%{box-shadow:0 0 18px rgba(0,220,200,.2),inset 0 0 20px rgba(0,180,160,.04);transform:translate(0)}
  90%{transform:translate(-2px,0);box-shadow:-2px 0 14px rgba(255,0,200,.5),2px 0 14px rgba(0,255,220,.5)}
  91%{transform:translate(3px,0)}
  92%,100%{transform:translate(0);box-shadow:0 0 18px rgba(0,220,200,.2)}}
.btn-primary.style-glitch:hover{color:#fff;text-shadow:-2px 0 #ff00cc,2px 0 #00ffcc;
  box-shadow:0 0 30px rgba(0,240,210,.45),0 0 60px rgba(0,200,180,.2),inset 0 0 25px rgba(0,255,220,.08)}

/* ── CIPHER ── */
.btn-primary.style-cipher{
  background:#000e00;border:1px solid rgba(0,200,60,.5);color:#00ee44;
  font-family:'DM Mono',monospace;letter-spacing:.18em;font-size:10px;
  text-shadow:0 0 6px rgba(0,220,60,.8),0 0 18px rgba(0,180,40,.35);
  box-shadow:0 0 16px rgba(0,180,50,.18),inset 0 0 24px rgba(0,160,40,.05);
  animation:cipher-idle 5s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-cipher::before{content:'';position:absolute;inset:0;
  background:repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,255,60,.018) 2px,rgba(0,255,60,.018) 3px);
  pointer-events:none;animation:cipher-scan 8s linear infinite}
.btn-primary.style-cipher::after{content:'';position:absolute;left:0;right:0;height:2px;
  background:linear-gradient(90deg,transparent,rgba(0,255,80,.6),transparent);
  animation:cipher-beam 2.8s linear infinite;pointer-events:none}
@keyframes cipher-idle{0%,100%{box-shadow:0 0 16px rgba(0,180,50,.18),inset 0 0 24px rgba(0,160,40,.05)}50%{box-shadow:0 0 28px rgba(0,200,60,.35),inset 0 0 32px rgba(0,200,60,.1)}}
@keyframes cipher-scan{from{background-position:0 0}to{background-position:0 100px}}
@keyframes cipher-beam{from{top:-2px}to{top:calc(100% + 2px)}}
.btn-primary.style-cipher:hover{color:#80ff98;box-shadow:0 0 36px rgba(0,230,70,.5),inset 0 0 30px rgba(0,200,60,.12)}

/* ── OVERDRIVE ── */
.btn-primary.style-overdrive{
  background:linear-gradient(90deg,#0f0800,#1a1000,#0f0800);
  border:1px solid #ff9900;color:#ffe060;
  font-family:'Cinzel',serif;font-size:10px;font-weight:600;letter-spacing:.25em;
  text-shadow:0 0 6px rgba(255,200,0,.9),0 0 20px rgba(255,140,0,.5);
  box-shadow:0 0 22px rgba(255,160,0,.3),inset 0 0 20px rgba(255,140,0,.06);
  animation:overdrive-idle 1.2s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-overdrive::before{content:'';position:absolute;inset:0;
  background:linear-gradient(90deg,transparent 0%,rgba(255,200,50,.12) 30%,rgba(255,255,100,.22) 50%,rgba(255,200,50,.12) 70%,transparent 100%);
  background-size:200% 100%;animation:overdrive-streak 1.4s linear infinite;pointer-events:none}
@keyframes overdrive-idle{0%,100%{box-shadow:0 0 22px rgba(255,160,0,.3),inset 0 0 20px rgba(255,140,0,.06)}50%{box-shadow:0 0 44px rgba(255,200,0,.6),inset 0 0 30px rgba(255,180,0,.12)}}
@keyframes overdrive-streak{from{background-position:-200% 0}to{background-position:200% 0}}
.btn-primary.style-overdrive:hover{color:#fff;text-shadow:0 0 10px rgba(255,240,0,1);box-shadow:0 0 60px rgba(255,200,0,.8),inset 0 0 40px rgba(255,200,0,.18)}

/* ── FRACTURE ── */
.btn-primary.style-fracture{
  background:linear-gradient(135deg,#06080f,#0a0d18,#06080f);
  border:1px solid rgba(140,160,255,.4);color:#c8d4ff;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.2em;
  text-shadow:0 0 8px rgba(180,200,255,.7),0 0 22px rgba(120,150,255,.35);
  box-shadow:0 0 20px rgba(120,150,255,.2),inset 0 0 20px rgba(100,130,255,.05);
  animation:fracture-idle 4s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-fracture::before{content:'';position:absolute;inset:0;
  background:linear-gradient(52deg,transparent 40%,rgba(180,200,255,.07) 41%,transparent 42%),
             linear-gradient(128deg,transparent 55%,rgba(140,170,255,.06) 56%,transparent 57%);
  pointer-events:none}
.btn-primary.style-fracture::after{content:'';position:absolute;inset:-3px;border-radius:6px;
  background:linear-gradient(135deg,#8ca0ff,#5060cc,#8ca0ff);background-size:300% 300%;
  animation:fracture-border 3s linear infinite;z-index:-1;opacity:.6}
@keyframes fracture-idle{0%,100%{box-shadow:0 0 20px rgba(120,150,255,.2),inset 0 0 20px rgba(100,130,255,.05)}50%{box-shadow:0 0 40px rgba(160,190,255,.4),inset 0 0 30px rgba(140,170,255,.1)}}
@keyframes fracture-border{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.btn-primary.style-fracture:hover{color:#fff;text-shadow:0 0 12px rgba(220,230,255,1),0 0 40px rgba(160,200,255,.6);box-shadow:0 0 50px rgba(160,190,255,.55),inset 0 0 35px rgba(150,180,255,.15)}

/* ── SINGULARITY ── */
.btn-primary.style-singularity{
  background:radial-gradient(circle at 50% 50%,#0a0010 0%,#050008 50%,#000 100%);
  border:1px solid rgba(180,80,255,.45);color:#cc88ff;
  font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:300;letter-spacing:.22em;
  text-shadow:0 0 10px rgba(200,100,255,.9),0 0 30px rgba(160,60,255,.45);
  box-shadow:0 0 30px rgba(160,60,255,.35),0 0 60px rgba(100,0,200,.2),inset 0 0 30px rgba(180,80,255,.06);
  animation:singularity-idle 2.4s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-singularity::before{content:'';position:absolute;
  width:160%;height:160%;top:-30%;left:-30%;
  background:conic-gradient(from 0deg,transparent 0deg,rgba(180,80,255,.08) 60deg,transparent 120deg,rgba(140,40,255,.06) 180deg,transparent 240deg,rgba(200,100,255,.07) 300deg,transparent 360deg);
  animation:singularity-rotate 4s linear infinite;pointer-events:none}
.btn-primary.style-singularity::after{content:'';position:absolute;
  width:6px;height:6px;border-radius:50%;background:#fff;
  top:50%;left:50%;transform:translate(-50%,-50%);
  box-shadow:0 0 8px 4px rgba(220,140,255,.8),0 0 20px 8px rgba(180,80,255,.5),0 0 40px 16px rgba(140,40,255,.3);
  animation:singularity-core 2.4s ease-in-out infinite;pointer-events:none}
@keyframes singularity-idle{0%,100%{box-shadow:0 0 30px rgba(160,60,255,.35),0 0 60px rgba(100,0,200,.2),inset 0 0 30px rgba(180,80,255,.06)}50%{box-shadow:0 0 60px rgba(200,100,255,.6),0 0 120px rgba(140,40,255,.35),inset 0 0 50px rgba(200,100,255,.1)}}
@keyframes singularity-rotate{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
@keyframes singularity-core{0%,100%{box-shadow:0 0 8px 4px rgba(220,140,255,.8),0 0 20px 8px rgba(180,80,255,.5),0 0 40px 16px rgba(140,40,255,.3)}50%{box-shadow:0 0 12px 6px rgba(255,200,255,1),0 0 30px 12px rgba(200,100,255,.7),0 0 60px 24px rgba(160,60,255,.45)}}
.btn-primary.style-singularity:hover{color:#fff;text-shadow:0 0 14px rgba(255,180,255,1);box-shadow:0 0 80px rgba(220,120,255,.75),0 0 160px rgba(160,60,255,.45),inset 0 0 60px rgba(220,120,255,.15)}

/* ══════════════════════════════════════════════
   EXPERT+ ROLL ANIMATIONS
   data-expert-style attribute is set on
   #resultName during the spin phases
   ══════════════════════════════════════════════ */

/* ── GLITCH ROLL ── */
#resultName[data-expert-style="glitch"].spin-fast,
#resultName[data-expert-style="glitch"].spin-mid{
  animation:glitch-roll 0.08s steps(1) infinite !important;
  font-family:'DM Mono',monospace !important;letter-spacing:.18em;
  color:#00ffee;text-shadow:-3px 0 #ff00cc,3px 0 #00ffcc,0 0 20px rgba(0,255,220,.5);
}
#resultName[data-expert-style="glitch"].spin-slow{
  animation:glitch-roll-slow 0.14s steps(1) infinite !important;
  font-family:'DM Mono',monospace !important;
  color:#00ffee;text-shadow:-2px 0 #ff00cc,2px 0 #00ffcc;
}
@keyframes glitch-roll{
  0%  {transform:translate(0,0) skewX(0);       opacity:.9; clip-path:none}
  15% {transform:translate(-4px,-2px) skewX(-8deg);clip-path:inset(0 0 60% 0);color:#ff00cc;text-shadow:4px 0 #00ffee,-4px 0 #ff00cc}
  30% {transform:translate(4px,3px) skewX(6deg); clip-path:inset(55% 0 0 0);color:#00ffee;text-shadow:-3px 0 #ff00cc}
  50% {transform:translate(-2px,0) skewX(-3deg); clip-path:inset(20% 0 30% 0);opacity:.7}
  70% {transform:translate(3px,-1px) skewX(4deg);clip-path:none;opacity:.95}
  85% {transform:translate(-1px,2px);            color:#fff;text-shadow:0 0 12px #00ffee}
  100%{transform:translate(0,0);                 clip-path:none;opacity:.9}
}
@keyframes glitch-roll-slow{
  0%  {transform:translate(0,0);opacity:.95;color:#00ffee;text-shadow:-2px 0 #ff00cc,2px 0 #00ffcc}
  40% {transform:translate(-2px,1px) skewX(-4deg);opacity:.8;color:#ccffee}
  80% {transform:translate(2px,-1px) skewX(3deg);opacity:.95}
  100%{transform:translate(0,0)}
}

/* ── CIPHER ROLL ── */
#resultName[data-expert-style="cipher"].spin-fast,
#resultName[data-expert-style="cipher"].spin-mid{
  animation:cipher-roll 0.07s steps(1) infinite !important;
  font-family:'DM Mono',monospace !important;font-size:22px;letter-spacing:.12em;
  color:#00ff44;text-shadow:0 0 8px rgba(0,255,60,.9),0 0 20px rgba(0,200,50,.5),0 0 40px rgba(0,150,40,.25);
}
#resultName[data-expert-style="cipher"].spin-slow{
  animation:cipher-roll-slow 0.18s ease-in-out infinite !important;
  font-family:'DM Mono',monospace !important;letter-spacing:.12em;
  color:#80ffaa;text-shadow:0 0 10px rgba(0,255,80,.8),0 0 30px rgba(0,220,60,.4);
}
@keyframes cipher-roll{
  0%  {opacity:1;  transform:scaleY(1);   filter:blur(0)}
  25% {opacity:.6; transform:scaleY(.8);  filter:blur(1px) brightness(1.4)}
  50% {opacity:.9; transform:scaleY(1.05);filter:blur(0) brightness(2)}
  75% {opacity:.5; transform:scaleY(.9);  filter:blur(.5px)}
  100%{opacity:1;  transform:scaleY(1);   filter:blur(0)}
}
@keyframes cipher-roll-slow{
  0%,100%{opacity:1; transform:translateY(0) scaleY(1);   filter:brightness(1.2)}
  50%    {opacity:.85;transform:translateY(-3px) scaleY(.96);filter:brightness(1.8) blur(.5px)}
}

/* ── OVERDRIVE ROLL ── */
#resultName[data-expert-style="overdrive"].spin-fast{
  animation:overdrive-roll-fast 0.05s linear infinite !important;
  font-family:'Cinzel',serif !important;letter-spacing:.25em;
  color:#ffee44;text-shadow:0 0 12px rgba(255,220,0,1),0 0 30px rgba(255,160,0,.6);
}
#resultName[data-expert-style="overdrive"].spin-mid{
  animation:overdrive-roll-mid 0.09s linear infinite !important;
  font-family:'Cinzel',serif !important;
  color:#ffe060;text-shadow:0 0 10px rgba(255,200,0,.9),0 0 25px rgba(255,140,0,.5);
}
#resultName[data-expert-style="overdrive"].spin-slow{
  animation:overdrive-roll-slow 0.22s ease-out infinite !important;
  font-family:'Cinzel',serif !important;
  color:#ffd040;text-shadow:0 0 8px rgba(255,180,0,.8);
}
@keyframes overdrive-roll-fast{
  0%  {transform:translateX(0) scaleX(1);       opacity:.9; filter:blur(0)}
  20% {transform:translateX(-14px) scaleX(1.15);opacity:.6; filter:blur(3px)}
  40% {transform:translateX(14px) scaleX(.85);  opacity:.7; filter:blur(2px)}
  60% {transform:translateX(-7px) scaleX(1.08); opacity:.8; filter:blur(1px)}
  80% {transform:translateX(5px) scaleX(.95);   opacity:.9; filter:blur(.5px)}
  100%{transform:translateX(0) scaleX(1);       opacity:.9; filter:blur(0)}
}
@keyframes overdrive-roll-mid{
  0%  {transform:translateX(0) scaleX(1);      opacity:.92}
  30% {transform:translateX(-8px) scaleX(1.1); opacity:.7; filter:blur(1.5px)}
  60% {transform:translateX(8px) scaleX(.92);  opacity:.8}
  100%{transform:translateX(0) scaleX(1);      opacity:.92}
}
@keyframes overdrive-roll-slow{
  0%,100%{transform:translateX(0) scaleX(1);    opacity:.95}
  40%    {transform:translateX(-4px) scaleX(1.04);opacity:.8;filter:blur(.5px)}
  70%    {transform:translateX(3px) scaleX(.97); opacity:.9}
}

/* ── FRACTURE ROLL ── */
#resultName[data-expert-style="fracture"].spin-fast,
#resultName[data-expert-style="fracture"].spin-mid{
  animation:fracture-roll 0.09s steps(2) infinite !important;
  font-family:'Cinzel',serif !important;letter-spacing:.18em;
  color:#c8d4ff;
  text-shadow:-2px -1px 0 rgba(255,100,200,.7),2px 1px 0 rgba(100,200,255,.7),0 0 16px rgba(160,190,255,.6);
}
#resultName[data-expert-style="fracture"].spin-slow{
  animation:fracture-roll-slow 0.2s ease-in-out infinite !important;
  font-family:'Cinzel',serif !important;
  color:#d8e4ff;
  text-shadow:-1px -1px 0 rgba(255,140,220,.5),1px 1px 0 rgba(120,220,255,.5),0 0 20px rgba(180,210,255,.7);
}
@keyframes fracture-roll{
  0%  {transform:translate(0,0) scale(1);         text-shadow:-2px -1px 0 rgba(255,100,200,.7),2px 1px 0 rgba(100,200,255,.7)}
  25% {transform:translate(-3px,2px) scale(1.04); text-shadow:-5px -2px 0 rgba(255,80,180,.9),6px 2px 0 rgba(60,200,255,.9),0 0 20px rgba(200,220,255,.5)}
  50% {transform:translate(4px,-3px) scale(.96);  text-shadow:5px 2px 0 rgba(255,120,220,.8),-4px -2px 0 rgba(80,220,255,.8)}
  75% {transform:translate(-2px,1px) scale(1.02); text-shadow:-3px 0 rgba(255,100,200,.6),3px 0 rgba(100,200,255,.6)}
  100%{transform:translate(0,0) scale(1)}
}
@keyframes fracture-roll-slow{
  0%,100%{transform:translate(0,0);opacity:1;
    text-shadow:-1px -1px 0 rgba(255,140,220,.5),1px 1px 0 rgba(120,220,255,.5),0 0 20px rgba(180,210,255,.7)}
  50%{transform:translate(-2px,1px) scale(1.02);opacity:.88;
    text-shadow:-3px -1px 0 rgba(255,120,200,.7),3px 1px 0 rgba(100,210,255,.7),0 0 28px rgba(180,210,255,.8)}
}

/* ── SINGULARITY ROLL ── */
#resultName[data-expert-style="singularity"].spin-fast{
  animation:singularity-roll-fast 0.1s ease-in-out infinite !important;
  font-family:'Cormorant Garamond',serif !important;font-weight:300;font-size:28px;letter-spacing:.25em;
  color:#dd99ff;text-shadow:0 0 12px rgba(220,120,255,.9),0 0 30px rgba(180,60,255,.6),0 0 60px rgba(140,40,255,.3);
}
#resultName[data-expert-style="singularity"].spin-mid{
  animation:singularity-roll-mid 0.14s ease-in-out infinite !important;
  font-family:'Cormorant Garamond',serif !important;font-weight:300;font-size:34px;letter-spacing:.2em;
  color:#cc88ff;text-shadow:0 0 14px rgba(220,130,255,.9),0 0 35px rgba(180,70,255,.55);
}
#resultName[data-expert-style="singularity"].spin-slow{
  animation:singularity-roll-slow 0.24s ease-in-out infinite !important;
  font-family:'Cormorant Garamond',serif !important;font-weight:300;font-size:42px;letter-spacing:.16em;
  color:#e0b4ff;text-shadow:0 0 16px rgba(230,160,255,.9),0 0 40px rgba(190,80,255,.55),0 0 80px rgba(160,50,255,.25);
}
@keyframes singularity-roll-fast{
  0%  {transform:scale(1) rotate(0deg);    opacity:.9; filter:blur(0)}
  20% {transform:scale(.7) rotate(-6deg);  opacity:.5; filter:blur(2px)}
  40% {transform:scale(1.15) rotate(4deg); opacity:.8; filter:blur(0)}
  60% {transform:scale(.85) rotate(-3deg); opacity:.65;filter:blur(1px)}
  80% {transform:scale(1.05) rotate(2deg); opacity:.88}
  100%{transform:scale(1) rotate(0deg);    opacity:.9}
}
@keyframes singularity-roll-mid{
  0%  {transform:scale(1) rotate(0deg);    opacity:.92}
  30% {transform:scale(.78) rotate(-5deg); opacity:.55;filter:blur(1.5px)}
  65% {transform:scale(1.1) rotate(3deg);  opacity:.9; filter:blur(0)}
  100%{transform:scale(1) rotate(0deg);    opacity:.92}
}
@keyframes singularity-roll-slow{
  0%,100%{transform:scale(1) rotate(0deg);    opacity:1;  filter:blur(0)}
  50%    {transform:scale(.88) rotate(-2deg); opacity:.78;filter:blur(.5px)}
}

/* ── EXPERT+ shop tab accent ── */
.shop-cat[data-cat="expert"]{color:rgba(200,160,255,.5);border-color:rgba(180,100,255,.2)}
.shop-cat[data-cat="expert"]:hover{color:rgba(220,180,255,.8);border-color:rgba(200,120,255,.4);background:rgba(180,80,255,.06)}
.shop-cat[data-cat="expert"].active{color:#e0b4ff;border-color:rgba(200,130,255,.4);background:rgba(180,80,255,.12);box-shadow:0 0 14px rgba(180,80,255,.12),inset 0 1px 0 rgba(220,160,255,.1)}

`;
  document.head.appendChild(style);
})();

// ─── CATEGORY META ─────────────────────────────────────────
window.STYLE_CATEGORIES = [
  { id:"all",       label:"All Styles" },
  { id:"classic",   label:"Classic"    },
  { id:"elemental", label:"Elemental"  },
  { id:"arcane",    label:"Arcane"     },
  { id:"dark",      label:"Dark"       },
  { id:"prestige",  label:"Prestige"   },
  { id:"expert",    label:"Expert +"   }
];

// ─── SHOP STATE ──────────────────────────────────────────────
let _shopCat = 'all';

// ─── SHOP OPEN/CLOSE ─────────────────────────────────────────
window.openShop = function() {
  rebuildShopOverlay();
  renderShopItems();
  document.getElementById('shopOverlay').classList.add('open');
};
window.closeShop = function() {
  document.getElementById('shopOverlay').classList.remove('open');
};

// ─── BUILD THE SHOP HTML ONCE ────────────────────────────────
function rebuildShopOverlay() {
  const overlay = document.getElementById('shopOverlay');
  overlay.innerHTML = `
    <div class="shop" onclick="event.stopPropagation()">

      <div class="shop-header">
        <div class="shop-title-group">
          <div class="shop-title">Style Atelier</div>
          <div class="shop-sub">Roll to unlock · Click to equip</div>
        </div>
        <button class="shop-close" onclick="closeShop()">Close ✕</button>
      </div>

      <div class="shop-meta">
        <div class="shop-stat">🎲 Rolls <span id="shopRollNum">0</span></div>
        <div class="shop-stat">🎨 Unlocked <span id="shopUnlockedNum">0</span></div>
        <div class="shop-active-label">Active: <span id="shopActiveName">—</span></div>
      </div>

      <div class="shop-cats" id="shopCats"></div>

      <div class="shop-grid" id="shopGrid"></div>

    </div>
  `;

  // Build category tabs
  const catsEl = overlay.querySelector('#shopCats');
  window.STYLE_CATEGORIES.forEach(cat => {
    const btn = document.createElement('button');
    btn.className = 'shop-cat' + (cat.id === _shopCat ? ' active' : '');
    btn.textContent = cat.label;
    btn.dataset.cat = cat.id;
    btn.onclick = () => {
      _shopCat = cat.id;
      catsEl.querySelectorAll('.shop-cat').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      renderShopItems();
    };
    catsEl.appendChild(btn);
  });
}

// ─── RENDER ITEMS ────────────────────────────────────────────
function renderShopItems() {
  const rolls     = window.totalRolls || 0;
  const active    = window.activeStyle || 'classic';

  // update meta bar
  const rnEl = document.getElementById('shopRollNum');
  const unEl = document.getElementById('shopUnlockedNum');
  const anEl = document.getElementById('shopActiveName');
  if (rnEl) rnEl.textContent = rolls;
  const unlocked = window.BUTTON_STYLES.filter(s => rolls >= s.unlockAt).length;
  if (unEl) unEl.textContent = `${unlocked} / ${window.BUTTON_STYLES.length}`;
  const activeStyle = window.BUTTON_STYLES.find(s => s.id === active);
  if (anEl) anEl.textContent = activeStyle ? activeStyle.name : '—';

  const grid = document.getElementById('shopGrid');
  if (!grid) return;
  grid.innerHTML = '';

  const filtered = _shopCat === 'all'
    ? window.BUTTON_STYLES
    : window.BUTTON_STYLES.filter(s => s.category === _shopCat);

  // Sort: unlocked first, then by unlockAt
  const sorted = [...filtered].sort((a, b) => {
    const au = rolls >= a.unlockAt, bu = rolls >= b.unlockAt;
    if (au !== bu) return au ? -1 : 1;
    return a.unlockAt - b.unlockAt;
  });

  sorted.forEach(style => {
    const isUnlocked = rolls >= style.unlockAt;
    const isActive   = active === style.id;
    const rarCfg     = window.STYLE_RARITY[style.rarity] || window.STYLE_RARITY.common;
    const prog       = isUnlocked ? 100 : Math.min(100, Math.round((rolls / style.unlockAt) * 100));
    const remaining  = style.unlockAt - rolls;
    const previewTxt = style.previewLabel !== null ? (style.previewLabel || style.name) : '';

    const item = document.createElement('div');
    item.className = `shop-item${isUnlocked ? '' : ' locked'}${isActive ? ' si-active' : ''}`;

    // Rarity-specific border glow for unlocked cards
    const rarityBorderColor = {
      common:    'rgba(255,255,255,.08)',
      uncommon:  'rgba(74,122,74,.3)',
      rare:      'rgba(58,90,158,.35)',
      legendary: 'rgba(200,150,10,.35)',
      mythic:    'rgba(170,0,238,.35)'
    };
    const rarityCardGlow = {
      common:    '',
      uncommon:  '0 0 0 1px rgba(74,122,74,.15),0 6px 24px rgba(0,0,0,.4)',
      rare:      '0 0 0 1px rgba(58,90,138,.2),0 6px 24px rgba(30,60,140,.12)',
      legendary: '0 0 0 1px rgba(200,150,10,.22),0 6px 30px rgba(180,120,0,.12)',
      mythic:    '0 0 0 1px rgba(170,0,238,.22),0 6px 30px rgba(140,0,200,.12)'
    };
    if (isUnlocked && !isActive) {
      item.style.borderColor = rarityBorderColor[style.rarity] || 'rgba(255,255,255,.08)';
      if (rarityCardGlow[style.rarity]) item.style.boxShadow = rarityCardGlow[style.rarity];
    }

    item.innerHTML = `
      ${isActive ? '<div class="shop-active-indicator">✓ Active</div>' : ''}
      ${!isUnlocked ? '<div class="shop-lock-icon">🔒</div>' : ''}

      <div class="shop-preview">
        <button class="btn btn-primary style-${style.id}" tabindex="-1">
          ${style.id === 'prismatic' ? '' : previewTxt}
        </button>
      </div>

      <div class="shop-rarity-band" style="background:${rarCfg.color};opacity:.55"></div>

      <div class="shop-info">
        <div class="shop-item-name">${style.name}</div>
        <div class="shop-item-desc">${style.desc}</div>
        <div class="shop-item-rarity" style="color:${rarCfg.color}">${rarCfg.label}</div>
      </div>

      <div class="shop-item-footer">
        ${isUnlocked
          ? `<div class="shop-lock-badge" style="color:#6aaa6a">✓ Unlocked</div>`
          : `<div class="shop-lock-badge">
              ${remaining} more roll${remaining !== 1 ? 's' : ''}
              <div class="shop-prog-wrap"><div class="shop-prog-fill" style="width:${prog}%;background:linear-gradient(90deg,${rarCfg.color}88,${rarCfg.color})"></div></div>
            </div>`
        }
        <button
          class="shop-select-btn${isActive ? ' active-btn' : ''}"
          ${!isUnlocked ? 'disabled' : ''}
          onclick="selectStyle('${style.id}')"
        >${isActive ? 'Equipped' : 'Equip'}</button>
      </div>
    `;

    grid.appendChild(item);
  });
}

// ─── SELECT STYLE ────────────────────────────────────────────
window.selectStyle = function(id) {
  window.activeStyle = id;
  if (typeof updateButtonStyle === 'function') updateButtonStyle();
  renderShopItems();
  if (typeof scheduleSave === 'function') scheduleSave();
};

// ─── EXPERT+ ROLL HOOK SYSTEM ────────────────────────────────
window.EXPERT_STYLES = new Set(['glitch','cipher','overdrive','fracture','singularity']);

// Cipher: custom tick override — shows symbols decoding toward the real name
const _CIPHER_CHARS = '!@#$%^&*?<>{}[]|0123456789ABCDEF∆∑∏∂∇αβγδλπ';
window._expertTickOverride = function(el, phase) {
  const active = window.activeStyle;
  if (active !== 'cipher') return false;
  // Fast/mid phase: scramble all characters
  if (phase === 'fast' || phase === 'mid') {
    const len = 4 + Math.floor(Math.random() * 6);
    let out = '';
    for (let i = 0; i < len; i++) out += _CIPHER_CHARS[Math.floor(Math.random() * _CIPHER_CHARS.length)];
    el.textContent = out;
    return true; // suppress normal text update
  }
  return false; // slow phase: normal names
};

window._onExpertRollStart = function(el, styleId) {
  // Reset any leftover state
  el.style.removeProperty('filter');
};


// ─── updateButtonStyle helper (overrides main file's) ────────
window.updateButtonStyle = function() {
  const btn = document.getElementById('rollBtn');
  if (!btn) return;
  // Remove all style- classes
  btn.className = btn.className.split(' ')
    .filter(c => !c.startsWith('style-'))
    .join(' ');
  if (window.activeStyle) {
    btn.classList.add('style-' + window.activeStyle);
  }
};
