/* Synapse — Yuvraj Singh's project network.
   Sections: data, case-study cards, technology stack, incident simulator,
   live status checks, footer graphic, and the 3D neural network.
   To add a project, append to PROJECTS (inputs = indexes into SKILLS) and,
   if it uses any listed technology, add its id to that entry in STACK. */

const SKILLS = [
  'Networking',          // 0
  'Linux',               // 1
  'Windows Server',      // 2
  'Databases & SQL',     // 3
  'Cloud & Containers',  // 4
  'Security',            // 5
  'Automation'           // 6
];

const PROJECTS = [
  {
    id: 'retail-network',
    name: 'Retail Network Lab',
    status: 'live', statusText: 'Live demo',
    subtitle: 'Interactive networking and troubleshooting environment',
    desc: 'A simulated head office and 23-store retail network for exploring connectivity, diagnosing faults and practising incident response.',
    tags: ['Networking', 'Infrastructure', 'Troubleshooting'],
    shot: 'shots/retail.jpg', shotNote: 'Screenshot of the live demo',
    highlights: [
      '10 incident drills: ISP outage with a dead LTE backup, full DHCP scope, DNS down, switching loop, phishing with MFA fatigue and more',
      'Traffic flows for card payments, store-to-HQ VPN, Teams calls, DNS lookups and nightly backups, each hop explained',
      'Full IP and VLAN plan, isolated POS VLAN to keep PCI DSS scope small, SD-WAN failover and IPsec site-to-site VPN'
    ],
    stack: ['three.js', 'JavaScript', 'VLANs', 'IPsec VPN', 'SD-WAN', 'Entra ID', 'MDM'],
    repo: 'https://github.com/ysingh2103/retail-network',
    live: 'https://ysingh2103.github.io/retail-network/',
    inputs: [0, 5, 4]
  },
  {
    id: 'fault-trace',
    name: 'Store Fault Trace',
    status: 'live', statusText: 'Live prototype',
    subtitle: 'Root-cause tracing for a single store',
    desc: 'Break something on purpose and it follows the failure through the power and network chain, groups related alerts into one incident and says who to send.',
    tags: ['Monitoring', 'Root-cause analysis', 'Networking'],
    shot: 'shots/fault.jpg', shotNote: 'Screenshot of the live prototype',
    highlights: [
      'Seven failure scenarios: frozen camera, cut cable, power cut, worn UPS battery, ISP outage, locked-up switch, vendor outage',
      'Rules use only signals a real deployment can see: RMM agents, SNMP from the switch and UPS, the firewall cloud API, vendor status pages',
      'A prototype for a live 3D troubleshooting layer on top of monitoring tools'
    ],
    stack: ['three.js', 'JavaScript', 'RMM', 'SNMP', 'Root-cause analysis'],
    repo: 'https://github.com/ysingh2103/retail-network/tree/main/fault-trace',
    live: 'https://ysingh2103.github.io/retail-network/fault-trace/',
    inputs: [0, 6, 5]
  },
  {
    id: 'infra-lab',
    name: 'Self-Hosted Infrastructure Lab',
    status: 'live', statusText: 'Complete · 11 write-ups',
    subtitle: 'Self-built lab with documented incident write-ups',
    desc: 'A VMware ESXi lab built from scratch, where every failure is diagnosed from the logs and written up like a real support ticket.',
    tags: ['Linux', 'Containers', 'Monitoring'],
    shot: 'shots/infra.jpg', shotNote: 'Incident 07 write-up, as published on GitHub',
    highlights: [
      '11 incident write-ups, each structured as symptom, hypothesis, diagnostics, root cause, fix and verification',
      'Incident 07: an unplanned memory-starvation cascade in k3s, found from a routine health check',
      'Prometheus, node_exporter and Grafana monitoring, plus Bash health-check scripts with exit codes for alerting'
    ],
    stack: ['VMware ESXi', 'Ubuntu Server', 'NGINX', 'Tomcat', 'PostgreSQL', 'Docker', 'k3s', 'Grafana', 'Bash'],
    repo: 'https://github.com/ysingh2103/Infra-lab',
    live: null,
    hostNote: 'Self-hosted on a VMware ESXi home lab. Write-ups are published in the repo.',
    inputs: [1, 3, 4, 6]
  },
  {
    id: 'docvault',
    name: 'DocVault',
    status: 'build', statusText: 'In build · Phase 1 done',
    subtitle: 'Document management on the enterprise support stack',
    desc: 'Upload, list, filter and download documents. Files live on disk and metadata in PostgreSQL, served by a Java app on Tomcat 10 behind NGINX.',
    tags: ['Web servers', 'Databases', 'Java'],
    shot: 'shots/docvault.jpg', shotNote: "DocVault's real interface, shown with sample documents",
    highlights: [
      'Database access through a Tomcat-managed JNDI connection pool, with no credentials in code',
      'Browser → NGINX → Tomcat 10 → PostgreSQL, deployed with systemd drop-ins',
      'Next: search and permissions, a Windows leg (IIS and SQL Server), Grafana monitoring and a break-fix trainer'
    ],
    stack: ['Java', 'Tomcat 10', 'NGINX', 'PostgreSQL', 'Maven', 'Linux', 'systemd'],
    repo: 'https://github.com/ysingh2103/docvault',
    live: null,
    hostNote: 'Self-hosted on a Linux lab server (Ubuntu VM). No public URL yet.',
    inputs: [1, 3, 2]
  },
  {
    id: 'ultron',
    name: 'Ultron',
    status: 'early', statusText: 'Early build',
    subtitle: 'Fault-injection incident trainer',
    desc: 'Injects real faults across Windows Server, Linux, web servers, databases and Kubernetes, then times how long they take to fix.',
    tags: ['Automation', 'Monitoring', 'Windows & Linux'],
    shot: 'shots/ultron.jpg', shotNote: "Ultron's health dashboard, shown with sample readings",
    highlights: [
      'A Flask health API reporting CPU load, memory, disk and the state of Tomcat, Docker, k3s and PostgreSQL',
      'A heartbeat that runs as a systemd service and logs a warning when a service goes down',
      'Lab: a Windows Server 2019 domain controller (AD DS, DNS, IIS) and an Ubuntu server'
    ],
    stack: ['Python', 'Flask', 'Bash', 'systemd', 'Windows Server', 'Active Directory', 'k3s'],
    repo: 'https://github.com/ysingh2103/Ultron',
    live: null,
    hostNote: 'Runs on a self-hosted lab server. Public deployment planned on Azure.',
    inputs: [2, 1, 6, 4]
  }
];

