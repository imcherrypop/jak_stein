/* ============================================================
   JAK_STEIN — Roue des Perks — script.js

   Pour ajouter / retirer des perks : modifier le tableau PERKS.
   ============================================================ */

const PERKS = [
  // ── Générales Tueur ──────────────────────────────────────────
  "Boucher Sadique",
  "Sanctuaire Monstrueux",
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
  // ── Le Piégeur ───────────────────────────────────────────────
  "Agitation",
  "Rancœur",
  // ── L'Infirmière ─────────────────────────────────────────────
  "L'Appel de l'Infirmière",
  "Stridor",
  // ── Le Montagnard ────────────────────────────────────────────
  "Endurci",
  "Bricoleur",
  "Aveuglement",
  // ── La Forme (Myers) ─────────────────────────────────────────
  "Garder le Meilleur pour la Fin",
  "Jouer avec sa Nourriture",
  "Lumière Mourante",
  // ── La Sorcière ──────────────────────────────────────────────
  "Sort : Le Troisième Sceau",
  "Sort : La Ruine",
  // ── Le Docteur ───────────────────────────────────────────────
  "Présence Écrasante",
  "Contrôle & Abus",
  "Coulrophobie",
  // ── La Chasseuse ─────────────────────────────────────────────
  "Bête de Proie",
  "Impératif Territorial",
  "Sort : Berceuse de la Chasseuse",
  // ── Le Cannibale ─────────────────────────────────────────────
  "La Démence de Franklin",
  "Mise à Terre",
  // ── Le Cauchemar (Freddy) ────────────────────────────────────
  "Thanatophobie",
  "Souviens-toi de Moi",
  "En Feu",
  // ── La Cochon ────────────────────────────────────────────────
  "Surveillance",
  "Choix Cornélien",
  "Tour du Bourreau",
  // ── Le Clown ─────────────────────────────────────────────────
  "Bamboozle",
  "Pop Goes the Weasel",
  "Ivre de Pouvoir",
  // ── L'Esprit ─────────────────────────────────────────────────
  "Sort : Rancune Tenace",
  "Changement de Cible",
  "Fureur Phénoménale",
  // ── La Légion ────────────────────────────────────────────────
  "Discorde",
  "Toile de Sang",
  "Mise en Scène",
  // ── La Peste ─────────────────────────────────────────────────
  "Sort : Purge Funeste",
  "Corruption Totale",
  "Bénédiction Torturée",
  // ── Le Spectre ───────────────────────────────────────────────
  "Soif de Sang",
  "Frappe Sournoise",
  "Naissance des Ombres",
  // ── Le Demogorgon ────────────────────────────────────────────
  "Démonstration de Force",
  "Envahissant",
  "Courir dans l'Obscurité",
  // ── Oni ──────────────────────────────────────────────────────
  "Flux Démoniaque",
  "Furie Héréditaire",
  "Traque Implacable",
  // ── Ghost Face ───────────────────────────────────────────────
  "Jeu Mortel",
  "Regard Meurtrier",
];

/* ────────────────────────────────────────────────────────────
   SETUP
──────────────────────────────────────────────────────────── */
const canvas     = document.getElementById('wheelCanvas');
const ctx        = canvas.getContext('2d');
const spinBtn    = document.getElementById('spinBtn');
const resName    = document.getElementById('resultName');
const resLabel   = document.getElementById('resultLabel');

const NUM   = PERKS.length;
const SLICE = (2 * Math.PI) / NUM;

// Palette alternée 4 couleurs
const PAL = [
  ['#1c0505', '#0a0202'],   // dark blood
  ['#0e0e0e', '#060606'],   // near-black
  ['#180a02', '#090402'],   // dark rust
  ['#0b0b15', '#050510'],   // dark slate
];

let angle   = Math.random() * 2 * Math.PI;
let running = false;

