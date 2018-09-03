import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"
import styled from "styled-components"

import "./style.css"
import Masonry from "../src"

const ItemStyled = styled.div`
  color: #fff;
  border-bottom: 1px solid #fff;
`

const Image = ({ index }) => (
  <img className="image" src={`https://picsum.photos/100${index % 10}/600`} />
)

const listElements = image =>
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

storiesOf("Masonry", module)
  .addDecorator(withKnobs)

  .add("default", () => (
    <div className="wrap">
      <Masonry item={<div className="card" />}>{listElements()}</Masonry>
    </div>
  ))

  .add("with images", () => (
    <div className="wrap">
      <Masonry item={<div className="card" />}>{listElements(true)}</Masonry>
    </div>
  ))

  .add("custom container (<ul />)", () => (
    <div className="wrap">
      <Masonry
        container={<ul style={{ background: "#5050FF", padding: "40px" }} />}
        item={<li className="card" />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom item (<li />)", () => (
    <div className="wrap">
      <Masonry
        container={<ul style={{ background: "#5050FF" }} />}
        item={<li style={{ background: "#fff" }} />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("with styled-component", () => (
    <div className="wrap">
      <Masonry
        container={<ul style={{ background: "#5050FF" }} />}
        item={<ItemStyled />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom gap", () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Masonry rowGap={number("rowGap", 20)} item={<div className="card" />}>
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom columns width", () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Masonry
        columnsWidth={number("columnsWidth", 400)}
        item={<div className="card" />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("no style", () => (
    <div className="wrap">
      <Masonry>{listElements()}</Masonry>
    </div>
  ))
