import React, {
  useRef,
  useEffect,
  createElement,
  Children,
  useCallback,
} from 'react'

import removeKeys from './removeKeys'
import key from './uid'

/**
 * Interface
 */
interface SnuggleProps {
  columnWidth?: number
  container?: React.ReactElement<any>
  item?: React.ReactElement<any>
  rowGap?: number
  uniqueid?: string
  innerRef?: any
  ref?: React.RefObject<
    React.ComponentType<SnuggleProps> & { settle: () => void }
  >
}

/**
 * Helpers
 */
const blackListProps = ['rowGap', 'columnWidth', 'uniqueid']
const removeBlackListed = removeKeys(blackListProps)

// TODO: Should have a way to expose it to a third part?
const createGridStyle = ({ gridId = '', columnWidth = 0, rowGap = 0 }) => {
  return `
    <style>
      .${gridId} {
        display: grid;
        grid-gap: ${rowGap}px;
        grid-template-columns: repeat(auto-fill, minmax(${columnWidth}px, 1fr));
      }
    </style>`
}

/**
 * Main components
 */
const Snuggle: React.FC<SnuggleProps> = ({
  container = createElement('div'),
  item = createElement('div'),
  innerRef,
  uniqueid,
  children,
  rowGap = 20,
  columnWidth = 250,
  ...props
}) => {
  // Constants
  const gridId = `snuggle--${uniqueid || key()}`
  const reposition = useRef(false)
  const elementsRef = useRef<HTMLElement[]>([])
  const gridRef = useRef<HTMLElement>()

  // Methods
  const settle = useCallback(() => {
    elementsRef.current?.forEach((item: HTMLElement) => {
      if (item && item.firstElementChild) {
        const firstElement: Element = item.firstElementChild
        const itemHeight: number = firstElement.getBoundingClientRect().height
        const rowSpan: number = Math.ceil((itemHeight + rowGap) / rowGap)

        item.style.gridRowEnd = `span ${rowSpan}`
      }
    })

    if (!reposition.current) {
      window.requestAnimationFrame(settle)
      reposition.current = true
    }
  }, [rowGap])

  // Effects
  useEffect(() => {
    settle()

    window.addEventListener('resize', settle)

    return () => {
      window.removeEventListener('resize', settle)
    }
  }, [settle])

  // Render
  const refGrid = (node: HTMLElement) => {
    gridRef.current = node

    // Pass methods to ref
    if (innerRef && innerRef.current) {
      innerRef.current = node
      innerRef.current.settle = settle
    }
  }

  // New children
  const renderChildren = Children.map(children, (child, index) => {
    if (!item) {
      return null
    }

    // Create a wrap on child
    const itemProps = removeBlackListed({
      ...item.props,
      key: key(),
      ref: (node: HTMLElement) => {
        if (elementsRef.current) {
          elementsRef.current[index] = node
        }
      },
    })

    return createElement(item.type, itemProps, child)
  })

  // Container Props
  const containerProps = removeBlackListed({
    ...container.props,
    ...props,
    className: `${gridId} ${container.props.className || ''}`,
    ref: refGrid,
  })

  return (
    <>
      {createElement('div', {
        dangerouslySetInnerHTML: {
          __html: createGridStyle({ gridId, rowGap, columnWidth }),
        },
      })}
      {createElement(container.type, containerProps, renderChildren)}
    </>
  )
}

const ExportableSnuggle = React.forwardRef((props, ref) => (
  <Snuggle innerRef={ref} {...props} />
))

export default (ExportableSnuggle as unknown) as React.ComponentType<
  SnuggleProps
> & { settle: () => void }
