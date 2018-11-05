// @flow
import * as React from "react"

import key from "./uid"
import removeKeys from "./removeKeys"
import inViewPort from "./inViewPort"

type PropType = {
  rowGap?: number,
  columnWidth?: number,
  container?: React.Element<*>,
  item?: React.Element<*>,
  children: React.ChildrenArray<React.Node>
}

const blackListProps = ["rowGap", "columnWidth"]
const removeBlackListed = removeKeys(blackListProps)

class Snuggle extends React.PureComponent<PropType> {
  static defaultProps = {
    rowGap: 20,
    columnWidth: 250,
    container: React.createElement("div"),
    item: React.createElement("div")
  }

  reposition: boolean = false

  elements: Array<HTMLElement> = []

  grid: null | HTMLElement = null

  componentDidMount() {
    this.setValues()
    this.onLoadImages()
    if (this.props.lazy) this.lazyLoad()
  }

  componentDidUpdate() {
    this.setValues()
  }

  componentWillUnmount() {
    if (this.props.lazy) window.cancelAnimationFrame(this.lazyLoad)
  }

  lazyLoad = () => {
    if (this.grid) {
      const images: HTMLCollection<HTMLImageElement> = (this
        .grid: HTMLElement).querySelectorAll("[data-src]")

      Array.from(images).forEach(
        (item: HTMLElement): null => {
          if (inViewPort(item)) {
            const image = item

            image.src = item.dataset.src
            image.onload = () => {
              this.setValues()
            }
          }

          return null
        }
      )
    }

    console.log("Infinity loop")

    window.requestAnimationFrame(this.lazyLoad)
  }

  getRef = (ref: HTMLElement) => {
    if (ref && ref.firstElementChild) {
      this.elements.push(ref)
    }
  }

  setValues = (): void => {
    const { rowGap = 0 } = this.props

    if (this.elements.length === 0) return

    this.elements.forEach(
      (item: HTMLElement): null => {
        const itemRef: HTMLElement = item

        if (itemRef && itemRef.firstElementChild) {
          const firstElement: Element = itemRef.firstElementChild
          const itemHeight: number = firstElement.getBoundingClientRect().height
          const rowSpan: number = Math.ceil((itemHeight + rowGap) / rowGap)

          itemRef.style.gridRowEnd = `span ${rowSpan}`
        }

        return null
      }
    )

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

          imageRef.onload = () => {
            this.setValues()
          }
        }
      )
    }
  }

  createGridStyle = () => {
    const { rowGap = 0, columnWidth = 0 } = this.props

    return {
      display: "grid",
      gridGap: `${rowGap}px`,
      gridTemplateColumns: `repeat(auto-fill, minmax(${columnWidth}px, 1fr))`
    }
  }

  render() {
    const {
      children,
      item = React.createElement("div"),
      container = React.createElement("div"),
      ...compProps
    } = this.props

    const hasChildren: boolean = React.Children.count(children) > 0

    if (!hasChildren) return null

    const refItem = (n: HTMLElement): void => {
      this.getRef(n)
    }
    const refGrid = (n: HTMLElement): void => {
      this.grid = n
    }

    const renderChildren = React.Children.map(children, (child: React.Node) => {
      const itemProps = removeBlackListed({
        ...item.props,
        ref: refItem,
        innerRef: refItem,
        key: key()
      })

      if (item) {
        return React.createElement(item.type, itemProps, child)
      }

      return null
    })

    const containerProps = removeBlackListed({
      ...container.props,
      ...compProps,
      style: { ...container.props.style, ...this.createGridStyle() },
      ref: refGrid
    })

    return React.createElement(container.type, containerProps, renderChildren)
  }
}

export default Snuggle
