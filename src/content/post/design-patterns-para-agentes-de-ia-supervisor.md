---
title: 'Design Patterns para Agentes de IA: Supervisor'
pubDatetime: 2026-08-15T00:00:00.000Z
description: >-
  Terceiro artigo da série sobre design patterns para agentes de IA. Explico
  o padrão Supervisor — um agente que orquestra e delega para workers e
  subagentes —, cuidados de escopo, custo e um exemplo em Python.
tags:
  - IA
  - agentes
  - LLM
  - design patterns
  - python
  - tech
---

Agora, o padrão de projeto que eu quero apresentar a vocês é o **Supervisor**. Ele nada mais é do que um conceito que já temos no nosso dia a dia.

Por exemplo, muitas vezes estamos trabalhando em uma equipe: temos um coordenador, um tech lead, um programador júnior, um pleno, um sênior — ou uma equipe mista, com desenvolvedores front-end, desenvolvedores mobile e afins. Partindo do princípio de que temos uma demanda, esse supervisor vai organizar e delegar as atividades para que cada um seja capaz de executar a sua parte. Ele não vai necessariamente ser o executor — ele vai ser um coordenador, que delega cada etapa do processo para cada um dos membros da equipe.

Quando falamos do padrão Supervisor, temos exatamente a mesma coisa. Esse agente supervisor vai delegar atividades para workers menores — ou, no caso, para subagentes — desenvolverem e entregarem os seus resultados.

## Delegando atividades: o exemplo do app de passeio de cães

Imagine, por exemplo, que estivéssemos criando uma aplicação para passeio de cães. Essa aplicação vai ter tanto a versão web quanto a versão mobile. Não podemos ter um único codebase para elas. Por quê? Se eu vou fazer a entrega desse projeto, no mínimo preciso ter um backend, um front-end e um mobile.

Nesse caso, o supervisor vai, por exemplo, delegar as atividades para o backend:

> "Crie os endpoints e as APIs necessárias para integração com o front-end e com a aplicação mobile."

Para o front-end:

> "Desenvolva as telas e crie as integrações utilizando, por exemplo, React ou Vue.js, levando em consideração os endpoints documentados aqui."

E, por exemplo, na aplicação híbrida — vamos supor que estejamos usando Flutter:

> "Você, como engenheiro de software com experiência em desenvolvimento de aplicações mobile híbridas utilizando Flutter, deve se integrar a esses endpoints, levando em consideração os padrões de tela que foram desenvolvidos aqui."

Não sei se você percebe: o supervisor, aqui, não está necessariamente codificando nada disso — ele está delegando as atividades. Então, claro que muitas vezes precisamos ter um workflow de execução para isso. Ele sabe, por exemplo, que o backend precisa ter, no mínimo, os endpoints mockados antes de começar o desenvolvimento mobile ou o desenvolvimento do front-end — porque, senão, as aplicações não conseguem saber quais são os tipos de contrato.

O supervisor nada mais é do que quem também vai definir como será essa execução — qual é o fluxo de execução.

## O supervisor deve orquestrar, não codificar

Aqui precisamos tomar alguns cuidados. Primeiro, o supervisor sempre tem que ser o orquestrador. Ele não pode ser quem também tem superpoderes — que também codifica, que também faz uma integração na API. Ele não deve fazer isso. Ele deve ser quem delega essas atividades.

## Múltiplos modelos, múltiplos custos

Uma coisa interessante aqui é que você não precisa, necessariamente, trabalhar com um único modelo, um único tipo de LLM. Você pode trabalhar com diferentes modelos — mais baratos, mais caros — por exemplo, Codex, Claude, Gemini e por aí em diante. No final das contas, você consegue, de certa forma, buscar uma economia para essas implementações.

O que é importante ressaltar aqui? Esse é um padrão de projeto que, na minha percepção, não é tão rápido em execução. E outra coisa: ele acaba sendo um pouco mais custoso na maioria das implementações. Por quê? Porque envolve mais interações — você está quebrando um problema grande em partes menores e distribuindo a execução para diferentes agentes.

## Escopo enxuto e o risco de alucinações

