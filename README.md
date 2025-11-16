# DevUtilities

A modern, production-grade Next.js web application serving as a comprehensive utility hub for developers. DevUtilities provides access to a wide range of professional assets and tools.

## 🎨 Brand Identity

- **Name**: DevUtilities
- **Primary Color Palette**:
  - Background: `#0d0d0d` (dark theme)
  - Foreground/Text: `#ffffff` (white)
- **UI Style**: Minimal, high-contrast, developer-centric with premium spacing and typography hierarchy

## ✨ Features

### 1. Typography Library
- Professional font families for development, UI/UX, and documentation
- Categories: Sans Serif, Serif, Monospace, Display
- Live font preview
- Copy-to-clipboard functionality
- Direct links to Google Fonts

### 2. SVG & Icons Library
- 100+ professional icons powered by Lucide React
- Categories: System, UI Elements, Development, Media, Files, Communication, Shopping
- Searchable and filterable
- Copy icon code instantly

### 3. Colors & Gradients
- **Color Palette Generator**: Generate random 5-color palettes
- **Gradient Presets**: 8 beautiful pre-made gradients
- **Shadow Presets**: 6 different shadow styles
- **Glassmorphism Presets**: Modern glass effect styles
- Hex and RGB color formats

### 4. UI/Code Snippets
- Reusable CSS, Tailwind, and React components
- Categories: Tailwind Layouts, CSS Components, React Components, Animations, Utility Classes
- Ready-to-use code snippets
- Copy and paste directly into your project

### 5. Data Converters
- **Base64**: Encode/Decode Base64
- **Hash**: Generate SHA-256 and SHA-1 hashes
- **URL**: Encode/Decode URLs
- **Hex**: Convert between string and hexadecimal

### 6. Generators
- **UUID**: Generate unique identifiers (v4)
- **Password**: Secure password generator with customizable options
- **Token**: Random token generation
- **Lorem Ipsum**: Placeholder text generator

### 7. Formatters & Beautifiers
- **JSON**: Format and minify JSON
- **XML**: Format and structure XML
- **SQL**: Format SQL queries
- **Markdown**: Clean and structure Markdown

## 🚀 Getting Started

### Prerequisites
- Node.js 20+ installed
- pnpm (recommended) or npm

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd utilities-dev

# Install dependencies
pnpm install

# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 🛠 Tech Stack

- **Framework**: Next.js 16.0.3 (App Router)
- **React**: 19.2.0
- **Styling**: Tailwind CSS 4
- **Icons**: Lucide React
- **TypeScript**: Latest
- **Build Tool**: Turbopack

## 📁 Project Structure

```
utilities-dev/
├── app/
│   ├── components/         # Shared components
│   │   ├── Sidebar.tsx
│   │   ├── SearchBar.tsx
│   │   └── CopyButton.tsx
│   ├── typography/         # Typography Library page
│   ├── icons/              # SVG & Icons Library page
│   ├── colors/             # Colors & Gradients page
│   ├── snippets/           # UI/Code Snippets page
│   ├── converters/         # Data Converters page
│   ├── generators/         # Generators page
│   ├── formatters/         # Formatters page
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Home page
│   └── globals.css         # Global styles
├── public/                 # Static assets
├── package.json
└── README.md
```

## 🎯 Key Features

- ✅ Fully responsive layout
- ✅ Server-side rendering with Next.js App Router
- ✅ SEO-optimized metadata
- ✅ Copy-to-clipboard functionality
- ✅ Search and filter capabilities
- ✅ Modern, accessible UI components
- ✅ Dark theme optimized for developers
- ✅ Fast performance with code splitting

## 🚢 Production Build

```bash
# Build for production
pnpm build

# Start production server
pnpm start
```

## 📝 Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Design System

### Colors
- Background: `#0d0d0d`
- Muted Background: `#1a1a1a`
- Border: `#2a2a2a`
- Accent: `#3a3a3a`
- Text Primary: `#ffffff`
- Text Secondary: `#a0a0a0`

### Typography
- Sans: Geist Sans
- Mono: Geist Mono

### Spacing Scale
- xs: 0.5rem
- sm: 0.75rem
- md: 1rem
- lg: 1.5rem
- xl: 2rem
- 2xl: 3rem
- 3xl: 4rem

## 🔮 Future Enhancements

- [ ] User login with saved workspace
- [ ] Favorites/bookmarks system
- [ ] Shareable asset links
- [ ] API access for integration
- [ ] Keyboard shortcuts for power users
- [ ] Additional converter types
- [ ] More icon libraries
- [ ] Custom color palette export formats

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Built with ❤️ for developers by developers
