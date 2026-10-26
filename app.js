/* Starforge — project data, card rendering and the 3D orrery.
   To add a project: append an object to PROJECTS. The card and its orbiting
   satellite are generated automatically. */

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
    hostLabel: 'GitHub Pages'
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
    hostLabel: 'GitHub Pages'
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
    hostNote: 'Self-hosted on a VMware ESXi home lab. Write-ups are published in the repo.'
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
    hostNote: 'Self-hosted on a Linux lab server (Ubuntu VM). No public URL yet.'
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
    hostNote: 'Runs on a self-hosted lab server. Public deployment planned on Azure.'
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
  `Station online · ${PROJECTS.length} projects in orbit`;

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

/* ---------- 3D orrery ---------- */
(function orrery() {
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
  camera.position.set(0, 3.2, 17);

  const system = new THREE.Group();      // core + orbits, offset to the right on wide screens
  scene.add(system);

  /* starfield */
  const starGeo = new THREE.BufferGeometry();
  const N = 2600, pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const tint = [new THREE.Color('#ffffff'), new THREE.Color('#c9d4ff'), new THREE.Color('#ffd79a')];
  for (let i = 0; i < N; i++) {
    const r = 40 + Math.random() * 140;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos.set([r * Math.sin(ph) * Math.cos(th), r * Math.cos(ph), r * Math.sin(ph) * Math.sin(th)], i * 3);
    const c = tint[(Math.random() * 3) | 0];
    col.set([c.r, c.g, c.b], i * 3);
  }
  starGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  starGeo.setAttribute('color', new THREE.BufferAttribute(col, 3));
  const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({
    size: 0.35, vertexColors: true, transparent: true, opacity: 0.85, depthWrite: false
  }));
  scene.add(stars);

  /* glow sprite texture */
  function glowTexture() {
    const c = document.createElement('canvas'); c.width = c.height = 128;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
    grd.addColorStop(0, 'rgba(255,255,255,1)');
    grd.addColorStop(0.25, 'rgba(255,255,255,.45)');
    grd.addColorStop(1, 'rgba(255,255,255,0)');
    g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
    return new THREE.CanvasTexture(c);
  }
  const glowTex = glowTexture();
  const glow = (color, scale) => {
    const s = new THREE.Sprite(new THREE.SpriteMaterial({
      map: glowTex, color, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false
    }));
    s.scale.setScalar(scale);
    return s;
  };

  /* the forge: a burning core inside two counter-rotating wireframe shells */
  const core = new THREE.Group();
  system.add(core);
  core.add(new THREE.Mesh(new THREE.SphereGeometry(1.05, 32, 32),
    new THREE.MeshBasicMaterial({ color: '#ffcf86' })));
  core.add(glow('#ffb547', 9));
  const shellA = new THREE.Mesh(new THREE.IcosahedronGeometry(1.9, 1),
    new THREE.MeshBasicMaterial({ color: '#ffb547', wireframe: true, transparent: true, opacity: 0.35 }));
  const shellB = new THREE.Mesh(new THREE.OctahedronGeometry(2.6, 0),
    new THREE.MeshBasicMaterial({ color: '#8aa4ff', wireframe: true, transparent: true, opacity: 0.25 }));
  core.add(shellA, shellB);

  /* satellites, one per project */
  const sats = [];
  const labelLayer = document.createElement('div');
  labelLayer.className = 'orbit-labels';
  labelLayer.setAttribute('aria-label', 'Projects in orbit');
  Object.assign(labelLayer.style, { position: 'absolute', inset: '0', zIndex: '1', pointerEvents: 'none' });
  hero.appendChild(labelLayer);

  PROJECTS.forEach((p, i) => {
    const radius = 3.8 + i * 1.35;
    const tilt = new THREE.Group();
    tilt.rotation.x = 1.15 + (i % 2 ? 0.18 : -0.12);
    tilt.rotation.z = (i - 2) * 0.16;
    system.add(tilt);

    // dotted orbit path
    const pts = [];
    for (let k = 0; k <= 128; k++) {
      const a = (k / 128) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    const path = new THREE.LineLoop(new THREE.BufferGeometry().setFromPoints(pts),
      new THREE.LineDashedMaterial({ color: p.hue, dashSize: 0.18, gapSize: 0.22, transparent: true, opacity: 0.35 }));
    path.computeLineDistances();
    tilt.add(path);

    const body = new THREE.Group();
    const planet = new THREE.Mesh(new THREE.SphereGeometry(0.32 + (i === 0 ? 0.1 : 0), 24, 24),
      new THREE.MeshBasicMaterial({ color: p.hue }));
    const halo = glow(p.hue, 2.2);
    body.add(planet, halo);
    if (i === 0 || i === 3) {   // a ring on two of them for variety
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.55, 0.62, 48),
        new THREE.MeshBasicMaterial({ color: p.hue, side: THREE.DoubleSide, transparent: true, opacity: 0.7 }));
      ring.rotation.x = 1.2;
      body.add(ring);
    }
    tilt.add(body);

    const label = document.createElement('a');
    label.href = '#' + p.id;
    label.textContent = p.name;
    label.className = 'orbit-label';
    Object.assign(label.style, {
      position: 'absolute', left: '0', top: '0', pointerEvents: 'auto',
      font: '500 12px/1 "IBM Plex Mono", ui-monospace, monospace',
      color: '#e1e8ff', textDecoration: 'none', whiteSpace: 'nowrap',
      padding: '5px 8px', borderRadius: '6px',
      background: 'rgba(7,10,28,.65)', border: `1px solid ${p.hue}66`,
      backdropFilter: 'blur(4px)', transition: 'opacity .3s, border-color .2s',
      willChange: 'transform'
    });
    label.addEventListener('click', (e) => { e.preventDefault(); dockAt(p.id); });
    label.addEventListener('pointerenter', () => setLit(i, true));
    label.addEventListener('pointerleave', () => setLit(i, false));
    labelLayer.appendChild(label);

    sats.push({
      p, body, planet, halo, label, radius,
      speed: 0.16 / Math.sqrt(radius / 3.8),
      angle: i * 1.3 + 0.4,
      lit: false
    });
  });

  // highlight a satellite when its card is hovered, and vice versa
  function setLit(i, on) {
    const s = sats[i]; s.lit = on;
    const card = document.getElementById(s.p.id);
    if (card) card.classList.toggle('is-lit', on);
  }
  document.querySelectorAll('.dossier').forEach((card, i) => {
    card.addEventListener('pointerenter', () => { sats[i].lit = true; });
    card.addEventListener('pointerleave', () => { sats[i].lit = false; });
  });

  /* click a planet in the scene */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hoverIdx = -1;
  function pick(e) {
    const r = canvas.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    const hits = ray.intersectObjects(sats.map((s) => s.planet));
    return hits.length ? sats.findIndex((s) => s.planet === hits[0].object) : -1;
  }
  hero.addEventListener('pointermove', (e) => {
    pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
    const idx = pick(e);
    if (idx !== hoverIdx) {
      if (hoverIdx >= 0) setLit(hoverIdx, false);
      if (idx >= 0) setLit(idx, true);
      hoverIdx = idx;
      hero.style.cursor = idx >= 0 ? 'pointer' : '';
    }
  });
  hero.addEventListener('click', (e) => {
    if (e.target.closest('a,button')) return;
    const idx = pick(e);
    if (idx >= 0) dockAt(sats[idx].p.id);
  });

  /* sizing */
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  let W = 0, H = 0, wide = true;
  function resize() {
    W = hero.clientWidth; H = hero.clientHeight;
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    wide = W > 900;
    camera.position.z = wide ? 17 : 24;
    camera.updateProjectionMatrix();
    system.position.set(wide ? 8.4 : 0, wide ? 1.9 : 3.2, 0);
    system.scale.setScalar(wide ? 0.88 : 0.85);
  }
  window.addEventListener('resize', resize);
  resize();

  /* only animate while the hero is on screen */
  let visible = true;
  new IntersectionObserver(([en]) => { visible = en.isIntersecting; if (visible) loop(); })
    .observe(hero);

  const v = new THREE.Vector3();
  const clock = new THREE.Clock();
  let intro = 0;   // 0 → 1 over the first seconds: the system spins up

  function frame(dt, t) {
    intro = Math.min(1, intro + dt * 0.45);
    const ease = 1 - Math.pow(1 - intro, 3);

    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    camera.position.x = pointer.x * 1.6;
    camera.position.y = 3.2 - pointer.y * 1.2;
    camera.lookAt(system.position.x * 0.55, system.position.y * 0.5, 0);

    stars.rotation.y = t * 0.008;
    shellA.rotation.set(t * 0.25, t * 0.32, 0);
    shellB.rotation.set(-t * 0.18, -t * 0.12, t * 0.1);
    core.scale.setScalar((0.35 + 0.65 * ease) * (1 + Math.sin(t * 2.2) * 0.025));

    sats.forEach((s, i) => {
      s.angle += dt * s.speed * (0.4 + 0.6 * ease);
      const r = s.radius * (0.2 + 0.8 * ease);
      s.body.position.set(Math.cos(s.angle) * r, Math.sin(s.angle) * r, 0);
      const target = s.lit ? 1.6 : 1;
      s.body.scale.setScalar(s.body.scale.x + (target - s.body.scale.x) * 0.15);
      s.halo.material.opacity = s.lit ? 1 : 0.75;

      // screen-space label
      s.body.getWorldPosition(v);
      v.project(camera);
      const x = (v.x * 0.5 + 0.5) * W, y = (-v.y * 0.5 + 0.5) * H;
      const behind = v.z > 1;
      const showLabels = W > 560;
      s.label.style.opacity = behind || !showLabels ? '0' : String(Math.min(1, ease * 1.4) * (s.lit ? 1 : 0.82));
      s.label.style.pointerEvents = behind || !showLabels ? 'none' : 'auto';
      s.label.style.borderColor = s.lit ? s.p.hue : s.p.hue + '66';
      s.label.style.transform = `translate(${(x + 14).toFixed(1)}px, ${(y - 10).toFixed(1)}px)`;
    });

    renderer.render(scene, camera);
  }

  let running = false;
  function loop() {
    if (running || reduceMotion) return;
    running = true;
    const tick = () => {
      if (!visible) { running = false; return; }
      const dt = Math.min(clock.getDelta(), 0.05);
      frame(dt, clock.elapsedTime);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  }

  if (reduceMotion) {
    intro = 1;
    frame(0, 4);                                   // one still frame
    window.addEventListener('resize', () => frame(0, 4));
  } else {
    loop();
  }
})();
