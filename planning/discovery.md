# Discovery — Migração de tema: AstroPaper → bookworm-light-astro

## Problem statement

O blog (`l3co-github-io`, deployado no GitHub Pages) usa hoje uma base derivada do tema **AstroPaper** (minimalista, single-author, i18n pt-BR). O usuário quer trocar para o visual/estrutura do tema **bookworm-light-astro** (Themefisher), mantendo o conteúdo, as URLs e um conjunto de features consideradas essenciais.

## Objective

Substituir a implementação atual do tema pela estrutura do bookworm-light-astro, preservando:

1. As ~90 posts em `src/content/post/*.md` (conteúdo em português, front matter, tags).
2. As URLs públicas atuais (`/post/<slug>`, `/tags`, `/tags/<tag>`, `/archives`, `/about`, `/search`, `/rss.xml`, `/sitemap-index.xml`) — requisito de SEO.
3. Comentários via Giscus, busca full-text via Pagefind, e o toggle de dark mode.

## Users and actors involved

- Único mantenedor/autor do blog (o usuário), que também é quem revisa e aprova o merge.
- Leitores do blog (pt-BR), incluindo os que chegam via busca orgânica (Google) — sensíveis a mudança de URL/SEO.
- GitHub Actions (`astro.yaml`) — pipeline de build/deploy para GitHub Pages.

## Expected behaviors

- Todas as rotas existentes continuam respondendo com o mesmo conteúdo, agora com o layout visual do bookworm-light-astro.
- `npm run build` continua gerando `dist/` publicável no GitHub Pages, incluindo o passo de indexação do Pagefind.
- Dark mode, busca e comentários funcionam de ponta a ponta no novo layout.

## Known constraints

- Astro 7 (`astro@^7.0.3`) já em uso; bookworm-light-astro depende de `astro@7.0.3` — compatível.
- Deploy estático em GitHub Pages (sem SSR, sem adapters de servidor); o `wrangler.jsonc`/Cloudflare Workers do tema alvo não se aplica.
- Repositório é `git` com branch atual `content/design-patterns-agentes-router` (branch de conteúdo — **não deve** ser usada para este trabalho).
- Build atual roda: `astro check && astro build && pagefind --site dist && cp -r dist/pagefind public/`.

## Functional requirements (confirmados com o usuário)

- FR1: Substituição completa da base do tema (não é um reskin CSS por cima do código atual).
- FR2: URLs de posts, tags, arquivo, sobre, busca, RSS e sitemap devem permanecer idênticas.
- FR3: Comentários Giscus devem continuar funcionando nos posts.
- FR4: Busca full-text via Pagefind deve ser preservada (o tema alvo usa Fuse.js por padrão — **não adotar**).
- FR5: Toggle de dark/light mode deve continuar existindo e funcionando.

## Non-functional requirements

- NFR1: Sem regressão de SEO (URLs, meta tags, sitemap, RSS, OG image por post).
- NFR2: Build deve continuar rodando no workflow atual do GitHub Actions sem mudanças estruturais além do necessário.
- NFR3: Conteúdo em português deve ser preservado sem perda/corrupção de acentuação, front matter ou imagens.

## Integrations

- Giscus (GitHub Discussions) — componente React `src/components/Comments.tsx` (Existing file).
- Pagefind — CLI pós-build + `@pagefind/default-ui` no `src/pages/search.astro` (Existing file).
- Satori + Sharp — geração dinâmica de OG image (`src/pages/og.png.ts`, `src/pages/post/[...slug]/index.png.ts`, ambos Existing files).
- `@astrojs/sitemap`, `@astrojs/rss` — já presentes nas duas bases (atual e alvo, com pequenas diferenças de versão).

## Dependencies

- **Hard**: Node >= 22.12 (engine atual) — bookworm-light-astro não declara `engines`, mas usa Astro 7, compatível.
- **Hard**: `@astrojs/react` — necessário para manter `Comments.tsx` (React); já é dependência de ambos os temas.
- **External**: repositório `themefisher/bookworm-light-astro` no GitHub, usado só como referência de estrutura/estilo (clonado localmente em modo leitura para inspeção, não será adicionado como submódulo/dependência).

## Risks and hypotheses (resumo — detalhado em [risks.md](./risks.md))

- Front matter dos ~90 posts é incompatível com o schema de conteúdo do tema alvo (`title/date/image/authors[]/categories[]/tags[]` vs atual `title/pubDatetime/description/tags[]/ogImage/canonicalURL/hideEditPost/timezone/modDatetime`).
- O tema alvo não tem: dark mode, RSS, geração dinâmica de OG image, pipeline de markdown (remark-toc, remark-collapse, rehype-callouts, transformers do Shiki para diff/highlight/filename) usada nos posts técnicos.
- Perda de SEO se as rotas não forem mapeadas 1:1 para o padrão atual (`/post/<slug>` em vez de `/blog/<slug>` do tema alvo).

## Open questions

| # | Questão | Impacto | Classificação |
|---|---|---|---|
| Q1 | Manter os arquivos de post com os nomes de campo atuais (`pubDatetime`, `ogImage`, etc.) estendendo o schema do tema alvo, ou reescrever o front matter dos 90 posts para o vocabulário do tema alvo (`date`, `image`, `authors`)? | Define o escopo da Fase de migração de conteúdo | Blocking para a Fase 1 — resolvido nesta rodada de planejamento como **Decisão 001** (ver [decisions/decision-001-content-schema-strategy.md](./decisions/decision-001-content-schema-strategy.md)); usuário pode revisar antes da execução. |
| Q2 | Manter suporte formal a i18n (`src/i18n/*`, config `i18n.locales` no `astro.config.ts`) ou remover, já que hoje só existe pt-BR sem prefixo de rota? | Baixo — não afeta URLs (prefixo já é desabilitado) | Non-blocking; assumido: **remover** a camada de i18n formal e manter os textos de UI hardcoded em pt-BR, já que o tema alvo não tem i18n e não há segunda língua em produção. |
| Q3 | O tema alvo tem páginas de `authors`/`categories`/`contact` que o blog atual não usa. Mantê-las? | Baixo — feature extra não pedida | Non-blocking; assumido: **não portar** (fora de escopo), pois o blog é single-author e não usa categorias hoje (só tags). |
| Q4 | Workflow do GitHub Actions está em `workflow_dispatch` manual com um comentário indicando que o `push: [main]` volta no merge da migração anterior (`astro-migration`). Este mesmo padrão deve ser seguido aqui (branch de trabalho não dispara deploy automático)? | Médio — evita publicar versão incompleta em produção | Non-blocking; assumido: **sim**, seguir o mesmo padrão já estabelecido no repositório. |

## Decisions required

- Ver [decisions/decision-001-content-schema-strategy.md](./decisions/decision-001-content-schema-strategy.md).

## Initial definition of success

- `npm run build` passa sem erros na branch nova.
- Todas as URLs listadas em `dist/sitemap-0.xml` da build **atual** existem e respondem 200 na build **nova**, com o mesmo conteúdo textual.
- Dark mode, busca (Pagefind) e comentários (Giscus) funcionam manualmente verificados em pelo menos 3 posts distintos (um com callouts, um com code block/diff, um só texto).
- RSS (`/rss.xml`) válido e com os mesmos itens/ordem da versão atual.
- Revisão visual do usuário aprovando o novo layout antes do merge em `main`.
