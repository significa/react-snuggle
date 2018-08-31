import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

import "./style.css"
import Masonry from "../src"

const Image = ({ index }) => (
  <img
    style={{ maxWidth: "100%" }}
    src={`https://picsum.photos/100${index % 10}/600`}
  />
)

const listElements = image =>
  Array(30)
    .fill(" ")
    .map((item, index) => (
      <div key={index}>
        {image ? <Image index={index} /> : null}
        {index % 2 === 0
          ? "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur, vitae lacinia enim auctor. Aenean vitae fermentum odio. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed dictum non orci ut dignissim. Fusce fermentum felis aliquam, mattis nibh ut, faucibus leo. Sed lectus libero, volutpat at eros quis, venenatis tempus neque. Nulla vel faucibus orci, nec convallis ligula. Quisque maximus gravida orci, in lacinia mauris pretium nec. Sed et enim bibendum, fermentum tellus eu, eleifend ex. Aliquam lectus magna, sollicitudin vitae placerat ac, semper ut risus. Nunc vestibulum lacus et nulla volutpat auctor."
          : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce facilisis fringilla laoreet. Mauris mattis enim ut felis consectetur,"}
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
        container={<ul style={{ background: "#eee", padding: "40px" }} />}
        item={<li className="card" />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom item (<li />)", () => (
    <div className="wrap">
      <Masonry
        container={<ul style={{ background: "#eee" }} />}
        item={<li style={{ background: "#ddd" }} />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom gap", () => (
    <div className="wrap">
      <Masonry rowGap={number("rowGap", 20)} item={<div className="card" />}>
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom columns width", () => (
    <div className="wrap">
      <Masonry
        columnsWidth={number("columnsWidth", 200)}
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
