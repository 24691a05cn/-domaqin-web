# DOMAQIN Web — Desktop Mission Control

Desktop-first browser UI for DOMAQIN, the AI-powered autonomous drone mission planner.

## What it includes

- Dark aerospace mission-control interface with persistent sidebar navigation.
- Overview dashboard, mission archive, tactical planner, simulation console, analytics and settings.
- Interactive simulated terrain map using SVG/Canvas-style vector graphics — no paid map API required.
- Mouse pan, zoom, reset, mission route, waypoints, drone marker, obstacles and route-replan visualization.
- Mission creation wizard covering mission details, locations, constraints, drone configuration and planner choice.
- Real FastAPI integration for mission persistence and deterministic A*, Dijkstra, RRT* and Hybrid planning.
- Natural-language mission parser using the backend's local rule-based assistant.
- Live simulation controls and event triggers: obstacle, battery drop, restricted zone and weather.
- Telemetry panel calculated from simulation state: battery, speed, altitude, distance, progress, ETA, heading and waypoint.
- Analytics derived from actual stored mission records.
- Settings for desktop presentation and simulation preferences.

## Run

1. Start the backend from the repository root:

```bash
python -m venv .venv
# Windows PowerShell: .venv\Scripts\Activate.ps1
# macOS/Linux: source .venv/bin/activate
pip install -r backend/requirements.txt
uvicorn backend.api.main:app --reload
```

2. Start the web client in another terminal:

```bash
cd web
npm install
npm run dev
```

3. Open the URL printed by Vite, normally `http://localhost:5173`.

## Backend URL

The client defaults to `http://127.0.0.1:8000`. To change it, create `web/.env.local`:

```env
VITE_API_URL=http://127.0.0.1:8000
```

## Desktop controls

- Use the left navigation or number keys 1–5 for the main sections.
- Use the tactical map with mouse drag to pan and +/- to zoom.
- On the Planner screen, **Generate Route** starts the real backend planner.
- Clicking the map while a mission is selected places a simulated obstacle and requests a replan.
- On Simulation, **Start Simulation** advances the stored route state and telemetry.
- `RUN DEMO` creates/uses a sample mission and walks through planning, simulation and an obstacle event.

## Safety boundary

DOMAQIN Web is simulation/research/education software. It does not control a physical drone and contains no weapon control, harmful payload deployment, autonomous attack or real-world target engagement functionality.
