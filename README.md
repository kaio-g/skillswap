# SkillSwap

An educational demo for exchanging practical skills without money. Created by Kaio Gervason de Oliveira with AI assistance in Google AI Studio.

[Live demo](https://skillswap-direct-skill-exchange-without-money.ai.studio/)

## Features

- Editable demo profiles and a directory of eight fictional community members.
- Skill search and filters, reciprocal matching, and a clearly labeled rule-based fallback.
- Simulated exchange proposals, acceptance, completion, and private reflections.
- Responsive React interface and original SVG illustrations.

This is a learning project: profiles are fictional, exchanges are simulated, and data is stored in the browser. It does not send real messages or provide verified user accounts.

## Run locally

Use a current Node.js LTS version compatible with the dependencies in package.json.

```sh
npm install
cp .env.example .env
npm run dev
```

Open http://localhost:3000. The rule-based demo works without a Gemini key. To enable AI matching, configure your own GEMINI_API_KEY in .env. Never commit that file. API usage may incur charges.

```sh
npm run lint
npm run build
NODE_ENV=production npm start
```

## Technology

React, TypeScript, Vite, Tailwind CSS, Express, Google Gen AI SDK, and local storage.

## Source archive

The source was recovered directly from the Google AI Studio editor on October 21, 2026 after the built-in ZIP export and GitHub connection failed. The archive preserves the recovered source tree; node_modules, secrets, generated builds, and the AI Studio bun.lock were not included. Dependency versions and the hard-coded Gemini model reflect the original project and may need updating before running outside AI Studio.

The recovered copy has not been installed or executed locally. This repository is a source backup, not a claim of production readiness.

## Author

Kaio Gervason de Oliveira · [LinkedIn](https://www.linkedin.com/in/kaio-gervason-9b3217228/)
