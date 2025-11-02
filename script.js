const days = document.querySelectorAll('.day');
const tooltip = document.getElementById('tooltip');
const background = document.getElementById('background');

let activeDay = null;

// --- Fonction pour afficher la surprise ---
function showTooltip(day) {
  // effet pop
  day.classList.add('pop-effect');
  setTimeout(() => day.classList.remove('pop-effect'), 300);

  tooltip.innerHTML = day.dataset.surprise;
  tooltip.style.display = 'block';

  const rect = day.getBoundingClientRect();
  tooltip.style.left = `${rect.left + rect.width / 2 - tooltip.offsetWidth / 2 + window.scrollX}px`;
  tooltip.style.top = `${rect.top - tooltip.offsetHeight - 8 + window.scrollY}px`;
}

// --- Gestion des cases ---
days.forEach(day => {
  const dayNumber = day.dataset.day;

  // Vérifier si la case est déjà ouverte
  if (localStorage.getItem('day' + dayNumber)) {
    day.innerHTML = '🍫'; // remplacer par emoji ou image
    day.style.backgroundColor = '#228B22'; // vert sapin pour différencier
    day.style.cursor = 'default';
  }

  day.addEventListener('click', (e) => {
    e.stopPropagation();

    // Si déjà ouverte, ne rien faire
    if (localStorage.getItem('day' + dayNumber)) return;

    showTooltip(day);
    activeDay = day;

    // Enregistrer dans le localStorage
    localStorage.setItem('day' + dayNumber, 'opened');

    // remplacer la case par un emoji après ouverture
    setTimeout(() => {
      day.innerHTML = '🍫';
      day.style.backgroundColor = '#228B22';
      day.style.cursor = 'default';
    }, 300); // juste après l'effet pop
  });

  day.addEventListener('mouseleave', () => {
    tooltip.style.display = 'none';
    activeDay = null;
  });
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

