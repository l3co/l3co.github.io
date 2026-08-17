# Phase 04 — Visual port and dark mode

## Objective and value delivered

Esta é a fase de maior volume de trabalho visual: adaptar os layouts/componentes do bookworm-light-astro (`Base.astro`, `Header.astro`, `Footer.astro`, `PostSingle.astro`, cards de listagem, paginação) para consumir o schema de conteúdo atual (campos definidos em [Decision 001](../decisions/decision-001-content-schema-strategy.md)) e para suportar dark mode — que o tema alvo não tem nativamente (R3 em [risks.md](../risks.md)).

## Scope

**Incluído:**
- Portar/adaptar (não copiar literalmente) os layouts do tema alvo: substituir `src/layouts/Layout.astro` e `src/layouts/PostLayout.astro` atuais pela estrutura do tema alvo (`Base.astro` + partials), ligados aos campos reais do schema (`pubDatetime` em vez de `date`, `author` em vez de `authors[]`, `ogImage` em vez de `image`, etc.).
- Portar `Header`, `Footer`, `Card` (listagem de posts), `Pagination`, `Tag`, `Breadcrumb`, `Datetime`, `Socials`, `LinkButton`, `ResponsiveTable` — reimplementados visualmente no estilo do tema alvo, mantendo a mesma interface de props onde fizer sentido reaproveitar quem os consome.
- Portar `src/scripts/theme.ts` (toggle dark/light) e o botão `#theme-btn` para dentro do `Header` novo.
- Estender `src/tailwind-plugin/tw-theme.mjs` e `src/config/theme.json` do tema alvo (hoje só definem uma paleta "default") com uma variante `dark`, ou substituir por variáveis CSS equivalentes ao `src/styles/theme.css` atual, garantindo que `data-theme="dark"`/classe `.dark` no `<html>` alterna as cores em: header, footer, corpo do post (incluindo callouts e blocos de código — ver [phase-03](./phase-03-markdown-pipeline-parity.md)), cards de listagem, página de busca.
- Portar a meta tag `theme-color` dinâmica (sincronizada com o fundo computado) já implementada em `theme.ts`.

**Excluído:** qualquer novo recurso visual não presente nem no site atual nem pedido pelo usuário (ex.: página de autores, categorias).

## Prerequisites and dependencies

- Hard dependency: [phase-01](./phase-01-content-schema-and-migration.md) (schema/campos confirmados) e [phase-02](./phase-02-routing-and-page-parity.md) (rotas prontas para receber o layout novo).
- Hard dependency: [phase-03](./phase-03-markdown-pipeline-parity.md) concluída, para que o CSS de callouts/código possa ser ajustado ao estilo final aqui.

## Files involved

| Path | Classification |
|---|---|
| `src/layouts/Layout.astro`, `src/layouts/PostLayout.astro` | Existing files — substituídos pela estrutura adaptada do tema alvo |
| `src/components/*.astro`, `src/components/Comments.tsx` | Existing files — `Comments.tsx` só integrado nesta fase ao novo `PostSingle`; lógica interna revisitada na [phase-05](./phase-05-integrations.md) |
| `src/scripts/theme.ts` | Existing file — portado sem mudança de lógica, só de ponto de integração no Header novo |
| `src/styles/theme.css`, `src/styles/global.css`, `src/styles/typography.css` | Existing files — mesclados/substituídos pelos estilos do tema alvo (`base.css`, `components.css`, `navigation.css`, `buttons.css`, `utilities.css`, `safe.css`) |
| `src/config/theme.json`, `src/tailwind-plugin/tw-theme.mjs` | New files no repositório (vêm do tema alvo) — estendidos com variante dark |
| `src/config/menu.json` | New file — itens de navegação (Home, Sobre, Arquivo, Tags, Busca) configurados conforme a navegação atual |

## Technical approach

1. Mapear cada componente do `Header`/`Footer` atual para o equivalente no tema alvo, item por item (logo, links de navegação, botão de tema, ícones sociais).
2. Adaptar `PostSingle.astro` (do tema alvo, como referência) para ler os campos reais (`post.data.pubDatetime`, `post.data.author`, `post.data.tags`, etc.) em vez de `date`/`authors[]`.
3. Implementar a variante dark: preferir estender `theme.json`/`tw-theme.mjs` com uma segunda paleta de cores (mantendo o padrão de design tokens do tema alvo) sobre reintroduzir as variáveis CSS antigas cruas — mas se a extensão do plugin Tailwind do tema alvo se mostrar excessivamente complexa, cair para a abordagem de variáveis CSS + seletor `[data-theme="dark"]` já validada no site atual.
4. Rodar build + revisão visual manual (screenshots) em: home, um post com imagem, um post com callout/código, página de tags, página de arquivo, página de busca, página sobre — em light e dark.

## Testing and validation

- Build local sem erros.
- Revisão visual manual (o agente que executar deve capturar screenshots via ferramenta de browser/preview) de cada página listada acima, em light e dark mode.
- Verificar que o toggle de tema persiste após reload (localStorage) e após navegação (View Transitions), replicando o comportamento de `theme.ts`.

## Acceptance criteria

- [ ] Todas as páginas listadas renderizam com o layout do tema alvo, sem erro de campo indefinido (`undefined`) no template.
- [ ] Dark mode funcional em todas as páginas listadas, incluindo callouts e blocos de código.
- [ ] Navegação (`menu.json`) reflete os itens reais do site (sem links para páginas fora de escopo como `/blog`, `/categories`, `/authors`, `/contact`).

## Risks and rollback

- Risco R3 (ver [risks.md](../risks.md)) — maior risco de esforço subestimado desta fase inteira. Se o retrabalho de dark mode se mostrar desproporcional, a mitigação de contingência é usar diretamente as variáveis CSS do `theme.css` atual sobre os novos componentes, em vez de reimplementar via `tw-theme.mjs`.
- Rollback: os componentes/layouts atuais continuam intactos em `main`; nesta branch, reverter para os arquivos de layout anteriores é suficiente.

## Completion checklist

- [ ] Layouts e componentes portados e revisados visualmente pelo usuário.
- [ ] Dark mode validado em todas as páginas do escopo.
- [ ] `menu.json`/navegação confirmados.

## Navigation

- Anterior: [phase-03-markdown-pipeline-parity.md](./phase-03-markdown-pipeline-parity.md)
- Próxima: [phase-05-integrations.md](./phase-05-integrations.md)
- Roadmap: [../roadmap.md](../roadmap.md)
