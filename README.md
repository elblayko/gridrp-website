# GridRP Showcase Website

A modern, obsidian-glassmorphic static product showcase website for **GridRP (GRID)**, rebuilt from the ground up and inspired by **GangWars RP (2013 by mercior)** with custom systems and creative liberties by **Juicebox**.

## Highlights & Features

- **Not Another DarkRP Clone**: Built from scratch on the native Garry's Mod `sandbox` base rather than DarkRP derived code. Replaces passive printer-sitting with dynamic gang warfare, public equity markets, native L3 networking, and Metasploit cyber interdiction.
- **Origins & Creative Liberties**: Clear attribution to **mercior** for the original 2013 GangWars RP concept, with GridRP established as Juicebox's ground-up reimagining featuring his own custom systems and creative liberties.
- **Permanent World Persistence**: Player progression (bank accounts, inventory bags, gang vaults, territory control, and wanted records) persists permanently across sessions.
- **Obsidian Glassmorphic UI**: Conforms to the official GridRP design guidelines with dark obsidian cards (`#0b0f19` to `#0f172a`), semantic status badges, and rounded keycap tags (`[E]`, `[F4]`, `[~]`).
- **Interactive Cyber Terminal with Metasploit**: Functional in-browser CyberDeck OS v2.4 emulator (`help`, `about`, `darkrp`, `msf`, `use siphon`, `use overheat`, `nmap`, `botnet`, `airmon`, `aircrack`, `wan crack`, `wan status`, `ifconfig`, `ping`, `clear`).
- **Gang Stock Exchange Widget**: Interactive real-time candlestick SVG chart, dynamic pricing based on active printers and turf, circuit breaker shock simulation, and dividend yields.
- **Faction & Career Dossier**: Interactive tabs for Street Gangs, Citizens & Specialists, and Law Enforcement with verified job perks and loadouts.
- **Screenshot Slots & Lightbox**: Styled 1920x1080 preview frames with automatic replacement when actual screenshot images are placed into `public/assets/screenshots/`.
- **Web Audio API Synthesizer**: Tactical audio cues for terminal typing, button hovers, success chimes, and alerts with a persistent Mute toggle.
- **One-Click Server Connect**: Direct copy-to-clipboard button for `connect 127.0.0.1:27015` and `steam://connect` deep link.

## Quick Start

### Development Server
```bash
npm run dev
```

### Production Build
```bash
npm run build
```
The compiled, zero-dependency static files will be generated in `dist/`.

### Preview Production Build
```bash
npm run preview
```

## Adding Game Screenshots

Drop your 1920x1080 images into `public/assets/screenshots/`:
- `stock-exchange.webp`
- `turf-warfare.webp`
- `cyber-terminal.webp`
- `money-printers.webp`
- `auction-house.webp`
- `corrections-jail.webp`

## GitOps & DigitalOcean App Platform Environment Variables

For GitOps deployments (e.g. DigitalOcean App Platform, Cloudflare Pages, Vercel, Netlify), configuration variables are injected at build time (`npm run build`).

Set these in **DigitalOcean App Platform** under:
`App -> Settings -> Components -> gridrp-website -> Environment Variables`

| Variable | Description | Default Fallback |
| :--- | :--- | :--- |
| `VITE_SERVER_IP` | Game server IP address | `127.0.0.1` |
| `VITE_SERVER_PORT` | Game server port | `27015` |
| `VITE_CONNECT_COMMAND` | Custom console connect command | `connect <IP>:<PORT>` |
| `VITE_STEAM_CONNECT_URL` | Direct Steam protocol URL | `steam://connect/<IP>:<PORT>` |
| `VITE_DISCORD_URL` | Discord community invite link | `https://discord.gg/gridrp` |
| `VITE_WORKSHOP_URL` | Steam Workshop collection link | `https://steamcommunity.com/...` |
| `VITE_GITHUB_URL` | Project repository link | `https://github.com/gridrp` |
| `VITE_SERVER_NAME` | Public hostname banner | `[US-East] GridRP 2.0...` |
| `VITE_SERVER_MAP` | Active rotation map name | `rp_downtown_v4c_v2` |
| `VITE_SERVER_TICKRATE` | Server tickrate display | `66 Tick` |
| `VITE_SERVER_SLOTS` | Player capacity string | `32/32 Players` |
| `VITE_SERVER_STATUS` | Status badge text | `ONLINE` |

A sample template is provided in [.env.example](file:///c:/Users/Blake/Desktop/Projects/gridrp-website/.env.example). Local development defaults are saved in [.env](file:///c:/Users/Blake/Desktop/Projects/gridrp-website/.env).
