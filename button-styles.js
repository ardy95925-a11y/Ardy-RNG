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
    id:"terra", name:"Terra", category:"elemental", unlockAt:55, rarity:"uncommon",
    desc:"Earthy moss and stone, ancient as the ground.",
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
@keyframes storm-bolt{0%,65%,100%{opacity:0;transform:translateX(-100%)}68%{opacity:1;transform:translateX(-70%)}71%{opacity:.25;transform:translateX(10%)}74%{opacity:.9;transform:translateX(80%)}77%{opacity:0;transform:translateX(110%)}}
.btn-primary.style-storm:hover{background:#0c1220;box-shadow:0 0 22px rgba(80,120,220,.32)}

.btn-primary.style-tide{
  background:linear-gradient(135deg,#041830,#062040);
  border:1px solid #1a6080;color:#60c0e0;
  animation:tide-shift 4s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-tide::before{
  content:'';position:absolute;inset:0;
  background:linear-gradient(180deg,transparent 40%,rgba(30,120,180,.22),transparent);
  animation:tide-wave 3s ease-in-out infinite;
}
@keyframes tide-shift{0%,100%{background:linear-gradient(135deg,#041830,#062040)}50%{background:linear-gradient(135deg,#051c36,#082848)}}
@keyframes tide-wave{0%{transform:translateY(0) scaleX(1)}50%{transform:translateY(-4px) scaleX(1.08)}100%{transform:translateY(0) scaleX(1)}}
.btn-primary.style-tide:hover{box-shadow:0 0 28px rgba(30,120,200,.4)}

.btn-primary.style-terra{
  background:linear-gradient(180deg,#1a1208,#0e0c04);
  border:1px solid #5a7020;color:#8aaa40;
  font-family:'Cormorant Garamond',serif;font-size:14px;font-weight:400;letter-spacing:.16em;
  box-shadow:0 2px 12px rgba(80,100,20,.2),inset 0 0 40px rgba(60,80,10,.06);
}
.btn-primary.style-terra:hover{background:linear-gradient(180deg,#221a0a,#121006);color:#a0c050;box-shadow:0 0 24px rgba(100,130,20,.3)}

.btn-primary.style-inferno{
  background:linear-gradient(180deg,#0a0000,#1a0400);
  border:none;color:#ff5010;
  animation:inferno-roar 1.8s ease-in-out infinite;overflow:hidden;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.25em;
}
.btn-primary.style-inferno::before{
  content:'';position:absolute;inset:-1px;border-radius:5px;
  background:linear-gradient(90deg,#ff2000,#ff6000,#ffaa00,#ff6000,#ff2000);
  background-size:300% 100%;animation:inferno-border 1.5s linear infinite;z-index:-1;
}
.btn-primary.style-inferno::after{
  content:'';position:absolute;inset:1px;border-radius:4px;
  background:linear-gradient(180deg,#120000,#060000);z-index:0;
}
.btn-primary.style-inferno span,.btn-primary.style-inferno{position:relative;z-index:1}
@keyframes inferno-roar{0%,100%{box-shadow:0 0 20px rgba(255,60,0,.5),inset 0 0 30px rgba(255,40,0,.08)}50%{box-shadow:0 0 50px rgba(255,80,0,.85),inset 0 0 50px rgba(255,60,0,.18)}}
@keyframes inferno-border{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.btn-primary.style-inferno:hover{color:#ff8040}

/* ── ARCANE ── */
.btn-primary.style-void{
  background:#000;border:1px solid #2a0040;color:rgba(220,160,255,.9);letter-spacing:.25em;
  animation:void-breathe 3s ease-in-out infinite;
}
.btn-primary.style-void::after{
  content:'';position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 150%,rgba(140,0,255,.22),transparent 70%);
  pointer-events:none;animation:void-glow 3s ease-in-out infinite;
}
@keyframes void-breathe{0%,100%{box-shadow:0 0 8px rgba(140,0,255,.18),inset 0 0 20px rgba(140,0,255,.03)}50%{box-shadow:0 0 26px rgba(140,0,255,.52),inset 0 0 40px rgba(140,0,255,.08)}}
@keyframes void-glow{0%,100%{opacity:.4}50%{opacity:1}}
.btn-primary.style-void:hover{background:#0a0015;color:#f0c0ff}

.btn-primary.style-ethereal{
  background:linear-gradient(135deg,rgba(200,180,255,.08),rgba(150,220,255,.06));
  border:1px solid rgba(180,200,255,.3);color:rgba(220,210,255,.9);
  backdrop-filter:blur(12px);letter-spacing:.2em;
  animation:ethereal-shift 5s ease-in-out infinite;overflow:hidden;
}
.btn-primary.style-ethereal::before{
  content:'';position:absolute;inset:-50%;
  background:conic-gradient(transparent 0deg,rgba(180,160,255,.12) 60deg,transparent 120deg);
  animation:ethereal-spin 6s linear infinite;
}
@keyframes ethereal-shift{0%,100%{box-shadow:0 0 20px rgba(180,160,255,.18),inset 0 0 30px rgba(160,180,255,.05)}50%{box-shadow:0 0 40px rgba(180,160,255,.35),inset 0 0 50px rgba(160,200,255,.1)}}
@keyframes ethereal-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.btn-primary.style-ethereal:hover{border-color:rgba(200,180,255,.55);color:#fff}

.btn-primary.style-runic{
  background:#0a0818;border:1px solid #3020a0;color:#a080ff;
  font-family:'Uncial Antiqua',cursive;font-size:11px;letter-spacing:.18em;
  position:relative;overflow:hidden;
  animation:runic-pulse 3s ease-in-out infinite;
}
.btn-primary.style-runic::before{
  content:'ᚠ ᚢ ᚦ ᚨ ᚱ ᚲ ᚷ ᚹ ᚺ ᚾ ᛁ ᛃ ᛇ ᛈ ᛉ ᛊ ᛏ ᛒ ᛖ ᛗ ᛚ ᛜ ᛞ ᛟ';
  position:absolute;font-size:7px;letter-spacing:.3em;white-space:nowrap;
  top:3px;left:0;right:0;text-align:center;color:rgba(120,100,200,.3);
  pointer-events:none;
}
.btn-primary.style-runic::after{
  content:'ᛟ ᛞ ᛜ ᛚ ᛗ ᛖ ᛒ ᛏ ᛊ ᛉ ᛈ ᛇ ᛃ ᛁ ᚾ ᚺ ᚹ ᚷ ᚲ ᚱ ᚨ ᚦ ᚢ ᚠ';
  position:absolute;font-size:7px;letter-spacing:.3em;white-space:nowrap;
  bottom:3px;left:0;right:0;text-align:center;color:rgba(120,100,200,.3);
  pointer-events:none;
}
@keyframes runic-pulse{0%,100%{box-shadow:0 0 12px rgba(80,60,200,.3),inset 0 0 20px rgba(60,40,160,.05)}50%{box-shadow:0 0 28px rgba(100,80,220,.6),inset 0 0 32px rgba(80,60,180,.12)}}
.btn-primary.style-runic:hover{background:#0e0c20;color:#c0a0ff}

.btn-primary.style-astral{
  background:radial-gradient(ellipse at 50% 120%,#0c1640 0%,#050810 60%);
  border:1px solid #1a2a60;color:#8090d0;overflow:hidden;
  animation:astral-twinkle 4s ease-in-out infinite;
}
.btn-primary.style-astral::before{
  content:'· ✦ · ✧ · ★ · ✦ · ✧ · ★ · ✦ · ✧ · ★ ·';
  position:absolute;font-size:8px;letter-spacing:.1em;
  inset:0;display:flex;align-items:center;justify-content:center;
  color:rgba(180,200,255,.15);pointer-events:none;white-space:nowrap;overflow:hidden;
  animation:astral-scroll 8s linear infinite;
}
@keyframes astral-twinkle{0%,100%{box-shadow:0 0 18px rgba(60,80,180,.2)}50%{box-shadow:0 0 40px rgba(80,100,220,.4),0 0 80px rgba(60,80,200,.15)}}
@keyframes astral-scroll{0%{letter-spacing:.1em;opacity:.15}50%{letter-spacing:.4em;opacity:.3}100%{letter-spacing:.1em;opacity:.15}}
.btn-primary.style-astral:hover{color:#b0c0f0;box-shadow:0 0 50px rgba(80,100,220,.5)}

/* ── DARK ── */
.btn-primary.style-forge{
  background:linear-gradient(180deg,#2a1a0a,#1a0e04);
  border:1px solid #8a6020;color:#d4a040;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.25em;
  box-shadow:0 3px 0 #4a2e0a,0 4px 14px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,200,80,.1);
}
.btn-primary.style-forge:hover{transform:translateY(-1px);box-shadow:0 4px 0 #4a2e0a,0 6px 18px rgba(0,0,0,.4),inset 0 1px 0 rgba(255,200,80,.15)}
.btn-primary.style-forge:active{transform:translateY(2px)!important;box-shadow:0 1px 0 #4a2e0a,0 2px 6px rgba(0,0,0,.3)}

.btn-primary.style-blood{
  background:linear-gradient(180deg,#1a0000,#0d0000);
  border:1px solid #660000;color:#cc3030;
  font-family:'Uncial Antiqua',cursive;font-size:12px;
  animation:blood-pulse 4s ease-in-out infinite;
}
@keyframes blood-pulse{0%,100%{box-shadow:0 0 8px rgba(180,0,0,.18),inset 0 0 20px rgba(180,0,0,.04)}50%{box-shadow:0 0 26px rgba(200,0,0,.48),inset 0 0 30px rgba(180,0,0,.1)}}
.btn-primary.style-blood:hover{background:linear-gradient(180deg,#220000,#110000);color:#ee4040}

.btn-primary.style-obsidian{
  background:linear-gradient(160deg,#141414,#0a0a0a);
  border:1px solid #3a3a3a;color:#c8c8c8;letter-spacing:.22em;
  box-shadow:0 2px 0 #000,0 3px 12px rgba(0,0,0,.6),inset 0 1px 0 rgba(255,255,255,.06);
  position:relative;overflow:hidden;
}
.btn-primary.style-obsidian::before{
  content:'';position:absolute;
  top:-50%;left:-20%;width:40%;height:200%;
  background:linear-gradient(90deg,transparent,rgba(255,255,255,.04),transparent);
  transform:skewX(-15deg);animation:obsidian-gleam 5s ease-in-out infinite;
}
@keyframes obsidian-gleam{0%,100%{left:-20%;opacity:0}30%{opacity:1}60%{left:120%;opacity:0}}
.btn-primary.style-obsidian:hover{background:linear-gradient(160deg,#1c1c1c,#111);color:#e8e8e8;box-shadow:0 2px 0 #000,0 4px 18px rgba(0,0,0,.7),inset 0 1px 0 rgba(255,255,255,.1)}

.btn-primary.style-shadow{
  background:#000;border:none;color:rgba(180,160,220,.8);letter-spacing:.2em;
  overflow:hidden;position:relative;
  animation:shadow-breathe 3s ease-in-out infinite;
}
.btn-primary.style-shadow::before{
  content:'';position:absolute;inset:-2px;border-radius:5px;z-index:-1;
  background:linear-gradient(135deg,#1a0030,#050010,#200040,#030008,#1a0030);
  background-size:300% 300%;animation:shadow-coil 6s linear infinite;
}
.btn-primary.style-shadow::after{
  content:'';position:absolute;inset:1px;border-radius:4px;
  background:#000;z-index:0;
}
@keyframes shadow-breathe{0%,100%{box-shadow:0 0 15px rgba(80,0,150,.3),0 0 40px rgba(40,0,80,.15)}50%{box-shadow:0 0 35px rgba(100,0,200,.6),0 0 80px rgba(60,0,120,.3)}}
@keyframes shadow-coil{0%{background-position:0% 50%}100%{background-position:300% 50%}}

/* ── PRESTIGE ── */
.btn-primary.style-prismatic{
  background:#000;border:none;color:#fff;letter-spacing:.2em;overflow:hidden;
}
.btn-primary.style-prismatic::before{
  content:'';position:absolute;inset:-2px;z-index:0;border-radius:5px;
  background:linear-gradient(90deg,#ff0000,#ffaa00,#00ff88,#0088ff,#aa00ff,#ff0000);
  background-size:400% 100%;animation:prism-rotate 2s linear infinite;
}
.btn-primary.style-prismatic::after{
  content:'ROLL';position:absolute;inset:1px;z-index:1;border-radius:3px;background:#000;
  display:flex;align-items:center;justify-content:center;
  font-size:11px;letter-spacing:.2em;font-family:'DM Mono',monospace;color:#fff;
  line-height:1;padding-top:1px;
}
@keyframes prism-rotate{0%{background-position:0% 50%}100%{background-position:400% 50%}}

.btn-primary.style-gilded{
  background:linear-gradient(160deg,#2a1e04,#1a1200);
  border:none;color:#ffd060;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.28em;
  position:relative;overflow:hidden;
  animation:gilded-shine 4s ease-in-out infinite;
}
.btn-primary.style-gilded::before{
  content:'';position:absolute;inset:-1px;border-radius:5px;z-index:-1;
  background:linear-gradient(135deg,#8b6914,#ffd700,#c8960a,#ffe066,#8b6914);
  background-size:300% 300%;animation:gilded-border 3s linear infinite;
}
.btn-primary.style-gilded::after{
  content:'';position:absolute;inset:1px;border-radius:4px;z-index:0;
  background:linear-gradient(160deg,#2a1e04,#1a1200);
}
@keyframes gilded-shine{0%,100%{box-shadow:0 0 16px rgba(200,150,10,.35),inset 0 1px 0 rgba(255,220,80,.1)}50%{box-shadow:0 0 36px rgba(220,170,20,.65),inset 0 1px 0 rgba(255,230,100,.18)}}
@keyframes gilded-border{0%{background-position:0% 50%}100%{background-position:300% 50%}}
.btn-primary.style-gilded:hover{color:#ffea80}

.btn-primary.style-celestial{
  background:radial-gradient(ellipse at 50% 50%,#0a0820 0%,#040410 100%);
  border:none;color:#c0b0ff;letter-spacing:.2em;
  overflow:hidden;position:relative;
  animation:celestial-pulse 4s ease-in-out infinite;
}
.btn-primary.style-celestial::before{
  content:'';position:absolute;inset:-2px;border-radius:5px;z-index:-1;
  background:conic-gradient(
    #ff00ff 0deg,#8800ff 60deg,#0088ff 120deg,
    #00ffcc 180deg,#88ff00 240deg,#ff8800 300deg,#ff00ff 360deg
  );animation:celestial-spin 3s linear infinite;
}
.btn-primary.style-celestial::after{
  content:'';position:absolute;inset:1px;border-radius:4px;z-index:0;
  background:radial-gradient(ellipse at 50% 50%,#0a0820,#040410);
}
@keyframes celestial-pulse{0%,100%{box-shadow:0 0 30px rgba(100,80,255,.4),0 0 80px rgba(60,40,200,.15)}50%{box-shadow:0 0 60px rgba(120,100,255,.7),0 0 140px rgba(80,60,220,.3)}}
@keyframes celestial-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.btn-primary.style-celestial:hover{color:#e0d0ff}

.btn-primary.style-divine_btn{
  background:linear-gradient(160deg,#1a1400,#0e0c00);
  border:none;color:#ffe840;
  font-family:'Cinzel',serif;font-size:10px;letter-spacing:.22em;
  overflow:hidden;position:relative;
  animation:divine-btn-pulse 2s ease-in-out infinite;
}
.btn-primary.style-divine_btn::before{
  content:'';position:absolute;inset:-3px;border-radius:6px;z-index:-1;
  background:conic-gradient(
    #ffd700 0deg,#fff7a0 45deg,#ffec00 90deg,
    #ffc800 135deg,#ffe680 180deg,#fff0a0 225deg,
    #ffd700 270deg,#fff7a0 315deg,#ffd700 360deg
  );animation:divine-btn-spin 2s linear infinite;
}
.btn-primary.style-divine_btn::after{
  content:'';position:absolute;inset:1px;border-radius:5px;z-index:0;
  background:linear-gradient(160deg,#1a1400,#0e0c00);
}
@keyframes divine-btn-pulse{0%,100%{box-shadow:0 0 24px rgba(255,215,0,.55),0 0 60px rgba(255,200,0,.2)}50%{box-shadow:0 0 50px rgba(255,215,0,.9),0 0 120px rgba(255,210,0,.4)}}
@keyframes divine-btn-spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.btn-primary.style-divine_btn:hover{color:#fff7a0}

/* ── SHARED Z-INDEX FIX for multi-layer buttons ── */
.btn-primary.style-prismatic,
.btn-primary.style-celestial,
.btn-primary.style-divine_btn,
.btn-primary.style-inferno,
.btn-primary.style-shadow{
  isolation:isolate;
}

/* ─────────────────────────────────────────────────────────────
   SHOP UI — full redesign
   ───────────────────────────────────────────────────────────── */

.shop{
  width:780px;max-width:97vw;max-height:92vh;
  background:#0f0f0f;border-radius:8px;
  box-shadow:0 0 0 1px rgba(255,255,255,.06),0 32px 100px rgba(0,0,0,.7);
  display:flex;flex-direction:column;overflow:hidden;
  color:#ddd;
}

.shop-header{
  padding:22px 28px 18px;
  background:linear-gradient(180deg,#1a1a1a,#141414);
  border-bottom:1px solid rgba(255,255,255,.07);
  display:flex;align-items:center;justify-content:space-between;flex-shrink:0;
}
.shop-title-group{}
.shop-title{
  font-family:'Cormorant Garamond',serif;font-size:26px;font-weight:300;
  color:#e8e4dc;letter-spacing:.08em;
}
.shop-sub{
  font-size:9px;letter-spacing:.22em;color:#444;text-transform:uppercase;margin-top:2px;
}
.shop-close{
  font-size:9px;letter-spacing:.2em;text-transform:uppercase;color:#444;
  cursor:pointer;background:none;border:1px solid rgba(255,255,255,.08);
  border-radius:3px;padding:7px 14px;font-family:'DM Mono',monospace;
  transition:all .15s;
}
.shop-close:hover{color:#aaa;border-color:rgba(255,255,255,.2)}

/* meta bar */
.shop-meta{
  display:flex;align-items:center;gap:0;
  background:#0c0c0c;border-bottom:1px solid rgba(255,255,255,.05);
  flex-shrink:0;
}
.shop-stat{
  padding:10px 20px;font-size:9px;letter-spacing:.15em;text-transform:uppercase;
  color:#444;border-right:1px solid rgba(255,255,255,.05);
}
.shop-stat span{color:#aaa;font-size:11px;letter-spacing:.05em}
.shop-active-label{
  margin-left:auto;padding:10px 20px;font-size:9px;letter-spacing:.15em;
  text-transform:uppercase;color:#444;
}
.shop-active-label span{color:#888}

/* category tabs */
.shop-cats{
  display:flex;gap:0;border-bottom:1px solid rgba(255,255,255,.05);
  flex-shrink:0;background:#0e0e0e;overflow-x:auto;scrollbar-width:none;
}
.shop-cats::-webkit-scrollbar{display:none}
.shop-cat{
  font-size:9px;letter-spacing:.15em;text-transform:uppercase;
  color:#444;background:none;border:none;border-bottom:2px solid transparent;
  padding:11px 18px;cursor:pointer;font-family:'DM Mono',monospace;
  transition:color .18s,border-color .18s;margin-bottom:-1px;white-space:nowrap;
}
.shop-cat:hover{color:#888}
.shop-cat.active{color:#ccc;border-bottom-color:#666}

/* grid */
.shop-grid{
  display:grid;grid-template-columns:repeat(auto-fill,minmax(160px,1fr));
  gap:10px;padding:18px 20px;overflow-y:auto;flex:1;
}
.shop-grid::-webkit-scrollbar{width:3px}
.shop-grid::-webkit-scrollbar-thumb{background:#2a2a2a;border-radius:2px}

.shop-item{
  border:1px solid rgba(255,255,255,.07);border-radius:6px;
  background:#161616;
  display:flex;flex-direction:column;gap:0;
  position:relative;cursor:pointer;
  transition:border-color .2s,box-shadow .2s,transform .15s;
  overflow:hidden;
}
.shop-item:hover:not(.locked){
  border-color:rgba(255,255,255,.18);
  box-shadow:0 8px 28px rgba(0,0,0,.5);
  transform:translateY(-2px);
}
.shop-item.locked{opacity:.45;cursor:default;pointer-events:none}
.shop-item.si-active{
  border-color:rgba(255,255,255,.35);
  box-shadow:0 0 0 1px rgba(255,255,255,.12),0 8px 28px rgba(0,0,0,.4);
}

/* preview pane — full-width animated button */
.shop-preview{
  height:64px;display:flex;align-items:stretch;position:relative;overflow:hidden;
}
.shop-preview .btn-primary{
  flex:1;border-radius:0;font-size:9px;pointer-events:none;
  border-left:none;border-right:none;border-top:none;
}

/* rarity band */
.shop-rarity-band{
  height:2px;flex-shrink:0;
}

/* info section */
.shop-info{padding:10px 12px 8px;flex:1;display:flex;flex-direction:column;gap:5px}
.shop-item-name{font-size:10px;letter-spacing:.12em;text-transform:uppercase;color:#ccc}
.shop-item-desc{font-size:8px;letter-spacing:.05em;color:#555;line-height:1.55;flex:1}
.shop-item-rarity{font-size:8px;letter-spacing:.12em;text-transform:uppercase}

/* footer */
.shop-item-footer{
  display:flex;align-items:center;justify-content:space-between;
  padding:8px 12px;border-top:1px solid rgba(255,255,255,.04);gap:6px;
}
.shop-lock-badge{
  font-size:8px;letter-spacing:.06em;color:#3a3a3a;text-transform:uppercase;flex:1;min-width:0;
}
.shop-select-btn{
  font-size:8px;letter-spacing:.14em;text-transform:uppercase;
  padding:5px 12px;border-radius:2px;cursor:pointer;
  border:1px solid rgba(255,255,255,.12);background:none;color:#888;
  font-family:'DM Mono',monospace;transition:all .15s;white-space:nowrap;
}
.shop-select-btn:hover{background:rgba(255,255,255,.06);color:#ccc}
.shop-select-btn.active-btn{
  background:rgba(255,255,255,.1);color:#fff;border-color:rgba(255,255,255,.3);
}
.shop-lock-icon{
  position:absolute;top:8px;right:8px;font-size:12px;opacity:.25;z-index:2;
}

/* prog bar */
.shop-prog-wrap{height:1.5px;background:rgba(255,255,255,.06);border-radius:1px;overflow:hidden;margin-top:3px}
.shop-prog-fill{height:100%;background:linear-gradient(90deg,#333,#666);border-radius:1px;transition:width .6s}

/* active indicator badge */
.shop-active-indicator{
  position:absolute;top:6px;left:6px;z-index:2;
  font-size:7px;letter-spacing:.14em;text-transform:uppercase;
  background:rgba(255,255,255,.12);color:#fff;
  padding:2px 7px;border-radius:2px;
}

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
  { id:"prestige",  label:"Prestige"   }
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

    item.innerHTML = `
      ${isActive ? '<div class="shop-active-indicator">✓ Active</div>' : ''}
      ${!isUnlocked ? '<div class="shop-lock-icon">🔒</div>' : ''}

      <div class="shop-preview">
        <button class="btn btn-primary style-${style.id}" tabindex="-1">
          ${style.id === 'prismatic' ? '' : previewTxt}
        </button>
      </div>

      <div class="shop-rarity-band" style="background:${rarCfg.color};opacity:.7"></div>

      <div class="shop-info">
        <div class="shop-item-name">${style.name}</div>
        <div class="shop-item-desc">${style.desc}</div>
        <div class="shop-item-rarity" style="color:${rarCfg.color}">${rarCfg.label}</div>
      </div>

      <div class="shop-item-footer">
        ${isUnlocked
          ? `<div class="shop-lock-badge" style="color:#4a7a4a">✓ Unlocked</div>`
          : `<div class="shop-lock-badge">
              ${remaining} more roll${remaining !== 1 ? 's' : ''}
              <div class="shop-prog-wrap"><div class="shop-prog-fill" style="width:${prog}%"></div></div>
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