/* technologies, grouped, with the projects that really use them */
const STACK = [
  { name: 'Networking', items: [
    ['TCP/IP', ['retail-network', 'fault-trace', 'infra-lab']], ['DNS', ['retail-network', 'infra-lab']],
    ['DHCP', ['retail-network']], ['VLANs', ['retail-network']], ['IPsec VPN', ['retail-network']], ['SD-WAN', ['retail-network']]] },
  { name: 'Infrastructure', items: [
    ['VMware ESXi', ['infra-lab', 'ultron']], ['Ubuntu Server', ['infra-lab', 'docvault', 'ultron']],
    ['Windows Server', ['ultron']], ['Active Directory', ['ultron']], ['Docker', ['infra-lab', 'ultron']], ['Kubernetes (k3s)', ['infra-lab', 'ultron']]] },
  { name: 'Web development', items: [
    ['HTML', ['retail-network', 'fault-trace', 'docvault', 'ultron']], ['CSS', ['retail-network', 'fault-trace', 'docvault', 'ultron']],
    ['JavaScript', ['retail-network', 'fault-trace', 'docvault', 'ultron']], ['three.js', ['retail-network', 'fault-trace']],
    ['Python (Flask)', ['ultron']], ['Java (Servlets)', ['docvault']]] },
  { name: 'Databases & applications', items: [
    ['PostgreSQL', ['infra-lab', 'docvault', 'ultron']], ['NGINX', ['infra-lab', 'docvault']], ['Apache Tomcat', ['infra-lab', 'docvault', 'ultron']],
    ['Prometheus', ['infra-lab']], ['Grafana', ['infra-lab']], ['systemd', ['infra-lab', 'docvault', 'ultron']]] }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pretty = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const indexOfProject = (id) => PROJECTS.findIndex((p) => p.id === id);

/* the network registers its controls here once it has loaded */
const Net = { focusProjects() {}, clearPinned() {}, preview() {}, endPreview() {} };

/* ================= Project case studies ================= */
const manifest = document.getElementById('manifest');
manifest.innerHTML = PROJECTS.map((p, k) => `
  <li class="case" id="${p.id}" data-k="${k}">
    <figure class="shot">
      <div class="shot-frame"><img src="${p.shot}" alt="${esc(p.name)}: ${esc(p.shotNote)}" loading="lazy" width="960" height="600"></div>
      <figcaption>${esc(p.shotNote)}</figcaption>
    </figure>
    <div class="case-body">
      <span class="status ${p.status}">${esc(p.statusText)}</span>
      <h3 class="case-title">${esc(p.name)}<span class="arrow" aria-hidden="true">→</span></h3>
      <p class="case-sub">${esc(p.subtitle)}</p>
      <p class="case-desc">${esc(p.desc)}</p>
      <div class="tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="case-actions">
        ${p.live ? `<a class="btn btn-solid" href="${p.live}" target="_blank" rel="noopener">View Live Demo</a>` : ''}
        <a class="btn ${p.live ? 'btn-ghost' : 'btn-solid'}" href="${p.repo}" target="_blank" rel="noopener">Explore Source Code</a>
        <button type="button" class="btn btn-more" aria-expanded="false" aria-controls="${p.id}-details">Read Case Study</button>
      </div>
    </div>
    <div class="case-details" id="${p.id}-details" hidden>
      <div>
        <h4>What I built</h4>
        <ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      </div>
      <div>
        <h4>Technologies</h4>
        <div class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
        <h4>Skills it draws on</h4>
        <div class="chips">${p.inputs.map((i) => `<span class="chip">${esc(SKILLS[i])}</span>`).join('')}</div>
        <h4>Hosted at</h4>
        ${p.live ? `<p class="host">${esc(pretty(p.live))}</p>` : `<p class="host muted">${esc(p.hostNote)}</p>`}
      </div>
    </div>
  </li>`).join('');

manifest.querySelectorAll('.case').forEach((card) => {
  const k = +card.dataset.k;
  card.addEventListener('pointerenter', () => Net.preview(k));
  card.addEventListener('pointerleave', () => Net.endPreview());
  const more = card.querySelector('.btn-more');
  const details = card.querySelector('.case-details');
  more.addEventListener('click', () => toggleCase(card, details.hidden));
});
function toggleCase(card, open) {
  const more = card.querySelector('.btn-more');
  card.querySelector('.case-details').hidden = !open;
  more.setAttribute('aria-expanded', String(open));
  more.textContent = open ? 'Hide Case Study' : 'Read Case Study';
}
function dockAt(id, openDetails) {
  const el = document.getElementById(id);
  if (!el) return;
  if (openDetails) toggleCase(el, true);
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  el.classList.remove('is-target'); void el.offsetWidth; el.classList.add('is-target');
}

/* ================= Technology stack ================= */
const stackGrid = document.getElementById('stack-grid');
const stackResult = document.getElementById('stack-result');
stackGrid.innerHTML = STACK.map((cat) => `
  <div class="stack-col">
    <h3>${esc(cat.name)}</h3>
    <div class="chips">${cat.items.map(([t]) => `<button type="button" class="tech" aria-pressed="false" data-tech="${esc(t)}">${esc(t)}</button>`).join('')}</div>
  </div>`).join('');
const techMap = new Map(STACK.flatMap((c) => c.items));
let activeTech = null;
stackGrid.addEventListener('click', (e) => {
  const btn = e.target.closest('.tech');
  if (!btn) return;
  selectTech(activeTech === btn.dataset.tech ? null : btn.dataset.tech);
});
function selectTech(name) {
  activeTech = name;
  stackGrid.querySelectorAll('.tech').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tech === name)));
  const ids = name ? techMap.get(name) : [];
  document.querySelectorAll('.case').forEach((c) => c.classList.toggle('dimmed', !!name && !ids.includes(c.id)));
  if (!name) {
    stackResult.textContent = 'Pick a technology to highlight its projects.';
    Net.clearPinned();
    return;
  }
  const names = ids.map((id) => `<b>${esc(PROJECTS[indexOfProject(id)].name)}</b>`);
  const list = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names.at(-1) : names[0];
  stackResult.innerHTML = `${esc(name)} is used in ${list}. They're highlighted below and in the network.`;
  Net.focusProjects(ids.map(indexOfProject), name);
}

