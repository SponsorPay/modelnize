import {intBasedEnum} from "../src/intBasedEnum"
import {expect} from "chai"

describe("intBasedEnum.test", function () {
  it("should", () => {
    expect(
      intBasedEnum(["boolean", "number", "string"]).comment
    ).eq("1-boolean, 2-number, 3-string")
  })
})
