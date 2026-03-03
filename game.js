// ═══════════════════════════════════════════════════════════
//  ARDY RNG — game.js
//  Serious minimal edition with enhanced features
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  /* ── STATE ──────────────────────────────────────────── */
  const SAVE_KEY = 'ardy_rng_v1';
  let state = {
    rolls: 0,
    level: 1,
    xp: 0,
    xpNext: 100,
    streak: 0,
    bestStreak: 0,
    pity: 0,
    collection: {},
    history: [],
    lastRoll: null,
    tierCounts: {},
    longestDry: 0,
    currentDry: 0,
    totalXP: 0,
    firstSeen: {},
  };

  function save() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(state)); } catch(e){}
  }
  function load() {
    try {
      const d = localStorage.getItem(SAVE_KEY);
      if (d) Object.assign(state, JSON.parse(d));
    } catch(e){}
  }

  /* ── DOM REFS ───────────────────────────────────────── */
  const D = id => document.getElementById(id);
  const rollBtn        = D('roll-btn');
  const autoRollBtn    = D('auto-roll-btn');
  const cardEl         = D('rarity-card');
  const cardIcon       = D('card-icon');
  const cardTier       = D('card-tier');
  const cardName       = D('card-name');
  const cardDesc       = D('card-desc');
  const cardIdEl       = D('card-id');
  const cardBadges     = D('card-badges');
  const xpBar          = D('xp-bar');
  const xpLabelL       = D('xp-label-l');
  const xpLabelR       = D('xp-label-r');
  const pityBar        = D('pity-bar');
  const pityVal        = D('pity-val');
  const rollCounter    = D('roll-counter');
  const historyStrip   = D('history-strip');
  const cutscene       = D('cutscene');
  const csInner        = D('cutscene-inner');
  const csIcon         = D('cs-icon');
  const csTier         = D('cs-tier-label');
  const csName         = D('cs-name');
  const csDesc         = D('cs-desc');
  const csBeams        = D('cs-beams');
  const levelupBanner  = D('levelup-banner');
  const streakInd      = D('streak-indicator');
  const multiplierBadge= D('multiplier-badge');
  const toast          = D('toast');
  const collBtn        = D('collection-btn');
  const collCount      = D('coll-count');
  const collDrawer     = D('collection-drawer');
  const drawerClose    = D('drawer-close');
  const drawerFilters  = D('drawer-filters');
  const collGrid       = D('coll-grid');
  const collStats      = D('coll-stats');
  const statsBtn       = D('stats-btn');
  const statsDrawer    = D('stats-drawer');
  const statsClose     = D('stats-close');
  const statsContent   = D('stats-content');
  const pCanvas        = D('particle-canvas');
  const pCtx           = pCanvas.getContext('2d');

  let isRolling     = false;
  let cutsceneOpen  = false;
  let activeFilter  = 'ALL';
  let streakTimer   = null;
  let toastTimer    = null;
  let autoInterval  = null;
  let isAuto        = false;

  /* ── STARFIELD ──────────────────────────────────────── */
  function buildStarfield() {
    const sf = D('starfield');
    for (let i = 0; i < 80; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 1.5 + 0.5;
      const dur = (Math.random() * 5 + 3).toFixed(1) + 's';
      const min = (Math.random() * 0.05).toFixed(2);
      const max = (Math.random() * 0.2 + 0.05).toFixed(2);
      s.style.cssText = `
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        width:${sz}px;height:${sz}px;
        --dur:${dur};--min:${min};--max:${max};
        animation-delay:${(Math.random()*5).toFixed(1)}s;
      `;
      sf.appendChild(s);
    }
  }

  /* ── CANVAS PARTICLE SYSTEM ─────────────────────────── */
  const particles = [];

  function resizeCanvas() {
    pCanvas.width  = window.innerWidth;
    pCanvas.height = window.innerHeight;
  }

  class Particle {
    constructor(x, y, cfg) {
      this.x = x; this.y = y;
      const angle = Math.random() * Math.PI * 2;
      const spd   = (Math.random() * cfg.speed + cfg.speed * 0.3);
      this.vx = Math.cos(angle) * spd;
      this.vy = Math.sin(angle) * spd;
      this.color = cfg.colors[Math.floor(Math.random() * cfg.colors.length)];
      this.shape = cfg.shape;
      this.life  = 1;
      this.decay = Math.random() * 0.025 + 0.015;
      this.size  = Math.random() * 8 + 3;
      this.rot   = Math.random() * Math.PI * 2;
      this.rotV  = (Math.random() - 0.5) * 0.3;
      this.gravity = cfg.gravity || 0.18;
    }
    update() {
      this.x  += this.vx;
      this.y  += this.vy;
      this.vy += this.gravity;
      this.vx *= 0.98;
      this.rot += this.rotV;
      this.life -= this.decay;
      this.size *= 0.98;
    }
    draw(ctx) {
      if (this.life <= 0) return;
      ctx.save();
      ctx.globalAlpha = this.life;
      ctx.fillStyle   = this.color;
      ctx.strokeStyle = this.color;
      ctx.translate(this.x, this.y);
      ctx.rotate(this.rot);
      switch (this.shape) {
        case 'star':
          drawStar(ctx, 0, 0, 5, this.size, this.size * 0.45);
          ctx.fill();
          break;
        case 'ring':
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.lineWidth = 2;
          ctx.stroke();
          break;
        case 'shard':
          ctx.beginPath();
          ctx.moveTo(0, -this.size);
          ctx.lineTo(this.size * 0.4, this.size);
          ctx.lineTo(-this.size * 0.4, this.size);
          ctx.closePath();
          ctx.fill();
          break;
        case 'comet':
          const grad = ctx.createLinearGradient(0, -this.size * 2, 0, 0);
          grad.addColorStop(0, 'transparent');
          grad.addColorStop(1, this.color);
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.3, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'feather':
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.25, this.size, 0, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'void':
          const vg = ctx.createRadialGradient(0,0,0,0,0,this.size);
          vg.addColorStop(0, this.color);
          vg.addColorStop(0.5, '#ff00ff');
          vg.addColorStop(1, 'transparent');
          ctx.fillStyle = vg;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        case 'nebula':
          const ng = ctx.createRadialGradient(0,0,0,0,0,this.size);
          ng.addColorStop(0, this.color);
          ng.addColorStop(1, 'transparent');
          ctx.fillStyle = ng;
          ctx.beginPath();
          ctx.arc(0, 0, this.size, 0, Math.PI * 2);
          ctx.fill();
          break;
        default:
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
      }
      ctx.restore();
    }
  }

  function drawStar(ctx, cx, cy, spikes, outerR, innerR) {
    let rot = (Math.PI / 2) * 3;
    const step = Math.PI / spikes;
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerR);
    for (let i = 0; i < spikes; i++) {
      ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
      rot += step;
      ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
      rot += step;
    }
    ctx.lineTo(cx, cy - outerR);
    ctx.closePath();
  }

  function spawnParticles(fxKey, x, y, count) {
    const cfg = window.FX[fxKey] || window.FX.sparkle;
    const actualCount = count || cfg.particles;
    for (let i = 0; i < actualCount; i++) {
      particles.push(new Particle(x, y, cfg));
    }
  }

  function animateParticles() {
    pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(pCtx);
      if (particles[i].life <= 0) particles.splice(i, 1);
    }
    requestAnimationFrame(animateParticles);
  }

  /* ── SCREEN SHAKE ───────────────────────────────────── */
  function doShake(amount) {
    if (!amount) return;
    const body = document.body;
    const classes = {3:'shake-small',6:'shake-medium',12:'shake-large',20:'shake-massive',35:'shake-apocalyptic'};
    const cls = classes[amount] || 'shake-small';
    body.classList.remove('shake-small','shake-medium','shake-large','shake-massive','shake-apocalyptic');
    void body.offsetWidth;
    body.classList.add(cls);
    setTimeout(() => body.classList.remove(cls), 900);
  }

  /* ── CARD DISPLAY ───────────────────────────────────── */
  function getIconAnim(tier) {
    const anims = {
      COMMON:'',
      UNCOMMON:'icon-anim-bounce',
      RARE:'icon-anim-bounce',
      EPIC:'icon-anim-float',
      LEGENDARY:'icon-anim-spin',
      MYTHIC:'icon-anim-pulse',
      DIVINE:'icon-anim-pulse',
      COSMIC:'icon-anim-spin',
      TRANSCENDENT:'icon-anim-pulse',
      VOID:'icon-anim-shake',
    };
    return anims[tier] || '';
  }

  function displayRarity(r, animate = true) {
    const td = window.TIERS[r.tier];
    cardIcon.className = '';

    cardIcon.textContent = r.icon;
    cardTier.textContent = td.name.toUpperCase();
    cardTier.style.color  = td.color;
    cardName.textContent  = r.name;
    cardName.style.color  = td.color;
    cardDesc.textContent  = r.desc;
    cardIdEl.textContent  = `#${String(r.id).padStart(3,'0')}`;

    // Badges
    cardBadges.innerHTML = '';
    const count = state.collection[String(r.id)] || 0;
    if (count > 1) {
      const b = document.createElement('span');
      b.className = 'card-badge';
      b.textContent = `×${count}`;
      cardBadges.appendChild(b);
    }
    if (state.firstSeen && state.firstSeen[String(r.id)] === state.rolls) {
      const nb = document.createElement('span');
      nb.className = 'card-badge';
      nb.style.color = '#c9a84c';
      nb.style.borderColor = '#c9a84c33';
      nb.textContent = 'NEW';
      cardBadges.appendChild(nb);
    }

    // Card glow - keep it subtle for grey theme but let colors show on high tiers
    const tierIdx = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'].indexOf(r.tier);
    const glowIntensity = tierIdx >= 4 ? 1 : 0.5;
    cardEl.style.boxShadow    = tierIdx >= 3 ? `0 0 40px ${td.glow}, 0 0 12px ${td.glow}` : 'none';
    cardEl.style.borderColor  = tierIdx >= 2 ? td.color + '44' : 'var(--border)';

    const iconAnim = getIconAnim(r.tier);
    if (iconAnim) cardIcon.classList.add(iconAnim);

    if (animate) {
      cardEl.classList.remove('reveal');
      void cardEl.offsetWidth;
      cardEl.classList.add('reveal');
    }

    if (r.special === 'void_ending') {
      cardEl.classList.add('void-active');
    } else {
      cardEl.classList.remove('void-active');
    }
  }

  /* ── CUTSCENE ───────────────────────────────────────── */
  function showCutscene(r) {
    const td = window.TIERS[r.tier];
    cutsceneOpen = true;

    csBeams.innerHTML = '';
    const beamCount = 16;
    for (let i = 0; i < beamCount; i++) {
      const beam = document.createElement('div');
      beam.className = 'cs-beam';
      const angle = (i / beamCount) * 360;
      const len   = 300 + Math.random() * 400;
      beam.style.cssText = `
        transform:rotate(${angle}deg) translateX(-50%);
        height:${len}px;
        background:linear-gradient(to right, transparent, ${td.color}66, transparent);
        width:${Math.random()*2+1}px;
        animation-duration:${2+Math.random()*2}s;
        animation-delay:${Math.random()*0.4}s;
      `;
      csBeams.appendChild(beam);
    }

    csIcon.textContent     = r.icon;
    csIcon.style.color     = td.color;
    csTier.textContent     = td.name.toUpperCase();
    csTier.style.color     = td.color;
    csName.textContent     = r.name;
    csName.style.color     = td.color;
    csDesc.textContent     = r.desc;

    cutscene.classList.add('active');

    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setTimeout(() => {
      spawnParticles(r.fx, cx, cy, 200);
      doShake(window.SHAKE.apocalyptic);
    }, 350);
  }

  function closeCutscene() {
    if (!cutsceneOpen) return;
    cutsceneOpen = false;
    cutscene.classList.remove('active');
    rollBtn.disabled = false;
  }

  cutscene.addEventListener('click', closeCutscene);

  /* ── HISTORY ────────────────────────────────────────── */
  function addHistory(r) {
    state.history.unshift(r.id);
    if (state.history.length > 30) state.history.pop();
    renderHistory();
  }

  function renderHistory() {
    historyStrip.innerHTML = '';
    for (const id of state.history) {
      const r  = window.RARITIES.find(x => x.id === id);
      if (!r) continue;
      const td = window.TIERS[r.tier];
      const chip = document.createElement('div');
      chip.className = 'hist-chip';
      chip.title = r.name;
      chip.innerHTML = `${r.icon}<span class="tier-dot" style="background:${td.color}"></span>`;
      chip.addEventListener('click', () => {
        displayRarity(r, true);
        const cx = chip.getBoundingClientRect().left + 19;
        const cy = chip.getBoundingClientRect().top  + 19;
        spawnParticles(r.fx, cx, cy, 20);
      });
      historyStrip.appendChild(chip);
    }
  }

  /* ── PROGRESSION ────────────────────────────────────── */
  const TIER_XP = {
    COMMON:1, UNCOMMON:3, RARE:8, EPIC:20,
    LEGENDARY:60, MYTHIC:120, DIVINE:200, COSMIC:350,
    TRANSCENDENT:500, VOID:1000,
  };

  function gainXP(r) {
    const base   = TIER_XP[r.tier] || 1;
    const mult   = getMultiplier();
    const gained = Math.ceil(base * mult);
    state.xp += gained;
    state.totalXP = (state.totalXP || 0) + gained;

    let leveled = false;
    while (state.xp >= state.xpNext) {
      state.xp     -= state.xpNext;
      state.level  += 1;
      state.xpNext  = Math.floor(100 * Math.pow(1.18, state.level - 1));
      leveled = true;
    }
    if (leveled) showLevelUp();
    updateXPBar();
    return gained;
  }

  function getMultiplier() {
    if (state.streak >= 50) return 5;
    if (state.streak >= 25) return 3;
    if (state.streak >= 10) return 2;
    return 1;
  }

  function updateXPBar() {
    const pct = Math.min((state.xp / state.xpNext) * 100, 100);
    xpBar.style.width  = pct + '%';
    xpLabelL.textContent = `LV ${state.level}`;
    xpLabelR.textContent = `${state.xp} / ${state.xpNext} XP`;
  }

  function showLevelUp() {
    levelupBanner.textContent = `LEVEL ${state.level}`;
    levelupBanner.classList.add('show');
    setTimeout(() => levelupBanner.classList.remove('show'), 2500);
    const cx = window.innerWidth / 2;
    const cy = 80;
    spawnParticles('sparkle', cx, cy, 30);
  }

  /* ── STREAK ─────────────────────────────────────────── */
  const STREAK_TIERS = ['RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];

  function updateStreak(r) {
    if (STREAK_TIERS.includes(r.tier)) {
      state.streak++;
      state.currentDry = 0;
    } else {
      state.streak = 0;
      state.currentDry = (state.currentDry || 0) + 1;
      if (state.currentDry > (state.longestDry || 0)) state.longestDry = state.currentDry;
    }
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    renderStreak();
  }

  function renderStreak() {
    if (state.streak >= 3) {
      streakInd.textContent = `${state.streak} STREAK`;
      streakInd.classList.add('show');
      clearTimeout(streakTimer);
      streakTimer = setTimeout(() => streakInd.classList.remove('show'), 3000);
    } else {
      streakInd.classList.remove('show');
    }

    const mult = getMultiplier();
    if (mult > 1) {
      multiplierBadge.textContent = `${mult}× XP`;
      multiplierBadge.classList.add('show');
    } else {
      multiplierBadge.classList.remove('show');
    }
  }

  /* ── PITY SYSTEM ────────────────────────────────────── */
  const PITY_MAX = 90;

  function updatePity(r) {
    if (STREAK_TIERS.includes(r.tier)) {
      state.pity = 0;
    } else {
      state.pity++;
    }
    const pct = Math.min((state.pity / PITY_MAX) * 100, 100);
    pityBar.style.width = pct + '%';
    pityVal.textContent = `${state.pity}/${PITY_MAX}`;
    // Turn gold as pity fills
    const heat = state.pity / PITY_MAX;
    if (heat > 0.5) {
      pityBar.style.background = `rgba(201,168,76,${0.4 + heat * 0.6})`;
    } else {
      pityBar.style.background = '#3a3020';
    }
  }

  /* ── COLLECTION ─────────────────────────────────────── */
  function updateCollection(r) {
    const id = String(r.id);
    const wasNew = !state.collection[id];
    state.collection[id] = (state.collection[id] || 0) + 1;
    if (wasNew) state.firstSeen[id] = state.rolls;

    // Track tier counts
    state.tierCounts = state.tierCounts || {};
    state.tierCounts[r.tier] = (state.tierCounts[r.tier] || 0) + 1;

    const total = Object.keys(state.collection).length;
    collCount.textContent = total;
    D('stat-collected').textContent = total;
    return wasNew;
  }

  function renderCollection() {
    collGrid.innerHTML = '';
    const items = activeFilter === 'ALL'
      ? window.RARITIES
      : window.RARITIES.filter(r => r.tier === activeFilter);

    const discovered = items.filter(r => state.collection[String(r.id)]);
    const undiscovered = items.filter(r => !state.collection[String(r.id)]);

    collStats.textContent = `${discovered.length} / ${items.length} DISCOVERED`;

    const allItems = [...discovered, ...undiscovered];

    for (const r of allItems) {
      const td    = window.TIERS[r.tier];
      const count = state.collection[String(r.id)] || 0;
      const div   = document.createElement('div');
      div.className = 'coll-item' + (count === 0 ? ' locked' : '');
      if (count > 0) div.style.borderColor = td.color + '33';
      div.innerHTML = `
        <span class="ci-icon">${r.icon}</span>
        <span class="ci-name">${r.name}</span>
        ${count > 0 ? `<span class="ci-count">${count > 99 ? '99+' : count}</span>` : ''}
      `;
      if (count > 0) {
        div.title = `${r.name} — ${r.desc}`;
        div.addEventListener('click', () => {
          displayRarity(r, true);
          collDrawer.classList.remove('open');
          const rect = div.getBoundingClientRect();
          spawnParticles(r.fx, rect.left + 38, rect.top + 38, 30);
        });
      }
      collGrid.appendChild(div);
    }
  }

  function buildFilters() {
    const tiers = ['ALL','COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];
    drawerFilters.innerHTML = '';
    for (const t of tiers) {
      const btn = document.createElement('button');
      btn.className = 'filter-btn' + (t === activeFilter ? ' active' : '');
      btn.textContent = t;
      if (t !== 'ALL' && window.TIERS[t] && t === activeFilter) {
        btn.style.borderColor = window.TIERS[t].color + '66';
        btn.style.color = window.TIERS[t].color;
      }
      btn.addEventListener('click', () => {
        activeFilter = t;
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.style.color = '';
          b.style.borderColor = '';
        });
        btn.classList.add('active');
        if (t !== 'ALL' && window.TIERS[t]) {
          btn.style.borderColor = window.TIERS[t].color + '66';
          btn.style.color = window.TIERS[t].color;
        }
        renderCollection();
      });
      drawerFilters.appendChild(btn);
    }
  }

  collBtn.addEventListener('click', () => {
    collDrawer.classList.add('open');
    buildFilters();
    renderCollection();
  });
  drawerClose.addEventListener('click', () => collDrawer.classList.remove('open'));

  /* ── STATS DRAWER ───────────────────────────────────── */
  statsBtn.addEventListener('click', () => {
    statsDrawer.classList.add('open');
    renderStatsDrawer();
  });
  statsClose.addEventListener('click', () => statsDrawer.classList.remove('open'));

  function renderStatsDrawer() {
    const total = Object.keys(state.collection).length;
    const TOTAL_RARITIES = 700;
    const tierOrder = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];

    statsContent.innerHTML = '';

    // Overview section
    const overview = document.createElement('div');
    overview.className = 'stats-section';
    overview.innerHTML = `
      <div class="stats-section-title">OVERVIEW</div>
      <div class="stats-row"><span class="stats-row-label">Total Rolls</span><span class="stats-row-value">${state.rolls.toLocaleString()}</span></div>
      <div class="stats-row"><span class="stats-row-label">Level</span><span class="stats-row-value">${state.level}</span></div>
      <div class="stats-row"><span class="stats-row-label">Total XP Earned</span><span class="stats-row-value">${(state.totalXP||0).toLocaleString()}</span></div>
      <div class="stats-row"><span class="stats-row-label">Collection</span><span class="stats-row-value">${total} / ${TOTAL_RARITIES}</span></div>
      <div class="stats-row"><span class="stats-row-label">Completion</span><span class="stats-row-value">${((total/TOTAL_RARITIES)*100).toFixed(1)}%</span></div>
    `;
    statsContent.appendChild(overview);

    // Streak section
    const streakSec = document.createElement('div');
    streakSec.className = 'stats-section';
    streakSec.innerHTML = `
      <div class="stats-section-title">STREAKS & LUCK</div>
      <div class="stats-row"><span class="stats-row-label">Best Streak</span><span class="stats-row-value">${state.bestStreak}</span></div>
      <div class="stats-row"><span class="stats-row-label">Current Streak</span><span class="stats-row-value">${state.streak}</span></div>
      <div class="stats-row"><span class="stats-row-label">Longest Dry Spell</span><span class="stats-row-value">${state.longestDry || 0}</span></div>
      <div class="stats-row"><span class="stats-row-label">Pity Counter</span><span class="stats-row-value">${state.pity} / 90</span></div>
      <div class="stats-row"><span class="stats-row-label">XP Multiplier</span><span class="stats-row-value">${getMultiplier()}×</span></div>
    `;
    statsContent.appendChild(streakSec);

    // Tier distribution
    const tierSec = document.createElement('div');
    tierSec.className = 'stats-section';
    const tierHtml = tierOrder.map(tier => {
      const count = state.tierCounts?.[tier] || 0;
      const pct = state.rolls > 0 ? (count / state.rolls) * 100 : 0;
      const td = window.TIERS[tier];
      return `
        <div class="tier-bar-row">
          <span class="tier-bar-label">${tier}</span>
          <div class="tier-bar-outer">
            <div class="tier-bar-inner" style="width:${Math.min(pct * 5, 100)}%;background:${td.color}"></div>
          </div>
          <span class="tier-bar-count">${count}</span>
        </div>
      `;
    }).join('');
    tierSec.innerHTML = `
      <div class="stats-section-title">TIER BREAKDOWN</div>
      <div class="tier-distribution">${tierHtml}</div>
    `;
    statsContent.appendChild(tierSec);

    // Rarity finds
    const rareFinds = tierOrder.slice(4).map(tier => {
      const finds = window.RARITIES
        .filter(r => r.tier === tier && state.collection[String(r.id)])
        .length;
      const total = window.RARITIES.filter(r => r.tier === tier).length;
      return `<div class="stats-row"><span class="stats-row-label">${tier}</span><span class="stats-row-value">${finds} / ${total}</span></div>`;
    }).join('');
    if (rareFinds) {
      const rareSec = document.createElement('div');
      rareSec.className = 'stats-section';
      rareSec.innerHTML = `<div class="stats-section-title">RARE FINDS</div>${rareFinds}`;
      statsContent.appendChild(rareSec);
    }
  }

  /* ── TOAST ──────────────────────────────────────────── */
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ── AUTO ROLL ───────────────────────────────────────── */
  autoRollBtn.addEventListener('click', () => {
    if (isAuto) {
      // Stop
      clearInterval(autoInterval);
      autoInterval = null;
      isAuto = false;
      autoRollBtn.classList.remove('active');
      autoRollBtn.textContent = 'AUTO';
    } else {
      // Start
      isAuto = true;
      autoRollBtn.classList.add('active');
      autoRollBtn.textContent = 'STOP';
      autoInterval = setInterval(() => {
        if (!isRolling && !cutsceneOpen) doRoll();
      }, 800);
    }
  });

  /* ── ROLL ANIMATION SEQUENCE ────────────────────────── */
  async function doRoll() {
    if (isRolling || cutsceneOpen) return;
    isRolling = true;
    rollBtn.disabled = true;

    let result;
    if (state.pity >= PITY_MAX) {
      const rarePool = window.RARITIES.filter(r =>
        ['RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'].includes(r.tier)
      );
      result = rarePool[Math.floor(Math.random() * rarePool.length)];
      showToast('PITY ACTIVATED');
    } else {
      result = window.rollRarity();
    }

    state.rolls++;
    state.lastRoll = result.id;
    rollCounter.querySelector('span').textContent = state.rolls.toLocaleString();
    D('stat-rolls').textContent = state.rolls.toLocaleString();

    // Ripple
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    rollBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);

    // Spin effect
    const spinDur = getSpinDuration(result.tier);
    await spinEffect(spinDur, result);

    // Reveal
    const wasNew = updateCollection(result);
    if (wasNew) {
      state.firstSeen = state.firstSeen || {};
      state.firstSeen[String(result.id)] = state.rolls;
    }
    displayRarity(result, true);
    updateStreak(result);
    updatePity(result);
    addHistory(result);
    gainXP(result);
    save();

    // Particles
    const cx = cardEl.getBoundingClientRect().left + cardEl.offsetWidth  / 2;
    const cy = cardEl.getBoundingClientRect().top  + cardEl.offsetHeight / 2;
    spawnParticles(result.fx, cx, cy);

    doShake(result.shake);

    if (wasNew) {
      showToast(`NEW: ${result.name}`);
    }

    if (result.cutscene) {
      if (isAuto) {
        // In auto mode skip cutscenes unless cosmic+
        const tierIdx = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'].indexOf(result.tier);
        if (tierIdx >= 7) {
          stopAuto();
          setTimeout(() => showCutscene(result), 300);
        } else {
          rollBtn.disabled = false;
        }
      } else {
        setTimeout(() => showCutscene(result), 300);
      }
    } else {
      rollBtn.disabled = false;
    }

    isRolling = false;
  }

  function stopAuto() {
    if (isAuto) {
      clearInterval(autoInterval);
      autoInterval = null;
      isAuto = false;
      autoRollBtn.classList.remove('active');
      autoRollBtn.textContent = 'AUTO';
    }
  }

  function getSpinDuration(tier) {
    const durs = {
      COMMON:0, UNCOMMON:150, RARE:300, EPIC:500,
      LEGENDARY:700, MYTHIC:900, DIVINE:1100,
      COSMIC:1300, TRANSCENDENT:1600, VOID:2000,
    };
    return durs[tier] ?? 150;
  }

  async function spinEffect(duration, result) {
    if (duration === 0) return;

    const frames  = Math.max(3, Math.floor(duration / 80));
    const tierVal = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];
    const resultIdx = tierVal.indexOf(result.tier);

    for (let i = 0; i < frames - 1; i++) {
      const progress = i / frames;
      const maxTierIdx = Math.floor(progress * (resultIdx + 1));
      const candidates = window.RARITIES.filter(r => tierVal.indexOf(r.tier) <= maxTierIdx);
      const fake = candidates[Math.floor(Math.random() * candidates.length)];

      cardIcon.textContent = fake.icon;
      cardTier.textContent = window.TIERS[fake.tier].name.toUpperCase();
      cardName.textContent = fake.name;
      cardTier.style.color = window.TIERS[fake.tier].color;
      cardName.style.color = window.TIERS[fake.tier].color;
      cardEl.style.boxShadow = tierVal.indexOf(fake.tier) >= 3
        ? `0 0 20px ${window.TIERS[fake.tier].glow}` : 'none';

      await delay(duration / frames);
    }
  }

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  rollBtn.addEventListener('click', doRoll);
  document.addEventListener('keydown', e => {
    if ((e.code === 'Space' || e.code === 'Enter') && !collDrawer.classList.contains('open') && !statsDrawer.classList.contains('open')) doRoll();
    if (e.code === 'Escape') { closeCutscene(); collDrawer.classList.remove('open'); statsDrawer.classList.remove('open'); }
  });

  /* ── STATS RENDERING ────────────────────────────────── */
  function updateStats() {
    D('stat-rolls').textContent    = state.rolls.toLocaleString();
    D('stat-streak').textContent   = state.bestStreak;
    D('stat-collected').textContent= Object.keys(state.collection).length;
    rollCounter.querySelector('span').textContent = state.rolls.toLocaleString();
  }

  /* ── INIT ───────────────────────────────────────────── */
  function init() {
    load();
    buildStarfield();
    resizeCanvas();
    animateParticles();
    updateStats();
    updateXPBar();
    pityBar.style.width = Math.min((state.pity / 90) * 100, 100) + '%';
    pityVal.textContent = `${state.pity}/90`;

    if (state.lastRoll) {
      const r = window.RARITIES.find(x => x.id === state.lastRoll);
      if (r) displayRarity(r, false);
    }
    renderHistory();
    renderStreak();
    collCount.textContent = Object.keys(state.collection).length;

    window.addEventListener('resize', resizeCanvas);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
