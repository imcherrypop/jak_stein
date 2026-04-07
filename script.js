/* ============================================================
   JAK_STEIN — Roue des Perks — script.js
   ============================================================ */

// ──────────────────────────────────────────────────────────────
//  BASE DE DONNÉES
//  type: "general"  → segment Perks Générales
//        "original" → tueur original DBD
//        "dlc"      → tueur DLC licencié
// ──────────────────────────────────────────────────────────────
const ALL_ENTRIES = [
  // ── PERKS GÉNÉRALES ───────────────────────────────────────────
  {
    id: "general",
    name: "Perks Générales",
    type: "general",
    perks: [
      "Boucher Sadique",
      "Crochet Flagellateur : Sanctuaire Monstrueux",
      "Espions de l'Ombre",
      "Espoir Brisé",
      "Implacable",
      "Inquiétant",
      "Insidieux",
      "Murmure Amer",
      "Murmures",
      "Pisteur",
      "Poigne de Fer",
      "Sort : Euphorie de la Chasse",
      "Sort : Personne n'Échappe à la Mort",
    ],
  },

  // ── TUEURS ORIGINAUX ──────────────────────────────────────────
  { id: "piegeur",    name: "Le Piégeur",            type: "original", perks: ["Agitation", "Force Brute", "Présence Perturbante"] },
  { id: "infirmiere", name: "L'Infirmière",           type: "original", perks: ["Stridor", "Thanatophobie", "Vocation de l'Infirmière"] },
  { id: "montagnard", name: "Le Montagnard",          type: "original", perks: ["Rejeton de la Lumière", "Réparateur", "Tenace"] },
  { id: "spectre",    name: "Le Spectre",             type: "original", perks: ["Limier", "Rejeton de l'Ombre"] },
  { id: "harpie",     name: "La Harpie",              type: "original", perks: ["Sort : Le Troisième Sceau", "Sort : Ruine"] },
  { id: "docteur",    name: "Le Docteur",             type: "original", perks: ["Présence Écrasante", "Surcharge", "Surveillance et Maltraitance"] },
  { id: "chasseuse",  name: "La Chasseuse",           type: "original", perks: ["Instinct Territorial", "Prédation", "Sort : Berceuse de la Chasseuse"] },
  { id: "esprit",     name: "L'Esprit",               type: "original", perks: ["Fureur de l'Esprit", "Rancœur", "Sort : Terrain Hanté"] },
  { id: "legion",     name: "La Légion",              type: "original", perks: ["Cran Dément", "Discordance", "Vierge de Fer"] },
  { id: "epidemie",   name: "L'Épidémie",             type: "original", perks: ["Intervention Impure", "Peur Contagieuse", "Sombre Dévotion"] },
  { id: "oni",        name: "L'Oni",                  type: "original", perks: ["Ennemi Juré", "Tactiques de Zanshin", "Écho Sanguin"] },
  { id: "lancemort",  name: "Le Lance-Mort",          type: "original", perks: ["Bricolo", "Dispositif de l'Homme Mort", "Sort : Châtiment"] },
  { id: "trickster",  name: "Le Trickster",           type: "original", perks: ["Aucune Issue", "Fascination", "Sort : Contrôle des Foules"] },
  { id: "fleau",      name: "Le Fléau",               type: "original", perks: ["Prise du Dragon", "Sort : Faveur de Sang", "Sort : Immortel"] },
  { id: "jumeaux",    name: "Les Jumeaux",            type: "original", perks: ["Amasseur", "Coup de Grâce", "Oppression"] },
  { id: "artiste",    name: "L'Artiste",              type: "original", perks: ["Crochet Flagellateur : Écho de Douleur", "Sombre Étreinte", "Sort : Repentir"] },
  { id: "dragage",    name: "Le Dragage",             type: "original", perks: ["Dissolution", "Toucher Septique", "Ténèbres Révélées"] },
  { id: "marchande",  name: "Marchande de Crânes",   type: "original", perks: ["Effet de Levier", "Ouverture de la Chasse", "VLAN !"] },
  { id: "singularite",name: "La Singularité",         type: "original", perks: ["Apprentissage Automatique", "Hésitation Forcée", "Limites Génétiques"] },
  { id: "inconnu",    name: "L'Inconnu",              type: "original", perks: ["Inattendu", "Inexorable", "Interrompu"] },
  { id: "chevalier",  name: "Le Chevalier",           type: "original", perks: ["Hubris", "Nulle Part où se Cacher", "Sort : Affrontez les Ténèbres"] },
  { id: "liche",      name: "La Liche",               type: "original", perks: ["Arrogance Ténébreuse", "Contact Languide", "Lien avec la Trame"] },
  { id: "molosses",   name: "Maîtresse des Molosses", type: "original", perks: ["Coup de Tonnerre", "Boussole de Douleur", "Pas de Quartier"] },
  { id: "krasue",     name: "Krasue",                 type: "original", perks: ["Sort : Prélude au Malheur", "Vorace", "Œil Vagabond"] },

  // ── DLC LICENCIÉS ─────────────────────────────────────────────
  { id: "myers",      name: "Michael Myers",          type: "dlc", perks: ["Garder le Meilleur pour la Fin", "Jouer avec la Nourriture", "Lumière Mourante"] },
  { id: "freddy",     name: "Freddy Krueger",         type: "dlc", perks: ["Gardien du Sang", "Intensité Ardente", "Souviens-Toi de Moi"] },
  { id: "ghostface",  name: "Ghost Face",             type: "dlc", perks: ["Frissons Palpitants", "Je Vous Écoute", "Poursuite Furtive"] },
  { id: "cannibale",  name: "Le Cannibale",           type: "dlc", perks: ["Trépas de Franklin", "K.O."] },
  { id: "cenobite",   name: "Le Cénobite",            type: "dlc", perks: ["Crochet Flagellateur : Don de Souffrance", "Impasse", "Sort : Jouet"] },
  { id: "pyramidhead",name: "Pyramid Head",           type: "dlc", perks: ["Lien Mortel", "Piste de Souffrance", "Pénitence Forcée"] },
  { id: "nemesis",    name: "Nemesis",                type: "dlc", perks: ["Hystérie", "Poursuivant Meurtrier", "Éruption"] },
  { id: "wesker",     name: "Albert Wesker",          type: "dlc", perks: ["Anatomie Supérieure", "Perception Éveillée", "Terminus"] },
  { id: "onryo",      name: "Onryō",                  type: "dlc", perks: ["Appel de la Mer", "Crochet Flagellateur : Flots de Rage", "Tempête Impitoyable"] },
  { id: "demogorgon", name: "Le Démogorgon",          type: "dlc", perks: ["Briseur d'Esprit", "Limites Cruelles", "Surtension"] },
  { id: "henrycreel", name: "Henry Creel",            type: "dlc", perks: ["Projet Secret", "Remonter le Temps", "Sort : Esprit Collectif"] },
  { id: "alien",      name: "Alien (Xénomorphe)",     type: "dlc", perks: ["Arme Ultime", "Brutalité Rapide", "Instinct d'Alien"] },
  { id: "chucky",     name: "Chucky",                 type: "dlc", perks: ["Amis pour la Vie", "Piles Incluses", "Sort : On Peut Jouer à Deux"] },
  { id: "dracula",    name: "Dracula",                type: "dlc", perks: ["Avidité Humaine", "Domination", "Sort : Destin Misérable"] },
  { id: "piggy",      name: "La Cochon",              type: "dlc", perks: ["Crochet Flagellateur : Coup du Pendu", "Fais Ton Choix", "Surveillance"] },
];

