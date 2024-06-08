import { Role } from '../enums/role.enum'

export interface IUser {
  _id: string
  name: string
  email: string
  role: Role
  fullname: string
  phoneNumber: string
  dateOfBirth: Date
}
