# Branding & UI Documentation
**Cyboring Technologies - Corporate Web Project**

This document outlines the visual identity, design tokens, and UI components used in the corporate website. The system is built using **Tailwind CSS** with a comprehensive dark mode implementation.

## 1. Typography

| Role | Font Family | Variable | Weights | Usage |
| :--- | :--- | :--- | :--- | :--- |
| **Primary Sans** | **Inter** | `var(--font-inter)` | Variable | Body text, UI elements, general content. |
| **Logo / Headings** | **IBM Plex Sans** | `var(--font-plex)` | 400, 600, 700 | Brand logo, major section headers, emphasized text. |

---

## 2. Color System

The color system is based on an **Institutional Greyscale** foundation with a distinct **Blue-Grey Accent**. It supports both Light and Dark modes natively via CSS variables and HSL color values.

### Theme Philosophy
- **Light Mode:** High contrast, clean white backgrounds, dark grey text.
- **Dark Mode:** Deep "Soft Black" backgrounds (not pure black), stark white text, slightly lighter card backgrounds.

### Color Palette

| Token | Light Mode Value (HSL) | Hex Approx. | Dark Mode Value (HSL) | Hex Approx. | Usage |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **Background** | `0 0% 100%` | `#FFFFFF` | `0 0% 6%` | `#0F0F0F` | Main page background. |
| **Foreground** | `0 0% 6%` | `#0F0F0F` | `0 0% 100%` | `#FFFFFF` | Primary text color. |
| **Primary** | `204 32% 27%` | `#2F4A5C` | `204 32% 27%` | `#2F4A5C` | Brand accent, primary actions (Institutional Blue-Grey). |
| **Primary-Fg** | `0 0% 100%` | `#FFFFFF` | `0 0% 100%` | `#FFFFFF` | Text on primary elements. |
| **Secondary** | `0 0% 96%` | `#F4F4F4` | `0 0% 11%` | `#1C1C1C` | Secondary backgrounds, subtle contrasts. |
| **Card** | `0 0% 93%` | `#ECECEC` | `0 0% 9%` | `#171717` | Cards, panels (Dark mode cards are lighter than BG). |
| **Border** | `0 0% 84%` | `#D6D6D6` | `0 0% 16%` | `#292929` | Hairlines, dividers, inputs. |
| **Destructive** | `359 58% 39%` | `#9E2A2B` | `359 58% 39%` | `#9E2A2B` | Errors, delete actions. |

---

## 3. UI Elements & Tokens

### Border Radius
The system uses a variable radius `var(--radius)` defaulting to **0.5rem (8px)**.
- `rounded-lg`: 8px
- `rounded-md`: 6px
- `rounded-sm`: 4px

### Focus States
Accessible focus rings are implemented globally:
- **Style:** `outline: 2px solid #3b82f6` (Blue-500)
- **Offset:** `2px`

### Background Patterns
A custom grid pattern is used for visual texture.
- **Utility:** `.bg-grid-pattern`
- **Light Mode:** 5% opacity black grid.
- **Dark Mode:** 5% opacity white grid.
- **Size:** 40px x 40px.

---

## 4. Components

### Buttons (`CTAButton` & `CTAButton2`)

Two primary button components manage call-to-action hierarchies.

#### CTAButton (Primary/Marketing actions)
- **Base Style:** Rounded-lg, font-medium, transitions on all properties.
- **Interaction:** `hover:scale-95` (Subtle shrink effect).
- **Icon:** Optional `ArrowRight` that slides `translate-x` on hover.

| Variant | Visual Style |
| :--- | :--- |
| `primary` | Solid **Primary** background, white text. Shadow-lg -> Shadow-xl on hover. |
| `secondary` | Transparent background, **Border** outline. Hover fills with **Secondary** color. |

#### CTAButton2 (Secondary/Navigational actions)
- **Base Style:** Rounded-lg, font-medium.
- **Icon:** Always has `ChevronRight` that slides on hover.

| Variant | Visual Style |
| :--- | :--- |
| `outline` | Bordered. Hover changes border/text to **Primary** color. |
| `ghost` | No border/bg initially. Hover adds subtle accent background and primary text. |

### Button Sizes
- `sm`: px-4 py-2 text-sm
- `md`: px-6 py-3 text-base
- `lg`: px-8 py-4 text-lg

---

## 5. Technical Implementation

- **Framework:** Next.js (App Router)
- **Styling Engine:** Tailwind CSS
- **Theming:** `next-themes` (`ThemeProvider` in `layout.tsx`)
- **Icons:** `lucide-react`
