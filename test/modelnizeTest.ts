import * as Sequelize from "sequelize"
import {User} from "./user"
import "../src"
import {userSchema} from "./userSchema"

const sql = new Sequelize({
  dialect: "mysql",
  database: "",
  username: "",
  password: "",
})

describe("modelnizeTest", function () {
  it("should modelnize", async () => {
    const users = sql.defineModel({
      newInstance: User.parse,
      attributes: userSchema,
    })

    await sql.sync({alter: true})

    console.log("create", await users.createOne(User.empty.copy({name: "Kool Ye"})))

    console.log(await users.fetchAll({
      where: {
        name: {
          $like: "%oo%"
        }
      }
    }))
  })
})
