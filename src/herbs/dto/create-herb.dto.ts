import { IsNotEmpty } from 'class-validator' //ko validate object - validate object thì dùng class-transformer 7663

export class CreateHerbDto {
  @IsNotEmpty()
  name: string

  characteristics: string

  mechanismOfAction: string

  partsUsed: string

  chemicalCompositions: string[]

  dosageForm: string

  dosage: string

  @IsNotEmpty()
  effects: string[]

  @IsNotEmpty()
  sideEffects: string[]

  someMedicinalPreparations: string[]

  precautions: string

  safetyLevel: string

  potentialInteractions: string

  @IsNotEmpty()
  images: string[]
}
