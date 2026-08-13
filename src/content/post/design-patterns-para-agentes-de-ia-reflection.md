---
title: 'Design Patterns para Agentes de IA: Reflection'
pubDatetime: 2026-08-13T00:00:00.000Z
description: >-
  Primeiro artigo de uma série sobre design patterns para agentes de IA.
  Explico o padrão Reflection — como um agente pode refletir, avaliar e
  refinar sua própria resposta — com exemplo prático em Python.
tags:
  - IA
  - agentes
  - LLM
  - design patterns
  - python
  - tech
---

Comecei recentemente uma série de estudos sobre alguns padrões que podemos aplicar na construção de agentes de IA. Ao longo dessa série de artigos, vou abordar diversos design patterns, como **Reflection**, **Planning**, **Supervisor**, **Router**, **ReAct** e **Multi-Agent**.

O primeiro padrão que escolhi apresentar é o **Reflection**.

Ao contrário do que muitos programadores podem imaginar, Reflection aqui não se refere ao conceito de reflexão utilizado em linguagens de programação para acessar dinamicamente propriedades, métodos ou classes. Nesse contexto, Reflection significa refletir, avaliar e melhorar uma resposta.

A ideia é relativamente simples: você gera uma primeira resposta, que não precisa estar perfeita, e então permite que o próprio modelo a refine ao longo de algumas iterações.

Uma estratégia bastante interessante é utilizar um modelo mais barato para produzir a primeira resposta e, posteriormente, utilizar modelos mais avançados — e consequentemente mais caros — para refiná-la.

Esse padrão costuma produzir resultados muito interessantes, mas também possui algumas armadilhas. A principal delas é não definir um limite para a quantidade de iterações. Lembre-se de que créditos e tokens não são infinitos. Se você permitir que o agente continue refinando indefinidamente, o custo pode crescer rapidamente.

No exemplo que vou deixar disponível junto com o código, fiz uma pergunta simples pedindo que o modelo explicasse o que é RAG. Em uma execução ele realizou duas iterações, em outra apenas uma e, em outra, voltou a fazer duas. Esse comportamento pode variar naturalmente.

Vale lembrar que, quanto melhor forem os seus prompts, maior tende a ser a qualidade da resposta inicial e, consequentemente, menor a necessidade de refinamentos posteriores.

## Como o fluxo funciona

O fluxo desse padrão costuma funcionar da seguinte maneira:

1. Na primeira interação, o modelo gera uma resposta para a pergunta do usuário.
2. Nas interações seguintes, ele recebe a pergunta original juntamente com a resposta já produzida e passa a analisá-la criticamente.
3. O modelo identifica pontos que podem ser melhorados, sugere alterações, corrige inconsistências e produz uma nova versão da resposta.
4. Esse processo pode se repetir até atingir um número máximo de iterações previamente definido.

## Um exemplo prático

Imagine, por exemplo, uma API de um e-commerce. Um cliente pergunta: *"Qual é a melhor televisão disponível hoje?"*

Na primeira etapa, seu agente pode consultar os produtos disponíveis e gerar uma resposta inicial. Em seguida, outra etapa do fluxo pode analisar avaliações dos clientes, quantidade de estrelas, comentários recentes e até informações adicionais sobre os produtos.

Com base nesses dados, o agente refina a resposta inicial e entrega uma recomendação muito mais completa e confiável ao usuário.

Esse refinamento pode acontecer em diversas camadas. Uma etapa pode melhorar a precisão técnica da resposta. Outra pode deixá-la mais clara e objetiva. Uma terceira pode reorganizar o conteúdo em tópicos, adicionar exemplos ou destacar pontos importantes. O objetivo é que cada iteração agregue valor à resposta anterior.

Esse padrão também funciona muito bem em agentes voltados para redação. Se você gosta de escrever artigos, por exemplo, pode criar um agente que revise continuamente seus textos, sugerindo melhorias de clareza, organização, gramática e argumentação.

## Desafios e limites

Naturalmente, esse modelo também possui alguns desafios. Como são realizadas várias chamadas ao modelo, cada solicitação tende a ser mais cara do que uma resposta tradicional. Além disso, dependendo da janela de contexto utilizada, o consumo de tokens pode aumentar significativamente.

Por isso, é importante definir alguns limites para a arquitetura:

- estabelecer um número máximo de iterações;
- controlar o tamanho da resposta gerada em cada etapa;
- limitar a quantidade de contexto enviada ao modelo;
- definir um objetivo claro para o refinamento.

Esses cuidados ajudam a equilibrar qualidade, desempenho e custo.

## Código de exemplo

Esse foi o primeiro design pattern que eu gostaria de compartilhar com vocês. Vou deixar o código utilizado como exemplo para que vocês possam explorar a implementação com mais detalhes. O projeto foi desenvolvido em Python, mas esse padrão pode ser implementado em praticamente qualquer linguagem. Muitas delas já possuem bibliotecas que facilitam esse tipo de fluxo e, quando isso não acontece, nossa velha e boa API continua sendo uma excelente alternativa.

```python
import json
import os
from openai import OpenAI

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


def generate_initial_response(question: str) -> str:
    response = client.chat.completions.create(
        model="gpt-5.4-mini",
        messages=[
            {"role": "system", "content": "You are a senior data analyst"},
            {"role": "user", "content": question},
        ],
    )
    return response.choices[0].message.content or ""


def evaluate_response(question: str, current_response: str) -> dict:
    evaluation_prompt = f"""
    You are a senior technical reviewer. Analyze the answer below:
    
    Original Question: {question}
    Current Response: {current_response}
    
    Return in JSON: 
    - "approved" (true/false)
    - "problems" (a list of concerns about the answer)
    - "suggestions" (a list of suggestions to improve the answer)
    """

    response = client.chat.completions.create(
        model="gpt-5.5",
        messages=[{"role": "user", "content": evaluation_prompt}],
        response_format={"type": "json_object"},
    )

    return json.loads(response.choices[0].message.content or "{}")


def refine_response(question: str, current_response: str, evaluation: dict) -> str:
    refinement_prompt = f"""
    Some issues were raised regarding your response. Rewrite it, correcting all the issues pointed out. 
    
    Original Question: {question}    
    Current Response: {current_response}
    Problems: {evaluation.get('problems', [])}
    Suggestions: {evaluation.get('suggestions', [])}
    """

    response = client.chat.completions.create(
        model="gpt-5.5",
        messages=[{"role": "user", "content": refinement_prompt}],
    )

    return response.choices[0].message.content or ""


def run_reflection_agent(question: str, max_iterations: int = 3) -> str:
    current_response = generate_initial_response(question)

    for iteration in range(max_iterations):
        evaluation = evaluate_response(question, current_response)
        
        if evaluation.get("approved"):
            print(f"Approved at iteration {iteration + 1}")
            return current_response

        print(f"Refining at iteration {iteration + 1}")
        current_response = refine_response(question, current_response, evaluation)

    return current_response


if __name__ == "__main__":
    result = run_reflection_agent(
        "Explain the concept of RAG and give me some examples, but remember I'm a child"
    )
    print(result)
```

Um grande abraço e nos vemos no próximo artigo!