// ──────────────────────────────────────────────────────────────
//  ÉTAT  –  tous cochés par défaut
// ──────────────────────────────────────────────────────────────
const checked = {};
ALL_ENTRIES.forEach(e => { checked[e.id] = true; });

function activeEntries() {
  return ALL_ENTRIES.filter(e => checked[e.id]);
}

// ──────────────────────────────────────────────────────────────
//  DOM
// ──────────────────────────────────────────────────────────────
const canvas    = document.getElementById('wheelCanvas');
const ctx       = canvas.getContext('2d');
const spinBtn   = document.getElementById('spinBtn');
const resSection= document.getElementById('result');
const resLabel  = document.getElementById('resultLabel');
const resEntry  = document.getElementById('resultEntry');
const resBadge  = document.getElementById('resultBadge');
const resPerk   = document.getElementById('resultPerk');
const checkPanel= document.getElementById('checkPanel');

let wheelAngle = Math.random() * 2 * Math.PI;
let running    = false;

// ──────────────────────────────────────────────────────────────
//  BUILD CHECKLIST
// ──────────────────────────────────────────────────────────────
function buildChecklist() {
  checkPanel.innerHTML = '';

  // Groupe Général
  const genGroup = makeGroup('general', '— Perks —');
  appendItem(genGroup, ALL_ENTRIES.find(e => e.id === 'general'));
  checkPanel.appendChild(genGroup);

  // Groupe Originaux
  const origGroup = makeGroup('original', '⚔ Tueurs Originaux');
  ALL_ENTRIES.filter(e => e.type === 'original').forEach(e => appendItem(origGroup, e));
  checkPanel.appendChild(origGroup);

  // Groupe DLC
  const dlcGroup = makeGroup('dlc', '★ DLC Licenciés');
  ALL_ENTRIES.filter(e => e.type === 'dlc').forEach(e => appendItem(dlcGroup, e));
  checkPanel.appendChild(dlcGroup);
}

