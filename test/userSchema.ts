import * as sequelize from "sequelize"

export interface UserSchema {
  id: number
  name: string
  createdAt: Date | null,
  active?: boolean | null,
  parentId: number
}

export const userSchema = {
  id: {
    autoIncrement: true,
    primaryKey: true,
    type: sequelize.INTEGER,
  },
  name: sequelize.STRING,
  createdAt: {
    type: sequelize.DATE,
    defaultValue: sequelize.NOW,
    field: "created_at"
  },
  active: {
    type: sequelize.BOOLEAN,
    allowNull: true
  }
}
