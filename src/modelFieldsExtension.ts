import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends ModelFieldsExtension<TInstance, TAttributes> {}
}

@extension([{prototype: sequelize.Model}])
export abstract class ModelFieldsExtension<T, A> {
  private _ModelFieldsExtension_attributeRawFieldsMap!: Record<keyof A, string>

  get $(this: sequelize.Model<T, A>) {
    if (this._ModelFieldsExtension_attributeRawFieldsMap == null) {
      const attributeRawFieldsMap = {} as Record<keyof A, string>
      const attrs = (this as any).rawAttributes as Record<keyof A, {field: string}>
      for (const key of Object.keys(attrs)) {
        attributeRawFieldsMap[key as keyof A] = attrs[key as keyof A].field
      }
      this._ModelFieldsExtension_attributeRawFieldsMap = attributeRawFieldsMap
    }
    return this._ModelFieldsExtension_attributeRawFieldsMap
  }
}
