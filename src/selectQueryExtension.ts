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

export function getQueryGenerator(model: sequelize.Model<unknown, unknown>): QueryGenerator {
  return model.sequelize.getQueryInterface().QueryGenerator
}

let queryGeneratorWithoutTableQuote: QueryGenerator

export function getQueryGeneratorWithoutTableQuote(model: sequelize.Model<unknown, unknown>): QueryGenerator {
  if (queryGeneratorWithoutTableQuote == null) {
    const instance = model.sequelize.getQueryInterface().QueryGenerator
    const QueryGeneratorConstructor = instance.constructor
    if (QueryGeneratorConstructor === Object) {
      queryGeneratorWithoutTableQuote = {...instance}
    } else {
      queryGeneratorWithoutTableQuote = new QueryGeneratorConstructor({
        sequelize: instance.sequelize,
        _dialect: instance._dialect
      })
    }

    queryGeneratorWithoutTableQuote.quoteTable = (e: unknown) => e
  }
  return queryGeneratorWithoutTableQuote
}

export interface SelectOption<A> extends sequelize.FindOptions<A> {
  from?: string
}

@extension([{prototype: sequelize.Model}])
export class SelectQueryExtension<T, A> {
  selectQuerySQL(this: sequelize.Model<T, A>, selectOptions: SelectOption<A>): string {
    const {from, ...query} = selectOptions

    const queryGenerator = from ? getQueryGeneratorWithoutTableQuote(this) : getQueryGenerator(this)

    return queryGenerator.selectQuery(from ? `(${from})` : (this.getTableName() as string), query, this).slice(0, -1)
  }
}
