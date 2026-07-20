# Ant design v4 starter

[Demo](https://antd-v4-starter.pages.dev/)

- Ant Design V4
- React 18
- Vite
- Typescript
- Tanstack Router

## Notes

After the build it says "Some chunks are larger than 500 kB after minification.". Not an issue, only tells might slow down the initial load.  
Mobile display of the table is not optimized. Table is best presented on larger screens.

v1
header on top
sidebar opens below the header
sidebar as drawer on mobile

v2
- **Desktop:** no header. Sidebar takes the full height of the viewport.
  - Top of sidebar has a logo area: `[logo] [collapse trigger]`.
  - Settings is a regular sidebar menu item (icon: gear).
  - Breadcrumbs live in the content area (same as v1).
  - When collapsed: all menu items → icons only. The logo area collapses to just the trigger icon.
- **Mobile:** has a header (same as v1 — logo, trigger, settings dropdown). Sidebar opens as a drawer overlay. 
