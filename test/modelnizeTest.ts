import * as Sequelize from "sequelize"
import {User} from "./user"
import "../src"

const sql = new Sequelize({
  dialect: "mysql",
  database: "",
})

describe("modelnizeTest", function () {
  it("should modelnize", async () => {
    const users = sql.defineModel({
      newInstance: User.parse,
      attributes: {
        id: {
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: Sequelize.STRING
      }
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
