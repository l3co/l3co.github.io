---
title: Já complicou a solução para ficar divertida?
pubDatetime: 2024-12-01T00:00:00.000Z
description: >-
  Em uma das conversas que tive com o Michel fundador da Jaya ele disse a
  seguinte frase:
tags:
  - tech
  - desenvolvimento de software
  - programação
---
# Já complicou a solução para ficar divertida?

Fala, pessoal, tudo bem com vocês?

Em uma das conversas que tive com o Michel fundador da Jaya ele disse a seguinte frase:

 — De vez em quando, os programadores pegam algo simples e aumentam a complexidade para ficar divertido.

Bom, neste artigo quero compartilhar com vocês uma coisa que fiz certa vez que vai de encontro com isto.

Quando aprendi [Generics](https://learn.microsoft.com/pt-br/dotnet/csharp/fundamentals/types/generics) com C# em 2012–2013, eu pensei: por que não construir uma solução inteira com Generics, afinal tudo acabava sendo mesmo um grande [CRUD](https://pt.wikipedia.org/wiki/CRUD) no contexto que eu trabalhava. Bom, comecei essa empreitada na época em que já se falava e usava [DDD](https://fullcycle.com.br/domain-driven-design/). Com a ajuda de um artigo que vou compartilhar no final, consegui criar essa solução que, até então, achava genial. O ponto complicado é que o genial nem sempre é o simples, afinal você adicionou complexidade em uma coisa simples. Na época, a equipe em que eu trabalhava tinha 1 desenvolvedor SR e os demais Juniors e Plenos. O desenvolvedor SR olhou e disse: “Leco, a solução está muito bacana, mas acho que a equipe que temos vai sofrer muito com essa solução, ela está complexa demais”. Na hora, doeu um pouco escutar isso. Eu era muito apegado ao que fazia e senti que a vida do meu filho corria risco. Mas senti que o que ele estava falando tinha relevância e fazia sentido. Então, chamei nosso Dev mais recente e disse:

 — Eu quero que você crie uma tela para a entidade de produtos.

À primeira vista, foi um sucesso. Ele adicionou uma entidade no domínio e simplesmente criou-se a tela, a tabela no banco de dados e o service. Pensei: bom, talvez tenha sido só impressão dele, acho que ficou no geral bem simples fazer as coisas. E adivinha? A tela do produto precisava ter alguns comportamentos e 💣boom💣, não foi tão fácil assim. Pelo contrário, tudo que se fazia parecia gambiarra e, de fato, alguns eram.

Agora, um comparativo: essa solução toda com Generics eu levei mais de 1 mês para deixá-la funcionando, era meu projeto em paralelo, a princípio de estudo também, e para montar o CRUD que atenderia à necessidade do projeto eu levei apenas 3 dias, pois já tínhamos muitas coisas prontas que precisamos apenas adicionar no projeto.

## O que eu aprendi:

- Não tente fazer tudo absolutamente sozinho, compartilhe logo no início e pegue os feedbacks da sua equipe.
- Cuidado com as complexidades divertidas que você adiciona ao seu projeto.
- O divertido a longo prazo pode ser mais cansativo do que pensa. Já pensou se eu tivesse que fazer sempre um monte de gambiarra para cada tela nova que devesse ter comportamentos distintos?
- Divertido para você muitas vezes não é para todos.

## Dicas

Com o tempo acabei encontrando um artigo sobre Zen Python, extrai da lista 4 princípios que acredito que ajudam muito quando estamos desenvolvendo, espero que te ajude também.

- Bonito é melhor que feio.
- Explícito é melhor que implícito.
- Simples é melhor que complexo.
- Complexo é melhor que complicado.

Bom pessoal espero que você tenha se divertido assim como eu relembrando o passado, grande abraço.

### Links

- [Zen de Python — Wikipédia, a enciclopédia livre (wikipedia.org)](https://pt.wikipedia.org/wiki/Zen_de_Python#:~:text=O%20Zen%20de%20Python%20%28em%20ingl%C3%AAs%3A%20Zen%20of,design%20da%20linguagem%20de%20programa%C3%A7%C3%A3o%20Python%20%5B%201%5D.)
- [Bookstore — Part I: Onion Architecture, Entities and Interfaces | Henrique Baggio’s Blog (wordpress.com)](https://hnrqbaggio.wordpress.com/2012/11/21/bookstore-part-i-onion-architecture-entities-and-interfaces/)
- <https://fullcycle.com.br/domain-driven-design/>
- <https://learn.microsoft.com/pt-br/dotnet/csharp/fundamentals/types/generics>
