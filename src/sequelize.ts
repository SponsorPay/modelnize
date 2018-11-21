import {DefineAttributes, DefineOptions, Sequelize} from "sequelize"
import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"
import {SQLType} from "./schema"

declare module "sequelize" {
  interface Sequelize extends SequelizeExtensions {

  }
}

export interface DefineParams<T, A extends DefineAttributes = DefineAttributes> {
  newInstance: (raw?: any) => T;
  attributes: A;
  options?: DefineOptions<any>;
}

@extension([sequelize])
export class SequelizeExtensions {
  defineModel<T, A extends DefineAttributes = DefineAttributes, S = Record<keyof A, SQLType>>(
    this: Sequelize,
    params: DefineParams<T, A>
  ) {
    const instance = params.newInstance()
    const ctor = instance.constructor
    const modelName = ctor.name.replace(/^[A-Z]/, s => s.toLowerCase())
    const model = this.define<T, S>(
      modelName,
      params.attributes, {
        tableName: modelName,
        timestamps: false,
        ...params.options
      }
    )
    model.newInstance = params.newInstance
    return model
  }
}
