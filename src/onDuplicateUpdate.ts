import * as sequelize from "sequelize"

export function onDuplicateUpdate(model: sequelize.Model<any, any>, attrs: string[]) {
  const rawAttributes = (model as any).attributes
  return "UPDATE " + attrs.map(attr => {
    const field = rawAttributes && rawAttributes[attr] && rawAttributes[attr].field || attr
    const key = `\`${field}\``
    return `${key}=VALUES(${key})`
  }).join(",")
}
