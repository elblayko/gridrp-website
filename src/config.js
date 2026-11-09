// GridRP Centralized Site Configuration & Metadata
// Supports GitOps environment variable injection via Vite (import.meta.env)
// and DigitalOcean App Platform build-time variables.

const getEnv = (key, fallback) => {
  if (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env[key] !== undefined && import.meta.env[key] !== '') {
    return import.meta.env[key];
  }
  return fallback;
};

const serverIp = getEnv('VITE_SERVER_IP', '127.0.0.1');
const serverPort = getEnv('VITE_SERVER_PORT', '27015');
const connectCommand = getEnv('VITE_CONNECT_COMMAND', `connect ${serverIp}:${serverPort}`);
const steamConnectUrl = getEnv('VITE_STEAM_CONNECT_URL', `steam://connect/${serverIp}:${serverPort}`);

export const SITE_CONFIG = {
  name: getEnv('VITE_SITE_NAME', "GridRP"),
  subtitle: getEnv('VITE_SITE_SUBTITLE', "Tactical Garry's Mod Roleplay Gamemode"),
  version: getEnv('VITE_SITE_VERSION', "v2.0.0 (2026)"),
  author: getEnv('VITE_AUTHOR_NAME', "Juicebox"),

  // Heritage & Origins (GangWars RP 2013 by mercior)
  legacy: {
    title: getEnv('VITE_LEGACY_TITLE', "Inspired by GangWars RP (2013)"),
    originalCreator: "mercior",
    originalYear: "2013",
    authorRole: "Former Developer & Senior Administrator",
    tagline: "Not another DarkRP clone--rebuilt from the ground up with custom systems and creative liberties",
    description: "GridRP is not another DarkRP clone. Built from scratch on the native Garry's Mod sandbox base rather than DarkRP derived code, GridRP is a distinct ground-up reimagining inspired by the original GangWars RP created in 2013 by mercior. Developed by Juicebox--who served as a developer and senior administrator on GangWars RP back in the day--GridRP replaces generic job loops with deep custom systems: real-time Gang Stock Exchanges, native L3 network engineering, in-game Metasploit cyber warfare, and persistent progression across sessions.",
  },

  // Connection & Community Links
  server: {
    name: getEnv('VITE_SERVER_NAME', "[US-East] GridRP 2.0 | Gang Stock Exchange | Cloud Botnet | Turf Rackets"),
    ip: serverIp,
    port: serverPort,
    connectCommand: connectCommand,
    steamConnectUrl: steamConnectUrl,
    map: getEnv('VITE_SERVER_MAP', "rp_downtown_v4c_v2"),
    tickrate: getEnv('VITE_SERVER_TICKRATE', "66 Tick"),
    slots: getEnv('VITE_SERVER_SLOTS', "32/32 Players"),
    status: getEnv('VITE_SERVER_STATUS', "ONLINE"),
    persistence: getEnv('VITE_SERVER_PERSISTENCE', "Persistent Progression (Inventories, Gang Vaults, and Turf persist across sessions)"),
  },

  community: {
    discord: getEnv('VITE_DISCORD_URL', "https://discord.gg/gridrp"),
    steamGroup: getEnv('VITE_STEAM_GROUP_URL', "https://steamcommunity.com/groups/gridrp"),
    workshopCollection: getEnv('VITE_WORKSHOP_URL', "https://steamcommunity.com/sharedfiles/filedetails/?id=gridrp"),
    github: getEnv('VITE_GITHUB_URL', "https://github.com/gridrp"),
  },

  // Screenshot Placeholders & Key Elements
  screenshots: [
    {
      id: "stock-exchange",
      title: "Gang Stock Exchange & Candlestick Charts",
      category: "Economy",
      description: "Gangs launch public IPOs. Real-time dynamic pricing, ticker tapes, combat circuit breakers, and automated dividend payouts.",
      path: "assets/screenshots/stock-exchange.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "Market Engine",
      color: "grid-emerald"
    },
    {
      id: "turf-warfare",
      title: "Turf Warfare & Protection Rackets",
      category: "Street Gangs",
      description: "Contested territory flag poles with 15s captures, dividend payouts, police incursion radar alerts, and 5%-30% extortion taxes.",
      path: "assets/screenshots/turf-warfare.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "Territory",
      color: "grid-amber"
    },
    {
      id: "cyber-terminal",
      title: "CyberDeck OS & Metasploit Terminals",
      category: "Cyber Warfare",
      description: "CyberDeck OS v2.4 PC terminals with Metasploit modules (cash siphon & thermal overheat), nmap, and Cloud Botnet C2 daemons.",
      path: "assets/screenshots/cyber-terminal.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "CyberDeck OS",
      color: "grid-cyan"
    },
    {
      id: "money-printers",
      title: "Thermodynamic Printers & Radial Venting",
      category: "Contraband",
      description: "Bronze, Silver, and Diamond printers featuring dynamic heat simulation, undervolt/overclock modules, and radial sweet-spot venting minigames.",
      path: "assets/screenshots/money-printers.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "Thermodynamics",
      color: "grid-red"
    },
    {
      id: "auction-house",
      title: "Two-Tier Player Auction House",
      category: "Commerce",
      description: "Real-time bidding, instant buyouts, 7.5% house tax sinks, crafter signatures, elemental modifiers, and database collection escrow.",
      path: "assets/screenshots/auction-house.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "Trading",
      color: "grid-cyan"
    },
    {
      id: "corrections-jail",
      title: "Multi-Cell Corrections & Forensics",
      category: "Law Enforcement",
      description: "Persistent multi-cell jail sentences, ragdoll conductive Tasers, crime scene ballistic forensics, and SWAT ram raids.",
      path: "assets/screenshots/corrections-jail.webp",
      aspectRatio: "16:9 (1920x1080)",
      badge: "Justice",
      color: "grid-teal"
    }
  ],

  // Factions & Exact Job Loadouts from gamemode/factions/sh_factions.lua
  factions: [
    {
      id: "gangs",
      name: "Street Gangs",
      tagline: "Territory, Extortion & Street Gang Dominance",
      color: "#ef4444",
      accent: "text-red-400 border-red-500/30 bg-red-500/10",
      description: "Armed criminal gangs operating in the shadow of urban decay. Wage turf wars over contested flag poles, enforce protection rackets against civilian operations, purchase black market weapons, and launch gang IPOs to dominate the underworld economy.",
      jobs: [
        {
          name: "Gang Leader",
          role: "Gang Boss & Commander",
          weapons: "Fists, 50 Armor",
          perk: "Commands player gang, initiates gang IPOs, sets turf tax rates, finances heavy weapon shipments"
        },
        {
          name: "Gangster",
          role: "Street Soldier & Enforcer",
          weapons: "Fists",
          perk: "Turf Defender combat bonus (+$100 and +100 XP per slain officer); purchases firearms from dealers"
        },
        {
          name: "Thief",
          role: "Silent Infiltrator",
          weapons: "Fists, Tactical Lockpick",
          perk: "Breaches civilian doors, silent vault cracks, and dead-drop initiation clearance"
        },
        {
          name: "Hitman",
          role: "Contract Assassin",
          weapons: "Fists, Tactical Lockpick, 30 Armor",
          perk: "Executes anonymous phone hit contracts with automated escrow payouts"
        },
        {
          name: "Black Market Dealer",
          role: "Contraband Arms Smuggler",
          weapons: "Fists",
          perk: "Exclusive supplier of military firearms (AK-47, Desert Eagle), Lockpick Crates, and Adrenaline"
        }
      ]
    },
    {
      id: "civilians",
      name: "Citizens & Specialists",
      tagline: "Enterprise Commerce & Cyber Warfare",
      color: "#38bdf8",
      accent: "text-sky-400 border-sky-500/30 bg-sky-500/10",
      description: "The economic backbone of the city. Construct fortified bases, wire multi-printer server rooms, build medical clinic pods, scavenge urban salvage for the Recycler Depot, and execute Metasploit exploits on native L3 network switches.",
      jobs: [
        {
          name: "Cyber Engineer",
          role: "Network Architect & Infiltrator",
          weapons: "Fists, Network Wiring Tool, 10 Armor",
          perk: "Root clearance for Metasploit console, Supercharges hardware with Cryo Calibrators, deploys Botnet C2"
        },
        {
          name: "Security Contractor",
          role: "Armed Asset Protection",
          weapons: "Fists, Stun Baton, 50 Armor",
          perk: "Hired vault and base guard; equipped with 50 Armor and defensive stunstick"
        },
        {
          name: "Arms Dealer",
          role: "Firearms Merchant",
          weapons: "Fists",
          perk: "Orders wholesale firearm shipments and ammunition crates to supply citizens and street gangs"
        },
        {
          name: "Pharmacist",
          role: "Physician & Bio-Chemist",
          weapons: "Fists, Medical Kit",
          perk: "Deploys automated Clinic Pods that sell combat buffs & heals; administers field Adrenaline stims"
        },
        {
          name: "Hobo",
          role: "Street Scavenger & Vagrant",
          weapons: "Fists, Bugbait",
          perk: "Fast street dumpster search hold, builds scrap shacks, and earns +15% Recycler Depot combo yields"
        },
        {
          name: "Citizen",
          role: "Urban Resident",
          weapons: "Fists",
          perk: "Builds fortified compounds, operates money printers, and trades on the Auction House"
        }
      ]
    },
    {
      id: "police",
      name: "Law Enforcement",
      tagline: "Urban Pacification & Contraband Interdiction",
      color: "#3b82f6",
      accent: "text-blue-400 border-blue-500/30 bg-blue-500/10",
      description: "Authorized civil defense forces upholding order. Conduct wireless contraband scans, execute dynamic tactical breaches with the SWAT Battering Ram, deploy conductive Tasers, and trigger Citywide Martial Law.",
      jobs: [
        {
          name: "Police Officer",
          role: "Patrol Interceptor",
          weapons: "Fists, Glock, Stunstick, Conductive Taser, Contraband Scanner, 30 Armor",
          perk: "Rapid sprint (350 speed), arrests wanted suspects, wireless contraband detection, +50% print bounty"
        },
        {
          name: "SWAT Specialist",
          role: "Heavy Siege Breacher",
          weapons: "Fists, Tactical Shotgun, Battering Ram, Stunstick, Conductive Taser, 100 Armor",
          perk: "Heavy 100 Armor siege tank; instant door breach with Battering Ram and non-lethal crowd pacification"
        },
        {
          name: "Police Chief",
          role: "Civil Protection Commander",
          weapons: "Fists, Desert Eagle, Tactical Shotgun, Stunstick, Conductive Taser, 50 Armor",
          perk: "Directs precinct raids, approves search warrants, and commands tactical responses"
        },
        {
          name: "Mayor",
          role: "Municipal Executive",
          weapons: "Fists, Desert Eagle, 25 Armor",
          perk: "Declares citywide emergency lockdowns, authorizes search warrants, and regulates municipal city taxes"
        }
      ]
    }
  ]
};
