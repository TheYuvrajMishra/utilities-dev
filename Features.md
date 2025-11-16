DevUtilities – Next.js Developer Utility Hub (Enhanced Prompt)
Build a modern, production-ready Next.js web application named DevUtilities. This document serves as a complete specification and prompt for generating the application.

1. Project Overview
DevUtilities is a central hub of tools, assets, and utilities for developers.

Key objectives:

Provide a rich, premium UI with a professional documentation-style layout.

Offer numerous professional fonts, high-quality SVGs, and developer utilities frequently needed in daily workflows.

Maintain a cohesive design system with strong typography, spacing, and accessibility.

2. Branding & Design System
2.1 Color Palette
Primary Background: #0d0d0d (dark, near-black). Apply to <body>.

Primary Foreground/Text: #ffffff (white).

Muted Text: #a1a1aa (Tailwind's zinc-400).

Borders & Dividers: #27272a (Tailwind's zinc-800).

Card/Surface Background: #18181b (Tailwind's zinc-900).

Primary Accent: #3b82f6 (Tailwind's blue-500).

Accent Hover: #2563eb (Tailwind's blue-600).

2.2 Layout Style
Overall Style: Rich, elegant, modern, inspired by high-end developer tools (e.g., Vercel, Stripe Docs).

Structure:

Fixed Left Sidebar (for primary navigation).

Sticky Topbar (for search, breadcrumbs, and quick actions).

Main Content Area (with generous padding).

Optional Right-Side Panel (for "On This Page" ToC in docs).

2.3 Typography (Use Good Professional Fonts)
Primary UI Font: Inter (or Satoshi). Use a variable font for best performance.

Code / Monospace Font: JetBrains Mono (or Fira Code).

Hierarchy:

h1: text-3xl lg:text-4xl font-bold tracking-tight

h2: text-2xl font-semibold tracking-tight border-b border-zinc-800 pb-2

h3: text-xl font-semibold

p (Body): text-base text-zinc-300 (use text-white for emphasis, text-zinc-400 for muted).

code: Use the monospace font, bg-zinc-800, text-blue-300, px-1 py-0.5 rounded-md text-sm.

2.4 Global Layout & Spacing System (NEW)
This section defines the core layout and spacing to solve padding/margin inconsistencies.

Core Layout Structure:

Sidebar: fixed top-0 left-0 h-screen w-64 (Desktop). On mobile (<lg), it should be hidden and toggled.

Main Wrapper: lg:ml-64 (to offset the sidebar on desktop).

Topbar: sticky top-0 z-10 h-16 (Inside the Main Wrapper).

Content Area: <main className="p-6 lg:p-10"> (This is the primary content padding).

