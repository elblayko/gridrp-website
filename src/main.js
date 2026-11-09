// Main Application Entrypoint for GridRP Showcase
import './style.css';
import { SITE_CONFIG } from './config.js';
import { sound } from './audio.js';
import { initTerminal } from './terminal.js';
import { initStockWidget } from './stocks.js';
import { initFactions } from './factions.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Dynamic Configuration Hydration from GitOps / Environment Variables
  function hydrateDynamicConfig() {
    // Update connect command text blocks
    document.querySelectorAll('[data-config-text="connect-command"]').forEach(el => {
      el.textContent = SITE_CONFIG.server.connectCommand;
    });

    // Update server IP text
    document.querySelectorAll('[data-config-text="server-ip"]').forEach(el => {
      el.textContent = SITE_CONFIG.server.ip;
    });

    // Update server port text
    document.querySelectorAll('[data-config-text="server-port"]').forEach(el => {
      el.textContent = SITE_CONFIG.server.port;
    });

    // Update Steam direct launch hrefs
    document.querySelectorAll('[data-config-href="steam-connect"]').forEach(el => {
      el.setAttribute('href', SITE_CONFIG.server.steamConnectUrl);
    });

    // Update Discord community hrefs
    document.querySelectorAll('[data-config-href="discord"]').forEach(el => {
      el.setAttribute('href', SITE_CONFIG.community.discord);
    });

    // Update Steam Workshop collection hrefs
    document.querySelectorAll('[data-config-href="workshop"]').forEach(el => {
      el.setAttribute('href', SITE_CONFIG.community.workshopCollection);
    });

    // Update GitHub hrefs
    document.querySelectorAll('[data-config-href="github"]').forEach(el => {
      el.setAttribute('href', SITE_CONFIG.community.github);
    });
  }

  hydrateDynamicConfig();

  // 1. Audio Mute Toggle Button
  const audioToggleBtn = document.getElementById('audio-toggle-btn');
  const audioIcon = document.getElementById('audio-icon');

  function updateAudioUi() {
    if (!audioToggleBtn || !audioIcon) return;
    const muted = sound.isMuted();
    audioToggleBtn.setAttribute('title', muted ? 'Unmute Audio' : 'Mute Audio');
    if (muted) {
      audioIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500">
          <line x1="1" y1="1" x2="23" y2="23"></line>
          <path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path>
          <path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path>
          <line x1="12" y1="19" x2="12" y2="23"></line>
          <line x1="8" y1="23" x2="16" y2="23"></line>
        </svg>
      `;
    } else {
      audioIcon.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-sky-400">
          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
          <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
        </svg>
      `;
    }
  }

  if (audioToggleBtn) {
    audioToggleBtn.addEventListener('click', () => {
      const isMuted = sound.toggleMute();
      updateAudioUi();
      if (!isMuted) sound.playSuccess();
    });
    updateAudioUi();
  }

  // 2. Copy IP Buttons
  const copyIpBtns = document.querySelectorAll('[data-copy-ip]');
  copyIpBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      sound.playClick();
      navigator.clipboard?.writeText(SITE_CONFIG.server.connectCommand);
      sound.playSuccess();

      const originalHtml = btn.innerHTML;
      btn.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-400 inline mr-1">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
        <span class="text-emerald-400 font-bold">COPIED TO CLIPBOARD!</span>
      `;
      setTimeout(() => {
        btn.innerHTML = originalHtml;
      }, 2500);
    });
  });

  // 3. Render Screenshot Placeholders
  const screenshotGrid = document.getElementById('screenshot-grid');
  const modal = document.getElementById('screenshot-modal');
  const modalImgContainer = document.getElementById('modal-img-container');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalPath = document.getElementById('modal-path');
  const modalClose = document.getElementById('modal-close');

  if (screenshotGrid) {
    screenshotGrid.innerHTML = '';
    SITE_CONFIG.screenshots.forEach(item => {
      const card = document.createElement('div');
      card.className = "obsidian-card rounded-xl overflow-hidden group cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-cyan-glow flex flex-col";
      card.innerHTML = `
        <div class="relative aspect-video w-full bg-obsidian-900 border-b border-obsidian-700/80 scanline-grid overflow-hidden flex items-center justify-center">
          <!-- Fallback Image with auto error handling -->
          <img src="${item.path}" alt="${item.title}" class="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';" />
          
          <!-- Mockup SVG Placeholder (Shown when screenshot isn't added yet) -->
          <div class="w-full h-full flex flex-col items-center justify-center p-6 text-center z-10 bg-gradient-to-b from-obsidian-900/90 to-obsidian-950/95">
            <div class="w-12 h-12 rounded-lg bg-obsidian-800 border border-obsidian-700 flex items-center justify-center text-sky-400 mb-3 group-hover:border-sky-400 group-hover:scale-110 transition-all duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
            <span class="text-xs uppercase font-mono tracking-widest text-sky-400/90 font-bold mb-1">${item.category}</span>
            <h4 class="text-sm font-bold text-white mb-2">${item.title}</h4>
            <div class="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-obsidian-800/90 border border-obsidian-700 text-[11px] font-mono text-slate-400">
              <span>Placeholder:</span>
              <code class="text-amber-400">${item.path}</code>
            </div>
          </div>

          <div class="absolute top-3 right-3 z-20">
            <span class="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-obsidian-900/90 text-slate-300 border border-obsidian-700">${item.badge}</span>
          </div>
        </div>

        <div class="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div class="flex items-center justify-between mb-2">
              <h3 class="text-base font-bold text-slate-100 group-hover:text-sky-300 transition-colors">${item.title}</h3>
              <span class="text-[11px] font-mono text-slate-500">${item.aspectRatio}</span>
            </div>
            <p class="text-xs text-slate-400 leading-relaxed">${item.description}</p>
          </div>
          <div class="mt-4 pt-3 border-t border-obsidian-700/60 flex items-center justify-between text-xs text-sky-400/90 group-hover:text-sky-300 font-medium">
            <span>Click to inspect slot</span>
            <span class="keycap group-hover:border-sky-400">ZOOM</span>
          </div>
        </div>
      `;

      card.addEventListener('mouseenter', () => sound.playHover());
      card.addEventListener('click', () => {
        sound.playClick();
        if (modal) {
          modalTitle.textContent = item.title;
          modalDesc.textContent = item.description;
          modalPath.textContent = item.path;
          modalImgContainer.innerHTML = `
            <img src="${item.path}" alt="${item.title}" class="max-h-[70vh] w-auto mx-auto object-contain rounded-lg" onerror="this.outerHTML='<div class=\\'aspect-video w-full max-w-3xl mx-auto rounded-lg bg-obsidian-900 border border-obsidian-700 flex flex-col items-center justify-center p-8 text-center\\'><div class=\\'text-amber-400 font-mono text-sm mb-2\\'>[SCREENSHOT PLACEHOLDER]</div><p class=\\'text-xs text-slate-400 mb-4\\'>Drop your 1920x1080 screenshot file at:</p><code class=\\'bg-obsidian-950 px-4 py-2 rounded text-sky-400 border border-obsidian-700 text-xs font-mono mb-2\\'>${item.path}</code><p class=\\'text-[11px] text-slate-500\\'>Once placed in the public/assets directory, it will automatically render here.</p></div>';" />
          `;
          modal.classList.remove('hidden');
          modal.classList.add('flex');
          sound.playSuccess();
        }
      });

      screenshotGrid.appendChild(card);
    });
  }

  // Close Modal
  if (modalClose && modal) {
    modalClose.addEventListener('click', () => {
      sound.playClick();
      modal.classList.add('hidden');
      modal.classList.remove('flex');
    });
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        sound.playClick();
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        modal.classList.add('hidden');
        modal.classList.remove('flex');
      }
    });
  }

  // 4. Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      sound.playClick();
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // 5. Initialize Interactive Subsystems
  initTerminal('cyber-terminal-card');
  initStockWidget('stock-widget-card');
  initFactions('factions-widget-card');
});
