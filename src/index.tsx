import * as React from 'react'

import removeKeys from './removeKeys'
import key from './uid'

interface ISnuggle {
  columnWidth?: number
  container?: React.ReactElement<any>
  item?: React.ReactElement<any>
  rowGap?: number
  uniqueid?: string
}

const blackListProps = ['rowGap', 'columnWidth', 'uniqueid']
const removeBlackListed = removeKeys(blackListProps)

class Snuggle extends React.PureComponent<ISnuggle> {
  static defaultProps = {
    columnWidth: 250,
    container: React.createElement('div'),
    item: React.createElement('div'),
    rowGap: 20,
    uniqueid: '',
  }

  gridId: string | null = null

  reposition: boolean = false

  elements: HTMLElement[] = []

  grid: null | HTMLElement = null

  constructor(props: ISnuggle) {
    super(props)

    this.gridId = `snuggle--${props.uniqueid || key()}`
  }

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

  setValues = (): null => {
    const { rowGap = 0 } = this.props

    if (this.elements.length === 0) {
      return null
    }

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
      const images = this.grid.getElementsByTagName('img')

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

    return `
      <style>
        .${this.gridId} {
          display: grid;
          grid-gap: ${rowGap}px;
          grid-template-columns: repeat(auto-fill, minmax(${columnWidth}px, 1fr));
        }
      </style>`
  }

  render() {
    const {
      children,
      item = React.createElement('div'),
      container = React.createElement('div'),
      ...compProps
    } = this.props

    const hasChildren: boolean = React.Children.count(children) > 0

    if (!hasChildren) {
      return null
    }

    const refItem = (n: HTMLElement): void => {
      this.getRef(n)
    }

    const refGrid = (n: HTMLElement): void => {
      this.grid = n
    }

    const renderChildren = React.Children.map(
      children,
      (child: React.ReactNode) => {
        const itemProps = removeBlackListed({
          ...item.props,
          key: key(),
          ref: refItem,
        })

        if (item) {
          return React.createElement(item.type, itemProps, child)
        }

        return null
      }
    )

    const containerProps = removeBlackListed({
      ...container.props,
      ...compProps,
      className: `${this.gridId} ${container.props.className || ''}`,
      ref: refGrid,
    })

    return (
      <>
        {React.createElement('div', {
          dangerouslySetInnerHTML: { __html: this.createGridStyle() },
        })}
        {React.createElement(container.type, containerProps, renderChildren)}
      </>
    )
  }
}

export default Snuggle
