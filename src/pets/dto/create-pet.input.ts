import { InputType, Field } from '@nestjs/graphql';
import { IsAlpha, IsOptional } from 'class-validator';

@InputType()
export class CreatePetInput {
  @IsAlpha()
  @Field()
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  type?: string;

  @Field((type) => Number)
  ownerId: number;
}
