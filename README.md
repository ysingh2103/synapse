# Synapse

**Every project I've built, in one place.**
Live site: **https://ysingh2103.github.io/starforge/**

Synapse is my project network. The page opens on a live 3D neural network: my skills form the input layer, two hidden layers sit in the middle, and each project is an output neuron. Signals fire forward through the network, and hovering a skill lights up every project it powers. Click a project neuron (or its label) to jump to that project's card, where you'll find what it does, the tech behind it, the GitHub repo and where it's hosted.

## Output layer

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

### Run locally

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

### Deploy on GitHub Pages

Repo **Settings → Pages → Deploy from a branch → `main` / root**. The site goes live at `https://ysingh2103.github.io/starforge/`.

## Author

**Yuvraj Singh** · IT Network Support Specialist & QA Analyst, Toronto
[LinkedIn](https://linkedin.com/in/y-singh-gill) · [GitHub](https://github.com/ysingh2103)

## License

MIT
