import {dataClass, DataClass} from "data-class-copy"

export interface UserParams {
  id: string;
  name: string;
}

export interface User extends UserParams, DataClass<UserParams> {

}

@dataClass
export class User {
  static empty = new User({
    id: "",
    name: ""
  })

  static parse(params: any = {}) {
    return User.empty.copy({
      id: String(params.id),
      name: String(params.name),
    })
  }

  constructor(params: UserParams) {
    Object.assign(this, params)
  }
}

