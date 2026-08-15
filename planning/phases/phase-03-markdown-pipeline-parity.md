# Phase 03 — Markdown pipeline parity

## Objective and value delivered

Garantir que o conteúdo técnico dos posts (callouts, tabela de conteúdo, blocos de código com diff/highlight/nome de arquivo) renderiza corretamente sob a config de build herdada do tema alvo — que hoje não tem esse pipeline. Sem esta fase, posts técnicos (ex.: os de "Design Patterns para Agentes de IA") perderiam formatação ao trocar de tema.

## Scope

**Incluído:**
- Portar para o `astro.config` resultante (base do tema alvo) a config de `markdown` hoje em `astro.config.ts`: `remarkPlugins: [remarkToc, [remarkCollapse, {...}]]`, `rehypePlugins: [rehypeCallouts]`, `shikiConfig` (temas `min-light`/`night-owl`, `transformerFileName`, `transformerNotationHighlight`, `transformerNotationWordHighlight`, `transformerNotationDiff`).
- Portar `src/utils/transformers/fileName.ts` (transformer customizado usado pelo Shiki).
- Confirmar que `rehype-callouts`, `remark-toc`, `remark-collapse`, `@shikijs/transformers` são instalados como dependência (já estão no `package.json` atual; precisam sobreviver ao merge de dependências da Fase 0).

**Excluído:** ajuste visual do CSS de callouts/código (isso é Fase 4 — aqui o objetivo é a renderização HTML estar correta, mesmo que o CSS do tema alvo ainda não estilize esses blocos de forma polida).

## Prerequisites and dependencies

- Hard dependency: [phase-00](./phase-00-foundation-and-baseline.md) concluída (dependências instaladas).
- Soft dependency: pode rodar em paralelo à [phase-02](./phase-02-routing-and-page-parity.md).

## Files involved

| Path | Classification |
|---|---|
| `astro.config.ts` (ou `.mjs`, dependendo de qual arquivo prevalecer após a Fase 0) | Existing file — bloco `markdown` migrado |
| `src/utils/transformers/fileName.ts` | Existing file — preservado sem alteração |
| `src/remark-collapse.d.ts` | Existing file — preservado (declaração de tipos para `remark-collapse`) |
| `package.json` | Existing file — confirmar presença de `remark-toc`, `remark-collapse`, `rehype-callouts`, `@shikijs/transformers` |

## Technical approach

1. Identificar qual arquivo de config prevalece após a Fase 0 (o tema alvo usa `astro.config.mjs`; o repositório atual usa `astro.config.ts` — decidir consolidar em um único arquivo, mantendo a extensão `.ts` já que o Astro 7 aceita TypeScript em config e o restante do projeto usa `.ts`).
2. Copiar o bloco `markdown: { processor: unified({...}), shikiConfig: {...} }` do `astro.config.ts` atual para dentro da config consolidada, preservando os plugins e a ordem.
3. Confirmar `experimental.svgOptimizer` e o bloco `fonts` (fonte "Google Sans Code") — avaliar se são mantidos (usados hoje pela geração de OG image, ver [phase-05](./phase-05-integrations.md)) ou se o tema alvo já resolve fontes de outra forma (ele usa Google Fonts via link tag, não a API experimental de fonts do Astro). Decisão: manter o bloco `fonts` do config atual, pois `og.png.ts`/`index.png.ts` dependem dele.
4. Build de um post com callout, um com bloco de código usando notação de diff/highlight, e um com TOC — inspecionar o HTML gerado.

## Testing and validation

- Build local; abrir no navegador (ou inspecionar o HTML gerado em `dist/`) pelo menos:
  - Um post com `> [!NOTE]`/callout (verificar quais posts usam — buscar por `[!` nos arquivos de `src/content/post/`).
  - Um post com bloco de código anotado (buscar por ` ```ts {1}` ou similar, ou comentários `// [!code highlight]`/`// [!code diff]`).
  - Um post cujo corpo comece com um índice gerado por `remark-toc` (heading "Table of contents").
- Confirmar visualmente (mesmo sem CSS final) que os elementos existem no HTML: `<div class="callout">`, `<pre>` com classes do Shiki, âncoras do TOC.

## Acceptance criteria

- [ ] Config de markdown consolidada em um único arquivo de config do Astro.
- [ ] HTML gerado para os 3 posts de teste contém os elementos esperados (callout, highlight/diff, TOC).
- [ ] Nenhuma dependência de markdown foi removida do `package.json`.

## Risks and rollback

- Risco R2 (ver [risks.md](../risks.md)) é o foco desta fase.
- Rollback: reverter o arquivo de config para a versão anterior; sem impacto em conteúdo.

## Completion checklist

- [ ] Bloco `markdown` portado e validado.
- [ ] Bloco `fonts` e `experimental.svgOptimizer` mantidos (decisão registrada nesta fase).

## Navigation

- Anterior: [phase-02-routing-and-page-parity.md](./phase-02-routing-and-page-parity.md)
- Próxima: [phase-04-visual-port-and-dark-mode.md](./phase-04-visual-port-and-dark-mode.md)
- Roadmap: [../roadmap.md](../roadmap.md)