/* ================= Incident simulator ================= */
const SCENARIOS = [
  {
    id: 'pos', tab: 'Store 12', short: 'Card payments down',
    ticket: 'INC-2041 · P1', title: "Store 12 can't take card payments",
    symptoms: ['Both registers show "Payment service unreachable"', 'Started at 14:02, during the lunch rush', 'Staff say the guest Wi-Fi is also down', 'Other stores are trading normally'],
    nodes: [
      { id: 'pos', label: 'POS register', x: 20, y: 160 }, { id: 'reader', label: 'Card reader', x: 20, y: 230 },
      { id: 'switch', label: 'PoE switch', x: 190, y: 160 }, { id: 'ap', label: 'Wi-Fi AP', x: 190, y: 230 },
      { id: 'fw', label: 'Firewall', x: 360, y: 160 },
      { id: 'cable', label: 'Cable modem', x: 360, y: 60 }, { id: 'lte', label: 'LTE backup', x: 360, y: 250 },
      { id: 'cloud', label: 'Payments cloud', x: 520, y: 160 }
    ],
    links: [['pos', 'switch'], ['reader', 'pos'], ['ap', 'switch'], ['switch', 'fw'], ['fw', 'cable'], ['fw', 'lte'], ['cable', 'cloud'], ['lte', 'cloud']],
    checks: {
      pos: ['warn', 'POS app running. Last sync with payments: 14:01.', 'Error: payment service unreachable (timeout after 30 s).'],
      reader: ['ok', 'Bluetooth paired to register 1. Battery 82%.', 'Reader self-test passed.'],
      switch: ['ok', 'All ports up. POS VLAN 10 ports 3–4 forwarding.', 'No CRC errors, no loops detected.'],
      ap: ['warn', '6 clients connected.', 'Clients have IP addresses but no internet access.'],
      fw: ['bad', 'WAN1 (cable): DOWN since 14:02.', 'WAN2 (LTE): DOWN, no carrier.', 'SD-WAN failover to WAN2 attempted at 14:02 and failed.'],
      cable: ['bad', 'Downstream sync lost. Upstream channels 0/4.', 'ISP status page: outage in this area, estimated fix 17:00.'],
      lte: ['bad', 'Modem powered. Signal −71 dBm (good).', 'SIM status: DEACTIVATED. Data plan expired 2026-10-01.'],
      cloud: ['ok', 'Payments provider status: all systems operational.', 'Other stores are processing normally.']
    },
    cut: [['fw', 'cable'], ['fw', 'lte']],
    options: [
      ['reader', 'The card readers have failed'],
      ['vlan', 'The POS VLAN is misconfigured on the switch'],
      ['wan', 'The ISP is down and the LTE backup has no active SIM, so both internet paths are dead'],
      ['cloud', 'The payment processor is having an outage']
    ],
    answer: 'wan',
    fix: 'The cable ISP went down at 14:02. SD-WAN tried to fail over to LTE, but the backup SIM\'s data plan had expired, so the store lost both internet paths. Fix: reactivate or swap the SIM, confirm the firewall fails over to WAN2 and that both registers sync. Prevention: monitor the backup link every day, so a dead backup is found before it\'s needed.'
  },
  {
    id: 'dns', tab: 'Head office', short: 'No websites load',
    ticket: 'INC-2042 · P2', title: "HQ users can't open any websites",
    symptoms: ['Every website fails with "Server not found"', 'Teams calls that were already connected still work', 'Started first thing this morning', 'Affects every user at head office'],
    nodes: [
      { id: 'pc', label: 'User PC', x: 20, y: 160 }, { id: 'switch', label: 'Core switch', x: 190, y: 160 },
      { id: 'dns', label: 'DNS server', x: 190, y: 260 }, { id: 'fw', label: 'Firewall', x: 360, y: 160 },
      { id: 'isp', label: 'ISP fibre', x: 360, y: 60 }, { id: 'web', label: 'Internet', x: 520, y: 160 }
    ],
    links: [['pc', 'switch'], ['switch', 'dns'], ['switch', 'fw'], ['fw', 'isp'], ['isp', 'web']],
    checks: {
      pc: ['warn', 'IP 10.0.20.57/24, gateway 10.0.20.1, DNS 10.0.30.10.', 'ping 8.8.8.8: reply in 12 ms.', 'nslookup example.com: request timed out.'],
      switch: ['ok', 'Uplinks up. No errors on staff VLAN 20 or server VLAN 30.'],
      dns: ['bad', 'Server reachable (ping 1 ms).', 'Service "DNS Server": STOPPED since 06:41.', 'Startup type: Manual. The server rebooted for patches at 06:40.'],
      fw: ['ok', 'WAN up at 940 Mbps. Outbound traffic normal.', 'No new block rules.'],
      isp: ['ok', 'Link up, no packet loss.'],
      web: ['ok', 'Public sites respond when reached by IP address.']
    },
    cut: [],
    options: [
      ['isp', 'The ISP connection is down'],
      ['fw', 'The firewall is blocking web traffic'],
      ['dns', 'The DNS service on the HQ server stopped after the patch reboot'],
      ['loop', 'There is a switching loop on the core switch']
    ],
    answer: 'dns',
    fix: 'Pinging by IP works, so the network path is fine; only name lookups fail. The DNS Server service was set to start manually, so it didn\'t come back after the 06:40 patch reboot. Fix: start the service, set its startup type to Automatic and flush client DNS caches. Prevention: monitor the service and test name resolution after every patch window.'
  },
  {
    id: 'dhcp', tab: 'Store 05', short: 'New devices get no IP',
    ticket: 'INC-2043 · P3', title: 'Store 05: new laptops and phones get no network',
    symptoms: ['New devices join the Wi-Fi but show "No internet"', 'Devices that were already connected work fine', 'The store had a busy promotion weekend', 'Nothing was changed on the network'],
    nodes: [
      { id: 'laptop', label: 'New laptop', x: 20, y: 160 }, { id: 'ap', label: 'Wi-Fi AP', x: 190, y: 160 },
      { id: 'old', label: 'Existing PCs', x: 190, y: 260 }, { id: 'switch', label: 'PoE switch', x: 360, y: 160 },
      { id: 'fw', label: 'Firewall + DHCP', x: 520, y: 160 }
    ],
    links: [['laptop', 'ap'], ['ap', 'switch'], ['old', 'switch'], ['switch', 'fw']],
    checks: {
      laptop: ['bad', 'Self-assigned address 169.254.71.12.', 'DHCPDISCOVER sent 4 times. No offer received.'],
      ap: ['ok', '41 clients associated. Uplink to switch healthy.'],
      old: ['ok', 'Existing PCs online with valid leases. Browsing normally.'],
      switch: ['ok', 'All ports up. VLAN 20 trunked to the AP.'],
      fw: ['bad', 'Staff VLAN 20 scope 10.5.20.100–150: 51 of 51 leases in use.', 'Lease time: 8 days.', '19 leases belong to devices not seen for 6 days.']
    },
    cut: [],
    options: [
      ['psk', 'The Wi-Fi password was changed'],
      ['dhcp', 'The DHCP scope is full, held by leases from devices that have left'],
      ['port', 'The switch port for the AP is disabled'],
      ['nic', 'The new laptop has a faulty network card']
    ],
    answer: 'dhcp',
    fix: 'The scope has 51 addresses and all are leased. With an 8-day lease, phones from the busy weekend kept their addresses long after they left, so new devices get no offer and fall back to a 169.254 address. Fix: clear the stale leases, shorten the lease to 8 hours and widen the scope. Prevention: alert when a scope passes 80% utilisation.'
  }
];

