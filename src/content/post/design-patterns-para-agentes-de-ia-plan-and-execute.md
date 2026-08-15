---
title: 'Design Patterns para Agentes de IA: Plan and Execute'
pubDatetime: 2026-08-15T00:00:00.000Z
description: >-
  Segundo artigo da série sobre design patterns para agentes de IA. Explico o
  padrão Plan and Execute — planejador e executor separados —, sua relação
  com o Waterfall, custos, replanejamento e um exemplo em Python com Pydantic.
tags:
  - IA
  - agentes
  - LLM
  - design patterns
  - python
  - tech
---

Comecei a estudar o padrão de projeto **Plan and Execute**. É um padrão bastante intuitivo para muitos de nós, no qual simplesmente pensamos em todo o planejamento antes de executar as nossas atividades. Esse é um padrão que também conseguimos implementar dentro de um agente de IA.

E como fazemos isso? Temos duas etapas: o **planejador**, responsável por criar o plano, e o **executor**. Pensando em uma estrutura de workflow, quando o planejador termina o plano, o executor simplesmente o executa.

## Plan and Execute, ReAct e o velho Waterfall

Diferente do padrão **ReAct**, que é mais interativo — onde planejamento e execução andam praticamente em simbiose —, aqui vemos algo completamente diferente: uma etapa inicia e conclui de um lado, e depois inicia e termina do outro, do lado do executor.

Para quem já viveu ou tem experiência com o modelo **Waterfall** (cascata), a linha de raciocínio, para mim, não muda em absolutamente nada. Tínhamos os analistas, que faziam toda a análise e o planejamento da atividade, e depois era feita a implementação. Quais eram os problemas naquela época? Não sei se você vai se recordar, mas muitas vezes as coisas já tinham mudado, já tinham sido alteradas. Na minha percepção, aqui não é diferente.

Por quê? Porque você pode ter feito um planejamento muito extenso, cuja execução vai levar algum tempo até ser concluída — às vezes dias, às vezes horas, às vezes meses. Pare para pensar se você está trabalhando em uma equipe distribuída: muitas vezes eles ainda vão estar implementando, do lado deles, coisas que ainda não existem. E se você fosse basear toda a sua implementação no que encontrou na documentação da API de terceiros — no Swagger ou afins —, talvez aquilo não venha a ter um resultado tão positivo.

Mas eu, particularmente, acho esse padrão de projeto muito interessante pelo resultado que ele traz.

## Custos e cuidados

Quais são os pontos que considero importantes aqui? Vimos anteriormente o padrão **Reflection**. Nesse padrão, na minha percepção, o custo que ele pode gerar não é muito diferente.

Pensando da seguinte maneira: você tem um agente que faz o planejamento e te entrega o resultado — só que, ao mesmo tempo, você vai ter mais uma interação com a sua LLM. Uma vai planejar, enquanto a outra irá executar. Isso, dependendo do nível e da complexidade, muitas vezes vai exigir também uma LLM avaliadora (*adjudicator*) para validar o planejamento antes da execução. E, muitas vezes, você vai ter um executor usando um modelo mais caro.

Então, quer queiramos ou não, quando vamos trabalhar com padrões de agentes, precisamos ter cuidado, porque o custo, às vezes, pode fugir um pouco do nosso controle.

## Estrutura: ferramentas, subagentes e Pydantic

Indo para a estrutura: temos o planejador. Você também pode ter *tools* (ferramentas) ou integrações que a sua aplicação pode acionar — pode ser, por exemplo, uma chamada REST, ou uma interação com outro subagente. Isso já foge um pouco do escopo deste artigo, mas o que eu quero ressaltar é que os dois elementos principais sempre serão o planejador e o executor.

Vou deixar um código disponível para que vocês também possam ver a implementação na prática. Lembrando que boa parte desses materiais de estudo que estou trazendo também foi aprendida por mim durante o meu treinamento na DSA. Se você ainda não conhece, recomendo bastante — a Data Science Academy é uma instituição muito séria.

Um ponto importante aqui é que, na minha percepção, já precisamos começar a usar alguns elementos de mais alto nível do Python: validações de tipagem, criação de objetos e, muitas vezes, o uso do próprio **Pydantic** para entregar um resultado melhor.

## Replanejamento: quando o plano precisa mudar

E aqui entra um outro aspecto importante: às vezes os nossos planejamentos não dão certo. Não sei se você já passou por isso, mas eu já passei muitas vezes. E o que precisamos ter? Precisamos ter um mecanismo que consiga lidar com esses eventuais problemas — por exemplo, às vezes uma ferramenta está fora do ar, ou uma integração HTTP não está entregando o resultado que você gostaria.

Esse *replan* nada mais é do que um mecanismo que, na hora da execução do plano, identifica um erro. O executor identifica o erro e o envia para o replanejador, que atualiza o plano novamente. E assim o agente que está como executor realiza uma nova interação sobre a execução.

Isso pode ficar caro, ainda mais pensando em cenários em que você tem sistemas que não têm alta disponibilidade e que têm alguma chance de estar fora do ar.

