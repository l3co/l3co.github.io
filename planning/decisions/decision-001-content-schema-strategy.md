# Decision 001: Estratégia de schema de conteúdo na migração

## Status

Proposed

## Context

O blog atual define, em `src/content.config.ts` (Existing file), duas coleções:

- `post`: `author, pubDatetime, modDatetime, title, featured, draft, tags[], ogImage, description, canonicalURL, hideEditPost, timezone`.
- `pages`: `title, description, ogImage, canonicalURL`.

O tema alvo (bookworm-light-astro), em `src/content.config.ts` do repositório clonado (referência, não faz parte deste repo), define coleções diferentes:

- `posts`: `title, meta_title, description, date, image, categories[], authors[], tags[], draft`.
- `pages`, `about`, `contact`, `authors`: schemas próprios de um tema multi-autor/revista.

Os ~90 arquivos `.md` em `src/content/post/` já existem com o vocabulário atual (`pubDatetime`, `ogImage`, etc.). Reescrever o front matter de todos eles para o vocabulário do tema alvo é um trabalho de migração de dados arriscado (90 arquivos, risco de erro de data/timezone, perda de `canonicalURL`/`hideEditPost` que não têm equivalente no schema do tema alvo).

## Decision

Manter os **nomes de campo atuais** do schema de `post`/`pages` (extensão do schema existente, não substituição), e adaptar os componentes/layouts portados do bookworm-light-astro para consumir esses campos — em vez de migrar o front matter dos 90 posts para o vocabulário do tema alvo.

Concretamente:

- `src/content.config.ts` continua com os campos atuais. Se algum recurso visual do tema alvo pedir um campo que não existe (ex.: `categories`), ele é tratado como opcional/derivado (ex.: reusar `tags[0]` ou omitir a seção), não como um novo campo obrigatório no front matter.
- `author` (string) é usado como está; não se adota `authors[]` (o blog é single-author).
- `ogImage` continua sendo a fonte da imagem social; a geração dinâmica via Satori (`og.png.ts`, `index.png.ts`) é portada como está.

## Consequences

- **Positivo**: elimina a necessidade de um script de migração de dados sobre 90 arquivos de conteúdo; reduz risco de regressão de SEO/metadata.
- **Positivo**: `canonicalURL`, `hideEditPost`, `timezone`, `modDatetime` — campos sem equivalente no tema alvo — continuam funcionando sem trabalho extra.
- **Negativo**: os componentes portados do bookworm-light-astro (`PostSingle.astro`, cards de listagem, etc.) não podem ser copiados literalmente; precisam ser adaptados campo a campo. Isso é tratado como trabalho normal de porting na Fase de visual (ver [phases/phase-04-visual-port-and-dark-mode.md](../phases/phase-04-visual-port-and-dark-mode.md)), não como migração de dados.
- **Negativo**: recursos do tema alvo que dependem de `categories[]`/`authors[]` multi-valor (páginas de autor, página de categorias) não fazem sentido sem dado real e ficam fora de escopo (ver Q3 em [discovery.md](../discovery.md)).

## Alternatives considered

1. **Migrar front matter dos 90 posts para o vocabulário do tema alvo.** Rejeitada: maior superfície de erro em dados de produção, sem ganho funcional (os nomes de campo são um detalhe interno, invisível ao leitor e ao SEO).
2. **Manter dois schemas em paralelo (um por coleção) e mapear via função adaptadora antes de renderizar.** Considerada equivalente em resultado à decisão tomada, mas com uma camada de indireção extra sem necessidade real, já que só existe uma coleção de posts. Rejeitada por complexidade desnecessária.

## Status change history

- Proposed — criada durante o planejamento inicial da migração de tema.
