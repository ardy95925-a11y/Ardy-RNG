/* ═══════════════════════════════════════════════════════════
   SACRIFICE ALTAR — sacrifice-altar.js
   A mystical system for sacrificing names to the fire.
   Better names = better rewards!
   ═══════════════════════════════════════════════════════════ */

// ─── SACRIFICE STATE ─────────────────────────────────────────
window.sacrificeSelected = new Set();
let sacrificeOverlayActive = false;
let sacrificeCutsceneActive = false;

// ─── RARITY WEIGHTS & REWARDS ──────────────────────────────
const SACRIFICE_CONFIG = {
  common:    { weight: 1,  rewardMult: 0.5,  rareChance: 1 },
  uncommon:  { weight: 2,  rewardMult: 1,    rareChance: 3 },
  rare:      { weight: 4,  rewardMult: 2,    rareChance: 8 },
  legendary: { weight: 8,  rewardMult: 4,    rareChance: 20 },
  mythic:    { weight: 16, rewardMult: 8,    rareChance: 50 },
  cursed:    { weight: 6,  rewardMult: 3,    rareChance: 15 },
  divine:    { weight: 12, rewardMult: 6,    rareChance: 40 }
};

// ─── CSS INJECTION ────────────────────────────────────────────
(function injectSacrificeStyles() {
  const style = document.createElement('style');
  style.id = 'sacrifice-styles-injected';
  style.textContent = `

/* Sacrifice Altar Button */
.sacrifice-btn{
  position:fixed;bottom:28px;left:28px;z-index:7500;
  font-size:11px;letter-spacing:.15em;text-transform:uppercase;
  padding:10px 16px;border-radius:2px;cursor:pointer;
  background:linear-gradient(135deg,rgba(139,0,0,.4),rgba(80,0,20,.3));
  border:1px solid rgba(180,40,40,.6);color:#ff6666;
  font-family:'DM Mono',monospace;transition:all .25s;
  font-weight:500;box-shadow:0 0 15px rgba(200,50,50,.2);
}

.sacrifice-btn:hover{
  background:linear-gradient(135deg,rgba(180,40,40,.6),rgba(120,20,40,.5));
  border-color:rgba(220,80,80,.8);color:#ff9999;
  box-shadow:0 0 25px rgba(220,80,80,.4),inset 0 0 15px rgba(200,40,40,.15);
  transform:translateY(-2px);
}

.sacrifice-btn:active{transform:translateY(0)}

.sacrifice-btn.pulse{
  animation:sacrifice-pulse 1.5s ease-in-out infinite;
}

@keyframes sacrifice-pulse{
  0%,100%{box-shadow:0 0 15px rgba(200,50,50,.2),0 0 0 0 rgba(200,50,50,.4)}
  50%{box-shadow:0 0 25px rgba(200,50,50,.4),0 0 0 8px rgba(200,50,50,.0)}
}

/* Sacrifice Overlay */
.sacrifice-overlay{
  position:fixed;inset:0;z-index:8500;background:rgba(0,0,0,.8);
  display:none;align-items:center;justify-content:center;
  backdrop-filter:blur(3px);animation:fade-in .3s ease forwards;
}

.sacrifice-overlay.open{display:flex}

@keyframes fade-in{from{opacity:0}to{opacity:1}}

.sacrifice-panel{
  background:linear-gradient(135deg,#1a0a0a,#2a1a1a);
  border:2px solid rgba(200,80,80,.5);border-radius:4px;
  max-width:700px;width:90%;max-height:90vh;display:flex;
  flex-direction:column;box-shadow:0 0 50px rgba(200,40,40,.4);
  animation:panel-rise .4s cubic-bezier(.34,1.56,.64,1) forwards;
}

@keyframes panel-rise{
  from{opacity:0;transform:translateY(40px) scale(.95)}
  to{opacity:1;transform:translateY(0) scale(1)}
}

.sac-header{
  padding:20px 24px;border-bottom:2px solid rgba(200,80,80,.3);
  background:linear-gradient(90deg,#0a0a0a,#1a0a0a);display:flex;
  justify-content:space-between;align-items:center;flex-shrink:0;
}

.sac-title{
  font-family:'Cinzel',serif;font-size:22px;font-weight:700;
  color:#ff8888;letter-spacing:.1em;text-shadow:0 0 15px rgba(200,80,80,.5);
}

.sac-close{
  font-size:10px;letter-spacing:.2em;text-transform:uppercase;
  color:#cc5555;cursor:pointer;background:none;border:1px solid rgba(200,80,80,.4);
  padding:6px 12px;border-radius:2px;font-family:'DM Mono',monospace;
  transition:all .2s;
}

.sac-close:hover{color:#ff7777;border-color:rgba(220,100,100,.6);background:rgba(200,80,80,.15)}

.sac-info{
  padding:14px 24px;border-bottom:1px solid rgba(200,80,80,.2);
  background:rgba(200,80,80,.05);font-size:10px;letter-spacing:.08em;
  color:#999;
}

.sac-stats{
  display:flex;gap:20px;margin-top:8px;
}

.sac-stat-item{display:flex;align-items:center;gap:6px}
.sac-stat-value{color:#ff8888;font-weight:600;font-family:'DM Mono',monospace}

/* Name list */
.sac-list{
  flex:1;overflow-y:auto;padding:16px;display:grid;
  grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:8px;
}

.sac-name-item{
  padding:10px 12px;border:1px solid rgba(100,100,100,.3);border-radius:2px;
  background:rgba(30,30,40,.6);cursor:pointer;transition:all .15s;
  font-size:9px;letter-spacing:.08em;text-align:center;
  white-space:nowrap;overflow:hidden;text-overflow:ellipsis;
  user-select:none;
}

.sac-name-item:hover{
  border-color:rgba(200,80,80,.5);background:rgba(200,80,80,.1);
}

.sac-name-item.selected{
  border-color:#ff6666;background:rgba(200,80,80,.25);
  box-shadow:0 0 12px rgba(200,80,80,.4);color:#ff9999;font-weight:600;
}

.sac-name-item.rarity-common{color:#888}
.sac-name-item.rarity-uncommon{color:#4a9a4a}
.sac-name-item.rarity-rare{color:#3a6a9a}
.sac-name-item.rarity-legendary{color:#d8960a}
.sac-name-item.rarity-mythic{color:#d844ff}
.sac-name-item.rarity-cursed{color:#cc0000}
.sac-name-item.rarity-divine{color:#ffc800}

/* Footer */
.sac-footer{
  padding:16px 24px;border-top:2px solid rgba(200,80,80,.3);
  background:linear-gradient(90deg,#0a0a0a,#1a0a0a);display:flex;
  justify-content:space-between;align-items:center;flex-shrink:0;
}

.sac-power-bar{flex:1;margin-right:16px;display:flex;align-items:center;gap:8px}
.sac-power-label{font-size:9px;letter-spacing:.1em;text-transform:uppercase;color:#666;white-space:nowrap}
.sac-power-meter{
  flex:1;height:20px;background:rgba(0,0,0,.6);border:1px solid rgba(200,80,80,.3);
  border-radius:10px;overflow:hidden;position:relative;
}

.sac-power-fill{
  height:100%;background:linear-gradient(90deg,#ff4444,#ff8844,#ffaa44);
  width:0%;transition:width .3s;box-shadow:0 0 8px rgba(255,100,50,.6);
}

.sac-power-fill.dangerous{
  background:linear-gradient(90deg,#ff0000,#ff6666);
  box-shadow:0 0 12px rgba(255,0,0,.8),inset 0 0 8px rgba(255,100,100,.3);
  animation:power-warn 0.5s ease-in-out infinite;
}

@keyframes power-warn{0%,100%{filter:brightness(1)}50%{filter:brightness(1.4)}}

.sac-power-text{
  font-size:8px;letter-spacing:.1em;color:#ff8888;font-family:'DM Mono',monospace;
  position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);
  pointer-events:none;font-weight:600;white-space:nowrap;
}

.sac-actions{display:flex;gap:10px}

.sac-btn{
  padding:8px 16px;border-radius:2px;cursor:pointer;font-size:9px;
  letter-spacing:.12em;text-transform:uppercase;font-family:'DM Mono',monospace;
  transition:all .2s;border:1px solid;font-weight:600;
}

.sac-btn-clear{
  background:rgba(100,100,100,.2);border-color:rgba(150,150,150,.4);color:#999;
}

.sac-btn-clear:hover{
  background:rgba(100,100,100,.4);border-color:rgba(180,180,180,.6);color:#bbb;
}

.sac-btn-sacrifice{
  background:linear-gradient(135deg,#cc2222,#ff4444);border-color:#ff6666;color:#fff;
}

.sac-btn-sacrifice:hover:not(:disabled){
  background:linear-gradient(135deg,#ff4444,#ff6666);border-color:#ff8888;
  box-shadow:0 0 20px rgba(255,70,70,.5);
}

.sac-btn-sacrifice:disabled{
  opacity:.4;cursor:not-allowed;
}

/* Sacrifice Cutscene */
#sacrificeCutscene{
  position:fixed;inset:0;z-index:9500;background:#000;
  display:none;flex-direction:column;align-items:center;justify-content:center;
  overflow:hidden;
}

#sacrificeCutscene.active{display:flex}

.sac-fire-container{position:absolute;inset:0;overflow:hidden}

.sac-fire-bg{
  position:absolute;inset:0;
  background:radial-gradient(ellipse at 50% 100%,rgba(255,100,20,.6),rgba(255,50,0,.3) 35%,rgba(150,20,0,.1) 70%,transparent);
  opacity:0;transition:opacity 1.2s ease-out;
  filter:blur(2px);animation:sac-fire-glow 2.5s ease-in-out infinite;
}

.sac-fire-bg.show{opacity:1}

@keyframes sac-fire-glow{
  0%,100%{filter:blur(2px) brightness(1)}
  50%{filter:blur(3px) brightness(1.4)}
}

.sac-name-burn{
  position:absolute;font-family:'Cormorant Garamond',serif;font-weight:700;
  white-space:nowrap;opacity:0;pointer-events:none;
  filter:drop-shadow(0 0 3px rgba(0,0,0,.8));
}

.sac-name-burn.burning{
  animation:sac-name-burn-v2 var(--bdur,1.2s) ease-in var(--bdelay,0s) forwards;
}

@keyframes sac-name-burn-v2{
  0%{opacity:1;filter:drop-shadow(0 0 3px rgba(0,0,0,.8)) brightness(1);transform:translateY(0) scale(1) rotate(0deg)}
  20%{filter:drop-shadow(0 0 6px rgba(255,100,0,.8)) brightness(2) sepia(0.9) saturate(4);color:#ffbb44}
  40%{filter:drop-shadow(0 0 12px rgba(255,80,0,.9)) brightness(2.5) sepia(1) saturate(5);color:#ff8800;transform:translateY(-30px) scale(0.85)}
  65%{opacity:.5;filter:drop-shadow(0 0 16px rgba(255,50,0,.6)) brightness(3) blur(1px);color:#ff4400;transform:translateY(-80px) scale(0.5) rotate(var(--brot,15deg))}
  100%{opacity:0;filter:drop-shadow(0 0 20px rgba(255,30,0,0)) brightness(3.5) blur(8px);transform:translateY(-200px) scale(0.1) rotate(var(--brot,45deg))}
}

.sac-ember-particle{
  position:absolute;border-radius:50%;pointer-events:none;
  background:radial-gradient(circle,rgba(255,160,60,.95),rgba(200,80,20,.7));
  box-shadow:0 0 6px rgba(255,100,0,.8);
  animation:sac-ember-float var(--adur,3s) ease-out var(--adelay,0s) forwards;
}

@keyframes sac-ember-float{
  0%{opacity:.95;transform:translate(0,0) scale(1);filter:blur(0)}
  50%{opacity:.6;filter:blur(0.5px)}
  100%{opacity:0;transform:translate(var(--ax,0px),var(--ay,-300px)) scale(0.05);filter:blur(2px)}
}

.sac-reward-title{
  font-family:'Cinzel',serif;font-size:48px;font-weight:700;letter-spacing:.2em;
  color:#fff;text-align:center;opacity:0;position:relative;z-index:2;
  text-shadow:0 0 50px rgba(255,150,0,.9),0 0 100px rgba(255,80,0,.5);
  animation:none;
}

.sac-reward-title.show{animation:sac-reward-in 1s cubic-bezier(.34,1.56,.64,1) forwards}

@keyframes sac-reward-in{
  0%{opacity:0;transform:scale(.3) translateY(80px);filter:blur(10px)}
  40%{opacity:.9;filter:blur(2px)}
  60%{opacity:1;transform:scale(1.2) translateY(-10px)}
  100%{opacity:1;transform:scale(1) translateY(0)}
}

.sac-reward-text{
  font-size:16px;letter-spacing:.2em;text-transform:uppercase;color:#ffaa66;
  text-align:center;margin-top:12px;opacity:0;position:relative;z-index:2;
  font-weight:500;text-shadow:0 0 25px rgba(255,120,80,.6);
}

.sac-reward-text.show{animation:sac-subtitle-in .8s ease .6s forwards}

@keyframes sac-subtitle-in{
  from{opacity:0;transform:translateY(30px);filter:blur(4px)}
  to{opacity:1;transform:translateY(0);filter:blur(0)}
}

.sac-skip{
  position:absolute;bottom:28px;right:32px;font-size:10px;letter-spacing:.2em;
  text-transform:uppercase;color:rgba(255,255,255,.2);cursor:pointer;
  border:1px solid rgba(255,255,255,.15);border-radius:2px;padding:8px 14px;
  background:rgba(0,0,0,.3);font-family:'DM Mono',monospace;transition:all .25s;
  z-index:10;backdrop-filter:blur(4px);
}

.sac-skip:hover{color:rgba(255,255,255,.5);border-color:rgba(255,255,255,.3);background:rgba(0,0,0,.5)}

  `;
  document.head.appendChild(style);
})();

