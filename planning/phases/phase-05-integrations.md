# Phase 05 — Integrations: comments, search, OG image, feeds

## Objective and value delivered

Reconectar, dentro dos novos layouts (Fase 4), as integrações consideradas obrigatórias pelo usuário (Giscus, Pagefind, dark mode já coberto na Fase 4) mais as que sustentam SEO (RSS, sitemap, OG image dinâmico, robots.txt).

## Scope

**Incluído:**
- Giscus (`Comments.tsx`) integrado no `PostSingle` novo, com o tema sincronizado ao dark mode (já implementado hoje — só religar).
- Pagefind: manter `src/pages/search.astro` com a UI do Pagefind (não adotar o `search.astro`/Fuse.js do tema alvo); confirmar que o passo de build (`pagefind --site dist && cp -r dist/pagefind public/`) continua no `package.json` novo.
- `src/pages/og.png.ts` e `src/pages/post/[...slug]/index.png.ts` (Satori) — portados sem mudança de lógica, apenas confirmando que a config de `fonts` (Fase 3) e `config.site.*` continuam resolvendo corretamente.
- `src/pages/rss.xml.ts` — portado sem mudança de lógica.
- `src/pages/robots.txt.ts` e config do `@astrojs/sitemap` em `astro.config` — portados, revisando o `filter` que hoje condiciona a página `/archives/` à feature `showArchives`.
- Confirmar `PUBLIC_GOOGLE_SITE_VERIFICATION` (env schema) preservado.

**Excluído:** qualquer integração nova não usada hoje (analytics/GTM do tema alvo — `astro-gtm-lite` é dependência do tema alvo mas não deve ser ativada, a menos que o usuário peça).

## Prerequisites and dependencies

- Hard dependency: [phase-04](./phase-04-visual-port-and-dark-mode.md) concluída (layouts finais existem para acoplar estas integrações).

## Files involved

| Path | Classification |
|---|---|
| `src/components/Comments.tsx` | Existing file — integrado sem mudança de lógica |
| `src/constants.ts` (config do Giscus: repo, categoria, etc.) | Existing file — preservado |
| `src/pages/search.astro` | Existing file — preservado, layout envolvente atualizado |
| `src/pages/og.png.ts`, `src/pages/post/[...slug]/index.png.ts` | Existing files — preservados |
| `src/pages/rss.xml.ts` | Existing file — preservado |
| `src/pages/robots.txt.ts` | Existing file — preservado |
| `astro.config` (bloco `sitemap()`) | Existing behavior — preservado |
| `package.json` (`scripts.build`) | Existing file — comando de build preservado (`astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/`) |
| `.github/workflows/astro.yaml` | Existing file — gatilho (`workflow_dispatch`) preservado nesta fase; só revisado se o comando de build mudar de nome/passos |

## Technical approach

1. Religar `Comments.tsx` no `PostSingle` novo (mesmo ponto de integração de hoje: renderizado dentro do layout de post, abaixo do conteúdo).
2. Confirmar que `search.astro` (Pagefind) funciona com a navegação/header novos — ajustar apenas classes CSS de wrapper se necessário, sem tocar na lógica de carregamento do Pagefind.
3. Rodar `npm run build` completo (incluindo o passo de `pagefind` e cópia) e verificar que `dist/pagefind/` e `public/pagefind/` são gerados como hoje.
4. Verificar geração de uma imagem OG (`/og.png`) e de uma imagem por post (`/post/<slug>/index.png`) no build local.
5. Verificar `/rss.xml` válido (well-formed XML, itens correspondem aos posts, ordenados por data) e `/robots.txt` apontando pro sitemap correto.

## Testing and validation

- Build completo local reproduzindo exatamente o comando do CI (`npm ci && npm run build`, se viável localmente, ou `npm run build` direto).
- Abrir `/rss.xml` gerado e validar estrutura (XML bem formado, `<link>` de cada item batendo com a URL real do post).
- Abrir `/search` e confirmar que uma busca retorna resultados esperados.
- Abrir um post e confirmar que a seção de comentários (Giscus) carrega o widget (mesmo sem sessão logada).
- Abrir `/og.png` e `/post/<slug-de-teste>/index.png` diretamente no navegador e confirmar que a imagem é gerada corretamente.

## Acceptance criteria

- [ ] Comentários Giscus renderizam no post, com tema sincronizado ao dark mode.
- [ ] Busca Pagefind funcional (não Fuse.js).
- [ ] `/rss.xml`, `/sitemap-index.xml`, `/robots.txt` gerados e válidos.
- [ ] OG image dinâmico gerado para `/og.png` e para pelo menos um post individual.
- [ ] `npm run build` reproduz o mesmo conjunto de passos usado hoje pelo CI.

## Risks and rollback

- Riscos R4 e R6 (ver [risks.md](../risks.md)).
- Rollback: cada integração é independente; qualquer uma pode ser revertida isoladamente sem afetar as demais, já que nenhuma foi reescrita — apenas religada.

## Completion checklist

- [ ] Giscus, Pagefind, OG image, RSS, sitemap, robots.txt validados.
- [ ] Comando de build confirmado idêntico (ou documentado o que mudou e por quê).

## Navigation

- Anterior: [phase-04-visual-port-and-dark-mode.md](./phase-04-visual-port-and-dark-mode.md)
- Próxima: [phase-06-validation-and-cutover.md](./phase-06-validation-and-cutover.md)
- Roadmap: [../roadmap.md](../roadmap.md)
