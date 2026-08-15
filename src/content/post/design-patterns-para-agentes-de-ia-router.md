---
title: 'Design Patterns para Agentes de IA: Router'
pubDatetime: 2026-08-15T00:00:00.000Z
description: >-
  Quarto artigo da série sobre design patterns para agentes de IA. Explico o
  padrão Router — direcionando cada solicitação para o modelo mais adequado
  ao seu nível de complexidade —, economia de custo, fallback e um exemplo
  em Python.
tags:
  - IA
  - agentes
  - LLM
  - design patterns
  - python
  - tech
---

Fala, pessoal, tudo bem? Bom, o padrão de projeto que eu quero apresentar a vocês hoje é o padrão **Router**. Ele não é necessariamente um padrão extremamente complexo, mas envolve algumas etapas.

Dado que uma pessoa ou uma aplicação interaja com a gente, imagine que a primeira coisa que esse agente vai fazer é identificar o nível de complexidade da ação que precisa ser realizada.

Imagine o seguinte: um usuário entra em contato com esse agente, a princípio, para pedir informações a respeito da matrícula dele. Ele possivelmente vai fazer um acesso a um RAG e buscar algo vinculado à matrícula da pessoa. Imagine que o usuário pergunte: *"Após quanto tempo a minha matrícula estará ativa?"*. Ele vai lá e busca, dentro do embedding, informações a respeito da matrícula dele; encontra uma resposta que atenda aos requisitos do usuário e traz a ele a resposta mais apropriada.

Percebe que isso não envolve grandes complexidades, grandes etapas, nem nada do tipo — uma única consulta. Não necessariamente você vai precisar de um modelo extremamente potente para fazer isso.

## Como o Router decide para onde enviar a chamada

É justamente nessa etapa que o Router entra: assim que ocorrem as primeiras interações, seja de um usuário ou de uma aplicação, ele entende o nível de complexidade daquilo e escolhe, dentro do escopo dele, os modelos disponíveis que melhor atenderiam à solicitação do usuário. Fazendo o quê? Passando essa chamada para um worker que tenha a capacidade, por exemplo, de executar essa atividade.

Então imagine: ele queria fazer só uma consulta. Ele vai bater, pela primeira vez, nesse Router. Esse agente vai buscar internamente qual é o nível de complexidade e vai ver, por exemplo, o modelo mais apropriado para dar aquela resposta. Em seguida, ele seleciona o modelo e delega ao worker o uso desse modelo para processar aquela entrada — ou, no caso, aquela interação com o usuário.

## Por que isso gera economia, não custo extra

Se você está pensando: "Ah, mas isso pode ficar custoso, porque eu sempre vou acabar fazendo mais de uma chamada à minha LLM" — eu garanto a você que, no final das contas, vai ter uma economia.

Por quê? Imagine que você estivesse trabalhando com o modelo Claude Opus, que tem capacidade de processar um grande volume de contexto. Sem o Router, toda requisição chegaria e seria delegada justamente para esse modelo — mesmo sendo uma consulta simples. Um modelo Flash, por exemplo, já daria conta desse tipo de trabalho. Ou um Sonnet, ou um modelo mais minimalista, conseguiria trabalhar bem com a estrutura e a documentação RAG que você possui. E isso é só um exemplo.

## Combinando padrões: peças de um quebra-cabeça

Um ponto importante que eu acho válido ressaltar para você que está lendo é que esses padrões que estão sendo apresentados podem ser combinados. Então, por exemplo, eu poderia ter um Router junto com um Supervisor, poderia ter um ReAct junto com um Supervisor, poderia ter um Reflection junto, por exemplo, com um Router, e assim por diante.

Todos esses padrões são como pecinhas de um quebra-cabeça. Quando você está montando um agente de IA, vai encontrando a melhor maneira de combiná-los para conseguir atender às necessidades dos seus usuários ou dos sistemas que venham a se integrar com você.

## Usando o Router como fallback

Mais uma coisa que eu gostaria de ressaltar é que, muitas vezes, você pode usar esses routers até como uma estrutura de fallback. Imagine: eu tentei fazer uma requisição para o meu Opus e ele está fora do ar. Eu posso ir para o Codex, posso ir para o GPT, posso ir para o DeepSeek — posso ir para diferentes modelos, sem precisar ficar preso a apenas um. Se, de repente, o custo por token estiver muito elevado, posso migrar para uma estrutura mais barata — um modelo chinês, por exemplo — que vai atender ao meu resultado.

Você percebe a maleabilidade que tem aqui? Você consegue ir de um ponto a outro. É isso.

## Código de exemplo

Vou deixar aqui também o código dessa integração — no caso, um exemplo de como desenvolver um agente nesse sentido. Espero que você consiga entender e compreender as limitações desse padrão.

```python
import json
import os

from openai import OpenAI

cliente = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)

ROTAS = {
    "modelo_pequeno": {"modelo": "gpt-5-mini", "descricao": "Perguntas factuais simples, resumos curtos, formatação.",
                       "custo_relativo": 1, },
    "modelo_grande": {"modelo": "gpt-5", "descricao": "Raciocínio complexo, análise técnica, código difícil.",
                      "custo_relativo": 15, },
    "modelo_codigo": {"modelo": "gpt-5", "descricao": "Geração e refatoração de código em Python.",
                      "custo_relativo": 10, },
    "rag": {"modelo": "pipeline-rag", "descricao": "Perguntas sobre documentos internos da empresa.",
            "custo_relativo": 5, },
}


def pipeline_rag(pergunta: str) -> str:
    return f"Resposta via RAG para : {pergunta}"


def router_llm(pergunta: str) -> str:
    descricao_rotas = "\n".join(
        f"-{nome}: {meta['descricao']}" for nome, meta in ROTAS.items()
    )

    prompt = f"""
    Analise a pergunta abaixo e decida a melhor rota.
    
    Rotas disponiveis: 
    {descricao_rotas}
    
    Pergunta: {pergunta}
    
    Return JSON: {{"rota": "nome_da_rota", "razao": "..." }}
    """

    resp = cliente.chat.completions.create(
        model="gpt-5-mini",
        messages=[{"role": "system", "content": prompt}],
        response_format={"type": "json_object"}
    )

    rota = json.loads(resp.choices[0].message.content or "{}").get("rota")
    if rota not in ROTAS:
        return "modelo_pequeno"

    return rota


def executar_com_router(pergunta: str) -> str:
    rota = router_llm(pergunta)
    print(f"Pergunta roteada para : {rota}")

    if rota == "rag":
        return pipeline_rag(pergunta)

    modelo = ROTAS[rota]["modelo"]
    resp = cliente.chat.completions.create(
        model=modelo,
        messages=[{"role": "user", "content": pergunta}]
    )

    return resp.choices[0].message.content or ""


if __name__ == '__main__':
    print(executar_com_router("Qual a capital da França?"))
    print(executar_com_router("Refatore esta classe Python para usar async/await"))
    print(executar_com_router("Quanto faturamos no Q3 segundo nosso ERP?"))
```
