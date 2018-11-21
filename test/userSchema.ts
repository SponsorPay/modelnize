import {DefineAttributes} from "sequelize"
import * as sequelize from "sequelize"

export interface UserSchema {
  id: number
  name: string
  createdAt: Date,
  active: boolean | null,
  parentId: number
}

export const userSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER,
  },
  name: sequelize.STRING,
  createdAt: sequelize.DATE,
  active: {
    type: sequelize.BOOLEAN,
    allowNull: true
  }
}
