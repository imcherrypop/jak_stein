/* ============================================================
   THE FINAL HOOKDOWN — script.js
   Roue aléatoire de perks de Tueurs Dead by Daylight
   
   Pour ajouter / retirer des perks : modifiez le tableau PERKS ci-dessous.
   ============================================================ */
 
const PERKS = [
  // ── Compétences Générales de Tueur ──────────────────────────
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
  // ── La Demogorgon ────────────────────────────────────────────
  "Démonstration de Force",
  "Envahissant",
  "Courir dans l'Obscurité",
  // ── Oni ──────────────────────────────────────────────────────
  "Flux Démoniaque",
  "Furie Héréditaire",
  "Traque Implacable",
  // ── Le Spectre de la Nuit (Ghost Face) ──────────────────────
  "Jeu Mortel",
  "Regard Meurtrier",
];
 
/* ────────────────────────────────────────────────────────────
   SETUP
──────────────────────────────────────────────────────────── */
const canvas    = document.getElementById('wheelCanvas');
const ctx       = canvas.getContext('2d');
const spinBtn   = document.getElementById('spinBtn');
const resultCard = document.getElementById('resultCard');
const resultText = document.getElementById('resultText');
 
const NUM   = PERKS.length;
const SLICE = (2 * Math.PI) / NUM;
 
// Starting angle — slight random offset so the wheel never looks static
let currentAngle = Math.random() * 2 * Math.PI;
let spinning = false;
 
// ── Segment colour palette (4 alternating moods) ────────────
const PALETTE = [
  { bg: '#1c0505', bgEdge: '#0a0202', tickLine: '#5a1414' },  // deep blood
  { bg: '#0d0d0d', bgEdge: '#060606', tickLine: '#252525' },  // near-black
  { bg: '#190b02', bgEdge: '#0a0502', tickLine: '#4a1e08' },  // dark rust
  { bg: '#0c0c16', bgEdge: '#060610', tickLine: '#1e1e2e' },  // dark slate
];
 
/* ────────────────────────────────────────────────────────────
   DRAW WHEEL
──────────────────────────────────────────────────────────── */
function drawWheel() {
  const CX = canvas.width  / 2;
  const CY = canvas.height / 2;
  const R  = CX - 14;      // outer radius
  const IR = 48;            // inner (center) circle radius
 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
 
  /* ── Draw each segment ── */
  for (let i = 0; i < NUM; i++) {
    const startA = currentAngle + i * SLICE;
    const endA   = startA + SLICE;
    const midA   = startA + SLICE / 2;
    const pal    = PALETTE[i % PALETTE.length];
 
    // Gradient fill: lighter near centre, darker at edge
    const gx1 = CX + Math.cos(midA) * IR;
    const gy1 = CY + Math.sin(midA) * IR;
    const gx2 = CX + Math.cos(midA) * R;
    const gy2 = CY + Math.sin(midA) * R;
    const grad = ctx.createLinearGradient(gx1, gy1, gx2, gy2);
    grad.addColorStop(0, pal.bg);
    grad.addColorStop(1, pal.bgEdge);
 
    ctx.beginPath();
    ctx.moveTo(CX, CY);
    ctx.arc(CX, CY, R, startA, endA);
    ctx.closePath();
    ctx.fillStyle = grad;
    ctx.fill();
 
    // Thin separator line
    ctx.strokeStyle = pal.tickLine;
    ctx.lineWidth = 0.6;
    ctx.stroke();
 
    /* ── Perk name text ── */
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(midA);
    ctx.textAlign = 'right';
    ctx.textBaseline = 'middle';
 
    const textR    = R - 16;
    const availW   = textR - IR - 10;
    const fontSize = Math.max(7, Math.min(10, 180 / NUM + 1));
 
    ctx.font        = `${fontSize}px Cinzel, serif`;
    ctx.fillStyle   = 'rgba(225, 210, 195, 0.92)';
    ctx.shadowColor = 'rgba(0,0,0,0.9)';
    ctx.shadowBlur  = 4;
 
    ctx.fillText(PERKS[i], textR, 0, availW);
    ctx.restore();
  }
 
  /* ── Outer decorative rings ── */
  ctx.beginPath();
  ctx.arc(CX, CY, R, 0, 2 * Math.PI);
  ctx.strokeStyle = '#8b0000';
  ctx.lineWidth = 3;
  ctx.shadowColor = 'rgba(139,0,0,0.6)';
  ctx.shadowBlur = 12;
  ctx.stroke();
  ctx.shadowBlur = 0;
 
  ctx.beginPath();
  ctx.arc(CX, CY, R - 7, 0, 2 * Math.PI);
  ctx.strokeStyle = 'rgba(139,0,0,0.2)';
  ctx.lineWidth = 1;
  ctx.stroke();
 
  /* ── Segment divider marks at edge ── */
  for (let i = 0; i < NUM; i++) {
    const a = currentAngle + i * SLICE;
    ctx.save();
    ctx.translate(CX, CY);
    ctx.rotate(a);
    ctx.beginPath();
    ctx.moveTo(R + 1, 0);
    ctx.lineTo(R - 10, 0);
    ctx.strokeStyle = 'rgba(139,0,0,0.5)';
    ctx.lineWidth = 1;
    ctx.stroke();
    ctx.restore();
  }
 
  /* ── Centre circle ── */
  const cg = ctx.createRadialGradient(CX, CY, 0, CX, CY, IR);
  cg.addColorStop(0, '#3d0b0b');
  cg.addColorStop(1, '#0a0404');
  ctx.beginPath();
  ctx.arc(CX, CY, IR, 0, 2 * Math.PI);
  ctx.fillStyle = cg;
  ctx.fill();
  ctx.strokeStyle = '#8b0000';
  ctx.lineWidth = 2;
  ctx.shadowColor = 'rgba(200,32,46,0.5)';
  ctx.shadowBlur = 8;
  ctx.stroke();
  ctx.shadowBlur = 0;
 
  /* ── Centre skull ── */
  ctx.font = '30px serif';
  ctx.fillStyle = '#cc2233';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(200,32,46,0.7)';
  ctx.shadowBlur  = 12;
  ctx.fillText('☠', CX, CY);
  ctx.shadowBlur  = 0;
}
 
