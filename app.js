/* Synapse — project data, card rendering and the 3D neural network.
   To add a project: append an object to PROJECTS. The card and its output neuron
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
    hue: '#4fe0a5',
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
    hue: '#5fd3ff',
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
    hue: '#ffb547',
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
    hue: '#8aa4ff',
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
    hue: '#b394ff',
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

/* ---------- Wordmark letter stagger ---------- */
document.querySelectorAll('.wordmark span').forEach((s, i) => s.style.setProperty('--i', i));

/* ---------- Render the project cards ---------- */
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pretty = (url) => url.replace(/^https?:\/\//, '').replace(/\/$/, '');

const manifest = document.getElementById('manifest');
manifest.innerHTML = PROJECTS.map((p) => `
  <li class="dossier" id="${p.id}" style="--hue:${p.hue}">
    <div class="badge" aria-hidden="true"><span class="ring"></span><span class="planet"></span></div>
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

document.querySelector('.callsign').lastChild.textContent =
  `Network online · ${SKILLS.length} inputs → ${PROJECTS.length} outputs`;

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
   Input layer = skills, two hidden layers, output layer = projects.
   A forward pass fires every few seconds; hover a skill or a project to
   light the path between them. */
(function neuralNet() {
  const canvas = document.getElementById('orrery');
  if (!window.THREE || !canvas) return;
  const hero = canvas.parentElement;

  let renderer;
  try {
    renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  } catch (e) { return; }   // no WebGL: the gradient background stays
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 400);
  camera.position.set(0, 1.2, 17);

  const rig = new THREE.Group();   // placed per breakpoint
  const net = new THREE.Group();   // turns with the pointer
  rig.add(net);
  scene.add(rig);

  /* drifting dust */
  {
    const N = 1500, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
    const tint = [new THREE.Color('#ffffff'), new THREE.Color('#9ff0ff'), new THREE.Color('#b9a6ff')];
    for (let i = 0; i < N; i++) {
      const r = 30 + Math.random() * 140;
      const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
      const c = tint[(Math.random() * 3) | 0];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    var dust = new THREE.Points(g, new THREE.PointsMaterial({
      size: 0.3, vertexColors: true, transparent: true, opacity: 0.7, depthWrite: false
    }));
    scene.add(dust);
  }

  /* soft glow sprite */
  const glowTex = (() => {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.22, 'rgba(255,255,255,.5)');
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

  /* deterministic random so the wiring is the same on every visit */
  let seed = 11;
  const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

  /* ---- layout ---- */
  const LX = [-7, -2.35, 2.35, 7];
  const column = (n, gap, x) => Array.from({ length: n }, (_, i) => new THREE.Vector3(x, ((n - 1) / 2 - i) * gap, 0));
  const grid = (x) => {
    const a = [];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) a.push(new THREE.Vector3(x, (1 - r) * 1.5, (c - 1) * 1.6));
    return a;
  };
  const layerPos = [column(SKILLS.length, 1.12, LX[0]), grid(LX[1]), grid(LX[2]), column(PROJECTS.length, 1.32, LX[3])];

  /* ---- neurons ---- */
  const neurons = layerPos.map((arr, li) => arr.map((p, ni) => {
    const isIn = li === 0, isOut = li === 3;
    const hex = isOut ? PROJECTS[ni].hue : isIn ? '#c8f8ff' : '#8f9dff';
    const g = new THREE.Group();
    g.position.copy(p);
    const ball = new THREE.Mesh(new THREE.SphereGeometry(isOut ? 0.24 : isIn ? 0.17 : 0.14, 20, 20),
      new THREE.MeshBasicMaterial({ color: hex }));
    const halo = glow(hex, isOut ? 2.4 : 1.4);
    g.add(ball, halo);
    let shell = null;
    if (isOut || isIn) {
      shell = new THREE.Mesh(new THREE.IcosahedronGeometry(isOut ? 0.55 : 0.32, 0),
        new THREE.MeshBasicMaterial({ color: hex, wireframe: true, transparent: true, opacity: isOut ? 0.6 : 0.3 }));
      g.add(shell);
    }
    net.add(g);
    return { g, ball, halo, shell, act: 0, rest: isOut ? 0.45 : 0.22, li, ni, hex };
  }));

  /* ---- synapses (every neuron wired to the next layer) ---- */
  const edges = [];
  for (let l = 0; l < 3; l++) {
    layerPos[l].forEach((A, a) => layerPos[l + 1].forEach((B, b) => edges.push({ l, a, b, A, B, h: rnd() })));
  }
  const usesProject = (k, e) =>
    e.l === 0 ? PROJECTS[k].inputs.includes(e.a)
    : e.l === 2 ? e.b === k
    : ((e.h * 7.13 + k * 0.371) % 1) < 0.28;
  const projectsForSkill = (s) => PROJECTS.map((p, k) => (p.inputs.includes(s) ? k : -1)).filter((k) => k >= 0);
  const usesSkill = (s, e) => {
    const ks = projectsForSkill(s);
    return e.l === 0 ? e.a === s : ks.some((k) => usesProject(k, e));
  };

  const ePos = new Float32Array(edges.length * 6), eCol = new Float32Array(edges.length * 6);
  edges.forEach((e, i) => ePos.set([e.A.x, e.A.y, e.A.z, e.B.x, e.B.y, e.B.z], i * 6));
  const eGeo = new THREE.BufferGeometry();
  eGeo.setAttribute('position', new THREE.BufferAttribute(ePos, 3));
  eGeo.setAttribute('color', new THREE.BufferAttribute(eCol, 3));
  const eMat = new THREE.LineBasicMaterial({
    vertexColors: true, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false
  });
  net.add(new THREE.LineSegments(eGeo, eMat));

  const DIM = new THREE.Color('#2f3f9a'), FAINT = new THREE.Color('#121947');
  let focus = null;      // { kind: 'p' | 's', i, color }
  function paintEdges() {
    edges.forEach((e, i) => {
      let c = DIM;
      if (focus) c = (focus.kind === 'p' ? usesProject(focus.i, e) : usesSkill(focus.i, e)) ? focus.color : FAINT;
      eCol.set([c.r, c.g, c.b, c.r, c.g, c.b], i * 6);
    });
    eGeo.attributes.color.needsUpdate = true;
  }
  paintEdges();

  /* ---- signal pulses ---- */
  const pool = Array.from({ length: 220 }, () => {
    const s = glow('#ffffff', 0.55);
    s.visible = false;
    net.add(s);
    return { s, e: null, t0: 0, dur: 0, k: 1, free: true };
  });
  let now = 0;
  function fire(e, delay, hex, strength) {
    const p = pool.find((q) => q.free);
    if (!p) return;
    p.free = false; p.e = e; p.t0 = now + delay; p.dur = 0.55 + rnd() * 0.15; p.k = strength;
    p.s.material.color.set(hex);
    p.s.scale.setScalar(strength > 0.6 ? 0.6 : 0.38);
  }
  let passIdx = 0;
  function forwardPass(k) {
    const hex = PROJECTS[k].hue;
    PROJECTS[k].inputs.forEach((s) => { neurons[0][s].act = 1; });
    edges.forEach((e) => { if (usesProject(k, e)) fire(e, e.l * 0.62 + rnd() * 0.12, hex, 1); });
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
    const next = kind ? { kind, i, color: new THREE.Color(kind === 'p' ? PROJECTS[i].hue : '#62e6ff') } : null;
    if (focus && next && focus.kind === next.kind && focus.i === next.i) return;
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

  // hovering a card lights its path in the network
  document.querySelectorAll('.dossier').forEach((card, k) => {
    card.addEventListener('pointerenter', () => setFocus('p', k));
    card.addEventListener('pointerleave', () => setFocus(null));
  });

  /* ---- picking neurons in the scene ---- */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const pickable = [...neurons[0], ...neurons[3]].map((n) => n.ball);
  function pick(ev) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((ev.clientX - r.left) / r.width) * 2 - 1, -((ev.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    ray.params.Mesh = { threshold: 0.2 };
    const hit = ray.intersectObjects(pickable)[0];
    if (!hit) return null;
    const n = [...neurons[0], ...neurons[3]].find((q) => q.ball === hit.object);
    return n.li === 0 ? { kind: 's', i: n.ni } : { kind: 'p', i: n.ni };
  }
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let hoverKey = '';
  hero.addEventListener('pointermove', (ev) => {
    pointer.tx = (ev.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (ev.clientY / window.innerHeight) * 2 - 1;
    if (ev.target.closest('.net-label')) return;
    const hit = pick(ev);
    const key = hit ? hit.kind + hit.i : '';
    if (key !== hoverKey) {
      hoverKey = key;
      setFocus(hit ? hit.kind : null, hit ? hit.i : 0);
      hero.style.cursor = hit && hit.kind === 'p' ? 'pointer' : '';
    }
  });
  hero.addEventListener('pointerleave', () => { hoverKey = ''; setFocus(null); });
  hero.addEventListener('click', (ev) => {
    if (ev.target.closest('a,button')) return;
    const hit = pick(ev);
    if (hit && hit.kind === 'p') dockAt(PROJECTS[hit.i].id);
  });

  /* ---- sizing ---- */
  let W = 0, H = 0, wide = true, baseRotY = -0.3, blocks = [];
  function resize() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    wide = W > 900;
    const camZ = wide ? 17 : 22;
    camera.position.set(0, 0, camZ);
    camera.updateProjectionMatrix();
    // fit the network into the band above the title (pixels → world units at z = 0)
    const upp = (2 * Math.tan((25 * Math.PI) / 180) * camZ) / H;
    const bandY = wide ? 265 : W > 600 ? 215 : 185;
    const netPx = wide ? Math.min(370, H * 0.4) : W > 600 ? 300 : 250;
    const roomW = (W - (W > 600 ? 380 : 64)) * upp;
    const s = Math.min((netPx * upp) / 7.2, roomW / 14.8);
    rig.position.set(0, (H / 2 - bandY) * upp, 0);
    rig.scale.setScalar(s);
    baseRotY = wide ? -0.3 : -0.2;
    const hr = hero.getBoundingClientRect();
    blocks = [...document.querySelectorAll('.callsign, .wordmark, .lede, .hero-actions, .hint')].map((el) => {
      const r = el.getBoundingClientRect();
      return { l: r.left - hr.left - 16, r: r.right - hr.left + 16, t: r.top - hr.top - 14, b: r.bottom - hr.top + 10 };
    });
  }
  window.addEventListener('resize', resize);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(resize);
  resize();

  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); }).observe(hero);

  const v = new THREE.Vector3();
  let intro = 0, nextPass = 1.2, nextAmbient = 0;

  function placeLabel(el, n, side) {
    n.g.getWorldPosition(v);
    v.project(camera);
    const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
    // where the label's body would sit
    const lx = side === 'in' ? x - 150 : x + 16, rx = side === 'in' ? x - 14 : x + 190;
    const covered = blocks.some((b) => rx > b.l && lx < b.r && y > b.t && y < b.b);
    const hide = v.z > 1 || covered || W <= 600;
    el.style.opacity = hide ? '0' : String(Math.min(1, intro * 1.5));
    el.style.pointerEvents = hide ? 'none' : 'auto';
    el.style.transform = side === 'in'
      ? `translate(${(x - 16).toFixed(1)}px, ${(y - 11).toFixed(1)}px) translateX(-100%)`
      : `translate(${(x + 18).toFixed(1)}px, ${(y - 11).toFixed(1)}px)`;
  }

  function frame(dt) {
    now += dt;
    intro = Math.min(1, intro + dt * 0.5);
    const ease = 1 - Math.pow(1 - intro, 3);

    pointer.x += (pointer.tx - pointer.x) * 0.05;
    pointer.y += (pointer.ty - pointer.y) * 0.05;
    net.rotation.y = baseRotY + pointer.x * 0.22 + Math.sin(now * 0.18) * 0.07;
    net.rotation.x = 0.1 + pointer.y * 0.1;
    net.scale.setScalar(0.7 + 0.3 * ease);
    camera.position.x = pointer.x * 0.6;
    camera.lookAt(0, 0, 0);
    dust.rotation.y = now * 0.01;
    eMat.opacity = 0.95 * ease;

    // a forward pass every few seconds, cycling through the projects
    if (now > nextPass && !focus) {
      forwardPass(passIdx % PROJECTS.length);
      passIdx++;
      nextPass = now + 2.8;
    }
    // ambient chatter on random synapses
    if (now > nextAmbient) {
      fire(edges[(rnd() * edges.length) | 0], 0, '#7fa2ff', 0.4);
      nextAmbient = now + 0.07;
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
      n.act *= Math.exp(-dt * 2.2);
      n.ball.scale.setScalar(1 + n.act * 0.7);
      n.halo.material.opacity = (n.rest + n.act * 0.9) * ease;
      if (n.shell) n.shell.rotation.set(now * 0.6 + n.ni, now * 0.8, 0);
    }));
    outLabels.forEach((el, k) => el.classList.toggle('fire', neurons[3][k].act > 0.35));
    inLabels.forEach((el, s) => el.classList.toggle('fire', neurons[0][s].act > 0.35));

    neurons[0].forEach((n, i) => placeLabel(inLabels[i], n, 'in'));
    neurons[3].forEach((n, k) => placeLabel(outLabels[k], n, 'out'));

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
    window.addEventListener('resize', still);
  } else {
    loop();
  }
})();
