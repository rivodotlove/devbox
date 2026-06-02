# Configuration Guide

Comprehensive guide to customizing Tailwind CSS configuration.

## Theme Customization

### Colors

- Extending the default color palette
- Custom color shades
- Color opacity via slash syntax (e.g., `bg-blue-500/50`, `text-gray-900/80`)

### Spacing

- Custom spacing values
- Negative spacing

### Typography

- Custom fonts
- Font sizes
- Line heights
- Letter spacing

### Breakpoints

- Custom responsive breakpoints
- Container sizes

### Border Radius

- Custom radius values

## Content Configuration

- Automatic content detection (no `content` array needed)
- Adding extra sources with `@source` when scanning misses files
- Safe listing classes with `@source inline(...)`

## Plugins

### Official Plugins

- @tailwindcss/forms
- @tailwindcss/typography
- @tailwindcss/aspect-ratio
- @tailwindcss/container-queries

### Custom Plugins

- Creating custom utilities
- Adding custom variants
- Extending base styles

## Dark Mode

- Class-based dark mode
- Media query dark mode
- Custom dark mode variants

## Production Optimization

- Automatic content detection (built-in, replaces PurgeCSS)
- Minification
- File size optimization

See main SKILL.md for configuration examples.
