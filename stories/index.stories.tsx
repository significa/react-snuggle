import React, { createElement, useRef } from 'react'
import { storiesOf } from '@storybook/react'
import { LazyLoadImage } from 'react-lazy-load-image-component'

import './style.css'
import Snuggle from '../src'
import {
  ItemStyled,
  listElements,
  OnUpdateGrid,
  RevealAnimation,
  random,
} from './parts'

storiesOf('Snuggle', module)
  .add('default', () => (
    <div className="wrap">
      <Snuggle>
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/500/200"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/300/300"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/300/200"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/220/300"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/500/250"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/200/100"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/500/280"
        />
        <img
          style={{ width: '100%' }}
          alt="Placeholder"
          src="https://picsum.photos/200/220"
        />
      </Snuggle>
    </div>
  ))

  .add('images', () => (
    <div className="wrap">
      <Snuggle>{listElements('onlyImage')}</Snuggle>
    </div>
  ))

  .add('images and texts', () => (
    <div className="wrap">
      <Snuggle>{listElements('complete')}</Snuggle>
    </div>
  ))

  .add('no style', () => (
    <div className="wrap">
      <Snuggle>{listElements('onlyText')}</Snuggle>
    </div>
  ))

  .add('lazy-loading', () =>
    createElement(() => {
      const snuggleRef = useRef<typeof Snuggle>(null)

      const onLoadImage = () => {
        if (snuggleRef.current) {
          snuggleRef.current.settle()
        }
      }

      return (
        <div className="wrap">
          <Snuggle ref={snuggleRef} item={<ItemStyled />}>
            {Array(60)
              .fill(' ')
              .map((_item, index) => (
                <div key={index}>
                  <LazyLoadImage
                    className="image"
                    alt="Placeholder"
                    src={`https://picsum.photos/200/${random(10, 30)}0`}
                    style={{
                      display: 'block',
                      minHeight: `${random(10, 30)}0px`,
                    }}
                    afterLoad={onLoadImage}
                  />

                  <p>
                    {index % 2 === 0
                      ? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur, vitae lacinia enim auctor. Aenean vitae fermentum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum non orci ut dignissim. Fusce fermentum felis aliquam, mattis nibh ut, faucibus leo. Sed lectus libero, volutpat at eros quis, venenatis tempus neque. Nulla vel faucibus orci.'
                      : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur,'}
                  </p>
                </div>
              ))}
          </Snuggle>
        </div>
      )
    })
  )

storiesOf('Options', module)
  .add('custom container (<ul />)', () => (
    <div className="wrap">
      <Snuggle
        container={
          <ul
            className="my-custom-class"
            style={{ background: '#5050FF', padding: '40px' }}
          />
        }
      >
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('custom item (<li />)', () => (
    <div className="wrap">
      <Snuggle
        item={<li style={{ border: '1px solid #ddd', padding: '8px' }} />}
      >
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('with Styled Components', () => (
    <div className="wrap">
      <Snuggle item={<ItemStyled />}>{listElements('complete')}</Snuggle>
    </div>
  ))

  .add('custom gap', () => (
    <div className="wrap">
      <Snuggle rowGap={20} item={<div className="card" />}>
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('custom column width', () => (
    <div className="wrap">
      <Snuggle columnWidth={400} item={<div className="card" />}>
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('on update grid', () => <OnUpdateGrid />)

storiesOf('Third party dependencies', module).add('with scroll reveal', () => (
  <RevealAnimation />
))
