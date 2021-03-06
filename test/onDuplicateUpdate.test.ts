import {expect} from "chai"
import * as Sequelize from "sequelize"
import {DefineAttributes} from "sequelize"
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
    const users = sql.defineModel<User, DefineAttributes>({
      modelName: "user",
      newInstance: User.parse,
      attributes: userSchema,
    })

    expect(users.onDuplicateUpdate(["name"])).to.eq("UPDATE `id`=LAST_INSERT_ID(`id`), `name`=VALUES(`name`)")
  })
})
