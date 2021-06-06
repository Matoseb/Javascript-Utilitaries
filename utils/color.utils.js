// not working in safari
export function cssDuoTone(color1, color2) {
  color1 = new color(color1).rgbNormalized
  color2 = new color(color2).rgbNormalized

  const filter = `<svg xmlns="http://www.w3.org/2000/svg" width="10px" height="10px">
    <filter id="duotone">
        <!-- Grab the SourceGraphic (implicit) and convert it to grayscale -->
        <feColorMatrix type="matrix" values=".33 .33 .33 0 0
              .33 .33 .33 0 0
              .33 .33 .33 0 0
              0 0 0 1 0">
        </feColorMatrix>

        <!-- Map the grayscale result to the gradient map provided in tableValues -->
        <feComponentTransfer color-interpolation-filters="sRGB">
            <feFuncR type="table" tableValues="${color1.r}  ${color2.r}"></feFuncR>
            <feFuncG type="table" tableValues="${color1.g}  ${color2.g}"></feFuncG>
            <feFuncB type="table" tableValues="${color1.b}  ${color2.b}"></feFuncB>
        </feComponentTransfer>
    </filter>
</svg>#duotone`

  return `url('data:image/svg+xml,${encodeURI(filter)}')`
}

export class color {
  constructor(color) {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')

    canvas.width = canvas.height = 1
    ctx.fillStyle = color
    ctx.fillRect(0, 0, 1, 1)

    const [r, g, b, a] = ctx.getImageData(0, 0, 1, 1).data

    Object.assign(this, { r, g, b, a })
  }
  get rgbNormalized() {
    return {
      r: this.r / 255,
      g: this.g / 255,
      b: this.b / 255,
      a: this.a / 255,
    }
  }
  get rgbString() {
    return `rgba(${[this.r, this.g, this.b, this.a / 255]})`
  }
}
