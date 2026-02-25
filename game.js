// ═══════════════════════════════════════════════════════════
//  COSMIC ROLL — game.js
//  Core game logic, particles, progression, cutscenes
// ═══════════════════════════════════════════════════════════

(function () {
  'use strict';

  /* ── STATE ──────────────────────────────────────────── */
  const SAVE_KEY = 'cosmic_roll_v3';
  let state = {
    rolls: 0,
    level: 1,
    xp: 0,
    xpNext: 100,
    streak: 0,
    bestStreak: 0,
    pity: 0,          // rolls since last rare+
    collection: {},   // id -> count
    history: [],      // last 20 ids
    lastRoll: null,
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
  const rollBtn      = D('roll-btn');
  const cardEl       = D('rarity-card');
  const cardIcon     = D('card-icon');
  const cardTier     = D('card-tier');
  const cardName     = D('card-name');
  const cardDesc     = D('card-desc');
  const cardIdEl     = D('card-id');
  const xpBar        = D('xp-bar');
  const xpLabelL     = D('xp-label-l');
  const xpLabelR     = D('xp-label-r');
  const pityBar      = D('pity-bar');
  const pityVal      = D('pity-val');
  const rollCounter  = D('roll-counter');
  const historyStrip = D('history-strip');
  const cutscene     = D('cutscene');
  const csInner      = D('cutscene-inner');
  const csIcon       = D('cs-icon');
  const csTier       = D('cs-tier-label');
  const csName       = D('cs-name');
  const csDesc       = D('cs-desc');
  const csBeams      = D('cs-beams');
  const levelupBanner= D('levelup-banner');
  const streakInd    = D('streak-indicator');
  const multiplierBadge = D('multiplier-badge');
  const toast        = D('toast');
  const collBtn      = D('collection-btn');
  const collCount    = D('coll-count');
  const collDrawer   = D('collection-drawer');
  const drawerClose  = D('drawer-close');
  const drawerFilters= D('drawer-filters');
  const collGrid     = D('coll-grid');
  const pCanvas      = D('particle-canvas');
  const pCtx         = pCanvas.getContext('2d');

  let isRolling     = false;
  let cutsceneOpen  = false;
  let activeFilter  = 'ALL';
  let streakTimer   = null;
  let toastTimer    = null;

  /* ── STARFIELD ──────────────────────────────────────── */
  function buildStarfield() {
    const sf = D('starfield');
    for (let i = 0; i < 140; i++) {
      const s = document.createElement('div');
      s.className = 'star';
      const sz = Math.random() * 2 + 0.5;
      const dur = (Math.random() * 4 + 2).toFixed(1) + 's';
      const min = (Math.random() * 0.2).toFixed(2);
      const max = (Math.random() * 0.6 + 0.3).toFixed(2);
      s.style.cssText = `
        left:${Math.random()*100}%;top:${Math.random()*100}%;
        width:${sz}px;height:${sz}px;
        --dur:${dur};--min:${min};--max:${max};
        animation-delay:${(Math.random()*4).toFixed(1)}s;
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
        default: // circle/pulse
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
      EPIC:'icon-anim-pulse',
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
    // Remove old anim classes
    cardIcon.className = '';

    cardIcon.textContent = r.icon;
    cardTier.textContent = td.name;
    cardTier.style.color  = td.color;
    cardName.textContent  = r.name;
    cardName.style.color  = td.color;
    cardDesc.textContent  = r.desc;
    cardIdEl.textContent  = `#${String(r.id).padStart(3,'0')}`;

    // Card glow
    cardEl.style.boxShadow    = `0 0 60px ${td.glow}, 0 0 20px ${td.glow}`;
    cardEl.style.borderColor  = td.color + '66';

    // Icon animation
    const iconAnim = getIconAnim(r.tier);
    if (iconAnim) cardIcon.classList.add(iconAnim);

    // Card entrance
    if (animate) {
      cardEl.classList.remove('reveal');
      void cardEl.offsetWidth;
      cardEl.classList.add('reveal');
    }

    // Void special
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

    // Beams
    csBeams.innerHTML = '';
    const beamCount = 20;
    for (let i = 0; i < beamCount; i++) {
      const beam = document.createElement('div');
      beam.className = 'cs-beam';
      const angle = (i / beamCount) * 360;
      const len   = 400 + Math.random() * 300;
      beam.style.cssText = `
        transform:rotate(${angle}deg) translateX(-50%);
        height:${len}px;
        background:linear-gradient(to right, transparent, ${td.color}88, transparent);
        width:${Math.random()*3+1}px;
        animation-duration:${1.5+Math.random()*2}s;
        animation-delay:${Math.random()*0.5}s;
      `;
      csBeams.appendChild(beam);
    }

    csIcon.textContent     = r.icon;
    csIcon.style.color     = td.color;
    csTier.textContent     = td.name;
    csTier.style.color     = td.color;
    csName.textContent     = r.name;
    csName.style.color     = td.color;
    csDesc.textContent     = r.desc;

    cutscene.classList.add('active');

    // Heavy particles from center
    const cx = window.innerWidth / 2;
    const cy = window.innerHeight / 2;
    setTimeout(() => {
      spawnParticles(r.fx, cx, cy, 200);
      doShake(window.SHAKE.apocalyptic);
    }, 400);
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
    if (state.history.length > 20) state.history.pop();
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
        const cx = chip.getBoundingClientRect().left + 22;
        const cy = chip.getBoundingClientRect().top  + 22;
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
    levelupBanner.textContent = `✦ LEVEL ${state.level} ✦`;
    levelupBanner.classList.add('show');
    setTimeout(() => levelupBanner.classList.remove('show'), 2500);
  }

  /* ── STREAK ─────────────────────────────────────────── */
  const STREAK_TIERS = ['RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];

  function updateStreak(r) {
    if (STREAK_TIERS.includes(r.tier)) {
      state.streak++;
    } else {
      state.streak = 0;
    }
    if (state.streak > state.bestStreak) state.bestStreak = state.streak;
    renderStreak();
  }

  function renderStreak() {
    if (state.streak >= 3) {
      streakInd.textContent = `🔥 ${state.streak} STREAK`;
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
  // After 90 commons without anything rare, guaranteed rare
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
  }

  /* ── COLLECTION ─────────────────────────────────────── */
  function updateCollection(r) {
    const id = String(r.id);
    state.collection[id] = (state.collection[id] || 0) + 1;
    const total = Object.keys(state.collection).length;
    collCount.textContent = total;
  }

  function renderCollection() {
    collGrid.innerHTML = '';
    const filterOrder = ['ALL','COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];
    
    const items = activeFilter === 'ALL'
      ? window.RARITIES
      : window.RARITIES.filter(r => r.tier === activeFilter);

    for (const r of items) {
      const td    = window.TIERS[r.tier];
      const count = state.collection[String(r.id)] || 0;
      const div   = document.createElement('div');
      div.className = 'coll-item' + (count === 0 ? ' locked' : '');
      div.style.borderColor = count > 0 ? td.color + '44' : '';
      div.innerHTML = `
        <span class="ci-icon">${r.icon}</span>
        <span class="ci-name">${r.name}</span>
        ${count > 0 ? `<span class="ci-count">${count > 99 ? '99+' : count}</span>` : ''}
      `;
      if (count > 0) {
        div.addEventListener('click', () => {
          displayRarity(r, true);
          collDrawer.classList.remove('open');
          const rect = div.getBoundingClientRect();
          spawnParticles(r.fx, rect.left + 40, rect.top + 40, 30);
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
      if (t !== 'ALL' && window.TIERS[t]) {
        btn.style.borderColor = window.TIERS[t].color + '88';
        if (t === activeFilter) btn.style.background = window.TIERS[t].color;
      }
      btn.addEventListener('click', () => {
        activeFilter = t;
        document.querySelectorAll('.filter-btn').forEach(b => {
          b.classList.remove('active');
          b.style.background = '';
        });
        btn.classList.add('active');
        if (t !== 'ALL') btn.style.background = window.TIERS[t]?.color || '';
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

  /* ── TOAST ──────────────────────────────────────────── */
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
  }

  /* ── ROLL ANIMATION SEQUENCE ────────────────────────── */
  async function doRoll() {
    if (isRolling || cutsceneOpen) return;
    isRolling = true;
    rollBtn.disabled = true;

    // Check pity override
    let result;
    if (state.pity >= PITY_MAX) {
      // Force at least Rare
      const rarePool = window.RARITIES.filter(r =>
        ['RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'].includes(r.tier)
      );
      result = rarePool[Math.floor(Math.random() * rarePool.length)];
      showToast('✨ Pity activated!');
    } else {
      result = window.rollRarity();
    }

    state.rolls++;
    state.lastRoll = result.id;
    rollCounter.querySelector('span').textContent = state.rolls.toLocaleString();

    // Ripple effect on button
    const ripple = document.createElement('span');
    ripple.className = 'btn-ripple';
    const rect = rollBtn.getBoundingClientRect();
    ripple.style.width  = ripple.style.height = '100px';
    ripple.style.left   = '50%'; ripple.style.top = '50%';
    ripple.style.marginLeft = ripple.style.marginTop = '-50px';
    rollBtn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 700);

    // Spin/flash animation before reveal
    const spinDur = getSpinDuration(result.tier);
    await spinEffect(spinDur, result);

    // Reveal
    displayRarity(result, true);
    updateStreak(result);
    updatePity(result);
    updateCollection(result);
    addHistory(result);
    gainXP(result);
    save();

    // Particle burst
    const cx = cardEl.getBoundingClientRect().left + cardEl.offsetWidth  / 2;
    const cy = cardEl.getBoundingClientRect().top  + cardEl.offsetHeight / 2;
    spawnParticles(result.fx, cx, cy);

    // Screen shake
    doShake(result.shake);

    // First time discovery toast
    if ((state.collection[String(result.id)] || 0) === 1) {
      showToast(`✦ NEW: ${result.name}`);
    }

    // Cutscene for notable rolls
    if (result.cutscene) {
      setTimeout(() => showCutscene(result), 300);
    } else {
      rollBtn.disabled = false;
    }

    isRolling = false;
  }

  function getSpinDuration(tier) {
    const durs = {
      COMMON:0, UNCOMMON:200, RARE:400, EPIC:600,
      LEGENDARY:800, MYTHIC:1000, DIVINE:1200,
      COSMIC:1500, TRANSCENDENT:1800, VOID:2000,
    };
    return durs[tier] ?? 200;
  }

  async function spinEffect(duration, result) {
    if (duration === 0) return;

    const frames  = Math.max(3, Math.floor(duration / 80));
    const pool    = window.RARITIES;
    const tierVal = ['COMMON','UNCOMMON','RARE','EPIC','LEGENDARY','MYTHIC','DIVINE','COSMIC','TRANSCENDENT','VOID'];
    const resultIdx = tierVal.indexOf(result.tier);

    for (let i = 0; i < frames - 1; i++) {
      // Show progressively higher-tier fakes
      const progress = i / frames;
      const maxTierIdx = Math.floor(progress * (resultIdx + 1));
      const candidates = window.RARITIES.filter(r => tierVal.indexOf(r.tier) <= maxTierIdx);
      const fake = candidates[Math.floor(Math.random() * candidates.length)];
      
      cardIcon.textContent = fake.icon;
      cardTier.textContent = window.TIERS[fake.tier].name;
      cardName.textContent = fake.name;
      cardTier.style.color = window.TIERS[fake.tier].color;
      cardName.style.color = window.TIERS[fake.tier].color;
      cardEl.style.boxShadow = `0 0 20px ${window.TIERS[fake.tier].glow}`;

      await delay(duration / frames);
    }
  }

  function delay(ms) {
    return new Promise(res => setTimeout(res, ms));
  }

  rollBtn.addEventListener('click', doRoll);
  // Keyboard shortcut
  document.addEventListener('keydown', e => {
    if (e.code === 'Space' || e.code === 'Enter') doRoll();
    if (e.code === 'Escape') closeCutscene();
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
    updatePity({ tier:'COMMON' }); // init pity display
    pityBar.style.width = Math.min((state.pity / 90) * 100, 100) + '%';
    pityVal.textContent = `${state.pity}/90`;

    // If there's a saved last roll, show it
    if (state.lastRoll) {
      const r = window.RARITIES.find(x => x.id === state.lastRoll);
      if (r) displayRarity(r, false);
    }
    renderHistory();
    renderStreak();

    // Collection count
    collCount.textContent = Object.keys(state.collection).length;

    window.addEventListener('resize', resizeCanvas);
  }

  // Wait for rarities.js to load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
