// @flow
import * as React from "react"

import key from "./uid"

type PropType = {
  rowGap?: number,
  autoRows?: number,
  columnsWidth?: number,
  container?: React.Element<*>,
  item?: React.Element<*>,
  children: React.ChildrenArray<React.Node>
}

class Masonry extends React.PureComponent<PropType> {
  static defaultProps = {
    rowGap: 10,
    autoRows: 10,
    columnsWidth: 250,
    container: React.createElement("div"),
    item: React.createElement("div")
  }

  reposition: boolean = false

  elements: Array<HTMLElement> = []

  grid: null | HTMLElement = null

  componentDidMount() {
    this.setValues()
    this.onLoadImages()
  }

  componentDidUpdate() {
    this.setValues()
  }

  getRef = (ref: HTMLElement) => {
    if (ref && ref.firstElementChild) {
      this.elements.push(ref)
    }
  }

  setValues = () => {
    const { rowGap, autoRows } = this.props

    if (this.elements.length > 0) {
      this.elements.forEach(
        (item: HTMLElement): null => {
          const itemRef: HTMLElement = item

          if (itemRef && itemRef.firstElementChild) {
            const firstElement: Element = itemRef.firstElementChild
            const itemHeight: number = firstElement.getBoundingClientRect()
              .height
            const rowSpan: number = Math.ceil(
              (itemHeight + rowGap) / (autoRows + rowGap)
            )

            itemRef.style.gridRowEnd = `span ${rowSpan}`
          }

          return null
        }
      )
    }

    if (!this.reposition) {
      window.requestAnimationFrame(this.setValues)
      this.reposition = true
    }
  }

  onLoadImages = () => {
    if (this.grid) {
      const images: HTMLCollection<HTMLImageElement> = (this
        .grid: HTMLElement).getElementsByTagName("img")

      Array.from(images).forEach(
        (img: HTMLImageElement): void => {
          const imageRef = img

          imageRef.onload = this.setValues
        }
      )
    }
  }

  createGridStyle = () => {
    const { rowGap = 0, autoRows = 0, columnsWidth = 0 } = this.props

    return {
      display: "grid",
      gridGap: `${rowGap}px`,
      gridTemplateColumns: `repeat(auto-fill, minmax(${columnsWidth}px, 1fr))`,
      gridAutoRows: `${autoRows}px`
    }
  }

  render() {
    const {
      children,
      item = React.createElement("div"),
      container = React.createElement("div")
    } = this.props
    const childrenCount: boolean = React.Children.count(children) > 0

    if (childrenCount) {
      const refItem = (n: HTMLElement): void => {
        this.getRef(n)
      }
      const refGrid = (n: HTMLElement): void => {
        this.grid = n
      }

      const renderChildren = React.Children.map(
        children,
        (child: React.Node) => {
          if (item) {
            return React.createElement(
              item.type,
              { ...item.props, ref: refItem, innerRef: refItem, key: key() },
              child
            )
          }

          return null
        }
      )

      return React.createElement(
        container.type,
        {
          ...container.props,
          style: { ...container.props.style, ...this.createGridStyle() },
          ref: refGrid
        },
        renderChildren
      )
    }

    return null
  }
}

export default Masonry
