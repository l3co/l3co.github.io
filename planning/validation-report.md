# Validation report — Fase 6

Branch `theme/monograph-migration` (pivot do tema visual — ver [Decision 003](./decisions/decision-003-pivot-to-monograph.md)), executado sobre o estado final da branch.

## Paridade de URLs (FR2)

`npm run build` gerou 145 páginas — o mesmo total da build baseline (Fase 0). `diff` entre [planning/baseline-urls.txt](./baseline-urls.txt) e a lista de URLs da build atual: **sem divergências**.

## Features obrigatórias

| Feature | Resultado |
|---|---|
| Comentários (Giscus) — FR3 | ✅ Inalterado desde o PR #9 (não depende do tema visual); confirmado que `Comments.tsx` continua importado e montado no post. |
| Busca full-text (Pagefind) — FR4 | ✅ Validado via `astro preview`: busca por "liderança" retornou 13 resultados, com destaque de termo e cores do novo tema (accent azul-tinta). |
| Dark mode — FR5 | ✅ Validado em Home, post individual (incluindo bloco de código Shiki), Tags, Arquivo, Busca, Sobre, menu mobile — desktop e mobile, claro e escuro. |

## SEO / feeds

- `/og.png` e `/post/<slug>/index.png`: PNG 1200×630 gerados corretamente (Satori não foi alterado).
- `dist/pagefind/`: índice gerado (67 páginas, 4534 palavras) — igual ao build anterior.
- Google Analytics (`gtag.js`) — inalterado desde o commit anterior, não depende do tema visual.

## Qualidade de código

- `astro check`: 0 erros, 0 warnings, 0 hints.
- `npm run lint` (eslint): sem saída, sem erros.
- Corrigido durante a implementação: `@apply group` é inválido no Tailwind v4 (`group` é uma classe-marcador, não uma utility aplicável) — a classe `group` foi movida para o markup (`Card.astro`) em vez de dentro do `@utility link-title`.
- Corrigido durante a implementação: `Datetime.astro` tinha `text-muted-foreground` cravado nas classes base, conflitando em especificidade com `meta-accent` passado pelos componentes que queiram a data destacada — resolvido tornando a cor condicional (`className || "text-muted-foreground"`).

## Fonte Geist (self-hosted)

- `public/fonts/geist/Geist-Variable.woff2` + `LICENSE.txt` (SIL OFL 1.1) copiados do tema de referência.
- "Google Sans Code" permanece reservado para blocos de código e a geração de OG image (dependência do Satori/`astro:assets`), conforme já decidido nas Decisions 002/003.

## Responsividade

Testado em viewport mobile (375×812): header colapsa para um painel de menu full-width com itens grandes, toggle de tema e busca continuam acessíveis; feed de posts em coluna única.

## Pendências antes do merge

- [ ] Aprovação visual explícita do usuário.
- [ ] Decisão sobre reativar o gatilho automático do `.github/workflows/astro.yaml` (`push: [main]`) — mantido em `workflow_dispatch` manual.
- [ ] PR #9 (bookworm-light-astro) deve ser fechado, referenciando este novo PR.