Então, aqui eu acho que você já começa a perceber que um agente, no fundo, já tem a estrutura de uma aplicação moderna e distribuída, como já tínhamos antes. A diferença é que começamos a programar essa aplicação para que o agente seja mais autônomo e consiga interagir melhor.

## Código de exemplo

Bom, esse era o padrão que eu queria apresentar a vocês, e trazer também os meus pontos de vista a respeito dele. Espero que você goste. Vou deixar o código aqui também para que você possa ler e deixar os seus comentários.

```python
import os
import json
from typing import Any, Callable, Dict, List, Optional
from openai import OpenAI
from pydantic import BaseModel, Field

cliente = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


# --- Modelos de Domínio (Pydantic) ---

class Etapa(BaseModel):
    id: int
    descricao: str
    ferramenta: Optional[str] = None
    depende_de: List[int] = Field(default_factory=list)


class Plano(BaseModel):
    objetivo: str
    etapas: List[Etapa]


# --- Componentes Principais ---

def gerar_plano(objetivo: str, ferramentas_disponiveis: List[str]) -> Plano:
    """Planejador: Decompõe um objetivo em etapas executáveis e dependências."""
    prompt = f"""
    Decomponha o objetivo abaixo em etapas executáveis sequenciais.
    Use APENAS as ferramentas listadas. Identifique as dependências entre as etapas.

    Objetivo: {objetivo}
    Ferramentas disponíveis: {ferramentas_disponiveis}

    Retorne um JSON que corresponda ao esquema:
    {{
        "objetivo": "...",
        "etapas": [
            {{"id": 1, "descricao": "...", "ferramenta": "...", "depende_de": []}}
        ]
    }}
    """
    resposta = cliente.chat.completions.create(
        model="gpt-5",
        messages=[{"role": "user", "content": prompt}],
        response_format={"type": "json_object"},
    )
    return Plano(**json.loads(resposta.choices[0].message.content or "{}"))


def executar_etapa(
    etapa: Etapa, contexto: Dict[int, Any], ferramentas: Dict[str, Callable]
) -> str:
    """Executor: Executa uma etapa individual usando uma ferramenta determinística ou raciocínio de LLM."""
    if etapa.ferramenta and etapa.ferramenta in ferramentas:
        # Execução de ferramenta determinística
        resultado = ferramentas[etapa.ferramenta](etapa.descricao, contexto)
    else:
        # Execução de fallback com LLM quando nenhuma ferramenta é atribuída
        prompt = f"""
        Execute a etapa abaixo usando o contexto das etapas anteriores.
        Etapa: {etapa.descricao}
        Contexto acumulado: {contexto}
        """
        resposta = cliente.chat.completions.create(
            model="gpt-5",
            messages=[{"role": "user", "content": prompt}],
        )
        resultado = resposta.choices[0].message.content or ""

    return str(resultado)


def executar_plano(plano: Plano, ferramentas: Dict[str, Callable]) -> Dict[int, str]:
    """Orquestrador: Executa as etapas resolvendo a ordem de dependência (resolução topológica)."""
    resultados: Dict[int, str] = {}
    etapas_pendentes = list(plano.etapas)

    while etapas_pendentes:
        # Encontra etapas cujas dependências estão totalmente resolvidas
        etapas_prontas = [
            etapa
            for etapa in etapas_pendentes
            if all(dep in resultados for dep in etapa.depende_de)
        ]

        if not etapas_prontas:
            raise RuntimeError("Dependência circular detectada no grafo de execução do plano.")

        for etapa in etapas_prontas:
            print(f"Executando etapa {etapa.id}: {etapa.descricao}")
            contexto_etapa = {dep: resultados[dep] for dep in etapa.depende_de}
            resultados[etapa.id] = executar_etapa(etapa, contexto_etapa, ferramentas)
            etapas_pendentes.remove(etapa)

    return resultados


# --- Implementações das Ferramentas ---

def calculadora_segura(expressao: str, _contexto: dict) -> str:
    """Avalia com segurança expressões aritméticas básicas."""
    caracteres_permitidos = set("0123456789+-*/(). ")
    if not all(char in caracteres_permitidos for char in expressao):
        return "Erro: A expressão contém caracteres proibidos."
    try:
        return str(eval(expressao, {"__builtins__": {}}, {}))
    except Exception as exc:
        return f"Erro de cálculo: {exc}"


# --- Ponto de Entrada ---

if __name__ == "__main__":
    ferramentas = {
        "pesquisa_web": lambda q, ctx: "...resultados da pesquisa...",
        "calcular": calculadora_segura,
        "consultar_bd": lambda q, ctx: "...registros do banco de dados...",
    }

    plano = gerar_plano(
        objetivo="Analisar as vendas do terceiro trimestre e gerar um relatório executivo",
        ferramentas_disponiveis=list(ferramentas.keys()),
    )

    resultados_execucao = executar_plano(plano, ferramentas)
    print("\nExecução Concluída:")
    print(json.dumps(resultados_execucao, indent=2))
```

Um grande abraço.
