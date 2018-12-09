import {expect} from "chai"
import * as Sequelize from "sequelize"
import {DefineAttributes} from "sequelize"
import "../src"
import "../src/onDuplicateUpdate"
import {User} from "./user"
import {UserSchema, userSchema} from "./userSchema"

const sql = new Sequelize({
  dialect: "mysql",
  database: "circle_test",
  username: "root",
  password: "",
})

describe("onDuplicateUpdate", function () {
  it("should onDuplicateUpdate", () => {
    const users = sql.defineModel<User, DefineAttributes, UserSchema>({
      modelName: "user",
      newInstance: User.parse,
      attributes: userSchema,
    })

    expect(users.onDuplicateUpdate(
      users, ["name"]
    )).to.eq("UPDATE `name`=VALUES(`name`)")
  })
})
