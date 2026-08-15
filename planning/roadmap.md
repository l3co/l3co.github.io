# Roadmap — Migração de tema: AstroPaper → bookworm-light-astro

## Overview

Plano para substituir a base de tema atual do blog (derivada do AstroPaper) pela estrutura do tema `bookworm-light-astro` (Themefisher), preservando conteúdo, URLs (SEO) e as features consideradas obrigatórias pelo usuário: comentários Giscus, busca Pagefind e dark mode.

## Goal

Ao final deste plano, o site publicado em `https://l3co.github.io` deve visualmente refletir o tema bookworm-light-astro, com todo o conteúdo atual acessível pelas mesmas URLs de hoje, e as três features obrigatórias funcionando.

## Current state

Blog Astro 7 baseado em AstroPaper: 90 posts em pt-BR, i18n de UI, Pagefind, Giscus, OG image dinâmico via Satori, RSS/sitemap, dark mode. Ver detalhes em [architecture.md](./architecture.md) (seção "Current architecture").

## Target state

Mesmo conteúdo e mesmas URLs, layout/estrutura de componentes do bookworm-light-astro, com as integrações obrigatórias religadas. Ver [architecture.md](./architecture.md) (seção "Proposed architecture").

## Success criteria

Ver [discovery.md](./discovery.md#initial-definition-of-success).

## Scope

**In scope:** troca completa da camada de apresentação (layouts, componentes, estilos, config de tema) para a estrutura do bookworm-light-astro; preservação de URLs, conteúdo, Giscus, Pagefind, dark mode, RSS, sitemap, OG image dinâmico, pipeline de markdown (callouts/TOC/Shiki transformers).

**Out of scope:** páginas de autores/categorias/contato do tema alvo; CMS Sitepins; deploy em Cloudflare Workers; reescrita de front matter dos posts existentes (ver [Decision 001](./decisions/decision-001-content-schema-strategy.md)); ativação do gatilho automático de deploy (`push: [main]`) — decisão do usuário, fora do escopo técnico deste plano.

## Assumptions

Ver tabela de "Open questions" em [discovery.md](./discovery.md#open-questions) — assunções registradas para Q2, Q3, Q4.

## Constraints

- Deploy estático (GitHub Pages), sem SSR.
- Node >= 22.12; Astro 7.
- Trabalho deve ocorrer em branch nova a partir de `main` (nunca na branch de conteúdo atual `content/design-patterns-agentes-router`, nem diretamente em `main`).

## Architecture summary

Ver [architecture.md](./architecture.md).

## Delivery strategy

Sete fases incrementais e sequenciais (com duas oportunidades de paralelismo pontual, ver mapa de dependências abaixo), cada uma validável isoladamente antes de avançar. Nenhuma fase toca em `main` — o merge só ocorre após a Fase 6 (validação) e aprovação explícita do usuário.

## Phase overview table

| Phase | Objective | Depends on | Deliverable | Status |
|---|---|---|---|---|
| [Phase 00](./phases/phase-00-foundation-and-baseline.md) | Branch nova + build de demo do tema alvo funcionando | None | Branch + baseline de URLs | Planned |
| [Phase 01](./phases/phase-01-content-schema-and-migration.md) | Confirmar schema de conteúdo e auditar assets dos 90 posts | Phase 00 | Auditoria de assets + schema revisado | Planned |
| [Phase 02](./phases/phase-02-routing-and-page-parity.md) | Garantir paridade de rotas (`/post`, `/tags`, `/archives`, `/about`, `/search`, feeds) | Phase 00, Phase 01 | Todas as URLs atuais respondendo na nova build | Planned |
| [Phase 03](./phases/phase-03-markdown-pipeline-parity.md) | Portar pipeline de markdown (callouts, TOC, Shiki transformers) | Phase 00 (paralelo à Phase 02) | Config de markdown consolidada e validada | Planned |
| [Phase 04](./phases/phase-04-visual-port-and-dark-mode.md) | Portar layouts/componentes visuais + dark mode | Phase 01, Phase 02, Phase 03 | Layout completo do tema alvo, com dark mode | Planned |
| [Phase 05](./phases/phase-05-integrations.md) | Religar Giscus, Pagefind, OG image, RSS, sitemap, robots.txt | Phase 04 | Todas as integrações obrigatórias funcionando | Planned |
| [Phase 06](./phases/phase-06-validation-and-cutover.md) | Validação final e aprovação do usuário | Phase 05 | Aprovação explícita para merge | Planned |

## Dependency map

```
Phase 00 → Phase 01 → Phase 02 ─┐
        └───────────→ Phase 03 ─┴→ Phase 04 → Phase 05 → Phase 06
```

Phase 02 e Phase 03 podem ser executadas em paralelo (não compartilham arquivos), ambas dependendo apenas da Phase 00; a Phase 01 é pré-requisito apenas da Phase 02 (paridade de rotas depende de saber que os assets/schema estão auditados) e da Phase 04.

## Critical path

Phase 00 → Phase 01 → Phase 02 → Phase 04 → Phase 05 → Phase 06 (a Phase 03, embora paralela, precisa concluir antes da Phase 04 iniciar).

## Risk summary

Ver [risks.md](./risks.md). Riscos de maior atenção: **R1** (quebra de URL/SEO), **R2** (perda de formatação de markdown técnico) e **R3** (esforço de dark mode subestimado, tema alvo não foi desenhado para isso).

## Validation strategy

Cada fase tem sua própria seção "Testing and validation". A validação consolidada final ocorre na [Phase 06](./phases/phase-06-validation-and-cutover.md), reexecutando todas as checagens sobre o estado final da branch.

## Rollout strategy

Todo o trabalho ocorre em branch isolada, criada a partir de `main`. O workflow de deploy (`.github/workflows/astro.yaml`) permanece em `workflow_dispatch` manual durante todo o plano — replicando o padrão já usado na migração anterior do repositório (comentário existente no próprio workflow). O merge para `main` e a eventual reativação do gatilho automático (`push: [main]`) são ações que exigem aprovação explícita do usuário e ficam fora da execução automática deste plano.

## Open questions

Ver [discovery.md](./discovery.md#open-questions).

## Planning documents

- [discovery.md](./discovery.md)
- [architecture.md](./architecture.md)
- [risks.md](./risks.md)
- [decisions/decision-001-content-schema-strategy.md](./decisions/decision-001-content-schema-strategy.md)
- [phases/phase-00-foundation-and-baseline.md](./phases/phase-00-foundation-and-baseline.md)
- [phases/phase-01-content-schema-and-migration.md](./phases/phase-01-content-schema-and-migration.md)
- [phases/phase-02-routing-and-page-parity.md](./phases/phase-02-routing-and-page-parity.md)
- [phases/phase-03-markdown-pipeline-parity.md](./phases/phase-03-markdown-pipeline-parity.md)
- [phases/phase-04-visual-port-and-dark-mode.md](./phases/phase-04-visual-port-and-dark-mode.md)
- [phases/phase-05-integrations.md](./phases/phase-05-integrations.md)
- [phases/phase-06-validation-and-cutover.md](./phases/phase-06-validation-and-cutover.md)
