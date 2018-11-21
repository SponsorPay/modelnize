import {expect} from "chai"
import * as Sequelize from "sequelize"
import {DefineAttributes} from "sequelize"
import "../src"
import {User} from "./user"
import {UserSchema, userSchema} from "./userSchema"

const sql = new Sequelize({
  dialect: "mysql",
  database: "circle_test",
  username: "root",
  password: "",
})

describe("modelnizeTest", function () {
  it("should modelnize", async () => {
    const users = sql.defineModel<User, DefineAttributes, UserSchema>({
      newInstance: User.parse,
      attributes: userSchema,
    })

    await sql.sync({alter: true})

    const user = await users.createOne(User.empty.copy({name: "Kool Ye"}))
    expect(user).to.be.instanceOf(User)

    const items = await users.fetchAll({
      where: {
        name: {
          $like: "%oo%"
        }
      }
    })

    expect(items.length > 0).to.eq(true)
    expect(items.every(e => e instanceof User)).to.eq(true)

    await sql.close()
  })
})
