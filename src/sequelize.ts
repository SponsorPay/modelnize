import * as sequelize from "sequelize"
import {DefineAttributes, DefineOptions, Sequelize} from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Sequelize extends SequelizeExtensions {}
}

export interface DefineParams<T> {
  modelName: string
  newInstance: (raw?: any) => T
  attributes: DefineAttributes
  options?: DefineOptions<T>
}

@extension([sequelize])
export class SequelizeExtensions {
  defineModel<T, A>(this: Sequelize, params: DefineParams<T>): sequelize.Model<T, A> {
    const {modelName} = params
    const model = this.define<T, A>(modelName, params.attributes, {
      tableName: modelName,
      timestamps: false,
      ...params.options
    })
    model.newInstance = params.newInstance
    return model
  }
}