function makeGroup(type, label) {
  const wrap = document.createElement('div');
  wrap.className = 'ck-group';

  const header = document.createElement('div');
  header.className = `ck-group-header ${type}`;

  const title = document.createElement('span');
  title.className = 'ck-group-title';
  title.textContent = label;

  const actions = document.createElement('div');
  actions.className = 'ck-actions';

  const btnAll  = document.createElement('button');
  btnAll.className  = 'ck-btn';
  btnAll.textContent = 'Tout';
  btnAll.addEventListener('click', () => toggleGroup(type, true));

  const btnNone = document.createElement('button');
  btnNone.className  = 'ck-btn';
  btnNone.textContent = 'Aucun';
  btnNone.addEventListener('click', () => toggleGroup(type, false));

  actions.appendChild(btnAll);
  actions.appendChild(btnNone);
  header.appendChild(title);
  header.appendChild(actions);
  wrap.appendChild(header);

  const list = document.createElement('div');
  list.className = 'ck-list';
  list.dataset.type = type;
  wrap.appendChild(list);
  return wrap;
}

function appendItem(group, entry) {
  const list = group.querySelector('.ck-list');
  const lbl  = document.createElement('label');
  lbl.className = `ck-item ${entry.type}`;

  const cb = document.createElement('input');
  cb.type    = 'checkbox';
  cb.checked = checked[entry.id];
  cb.addEventListener('change', () => {
    checked[entry.id] = cb.checked;
    safetyCheck();
    draw();
    updateCount();
    hideResult();
  });

  const box  = document.createElement('span');
  box.className = 'ck-box';

  const name = document.createElement('span');
  name.className = 'ck-name';
  name.textContent = entry.name;

  lbl.appendChild(cb);
  lbl.appendChild(box);
  lbl.appendChild(name);
  list.appendChild(lbl);
}

function toggleGroup(type, state) {
  ALL_ENTRIES.filter(e => e.type === type || (type === 'general' && e.id === 'general'))
    .forEach(e => {
      checked[e.id] = state;
    });
  safetyCheck();
  refreshCheckboxes();
  draw();
  updateCount();
  hideResult();
}

function refreshCheckboxes() {
  checkPanel.querySelectorAll('input[type=checkbox]').forEach((cb, i) => {
    const entry = ALL_ENTRIES.find(e => e.name === cb.closest('.ck-item').querySelector('.ck-name').textContent);
    if (entry) cb.checked = checked[entry.id];
  });
}

// Si tout est décoché → tout recocher
function safetyCheck() {
  if (activeEntries().length === 0) {
    ALL_ENTRIES.forEach(e => { checked[e.id] = true; });
    refreshCheckboxes();
  }
}

function updateCount() {
  const n = activeEntries().length;
  const el = document.getElementById('activeCount');
  if (el) el.textContent = `${n} entrée${n > 1 ? 's' : ''} sur la roue`;
}

