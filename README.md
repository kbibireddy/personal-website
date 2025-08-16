# Personal Website

My personal website built with Next.js, React, TypeScript, and Tailwind CSS. Features a modern, responsive design with theme switching inspired by popular tech companies.

## Features

- 🎨 Three company-inspired themes (Netflix, Meta, Discord)
- 📱 Fully responsive design
- ✨ Modern UI with animations using Framer Motion
- 🎯 Skills visualization with proficiency ratings
- 📄 Centralized content management using JSON files
- 🌙 Smooth theme transitions

## Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

## Deployment

The website is automatically deployed to GitHub Pages using GitHub Actions when changes are pushed to the main branch. The live site can be accessed at: https://kbibireddy.github.io/resume

### Manual Deployment

If you need to deploy manually:

1. Build the project:
```bash
npm run build
```

2. The static files will be generated in the `out` directory
3. Push to the main branch and the GitHub Action will handle deployment

## Project Structure

```
├── src/
│   ├── app/            # Next.js app directory
│   ├── components/     # React components
│   ├── data/          # Content JSON files
│   └── types/         # TypeScript type definitions
├── public/            # Static assets
└── ...configuration files
```

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- React Icons 