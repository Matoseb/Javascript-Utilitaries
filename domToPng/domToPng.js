function captureDom(
  element,
  { margin = 0, pixelDensity = window.devicePixelRatio } = {}
) {
  const m = [];

  if (typeof margin === "number") margin = [margin];

  for (let i = 0; i < 4; i++) {
    m[i] = margin[i % margin.length];
  }

  const container = document.createElement("div");
  container.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg">
            <foreignObject width="100%" height="100%">
            </foreignObject>
        </svg>`;

  const svg = container.firstElementChild,
    dims = element.getBoundingClientRect(),
    target = element.cloneNode(true);

  dims.height += m[0] + m[2];
  dims.width += m[1] + m[3];

  svg.setAttribute("viewBox", `-${m[1]} -${m[0]} ${dims.width} ${dims.height}`);

  dims.width *= pixelDensity;
  dims.height *= pixelDensity;

  svg.style.cssText = `width: ${dims.width}px; height: ${dims.height}px;`;
  svg.querySelector("foreignObject").appendChild(target);

  target.setAttribute("xmlns", "http://www.w3.org/1999/xhtml");
  target.style.top = m[0] + "px";
  target.style.left = m[3] + "px";

  injectCssRule(element, svg);

  draw(svg.outerHTML, dims.width, dims.height).then((url) => {
    download(url, target.className.replace(/ /g, "_"));
  });

  function injectCssRule(dom, destination) {
    const rules = css(dom).join(""),
      style = document.createElement("style");
    style.innerHTML = rules;
    destination.appendChild(style);
    return style;
  }

  function css(el) {
    const sheets = document.styleSheets,
      ret = [];
    el.matches =
      el.matches ||
      el.webkitMatchesSelector ||
      el.mozMatchesSelector ||
      el.msMatchesSelector ||
      el.oMatchesSelector;
    for (var i in sheets) {
      var rules = sheets[i].rules || sheets[i].cssRules;
      for (var r in rules) {
        // if (el.matches(rules[r].selectorText)) {
        ret.push(rules[r].cssText);
        // }
      }
    }
    return ret;
  }

  function draw(svg, width, height) {
    return new Promise((resolve) => {
      const canvas = document.createElement("canvas"),
        ctx = canvas.getContext("2d"),
        tempImg = document.createElement("img");

      canvas.width = width;
      canvas.height = height;

      tempImg.addEventListener("load", (e) => {
        ctx.drawImage(e.target, 0, 0);
        resolve(canvas.toDataURL());
      });

      tempImg.src = "data:image/svg+xml," + encodeURIComponent(svg);
    });
  }

  function download(src, name) {
    const link = document.createElement("a");
    link.href = src;
    link.download = name + ".png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
}