// ──────────────────────────────────────────────────────────────
//  PALETTE PAR TYPE
// ──────────────────────────────────────────────────────────────
const PAL = {
  general:  [
    { bg0: '#1a1400', bg1: '#0a0900', border: '#4a3a00', text: 'rgba(255,230,130,0.97)' },
    { bg0: '#120f00', bg1: '#070600', border: '#362a00', text: 'rgba(240,215,110,0.92)' },
  ],
  original: [
    { bg0: '#2a0606', bg1: '#0e0202', border: '#5a1212', text: 'rgba(240,215,200,0.97)' },
    { bg0: '#1e0404', bg1: '#0a0101', border: '#3d0d0d', text: 'rgba(225,200,185,0.92)' },
  ],
  dlc: [
    { bg0: '#0c0c20', bg1: '#060610', border: '#1e1e44', text: 'rgba(200,215,245,0.97)' },
    { bg0: '#080818', bg1: '#04040c', border: '#14143c', text: 'rgba(185,200,230,0.92)' },
  ],
};

// ──────────────────────────────────────────────────────────────
//  DRAW
// ──────────────────────────────────────────────────────────────
function draw() {
  const entries = activeEntries();
  const N  = entries.length;
  const S  = canvas.width;
  const CX = S / 2, CY = S / 2;
  const R  = CX - 14;
  const IR = 56;

  ctx.clearRect(0, 0, S, S);
  if (N === 0) return;

  const SLICE = (2 * Math.PI) / N;

  for (let i = 0; i < N; i++) {
    const entry = entries[i];
    const pal   = PAL[entry.type][i % 2];
    const a0    = wheelAngle + i * SLICE;
    const a1    = a0 + SLICE;
    const mid   = a0 + SLICE / 2;

    // Fond
    const gx1 = CX + Math.cos(mid) * IR, gy1 = CY + Math.sin(mid) * IR;
    const gx2 = CX + Math.cos(mid) * R,  gy2 = CY + Math.sin(mid) * R;
    const g   = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
    g.addColorStop(0, pal.bg0);
    g.addColorStop(1, pal.bg1);

    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, R, a0, a1);
    ctx.closePath();
    ctx.fillStyle   = g;
    ctx.fill();
    ctx.strokeStyle = pal.border;
    ctx.lineWidth   = 1.2;
    ctx.stroke();

    // Texte
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(mid);
    ctx.textAlign    = 'right';
    ctx.textBaseline = 'middle';

    const avail = R - IR - 22;
    // Taille adaptative selon nb de segments ET longueur du nom
    let fs = Math.min(14, Math.max(7, avail / (entry.name.length * 0.52)));
    ctx.font = `bold ${fs}px Cinzel, serif`;
    const mw = ctx.measureText(entry.name).width;
    if (mw > avail) {
      fs = fs * (avail / mw) * 0.9;
      ctx.font = `bold ${Math.max(7, fs)}px Cinzel, serif`;
    }

    ctx.fillStyle   = pal.text;
    ctx.shadowColor = 'rgba(0,0,0,1)';
    ctx.shadowBlur  = 7;
    ctx.fillText(entry.name, R - 18, 0);
    ctx.restore();

    // Trait de séparation
    ctx.save();
    ctx.translate(CX, CY); ctx.rotate(a0);
    ctx.beginPath(); ctx.moveTo(IR, 0); ctx.lineTo(R, 0);
    ctx.strokeStyle = pal.border; ctx.lineWidth = 1; ctx.stroke();
    ctx.restore();
  }

  // Anneau extérieur
  ctx.beginPath(); ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.strokeStyle = '#8b0000'; ctx.lineWidth = 4;
  ctx.shadowColor = 'rgba(200,32,46,0.7)'; ctx.shadowBlur = 16; ctx.stroke();
  ctx.shadowBlur  = 0;
  ctx.beginPath(); ctx.arc(CX, CY, R - 11, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(139,0,0,0.2)'; ctx.lineWidth = 1; ctx.stroke();

  // Centre
  const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, IR);
  cg.addColorStop(0, '#4a0e0e'); cg.addColorStop(0.6, '#1a0505'); cg.addColorStop(1, '#080202');
  ctx.beginPath(); ctx.arc(CX, CY, IR, 0, Math.PI * 2);
  ctx.fillStyle = cg; ctx.fill();
  ctx.strokeStyle = '#c8202e'; ctx.lineWidth = 2.5;
  ctx.shadowColor = 'rgba(200,32,46,0.6)'; ctx.shadowBlur = 10; ctx.stroke();
  ctx.shadowBlur = 0;
  ctx.beginPath(); ctx.arc(CX, CY, IR - 8, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(200,32,46,0.18)'; ctx.lineWidth = 1; ctx.stroke();

  ctx.font = '32px serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = '#dd2233';
  ctx.shadowColor = 'rgba(200,32,46,0.8)'; ctx.shadowBlur = 14;
  ctx.fillText('☠', CX, CY);
  ctx.shadowBlur = 0;
}

