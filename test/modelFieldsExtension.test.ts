import {expect} from "chai"
import * as Sequelize from "sequelize"
import {DefineAttributes} from "sequelize"
import "../src/modelFieldsExtension"
import "../src/sequelize"
import {User} from "./user"
import {userSchema, UserSchema} from "./userSchema"

const sql = new Sequelize({
  dialect: "mysql",
  database: "circle_test",
  username: "root",
  password: ""
})

const users = sql.defineModel<User, DefineAttributes, UserSchema>({
  modelName: "user",
  newInstance: User.parse,
  attributes: userSchema
})

describe("modelFieldsExtension", function() {
  it("should init fields once", () => {
    expect(users.$).to.eq(users.$)
    expect(users.$).to.eq((users as any)._ModelFieldsExtension_attributeRawFieldsMap)
  })

  it("should $", () => {
    expect(users.$).to.deep.eq({
      id: "id",
      name: "name",
      createdAt: "created_at",
      active: "active"
    })
  })
})
