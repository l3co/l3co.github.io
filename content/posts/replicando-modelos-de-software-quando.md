---
title: "Replicando Modelos de Software: Quando Menos é Mais"
date: 2024-12-01
draft: false
description: ""
tags: ["domain-driven-design", "tech", "DDD", "desenvolvimento de software", "programação"]
author: "Leco"
showToc: true
TocOpen: false
---

## 

# Reflexão: Você Realmente Precisa de Todas as Peças do LEGO?

No artigo anterior, discutimos o conceito de **espaço de problema**. Hoje, quero explorar uma prática que vejo frequentemente na área de desenvolvimento de software: **a replicação impensada de modelos e padrões**. Algo que, muitas vezes, se transforma em uma armadilha para desenvolvedores e equipes.

### O hábito de replicar padrões sem refletir

Quando comecei a estudar sobre *Domain-Driven Design (DDD)*, uma questão logo me intrigou: **Será que preciso aplicar absolutamente tudo que está no livro?** Será que devo organizar meu projeto exatamente como Eric Evans ou Vaughn Vernon propuseram? Será que sempre é necessário seguir à risca a estrutura com:

- Um **Service** chamando um **Repository**,
- Que por sua vez é chamado por uma **Controller**,
- E, por fim, ligado a uma camada de interface de usuário (UI)?

Explorando projetos em **Spring**, **ASP.NET**, **Django** ou mesmo em **Node.js**, comecei a perceber algo curioso: **muitas vezes seguimos estruturas sem refletir se elas realmente são necessárias para o problema em questão.**

Um exemplo disso são serviços com métodos que, ao serem analisados, apenas repassam uma chamada a outro método, sem nenhuma lógica ou transformação relevante. Isso levanta uma questão: **Será que estamos replicando padrões apenas porque eles se tornaram convenção?**

## **Modelos como aviões: a importância do contexto**

No livro [*Domain-Driven Design Destilado* de Vaughn Vernon](https://amzn.to/3ByhRtS), um ponto essencial é destacado: o DDD é um modelo de desenvolvimento de software, não uma regra universal. Para ilustrar, pense em um “modelo de avião”. Existem diferentes tipos de aviões:

- Aviões comerciais,
- Jatinhos particulares,
- Aviões de pulverização agrícola,
- Hidroaviões.

Embora todos sejam aviões, cada um atende a um propósito diferente. O mesmo acontece com padrões como Clean Architecture, Onion Architecture, e até mesmo o DDD: nem todas as peças são necessárias o tempo todo.

**A analogia do LEGO**

Trabalhar com padrões de desenvolvimento é como brincar com um conjunto de LEGO. Você tem várias peças que podem ser usadas para criar:

- carro
- casa
- avião

No entanto, nem sempre você precisa usar todas as peças disponíveis para montar algo funcional. E muitas vezes, forçar o uso de todas as peças pode tornar o “brinquedo” mais complexo e difícil de entender.

O mesmo vale para projetos de software. Aplicar um padrão de forma indiscriminada pode gerar:

1. Custos desnecessários: Projetos com estruturas complexas podem ser mais difíceis de entender e navegar.
2. Sobrecarga cognitiva: Um projeto que deveria ser simples pode se tornar um pesadelo para novos desenvolvedores na equipe.

## **Uma experiência prática**

Certa vez, realizamos um workshop onde entregamos um projeto simples para ser desenvolvido pelos participantes. Um comentário curioso surgiu:

*“Não foi tão difícil migrar o projeto simples para um com Clean Architecture. Levamos um ou dois dias para organizar tudo.”*

Mas aqui está o detalhe importante: migrar um projeto simples para algo mais complexo é relativamente fácil. Porém, o custo de retroceder — ou seja, simplificar um projeto complexo — é exponencialmente maior.

No nosso caso, levar o projeto de uma estrutura complexa para uma mais simples demandou vários dias de trabalho. Isso porque, ao tentar simplificar um sistema já sobrecarregado, você se depara com camadas que não precisavam estar ali desde o início.

**Construa com o problema em mente**

Projetar software é como construir um prédio:

1. Comece pela **fundação**.
2. Adicione os andares conforme necessário.
3. Não tente criar um arranha-céu onde só é preciso uma casa térrea.

Se você construir algo muito robusto antes de entender o problema, estará criando um peso desnecessário — e correrá o risco de a estrutura desabar.

## **Minha pergunta para você**

Como você tem aplicado padrões e arquiteturas em seus projetos? Você já se pegou replicando modelos sem considerar o contexto?

Deixe sua experiência nos comentários. Vamos trocar ideias!

**Um grande abraço e até a próxima.**