/* ────────────────────────────────────────────────────────────
   EASE FUNCTION
──────────────────────────────────────────────────────────── */
function easeOutQuart(t) {
  return 1 - Math.pow(1 - t, 4);
}
 
/* ────────────────────────────────────────────────────────────
   SPIN
──────────────────────────────────────────────────────────── */
function spin() {
  if (spinning) return;
  spinning = true;
  spinBtn.disabled = true;
  canvas.classList.add('spinning');
 
  // Hide previous result
  resultCard.hidden = true;
 
  // Pick a random winner
  const winner = Math.floor(Math.random() * NUM);
 
  /*
   * Target: middle of winner's segment should be under the pointer (top = -π/2).
   *
   * Condition: (currentAngle_final + winner*SLICE + SLICE/2) ≡ -π/2  (mod 2π)
   * → currentAngle_final = -π/2 - winner*SLICE - SLICE/2
   *
   * We need to spin CLOCKWISE (increasing angle), so:
   * delta = (target − start) mod 2π  → normalized to [0, 2π)
   * totalRotation = delta + N full turns
   */
  const startAngle  = currentAngle;
  const targetFinal = -Math.PI / 2 - winner * SLICE - SLICE / 2;
  let   delta       = (targetFinal - startAngle) % (2 * Math.PI);
  if (delta < 0) delta += 2 * Math.PI;
 
  const extraTurns    = 7 + Math.floor(Math.random() * 5);   // 7–11 full rotations
  const totalRotation = delta + extraTurns * 2 * Math.PI;
  const duration      = 5500 + Math.random() * 2000;         // 5.5–7.5 s
 
  let startTime = null;
 
  function frame(ts) {
    if (!startTime) startTime = ts;
    const elapsed = ts - startTime;
    const t       = Math.min(elapsed / duration, 1);
 
    currentAngle = startAngle + totalRotation * easeOutQuart(t);
    drawWheel();
 
    if (t < 1) {
      requestAnimationFrame(frame);
    } else {
      // Normalise angle to avoid float overflow over many spins
      currentAngle = ((startAngle + totalRotation) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
      drawWheel();
 
      spinning = false;
      spinBtn.disabled = false;
      canvas.classList.remove('spinning');
 
      // Small delay before showing result — let the drama breathe
      setTimeout(() => showResult(PERKS[winner]), 350);
    }
  }
 
  requestAnimationFrame(frame);
}
 
/* ────────────────────────────────────────────────────────────
   SHOW RESULT
──────────────────────────────────────────────────────────── */
function showResult(name) {
  resultText.textContent = name;
  resultCard.hidden = false;
  // Scroll result into view if off-screen
  setTimeout(() => {
    resultCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  }, 50);
}
 
/* ────────────────────────────────────────────────────────────
   SCROLL REVEAL (IntersectionObserver)
──────────────────────────────────────────────────────────── */
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
 
document.querySelectorAll('section').forEach(s => io.observe(s));
 
/* ────────────────────────────────────────────────────────────
   EVENT LISTENERS
──────────────────────────────────────────────────────────── */
canvas.addEventListener('click', spin);
spinBtn.addEventListener('click', spin);
 
/* ────────────────────────────────────────────────────────────
   INITIAL DRAW
──────────────────────────────────────────────────────────── */
drawWheel();


