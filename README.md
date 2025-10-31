# fair-components

A React 19 component library powered by Linaria and the Motion animation toolkit. The project is
maintained as a single npm package with full TypeScript support, tree-shakeable builds via `tsup`
and a Storybook playground built on Vite.

## Getting started

```bash
npm install
```

## Available scripts

- `npm run build` – bundles the component library into ESM and CJS outputs with generated typings.
- `npm run storybook` – starts Storybook on [http://localhost:6006](http://localhost:6006).
- `npm run build-storybook` – creates a static Storybook build.
- `npm run lint` – runs ESLint over the source and story files.
- `npm run typecheck` – validates TypeScript types without emitting files.
- `npm run format` – checks formatting with Prettier.

## Styling and theming

Styles are authored with [Linaria](https://linaria.dev/), enabling zero-runtime CSS extraction. The
`ColorSchemeProvider` wraps Linaria's `ThemeProvider` and exposes both React context and generated
CSS variables, making it easy to access tokens from components and plain CSS alike.

## Animation

Interactive components can use the [`motion`](https://motion.dev/) package for smooth entrance and
interaction animations. The default `Card` component demonstrates scroll-based reveal animations.
