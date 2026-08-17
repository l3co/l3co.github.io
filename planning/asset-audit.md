# Asset & schema audit — Fase 1

Auditoria executada sobre os 90 arquivos em `src/content/post/*.md` e `src/content/pages/about.md` (Existing files), branch `theme/bookworm-migration`.

## Uso de campos do schema atual

| Campo (`src/content.config.ts`) | Posts que usam | Observação |
|---|---|---|
| `ogImage` | 0 | Nenhum post define uma imagem de capa estática; todos dependem da geração dinâmica via Satori (`og.png.ts` / `index.png.ts`). |
| `canonicalURL` | 0 | Não usado hoje. |
| `hideEditPost` | 0 | Não usado hoje. |
| `timezone` | 0 | Não usado hoje (o timezone global do site, `America/Sao_Paulo`, cobre todos os posts). |
| `modDatetime` | 0 | Não usado hoje. |
| `featured` | 0 | Não usado hoje. |
| `draft` | 0 | Nenhum post em rascunho no momento da auditoria. |
| `tags` | 90 (default `["outros"]` quando ausente) | 42 tags únicas no total. |

**Conclusão:** nenhuma mudança em `src/content.config.ts` é necessária para suportar o conteúdo existente. O schema atual já é a fonte de verdade suficiente (reforça [Decision 001](./decisions/decision-001-content-schema-strategy.md) — nenhum campo novo obrigatório precisa ser inventado).

## Imagens referenciadas no corpo dos posts

- 23 dos 90 posts têm imagens inline (`![...](...)`).
- 100% dessas imagens apontam para caminhos absolutos dentro de `public/images/posts/<slug>/...` (Existing directory) — nenhuma imagem é co-localizada com o markdown (`src/content/post/`), nenhuma usa caminho relativo, nenhuma é externa.
- 0 tags `<img>` HTML cruas encontradas — todas as imagens usam sintaxe markdown padrão.

**Conclusão:** não há necessidade de reescrever nenhum caminho de imagem ao trocar de layout/tema. O risco R8 (ver [risks.md](./risks.md)) é considerado **baixo** para este blog — os assets já são resolvidos via `public/`, que continua servido do mesmo jeito independentemente do tema.

## `about.md`

Front matter (`title`, `description`) compatível com o schema atual de `pages`; corpo em Markdown puro, sem imagens. Nenhuma ação necessária.

## Decisão desta fase

Nenhuma alteração em `src/content.config.ts` foi aplicada — o schema já cobre 100% do que os 90 posts e a página `about` usam. A Fase 4 (port visual) deve tratar os campos não utilizados (`ogImage`, `canonicalURL`, `hideEditPost`, `timezone`, `modDatetime`, `featured`) como opcionais/sem efeito visual obrigatório, e usar a imagem OG gerada dinamicamente como a única fonte de "capa" de post quando o layout do tema alvo pedir uma imagem de card.
