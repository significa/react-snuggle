import React, { Component } from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

import "./style.css"
import Masonry from "../src"

import {
  ItemStyled,
  listElements,
  OnUpdateGrid,
  RevealAnimation
} from "./parts"

storiesOf("Masonry", module)
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

  .add("no style", () => (
    <div className="wrap">
      <Masonry>{listElements()}</Masonry>
    </div>
  ))

  .add("on update grid", () => <OnUpdateGrid />)

storiesOf("Options", module)
  .addDecorator(withKnobs)

  .add("custom container (<ul />)", () => (
    <div className="wrap">
      <Masonry
        container={<ul style={{ background: "#5050FF", padding: "40px" }} />}
      >
        {listElements(true)}
      </Masonry>
    </div>
  ))

  .add("custom item (<li />)", () => (
    <div className="wrap">
      <Masonry item={<li style={{ background: "#fff" }} />}>
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

storiesOf("Third parts", module)
  .add("with styled-component", () => (
    <div className="wrap">
      <Masonry item={<ItemStyled />}>{listElements(true)}</Masonry>
    </div>
  ))

  .add("with scroll reveal", () => <RevealAnimation />)
