/* eslint-disable */
import React, { Component } from "react"
import styled from "styled-components"
import ScrollReveal from "scrollreveal"

import Snuggle from "../src"

export const ItemStyled = styled.div`
  border-bottom: 1px solid #ddd;
`

export const Image = ({ index, lazy }) => {
  return lazy ? (
    <img
      src=""
      className="image"
      data-src={`https://picsum.photos/100${index % 10}/600`}
    />
  ) : (
    <img className="image" src={`https://picsum.photos/100${index % 10}/600`} />
  )
}

export const listElements = ({ image, lazy } = { image: false, lazy: false }) =>
  Array(30)
    .fill(" ")
    .map((item, index) => (
      <div key={index}>
        {image ? <Image lazy={lazy} index={index} /> : null}
        <p>
          {index % 2 === 0
            ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur, vitae lacinia enim auctor. Aenean vitae fermentum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum non orci ut dignissim. Fusce fermentum felis aliquam, mattis nibh ut, faucibus leo. Sed lectus libero, volutpat at eros quis, venenatis tempus neque. Nulla vel faucibus orci."
            : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur,"}
        </p>
      </div>
    ))

export class OnUpdateGrid extends Component {
  state = {
    arr: listElements(true)
  }

  random = () => {
    const newArr = this.state.arr
      .map(a => ({ sort: Math.random(), value: a }))
      .sort((a, b) => a.sort - b.sort)
      .map(a => a.value)

    this.setState({ arr: newArr })
  }

  render() {
    return (
      <div className="wrap">
        <button onClick={this.random}>Update</button>
        <Snuggle item={<div className="card" />}>{this.state.arr}</Snuggle>
      </div>
    )
  }
}

export class RevealAnimation extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    ScrollReveal().reveal(".card", { reset: true })
  }

  render() {
    return (
      <div className="wrap">
        <Snuggle
          container={<ul className="reveal" />}
          item={<li className="card" />}
        >
          {Array(120)
            .fill(" ")
            .map((item, index) => (
              <div key={index}>
                {index % 3 ? (
                  <img
                    className="image"
                    src={`https://picsum.photos/400/300`}
                    height="150"
                  />
                ) : null}
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce
                  facilisis fringilla laoreet. Mauris mattis enim ut felis
                  consectetur
                </p>
              </div>
            ))}
        </Snuggle>
      </div>
    )
  }
}
