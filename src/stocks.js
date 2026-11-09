// Interactive Gang Stock Exchange Simulator & Candlestick Chart
import { sound } from './audio.js';

export function initStockWidget(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const stocks = {
    CARTEL: {
      name: "Cartel Holdings Corp",
      symbol: "CARTEL",
      price: 1420,
      change: 18.4,
      printers: 12,
      turf: "Industrial District (3 Flags)",
      dividends: "$45 / 90s",
      history: [1100, 1150, 1220, 1180, 1260, 1310, 1290, 1350, 1380, 1420]
    },
    GANG: {
      name: "Downtown Gang Ltd",
      symbol: "GANG",
      price: 2150,
      change: 34.1,
      printers: 18,
      turf: "Financial District (4 Flags)",
      dividends: "$85 / 90s",
      history: [1500, 1550, 1700, 1680, 1850, 1920, 1890, 2020, 2100, 2150]
    },
    MAFIA: {
      name: "La Cosa Nostra Gang",
      symbol: "MAFIA",
      price: 980,
      change: -4.2,
      printers: 7,
      turf: "Chinatown & Suburbs (2 Flags)",
      dividends: "$28 / 90s",
      history: [1120, 1080, 1050, 1020, 1000, 990, 1020, 970, 990, 980]
    }
  };

  let activeSymbol = "CARTEL";
  let isHalted = false;

  const tabs = container.querySelectorAll('[data-stock-tab]');
  const priceDisplay = container.querySelector('#stock-price');
  const changeDisplay = container.querySelector('#stock-change');
  const printersDisplay = container.querySelector('#stock-printers');
  const turfDisplay = container.querySelector('#stock-turf');
  const dividendDisplay = container.querySelector('#stock-dividend');
  const chartSvg = container.querySelector('#stock-chart-svg');
  const breakerStatus = container.querySelector('#stock-breaker-status');
  const shockBtn = container.querySelector('#stock-shock-btn');
  const captureBtn = container.querySelector('#stock-capture-btn');

  function render() {
    const s = stocks[activeSymbol];
    if (!s) return;

    if (priceDisplay) priceDisplay.textContent = `$${s.price.toLocaleString()}`;
    if (changeDisplay) {
      const isPos = s.change >= 0;
      changeDisplay.textContent = `${isPos ? '+' : ''}${s.change.toFixed(1)}%`;
      changeDisplay.className = isPos ? 'text-emerald-400 text-sm font-bold' : 'text-red-400 text-sm font-bold';
    }
    if (printersDisplay) printersDisplay.textContent = `${s.printers} Active Printers`;
    if (turfDisplay) turfDisplay.textContent = s.turf;
    if (dividendDisplay) dividendDisplay.textContent = s.dividends;

    if (breakerStatus) {
      if (isHalted) {
        breakerStatus.textContent = "CIRCUIT BREAKER TRIGGERED (TRADING HALTED)";
        breakerStatus.className = "text-xs font-mono font-bold text-red-400 bg-red-950/60 border border-red-500/40 px-3 py-1 rounded inline-block animate-pulse";
      } else {
        breakerStatus.textContent = "CIRCUIT BREAKER: CLEAR (NORMAL TRADING)";
        breakerStatus.className = "text-xs font-mono font-bold text-emerald-400 bg-emerald-950/40 border border-emerald-500/30 px-3 py-1 rounded inline-block";
      }
    }

    // Render SVG Candlestick / Polyline
    if (chartSvg) {
      const min = Math.min(...s.history) * 0.95;
      const max = Math.max(...s.history) * 1.05;
      const range = max - min || 1;
      const width = 500;
      const height = 180;

      const points = s.history.map((val, idx) => {
        const x = (idx / (s.history.length - 1)) * (width - 40) + 20;
        const y = height - 20 - ((val - min) / range) * (height - 40);
        return `${x},${y}`;
      }).join(' ');

      const strokeColor = s.change >= 0 ? '#34d399' : '#ef4444';
      const fillColor = s.change >= 0 ? 'rgba(52, 211, 153, 0.1)' : 'rgba(239, 68, 68, 0.1)';

      const firstX = 20;
      const lastX = width - 20;
      const bottomY = height - 10;
      const areaPath = `M ${firstX},${bottomY} L ${points.split(' ')[0]} ${points.split(' ').map(p => `L ${p}`).join(' ')} L ${lastX},${bottomY} Z`;

      chartSvg.innerHTML = `
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="${strokeColor}" stop-opacity="0.3"/>
            <stop offset="100%" stop-color="${strokeColor}" stop-opacity="0.0"/>
          </linearGradient>
        </defs>
        <path d="${areaPath}" fill="url(#chartGrad)"/>
        <polyline fill="none" stroke="${strokeColor}" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" points="${points}" />
        ${s.history.map((val, idx) => {
          const x = (idx / (s.history.length - 1)) * (width - 40) + 20;
          const y = height - 20 - ((val - min) / range) * (height - 40);
          return `<circle cx="${x}" cy="${y}" r="4" fill="#0b0f19" stroke="${strokeColor}" stroke-width="2" />`;
        }).join('')}
      `;
    }
  }

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      sound.playClick();
      tabs.forEach(t => {
        t.classList.remove('bg-sky-500/20', 'border-sky-400', 'text-sky-300');
        t.classList.add('bg-obsidian-800', 'border-obsidian-700', 'text-slate-400');
      });
      tab.classList.remove('bg-obsidian-800', 'border-obsidian-700', 'text-slate-400');
      tab.classList.add('bg-sky-500/20', 'border-sky-400', 'text-sky-300');

      activeSymbol = tab.getAttribute('data-stock-tab') || 'CARTEL';
      render();
    });
  });

  if (shockBtn) {
    shockBtn.addEventListener('click', () => {
      sound.playAlert();
      isHalted = true;
      const s = stocks[activeSymbol];
      s.price = Math.round(s.price * 0.78);
      s.change -= 16.5;
      s.history.push(s.price);
      s.history.shift();
      render();

      setTimeout(() => {
        isHalted = false;
        render();
      }, 4000);
    });
  }

  if (captureBtn) {
    captureBtn.addEventListener('click', () => {
      sound.playSuccess();
      const s = stocks[activeSymbol];
      s.price = Math.round(s.price * 1.15);
      s.change += 12.0;
      s.printers += 2;
      s.history.push(s.price);
      s.history.shift();
      render();
    });
  }

  render();
}
