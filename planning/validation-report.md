# Validation report — Fase 6

Branch `theme/bookworm-migration`, executado sobre o estado final da branch (commits até `adfebff`).

## Paridade de URLs (FR2)

`npm run build` gerou 145 páginas — o mesmo total da build baseline (Fase 0). `diff` entre [planning/baseline-urls.txt](./baseline-urls.txt) e a lista de URLs da build atual: **sem divergências** (`IDENTICAL - no diff`).

## Features obrigatórias

| Feature | Resultado |
|---|---|
| Comentários (Giscus) — FR3 | ✅ Validado em `/post/design-patterns-para-agentes-de-ia-router/`: widget carrega, tema sincroniza com dark mode, contador de reações e "0 comentários" renderizam. |
| Busca full-text (Pagefind) — FR4 | ✅ Validado via `astro preview` (Pagefind só funciona pós-build): busca por "agentes" retornou 7 resultados com destaque de termo, no estilo visual do tema. |
| Dark mode — FR5 | ✅ Validado em Home, listagem de posts, página de post (incluindo bloco de código Shiki), Tags, Arquivo, Busca, Sobre — desktop e mobile. |

## SEO / feeds

- `/rss.xml`: XML bem formado, itens correspondem aos posts, `pubDate` correto.
- `/sitemap-index.xml` → `/sitemap-0.xml`: gerado normalmente pelo `@astrojs/sitemap`.
- `/robots.txt`: aponta para o sitemap correto.
- `/og.png`: PNG 1200×630 gerado dinamicamente.
- `/post/<slug>/index.png`: PNG 1200×630 gerado por post (reaproveitado como thumbnail dos cards na Fase 4).

## Qualidade de código

- `astro check`: 0 erros, 0 warnings, 0 hints.
- `npm run lint` (eslint): sem saída, sem erros.
- `npm run format:check`: 73 arquivos com divergência de formatação — **confirmado pré-existente** (mesmo conjunto de arquivos já divergia no `origin/main` antes de qualquer alteração desta migração, verificado via `git stash`). Não é uma regressão introduzida por este trabalho; fora de escopo corrigir aqui.

## Responsividade

Testado em viewport mobile (375×812): header colapsa para menu hambúrguer funcional, hero e grid de cards empilham em coluna única.

## Pendências antes do merge

- [ ] Aprovação visual explícita do usuário (ver captura de tela enviada na conversa).
- [ ] Decisão sobre reativar o gatilho automático do `.github/workflows/astro.yaml` (`push: [main]`) — mantido em `workflow_dispatch` manual por enquanto, conforme [roadmap.md](./roadmap.md#rollout-strategy).
