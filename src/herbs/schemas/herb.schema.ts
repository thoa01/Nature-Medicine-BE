import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { HydratedDocument } from 'mongoose'
import { User } from 'src/users/schemas/user.schema'

export type HerbDocument = HydratedDocument<Herb>

@Schema({ timestamps: true }) //timestamps: true - auto add createdAt & updatedAt
export class Herb {
  @Prop({ required: true })
  name: string

  @Prop({ type: [String] })
  characteristics: string[]

  @Prop({ type: [String] })
  mechanismOfAction: string[]

  @Prop({ type: [String] })
  partsUsed: string[]

  @Prop({ type: [String] })
  chemicalCompositions: string[]

  @Prop()
  dosageForm: string

  @Prop({ type: [String] })
  dosage: string[]

  @Prop({ type: [String], required: true })
  effects: string[]

  @Prop({ type: [String] })
  sideEffects: string[]

  @Prop({ type: [String] })
  someMedicinalPreparations: string[]

  @Prop({ type: [String] })
  precautions: string[]

  @Prop({ type: [String] })
  safetyLevel: string[]

  @Prop({ type: [String] })
  potentialInteractions: string[]

  @Prop()
  createdBy: User

  @Prop()
  createdAt: Date

  @Prop()
  updatedBy: User

  @Prop()
  updatedAt: Date

  @Prop()
  deletedBy: User

  @Prop()
  isDeleted: boolean
}

export const HerbSchema = SchemaFactory.createForClass(Herb)
