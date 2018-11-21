import {CreateOptions, FindOptions, UpdateOptions} from "sequelize"
import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends ModelExtensions<TInstance, TAttributes> {

  }
}

export interface FetchAndCountResult<T> {
  records: T[];
  total: number;
}

export interface ModelExtensions<T, A> {
  newInstance: (raw?: any) => T;
}

@extension([{prototype: sequelize.Model}])
export abstract class ModelExtensions<T, A> {

  async fetchAll(this: sequelize.Model<T, A>, options?: FindOptions<any>): Promise<Array<T>> {
    const results = await this.findAll(options)
    return results.map((e: any) => e.toJSON()).map(this.newInstance)
  }

  async fetchAndCountAll(this: sequelize.Model<T, A>, options?: FindOptions<any>): Promise<FetchAndCountResult<T>> {
    const {rows, count} = await this.findAndCountAll(options)
    return {
      total: count,
      records: rows.map((e: any) => e.toJSON()).map(this.newInstance)
    }
  }

  async fetchOne(this: sequelize.Model<T, A>, options?: FindOptions<any>): Promise<T | null> {
    const result = await this.findOne(options)
    return result != null ? this.newInstance((result as any).toJSON()) : null
  }

  async updateOne(
    this: sequelize.Model<T, A>,
    values: Partial<T> & any,
    options: UpdateOptions
  ): Promise<Partial<T>> {
    const raw = await this.update(values, options)
    return this.newInstance(raw)
  }

  async createOne(
    this: sequelize.Model<T, A>,
    values: Partial<T> & any,
    options?: CreateOptions
  ): Promise<Partial<T>> {
    const raw = await this.create(values, options)
    return this.newInstance(raw)
  }
}
