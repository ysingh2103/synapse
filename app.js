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
    metrics: [['23', 'stores modelled'], ['10', 'incident drills'], ['5', 'traffic flows']],
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
    metrics: [['7', 'failure scenarios'], ['4', 'monitoring signals']],
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
    metrics: [['11', 'incident write-ups'], ['9', 'technologies']],
    repo: 'https://github.com/ysingh2103/Infra-lab',
    live: null,
    hostNote: 'Self-hosted on a VMware ESXi home lab. Write-ups are published in the repo.',
    inputs: [1, 3, 4, 6]
  },
  {
    id: 'docvault',
    name: 'DocVault',
    status: 'build', statusText: 'In build · Windows leg',
    subtitle: 'Document management on the enterprise support stack',
    desc: 'Upload, list, filter and download documents. Files live on disk and metadata in PostgreSQL, served by a Java app on Tomcat 10 behind NGINX.',
    tags: ['Web servers', 'Databases', 'Java'],
    shot: 'shots/docvault.jpg', shotNote: "DocVault's real interface, shown with sample documents",
    highlights: [
      'Database access through a Tomcat-managed JNDI connection pool, with no credentials in code',
      'Browser → NGINX → Tomcat 10 → PostgreSQL, deployed with systemd drop-ins',
      'Full-text search with viewer, editor and admin roles, plus request IDs traced from NGINX through Tomcat',
      'Now adding a Windows leg: IIS as a second front door and SQL Server Express'
    ],
    stack: ['Java', 'Tomcat 10', 'NGINX', 'PostgreSQL', 'IIS', 'Maven', 'Linux', 'systemd'],
    metrics: [['3', 'stages shipped'], ['8', 'technologies']],
    stages: [['Core app', 1], ['Search & roles', 1], ['Request tracing', 1], ['Windows leg', 0.5], ['Monitoring', 0], ['Break-fix trainer', 0]],
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
    metrics: [['2', 'lab servers'], ['7', 'technologies']],
    stages: [['Health API', 1], ['Heartbeat service', 1], ['Fault injection', 0.3], ['Azure deployment', 0]],
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

/* smooth, weighted scrolling like the portfolio */
let lenis = null;
if (!reduceMotion && window.Lenis) {
  try {
    lenis = new Lenis({ lerp: 0.075, wheelMultiplier: 0.9, smoothWheel: true });
    const raf = (t) => { lenis.raf(t); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
  } catch (e) { lenis = null; }
}
const goTo = (el, opts = {}) => {
  if (!el) return;
  if (lenis) lenis.scrollTo(el, { duration: 1.5, offset: opts.offset || 0 });
  else el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: opts.block || 'start' });
};
document.addEventListener('click', (e) => {
  const a = e.target.closest && e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute('href'); const el = id.length > 1 && document.querySelector(id);
  if (!el) return;
  e.preventDefault(); goTo(el);
});
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pretty = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');
const indexOfProject = (id) => PROJECTS.findIndex((p) => p.id === id);

/* the network registers its controls here once it has loaded */
const Net = { focusProjects() {}, clearPinned() {}, preview() {}, endPreview() {}, pinSkill() {}, pos: null };

/* ================= Project case studies ================= */
const ICON = {
  gh: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.7c-2.8.6-3.4-1.3-3.4-1.3-.5-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 2.9.8.1-.6.4-1.1.6-1.3-2.2-.3-4.6-1.1-4.6-5a3.9 3.9 0 0 1 1-2.7c-.1-.3-.5-1.3.1-2.7 0 0 .9-.3 2.8 1a9.6 9.6 0 0 1 5 0c1.9-1.3 2.8-1 2.8-1 .6 1.4.2 2.4.1 2.7a3.9 3.9 0 0 1 1 2.7c0 3.9-2.4 4.7-4.6 5 .4.3.7.9.7 1.9V21c0 .3.2.6.7.5A10 10 0 0 0 12 2z" fill="currentColor"/></svg>',
  doc: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 3h7l5 5v13H7z M14 3v5h5 M10 13h6 M10 17h6" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/></svg>',
  play: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5l11 7-11 7z" fill="currentColor"/></svg>'
};
const manifest = document.getElementById('manifest');
manifest.innerHTML = PROJECTS.map((p, k) => {
  const primary = p.live
    ? `<a class="btn btn-ind" href="${p.live}" target="_blank" rel="noopener">Live demo ↗</a>`
    : `<a class="btn btn-solid" href="${p.repo}" target="_blank" rel="noopener">Source code ↗</a>`;
  const stages = p.stages ? `
      <div class="stages" aria-label="Build progress">
        <div class="stage-bar">${p.stages.map(([n, d]) => `<i class="${d >= 1 ? 'done' : d > 0 ? 'now' : ''}" style="--d:${d}" title="${esc(n)}"></i>`).join('')}</div>
        <p class="stage-now">${(() => { const cur = p.stages.find(([, d]) => d < 1); const done = p.stages.filter(([, d]) => d >= 1).length; return `<b>${done} of ${p.stages.length}</b> stages done${cur ? ` · now: ${esc(cur[0])}` : ''}`; })()}</p>
      </div>` : '';
  return `
  <li class="case${k === 0 ? ' featured' : k % 2 ? '' : ' flip'}" id="${p.id}" data-k="${k}">
    <span class="socket" aria-hidden="true"></span>
    <figure class="shot">
      <div class="shot-frame">
        <img src="${p.shot}" alt="${esc(p.name)}: ${esc(p.shotNote)}" loading="lazy" width="960" height="600">
        ${p.live ? `<button type="button" class="try" data-k="${k}">${ICON.play}<span>Try it here</span></button>` : ''}
      </div>
      <figcaption>${esc(p.shotNote)}</figcaption>
    </figure>
    <div class="case-body">
      <div class="case-top">
        <span class="status ${p.status}">${esc(p.statusText)}</span>
        <span class="case-idx">${k === 0 ? 'Flagship' : String(k + 1).padStart(2, '0') + ' / ' + String(PROJECTS.length).padStart(2, '0')}</span>
      </div>
      <h3 class="case-title">${esc(p.name)}</h3>
      <p class="case-sub">${esc(p.subtitle)}</p>
      <div class="metrics">${(p.metrics || []).map(([n, l]) => `<div><b data-n="${esc(n)}">${esc(n)}</b><span>${esc(l)}</span></div>`).join('')}</div>
      <p class="case-desc">${esc(p.desc)}</p>
      ${stages}
      <div class="powered"><span class="powered-l">Powered by</span>${p.inputs.map((i) => `<button type="button" class="pchip" data-skill="${i}">${esc(SKILLS[i])}</button>`).join('')}</div>
      <div class="case-actions">
        ${primary}
        ${p.live ? `<a class="icon-btn" href="${p.repo}" target="_blank" rel="noopener" aria-label="Source code on GitHub" title="Source code">${ICON.gh}</a>` : ''}
        <button type="button" class="icon-btn btn-more" aria-label="Read the case study" title="Case study">${ICON.doc}<span>Case study</span></button>
      </div>
    </div>
  </li>`;
}).join('');

/* case study drawer */
const drawer = document.createElement('div');
drawer.className = 'cs-bg'; drawer.hidden = true;
drawer.innerHTML = '<aside class="cs" role="dialog" aria-modal="true" aria-labelledby="cs-title" data-lenis-prevent></aside>';
document.body.appendChild(drawer);
const csPanel = drawer.firstElementChild;
let csReturn = null;
function openCase(k) {
  const p = PROJECTS[k];
  csReturn = document.activeElement;
  csPanel.innerHTML = `
    <button type="button" class="cs-close" aria-label="Close case study">✕</button>
    <span class="status ${p.status}">${esc(p.statusText)}</span>
    <h3 id="cs-title">${esc(p.name)}</h3>
    <p class="case-sub">${esc(p.subtitle)}</p>
    <p class="cs-desc">${esc(p.desc)}</p>
    <h4>What I built</h4>
    <ul>${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
    ${p.stages ? `<h4>Build progress</h4><ol class="cs-stages">${p.stages.map(([n, d]) => `<li class="${d >= 1 ? 'done' : d > 0 ? 'now' : ''}">${esc(n)}</li>`).join('')}</ol>` : ''}
    <h4>Technologies</h4>
    <div class="chips">${p.stack.map((t) => `<span class="chip">${esc(t)}</span>`).join('')}</div>
    <h4>Hosted at</h4>
    ${p.live ? `<p class="host">${esc(pretty(p.live))}</p>` : `<p class="host muted">${esc(p.hostNote)}</p>`}
    <div class="case-actions">
      ${p.live ? `<a class="btn btn-ind" href="${p.live}" target="_blank" rel="noopener">Live demo ↗</a>` : ''}
      <a class="btn ${p.live ? 'btn-ghost' : 'btn-solid'}" href="${p.repo}" target="_blank" rel="noopener">Source code ↗</a>
    </div>`;
  drawer.hidden = false;
  document.documentElement.classList.add('cs-open'); if (lenis) lenis.stop();
  csPanel.querySelector('.cs-close').addEventListener('click', closeCase);
  csPanel.querySelector('.cs-close').focus();
}
function closeCase() { drawer.hidden = true; document.documentElement.classList.remove('cs-open'); if (lenis) lenis.start(); if (csReturn) csReturn.focus(); }
drawer.addEventListener('click', (e) => { if (e.target === drawer) closeCase(); });
addEventListener('keydown', (e) => { if (e.key === 'Escape' && !drawer.hidden) closeCase(); });

