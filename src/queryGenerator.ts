import * as sequelize from "sequelize"

export interface QueryGenerator {
  selectQuery<T, A>(tableName: string, options: sequelize.FindOptions<T>, model: sequelize.Model<T, A>): string
}
