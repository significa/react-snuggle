# React-${NAME}-reponsive-css-grid

A lightweigth React library to create a reponsive masonry grid.

${projectName} basically works using CSS grid and a bit of javascript to create a grid, which every element is placed in the next available space, like a wall being build.

Based on:

[masonry style layout with css grid]: https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb

## Features

- **🤟 Responsive:** It works in all size screens;
- **🤙 Customizable:** Set the elements of the container and items, plus all sizes in the grid;
- **🤝 Use your favorite library:** Feel free to use whatever css library you want;
- **💪 Performance:** \_**\_I don't know what I should to write, but I'm only using css and it has no any eventListener\_\_**

#### Install:

```sh
yarn add @significa/__name-project__
```

#### Usage:

```jsx
import Masonry from "__name-project__";

const List = () => (
  <Masonry>
    <div>Item</div>
    <div>Item</div>
    ...
  </Masonry>
);
```

### Options

| Name         | Type         | Default   |
| ------------ | ------------ | --------- |
| item         | _React.Node_ | `<div />` |
| container    | _React.Node_ | `<div />` |
| rowGap       | _Number_     | 10        |
| columnsWidth | _Number_     | 250       |

<img width="179" alt="screen shot 2018-04-11 at 14 55 21" src="https://user-images.githubusercontent.com/4838076/38634265-6545f090-3d98-11e8-8869-c5e477648fdf.png">
