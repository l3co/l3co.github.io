# Phase 02 — Routing and page parity

## Objective and value delivered

Recriar, sob a estrutura de páginas do tema alvo, todas as rotas públicas atuais com os mesmos paths — a peça central do requisito de SEO (FR2). Ao final desta fase, cada URL existente hoje resolve para uma página Astro nova (mesmo que ainda usando o layout provisório do tema alvo, refinado visualmente na Fase 4).

## Scope

**Incluído:**
- `/post/[...slug]` (lista de posts individuais) — a partir do padrão `src/pages/blog/[single].astro` do tema alvo, adaptado.
- `/post/[...page]` (paginação de listagem, se a home ou uma rota dedicada expõe isso hoje).
- `/tags` e `/tags/[tag]/[...page]`.
- `/archives`.
- `/about`.
- `/search`.
- `/404`.
- `/robots.txt`, `/rss.xml`, `/sitemap-index.xml` (via `@astrojs/sitemap`, config revisada — detalhado também na [phase-05](./phase-05-integrations.md)).
- `/og.png` e `/post/[...slug]/index.png` (rota de geração de imagem — ligação com [phase-05](./phase-05-integrations.md), aqui só garantir que o path continua existindo).

**Excluído:** `/blog/*`, `/categories/*`, `/authors/*`, `/contact` do tema alvo (fora de escopo, ver Q3 em [discovery.md](../discovery.md)).

## Prerequisites and dependencies

- Hard dependency: [phase-00](./phase-00-foundation-and-baseline.md) e [phase-01](./phase-01-content-schema-and-migration.md) concluídas.
- Soft dependency: pipeline de markdown ([phase-03](./phase-03-markdown-pipeline-parity.md)) pode ser feita em paralelo, já que não compartilha os mesmos arquivos de rota — mas o conteúdo só renderiza corretamente depois das duas.

## Files involved

| Path | Classification |
|---|---|
| `src/pages/post/[...slug]/index.astro` | Existing file — comportamento (paths) preservado; template interno adaptado ao layout novo na Fase 4 |
| `src/pages/post/[...page].astro` | Existing file — preservado |
| `src/pages/tags/index.astro`, `src/pages/tags/[tag]/[...page].astro` | Existing files — preservados |
| `src/pages/archives/index.astro`, `src/pages/archives/_utils/getPostsByGroupCondition.ts` | Existing files — preservados |
| `src/pages/about.astro` | Existing file — preservado |
| `src/pages/search.astro` | Existing file — preservado nesta fase (lógica Pagefind revisitada na Fase 5) |
| `src/pages/404.astro` | Existing file — preservado |
| `src/pages/robots.txt.ts`, `src/pages/rss.xml.ts` | Existing files — preservados nesta fase |
| `src/utils/getPostPaths.ts`, `getSortedPosts.ts`, `getUniqueTags.ts`, `postFilter.ts` | Existing files — reaproveitados sem alteração de assinatura |
| Rotas do tema alvo (`.../blog/[single].astro`, `.../categories/*`, `.../authors/*`, `.../contact.astro`) | Não copiadas para este repositório (fora de escopo) |

## Technical approach

1. Não recriar as rotas do zero: os arquivos de rota atuais (tabela acima) já implementam o path correto e consultam a coleção `post`/`pages` correta. Nesta fase eles são mantidos como estão estruturalmente; apenas o `import` do layout/dos componentes visuais que envolvem o conteúdo passa a apontar para os novos layouts adaptados na Fase 4 (mudança feita ali, não aqui).
2. O trabalho real desta fase é **negativo**: confirmar que nenhuma rota do tema alvo (`/blog`, `/categories`, `/authors`, `/contact`, `/page/[slug]`) foi copiada para dentro de `src/pages/` deste repositório, para não gerar URLs paralelas indesejadas.
3. Gerar a build (mesmo com layout provisório) e comparar a lista de rotas resultante contra `planning/baseline-urls.txt` (gerado na Fase 0). Qualquer rota ausente ou rota nova inesperada é um item bloqueante para o fim desta fase.

## Testing and validation

- `astro build` gera `dist/` e a lista de arquivos `index.html` resultante é comparada, path a path, com `planning/baseline-urls.txt`.
- Nenhuma rota extra (`/blog/*`, `/categories/*`, `/authors/*`, `/contact`) aparece em `dist/`.

## Acceptance criteria

- [ ] Toda URL em `planning/baseline-urls.txt` existe na nova build.
- [ ] Nenhuma URL nova fora do escopo aprovado existe na nova build.
- [ ] `src/pages/post/[...slug]/index.astro` e demais rotas listadas continuam usando os mesmos utilitários (`getPostPaths`, `getSortedPosts`, etc.) sem mudança de contrato.

## Risks and rollback

- Risco R1 (ver [risks.md](../risks.md)) é o foco central desta fase — mitigado pela comparação explícita de URLs.
- Rollback: esta fase não altera dado, apenas roteamento dentro da branch de trabalho; revertível via `git checkout` dos arquivos de rota.

## Completion checklist

- [ ] Diff de URLs (baseline vs nova build) sem divergências não aprovadas.
- [ ] Confirmado que rotas fora de escopo do tema alvo não foram introduzidas.

## Navigation

- Anterior: [phase-01-content-schema-and-migration.md](./phase-01-content-schema-and-migration.md)
- Próxima: [phase-03-markdown-pipeline-parity.md](./phase-03-markdown-pipeline-parity.md)
- Roadmap: [../roadmap.md](../roadmap.md)
