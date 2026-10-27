# Yuvraj Singh's Synapse

*Connecting ideas. Building systems. Solving problems.*

Live site: **https://ysingh2103.github.io/starforge/**

Synapse is a living map of my projects, technical skills and experiments across IT infrastructure, networking, automation and software development.

## What's on the page

- **Interactive 3D neural network.** My skills are the input layer and my projects are the outputs. Click a skill to pin its connections (unrelated nodes dim); click a project to open a panel with what it does, its tech, GitHub and live demo. It turns slowly when idle, pauses while you interact, and has a Reset view button.
- **Project case studies** with real screenshots, tags, and buttons for the live demo, source code and an expandable case study. Hovering a card lights its path in the network.
- **Technology stack** grouped into Networking, Infrastructure, Web development and Databases & applications. Click a technology to highlight the projects that use it.
- **Incident simulator** with three troubleshooting tickets (store payments down, DNS at head office, a full DHCP scope). Investigate the components, read the diagnostics and name the root cause. Fully simulated.
- **Live system status** checked from the visitor's browser: the site, the hosted demos and the source repo. Nothing is shown as online unless the check passes.

## Projects

| Project | What it is | Code | Hosted at |
|---|---|---|---|
| Retail Network Lab | Interactive 3D model of an HQ + 23-store retail network with 10 incident drills | [repo](https://github.com/ysingh2103/retail-network) | [live demo](https://ysingh2103.github.io/retail-network/) |
| Store Fault Trace | Prototype that traces a store failure through the power and network chain to root cause | [code](https://github.com/ysingh2103/retail-network/tree/main/fault-trace) | [live demo](https://ysingh2103.github.io/retail-network/fault-trace/) |
| Self-Hosted Infrastructure Lab | VMware ESXi lab with 11 documented incident write-ups | [repo](https://github.com/ysingh2103/Infra-lab) | Self-hosted lab; write-ups in repo |
| DocVault | Document-management app on Tomcat, NGINX and PostgreSQL | [repo](https://github.com/ysingh2103/docvault) | Self-hosted Linux lab server |
| Ultron | Self-hosted incident trainer that injects faults and times the fix | [repo](https://github.com/ysingh2103/Ultron) | Self-hosted lab server |

## Tech

Plain HTML, CSS and JavaScript with [three.js](https://threejs.org/) r128 from a CDN. No build step.

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

Repo **Settings → Pages → Deploy from a branch → `main` / root**. The site goes live at `https://ysingh2103.github.io/starforge/`.

## Author

**Yuvraj Singh**
[LinkedIn](https://linkedin.com/in/y-singh-gill) · [GitHub](https://github.com/ysingh2103)

## License

MIT
