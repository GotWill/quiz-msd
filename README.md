# Autoavaliação — Dia Mundial do Combate ao Diabetes

Quiz de 4 perguntas para totem: as respostas somam de 0 a 8 pontos e levam a
uma de três telas de resultado por faixa de risco (FINDRISC adaptado).

Site estático puro — HTML, CSS e JavaScript, sem dependências, sem build e sem
Node. **Para rodar, abra o `index.html`.** Duplo clique no arquivo basta; se
preferir servir por HTTP, qualquer servidor estático apontado para a raiz do
projeto funciona igual.

## Fluxo

```
boas-vindas → 4 perguntas → "Calculando..." → resultado → obrigado ↺
```

Responder uma pergunta registra os pontos da alternativa (A = 0, B = 1, C = 2)
e avança. "Refazer" na última tela zera a pontuação — no totem, a pessoa
seguinte não pode herdar as respostas de quem veio antes.

## Estrutura

```
index.html          carrega os CSS e os JS, nesta ordem
assets/screens/     as 10 artes exportadas do Figma
fonts/              Aktiv Grotesk, 5 faces em .woff2
css/
  fonts.css         @font-face
  app.css           bases, palco e uma seção por tela, na ordem do fluxo
js/
  dom.js            helper el() para montar os nós
  data/             questions.js, results.js, references.js — só conteúdo
  screens/          uma função por tela, devolvendo um nó de DOM
  stage.js          escala do palco e troca de tela
  app.js            a sequência de etapas e a navegação
```

Os arquivos de `js/` são **scripts clássicos**, não módulos ES: cada um declara
no escopo global o que o próximo usa, e a ordem das tags `<script>` no
`index.html` é o que faz as peças se encontrarem. É essa escolha que permite
abrir o projeto direto do disco — `import`/`export` exigiriam servir por
`http://`.

## O palco

Todo o layout é escrito nos pixels do frame do Figma (1620x2160). O
`.stage` tem exatamente esse tamanho e `js/stage.js` calcula a escala que o faz
caber inteiro na viewport, gravando-a na variável CSS `--stage-scale`. Por isso
as coordenadas nos arquivos de tela são literalmente as do design, e a peça fica
proporcionalmente idêntica em qualquer resolução.

Consequência prática: para mexer na posição de um texto, pegue a medida no
Figma e escreva-a como está — não há conversão no caminho.

## Conteúdo

Texto, quebras de linha e pontuação vivem em `js/data/`, separados das telas:

- `questions.js` — as 4 perguntas e suas alternativas. `lines` reproduz as
  quebras exatas da arte, e `\n` num rótulo marca uma quebra obrigatória.
- `results.js` — as 3 faixas de risco e `resultForScore()`, que traduz o total
  em uma tela.
- `references.js` — a bibliografia listada na tela final.

Os formatos estão descritos em JSDoc no topo de cada arquivo, o que dá
autocompletar e checagem no editor sem precisar de compilação.

## Fontes

As `.woff2` em `fonts/` são subsets: as faces originais da marca vêm em
OpenType completo e foram reduzidas ao conjunto de caracteres do português
(1.243 KB → 79 KB). Para trocar de fonte, ou precisar de um caractere fora do
subset, os `.otf` originais e o script que gerava os `.woff2`
(`scripts/build-fonts.mjs`, com `subset-font`) estão no commit `6c8e0a8`.

## Histórico

Este projeto foi uma aplicação React + Vite + TypeScript até o commit
`6c8e0a8`, e foi reconstruído em HTML/CSS/JS puros sem mudança visual: o quiz
não tem rotas, servidor, persistência nem formulário, então o build e as
dependências custavam mais do que entregavam. A versão React continua
recuperável nesse commit.
