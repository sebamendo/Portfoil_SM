class GraficoCircular extends HTMLElement {
  attrs = {
    color: "#000",
    stroke: "20",
    value: "0",
    width: "150",
    transition: "1",
  };

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.getAttributes();
    this.style();
    this.render();
  }

  getAttributes() {
    Array.from(this.attributes).map((a) => {
      this.attrs[a.name] = a.value === "" ? true : a.value;
    });
  }

  style() {
    this.shadowRoot.innerHTML = `
      <style>
        @keyframes rellenar{
          to{
            stroke-dasharray: ${this.attrs.value} 100;
          }
        }

        div{
          position:relative;
          width: ${this.attrs.width}px;
        }
        div span{
          position: absolute;
          top: 0%;
          left: 0%;
          bottom: 0%;
          right: 0%;
          display: flex;
          align-items: center;
          justify-content: center;
          font: 25px/1em Verdana;
        }

        circle{
          fill: none;
          stroke-width: ${this.attrs.stroke};
          transform: rotate(-90deg);
          transform-origin: 50%;
          stroke-dasharray: 100 100;
          stroke: #AAA;
        }
        circle:nth-child(2){ 
          stroke: ${this.attrs.color};
          stroke-dasharray: 0 100;
          animation: rellenar ${this.attrs.transition}s linear forwards;
        }
      </style>
    `;
  }

  render() {
    const _w = this.attrs.width;
    const _s = this.attrs.stroke;
    const _v = this.attrs.value;
    this.shadowRoot.innerHTML += `
    <div>
      <svg width="${_w}" height="${_w}">
        <circle r="${(_w - _s) / 2}" cx="50%" cy="50%" pathlength="100" />
        <circle r="${(_w - _s) / 2}" cx="50%" cy="50%" pathlength="100" />
      </svg>
      <span>${_v}%</span>
    </div>
    `;
  }
}

customElements.define("grafico-circular", GraficoCircular);
