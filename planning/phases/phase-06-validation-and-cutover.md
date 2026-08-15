# Phase 06 — Validation and cutover

## Objective and value delivered

Última verificação de ponta a ponta antes de qualquer merge em `main`, cobrindo os critérios de sucesso definidos em [discovery.md](../discovery.md), seguida da aprovação explícita do usuário — só então o merge (e, futuramente, a ativação do deploy automático) acontece.

## Scope

**Incluído:**
- Comparação final de URLs (baseline vs nova build) — reexecução do diff da [phase-02](./phase-02-routing-and-page-parity.md) contra o estado final (pós Fases 3–5).
- Checklist de features obrigatórias (Giscus, Pagefind, dark mode) em múltiplos posts.
- Revisão de conteúdo em pelo menos: 1 post com callout, 1 post com bloco de código/diff, 1 post só texto, a página `/about`, a home, `/tags`, `/archives`.
- Apresentação do resultado ao usuário (preview local ou deploy de preview) para aprovação visual antes do merge.
- Decisão explícita sobre o gatilho do `.github/workflows/astro.yaml` (permanece `workflow_dispatch` até o usuário decidir religar `push: [main]`).

**Excluído:** o próprio merge/push para `main` sem aprovação explícita do usuário (ação outward-facing/hard-to-reverse).

## Prerequisites and dependencies

- Hard dependency: Fases 0–5 concluídas.

## Files involved

- Nenhum arquivo de produto novo; esta fase é de validação. Artefatos de trabalho: `planning/baseline-urls.txt` (Existing file, criado na Fase 0), relatório final de validação (`planning/validation-report.md`, New file, opcional).

## Technical approach

1. Rodar `npm run build` (comando final) e regenerar a lista de URLs de `dist/`.
2. Comparar contra `planning/baseline-urls.txt`; qualquer divergência não aprovada anteriormente bloqueia esta fase.
3. Percorrer manualmente o checklist de features (Giscus, Pagefind, dark mode, RSS, sitemap, OG image) reexecutando as validações já descritas nas Fases 3–5, desta vez sobre a build final e completa (não builds parciais).
4. Rodar `astro dev --background` (conforme `CLAUDE.md` do projeto) e apresentar o preview ao usuário para revisão visual.
5. Registrar a aprovação (ou os ajustes pedidos) do usuário antes de prosseguir para merge.

## Testing and validation

- Todos os testes/validações das Fases 0–5 reexecutados sobre o estado final e íntegro da branch (não builds intermediários).
- `astro check` limpo.
- `npm run format:check` e `npm run lint` (scripts já existentes no `package.json` atual) sem erros novos introduzidos pela migração.

## Acceptance criteria

- [ ] Diff de URLs final sem divergências não aprovadas.
- [ ] Todas as features obrigatórias (FR3, FR4, FR5 em [discovery.md](../discovery.md)) validadas na build final.
- [ ] `astro check`, `lint`, `format:check` passam.
- [ ] Usuário aprovou explicitamente o resultado visual.

## Risks and rollback

- Risco R7 (ver [risks.md](../risks.md)): merge prematuro. Mitigação: esta fase termina em aprovação explícita do usuário, não em merge automático — o merge é uma ação separada, fora do escopo de execução automática deste plano.
- Rollback: branch permanece isolada até aprovação; se reprovada, volta para a fase relevante (3, 4 ou 5) para ajuste, sem necessidade de refazer o plano inteiro.

## Completion checklist

- [ ] Validação final completa e documentada.
- [ ] Aprovação explícita do usuário registrada.
- [ ] Decisão sobre o gatilho de deploy automático (`astro.yaml`) tomada com o usuário.

## Navigation

- Anterior: [phase-05-integrations.md](./phase-05-integrations.md)
- Roadmap: [../roadmap.md](../roadmap.md)
