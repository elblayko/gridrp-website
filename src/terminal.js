// Authentic CyberDeck OS v2.4 Terminal Emulator
// Matches entities/entities/grid_computer/cl_init.lua and init.lua exactly.
import { sound } from './audio.js';

export function initTerminal(containerId) {
  const container = document.getElementById(containerId);
  if (!container) return;

  const terminalOutput = container.querySelector('#term-output');
  const terminalInput = container.querySelector('#term-input');
  const terminalForm = container.querySelector('#term-form');
  const termPromptLabel = container.querySelector('#term-prompt-label');
  const termHeaderTitle = container.querySelector('#term-header-title');

  if (!terminalOutput || !terminalInput || !terminalForm || !termPromptLabel) return;

  const history = [];
  let historyIndex = -1;

  let inMSF = false;
  let currentMSFMod = "cash_siphon"; // "cash_siphon" or "thermal_overheat"
  let botnetActive = false;
  let botnetCycles = 0;
  let botnetTotalEarned = 0;

  // Exact color palette from cl_init.lua (ColorPalette)
  const colors = {
    white: "text-[#f0f0f0]",
    green: "text-[#4ade80]",
    cyan: "text-[#38bdf8]",
    yellow: "text-[#facc15]",
    red: "text-[#f87171]",
    blue: "text-[#818cf8]",
    muted: "text-[#94a3b8]",
    dark: "text-[#64748b]",
    highlight: "text-[#fbbf24]"
  };

  function updatePrompt() {
    if (inMSF) {
      termPromptLabel.textContent = `msf6 exploit(${currentMSFMod})> `;
      termPromptLabel.className = "text-[#fbbf24] font-mono font-bold text-xs sm:text-sm select-none whitespace-pre";
      terminalInput.placeholder = "type 'run 192.168.1.41', 'use overheat', 'show modules', 'back'...";
    } else {
      termPromptLabel.textContent = "root@cyberdeck:~# ";
      termPromptLabel.className = "text-[#4ade80] font-mono font-bold text-xs sm:text-sm select-none whitespace-pre";
      terminalInput.placeholder = "type 'help', 'nmap', 'airmon', 'wan crack', 'botnet start', 'msf'...";
    }
  }

  function appendLine(text, colorKey = "white") {
    const line = document.createElement('div');
    const colorClass = colors[colorKey] || colors.white;
    line.className = `${colorClass} whitespace-pre-wrap leading-relaxed select-text font-mono text-xs sm:text-sm`;
    line.textContent = text;
    terminalOutput.appendChild(line);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  }

  // Exact Welcome Banner from entities/entities/grid_computer/cl_init.lua (lines 165-193)
  function renderInitialBanner() {
    terminalOutput.innerHTML = '';
    appendLine("================================================================================", "dark");
    appendLine("  CYBERDECK OPERATING SYSTEM - KERNEL 2.4.19 (x86_64)", "cyan");
    appendLine("  Local Host IP     : 192.168.1.15", "green");
    appendLine("  Broadcast Domain  : 192.168.1.0/24 (Gateway: 192.168.1.1)", "white");
    appendLine("  Ethernet Status   : CONNECTED (eth0 UP, 1000BASE-T Full Duplex)", "green");
    appendLine("  Cloud Botnet C2   : IDLE - Type 'botnet start' to launch cloud attacks (Requires WAN Uplink).", "highlight");
    appendLine("--------------------------------------------------------------------------------", "dark");
    appendLine("  Type 'help' to list available commands.", "white");
    appendLine("================================================================================", "dark");
    appendLine(" ", "muted");
  }

  renderInitialBanner();
  updatePrompt();

  terminalInput.addEventListener('keydown', (e) => {
    sound.playKey();
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0 && historyIndex < history.length - 1) {
        historyIndex++;
        terminalInput.value = history[history.length - 1 - historyIndex];
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        historyIndex--;
        terminalInput.value = history[history.length - 1 - historyIndex];
      } else if (historyIndex === 0) {
        historyIndex = -1;
        terminalInput.value = '';
      }
    }
  });

  terminalForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const rawVal = terminalInput.value.trim();
    if (!rawVal) return;

    sound.playClick();
    history.push(rawVal);
    historyIndex = -1;

    const promptPrefix = inMSF ? termPromptLabel.textContent : "root@cyberdeck:~# ";
    appendLine(promptPrefix + rawVal, "highlight");
    terminalInput.value = '';

    executeCommand(rawVal);
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
  });

  function executeCommand(val) {
    const parts = val.trim().split(/\s+/);
    const cmdLower = val.toLowerCase().trim();
    const c1 = parts[0] ? parts[0].toLowerCase() : "";
    const c2 = parts[1] ? parts[1].toLowerCase() : "";
    const c3 = parts[2] ? parts[2].toLowerCase() : "";

    // 1. CLEAR COMMAND
    if (cmdLower === "clear") {
      terminalOutput.innerHTML = '';
      appendLine("Terminal cleared.", "muted");
      return;
    }

    // 2. MSF CONSOLE MODE EXECUTION (lines 278-332 in cl_init.lua)
    if (inMSF) {
      if (cmdLower === "exit" || cmdLower === "quit" || cmdLower === "back") {
        inMSF = false;
        updatePrompt();
        appendLine("Exited Metasploit Framework console.", "muted");
        sound.playClick();
        return;
      }

      if (c1 === "use") {
        if (c2.includes("overheat") || c2.includes("thermal") || c2.includes("synth") || c2.includes("meltdown")) {
          currentMSFMod = "thermal_overheat";
          appendLine("[+] Loaded module: exploit/multi/thermal_overheat", "red");
          appendLine("[*] Description : Overclocks thermal elements to detonate target printer or synthesizer", "muted");
          appendLine("[*] Target      : Money Printers & Material Synthesizers", "muted");
          appendLine("[*] Ready. Type 'run <ip>' or 'exploit <ip>' to execute against target.", "highlight");
          sound.playAlert();
        } else if (c2.includes("siphon") || c2.includes("cash")) {
          currentMSFMod = "cash_siphon";
          appendLine("[+] Loaded module: exploit/printer/cash_siphon", "green");
          appendLine("[*] Description : Bypasses EEPROM vault lockbox to extract all stored cash", "muted");
          appendLine("[*] Target      : Money Printers only", "muted");
          appendLine("[*] Ready. Type 'run <ip>' or 'exploit <ip>' to execute against target.", "highlight");
          sound.playSuccess();
        } else {
          appendLine("[-] Unknown module. Available modules:", "yellow");
          appendLine("  use siphon    - Exploit lockbox & siphon stored cash (Printers)", "green");
          appendLine("  use overheat  - Overclock & detonate target (Printers & Synthesizers)", "red");
        }
        updatePrompt();
        return;
      }

      if (cmdLower === "help") {
        appendLine("=== Metasploit Console Commands ===", "cyan");
        appendLine("  use <siphon|overheat>   - Select target exploit payload", "white");
        appendLine("  run <ip> / exploit <ip>  - Execute against target IP address", "white");
        appendLine("  show modules            - Enumerate available exploit payloads", "white");
        appendLine("  exit / back             - Return to CyberDeck OS root shell", "white");
        return;
      }

      if (cmdLower === "show modules" || cmdLower === "modules" || cmdLower === "show") {
        renderMSFBanner();
        return;
      }

      if (c1 === "run" || c1 === "exploit") {
        const targetIP = c2 || "192.168.1.41";
        executeExploit(currentMSFMod, targetIP);
        return;
      }

      appendLine(`[-] Unknown command '${val}'. Type 'help' or 'show modules'.`, "yellow");
      return;
    }

    // 3. ROOT SHELL COMMANDS (init.lua lines 378-1524)
    if (cmdLower === "msf" || cmdLower === "msfconsole") {
      inMSF = true;
      currentMSFMod = "cash_siphon";
      updatePrompt();
      renderMSFBanner();
      sound.playSuccess();
      return;
    }

    if (c1 === "help") {
      appendLine("=== CyberDeck OS - Built-in Shell Utility Commands ===", "cyan");
      appendLine("  botnet       - Launch automated Cloud Botnet C2 daemon (Requires WAN Uplink)", "green");
      appendLine("  nmap         - Scan reachable broadcast domain & routed WAN mesh device IP addresses", "white");
      appendLine("  msf          - Launch Metasploit Framework console (Cyber Engineer only)", "highlight");
      appendLine("  airmon       - Scan wireless airspace for active Satellite WAN Uplink transmitters", "cyan");
      appendLine("  wan crack    - Capture handshake & crack encryption key (alias: 'aircrack <bssid>')", "yellow");
      appendLine("  wan connect  - Associate CyberDeck Mobile Handset with a wireless WAN mesh key", "green");
      appendLine("  wan status   - Display active Satellite WAN gateway status & peer subnets", "white");
      appendLine("  ifconfig     - Show local ethernet/wireless adapter status, IP, netmask & gateway", "white");
      appendLine("  ping <ip>    - Test connectivity to an IP address across local and WAN subnets", "white");
      appendLine("  clear        - Clear the terminal screen buffer", "white");
      appendLine("  exit         - Close the terminal session", "white");
      appendLine("Tip: Type 'msf' to enter Metasploit console, then type 'help' for exploit commands.", "muted");
      return;
    }

    if (c1 === "ifconfig" || c1 === "ip") {
      appendLine("eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500", "white");
      appendLine("        inet 192.168.1.15  netmask 255.255.255.0  broadcast 192.168.1.255", "green");
      appendLine("        ether 02:42:C0:00:00:15  txqueuelen 1000  (Ethernet)", "muted");
      appendLine("        gateway: 192.168.1.1 (Switch on Port 2)", "cyan");
      appendLine("wan0: flags=4163<UP,POINTOPOINT,RUNNING>  mtu 1420 (Satellite WAN Gateway)", "white");
      appendLine("        inet 45.33.102.18  wan_key ORBIT-7X  status: TUNNEL UP (3 Peers)", "cyan");
      return;
    }

    if (c1 === "ping") {
      const pingTarget = c2 || "192.168.1.1";
      appendLine(`PING ${pingTarget} (${pingTarget}) 56(84) bytes of data.`, "muted");
      setTimeout(() => {
        appendLine(`64 bytes from ${pingTarget}: icmp_seq=1 ttl=64 time=0.24 ms`, "green");
        appendLine(`64 bytes from ${pingTarget}: icmp_seq=2 ttl=64 time=0.19 ms`, "green");
        appendLine(`64 bytes from ${pingTarget}: icmp_seq=3 ttl=64 time=0.31 ms`, "green");
        appendLine(`--- ${pingTarget} ping statistics --- 3 packets transmitted, 3 received, 0% packet loss`, "cyan");
        sound.playSuccess();
      }, 250);
      return;
    }

    if (c1 === "airmon" || c1 === "airodump" || (c1 === "wan" && (c2 === "scan" || c2 === "recon"))) {
      appendLine("[*] Airmon-ng 1.7 - Wireless Airspace Reconnaissance (Max Range: 2500u)", "cyan");
      appendLine("[+] Sniffing 2.4/5.8GHz Satellite Relay bands... Found 2 active signal(s) in range.", "muted");
      appendLine("--------------------------------------------------------------------------------", "dark");
      appendLine("BSSID              PWR  DIST   CH  ENC      SUBNET          SSID", "highlight");
      appendLine("02:42:AC:12:00:03  -52dBm  420u   6  WPA3-ENT 192.168.1.0/24  Downtown_WAN_Relay_01 [BOTNET ACTIVE]", "highlight");
      appendLine("02:42:AC:12:00:08  -78dBm 1850u  11  WPA3-ENT 192.168.2.0/24  BankDistrict_Mesh_WAN", "green");
      appendLine("--------------------------------------------------------------------------------", "dark");
      appendLine("Tip: Type 'aircrack 02:42:AC:12:00:03' or 'wan crack' to capture handshake & crack key.", "muted");
      return;
    }

    if ((c1 === "wan" && (c2 === "crack" || c2 === "brute")) || c1 === "aircrack" || c1 === "aircrack-ng") {
      const bssid = (c1 === "aircrack" || c1 === "aircrack-ng") ? (parts[1] || "02:42:AC:12:00:03") : (parts[2] || "02:42:AC:12:00:03");
      appendLine(`[*] Initiating deauthentication attack against ${bssid} (Signal: -52dBm, Distance: 420u)...`, "muted");
      setTimeout(() => {
        appendLine("[+] WPA3/AES 4-way handshake captured!", "green");
        appendLine("[*] Running dictionary attack against GPU wordlist...", "muted");
        setTimeout(() => {
          appendLine("[+] KEY CRACKED! Plaintext Encryption Key: [ ORBIT-7X ]", "highlight");
          appendLine("[*] Associated Subnet: 192.168.1.0/24 (3 Mesh Peers)", "cyan");
          sound.playSuccess();
        }, 300);
      }, 250);
      return;
    }

    if (c1 === "wan" && (c2 === "status" || c2 === "")) {
      appendLine("=== Satellite WAN Uplink Status ===", "cyan");
      appendLine("Attached Gateway : 45.33.102.18 (eth0 Switch Uplink)", "white");
      appendLine("Encryption Key   : ORBIT-7X (WPA3-Enterprise)", "highlight");
      appendLine("Tunnel Interface : wan0 (AES-256-GCM L3 Tunnel Router)", "green");
      appendLine("Linked Mesh Peers: 3 Remote Subnets", "white");
      return;
    }

    if (c1 === "botnet" || c1 === "c2") {
      if (c2 === "start" || c2 === "run") {
        botnetActive = true;
        appendLine("=== Cloud Botnet C2 Daemon Initialized (v4.2-hydra) ===", "cyan");
        appendLine("[+] Satellite WAN Tunnel Up : Gateway 45.33.102.18 (Key: ORBIT-7X)", "green");
        appendLine("[+] Compute Cluster Nodes   : 3 Money Printers attached (3 active hash nodes)", "white");
        appendLine("[+] Automated Payout Rate   : +$420 every 20s (Direct to wallet) [Cyber Engineer +25% Bonus Active]", "highlight");
        appendLine("[!] WARNING: Active C2 traffic flags your Satellite WAN Uplink as [BOTNET ACTIVE] on wireless airmon scans.", "yellow");
        appendLine("[*] Launching continuous automated attacks against remote cloud targets...", "muted");
        sound.playSuccess();
      } else if (c2 === "stop" || c2 === "kill") {
        if (!botnetActive) {
          appendLine("[-] botnet: No active Cloud Botnet C2 daemon is running on this terminal.", "yellow");
        } else {
          botnetActive = false;
          botnetCycles += 3;
          botnetTotalEarned += 1260;
          appendLine("[+] Cloud Botnet C2 daemon gracefully terminated.", "green");
          appendLine(`    Completed Attack Cycles : ${botnetCycles}  |  Total Session Siphoned : $${botnetTotalEarned.toLocaleString()}`, "cyan");
          sound.playClick();
        }
      } else {
        appendLine("=== Cloud Botnet C2 Daemon Status ===", "cyan");
        appendLine(`Status: ${botnetActive ? 'ACTIVE (v4.2-hydra)' : 'IDLE'}`, botnetActive ? 'highlight' : 'white');
        appendLine("Cluster Nodes: 3 Money Printers attached", "white");
        appendLine("Current Yield: +$420 / 20s (Direct to wallet)", "green");
        appendLine("Current Target: Apex Financial Cloud (OAuth Token Replay)", "muted");
        appendLine("Tip: Type 'botnet start' to run attacks, or 'botnet stop' to halt.", "muted");
      }
      return;
    }

    if (c1 === "nmap") {
      const targetSubnet = c2 || "192.168.1.0/24";
      appendLine(`Starting Nmap 7.94 ( https://nmap.org ) at 2026-11-08 20:18:00`, "cyan");
      appendLine(`Initiating ARP/L3 Routing Scan on ${targetSubnet} and active WAN tunnels`, "muted");
      setTimeout(() => {
        appendLine("Completed Scan: Discovered 4 live reachable devices.", "green");
        appendLine("----------------------------------------------------------------------", "dark");

        appendLine("Nmap scan report for 192.168.1.1 (Enterprise-L3-Switch-01)", "highlight");
        appendLine("Host is UP (0.0022s latency). MAC: 00:1A:2B:3C:4D:01", "white");
        appendLine("PORT     STATE SERVICE      VERSION", "muted");
        appendLine("22/tcp   OPEN  ssh          Switch-OS L3.1 (OpenSSH 8.9)", "cyan");
        appendLine("80/tcp   OPEN  http         Switch Management Web Console", "cyan");
        appendLine(" ", "muted");

        appendLine("Nmap scan report for 192.168.1.15 (CyberDeck-Terminal-01) (this terminal [localhost])", "highlight");
        appendLine("Host is UP (0.0001s latency). MAC: 02:42:C0:00:00:15", "white");
        appendLine("PORT     STATE SERVICE      VERSION", "muted");
        appendLine("23/tcp   OPEN  telnet       CyberDeck BSD Terminal Daemon", "blue");
        appendLine(" ", "muted");

        appendLine("Nmap scan report for 192.168.1.41 (Diamond-Money-Printer-04)", "highlight");
        appendLine("Host is UP (0.0034s latency). MAC: 00:1A:2B:3C:4D:41", "white");
        appendLine("PORT     STATE SERVICE      VERSION", "muted");
        appendLine("8080/tcp OPEN  http-proxy   MoneyFab Daemon (100% eff, 36C) [Undervolted]", "green");
        appendLine(" ", "muted");

        appendLine("Nmap scan report for 192.168.1.99 (Satellite-WAN-Uplink-01)", "cyan");
        appendLine("Host is UP (0.0041s latency). MAC: 00:1A:2B:3C:4D:99", "white");
        appendLine("PORT     STATE SERVICE      VERSION", "muted");
        appendLine("443/tcp  OPEN  https        Satellite WAN Mesh Gateway (WPA3-Enterprise)", "cyan");
        appendLine("1194/udp OPEN  openvpn      L3 Wireless Tunnel Router (AES-256-GCM)", "cyan");
        appendLine("----------------------------------------------------------------------", "dark");
        appendLine("Nmap done: 4 IP addresses (4 hosts up) scanned in 0.42 seconds.", "cyan");
        sound.playSuccess();
      }, 300);
      return;
    }

    if (c1 === "darkrp") {
      appendLine("[-] bash: darkrp: command not found.", "red");
      appendLine("[!] GridRP is NOT a DarkRP clone.", "yellow");
      appendLine("    It runs on the raw 'sandbox' base with custom-engineered systems:", "muted");
      appendLine("    - Dynamic Gang Stock Exchange with public equity", "white");
      appendLine("    - Native L3 network hardware & physical cabling", "white");
      appendLine("    - Metasploit cash siphons & thermal detonator exploits", "white");
      appendLine("    - Persistent player progression & territory conquest", "white");
      return;
    }

    appendLine(`bash: ${c1}: command not found. Type 'help' for available commands.`, "red");
  }

  // Exact Metasploit Banner from entities/entities/grid_computer/init.lua (lines 957-995)
  function renderMSFBanner() {
    const modDisplay = currentMSFMod === "thermal_overheat" ? "exploit/multi/thermal_overheat" : "exploit/printer/cash_siphon";
    appendLine("  _|_|_|    _|_|    _|_|_|  ", "cyan");
    appendLine(" _|        _|  _|  _|       ", "cyan");
    appendLine(" _|  _|_|  _|_|_|  _|_|_|   ", "cyan");
    appendLine(" _|    _|  _|  _|  _|       ", "cyan");
    appendLine("  _|_|_|   _|  _|  _|       ", "cyan");
    appendLine("Metasploit Framework Console (MSF v6.4.12-Juicebox)", "white");
    appendLine(`Active Module : ${modDisplay}`, "highlight");
    appendLine("----------------------------------------------------------------------", "dark");
    appendLine("Available Exploit Modules:", "white");
    appendLine("  1) exploit/printer/cash_siphon", "green");
    appendLine("     Syntax : run <ip> (or 'use siphon')", "muted");
    appendLine("     Target : Money Printers only", "muted");
    appendLine("     Action : Drains 100% of printer cash vault into operator wallet", "muted");
    appendLine("  2) exploit/multi/thermal_overheat", "red");
    appendLine("     Syntax : run <ip> (or 'use overheat')", "muted");
    appendLine("     Target : Money Printers & Material Synthesizers", "muted");
    appendLine("     Action : Overclocks thermal regulators & detonates target device in 3s", "muted");
    appendLine("----------------------------------------------------------------------", "dark");
    appendLine("MSF Console Commands:", "white");
    appendLine("  use <siphon|overheat>   - Select target exploit payload", "white");
    appendLine("  run <ip> / exploit <ip>  - Execute against target IP address", "white");
    appendLine("  show modules            - Enumerate available exploit payloads", "white");
    appendLine("  exit / back             - Return to CyberDeck OS root shell", "white");
  }

  function executeExploit(mod, targetIP) {
    appendLine(`[*] Launching ${mod} against target ${targetIP}...`, "muted");
    if (mod === "cash_siphon") {
      setTimeout(() => {
        appendLine(`[*] Connecting to ${targetIP}:8080 (MoneyFab Daemon)...`, "white");
        appendLine("[*] Bypassing EEPROM cryptographic lockbox...", "cyan");
        appendLine("[+] Vulnerability EXPLOITED! Vault seal released.", "green");
        appendLine("[+] Siphoned $1,450 directly into Cyber Engineer wallet!", "highlight");
        sound.playSuccess();
      }, 350);
    } else {
      setTimeout(() => {
        appendLine(`[*] Connecting to ${targetIP}:8080 (Thermal Interface)...`, "white");
        appendLine("[*] Overriding thermistor safety triggers...", "yellow");
        appendLine("[!] Clock frequency elevated to 450%! Temp: 115C...", "red");
        appendLine("[+] CRITICAL OVERHEAT! Target device DETONATED in blast!", "red");
        sound.playAlert();
      }, 350);
    }
  }
}
