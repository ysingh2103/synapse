# Yuvraj Singh's Synapse

*Connecting ideas. Building systems. Solving problems.*

Live site: **https://ysingh2103.github.io/synapse/**

Synapse is a living map of my projects, technical skills and experiments across IT infrastructure, networking, automation and software development.

## What's on the page

- **Interactive 3D neural network** as the hero. Skills are the inputs, projects are the outputs, and the middle layers read Diagnose, Build, Document. Glowing neurons with bloom, curved wiring, signals with comet tails, and a boot-up animation on load. Click a skill to pin its connections; click a project to open its panel.
- **The network unfolds as you scroll.** Its fibres stretch and snap into hanging threads, the neurons scatter into the background, and the project neurons follow the reader and dock into their cards. A spine links the page: skills patch into the Stack tools, the spine breaks at the simulator until a ticket is solved, beats into the status panel, and fires the logo at the footer.
- **Particle scenes** behind each section: a brain, a layer stack, a magnifying glass, a broadcast tower and a synapse.
- **Project cards** with headline numbers, build progress, "Powered by" skill links, live demos you can try inside the card, and a case-study panel.
- **Technology stack**, **incident simulator** with three tickets, and **live system status** checked from the visitor's browser.
- Smooth scrolling, an electric cursor and a dark theme that matches the [main portfolio](https://ysingh2103.github.io/).

## Projects

| Project | What it is | Code | Hosted at |
|---|---|---|---|
| Retail Network Lab | Interactive 3D model of an HQ + 23-store retail network with 10 incident drills | [repo](https://github.com/ysingh2103/retail-network) | [live demo](https://ysingh2103.github.io/retail-network/) |
| Store Fault Trace | Prototype that traces a store failure through the power and network chain to root cause | [code](https://github.com/ysingh2103/retail-network/tree/main/fault-trace) | [live demo](https://ysingh2103.github.io/retail-network/fault-trace/) |
| Self-Hosted Infrastructure Lab | VMware ESXi lab with 11 documented incident write-ups | [repo](https://github.com/ysingh2103/Infra-lab) | Self-hosted lab; write-ups in repo |
| DocVault | Document-management app on Tomcat, NGINX and PostgreSQL | [repo](https://github.com/ysingh2103/docvault) | Self-hosted Linux lab server |
| Ultron | Self-hosted incident trainer that injects faults and times the fix | [repo](https://github.com/ysingh2103/Ultron) | Self-hosted lab server |

## Tech

Plain HTML, CSS and JavaScript with [three.js](https://threejs.org/) r128 (plus its bloom post-processing) and [Lenis](https://github.com/darkroomengineering/lenis) from a CDN. No build step.

```
index.html   page structure
style.css    all styling
app.js       skills, project data, card rendering, 3D neural network
```

### Add a new project

Open `app.js` and add one object to the `PROJECTS` array (name, status, hue, description, stack, repo, live URL, and `inputs`: the skills from `SKILLS` that feed it). The card and its output neuron appear automatically.

### Publishing an update

After changing `style.css` or `app.js`, bump the `?v=` number on both links in `index.html` so browsers fetch the new files instead of a cached copy.

### Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Deploy on GitHub Pages

Repo **Settings → Pages → Deploy from a branch → `main` / root**. The site goes live at `https://ysingh2103.github.io/synapse/`.

## Author

**Yuvraj Singh**
[LinkedIn](https://linkedin.com/in/y-singh-gill) · [GitHub](https://github.com/ysingh2103)

## License

MIT
