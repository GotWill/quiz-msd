/**
 * Helper mínimo para montar DOM sem engasgar na verbosidade de
 * `document.createElement` + `setAttribute` + `appendChild`.
 *
 *   el('p', { className: 'welcome__lead' }, 'Nem todo alerta faz barulho.')
 *
 * Em `props`, `className` e os handlers (`onclick`) são propriedades do nó e
 * `style` é um objeto de propriedades CSS; qualquer outra chave vira atributo
 * (`id`, `type`, `src`, `role`, `aria-*`). Um valor `undefined` é ignorado, o
 * que deixa medidas opcionais caírem no padrão do CSS sem precisar de
 * condicional na chamada.
 *
 * Os filhos podem ser nós, textos, números ou listas deles; `null`,
 * `undefined` e `false` são descartados, para `condição && el(...)` funcionar
 * direto na lista de argumentos.
 */
function el(tag, props, ...children) {
  const node = document.createElement(tag)

  for (const [key, value] of Object.entries(props || {})) {
    if (value === undefined) continue

    if (key === 'style') {
      /* Também por propriedade: uma medida `undefined` no objeto de estilo é
         uma medida que o CSS já define, não um valor a escrever. */
      for (const [name, measure] of Object.entries(value)) {
        if (measure !== undefined) node.style[name] = measure
      }
    }
    else if (key === 'className' || key.startsWith('on')) node[key] = value
    else node.setAttribute(key, value)
  }

  append(node, children)
  return node
}

/** Anexa um filho ou uma lista aninhada deles, achatando pelo caminho. */
function append(node, child) {
  if (child === null || child === undefined || child === false) return

  if (Array.isArray(child)) {
    for (const item of child) append(node, item)
    return
  }

  node.append(child)
}

/** Medida opcional da arte: quando ausente, vale o padrão do CSS. */
function px(value) {
  return value === undefined ? undefined : `${value}px`
}
