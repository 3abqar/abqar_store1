# UI/UX Guidelines and Standards

## Overview

This document establishes the comprehensive UI/UX guidelines and standards for the Abqar Store Sales Management System. These guidelines ensure consistency, accessibility, and optimal user experience across all interfaces and interactions.

## Design Philosophy

### Core Principles

1. **User-Centric Design**: Every interface decision prioritizes user needs and workflow efficiency
2. **Accessibility First**: WCAG 2.1 AA compliance ensures usability for all users
3. **Progressive Enhancement**: Core functionality works without JavaScript, enhanced with interactive features
4. **Mobile-First Responsive**: Designed for mobile devices, enhanced for larger screens
5. **Performance Conscious**: Optimized for fast loading and smooth interactions

### Design Values

- **Clarity**: Clear information hierarchy and intuitive navigation
- **Efficiency**: Streamlined workflows that minimize user effort
- **Consistency**: Uniform patterns and behaviors across the application
- **Reliability**: Predictable interactions and error handling
- **Inclusivity**: Accessible to users with diverse abilities and contexts

## Visual Design System

### Color Palette

#### Primary Colors
```css
/* Primary Blue Palette */
--primary-50: #f0f9ff;
--primary-100: #e0f2fe;
--primary-200: #bae6fd;
--primary-300: #7dd3fc;
--primary-400: #38bdf8;
--primary-500: #0ea5e9;  /* Main brand color */
--primary-600: #0284c7;
--primary-700: #0369a1;
--primary-800: #075985;
--primary-900: #0c4a6e;
--primary-950: #082f49;
```

#### Secondary Colors
```css
/* Accent Green Palette */
--accent-50: #f0fdf4;
--accent-100: #dcfce7;
--accent-200: #bbf7d0;
--accent-300: #86efac;
--accent-400: #4ade80;
--accent-500: #22c55e;  /* Success/positive actions */
--accent-600: #16a34a;
--accent-700: #15803d;
--accent-800: #166534;
--accent-900: #14532d;
```

#### Semantic Colors
```css
/* Success */
--success-500: #22c55e;
--success-600: #16a34a;

/* Warning */
--warning-500: #f59e0b;
--warning-600: #d97706;

/* Error */
--error-500: #ef4444;
--error-600: #dc2626;

/* Neutral/Gray */
--neutral-50: #fafafa;
--neutral-100: #f5f5f5;
--neutral-500: #737373;
--neutral-800: #262626;
--neutral-900: #171717;
```

#### Dark Mode Colors
```css
/* Dark theme overrides */
--dark-bg-primary: #0f172a;    /* slate-900 */
--dark-bg-secondary: #1e293b;  /* slate-800 */
--dark-bg-tertiary: #334155;   /* slate-700 */
--dark-text-primary: #f8fafc;  /* slate-50 */
--dark-text-secondary: #cbd5e1; /* slate-300 */
```

### Typography

#### Font Families
```css
/* Arabic Text */
font-family: 'Cairo', sans-serif;
/* Weights: 400 (Regular), 600 (SemiBold), 700 (Bold) */

/* English Text */
font-family: 'Montserrat', sans-serif;
/* Weights: 400 (Regular), 500 (Medium), 600 (SemiBold), 700 (Bold) */
```

#### Typography Scale
```css
/* Headings */
.text-3xl { font-size: 1.875rem; line-height: 2.25rem; } /* 30px */
.text-2xl { font-size: 1.5rem; line-height: 2rem; }     /* 24px */
.text-xl  { font-size: 1.25rem; line-height: 1.75rem; } /* 20px */
.text-lg  { font-size: 1.125rem; line-height: 1.75rem; } /* 18px */

/* Body Text */
.text-base { font-size: 1rem; line-height: 1.5rem; }    /* 16px */
.text-sm   { font-size: 0.875rem; line-height: 1.25rem; } /* 14px */
.text-xs   { font-size: 0.75rem; line-height: 1rem; }   /* 12px */
```