const simEl = document.getElementById('sim');
let sim = null;
function renderSim(idx) {
  const s = SCENARIOS[idx];
  sim = { s, idx, checked: new Set(), wrong: 0, solved: false };
  const W = 640, H = 310, NW = 112, NH = 34;
  const pos = Object.fromEntries(s.nodes.map((n) => [n.id, n]));
  const isCut = (a, b) => s.cut.some(([x, y]) => (x === a && y === b) || (x === b && y === a));
  simEl.innerHTML = `
    <div class="sim-tabs" role="tablist">${SCENARIOS.map((sc, i) => `
      <button type="button" class="sim-tab" role="tab" aria-selected="${i === idx}" data-i="${i}"><b>${esc(sc.tab)}</b><small>${esc(sc.short)}</small></button>`).join('')}
    </div>
    <div class="sim-body">
      <div class="sim-left">
        <div class="ticket">
          <span class="t-id">${esc(s.ticket)}</span>
          <h3>${esc(s.title)}</h3>
          <ul>${s.symptoms.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
        </div>
        <svg class="diagram" viewBox="0 0 ${W} ${H}" role="group" aria-label="Network diagram. Select a component to investigate it.">
          ${s.links.map(([a, b]) => `<line class="link" data-a="${a}" data-b="${b}" x1="${pos[a].x + NW / 2}" y1="${pos[a].y + NH / 2}" x2="${pos[b].x + NW / 2}" y2="${pos[b].y + NH / 2}"></line>`).join('')}
          ${s.nodes.map((n) => `<g class="node" tabindex="0" role="button" data-id="${n.id}" aria-label="Investigate ${esc(n.label)}">
            <rect x="${n.x}" y="${n.y}" width="${NW}" height="${NH}" rx="8"></rect>
            <text x="${n.x + NW / 2}" y="${n.y + NH / 2 + 4}" text-anchor="middle">${esc(n.label)}</text></g>`).join('')}
        </svg>
        <p class="sim-hint">Select a component to run its diagnostics. Green is healthy, amber shows a symptom, red is a fault.</p>
      </div>
      <div class="sim-right">
        <pre class="console" id="sim-console" aria-live="polite"><span class="c-dim">Ticket ${esc(s.ticket)} opened. Pick a component on the diagram to investigate.</span></pre>
        <div class="diag">
          <h4>What's the root cause?</h4>
          <div class="diag-opts">${s.options.map(([k, t]) => `<button type="button" class="diag-opt" data-k="${k}" disabled>${esc(t)}</button>`).join('')}</div>
        </div>
        <p class="verdict" id="sim-verdict">Run at least two checks before you diagnose.</p>
        <div class="solution" id="sim-solution" hidden><h4>Resolution</h4><p>${esc(s.fix)}</p></div>
        <button type="button" class="sim-reset" id="sim-reset">Restart this ticket</button>
      </div>
    </div>`;
  simEl.querySelectorAll('.sim-tab').forEach((t) => t.addEventListener('click', () => renderSim(+t.dataset.i)));
  simEl.querySelectorAll('.node').forEach((g) => {
    g.addEventListener('click', () => runCheck(g.dataset.id));
    g.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); runCheck(g.dataset.id); } });
  });
  simEl.querySelectorAll('.diag-opt').forEach((b) => b.addEventListener('click', () => diagnose(b)));
  simEl.querySelector('#sim-reset').addEventListener('click', () => renderSim(idx));
}
function runCheck(id) {
  const { s } = sim;
  const node = s.nodes.find((n) => n.id === id);
  const [state, ...lines] = s.checks[id];
  const g = simEl.querySelector(`.node[data-id="${id}"]`);
  simEl.querySelectorAll('.node').forEach((n) => n.classList.remove('sel'));
  g.classList.remove('ok', 'bad', 'warn');
  g.classList.add('sel', state);
  if (state === 'bad') {
    s.cut.forEach(([a, b]) => { if (a === id || b === id) simEl.querySelectorAll('.link').forEach((l) => {
      if ((l.dataset.a === a && l.dataset.b === b) || (l.dataset.a === b && l.dataset.b === a)) l.classList.add('cut'); }); });
  }
  const cls = { ok: 'c-ok', bad: 'c-bad', warn: 'c-warn' }[state];
  const word = { ok: 'HEALTHY', bad: 'FAULT', warn: 'SYMPTOM' }[state];
  const con = simEl.querySelector('#sim-console');
  if (!sim.checked.size) con.innerHTML = '';
  con.innerHTML += `<span class="c-cmd">&gt; diagnose ${esc(node.label.toLowerCase())}</span>\n${lines.map((l) => esc(l)).join('\n')}\n<span class="${cls}">[${word}]</span>\n\n`;
  con.scrollTop = con.scrollHeight;
  sim.checked.add(id);
  if (sim.checked.size >= 2 && !sim.solved) {
    simEl.querySelectorAll('.diag-opt').forEach((b) => { if (!b.classList.contains('wrong')) b.disabled = false; });
    simEl.querySelector('#sim-verdict').textContent = `${sim.checked.size} checks run. Choose the root cause when you're ready.`;
  }
}
function diagnose(btn) {
  const { s } = sim;
  const verdict = simEl.querySelector('#sim-verdict');
  if (btn.dataset.k === s.answer) {
    sim.solved = true;
    btn.classList.add('right');
    simEl.querySelectorAll('.diag-opt').forEach((b) => { b.disabled = true; });
    verdict.innerHTML = `<b>Correct.</b> Solved after ${sim.checked.size} check${sim.checked.size === 1 ? '' : 's'}${sim.wrong ? ` and ${sim.wrong} wrong guess${sim.wrong === 1 ? '' : 'es'}` : ''}.`;
    simEl.querySelector('#sim-solution').hidden = false;
  } else {
    sim.wrong++;
    btn.classList.add('wrong');
    btn.disabled = true;
    const unchecked = s.nodes.filter((n) => !sim.checked.has(n.id) && s.checks[n.id][0] === 'bad');
    verdict.innerHTML = `<b>Not quite.</b> ${unchecked.length ? `Try investigating the ${esc(unchecked[0].label)}.` : 'Look again at the components marked in red.'}`;
    if (sim.wrong >= 2) {
      simEl.querySelector('#sim-solution').hidden = false;
      verdict.innerHTML += ' The resolution is shown below.';
    }
  }
}
renderSim(0);

