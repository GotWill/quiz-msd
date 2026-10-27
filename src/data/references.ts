/**
 * Referências bibliográficas citadas nas telas de resultado (as chamadas
 * "1-3") e listadas por extenso na tela final.
 *
 * O bloco é um texto corrido e justificado: ao contrário das outras telas,
 * as quebras caem naturalmente dentro da largura da caixa, então aqui só o
 * destaque de cada trecho é descrito. `bold` numera as referências e
 * `italic` marca o nome do periódico.
 */
export interface ReferencePart {
  text: string
  bold?: boolean
  italic?: boolean
}

export const REFERENCES: ReferencePart[] = [
  { text: 'Referências: 1.', bold: true },
  {
    text:
      ' Conceição ALO, Corrêa NC, Ferreira PR et al. Translation,' +
      ' cross-cultural adaptation and validation of the Finnish Diabetes Risk' +
      ' Score (FINDRISC) for use in Brazilian Portuguese: questionnaire' +
      ' validity study. ',
  },
  { text: 'Sao Paulo Med J', italic: true },
  { text: '. 2020;138(3):244-52. ' },
  { text: '2. ', bold: true },
  {
    text:
      'Rodacki M, Zajdenverg L, da Silva Júnior WS et al. Brazilian guideline' +
      ' for screening and diagnosis of type 2 diabetes: a position statement' +
      ' from the Brazilian Diabetes Society. ',
  },
  { text: 'Diabetol Metab Syndr', italic: true },
  { text: '. 2025;17:78. ' },
  { text: '3.', bold: true },
  {
    text:
      ' American Diabetes Association Professional Practice Committee.' +
      ' 2. Diagnosis and Classification of Diabetes: Standards of Care in' +
      ' Diabetes—2026. ',
  },
  { text: 'Diabetes Care', italic: true },
  { text: '. 2026;49(Suppl 1):S27-S49. ' },
]