#### Typography Guidelines
- **Headings**: Use Cairo Bold (700) for Arabic, Montserrat SemiBold (600) for English
- **Body Text**: Use Cairo Regular (400) for Arabic, Montserrat Regular (400) for English
- **UI Labels**: Use Cairo SemiBold (600) for Arabic, Montserrat Medium (500) for English
- **Line Height**: Maintain 1.5x line height for body text, 1.2x for headings
- **Letter Spacing**: Default spacing for Arabic, slight tracking for English headings

### Spacing System

#### Spacing Scale (Tailwind-based)
```css
/* Base unit: 0.25rem (4px) */
.space-1  { margin/padding: 0.25rem; }  /* 4px */
.space-2  { margin/padding: 0.5rem; }   /* 8px */
.space-3  { margin/padding: 0.75rem; }  /* 12px */
.space-4  { margin/padding: 1rem; }     /* 16px */
.space-6  { margin/padding: 1.5rem; }   /* 24px */
.space-8  { margin/padding: 2rem; }     /* 32px */
.space-12 { margin/padding: 3rem; }     /* 48px */
.space-16 { margin/padding: 4rem; }     /* 64px */
```

#### Layout Guidelines
- **Component Padding**: Use space-4 (16px) for card interiors, space-6 (24px) for main sections
- **Element Margins**: Use space-2 (8px) between related elements, space-4 (16px) between sections
- **Grid Gaps**: Use space-6 (24px) for card grids, space-4 (16px) for form elements

### Shadows and Elevation

#### Shadow System
```css
/* Soft shadows for cards and containers */
.shadow-soft {
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07), 
              0 10px 20px -2px rgba(0, 0, 0, 0.04);
}

/* Medium shadows for interactive elements */
.shadow-medium {
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1), 
              0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Strong shadows for modals and overlays */
.shadow-strong {
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.15), 
              0 2px 10px -2px rgba(0, 0, 0, 0.04);
}

/* Glow effects for focus and hover states */
.shadow-glow {
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15), 
              0 0 40px rgba(59, 130, 246, 0.08);
}
```

### Border Radius

#### Radius Scale
```css
.rounded-md  { border-radius: 0.375rem; } /* 6px - Form inputs */
.rounded-lg  { border-radius: 0.5rem; }   /* 8px - Cards */
.rounded-xl  { border-radius: 0.75rem; }  /* 12px - Buttons */
.rounded-2xl { border-radius: 1rem; }     /* 16px - Main containers */
.rounded-3xl { border-radius: 1.5rem; }   /* 24px - Special elements */
```

## Component Standards

### Buttons

#### Primary Button
```css
.btn-primary {
  background: linear-gradient(to right, #0284c7, #0369a1, #075985);
  color: white;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 600;
  transition: all 0.3s ease;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
}

.btn-primary:hover {
  background: linear-gradient(to right, #0369a1, #075985, #0c4a6e);
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

.btn-primary:active {
  transform: scale(0.95);
}
```

#### Secondary Button
```css
.btn-secondary {
  background: linear-gradient(to right, #f8fafc, #f1f5f9);
  color: #334155;
  border: 1px solid #cbd5e1;
  padding: 0.75rem 2rem;
  border-radius: 0.75rem;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn-secondary:hover {
  background: linear-gradient(to right, #f1f5f9, #e2e8f0);
  transform: scale(1.05);
}
```

#### Button States
- **Default**: Base styling with subtle shadow
- **Hover**: Scale transform (1.05x) with enhanced shadow/glow
- **Active**: Scale transform (0.95x) for press feedback
- **Disabled**: 50% opacity, no hover effects, cursor not-allowed
- **Loading**: Spinner icon with disabled state

### Form Elements

#### Input Fields
```css
.form-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.75rem;
  background: linear-gradient(to right, #ffffff, #f9fafb);
  transition: all 0.3s ease;
  font-size: 1rem;
}

.form-input:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
  background: #ffffff;
}

.form-input:invalid {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.1);
}
```

