import React from "react"
import { storiesOf } from "@storybook/react"
import { withKnobs, text, boolean, number } from "@storybook/addon-knobs"

import "./style.css"
import Snuggle from "../src"

import {
  ItemStyled,
  listElements,
  OnUpdateGrid,
  RevealAnimation
} from "./parts"

storiesOf("Snuggle", module)
  .add("default", () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>{listElements()}</Snuggle>
    </div>
  ))

  .add("with image", () => (
    <div className="wrap">
      <Snuggle item={<div className="card" />}>
        {listElements({ image: true })}
      </Snuggle>
    </div>
  ))

  .add("no style", () => (
    <div className="wrap">
      <Snuggle>{listElements()}</Snuggle>
    </div>
  ))

  .add("on update grid", () => <OnUpdateGrid />)

storiesOf("Options", module)
  .addDecorator(withKnobs)

  .add("custom container (<ul />)", () => (
    <div className="wrap">
      <Snuggle
        container={<ul style={{ background: "#5050FF", padding: "40px" }} />}
      >
        {listElements({ image: true })}
      </Snuggle>
    </div>
  ))

  .add("custom item (<li />)", () => (
    <div className="wrap">
      <Snuggle
        item={<li style={{ border: "1px solid #ddd", padding: "8px" }} />}
      >
        {listElements({ image: true })}
      </Snuggle>
    </div>
  ))

  .add("with Styled Components", () => (
    <div className="wrap">
      <Snuggle item={<ItemStyled />}>{listElements({ image: true })}</Snuggle>
    </div>
  ))

  .add("custom gap", () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Snuggle rowGap={number("rowGap", 20)} item={<div className="card" />}>
        {listElements({ image: true })}
      </Snuggle>
    </div>
  ))

  .add("custom column width", () => (
    <div className="wrap">
      <h1>See Knobs panel</h1>
      <Snuggle
        columnWidth={number("columnWidth", 400)}
        item={<div className="card" />}
      >
        {listElements({ image: true })}
      </Snuggle>
    </div>
  ))

  .add("lazy load", () => (
    <div className="wrap">
      <h1>Lazy load</h1>
      <Snuggle item={<div className="card" />} lazy>
        {listElements({ image: true, lazy: true })}
      </Snuggle>
    </div>
  ))

storiesOf("Third party dependencies", module).add("with scroll reveal", () => (
  <RevealAnimation />
))
