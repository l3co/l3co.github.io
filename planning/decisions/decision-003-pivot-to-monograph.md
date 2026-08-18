# Decision 003: Pivot do tema alvo — bookworm-light-astro → monograph

## Status

Accepted (o usuário rejeitou o resultado visual do PR #9 e pediu explicitamente a troca para [xocothemes/monograph](https://github.com/xocothemes/monograph)).

## Context

O PR #9 aplicou a linguagem visual do bookworm-light-astro (cards com thumbnail, teal `#01AD9F`, estilo revista/magazine). Depois de revisar no preview, o usuário não gostou do resultado e pediu a troca para o tema **monograph** (xocothemes) — um tema "text-first" para ensaios/notas de longform, bem mais próximo do conteúdo real do blog (reflexões extensas sobre fé, liderança e software) do que o formato revista do Bookworm.

**Características do monograph** (inspecionado via clone de referência):
- Paleta monocromática (preto/branco/cinza) com um único accent azul-tinta (`#1a4fa0` no claro, `#8ab4f8` no escuro) — e já traz uma variante dark própria e completa, diferente do Bookworm que não tinha nenhuma.
- Tipografia Geist (self-hosted, SIL OFL) para corpo/títulos, com blockquotes em serif editorial (`Iowan Old Style`/`Palatino`/Georgia — fontes de sistema, sem download).
- Listagem de posts em **feed sem thumbnail** (título, excerpt, data, tempo de leitura), separada por whitespace generoso — não em grid de cards com imagem.
- Busca própria via paleta de comando (JSON estático) — **não adotada aqui**, mantém-se o Pagefind já validado (requisito do usuário, ver [discovery.md](../discovery.md) FR4).
- Header sticky que esconde ao rolar para baixo e reaparece ao subir; toggle de tema como um switch deslizante (não um botão com troca de ícone).

## Decision

Mesma estratégia das Decisions 001/002: **não portar a base de código do monograph** (seu `content.config.ts`, sistema de config em `src/config/*.ts`, componentes React/Astro próprios). Em vez disso, portar os **tokens de design e os padrões de componente** (paleta, tipografia, classes `.feed`/`.card`/`.site-header`/`.nav-link`/`.pill`/`.btn`/`.link-title`/`.link-sweep`/`.theme-switch` etc.) para dentro da infraestrutura Tailwind v4 + CSS-variables já existente neste repositório, mantendo:

- Schema de conteúdo, rotas, i18n, utilitários — inalterados (Decision 001).
- Giscus, Pagefind, RSS/sitemap/robots.txt, OG image dinâmico via Satori, Google Analytics — inalterados (já validados no PR #9, não dependem do tema visual).
- `src/scripts/theme.ts` (lógica de dark mode) — inalterado; só o **visual** do botão de tema muda para parecer um switch deslizante.

O que muda desta vez, em relação ao Bookworm:
- **Fonte**: Geist (self-hosted em `public/fonts/geist/`, licença SIL OFL copiada) substitui Mulish. "Google Sans Code" continua reservado para blocos de código e a geração de OG image (dependência estrutural do Satori/`astro:assets`).
- **Listagem de posts**: volta a ser uma lista vertical sem thumbnail (estilo "feed"), não mais um grid de cards com imagem — mais alinhado ao formato de ensaio do monograph e ao conteúdo real do blog.
- **Paleta**: monocromática + accent azul-tinta, com uma variante dark **oficial do tema** (não inventada por esta implementação, como foi o caso do Bookworm).

## Consequences

- O trabalho de estilo do PR #9 (Bookworm) é substituído, não descartado do histórico — a branch `theme/monograph-migration` parte da ponta de `theme/bookworm-migration` (preserva os commits de Google Analytics e da revisão de copy do hero, que são independentes do tema visual).
- PR #9 será fechado com um comentário explicando a troca; um novo PR é aberto a partir de `theme/monograph-migration`.
- Os componentes de card com thumbnail construídos na Fase 4 anterior (`Card.astro` layout `"card"`) são substituídos por um layout de feed sem imagem — as imagens OG geradas dinamicamente por post continuam existindo (usadas em `/og.png`, redes sociais, RSS), só deixam de aparecer como thumbnail na listagem.
