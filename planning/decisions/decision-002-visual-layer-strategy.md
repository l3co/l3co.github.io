# Decision 002: Camada visual — restilizar a infraestrutura Tailwind atual em vez de portar a do tema alvo

## Status

Proposed (aplicada durante a execução da Fase 4; registrada aqui para manter o plano fiel ao que foi feito, conforme o guardrail "quando uma premissa se mostra errada durante a implementação, atualize o plano — não o abandone silenciosamente").

## Context

Ao inspecionar o código já existente neste repositório (`src/styles/theme.css`, `src/styles/global.css`, `src/components/Header.astro`, `Footer.astro`) durante o início da Fase 4, ficou claro que o blog atual já tem uma infraestrutura de tema madura e funcional: tokens de cor via CSS variables (`--background`, `--accent`, etc.), dark mode via atributo `data-theme` + `@custom-variant dark`, Tailwind v4, tipografia, i18n de UI (`src/i18n`) já usado nos componentes.

O tema alvo (bookworm-light-astro), por outro lado, traz sua **própria** infraestrutura de Tailwind: plugins customizados (`tw-theme.mjs`, `tw-bs-grid.mjs` — um grid ao estilo Bootstrap), um sistema de config declarativa em JSON (`config.json`, `menu.json`, `social.json`, `theme.json`), e utilitários de texto (`marked`, `github-slugger`) para suprir um `markdownify`/`plainify` que o projeto atual não precisa (títulos e descrições já são texto plano).

## Decision

Não portar a infraestrutura de build do tema alvo (plugins Tailwind customizados, sistema de config JSON, `marked`/`github-slugger`/`react-icons`). Em vez disso, **restilizar os componentes e tokens já existentes** neste repositório para refletir a linguagem visual do bookworm-light-astro:

- Paleta: adotar o teal `#01AD9F` (cor primária do tema alvo) como `--accent`, com tons neutros claros/escuros equivalentes, mantendo os dois blocos `:root/[data-theme="light"]` e `[data-theme="dark"]` já existentes em `theme.css` (o tema alvo não define uma paleta dark — os valores dark são uma extensão nova, de responsabilidade desta implementação, sujeita a revisão visual do usuário).
- Tipografia: adotar a fonte Mulish (fonte do tema alvo) para o corpo do texto, via Google Fonts, mantendo "Google Sans Code" apenas onde já é estruturalmente necessário (blocos de código e geração de OG image via Satori, que dependem da API experimental de fonts do Astro — ver [phase-05](../phases/phase-05-integrations.md)).
- Componentes: `Header`, `Footer`, `Card` (listagem de posts), `PostLayout`, home — redesenhados visualmente (espaçamento, bordas, cards, hierarquia tipográfica) para parecer com o layout do tema alvo, mas mantendo a lógica/markup acessível já existente (i18n, `isActive`, skip-to-content, ARIA) em vez de reescrevê-la do zero.

## Consequences

- **Positivo**: elimina a necessidade de adicionar ~10 dependências novas (`marked`, `github-slugger`, `react-icons`, `fuse.js`, `astro-auto-import`, `astro-gtm-lite`, `@justinribeiro/lite-youtube`, `@tailwindcss/forms`, `wrangler`) e um sistema de config paralelo, reduzindo superfície de risco e tempo de implementação.
- **Positivo**: dark mode, i18n, acessibilidade (skip-link, ARIA, foco visível) e a paridade de rotas (Fase 2) continuam funcionando "de graça", porque a estrutura por trás não foi trocada — só a superfície visual.
- **Negativo**: o resultado é uma reinterpretação do design do bookworm-light-astro sobre a arquitetura atual, não uma cópia pixel-a-pixel do tema original. Ajustes finos de espaçamento/grid podem divergir do tema de referência; isso é esperado e fica sujeito à aprovação visual do usuário na Fase 6.
- **Atualiza [Decision 001](./decision-001-content-schema-strategy.md)**: a mesma lógica ("adaptar, não portar literalmente") agora se estende explicitamente também à camada de estilo/build, não só ao schema de conteúdo.

## Alternatives considered

1. **Portar a infraestrutura Tailwind completa do tema alvo** (plugins customizados, config JSON, grid Bootstrap-like) rodando em paralelo à infraestrutura atual. Rejeitada: duas arquiteturas de estilo convivendo no mesmo projeto é uma fonte de bugs e de confusão de manutenção futura, sem ganho visível para o usuário final.
2. **Migrar tudo (schema de conteúdo, i18n, componentes) para o formato do tema alvo, incluindo remover a infraestrutura atual.** Rejeitada por ser exatamente o cenário que a [Decision 001](./decision-001-content-schema-strategy.md) já descartou, agora estendido à camada visual — maior risco, sem benefício funcional adicional.
