# Kasa

A real estate rental browsing platform with property listings, image galleries, and detailed descriptions.

<img width="2844" height="1574" alt="Kasa-screenshot" src="https://github.com/user-attachments/assets/33c775b7-3567-4fa9-ba4d-1fc36f5e54e0" />
<!-- Take a screenshot of the app running locally and add it as screenshot.png -->

## Features

- Property listing page with card grid layout
- Individual property pages with image carousel/gallery
- Collapsible description and equipment sections
- Responsive design across mobile, tablet, and desktop
- REST API integration for property data

## Tech

React · TypeScript · Vite · CSS Modules

Companion API: [Kasa-2-server](https://github.com/Zansuken/Kasa-2-server) (Node.js + Express)

## Run locally

```bash
# Start the API first
git clone https://github.com/Zansuken/Kasa-2-server.git
cd Kasa-2-server
npm install
npm start

# Then the client
git clone https://github.com/Zansuken/Kasa-2.git
cd Kasa-2
cp .env.example .env  # or create .env with VITE_API_URL=http://localhost:3001
npm install
npm run dev
```
