# DevUtilities – Next.js Developer Utility Hub

Build a modern, production-ready **Next.js** web application named **DevUtilities**.  
This document serves as a **complete specification and prompt** for generating the application.

---

## 1. Project Overview

DevUtilities is a **central hub of tools, assets, and utilities for developers**.

Key objectives:

- Provide a **rich, premium UI** with a **professional documentation-style layout**.
- Offer **numerous professional fonts**, **high-quality SVGs**, and **developer utilities** frequently needed in daily workflows.
- Maintain a **cohesive design system** with strong typography, spacing, and accessibility.

---

## 2. Branding & Design System

### 2.1 Color Palette

- Primary Background: `#0d0d0d` (dark, near-black)
- Primary Foreground/Text: `#ffffff` (white)
- Optional Accent (for highlights, links, CTA):
  - `#3b82f6` (blue) or a similar professional accent
- Use subtle variations of grey for borders, cards, and muted text.

### 2.2 Layout Style

- Overall Style:  
  - **Rich, elegant, modern**, inspired by high-end developer tools and documentation sites.
  - Looks like a **premium documentation platform** (e.g., modern API docs / developer platforms).
- Structure:
  - Left sidebar navigation (for sections)
  - Top bar with search and quick actions
  - Main content area with documentation-style blocks
  - Optional right-side panel for quick utilities, notes, or related items
- Spacing:
  - Generous padding and margin
  - Clear hierarchy using headings, subheadings, and cards
  - Consistent vertical rhythm

### 2.3 Typography (Use Good Professional Fonts)

Use **clean, modern, professional fonts** suitable for a developer platform and documentation.

Suggestions (font stack examples, choose any similar system):

- Primary UI Font:
  - `Inter`, `SF Pro Text`, `Satoshi`, or similar modern sans-serif.
- Code / Monospace Font:
  - `JetBrains Mono`, `Fira Code`, or similar.

Typography requirements:

- Clear hierarchy: `h1`, `h2`, `h3`, `h4`, body, captions.
- Use comfortable line heights for long-form documentation.
- Use a distinct monospace font for code snippets and utility outputs.

---

## 3. Technology Stack

- **Framework:** Next.js (latest stable, App Router)
- **UI / Styling:** Tailwind CSS + custom utility classes
- **Language:** TypeScript (recommended)
- **Icons / SVG:** Custom SVG library or a structured SVG icon system
- **State Management:** React hooks and simple state; no heavy library unless needed
- **Other:**
  - SEO metadata configuration
  - Code splitting and performance optimization
  - Responsive and mobile-first design

---

## 4. Application Structure

### 4.1 High-Level Pages / Sections

1. **Landing / Home Page**
   - Brief introduction to DevUtilities
   - Highlight major features and tools
   - Clear CTA to start using utilities

2. **Typography Library**
   - Browse professional font pairs and suggestions
   - Preview headings, body text, and code blocks
   - Provide suggested CSS/Tailwind font configurations
   - Copy-to-clipboard for font configurations

3. **SVG & Icons Library**
   - Grid of SVG icons and professional illustrations
   - Filtering and search (by name, category, style)
   - Quick preview on dark/light background
   - Copy SVG code or download SVG file

4. **Colors & Gradients**
   - Curated color palettes for UI
   - Gradient presets (linear and radial)
   - Ability to copy HEX/RGB/HSL values
   - Preview components using selected colors

5. **UI / Code Snippets**
   - Library of reusable UI snippets (cards, buttons, layouts)
   - Tailwind-ready component examples
   - Copy-to-clipboard for code blocks
   - Sections for layout presets and CSS utilities (e.g., glassmorphism, shadows)

6. **Data Conversion Tools**
   - JSON formatter/beautifier and validator
   - XML/SQL/Markdown formatter
   - Base64 encode/decode
   - Hash utilities (e.g., SHA-256, MD5) – client-side only

7. **Generators**
   - UUID generator
   - Random password generator with options (length, symbols, numbers)
   - Token generator
   - Slug generator

8. **Regex & Text Utilities**
   - Regex tester with live match preview
   - Common regex snippets library
   - Text case converters (camelCase, snake_case, kebab-case, Title Case, etc.)

9. **Docs-Style Knowledge Section**
   - Professional docs layout that explains:
     - How to use each tool
     - Best practices for fonts, colors, and component reuse
   - Sidebar navigation for documentation topics
   - Automatic table of contents in each doc page (optional)

10. **(Optional) User Features**
    - Authentication (login/signup) for saving:
      - Favorite fonts, palettes, and snippets
      - Custom collections and workspaces

---