Uma coisa importante é manter o escopo bem enxuto e bem claro sobre o que precisa ser feito. Quando você estiver montando a estrutura dos seus agentes, subagentes, workers e afins, precisa mantê-los, de certa forma, com um contexto bem limitado. Por quê? Porque quanto mais você abre o contexto, mais acaba exigindo da LLM com a qual está trabalhando. Algumas LLMs têm uma janela de contexto menor, e deixar um escopo aberto, além de gerar imprecisões, pode começar a produzir alucinações nos seus elementos.

Por exemplo, quando você usa a mesma sessão, a mesma janela de contexto, para desenvolver uma feature trabalhando em diversas coisas ao mesmo tempo, é muito comum ver alucinações. Já com uma janela de contexto menor e mais enxuta, você consegue ver as coisas de forma mais clara, com um resultado melhor do que teria, por exemplo, trabalhando em uma janela de contexto mais aberta.

## Código de exemplo

Bom, vou deixar o código aqui também. Espero que vocês gostem e consigam, de fato, entender um pouco do que está acontecendo. Novamente, esse é mais um material que estou compartilhando com base nos meus estudos aqui na Data Science Academy. Não sei se você já conhece; se não conhece, recomendo mais uma vez.

```python
import os
from unittest import result

from openai import OpenAI
import json

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

def worker_pesquisa(tarefa: str) -> str :
    """Worker que faz pesquisa de informação"""
    resp = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "Você é pesquisador. Busque informações relevantes e factuais."},
            {"role": "user", "content": tarefa},
        ],
    )
    return resp.choices[0].message.content or ""

def worker_analise(tarefa: str) -> str :
    """Worker que faz análise técnica"""
    resp = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "Você é um analista Senior. Interprete dados com rigor tecnico"},
            {"role": "user", "content": tarefa},
        ]
    )

    return resp.choices[0].message.content or ""

def worker_redacao(tarefa: str) -> str :
    """Worker que produz texto final em formato apropriado"""
    resp = client.chat.completions.create(
        model="gpt-5",
        messages=[
            {"role": "system", "content": "Você é um redator técnico. Produza texto claro e bem estruturado"},
            {"role": "user", "content": tarefa}
        ]
    )

    return resp.choices[0].message.content or ""


WORKERS = {
    "pesquisa": worker_pesquisa,
    "analise": worker_analise,
    "redacao" : worker_redacao
}

def supervisor(objetivo: str, historico: list) -> dict:
    prompt = f"""
    Você é o supervisor de uma equipe de agentes.
    Workers disponiveis: pesquisa, analise, redacao
    
    Objetivo: {objetivo}
    Historico de execução : 
    {json.dumps(historico, ensure_ascii=False, indent=2)}
    
    Retorne JSON : 
    - "proximo_worker": "pesquisa" | "analise" | "redacao" | "FIM"
    - "tarefa": instrução clara para o worker (vazio se FIM)
    - "justificativa": por que escolheu este worker
    """

    resp = client.chat.completions.create(
        model="gpt-5-mini",
        messages=[{"role": "system", "content": prompt}],
        response_format={"type": "json_object"}
    )

    return json.loads(resp.choices[0].message.content or "{}")

# Sistema de orquestração
def sistema_supervisionado(objetivo: str, max_passos: int = 8) -> list:
    historico = []
    for passo in range(max_passos):
        decisao = supervisor(objetivo, historico)
        print(f"Passo {passo + 1}: {decisao['justificativa']}")
        if decisao["proximo_worker"] == "FIM":
            break

        worker_fn = WORKERS.get(decisao["proximo_worker"])
        if worker_fn is None:
            raise ValueError(f"Worker inválido: {decisao['proximo_worker']}")

        resultado = worker_fn(decisao["tarefa"])
        historico.append({
            "worker": decisao["proximo_worker"],
            "tarefa": decisao["tarefa"],
            "resultado": resultado
        })
    return historico

if __name__ == '__main__':
    resultado = sistema_supervisionado(
        "Produzir um briefing executivo sobre tendencias em LLMs em 2026"
    )

    for passo in resultado:
        print(f"\n[{passo['worker']}] {passo['resultado'][:200]}...")
```

E vamos ver mais coisas daqui por diante. Um grande abraço.
