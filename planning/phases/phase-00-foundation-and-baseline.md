# Phase 00 — Foundation and baseline

## Objective and value delivered

Criar o espaço de trabalho isolado (branch nova a partir de `main`) e obter uma build "hello world" do bookworm-light-astro rodando dentro deste repositório — sem tocar em conteúdo ou integrações ainda. Isso dá uma base testável antes de qualquer migração de dado ou porting de feature, e evita qualquer risco sobre o conteúdo de produção nesta etapa.

## Scope

**Incluído:**
- Branch nova a partir de `main`.
- Cópia dos arquivos de estrutura/base do tema alvo (dependências no `package.json`, `astro.config`, `src/config/*.json`, `src/layouts`, `src/styles`, `src/tailwind-plugin`, `tsconfig.json`) para este repositório, coexistindo temporariamente com os arquivos atuais.
- Build local (`astro dev` / `astro build`) do tema alvo funcionando com o conteúdo de demonstração dele (não com os posts reais ainda).
- Registro de um snapshot da lista de URLs da build atual (baseline para comparação na Fase 6).

**Excluído:** qualquer migração de conteúdo real, remoção de código do tema atual, integração de Giscus/Pagefind/dark mode/OG image/RSS.

## Prerequisites and dependencies

- Hard dependency: aprovação do usuário para o approach de migração completa (já confirmada nesta conversa).
- Hard dependency: `main` limpo/atualizado como ponto de partida.

## Files involved

| Path | Classification |
|---|---|
| `package.json` | Existing file — dependências a mesclar com as do tema alvo |
| `astro.config.ts` | Existing file — será substituído/mesclado nas fases seguintes; nesta fase, apenas inspecionado |
| `planning/discovery.md` | Existing file (criado nesta rodada de planejamento) |
| Novo diretório de branch (`git worktree`/branch) | New (ação de git, não arquivo) |
| Snapshot de URLs (`planning/baseline-urls.txt` ou similar) | New file |

## Technical approach

1. Confirmar `main` atualizado localmente (`git fetch`, `git status`).
2. Criar branch nova a partir de `main` (nome sugerido: `theme/bookworm-migration` — a confirmar com o usuário antes de criar).
3. Gerar/confirmar uma build atual (`npm run build`) e extrair a lista de paths de `dist/**/index.html` (e `dist/rss.xml`, `dist/sitemap-0.xml`) como baseline de comparação — salvar em `planning/baseline-urls.txt` (New file, não versionado como parte do produto final, é um artefato de trabalho).
4. Instalar as dependências do bookworm-light-astro que ainda não existem no `package.json` atual (`astro-auto-import`, `fuse.js` — se decidido manter só como dependência não usada, avaliar remover depois — `github-slugger`, `marked`, `@tailwindcss/forms`, `react-icons`, `date-fns`, `@justinribeiro/lite-youtube`, `astro-gtm-lite`). Resolver conflitos de versão com dependências já presentes (`@astrojs/mdx`, `@astrojs/react`, `@astrojs/sitemap`, `sharp`, `tailwindcss`, `@tailwindcss/vite`, `@tailwindcss/typography`).
5. Copiar para o repo (sem sobrescrever ainda os arquivos atuais equivalentes — usar sufixo temporário ou subpasta de staging se necessário para revisão lado a lado): `src/config/*.json`, `src/layouts/`, `src/styles/`, `src/tailwind-plugin/`, `src/lib/`.
6. Rodar `astro dev`/`astro build` com o conteúdo de demonstração do tema alvo para confirmar que a base funciona isolada, antes de qualquer integração com o conteúdo real.

## Testing and validation

- `npm run build` (ou equivalente do tema alvo) conclui sem erro com o conteúdo de demonstração.
- `astro check` sem erros de tipo novos introduzidos pela base do tema alvo.
- Baseline de URLs (`planning/baseline-urls.txt`) gerado e revisado manualmente contra o site em produção (`https://l3co.github.io`) para confirmar que reflete o estado real.

## Acceptance criteria

- [ ] Branch nova existe, criada a partir de `main`.
- [ ] `planning/baseline-urls.txt` existe e lista todas as rotas públicas atuais.
- [ ] Build local do tema alvo (com conteúdo de demo) passa.
- [ ] Nenhum arquivo de `src/content/post` ou `src/content/pages` foi alterado nesta fase.

## Risks and rollback

- Risco: conflito de dependências entre as duas bases (ex.: versões diferentes de `astro`, `@tailwindcss/vite`). Mitigação: resolver antes de prosseguir para a Fase 1; não seguir com conflitos não resolvidos.
- Rollback: descartar a branch (`git branch -D`), sem qualquer efeito em `main`.

## Completion checklist

- [ ] Branch criada e nomeada.
- [ ] Dependências instaladas e build de demo funcionando.
- [ ] Baseline de URLs gerado.

## Navigation

- Anterior: [../discovery.md](../discovery.md)
- Próxima: [phase-01-content-schema-and-migration.md](./phase-01-content-schema-and-migration.md)
- Roadmap: [../roadmap.md](../roadmap.md)
