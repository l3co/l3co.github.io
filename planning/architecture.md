# Architecture summary — migração de tema

## Current architecture (observado)

- **Framework**: Astro 7, SSG puro (`astro build`), deploy em GitHub Pages via `.github/workflows/astro.yaml` (Existing file).
- **Conteúdo**: Content Collections (`glob` loader) — `post` (`src/content/post/*.md`) e `pages` (`src/content/pages/*.md`), schema em `src/content.config.ts` (Existing file).
- **Configuração**: `astro-paper.config.ts` (Existing file) → resolvido em `src/config.ts` (Existing file) → consumido pelos componentes.
- **Layouts/páginas**: `src/layouts/Layout.astro`, `src/layouts/PostLayout.astro`; rotas em `src/pages/{post,tags,archives,about,search,404,rss.xml,robots.txt,og.png}` (todos Existing files).
- **Componentes**: `Header`, `Footer`, `Card`, `Tag`, `Pagination`, `Breadcrumb`, `Datetime`, `Socials`, `LinkButton`, `ResponsiveTable`, `Comments.tsx` (React/Giscus) — todos em `src/components/` (Existing files).
- **Estilo**: Tailwind CSS 4 (`@tailwindcss/vite`), `src/styles/{global,theme,typography}.css` (Existing files). Dark mode via atributo `data-theme` no `<html>`, alternado por `src/scripts/theme.ts` (Existing file).
- **Markdown pipeline**: `remark-toc`, `remark-collapse`, `rehype-callouts`, transformers do Shiki (`transformerNotationDiff/Highlight/WordHighlight`, `transformerFileName`) configurados em `astro.config.ts` (Existing file).
- **Busca**: Pagefind — indexado em pós-build (`pagefind --site dist && cp -r dist/pagefind public/`), UI carregada em `src/pages/search.astro` (Existing file).
- **OG image**: geração dinâmica via Satori + Sharp, fonte "Google Sans Code" resolvida via API experimental de fonts do Astro (`src/pages/og.png.ts`, `src/pages/post/[...slug]/index.png.ts` — Existing files).
- **i18n**: `astro.config.ts` declara `i18n.locales: ["pt-BR"]` sem prefixo; `src/i18n/*` fornece strings de UI traduzidas (Existing files), mas há só um idioma em uso.

## Target theme architecture (observado no clone de referência)

- Astro 7 também, mas com **Content Layer** próprio (`posts`, `about`, `contact`, `authors`, `pages`), config declarativa em `src/config/{config,menu,social,theme}.json`, layout único `src/layouts/Base.astro` + partials em `src/layouts/partials/*` e componentes em `src/layouts/components/*`.
- Rotas: `/blog/[single]` (posts), `/tags/[tag]`, `/categories/[category]`, `/authors/[author]`, `/page/[slug]`, `/[regular]` (páginas soltas), `/search` (Fuse.js), `/about`, `/contact`.
- **Sem**: dark mode, RSS, geração dinâmica de OG image, pipeline de remark/rehype customizado.

## Proposed architecture for this migration

Adotar a estrutura de arquivos e o sistema visual do bookworm-light-astro como nova base (`src/layouts`, `src/styles`, `src/config/*.json`, dependências do `package.json` do tema alvo), mas:

1. **Conteúdo**: manter o schema atual de `post`/`pages` (ver [Decision 001](./decisions/decision-001-content-schema-strategy.md)) — não adotar as coleções `about/contact/authors` do tema alvo.
2. **Rotas**: recriar as rotas do tema alvo sob os paths atuais (`/post/[...slug]` em vez de `/blog/[single]`, etc.) para preservar SEO — ver [phase-02](./phases/phase-02-routing-and-page-parity.md).
3. **Markdown pipeline**: portar a config de `remark`/`rehype`/Shiki do `astro.config.ts` atual para dentro do `astro.config.mjs` herdado do tema alvo — ver [phase-03](./phases/phase-03-markdown-pipeline-parity.md).
4. **Dark mode**: portar `src/scripts/theme.ts` e estender `src/tailwind-plugin/tw-theme.mjs`/`theme.json` do tema alvo (que hoje só define uma paleta) com uma variante dark — ver [phase-04](./phases/phase-04-visual-port-and-dark-mode.md).
5. **Integrações** (Giscus, Pagefind, OG image dinâmico, RSS, sitemap, robots.txt): portar os arquivos/rotas atuais quase inalterados, só trocando o layout que os envolve — ver [phase-05](./phases/phase-05-integrations.md).

Esta é a arquitetura mais simples que atende ao requisito de "substituição completa" sem reescrever os 90 arquivos de conteúdo nem recriar do zero as integrações que já funcionam hoje. Alternativa mais complexa (reescrever front matter + adotar schema do tema alvo integralmente) foi avaliada e descartada em [Decision 001](./decisions/decision-001-content-schema-strategy.md).

## Data flow (inalterado no nível conceitual)

`Content Collections (glob loader)` → `getCollection("post"/"pages")` → utilitários existentes (`getSortedPosts`, `getPostPaths`, `getUniqueTags`, `postFilter` — Existing files, reaproveitados sem alteração de assinatura) → páginas Astro → layouts do tema alvo adaptados.

## Out of scope (arquitetura)

- SSR/adapters de servidor — o site continua 100% estático.
- CMS Sitepins (`.sitepins/`, `sitepins-manifest.json`) do tema alvo — não há necessidade de um CMS Git-based headless aqui; esses arquivos não são portados.
- Deploy em Cloudflare Workers (`wrangler.jsonc`) — o deploy continua em GitHub Pages.
