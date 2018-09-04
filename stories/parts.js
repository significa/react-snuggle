import React, { Component } from "react"
import styled from "styled-components"
import ScrollReveal from "scrollreveal"

import Masonry from "../src"

export const ItemStyled = styled.div`
  border-bottom: 1px solid #ddd;
`

export const Image = ({ index }) => (
  <img className="image" src={`https://picsum.photos/100${index % 10}/600`} />
)

export const listElements = image =>
  Array(30)
    .fill(" ")
    .map((item, index) => (
      <div key={index}>
        {image ? <Image index={index} /> : null}
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
        <Masonry item={<div className="card" />}>{this.state.arr}</Masonry>
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
        <Masonry
          container={<ul className="reveal" />}
          item={<li className="card" />}
        >
          {listElements(true)}
          {listElements()}
          {listElements(true)}
          {listElements()}
          {listElements(true)}
          {listElements()}
          {listElements(true)}
        </Masonry>
      </div>
    )
  }
}
