import * as Sequelize from "sequelize"
import {User} from "./user"
import "../src"

const sql = new Sequelize({
  dialect: "mysql",
  database: ""
})

describe("modelnizeTest", function () {
  it("should", async () => {
    sql.defineModel({
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
  })
})
