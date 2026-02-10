---
title: "Espaço do Problema e Espaço da Solução"
date: 2024-12-01
draft: false
description: ""
tags: ["DDD", "desenvolvimento de software", "programação", "domain-driven-design"]
author: "Leco"
showToc: true
TocOpen: false
---

## 

# **Espaço do Problema e Espaço da Solução**

Você já ouviu falar sobre espaço de problema e espaço de solução? Neste artigo, quero compartilhar reflexões sobre esses conceitos no contexto do Domain-Driven Design (DDD), com base em livros e experiências que me marcaram.

## **Minha Jornada com o DDD**

Minha introdução ao DDD começou com o livro de Eric Evans, *[Domain-Driven Design: Tackling Complexity in the Heart of Software](https://amzn.to/4iF1lJ1)*. Li uma vez, depois outra, e, com o tempo, esse livro virou um verdadeiro “remédio para dormir”. O conteúdo é denso, reflexivo e desafiador. Quem já passou por isso sabe: mesmo com o interesse, algumas leituras exigem paciência.

Depois, me deparei com o livro *[Implementando Domain-Driven Design](https://amzn.to/3DeQyFv)*, de Vaughn Vernon. Esse livro é minha principal recomendação para quem quer começar a aprender DDD de forma prática. Vaughn captou brilhantemente como implementar os conceitos e os trouxe de forma acessível.

Porém, se você está começando do zero, eu indicaria primeiro o *[Destilando Domain-Driven Design](https://amzn.to/3ZFt0kF)*, também de Vaughn Vernon. Ele oferece uma visão clara e prática de onde e como aplicar o DDD antes de mergulhar em conceitos mais avançados.

### **DDD Nem Sempre é a Resposta**

Embora eu considere o DDD uma abordagem poderosa, ele não precisa ser aplicado a todos os projetos. Em muitos casos, arquiteturas mais simples, como MVC, são suficientes.

Pense no desenvolvimento de software como a construção de uma casa:

- Uma casa projetada para três pessoas não atende 700 pessoas.
- Se o terreno for bom, talvez seja melhor começar do zero com um trator do que tentar transformar a casa em um prédio sem estrutura.

Da mesma forma, sistemas precisam crescer de forma natural, começando como uma semente, desenvolvendo-se como uma muda e, eventualmente, tornando-se uma árvore sólida. Forçar um sistema a ser algo que ele não está preparado para ser pode ser tão prejudicial quanto construir em terreno inadequado.

## **Espaço do Problema vs. Espaço da Solução**

O **espaço do problema** é o desafio ou a necessidade que você precisa atender com seu projeto de software. Já o **espaço da solução** é o desenvolvimento ou a arquitetura usada para atender a essa necessidade.

Por exemplo:

Imagine que você precisa criar um sistema para passeios de cães. Esse sistema representa o **espaço do problema**. O desenvolvimento do software para atendê-lo é o **espaço da solução**.

Agora, suponha que você tenha trabalhado em um sistema de transações Pix para uma instituição financeira com mais de 2 milhões de usuários, onde cada usuário realiza, em média, 7 ou 8 transações diárias. Esse sistema exige uma arquitetura robusta, com bancos segregados e alta capacidade de rastreamento.

Mas será que essa mesma arquitetura faria sentido para o sistema de passeios de cães?

Provavelmente, não. O volume de usuários e transações no sistema de passeios é muito menor, e adotar uma arquitetura tão complexa desde o início seria um desperdício de tempo e recursos.

## **Quando Simplicidade é o Melhor Caminho**

Nem sempre espaço de problema e espaço de solução são equivalentes. Às vezes, começar com um modelo mais simples, como MVC, sem separar frontend e backend, é o suficiente. Muitos desenvolvedores argumentam que é necessário projetar o software para mudanças futuras, mas, na prática, nem sempre essas mudanças aparecem.

Projetar para o “e se” pode levar a soluções desnecessariamente complexas. Como desenvolvedores, trabalhamos com o que temos agora, não com futurologia.

Nos últimos tempos, vejo muitos projetos adotando arquiteturas como Clean Architecture, Onion Architecture ou Atomic Design para problemas que poderiam ser resolvidos de forma mais simples. Embora essas arquiteturas sejam excelentes, muitas vezes são implementadas no momento errado, resultando em desperdício de tempo e esforço.

## **Conclusão**

Entender a diferença entre espaço de problema e espaço de solução é crucial para o desenvolvimento eficiente de software. Antes de adotar uma arquitetura robusta, pergunte-se:

1. O problema justifica essa solução?
2. O momento do projeto exige essa complexidade?

Muitas vezes, começar com o básico e adaptar conforme o sistema cresce é a abordagem mais sensata.

Espero que essa reflexão tenha ajudado você a pensar sobre como abordar seus próximos projetos de forma mais estratégica. Um grande abraço e até logo!
