import React from 'react'
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
      <Snuggle>{listElements('onlyImage')}</Snuggle>
    </div>
  ))

  // TODO
  // .add('known element size', () => (
  //   <div className="wrap">
  //     <Snuggle item={<div className="card" />}>
  //       {listElements('onlyImage')}
  //     </Snuggle>
  //   </div>
  // ))

  .add('images and texts', () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>
        {listElements('complete')}
      </Snuggle>
    </div>
  ))

  // TODO
  // .add('on image load', () => (
  //   <div className="wrap">
  //     <Snuggle item={<div className="card" />}>
  //       {listElements('complete')}
  //     </Snuggle>
  //   </div>
  // ))

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
// )))

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
