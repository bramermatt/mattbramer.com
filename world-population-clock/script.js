const populationEl = document.getElementById('population');
const changeEl = document.getElementById('population-change');
const birthsEl = document.getElementById('births-today');
const deathsEl = document.getElementById('deaths-today');
const netEl = document.getElementById('net-growth');
const yearSlider = document.getElementById('projection-year');
const yearOutput = document.getElementById('projection-output');
const projectionResult = document.getElementById('projection-result');
const randomFactBtn = document.getElementById('random-fact-btn');
const randomFactEl = document.getElementById('random-fact');

const basePopulation = 8110000000;
const baseDate = new Date('2026-01-01T00:00:00Z');
const birthRatePerSecond = 4.3;
const deathRatePerSecond = 2.0;
const netPerSecond = birthRatePerSecond - deathRatePerSecond;

const facts = [
  'More than half the world lives in urban areas.',
  'Population growth rates are slowing in many countries.',
  'Age distribution shapes jobs, schools, and healthcare demand.',
  'Migration can rapidly reshape local population trends.',
  'Even small yearly growth compounds into large long-term changes.'
];

function formatInt(value) {
  return Math.round(value).toLocaleString('en-US');
}

function updateClock() {
  const now = new Date();
  const elapsedSeconds = (now - baseDate) / 1000;

  const population = basePopulation + elapsedSeconds * netPerSecond;
  const birthsToday = secondsSinceMidnight(now) * birthRatePerSecond;
  const deathsToday = secondsSinceMidnight(now) * deathRatePerSecond;
  const netToday = birthsToday - deathsToday;

  populationEl.textContent = formatInt(population);
  changeEl.textContent = `+${formatInt(elapsedSeconds * netPerSecond)} people since Jan 1, 2026 (model).`;
  birthsEl.textContent = formatInt(birthsToday);
  deathsEl.textContent = formatInt(deathsToday);
  netEl.textContent = formatInt(netToday);
}

function secondsSinceMidnight(date) {
  return date.getHours() * 3600 + date.getMinutes() * 60 + date.getSeconds();
}

function updateProjection() {
  const year = Number(yearSlider.value);
  yearOutput.textContent = year;

  const yearsFromBase = year - 2026;
  const annualNetGrowth = netPerSecond * 60 * 60 * 24 * 365.25;
  const projected = basePopulation + yearsFromBase * annualNetGrowth;

  projectionResult.textContent = `Projected population in ${year}: ${formatInt(projected)} (simple linear model).`;
}

function attachCardNavigation() {
  document.querySelectorAll('.clickable[data-target]').forEach((card) => {
    const activate = () => {
      const targetId = card.getAttribute('data-target');
      const target = document.getElementById(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };

    card.addEventListener('click', activate);
    card.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        activate();
      }
    });
  });
}

function attachFactButton() {
  randomFactBtn.addEventListener('click', () => {
    const randomIndex = Math.floor(Math.random() * facts.length);
    randomFactEl.textContent = facts[randomIndex];
  });
}

yearSlider.addEventListener('input', updateProjection);
attachCardNavigation();
attachFactButton();
updateProjection();
updateClock();
setInterval(updateClock, 1000);
