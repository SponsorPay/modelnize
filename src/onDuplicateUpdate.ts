import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends OnDuplicateUpdate<TInstance, TAttributes> {
  }
}

@extension([{prototype: sequelize.Model}])
export abstract class OnDuplicateUpdate<T, A> {
  onDuplicateUpdate(this: sequelize.Model<T, A>, attrs: string[]) {
    const {QueryGenerator, attributes, primaryKeyField} = (this as any)
    const pk = QueryGenerator.quoteIdentifier(primaryKeyField)
    return "UPDATE " + [
      `${pk}=LAST_INSERT_ID(${pk})`,
    ].concat(
      attrs.map(attr => {
        const field = attributes && attributes[attr] && attributes[attr].field || attr
        const key = QueryGenerator.quoteIdentifier(field)
        return `${key}=VALUES(${key})`
      })
    ).join(", ")
  }
}