/* ================= Live status checks ================= */
const STATUS_ROWS = [
  { name: 'Synapse site', url: 'self' },
  { name: 'Retail Network Lab demo', url: 'https://ysingh2103.github.io/retail-network/' },
  { name: 'Store Fault Trace demo', url: 'https://ysingh2103.github.io/retail-network/fault-trace/' },
  { name: 'Source repository', url: 'github' }
];
const spRows = document.getElementById('sp-rows');
async function timed(fn) { const t0 = performance.now(); const r = await fn(); return [r, Math.round(performance.now() - t0)]; }
function ago(iso) {
  const m = Math.round((Date.now() - new Date(iso)) / 60000);
  if (m < 60) return `${m} min ago`;
  const h = Math.round(m / 60);
  return h < 48 ? `${h} h ago` : `${Math.round(h / 24)} days ago`;
}
async function checkRow(row) {
  try {
    if (row.url === 'self') {
      if (!/github\.io$/.test(location.hostname)) return ['unknown', 'NOT ON GITHUB PAGES', 'This copy is a preview; the live site checks itself here.'];
      const [r, ms] = await timed(() => fetch(location.href, { method: 'HEAD', cache: 'no-store' }));
      return r.ok ? ['up', 'ONLINE', `Responded in ${ms} ms`] : ['down', 'ERROR ' + r.status, ''];
    }
    if (row.url === 'github') {
      const [r, ms] = await timed(() => fetch('https://api.github.com/repos/ysingh2103/synapse', { cache: 'no-store' }));
      if (!r.ok) return ['unknown', "CAN'T CHECK", `GitHub answered ${r.status}`];
      const j = await r.json();
      return ['up', 'LINKED', `Last update ${ago(j.pushed_at)} · ${ms} ms`];
    }
    const [r, ms] = await timed(() => fetch(row.url, { method: 'HEAD', cache: 'no-store' }));
    return r.ok ? ['up', 'ONLINE', `Responded in ${ms} ms`] : ['down', 'ERROR ' + r.status, 'The demo returned an error'];
  } catch (e) {
    return ['unknown', "CAN'T CHECK", 'The check was blocked from this page'];
  }
}
async function runStatus() {
  spRows.innerHTML = STATUS_ROWS.map((r, i) => `<li data-i="${i}"><span class="sp-name">${esc(r.name)}</span><span class="sp-state unknown checking">CHECKING</span><span class="sp-detail"></span></li>`).join('');
  document.getElementById('sp-time').textContent = 'Checking…';
  await Promise.all(STATUS_ROWS.map(async (row, i) => {
    const [cls, word, detail] = await checkRow(row);
    const li = spRows.querySelector(`li[data-i="${i}"]`);
    li.querySelector('.sp-state').className = 'sp-state ' + cls;
    li.querySelector('.sp-state').textContent = word;
    li.querySelector('.sp-detail').textContent = detail;
  }));
  document.getElementById('sp-time').textContent = 'Checked at ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
document.getElementById('sp-recheck').addEventListener('click', runStatus);
runStatus();

/* ================= Section reveals ================= */
(function reveals() {
  const els = [...document.querySelectorAll('.reveal')];
  if (reduceMotion || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.remove('pre'); io.unobserve(en.target); }
  }), { rootMargin: '0px 0px -8% 0px' });
  els.forEach((el) => {
    if (el.getBoundingClientRect().top > window.innerHeight) { el.classList.add('pre'); io.observe(el); }
  });
})();

/* ================= Copy email ================= */
const copyBtn = document.getElementById('copy-email');
copyBtn.addEventListener('click', () => {
  const email = copyBtn.dataset.email, label = copyBtn.textContent;
  const done = () => { copyBtn.textContent = 'Email copied'; copyBtn.classList.add('done');
    setTimeout(() => { copyBtn.textContent = label; copyBtn.classList.remove('done'); }, 1800); };
  if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(email).then(done).catch(() => select(copyBtn));
  else select(copyBtn);
});
function select(el) { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); }

/* ================= Footer network graphic ================= */
(function footNet() {
  const cv = document.getElementById('foot-net');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const draw = () => {
    const r = cv.getBoundingClientRect(), d = Math.min(devicePixelRatio || 1, 2);
    cv.width = r.width * d; cv.height = r.height * d; ctx.setTransform(d, 0, 0, d, 0, 0);
    let seed = 5; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
    const pts = Array.from({ length: Math.round(r.width / 26) }, () => ({ x: r.width * (.35 + rnd() * .65), y: rnd() * r.height }));
    ctx.lineWidth = 1;
    pts.forEach((a, i) => pts.forEach((b, j) => { if (j <= i) return; const dd = Math.hypot(a.x - b.x, a.y - b.y);
      if (dd < 120) { ctx.strokeStyle = `rgba(255,255,255,${(.09 - dd / 1600).toFixed(3)})`; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); } }));
    pts.forEach((p, i) => { ctx.fillStyle = i % 9 ? 'rgba(255,255,255,.22)' : 'rgba(185,163,255,.6)'; ctx.beginPath(); ctx.arc(p.x, p.y, i % 9 ? 1.4 : 2.2, 0, 6.283); ctx.fill(); });
  };
  new ResizeObserver(draw).observe(cv);
})();

