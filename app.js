/* Synapse — project data, card rendering and the 3D neural network.
   To add a project: append an object to PROJECTS. The card, its gem and its output neuron
   are generated automatically. `inputs` lists the SKILLS (by index) that feed it. */

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
    hue: '#3ee6a8',   // emerald
    tagline: 'An interactive 3D model of a retail company network: one head office and a 23-store chain.',
    about: 'Every device is wired the way a real retail environment would be. Click any device to inspect it, watch traffic move hop by hop, and work through realistic outages from first symptom to root cause.',
    highlights: [
      '10 incident drills: ISP outage with a dead LTE backup, full DHCP scope, DNS down, switching loop, phishing with MFA fatigue and more',
      'Traffic flows for card payments, store-to-HQ VPN, Teams calls, DNS lookups and nightly backups, each hop explained',
      'Full IP and VLAN plan, isolated POS VLAN for PCI DSS scope, SD-WAN failover, IPsec site-to-site VPN'
    ],
    stack: ['three.js', 'JavaScript', 'VLANs', 'IPsec VPN', 'SD-WAN', 'Entra ID', 'MDM'],
    repo: 'https://github.com/ysingh2103/retail-network',
    live: 'https://ysingh2103.github.io/retail-network/',
    hostLabel: 'GitHub Pages',
    inputs: [0, 5, 4]
  },
  {
    id: 'fault-trace',
    name: 'Store Fault Trace',
    status: 'live', statusText: 'Live prototype',
    hue: '#6cb6ff',   // sapphire
    tagline: 'A live troubleshooting view for one store that traces any failure back to its root cause.',
    about: 'Break something on purpose, such as a frozen camera, a cut cable, a power cut, a worn UPS battery or an ISP outage. It follows the failure through the power and network chain, groups related alerts into one incident and says who to send.',
    highlights: [
      'Rules use only signals a real deployment can see: RMM agents, SNMP from the switch and UPS, firewall cloud API, vendor status pages',
      'Seven failure scenarios, all simulated in the browser',
      'Prototype for a live 3D troubleshooting layer on top of monitoring tools'
    ],
    stack: ['three.js', 'JavaScript', 'RMM', 'SNMP', 'Root-cause analysis'],
    repo: 'https://github.com/ysingh2103/retail-network/tree/main/fault-trace',
    live: 'https://ysingh2103.github.io/retail-network/fault-trace/',
    hostLabel: 'GitHub Pages',
    inputs: [0, 6, 5]
  },
  {
    id: 'infra-lab',
    name: 'Self-Hosted Infrastructure Lab',
    status: 'live', statusText: 'Complete · 11 write-ups',
    hue: '#ffbe55',   // topaz
    tagline: 'A home lab built from scratch on VMware ESXi, with every failure diagnosed and documented like a real support ticket.',
    about: 'Linux administration, web and application servers, databases, containers, Kubernetes and monitoring. Each incident follows symptom, hypothesis, diagnostic steps, root cause, fix and verification.',
    highlights: [
      '11 incident write-ups, including an unplanned memory-starvation cascade and a blind drill solved in four commands',
      'Prometheus, node_exporter and Grafana monitoring stack',
      'Bash health-check and service-monitor scripts with exit codes for alerting'
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
    hue: '#bb94ff',   // amethyst
    tagline: 'A small document-management web app on the stack enterprise support teams run.',
    about: 'Upload, list, filter and download documents. Files live on disk and metadata in PostgreSQL, served by a Java servlet app on Tomcat 10 behind an NGINX reverse proxy.',
    highlights: [
      'Database access through a Tomcat-managed JNDI connection pool, with no credentials in code',
      'Browser → NGINX → Tomcat 10 → PostgreSQL, deployed with systemd drop-ins',
      'Next: search and permissions, a Windows leg (IIS + SQL Server), Grafana monitoring and a break-fix trainer'
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
    hue: '#ff5a7a',   // ruby
    tagline: 'A self-hosted incident trainer that injects real faults and times how long they take to fix.',
    about: 'Faults across Windows Server, Linux, IIS, Tomcat, SQL Server, Oracle, DB2, Active Directory and Kubernetes. The first pieces are running: a Flask health API and dashboard, and a heartbeat service that watches the lab server.',
    highlights: [
      'Health API reports CPU load, memory, disk and the state of Tomcat, Docker, k3s and PostgreSQL',
      'Heartbeat runs as a systemd service and logs a warning when a service goes down',
      'Lab: a Windows Server 2019 domain controller (AD DS, DNS, IIS) and an Ubuntu server'
    ],
    stack: ['Python', 'Flask', 'Bash', 'systemd', 'Windows Server', 'Active Directory', 'k3s'],
    repo: 'https://github.com/ysingh2103/Ultron',
    live: null,
    hostNote: 'Runs on a self-hosted lab server. Public deployment planned on Azure.',
    inputs: [2, 1, 6, 4]
  }
];

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- Render the project cards ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pretty = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const manifest = document.getElementById('manifest');
manifest.innerHTML = PROJECTS.map((p) => `
  <li class="dossier" id="${p.id}" style="--hue:${p.hue}">
    <div class="badge" aria-hidden="true"><span class="ring"></span><span class="gem"></span></div>
    <div class="body">
      <span class="status ${p.status}">${esc(p.statusText)}</span>
      <h3>${esc(p.name)}</h3>
      <p class="tagline">${esc(p.tagline)}</p>
      <p class="about">${esc(p.about)}</p>
      <ul class="highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
      <ul class="stack" aria-label="Tech stack">${p.stack.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>
    </div>
    <div class="panel">
      <dl>
        <dt>GitHub</dt>
        <dd><a class="url" href="${p.repo}" target="_blank" rel="noopener">${esc(pretty(p.repo))}</a></dd>
        <dt>Skills in</dt>
        <dd class="inputs">${p.inputs.map((i) => `<span>${esc(SKILLS[i])}</span>`).join('')}</dd>
        <dt>Hosted at</dt>
        <dd>${p.live
          ? `<a class="url" href="${p.live}" target="_blank" rel="noopener">${esc(pretty(p.live))}</a>`
          : `<span class="url muted">${esc(p.hostNote)}</span>`}</dd>
      </dl>
      <div class="actions">
        ${p.live ? `<a class="primary" href="${p.live}" target="_blank" rel="noopener">Launch demo</a>` : ''}
        <a class="${p.live ? '' : 'primary'}" href="${p.repo}" target="_blank" rel="noopener">View code</a>
      </div>
    </div>
  </li>`).join('');

document.querySelector('.status-text').textContent =
  `${SKILLS.length} skills in, ${PROJECTS.length} projects out`;

/* ---------- Surge: every ~9 s a gold wave rises through the network
   and a sheen crosses the wordmark ---------- */
if (!reduceMotion) {
  const root = document.documentElement;
  const surge = () => {
    if (!document.hidden) {
      root.classList.remove('surge'); void root.offsetWidth;
      root.classList.add('surge');
      window.dispatchEvent(new CustomEvent('synapse:surge'));
      setTimeout(() => root.classList.remove('surge'), 2700);
    }
    setTimeout(surge, 8000 + Math.random() * 3000);
  };
  setTimeout(surge, 3500);
}

/* ---------- Card tilt on pointer (desktop only) ---------- */
if (!reduceMotion && window.matchMedia('(hover: hover)').matches) {
  document.querySelectorAll('.dossier').forEach((card) => {
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1200px) rotateX(${(-y * 3).toFixed(2)}deg) rotateY(${(x * 4).toFixed(2)}deg)`;
    });
    card.addEventListener('pointerleave', () => { card.style.transform = ''; });
  });
}

/* ---------- Copy email ---------- */
const copyBtn = document.getElementById('copy-email');
copyBtn.addEventListener('click', () => {
  const email = copyBtn.dataset.email;
  const done = () => {
    copyBtn.textContent = 'Email copied';
    copyBtn.classList.add('done');
    setTimeout(() => { copyBtn.textContent = email; copyBtn.classList.remove('done'); }, 1800);
  };
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(email).then(done).catch(() => selectText(copyBtn));
  } else selectText(copyBtn);
});
function selectText(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  const sel = window.getSelection();
  sel.removeAllRanges(); sel.addRange(range);
}

/* ---------- Jump to a project and flash it ---------- */
function dockAt(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' });
  el.classList.remove('is-target'); void el.offsetWidth; el.classList.add('is-target');
}

/* ---------- 3D neural network ----------
   Input layer = skills, three hidden layers, output layer = projects.
   Gold signals travel through it and arrive in each project's gem colour.
   It turns slowly on its own; drag to turn it. Hover a skill or a project to
   light the path between them. */
(function neuralNet() {
  const canvas = document.getElementById('orrery');
  if (!window.THREE || !canvas) return;
  const hero = canvas.parentElement;
  const space = document.querySelector('.net-space');

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) { return; }   // no WebGL: the gradient background stays
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const GOLD = '#e8c26e', GOLD_HI = '#fff0c4', PEARL = '#fff8ea', SAPPHIRE = '#7fb0ff';

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 400);

  const rig = new THREE.Group();   // placed in the centre band
  const net = new THREE.Group();   // the network: turns and drags
  net.position.y = 0.6;
  rig.add(net);
  scene.add(rig);

  /* gold dust, drifting slowly upward */
  const DUST = 900;
  const dustPos = new Float32Array(DUST * 3);
  {
    const col = new Float32Array(DUST * 3);
    const tint = [new THREE.Color('#ffffff'), new THREE.Color(GOLD_HI), new THREE.Color(GOLD), new THREE.Color('#aecbff')];
    for (let i = 0; i < DUST; i++) {
      dustPos.set([(Math.random() - 0.5) * 70, (Math.random() - 0.5) * 40, (Math.random() - 0.5) * 40 - 6], i * 3);
      const c = tint[(Math.random() * tint.length) | 0];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var dust = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.09, vertexColors: true, transparent: true, opacity: 0.75, depthWrite: false,
      blending: THREE.AdditiveBlending
    }));
    scene.add(dust);
  }

  /* soft glow sprite */
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.2, 'rgba(255,255,255,.55)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  })();
  const glow = (color, scale) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    s.scale.setScalar(scale);
    return s;
  };

  /* ---- gold projector base ---- */
  const base = new THREE.Group();
  base.position.y = -4.1;
  base.scale.setScalar(0.62);
  rig.add(base);
  const circle = (r, seg = 180, from = 0, to = Math.PI * 2) => {
    const pts = [];
    for (let k = 0; k <= seg; k++) {
      const a = from + (to - from) * (k / seg);
      pts.push(new THREE.Vector3(Math.cos(a) * r, 0, Math.sin(a) * r));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };
  const lineMat = (hex, op) => new THREE.LineBasicMaterial({
    color: hex, transparent: true, opacity: op, blending: THREE.AdditiveBlending, depthWrite: false
  });
  const ringA = new THREE.Line(circle(4.2), lineMat(GOLD_HI, 0.7));
  const ringB = new THREE.Group();
  [[0, 1.7], [2.2, 3.9], [4.5, 5.8]].forEach(([a, b]) => ringB.add(new THREE.Line(circle(5.6, 90, a, b), lineMat(GOLD, 0.85))));
  const ringC = new THREE.Line(circle(7.4), new THREE.LineDashedMaterial({
    color: SAPPHIRE, dashSize: 0.22, gapSize: 0.32, transparent: true, opacity: 0.45, depthWrite: false
  }));
  ringC.computeLineDistances();
  const ticks = [];
  for (let k = 0; k < 120; k++) {
    const a = (k / 120) * Math.PI * 2, r1 = 6.4, r2 = k % 10 ? 6.65 : 7.0;
    ticks.push(new THREE.Vector3(Math.cos(a) * r1, 0, Math.sin(a) * r1), new THREE.Vector3(Math.cos(a) * r2, 0, Math.sin(a) * r2));
  }
  const tickRing = new THREE.LineSegments(new THREE.BufferGeometry().setFromPoints(ticks), lineMat(GOLD, 0.45));
  const lens = glow(GOLD, 7); lens.material.opacity = 0.4;
  const lensHot = glow(GOLD_HI, 2.6); lensHot.material.opacity = 0.7;
  // surge wave: a ring that expands out of the base
  const wave = new THREE.Line(circle(1), lineMat(GOLD_HI, 0));
  base.add(ringA, ringB, ringC, tickRing, lens, lensHot, wave);

  /* deterministic random so the wiring is the same on every visit */
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---- layout: input, three hidden layers, output ---- */
  const LX = [-10, -5, 0, 5, 10];
  const LAST = LX.length - 1;
  const column = (n, gap, x) => Array.from({ length: n }, (_, i) => new THREE.Vector3(x, ((n - 1) / 2 - i) * gap, 0));
  const grid = (x, n = 3) => {
    const a = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < n; c++) a.push(new THREE.Vector3(x, (1 - r) * 1.55, (c - (n - 1) / 2) * 1.6));
    return a;
  };
  const layerPos = [
    column(SKILLS.length, 1.15, LX[0]),
    grid(LX[1]), grid(LX[2], 4), grid(LX[3]),
    column(PROJECTS.length, 1.38, LX[4])
  ];
  const LAYER_HEX = [PEARL, GOLD, SAPPHIRE, GOLD_HI, null];

  /* ---- neurons ---- */
  const neurons = layerPos.map((arr, li) => arr.map((p, ni) => {
    const isIn = li === 0, isOut = li === LAST;
    const hex = isOut ? PROJECTS[ni].hue : LAYER_HEX[li];
    const g = new THREE.Group();
    g.position.copy(p);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(isOut ? 0.26 : isIn ? 0.18 : 0.14, 24, 24),
      new THREE.MeshBasicMaterial({ color: hex }));
    const halo = glow(hex, isOut ? 2.8 : 1.6);
    g.add(ball, halo);
    let shell = null;
    if (isOut || isIn) {
      shell = new THREE.Mesh(isOut ? new THREE.OctahedronGeometry(0.6, 0) : new THREE.IcosahedronGeometry(0.34, 0),
        new THREE.MeshBasicMaterial({ color: isOut ? hex : GOLD, wireframe: true, transparent: true, opacity: isOut ? 0.75 : 0.4 }));
      g.add(shell);
    }
    net.add(g);
    return { g, ball, halo, shell, act: 0, rest: isOut ? 0.55 : 0.3, li, ni, hex };
  }));

  /* ---- synapses ---- */
  const edges = [];
  for (let l = 0; l < LAST; l++) {
    layerPos[l].forEach((A, a) => layerPos[l + 1].forEach((B, b) => edges.push({ l, a, b, A, B, h: rnd() })));
  }
  const usesProject = (k, e) =>
    e.l === 0 ? PROJECTS[k].inputs.includes(e.a)
    : e.l === LAST - 1 ? e.b === k
    : ((e.h * 7.13 + k * 0.371 + e.l * 0.17) % 1) < 0.26;
  const projectsForSkill = (s) => PROJECTS.map((p, k) => (p.inputs.includes(s) ? k : -1)).filter((k) => k >= 0);
  const usesSkill = (s, e) => (e.l === 0 ? e.a === s : projectsForSkill(s).some((k) => usesProject(k, e)));

  const ePos = new Float32Array(edges.length * 6), eCol = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => ePos.set([e.A.x, e.A.y, e.A.z, e.B.x, e.B.y, e.B.z], i * 6));
  const eGeo = new THREE.BufferGeometry();
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3));
  const eMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
  });
  net.add(new THREE.LineSegments(eGeo, eMat));

  // resting wires: gold near the inputs and outputs, sapphire through the middle
  const W_GOLD = new THREE.Color('#6e5527'), W_SAPH = new THREE.Color('#2b4da8'), FAINT = new THREE.Color('#141c4a');
  const restAt = (depth) => {
    const t = Math.abs(depth / LAST - 0.5) * 2;   // 1 at the ends, 0 in the middle
    return W_SAPH.clone().lerp(W_GOLD, t);
  };
  let focus = null;      // { kind: 'p' | 's', i, color }
  function paintEdges() {
    edges.forEach((e, i) => {
      let a = restAt(e.l), b = restAt(e.l + 1);
      if (focus) {
        const on = focus.kind === 'p' ? usesProject(focus.i, e) : usesSkill(focus.i, e);
        a = b = on ? focus.color : FAINT;
      }
      eCol.set([a.r, a.g, a.b, b.r, b.g, b.b], i * 6);
    });
    eGeo.attributes.color.needsUpdate = true;
  }
  paintEdges();

  /* ---- signal pulses ---- */
  const pool = Array.from({ length: 360 }, () => {
    const s = glow('#ffffff', 0.6);
    s.visible = false;
    net.add(s);
    return { s, e: null, t0: 0, dur: 0, k: 1, free: true };
  });
  let now = 0;
  function fire(e, delay, hex, strength) {
    const p = pool.find((q) => q.free);
    if (!p) return;
    p.free = false; p.e = e; p.t0 = now + delay; p.dur = 1.15 + rnd() * 0.3; p.k = strength;
    p.s.material.color.set(hex);
    p.s.scale.setScalar(strength > 0.6 ? 0.72 : 0.42);
  }
  let passIdx = 0;
  function forwardPass(k) {
    PROJECTS[k].inputs.forEach((s) => { neurons[0][s].act = 1; });
    edges.forEach((e) => {
      if (usesProject(k, e)) fire(e, e.l * 1.25 + rnd() * 0.2, e.l === LAST - 1 ? PROJECTS[k].hue : GOLD_HI, 1);
    });
  }

  /* ---- labels ---- */
  const labelLayer = document.createElement('div');
  labelLayer.className = 'net-labels';
  hero.appendChild(labelLayer);
  const mkLabel = (tag, text, cls) => {
    const el = document.createElement(tag);
    el.className = 'net-label ' + cls;
    el.textContent = text;
    labelLayer.appendChild(el);
    return el;
  };
  const inLabels = SKILLS.map((s, i) => {
    const el = mkLabel('span', s, 'in');
    el.addEventListener('pointerenter', () => setFocus('s', i));
    el.addEventListener('pointerleave', () => setFocus(null));
    return el;
  });
  const outLabels = PROJECTS.map((p, k) => {
    const el = mkLabel('a', p.name, 'out');
    el.href = '#' + p.id;
    el.style.setProperty('--hue', p.hue);
    el.addEventListener('click', (ev) => { ev.preventDefault(); dockAt(p.id); });
    el.addEventListener('pointerenter', () => setFocus('p', k));
    el.addEventListener('pointerleave', () => setFocus(null));
    return el;
  });

  function setFocus(kind, i) {
    const next = kind ? { kind, i, color: new THREE.Color(kind === 'p' ? PROJECTS[i].hue : GOLD_HI) } : null;
    if ((!focus && !next) || (focus && next && focus.kind === next.kind && focus.i === next.i)) return;
    focus = next;
    paintEdges();
    const litProjects = !focus ? [] : focus.kind === 'p' ? [focus.i] : projectsForSkill(focus.i);
    PROJECTS.forEach((p, k) => {
      const on = litProjects.includes(k);
      document.getElementById(p.id)?.classList.toggle('is-lit', on);
      outLabels[k].classList.toggle('on', on);
    });
    inLabels.forEach((el, s) => el.classList.toggle('on',
      !!focus && (focus.kind === 's' ? focus.i === s : PROJECTS[focus.i].inputs.includes(s))));
    if (focus && focus.kind === 'p') forwardPass(focus.i);
    if (focus && focus.kind === 's') projectsForSkill(focus.i).forEach(forwardPass);
  }

  document.querySelectorAll('.dossier').forEach((card, k) => {
    card.addEventListener('pointerenter', () => setFocus('p', k));
    card.addEventListener('pointerleave', () => setFocus(null));
  });

  /* ---- picking ---- */
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

  /* ---- rotation: slow auto-turn plus drag ---- */
  const AUTO = 0.08;                     // rad/s, one turn about every 80 s
  const rot = { y: -0.3, x: 0.1, vy: AUTO, tx: 0.1 };
  const drag = { on: false, id: null, x: 0, y: 0, moved: 0, lastT: 0 };
  let hoverKey = '';

  hero.addEventListener('pointerdown', (ev) => {
    if (ev.target.closest('a,button')) return;
    drag.on = true; drag.id = ev.pointerId; drag.x = ev.clientX; drag.y = ev.clientY; drag.moved = 0;
    drag.lastT = performance.now();
    hero.classList.add('dragging');
  });
  window.addEventListener('pointermove', (ev) => {
    if (drag.on && ev.pointerId === drag.id) {
      const dx = ev.clientX - drag.x, dy = ev.clientY - drag.y;
      drag.x = ev.clientX; drag.y = ev.clientY;
      drag.moved += Math.abs(dx) + Math.abs(dy);
      const t = performance.now(), dt = Math.max(16, t - drag.lastT) / 1000;
      drag.lastT = t;
      rot.y += dx * 0.006;
      rot.vy = (dx * 0.006) / dt;
      rot.tx = Math.max(-0.5, Math.min(0.55, rot.tx + dy * 0.004));
      return;
    }
    if (!hero.contains(ev.target) || ev.target.closest('.net-label')) return;
    const hit = pick(ev);
    const key = hit ? hit.kind + hit.i : '';
    if (key !== hoverKey) {
      hoverKey = key;
      setFocus(hit ? hit.kind : null, hit ? hit.i : 0);
      hero.style.cursor = hit && hit.kind === 'p' ? 'pointer' : '';
    }
  });
  const endDrag = () => { drag.on = false; hero.classList.remove('dragging'); };
  window.addEventListener('pointerup', endDrag);
  window.addEventListener('pointercancel', endDrag);
  hero.addEventListener('pointerleave', () => { if (!drag.on) { hoverKey = ''; setFocus(null); } });
  hero.addEventListener('click', (ev) => {
    if (ev.target.closest('a,button') || drag.moved > 6) return;
    const hit = pick(ev);
    if (hit && hit.kind === 'p') dockAt(PROJECTS[hit.i].id);
  });

  /* ---- sizing: fit the network into the centre band ---- */
  let W = 0, H = 0, blocks = [], cx = 0;
  function resize() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    const camZ = W > 900 ? 20 : 24;
    camera.position.set(0, 0, camZ);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    const upp = (2 * Math.tan((23 * Math.PI) / 180) * camZ) / H;
    const hr = hero.getBoundingClientRect(), sr = space.getBoundingClientRect();
    const bandCX = sr.left - hr.left + sr.width / 2, bandCY = sr.top - hr.top + sr.height / 2;
    cx = bandCX;
    const roomW = (W - (W > 600 ? 520 : 36)) * upp;   // leave room for labels on both sides
    const s = Math.min((sr.height * upp) / 10.2, roomW / 21);
    rig.position.set((bandCX - W / 2) * upp, (H / 2 - bandCY) * upp, 0);
    rig.scale.setScalar(s);
    blocks = [...document.querySelectorAll('.brand > *, .topnav, .copy > *, .cta > *')].map((el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - hr.left - 12, r: r.right - hr.left + 12, t: r.top - hr.top - 10, b: r.bottom - hr.top + 8 };
    });
  }
  window.addEventListener('resize', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
  resize();

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(hero);

  const v = new THREE.Vector3(), wp = new THREE.Vector3();
  let intro = 0, nextPass = 1.5, nextAmbient = 0, surgeAt = -10;
  window.addEventListener('synapse:surge', () => { surgeAt = now; });

  function placeLabel(el, n) {
    n.g.getWorldPosition(wp);
    v.copy(wp).project(camera);
    const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
    const left = x < cx;
    const lx = left ? x - 170 : x + 16, rx = left ? x - 14 : x + 210;
    const covered = blocks.some((b) => rx > b.l && lx < b.r && y > b.t && y < b.b);
    const depth = (wp.z - rig.position.z) / rig.scale.x;    // + is toward the viewer
    const facing = Math.max(0, Math.min(1, 0.5 + depth / 12));
    const hide = v.z > 1 || covered || W <= 600;
    el.style.opacity = hide ? '0' : String((Math.min(1, intro * 1.5) * (0.25 + 0.75 * facing)).toFixed(2));
    el.style.pointerEvents = hide || facing < 0.3 ? 'none' : 'auto';
    el.style.zIndex = String(Math.round(facing * 10));
    el.style.transform = left
      ? `translate(${(x - 18).toFixed(1)}px, ${(y - 12).toFixed(1)}px) translateX(-100%)`
      : `translate(${(x + 20).toFixed(1)}px, ${(y - 12).toFixed(1)}px)`;
  }

  function frame(dt) {
    now += dt;
    intro = Math.min(1, intro + dt * 0.35);
    const ease = 1 - Math.pow(1 - intro, 3);

    if (!drag.on) {
      rot.vy += (AUTO - rot.vy) * Math.min(1, dt * 0.8);
      rot.y += rot.vy * dt;
      rot.tx += (0.1 - rot.tx) * dt * 0.3;
    }
    rot.x += (rot.tx - rot.x) * 0.08;
    net.rotation.set(rot.x, rot.y, 0);
    net.scale.setScalar(0.75 + 0.25 * ease);

    base.rotation.x = rot.x * 0.5;
    ringA.rotation.y = now * 0.12;
    ringB.rotation.y = -now * 0.2;
    ringC.rotation.y = now * 0.04;
    tickRing.rotation.y = -now * 0.06;
    lensHot.material.opacity = 0.55 + Math.sin(now * 1.2) * 0.15;

    // dust drifts up and wraps
    const dp = dust.geometry.attributes.position;
    for (let i = 0; i < DUST; i++) {
      let y = dp.getY(i) + dt * (0.12 + (i % 7) * 0.02);
      if (y > 20) y = -20;
      dp.setY(i, y);
    }
    dp.needsUpdate = true;
    eMat.opacity = ease;

    // surge: a gold wave leaves the base and a flare climbs through the layers
    const st = now - surgeAt;
    if (st >= 0 && st < 3.2) {
      const r = 1 + st * 3.2;
      wave.scale.setScalar(r);
      wave.material.opacity = Math.max(0, 0.9 - st / 3.2);
      neurons.forEach((layer, li) => {
        const t = st - li * 0.35;
        if (t > 0 && t < 0.1) layer.forEach((n) => { n.act = Math.max(n.act, 0.8); });
      });
      lensHot.material.opacity = 1;
    } else {
      wave.material.opacity = 0;
    }

    if (now > nextPass && !focus) {
      forwardPass(passIdx % PROJECTS.length);
      passIdx++;
      nextPass = now + 3.4;
    }
    if (now > nextAmbient) {
      fire(edges[(rnd() * edges.length) | 0], 0, rnd() < 0.6 ? GOLD : SAPPHIRE, 0.45);
      nextAmbient = now + 0.06;
    }

    pool.forEach((p) => {
      if (p.free) return;
      const t = (now - p.t0) / p.dur;
      if (t < 0) { p.s.visible = false; return; }
      if (t >= 1) {
        p.free = true; p.s.visible = false;
        const n = neurons[p.e.l + 1][p.e.b];
        n.act = Math.max(n.act, p.k);
        if (p.k > 0.6) neurons[p.e.l][p.e.a].act = Math.max(neurons[p.e.l][p.e.a].act, 0.6);
        return;
      }
      p.s.visible = true;
      p.s.position.lerpVectors(p.e.A, p.e.B, t);
      p.s.material.opacity = Math.sin(t * Math.PI) * p.k;
    });

    neurons.forEach((layer) => layer.forEach((n) => {
      n.act *= Math.exp(-dt * 1.1);
      n.ball.scale.setScalar(1 + n.act * 0.6);
      n.halo.material.opacity = (n.rest + n.act * 0.85) * ease;
      if (n.shell) n.shell.rotation.set(now * 0.3 + n.ni, now * 0.4, 0);
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
    running = true;
    last = performance.now();
    const tick = (ts) => {
      if (!visible) { running = false; return; }
      const dt = Math.min((ts - last) / 1000, 0.05);
      last = ts;
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
  } else {
    loop();
  }
})();
