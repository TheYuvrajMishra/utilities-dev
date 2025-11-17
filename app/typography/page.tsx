'use client';

import React, { useState, useEffect } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Copy, Check, Eye, X } from 'lucide-react';
import { toast } from 'sonner';

const fonts = [
  // Sans-serif fonts
  {
    name: 'Inter',
    category: 'Sans-serif',
    description: 'A versatile typeface designed for computer screens',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Inter', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Inter',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Roboto',
    category: 'Sans-serif',
    description: 'A neo-grotesque sans-serif typeface family',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Roboto', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Roboto',
    weights: [100, 300, 400, 500, 700, 900],
  },
  {
    name: 'Poppins',
    category: 'Sans-serif',
    description: 'A geometric sans-serif with a unique style',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Poppins', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Poppins',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Montserrat',
    category: 'Sans-serif',
    description: 'Urban typographic style inspired by old Buenos Aires',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Montserrat', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Montserrat',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Open Sans',
    category: 'Sans-serif',
    description: 'Optimized for print, web, and mobile interfaces',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Open Sans', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Open+Sans',
    weights: [300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Lato',
    category: 'Sans-serif',
    description: 'A humanist sans-serif with warmth and stability',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Lato', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Lato',
    weights: [100, 300, 400, 700, 900],
  },
  {
    name: 'Raleway',
    category: 'Sans-serif',
    description: 'An elegant sans-serif family',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Raleway', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Raleway',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Work Sans',
    category: 'Sans-serif',
    description: 'Optimized for on-screen text',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Work Sans', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Work+Sans',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Nunito',
    category: 'Sans-serif',
    description: 'A rounded sans-serif with a friendly appearance',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Nunito', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Nunito',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'DM Sans',
    category: 'Sans-serif',
    description: 'A geometric sans-serif with a low contrast',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'DM Sans', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/DM+Sans',
    weights: [400, 500, 700],
  },
  {
    name: 'Plus Jakarta Sans',
    category: 'Sans-serif',
    description: 'A modern geometric sans-serif with excellent legibility',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Plus Jakarta Sans', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Plus+Jakarta+Sans',
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Space Grotesk',
    category: 'Sans-serif',
    description: 'A modern, proportional variant of Space Mono',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Space Grotesk', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Space+Grotesk',
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: 'Manrope',
    category: 'Sans-serif',
    description: 'An open-source modern sans-serif font family',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Manrope', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Manrope',
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Outfit',
    category: 'Sans-serif',
    description: 'A clean, geometric sans-serif with rounded terminals',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Outfit', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Outfit',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Sora',
    category: 'Sans-serif',
    description: 'A contemporary sans-serif with humanist influences',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Sora', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Sora',
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Archivo',
    category: 'Sans-serif',
    description: 'A grotesque sans-serif family for headlines and text',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Archivo', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Archivo',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Red Hat Display',
    category: 'Sans-serif',
    description: 'A modern sans-serif designed for optimal on-screen readability',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Red Hat Display', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Red+Hat+Display',
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Satoshi',
    category: 'Sans-serif',
    description: 'A contemporary geometric sans-serif with excellent versatility',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Satoshi', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Satoshi',
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Lexend',
    category: 'Sans-serif',
    description: 'Designed to reduce visual stress and improve reading efficiency',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Lexend', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Lexend',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  
  // Serif fonts
  {
    name: 'Playfair Display',
    category: 'Serif',
    description: 'A high contrast serif for headings',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Playfair Display', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Playfair+Display',
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Merriweather',
    category: 'Serif',
    description: 'Designed to be pleasant to read on screens',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Merriweather', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Merriweather',
    weights: [300, 400, 700, 900],
  },
  {
    name: 'Lora',
    category: 'Serif',
    description: 'A well-balanced contemporary serif',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Lora', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Lora',
    weights: [400, 500, 600, 700],
  },
  {
    name: 'Crimson Text',
    category: 'Serif',
    description: 'Inspired by old-style typefaces',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Crimson Text', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Crimson+Text',
    weights: [400, 600, 700],
  },
  {
    name: 'EB Garamond',
    category: 'Serif',
    description: 'A classic old-style typeface',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'EB Garamond', serif;",
    googleFonts: 'https://fonts.google.com/specimen/EB+Garamond',
    weights: [400, 500, 600, 700, 800],
  },
  {
    name: 'Source Serif Pro',
    category: 'Serif',
    description: 'Adobe\'s first open source typeface family',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Source Serif Pro', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Source+Serif+Pro',
    weights: [200, 300, 400, 600, 700, 900],
  },
  {
    name: 'Spectral',
    category: 'Serif',
    description: 'A serif typeface for long-form text on screens',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Spectral', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Spectral',
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Vollkorn',
    category: 'Serif',
    description: 'A classical antiqua with a modern, fresh character',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Vollkorn', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Vollkorn',
    weights: [400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Libre Baskerville',
    category: 'Serif',
    description: 'A web-optimized version of the classic Baskerville',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Libre Baskerville', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Libre+Baskerville',
    weights: [400, 700],
  },
  {
    name: 'Cormorant',
    category: 'Serif',
    description: 'A display font family inspired by classic French type',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Cormorant', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Cormorant',
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: 'Newsreader',
    category: 'Serif',
    description: 'A contemporary serif for digital publishing',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Newsreader', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Newsreader',
    weights: [200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Fraunces',
    category: 'Serif',
    description: 'A display typeface with an expansive range of styles',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Fraunces', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Fraunces',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Bitter',
    category: 'Serif',
    description: 'A contemporary slab serif typeface for text',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Bitter', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Bitter',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Literata',
    category: 'Serif',
    description: 'Designed specifically for digital reading',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Literata', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Literata',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Cardo',
    category: 'Serif',
    description: 'A large unicode font specifically designed for classicists',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Cardo', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Cardo',
    weights: [400, 700],
  },
  
  // Monospace fonts
  {
    name: 'JetBrains Mono',
    category: 'Monospace',
    description: 'A typeface for developers with increased height for better readability',
    preview: 'const code = "Hello World";',
    css: "font-family: 'JetBrains Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/JetBrains+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700, 800],
  },
  {
    name: 'Fira Code',
    category: 'Monospace',
    description: 'Monospaced font with programming ligatures',
    preview: 'const code => !== === >= <=',
    css: "font-family: 'Fira Code', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Fira+Code',
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: 'Source Code Pro',
    category: 'Monospace',
    description: 'Adobe\'s first open source code font',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Source Code Pro', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Source+Code+Pro',
    weights: [200, 300, 400, 500, 600, 700, 900],
  },
  {
    name: 'Roboto Mono',
    category: 'Monospace',
    description: 'A monospaced companion to Roboto',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Roboto Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Roboto+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700],
  },
  {
    name: 'IBM Plex Mono',
    category: 'Monospace',
    description: 'Part of the IBM Plex typeface family',
    preview: 'const code = "Hello World";',
    css: "font-family: 'IBM Plex Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/IBM+Plex+Mono',
    weights: [100, 200, 300, 400, 500, 600, 700],
  },
  {
    name: 'Inconsolata',
    category: 'Monospace',
    description: 'A monospace font designed for printed code listings',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Inconsolata', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Inconsolata',
    weights: [200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Space Mono',
    category: 'Monospace',
    description: 'A geometric monospace with distinctive letterforms',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Space Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Space+Mono',
    weights: [400, 700],
  },
  {
    name: 'Overpass Mono',
    category: 'Monospace',
    description: 'An open source monospace inspired by Highway Gothic',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Overpass Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Overpass+Mono',
    weights: [300, 400, 500, 600, 700],
  },
  {
    name: 'Courier Prime',
    category: 'Monospace',
    description: 'A monospaced font designed for screenplays',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Courier Prime', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Courier+Prime',
    weights: [400, 700],
  },
  {
    name: 'Anonymous Pro',
    category: 'Monospace',
    description: 'A family of fixed-width fonts designed for coders',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Anonymous Pro', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Anonymous+Pro',
    weights: [400, 700],
  },
  {
    name: 'Red Hat Mono',
    category: 'Monospace',
    description: 'A monospaced companion to Red Hat Display',
    preview: 'const code = "Hello World";',
    css: "font-family: 'Red Hat Mono', monospace;",
    googleFonts: 'https://fonts.google.com/specimen/Red+Hat+Mono',
    weights: [300, 400, 500, 600, 700],
  },
  
  // Display fonts
  {
    name: 'Bebas Neue',
    category: 'Display',
    description: 'A bold, all-caps display font',
    preview: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
    css: "font-family: 'Bebas Neue', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Bebas+Neue',
    weights: [400],
  },
  {
    name: 'Righteous',
    category: 'Display',
    description: 'A contemporary take on geometric display fonts',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Righteous', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Righteous',
    weights: [400],
  },
  {
    name: 'Archivo Black',
    category: 'Display',
    description: 'A black weight of the Archivo family',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Archivo Black', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Archivo+Black',
    weights: [400],
  },
  {
    name: 'Oswald',
    category: 'Display',
    description: 'A reworking of the classic gothic typeface style',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Oswald', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Oswald',
    weights: [200, 300, 400, 500, 600, 700],
  },
  {
    name: 'Anton',
    category: 'Display',
    description: 'A bold, attention-grabbing sans-serif display font',
    preview: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
    css: "font-family: 'Anton', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Anton',
    weights: [400],
  },
  {
    name: 'Bowlby One',
    category: 'Display',
    description: 'A bold display font with rounded terminals',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Bowlby One', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Bowlby+One',
    weights: [400],
  },
  {
    name: 'Rubik',
    category: 'Display',
    description: 'A sans-serif with slightly rounded corners',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Rubik', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Rubik',
    weights: [300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Staatliches',
    category: 'Display',
    description: 'A bold, uppercase display typeface',
    preview: 'THE QUICK BROWN FOX JUMPS OVER THE LAZY DOG',
    css: "font-family: 'Staatliches', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Staatliches',
    weights: [400],
  },
  {
    name: 'Lilita One',
    category: 'Display',
    description: 'A bold display font with a unique personality',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Lilita One', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Lilita+One',
    weights: [400],
  },
  {
    name: 'Barlow Condensed',
    category: 'Display',
    description: 'A condensed version of the Barlow superfamily',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Barlow Condensed', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Barlow+Condensed',
    weights: [100, 200, 300, 400, 500, 600, 700, 800, 900],
  },
  {
    name: 'Alfa Slab One',
    category: 'Display',
    description: 'A contemporary take on the 19th-century slab serif',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Alfa Slab One', serif;",
    googleFonts: 'https://fonts.google.com/specimen/Alfa+Slab+One',
    weights: [400],
  },
  {
    name: 'Fjalla One',
    category: 'Display',
    description: 'A medium contrast display sans-serif',
    preview: 'The Quick Brown Fox Jumps Over The Lazy Dog',
    css: "font-family: 'Fjalla One', sans-serif;",
    googleFonts: 'https://fonts.google.com/specimen/Fjalla+One',
    weights: [400],
  },
  
  // Handwriting fonts
  {
    name: 'Caveat',
    category: 'Handwriting',
    description: 'A handwriting font with a personal touch',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Caveat', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Caveat',
    weights: [400, 500, 600, 700],
  },
  {
    name: 'Dancing Script',
    category: 'Handwriting',
    description: 'A lively casual script',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Dancing Script', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Dancing+Script',
    weights: [400, 500, 600, 700],
  },
  {
    name: 'Pacifico',
    category: 'Handwriting',
    description: 'A fun script with a retro feel',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Pacifico', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Pacifico',
    weights: [400],
  },
  {
    name: 'Satisfy',
    category: 'Handwriting',
    description: 'A flowing, handwritten script font',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Satisfy', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Satisfy',
    weights: [400],
  },
  {
    name: 'Kalam',
    category: 'Handwriting',
    description: 'A handwriting font with an informal feel',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Kalam', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Kalam',
    weights: [300, 400, 700],
  },
  {
    name: 'Permanent Marker',
    category: 'Handwriting',
    description: 'A font that looks like a marker pen',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Permanent Marker', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Permanent+Marker',
    weights: [400],
  },
  {
    name: 'Shadows Into Light',
    category: 'Handwriting',
    description: 'A friendly handwritten font',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Shadows Into Light', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Shadows+Into+Light',
    weights: [400],
  },
  {
    name: 'Architects Daughter',
    category: 'Handwriting',
    description: 'A handwriting font based on the architect\'s lettering',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Architects Daughter', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Architects+Daughter',
    weights: [400],
  },
  {
    name: 'Indie Flower',
    category: 'Handwriting',
    description: 'A playful handwritten font',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Indie Flower', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Indie+Flower',
    weights: [400],
  },
  {
    name: 'Cookie',
    category: 'Handwriting',
    description: 'A brush script with elegant curves',
    preview: 'The quick brown fox jumps over the lazy dog',
    css: "font-family: 'Cookie', cursive;",
    googleFonts: 'https://fonts.google.com/specimen/Cookie',
    weights: [400],
  },
];

const fontPairings = [
  {
    title: 'Modern & Clean',
    heading: 'Inter',
    body: 'Roboto',
    use: 'Web Apps, Dashboards',
  },
  {
    title: 'Editorial',
    heading: 'Playfair Display',
    body: 'Merriweather',
    use: 'Blogs, Articles',
  },
  {
    title: 'Tech & Code',
    heading: 'Poppins',
    body: 'JetBrains Mono',
    use: 'Documentation, Dev Tools',
  },
  {
    title: 'Professional',
    heading: 'Montserrat',
    body: 'Inter',
    use: 'Corporate, Business',
  },
];

export default function TypographyPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [previewText, setPreviewText] = useState('The quick brown fox jumps over the lazy dog');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [selectedFont, setSelectedFont] = useState<typeof fonts[0] | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const [loadedFonts, setLoadedFonts] = useState<Set<string>>(new Set());
  const fontsPerPage = 12;

  const categories = ['All', ...Array.from(new Set(fonts.map((f) => f.category)))];

  const filteredFonts = fonts.filter((font) => {
    const matchesSearch =
      font.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      font.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || font.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredFonts.length / fontsPerPage);
  const startIndex = (currentPage - 1) * fontsPerPage;
  const endIndex = startIndex + fontsPerPage;
  const currentFonts = filteredFonts.slice(startIndex, endIndex);

  // Load Google Fonts dynamically for current page
  useEffect(() => {
    const fontsToLoad = currentFonts.filter((font) => !loadedFonts.has(font.name));
    
    if (fontsToLoad.length > 0) {
      const fontFamilies = fontsToLoad.map((font) => {
        const weights = font.weights.join(';');
        return `family=${font.name.replace(/ /g, '+')}:wght@${weights}`;
      }).join('&');

      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?${fontFamilies}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      setLoadedFonts((prev) => {
        const newSet = new Set(prev);
        fontsToLoad.forEach((font) => newSet.add(font.name));
        return newSet;
      });
    }
  }, [currentFonts, loadedFonts]);

  // Load selected font for modal
  useEffect(() => {
    if (selectedFont && !loadedFonts.has(selectedFont.name)) {
      const weights = selectedFont.weights.join(';');
      const link = document.createElement('link');
      link.href = `https://fonts.googleapis.com/css2?family=${selectedFont.name.replace(/ /g, '+')}:wght@${weights}&display=swap`;
      link.rel = 'stylesheet';
      document.head.appendChild(link);

      setLoadedFonts((prev) => new Set(prev).add(selectedFont.name));
    }
  }, [selectedFont, loadedFonts]);

  // Reset to page 1 when filters change
  const handleSearch = (value: string) => {
    setSearchQuery(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
  };

  const copyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    toast.success('Copied to clipboard!');
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <div className="space-y-2">
          <h1 className="text-3xl lg:text-4xl font-bold tracking-tight">Typography Library</h1>
          <p className="text-muted">
            Professional font collection with live previews and CSS snippets
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <Input
              placeholder="Search fonts..."
              value={searchQuery}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          <div className="flex-1">
            <Input
              placeholder="Custom preview text..."
              value={previewText}
              onChange={(e) => setPreviewText(e.target.value)}
            />
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => handleCategoryChange(category)}
              className="whitespace-nowrap"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Font Pairings */}
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold border-b border-border pb-2">
          Recommended Pairings
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {fontPairings.map((pairing) => (
            <Card key={pairing.title} className="p-6">
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-primary">{pairing.title}</h3>
                <div className="space-y-2">
                  <div className="text-sm">
                    <span className="text-muted">Heading: </span>
                    <span className="font-semibold">{pairing.heading}</span>
                  </div>
                  <div className="text-sm">
                    <span className="text-muted">Body: </span>
                    <span className="font-semibold">{pairing.body}</span>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-xs text-muted">Best for: {pairing.use}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Font Cards */}
      <section className="space-y-4">
        <div className="flex items-center justify-between border-b border-border pb-2">
          <h2 className="text-2xl font-semibold">
            All Fonts (67)
          </h2>
          {totalPages > 1 && (
            <p className="text-sm text-muted">
              Page {currentPage} of {totalPages}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          {currentFonts.map((font, index) => (
            <Card key={font.name} className="p-6">
              <div className="space-y-4">
                {/* Font Header */}
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1 flex-1">
                    <div className="flex items-center gap-3 flex-wrap">
                      <h3 className="text-xl font-semibold">{font.name}</h3>
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded-md">
                        {font.category}
                      </span>
                    </div>
                    <p className="text-sm text-muted">{font.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedFont(font)}
                      className="gap-2"
                    >
                      <Eye className="w-4 h-4" />
                      Preview
                    </Button>
                    <a
                      href={font.googleFonts}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button variant="outline" size="sm">
                        Google Fonts
                      </Button>
                    </a>
                  </div>
                </div>

                {/* Font Preview */}
                <div className="p-6 bg-zinc-900 rounded-lg border border-border">
                  <p
                    className="text-2xl"
                    style={{ fontFamily: font.name }}
                  >
                    {previewText || font.preview}
                  </p>
                </div>

                {/* CSS Code */}
                <div className="flex items-center gap-2">
                  <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
                    {font.css}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyToClipboard(font.css, index)}
                    className="gap-2"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredFonts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted">No fonts found matching your search.</p>
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-8">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
              disabled={currentPage === 1}
              className="gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Previous
            </Button>

            <div className="flex gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => {
                // Show first page, last page, current page, and pages around current
                const showPage =
                  page === 1 ||
                  page === totalPages ||
                  (page >= currentPage - 1 && page <= currentPage + 1);

                const showEllipsisBefore = page === currentPage - 2 && currentPage > 3;
                const showEllipsisAfter = page === currentPage + 2 && currentPage < totalPages - 2;

                if (showEllipsisBefore || showEllipsisAfter) {
                  return (
                    <span key={page} className="px-3 py-2 text-muted">
                      ...
                    </span>
                  );
                }

                if (!showPage) return null;

                return (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'primary' : 'outline'}
                    size="sm"
                    onClick={() => setCurrentPage(page)}
                    className="min-w-[40px]"
                  >
                    {page}
                  </Button>
                );
              })}
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              disabled={currentPage === totalPages}
              className="gap-2"
            >
              Next
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Button>
          </div>
        )}
      </section>

      {/* Font Preview Modal */}
      {selectedFont && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          onClick={() => setSelectedFont(null)}
        >
          <div
            className="bg-card border border-border rounded-xl max-w-5xl w-full max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-card border-b border-border p-6 flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">{selectedFont.name}</h2>
                <p className="text-sm text-muted">{selectedFont.category}</p>
              </div>
              <button
                onClick={() => setSelectedFont(null)}
                className="p-2 hover:bg-zinc-800 rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8" style={{ fontFamily: selectedFont.name }}>
              {/* Hero Section */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Hero Section
                </h3>
                <div className="relative bg-gradient-to-br from-zinc-900 via-zinc-900 to-zinc-800 p-12 rounded-xl overflow-hidden border border-zinc-800">
                  {/* Decorative elements */}
                  <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl"></div>
                  <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
                  
                  <div className="relative z-10 max-w-3xl space-y-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-sm text-primary">
                      <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                      New Features Available
                    </div>
                    <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                      Transform Your Digital Experience
                    </h1>
                    <p className="text-xl text-zinc-400 leading-relaxed max-w-2xl">
                      Discover innovative solutions designed to elevate your workflow. 
                      Join over 50,000 users already transforming their digital presence.
                    </p>
                    <div className="flex flex-wrap gap-4 pt-4">
                      <button className="px-8 py-4 bg-primary hover:bg-primary-hover text-white rounded-xl font-semibold shadow-lg shadow-primary/20 transition-all hover:scale-105">
                        Start Free Trial
                      </button>
                      <button className="px-8 py-4 bg-white/5 hover:bg-white/10 backdrop-blur-sm text-white rounded-xl font-semibold border border-white/10 transition-all">
                        Watch Demo
                      </button>
                    </div>
                    <div className="flex items-center gap-8 pt-6 text-sm">
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-zinc-400">No credit card required</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-zinc-400">14-day free trial</span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Typography Scale */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Typography Hierarchy
                </h3>
                <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 space-y-8">
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h1 className="text-5xl font-bold bg-gradient-to-r from-white to-zinc-400 bg-clip-text text-transparent">
                      Heading 1 - Display Large
                    </h1>
                    <p className="text-sm text-zinc-500">text-5xl · font-bold</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h2 className="text-4xl font-bold">Heading 2 - Page Title</h2>
                    <p className="text-sm text-zinc-500">text-4xl · font-bold</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h3 className="text-3xl font-semibold">Heading 3 - Section Title</h3>
                    <p className="text-sm text-zinc-500">text-3xl · font-semibold</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h4 className="text-2xl font-semibold">Heading 4 - Subsection</h4>
                    <p className="text-sm text-zinc-500">text-2xl · font-semibold</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h5 className="text-xl font-medium">Heading 5 - Card Title</h5>
                    <p className="text-sm text-zinc-500">text-xl · font-medium</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <h6 className="text-lg font-medium">Heading 6 - Small Title</h6>
                    <p className="text-sm text-zinc-500">text-lg · font-medium</p>
                  </div>
                  <div className="space-y-2 pb-6 border-b border-zinc-800">
                    <p className="text-base leading-relaxed">
                      Body text - Regular: The quick brown fox jumps over the lazy dog. 
                      This is the standard body text used for paragraphs and main content. 
                      It should be comfortable to read for extended periods.
                    </p>
                    <p className="text-sm text-zinc-500">text-base · leading-relaxed</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm text-zinc-400">
                      Small text - Secondary: Perfect for captions, metadata, and supplementary information.
                    </p>
                    <p className="text-sm text-zinc-500">text-sm · text-zinc-400</p>
                  </div>
                </div>
              </section>

              {/* Content Section */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Article Layout
                </h3>
                <div className="bg-zinc-900 p-10 rounded-xl border border-zinc-800">
                  <article className="max-w-3xl mx-auto space-y-6">
                    {/* Article Header */}
                    <div className="space-y-4 pb-6 border-b border-zinc-800">
                      <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-semibold rounded-full">
                          Design
                        </span>
                        <span className="text-sm text-zinc-500">•</span>
                        <span className="text-sm text-zinc-400">8 min read</span>
                      </div>
                      <h2 className="text-4xl font-bold leading-tight">
                        The Evolution of Modern Web Design: A Journey Through Time
                      </h2>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-full"></div>
                          <div>
                            <p className="font-medium">Sarah Johnson</p>
                            <p className="text-zinc-500">Design Lead</p>
                          </div>
                        </div>
                        <span className="text-zinc-600">•</span>
                        <p className="text-zinc-400">January 15, 2024</p>
                      </div>
                    </div>

                    {/* Article Content */}
                    <div className="space-y-6">
                      <p className="text-lg leading-relaxed text-zinc-300">
                        Web design has come a long way since the early days of the internet. What
                        started as simple HTML pages has evolved into sophisticated, interactive
                        experiences that adapt seamlessly to any device or screen size.
                      </p>
                      
                      <p className="leading-relaxed text-zinc-400">
                        Modern web design is a delicate balance of aesthetics and functionality.
                        Designers and developers collaborate closely to create websites that are not 
                        only visually stunning but also fast, accessible, and intuitive to use. 
                        Typography plays a crucial role in this ecosystem, establishing visual 
                        hierarchy and guiding users naturally through content.
                      </p>

                      <blockquote className="relative py-6 pl-6 border-l-4 border-primary bg-primary/5 rounded-r-lg">
                        <p className="text-xl italic text-zinc-300 leading-relaxed">
                          "Good typography makes the text more readable, but great typography makes
                          the reader want to read. It's the invisible art of communication."
                        </p>
                        <footer className="mt-3 text-sm text-zinc-500">
                          — Matthew Carter, Type Designer
                        </footer>
                      </blockquote>

                      <h3 className="text-2xl font-semibold pt-4">
                        The Impact of Typography
                      </h3>
                      
                      <p className="leading-relaxed text-zinc-400">
                        Typography is more than just choosing a pretty font. It's about creating a
                        reading experience that feels natural and effortless. The right typeface can
                        convey emotion, establish brand identity, and improve content comprehension
                        significantly.
                      </p>

                      <ul className="space-y-3 pl-6">
                        <li className="flex gap-3 text-zinc-400">
                          <span className="text-primary mt-1">→</span>
                          <span>Enhances readability and user engagement</span>
                        </li>
                        <li className="flex gap-3 text-zinc-400">
                          <span className="text-primary mt-1">→</span>
                          <span>Establishes clear visual hierarchy and structure</span>
                        </li>
                        <li className="flex gap-3 text-zinc-400">
                          <span className="text-primary mt-1">→</span>
                          <span>Reinforces brand identity and personality</span>
                        </li>
                        <li className="flex gap-3 text-zinc-400">
                          <span className="text-primary mt-1">→</span>
                          <span>Improves accessibility for all users</span>
                        </li>
                      </ul>
                    </div>
                  </article>
                </div>
              </section>

              {/* Card Grid */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Card Components
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Lightning Fast</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Optimized performance ensures your content loads instantly, 
                        providing the best user experience possible.
                      </p>
                      <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Secure by Default</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Enterprise-grade security built-in from day one, 
                        protecting your data with industry-leading practices.
                      </p>
                      <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  <div className="group relative bg-gradient-to-br from-zinc-900 to-zinc-900/50 p-8 rounded-xl border border-zinc-800 hover:border-primary/50 transition-all duration-300 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative space-y-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-semibold">Fully Customizable</h4>
                      <p className="text-sm text-zinc-400 leading-relaxed">
                        Tailor every aspect to match your brand identity 
                        with our flexible and intuitive customization options.
                      </p>
                      <button className="inline-flex items-center gap-2 text-primary font-medium text-sm group-hover:gap-3 transition-all">
                        Learn more
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Font Weights */}
              {selectedFont.weights && selectedFont.weights.length > 1 && (
                <section className="space-y-4">
                  <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                    Font Weight Variations
                  </h3>
                  <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800 space-y-4">
                    {selectedFont.weights.map((weight) => (
                      <div key={weight} className="flex items-center gap-4 py-3 border-b border-zinc-800 last:border-0">
                        <div className="w-24 text-sm text-zinc-500 font-mono">
                          {weight}
                        </div>
                        <p style={{ fontWeight: weight }} className="flex-1 text-lg">
                          The quick brown fox jumps over the lazy dog
                        </p>
                        <div className="text-xs text-zinc-600 font-mono">
                          {weight < 400 ? 'Light' : weight === 400 ? 'Regular' : weight < 600 ? 'Medium' : weight < 800 ? 'Bold' : 'Black'}
                        </div>
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* Pricing Section Example */}
              <section className="space-y-4">
                <h3 className="text-sm font-semibold text-muted uppercase tracking-wider">
                  Pricing Table
                </h3>
                <div className="grid gap-6 md:grid-cols-3">
                  <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-zinc-400">Starter</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-bold">$9</span>
                          <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500">Perfect for individuals</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Up to 5 projects
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Basic support
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          1GB storage
                        </li>
                      </ul>
                      <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors">
                        Get Started
                      </button>
                    </div>
                  </div>

                  <div className="relative bg-gradient-to-br from-primary/10 to-blue-500/5 p-8 rounded-xl border-2 border-primary">
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-white text-xs font-semibold rounded-full">
                      Most Popular
                    </div>
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-primary">Professional</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-bold">$29</span>
                          <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500">For growing teams</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Unlimited projects
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Priority support
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          50GB storage
                        </li>
                      </ul>
                      <button className="w-full py-3 bg-primary hover:bg-primary-hover text-white rounded-lg font-semibold shadow-lg shadow-primary/30 transition-all hover:scale-105">
                        Start Free Trial
                      </button>
                    </div>
                  </div>

                  <div className="bg-zinc-900 p-8 rounded-xl border border-zinc-800">
                    <div className="space-y-6">
                      <div className="space-y-2">
                        <h4 className="text-lg font-medium text-zinc-400">Enterprise</h4>
                        <div className="flex items-baseline gap-1">
                          <span className="text-5xl font-bold">$99</span>
                          <span className="text-zinc-400">/month</span>
                        </div>
                        <p className="text-sm text-zinc-500">For large organizations</p>
                      </div>
                      <ul className="space-y-3">
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Everything in Pro
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Dedicated support
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-400">
                          <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Unlimited storage
                        </li>
                      </ul>
                      <button className="w-full py-3 bg-zinc-800 hover:bg-zinc-700 rounded-lg font-medium transition-colors">
                        Contact Sales
                      </button>
                    </div>
                  </div>
                </div>
              </section>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-card border-t border-border p-6 flex items-center justify-between gap-4">
              <code className="flex-1 px-4 py-3 bg-zinc-900 rounded-lg text-sm font-mono">
                {selectedFont.css}
              </code>
              <Button
                onClick={() => {
                  copyToClipboard(selectedFont.css, -1);
                }}
                className="gap-2"
              >
                <Copy className="w-4 h-4" />
                Copy CSS
              </Button>
              <a
                href={selectedFont.googleFonts}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">Google Fonts</Button>
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