Spacing & Sizing Rules (Use Tailwind's scale):

Vertical Rhythm: Use space-y-6 or space-y-8 for stacking top-level sections in the content area.

Card Padding: All cards (e.g., tool cards, snippet cards) must use consistent padding. Default: p-6.

Gaps: Use gap-4 or gap-6 for grid and flex layouts.

Inputs: Use h-10 for standard inputs/buttons.

Component Spacing: Use space-y-4 for vertical elements within a component (e.g., labels, inputs, descriptions).

3. Technology Stack
Framework: Next.js (latest stable, App Router)

UI / Styling: Tailwind CSS

Language: TypeScript

Icons / SVG: lucide-react (a clean, lightweight, and professional icon set).

State Management: React Hooks (useState, useContext).

3.1 Styling Philosophy (NEW)
To ensure "best clean code" as requested:

Utility-First: All styling must be implemented using Tailwind CSS utility classes directly in the JSX (e.g., <div className="p-4 bg-zinc-900 rounded-lg">...).

No Custom CSS: Avoid writing custom .css or .scss files for individual components. Global styles (app/globals.css) should only contain base Tailwind directives (@tailwind base;), font definitions, and base body styles.

No @apply: Do not use @apply in CSS files. The goal is a pure utility-first codebase.

No Inline style={...}: Avoid style={{...}} objects, except for dynamic values that cannot be handled by Tailwind (e.g., CSS variables, animation delays).

4. Application Structure
(This section remains the same as your original)

4.1 High-Level Pages / Sections
Landing / Home Page

Typography Library

SVG & Icons Library (Use lucide-react icons)

Colors & Gradients

UI / Code Snippets

Data Conversion Tools

Generators

Regex & Text Utilities

Docs-Style Knowledge Section

(Optional) User Features

5. Step-by-Step Feature List (Implementation Guide)
Step 1: Project Setup
Initialize Next.js App Router, install TypeScript, Tailwind.

Configure tailwind.config.ts with the color palette from 2.1 and fonts from 2.3.

Set body class in app/layout.tsx to bg-[#0d0d0d] text-white.

Step 2: Design System & Theme
Create base components in a components/ui folder (e.g., Button.tsx, Card.tsx, Input.tsx).

Card.tsx: Should be a basic component: (props) => <div className="bg-zinc-900 border border-zinc-800 rounded-lg {props.className}" />. Default padding (p-6) should be applied where it's used, not in the base component itself, for flexibility.

Button.tsx: Implement variants (primary, secondary, ghost) using Tailwind.

Step 3: Navigation & Layout (MODIFIED)
Implement the shell layout in app/layout.tsx.

Create components/Sidebar.tsx:

Use classes: hidden lg:block fixed top-0 left-0 h-screen w-64 bg-[#111] border-r border-zinc-800 p-6 space-y-6

Add DevUtilities logo/title at the top.

Add nav links (use Next/Link) for all sections (space-y-2 for link items).

Modify app/layout.tsx:

Add the <Sidebar />.

Create the main wrapper: <div className="lg:ml-64">...</div>.

Create components/Topbar.tsx:

Place this inside the lg:ml-64 wrapper.

Use classes: sticky top-0 z-10 h-16 flex items-center justify-between gap-4 bg-[#0d0d0d]/80 backdrop-blur-sm border-b border-zinc-800 px-6 lg:px-10

Add a Mobile Menu Button (lg:hidden) to toggle the sidebar.

Add a global search bar.

Page Content:

All page content (in app/page.tsx, app/typography/page.tsx, etc.) will render inside a <main> tag.

Apply default content padding: <main className="p-6 lg:p-10">

Step 4-10: Module Implementation
(Implement these steps as defined in your original prompt. Remember to use the styling rules from 3.1 and spacing rules from 2.4.)

Example for any tool page (e.g., app/generators/uuid/page.tsx):

JavaScript

export default function UuidPage() {
  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">UUID Generator</h1>
        <p className="text-zinc-400">Generate universally unique identifiers.</p>
      </div>

      {/* Tool Card */}
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-6 space-y-4">
        <h2 className="text-xl font-semibold">Your UUID</h2>
        <Input readOnly value={"..."} className="font-mono" />
        <div className="flex gap-4">
          <Button>Generate New</Button>
          <Button variant="secondary">Copy to Clipboard</Button>
        </div>
      </div>
    </div>
  );
}
Step 11: Documentation Layout
Create a layout for docs (e.g., app/docs/[[...slug]]/page.tsx).

This layout should include a Right-Side Table of Contents (e.g., fixed top-16 right-0 h-screen w-56 p-6).

Step 12: UX Details & Enhancements
Add sonner or react-hot-toast for "Copied!" feedback.

Ensure all interactive elements (Button, Input, links) have accessible focus states (e.g., focus-visible:ring-2 focus-visible:ring-blue-500 outline-none).

Step 13: Performance & SEO
Use next/font for Inter and JetBrains Mono.

Implement generateMetadata for all pages with descriptive titles.

6. Quality Expectations
The final web app must:

Feel polished and premium.

Have a cohesive design system and professional documentation layout.

Use high-quality fonts and clear typography hierarchy.

Deliver a smooth, responsive, and accessible user experience.

Be structured and written like a production-ready developer tool with clean, utility-first Tailwind code.