function captureDom(
  element,
  { margin = 0, pixelDensity = globalThis.devicePixelRatio } = {}
) {
  const m = []

  if (typeof margin === 'number') margin = [margin]

  for (let i = 0; i < 4; i++) {
    m[i] = margin[i % margin.length]
  }

  const container = document.createElement('div')
  container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <foreignObject width="100%" height="100%">
            </foreignObject>
        </svg>`

  const svg = container.firstElementChild
  let target = element.cloneNode(true)
  let { width, height } = element.getBoundingClientRect()

  height += m[0] + m[2]
  width += m[1] + m[3]

  svg.setAttribute('viewBox', `${-m[3]} ${-m[0]} ${width} ${height}`)

  width *= pixelDensity
  height *= pixelDensity

  svg.style.cssText = `width: ${width}px; height: ${height}px;`
  const foreign = svg.querySelector('foreignObject')
  foreign.appendChild(target)

  injectCssRule(element, svg)
  imgToDataURL(element, svg)
  canvasToDataURL(element, svg)

  target = foreign.firstElementChild

  target.setAttribute('xmlns', 'http://www.w3.org/1999/xhtml')
  target.style.top = `${m[0]}px`
  target.style.left = `${m[1]}px`

  draw(svg.outerHTML, width, height).then((url) => {
    download(url, target.className.replace(/ /g, '_'))
  })

  function injectCssRule(dom, destination) {
    const rules = css(dom).join(''),
      style = document.createElement('style')
    style.innerHTML = rules
    destination.appendChild(style)
    return style
  }

  function css(el) {
    const sheets = document.styleSheets,
      rules = []
    el.matches =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector ||
      el.oMatchesSelector

    Array.from(sheets).forEach((sheet) => {
      Array.from(sheet.rules).forEach((rule) => {
        // if (el.matches(rules[r].selectorText))
        rules.push(rule.cssText)
      })
    })
    return rules
  }

  function draw(svg, width, height) {
    return new Promise((resolve) => {
      const canvas = document.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        tempImg = document.createElement('img')

      canvas.width = width
      canvas.height = height

      tempImg.addEventListener('load', (e) => {
        ctx.drawImage(e.target, 0, 0)
        resolve(canvas.toDataURL())
      })

      svg = svg.replaceAll(/(<img[^>]+)>/g, '$1 ></img>')

      tempImg.src = `data:image/svg+xml,${encodeURIComponent(svg)}`
      console.log(tempImg.src)
    })
  }

  function imgToDataURL(dom, destination) {
    const { originals, clones } = getClones(dom, destination, 'img')
    const sources = {}
    originals.forEach((img, i) => {
      const img2 = clones[i]
      const src = img.src
      if (!(src in sources)) sources[src] = getDataUrl(img)

      img2.src = sources[src]
    })
  }

  function getClones(dom, destination, selector) {
    const originals = [...dom.querySelectorAll(selector)]
    if (dom.matches(selector)) originals.unshift(dom)
    const clones = [...destination.querySelectorAll(selector)]
    return { originals, clones }
  }

  function canvasToDataURL(dom, destination) {
    const { originals, clones } = getClones(dom, destination, 'canvas')

    originals.forEach((canvas, i) => {
      const img2 = new Image()
      cloneAttributes(img2, canvas)

      img2.src = canvas.toDataURL()
      const canvas2 = clones[i]

      canvas2.parentNode.replaceChild(img2, canvas2)
    })
  }

  function cloneAttributes(target, source) {
    ;[...source.attributes].forEach((attr) => {
      target.setAttribute(attr.nodeName, attr.nodeValue)
    })
  }

  function getDataUrl(img) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)
    return canvas.toDataURL()
  }

  function download(src, name) {
    const link = document.createElement('a')
    link.href = src
    link.download = `${name}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }
}
