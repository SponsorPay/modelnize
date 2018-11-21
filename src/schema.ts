import {DefineAttributes} from "sequelize"

export type SQLType = boolean | number | string | Date

export type Schema<T extends DefineAttributes> = Record<keyof T, SQLType>
