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

const users = sql.defineModel<User, DefineAttributes, UserSchema>({
  modelName: "user",
  newInstance: User.parse,
  attributes: userSchema,
})

describe("modelnizeTest", function () {
  before(async () => {
    await sql.sync({alter: true})
  })

  after(async () => {
    await sql.close()
  })

  it("should modelnize", async () => {

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

  })

  it("should createMany", async () => {
    console.log(
      await users.createMany([
        {name: "1"},
        {name: "2"},
      ])
    )
  })
})
