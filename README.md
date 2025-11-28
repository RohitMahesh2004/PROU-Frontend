# 🌍 Planet Earth

<div align="center">
  <img width="1439" height="832" alt="Planet Earth Landing Page" src="https://github.com/user-attachments/assets/2de9ea23-939e-4224-91a6-1dcc1acddabb" />
  <p><em>Our home in the cosmos, a pale blue dot floating in the vastness of space</em></p>
</div>

## ✨ About

Planet Earth is a beautifully designed landing page that showcases our home planet through an immersive space-themed interface. The project features a 3D Earth visualization with an elegant dark theme, animated stars, and smooth navigation.

## 🚀 Features

- **Interactive 3D Earth Visualization** - Stunning visual representation of our planet
- **Space-Themed Design** - Immersive cosmic atmosphere with animated starfield
- **Responsive Navigation** - Seamless navigation between Home, About, and Contact pages
- **Modern UI/UX** - Clean, contemporary design with glassmorphism effects
- **Performance Optimized** - Built with Next.js for optimal loading speeds

## 🛠️ Tech Stack

- **Framework:** [Next.js 14](https://nextjs.org/) with App Router
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Styling:** CSS/Tailwind CSS with [PostCSS](https://postcss.org/)
- **UI Components:** Custom components with shadcn/ui
- **3D Graphics:** Three.js (for Earth scene)
- **Font:** [Geist](https://vercel.com/font) - Optimized with `next/font`
- **Linting:** ESLint
- **Deployment:** [Vercel](https://vercel.com)

## 📦 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/planet-earth.git
cd planet-earth
```

2. Install dependencies
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

The page will auto-update as you edit `src/app/page.tsx`.

## 📁 Project Structure

```
planet-earth-landing/
├── src/
│   ├── app/
│   │   ├── page.tsx          # Main landing page
│   │   ├── layout.tsx        # Root layout
│   │   ├── globals.css       # Global styles
│   │   └── favicon.ico       # Favicon
│   ├── components/
│   │   └── ui/
│   │       ├── aurora-background.tsx
│   │       ├── resizable-navbar.tsx
│   │       └── sparkles.tsx
│   ├── utils/
│   │   ├── CelestialBackground.tsx
│   │   └── EarthScene.tsx
│   └── lib/
│       └── utils.ts
├── public/
│   └── earth/
│       ├── textures/
│       │   └── Material.002_diffuse.jpeg
│       ├── scene.bin
│       ├── scene.gltf
│       └── license.txt
├── .next/                    # Next.js build output
├── node_modules/            # Dependencies
├── .gitignore
├── components.json          # shadcn/ui config
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── package-lock.json
├── postcss.config.mjs
└── README.md
```

## 🎨 Customization

You can customize the appearance by modifying:
- Colors and themes in `src/app/globals.css`
- UI components in `src/components/ui/`
- 3D Earth scene in `src/utils/EarthScene.tsx`
- Background effects in `src/utils/CelestialBackground.tsx`
- Navigation in `src/components/ui/resizable-navbar.tsx`


## 📄 License

© 2024 PLANET EARTH. All rights reserved.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/yourusername/planet-earth/issues).

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs)
- [Next.js Interactive Tutorial](https://nextjs.org/learn)
- [Next.js GitHub Repository](https://github.com/vercel/next.js)

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme).

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

<div align="center">
  Made with 💙 for our pale blue dot
</div>
