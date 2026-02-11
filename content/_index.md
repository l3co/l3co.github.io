---
title: Leco
description: Apaixonado por tecnologia e desenvolvimento de software
content_blocks:
  - _bookshop_name: hero
    heading:
      title: "Olá, eu sou o Leco! 👋"
      content: |-
        Desenvolvedor apaixonado por aprender, criar e resolver problemas. Aqui compartilho experiências, aprendizados e reflexões sobre desenvolvimento de software, tecnologia e fé.
      width: 6
    background:
      color: primary
      subtle: true
    width: 8
    links:
      - title: Sobre mim
        url: about
        icon: fas chevron-right
      - title: Posts
        url: posts
        icon: fas book-open
    orientation: horizontal
    justify: center

  - _bookshop_name: articles
    heading:
      title: Posts Recentes
      align: start
    input:
      section: posts
      reverse: true
      sort: date
    hide-empty: false
    header-style: none
    more:
      title: Ver todos os posts
    padding: 0
    limit: 6
    class: border-0 card-zoom card-body-margin
---