/* ────────────────────────────────────────────────────────────
   DRAW
──────────────────────────────────────────────────────────── */
function draw() {
  const S  = canvas.width;
  const CX = S / 2, CY = S / 2;
  const R  = CX - 12;
  const IR = 44;

  ctx.clearRect(0, 0, S, S);

  // ── Segments ──
  for (let i = 0; i < NUM; i++) {
    const a0  = angle + i * SLICE;
    const a1  = a0 + SLICE;
    const mid = a0 + SLICE / 2;
    const [c0, c1] = PAL[i % PAL.length];

    const gx1 = CX + Math.cos(mid) * IR;
    const gy1 = CY + Math.sin(mid) * IR;
    const gx2 = CX + Math.cos(mid) * R;
    const gy2 = CY + Math.sin(mid) * R;
    const g   = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
    g.addColorStop(0, c0);
    g.addColorStop(1, c1);

    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, R, a0, a1);
    ctx.closePath();
    ctx.fillStyle   = g;
    ctx.fill();
    ctx.strokeStyle = i % 2 ? '#2a0808' : '#1a1a1a';
    ctx.lineWidth   = 0.7;
    ctx.stroke();

    // Texte perk
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(mid);
    ctx.textAlign     = 'right';
    ctx.textBaseline  = 'middle';
    const fs = Math.max(6.5, Math.min(9.5, 160 / NUM + 1));
    ctx.font          = `${fs}px Cinzel, serif`;
    ctx.fillStyle     = 'rgba(220, 208, 195, 0.9)';
    ctx.shadowColor   = 'rgba(0,0,0,0.95)';
    ctx.shadowBlur    = 4;
    ctx.fillText(PERKS[i], R - 14, 0, R - IR - 8);
    ctx.restore();
  }

  // ── Anneau extérieur ──
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, Math.PI * 2);
  ctx.strokeStyle = '#8b0000';
  ctx.lineWidth   = 3;
  ctx.shadowColor = 'rgba(139,0,0,0.6)';
  ctx.shadowBlur  = 12;
  ctx.stroke();
  ctx.shadowBlur  = 0;

  ctx.beginPath();
  ctx.arc(CX, CY, R - 7, 0, Math.PI * 2);
  ctx.strokeStyle = 'rgba(139,0,0,0.18)';
  ctx.lineWidth   = 1;
  ctx.stroke();

  // ── Marques de séparation ──
  for (let i = 0; i < NUM; i++) {
    const a = angle + i * SLICE;
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(R, 0);
    ctx.lineTo(R - 9, 0);
    ctx.strokeStyle = 'rgba(139,0,0,0.4)';
    ctx.lineWidth   = 1;
    ctx.stroke();
    ctx.restore();
  }

  // ── Cercle central ──
  const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, IR);
  cg.addColorStop(0, '#3d0b0b');
  cg.addColorStop(1, '#0a0404');
  ctx.beginPath();
  ctx.arc(CX, CY, IR, 0, Math.PI * 2);
  ctx.fillStyle   = cg;
  ctx.fill();
  ctx.strokeStyle = '#8b0000';
  ctx.lineWidth   = 2;
  ctx.shadowColor = 'rgba(200,32,46,0.5)';
  ctx.shadowBlur  = 8;
  ctx.stroke();
  ctx.shadowBlur  = 0;

  // ── Skull ──
  ctx.font          = '26px serif';
  ctx.fillStyle     = '#cc2233';
  ctx.textAlign     = 'center';
  ctx.textBaseline  = 'middle';
  ctx.shadowColor   = 'rgba(200,32,46,0.7)';
  ctx.shadowBlur    = 10;
  ctx.fillText('☠', CX, CY);
  ctx.shadowBlur    = 0;
}

/* ────────────────────────────────────────────────────────────
   EASE
──────────────────────────────────────────────────────────── */
function easeOut(t) {
  return 1 - Math.pow(1 - t, 4);
}

/* ────────────────────────────────────────────────────────────
   SPIN
──────────────────────────────────────────────────────────── */
function spin() {
  if (running) return;
  running = true;
  spinBtn.disabled = true;
  canvas.classList.add('spinning');

  // Cacher le résultat précédent
  resName.classList.remove('show');
  resLabel.hidden = true;

  const winner   = Math.floor(Math.random() * NUM);
  const start    = angle;
  const target   = -Math.PI / 2 - winner * SLICE - SLICE / 2;
  let   delta    = (target - start) % (2 * Math.PI);
  if (delta < 0) delta += 2 * Math.PI;

  const tours    = 7 + Math.floor(Math.random() * 5);    // 7 à 11 tours
  const total    = delta + tours * 2 * Math.PI;
  const duration = 5500 + Math.random() * 2000;           // 5.5 à 7.5 s
  let   t0       = null;

  function frame(ts) {
    if (!t0) t0 = ts;
    const t = Math.min((ts - t0) / duration, 1);
    angle = start + total * easeOut(t);
    draw();

    if (t < 1) {
      requestAnimationFrame(frame);
      return;
    }

    // Normalise pour éviter l'overflow
    angle   = ((start + total) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
    running = false;
    spinBtn.disabled = false;
    canvas.classList.remove('spinning');
    draw();

    setTimeout(() => {
      resName.textContent = PERKS[winner];
      resLabel.hidden     = false;
      requestAnimationFrame(() => resName.classList.add('show'));
    }, 300);
  }

  requestAnimationFrame(frame);
}

/* ────────────────────────────────────────────────────────────
   EVENTS
──────────────────────────────────────────────────────────── */
canvas.addEventListener('click', spin);
spinBtn.addEventListener('click', spin);
canvas.addEventListener('keydown', e => {
  if (e.key === 'Enter' || e.key === ' ') spin();
});

/* ────────────────────────────────────────────────────────────
   INIT
──────────────────────────────────────────────────────────── */
draw();


