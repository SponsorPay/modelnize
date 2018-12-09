import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends OnDuplicateUpdate<TInstance, TAttributes> {

  }
}

@extension([{prototype: sequelize.Model}])
export abstract class OnDuplicateUpdate<T, A> {
  onDuplicateUpdate(this: sequelize.Model<T, A>, attrs: string[]) {
    const rawAttributes = (this as any).attributes
    return "UPDATE " + attrs.map(attr => {
      const field = rawAttributes && rawAttributes[attr] && rawAttributes[attr].field || attr
      const key = `\`${field}\``
      return `${key}=VALUES(${key})`
    }).join(",")
  }
}