// ─── INITIALIZE SACRIFICE ALTAR ────────────────────────────
window.initSacrificeAltar = function() {
  // Create button
  const btn = document.createElement('button');
  btn.className = 'sacrifice-btn';
  btn.textContent = '🔥 Sacrifice';
  btn.onclick = openSacrificePanel;
  document.body.appendChild(btn);

  // Create overlay
  const overlay = document.createElement('div');
  overlay.className = 'sacrifice-overlay';
  overlay.id = 'sacrificeOverlay';
  overlay.onclick = (e) => {
    if (e.target === overlay) closeSacrificePanel();
  };
  overlay.innerHTML = `
    <div class="sacrifice-panel" onclick="event.stopPropagation()">
      <div class="sac-header">
        <div class="sac-title">🔥 Sacrifice Altar</div>
        <button class="sac-close" onclick="closeSacrificePanel()">Close ✕</button>
      </div>
      <div class="sac-info">
        <div>Select names from your collection to sacrifice to the eternal flame.</div>
        <div style="margin-top:8px;color:#888">Better names = Better rewards. Embrace the chaos!</div>
        <div class="sac-stats">
          <div class="sac-stat-item">📊 Selected: <span class="sac-stat-value" id="sacSelectedCount">0</span></div>
          <div class="sac-stat-item">⚡ Power: <span class="sac-stat-value" id="sacPowerValue">0</span></div>
        </div>
      </div>
      <div class="sac-list" id="sacList"></div>
      <div class="sac-footer">
        <div class="sac-power-bar">
          <span class="sac-power-label">Sacrifice Power</span>
          <div class="sac-power-meter">
            <div class="sac-power-fill" id="sacPowerMeter"></div>
            <div class="sac-power-text" id="sacPowerText">0%</div>
          </div>
        </div>
        <div class="sac-actions">
          <button class="sac-btn sac-btn-clear" onclick="clearSacrificeSelection()">Clear</button>
          <button class="sac-btn sac-btn-sacrifice" id="sacrificeBtn" onclick="startSacrificeCutscene()" disabled>Sacrifice</button>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  // Create cutscene
  const cutscene = document.createElement('div');
  cutscene.id = 'sacrificeCutscene';
  cutscene.innerHTML = `
    <div class="sac-fire-container">
      <div class="sac-fire-bg" id="sacFireBg"></div>
      <div id="sacNameBurnContainer"></div>
    </div>
    <div class="sac-reward-title" id="sacRewardTitle"></div>
    <div class="sac-reward-text" id="sacRewardText"></div>
    <button class="sac-skip" onclick="skipSacrificeCutscene()">Skip ›</button>
  `;
  document.body.appendChild(cutscene);
};

// ─── PANEL MANAGEMENT ──────────────────────────────────────
window.openSacrificePanel = function() {
  sacrificeOverlayActive = true;
  window.sacrificeSelected.clear();
  renderSacrificeList();
  document.getElementById('sacrificeOverlay').classList.add('open');
  updateSacrificeUI();
};

window.closeSacrificePanel = function() {
  sacrificeOverlayActive = false;
  document.getElementById('sacrificeOverlay').classList.remove('open');
};

// ─── RENDER NAME LIST ──────────────────────────────────────
function renderSacrificeList() {
  const list = document.getElementById('sacList');
  list.innerHTML = '';

  // Get all collected names
  const allNames = [];
  Object.entries(NAMES).forEach(([rarity, names]) => {
    names.forEach(name => {
      if (window.collected[name]) {
        allNames.push({ name, rarity });
      }
    });
  });

  if (allNames.length === 0) {
    list.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666; font-size: 11px; letter-spacing: .1em;">No names collected. Roll to collect names for sacrifice!</div>';
    return;
  }

  // Sort by rarity value (divine > mythic > legendary > rare > uncommon > common)
  const rarityOrder = { divine: 7, mythic: 6, legendary: 5, rare: 4, uncommon: 3, common: 2, cursed: 6 };
  allNames.sort((a, b) => (rarityOrder[b.rarity] || 0) - (rarityOrder[a.rarity] || 0));

  allNames.forEach(item => {
    const btn = document.createElement('button');
    btn.className = `sac-name-item rarity-${item.rarity}`;
    btn.textContent = item.name;
    btn.onclick = () => toggleSacrificeSelection(item.name, item.rarity);

    if (window.sacrificeSelected.has(item.name)) {
      btn.classList.add('selected');
    }

    list.appendChild(btn);
  });
}

// ─── SELECTION MANAGEMENT ────────────────────────────────────
window.toggleSacrificeSelection = function(name, rarity) {
  if (window.sacrificeSelected.has(name)) {
    window.sacrificeSelected.delete(name);
  } else {
    window.sacrificeSelected.add(name);
  }
  renderSacrificeList();
  updateSacrificeUI();
};

window.clearSacrificeSelection = function() {
  window.sacrificeSelected.clear();
  renderSacrificeList();
  updateSacrificeUI();
};

// ─── UPDATE UI ────────────────────────────────────────────
function updateSacrificeUI() {
  const count = window.sacrificeSelected.size;
  document.getElementById('sacSelectedCount').textContent = count;

  // Calculate power
  let totalPower = 0;
  window.sacrificeSelected.forEach(name => {
    const rarity = window.collected[name];
    if (rarity && SACRIFICE_CONFIG[rarity]) {
      totalPower += SACRIFICE_CONFIG[rarity].weight;
    }
  });

  const maxPower = 100;
  const powerPercent = Math.min(100, (totalPower / maxPower) * 100);
  document.getElementById('sacPowerValue').textContent = totalPower;
  document.getElementById('sacPowerText').textContent = Math.round(powerPercent) + '%';

  const meter = document.getElementById('sacPowerMeter');
  meter.style.width = powerPercent + '%';

  // Warn if too much power
  if (totalPower > 50) {
    meter.classList.add('dangerous');
  } else {
    meter.classList.remove('dangerous');
  }

  // Enable/disable button
  const sacrificeBtn = document.getElementById('sacrificeBtn');
  sacrificeBtn.disabled = count === 0;
}

// ─── SACRIFICE CUTSCENE ────────────────────────────────────
window.startSacrificeCutscene = function() {
  if (window.sacrificeSelected.size === 0) return;

  sacrificeCutsceneActive = true;
  closeSacrificePanel();

  const cutscene = document.getElementById('sacrificeCutscene');
  cutscene.classList.add('active');

  const names = Array.from(window.sacrificeSelected);
  const container = document.getElementById('sacNameBurnContainer');
  const fireBg = document.getElementById('sacFireBg');
  const rewardTitle = document.getElementById('sacRewardTitle');
  const rewardText = document.getElementById('sacRewardText');

  container.innerHTML = '';
  rewardTitle.classList.remove('show');
  rewardText.classList.remove('show');
  fireBg.classList.remove('show');

  // Create name burn elements
  names.forEach((name, i) => {
    const el = document.createElement('div');
    el.className = 'sac-name-burn';

    const rarity = window.collected[name];
    const rarityColors = {
      common: '#999999',
      uncommon: '#5aaa5a',
      rare: '#4a7aaa',
      legendary: '#e8960a',
      mythic: '#dd44ff',
      cursed: '#dd0000',
      divine: '#ffd700'
    };

    const color = rarityColors[rarity] || '#999';
    const size = 14 + Math.random() * 22;
    const tx = 100 + Math.random() * (window.innerWidth - 200);
    const ty = 150 + Math.random() * (window.innerHeight * 0.5);
    const rotation = (Math.random() - 0.5) * 60;

    el.style.cssText = `
      font-size:${size}px;color:${color};
      left:${tx}px;top:${ty}px;
      --brot:${rotation}deg;
      --bdur:${0.8 + Math.random() * 0.7}s;
      --bdelay:${i * 60}ms;
    `;
    el.textContent = name;
    container.appendChild(el);
  });

  // Phase 1: Ignite
  const igniteStart = 200;
  setTimeout(() => {
    fireBg.classList.add('show');
    container.querySelectorAll('.sac-name-burn').forEach((el, i) => {
      setTimeout(() => el.classList.add('burning'), i * 60);

      // Embers from each name
      for (let a = 0; a < 5; a++) {
        const ember = document.createElement('div');
        ember.className = 'sac-ember-particle';
        const sz = 3 + Math.random() * 8;
        const rect = el.getBoundingClientRect();
        const ax = (Math.random() - 0.5) * 180;
        const ay = -(100 + Math.random() * 200);

        ember.style.cssText = `
          width:${sz}px;height:${sz}px;
          left:${rect.left + Math.random() * rect.width}px;
          top:${rect.top}px;
          --adur:${2 + Math.random() * 2.5}s;
          --adelay:${i * 60 + a * 120}ms;
          --ax:${ax}px;--ay:${ay}px;
        `;
        document.getElementById('sacrificeCutscene').appendChild(ember);
        setTimeout(() => ember.remove(), 4500 + i * 60 + a * 120);
      }
    });
  }, igniteStart);

  // Calculate reward
  let totalWeight = 0;
  let bestRarity = 'common';
  const rarityHierarchy = { divine: 7, mythic: 6, legendary: 5, rare: 4, uncommon: 3, common: 2, cursed: 6 };

  names.forEach(name => {
    const rarity = window.collected[name];
    if (rarity && SACRIFICE_CONFIG[rarity]) {
      totalWeight += SACRIFICE_CONFIG[rarity].weight;
      if ((rarityHierarchy[rarity] || 0) > (rarityHierarchy[bestRarity] || 0)) {
        bestRarity = rarity;
      }
    }
  });

  // Phase 2: Reward reveal
  const rewardStart = igniteStart + names.length * 60 + 800;
  setTimeout(() => {
    const reward = calculateReward(totalWeight, bestRarity);
    rewardTitle.textContent = reward.title;
    rewardText.textContent = reward.text;
    rewardTitle.classList.add('show');
    setTimeout(() => rewardText.classList.add('show'), 600);
  }, rewardStart);

  // Phase 3: Close and apply reward
  const finalStart = rewardStart + 2800;
  setTimeout(() => {
    applyReward(totalWeight, bestRarity, names.length);
    cutscene.classList.remove('active');
    sacrificeCutsceneActive = false;
    window.sacrificeSelected.clear();
    toast(`🔥 Sacrifice complete!`, 'sacrifice-toast');
  }, finalStart);
};

window.skipSacrificeCutscene = function() {
  if (!sacrificeCutsceneActive) return;
  const cutscene = document.getElementById('sacrificeCutscene');

  const names = Array.from(window.sacrificeSelected);
  let totalWeight = 0;
  let bestRarity = 'common';
  const rarityHierarchy = { divine: 7, mythic: 6, legendary: 5, rare: 4, uncommon: 3, common: 2, cursed: 6 };

  names.forEach(name => {
    const rarity = window.collected[name];
    if (rarity && SACRIFICE_CONFIG[rarity]) {
      totalWeight += SACRIFICE_CONFIG[rarity].weight;
      if ((rarityHierarchy[rarity] || 0) > (rarityHierarchy[bestRarity] || 0)) {
        bestRarity = rarity;
      }
    }
  });

  applyReward(totalWeight, bestRarity, names.length);
  cutscene.classList.remove('active');
  sacrificeCutsceneActive = false;
  window.sacrificeSelected.clear();
};

// ─── REWARD SYSTEM ────────────────────────────────────────
function calculateReward(weight, bestRarity) {
  const rewards = [
    { title: 'Blessed Offering', text: 'The fires accept your sacrifice...' },
    { title: 'Honored Gift', text: 'The spirits are pleased.' },
    { title: 'Sacred Ritual', text: 'Ancient power awakens.' },
    { title: 'Mystical Convergence', text: 'Reality bends to your will!' },
    { title: 'Ethereal Communion', text: 'The veil grows thin...' },
    { title: 'Divine Manifestation', text: 'Godly presence descends!' },
  ];

  const idx = Math.floor(Math.random() * rewards.length);
  return rewards[idx];
}

function applyReward(totalWeight, bestRarity, nameCount) {
  // Base reward: skill points
  const config = SACRIFICE_CONFIG[bestRarity] || SACRIFICE_CONFIG.common;
  let points = Math.ceil(nameCount * config.rewardMult);

  // Bonus chance for extra rewards based on rarity
  const luckyRoll = Math.random() * 100;
  let bonusMsg = '';

  if (luckyRoll < config.rareChance) {
    points = Math.ceil(points * 1.5);
    bonusMsg = ' ✦ BLESSED BY FORTUNE!';
  }

  window.totalSkillPoints += points;
  if (typeof scheduleSave === 'function') scheduleSave();

  toast(`🔥 Sacrifice earned +${points} skill points!${bonusMsg}`, 'sacrifice-reward-toast');
}

// ─── HOOK INTO EXISTING INIT ──────────────────────────────
// Call this after main page loads
setTimeout(() => {
  if (typeof window.initSacrificeAltar === 'function') {
    window.initSacrificeAltar();
  }
}, 100);