// ──────────────────────────────────────────────────────────────
//  EASE
// ──────────────────────────────────────────────────────────────
function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

// ──────────────────────────────────────────────────────────────
//  SPIN
// ──────────────────────────────────────────────────────────────
function spin() {
  const entries = activeEntries();
  if (running || entries.length === 0) return;
  running = true;
  spinBtn.disabled = true;
  canvas.classList.add('spinning');
  hideResult();

  const N     = entries.length;
  const SLICE = (2 * Math.PI) / N;

  const winnerIdx = Math.floor(Math.random() * N);
  const start  = wheelAngle;
  const target = -Math.PI / 2 - winnerIdx * SLICE - SLICE / 2;
  let   delta  = (target - start) % (2 * Math.PI);
  if (delta < 0) delta += 2 * Math.PI;

  const tours    = 8 + Math.floor(Math.random() * 5);
  const total    = delta + tours * 2 * Math.PI;
  const duration = 5500 + Math.random() * 2000;
  let   t0       = null;

  function frame(ts) {
    if (!t0) t0 = ts;
    const t = Math.min((ts - t0) / duration, 1);
    wheelAngle = start + total * easeOut(t);
    draw();
    if (t < 1) { requestAnimationFrame(frame); return; }

    wheelAngle = ((start + total) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    running = false;
    spinBtn.disabled = false;
    canvas.classList.remove('spinning');
    draw();

    const winner   = entries[winnerIdx];
    const perk     = winner.perks[Math.floor(Math.random() * winner.perks.length)];
    setTimeout(() => showResult(winner, perk), 350);
  }
  requestAnimationFrame(frame);
}

// ──────────────────────────────────────────────────────────────
//  RÉSULTAT
// ──────────────────────────────────────────────────────────────
function showResult(entry, perk) {
  resLabel.hidden = false;
  resEntry.textContent = entry.name;

  const typeLabels = { general: '🎴 Général', original: '⚔ Original', dlc: '★ DLC' };
  resBadge.textContent = typeLabels[entry.type];
  resBadge.className   = `result-badge ${entry.type}`;
  resPerk.textContent  = perk;

  requestAnimationFrame(() => {
    document.getElementById('resEntryWrap').classList.add('show');
    setTimeout(() => resPerk.classList.add('show'), 200);
  });
}

function hideResult() {
  resLabel.hidden = true;
  document.getElementById('resEntryWrap').classList.remove('show');
  resPerk.classList.remove('show');
  resEntry.textContent = '';
  resPerk.textContent  = '';
}

// ──────────────────────────────────────────────────────────────
//  PANEL TOGGLE
// ──────────────────────────────────────────────────────────────
document.getElementById('togglePanel').addEventListener('click', () => {
  const panel = document.getElementById('panelWrap');
  panel.classList.toggle('open');
  document.getElementById('togglePanel').textContent =
    panel.classList.contains('open') ? '▲ Masquer la sélection' : '▼ Gérer les tueurs';
});

// ──────────────────────────────────────────────────────────────
//  EVENTS & INIT
// ──────────────────────────────────────────────────────────────
canvas.addEventListener('click', spin);
spinBtn.addEventListener('click', spin);
canvas.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') spin(); });

buildChecklist();
draw();
updateCount();
