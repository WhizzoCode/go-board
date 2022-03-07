# Go board

A web component to create Go boards with positioned stones.

<p align="center">
  <img src="samples/sample-board.svg" width="400px" />
</p>

```html
<go-board
  size="19"
  positions="B17-3 W3-4 B4-16 W16-17 B10-10 W16-4 B17-4 W16-5 B15-2 W17-14 B10-16 W12-17 B4-10 W5-4"
></go-board>
```

## Usage

Import goboard.js.

```html
<script src="goboard.js"></script>
```

Style it, by default the `<go-board>` element is as wide as his container element.

```html
<style>
  go-board {width: 400px;}
</style>
```

Add the element.

```html
<go-board></go-board>
```

## Attributes

### size

By default the size of the created board is 19, but you can create boards of different sizes with the `size` attribute.

```html
<go-board size="9"></go-board>
```

    Star points are drawn on the standard board sizes (19, 13 and 9).

### positions

The positions are added to this attribute separated by spaces, each position consists of a color [B]lack or [W]hite, and a coordinate separated by a hyphen. For example, position B2-3 would be a black stone located on the second column and third row.

## TO DO

- [ ] marks in positions (with and without stones)
- [ ] coordinate guides at board margins
- [ ] crop boards
