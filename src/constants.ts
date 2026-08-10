import type { GiscusProps } from "@giscus/react";

// Configuração do Giscus (comentários via GitHub Discussions).
//
// Para preencher os valores reais:
//   1. Habilite "Discussions" no repositório GitHub (Settings > General > Features).
//   2. Instale o app https://github.com/apps/giscus no repositório.
//   3. Gere a configuração em https://giscus.app (mapping recomendado: "pathname"),
//      informando o repositório l3co/l3co.github.io.
//   4. Copie os valores gerados (repoId, category, categoryId) para cá.
export const GISCUS: GiscusProps = {
  repo: "l3co/l3co.github.io",
  repoId: "TODO_REPO_ID",
  category: "Comentários",
  categoryId: "TODO_CATEGORY_ID",
  mapping: "pathname",
  reactionsEnabled: "1",
  emitMetadata: "0",
  inputPosition: "bottom",
  lang: "pt",
  loading: "lazy",
};
