import React, { useState, useRef, useEffect } from 'react'
import styled from 'styled-components'
import ScrollReveal from 'scrollreveal'

import Snuggle from '../src'

export const ItemStyled = styled.div`
  border-bottom: 1px solid #ddd;
`

export const random = (min: number, max: number) => {
  return Number(Math.floor(Math.random() * (max - min + 1)) + min).toFixed(0)
}

export const Image = ({ index, ...props }: any) => (
  <img
    style={{ display: 'block' }}
    className="image"
    alt="Placeholder"
    src={`https://picsum.photos/200/${random(10, 30)}0`}
    {...props}
  />
)

export const listElements = (
  variant: 'onlyText' | 'onlyImage' | 'complete' = 'complete',
  imageProps = {}
) =>
  Array(30)
    .fill(' ')
    .map((_item, index) => (
      <div key={index}>
        {variant === 'complete' || variant === 'onlyImage' ? (
          <Image index={index} {...imageProps} />
        ) : null}

        {variant === 'complete' || variant === 'onlyText' ? (
          <p>
            {index % 2 === 0
              ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur, vitae lacinia enim auctor. Aenean vitae fermentum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum non orci ut dignissim. Fusce fermentum felis aliquam, mattis nibh ut, faucibus leo. Sed lectus libero, volutpat at eros quis, venenatis tempus neque. Nulla vel faucibus orci.'
              : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur,'}
          </p>
        ) : null}
      </div>
    ))

export const OnUpdateGrid = () => {
  const snuggleRef = useRef<typeof Snuggle>(null)

  const [items, setItems] = useState(
    listElements('complete', {
      onLoad: () => {
        if (snuggleRef.current) {
          snuggleRef.current.settle()
        }
      },
    })
  )

  const random = () => {
    const newArr = listElements('complete', {
      onLoad: () => {
        if (snuggleRef.current) {
          snuggleRef.current.settle()
        }
      },
    })
      .map((a) => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map((a) => a.value)

    setItems(newArr)
  }

  return (
    <div className="wrap">
      <button onClick={random}>Update</button>
      <Snuggle ref={snuggleRef} item={<li className="card" />}>
        {items}
      </Snuggle>
    </div>
  )
}

export const RevealAnimation = () => {
  const snuggleRef = useRef<typeof Snuggle>(null)

  useEffect(() => {
    ScrollReveal().reveal('.card', { reset: true })
  }, [])

  return (
    <div className="wrap">
      <Snuggle
        ref={snuggleRef}
        container={<ul className="reveal" />}
        item={<li className="card" />}
      >
        {listElements('complete', {
          onLoad: () => {
            if (snuggleRef.current) {
              snuggleRef.current.settle()
            }
          },
        })}
      </Snuggle>
    </div>
  )
}