#### Select Dropdowns
```css
.form-select {
  /* Inherits from form-input */
  background-image: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3E%3C/svg%3E");
  background-position: right 0.5rem center;
  background-repeat: no-repeat;
  background-size: 1.5em 1.5em;
  padding-right: 2.5rem;
}
```

### Cards and Containers

#### Stat Cards
```css
.stat-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
  border: 1px solid rgba(148, 163, 184, 0.1);
  border-radius: 1rem;
  padding: 1.5rem;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
  transition: all 0.4s ease;
}

.stat-card:hover {
  transform: scale(1.02);
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1);
}

/* Dark mode variant */
.dark .stat-card {
  background: linear-gradient(135deg, #1e293b 0%, #334155 100%);
  border-color: rgba(148, 163, 184, 0.2);
}
```

#### KPI Icons
```css
.kpi-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 0.75rem;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(59, 130, 246, 0.2), rgba(59, 130, 246, 0.3));
  border: 1px solid rgba(59, 130, 246, 0.3);
  color: #3b82f6;
  margin-right: 1rem;
}
```

### Tables

#### Data Tables
```css
.data-table {
  width: 100%;
  border-collapse: separate;
  border-spacing: 0;
  background: #ffffff;
  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 2px 15px -3px rgba(0, 0, 0, 0.07);
}

.data-table th {
  background: #f9fafb;
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-weight: 500;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #6b7280;
  border-bottom: 1px solid #e5e7eb;
}

.data-table td {
  padding: 1rem 1.5rem;
  border-bottom: 1px solid #f3f4f6;
  vertical-align: middle;
}

.data-table tr:hover {
  background: #f9fafb;
}
```

## Interaction Patterns

### Hover Effects

#### Standard Hover Pattern
```css
.interactive-element {
  transition: all 0.3s ease;
}

.interactive-element:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 25px -5px rgba(0, 0, 0, 0.1);
}
```

#### Button Hover Pattern
```css
.btn:hover {
  transform: scale(1.05);
  box-shadow: 0 0 20px rgba(59, 130, 246, 0.15);
}

.btn:active {
  transform: scale(0.95);
}
```

### Loading States

#### Spinner Animation
```css
.spinner {
  animation: spin 1s linear infinite;
}

@keyframes spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```

#### Skeleton Loading
```css
.skeleton {
  background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
  background-size: 200% 100%;
  animation: loading 1.5s infinite;
}

@keyframes loading {
  0% { background-position: 200% 0; }
  100% { background-position: -200% 0; }
}
```

### Transitions and Animations

#### Standard Transitions
```css
/* Default transition for most elements */
.transition-default {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Smooth transition for transforms */
.transition-smooth {
  transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Bounce effect for interactive elements */
.transition-bounce {
  transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
}
```

#### Fade Animations
```css
.fade-in {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in-up {
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}
```

## Responsive Design Guidelines

### Breakpoint System
```css
/* Mobile First Approach */
/* Base styles: 320px - 767px (Mobile) */

/* Tablet: 768px - 1023px */
@media (min-width: 768px) {
  /* Tablet-specific styles */
}

/* Desktop: 1024px - 1279px */
@media (min-width: 1024px) {
  /* Desktop-specific styles */
}

/* Large Desktop: 1280px+ */
@media (min-width: 1280px) {
  /* Large desktop-specific styles */
}
```

### Layout Patterns

#### Mobile Layout
- Single column layout
- Stacked navigation (hamburger menu)
- Full-width cards and forms
- Touch-friendly button sizes (minimum 44px)
- Simplified data tables (card-based on mobile)

#### Tablet Layout
- Two-column layout where appropriate
- Condensed navigation
- Larger touch targets
- Side-by-side forms and content

#### Desktop Layout
- Multi-column layouts
- Horizontal navigation
- Hover states and interactions
- Dense information display
- Sidebar navigation panels

## Accessibility Standards

### WCAG 2.1 AA Compliance

#### Color Contrast
- **Normal Text**: Minimum 4.5:1 contrast ratio
- **Large Text**: Minimum 3:1 contrast ratio
- **UI Components**: Minimum 3:1 contrast ratio for borders and states

