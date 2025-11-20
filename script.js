const days = document.querySelectorAll('.day');
const tooltip = document.getElementById('tooltip');
const background = document.getElementById('background');

let activeDay = null;

// Pool d'emojis de Noël (exclut 🍫 pour le jour 1 et 🎄 pour le jour 24)
const poolEmojis = [
  '❄️','🧣','🧦','🍬','🍭','🎁','⛄','🕯️','🎀','🔔','🧸',
  '🕯️','🧶','🎶','🍪','🦌','⭐','🎉','🎊','🛷','🌟','🎈',
  '🧁','🍯','☕','🥧'
];

// Mélange Fisher‑Yates du tableau
function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Préparer une copie mélangée du pool et s'assurer qu'on a assez d'emojis uniques
let emojiPool = shuffle(poolEmojis.slice());

// Si le pool (hors 1 et 24) est trop petit, étendre avec des duplicatas non immédiats
const required = days.length - 2;
if (emojiPool.length < required) {
  const extra = [];
  while (extra.length + emojiPool.length < required) {
    extra.push(...poolEmojis.slice(0, Math.min(poolEmojis.length, required - (emojiPool.length + extra.length))));
  }
  emojiPool = emojiPool.concat(extra);
  emojiPool = shuffle(emojiPool);
}

// Stockage en mémoire (non persistant) des emojis assignés pendant la session
const assignedEmojis = {};

// --- Utilitaires ---
function pickNextUniqueEmoji() {
  // Prend et renvoie le premier emoji disponible dans emojiPool
  if (emojiPool.length === 0) {
    // backup safety: si vide, renvoie un emoji générique
    return '🎁';
  }
  return emojiPool.shift();
}

// Affiche le tooltip de la case
function showTooltip(day) {
  day.classList.add('pop-effect');
  setTimeout(() => day.classList.remove('pop-effect'), 300);

  tooltip.innerHTML = day.dataset.surprise;
  tooltip.style.display = 'block';

  requestAnimationFrame(() => {
    const rect = day.getBoundingClientRect();
    const left = rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + window.scrollX;
    const top = rect.top - tooltip.offsetHeight - 8 + window.scrollY;
    tooltip.style.left = `${Math.max(8, Math.min(left, window.innerWidth - tooltip.offsetWidth - 8))}px`;
    tooltip.style.top = `${Math.max(8, top)}px`;
  });
}

// --- Initialisation et gestion des cases ---
// Comportement :
// - Case 1 fixe : 🍫
// - Case 24 fixe : 🎄 (attribuée dès l'ouverture)
// - Autres : on attribue un emoji unique (en mémoire seulement) au premier clic pendant la session
days.forEach(day => {
  const dayNumber = day.dataset.day;

  // État visuel initial : afficher le numéro
  day.innerHTML = dayNumber;
  day.style.backgroundColor = ''; // laisse le CSS gérer la couleur par défaut
  day.classList.remove('opened');
  day.style.cursor = 'pointer';

  day.addEventListener('click', (e) => {
    e.stopPropagation();

    // Si déjà assignée dans la session, juste réafficher la surprise
    if (assignedEmojis[dayNumber]) {
      day.innerHTML = assignedEmojis[dayNumber];
      day.style.backgroundColor = '#228B22';
      day.classList.add('opened');
      showTooltip(day);
      activeDay = day;
      return;
    }

    // Attribution au premier clic pendant la session
    if (dayNumber === '1') {
      assignedEmojis[dayNumber] = '🍫';
    } else if (dayNumber === '24') {
      assignedEmojis[dayNumber] = '🎄';
    } else {
      // choisir un emoji unique depuis le pool
      assignedEmojis[dayNumber] = pickNextUniqueEmoji();
    }

    // afficher la surprise puis appliquer l'emoji après l'effet pop
    showTooltip(day);
    activeDay = day;

    setTimeout(() => {
      day.innerHTML = assignedEmojis[dayNumber];
      day.style.backgroundColor = '#228B22';
      day.classList.add('opened');
      day.style.cursor = 'pointer';
    }, 300);
  });

  day.addEventListener('mouseleave', () => {
    if (!activeDay) {
      tooltip.style.display = 'none';
    }
  });
});

// Cacher le tooltip si on clique n'importe où ailleurs (ne réinitialise pas l'état "ouvert" en mémoire)
document.addEventListener('click', () => {
  tooltip.style.display = 'none';
  activeDay = null;
});

// --- Neige derrière les cases ---
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.classList.add('snowflake');
  snowflake.style.left = Math.random() * window.innerWidth + 'px';
  snowflake.style.fontSize = Math.random() * 10 + 10 + 'px';
  snowflake.style.animationDuration = Math.random() * 5 + 5 + 's';
  snowflake.innerText = '❄️';
  background.appendChild(snowflake);

  setTimeout(() => {
    snowflake.remove();
  }, 10000);
}

setInterval(createSnowflake, 300);


