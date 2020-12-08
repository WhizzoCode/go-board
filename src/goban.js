class GobanBoard extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const size = 19;
    const config = {
      board_border_width: 1,
      board_color: '#e3b85e',
      // board_color: '#fff',
      board_line_width: 0.05,
      board_star_radius: 0.1,
      board_marks_color: '#000',
      stone_radius: 0.5,
      stone_border_width: 0.05,
      stone_black_border_color: '#000',
      stone_black_color: '#000',
      stone_white_border_color: '#000',
      stone_white_color: '#fff'
    };

    const board_start = 1 - config.board_border_width;
    const board_width = 2 * config.board_border_width + size - 1;
    const line_start = 1 - (config.board_line_width / 2);
    const line_end = size + (config.board_line_width / 2);
    config.stone_radius -= config.stone_border_width / 2;

    let board = `
      <style>
        goban-board {display: inline-block;}
      </style>
      <svg xmlns="http://www.w3.org/2000/svg" viewbox="${board_start} ${board_start} ${board_width} ${board_width}">
        <rect x="${board_start}" y="${board_start}" width="${board_width}" height="${board_width}" fill="${config.board_color}"></rect>
        <path stroke-width="${config.board_line_width}" stroke="${config.board_marks_color}" d="
    `;
    for (let i = 1; i <= size; i++) {
      board += `
        M ${line_start} ${i} H ${line_end}
        M ${i} ${line_start} V ${line_end}
      `;
    }
    board += `
        "></path>
    `;
    let stars = [];
    if (size === 9) {
      stars = [[3, 3], [7, 3], [5, 5], [3, 7], [7, 7]];
    } else if (size === 13) {
      stars = [[4, 4], [10, 4], [7, 7], [4, 10], [10, 10]];
    } else if (size === 19) {
      stars = [[4, 4], [10, 4], [16, 4], [4, 10], [10, 10], [16, 10], [4, 16], [10, 16], [16, 16]];
    }
    stars.forEach(point => {
      board += `
        <circle cx="${point[0]}" cy="${point[1]}" r="${config.board_star_radius}" fill="${config.board_marks_color}"></circle>
      `;
    });
    board += `
        <!-- Testing stones -->
        <circle cx="17" cy="4" r="${config.stone_radius}" fill="${config.stone_black_color}" stroke="${config.stone_black_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <circle cx="4" cy="15" r="${config.stone_radius}" fill="${config.stone_black_color}" stroke="${config.stone_black_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <circle cx="16" cy="17" r="${config.stone_radius}" fill="${config.stone_black_color}" stroke="${config.stone_black_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <circle cx="4" cy="3" r="${config.stone_radius}" fill="${config.stone_white_color}" stroke="${config.stone_white_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <circle cx="3" cy="13" r="${config.stone_radius}" fill="${config.stone_white_color}" stroke="${config.stone_white_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <circle cx="4" cy="17" r="${config.stone_radius}" fill="${config.stone_white_color}" stroke="${config.stone_white_border_color}" stroke-width="${config.stone_border_width}"></circle>
        <!-- Testing stones -->
      </svg>
    `;

    this.innerHTML = board;
  }
}

customElements.define('goban-board', GobanBoard);