/* live demo inside the card */
function tryLive(card, k) {
  const frame = card.querySelector('.shot-frame');
  if (frame.querySelector('iframe')) return;
  const p = PROJECTS[k];
  frame.classList.add('live');
  frame.insertAdjacentHTML('beforeend', `<iframe src="${p.live}" title="${esc(p.name)} live demo" loading="lazy" allow="fullscreen"></iframe><button type="button" class="try-close" aria-label="Close live demo">✕ Close demo</button><a class="try-open" href="${p.live}" target="_blank" rel="noopener">Open full screen ↗</a>`);
  frame.querySelector('.try-close').addEventListener('click', () => { frame.classList.remove('live'); frame.querySelectorAll('iframe,.try-close,.try-open').forEach((n) => n.remove()); });
}

manifest.querySelectorAll('.case').forEach((card) => {
  const k = +card.dataset.k;
  card.addEventListener('pointerenter', () => Net.preview(k));
  card.addEventListener('pointerleave', () => Net.endPreview());
  card.querySelector('.btn-more').addEventListener('click', () => openCase(k));
  const t = card.querySelector('.try'); if (t) t.addEventListener('click', () => tryLive(card, k));
  card.querySelectorAll('.pchip').forEach((c) => {
    c.addEventListener('click', () => {
      goTo(document.getElementById('top'));
      setTimeout(() => Net.pinSkill(+c.dataset.skill), reduceMotion ? 0 : 650);
    });
  });
});
function dockAt(id, openDetails) {
  const el = document.getElementById(id);
  if (!el) return;
  goTo(el, { offset: -120, block: 'center' });
  el.classList.remove('is-target'); void el.offsetWidth; el.classList.add('is-target');
  if (openDetails) setTimeout(() => openCase(+el.dataset.k), reduceMotion ? 0 : 500);
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
        <pre class="console" id="sim-console" aria-live="polite" data-lenis-prevent><span class="c-dim">Ticket ${esc(s.ticket)} opened. Pick a component on the diagram to investigate.</span></pre>
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
    pts.forEach((p, i) => { ctx.fillStyle = i % 9 ? 'rgba(255,255,255,.22)' : 'rgba(165,123,255,.7)'; ctx.beginPath(); ctx.arc(p.x, p.y, i % 9 ? 1.4 : 2.2, 0, 6.283); ctx.fill(); });
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
  const BLOOM = !!(THREE.EffectComposer && THREE.RenderPass && THREE.UnrealBloomPass) && window.innerWidth >= 700;
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, BLOOM ? 1.5 : 2));
  if (BLOOM) renderer.setClearColor(0x0A0A0B, 1);

  const WHITE = '#ffffff', LIGHT = '#e5e5e5', MID = '#a3a3a3', DARK = '#737373', ACCENT = '#6F00FF', ACCENT_HI = '#A57BFF';
  const isSmall = window.innerWidth < 700;

  const scene = new THREE.Scene();
  let composer = null, bloomPass = null;
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
  const nebula = glow(ACCENT, 30); nebula.material.opacity = 0.16; nebula.position.set(0, -0.6, -8); rig.add(nebula);
  const nebula2 = glow(ACCENT_HI, 14); nebula2.material.opacity = 0.12; nebula2.position.set(0, -2.2, -4); rig.add(nebula2);
  const dust2 = new THREE.Points(dustGeo, new THREE.PointsMaterial({ color: ACCENT_HI, map: glowTex, size: 0.17, transparent: true, opacity: 0.8, depthWrite: false, blending: THREE.AdditiveBlending }));
  dust2.rotation.y = 1.7; dust2.scale.setScalar(0.85);
  rig.add(dust2);

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
  const ringA = new THREE.Line(circle(4.2), lineMat(ACCENT_HI, 0.55));
  const ringB = new THREE.Group();
  [[0, 1.7], [2.2, 3.9], [4.5, 5.8]].forEach(([a, b]) => ringB.add(new THREE.Line(circle(5.6, 90, a, b), lineMat(MID, 0.5))));
  const ringC = new THREE.Line(circle(7.4), new THREE.LineDashedMaterial({ color: DARK, dashSize: 0.22, gapSize: 0.32, transparent: true, opacity: 0.45, depthWrite: false }));
  ringC.computeLineDistances();
  const lensHot = glow(ACCENT_HI, 2.6); lensHot.material.opacity = 0.45;
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

  /* glass-like neuron: bright core fading to an indigo rim */
  const rimVert = 'varying vec3 vN; varying vec3 vV; void main(){ vec4 mv = modelViewMatrix * vec4(position, 1.0); vN = normalize(normalMatrix * normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }';
  const rimFrag = 'uniform vec3 uCore; uniform vec3 uRim; uniform float uOpacity; uniform float uBoost; varying vec3 vN; varying vec3 vV; void main(){ float f = pow(1.0 - max(dot(vN, vV), 0.0), 2.2); vec3 c = mix(uCore, uRim, f) * (1.0 + uBoost) + uRim * f * 0.9; gl_FragColor = vec4(c, uOpacity); }';
  const neuronMat = (core, rim) => {
    const m = new THREE.ShaderMaterial({ uniforms: { uCore: { value: new THREE.Color(core) }, uRim: { value: new THREE.Color(rim) }, uOpacity: { value: 1 }, uBoost: { value: 0 } }, vertexShader: rimVert, fragmentShader: rimFrag, transparent: true });
    Object.defineProperty(m, 'opacity', { get() { return this.uniforms ? this.uniforms.uOpacity.value : 1; }, set(v) { if (this.uniforms) this.uniforms.uOpacity.value = v; } });
    return m;
  };
  const ringTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d'); g.strokeStyle = '#fff'; g.lineWidth = 5; g.beginPath(); g.arc(64, 64, 56, 0, Math.PI * 2); g.stroke();
    return new THREE.CanvasTexture(c);
  })();
  const ringSprite = (color) => new THREE.Sprite(new THREE.SpriteMaterial({ map: ringTex, color, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }));
  const STATUS_HEX = { live: ACCENT_HI, build: WHITE, early: MID };

  const neurons = layerPos.map((arr, li) => arr.map((p, ni) => {
    const isIn = li === 0, isOut = li === LAST;
    const hex = isOut ? OUT_HEX[ni] : LAYER_HEX[li];
    const g = new THREE.Group(); g.position.copy(p);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(isOut ? 0.27 : isIn ? 0.19 : 0.14, 32, 32), neuronMat(isOut || isIn ? WHITE : hex, isOut || isIn ? ACCENT_HI : '#7B4DFF'));
    const halo = glow(isOut ? WHITE : li % 2 ? ACCENT_HI : hex, isOut ? 2.8 : 1.6);
    g.add(ball, halo);
    let status = null;
    if (isOut) { status = ringSprite(STATUS_HEX[PROJECTS[ni].status] || WHITE); status.scale.setScalar(1.5); g.add(status); }
    let shell = null;
    if (isOut || isIn) {
      shell = new THREE.Mesh(isOut ? new THREE.OctahedronGeometry(0.6, 0) : new THREE.IcosahedronGeometry(0.34, 0),
        new THREE.MeshBasicMaterial({ color: isOut ? hex : MID, wireframe: true, transparent: true, opacity: isOut ? 0.75 : 0.4 }));
      g.add(shell);
    }
    net.add(g);
    return { g, ball, halo, shell, status, act: 0, rest: isOut ? 0.55 : 0.3, li, ni, hex, dim: 0, dimT: 0, at: 0.25 + li * 0.38 + ni * 0.035 };
  }));

  /* synapses */
  const usesProject = (k, e) =>
    e.l === 0 ? PROJECTS[k].inputs.includes(e.a)
    : e.l === LAST - 1 ? e.b === k
    : ((e.h * 7.13 + k * 0.371 + e.l * 0.17) % 1) < 0.26;
  const allEdges = [];
  for (let l = 0; l < LAST; l++) layerPos[l].forEach((A, a) => layerPos[l + 1].forEach((B, b) => allEdges.push({ l, a, b, A, B, h: rnd() })));
  /* keep every wire a project uses, thin the rest of the hidden layers */
  const edges = allEdges.filter((e) => e.l === 0 || e.l === LAST - 1 || PROJECTS.some((_, k) => usesProject(k, e)) || e.h < 0.3);
  edges.forEach((e) => {
    const f = ((e.h * 13.7) % 1) - 0.5;
    e.C = new THREE.Vector3((e.A.x + e.B.x) / 2, (e.A.y + e.B.y) / 2 + (e.h - 0.5) * 0.9, (e.A.z + e.B.z) / 2 + f * 1.3);
  });
  const SEG = 10;
  const bez = (e, t, out) => { const u = 1 - t; return out.set(u * u * e.A.x + 2 * u * t * e.C.x + t * t * e.B.x, u * u * e.A.y + 2 * u * t * e.C.y + t * t * e.B.y, u * u * e.A.z + 2 * u * t * e.C.z + t * t * e.B.z); };
  const projectsForSkill = (s) => PROJECTS.map((p, k) => (p.inputs.includes(s) ? k : -1)).filter((k) => k >= 0);

  const ePos = new Float32Array(edges.length * SEG * 6), eCol = new Float32Array(edges.length * SEG * 6);
  { const p = new THREE.Vector3(), q = new THREE.Vector3();
    edges.forEach((e, i) => { for (let j = 0; j < SEG; j++) { bez(e, j / SEG, p); bez(e, (j + 1) / SEG, q); ePos.set([p.x, p.y, p.z, q.x, q.y, q.z], (i * SEG + j) * 6); } }); }
  const eGeo = new THREE.BufferGeometry();
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3));
  const eMat = new THREE.LineBasicMaterial({ vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  net.add(new THREE.LineSegments(eGeo, eMat));

  const REST_END = new THREE.Color('#3d3d44'), REST_MID = new THREE.Color('#26262c'), FAINT = new THREE.Color('#0c0b10');
  const TINT = new THREE.Color('#24135a'), TINT_ON = new THREE.Color(ACCENT_HI), tmpA = new THREE.Color(), tmpB = new THREE.Color();
  let wireReveal = (l) => (reduceMotion ? 1 : 0);   // boot-up draws the wires layer by layer
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
      let a = restAt(e.l), b = restAt(e.l + 1), tint = TINT, mix = 0.75;
      if (f) {
        const on = edgeOn(f, e);
        if (on) { relevant.add(e.l + ':' + e.a); relevant.add(e.l + 1 + ':' + e.b); }
        a = b = on ? f.color : FAINT; tint = on ? TINT_ON : FAINT; mix = on ? 0.55 : 0;
      }
      const rev = wireReveal(e.l);
      for (let j = 0; j < SEG; j++) {
        const t0 = j / SEG, t1 = (j + 1) / SEG, v0 = t1 <= rev ? 1 : t0 < rev ? (rev - t0) * SEG : 0;
        tmpA.copy(a).lerp(b, t0).lerp(tint, t0 * mix).multiplyScalar(v0);
        tmpB.copy(a).lerp(b, t1).lerp(tint, t1 * mix).multiplyScalar(v0);
        eCol.set([tmpA.r, tmpA.g, tmpA.b, tmpB.r, tmpB.g, tmpB.b], (i * SEG + j) * 6);
      }
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
  const pool = Array.from({ length: 240 }, () => {
    const s = glow(WHITE, 0.6); s.visible = false; net.add(s);
    const tail = [0.55, 0.35, 0.2].map((k) => { const t = glow(WHITE, 0.6); t.visible = false; t.userData.k = k; net.add(t); return t; });
    return { s, tail, e: null, t0: 0, dur: 0, k: 1, free: true };
  });
  const waves = Array.from({ length: 10 }, () => { const r = ringSprite(ACCENT_HI); r.visible = false; net.add(r); return { r, t0: -9, n: null }; });
  const shock = (n, hex) => { const w = waves.find((q) => now - q.t0 > 0.9) || waves[0]; w.t0 = now; w.n = n; w.r.material.color.set(hex); };
  const bp = new THREE.Vector3();
  let now = 0;
  function fire(e, delay, hex, strength) {
    const p = pool.find((q) => q.free);
    if (!p) return;
    p.free = false; p.e = e; p.t0 = now + delay; p.dur = 1.15 + rnd() * 0.3; p.k = strength;
    p.s.material.color.set(hex);
    const sz = strength > 0.6 ? (e.l === 0 ? 0.42 : 0.56) : 0.36;
    p.s.scale.setScalar(sz);
    p.tail.forEach((t) => { t.material.color.set(hex); t.scale.setScalar(sz * (0.4 + t.userData.k)); });
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

  const layerTags = ['Diagnose', 'Build', 'Document'].map((name, i) => {
    const el = document.createElement('span'); el.className = 'net-label layer'; el.textContent = name; labelLayer.appendChild(el);
    const anchor = new THREE.Object3D(); anchor.position.set(LX[i + 1], 2.65, 0); net.add(anchor);
    return { el, anchor };
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
  Net.pinSkill = (i) => { closePanel(false); pinSkill(i); };
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
    if (BLOOM) {
      if (!composer) {
        composer = new THREE.EffectComposer(renderer);
        composer.addPass(new THREE.RenderPass(scene, camera));
        bloomPass = new THREE.UnrealBloomPass(new THREE.Vector2(W, H), 0.62, 0.45, 0.22);
        composer.addPass(bloomPass);
      }
      composer.setSize(W, H);
    }
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
    blocks = [...document.querySelectorAll('.dock, .copy-l > *, .copy-r > *, .net-hud > *')].map((el) => {
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
  let intro = 0, nextPass = 2.9, nextAmbient = 1.8;
  const BOOT_END = 0.25 + LAST * 0.38 + 0.55 + 0.6;
  wireReveal = (l) => reduceMotion ? 1 : Math.min(1, Math.max(0, (now - (0.5 + l * 0.38)) / 0.55));

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
    dust.rotation.y = now * 0.01; dust2.rotation.y = 1.7 - now * 0.014;
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

    if (now > nextPass && !focusOf()) { forwardPass(passIdx % PROJECTS.length, passIdx % 2 ? ACCENT_HI : WHITE); passIdx++; nextPass = now + 3.4; }
    if (now > nextAmbient) { fire(edges[(rnd() * edges.length) | 0], 0, rnd() < 0.18 ? ACCENT_HI : rnd() < 0.6 ? MID : DARK, 0.45); nextAmbient = now + (isSmall ? 0.12 : 0.06); }

    pool.forEach((p) => {
      if (p.free) return;
      const t = (now - p.t0) / p.dur;
      if (t < 0) { p.s.visible = false; return; }
      if (t >= 1) {
        p.free = true; p.s.visible = false; p.tail.forEach((t) => { t.visible = false; });
        const n = neurons[p.e.l + 1][p.e.b]; n.act = Math.max(n.act, p.k);
        if (p.k > 0.6 && p.e.l + 1 === LAST) shock(n, p.s.material.color.getHex());
        if (p.k > 0.6) neurons[p.e.l][p.e.a].act = Math.max(neurons[p.e.l][p.e.a].act, 0.6);
        return;
      }
      p.s.visible = true;
      bez(p.e, t, p.s.position);
      const op = Math.sin(t * Math.PI) * p.k * (BLOOM ? 0.75 : 1);
      p.s.material.opacity = op;
      p.tail.forEach((tl, j) => {
        const tt = t - (j + 1) * 0.045;
        if (p.k <= 0.6 || tt <= 0) { tl.visible = false; return; }
        tl.visible = true; bez(p.e, tt, tl.position); tl.material.opacity = op * tl.userData.k;
      });
    });

    if (now < BOOT_END + 0.2) paint();
    waves.forEach((w) => {
      const k = (now - w.t0) / 0.8;
      if (!w.n || k < 0 || k > 1) { w.r.visible = false; return; }
      w.r.visible = true; w.n.g.getWorldPosition(bp); net.worldToLocal(bp); w.r.position.copy(bp);
      w.r.scale.setScalar(0.8 + k * 3.2); w.r.material.opacity = 0.9 * (1 - k) * (1 - k);
    });
    neurons.forEach((layer) => layer.forEach((n) => {
      n.act *= Math.exp(-dt * 1.1);
      n.dim += (n.dimT - n.dim) * Math.min(1, dt * 6);
      const keep = 1 - n.dim * 0.82;
      const ap = reduceMotion ? 1 : Math.min(1, Math.max(0, (now - n.at) / 0.45)), apE = 1 - Math.pow(1 - ap, 3);
      n.g.scale.setScalar(Math.max(0.001, apE));
      n.ball.scale.setScalar(1 + n.act * 0.6);
      n.ball.material.opacity = keep * ap;
      n.ball.material.uniforms.uBoost.value = n.act * 0.8;
      n.halo.material.opacity = (n.rest + n.act * 0.85) * ease * keep * ap * (BLOOM ? 0.7 : 1);
      if (n.status) { n.status.scale.setScalar(1.35 + Math.sin(now * 2 + n.ni) * 0.12 + n.act * 0.4); n.status.material.opacity = (0.45 + n.act * 0.5) * keep * ap; }
      if (n.shell) { n.shell.rotation.set(now * 0.3 + n.ni, now * 0.4, 0); n.shell.material.opacity = (n.li === LAST ? 0.75 : 0.4) * keep; }
    }));
    outLabels.forEach((el, k) => el.classList.toggle('fire', neurons[LAST][k].act > 0.35));
    inLabels.forEach((el, s) => el.classList.toggle('fire', neurons[0][s].act > 0.35));
    neurons[0].forEach((n, i) => placeLabel(inLabels[i], n));
    neurons[LAST].forEach((n, k) => placeLabel(outLabels[k], n));
    { const out = Net.pos || (Net.pos = []); let c = 0;
      neurons.forEach((layer) => layer.forEach((n) => { n.g.getWorldPosition(wp); v.copy(wp).project(camera);
        out[c++] = { x: (v.x * 0.5 + 0.5) * W, y: (-v.y * 0.5 + 0.5) * H, li: n.li, ni: n.ni, last: n.li === LAST }; }));
      out.length = c; }
    layerTags.forEach(({ el, anchor }, i) => {
      anchor.getWorldPosition(wp); v.copy(wp).project(camera);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H, a = reduceMotion ? 1 : Math.min(1, Math.max(0, (now - (0.6 + (i + 1) * 0.38)) / 0.6));
      el.style.transform = `translate(${x.toFixed(1)}px, ${y.toFixed(1)}px) translate(-50%, -50%)`;
      el.style.opacity = W <= 600 ? '0' : String((a * (focusOf() ? 0.45 : 0.85)).toFixed(2));
    });
    if (composer) composer.render(); else renderer.render(scene, camera);
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


/* ================= Portfolio-matched extras ================= */
/* faint rain behind everything */
(function rain() {
  const cv = document.getElementById('rain');
  if (!cv || reduceMotion) return;
  const ctx = cv.getContext('2d');
  const drops = Array.from({ length: 90 }, () => ({ x: Math.random(), y: Math.random(), l: 8 + Math.random() * 18, s: 0.0022 + Math.random() * 0.004 }));
  let W = 0, H = 0;
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  (function tick() {
    ctx.clearRect(0, 0, W, H); ctx.strokeStyle = 'rgba(242,242,244,.06)'; ctx.lineWidth = 1; ctx.beginPath();
    drops.forEach((r) => { r.y += r.s; if (r.y > 1.05) { r.y = -0.05; r.x = Math.random(); } const x = r.x * W, y = r.y * H; ctx.moveTo(x, y); ctx.lineTo(x, y + r.l); });
    ctx.stroke(); requestAnimationFrame(tick);
  })();
})();

/* dock highlights the section in view */
(function dockActive() {
  const links = [...document.querySelectorAll('.dock .pill a')];
  const secs = links.map((a) => document.querySelector(a.getAttribute('href'))).filter(Boolean);
  const set = () => {
    const mid = innerHeight * 0.4; let on = 0;
    secs.forEach((s, i) => { if (s.getBoundingClientRect().top <= mid) on = i; });
    links.forEach((a, i) => a.classList.toggle('on', i === on));
  };
  addEventListener('scroll', set, { passive: true }); set();
})();

/* electric beam cursor */
(function beam() {
  if (reduceMotion || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  const cv = document.createElement('canvas'); cv.id = 'cur'; cv.setAttribute('aria-hidden', 'true'); document.body.appendChild(cv);
  const ctx = cv.getContext('2d'); document.documentElement.classList.add('beam');
  let mx = -1e4, my = -1e4, pmx = -1e4, pmy = -1e4, hx = -1e4, hy = -1e4, vx = 0, vy = 0, ring = 12, hover = false;
  const trail = [];
  const size = () => { const d = Math.min(devicePixelRatio || 1, 2); cv.width = innerWidth * d; cv.height = innerHeight * d; ctx.setTransform(d, 0, 0, d, 0, 0); };
  size(); addEventListener('resize', size);
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; hover = !!(e.target.closest && e.target.closest('a,button,.tech,.net-label,.diagram .node,.hero.over-net')); }, { passive: true });
  document.addEventListener('mouseleave', () => { mx = my = -1e4; });
  const ind = '#A57BFF';
  (function tick() {
    ctx.clearRect(0, 0, innerWidth, innerHeight);
    if (mx > -1e3) {
      if (pmx > -1e3) { vx = vx * 0.6 + (mx - pmx) * 0.4; vy = vy * 0.6 + (my - pmy) * 0.4; } pmx = mx; pmy = my;
      if (hx < -1e3) { hx = mx; hy = my; } hx += (mx - hx) * 0.88; hy += (my - hy) * 0.88;
      trail.unshift([mx, my]); if (trail.length > 3) trail.length = 3;
      for (let k = 1; k < trail.length; k++) { trail[k][0] += (trail[0][0] - trail[k][0]) * 0.5; trail[k][1] += (trail[0][1] - trail[k][1]) * 0.5; }
      const sp = Math.min(1, Math.hypot(vx, vy) / 30);
      if (trail.length > 2) for (const pass of [0, 1]) {
        ctx.beginPath(); trail.forEach(([x, y], k) => { const j = pass ? 0 : (Math.random() - 0.5) * (2 + sp * 9) * (k / trail.length); k ? ctx.lineTo(x + j, y + j) : ctx.moveTo(x, y); });
        ctx.lineCap = 'round'; ctx.lineJoin = 'round';
        if (pass) { ctx.strokeStyle = 'rgba(255,255,255,.95)'; ctx.lineWidth = 1.4; ctx.shadowBlur = 0; } else { ctx.strokeStyle = ind; ctx.globalAlpha = 0.55; ctx.lineWidth = 4.5; ctx.shadowColor = ind; ctx.shadowBlur = 16; }
        ctx.stroke(); ctx.globalAlpha = 1;
      }
      ring += ((hover ? 24 : 13) - ring) * 0.36;
      ctx.shadowColor = ind; ctx.shadowBlur = 14; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(mx, my, 3, 0, 7); ctx.fill();
      ctx.shadowBlur = 0; ctx.strokeStyle = hover ? ind : 'rgba(255,255,255,.45)'; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.arc(hx, hy, ring, 0, 7); ctx.stroke();
    }
    requestAnimationFrame(tick);
  })();
})();

/* ================= The network unfolds into the page =================
   1 Break: leaving the hero, the network's wires snap with sparks.
   2 Scatter: the middle neurons become the faint background field.
   3 Dock: project neurons follow the reader and plug into their cards;
     threads link each card to the skills that power it; a spine joins them.
   4 Stack: skill neurons settle on the spine and patch into their tools.
   5 Simulator: the spine breaks; solving a ticket reconnects it.
   6 Status: the spine sends a heartbeat into the status panel.
   7 Footer: one last signal runs down the spine and fires the logo.
   Every step plays once and stays done. */
(function unfold() {
  const cv = document.getElementById('field');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const hero = document.getElementById('top');
  const orrery = document.getElementById('orrery');
  const cards = [...document.querySelectorAll('.case')];
  const stackGrid = document.getElementById('stack-grid');
  const sim = document.getElementById('sim');
  const panel = document.getElementById('status-panel');
  const statusHead = document.querySelector('#status .section-head');
  const logo = document.querySelector('.foot-brand .logo-mark');
  const foot = document.querySelector('.foot');
  const ACC = '165,123,255', WHT = '242,242,244', RED = '255,93,93';
  const clamp = (x, a = 0, b = 1) => Math.max(a, Math.min(b, x));
  const ease = (x) => { x = clamp(x); return x * x * (3 - 2 * x); };
  const easeOut = (x) => 1 - Math.pow(1 - clamp(x), 3);
  const lerp = (a, b, t) => a + (b - a) * t;
  const small = () => innerWidth < 700;
  const SKILL_TECH = [
    ['TCP/IP', 'DNS', 'DHCP', 'VLANs', 'IPsec VPN', 'SD-WAN'],
    ['Ubuntu Server', 'systemd', 'NGINX'],
    ['Windows Server', 'Active Directory'],
    ['PostgreSQL'],
    ['VMware ESXi', 'Docker', 'Kubernetes (k3s)'],
    ['IPsec VPN', 'Active Directory'],
    ['Python (Flask)', 'Prometheus', 'Grafana']
  ];

  let W = 0, H = 0;
  function size() { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); }
  size(); addEventListener('resize', size);

  const R = (el) => el.getBoundingClientRect();
  const spineX = () => { const c = cards[0]; if (!c) return 20; return Math.max(8, R(c).left - (small() ? 11 : 30)); };
  const docY = (vy) => vy + scrollY;

  /* ---------- state ---------- */
  let now = 0, last = performance.now();
  let inited = false, broken = -1;  // broken = time the break first finished (bp reached 1)
  let nodes = [], breakEdges = [];
  let field = [];
  const proj = [], skills = [];
  let stackT = -1, simT = -1, solvedT = -1, statusT = -1, footT = -1, waveT = -1, logoFired = false;
  let spineEnd = 0, lastBeat = 0, bp = 0;
  const sparks = [];
  function spark(x, y, n, col) { for (let i = 0; i < n; i++) { const a = Math.random() * 6.283, v = 40 + Math.random() * 160; sparks.push({ x, y, vx: Math.cos(a) * v, vy: Math.sin(a) * v, t: 0, life: 0.35 + Math.random() * 0.4, col }); } }

  /* the 2D twin of the hero network, read live from the 3D scene */
  function init() {
    const pos = Net.pos && Net.pos.length ? Net.pos : null;
    const cols = [7, 9, 12, 9, 5];
    if (pos) nodes = pos.map((p, j) => ({ j, li: p.li, ni: p.ni, last: p.last }));
    else cols.forEach((n, li) => { for (let ni = 0; ni < n; ni++) nodes.push({ j: -1, li, ni, last: li === 4, fx: 0.2 + li * 0.15, fy: 0.35 + (ni + 0.5) / n * 0.5 }); });
    nodes.forEach((n) => { n.r = Math.random(); n.px = null; n.py = null; });
    const byLayer = (l) => nodes.filter((n) => n.li === l);
    breakEdges = [];
    for (let l = 0; l < 4; l++) {
      const A = byLayer(l), B = byLayer(l + 1);
      A.forEach((a) => { for (let k = 0; k < 3; k++) { const b = B[(Math.random() * B.length) | 0]; if (b) breakEdges.push({ a, b, sb: 0.12 + Math.random() * 0.42, u: 0.3 + Math.random() * 0.4, sparked: false }); } });
    }
    // field: hidden neurons become part of it, plus extra faint neurons
    nodes.filter((n) => n.li > 0 && !n.last).forEach((n) => { n.f = { x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, r: 1.6 + Math.random() * 1.2, ind: n.li % 2 === 1 || Math.random() < 0.3, own: true }; field.push(n.f); });
    for (let i = 0; i < (small() ? 50 : 110); i++) field.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 8, vy: (Math.random() - 0.5) * 8, r: 0.8 + Math.random() * 1.2, ind: Math.random() < 0.15, own: false });
    nodes.filter((n) => n.last).forEach((n) => { proj[n.ni] = { node: n, state: 'scrub', k: n.ni }; });
    nodes.filter((n) => n.li === 0).forEach((n) => { skills[n.ni] = { node: n, state: 'scrub', i: n.ni }; });
    inited = true;
  }
  setTimeout(() => { if (!inited) init(); }, 2500);

  /* live viewport position of a network node inside the hero */
  function livePos(n, hr) {
    if (n.j >= 0 && Net.pos && Net.pos[n.j]) { const p = Net.pos[n.j]; return { x: hr.left + p.x, y: hr.top + p.y }; }
    return { x: hr.left + hr.width * n.fx, y: hr.top + hr.height * n.fy };
  }
  /* where the scroll has pushed it: layers spread apart and the whole net flows down the page */
  function scrubPos(n, hr) {
    const v = livePos(n, hr), cx = hr.left + hr.width / 2, cy = hr.top + hr.height * 0.58, e = ease(bp);
    const spread = 0.55 + n.r * 0.6;
    return {
      x: v.x + (v.x - cx) * e * spread + Math.sin(now * 0.8 + n.r * 9) * 6 * e,
      y: v.y + (v.y - cy) * e * 0.45 + e * H * (0.22 + n.r * 0.38) + Math.cos(now * 0.7 + n.r * 7) * 5 * e
    };
  }

  /* where things live, in viewport coordinates */
  const queuePos = (kind, i) => ({ x: spineX(), y: (small() ? 96 : 108) + (kind === 'p' ? i * 20 : 5 * 20 + 14 + i * 15) });
  const socketPos = (k) => { const s = cards[k] && cards[k].querySelector('.socket'); if (!s) return queuePos('p', k); const r = R(s); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; };
  const skillDock = (i) => { const r = R(stackGrid); return { x: spineX(), y: r.top + (i + 0.5) * (r.height / 7) }; };

  function nodePos(n, kind) {
    const idx = kind === 'p' ? n.k : n.i;
    const q = queuePos(kind, idx);
    if (n.state === 'scrub' || n.state === 'queue') {
      const t = ease((bp - 0.5) / 0.45), sp = n.sp || q;
      if (bp >= 0.97) n.state = 'queue'; else if (n.state === 'queue' && bp < 0.9) n.state = 'scrub';
      return n.state === 'queue' ? q : { x: lerp(sp.x, q.x, t), y: lerp(sp.y, q.y, t) };
    }
    const to = kind === 'p' ? socketPos(idx) : skillDock(idx);
    if (n.state === 'fly') {
      const t = clamp((now - n.t) / 1.1), e = ease(t);
      const c = { x: Math.min(n.q.x, to.x) - 50, y: lerp(n.q.y, to.y, 0.5) };
      const u = 1 - e;
      if (t >= 1) { n.state = 'docked'; n.dockT = now; onDock(kind, idx); }
      return { x: u * u * n.q.x + 2 * u * e * c.x + e * e * to.x, y: u * u * n.q.y + 2 * u * e * c.y + e * e * to.y };
    }
    return to;
  }
  function onDock(kind, idx) {
    if (kind === 'p') { const c = cards[idx]; c.classList.add('docked'); const p = socketPos(idx); spark(p.x, p.y, 16, ACC); ring(p.x, p.y + scrollY); }
    else { const p = skillDock(idx); spark(p.x, p.y, 8, ACC); }
  }
  const rings = [];
  function ring(x, dy, col = ACC, size = 60) { rings.push({ x, dy, t: now, col, size }); }

  /* ---------- drawing helpers ---------- */
  function dot(x, y, r, col, a, glow) {
    if (glow) { const g = ctx.createRadialGradient(x, y, 0, x, y, r * 5); g.addColorStop(0, `rgba(${col},${0.5 * a})`); g.addColorStop(1, `rgba(${col},0)`); ctx.globalAlpha = 1; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * 5, 0, 6.283); ctx.fill(); }
    ctx.globalAlpha = a; ctx.fillStyle = `rgb(${col})`; ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
  }
  function curve(x1, y1, x2, y2, prog, col, a, w) {
    if (prog <= 0) return;
    const cx1 = x1 + (x2 - x1) * 0.5, cy1 = y1, cx2 = x1 + (x2 - x1) * 0.5, cy2 = y2;
    ctx.globalAlpha = a; ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = w; ctx.beginPath(); ctx.moveTo(x1, y1);
    const N = 24, M = Math.max(1, Math.round(N * clamp(prog)));
    for (let i = 1; i <= M; i++) { const t = i / N, u = 1 - t; ctx.lineTo(u * u * u * x1 + 3 * u * u * t * cx1 + 3 * u * t * t * cx2 + t * t * t * x2, u * u * u * y1 + 3 * u * u * t * cy1 + 3 * u * t * t * cy2 + t * t * t * y2); }
    ctx.stroke();
  }
  /* a fibre between two neurons: sags under its own weight and ripples along its length */
  function fibre(ax, ay, bx, by, sag, amp, freq, ph, col, a, w) {
    if (a <= 0.01) return;
    const dx = bx - ax, dy = by - ay, L = Math.hypot(dx, dy) || 1, nx = -dy / L, ny = dx / L, N = 26;
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const t = i / N, env = Math.sin(Math.PI * t), wv = Math.sin(t * freq * 6.283 - now * 3.2 + ph) * amp * env;
      const x = ax + dx * t + nx * wv, y = ay + dy * t + ny * wv + sag * env;
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    ctx.globalAlpha = a * 0.35; ctx.strokeStyle = `rgb(${col})`; ctx.lineWidth = w + 3; ctx.stroke();
    ctx.globalAlpha = a; ctx.lineWidth = w; ctx.stroke();
  }
  /* a broken fibre hanging from a neuron: it bends toward the ground and a wave runs down it */
  function strand(x, y, dx, dy, L, k, ph, a) {
    if (a <= 0.01 || L < 2) return;
    const d = Math.hypot(dx, dy) || 1; let ux = dx / d, uy = dy / d;
    const g = ease(k);                                   // how far gravity has pulled it down
    const ex = lerp(ux, ux * 0.25, g), ey = lerp(uy, 1, g), el = Math.hypot(ex, ey) || 1;
    ux = ex / el; uy = ey / el;
    const nx = -uy, ny = ux, N = 22, len = L * (1 + g * 0.6);
    ctx.beginPath();
    for (let i = 0; i <= N; i++) {
      const t = i / N, wv = Math.sin(t * 2.6 * 6.283 - now * 4.2 + ph) * (2 + 12 * t) * (0.4 + g);
      const px = x + ux * len * t + nx * wv, py = y + uy * len * t + ny * wv + t * t * len * 0.25 * g;
      i ? ctx.lineTo(px, py) : ctx.moveTo(px, py);
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round';
    const gr = ctx.createLinearGradient(x, y, x + ux * len, y + uy * len + len * 0.25 * g);
    gr.addColorStop(0, `rgba(${ACC},${a})`); gr.addColorStop(0.7, `rgba(${ACC},${a * 0.5})`); gr.addColorStop(1, `rgba(${WHT},0)`);
    ctx.globalAlpha = 1; ctx.strokeStyle = gr; ctx.lineWidth = 1.2; ctx.stroke();
    ctx.globalAlpha = 0.25; ctx.lineWidth = 4; ctx.stroke();
  }
  const bezPt = (x1, y1, x2, y2, t) => { const cx = x1 + (x2 - x1) * 0.5, u = 1 - t; return { x: u * u * u * x1 + 3 * u * u * t * cx + 3 * u * t * t * cx + t * t * t * x2, y: u * u * u * y1 + 3 * u * u * t * y1 + 3 * u * t * t * y2 + t * t * t * y2 }; };

  /* ---------- per-card skill threads ---------- */
  const threads = cards.map((c) => [...c.querySelectorAll('.pchip')]);
  /* ---------- stack patch cables ---------- */
  const techEls = [...document.querySelectorAll('.tech')];
  const cables = [];
  SKILL_TECH.forEach((names, i) => names.forEach((nm) => { const el = techEls.find((t) => t.textContent.trim() === nm); if (el) cables.push({ i, el, d: Math.random() * 0.5 }); }));

  /* ---------- the simulator ticket ---------- */
  if (sim) new MutationObserver(() => { if (simT >= 0 && solvedT < 0 && sim.querySelector('.diag-opt.right')) { solvedT = now; const g = gapY(); spark(spineX(), g - scrollY, 30, ACC); ring(spineX(), g, ACC, 120); } }).observe(sim, { subtree: true, attributes: true, attributeFilter: ['class'] });
  const gapY = () => sim ? docY(R(sim).top) + 46 : 0;

  /* ---------- frame ---------- */
  function frame() {
    const t = performance.now(); const dt = Math.min(0.05, (t - last) / 1000); now += dt; last = t;
    ctx.clearRect(0, 0, W, H);
    const hr = R(hero), s = clamp(-hr.top / Math.max(1, hr.height));
    if (!inited && Net.pos && Net.pos.length) init();
    if (!inited) { requestAnimationFrame(frame); return; }
    // break progress follows the scroll (and rewinds if you scroll back up)
    bp = clamp((s - 0.03) / 0.62);
    if (bp >= 1 && broken < 0) broken = now;
    const netOp = 1 - clamp(bp / 0.14);
    hero.style.setProperty('--net-op', netOp.toFixed(3));
    hero.classList.toggle('broken', netOp < 0.03);
    const sx = spineX(), e = ease(bp);

    // background field drifts and slides with the scroll
    const scrollD = frame.lastY == null ? 0 : scrollY - frame.lastY; frame.lastY = scrollY;
    const vel = clamp(Math.abs(scrollD) / 40);
    field.forEach((p) => {
      p.vx *= 0.985; p.vy *= 0.985; p.vx += (Math.random() - 0.5) * 2; p.vy += (Math.random() - 0.5) * 2;
      p.x += p.vx * dt; p.y += p.vy * dt - scrollD * 0.22;
      if (p.x < -30) p.x = W + 30; if (p.x > W + 30) p.x = -30; if (p.y < -30) p.y = H + 30; if (p.y > H + 30) p.y = -30;
    });
    const fa = clamp((bp - 0.55) / 0.4);
    // where every hidden neuron is right now: exploded net → its place in the field
    nodes.forEach((n) => {
      const sp = scrubPos(n, hr);
      if (n.f) { const k = ease((bp - 0.5) / 0.45); n.x = lerp(sp.x, n.f.x, k); n.y = lerp(sp.y, n.f.y, k); }
      else { n.x = sp.x; n.y = sp.y; }
      n.sp = sp;
    });
    proj.forEach((n) => { if (n) n.sp = n.node.sp; });
    skills.forEach((n) => { if (n) n.sp = n.node.sp; });

    if (fa > 0) {
      ctx.lineWidth = 1; ctx.strokeStyle = `rgb(${WHT})`;
      for (let i = 0; i < field.length; i++) for (let j = i + 1; j < field.length; j++) {
        const a = field[i], b = field[j], dx = a.x - b.x, dy = a.y - b.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) { ctx.globalAlpha = (1 - d2 / 12000) * 0.09 * fa; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }
      }
      field.forEach((p) => { if (!p.own || bp >= 0.95) dot(p.x, p.y, p.r, p.ind ? ACC : WHT, (p.ind ? 0.7 : 0.4) * (p.own ? 1 : fa), false); });
    }

    // the 2D network: wires stretch, glow and snap as you scroll
    if (bp > 0.002 && bp < 0.999) {
      const fadeIn = clamp(bp / 0.08);
      breakEdges.forEach((ed) => {
        const A = ed.a, B = ed.b, ph = ed.u * 20;
        const fade = 1 - clamp((bp - 0.78) / 0.2);
        if (bp < ed.sb) {
          if (ed.sparked) ed.sparked = false;
          // intact fibre: sags and ripples more as the tension builds
          const tension = clamp(bp / ed.sb);
          const col = tension > 0.55 ? ACC : WHT;
          fibre(A.x, A.y, B.x, B.y, 8 + tension * 46 * (0.4 + e), 3 + tension * 9, 2.2, ph, col, (0.32 + tension * 0.38) * fadeIn * (tension > 0.88 && Math.random() < 0.25 ? 0.35 : 1), 1.2 - tension * 0.4);
        } else {
          // snapped: both ends hang off their neurons and stream downward like threads
          const ux = lerp(A.x, B.x, ed.u), uy = lerp(A.y, B.y, ed.u);
          if (!ed.sparked) { ed.sparked = true; spark(ux, uy, 6, Math.random() < 0.5 ? ACC : WHT); }
          const k = clamp((bp - ed.sb) / 0.35);
          const la = Math.hypot(ux - A.x, uy - A.y), lb = Math.hypot(ux - B.x, uy - B.y);
          strand(A.x, A.y, ux - A.x, uy - A.y, la * (1 - k * 0.25), k, ph, fade * 0.65);
          strand(B.x, B.y, ux - B.x, uy - B.y, lb * (1 - k * 0.25), k, ph + 3, fade * 0.65);
        }
      });
      // neurons, with motion streaks when you scroll fast
      nodes.forEach((n) => {
        if (n.last || n.li === 0) return;
        const a = (1 - clamp((bp - 0.8) / 0.18)) * fadeIn;
        if (n.px != null && vel > 0.05) { ctx.globalAlpha = 0.35 * vel * a; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 1.4; ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(n.x, n.y); ctx.stroke(); }
        dot(n.x, n.y, 2.3 + (1 - e) * 0.8, n.li % 2 ? ACC : WHT, 0.9 * a, true);
      });
    }
    nodes.forEach((n) => { n.px = n.x; n.py = n.y; });

    // 3 · project neurons: follow, then dock into their cards
    cards.forEach((c, k) => {
      const n = proj[k]; if (!n) return;
      if (n.state === 'queue' && R(c).top < H * 0.8) { n.q = queuePos('p', k); n.state = 'fly'; n.t = now; }
    });
    const qa = clamp(bp / 0.08);
    // queue connector
    const queued = proj.filter((n) => n && n.state === 'queue').length + skills.filter((n) => n && n.state === 'queue').length;
    if (queued > 1) { const a = queuePos('p', 0), b = queuePos('s', 6); ctx.globalAlpha = 0.18 * qa; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 1; ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke(); }

    // spine: grows to the furthest point reached
    const firstSock = proj[0] && proj[0].state === 'docked' ? docY(socketPos(0).y) : null;
    let target = 0;
    proj.forEach((n, k) => { if (n && n.state === 'docked') target = Math.max(target, docY(socketPos(k).y)); });
    if (stackT >= 0) target = Math.max(target, docY(R(stackGrid).bottom));
    if (simT >= 0) target = Math.max(target, docY(R(sim).bottom));
    if (statusT >= 0 && panel) target = Math.max(target, docY(branchY()));
    if (footT >= 0 && logo) target = Math.max(target, docY(R(logo).top + R(logo).height / 2));
    if (firstSock != null) {
      if (!spineEnd) spineEnd = firstSock;
      spineEnd = Math.min(target, spineEnd + 1400 * dt);
      drawSpine(sx, firstSock, spineEnd);
    }

    // threads from each docked card's socket to its "Powered by" chips
    proj.forEach((n, k) => {
      if (!n || n.state !== 'docked' || small()) return;
      const sp = socketPos(k), tt = now - n.dockT;
      threads[k].forEach((chip, j) => {
        const r = R(chip), pr = clamp((tt - 0.15 - j * 0.12) / 0.7);
        curve(sp.x, sp.y, r.left - 2, r.top + r.height / 2, pr, ACC, 0.5, 1.1);
        if (pr >= 1 && !chip.classList.contains('linked')) chip.classList.add('linked');
        if (pr >= 1) { const u = ((now * 0.45 + j * 0.33) % 1), q = bezPt(sp.x, sp.y, r.left - 2, r.top + r.height / 2, u); dot(q.x, q.y, 1.6, WHT, 0.8, false); }
      });
    });

    // 4 · stack: skills settle on the spine and patch into their tools
    if (stackT < 0 && stackGrid && R(stackGrid).top < H * 0.75 && broken >= 0) {
      stackT = now; skills.forEach((n) => { if (n) { n.q = queuePos('s', n.i); n.state = 'fly'; n.t = now + n.i * 0.08; } });
    }
    if (stackT >= 0 && !small()) {
      cables.forEach((cb) => {
        const n = skills[cb.i]; if (!n || n.state !== 'docked') return;
        const a = skillDock(cb.i), r = R(cb.el), b = { x: r.left - 1, y: r.top + r.height / 2 };
        const pr = clamp((now - n.dockT - cb.d) / 0.9);
        curve(a.x, a.y, b.x, b.y, pr, ACC, 0.5, 1.2);
        if (pr >= 1) { cb.el.classList.add('patched'); const u = ((now * 0.35 + cb.d * 2) % 1), q = bezPt(a.x, a.y, b.x, b.y, u); dot(q.x, q.y, 1.5, WHT, 0.75, false); }
      });
    }

    // 5 · simulator: the spine breaks until a ticket is solved
    if (simT < 0 && sim && R(sim).top < H * 0.72 && firstSock != null) simT = now;

    // 6 · status heartbeat
    if (statusT < 0 && panel && R(panel).top < H * 0.75 && firstSock != null) statusT = now;
    if (statusT >= 0 && panel && spineEnd >= docY(branchY()) - 2) {
      const by = branchY(), px = R(panel).left, pr = clamp((now - statusT - 0.4) / 0.7);
      ctx.globalAlpha = 0.5; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(sx, by); ctx.lineTo(lerp(sx, px, pr), by); ctx.stroke();
      if (pr >= 1) {
        const cyc = (now % 1.6) / 1.6;
        if (cyc < 0.35) { const x = lerp(sx, px, cyc / 0.35); dot(x, by, 2.4, WHT, 1, true); }
        if (now - lastBeat > 1.6 && cyc >= 0.35 && cyc < 0.4) { lastBeat = now; panel.classList.add('beat'); setTimeout(() => panel.classList.remove('beat'), 420); }
      }
    }

    // 7 · footer: a last signal runs down the spine and fires the logo
    if (footT < 0 && foot && R(foot).top < H * 0.8 && firstSock != null) footT = now;
    if (footT >= 0 && logo) {
      const lr = R(logo), ly = lr.top + lr.height / 2;
      if (spineEnd >= docY(ly) - 2) {
        ctx.globalAlpha = 0.5; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(sx, ly); ctx.lineTo(lr.left, ly); ctx.stroke();
        if (waveT < 0) waveT = now;
        const wt = (now - waveT) / 1.3;
        if (wt < 1) { const y0 = firstSock - scrollY, y = lerp(y0, ly, ease(wt)); const g = ctx.createLinearGradient(sx, y - 140, sx, y); g.addColorStop(0, `rgba(${ACC},0)`); g.addColorStop(1, 'rgba(255,255,255,.95)'); ctx.globalAlpha = 1; ctx.strokeStyle = g; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(sx, Math.max(y0, y - 140)); ctx.lineTo(sx, y); ctx.stroke(); dot(sx, y, 3, WHT, 1, true); }
        else if (!logoFired) { logoFired = true; logo.classList.add('fire'); spark(lr.left + lr.width / 2, ly, 34, ACC); ring(lr.left + lr.width / 2, docY(ly), ACC, 140); }
      }
    }

    // travelling neurons (drawn last so they sit on top of the lines)
    proj.forEach((n) => { if (!n) return; const p = nodePos(n, 'p'); const a = n.state === 'docked' ? 0.9 : qa; if (n.state !== 'docked' && n.px != null && vel > 0.05) { ctx.globalAlpha = 0.4 * vel * a; ctx.strokeStyle = 'rgb(255,255,255)'; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(n.px, n.py); ctx.lineTo(p.x, p.y); ctx.stroke(); } n.px = p.x; n.py = p.y; if (a > 0.01) dot(p.x, p.y, n.state === 'docked' ? 3 : 3.6, n.state === 'docked' ? ACC : WHT, a, true); });
    skills.forEach((n) => { if (!n) return; if (n.state === 'fly' && now < n.t) n.q = queuePos('s', n.i); const p = n.state === 'fly' && now < n.t ? n.q : nodePos(n, 's'); const a = n.state === 'docked' ? 0.95 : qa * 0.9; if (a > 0.01) dot(p.x, p.y, n.state === 'docked' ? 3 : 2.6, n.state === 'docked' ? WHT : ACC, a, true); });

    // sparks and rings
    for (let i = sparks.length - 1; i >= 0; i--) { const p = sparks[i]; p.t += dt; if (p.t > p.life) { sparks.splice(i, 1); continue; } p.x += p.vx * dt; p.y += p.vy * dt; p.vx *= 0.92; p.vy *= 0.92; ctx.globalAlpha = 1 - p.t / p.life; ctx.strokeStyle = `rgb(${p.col})`; ctx.lineWidth = 1.2; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(p.x - p.vx * 0.03, p.y - p.vy * 0.03); ctx.stroke(); }
    for (let i = rings.length - 1; i >= 0; i--) { const r = rings[i], k = (now - r.t) / 0.8; if (k > 1) { rings.splice(i, 1); continue; } ctx.globalAlpha = 0.8 * (1 - k); ctx.strokeStyle = `rgb(${r.col})`; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.arc(r.x, r.dy - scrollY, 6 + k * r.size, 0, 6.283); ctx.stroke(); }

    ctx.globalAlpha = 1;
    requestAnimationFrame(frame);
  }

  function branchY() { const pr = R(panel), hb = statusHead ? R(statusHead).bottom : pr.top; let y = Math.max(hb + 28, pr.top + 34); if (y > pr.bottom - 14) y = pr.top + pr.height / 2; return y; }

  function drawSpine(sx, topDoc, endDoc) {
    const top = topDoc - scrollY, end = endDoc - scrollY;
    const gy = simT >= 0 ? gapY() - scrollY : null;
    const gapOpen = gy != null && endDoc > gapY() - 2 && (solvedT < 0 || now - solvedT < 0.5);
    const close = solvedT >= 0 ? clamp((now - solvedT) / 0.5) : 0;
    const seg = (a, b, alpha, dash) => { if (b <= a) return; ctx.globalAlpha = alpha; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 1.4; ctx.setLineDash(dash ? [4, 6] : []); ctx.beginPath(); ctx.moveTo(sx, a); ctx.lineTo(sx, b); ctx.stroke(); ctx.setLineDash([]); };
    // soft glow under the spine
    ctx.globalAlpha = 0.12; ctx.strokeStyle = `rgb(${ACC})`; ctx.lineWidth = 6; ctx.beginPath(); ctx.moveTo(sx, top); ctx.lineTo(sx, end); ctx.stroke();
    if (gapOpen) {
      const g = 10 * (1 - close);
      seg(top, gy - g, 0.75, false);
      seg(gy + g, end, solvedT >= 0 ? 0.75 : 0.28, solvedT < 0);
      if (solvedT < 0) {
        const fl = Math.sin(now * 32) > 0 ? 1 : 0.35;
        dot(sx, gy - g, 2.4, RED, fl, true); dot(sx, gy + g, 2.4, RED, fl, true);
        if (Math.random() < 0.18) spark(sx, gy, 2, RED);
      }
    } else seg(top, end, 0.75, false);
    // signals flowing down the spine
    const len = end - top;
    if (len > 40) for (let k = 0; k < 40; k++) {
      const y = top + ((now * 380 + k * 230) % Math.max(230, len));
      if (k * 230 > len + 230) break;
      if (y > end) continue;
      if (gapOpen && solvedT < 0 && y > gy - 10) continue;
      dot(sx, y, 1.8, WHT, 0.9, true);
    }
  }

  // reduced motion: show the finished state without animating
  if (reduceMotion) {
    cards.forEach((c) => c.classList.add('docked'));
    document.querySelectorAll('.pchip').forEach((c) => c.classList.add('linked'));
    return;
  }
  requestAnimationFrame(frame);
})();


/* ================= Background particle scenes =================
   A field of particles sits behind the content and re-forms into a new
   shape for each section as you scroll, like the portfolio:
   a brain for Projects, a layer stack for Stack, a magnifying glass for the
   Simulator, a broadcast tower for Status and two neurons meeting at a
   synapse in the footer. It rises out of the broken network below the hero. */
(function scenes() {
  const cv = document.getElementById('morph');
  if (!cv) return;
  const ctx = cv.getContext('2d');
  const N = innerWidth < 700 ? 1800 : 4200;
  const rnd = () => Math.random() * 2 - 1;
  const g = () => { let u = 0, v = 0; while (!u) u = Math.random(); while (!v) v = Math.random(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };
  const seed = new Float32Array(N); for (let i = 0; i < N; i++) seed[i] = Math.random();
  const isInd = (i) => seed[i] > 0.84;
  const sampler = (segs) => { const L = []; let tot = 0; segs.forEach((q) => { tot += Math.hypot(q[2] - q[0], q[3] - q[1]); L.push(tot); }); return () => { const r = Math.random() * tot; let j = 0; while (L[j] < r) j++; const q = segs[j], u = Math.random(); return [q[0] + (q[2] - q[0]) * u, q[1] + (q[3] - q[1]) * u]; }; };
  const arc = (cx, cy, rx, ry, a0, a1, n = 48) => { const s = []; for (let k = 0; k < n; k++) { const t0 = a0 + (a1 - a0) * k / n, t1 = a0 + (a1 - a0) * (k + 1) / n; s.push([cx + Math.cos(t0) * rx, cy + Math.sin(t0) * ry, cx + Math.cos(t1) * rx, cy + Math.sin(t1) * ry]); } return s; };
  const mk = (f) => { const a = new Float32Array(N * 2); for (let i = 0; i < N; i++) { const p = f(i); a[i * 2] = p[0]; a[i * 2 + 1] = p[1]; } return a; };

  // brain: outline, folds, cerebellum and stem
  const brain = (() => {
    const outline = [...arc(0, -0.02, 0.56, 0.38, Math.PI * 0.95, Math.PI * 2.08, 90), ...arc(0.32, 0.3, 0.17, 0.11, -0.4, Math.PI * 1.1, 30)];
    const inside = (x, y) => (x / 0.54) ** 2 + ((y + 0.02) / 0.36) ** 2 < 1 && y < 0.26;
    const folds = [];
    for (let k = 0; k < 22; k++) {
      let x = rnd() * 0.42, y = -0.02 + rnd() * 0.26, a = Math.random() * 6.283;
      for (let st = 0; st < 26; st++) { a += (Math.random() - 0.5) * 1.3; const nx = x + Math.cos(a) * 0.022, ny = y + Math.sin(a) * 0.022; if (!inside(nx, ny)) { a += Math.PI; continue; } folds.push([x, y, nx, ny]); x = nx; y = ny; }
    }
    const fissure = []; for (let k = 0; k < 20; k++) { const t0 = k / 20, t1 = (k + 1) / 20; fissure.push([-0.3 + t0 * 0.55, 0.06 - Math.sin(t0 * 3) * 0.06, -0.3 + t1 * 0.55, 0.06 - Math.sin(t1 * 3) * 0.06]); }
    const stem = [[0.1, 0.24, 0.16, 0.52], [0.2, 0.26, 0.24, 0.52]];
    const sO = sampler(outline), sF = sampler(folds), sX = sampler(fissure), sS = sampler(stem);
    return mk(() => { const r = Math.random(); const p = r < 0.36 ? sO() : r < 0.86 ? sF() : r < 0.94 ? sX() : sS(); return [p[0] + g() * 0.004, p[1] + g() * 0.004]; });
  })();
  // stack: four isometric layers
  const stack = (() => {
    const segs = [];
    for (let i = 0; i < 4; i++) {
      const y = -0.38 + i * 0.25, w = 0.44, h = 0.13, t = 0.035;
      const v = [[0, y - h], [w, y], [0, y + h], [-w, y]];
      for (let k = 0; k < 4; k++) segs.push([...v[k], ...v[(k + 1) % 4]]);
      segs.push([w, y, w, y + t], [-w, y, -w, y + t], [0, y + h, 0, y + h + t], [w, y + t, 0, y + h + t], [-w, y + t, 0, y + h + t]);
    }
    const s = sampler(segs);
    return mk((i) => { if (Math.random() < 0.18) { const u = rnd() * 0.9, v = rnd() * 0.9; return [(u - v) * 0.22, -0.38 + (u + v) * 0.065]; } const p = s(); return [p[0] + g() * 0.003, p[1] + g() * 0.003]; });
  })();
  // magnifying glass over a grid (diagnosis)
  const lens = (() => {
    const cx = -0.1, cy = -0.1, r = 0.3;
    const ring = [...arc(cx, cy, r, r, 0, 6.283, 80), ...arc(cx, cy, r * 0.88, r * 0.88, 0, 6.283, 70)];
    const hx = cx + Math.cos(0.785) * r, hy = cy + Math.sin(0.785) * r;
    const sR = sampler(ring);
    return mk(() => {
      const q = Math.random();
      if (q < 0.5) { const p = sR(); return [p[0] + g() * 0.003, p[1] + g() * 0.003]; }
      if (q < 0.72) { const t = Math.random(), w = rnd() * 0.035; return [hx + (0.44 - hx) * t - w * 0.7, hy + (0.44 - hy) * t + w * 0.7]; }
      if (q < 0.9) { const a = Math.random() * 6.283, d = Math.sqrt(Math.random()) * r * 0.78; const x = cx + Math.cos(a) * d, y = cy + Math.sin(a) * d; return [Math.round(x / 0.06) * 0.06, Math.round(y / 0.06) * 0.06]; }
      const t = rnd() * 0.07; return Math.random() < 0.5 ? [cx + t, cy + t] : [cx + t, cy - t];
    });
  })();
  // broadcast tower sending signals
  const tower = (() => {
    const segs = [[0, -0.4, -0.2, 0.46], [0, -0.4, 0.2, 0.46]];
    for (let k = 0; k < 6; k++) { const y0 = -0.4 + k * 0.143, y1 = y0 + 0.143, w0 = (y0 + 0.4) / 0.86 * 0.2, w1 = (y1 + 0.4) / 0.86 * 0.2; segs.push([-w0, y0, w1, y1], [w0, y0, -w1, y1]); }
    [0.16, 0.28, 0.4].forEach((r) => { segs.push(...arc(0, -0.4, r, r, -0.6 - Math.PI / 2 - 0.5, -Math.PI / 2 - 0.5, 18), ...arc(0, -0.4, r, r, -Math.PI / 2 + 0.5, -Math.PI / 2 + 1.1, 18)); });
    const s = sampler(segs);
    return mk(() => { const p = s(); return [p[0] + g() * 0.003, p[1] + g() * 0.003]; });
  })();
  // two neurons meeting at a synapse
  const synapse = (() => {
    const segs = [...arc(-0.48, 0, 0.1, 0.1, 0, 6.283, 40), ...arc(0.48, 0, 0.1, 0.1, 0, 6.283, 40), [-0.38, 0, -0.1, 0], ...arc(-0.06, 0, 0.05, 0.06, -1.6, 1.6, 20), ...arc(0.08, 0, 0.05, 0.08, Math.PI - 1.3, Math.PI + 1.3, 20), [0.13, 0, 0.38, 0]];
    [[-0.48, -1], [0.48, 1]].forEach(([x, dir]) => { for (let b = 0; b < 4; b++) { const a = (b / 4) * 2.4 + (dir < 0 ? 1.9 : -0.8) + Math.PI * (dir < 0 ? 0 : 0); let px = x + Math.cos(a) * 0.1, py = Math.sin(a) * 0.1; for (let st = 0; st < 3; st++) { const nx = px + Math.cos(a + (st - 1) * 0.4) * 0.09, ny = py + Math.sin(a + (st - 1) * 0.4) * 0.09; segs.push([px, py, nx, ny]); px = nx; py = ny; } } });
    const s = sampler(segs);
    return mk(() => { if (Math.random() < 0.12) return [0.01 + g() * 0.018, g() * 0.035]; const p = s(); return [p[0] + g() * 0.003, p[1] + g() * 0.003]; });
  })();
  const cloud = mk(() => [rnd() * 1.6, rnd() * 1.0]);
  const SHAPES = { cloud, brain, stack, lens, tower, synapse };

  const plan = [
    { el: document.getElementById('top'), shape: 'cloud', x: 0, a: 0 },
    { el: document.getElementById('projects'), shape: 'brain', x: 0.62, a: 1 },
    { el: document.getElementById('stack'), shape: 'stack', x: 0.6, a: 1 },
    { el: document.getElementById('simulator'), shape: 'lens', x: -0.55, a: 0.8 },
    { el: document.getElementById('status'), shape: 'tower', x: -0.45, a: 0.8 },
    { el: document.querySelector('.foot'), shape: 'synapse', x: 0.35, a: 1 }
  ].filter((p) => p.el);

  let W = 0, H = 0, S = 1, anchors = [];
  function size() { const d = Math.min(devicePixelRatio || 1, 2); W = innerWidth; H = innerHeight; cv.width = W * d; cv.height = H * d; ctx.setTransform(d, 0, 0, d, 0, 0); S = Math.min(W, H) * 0.5; measure(); }
  function measure() { const maxC = document.documentElement.scrollHeight - H / 2 - 4; anchors = plan.map((p, i) => { const r = p.el.getBoundingClientRect(); const y = scrollY + r.top + Math.min(r.height, H * 1.2) / 2; return i === plan.length - 1 ? Math.min(y, maxC) : Math.min(y, maxC - 260); }); }
  size(); addEventListener('resize', size); addEventListener('load', measure); setTimeout(measure, 1500); setTimeout(measure, 4000);

  const P = new Float32Array(N * 2).fill(-9999), Dx = new Float32Array(N), Dy = new Float32Array(N);
  let mx = -1e4, my = -1e4, pmx = -1e4, pmy = -1e4, mvx = 0, mvy = 0;
  addEventListener('pointermove', (e) => { mx = e.clientX; my = e.clientY; }, { passive: true });
  document.addEventListener('mouseleave', () => { mx = my = -1e4; });
  const at = (shape, i, dx, sc) => { const s = SHAPES[shape]; return [W / 2 + (s[i * 2] * sc + dx * W / (2 * S)) * S, H / 2 + s[i * 2 + 1] * sc * S]; };

  function frame(t) {
    const c = scrollY + H / 2; let a = 0;
    for (let i = 0; i < anchors.length; i++) if (anchors[i] <= c) a = i;
    const b = Math.min(a + 1, anchors.length - 1);
    let k = b === a ? 0 : Math.min(1, Math.max(0, (c - anchors[a]) / (anchors[b] - anchors[a])));
    const hold = 0.25; k = Math.min(1, Math.max(0, (k - hold) / (1 - hold * 2))); const e = k * k * (3 - 2 * k);
    const A = plan[a], B = plan[b], mob = W < 900;
    const xa = mob ? 0 : A.x, xb = mob ? 0 : B.x, sc = mob ? 0.85 : 1;
    const alpha = (A.a * (1 - e) + B.a * e) * (mob ? 0.6 : 1);
    ctx.clearRect(0, 0, W, H);
    if (mx > -1e3 && pmx > -1e3) { mvx = mvx * 0.6 + (mx - pmx) * 0.4; mvy = mvy * 0.6 + (my - pmy) * 0.4; } else { mvx *= 0.8; mvy *= 0.8; } pmx = mx; pmy = my;
    if (alpha > 0.01) {
      const fg = '242,242,244', ind = '165,123,255';
      for (let pass = 0; pass < 2; pass++) {
        ctx.fillStyle = `rgb(${pass ? ind : fg})`;
        for (let i = 0; i < N; i++) {
          const I = isInd(i); if (I !== !!pass) continue; const d = seed[i];
          const p = at(A.shape, i, xa, sc), q = at(B.shape, i, xb, sc);
          const ee = Math.min(1, Math.max(0, e * 1.5 - (d % 0.33) * 1.5));
          let tx = p[0] + (q[0] - p[0]) * ee, ty = p[1] + (q[1] - p[1]) * ee;
          tx += Math.sin(t * 0.0007 + d * 40) * 1.3; ty += Math.cos(t * 0.0006 + d * 30) * 1.3;
          let x = P[i * 2], y = P[i * 2 + 1]; if (x < -9000) { x = tx + rnd() * W * 0.5; y = ty + rnd() * H * 0.5; }
          let ddx = Dx[i] * 0.9, ddy = Dy[i] * 0.9; const qx = x - mx, qy = y - my, q2 = qx * qx + qy * qy;
          if (q2 < 16900) { const l = Math.sqrt(q2) + 1, f = 1 - l / 130; ddx += (qx / l * 2.6 - qy / l * 2.2) * f + mvx * f * 0.3; ddy += (qy / l * 2.6 + qx / l * 2.2) * f + mvy * f * 0.3; const m2 = ddx * ddx + ddy * ddy; if (m2 > 3600) { const s2 = 60 / Math.sqrt(m2); ddx *= s2; ddy *= s2; } }
          Dx[i] = ddx; Dy[i] = ddy; tx += ddx; ty += ddy;
          const sp = 0.06 + (d % 0.5) * 0.1; x += (tx - x) * sp; y += (ty - y) * sp; P[i * 2] = x; P[i * 2 + 1] = y;
          ctx.globalAlpha = Math.min(1, alpha * (I ? 0.9 : 0.3 + (d / 0.84) * 0.5)); const sz = I ? 1.5 : (d > 0.7 ? 1.4 : 1.1); ctx.fillRect(x, y, sz, sz);
        }
      }
      ctx.globalAlpha = 1;
    }
    requestAnimationFrame(frame);
  }
  if (reduceMotion) { const still = () => frame(0); addEventListener('scroll', still, { passive: true }); setTimeout(still, 300); }
  else requestAnimationFrame(frame);
})();
