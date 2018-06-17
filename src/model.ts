import {CreateOptions, FindOptions, UpdateOptions} from "sequelize"
import {Model, Sequelize} from "sequelize"
import * as sequelize from "sequelize"
import {extension} from "ts-trait/build/extension"

declare module "sequelize" {
  interface Model<TInstance, TAttributes> extends ModelExtensions<TInstance> {

  }
}

export interface FetchAndCountResult<T> {
  records: T[];
  total: number;
}

@extension([{prototype: sequelize.Model}])
export abstract class ModelExtensions<T> {
  abstract newInstance: (raw?: any) => T;

  async fetchAll(this: Model<any, any>, options?: FindOptions<any>): Promise<Array<T>> {
    const results = await this.findAll(options)
    return results.map((e: any) => e.toJSON()).map(this.newInstance)
  }

  async fetchAndCountAll(this: Model<any, any>, options?: FindOptions<any>): Promise<FetchAndCountResult<T>> {
    const {rows, count} = await this.findAndCountAll(options)
    return {
      total: count,
      records: rows.map((e: any) => e.toJSON()).map(this.newInstance)
    }
  }

  async fetchOne(this: Model<any, any>, options?: FindOptions<any>): Promise<T | null> {
    const result = await this.findOne(options)
    return result != null ? this.newInstance(result.toJSON()) : null
  }

  async updateOne(this: Model<any, any>, values: Partial<T> & any, options: UpdateOptions): Promise<Partial<T>> {
    const raw = await this.update(values, options)
    return this.newInstance(raw)
  }

  async createOne(this: Model<any, any>, values: Partial<T> & any, options?: CreateOptions): Promise<Partial<T>> {
    const raw = await this.create(values, options)
    return this.newInstance(raw)
  }
}
