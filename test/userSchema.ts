import {DefineAttributes} from "sequelize"
import * as sequelize from "sequelize"

export const userSchema: DefineAttributes = {}

userSchema.id = {
  autoIncrement: true,
  primaryKey: true,
  type: sequelize.INTEGER,
}

userSchema.name = sequelize.STRING
