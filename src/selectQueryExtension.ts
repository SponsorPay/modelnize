import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"
import {QueryGenerator} from "./queryGenerator"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends SelectQueryExtension<TInstance, TAttributes> {
    sequelize: sequelize.Sequelize
  }

  interface FindOptions<T> {
    tableAs?: string
  }
}

export function queryGenerator(model: sequelize.Model<unknown, unknown>): QueryGenerator {
  return model.sequelize.getQueryInterface().QueryGenerator
}

@extension([{prototype: sequelize.Model}])
export class SelectQueryExtension<T, A> {
  selectQuerySQL(this: sequelize.Model<T, A>, query: sequelize.FindOptions<T>): string {
    return queryGenerator(this)
      .selectQuery(this.getTableName() as string, query, this)
      .slice(0, -1)
  }
}
