/**
 * Gera as fontes WOFF2 do projeto a partir dos .otf originais.
 *
 * As fontes da marca vêm em OpenType completo (~250 KB cada, mais de mil
 * glifos). O quiz é só em português e usa um punhado de caracteres, então
 * cada face é reduzida ao conjunto abaixo e recomprimida em WOFF2.
 *
 *   node scripts/build-fonts.mjs
 *
 * Os .otf ficam em `src/fonts/originais/` e não são publicados; o `fonts.css`
 * aponta para os .woff2 gerados ao lado dele. Rode de novo se trocar de fonte
 * ou precisar de caracteres fora do conjunto.
 */
import fs from 'node:fs'
import path from 'node:path'
import subsetFont from 'subset-font'

const SOURCE_DIR = 'src/fonts/originais'
const OUTPUT_DIR = 'src/fonts'

/** As cinco faces declaradas em fonts.css. */
const FACES = [
  'AktivGrotesk-Light',
  'AktivGrotesk-LightItalic',
  'AktivGrotesk-Regular',
  'AktivGrotesk-Bold',
  'AktivGrotesk-XBold',
]

const range = (from, to) =>
  Array.from({ length: to.codePointAt(0) - from.codePointAt(0) + 1 }, (_, i) =>
    String.fromCodePoint(from.codePointAt(0) + i),
  ).join('')

/*
 * Conjunto de caracteres mantido. É maior que os 81 que o quiz renderiza hoje,
 * de propósito: editar um texto não pode exigir regerar as fontes. Cobre o
 * ASCII imprimível, a acentuação do português e a pontuação tipográfica.
 */
const CHARSET = [
  range(' ', '~'),
  'áàâãéêíóôõúüçÁÀÂÃÉÊÍÓÔÕÚÜÇ',
  'ºª°–—…“”‘’«»§¶†‡•™®©×÷±≤≥≠',
].join('')

fs.mkdirSync(OUTPUT_DIR, { recursive: true })

let totalBefore = 0
let totalAfter = 0

for (const face of FACES) {
  const source = path.join(SOURCE_DIR, `${face}.otf`)
  const target = path.join(OUTPUT_DIR, `${face}.woff2`)

  const original = fs.readFileSync(source)
  const subset = await subsetFont(original, CHARSET, { targetFormat: 'woff2' })
  fs.writeFileSync(target, subset)

  totalBefore += original.length
  totalAfter += subset.length
  const kb = (n) => (n / 1024).toFixed(0).padStart(4)
  const saved = (100 - (subset.length / original.length) * 100).toFixed(1)
  console.log(`  ${face.padEnd(26)} ${kb(original.length)} KB -> ${kb(subset.length)} KB  (-${saved}%)`)
}

const kb = (n) => (n / 1024).toFixed(0)
console.log(
  `\n  total ${kb(totalBefore)} KB -> ${kb(totalAfter)} KB ` +
    `(-${(100 - (totalAfter / totalBefore) * 100).toFixed(1)}%)`,
)
console.log(`  ${CHARSET.length} caracteres no subset`)
