export default class GoBoard extends HTMLElement {

  #defaultSize = 19;
  #svg;
  #board;
  #marks;
  #stars;

  constructor() {
    super();

    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --board-color: #e3b85e;
          --board-border-color: #000;
          --board-marks-color: #000;
          --board-padding: 0.75;
          --board-border-width: 0.025;
          --board-grid-width: 0.025;
          --board-star-radius: 0.075;
        }
        rect {
          fill: var(--board-color);
          stroke: var(--board-border-color);
          stroke-width: var(--board-border-width);
        }
        path {
          stroke: var(--board-marks-color);
          stroke-width: var(--board-grid-width);
          stroke-linecap: square;
        }
        #stars circle {
          r: var(--board-star-radius);
          fill: var(--board-marks-color);
        }
      </style>
      <svg xmlns="http://www.w3.org/2000/svg">
        <rect></rect>
        <path></path>
        <g id="stars"></g>
      </svg>
    `;

    this.#svg  = this.shadowRoot.querySelector('svg');
    this.#board = this.shadowRoot.querySelector('rect');
    this.#marks = this.shadowRoot.querySelector('path');
    this.#stars = this.shadowRoot.querySelector('#stars');

    this.#drawBoard();
  }

  get size() {
    return Number(this.getAttribute('size')) || this.#defaultSize;
  }

  set size(value) {
    this.setAttribute('size', value);
  }

  get nostars() {
    return this.hasAttribute('nostars') ? true : false;
  }

  set nostars(value) {
    if (value) {
      this.setAttribute('nostars', true);
    } else {
      this.removeAttribute('nostars');
    }
  }

  get #cssBoardPadding() {
    return parseFloat(
      getComputedStyle(this).getPropertyValue('--board-padding')
    );
  }

  get #cssBoardBorderWidth() {
    return parseFloat(
      getComputedStyle(this).getPropertyValue('--board-border-width')
    );
  }

  get #boardPos() {
    return 1 - this.#cssBoardPadding;
  }

  get #boardWidth() {
    return this.size - 1 + 2 * this.#cssBoardPadding;
  }

  get #totalBoardPos() {
    return this.#boardPos - this.#cssBoardBorderWidth / 2;
  }

  get #totalBoardWidth() {
    return this.#boardWidth + this.#cssBoardBorderWidth;
  }

  static observedAttributes = [ 'size', 'nostars' ];

  attributeChangedCallback(attr, was, value) {
    switch (attr) {
      case 'size':
        if (
          (was === null && Number(value) === this.#defaultSize) ||
          (Number(was) === this.#defaultSize && value === null)
        ) {
          return;
        }
        this.#drawBoard();
        break;
      case 'nostars':
        if (this.nostars) {
          this.#stars.style.visibility = 'hidden';
        } else {
          this.#stars.removeAttribute('style');
        }
    }
  }

  #drawBoard() {
    this.#board.setAttribute('x', this.#boardPos);
    this.#board.setAttribute('y', this.#boardPos);
    this.#board.setAttribute('width', this.#boardWidth);
    this.#board.setAttribute('height', this.#boardWidth);

    let pathData = '';
    for (let i = 1; i <= this.size; i++) {
      pathData += `M1 ${ i }H${ this.size }M${ i } 1V${ this.size }`;
    }
    this.#marks.setAttribute('d', pathData);

    const points = {
      9: [[3, 3], [7, 3], [5, 5], [3, 7], [7, 7]],
      13: [[4, 4], [10, 4], [7, 7], [4, 10], [10, 10]],
      19: [
        [4, 4], [10, 4], [16, 4], [4, 10], [10, 10],
        [16, 10], [4, 16], [10, 16], [16, 16]
      ]
    };
    this.#stars.innerHTML = '';
    points[this.size]?.forEach(point => {
      this.#stars.innerHTML += `<circle cx="${ point[0] }" cy="${ point[1] }"></circle>`;
    });

    this.#updateViewBox();
  }

  #updateViewBox() {
    this.#svg.setAttribute('viewBox', `
      ${ this.#totalBoardPos   } ${ this.#totalBoardPos   }
      ${ this.#totalBoardWidth } ${ this.#totalBoardWidth }
    `);
  }

}