## 5. Step-by-Step Feature List (Implementation Guide)

### Step 1: Project Setup

- Initialize a **Next.js** project with the App Router.
- Configure **TypeScript**.
- Install and configure **Tailwind CSS**.
- Define global layout:
  - Root layout with dark background (`#0d0d0d`)
  - Base typography styles
  - Global CSS reset

### Step 2: Design System & Theme
- Define base components:
  - `Button`, `Card`, `Input`, `Textarea`, `Badge`, `Tooltip`
- Good Well Professional Fonts.

### Step 3: Navigation & Layout

- Implement a shell layout:
  - Fixed sidebar with:
    - Logo / title: **DevUtilities**
    - Navigation links to all major sections
  - Topbar with:
    - Global search input
    - Quick-access buttons (e.g., “New UUID”, “Formatter”)
  - Main content area for the current module
- Ensure full responsiveness:
  - Collapsible sidebar on mobile
  - Adaptive layout for smaller screens

### Step 4: Typography Library Module

- Implement a page that:
  - Lists curated font stacks and pairs
  - Previews:
    - Heading styles
    - Paragraph/body text
    - Code blocks
  - Allows copying:
    - CSS font-family snippets
    - Tailwind config snippets
- Provide a “Docs” subpage explaining:
  - How to choose fonts
  - Best practices for developer platforms

### Step 5: SVG & Icons Library Module

- Implement a searchable and filterable grid:
  - Display SVG icons and illustrations
  - Preview each SVG on dark background (`#0d0d0d`) and white
- Add actions:
  - Copy SVG markup
  - Download SVG file
- Include documentation:
  - How to optimize SVGs
  - Best practices for embedding SVG in React/Next.js

### Step 6: Colors & Gradients Module

- Implement sections for:
  - Color palettes (e.g., neutral, primary, semantic)
  - Gradient presets
- Each item should show:
  - Live preview block
  - HEX / RGB values
  - Copy-to-clipboard buttons
- Add docs explaining:
  - Color system strategy
  - Accessibility and contrast

### Step 7: UI / Code Snippets Module

- Provide:
  - Card components, buttons, sections, hero blocks, etc.
  - Each with:
    - On-screen preview
    - Corresponding code snippet (Tailwind + JSX)
- Include:
  - “Copy snippet” button
- Add docs:
  - How to structure components
  - Best practices for layout and responsiveness

### Step 8: Data Conversion Tools Module

- Implement tools:
  - JSON formatter/beautifier & validator
  - Base64 encode/decode
  - Other converters as needed
- Each tool should have:
  - Input area
  - Output area
  - Clear error handling
  - Copy result button
- Provide doc page:
  - How each converter works
  - Edge cases and limitations

### Step 9: Generators Module

- Implement:
  - UUID generator
  - Password generator with configurable options
  - Token/slug generator
- Features:
  - One-click generate
  - Copy-to-clipboard
  - Optional “Generate on load” setting

### Step 10: Regex & Text Utilities Module

- Regex tester:
  - Input: sample text
  - Input: regex pattern
  - Live highlighting of matches
- Text case converters:
  - Multiple options with instant conversion
- Docs:
  - Common regex patterns for developers
  - Examples and reference tips

### Step 11: Documentation Layout

- Create a **dedicated documentation layout** with:
  - Left sidebar table of contents
  - Main content area with:
    - Headings
    - Code blocks
    - Info/warning notes as callouts
  - Typography optimized for reading
- Organize docs by:
  - “Getting Started”
  - “Design System”
  - “Modules & Tools”
  - “Examples & Recipes”

### Step 12: UX Details & Enhancements

- Add:
  - Keyboard shortcuts for frequent actions (optional)
  - Smooth animations and subtle transitions
  - Persistent theme configuration (if light mode added later)
- Ensure:
  - Instant feedback on copy actions (e.g., “Copied” toast)
  - Accessible focus states for keyboard navigation

### Step 13: Performance & SEO

- Implement:
  - Metadata for all pages
  - Descriptive titles and descriptions
  - Proper heading structure
- Optimize:
  - Bundle size (tree-shaking, code splitting)
  - Image and SVG usage

---

## 6. Quality Expectations

- The final web app must:
  - Feel **polished and premium**, not generic.
  - Have a **cohesive design system** and **professional documentation layout**.
  - Use **high-quality fonts** and **clear typography hierarchy**.
  - Deliver a **smooth, responsive, and accessible user experience**.
  - Be structured and written like a **production-ready developer tool**.

---

Use this `README.md` as the **exact specification and prompt** to generate or build the Next.js application **DevUtilities**.
