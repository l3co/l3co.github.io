import { defineAstroPaperConfig } from "./src/types/config";

export default defineAstroPaperConfig({
  site: {
    url: "https://l3co.github.io",
    title: "leco",
    description:
      "Apaixonado por tecnologia e desenvolvimento de software. Aqui compartilho experiências, aprendizados e reflexões sobre desenvolvimento de software, tecnologia e fé.",
    author: "leco",
    profile: "https://github.com/l3co",
    ogImage: "default-og.jpg",
    lang: "pt-BR",
    timezone: "America/Sao_Paulo",
    dir: "ltr",
    googleAnalyticsId: "G-9ZFR86H0G0",
  },
  posts: {
    perPage: 8,
    perIndex: 8,
    scheduledPostMargin: 15 * 60 * 1000,
  },
  features: {
    lightAndDarkMode: true,
    dynamicOgImage: true,
    showArchives: true,
    showBackButton: true,
    editPost: {
      enabled: false,
    },
    search: "pagefind",
  },
  // TODO: revisar/completar com os links reais (LinkedIn, e-mail, etc.)
  socials: [
    { name: "github", url: "https://github.com/l3co" },
    { name: "gitlab", url: "https://gitlab.com/l3co" },
  ],
  shareLinks: [
    { name: "whatsapp", url: "https://wa.me/?text=" },
    { name: "facebook", url: "https://www.facebook.com/sharer.php?u=" },
    { name: "x",        url: "https://x.com/intent/post?url=" },
    { name: "telegram", url: "https://t.me/share/url?url=" },
    { name: "pinterest", url: "https://pinterest.com/pin/create/button/?url=" },
    { name: "mail",     url: "mailto:?subject=See%20this%20post&body=" },
  ],
});
