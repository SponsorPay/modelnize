import * as Sequelize from "sequelize"
import {DefineAttributes} from "sequelize"
import "../src/model"
import "../src/modelFieldsExtension"
import "../src/selectQueryExtension"
import "../src/sequelize"
import {User} from "./user"
import {userSchema} from "./userSchema"

const sql = new Sequelize({
  dialect: "mysql",
  database: "circle_test",
  username: "root",
  password: ""
})

const users = sql.defineModel<User, DefineAttributes>({
  modelName: "user",
  newInstance: User.parse,
  attributes: userSchema
})

describe("selectQueryExtension", function() {
  before(async () => {
    await sql.sync()
  })

  after(async () => {
    await users.drop()
    await sql.close()
  })

  it("should selectQuerySQL", async () => {
    const {Op} = Sequelize
    const havingActive = users.sequelize.literal(
      `BIT_OR(CASE WHEN "${users.$.active}" is null THEN true else false END) = false`
    )

    const rawSQL = users.selectQuerySQL({
      tableAs: "active_users",
      attributes: [users.$.id],
      group: [users.$.id],
      having: {
        active: havingActive
      },
      where: {
        [users.$.createdAt]: {
          [Op.gte]: new Date("2020-01-01"),
          [Op.lte]: new Date("2020-02-01")
        }
      }
    })

    await users.findAll({
      where: {
        id: {
          [Op.in]: users.sequelize.literal(`(${rawSQL})`)
        }
      }
    })

    await users.sequelize.query(rawSQL)
  })

  it("select from", async () => {
    const {Op} = Sequelize
    const havingActive = users.sequelize.literal(
      `BIT_OR(CASE WHEN "${users.$.active}" is null THEN true else false END) = false`
    )

    const rawSQL = users.selectQuerySQL({
      tableAs: "active_users",
      attributes: [users.$.id],
      from: users.selectQuerySQL({
        tableAs: "active_users_2",
        attributes: [users.$.id],
        group: [users.$.id],
        having: {
          active: havingActive
        },
        where: {
          [users.$.createdAt]: {
            [Op.gte]: new Date("2020-01-01"),
            [Op.lte]: new Date("2020-02-01")
          }
        }
      })
    })

    await users.sequelize.query(rawSQL)
  })
})
