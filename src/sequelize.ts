import {DefineAttributes, DefineOptions, Model, Sequelize} from "sequelize"
import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Sequelize extends SequelizeExtensions {

  }
}

export interface DefineParams<T> {
  newInstance: (raw?: any) => T;
  attributes: DefineAttributes;
  options?: DefineOptions<any>;
}

@extension([sequelize])
export class SequelizeExtensions {
  defineModel<T>(this: Sequelize, params: DefineParams<T>) {
    const instance = params.newInstance()
    const ctor = instance.constructor
    const modelName = ctor.name.replace(/^[A-Z]/, s => s.toLowerCase())
    const model = this.define(
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