#### Keyboard Navigation
```css
/* Focus indicators */
.focus-visible {
  outline: 2px solid #0ea5e9;
  outline-offset: 2px;
  border-radius: 0.25rem;
}

/* Skip links */
.skip-link {
  position: absolute;
  top: -40px;
  left: 6px;
  background: #000;
  color: #fff;
  padding: 8px;
  text-decoration: none;
  border-radius: 4px;
  z-index: 1000;
}

.skip-link:focus {
  top: 6px;
}
```

#### Screen Reader Support
```html
<!-- Semantic HTML structure -->
<main role="main" aria-label="Main content">
  <section aria-labelledby="dashboard-heading">
    <h1 id="dashboard-heading">Dashboard</h1>
    <!-- Content -->
  </section>
</main>

<!-- ARIA labels for interactive elements -->
<button aria-label="Close modal" aria-describedby="modal-description">
  <span aria-hidden="true">&times;</span>
</button>

<!-- Form labels and descriptions -->
<label for="client-name">Client Name</label>
<input id="client-name" type="text" aria-describedby="client-name-help">
<div id="client-name-help">Enter the full name of the client</div>
```

#### Alternative Text
- All images must have descriptive alt text
- Decorative images should have empty alt attributes
- Icons should have aria-labels when used without text

### Internationalization (i18n)

#### RTL Support
```css
/* RTL layout adjustments */
[dir="rtl"] .text-left { text-align: right; }
[dir="rtl"] .text-right { text-align: left; }
[dir="rtl"] .ml-4 { margin-left: 0; margin-right: 1rem; }
[dir="rtl"] .mr-4 { margin-right: 0; margin-left: 1rem; }

/* RTL-specific font loading */
[dir="rtl"] {
  font-family: 'Cairo', sans-serif;
}

[dir="ltr"] {
  font-family: 'Montserrat', sans-serif;
}
```

#### Language Toggle
- Smooth transition between Arabic and English
- Proper font switching
- Layout direction changes
- Number formatting (Arabic vs. Western numerals)

## Dark Mode Implementation

### Color Scheme Toggle
```css
/* CSS Custom Properties for theme switching */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f8fafc;
  --text-primary: #1f2937;
  --text-secondary: #6b7280;
}

.dark {
  --bg-primary: #0f172a;
  --bg-secondary: #1e293b;
  --text-primary: #f8fafc;
  --text-secondary: #cbd5e1;
}

/* Component usage */
.card {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}
```

### Dark Mode Considerations
- Maintain contrast ratios in dark theme
- Adjust shadow opacity for dark backgrounds
- Use appropriate colors for status indicators
- Ensure form elements remain visible and usable

## Performance Guidelines

### CSS Optimization
- Use CSS custom properties for theme values
- Minimize CSS bundle size with Tailwind CSS purging
- Leverage browser caching for font files
- Use efficient selectors and avoid deep nesting

### Animation Performance
- Use `transform` and `opacity` for animations
- Prefer CSS animations over JavaScript
- Use `will-change` property sparingly
- Implement `prefers-reduced-motion` support

```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Quality Assurance

### Design Review Checklist
- [ ] Consistent spacing and alignment
- [ ] Proper color contrast ratios
- [ ] Responsive behavior across breakpoints
- [ ] Keyboard navigation functionality
- [ ] Screen reader compatibility
- [ ] Loading states and error handling
- [ ] Dark mode appearance
- [ ] RTL layout support
- [ ] Touch target sizes (minimum 44px)
- [ ] Performance impact assessment

### Testing Requirements
- Cross-browser compatibility (Chrome, Firefox, Safari, Edge)
- Device testing (iOS, Android, Desktop)
- Accessibility testing with screen readers
- Performance testing on slower devices
- Usability testing with real users

This comprehensive UI/UX guidelines document ensures consistent, accessible, and high-quality user interfaces across the entire Abqar Store Sales Management System.