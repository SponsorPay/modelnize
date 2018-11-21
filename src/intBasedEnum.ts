import * as sequelize from "sequelize"

export interface IntBasedEnumOptions {
  from: number
  separator: string
  pairSeparator: string
}

export function intBasedEnum(
  values: string[],
  {separator, pairSeparator, from}: IntBasedEnumOptions = {separator: ", ", from: 1, pairSeparator: "-"}
): sequelize.DefineAttributeColumnOptions {
  return {
    type: sequelize.TINYINT,
    comment: values.map((name, i) => `${i + from}${pairSeparator}${name}`).join(separator)
  }
}
