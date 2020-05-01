import React, { useRef, useEffect } from 'react'
import { storiesOf } from '@storybook/react'

import './style.css'
import Snuggle from '../src'
import {
  ItemStyled,
  listElements,
  OnUpdateGrid,
  RevealAnimation,
} from './parts'

storiesOf('Snuggle', module)
  .add('default', () => (
    <div className="wrap">
      <Snuggle>{listElements('complete')}</Snuggle>
    </div>
  ))

  .add('images', () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>
        {listElements('onlyImage')}
      </Snuggle>
    </div>
  ))

  .add('images and texts', () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('on image load', () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  .add('no style', () => (
    <div className="wrap">
      <Snuggle>{listElements('onlyText')}</Snuggle>
    </div>
  ))

// TODO
// .add('span', () => (
//   <div className="wrap">
//     <Snuggle>{listElements()}</Snuggle>
//   </div>
// ))

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
        {listElements('onlyImage')}
      </Snuggle>
    </div>
  ))

  .add('custom item (<li />)', () => (
    <div className="wrap">
      <Snuggle
        item={<li style={{ border: '1px solid #ddd', padding: '8px' }} />}
      >
        {listElements('onlyImage')}
      </Snuggle>
    </div>
  ))

  .add('with Styled Components', () => (
    <div className="wrap">
      <Snuggle item={<ItemStyled />}>{listElements('onlyImage')}</Snuggle>
    </div>
  ))

  .add('custom gap', () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Snuggle rowGap={20} item={<div className="card" />}>
        {listElements('onlyImage')}
      </Snuggle>
    </div>
  ))

  .add('custom column width', () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Snuggle columnWidth={400} item={<div className="card" />}>
        {listElements('onlyImage')}
      </Snuggle>
    </div>
  ))

storiesOf('Third party dependencies', module).add('with scroll reveal', () => (
  <RevealAnimation />
))