/* ================= 3D neural network ================= */
(function neuralNet() {
  const canvas = document.getElementById('orrery');
  const hero = canvas && canvas.parentElement;
  const space = document.querySelector('.net-space');
  const fallback = document.getElementById('net-fallback');
  const failed = () => { if (fallback) fallback.hidden = false; document.querySelector('.net-hud').hidden = true; };
  if (!window.THREE || !canvas) { failed(); return; }

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) { failed(); return; }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const WHITE = '#ffffff', LIGHT = '#e5e5e5', MID = '#a3a3a3', DARK = '#737373', ACCENT = '#8b5cf6', ACCENT_HI = '#b9a3ff';
  const isSmall = window.innerWidth < 700;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 400);
  const rig = new THREE.Group();
  const net = new THREE.Group();
  net.position.y = 0.6;
  rig.add(net);
  scene.add(rig);

  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)'); grd.addColorStop(0.2, 'rgba(255,255,255,.55)'); grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glow = (color, scale) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({ map: glowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false }));
    s.scale.setScalar(scale);
    return s;
  };

  /* faint drifting particles (fewer on phones) */
  const DUST = isSmall ? 60 : 180;
  const dustPos = new Float32Array(DUST * 3);
  for (let i = 0; i < DUST; i++) dustPos.set([(Math.random() - 0.5) * 34, (Math.random() - 0.5) * 18, (Math.random() - 0.5) * 14], i * 3);
  const dustGeo = new THREE.BufferGeometry();
  dustGeo.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  const dust = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: 0xffffff, size: 0.05, transparent: true, opacity: 0.35, depthWrite: false }));
  rig.add(dust);

  /* projector base */
  const base = new THREE.Group();
  base.position.y = -4.1;
  base.scale.setScalar(0.62);
  rig.add(base);
  const circle = (r, seg = 180, from = 0, to = Math.PI * 2) => {
    const pts = [];
    for (let k = 0; k <= seg; k++) { const a = from + (to - from) * (k / seg); pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r)); }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };
  const lineMat = (hex, op) => new THREE.LineBasicMaterial({ color: hex, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false });
  const ringA = new THREE.Line(circle(4.2), lineMat(LIGHT, 0.35));
  const ringB = new THREE.Group();
  [[0, 1.7], [2.2, 3.9], [4.5, 5.8]].forEach(([a, b]) => ringB.add(new THREE.Line(circle(5.6, 90, a, b), lineMat(MID, 0.5))));
  const ringC = new THREE.Line(circle(7.4), new THREE.LineDashedMaterial({ color: DARK, dashSize: 0.22, gapSize: 0.32, transparent: true, opacity: 0.45, depthWrite: false }));
  ringC.computeLineDistances();
  const lensHot = glow(WHITE, 2.2); lensHot.material.opacity = 0.4;
  const wave = new THREE.Line(circle(1), lineMat(ACCENT_HI, 0));
  base.add(ringA, ringB, ringC, lensHot, wave);

  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* layout: input, three hidden layers, output */
  const LX = [-7.2, -3.6, 0, 3.6, 7.2];
  const LAST = LX.length - 1;
  const column = (n, gap, x) => Array.from({ length: n }, (_, i) => new THREE.Vector3(x, ((n - 1) / 2 - i) * gap, 0));
  const grid = (x, n = 3) => { const a = []; for (let r = 0; r < 3; r++) for (let c = 0; c < n; c++) a.push(new THREE.Vector3(x, (1 - r) * 1.55, (c - (n - 1) / 2) * 1.6)); return a; };
  const layerPos = [column(SKILLS.length, 1.15, LX[0]), grid(LX[1]), grid(LX[2], 4), grid(LX[3]), column(PROJECTS.length, 1.38, LX[4])];
  const LAYER_HEX = [LIGHT, '#8a8a8a', '#b5b5b5', '#8a8a8a'];
  const OUT_HEX = [WHITE, '#e5e5e5', '#d4d4d4', '#a3a3a3', '#8a8a8a'];

  const neurons = layerPos.map((arr, li) => arr.map((p, ni) => {
    const isIn = li === 0, isOut = li === LAST;
    const hex = isOut ? OUT_HEX[ni] : LAYER_HEX[li];
    const g = new THREE.Group(); g.position.copy(p);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(isOut ? 0.26 : isIn ? 0.18 : 0.14, 24, 24), new THREE.MeshBasicMaterial({ color: hex, transparent: true }));
    const halo = glow(hex, isOut ? 2.8 : 1.6);
    g.add(ball, halo);
    let shell = null;
    if (isOut || isIn) {
      shell = new THREE.Mesh(isOut ? new THREE.OctahedronGeometry(0.6, 0) : new THREE.IcosahedronGeometry(0.34, 0),
        new THREE.MeshBasicMaterial({ color: isOut ? hex : MID, wireframe: true, transparent: true, opacity: isOut ? 0.75 : 0.4 }));
      g.add(shell);
    }
    net.add(g);
    return { g, ball, halo, shell, act: 0, rest: isOut ? 0.55 : 0.3, li, ni, hex, dim: 0, dimT: 0 };
  }));

  /* synapses */
  const edges = [];
  for (let l = 0; l < LAST; l++) layerPos[l].forEach((A, a) => layerPos[l + 1].forEach((B, b) => edges.push({ l, a, b, A, B, h: rnd() })));
  const usesProject = (k, e) =>
    e.l === 0 ? PROJECTS[k].inputs.includes(e.a)
    : e.l === LAST - 1 ? e.b === k
    : ((e.h * 7.13 + k * 0.371 + e.l * 0.17) % 1) < 0.26;
  const projectsForSkill = (s) => PROJECTS.map((p, k) => (p.inputs.includes(s) ? k : -1)).filter((k) => k >= 0);

  const ePos = new Float32Array(edges.length * 6), eCol = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => ePos.set([e.A.x, e.A.y, e.A.z, e.B.x, e.B.y, e.B.z], i * 6));
  const eGeo = new THREE.BufferGeometry();
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3));
  const eMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  net.add(new THREE.LineSegments(eGeo, eMat));

  const REST_END = new THREE.Color('#3d3d3d'), REST_MID = new THREE.Color('#2a2a2a'), FAINT = new THREE.Color('#0c0c0c');
  const restAt = (depth) => REST_MID.clone().lerp(REST_END, Math.abs(depth / LAST - 0.5) * 2);

  /* focus: which projects (and optionally which skill) are lit */
  let pinned = null;     // a click, a stack chip, or an open panel
  let preview = null;    // hover
  const focusOf = () => pinned || preview;
  const edgeOn = (f, e) => f.skill != null && e.l === 0 ? e.a === f.skill : f.projects.some((k) => usesProject(k, e));
  let glowPhase = 0;
  function paint() {
    const f = focusOf();
    const relevant = new Set();
    edges.forEach((e, i) => {
      let a = restAt(e.l), b = restAt(e.l + 1);
      if (f) {
        const on = edgeOn(f, e);
        if (on) { relevant.add(e.l + ':' + e.a); relevant.add(e.l + 1 + ':' + e.b); }
        a = b = on ? f.color : FAINT;
      }
      eCol.set([a.r, a.g, a.b, b.r, b.g, b.b], i * 6);
    });
    eGeo.attributes.color.needsUpdate = true;
    neurons.forEach((layer) => layer.forEach((n) => { n.dimT = f && !relevant.has(n.li + ':' + n.ni) ? 1 : 0; }));
    const lit = f ? f.projects : [];
    outLabels.forEach((el, k) => { el.classList.toggle('on', lit.includes(k)); el.classList.toggle('dim', !!f && !lit.includes(k)); });
    inLabels.forEach((el, s) => {
      const on = !!f && (f.skill != null ? f.skill === s : lit.some((k) => PROJECTS[k].inputs.includes(s)));
      el.classList.toggle('on', on); el.classList.toggle('dim', !!f && !on);
    });
    document.querySelectorAll('.case').forEach((c, k) => c.classList.toggle('is-lit', !!preview && preview.projects.includes(k)));
  }
  const accentColor = new THREE.Color(ACCENT_HI), whiteColor = new THREE.Color(WHITE);

  /* signal pulses */
  const pool = Array.from({ length: 300 }, () => { const s = glow(WHITE, 0.6); s.visible = false; net.add(s); return { s, e: null, t0: 0, dur: 0, k: 1, free: true }; });
  let now = 0;
  function fire(e, delay, hex, strength) {
    const p = pool.find((q) => q.free);
    if (!p) return;
    p.free = false; p.e = e; p.t0 = now + delay; p.dur = 1.15 + rnd() * 0.3; p.k = strength;
    p.s.material.color.set(hex);
    p.s.scale.setScalar(strength > 0.6 ? 0.72 : 0.42);
  }
  let passIdx = 0;
  function forwardPass(k, hex = WHITE) {
    PROJECTS[k].inputs.forEach((s) => { neurons[0][s].act = 1; });
    edges.forEach((e) => { if (usesProject(k, e)) fire(e, e.l * 1.25 + rnd() * 0.2, hex, 1); });
  }

  /* labels */
  const labelLayer = document.createElement('div');
  labelLayer.className = 'net-labels';
  hero.appendChild(labelLayer);
  const mkLabel = (tag, text, cls) => { const el = document.createElement(tag); el.className = 'net-label ' + cls; el.textContent = text; labelLayer.appendChild(el); return el; };
  const inLabels = SKILLS.map((s, i) => {
    const el = mkLabel('button', s, 'in');
    el.type = 'button';
    el.addEventListener('pointerenter', () => setPreview({ projects: projectsForSkill(i), skill: i }));
    el.addEventListener('pointerleave', () => setPreview(null));
    el.addEventListener('click', () => pinSkill(i));
    return el;
  });
  const outLabels = PROJECTS.map((p, k) => {
    const el = mkLabel('button', p.name, 'out');
    el.type = 'button';
    el.addEventListener('pointerenter', () => setPreview({ projects: [k] }));
    el.addEventListener('pointerleave', () => setPreview(null));
    el.addEventListener('click', () => openPanel(k));
    return el;
  });

  paint();   // resting wire colours

  function mkFocus(o) { return { projects: o.projects, skill: o.skill ?? null, color: o.color || whiteColor, kind: o.kind }; }
  function setPreview(o) {
    if (pinned) return;                                  // a pinned selection wins over hover
    const next = o ? mkFocus(o) : null;
    if (JSON.stringify(next && [next.projects, next.skill]) === JSON.stringify(preview && [preview.projects, preview.skill])) return;
    preview = next;
    paint();
    if (preview) preview.projects.forEach((k) => forwardPass(k));
  }
  function pin(o) {
    pinned = mkFocus({ ...o, color: accentColor });
    preview = null;
    paint();
    pinned.projects.forEach((k) => forwardPass(k, ACCENT_HI));
    interacted();
  }
  function unpin() { pinned = null; paint(); }
  function pinSkill(i) {
    closePanel(false);
    if (pinned && pinned.kind === 'skill' && pinned.skill === i) { unpin(); setTip(); return; }
    pin({ projects: projectsForSkill(i), skill: i, kind: 'skill' });
    const names = projectsForSkill(i).map((k) => PROJECTS[k].name);
    setTip(`${SKILLS[i]} powers ${names.join(', ')}.`);
  }

  /* project panel */
  const panel = document.getElementById('net-panel');
  let panelFor = -1;
  function openPanel(k) {
    const p = PROJECTS[k];
    panelFor = k;
    pin({ projects: [k], kind: 'project' });
    panel.innerHTML = `
      <button type="button" class="np-close" aria-label="Close">✕</button>
      <span class="status ${p.status}">${esc(p.statusText)}</span>
      <h3>${esc(p.name)}</h3>
      <p class="np-sub">${esc(p.subtitle)}</p>
      <p class="np-what">${esc(p.desc)}</p>
      <div class="tags">${p.stack.slice(0, 5).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      <div class="np-actions">
        ${p.live ? `<a class="primary" href="${p.live}" target="_blank" rel="noopener">Live demo</a>` : ''}
        <a class="${p.live ? '' : 'primary'}" href="${p.repo}" target="_blank" rel="noopener">GitHub</a>
        <button type="button" class="np-case">Case study</button>
      </div>`;
    panel.hidden = false;
    panel.querySelector('.np-close').addEventListener('click', () => closePanel(true));
    panel.querySelector('.np-case').addEventListener('click', () => dockAt(p.id, true));
    setTip(`${p.name} is lit with the skills that feed it.`);
  }
  function closePanel(clear) {
    if (panel.hidden) return;
    panel.hidden = true; panelFor = -1;
    if (clear) { unpin(); setTip(); }
  }
  const tip = document.getElementById('net-tip');
  const TIP = tip ? tip.textContent : '';
  function setTip(t) { if (tip) tip.textContent = t || TIP; }

  /* public controls for the rest of the page */
  Net.focusProjects = (ks, label) => { closePanel(false); pin({ projects: ks, kind: 'stack' }); setTip(`Showing projects that use ${label}.`); };
  Net.clearPinned = () => { if (pinned && pinned.kind === 'stack') { unpin(); setTip(); } };
  Net.preview = (k) => setPreview({ projects: [k] });
  Net.endPreview = () => setPreview(null);

  /* picking neurons in the scene */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickNeurons = [...neurons[0], ...neurons[LAST]];
  const pickable = pickNeurons.map((n) => n.ball);
  function pick(ev) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hit = ray.intersectObjects(pickable)[0];
    if (!hit) return null;
    const n = pickNeurons.find((q) => q.ball === hit.object);
    return n.li === 0 ? { kind: 's', i: n.ni } : { kind: 'p', i: n.ni };
  }

  /* rotation: slow idle turn that pauses while someone is interacting */
  const AUTO = 0.08;
  const HOME = { y: -0.3, x: 0.1 };
  const rot = { y: HOME.y, x: HOME.x, vy: AUTO, tx: HOME.x };
  const drag = { on: false, id: null, x: 0, y: 0, moved: 0, lastT: 0 };
  let lastInteract = -10, overNet = false, hoverKey = '', resetting = false;
  function interacted() { lastInteract = now; }
  const inSpace = (ev) => { const r = space.getBoundingClientRect(); return ev.clientX >= r.left && ev.clientX <= r.right && ev.clientY >= r.top && ev.clientY <= r.bottom; };

  hero.addEventListener('pointerdown', (ev) => {
    if (ev.target.closest('a,button,.net-panel')) return;
    drag.on = true; drag.id = ev.pointerId; drag.x = ev.clientX; drag.y = ev.clientY; drag.moved = 0; drag.lastT = performance.now();
    hero.classList.add('dragging'); interacted(); resetting = false;
  });
  window.addEventListener('pointermove', (ev) => {
    if (drag.on && ev.pointerId === drag.id) {
      const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      drag.x = ev.clientX; drag.y = ev.clientY; drag.moved += Math.abs(dx) + Math.abs(dy);
      const t = performance.now(), dt = Math.max(16, t - drag.lastT) / 1000; drag.lastT = t;
      rot.y += dx * 0.006; rot.vy = (dx * 0.006) / dt;
      rot.tx = Math.max(-0.5, Math.min(0.55, rot.tx + dy * 0.004));
      interacted();
      return;
    }
    if (!hero.contains(ev.target) || ev.target.closest('.net-label,.net-panel,.copy')) { return; }
    overNet = inSpace(ev);
    hero.classList.toggle('over-net', overNet);
    if (overNet) interacted();
    const hit = pick(ev);
    const key = hit ? hit.kind + hit.i : '';
    if (key !== hoverKey) {
      hoverKey = key;
      if (!hit) setPreview(null);
      else setPreview(hit.kind === 's' ? { projects: projectsForSkill(hit.i), skill: hit.i } : { projects: [hit.i] });
      hero.style.cursor = hit ? 'pointer' : '';
    }
  });
  const endDrag = () => { drag.on = false; hero.classList.remove('dragging'); };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  hero.addEventListener('pointerleave', () => { overNet = false; hero.classList.remove('over-net'); if (!drag.on) { hoverKey = ''; setPreview(null); } });
  hero.addEventListener('click', (ev) => {
    if (ev.target.closest('a,button,.net-panel') || drag.moved > 6) return;
    const hit = pick(ev);
    if (!hit) return;
    if (hit.kind === 'p') openPanel(hit.i); else pinSkill(hit.i);
  });
  document.getElementById('net-reset').addEventListener('click', () => {
    closePanel(false); unpin(); setTip();
    if (activeTech) selectTech(null);
    resetting = true; rot.vy = 0; rot.tx = HOME.x;
  });

  /* sizing */
  let W = 0, H = 0, blocks = [], cx = 0;
  function resize() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const camZ = W > 900 ? 18 : 24;
    camera.position.set(0, 0, camZ); camera.lookAt(0, 0, 0); camera.updateProjectionMatrix();
    const upp = (2 * Math.tan((23 * Math.PI) / 180) * camZ) / H;
    const hr = hero.getBoundingClientRect(), sr = space.getBoundingClientRect();
    const bandCX = sr.left - hr.left + sr.width / 2, bandCY = sr.top - hr.top + sr.height / 2 - 14;
    cx = bandCX;
    const roomW = (sr.width - (W > 600 ? 170 : 24)) * upp;
    const s = Math.min(((sr.height - 40) * upp) / 10.2, roomW / 15.6);
    rig.position.set((bandCX - W / 2) * upp, (H / 2 - bandCY) * upp, 0);
    rig.scale.setScalar(s);
    blocks = [...document.querySelectorAll('.topbar, .copy > *, .net-hud > *')].map((el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - hr.left - 8, r: r.right - hr.left + 8, t: r.top - hr.top - 6, b: r.bottom - hr.top + 6 };
    });
  }
  window.addEventListener('resize', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
  resize();

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(hero);

  const v = new THREE.Vector3(), wp = new THREE.Vector3();
  let intro = 0, nextPass = 1.5, nextAmbient = 0;

  function placeLabel(el, n) {
    n.g.getWorldPosition(wp);
    v.copy(wp).project(camera);
    const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
    const left = x < cx;
    const lw = el.offsetWidth || 150;
    const lx = left ? x - 18 - lw : x + 20, rx = left ? x - 18 : x + 20 + lw;
    const covered = blocks.some((b) => rx > b.l && lx < b.r && y + 10 > b.t && y - 10 < b.b);
    const depth = (wp.z - rig.position.z) / rig.scale.x;
    const facing = Math.max(0, Math.min(1, 0.5 + depth / 12));
    const hide = v.z > 1 || covered || W <= 600;
    el.style.opacity = hide ? '0' : String((Math.min(1, intro * 1.5) * (0.3 + 0.7 * facing)).toFixed(2));
    el.style.pointerEvents = hide || facing < 0.3 ? 'none' : 'auto';
    el.tabIndex = hide ? -1 : 0;
    el.style.zIndex = String(Math.round(facing * 10));
    el.style.transform = left
      ? `translate(${(x - 18).toFixed(1)}px, ${(y - 12).toFixed(1)}px) translateX(-100%)`
      : `translate(${(x + 20).toFixed(1)}px, ${(y - 12).toFixed(1)}px)`;
  }

  function frame(dt) {
    now += dt;
    intro = Math.min(1, intro + dt * 0.35);
    const ease = 1 - Math.pow(1 - intro, 3);

    // idle turn pauses while the visitor is interacting, then eases back in
    const busy = drag.on || overNet || !!pinned || now - lastInteract < 2.5;
    if (resetting) {
      let d = ((HOME.y - rot.y) % (Math.PI * 2) + Math.PI * 3) % (Math.PI * 2) - Math.PI;
      rot.y += d * Math.min(1, dt * 3);
      if (Math.abs(d) < 0.002) { resetting = false; lastInteract = now; }
    } else if (!drag.on) {
      rot.vy += ((busy ? 0 : AUTO) - rot.vy) * Math.min(1, dt * 1.2);
      rot.y += rot.vy * dt;
      if (!busy) rot.tx += (HOME.x - rot.tx) * dt * 0.3;
    }
    rot.x += (rot.tx - rot.x) * 0.08;
    net.rotation.set(rot.x, rot.y, 0);
    net.scale.setScalar(0.75 + 0.25 * ease);

    base.rotation.x = rot.x * 0.5;
    ringA.rotation.y = now * 0.12; ringB.rotation.y = -now * 0.2; ringC.rotation.y = now * 0.04;
    lensHot.material.opacity = 0.32 + Math.sin(now * 1.2) * 0.08;
    dust.rotation.y = now * 0.01;
    const dp = dustGeo.attributes.position;
    for (let i = 0; i < DUST; i++) { let y = dp.getY(i) + dt * 0.08; if (y > 9) y = -9; dp.setY(i, y); }
    dp.needsUpdate = true;

    // selected connections breathe gently
    glowPhase += dt;
    eMat.opacity = ease * (focusOf() ? 0.85 + Math.sin(glowPhase * 2.2) * 0.15 : 1);
    if (pinned) {
      const w = (now % 3.2) / 3.2;
      wave.scale.setScalar(1 + w * 9); wave.material.opacity = 0.6 * (1 - w);
    } else wave.material.opacity = 0;

    if (now > nextPass && !focusOf()) { forwardPass(passIdx % PROJECTS.length); passIdx++; nextPass = now + 3.4; }
    if (now > nextAmbient) { fire(edges[(rnd() * edges.length) | 0], 0, rnd() < 0.6 ? MID : DARK, 0.45); nextAmbient = now + (isSmall ? 0.12 : 0.06); }

    pool.forEach((p) => {
      if (p.free) return;
      const t = (now - p.t0) / p.dur;
      if (t < 0) { p.s.visible = false; return; }
      if (t >= 1) {
        p.free = true; p.s.visible = false;
        const n = neurons[p.e.l + 1][p.e.b]; n.act = Math.max(n.act, p.k);
        if (p.k > 0.6) neurons[p.e.l][p.e.a].act = Math.max(neurons[p.e.l][p.e.a].act, 0.6);
        return;
      }
      p.s.visible = true;
      p.s.position.lerpVectors(p.e.A, p.e.B, t);
      p.s.material.opacity = Math.sin(t * Math.PI) * p.k;
    });

    neurons.forEach((layer) => layer.forEach((n) => {
      n.act *= Math.exp(-dt * 1.1);
      n.dim += (n.dimT - n.dim) * Math.min(1, dt * 6);
      const keep = 1 - n.dim * 0.82;
      n.ball.scale.setScalar(1 + n.act * 0.6);
      n.ball.material.opacity = keep;
      n.halo.material.opacity = (n.rest + n.act * 0.85) * ease * keep;
      if (n.shell) { n.shell.rotation.set(now * 0.3 + n.ni, now * 0.4, 0); n.shell.material.opacity = (n.li === LAST ? 0.75 : 0.4) * keep; }
    }));
    outLabels.forEach((el, k) => el.classList.toggle('fire', neurons[LAST][k].act > 0.35));
    inLabels.forEach((el, s) => el.classList.toggle('fire', neurons[0][s].act > 0.35));
    neurons[0].forEach((n, i) => placeLabel(inLabels[i], n));
    neurons[LAST].forEach((n, k) => placeLabel(outLabels[k], n));
    renderer.render(scene, camera);
  }

  let running = false, last = 0;
  function loop() {
    if (running || reduceMotion) return;
    running = true; last = performance.now();
    const tick = (ts) => {
      if (!visible) { running = false; return; }
      const dt = Math.min((ts - last) / 1000, 0.05); last = ts;
      frame(dt);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }
  if (reduceMotion) {
    intro = 1;
    const still = () => { now = 4; frame(0); };
    still();
    window.addEventListener('resize', () => { resize(); still(); });
    window.addEventListener('pointermove', () => { if (drag.on) frame(0); });
    ['click', 'pointerover'].forEach((t) => hero.addEventListener(t, () => requestAnimationFrame(() => frame(0))));
  } else {
    loop();
  }
})();
