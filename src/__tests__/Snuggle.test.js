import * as React from "react"
import { render, cleanup } from "react-testing-library"
// this adds custom jest matchers from jest-dom
import "jest-dom/extend-expect"
import Snuggle from "../index"
import { listElements } from "../../stories/parts"
// automatically unmount and cleanup DOM after the test is finished.

afterEach(cleanup)

describe("Snuggle", () => {
  it("should render with default props", () => {
    const {} = render(
      <Snuggle item={<div className="card" />}>{listElements()[0]}</Snuggle>
    )
  })
})
