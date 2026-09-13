---
name: Premium Domestic Care System
colors:
  surface: '#f8faf7'
  surface-dim: '#d8dad8'
  surface-bright: '#f8faf7'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f1'
  surface-container: '#eceeec'
  surface-container-high: '#e7e9e6'
  surface-container-highest: '#e1e3e0'
  on-surface: '#191c1b'
  on-surface-variant: '#404945'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#707975'
  outline-variant: '#bfc9c4'
  surface-tint: '#2c685a'
  primary: '#00372d'
  on-primary: '#ffffff'
  primary-container: '#0b4f42'
  on-primary-container: '#83bfaf'
  inverse-primary: '#96d3c1'
  secondary: '#ae2f34'
  on-secondary: '#ffffff'
  secondary-container: '#ff6b6b'
  on-secondary-container: '#6d0010'
  tertiary: '#0c3800'
  on-tertiary: '#ffffff'
  tertiary-container: '#155100'
  on-tertiary-container: '#82c467'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#b1efdd'
  primary-fixed-dim: '#96d3c1'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#0d5043'
  secondary-fixed: '#ffdad8'
  secondary-fixed-dim: '#ffb3b0'
  on-secondary-fixed: '#410006'
  on-secondary-fixed-variant: '#8c151f'
  tertiary-fixed: '#b0f592'
  tertiary-fixed-dim: '#95d878'
  on-tertiary-fixed: '#052100'
  on-tertiary-fixed-variant: '#155200'
  background: '#f8faf7'
  on-background: '#191c1b'
  surface-variant: '#e1e3e0'
typography:
  display:
    fontFamily: ebGaramond
    fontSize: 48px
    fontWeight: '500'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: ebGaramond
    fontSize: 32px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: ebGaramond
    fontSize: 28px
    fontWeight: '500'
    lineHeight: '1.2'
  headline-md:
    fontFamily: ebGaramond
    fontSize: 24px
    fontWeight: '500'
    lineHeight: '1.3'
  body-lg:
    fontFamily: geist
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: geist
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-md:
    fontFamily: geist
    fontSize: 14px
    fontWeight: '500'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  caption:
    fontFamily: geist
    fontSize: 12px
    fontWeight: '400'
    lineHeight: '1.4'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 8px
  xs: 4px
  sm: 12px
  md: 24px
  lg: 48px
  xl: 80px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style

This design system is engineered to facilitate trust and high-end reliability within the domestic service sector. The visual identity bridges the gap between high-touch empathy and medical-grade precision, targeting a discerning audience that prioritizes safety, hygiene, and domestic order.

The aesthetic blends **Classical Minimalism** with **Glassmorphism**. By pairing a romantic humanist serif with a technical sans-serif, the system evokes the authority of a long-standing institution while maintaining the efficiency of modern technology. Visuals are characterized by generous white space, soft-focus layering, and crisp 1px borders that suggest the surgical cleanliness of a professional agency.

## Colors

The palette is rooted in Deep Pine Emerald (#0B4F42), a color that anchors the design in security and professional authority. This is complemented by Warm Ruby Wine (#9E232A), used sparingly for high-value interactions and elements requiring an emotional, compassionate touch.

Fresh Sage Olive (#3E7B28) and its associated tint (#EBF4E7) serve as the foundation for "order and hygiene" signaling. The background is a deliberate Warm Off-White (#FAFAF7), avoiding the clinical harshness of pure white to create a more inviting, domestic atmosphere. Text is rendered in Deep Forest Charcoal (#14201D) to maintain soft contrast while ensuring peak readability.

## Typography

Typography is used as a structural tool to balance tradition and modernity. **ebGaramond** is reserved for headlines and display text, utilizing its graceful serifs to convey heritage and intellectual premium. It should be typeset with slightly tighter tracking for large displays to maintain a cohesive, editorial feel.

**Geist** is the workhorse for body and interface elements. Its monospaced-leaning characteristics provide a technical, "data-verified" aesthetic that balances the romanticism of the serif. Labels should be set in Geist with uppercase styling and increased letter spacing to act as precise wayfinders within the interface.

## Layout & Spacing

The layout follows a **Fixed-Fluid Hybrid** model. Content containers are capped at 1280px on desktop to ensure line lengths remain readable for the Geist body text, while background elements and glass containers may stretch to the viewport edge. 

A 12-column grid is used for desktop (64px margins), transitioning to a 4-column grid for mobile (16px margins). Spacing is aggressive and intentional; use the `lg` (48px) and `xl` (80px) units to separate major sections, reinforcing a sense of calm and luxury by avoiding information density.

## Elevation & Depth

Depth in this design system is achieved through **Tonal Layering and Glassmorphism** rather than heavy shadows. 

1.  **Base Surface:** #FAFAF7 (Solid).
2.  **Glass Layer:** Semi-transparent white (80% opacity) with a 12px backdrop blur and a 1px border in #D5E8D0. This is used for navigation bars, floating cards, and modals.
3.  **Interactive Depth:** Elements like buttons or active cards utilize a soft, tinted ambient shadow (Primary color at 8% opacity, 20px blur) to suggest a subtle lift without breaking the flat, clean aesthetic.

Avoid stacking more than two layers of glass to maintain clarity and performance.

## Shapes

The shape language uses a **Medium Rounded** approach (0.5rem base) to strike a balance between friendly domesticity and structured professionalism. 

- **Standard Elements (Buttons, Inputs):** 0.5rem (8px).
- **Large Containers (Cards, Modals):** 1rem (16px).
- **Featured Sections:** 1.5rem (24px) to create a soft, high-end framing effect.

Icons should feature rounded terminals and a consistent 1.5px or 2px stroke weight to match the precision of the Geist typeface.

## Components

### Buttons
- **Primary:** Deep Pine Emerald (#0B4F42) background, white Geist text, 8px radius. High-impact actions only.
- **Secondary:** Transparent background with 1px border in #0B4F42. Use for navigation and secondary actions.
- **Compassionate (Tertiary):** Warm Ruby Wine (#9E232A) background, used exclusively for "Book Now" or urgent support requests.

### Inputs & Form Fields
Fields utilize the Sage Green border (#D5E8D0) and a subtle #EBF4E7 background on focus. Labels sit outside the field in Geist Medium, Uppercase, 12px.

### Cards
Cards are the primary vessel for information. They must use the Glassmorphism style: 80% white background, 12px blur, 1px Sage Green border. Ensure 24px internal padding (Spacing-md) to prevent content from feeling cramped.

### Professional Credentials / Chips
Used for displaying worker certifications or background check status. Use the Fresh Sage Olive (#3E7B28) for the text and icon, with the #EBF4E7 tint as a solid background. This reinforces "verified" status.

### Domestic Detail Lists
For service checklists, use a custom Pine Emerald checkmark. Each list item should be separated by a 1px #D5E8D0 divider with 16px of vertical padding.