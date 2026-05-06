# PDI Work Instruction Builder

Single-page web app for building laminated shop-floor work instructions.

## Run locally

```bash
npm install
npm start
```

The app serves at `http://localhost:10000`. Open in any modern browser. Data
is auto-saved in your browser's `localStorage` under the key
`workInstructionBuilder_v4`.

## Project layout

```
.
├── server.js            Express static-file server with health check + SPA fallback
├── package.json         Node 22.x, Express 5.x
├── public/
│   └── index.html       The full single-file application (HTML + CSS + JS)
└── render.yaml          Optional: declarative deploy config for Render
```

## Deploy

Push to a GitHub repository, then connect that repo to a Render Web Service.
Render runs `npm install` and `npm start` on every push to `main`.

- **Build command:** `npm install`
- **Start command:** `npm start`
- **Health check path:** `/healthz`

See `DEPLOY.md` for full step-by-step instructions.
