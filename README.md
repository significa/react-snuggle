<p align="center">
  <img width="100%" alt="React Snuggle" src="https://user-images.githubusercontent.com/4838076/45479304-097f6780-b73e-11e8-8821-fee771fa88ad.png">
</p>

Lightweight React component to create css-based masonry-like layouts.  
Snuggle all your components really tight 🛌

[Demo](https://significa.github.io/react-snuggle/)

Like a loving couple snuggling in bed, `react-snuggle` basically tries to make everything very intimate and comfortable by filling every space available (using CSS grid and a bit of javascript).

## Features

- **🤟 Responsive:** It works on all size screens;
- **🤙 Customizable:** Easily change how your elements should snuggle;
- **🤝 Use your favorite library:** CSS-in-JS, css modules, plain css, whatever. Feel free to use whatever you want;
- **💪 Performance:** Responsive solution based only in CSS (without any JS Event Listener).

#### Install:

```sh
yarn add react-snuggle
```

#### Usage:

```jsx
import Snuggle from "";

const List = () => (
  <Snuggle>
    <div>Item</div>
    <div>Item</div>
    ...
  </Snuggle>
);
```

### Options

| Name        | Type            | Default   |
| ----------- | --------------- | --------- |
| item        | _React.Element_ | `<div />` |
| container   | _React.Element_ | `<div />` |
| rowGap      | _Number_        | 10        |
| columnWidth | _Number_        | 250       |

### Todo

- [ ] Span options (element fill two columns or more);
- [ ] Filter elements;
- [ ] Missing tests;
- [ ] ...

### License

[MIT](https://github.com/Significa/react-snuggle/blob/master/LICENSE)

### Kudos

@andybarefoot
[Masonry style layout with CSS Grid](https://medium.com/@andybarefoot/a-masonry-style-layout-using-css-grid-8c663d355ebb)

---

<img width="130" alt="Significa Lda" src="https://user-images.githubusercontent.com/4838076/38634265-6545f090-3d98-11e8-8869-c5e477648fdf.png">

[Significa](https://significa.pt/) is an Oporto based digital studio founded in late 2013. Despite being specialised in Interaction Design and Brand Development, we believe that good design thinking can answer almost any question and solve most problems. We aim to provide meaningful design solutions to achieve the best user engagement possible in any situation.
