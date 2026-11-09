// Factions & Quality Item Card Inspector
import { sound } from './audio.js';
import { SITE_CONFIG } from './config.js';

export function initFactions(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const factionBtns = container.querySelectorAll('[data-faction-tab]');
  const factionNameEl = container.querySelector('#faction-name');
  const factionTaglineEl = container.querySelector('#faction-tagline');
  const factionDescEl = container.querySelector('#faction-desc');
  const jobsListEl = container.querySelector('#faction-jobs-list');

  let activeFactionId = 'gangs';

  function render() {
    const faction = SITE_CONFIG.factions.find(f => f.id === activeFactionId) || SITE_CONFIG.factions[0];
    if (!faction) return;

    if (factionNameEl) factionNameEl.textContent = faction.name;
    if (factionTaglineEl) factionTaglineEl.textContent = faction.tagline;
    if (factionDescEl) factionDescEl.textContent = faction.description;

    if (jobsListEl) {
      jobsListEl.innerHTML = '';
      faction.jobs.forEach(job => {
        const card = document.createElement('div');
        card.className = "bg-obsidian-800/80 border border-obsidian-700/80 hover:border-sky-500/50 rounded-lg p-4 transition-all duration-200 group";
        card.innerHTML = `
          <div class="flex items-center justify-between mb-2">
            <span class="text-white font-bold text-base group-hover:text-sky-300 transition-colors">${job.name}</span>
            <span class="text-xs font-semibold px-2 py-0.5 rounded bg-obsidian-900/80 text-slate-300 border border-obsidian-700">${job.role}</span>
          </div>
          <p class="text-xs text-slate-400 mb-2 leading-relaxed"><strong class="text-slate-300">Tactical Perk:</strong> ${job.perk}</p>
          <div class="text-[11px] text-slate-500 font-mono">Loadout: ${job.weapons}</div>
        `;
        card.addEventListener('mouseenter', () => sound.playHover());
        jobsListEl.appendChild(card);
      });
    }
  }

  factionBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      factionBtns.forEach(b => {
        b.classList.remove('bg-sky-500/20', 'border-sky-400', 'text-sky-300');
        b.classList.add('bg-obsidian-800', 'border-obsidian-700', 'text-slate-400');
      });
      btn.classList.remove('bg-obsidian-800', 'border-obsidian-700', 'text-slate-400');
      btn.classList.add('bg-sky-500/20', 'border-sky-400', 'text-sky-300');

      activeFactionId = btn.getAttribute('data-faction-tab') || 'gangs';
      render();
    });
  });

  render();
}
