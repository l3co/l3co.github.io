# Phase 01 — Content schema and asset audit

## Objective and value delivered

Confirmar que `src/content.config.ts` atual continua sendo a fonte de verdade do schema (conforme [Decision 001](../decisions/decision-001-content-schema-strategy.md)) e auditar os 90 posts quanto a referências de imagem/assets antes de qualquer troca de layout — para que a Fase 4 (visual) não precise lidar com surpresas de conteúdo.

## Scope

**Incluído:**
- Revisão do `src/content.config.ts` atual — decidir se algum campo novo, opcional, precisa ser adicionado para suportar o layout do tema alvo (ex.: um campo `image` derivado de `ogImage` para reaproveitar componentes de card, se necessário — só se estritamente necessário para a Fase 4).
- Auditoria de todos os 90 arquivos em `src/content/post/*.md` quanto a: uso de `ogImage`, imagens referenciadas no corpo do markdown, caminhos relativos vs absolutos.
- Auditoria de `src/content/pages/about.md`.

**Excluído:** reescrita de qualquer front matter existente; qualquer alteração visual.

## Prerequisites and dependencies

- Hard dependency: [phase-00](./phase-00-foundation-and-baseline.md) concluída (branch e baseline prontos).

## Files involved

| Path | Classification |
|---|---|
| `src/content.config.ts` | Existing file — revisado, alterado apenas se necessário |
| `src/content/post/*.md` (90 arquivos) | Existing files — apenas lidos/auditados, não reescritos |
| `src/content/pages/about.md` | Existing file — apenas lido/auditado |
| `public/images/posts/` | Existing directory — assets referenciados pelos posts |

## Technical approach

1. Rodar uma varredura (`grep`/script) em `src/content/post/*.md` por padrões de imagem: `ogImage:`, `![...](...)`, tags `<img>`. Listar todos os caminhos únicos encontrados.
2. Confirmar que todos os caminhos apontam para `public/images/posts/` (Existing directory) ou para URLs externas — nenhum aponta para dentro de `src/content/post/` (co-localizado), o que mudaria a estratégia de resolução de assets do Astro (`image()` do schema Zod já assume resolução relativa ao arquivo markdown).
3. Decidir, com base na varredura, se `src/content.config.ts` precisa de algum campo opcional adicional para o layout do tema alvo (ex.: uma imagem de capa "computada" para os cards de listagem, quando `ogImage` for uma imagem gerada dinamicamente pelo Satori em vez de um arquivo estático). Documentar a decisão inline no próprio schema com comentário, sem quebrar os posts existentes (campo deve ser opcional/derivável).
4. Não alterar nenhum arquivo de conteúdo nesta fase — apenas o schema, se necessário.

## Testing and validation

- `astro check` (ou `astro sync` seguido de checagem de tipos) confirma que todos os 90 posts + `about.md` continuam validando contra o schema, com ou sem o campo novo adicionado.
- Lista de assets referenciados é revisada manualmente; qualquer caminho quebrado ou inesperado é registrado como item a resolver antes da Fase 4.

## Acceptance criteria

- [ ] Lista de imagens/assets referenciados pelos 90 posts documentada (arquivo de trabalho, ex. `planning/asset-audit.md`, New file).
- [ ] `src/content.config.ts` revisado; qualquer alteração é aditiva (campos novos opcionais), nunca removendo ou tornando obrigatório um campo já em uso.
- [ ] Nenhum arquivo de `src/content/post/*.md` foi modificado.

## Risks and rollback

- Risco R8 (ver [risks.md](../risks.md)): caminho de imagem quebrado descoberto tardiamente. Mitigado por ser o foco explícito desta fase, antes do porting visual.
- Rollback: reverter qualquer alteração aditiva ao `content.config.ts` (sem impacto em conteúdo).

## Completion checklist

- [ ] Auditoria de assets concluída e documentada.
- [ ] Decisão sobre campos adicionais no schema tomada e registrada (ou confirmado que nenhum é necessário).

## Navigation

- Anterior: [phase-00-foundation-and-baseline.md](./phase-00-foundation-and-baseline.md)
- Próxima: [phase-02-routing-and-page-parity.md](./phase-02-routing-and-page-parity.md)
- Roadmap: [../roadmap.md](../roadmap.md)
